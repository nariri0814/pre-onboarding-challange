import styled from "styled-components";
import { Link } from "react-router-dom";

function Header() {
  return (
    <HeaderBox>
      <HeaderText>
        <Link style={{ textDecoration: "none", color: "#000" }} to="/Home">
          Wanted pre-onboarding course
        </Link>
      </HeaderText>
    </HeaderBox>
  );
}

export default Header;

const HeaderBox = styled.div`
  width: 100%;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
`;
const HeaderText = styled.div`
  margin: 20px 25px;
  font-size: 20px;
  font-weight: bold;
  font-style: italic;
`;
