'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const PDFViewer = dynamic(() => import('@react-pdf/renderer').then(mod => mod.PDFViewer), { ssr: false });
const PDFDownloadLink = dynamic(() => import('@react-pdf/renderer').then(mod => mod.PDFDownloadLink), { ssr: false });

import { InvoicePDF } from '@/components/pdf/InvoicePDF';

interface InvoiceItem {
    id: string;
    title: string;
    subtitle: string;
    qty: number;
    rate: number;
}

export default function InvoiceGenerator() {
    const [invoiceNo, setInvoiceNo] = useState('INV-2025-041');
    const [date, setDate] = useState('16 Sep 2025');
    const [dueDate, setDueDate] = useState('30 Sep 2025');
    const [clientName, setClientName] = useState('Rahul Mehta');
    const [clientCompany, setClientCompany] = useState('XYZ Enterprises');
    const [clientAddress1, setClientAddress1] = useState('123 Business Street,');
    const [clientAddress2, setClientAddress2] = useState('Your City, Your State - 123456');
    const [clientGSTIN, setClientGSTIN] = useState('27ABCDE1234F1Z5');
    
    const [items, setItems] = useState<InvoiceItem[]>([
        { id: '1', title: 'GST Registration & Compliance', subtitle: 'New GST registration and monthly/quarterly return filing support.', qty: 1, rate: 2500 },
        { id: '2', title: 'Income Tax Filing', subtitle: 'ITR filing for individuals / businesses (as applicable).', qty: 1, rate: 3500 },
        { id: '3', title: 'Trademark Registration', subtitle: 'Application filing, documentation and status tracking.', qty: 1, rate: 8000 },
        { id: '4', title: 'Company Registration', subtitle: 'Private Limited Company incorporation with MCA filing support.', qty: 1, rate: 12000 },
    ]);

    const subtotal = items.reduce((acc, item) => acc + (item.rate * item.qty), 0);
    const gst = subtotal * 0.18;
    const total = subtotal + gst;

    const handleAddItem = () => {
        setItems([...items, { id: Date.now().toString(), title: '', subtitle: '', qty: 1, rate: 0 }]);
    };
    const handleRemoveItem = (id: string) => {
        setItems(items.filter(item => item.id !== id));
    };
    const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
        setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
    };

    const [mounted, setMounted] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    const data = {
        baseUrl: typeof window !== 'undefined' ? window.location.origin : '',
        invoiceNo, date, dueDate, clientName, clientCompany, clientAddress1, clientAddress2, clientGSTIN,
        items, subtotal, gst, total
    };

    return (
        <div className="relative h-[calc(100vh-8rem)]">
            <div className="w-full max-w-4xl mx-auto bg-white p-4 md:p-6 rounded-xl shadow-sm overflow-y-auto h-full">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sticky top-0 bg-white z-10 pb-4 border-b border-gray-100 gap-4">
                    <h2 className="text-xl font-bold">Invoice Details</h2>
                    <div className="flex gap-3">
                        <button 
                            onClick={() => setShowPreview(true)}
                            className="bg-gray-100 text-gray-700 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                        >
                            Show Preview
                        </button>
                        {mounted && (
                            <PDFDownloadLink 
                                document={<InvoicePDF data={data} />} 
                                fileName={`Invoice_${invoiceNo}.pdf`}
                                className="bg-brand-primary text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-brand-deep transition-colors"
                            >
                                {/* @ts-ignore */}
                                {({ loading }) => (loading ? 'Loading...' : 'Download PDF')}
                            </PDFDownloadLink>
                        )}
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Invoice No.</label>
                        <input type="text" className="w-full border border-border-main rounded-lg p-2 text-sm" value={invoiceNo} onChange={e => setInvoiceNo(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Date</label>
                            <input type="text" className="w-full border border-border-main rounded-lg p-2 text-sm" value={date} onChange={e => setDate(e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Due Date</label>
                            <input type="text" className="w-full border border-border-main rounded-lg p-2 text-sm" value={dueDate} onChange={e => setDueDate(e.target.value)} />
                        </div>
                    </div>

                    <div className="pt-4 border-t border-border-main">
                        <h3 className="font-semibold mb-3">Client Details</h3>
                        <div className="space-y-3">
                            <input type="text" placeholder="Client Name" className="w-full border border-border-main rounded-lg p-2 text-sm" value={clientName} onChange={e => setClientName(e.target.value)} />
                            <input type="text" placeholder="Company Name" className="w-full border border-border-main rounded-lg p-2 text-sm" value={clientCompany} onChange={e => setClientCompany(e.target.value)} />
                            <input type="text" placeholder="Address Line 1" className="w-full border border-border-main rounded-lg p-2 text-sm" value={clientAddress1} onChange={e => setClientAddress1(e.target.value)} />
                            <input type="text" placeholder="Address Line 2" className="w-full border border-border-main rounded-lg p-2 text-sm" value={clientAddress2} onChange={e => setClientAddress2(e.target.value)} />
                            <input type="text" placeholder="GSTIN" className="w-full border border-border-main rounded-lg p-2 text-sm" value={clientGSTIN} onChange={e => setClientGSTIN(e.target.value)} />
                        </div>
                    </div>

                    <div className="pt-4 border-t border-border-main">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="font-semibold">Line Items</h3>
                            <button onClick={handleAddItem} className="text-sm text-brand-primary font-medium hover:underline">+ Add Item</button>
                        </div>
                        <div className="space-y-4">
                            {items.map((item) => (
                                <div key={item.id} className="border border-border-main rounded-lg p-3 relative group bg-gray-50">
                                    <button onClick={() => handleRemoveItem(item.id)} className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">✕</button>
                                    <div className="space-y-3">
                                        <input type="text" placeholder="Title" className="w-full border border-border-main rounded p-1.5 text-sm font-medium" value={item.title} onChange={e => updateItem(item.id, 'title', e.target.value)} />
                                        <textarea rows={2} placeholder="Description" className="w-full border border-border-main rounded p-1.5 text-sm" value={item.subtitle} onChange={e => updateItem(item.id, 'subtitle', e.target.value)} />
                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <label className="block text-xs text-gray-500 mb-1">Qty</label>
                                                <input type="number" placeholder="Qty" className="w-full border border-border-main rounded p-1.5 text-sm" value={item.qty} onChange={e => updateItem(item.id, 'qty', Number(e.target.value))} />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-gray-500 mb-1">Rate</label>
                                                <input type="number" placeholder="Rate" className="w-full border border-border-main rounded p-1.5 text-sm" value={item.rate} onChange={e => updateItem(item.id, 'rate', Number(e.target.value))} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* PDF PREVIEW MODAL */}
            {showPreview && (
                <div className="fixed inset-0 z-50 bg-black/80 flex flex-col p-4 md:p-8">
                    <div className="flex justify-between items-center mb-4 text-white max-w-5xl mx-auto w-full">
                        <h2 className="text-xl font-bold">PDF Preview</h2>
                        <button 
                            onClick={() => setShowPreview(false)} 
                            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-medium transition-colors"
                        >
                            Close Preview
                        </button>
                    </div>
                    <div className="flex-1 bg-white rounded-xl overflow-hidden shadow-2xl max-w-5xl mx-auto w-full">
                        {mounted ? (
                            <PDFViewer width="100%" height="100%" className="border-none">
                                <InvoicePDF data={data} />
                            </PDFViewer>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">Loading PDF Viewer...</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
