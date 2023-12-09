import { Request, Response } from "express";
import { ObjectId, Types } from "mongoose";
import Issue, { IIsues } from "../models/issue";

export const postNewIssues = async (req: Request, res: Response) => {
  const { title, description, priority }: IIsues = req.body;

  const usuarioId: ObjectId = req.body.userConfirmed._id;

  const issueData = {
    title,
    description,
    priority,
    user: usuarioId,
    createAt: new Date(),
  };

  const issue = new Issue(issueData);

  await issue.save();

  res.status(201).json({
    msg: "Issue creado correctamente",
    issue,
  });
};
