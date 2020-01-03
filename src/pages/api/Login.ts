import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { validateUser } from "../../utils/validateUser";
import { validateClient } from "../../utils/validateClient";
import { validateCode } from "../../utils/validateCode";

export interface LoginBody {
  email: string;
  password: string;
  clientId: string;
  callbackUrl: string;
  code: string;
}

export interface LoginError {
  error: string;
}

export interface LoginSuccess {
  message: string;
  token: string;
}

export type LoginResponse = LoginError | LoginSuccess;

export default async (
  req: NextApiRequest,
  res: NextApiResponse<LoginResponse>
) => {
  if (req.method === "POST") {
    const {
      email,
      password,
      clientId,
      callbackUrl,
      code,
    }: Partial<LoginBody> = req.body;

    // validate email, password, clientid, and callbackurl
    const validate = await Promise.all([
      validateUser(email, password),
      validateClient(clientId, callbackUrl),
      validateCode(code),
    ]);

    let valid = true;
    const errorMessage: string[] = [];
    validate.forEach((elm, index) => {
      valid = valid && !!elm;
      if (!elm) {
        switch (index) {
          case 0:
            errorMessage.push("Invalid Username or Password.");
            break;
          case 1:
            errorMessage.push("Invalid Client Id or Callback URL.");
            break;
          case 2:
            errorMessage.push("Invalid code type.");
            break;
          default:
            break;
        }
      }
    });

    if (!valid) {
      return res.status(400).json({ error: errorMessage.join(" ") });
    }

    const user = { email, name: "John", scopes: ["email", "name"] };

    const token = jwt.sign(
      user,
      process.env.JWT_SECRET || "SUPER SECRET CODE",
      {
        expiresIn: "1 day",
      }
    );

    res.status(200).json({ token, message: "Success logging in." });
  }
};
