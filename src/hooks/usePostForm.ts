import { useState, useRef, useCallback } from "react";
import ImageKit from "imagekit";
import { handleError } from "@/utils/errorHandler";
import axios from "@/utils/axiosConfig";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
  privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY || "",
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "",
});

export const usePostForm = () => {
  const imgInputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [fileId, setFileId] = useState<string | null>(null);
  const [textareaValue, setTextareaValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleRemoveMedia = useCallback(async () => {
    setPreviewUrl(null);
    try {
      if (fileId) {
        await imagekit.deleteFile(fileId);
      }

      setFileId(null);
      if (imgInputRef.current) {
        imgInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error al eliminar el archivo", error);
    }
  }, [fileId]);

  const handleFileChangeCapture = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files?.length) return;

      const file = e.target.files[0];

      if (
        imgInputRef.current?.accept.includes("image") &&
        !["image/png", "image/jpeg"].includes(file.type)
      ) {
        alert("Solo se permiten archivos PNG o JPG.");
        return;
      } else if (
        imgInputRef.current?.accept.includes("video") &&
        file.type !== "video/mp4"
      ) {
        alert("Solo se permiten archivos MP4 para videos.");
        return;
      }

      const isChangingFile =
        fileId && imgInputRef.current?.accept.includes(file.type);

      if (isChangingFile) {
        await handleRemoveMedia();
      }

      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);

      const reader = new FileReader();
      reader.onload = async () => {
        setUploading(true);
        try {
          const blob = new Blob([reader.result as ArrayBuffer], {
            type: file.type,
          });

          const upload = await imagekit.upload({
            file: blob,
            fileName: file.name,
            folder: "social-media",
          });

          setFileId(upload?.fileId);
        } catch (error) {
          console.error("Error al subir el archivo", error);
        } finally {
          setUploading(false);
        }
      };

      reader.readAsArrayBuffer(file);
    },
    [fileId, handleRemoveMedia],
  );

  const handleUploadMedia = useCallback((type: "image" | "video") => {
    if (imgInputRef.current) {
      imgInputRef.current.accept =
        type === "image" ? "image/png, image/jpeg" : "video/mp4";
      imgInputRef.current.click();
    }
  }, []);

  const handlePost = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/posts/create", {
        content: textareaValue,
      });
      return response.data;
    } catch (err) {
      const errorMessage = handleError(err);
      console.error(errorMessage);
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [textareaValue]);

  return {
    imgInputRef,
    previewUrl,
    uploading,
    textareaValue,
    loading,
    textareaRef,
    setTextareaValue,
    handleFileChangeCapture,
    handleRemoveMedia,
    handleUploadMedia,
    handlePost,
  };
};
