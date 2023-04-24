import { useRecoilState } from "recoil";
import { logout } from "../api/login";
import { UserAtom } from "../atoms/user";
import { useRouter } from "../hooks/useRouter";
import { SidebarElement } from "../types/sidebar";
import { AdminRole } from "../types/user";

interface SidebarProps {
  sidebarContent: SidebarElement[];
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarContent }) => {
  const [userProfile, setUserProfile] = useRecoilState(UserAtom);

  const { currentPath, routeTo } = useRouter();

  const sidebarMenuClickHandler = (path: string) => {
    routeTo(path);
  };

  const logoutHandler = async () => {
    await logout();
    setUserProfile(null);
    routeTo("/");
  };

  return (
    <div className="sidebar">
      <h3 className="sidebar-title">실습 3</h3>
      <ul>
        {sidebarContent
          .filter((element) => {
            // 관리자일때 admin user(userProfile.userInfo.roles에 'admin'이 포함됨)에게만 메뉴 보여주기
            return element.isAdminOnly
              ? userProfile?.userInfo.roles.includes("admin")
              : !!userProfile;
          })
          .map((element) => {
            return (
              <li
                key={element.path}
                className={
                  currentPath === element.path
                    ? "sidebar-menu selected"
                    : "sidebar-menu"
                }
                onClick={() => sidebarMenuClickHandler(element.path)}
              >
                {element.label}
              </li>
            );
          })}
      </ul>
      <div>
        {userProfile ? (
          <div className="sidebar-footer">
            {userProfile?.userInfo?.name}
            {userProfile?.userInfo?.roles.includes(AdminRole) ? "(admin)" : ""}
            님 환영합니다.
            <button className={"small"} onClick={logoutHandler}>
              로그아웃
            </button>
          </div>
        ) : (
          <div>로그인이 필요합니다.</div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
