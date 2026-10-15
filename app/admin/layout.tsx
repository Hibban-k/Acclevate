'use client';

import { SessionProvider } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { 
    LayoutDashboard, 
    Settings, 
    Mail, 
    FileText, 
    FileSpreadsheet, 
    Receipt, 
    Menu, 
    X, 
    Globe, 
    LogOut,
    ChevronDown,
    ChevronRight,
    Wrench
} from 'lucide-react';

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isToolsOpen, setIsToolsOpen] = useState(
        pathname.includes('/admin/quotation') || 
        pathname.includes('/admin/letterhead') || 
        pathname.includes('/admin/invoice')
    );

    // Don't show sidebar on login page
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    const closeSidebar = () => setIsSidebarOpen(false);

    return (
        <div className="h-screen w-full bg-background flex flex-col md:flex-row overflow-hidden">
            {/* Mobile Header */}
            <div className="md:hidden flex-shrink-0 flex items-center justify-between p-4 bg-white border-b border-gray-200">
                <Link href="/admin">
                    <Image
                        src="/logo.jpg"
                        alt="Acclevate"
                        width={120}
                        height={34}
                        className="h-7 w-auto"
                    />
                </Link>
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-md"
                >
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            {/* Sidebar Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={closeSidebar}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-white flex flex-col shadow-xl md:shadow-none border-r border-gray-100
                transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 h-full
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="p-6 flex-shrink-0 flex items-center justify-between">
                    <Link href="/admin" onClick={closeSidebar}>
                        <Image
                            src="/logo.jpg"
                            alt="Acclevate"
                            width={140}
                            height={40}
                            className="h-8 w-auto"
                        />
                    </Link>
                    <button 
                        className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-md"
                        onClick={closeSidebar}
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <nav className="flex-1 px-4 py-2 overflow-y-auto space-y-1">
                    <Link
                        href="/admin"
                        onClick={closeSidebar}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${pathname === '/admin'
                                ? 'bg-brand-primary text-white'
                                : 'text-text-secondary hover:bg-gray-50'
                            }`}
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        <span className="font-medium">Dashboard</span>
                    </Link>
                    <Link
                        href="/admin/categories"
                        onClick={closeSidebar}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${pathname === '/admin/categories'
                                ? 'bg-brand-primary text-white'
                                : 'text-text-secondary hover:bg-gray-50'
                            }`}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg>
                        <span className="font-medium">Categories</span>
                    </Link>
                    <Link
                        href="/admin/services"
                        onClick={closeSidebar}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${pathname === '/admin/services'
                                ? 'bg-brand-primary text-white'
                                : 'text-text-secondary hover:bg-gray-50'
                            }`}
                    >
                        <Settings className="w-5 h-5" />
                        <span className="font-medium">Services</span>
                    </Link>
                    <Link
                        href="/admin/inquiries"
                        onClick={closeSidebar}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${pathname === '/admin/inquiries'
                                ? 'bg-brand-primary text-white'
                                : 'text-text-secondary hover:bg-gray-50'
                            }`}
                    >
                        <Mail className="w-5 h-5" />
                        <span className="font-medium">Inquiries</span>
                    </Link>

                    {/* Tools Dropdown */}
                    <div className="pt-2">
                        <button 
                            onClick={() => setIsToolsOpen(!isToolsOpen)}
                            className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-text-secondary hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <Wrench className="w-5 h-5" />
                                <span className="font-medium">Tools</span>
                            </div>
                            {isToolsOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        </button>
                        
                        {isToolsOpen && (
                            <div className="pl-11 pr-2 py-2 space-y-1">
                                <Link
                                    href="/admin/quotation"
                                    onClick={closeSidebar}
                                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm ${pathname === '/admin/quotation'
                                            ? 'bg-brand-primary/10 text-brand-primary font-medium'
                                            : 'text-text-secondary hover:bg-gray-50'
                                        }`}
                                >
                                    <FileText className="w-4 h-4" />
                                    <span>Quotation</span>
                                </Link>
                                <Link
                                    href="/admin/letterhead"
                                    onClick={closeSidebar}
                                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm ${pathname === '/admin/letterhead'
                                            ? 'bg-brand-primary/10 text-brand-primary font-medium'
                                            : 'text-text-secondary hover:bg-gray-50'
                                        }`}
                                >
                                    <FileSpreadsheet className="w-4 h-4" />
                                    <span>Letterhead</span>
                                </Link>
                                <Link
                                    href="/admin/invoice"
                                    onClick={closeSidebar}
                                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm ${pathname === '/admin/invoice'
                                            ? 'bg-brand-primary/10 text-brand-primary font-medium'
                                            : 'text-text-secondary hover:bg-gray-50'
                                        }`}
                                >
                                    <Receipt className="w-4 h-4" />
                                    <span>Invoice</span>
                                </Link>
                            </div>
                        )}
                    </div>
                </nav>

                <div className="p-4 flex-shrink-0 border-t border-gray-100 space-y-1">
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-4 py-3 text-text-secondary hover:bg-gray-50 rounded-lg transition-colors"
                    >
                        <Globe className="w-5 h-5" />
                        <span className="font-medium">View Website</span>
                    </Link>
                    <Link
                        href="/api/auth/signout"
                        className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Sign Out</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 h-full overflow-y-auto bg-slate-50">
                <div className="p-4 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <AdminLayoutContent>{children}</AdminLayoutContent>
        </SessionProvider>
    );
}

