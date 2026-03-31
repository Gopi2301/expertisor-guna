import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    TrendingUp,
    BookOpen,
    Globe,
    FileText,
    Users,
    Clock,
    Plus,
    ArrowRight,
    Activity
} from 'lucide-react';
import { getAllCourses, getCategories, getLeads } from '../../services/api';
import toast from 'react-hot-toast';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalCourses: 0,
        publishedCourses: 0,
        draftCourses: 0,
        scheduledCourses: 0,
        archivedCourses: 0,
        totalCategories: 0,
        totalLeads: 0
    });
    const [recentCourses, setRecentCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            const [courses, categories, leads] = await Promise.all([
                getAllCourses(),
                getCategories(),
                getLeads()
            ]);

            setStats({
                totalCourses: courses?.length || 0,
                publishedCourses: courses?.filter(c => c.status === 'PUBLISHED').length || 0,
                draftCourses: courses?.filter(c => c.status === 'DRAFT').length || 0,
                scheduledCourses: courses?.filter(c => c.status === 'SCHEDULED').length || 0,
                archivedCourses: courses?.filter(c => c.status === 'ARCHIVED').length || 0,
                totalCategories: categories?.length || 0,
                totalLeads: leads?.length || 0
            });

            // Get 5 most recent courses
            const sorted = courses?.sort((a, b) =>
                new Date(b.updated_at) - new Date(a.updated_at)
            ).slice(0, 5) || [];
            setRecentCourses(sorted);
        } catch (error) {
            toast.error('Failed to load dashboard data');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const StatCard = ({ icon: Icon, label, value, color, link }) => (
        <Link
            to={link}
            className="bg-[#111] border border-neutral-800 rounded-xl p-6 hover:border-neutral-700 transition-colors group"
        >
            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${color}`}>
                    <Icon className="w-6 h-6" />
                </div>
                <ArrowRight className="w-5 h-5 text-neutral-600 group-hover:text-neutral-400 transition-colors" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">{value}</div>
            <div className="text-sm text-neutral-400">{label}</div>
        </Link>
    );

    const QuickAction = ({ icon: Icon, label, link, color }) => (
        <Link
            to={link}
            className={`flex items-center gap-3 p-4 rounded-lg border border-neutral-800 hover:border-neutral-700 transition-colors ${color}`}
        >
            <Icon className="w-5 h-5" />
            <span className="font-medium">{label}</span>
        </Link>
    );

    if (loading) {
        return (
            <div className="p-8 flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
                <p className="text-neutral-400">Welcome back! Here's what's happening with your CMS.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    icon={BookOpen}
                    label="Total Courses"
                    value={stats.totalCourses}
                    color="bg-blue-500/20 text-blue-400"
                    link="/cms/courses"
                />
                <StatCard
                    icon={Globe}
                    label="Published"
                    value={stats.publishedCourses}
                    color="bg-green-500/20 text-green-400"
                    link="/cms/courses"
                />
                <StatCard
                    icon={FileText}
                    label="Drafts"
                    value={stats.draftCourses}
                    color="bg-yellow-500/20 text-yellow-400"
                    link="/cms/courses"
                />
                <StatCard
                    icon={Users}
                    label="Total Leads"
                    value={stats.totalLeads}
                    color="bg-purple-500/20 text-purple-400"
                    link="/cms/courses"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-[#111] border border-neutral-800 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Activity className="w-5 h-5" />
                            Recent Activity
                        </h2>
                        <Link
                            to="/cms/courses"
                            className="text-sm text-yellow-400 hover:text-yellow-300 transition-colors"
                        >
                            View all →
                        </Link>
                    </div>

                    {recentCourses.length === 0 ? (
                        <div className="text-center py-12">
                            <BookOpen className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
                            <p className="text-neutral-400">No recent activity</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {recentCourses.map((course) => (
                                <Link
                                    key={course.id}
                                    to={`/cms/courses/edit/${course.id}`}
                                    className="flex items-center gap-4 p-4 rounded-lg border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/50 transition-colors group"
                                >
                                    <div className="w-12 h-12 rounded-lg bg-neutral-800 flex items-center justify-center overflow-hidden flex-shrink-0">
                                        {course.thumbnail ? (
                                            <img src={course.thumbnail} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                            <BookOpen className="w-6 h-6 text-neutral-600" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-white truncate group-hover:text-yellow-400 transition-colors">
                                            {course.title}
                                        </p>
                                        <p className="text-sm text-neutral-500">
                                            Updated {formatDate(course.updated_at)}
                                        </p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${course.status === 'PUBLISHED' ? 'bg-green-500/20 text-green-400' :
                                            course.status === 'SCHEDULED' ? 'bg-blue-500/20 text-blue-400' :
                                                course.status === 'ARCHIVED' ? 'bg-neutral-500/20 text-neutral-400' :
                                                    'bg-yellow-500/20 text-yellow-400'
                                        }`}>
                                        {course.status}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {/* Quick Actions & Stats */}
                <div className="space-y-6">
                    {/* Quick Actions */}
                    <div className="bg-[#111] border border-neutral-800 rounded-xl p-6">
                        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
                        <div className="space-y-3">
                            <QuickAction
                                icon={Plus}
                                label="New Course"
                                link="/cms/courses/new"
                                color="bg-yellow-400 text-black hover:bg-yellow-500"
                            />
                            <QuickAction
                                icon={BookOpen}
                                label="Manage Courses"
                                link="/cms/courses"
                                color="bg-neutral-900 text-white"
                            />
                            <QuickAction
                                icon={FileText}
                                label="Categories"
                                link="/cms/categories"
                                color="bg-neutral-900 text-white"
                            />
                        </div>
                    </div>

                    {/* Additional Stats */}
                    <div className="bg-[#111] border border-neutral-800 rounded-xl p-6">
                        <h2 className="text-xl font-bold text-white mb-4">Overview</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-neutral-400">Categories</span>
                                <span className="text-white font-semibold">{stats.totalCategories}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-neutral-400">Scheduled</span>
                                <span className="text-blue-400 font-semibold">{stats.scheduledCourses}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-neutral-400">Archived</span>
                                <span className="text-neutral-500 font-semibold">{stats.archivedCourses}</span>
                            </div>
                            <div className="pt-4 border-t border-neutral-800">
                                <div className="flex items-center justify-between">
                                    <span className="text-neutral-400">Publish Rate</span>
                                    <span className="text-green-400 font-semibold">
                                        {stats.totalCourses > 0
                                            ? Math.round((stats.publishedCourses / stats.totalCourses) * 100)
                                            : 0}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
