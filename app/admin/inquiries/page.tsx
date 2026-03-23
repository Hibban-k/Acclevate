'use client';

import { useEffect, useState } from 'react';

interface Inquiry {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    company?: string;
    message: string;
    status: 'new' | 'read' | 'replied';
    createdAt: string;
}

export default function AdminInquiriesPage() {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchInquiries() {
            try {
                const res = await fetch('/api/admin/inquiries');
                const data = await res.json();
                setInquiries(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Error fetching inquiries:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchInquiries();
    }, []);

    const statusColors = {
        new: 'bg-green-100 text-green-700',
        read: 'bg-blue-100 text-blue-700',
        replied: 'bg-slate-100 text-slate-600',
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Inquiries</h1>
                <p className="text-slate-600 mt-1">Contact form submissions</p>
            </div>

            {loading ? (
                <div className="text-slate-500">Loading...</div>
            ) : inquiries.length === 0 ? (
                <div className="bg-white rounded-xl p-8 text-center text-slate-500">
                    No inquiries yet.
                </div>
            ) : (
                <div className="space-y-4">
                    {inquiries.map((inquiry) => (
                        <div key={inquiry._id} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-semibold text-slate-900">
                                        {inquiry.firstName} {inquiry.lastName}
                                    </h3>
                                    <p className="text-sm text-slate-600">{inquiry.email}</p>
                                    {inquiry.company && (
                                        <p className="text-sm text-slate-500">{inquiry.company}</p>
                                    )}
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`px-2 py-1 text-xs font-medium rounded ${statusColors[inquiry.status]}`}>
                                        {inquiry.status}
                                    </span>
                                    <span className="text-sm text-slate-500">
                                        {new Date(inquiry.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                            <p className="text-slate-700 bg-slate-50 p-4 rounded-lg">{inquiry.message}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
