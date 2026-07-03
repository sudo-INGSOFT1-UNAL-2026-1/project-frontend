import { useEffect, useMemo, useState } from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

import SidebarItem from "./SidebarItem";
import { sidebarItems } from "./sidebarItems";

import "./Sidebar.css";

const STORAGE_KEY = "sidebar-collapsed";

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(() => {
        return localStorage.getItem(STORAGE_KEY) === "true";
    });

    const [expandedItems, setExpandedItems] = useState<string[]>([]);

    useEffect(() => {
        localStorage.setItem(
            STORAGE_KEY,
            String(collapsed)
        );
    }, [collapsed]);

    const visibleItems = useMemo(
        () => sidebarItems,
        []
    );

    function toggleItem(id: string) {
        setExpandedItems((current) =>
            current.includes(id)
                ? current.filter((item) => item !== id)
                : [...current, id]
        );
    }

    return (
        <aside
            className={[
                "sidebar",
                collapsed &&
                    "sidebar--collapsed",
            ]
                .filter(Boolean)
                .join(" ")}
        >
            <header className="sidebar__header">
                {!collapsed && (
                    <div className="sidebar__brand">
                        <h2 className="sidebar__title">
                            UNERP
                        </h2>

                        <span className="sidebar__subtitle">
                            Sistema ERP
                        </span>
                    </div>
                )}

                <button
                    type="button"
                    className="sidebar__toggle"
                    onClick={() =>
                        setCollapsed((value) => !value)
                    }
                    aria-label={
                        collapsed
                            ? "Expandir menú"
                            : "Contraer menú"
                    }
                >
                    {collapsed ? (
                        <PanelLeftOpen size={20} />
                    ) : (
                        <PanelLeftClose size={20} />
                    )}
                </button>
            </header>

            <nav className="sidebar__nav">
                <ul className="sidebar__list">
                    {visibleItems.map((item) => (
                        <SidebarItem
                            key={item.id}
                            item={item}
                            collapsed={collapsed}
                            expanded={expandedItems.includes(
                                item.id
                            )}
                            onToggle={toggleItem}
                        />
                    ))}
                </ul>
            </nav>
        </aside>
    );
}