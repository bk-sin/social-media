import { PostRepository } from "../domain/PostRepository";

export const getPosts = async (postRepository: PostRepository) => {
  return await postRepository.getAll();
};
