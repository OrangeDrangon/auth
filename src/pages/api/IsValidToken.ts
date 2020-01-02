import { NextApiResponse, NextApiRequest } from "next";
import jwt from "jsonwebtoken";
export interface IsValidTokenBody {
  token: string;
}

export interface IsValidTokenError {
  error: string;
  valid: false;
}
export interface IsValidTokenSuccess {
  message: string;
  valid: true;
}

export type IsValidTokenResponse = IsValidTokenError | IsValidTokenSuccess;

export default (
  req: NextApiRequest,
  res: NextApiResponse<IsValidTokenResponse>
) => {
  if (req.method == "POST") {
    const { token }: Partial<IsValidTokenBody> = req.body;

    if (token == null) {
      return res
        .status(400)
        .json({ error: "Please provide a token.", valid: false });
    }
    try {
      jwt.verify(token, process.env.JWT_SECRET || "SUPER SECRET CODE");
      return res.status(200).json({ message: "Token is valid.", valid: true });
    } catch (error) {
      return res.status(401).json({ error: "Invalid token", valid: false });
    }
  }
};
