import { createBrowserRouter } from "react-router-dom";
import { Router as RemixRouter } from "@remix-run/router/dist/router";

import GeneralLayout from "./layout/GeneralLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PageA from "./pages/PageA";
import PageB from "./pages/PageB";
import PageC from "./pages/PageC";

import { SidebarElement } from "./types/sidebar";

interface RouterElement {
  id: number;
  path: string;
  label: string;
  element: React.ReactNode;
  withAuth?: boolean;
}
const routerData: RouterElement[] = [
  {
    id: 0,
    path: "/",
    label: "Home",
    element: <Home />,
    withAuth: false,
  },
  {
    id: 1,
    path: "/login",
    label: "Login",
    element: <Login />,
    withAuth: false,
  },
  {
    id: 2,
    path: "/page-a",
    label: "page-a",
    element: <PageA />,
    withAuth: true,
  },
  {
    id: 3,
    path: "/page-b",
    label: "page-b",
    element: <PageB />,
    withAuth: true,
  },
  {
    id: 4,
    path: "/page-c",
    label: "page-c",
    element: <PageC />,
    withAuth: true,
  },
];

// 인증이 필요한 페이지들은 layout으로 감싸서 전달
export const routers: RemixRouter = createBrowserRouter(
  routerData.map((router: RouterElement) => {
    if (router.withAuth) {
      return {
        path: router.path,
        element: <GeneralLayout>{router.element}</GeneralLayout>,
      };
    } else {
      return {
        path: router.path,
        element: router.element,
      };
    }
  })
);

export const SidebarContent: SidebarElement[] = routerData.reduce(
  (prev, router) => {
    if (!router.withAuth) return prev;

    return [
      ...prev,
      {
        id: router.id,
        path: router.path,
        label: router.label,
      },
    ];
  },
  [] as SidebarElement[]
);
