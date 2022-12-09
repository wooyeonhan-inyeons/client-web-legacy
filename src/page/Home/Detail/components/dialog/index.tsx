import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { recoil_ } from "../../../../../recoil";
import { deletePost } from "../../../../Write/api";
import { StyledDialog } from "./styled";

interface DialogPropType {
  isOwner: boolean;
  post_id: string;
}
export const Dialog = ({ isOwner, post_id }: DialogPropType) => {
  const [, setDialogOpen] = useRecoilState(recoil_.detailDialogState);
  const navigate = useNavigate();

  return (
    <StyledDialog
      onClick={(e) => {
        e.stopPropagation();
        setDialogOpen(false);
      }}
    >
      <div className="dialogContainer" onClick={(e) => e.stopPropagation()}>
        <div className="head">이 우연을</div>
        {isOwner && (
          <div
            className="button delete"
            onClick={() => deletePost(post_id).then(() => navigate("/"))}
          >
            삭제합니다.
          </div>
        )}
        <div className="button">신고합니다.</div>
        <div className="button" onClick={() => setDialogOpen(false)}>
          닫기
        </div>
      </div>
    </StyledDialog>
  );
};
