import { Post } from "../domain/PostModel";
import { PostRepository } from "../domain/PostRepository";
import { postSchema } from "../domain/PostSchemas";

export const createPost = async (
  postRepository: PostRepository,
  data: Post,
) => {
  const parsedData = postSchema.parse(data);

  const post = {
    content: parsedData.content,
    userId: parsedData.userId,
  };

  return await postRepository.create(post);
};
