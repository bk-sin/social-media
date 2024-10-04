import Head from "next/head";
import localFont from "next/font/local";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Cog,
  Frown,
  Heart,
  LogOut,
  Meh,
  MessageCircle,
  MessageCircleIcon,
  Smile,
  User,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/store/auth";
import NavBar from "@/components/sections/NavBar";
import PostForm from "@/components/sections/PostForm";
import { useEffect, useState } from "react";
import usePostStore, { Like, Post } from "@/store/posts";
import React from "react";
import axios from "@/utils/axiosConfig";
import { Textarea } from "@/components/ui/textarea";
import AuthHOC from "@/components/AuthHOC";
import { motion } from "framer-motion";

const geistSans = localFont({
  src: "../styles/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../styles/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const LoggedHome = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${geistSans.variable} ${geistMono.variable}`}>
        <NavBar />

        <main className="container mx-auto mt-8 grid grid-cols-4 gap-8">
          <aside className="col-span-1">
            <Sidebar />
          </aside>
          <div className="col-span-2 space-y-4">
            <PostForm />
            <PostList />
          </div>
          <aside className="col-span-1 space-y-8">
            <PeopleYouMayKnow />
          </aside>
        </main>
      </div>
    </div>
  );
};

export default AuthHOC(LoggedHome, { isPrivate: true });

const PostList = () => {
  const { posts, loading, submitting, fetchPosts } = usePostStore();
  console.log("Posteos PostList: ", posts);
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);
  return (
    <div className="gap-4 flex flex-col">
      {submitting ? <PostCardSkeleton /> : null}
      {loading ? (
        <>
          <PostCardSkeleton />
          <PostCardSkeleton />
          <PostCardSkeleton />
        </>
      ) : (
        posts?.map((data) => <PostCard {...data} key={data.id} />)
      )}
    </div>
  );
};

const PostCardSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            {/* Skeleton Avatar */}
            <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="flex-1 space-y-2">
              {/* Skeleton Name */}
              <div className="w-24 h-4 bg-gray-300 rounded animate-pulse"></div>
              {/* Skeleton Description */}
              <div className="w-48 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Skeleton Post Content */}
          <div className="space-y-3">
            <div className="w-full h-4 bg-gray-300 rounded animate-pulse"></div>
            <div className="w-5/6 h-4 bg-gray-300 rounded animate-pulse"></div>
            <div className="w-3/4 h-4 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Sidebar = () => {
  const { logout, user } = useAuthStore();
  return (
    <Card>
      <CardHeader>
        <CardTitle>{user?.username}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button variant="ghost" className="w-full justify-start">
          <User className="mr-2 h-4 w-4" />
          Profile
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <Users className="mr-2 h-4 w-4" />
          Find friends
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <MessageCircle className="mr-2 h-4 w-4" />
          User analytics
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <Cog className="mr-2 h-4 w-4" />
          Settings
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <User className="mr-2 h-4 w-4" />
          Security data
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-red-500"
          onClick={logout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </Button>
      </CardContent>
    </Card>
  );
};

interface SentimentAnalysisProps {
  sentiment: {
    positive: number;
    negative: number;
    neutral: number;
  };
}

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const getSentimentIcon = (type: string) => {
  switch (type) {
    case "positive":
      return <Smile className="h-6 w-6 text-green-500" />;
    case "neutral":
      return <Meh className="h-6 w-6 text-yellow-500" />;
    case "negative":
      return <Frown className="h-6 w-6 text-red-500" />;
    default:
      return null;
  }
};

const getDominantSentiment = (sentiment: {
  positive: number;
  negative: number;
  neutral: number;
}) => {
  const { positive, negative, neutral } = sentiment;
  if (positive >= negative && positive >= neutral) return "positive";
  if (neutral >= positive && neutral >= negative) return "neutral";
  return "negative";
};

const getSentimentTextColor = (type: string) => {
  switch (type) {
    case "positive":
      return "text-green-500";
    case "neutral":
      return "text-yellow-500";
    case "negative":
      return "text-red-500";
    default:
      return "text-gray-500"; // Color por defecto
  }
};

const SentimentAnalysis: React.FC<SentimentAnalysisProps> = ({ sentiment }) => {
  const total = sentiment.positive + sentiment.negative + sentiment.neutral;
  const positivePercentage = ((sentiment.positive / total) * 100).toFixed(1);
  const negativePercentage = ((sentiment.negative / total) * 100).toFixed(1);
  const neutralPercentage = ((sentiment.neutral / total) * 100).toFixed(1);
  const dominantSentiment = getDominantSentiment(sentiment);
  const textColorClass = getSentimentTextColor(dominantSentiment);
  return (
    <HoverCard>
      <div className="flex-1 justify-end flex items-center space-x-2">
        <HoverCardTrigger asChild>
          <span className={`ml-2 capitalize ${textColorClass}`}>
            {dominantSentiment}
          </span>
        </HoverCardTrigger>
        {getSentimentIcon(dominantSentiment)}
      </div>
      <HoverCardContent className="w-80" side="left">
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center">
            <span className="flex items-center">
              {getSentimentIcon("positive")}
              <span className="ml-2 capitalize">Positive Sentiment</span>
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {positivePercentage}%
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="flex items-center">
              {getSentimentIcon("neutral")}
              <span className="ml-2 capitalize">Neutral Sentiment</span>
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {neutralPercentage}%
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="flex items-center">
              {getSentimentIcon("negative")}
              <span className="ml-2 capitalize">Negative Sentiment</span>
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {negativePercentage}%
            </span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

const PostCard = (props: Post) => {
  const { user } = useAuthStore();
  const [newComment, setNewComment] = useState("");
  const [showAllComments, setShowAllComments] = useState(false);
  const [showInputComment, setShowInputComment] = useState(false);
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const visibleComments = showAllComments
    ? props.comments
    : props?.comments?.slice(0, 3);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-xl">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar>
              <AvatarImage
                src="/placeholder.svg?height=40&width=40"
                alt="Tony Stark"
              />
              <AvatarFallback>TS</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">
                {props.user?.profile[0]?.fullName || props.user?.username}
              </h3>
              <p className="text-sm text-muted-foreground">
                @{props.user?.username}
              </p>
            </div>
            {props.sentimentAnalysis?.length ? (
              <SentimentAnalysis sentiment={props.sentimentAnalysis[0]} />
            ) : null}
          </div>
          <p>{props.content}</p>
          <div className="flex items-center justify-between text-sm text-muted-foreground mt-4">
            <span className="w-full">
              {new Date(props.createdAt).toLocaleString()}
            </span>
            <div className="flex items-center space-x-4">
              {user && (
                <LikePost
                  postId={props.id}
                  initialLikes={props.likes}
                  userId={user.id}
                />
              )}
              <Button
                className="flex items-center space-x-1"
                variant="outline"
                onClick={() => setShowInputComment(true)}
              >
                <MessageCircleIcon className="w-4 h-4" />
                <span>{props.comments?.length || 0}</span>
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col p-0">
          {visibleComments?.length
            ? visibleComments.map((comment) => (
                <div className="w-full p-6" key={comment.id}>
                  <div className="flex space-x-4">
                    <Avatar>
                      <AvatarImage
                        src={comment.user.avatarUrl}
                        alt={comment.user.fullname}
                      />
                      <AvatarFallback>
                        {comment.user.fullname.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">
                          {comment.user.fullname}
                        </h4>
                        <span className="text-xs text-muted-foreground">
                          {new Date(comment.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                  </div>
                </div>
              ))
            : null}

          {props.comments?.length > 3 && !showAllComments && (
            <Button
              variant="link"
              className="w-full text-left"
              onClick={() => setShowAllComments(true)}
            >
              Ver más comentarios
            </Button>
          )}

          {showInputComment && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full p-6 pt-0"
            >
              <form onSubmit={handleCommentSubmit}>
                <Textarea
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full"
                />
                <Button type="submit" className="w-full">
                  Post Comment
                </Button>
              </form>
            </motion.div>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const LikePost = ({
  postId,
  initialLikes = [],
  userId,
}: {
  postId: number;
  initialLikes: Like[];
  userId: number;
}) => {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(
    likes?.some((like) => like.userId === userId),
  );

  const handleLikeClick = async () => {
    try {
      setLiked(!liked);
      setLikes((prevLikes) =>
        liked
          ? prevLikes.filter((like) => like.userId !== userId)
          : [...prevLikes, { id: 0, postId, userId, createdAt: new Date() }],
      );
      await axios.post("/api/posts/like", { postId });
    } catch (error) {
      setLiked(liked);
      setLikes((prevLikes) =>
        liked
          ? [...prevLikes, { id: 0, postId, userId, createdAt: new Date() }]
          : prevLikes.filter((like) => like.userId !== userId),
      );
    }
  };

  return (
    <Button
      variant={liked ? "default" : "outline"}
      className="justify-start"
      size="sm"
      onClick={handleLikeClick}
    >
      <Heart className="mr-2 h-4 w-4" fill={liked ? "currentColor" : "none"} />{" "}
      {likes?.length}
    </Button>
  );
};

const PeopleYouMayKnow = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>People you may know</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {[
          "Tony Stark",
          "Bruce Banners",
          "Natasha Ramanoff",
          "Barton Clint",
        ].map((name, index) => (
          <div key={index} className="flex items-center space-x-4">
            <Avatar>
              {/* <AvatarImage
                src={`/placeholder.svg?height=40&width=40&text=${name.charAt(0)}`}
                alt={name}
              /> */}
              <AvatarFallback>
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold">{name}</h4>
              <p className="text-sm text-muted-foreground">6M+ Followers</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
