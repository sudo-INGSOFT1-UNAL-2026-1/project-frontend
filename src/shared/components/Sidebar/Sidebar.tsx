import { NavLink } from "react-router-dom";

import { canAccess } from "../../utils/authorization";

import { sidebarItems } from "./sidebarItems";

import "./Sidebar.css";

export default function Sidebar() {
    return (
        <aside className="sidebar">
        <div className="sidebar__brand">
            <h2 className="sidebar__title">
            UNERP
            </h2>

            <span className="sidebar__subtitle">
            Sistema ERP
            </span>
        </div>

        <nav className="sidebar__nav">
            <ul className="sidebar__list">
            {sidebarItems.map((item) => {
                if (
                item.permission &&
                !canAccess(item.permission)
                ) {
                return null;
                }

                return (
                <li
                    key={item.path}
                    className="sidebar__item"
                >
                    <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                        [
                        "sidebar__link",
                        isActive &&
                            "sidebar__link--active",
                        ]
                        .filter(Boolean)
                        .join(" ")
                    }
                    >
                    <span className="sidebar__icon">
                        {item.icon}
                    </span>

                    <span className="sidebar__label">
                        {item.label}
                    </span>
                    </NavLink>
                </li>
                );
            })}
            </ul>
        </nav>
        </aside>
    );
}