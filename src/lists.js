import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import AccountTree from "@material-ui/icons/AccountTree";
import Public from "@material-ui/icons/Public";
import Ballot from "@material-ui/icons/Ballot";
import Group from "@material-ui/icons/Group";
import Person from "@material-ui/icons/Person";
import Dashboard from "@material-ui/icons/Dashboard";
import { toAbsoluteUrl, checkIsActive } from "./_metronic/_helpers";


var items = [
  {
    path: "/users",
    icon: AccountTree,
    label: "Users",
    hasChildren: true,
    children: [
      {
        path: "/users/countries",
        icon: Public,
        label: "Countries",
        hasChildren: false,
        c_role: false,
        d_role: false,
        a_role: false,
        m_role: false
      },
      {
        path: "/users/departments",
        icon: Ballot,
        label: "Departments",
        hasChildren: false,
        c_role: false,
        d_role: false,
        a_role: false,
        m_role: false
      },
      {
        path: "/users/teams",
        icon: Group,
        label: "Teams",
        hasChildren: false,
        c_role: true,
        d_role: true,
        a_role: true,
        m_role: true
      },
      {
        path: "/users/users",
        icon: Person,
        label: "Users",
        hasChildren: false,
        c_role: true,
        d_role: true,
        a_role: true,
        m_role: true
      },
    ]
  },
  {
    path: "/dashboard",
    icon: Dashboard,
    label: "Dashboard",
    hasChildren: false,
    c_role: true,
    d_role: true,
    a_role: true,
    m_role: true
  }

];
export default items;
