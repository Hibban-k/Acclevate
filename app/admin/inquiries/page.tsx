'use client';

import { useEffect, useState } from 'react';
import { getInquiriesAction, deleteInquiryAction, bulkDeleteInquiriesAction } from '@/lib/actions/inquiries';

interface Inquiry {
    _id: string;
    fullName?: string;
    firstName?: string; // For backward compatibility with old entries
    lastName?: string;
    email: string;
    phone: string;
    service?: string;
    company?: string;
    message: string;
    status: 'new' | 'read' | 'replied';
    createdAt: string;
}

export default function AdminInquiriesPage() {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    async function fetchInquiries() {
        try {
            setLoading(true);
            const data = await getInquiriesAction();
            setInquiries(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching inquiries:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchInquiries();
    }, []);

    const toggleSelectAll = () => {
        if (selectedIds.size === inquiries.length) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(inquiries.map(i => i._id)));
        }
    };

    const toggleSelect = (id: string) => {
        const newSelected = new Set(selectedIds);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedIds(newSelected);
    };

    const handleBulkDelete = async () => {
        if (!confirm(`Are you sure you want to delete ${selectedIds.size} inquiries?`)) return;
        
        try {
            await bulkDeleteInquiriesAction(Array.from(selectedIds));
            setSelectedIds(new Set());
            await fetchInquiries();
        } catch (error) {
            console.error('Error deleting inquiries:', error);
            alert('Failed to delete inquiries');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this inquiry?')) return;
        
        try {
            await deleteInquiryAction(id);
            await fetchInquiries();
        } catch (error) {
            console.error('Error deleting inquiry:', error);
            alert('Failed to delete inquiry');
        }
    };

    const statusColors = {
        new: 'bg-green-100 text-green-700',
        read: 'bg-blue-100 text-blue-700',
        replied: 'bg-slate-100 text-slate-700',
    };

    return (
        <div>
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Inquiries</h1>
                    <p className="text-slate-500 mt-1">Contact form submissions</p>
                </div>
                {selectedIds.size > 0 && (
                    <button 
                        onClick={handleBulkDelete}
                        className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 shadow-sm"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete Selected ({selectedIds.size})
                    </button>
                )}
            </div>

            {loading ? (
                <div className="text-slate-500 flex justify-center py-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-800"></div>
                </div>
            ) : inquiries.length === 0 ? (
                <div className="bg-white rounded-xl p-8 text-center text-slate-500 border border-slate-100 shadow-sm">
                    No inquiries yet.
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-4">
                        <input 
                            type="checkbox" 
                            className="rounded border-slate-300 text-brand-primary focus:ring-brand-primary cursor-pointer w-4 h-4"
                            checked={selectedIds.size === inquiries.length && inquiries.length > 0}
                            onChange={toggleSelectAll}
                        />
                        <span className="text-sm font-medium text-slate-600">Select All</span>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {inquiries.map((inquiry) => (
                            <div key={inquiry._id} className="p-6 hover:bg-slate-50 transition-colors group flex gap-4">
                                <div className="pt-1">
                                    <input 
                                        type="checkbox" 
                                        className="rounded border-slate-300 text-brand-primary focus:ring-brand-primary cursor-pointer w-4 h-4"
                                        checked={selectedIds.has(inquiry._id)}
                                        onChange={() => toggleSelect(inquiry._id)}
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <div className="font-medium text-slate-800 text-lg flex items-center gap-3">
                                                {inquiry.fullName || `${inquiry.firstName || ''} ${inquiry.lastName || ''}`.trim()}
                                                <span className={`px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold rounded-full ${statusColors[inquiry.status]}`}>
                                                    {inquiry.status}
                                                </span>
                                            </div>
                                            <div className="text-sm text-slate-500 mt-1 flex items-center gap-4">
                                                <span className="flex items-center gap-1">
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                                    {inquiry.email}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                                    {inquiry.phone || 'N/A'}
                                                </span>
                                            </div>
                                            {inquiry.company && (
                                                <p className="text-sm text-slate-500 mt-1 flex items-center gap-1">
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                                                    {inquiry.company}
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex flex-col items-end gap-3">
                                            <span className="text-sm text-slate-400">
                                                {new Date(inquiry.createdAt).toLocaleString()}
                                            </span>
                                            <button
                                                onClick={() => handleDelete(inquiry._id)}
                                                className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                title="Delete inquiry"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-slate-700 text-sm whitespace-pre-wrap">
                                        {inquiry.message}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
