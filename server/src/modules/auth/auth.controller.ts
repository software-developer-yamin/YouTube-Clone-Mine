import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { omit } from "../../helpers/omit";
import { findUserByEmail } from "../user/user.service";
import { LoginSchemaBody } from "./auth.schema";
import { signJwt } from "./auth.utils";

export const loginHandler = async (
  req: Request<{}, {}, LoginSchemaBody>,
  res: Response
) => {
  try {
    const { email, password } = req.body;

    // find the user by email
    const user = await findUserByEmail(email);

    if (!user || !user.comparePassword(password)) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send("Invalid email or password");
    }

    const payload = omit(user.toJSON(), ["password"]);

    const jwt = signJwt(payload);

    res.cookie("accessToken", jwt, {
      maxAge: 3.154e10, // 1 year
      httpOnly: true,
      domain: "localhost",
      path: "/",
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production" ? true : false,
    });

    return res.status(StatusCodes.OK).send(jwt);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};
