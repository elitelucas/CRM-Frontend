/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";

import { toAbsoluteUrl, checkIsActive, getMenuItemVisible } from "../../../../_helpers";
import items from "../../../../../lists";
import { shallowEqual, useSelector } from "react-redux";
export function AsideMenuList({ layoutProps }) {
  const { auth } = useSelector(
    ({ auth }) => ({
      auth: auth.user,
    }),
    shallowEqual
  );
  const location = useLocation();
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu &&
      "menu-item-active"} menu-item-open menu-item-not-hightlighted`
      : "";
  };

  return (
    <>
      {/* begin::Menu Nav */}
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        {
          items.map((ele, key) => (
            ele.hasChildren ? (
              <li
                className={`menu-item menu-item-submenu ${getMenuItemActive(
                  ele.path,
                  ele.hasChildren
                )}`}
                aria-haspopup="true"
                data-menu-toggle="hover"
                key={key}
              >
                <NavLink className="menu-link menu-toggle" to={ele.path}>
                  <span className="svg-icon menu-icon">
                    <ele.icon />
                  </span>
                  <span className="menu-text">{ele.label}</span>
                  <i className="menu-arrow" />
                </NavLink>
                <div className="menu-submenu ">
                  <i className="menu-arrow" />
                  <ul className="menu-subnav">
                    <li className="menu-item  menu-item-parent" aria-haspopup="true">
                      <span className="menu-link">
                        <span className="menu-text">{ele.label}</span>
                      </span>
                    </li>

                    {/*begin::2 Level*/}
                    {
                      ele.children.map((ele1, key1) => {
                        if (getMenuItemVisible(ele1, auth))
                          return (
                            <li
                              className={`menu-item ${getMenuItemActive(ele1.path)}`}
                              aria-haspopup="true"
                              key={key1}
                            >
                              <NavLink className="menu-link" to={ele1.path}>
                              <span className="svg-icon menu-icon">
                                <ele1.icon />
                              </span>
                                <span className="menu-text">{ele1.label}</span>
                              </NavLink>
                            </li>
                          )
                      })

                    }
                  </ul>
                </div>
              </li>
            ) : (
              getMenuItemVisible(ele, auth) ? (
                  <li
                    className={`menu-item ${getMenuItemActive(ele.path, false)}`}
                    aria-haspopup="true"
                    key={key}
                  >
                    <NavLink className="menu-link" to={ele.path}>
                      <span className="svg-icon menu-icon">
                        <ele.icon />
                      </span>
                      <span className="menu-text">{ele.label}</span>
                    </NavLink>
                  </li>
                ) : ""

              )
          ))
        }

        
      </ul>

      {/* end::Menu Nav */}
    </>
  );
}
