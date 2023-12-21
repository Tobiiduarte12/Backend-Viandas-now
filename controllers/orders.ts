import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongoose";
import Order, { IOrder } from "../models/order";

export const getOrders = async (req: Request, res: Response) => {
  const userID: ObjectId = req.body.userConfirmed._id;

  const consulta = { user: userID };

  const orders = await Order.find(consulta);

  res.status(200).json({
    data: [...orders],
  });
};

export const createOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const usuarioId: ObjectId = req.body.userConfirmed._id;

  const orderData: IOrder = req.body;

  const data = {
    ...orderData,
    user: usuarioId,
    createAt: new Date(),
    status: "pending",
  };

  const order = new Order(data);

  await order.save();

  res.status(201).json({
    msg: "Orden creada con exito",
    order,
  });

  next();
};
