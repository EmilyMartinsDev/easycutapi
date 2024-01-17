import { Router } from "express";
import ClienteController from "./ClienteController";
import { celebrate, Joi, Segments } from 'celebrate'
import { BarbeiroPermissao } from "../../middlewares/barbeiroPermissao";

const rotaCliente = Router()

rotaCliente.post('/', celebrate({
    [Segments.BODY]:{
        nome: Joi.string(),
        senha: Joi.string(),
        email:Joi.string().email(),
        usuarioId:Joi.string()
    }
}), 
BarbeiroPermissao,
ClienteController.cria
)

export default rotaCliente