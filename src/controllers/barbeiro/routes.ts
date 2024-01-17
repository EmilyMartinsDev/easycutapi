import { Router } from "express";
import BarbeiroController from "./BarbeiroController";
import { celebrate, Joi, Segments } from 'celebrate'

const rotaBarbearia = Router()

rotaBarbearia.post('/', celebrate({
    [Segments.BODY]:{
        nome: Joi.string(),
        senha: Joi.string(),
        email:Joi.string().email()
    }
}), 
BarbeiroController.cria
)

export default rotaBarbearia