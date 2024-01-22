export interface RouteInfo {
  path: string;
  title: string;
  modulename: string;
  iconType: string;
  icon: string;
  class: string;
  role: string[];
  submenu: RouteInfo[];
  active?: boolean;
}
