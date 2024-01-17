import { Request, Response } from "express"
import { CriaProfissionalService } from "../../services/profissional/CriaProfissionalService"

export  interface Action{
    req:Request,
    res:Response
}


class ProfissionalController{
    async cria(req:Request, res:Response){
        const {nome, email, senha} = req.body
        const usuarioId= req.usuarioId
        const criaprofissionalService = new CriaProfissionalService()
        const profissional = await criaprofissionalService.execute({
            nome, email, senha, usuarioId
        })

        return res.json(profissional)
    }


}

export default new ProfissionalController()