'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const PDFViewer = dynamic(() => import('@react-pdf/renderer').then(mod => mod.PDFViewer), { ssr: false });
const PDFDownloadLink = dynamic(() => import('@react-pdf/renderer').then(mod => mod.PDFDownloadLink), { ssr: false });

import { LetterheadPDF } from '@/components/pdf/LetterheadPDF';

export default function LetterheadGenerator() {
    const [date, setDate] = useState('16 Sep 2025');
    const [referenceNo, setReferenceNo] = useState('AC-2025-001');
    const [clientName, setClientName] = useState('Rahul Mehta');
    const [clientCompany, setClientCompany] = useState('XYZ Enterprises');
    const [clientAddress1, setClientAddress1] = useState('123 Business Street,');
    const [clientAddress2, setClientAddress2] = useState('Your City, Your State - 123456');
    const [subject, setSubject] = useState('Business Service Proposal');
    const [salutation, setSalutation] = useState('Dear Rahul Mehta,');
    const [content, setContent] = useState('Thank you for giving us the opportunity to support your business needs. At Acclevate Business Solutions, we aim to provide expert guidance and end-to-end assistance in the areas of compliance, accounting, registration and business growth.\n\nWe understand the importance of a strong foundation for your business, and we are committed to delivering practical, result-oriented solutions that help you stay compliant and move forward with confidence.\n\nPlease find attached our detailed quotation for the proposed services. Should you have any questions or need any further information, we would be happy to assist you.\n\nWe look forward to the opportunity to work with you.');

    const [mounted, setMounted] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    const data = {
        baseUrl: typeof window !== 'undefined' ? window.location.origin : '',
        date, referenceNo, clientName, clientCompany, clientAddress1, clientAddress2,
        subject, salutation, content
    };

    return (
        <div className="relative h-[calc(100vh-8rem)]">
            {/* Admin Controls */}
            <div className="w-full max-w-4xl mx-auto bg-white p-4 md:p-6 rounded-xl shadow-sm overflow-y-auto h-full">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sticky top-0 bg-white z-10 pb-4 border-b border-gray-100 gap-4">
                    <h2 className="text-xl font-bold">Letterhead Details</h2>
                    <div className="flex gap-3">
                        <button 
                            onClick={() => setShowPreview(true)}
                            className="bg-gray-100 text-gray-700 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                        >
                            Show Preview
                        </button>
                        {mounted && (
                            <PDFDownloadLink 
                                document={<LetterheadPDF data={data} />} 
                                fileName={`Letterhead_${referenceNo.replace(/\//g, '-')}.pdf`}
                                className="bg-brand-primary text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-brand-deep transition-colors"
                            >
                                {/* @ts-ignore */}
                                {({ loading }) => (loading ? 'Loading...' : 'Download PDF')}
                            </PDFDownloadLink>
                        )}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Date</label>
                            <input type="text" className="w-full border border-border-main rounded-lg p-2 text-sm" value={date} onChange={e => setDate(e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Reference No.</label>
                            <input type="text" className="w-full border border-border-main rounded-lg p-2 text-sm" value={referenceNo} onChange={e => setReferenceNo(e.target.value)} />
                        </div>
                    </div>

                    <div className="pt-4 border-t border-border-main">
                        <h3 className="font-semibold mb-3">Client Details</h3>
                        <div className="space-y-3">
                            <input type="text" placeholder="Client Name" className="w-full border border-border-main rounded-lg p-2 text-sm" value={clientName} onChange={e => setClientName(e.target.value)} />
                            <input type="text" placeholder="Company Name" className="w-full border border-border-main rounded-lg p-2 text-sm" value={clientCompany} onChange={e => setClientCompany(e.target.value)} />
                            <input type="text" placeholder="Address Line 1" className="w-full border border-border-main rounded-lg p-2 text-sm" value={clientAddress1} onChange={e => setClientAddress1(e.target.value)} />
                            <input type="text" placeholder="Address Line 2" className="w-full border border-border-main rounded-lg p-2 text-sm" value={clientAddress2} onChange={e => setClientAddress2(e.target.value)} />
                        </div>
                    </div>

                    <div className="pt-4 border-t border-border-main">
                        <h3 className="font-semibold mb-3">Content</h3>
                        <div className="space-y-3">
                            <input type="text" placeholder="Subject" className="w-full border border-border-main rounded-lg p-2 text-sm font-medium" value={subject} onChange={e => setSubject(e.target.value)} />
                            <input type="text" placeholder="Salutation" className="w-full border border-border-main rounded-lg p-2 text-sm" value={salutation} onChange={e => setSalutation(e.target.value)} />
                            <textarea rows={10} placeholder="Body Content (Use new lines for paragraphs)" className="w-full border border-border-main rounded-lg p-2 text-sm" value={content} onChange={e => setContent(e.target.value)} />
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
                                <LetterheadPDF data={data} />
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
