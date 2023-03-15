import { useCallback, useEffect, useState } from "react";

import Sidebar from "./Sidebar";
import { SidebarContent } from "../router";

import { getCurrentUserInfo } from "../api/login";
import { useRouter } from "../hooks/useRouter";

import { User } from "../types/user";

interface GeneralLayoutProps {
  children: React.ReactNode;
}

const GeneralLayout: React.FC<GeneralLayoutProps> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const { routeTo } = useRouter();

  const fetchUserProfile = useCallback(async () => {
    // 페이지 이동시마다 로그인 여부 확인
    const userInfoRes = await getCurrentUserInfo();

    if (userInfoRes) {
      setUserProfile(userInfoRes);
    } else {
      routeTo("/login");
    }
  }, []);

  useEffect(() => {
    fetchUserProfile();
  }, [children]);

  if (!userProfile) return <div>loading...</div>;

  return (
    <div className="general-layout">
      <Sidebar sidebarContent={SidebarContent} userProfile={userProfile} />
      <div className="general-layout__body">{children}</div>
    </div>
  );
};

export default GeneralLayout;
