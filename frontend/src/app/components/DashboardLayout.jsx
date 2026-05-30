import { useState } from "react";
import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";
import { TopNav } from "./TopNav";
export function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (<div className="flex h-screen bg-background overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)}/>
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopNav onMenuClick={() => setSidebarOpen(true)}/>
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>);
}
