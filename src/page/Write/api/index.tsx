import { BACK_URL } from "../../../constants/GlobalConstants";

export const Post = async (e: any) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("content", e.target.content.value);
  formData.append("forFriend", e.target.friend.value);
  formData.append("latitude", e.target.latitude.value);
  formData.append("longitude", e.target.longitude.value);

  const files = Array.from(e.target.imageFile.files);
  files.map((file: any) => {
    console.log(file);
    formData.append("file", file);
  });

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
