import styled from "styled-components";
import Content from "../../components/contents";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

function Home() {
  return (
    <Container>
      <Content />
    </Container>
  );
}

export default Home;
