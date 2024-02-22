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
    role: ['invigilator'],
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
    role: ['invigilator'],
    submenu: [],
  },


  //User Modules

  {
    path: '',
    title: 'Exams',
    modulename: 'exams',
    iconType: 'feather',
    icon: 'fa-solid fa-file-invoice',
    class: 'menu-toggle',
    role: ['Admin'],
    submenu: [
      {
        path: '/admin/exams/viewExams',
        title: 'View Exams',
        modulename: 'exams',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        role: [''],
        submenu: [],
      },
      {
        path: '/admin/exams/scheduleExam',
        title: 'Schedule Exam',
        modulename: 'exams',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        role: [''],
        submenu: [],
      },
    ],
  },
  {
    path: '',
    title: 'Question Papers',
    modulename: 'questionPapers',
    iconType: 'feather',
    icon: 'fa-solid fa-pen',
    class: 'menu-toggle',
    role: ['Admin'],
    submenu: [
      // {
      //   path: '/admin/questionPapers/viewPapers',
      //   title: 'View Papers',
      //   modulename: 'questionPapers',
      //   iconType: '',
      //   icon: '',
      //   class: 'ml-menu',
      //   role: [''],
      //   submenu: [],
      // },
      // {
      //   path: "/admin/questionPapers/createPaper",
      //   title: "Create Paper",
      //   modulename: "questionPapers",
      //   iconType: "",
      //   icon: "",
      //   class: "ml-menu",
      //   role: [""],
      //   submenu: [],
      // },
      {
        path: '/admin/questionPapers/viewQuestions',
        title: 'View Questions',
        modulename: 'questionPapers',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        role: [''],
        submenu: [],
      },
      {
        path: '/admin/questionPapers/addEditQuestion',
        title: 'Add Questions',
        modulename: 'questionPapers',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        role: [''],
        submenu: [],
      },
      {
        path: '/admin/exams/viewSubjects',
        title: 'Subjects',
        modulename: 'exams',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        role: [''],
        submenu: [],
      },
    ],
  },
  {
    path: '',
    title: 'Results',
    modulename: 'ResultManagement',
    iconType: 'father',
    icon: 'fa-solid fa-square-poll-vertical',
    class: 'menu-toggle',
    role: ['invigilator','admin'],
    submenu: [
      {
        path: '/admin/result/home',
        title: 'Home',
        modulename: 'exams',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        role: [''],
        submenu: [],
      }

    ],
  },
  {
    path: '',
    title: 'My Exams',
    modulename: 'My Exams',
    iconType: 'father',
    icon: 'fa-solid fa-file-invoice',
    class: 'menu-toggle',
    role: ['user'],
    submenu: [
      // {
      //   path: '/user/exam/view-exam',
      //   title: 'List of Exams',
      //   modulename: 'users',
      //   iconType: '',
      //   icon: '',
      //   class: 'ml-menu',
      //   role: [''],
      //   submenu: [],
      // },
      {
        path: '/user/exam/exam-code',
        title: 'Take-exam',
        modulename: 'users',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        role: [''],
        submenu: [],
      },
    ],
  },
  {
    path: '',
    title: 'Users',
    modulename: 'users',
    iconType: 'feather',
    icon: 'fa-solid fa-users',
    class: 'menu-toggle',
    role: ['Admin'],
    submenu: [
      {
        path: '/admin/users/allUsers',
        title: 'All Users',
        modulename: 'users',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        role: [''],
        submenu: [],
      },
      {
        path: '/admin/users/editUser',
        title: 'Edit User',
        modulename: 'users',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        role: [''],
        submenu: [],
      },
    ],
  },
  {
    path: '/admin/profile',
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
