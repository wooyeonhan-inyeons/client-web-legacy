import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Header } from "../../../components/Header";
import { HEADER_FN } from "../../../constants";
import { recoil_ } from "../../../recoil";
import { StyledWriteContainer } from "./styled";
import { CameraOutlined, PictureOutlined } from "@ant-design/icons";

export const Write = () => {
  const [, setHeader] = useRecoilState(recoil_.headerState);

  const [postImages, setPostImages] = useState([]); // 서버로 보낼 이미지 데이터
  const [detailImages, setDetailImages] = useState<any>([]); // 프리뷰 보여줄 이미지 데이터

  const uploadFile = (event: any) => {
    let fileArr = event.target.files; //  사용자가 선택한 파일들
    setPostImages(Array.from(fileArr)); //
    let fileURLs: any[] = [];
    let filesLength = fileArr.length > 10 ? 10 : fileArr.length; // 최대 10개

    // 프리뷰
    if (detailImages.length !== 0) {
      for (let i = detailImages.length - 1; i < filesLength; i++) {
        let file = fileArr[i];
        let reader = new FileReader();
        reader.onload = () => {
          fileURLs.push(reader.result);
          setDetailImages([...fileURLs]);
        };
        reader.readAsDataURL(file);
      }
    } else
      for (let i = 0; i < filesLength; i++) {
        let file = fileArr[i];
        let reader = new FileReader();
        reader.onload = () => {
          fileURLs.push(reader.result);
          setDetailImages([...fileURLs]);
        };
        reader.readAsDataURL(file);
      }
  };

  useEffect(() => {
    //모달 상태에서 스크롤 막기
    document.body.style.overflow = "hidden";
    setHeader({
      title: "우연 작성하기",
      rightButton1: HEADER_FN.EMPTY,
      rightButton2: HEADER_FN.EMPTY,
    });
    return () => {
      document.body.style.overflow = "auto";
      setHeader({
        title: "",
        vis_goBack: false,
        rightButton1: HEADER_FN.ALARM,
        rightButton2: HEADER_FN.MYPAGE,
      });
    };
  }, []);

  return (
    <>
      <Header vis_goBack={true} />
      <StyledWriteContainer>
        <div className="inputSection">
          <div className="subHead">우연한 발견을 공유해요</div>
          <div className="noti">
            <div>
              <PictureOutlined /> {detailImages.length} / 10
            </div>
            <div className="divider"></div>
            <div>사진을 터치하여 삭제</div>
          </div>
          <label htmlFor="file1">
            <CameraOutlined /> 사진 선택하기
            <input
              type="file"
              id="file1"
              name="file1"
              accept="image/*"
              multiple
              onChange={uploadFile}
            />
          </label>
        </div>
        {detailImages.length !== 0 && (
          <div className="previewContainer">
            {detailImages.map((url: string, index: number) => {
              return (
                <img
                  alt="미리보기"
                  key={index}
                  src={url}
                  onClick={() =>
                    setDetailImages(
                      detailImages.filter((item: any) => item !== url)
                    )
                  }
                />
              );
            })}
          </div>
        )}
        <div className="inputSection">
          <textarea placeholder="어떤 일이 일어났나요?"></textarea>
        </div>
        <div className="inputSection submit">
          <div className="button">취소</div>
          <div className="button submit">작성하기</div>
        </div>
      </StyledWriteContainer>
    </>
  );
};
