'use client';

import { SessionProvider } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Don't show sidebar on login page
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    const navItems = [
        { href: '/admin', label: 'Dashboard', icon: '📊' },
        { href: '/admin/services', label: 'Services', icon: '🔧' },
        { href: '/admin/inquiries', label: 'Inquiries', icon: '📧' },
        { href: '/admin/quotation', label: 'Quotation', icon: '📄' },
        { href: '/admin/letterhead', label: 'Letterhead', icon: '📝' },
        { href: '/admin/invoice', label: 'Invoice', icon: '🧾' },
    ];

    const closeSidebar = () => setIsSidebarOpen(false);

    return (
        <div className="min-h-screen bg-background flex flex-col md:flex-row">
            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200">
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
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
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
                fixed inset-y-0 left-0 z-50 w-64 bg-white flex flex-col shadow-xl md:shadow-none
                transform transition-transform duration-300 ease-in-out
                md:relative md:translate-x-0
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="p-6 flex items-center justify-between">
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
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <nav className="flex-1 p-4 overflow-y-auto">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={closeSidebar}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${pathname === item.href
                                    ? 'bg-charcoal text-white'
                                    : 'text-text-secondary hover:bg-background'
                                }`}
                        >
                            <span>{item.icon}</span>
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-4 py-3 text-text-secondary hover:bg-background rounded-lg"
                    >
                        <span>🌐</span>
                        <span className="font-medium">View Website</span>
                    </Link>
                    <Link
                        href="/api/auth/signout"
                        className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                        <span>🚪</span>
                        <span className="font-medium">Sign Out</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
                {children}
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
