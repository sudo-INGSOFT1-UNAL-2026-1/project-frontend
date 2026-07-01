import { NavLink } from "react-router-dom";

import { sidebarItems } from "../constants/sidebarItems";
import { canAccess } from "../utils/authorization";


export default function Sidebar() {
    
    return (
        <aside>
            <nav>
                <ul>
                    {sidebarItems.map((item) => {
                        if (item.permission && !canAccess(item.permission)) {
                            return null;
                        }
                        return (
                            <li key={item.path}>
                                <NavLink to={item.path}>{item.label}</NavLink>
                            </li>
                        ); 
                    })}
                </ul>
            </nav>
        </aside>
    );
}