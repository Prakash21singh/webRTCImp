import { NextApiRequest, NextApiResponse } from "next";

interface IResponse {
  message: string;
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "500kb",
    },
  },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) {
  if (req.method === "GET") {
    res.status(200).json({ message: "Hey there" });
  } else if (req.method === "POST") {
  } else if (req.method === "PUT") {
  } else if (req.method === "DELETE") {
  }
}
