import { StyledFab } from "./styled";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export const Fab = () => {
  const navigate = useNavigate();
  return (
    <StyledFab onClick={() => navigate("/write")}>
      <PlusOutlined />
    </StyledFab>
  );
};
