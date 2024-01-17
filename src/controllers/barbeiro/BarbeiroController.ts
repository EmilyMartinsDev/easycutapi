import { Request, Response } from "express"
import { CriaBarbeiroService } from "../../services/barbeiro/CriaBarbeiroService"

export  interface Action{
    req:Request,
    res:Response
}


class BarbeiroController{
    async cria(req:Request, res:Response){
        const {nome, email, senha} = req.body

        const criaBarbeiroService = new CriaBarbeiroService()
        const barbeiro = await criaBarbeiroService.execute({
            nome, email, senha
        })

        return res.json(barbeiro)
    }
    


}

export default new BarbeiroController()