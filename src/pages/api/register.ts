import { NextApiRequest, NextApiResponse } from "next";

interface RegisterError {
  error: string;
}

interface RegisterSuccess {
  message: string;
}

type RegisterResponse = RegisterError | RegisterSuccess;

export default async (
  req: NextApiRequest,
  res: NextApiResponse<RegisterResponse>
) => {
  if (req.method === "POST") {
    return res.status(400).send({ error: "..." });
  }
};
