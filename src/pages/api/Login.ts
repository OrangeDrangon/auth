import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export interface LoginBody {
  email: string;
  password: string;
}

export interface LoginError {
  error: string;
}

export interface LoginSuccess {
  message: string;
  token: string;
}

export type LoginResponse = LoginError | LoginSuccess;

export default (req: NextApiRequest, res: NextApiResponse<LoginResponse>) => {
  if (req.method === "POST") {
    const { email, password }: Partial<LoginBody> = req.body;

    // validate email and password
    if (
      email == null ||
      (email != null && email.length < 5) ||
      password == null ||
      (password != null && password.length < 5)
    ) {
      return res.status(400).json({ error: "Missing password or email." });
    }

    // check if in db
    // ...
    // ...

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
