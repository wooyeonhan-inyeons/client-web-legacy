import react from "react";
import { useNavigate } from "react-router-dom";

export const ErrPost = () => {
  const navigate = useNavigate();

  return (
    <div className="postContainer errCont" onClick={(e) => e.stopPropagation()}>
      <div className="header">확인할 수 없는 게시물입니다.</div>
      <div className="divider"></div>
      <div className="button" onClick={() => navigate("/")}>
        돌아가기
      </div>
    </div>
  );
};
