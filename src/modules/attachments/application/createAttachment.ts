import { AttachmentRepository } from "../domain/AttachmentRepository";

export const createAttachment = async (
  attachmentRepository: AttachmentRepository,
  postId: number,
  mediaType: string,
  mediaUrl: string,
) => {
  if (!mediaUrl || !postId) return null;
  const attachment = await attachmentRepository.create(
    postId,
    mediaType,
    mediaUrl,
  );
  return attachment;
};
