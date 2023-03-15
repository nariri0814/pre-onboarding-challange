import { useRouter } from "../hooks/useRouter";
import { SidebarElement } from "../types/sidebar";
import { User } from "../types/user";

interface SidebarProps {
  sidebarContent: SidebarElement[];
  userProfile: User | null;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarContent, userProfile }) => {
  const { currentPath, routeTo } = useRouter();

  const sidebarMenuClickHandler = (path: string) => {
    routeTo(path);
  };
  return (
    <div className="sidebar">
      <h3 className="sidebar-title">실습 3</h3>
      <ul>
        {sidebarContent.map((element) => {
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
            {userProfile.userInfo.name}님 환영합니다.
          </div>
        ) : (
          <div>로그인이 필요합니다.</div>
        )}
      </div>
    </div>
  );
};
export default Sidebar;
