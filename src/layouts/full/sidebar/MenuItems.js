import {
  IconCopy,
  IconLayoutDashboard,
  IconTypography,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/dashboard",
  },
  {
    navlabel: true,
    subheader: "Utilities",
  },
  {
    id: uniqueId(),
    title: "Packages",
    icon: IconCopy,
    href: "/packages",
  },
  {
    id: uniqueId(),
    title: "Teachings",
    icon: IconTypography,
    href: "/teachings",
  },
  {
    id: uniqueId(),
    title: "Partners",
    icon: IconTypography,
    href: "/partners",
  },
  {
    id: uniqueId(),
    title: "Subscriptions",
    icon: IconTypography,
    href: "/subscriptions",
  },

  {
    navlabel: true,
    subheader: "Auth",
  },

  {
    id: uniqueId(),
    title: "Payments",
    icon: IconTypography,
    href: "/payments",
  },
  // {
  //   id: uniqueId(),
  //   title: "Login",
  //   icon: IconLogin,
  //   href: "/auth/login",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Register",
  //   icon: IconUserPlus,
  //   href: "/auth/register",
  // },
  // {
  //   navlabel: true,
  //   subheader: "Extra",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Icons",
  //   icon: IconMoodHappy,
  //   href: "/icons",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Sample Page",
  //   icon: IconAperture,
  //   href: "/sample-page",
  // },
];

export default Menuitems;
