import { Attachment } from "./AttachmentModel";

export interface AttachmentRepository {
  create(
    postId: number,
    mediaType: string,
    mediaUrl: string,
  ): Promise<Attachment>;
}
