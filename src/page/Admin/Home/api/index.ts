import { BACK_URL } from "../../../../constants/GlobalConstants";

/**
 * @function 어드민 유저 리스트 조회
 */

export const getAllUser = () => {
  return fetch(`${BACK_URL}/admin/user/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("key")}`,
    },
  }).then((res) => res.json());
};

export const getAllFriendList = () => {
  return fetch(`${BACK_URL}/admin/friends/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("key")}`,
    },
  }).then((res) => res.json());
};

/**
 * @function 어드민 친구 삭제
 * @param {string} friend_id
 */
export const deleteFriend = (friend_id: string) => {
  return fetch(`${BACK_URL}/admin/friends`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("key")}`,
    },
    body: JSON.stringify({
      friend_id,
    }),
  });
};

/**
 * @function 어드민 친구 관계 수정
 * @queries {string} user_id
 * @param {updateFormData} user_info
 */

export interface updateFriendFormData {
  friend_id: string;
  relation_type: number;
}
export const updateFriend = (friend_info: updateFriendFormData) => {
  return fetch(`${BACK_URL}/admin/friends`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("key")}`,
    },
    body: JSON.stringify(friend_info),
  });
};

/**
 * @function 어드민 유저 삭제
 * @param {string} user_id
 */
export const deleteUser = (user_id: string) => {
  return fetch(`${BACK_URL}/admin/user`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("key")}`,
    },
    body: JSON.stringify({
      user_id,
    }),
  });
};

/**
 * @function 어드민 유저 수정
 * @queries {string} user_id
 * @param {updateFormData} user_info
 */

export interface updateUserFormData {
  name: string;
  email: string;
  message: string;
}
export const updateUser = (user_info: updateUserFormData) => {
  return fetch(`${BACK_URL}/admin/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("key")}`,
    },
    body: JSON.stringify(user_info),
  });
};
