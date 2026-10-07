'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import PDF components with SSR disabled to prevent Node errors
const PDFViewer = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFViewer),
  { ssr: false }
);

const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
  { ssr: false }
);

import { QuotationPDF } from '@/components/pdf/QuotationPDF';

interface QuoteItem {
    id: string;
    icon: 'gst' | 'tax' | 'tm' | 'business' | 'accounting' | 'compliance';
    title: string;
    scope: string;
    rate: number;
    suffix: string;
}

export default function QuotationGenerator() {
    const [quotationNo, setQuotationNo] = useState('AQ-2025-041');
    const [date, setDate] = useState('16 Sep 2025');
    const [validUntil, setValidUntil] = useState('30 Sep 2025');
    const [clientName, setClientName] = useState('Your Business Name');
    const [clientAddress1, setClientAddress1] = useState('123 Business Street,');
    const [clientAddress2, setClientAddress2] = useState('Your City, Your State – 123456');
    const [clientGSTIN, setClientGSTIN] = useState('27ABCDE1234F125');
    const [salutation, setSalutation] = useState('Dear Sir/Madam,');
    const [introduction, setIntroduction] = useState('Thank you for considering Accelvate Business Solutions. We are pleased to submit our quotation for the following services. We look forward to partnering with you.');
    
    const [items, setItems] = useState<QuoteItem[]>([
        { id: '1', icon: 'gst', title: 'GST Registration &\nCompliance', scope: '• GST registration (new / amendment)\n• Documentation support\n• GSTIN issuance & onboarding', rate: 2500, suffix: '' },
        { id: '2', icon: 'tax', title: 'Income Tax Filing', scope: '• ITR preparation and filing\n• Tax planning guidance\n• e-Filing support', rate: 3500, suffix: '' },
        { id: '3', icon: 'tm', title: 'Trademark Registration', scope: '• Trademark search & application\n• Documentation & filing\n• Status tracking & support', rate: 8000, suffix: '' },
        { id: '4', icon: 'business', title: 'Business Registration', scope: '• Private Limited Company registration\n• MCA filing and compliance\n• DIN & DSC support', rate: 12000, suffix: '' },
        { id: '5', icon: 'accounting', title: 'Accounting & Bookkeeping', scope: '• Monthly bookkeeping\n• Financial statements\n• Advisory support', rate: 6000, suffix: '/ month' },
        { id: '6', icon: 'compliance', title: 'Compliance &\nLegal Documentation', scope: '• Agreements & legal documents\n• Regulatory compliance support\n• Changing advisory', rate: 5000, suffix: '' },
        // Adding a 7th item for testing auto-pagination!
        { id: '7', icon: 'business', title: 'Additional Consulting', scope: '• Strategic growth planning\n• Market analysis', rate: 10000, suffix: '' },
    ]);

    const subtotal = items.reduce((acc, item) => acc + item.rate, 0);
    const gst = subtotal * 0.18;
    const total = subtotal + gst;

    const handleAddItem = () => {
        setItems([...items, { id: Date.now().toString(), icon: 'gst', title: '', scope: '', rate: 0, suffix: '' }]);
    };

    const handleRemoveItem = (id: string) => {
        setItems(items.filter(item => item.id !== id));
    };

    const updateItem = (id: string, field: keyof QuoteItem, value: string | number) => {
        setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
    };

    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    const data = {
        baseUrl: typeof window !== 'undefined' ? window.location.origin : '',
        quotationNo, date, validUntil, clientName, clientAddress1, clientAddress2, clientGSTIN,
        salutation, introduction, items, subtotal, gst, total
    };

    return (
        <div className="flex gap-8 h-[calc(100vh-8rem)]">
            {/* Admin Form Controls */}
            <div className="w-1/2 lg:w-[45%] bg-white p-6 rounded-xl shadow-sm overflow-y-auto">
                <div className="flex justify-between items-center mb-6 sticky top-0 bg-white z-10 pb-4 border-b border-gray-100">
                    <h2 className="text-xl font-bold">Quotation Details</h2>
                    
                    {mounted && (
                        <PDFDownloadLink 
                            document={<QuotationPDF data={data} />} 
                            fileName={`Quotation_${quotationNo}.pdf`}
                            className="bg-brand-primary text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-brand-deep transition-colors"
                        >
                            {/* @ts-ignore */}
                            {({ loading }) => (loading ? 'Loading Document...' : 'Download PDF')}
                        </PDFDownloadLink>
                    )}
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Quotation No.</label>
                        <input type="text" className="w-full border border-border-main rounded-lg p-2 text-sm" value={quotationNo} onChange={e => setQuotationNo(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Date</label>
                            <input type="text" className="w-full border border-border-main rounded-lg p-2 text-sm" value={date} onChange={e => setDate(e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Valid Until</label>
                            <input type="text" className="w-full border border-border-main rounded-lg p-2 text-sm" value={validUntil} onChange={e => setValidUntil(e.target.value)} />
                        </div>
                    </div>

                    <div className="pt-4 border-t border-border-main">
                        <h3 className="font-semibold mb-3">Client Details</h3>
                        <div className="space-y-3">
                            <input type="text" placeholder="Business Name" className="w-full border border-border-main rounded-lg p-2 text-sm" value={clientName} onChange={e => setClientName(e.target.value)} />
                            <input type="text" placeholder="Address Line 1" className="w-full border border-border-main rounded-lg p-2 text-sm" value={clientAddress1} onChange={e => setClientAddress1(e.target.value)} />
                            <input type="text" placeholder="Address Line 2" className="w-full border border-border-main rounded-lg p-2 text-sm" value={clientAddress2} onChange={e => setClientAddress2(e.target.value)} />
                            <input type="text" placeholder="GSTIN" className="w-full border border-border-main rounded-lg p-2 text-sm" value={clientGSTIN} onChange={e => setClientGSTIN(e.target.value)} />
                        </div>
                    </div>

                    <div className="pt-4 border-t border-border-main">
                        <h3 className="font-semibold mb-3">Message</h3>
                        <div className="space-y-3">
                            <input type="text" placeholder="Salutation" className="w-full border border-border-main rounded-lg p-2 text-sm" value={salutation} onChange={e => setSalutation(e.target.value)} />
                            <textarea rows={3} placeholder="Introduction" className="w-full border border-border-main rounded-lg p-2 text-sm" value={introduction} onChange={e => setIntroduction(e.target.value)} />
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
                                        <div className="grid grid-cols-[100px_1fr] gap-2">
                                            <select className="border border-border-main rounded p-1.5 text-sm bg-white" value={item.icon} onChange={e => updateItem(item.id, 'icon', e.target.value)}>
                                                <option value="gst">GST</option>
                                                <option value="tax">Tax</option>
                                                <option value="tm">TM</option>
                                                <option value="business">Business</option>
                                                <option value="accounting">Accounting</option>
                                                <option value="compliance">Compliance</option>
                                            </select>
                                            <input type="text" placeholder="Title" className="w-full border border-border-main rounded p-1.5 text-sm font-medium" value={item.title} onChange={e => updateItem(item.id, 'title', e.target.value)} />
                                        </div>
                                        <textarea rows={3} placeholder="Scope (New line for bullet)" className="w-full border border-border-main rounded p-1.5 text-sm" value={item.scope} onChange={e => updateItem(item.id, 'scope', e.target.value)} />
                                        <div className="grid grid-cols-2 gap-2">
                                            <input type="number" placeholder="Rate" className="w-full border border-border-main rounded p-1.5 text-sm" value={item.rate} onChange={e => updateItem(item.id, 'rate', Number(e.target.value))} />
                                            <input type="text" placeholder="Suffix (e.g. / month)" className="w-full border border-border-main rounded p-1.5 text-sm" value={item.suffix} onChange={e => updateItem(item.id, 'suffix', e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* LIVE REACT-PDF PREVIEW */}
            <div className="flex-1 bg-gray-200 rounded-xl overflow-hidden shadow-inner">
                {mounted ? (
                    <PDFViewer width="100%" height="100%" className="border-none">
                        <QuotationPDF data={data} />
                    </PDFViewer>
                ) : (
                    <div className="w-full h-full flex items-center justify-center">Loading PDF Viewer...</div>
                )}
            </div>
        </div>
    );
}
