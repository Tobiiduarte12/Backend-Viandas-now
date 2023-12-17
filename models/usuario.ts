import { Model, Schema, model } from "mongoose";
import { ROLES } from "../helpers/constans";

export interface IUsuario {
  nombre: string;
  email: string;
  password: string;
  rol?: string;
  code?: string;
  verificado?: string;
}

const UserSchema = new Schema<IUsuario>({
  nombre: { type: String, required: [true, "El nombre es obligatorio"] },
  email: {
    type: String,
    required: [true, "El correo es obligatorio"],
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },
  rol: {
    type: String,
    default: ROLES.user,
  },
  code: {
    type: String,
  },
  verificado: {
    type: Boolean,
    default: false,
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, password, _id, code, ...usuario } = this.toObject();
  return usuario;
};

const Usuario: Model<IUsuario> = model<IUsuario>("Usuario", UserSchema);

export default Usuario;
