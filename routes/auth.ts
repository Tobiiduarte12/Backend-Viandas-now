import { Router } from "express";
import { login, register, verifyUser } from "../controllers/auth";
import { check } from "express-validator";
import { errorRecolector } from "../middlewares/errorsRecolector";
import { emailExisting } from "../helpers/validacionesDB";

const router = Router();

router.post(
  "/register",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").not().isEmpty().isEmail(),
    check(
      "password",
      "La contraseña es obligatoria y debe tener al menos 6 caracteres"
    )
      .not()
      .isEmpty()
      .isLength({ min: 6 }),
    check("email").custom(emailExisting),
    errorRecolector,
  ],
  register
);

router.post(
  "/login",
  [
    check("email", "El email es obligatorio").not().isEmpty(),
    check("email", "El email no es válido").isEmail(),
    check(
      "password",
      "La contraseña debe tener al menos 6 caracteres"
    ).isLength({
      min: 6,
    }),
    errorRecolector,
  ],
  login
);

router.patch(
  "/verify",
  [
    check("email", "El email es obligatorio").not().isEmpty(),
    check("email", "El email no es válido").isEmail(),
    check("code", "El código es obligatorio").not().isEmpty(),
    errorRecolector,
  ],
  verifyUser
);

export default router;
