import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { recoil_ } from "../../../../../recoil";
import { deletePost } from "../../../../Write/api";
import { StyledDialog } from "./styled";
import React, { useEffect, useState } from 'react';
import { getReport } from "../api";
interface DialogPropType {
  isOwner: boolean;
  post_id: string;
}
export const Dialog = ({ isOwner, post_id }: DialogPropType) => {
  const [, setDialogOpen] = useRecoilState(recoil_.detailDialogState);
  const navigate = useNavigate();
  const onReport = (report_type: number, post_id: string) => {
    getReport(report_type, post_id)
    .then((res) => console.log("ㅇㅇ으앙", res));
  }
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
            onClick={() =>
              deletePost(post_id).then(() => (window.location.href = "/"))
            }
          >
            삭제합니다.
          </div>
        )}
        <div className="button" onClick={()=> onReport(0, post_id)}>신고합니다.</div>
        <div className="button" onClick={() => setDialogOpen(false)}>
          닫기
        </div>
      </div>
    </StyledDialog>
  );
};
