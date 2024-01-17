import { Router } from "express";
import UsuarioController from "./UsuarioController";
import { celebrate, Joi, Segments } from 'celebrate'
import { BarbeiroPermissao } from "../../middlewares/barbeiroPermissao";

const rotaUsuario = Router()

rotaUsuario.post('/',

celebrate({
    [Segments.BODY]:{
        senha: Joi.string(),
        email:Joi.string().email(),
        
    }
}),

UsuarioController.auth

)

export default rotaUsuario