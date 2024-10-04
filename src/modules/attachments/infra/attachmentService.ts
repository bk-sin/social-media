import { PrismaClient } from "@prisma/client";
import { AttachmentRepository } from "../domain/AttachmentRepository";
import { Attachment } from "../domain/AttachmentModel";

const prisma = new PrismaClient();

export class PrismaAttachmentRepository implements AttachmentRepository {
  async create(
    postId: number,
    mediaType: string,
    mediaUrl: string,
  ): Promise<Attachment> {
    try {
      const attachment = await prisma.attachment.create({
        data: {
          postId: postId,
          mediaType: mediaType,
          mediaUrl: mediaUrl,
        },
      });
      return attachment;
    } catch (error) {
      throw new Error(`Failed to create post: ${error}`);
    }
  }
}
