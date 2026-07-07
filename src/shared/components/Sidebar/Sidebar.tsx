import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import {
    PanelLeftClose,
    PanelLeftOpen,
} from "lucide-react";

import SidebarItem from "./SidebarItem";
import { sidebarItems } from "./sidebarItems";

import "./Sidebar.css";

const STORAGE_KEY = "sidebar-collapsed";

function findExpandedParents(
    items: typeof sidebarItems,
    pathname: string,
    parents: string[] = []
): string[] {

    for (const item of items) {

        if (
            item.path &&
            pathname.startsWith(item.path)
        ) {
            return parents;
        }

        if (item.children?.length) {

            const result = findExpandedParents(
                item.children,
                pathname,
                [...parents, item.id]
            );

            if (result.length) {
                return result;
            }

        }

    }

    return [];

}

export default function Sidebar() {

    const location = useLocation();

    const [collapsed, setCollapsed] = useState(
        () =>
            localStorage.getItem(
                STORAGE_KEY
            ) === "true"
    );

    const [expandedItems, setExpandedItems] =
        useState<string[]>([]);

    useEffect(() => {

        localStorage.setItem(
            STORAGE_KEY,
            String(collapsed)
        );

    }, [collapsed]);

    useEffect(() => {

        setExpandedItems(
            findExpandedParents(
                sidebarItems,
                location.pathname
            )
        );

    }, [location.pathname]);

    const visibleItems = useMemo(
        () => sidebarItems,
        []
    );

    function toggleItem(id: string) {

        setExpandedItems((current) => {

            if (current.includes(id)) {

                return current.filter(
                    (item) => item !== id
                );

            }

            const topLevelIds =
                sidebarItems.map(
                    (item) => item.id
                );

            const isTopLevel =
                topLevelIds.includes(id);

            if (isTopLevel) {

                return [
                    ...current.filter(
                        (item) =>
                            !topLevelIds.includes(
                                item
                            )
                    ),
                    id,
                ];

            }

            return [
                ...current,
                id,
            ];

        });

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
                        setCollapsed(
                            (value) => !value
                        )
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