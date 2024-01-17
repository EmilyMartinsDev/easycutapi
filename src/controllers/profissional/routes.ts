import { Router } from "express";
import ProfissionalController from "./ProfissionalController";
import { celebrate, Joi, Segments } from 'celebrate'
import { BarbeiroPermissao } from "../../middlewares/barbeiroPermissao";

const rotaProf = Router()

rotaProf.post('/',

celebrate({
    [Segments.BODY]:{
        nome: Joi.string(),
        senha: Joi.string(),
        email:Joi.string().email(),
        
    }
}),
BarbeiroPermissao,
ProfissionalController.cria

)

export default rotaProf