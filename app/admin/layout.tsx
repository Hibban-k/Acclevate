'use client';

import { SessionProvider } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Don't show sidebar on login page
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    const navItems = [
        { href: '/admin', label: 'Dashboard', icon: '📊' },
        { href: '/admin/services', label: 'Services', icon: '🔧' },
        { href: '/admin/inquiries', label: 'Inquiries', icon: '📧' },
    ];

    return (
        <div className="min-h-screen bg-slate-100 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
                <div className="p-6 border-b border-slate-200">
                    <Link href="/admin">
                        <Image
                            src="/logo.jpg"
                            alt="Acclevate"
                            width={140}
                            height={40}
                            className="h-8 w-auto"
                        />
                    </Link>
                </div>

                <nav className="flex-1 p-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${pathname === item.href
                                    ? 'bg-navy-600 text-white'
                                    : 'text-slate-600 hover:bg-slate-100'
                                }`}
                        >
                            <span>{item.icon}</span>
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-200">
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-100 rounded-lg"
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
            <main className="flex-1 p-8">
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
