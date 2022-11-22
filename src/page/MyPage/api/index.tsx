const Access_Key = "7thniUbxHNlyVoEUsrEvYzlOsyqLr2y7FgU8086WyeE";
const url = `https://api.unsplash.com/photos/random/?client_id=${Access_Key}&count=8`;

export interface UserInfoProp {
  userPost: number;
  userFavorite: number;
  userFriend: number;
}

export const GetImages = async () => {
  const response = await fetch(url, {
    method: "GET",
  });
  console.log(response);
  return response.json();
};

export const GetUserExperience = () => {
  const experience: UserInfoProp = {
    userPost: Math.floor(Math.random() * 50),
    userFavorite: Math.floor(Math.random() * 50),
    userFriend: Math.floor(Math.random() * 50),
  };
  return experience;
};
