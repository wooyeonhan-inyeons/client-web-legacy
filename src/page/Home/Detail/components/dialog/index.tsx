import { useRecoilState } from "recoil";
import { recoil_ } from "../../../../../recoil";
import { StyledDialog } from "./styled";

export const Dialog = () => {
  const [dialogOpen, setDialogOpen] = useRecoilState(recoil_.detailDialogState);
  return (
    <StyledDialog
      onClick={(e) => {
        e.stopPropagation();
        setDialogOpen(false);
      }}
    >
      <div className="dialogContainer" onClick={(e) => e.stopPropagation()}>
        <div>이 우연을</div>
        <div className="button">삭제합니다.</div>
        <div className="button">신고합니다.</div>
        <div className="button">닫기</div>
      </div>
    </StyledDialog>
  );
};
