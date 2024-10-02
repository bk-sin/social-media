import { PostRepository } from "../domain/PostRepository";

export const likePost = async (
  postRepository: PostRepository,
  postId: number,
  userId: string | void,
) => {
  return await postRepository.like(postId, userId);
};
