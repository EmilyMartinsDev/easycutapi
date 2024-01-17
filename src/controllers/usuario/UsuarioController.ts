import {Request, Response} from 'express'
import { AuthUserService } from '../../services/usuario/AuthUsuarioService'
class UsuarioController{


    async auth(req: Request, res: Response ){

        const { email, senha } = req.body

        const authUserService = new AuthUserService()
        const authUser = await authUserService.execute({
            email,
            senha
        })
        return res.json(authUser)
    }

   

}

export default new UsuarioController()