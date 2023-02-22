import { Link } from "react-router-dom";
import styled from "styled-components";

function SideBarContent() {
  return (
    <Container>
      <Link style={{ textDecoration: "none", color: "#000" }} to={"/pageA"}>
        Page A
      </Link>
      <Link style={{ textDecoration: "none", color: "#000" }} to={"/pageB"}>
        Page B
      </Link>
      <Link style={{ textDecoration: "none", color: "#000" }} to={"/pageC"}>
        Page C
      </Link>
    </Container>
  );
}

export default SideBarContent;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: 20px;
  margin-top: 30px;
  margin-left: 40px;
  gap: 40px;
`;
