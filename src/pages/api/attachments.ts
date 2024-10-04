import { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "@/utils/auth";
import { PrismaAttachmentRepository } from "@/modules/attachments/infra/attachmentService";
import { createAttachment } from "@/modules/attachments/application/createAttachment";

const attachmentRepository = new PrismaAttachmentRepository();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    verifyToken(req, res);
    const postData = req.body;

    const attachment = await createAttachment(
      attachmentRepository,
      postData.postId,
      postData?.mediaType,
      postData?.mediaUrl,
    );

    res.status(201).json(attachment);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post" });
  }
}
