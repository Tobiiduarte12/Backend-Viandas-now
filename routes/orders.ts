import { Router } from "express";
import { createOrders, getOrders } from "../controllers/orders";
import validationJWT from "../middlewares/validationJWT";
import { errorRecolector } from "../middlewares/errorsRecolector";
import { isVerified } from "../middlewares/validarVerificado";
import { check } from "express-validator";

const router = Router();

router.get("/", [validationJWT, errorRecolector], getOrders);

router.post(
  "/",
  [
    validationJWT,
    isVerified,
    check("price", "El precio es obligatorio").not().isEmpty(),
    check("shippingCost", "El costo de envio es obligatorio").not().isEmpty(),
    check("total", "El precio total es obligatorio").not().isEmpty(),
    check("shippingDetails", "Los detalles de envio son obligatorios")
      .not()
      .isEmpty(),
    check("items", "Los items son obligatorios").not().isEmpty(),
    errorRecolector,
  ],
  createOrders
);

export default router;
