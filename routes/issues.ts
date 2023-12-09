import { Router } from "express";
import { postNewIssues } from "../controllers/issues";
import validationJWT from "../middlewares/validationJWT";
import { isAdmin } from "../middlewares/validateRol";
import { errorRecolector } from "../middlewares/errorsRecolector";
import { check } from "express-validator";

const router = Router();

router.post(
  "/",
  [
    validationJWT,
    isAdmin,
    check("title", "El título es obligatorio").not().isEmpty(),
    check("description", "La descripción es obligatoria").not().isEmpty(),
    check("priority", "La prioridad es obligatoria").not().isEmpty(),
    errorRecolector,
  ],
  postNewIssues
);

export default router;
