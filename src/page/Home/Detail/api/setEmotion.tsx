import { BACK_URL } from "../../../../constants/GlobalConstants";

export interface EmotionFnParam {
  post_id: string;
  emotion_id?: string;
  new_emotion_type: number;
  current_emotion_type?: number;
}

const methods = ["POST", "DELETE", "PATCH"];

/**
 *
 * @param emotion_type:number 0=좋아요, 1=멋져요, 2=슬퍼요
 * @returns
 */
export const setEmotion = async ({
  post_id,
  emotion_id,
  new_emotion_type,
  current_emotion_type = undefined,
}: EmotionFnParam) => {
  console.log(emotion_id, new_emotion_type, current_emotion_type);
  const version =
    current_emotion_type === undefined
      ? 0
      : current_emotion_type === new_emotion_type
      ? 1
      : 2;
  console.log(methods[version], version);
  const response = await fetch(`${BACK_URL}/emotion`, {
    method: methods[version],
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("key")}`,
    },
    body: JSON.stringify({
      post_id: post_id,
      emotion_id: emotion_id,
      emotion_type: new_emotion_type,
    }),
  }).then((response) => {
    console.log(response);
    return response.json();
  });
  return response;
};
