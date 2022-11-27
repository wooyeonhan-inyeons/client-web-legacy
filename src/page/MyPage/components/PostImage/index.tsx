import { useNavigate } from "react-router-dom";

interface PostProps {
  url?: string;
  morePost?: boolean;
}

export const PostImage = ({ url, morePost }: PostProps) => {
  const navigate = useNavigate();
  if (morePost) {
    return (
      <div
        className="postThumb morePost"
        style={{ background: `url(${url})` }}
        onClick={() => navigate("/mypage/postes")}
      ></div>
    );
  } else {
    return (
      <div
        className="postThumb"
        style={{ background: `url(${url})` }}
        onClick={() => navigate("/")}
      ></div>
    );
  }
};
