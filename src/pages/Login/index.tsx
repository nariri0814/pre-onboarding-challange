import styled from "styled-components";
import LoginForm from "../../components/loginForm";

function Login(setIsLogged: any) {
  return (
    <Container>
      <LoginForm setIsLogged={setIsLogged} />
    </Container>
  );
}

export default Login;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
