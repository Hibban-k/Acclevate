'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

interface Stats {
    totalServices: number;
    totalInquiries: number;
    newInquiries: number;
}

export default function AdminDashboard() {
    const { data: session } = useSession();
    const [stats, setStats] = useState<Stats>({
        totalServices: 0,
        totalInquiries: 0,
        newInquiries: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                const [servicesRes, inquiriesRes] = await Promise.all([
                    fetch('/api/admin/services'),
                    fetch('/api/admin/inquiries'),
                ]);

                const services = await servicesRes.json();
                const inquiries = await inquiriesRes.json();

                setStats({
                    totalServices: Array.isArray(services) ? services.length : 0,
                    totalInquiries: Array.isArray(inquiries) ? inquiries.length : 0,
                    newInquiries: Array.isArray(inquiries)
                        ? inquiries.filter((i: { status: string }) => i.status === 'new').length
                        : 0,
                });
            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchStats();
    }, []);

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
                <p className="text-slate-600 mt-1">
                    Welcome back, {session?.user?.name || 'Admin'}!
                </p>
            </div>

            {loading ? (
                <div className="text-slate-500">Loading...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-600 text-sm">Total Services</p>
                                <p className="text-3xl font-bold text-slate-900 mt-1">{stats.totalServices}</p>
                            </div>
                            <div className="w-12 h-12 bg-navy-600/10 rounded-lg flex items-center justify-center text-2xl">
                                🔧
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-600 text-sm">Total Inquiries</p>
                                <p className="text-3xl font-bold text-slate-900 mt-1">{stats.totalInquiries}</p>
                            </div>
                            <div className="w-12 h-12 bg-navy-600/10 rounded-lg flex items-center justify-center text-2xl">
                                📧
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-600 text-sm">New Inquiries</p>
                                <p className="text-3xl font-bold text-green-600 mt-1">{stats.newInquiries}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-2xl">
                                ✨
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
