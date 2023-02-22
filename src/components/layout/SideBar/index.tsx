import styled from "styled-components";
import SideBarContent from "./SideBarContent";

function SideBar() {
  return (
    <Container>
      <SideBarBox>
        <SideBarContent />
      </SideBarBox>
    </Container>
  );
}

export default SideBar;

const Container = styled.div`
  width: 20%;
  height: 100%;
`;

const SideBarBox = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid #ddd;
  border-top: none;
  display: flex;
`;
