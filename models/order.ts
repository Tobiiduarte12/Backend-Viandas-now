import { Model, Schema, Types, model } from "mongoose";

interface IShippingDetails {
  name: String;
  address: String;
  cellPhone: String;
  location: String;
}

interface IOrderItem {
  desc: String;
  id: Number;
  price: Number;
  quantity: Number;
  tittle: String;
}

export interface IOrder {
  createAt: Date;
  user: Types.ObjectId;
  price: Number;
  shippingCost: Number;
  items: IOrderItem[];
  shippingDetails: IShippingDetails;
  status: String;
  total: Number;
}

const OrderSchema = new Schema<IOrder>({
  createAt: { type: Date, default: Date.now },

  user: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },

  price: { type: Number, required: true },

  shippingCost: { type: Number, required: true },

  items: {
    type: [
      {
        desc: { type: String, required: true },
        id: { type: Number, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        title: { type: String, required: true },
      },
    ],
    required: true,
  },

  shippingDetails: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    cellPhone: { type: String, required: true },
    location: { type: String, required: true },
  },

  status: { type: String, required: true },

  total: { type: Number, required: true },
});

const Order: Model<IOrder> = model<IOrder>("Order", OrderSchema);

export default Order;
