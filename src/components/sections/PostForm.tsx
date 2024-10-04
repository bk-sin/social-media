import Image from "next/image";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { FileImage, Send, Video, X } from "lucide-react";
import { usePostForm } from "@/hooks/usePostForm";
import usePostStore from "@/store/posts";

import { motion } from "framer-motion";
const PostForm = () => {
  const { createPost, setSubmitting } = usePostStore();
  const {
    imgInputRef,
    previewUrl,
    uploading,
    loading,
    textareaValue,
    textareaRef,
    setTextareaValue,
    handleFileChangeCapture,
    handleRemoveMedia,
    handleUploadMedia,
    handlePost,
  } = usePostForm();

  const handleSubmit = async () => {
    setSubmitting(true);
    const newPost = await handlePost();
    setSubmitting(false);
    createPost(newPost);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardContent className="p-6">
          <input
            type="file"
            className="hidden"
            ref={imgInputRef}
            onChangeCapture={handleFileChangeCapture}
          />
          {previewUrl && (
            <div className="preview">
              {imgInputRef.current?.accept.includes("video") ? (
                <div className="w-full relative rounded-md overflow-hidden border mb-4 bg-black ">
                  <video
                    controls
                    className={`max-w-full mx-auto  ${uploading ? `bg-gray-300 animate-pulse` : ""}`}
                  >
                    <source src={previewUrl} type="video/mp4" />
                    Tu navegador no soporta la reproducción de videos.
                  </video>
                  {!uploading && (
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute right-2 top-2"
                      onClick={handleRemoveMedia}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  )}
                </div>
              ) : (
                <div className="w-full relative pt-[400px] overflow-hidden rounded-md border mb-4">
                  <Image
                    src={previewUrl}
                    alt="Vista previa"
                    fill
                    className={`max-w-full h-auto mb-4 object-cover rounded-md ${uploading ? "bg-gray-300 animate-pulse" : ""}`}
                  />
                  {!uploading && (
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute right-2 top-2"
                      onClick={handleRemoveMedia}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50 pointer-events-none"></div>
                </div>
              )}
            </div>
          )}

          <Textarea
            placeholder="Write something here..."
            onChange={(e) => setTextareaValue(e.target.value)}
            ref={textareaRef}
          />
          <div className="flex space-x-4 mt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => handleUploadMedia("image")}
            >
              <FileImage className="mr-2 h-4 w-4" />
              Upload photo
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => handleUploadMedia("video")}
            >
              <Video className="mr-2 h-4 w-4" />
              Upload video
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              disabled={loading || !textareaValue}
              onClick={() =>
                textareaValue ? handleSubmit() : textareaRef.current?.focus()
              }
            >
              <Send className="mr-2 h-4 w-4" />
              {textareaValue ? "Send post" : "Write a post"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PostForm;
