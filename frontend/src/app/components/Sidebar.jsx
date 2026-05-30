import { NavLink, useNavigate, Link } from "react-router";
import { LayoutDashboard, FileText, Plus, Search, Info, LogOut, ChevronRight, Sparkles, } from "lucide-react";
const NAV_ITEMS = [
    { to: "/dashboard", label: "Dashboard", Icon: LayoutDashboard, end: true },
    { to: "/dashboard/notes/new", label: "Create Note", Icon: Plus },
    { to: "/dashboard/search", label: "Search Notes", Icon: Search },
    { to: "/about", label: "About", Icon: Info },
];
export function Sidebar({ isOpen, onClose }) {
    const navigate = useNavigate();
    return (<>
      {isOpen && (<div className="fixed inset-0 bg-black/20 z-20 lg:hidden animate-in fade-in-0 duration-300" onClick={onClose}/>)}

      <aside className={`
          fixed top-0 left-0 h-full w-64 bg-white border-r border-border z-30
          flex flex-col transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}>
        <Link to="/" className="flex items-center gap-2.5 px-5 py-5 border-b border-border hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-lg bg-[#0F172A] flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white"/>
          </div>
          <div>
            <span className="text-[#0F172A] font-semibold tracking-tight">SmartNotes</span>
            <span className="text-[#4F6EF5] font-semibold tracking-tight"> AI</span>
          </div>
        </Link>

        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <div className="space-y-0.5">
            {NAV_ITEMS.map(({ to, label, Icon, end }) => (<NavLink key={to} to={to} end={end} onClick={onClose} className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 group ${isActive
                ? "bg-[#F1F5F9] text-[#0F172A] font-medium"
                : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]"}`}>
                {({ isActive }) => (<>
                    <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-[#4F6EF5]" : ""}`}/>
                    <span className="flex-1">{label}</span>
                    {isActive && <ChevronRight className="w-3.5 h-3.5 text-[#CBD5E1]"/>}
                  </>)}
              </NavLink>))}
          </div>

          <div className="mt-6 pt-4 border-t border-border">
            <p className="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wider px-3 mb-2">
              Quick Access
            </p>
            <NavLink to="/dashboard" onClick={onClose} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A] transition-all">
              <FileText className="w-4 h-4"/>
              <span>All Notes</span>
            </NavLink>
          </div>
        </nav>

        <div className="p-4 border-t border-border">
          {(() => {
            const userString = localStorage.getItem("user");
            const user = userString ? JSON.parse(userString) : { name: "User", email: "" };
            const initials = user.name ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) : "U";
            return (<div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-slate-50 cursor-pointer group">
                <div className="w-8 h-8 rounded-full bg-[#0F172A] flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
                  {initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#0F172A] truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
                <button onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    navigate("/login");
                }} className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-red-50" title="Sign out">
                  <LogOut className="w-3.5 h-3.5 text-red-400"/>
                </button>
              </div>);
        })()}
        </div>
      </aside>
    </>);
}
