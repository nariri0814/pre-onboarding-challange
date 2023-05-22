# Wanted Pre-onboarding FE 로그인 실습


## CORS

로컬에서 CORS 요청을 허용할 수 있는 브라우저 페이지를 연 뒤, 해당 페이지에서 클라이언트를 실행하여 실습을 진행


## API 스펙
서버에서 다음과 같은 API 제공

1. 로그인 (POST /auth/login)

  body에 username과 password를 담아 전송합니다. 즉, 다음과 같이 호출합니다.
 
    const args = {
      username: "blue",
      password: "1234!@#$",
    };

    const loginRes = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        credentials: "include", // <- 중요! 세션 방식 로그인을 위해 꼭 설정해 주세요.
      },
      body: JSON.stringify(args),
    });

  로그인 성공시 세션에 유저정보 저장
  
  성공시 세션 생성 -> 별도 인증없이 /profile을 통해 유저정보 가져올 수 있음
  



2. 유저정보 가져오기 (GET /profile)

  세션에 저장된 유저정보 반환
  
  반환하는 데이터 타입은 다음과 같습니다.
  
      interface User {
        userId: number;
        username: string;
        userInfo : {
          name: blueStragglr;
          roles: ["user", "admin"];
        };
      };




3. 모든 유저의 item 가져오기 (GET /all-items, admin 전용)

  세션에 저장된 유저가 admin일 때만 호출할 수 있음
  
  반환하는 데이터 타입은 다음과 같습니다.
  
      export interface Item {
        id: number,
        owner: {
          userId: number;
        },
        content: {
          title: string
          body: string
        }
      }
      
      
      
      
4. 로그아웃 (POST, /logout)

  현재 유저가 로그인되어 있는 세션을 destroy합니다.
