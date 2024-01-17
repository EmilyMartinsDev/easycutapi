import { hash } from "bcryptjs";
import { prismaClient } from "../../prisma";
import { Acesso } from "@prisma/client";

interface IRequest{
    nome:string
    email:string
    senha:string
}

export class CriaBarbeiroService{
    async execute({nome, email, senha}){
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
                nome, email, senha:senhaCriptografada, acesso: Acesso.BARBEIRO
            }

        })
        const barbeiro = await prismaClient.barbearia.create({
            data:{
                usuarioId: usuario.id,

            },
            include:{
                usuario:true
            }
        })

        return barbeiro
    }
}