import { postType } from "../..";
import { setEmotion } from "../../api/setEmotion";

interface EmotionProp {
  data: postType;
}

export const Emotion = ({ data }: EmotionProp) => {
  const emotional = (new_emotion_type: number) => {
    const reqData = {
      post_id: data.post_id,
      emotion_id: data.emotion.emotion_id,
      new_emotion_type: new_emotion_type,
      current_emotion_type: data.emotion.emotion_type!,
    };
    setEmotion(reqData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="actionSpace">
      <div className="emotions">
        <div
          className="emotionButton"
          style={data.emotion?.emotion_type === 0 ? emotionStyle : {}}
          onClick={() => emotional(0)}
        >
          🥰<div className="emotionCount">{data.like_count}</div>
        </div>
        <div className="divider"></div>
        <div
          className="emotionButton"
          style={data.emotion?.emotion_type === 1 ? emotionStyle : {}}
          onClick={() => emotional(1)}
        >
          😎<div className="emotionCount">{data.cool_count}</div>
        </div>
        <div className="divider"></div>
        <div
          className="emotionButton"
          style={data.emotion?.emotion_type === 2 ? emotionStyle : {}}
          onClick={() => emotional(2)}
        >
          😢<div className="emotionCount">{data.sad_count}</div>
        </div>
      </div>
    </div>
  );
};

const emotionStyle = {
  backgroundColor: "#ffffffd4",
  color: "#222",
};
