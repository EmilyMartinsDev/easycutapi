import { hash } from "bcryptjs";
import { prismaClient } from "../../prisma";
import { Acesso } from "@prisma/client";

interface IRequest{
    nome:string
    email:string
    senha:string
    usuarioId:string
}

export class  CriaClienteService{
    async execute({nome, email, senha, usuarioId}:IRequest){
        const usuarioJaCadastrado = await prismaClient.usuario.findFirst({
            where:{
                email
            }
        })
        if(usuarioJaCadastrado){
            throw new Error("Usuario ja cadastrado")
        }

        const senhaCriptografada = await hash(senha, 8)

        const usuario = await prismaClient.usuario.create({
            data:{
                nome, email, senha:senhaCriptografada, acesso: 'CLIENTE'
            }

        })

        const barbearia = await prismaClient.barbearia.findFirst({
            where:{
              usuarioId:usuarioId
            }
        })

        if(!barbearia){
            throw new Error("non authorizated")
        }

        const cliente = await prismaClient.cliente.create({
            data:{
                
                usuarioId: usuario.id,
                barbeariaId:barbearia.id
            },
            include:{
                usuario:true
            }
        })

        return cliente
    }
}