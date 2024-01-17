import { Router } from "express";
import rotaBarbearia from "./controllers/barbeiro/routes";
import rotaProf from "./controllers/profissional/routes";
import rotaUsuario from "./controllers/usuario/routes";
import rotaCliente from "./controllers/cliente/routes";


const router = Router()
router.use('/cliente', rotaCliente)
router.use('/usuario', rotaUsuario)
router.use('/barbearia', rotaBarbearia)
router.use('/profissional', rotaProf)
export default router