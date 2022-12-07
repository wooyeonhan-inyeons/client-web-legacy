import { BACK_URL } from "../../../constants/GlobalConstants";

export const Post = async (e: any) => {
  e.preventDefault();
  console.log(e.target);

  const formData = new FormData();
  formData.append("content", e.target.content.value);
  formData.append("forFriend", e.target.friend.value);
  formData.append("latitude", e.target.latitude.value);
  formData.append("longitude", e.target.longitude.value);
  formData.append("file", e.target.imageFile.files[0]);

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
      console.log(response);
      response.json();
    }
  );
  console.log(response);
  return response;
};
