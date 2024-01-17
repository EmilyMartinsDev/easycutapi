import { Request, Response } from "express"
import { CriaClienteService } from "../../services/cliente/CriaClienteService"

export  interface Action{
    req:Request,
    res:Response
}


class ClienteController{
    async cria(req:Request, res:Response){
        const {nome, email, senha} = req.body
        const usuarioId = req.usuarioId
        const criaClienteService = new CriaClienteService()
        const barbeiro = await criaClienteService.execute({
            nome, email, senha, usuarioId
        })

        return res.json(barbeiro)
    }
    


}

export default new ClienteController()