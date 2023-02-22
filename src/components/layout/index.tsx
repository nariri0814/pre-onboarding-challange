import styled from "styled-components";

import Header from "./Header";
import SideBar from "./SideBar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <Header />
      <MainBox>
        <SideBar />
        <Main>{children}</Main>
      </MainBox>
    </Container>
  );
}

export default Layout;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const MainBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const Main = styled.div`
  width: 70%;
`;
