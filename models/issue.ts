import { Date, Model, Schema, Types, model } from "mongoose";

export interface IIsues {
  title: String;
  description: String;
  priority: Number;
  user: Types.ObjectId;
  createAt: Date;
}

const IssueSchema = new Schema<IIsues>({
  title: {
    type: String,
    required: [true, "El titulo es requerido"],
  },
  description: {
    type: String,
    required: [true, "La descripción es requerida"],
  },
  priority: {
    type: Number,
    required: [true, "La prioridad es requerida"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: [true, "El usuario es requerido"],
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const Issue: Model<IIsues> = model("Issue", IssueSchema);

export default Issue;
