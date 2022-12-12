import { BACK_URL } from "../../../constants/GlobalConstants";
import imageCompression from "browser-image-compression";
import Compressor from "compressorjs";

export const Post = async (e: any) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("content", e.target.content.value);
  formData.append("forFriend", e.target.friend.value);
  formData.append("latitude", e.target.latitude.value);
  formData.append("longitude", e.target.longitude.value);

  const option = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1024,
  };

  const files = Array.from(e.target.imageFile.files);
  for (let i = 0; i < files.length; i++) {
    const compressedBlob = await imageCompression(files[i] as any, option);
    const compressedFile = new File([compressedBlob], compressedBlob.name, {
      type: compressedBlob.type,
    });
    console.log(files[i]);
    console.log(compressedFile);
    formData.append("file", compressedFile);
  }

  const options = {
    method: "POST",
    headers: {
      // "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("key")}`,
    },
    body: formData,
  };

  const response = await fetch(`${BACK_URL}/posting`, options).then(
    (response) => {
      return response.json();
    }
  );
  console.log(response);
  return response;
};

export const deletePost = async (post_id: string) => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("key")}`,
    },
    body: JSON.stringify({
      post_id,
    }),
  };
  const response = await fetch(`${BACK_URL}/posting?`, options).then(
    (response) => {
      return response.json();
    }
  );
  return response;
};
