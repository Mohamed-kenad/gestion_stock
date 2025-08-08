import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Home,Users,Menu,X,Bell,Search,LogOut,Zap,ChevronDown} from 'lucide-react'
import { useAuth } from "@/context/AuthContext"
import { Outlet, useLocation, useNavigate } from "react-router"

const MENU_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: Home, badge: null },
  { id: "employes", label: "Employes", icon: Users, badge: "12" },
]

export default function Layout() {
  const { user } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname.replace("/", "");
  const isActiveTab  = (id) => currentPath === id;

  const handleLogout = async () => {
  }

  const closeSidebar = () => setSidebarOpen(false)
  const openSidebar = () => setSidebarOpen(true)

  const handleTabChange = (tabId) => {
    navigate(`/${tabId}`);
    closeSidebar() 
  }


  const getUserInitials = () => {
    if (!user?.name) return "U"
    return user.name
      .split(" ").map(word => word[0]).join("").toUpperCase().slice(0, 2)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
    {/* Sidebar */}
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-72 bg-white/95 backdrop-blur-xl shadow-2xl border-r border-gray-200/50 transform transition-transform duration-300 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-gray-900">Dashboard</h1>
            <p className="text-xs text-gray-500">v2.0.1</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={closeSidebar}
          className="lg:hidden hover:bg-gray-100"
          aria-label="Close sidebar"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1" role="navigation" aria-label="Main navigation">
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isActiveTab(item.id);

          return (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                active
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
              aria-current={active ? "page" : undefined}
            >
              <div className="flex items-center space-x-3">
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <Badge
                  variant={active ? "secondary" : "outline"}
                  className={`text-xs ${
                    active ? "bg-white/20 text-white border-white/30" : ""
                  }`}
                >
                  {item.badge}
                </Badge>
              )}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="absolute bottom-4 left-4 right-4">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
        >
          <LogOut className="h-4 w-4 mr-3" aria-hidden="true" />
          Logout
        </Button>
      </div>
    </aside>

    {/* Main Content */}
    <div className="lg:ml-72">
      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-200/50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={openSidebar}
              className="lg:hidden hover:bg-gray-100"
              aria-label="Open sidebar"
            >
              <Menu className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-gray-900 capitalize">
                {currentPath || "Dashboard"}
              </h1>
              <p className="text-sm text-gray-500">
                Welcome back, {user?.name || "User"}!
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                aria-hidden="true"
              />
              <input
                type="text"
                placeholder="Search anything..."
                className="pl-10 pr-4 py-2 w-64 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white transition-colors"
                aria-label="Search"
              />
            </div>

            {/* Notifications */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-gray-100"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </Button>
            </div>

            {/* Profile */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-medium">
                  {getUserInitials()}
                </span>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-400 hidden md:block" aria-hidden="true" />
            </div>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="p-6" role="main">
        <Outlet />
      </main>
    </div>

    {/* Mobile Overlay */}
    {sidebarOpen && (
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
        onClick={closeSidebar}
        role="button"
        tabIndex={0}
        aria-label="Close sidebar"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            closeSidebar();
          }
        }}
      />
    )}
  </div>
);
}