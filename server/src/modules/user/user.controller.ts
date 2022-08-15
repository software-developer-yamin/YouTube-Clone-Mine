import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { RegisterUserBody } from "./user.schema";
import { createUser } from "./user.service";

export const registerUserHandler = async (
  req: Request<{}, {}, RegisterUserBody>,
  res: Response
) => {
  try {
    const { username, email, password } = req.body;

    console.log(req.body);

    // create user
    await createUser({ username, email, password });

    res.status(StatusCodes.CREATED).send("User created successfully");
  } catch (err: any) {
    if (err.code === 11000)
      return res.status(StatusCodes.CONFLICT).send("User already exists");
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
  }
};
