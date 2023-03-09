import { useState } from "react";
import styled from "styled-components";

type LoginSuccessMessage = "SUCCESS";
type LoginFailMessage = "FAIL";

interface LoginResponse {
  message: LoginSuccessMessage | LoginFailMessage;
  token: string;
}

interface UserInfo {
  name: string;
}

interface User {
  username: string;
  password: string;
  userInfo: UserInfo;
}

const users: User[] = [
  {
    username: "blue",
    password: "1234",
    userInfo: { name: "blueStragglr" },
  },
  {
    username: "white",
    password: "1234",
    userInfo: { name: "whiteDwarf" },
  },
  {
    username: "red",
    password: "1234",
    userInfo: { name: "redGiant" },
  },
];

const _secret: string = "1234qwer!@#$";

const login = async (
  username: string,
  password: string
): Promise<LoginResponse | null> => {
  // 올바른 username, password를 입력하면 {message: 'SUCCESS', token: (원하는 문자열)} 를 반환
  const user: User | undefined = users.find((user: User) => {
    return user.username === username && user.password === password;
  });
  return user
    ? {
        message: "SUCCESS",
        token: JSON.stringify({ user: user.userInfo, secret: _secret }),
      }
    : null;
};

const getUserInfo = async (token: string): Promise<UserInfo | null> => {
  const parsedToken = JSON.parse(token);
  if (!parsedToken?.secret || parsedToken.secret !== _secret) return null;

  const loggedUser: User | undefined = users.find((user: User) => {
    if (user.userInfo.name === parsedToken.user.name) return user;
  });

  return loggedUser ? loggedUser.userInfo : null;
};

function LoginForm(setIsLogged: any) {
  const [userInfo, setUserInfo] = useState<UserInfo>({ name: "" });

  const getData = async () => {
    const data = await fetch("./../data.json").then((res) => res.json());
    console.log(data);
  };
  getData();

  const loginSubmitHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    // form 에서 username과 password를 받아 login 함수를 호출
    const formData = new FormData(event.currentTarget);

    const logRes = await login(
      formData.get("username") as string,
      formData.get("password") as string
    );
    if (!logRes) return;

    const userInfo = await getUserInfo(logRes.token);
    if (!userInfo) return;

    setUserInfo(userInfo);
    setIsLogged(true);
  };
  return (
    <Container>
      <h3>LOGIN with Mock API</h3>
      <form onSubmit={loginSubmitHandler}>
        <LoginContents>
          <span>Username:</span>
          <input name="username" type="text" placeholder="blue" />
        </LoginContents>
        <LoginContents>
          <span>Password:</span>
          <input name="password" type="password" />
        </LoginContents>
        <LoginBtn value="Submit" type="submit">
          log in
        </LoginBtn>
      </form>
      <div>
        <h2>User info</h2>
        {JSON.stringify(userInfo)}
      </div>
    </Container>
  );
}

export default LoginForm;

const Container = styled.div`
  text-align: center;
  padding: 36px;
  border: 1px solid #ddd;
  border-radius: 14px;
`;

const LoginContents = styled.div`
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    padding-right: 20px;
  }
  input {
    border: 1px solid #ddd;
    border-radius: 20px;
    padding: 10px 17px;
  }
`;

const LoginBtn = styled.button`
  width: 100%;
  border: none;
  border-radius: 27px;
  background: #000;
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  padding: 15px;
  margin-top: 20px;
`;
