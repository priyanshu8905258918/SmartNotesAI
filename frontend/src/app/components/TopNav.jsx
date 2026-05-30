import { useState } from "react";
import { Menu, Search, Bell, ChevronDown, Settings, LogOut, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router";
const PAGE_TITLES = {
    "/dashboard": "Dashboard",
    "/dashboard/notes/new": "Create Note",
    "/dashboard/search": "Search Notes",
};
function getPageTitle(pathname) {
    if (pathname.startsWith("/dashboard/notes/") && pathname !== "/dashboard/notes/new") {
        return "Note Details";
    }
    return PAGE_TITLES[pathname] ?? "Dashboard";
}
export function TopNav({ onMenuClick }) {
    const [profileOpen, setProfileOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const title = getPageTitle(location.pathname);
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchValue.trim()) {
            navigate(`/dashboard/search?q=${encodeURIComponent(searchValue.trim())}`);
        }
    };
    return (<header className="h-14 bg-white border-b border-border flex items-center gap-4 px-4 sticky top-0 z-10">
      <button onClick={onMenuClick} className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors">
        <Menu className="w-4 h-4 text-[#64748B]"/>
      </button>

      <h1 className="text-[#0F172A] hidden lg:block">{title}</h1>

      <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md mx-auto lg:mx-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]"/>
          <input type="text" placeholder="Search notes…" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className="w-full h-9 pl-9 pr-4 bg-[#F8FAFC] border border-border rounded-lg text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#4F6EF5]/20 focus:border-[#4F6EF5] transition-all"/>
        </div>
      </form>

      <div className="flex items-center gap-2 ml-auto">
        <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors relative">
          <Bell className="w-4 h-4 text-[#64748B]"/>
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#4F6EF5] rounded-full"/>
        </button>

        <div className="relative">
          {(() => {
            const userString = localStorage.getItem("user");
            const user = userString ? JSON.parse(userString) : { name: "User", email: "" };
            const initials = user.name ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) : "U";
            return (<>
                <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg hover:bg-slate-100 transition-colors">
                  <div className="w-7 h-7 rounded-full bg-[#0F172A] flex items-center justify-center text-white text-xs font-medium">
                    {initials}
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-[#64748B] transition-transform ${profileOpen ? "rotate-180" : ""}`}/>
                </button>

                {profileOpen && (<>
                    <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)}/>
                    <div className="absolute right-0 top-10 w-52 bg-white rounded-xl border border-border shadow-lg z-20 overflow-hidden">
                      <div className="px-4 py-3 border-b border-border">
                        <p className="text-sm font-medium text-[#0F172A]">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                      <div className="py-1">
                        <button className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#0F172A] hover:bg-slate-50 transition-colors">
                          <User className="w-4 h-4 text-[#64748B]"/>
                          Profile
                        </button>
                        <button className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#0F172A] hover:bg-slate-50 transition-colors">
                          <Settings className="w-4 h-4 text-[#64748B]"/>
                          Settings
                        </button>
                      </div>
                      <div className="py-1 border-t border-border">
                        <button onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("user");
                        navigate("/login");
                    }} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors">
                          <LogOut className="w-4 h-4"/>
                          Sign out
                        </button>
                      </div>
                    </div>
                  </>)}
              </>);
        })()}
        </div>
      </div>
    </header>);
}
