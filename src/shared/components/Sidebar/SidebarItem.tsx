import {
    useEffect,
    useState,
} from "react";
import { ChevronDown } from "lucide-react";
import {
    NavLink,
    useLocation,
} from "react-router-dom";

import { canAccess } from "../../utils/authorization";

import type { SidebarItem as SidebarItemType } from "./types";

interface SidebarItemProps {

    item: SidebarItemType;

    collapsed: boolean;

    expanded: boolean;

    level?: number;

    onToggle: (id: string) => void;

}

export default function SidebarItem({
    item,
    collapsed,
    expanded,
    level = 0,
    onToggle,
}: SidebarItemProps) {

    const location = useLocation();

    const [
        expandedChildren,
        setExpandedChildren,
    ] = useState(false);

    if (
        item.permission &&
        !canAccess(item.permission)
    ) {
        return null;
    }

    const Icon = item.icon;

    const hasChildren =
        (item.children?.length ?? 0) > 0;

    function isItemActive(
        currentItem: SidebarItemType
    ): boolean {

        if (
            currentItem.path &&
            (
                location.pathname ===
                    currentItem.path ||
                location.pathname.startsWith(
                    `${currentItem.path}/`
                )
            )
        ) {
            return true;
        }

        return (
            currentItem.children?.some(
                isItemActive
            ) ?? false
        );

    }

    const isActive =
        isItemActive(item);

    useEffect(() => {

        if (!hasChildren) {
            return;
        }

        const active =
            item.children?.some(
                isItemActive
            ) ?? false;

        if (active) {
            setExpandedChildren(true);
        }

    }, [location.pathname]);

    const isExpanded =
        level === 0
            ? expanded
            : expandedChildren;

    function handleToggle() {

        if (level === 0) {

            onToggle(item.id);

            return;

        }

        setExpandedChildren(
            (current) => !current
        );

    }

    return (

        <li className="sidebar__item">

            {hasChildren ? (

                <>

                    <button
                        type="button"
                        className={[
                            "sidebar__link",
                            isActive &&
                                "sidebar__link--active",
                        ]
                            .filter(Boolean)
                            .join(" ")}
                        onClick={
                            handleToggle
                        }
                    >

                        <span
                            className="sidebar__icon"
                            style={{
                                paddingLeft:
                                    `${level * 12}px`,
                            }}
                        >
                            <Icon size={20} />
                        </span>

                        {!collapsed && (

                            <>

                                <span className="sidebar__label">
                                    {item.label}
                                </span>

                                <ChevronDown
                                    size={18}
                                    className={[
                                        "sidebar__arrow",
                                        isExpanded &&
                                            "sidebar__arrow--expanded",
                                    ]
                                        .filter(Boolean)
                                        .join(" ")}
                                />

                            </>

                        )}

                    </button>

                    {!collapsed &&
                        isExpanded && (

                            <ul className="sidebar__sublist">

                                {item.children!
                                    .filter(
                                        (child) =>
                                            !child.permission ||
                                            canAccess(
                                                child.permission
                                            )
                                    )
                                    .map((child) => (

                                        <SidebarItem
                                            key={
                                                child.id
                                            }
                                            item={
                                                child
                                            }
                                            collapsed={
                                                collapsed
                                            }
                                            expanded={
                                                false
                                            }
                                            level={
                                                level + 1
                                            }
                                            onToggle={
                                                onToggle
                                            }
                                        />

                                    ))}

                            </ul>

                        )}

                </>

            ) : (

                <NavLink
                    to={item.path!}
                    end
                    className={({
                        isActive,
                    }) =>
                        [
                            "sidebar__link",
                            isActive &&
                                "sidebar__link--active",
                        ]
                            .filter(Boolean)
                            .join(" ")
                    }
                >

                    <span
                        className="sidebar__icon"
                        style={{
                            paddingLeft:
                                `${level * 12}px`,
                        }}
                    >
                        <Icon size={20} />
                    </span>

                    {!collapsed && (

                        <span className="sidebar__label">
                            {item.label}
                        </span>

                    )}

                </NavLink>

            )}

        </li>

    );

}

