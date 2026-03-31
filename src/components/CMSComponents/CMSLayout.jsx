import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, Settings, ArrowLeft, BookOpen, FolderOpen, LogOut, User } from 'lucide-react';
import { logout } from '../../services/auth';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const CMSLayout = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
            toast.success('Logged out successfully');
            navigate('/cms/login');
        } catch (error) {
            console.error('Logout error:', error);
            navigate('/cms/login');
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex">
            {/* Sidebar */}
            <aside className="w-64 bg-[#111] border-r border-neutral-800 flex flex-col">
                {/* Logo */}
                <div className="p-4 border-b border-neutral-800">
                    <h1 className="text-xl font-bold text-white flex items-center gap-2">
                        <LayoutDashboard className="w-6 h-6 text-yellow-400" />
                        <span>CMS</span>
                    </h1>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4">
                    <ul className="space-y-2">
                        <li>
                            <NavLink
                                to="/cms"
                                end
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                        ? 'bg-yellow-400/10 text-yellow-400'
                                        : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
                                    }`
                                }
                            >
                                <LayoutDashboard className="w-5 h-5" />
                                <span>Dashboard</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/cms/courses"
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                        ? 'bg-yellow-400/10 text-yellow-400'
                                        : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
                                    }`
                                }
                            >
                                <BookOpen className="w-5 h-5" />
                                <span>Courses</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/cms/settings"
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                        ? 'bg-yellow-400/10 text-yellow-400'
                                        : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
                                    }`
                                }
                            >
                                <Settings className="w-5 h-5" />
                                <span>Settings</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>


                {/* User Info & Logout */}
                <div className="p-4 border-t border-neutral-800 space-y-2">
                    {/* User Info */}
                    {user && (
                        <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-neutral-800/50">
                            <User className="w-5 h-5 text-yellow-400" />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">{user.username}</p>
                                <p className="text-xs text-neutral-400 truncate">{user.email}</p>
                            </div>
                        </div>
                    )}

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-400 hover:bg-red-500/10 hover:text-red-500 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                    </button>

                    {/* Back to Site */}
                    <a
                        href="/"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Back to Site</span>
                    </a>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default CMSLayout;
