import { Acesso } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { prismaClient } from "../prisma";

type Payload = {
    sub: string
}

export async function BarbeiroPermissao(
    req: Request,
    res: Response,
    next: NextFunction,
)
{
    const authToken = req.headers.authorization
    
    if(!authToken){
        return res.status(401).end()
    }

    const token = authToken.split(" ")[1]
    
    try{
       const { sub } = verify(token, process.env.JWT_SECRET) as Payload
        
       req.usuarioId = sub

        const barbeiro = await prismaClient.usuario.findFirst({
            where:{
                id: req.usuarioId
            }
        })
        if(barbeiro.acesso != 'BARBEIRO'){
            return res.status(401).json({
                message: "Nao autorizado"
            }).end()
        }

      
       return next()

    }catch(err){
        return res.status(401).end()
    }

}