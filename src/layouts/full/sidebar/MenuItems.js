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
    id: uniqueId(),
    title: "Payments",
    icon: IconTypography,
    href: "/payments",
  },

  {
    navlabel: true,
    subheader: "Teaching",
  },

  {
    id: uniqueId(),
    title: "Teaching Categories",
    icon: IconTypography,
    href: "/teaching-categories",
  },
  {
    id: uniqueId(),
    title: "Teachings",
    icon: IconTypography,
    href: "/teachings",
  },
  {
    id: uniqueId(),
    title: "Teaching Sales",
    icon: IconTypography,
    href: "/teaching-sales",
  },

  {
    navlabel: true,
    subheader: "Blogs",
  },

  {
    id: uniqueId(),
    title: "Blog Posts",
    icon: IconTypography,
    href: "/blog-posts",
  },
  {
    id: uniqueId(),
    title: "Blog Categories",
    icon: IconTypography,
    href: "/blog-categories",
  },

  {
    navlabel: true,
    subheader: "Services",
  },

  {
    id: uniqueId(),
    title: "Services",
    icon: IconTypography,
    href: "/services",
  },
  {
    id: uniqueId(),
    title: "Service Categories",
    icon: IconTypography,
    href: "/service-categories",
  },

  {
    navlabel: true,
    subheader: "Gallery",
  },

  {
    id: uniqueId(),
    title: "Gallery Posts",
    icon: IconTypography,
    href: "/gallery-posts",
  },
  {
    id: uniqueId(),
    title: "Gallery Categories",
    icon: IconTypography,
    href: "/gallery-categories",
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
