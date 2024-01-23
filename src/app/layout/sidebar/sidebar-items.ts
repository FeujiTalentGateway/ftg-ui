import { RouteInfo } from './sidebar-metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: 'MENU',
    title: 'MENU',
    modulename: 'MENU',
    iconType: '',
    icon: '',
    class: '',
    role: [],
    submenu: [],
  },

  //Admin Module
  {
    path: '',
    title: 'PaperManagement',
    modulename: 'PaperManagement',
    iconType: 'father',
    icon: 'fa-solid fa-pen',
    class: 'menu-toggle',
    role: ['Admin', 'invigilator'],
    submenu: [],
  },

  {
    path: '',
    title: 'UserManagement',
    modulename: 'UserManagement',
    iconType: 'father',
    icon: 'fa-solid fa-users',
    class: 'menu-toggle',
    role: ['Admin'],
    submenu: [],
  },
  {
    path: '',
    title: 'RoleManagement',
    modulename: 'RoleManagement',
    iconType: 'father',
    icon: 'fa-solid fa-gears',
    class: 'menu-toggle',
    role: ['Admin'],
    submenu: [],
  },

  {
    path: '',
    title: 'ResultManagement',
    modulename: 'ResultManagement',
    iconType: 'father',
    icon: 'fa-solid fa-square-poll-vertical',
    class: 'menu-toggle',
    role: ['Admin', 'invigilator'],
    submenu: [],
  },

  //invigilator Module

  {
    path: '',
    title: 'ExamModule',
    modulename: 'ExamModule',
    iconType: 'father',
    icon: 'fa-regular fa-clock',
    class: 'menu-toggle',
    role: ['invigilator', 'Admin'],
    submenu: [],
  },

  //User Modules

  {
    path: '',
    title: 'My Exams',
    modulename: 'My Exams',
    iconType: 'father',
    icon: 'fa-solid fa-file-invoice',
    class: 'menu-toggle',
    role: ['user'],
    submenu: [],
  },
  //Common Module

  {
    path: '',
    title: 'Profile',
    modulename: 'Profile',
    iconType: 'father',
    icon: 'fa-solid fa-user',
    class: 'menu-toggle',
    role: ['Admin', 'invigilator', 'user'],
    submenu: [],
  },
  {
    path: '',
    title: 'Settings',
    modulename: 'Settings',
    iconType: 'father',
    icon: 'fa-solid fa-wrench',
    class: 'menu-toggle',
    role: ['Admin', 'invigilator', 'user'],
    submenu: [],
  },
];
