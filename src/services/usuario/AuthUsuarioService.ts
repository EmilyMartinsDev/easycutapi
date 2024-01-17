import {prismaClient} from "../../prisma";
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

interface AuthUserRequest{
    email: string
    senha: string
}

class AuthUserService{
    async execute({ email, senha}: AuthUserRequest){
        const user = await prismaClient.usuario.findFirst({
            where:{
                email: email
            },
           include:{
            cliente:{
                include:{
                    subscription:true
                }
            }
           }
        })

        if(!user){
            throw new Error("user not exists")
        }

        const passwordMatch = await compare(senha, user?.senha)

        if(!passwordMatch){
            throw new Error("email/password incorrect (s)")
        }

        const token = sign({
            name: user.senha,
            email: user.email,
            acesso: user.acesso
        },
        process.env.JWT_SECRET, 

        {
            subject: user.id,
            expiresIn: '30d'
        }
        )

         return {
            id: user?.id,
            nome: user?.nome,
            email: user?.email,
            
            token: token,
            ...(user.cliente && {
                subscriptions: user?.cliente?.subscription ? {
                    id: user?.cliente?.subscription.id,
                    status: user?.cliente?.subscription?.status
                } : null

            }),
           

        }
    }
}

export { AuthUserService }