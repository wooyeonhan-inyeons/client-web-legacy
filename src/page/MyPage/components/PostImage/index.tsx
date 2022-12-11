import { useNavigate } from "react-router-dom";

interface PostProps {
  url?: string;
  morePost?: boolean;
  post_id: string;
}

export const PostImage = ({ url, morePost, post_id }: PostProps) => {
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
        onClick={() => navigate(`/mypage/detail/${post_id}`)}
      ></div>
    );
  }
};
