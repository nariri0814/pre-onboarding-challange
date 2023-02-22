import { useLocation } from "react-router-dom";
import styled from "styled-components";

function Content() {
  const page = useLocation();

  return (
    <Container>
      <div>This is a {page.pathname.replace("/", "")}</div>
    </Container>
  );
}

export default Content;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  color: #356eb7;
`;
