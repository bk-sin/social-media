import { User } from "@/modules/users/domain";
import axios from "@/utils/axiosConfig";
import { SentimentAnalysis } from "@prisma/client";
import { create } from "zustand";

interface Attachments {
  id: number;
  postId: number;
  mediaType: string;
  mediaUrl: string;
  createdAt: Date;
}

interface Comment {
  user: User;
  id: number;
  userId: number;
  postId: number;
  content: string;
  createdAt: Date;
}

export interface Like {
  id: number;
  userId: number;
  postId: number;
  createdAt: Date;
}

export interface Post {
  id: number;
  userId: number;
  content: string;
  createdAt: string;
  attachments: Attachments[];
  comments: Comment[];
  likes: Like[];
  user: {
    email: string;
    username: string;
    profile: {
      fullName: string;
      bio: string;
      avatarUrl: string;
    }[];
  };
  sentimentAnalysis: SentimentAnalysis[];
}

interface PostStore {
  posts: Post[];
  loading: boolean;
  submitting: boolean;
  fetchPosts: () => Promise<void>;
  createPost: (post: Post) => void;
  setSubmitting: (value: boolean) => void;
}

const usePostStore = create<PostStore>((set) => ({
  posts: [],
  loading: true,
  submitting: false,
  setSubmitting: (value: boolean) => set({ submitting: value }),
  fetchPosts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/api/posts/getAll");
      console.log("Posteos store: ", response);
      set({ posts: response.data });
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      set({ loading: false });
    }
  },
  createPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
}));

export default usePostStore;
