import { useCallback, useEffect } from "react";

import { SidebarContent } from "../router";
import Sidebar from "../components/Sidebar";

import { getCurrentUserInfo } from "../api/login";
import { useRouter } from "../hooks/useRouter";

import { useRecoilState } from "recoil";
import { AdminRole } from "../types/user";
import { UserAtom } from "../atoms/user";

interface GeneralLayoutProps {
  children: React.ReactNode;
  isAdminPage?: boolean;
}

const GeneralLayout: React.FC<GeneralLayoutProps> = ({
  children,
  isAdminPage,
}) => {
  const [userProfile, setUserProfile] = useRecoilState(UserAtom);
  const { routeTo } = useRouter();

  const fetchUserProfile = useCallback(async () => {
    // 페이지 이동시마다 로그인 여부 확인
    const userInfoRes = await getCurrentUserInfo();

    if (userInfoRes === null) {
      routeTo("/login");
      return;
    }
    setUserProfile(userInfoRes);
  }, []);

  useEffect(() => {
    fetchUserProfile();
  }, [children]);

  // 응답받은 user의 userInfo.roles가 비어있다면 아무 권한없는 user 이므로 로그인페이지로 이동
  if (userProfile?.userInfo.roles.length === 0) {
    routeTo("/login");
    return <></>;
  }

  if (isAdminPage && !userProfile?.userInfo.roles.includes(AdminRole)) {
    routeTo("/page-a");
    return <></>;
  }

  if (userProfile === null) return <div>loading...</div>;

  return (
    <div className="general-layout">
      <Sidebar sidebarContent={SidebarContent} />
      <div className="general-layout__body">{children}</div>
    </div>
  );
};

export default GeneralLayout;
