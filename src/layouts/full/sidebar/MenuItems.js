import { IconLayoutDashboard } from "@tabler/icons-react";

import { uniqueId } from "lodash";

import {
  IconBook2,
  IconCategory,
  IconCurrencyDollar,
  IconGift,
  IconHandRock,
  IconMessages,
  IconPackage,
  IconPhoto,
  IconPhotoEdit,
  IconQuestionMark,
  IconSettings,
  IconShoppingCart,
  IconUserHeart,
  IconUsers,
  IconWriting,
} from "@tabler/icons-react";

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
    subheader: "Content Management",
  },
  {
    id: uniqueId(),
    title: "Blog Posts",
    icon: IconWriting,
    href: "/blog-posts",
  },
  {
    id: uniqueId(),
    title: "Blog Categories",
    icon: IconCategory,
    href: "/blog-categories",
  },
  {
    id: uniqueId(),
    title: "Gallery Posts",
    icon: IconPhoto,
    href: "/gallery-posts",
  },
  {
    id: uniqueId(),
    title: "Gallery Categories",
    icon: IconPhotoEdit,
    href: "/gallery-categories",
  },

  {
    navlabel: true,
    subheader: "Teachings",
  },
  {
    id: uniqueId(),
    title: "Teachings",
    icon: IconBook2,
    href: "/teachings",
  },
  {
    id: uniqueId(),
    title: "Teaching Categories",
    icon: IconCategory,
    href: "/teaching-categories",
  },
  // {
  //   id: uniqueId(),
  //   title: "Teaching Sales",
  //   icon: IconShoppingCart,
  //   href: "/teaching-sales",
  // },

  {
    navlabel: true,
    subheader: "Services",
  },
  {
    id: uniqueId(),
    title: "Services",
    icon: IconSettings,
    href: "/services",
  },
  {
    id: uniqueId(),
    title: "Service Categories",
    icon: IconCategory,
    href: "/service-categories",
  },

  {
    navlabel: true,
    subheader: "Community Engagement",
  },
  {
    id: uniqueId(),
    title: "Feedbacks",
    icon: IconMessages,
    href: "/feedbacks",
  },
  {
    id: uniqueId(),
    title: "FAQs",
    icon: IconQuestionMark,
    href: "/frequently-asked-questions",
  },
  {
    id: uniqueId(),
    title: "Prayer Requests",
    icon: IconHandRock,
    href: "/prayer-requests",
  },
  {
    id: uniqueId(),
    title: "Visitors",
    icon: IconUsers,
    href: "/visitors-applications",
  },

  {
    navlabel: true,
    subheader: "Partnership & Support",
  },
  {
    id: uniqueId(),
    title: "Partners",
    icon: IconUserHeart,
    href: "/partners",
  },
  // {
  //   id: uniqueId(),
  //   title: "Gifts",
  //   icon: IconGift,
  //   href: "/gifts",
  // },
  {
    id: uniqueId(),
    title: "Subscriptions",
    icon: IconPackage,
    href: "/subscriptions",
  },
  {
    id: uniqueId(),
    title: "Payments",
    icon: IconCurrencyDollar,
    href: "/payments",
  },

  {
    navlabel: true,
    subheader: "System Utilities",
  },
  {
    id: uniqueId(),
    title: "Packages",
    icon: IconPackage,
    href: "/packages",
  },
];

export default Menuitems;
