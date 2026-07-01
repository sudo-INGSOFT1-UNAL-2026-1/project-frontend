import { Outlet } from "react-router-dom";

import Header  from "./Header";
import Sidebar from "../Sidebar";

export default function Layout() {
    return (
        <div className="layout">
            <Header />
            <div className="layout-content">
                <Sidebar />
                <main className="page-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}