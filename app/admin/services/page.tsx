'use client';

import { useEffect, useState } from 'react';
import {
    getServicesAction,
    createServiceAction,
    updateServiceAction,
    deleteServiceAction
} from '@/lib/actions/services';

interface Feature {
    title: string;
    description: string;
}

interface FAQ {
    question: string;
    answer: string;
}

interface Service {
    _id: string;
    title: string;
    tagline: string;
    description: string;
    category: string;
    subcategory?: string;
    serviceGroup?: string;
    relatedServices?: string[];
    features: Feature[];
    faqs: FAQ[];
    isActive: boolean;
    order: number;
    createdAt: string;
    updatedAt: string;
}

interface FormData {
    title: string;
    tagline: string;
    description: string;
    category: string;
    subcategory: string;
    serviceGroup: string;
    relatedServices: string[];
    features: Feature[];
    faqs: FAQ[];
    isActive: boolean;
    order: number;
}

const emptyFormData: FormData = {
    title: '',
    tagline: '',
    description: '',
    category: 'strategy',
    subcategory: '',
    serviceGroup: '',
    relatedServices: [],
    features: [],
    faqs: [],
    isActive: true,
    order: 0,
};

const emptyFeature: Feature = {
    title: '',
    description: '',
};

const emptyFAQ: FAQ = {
    question: '',
    answer: '',
};

const categories: Record<string, string> = {
    strategy: 'Strategy',
    digital: 'Digital',
    operations: 'Operations',
    people: 'People & Org',
};

export default function AdminServicesPage() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<FormData>(emptyFormData);
    const [saving, setSaving] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [relatedServicesStr, setRelatedServicesStr] = useState<string>('');

    async function fetchServices() {
        try {
            const data = await getServicesAction();
            setServices(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching services:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchServices();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        const dataToSave = {
            ...formData,
            relatedServices: relatedServicesStr
                .split(',')
                .map((s) => s.trim())
                .filter(Boolean),
        };

        try {
            if (editingId) {
                await updateServiceAction(editingId, dataToSave);
            } else {
                await createServiceAction(dataToSave);
            }
            setShowForm(false);
            setEditingId(null);
            setFormData(emptyFormData);
            setRelatedServicesStr('');
            fetchServices();
        } catch (error: any) {
            console.error('Error saving service:', error);
            alert(error.message || 'Failed to save service');
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (service: Service) => {
        setFormData({
            title: service.title,
            tagline: service.tagline,
            description: service.description,
            category: service.category,
            subcategory: service.subcategory || '',
            serviceGroup: service.serviceGroup || '',
            relatedServices: service.relatedServices || [],
            features: service.features || [],
            faqs: service.faqs || [],
            isActive: service.isActive,
            order: service.order,
        });
        setRelatedServicesStr(service.relatedServices ? service.relatedServices.join(', ') : '');
        setEditingId(service._id);
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this service?')) return;

        try {
            await deleteServiceAction(id);
            fetchServices();
        } catch (error) {
            console.error('Error deleting service:', error);
        }
    };

    const handleToggleStatus = async (service: Service) => {
        try {
            await updateServiceAction(service._id, { ...service, isActive: !service.isActive });
            fetchServices();
        } catch (error) {
            console.error('Error toggling status:', error);
        }
    };

    const cancelForm = () => {
        setShowForm(false);
        setEditingId(null);
        setFormData(emptyFormData);
        setRelatedServicesStr('');
    };

    // Feature management
    const addFeature = () => {
        setFormData({
            ...formData,
            features: [...formData.features, { ...emptyFeature }],
        });
    };

    const updateFeature = (index: number, field: keyof Feature, value: string) => {
        const updatedFeatures = [...formData.features];
        updatedFeatures[index] = { ...updatedFeatures[index], [field]: value };
        setFormData({ ...formData, features: updatedFeatures });
    };

    const removeFeature = (index: number) => {
        setFormData({
            ...formData,
            features: formData.features.filter((_, i) => i !== index),
        });
    };

    // FAQ management
    const addFaq = () => {
        setFormData({
            ...formData,
            faqs: [...formData.faqs, { ...emptyFAQ }],
        });
    };

    const updateFaq = (index: number, field: keyof FAQ, value: string) => {
        const updatedFaqs = [...formData.faqs];
        updatedFaqs[index] = { ...updatedFaqs[index], [field]: value };
        setFormData({ ...formData, faqs: updatedFaqs });
    };

    const removeFaq = (index: number) => {
        setFormData({
            ...formData,
            faqs: formData.faqs.filter((_, i) => i !== index),
        });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Services</h1>
                    <p className="text-slate-600 mt-1">Manage your services</p>
                </div>
                {!showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="px-4 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Service
                    </button>
                )}
            </div>

            {/* Add/Edit Form */}
            {showForm && (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-6">
                    <h2 className="text-xl font-semibold mb-6">
                        {editingId ? 'Edit Service' : 'Add New Service'}
                    </h2>
                    <form onSubmit={handleSubmit}>
                        {/* Basic Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-600 focus:border-navy-600 outline-none"
                                    placeholder="e.g., Business Consulting"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Category <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-600 focus:border-navy-600 outline-none"
                                >
                                    {Object.entries(categories).map(([value, label]) => (
                                        <option key={value} value={value}>{label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Subcategory
                                </label>
                                <input
                                    type="text"
                                    value={formData.subcategory}
                                    onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-600 focus:border-navy-600 outline-none"
                                    placeholder="e.g., Return Filings, Registrations"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Service Group
                                </label>
                                <input
                                    type="text"
                                    value={formData.serviceGroup}
                                    onChange={(e) => setFormData({ ...formData, serviceGroup: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-600 focus:border-navy-600 outline-none"
                                    placeholder="e.g., Compliance, Advisory"
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Related Services (Comma-separated slugs or names)
                            </label>
                            <input
                                type="text"
                                value={relatedServicesStr}
                                onChange={(e) => setRelatedServicesStr(e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-600 focus:border-navy-600 outline-none"
                                placeholder="e.g., audit-services, tax-consulting"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Tagline <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.tagline}
                                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-600 focus:border-navy-600 outline-none"
                                placeholder="A short catchy tagline"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-600 focus:border-navy-600 outline-none"
                                rows={4}
                                placeholder="Detailed description of the service..."
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Display Order
                                </label>
                                <input
                                    type="number"
                                    value={formData.order}
                                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-600 focus:border-navy-600 outline-none"
                                    min={0}
                                />
                                <p className="text-xs text-slate-500 mt-1">Lower numbers appear first</p>
                            </div>
                            <div className="flex items-center gap-3 pt-6">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.isActive}
                                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-navy-600/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-navy-600"></div>
                                    <span className="ml-3 text-sm font-medium text-slate-700">Active</span>
                                </label>
                            </div>
                        </div>

                        {/* Features Section */}
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-3">
                                <label className="block text-sm font-medium text-slate-700">
                                    Features
                                </label>
                                <button
                                    type="button"
                                    onClick={addFeature}
                                    className="text-sm text-navy-600 hover:text-navy-700 font-medium"
                                >
                                    + Add Feature
                                </button>
                            </div>
                            {formData.features.length === 0 ? (
                                <p className="text-sm text-slate-500 italic">No features added yet</p>
                            ) : (
                                <div className="space-y-4">
                                    {formData.features.map((feature, index) => (
                                        <div key={index} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                                            <div className="flex justify-between items-start mb-3">
                                                <span className="text-sm font-medium text-slate-600">Feature {index + 1}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeFeature(index)}
                                                    className="text-red-500 hover:text-red-700 text-sm"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                <div>
                                                    <label className="block text-xs text-slate-500 mb-1">Title</label>
                                                    <input
                                                        type="text"
                                                        value={feature.title}
                                                        onChange={(e) => updateFeature(index, 'title', e.target.value)}
                                                        className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded-lg"
                                                        placeholder="Feature title"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs text-slate-500 mb-1">Description</label>
                                                    <input
                                                        type="text"
                                                        value={feature.description}
                                                        onChange={(e) => updateFeature(index, 'description', e.target.value)}
                                                        className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded-lg"
                                                        placeholder="Short description"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* FAQs Section */}
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-3">
                                <label className="block text-sm font-medium text-slate-700">
                                    FAQs (Frequently Asked Questions)
                                </label>
                                <button
                                    type="button"
                                    onClick={addFaq}
                                    className="text-sm text-navy-600 hover:text-navy-700 font-medium"
                                >
                                    + Add FAQ
                                </button>
                            </div>
                            {formData.faqs.length === 0 ? (
                                <p className="text-sm text-slate-500 italic">No FAQs added yet</p>
                            ) : (
                                <div className="space-y-4">
                                    {formData.faqs.map((faq, index) => (
                                        <div key={index} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                                            <div className="flex justify-between items-start mb-3">
                                                <span className="text-sm font-medium text-slate-600">FAQ {index + 1}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeFaq(index)}
                                                    className="text-red-500 hover:text-red-700 text-sm"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                            <div className="space-y-3">
                                                <div>
                                                    <label className="block text-xs text-slate-500 mb-1">Question</label>
                                                    <input
                                                        type="text"
                                                        value={faq.question}
                                                        onChange={(e) => updateFaq(index, 'question', e.target.value)}
                                                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-1 focus:ring-navy-600 focus:border-navy-600 outline-none bg-white"
                                                        placeholder="e.g., What documents are required?"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs text-slate-500 mb-1">Answer</label>
                                                    <textarea
                                                        value={faq.answer}
                                                        onChange={(e) => updateFaq(index, 'answer', e.target.value)}
                                                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-1 focus:ring-navy-600 focus:border-navy-600 outline-none bg-white"
                                                        rows={2}
                                                        placeholder="e.g., You will need a PAN Card, Aadhaar Card, and address proof..."
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Form Actions */}
                        <div className="flex gap-3 pt-4 border-t border-slate-200">
                            <button
                                type="submit"
                                disabled={saving}
                                className="px-6 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700 disabled:opacity-50 transition-colors"
                            >
                                {saving ? 'Saving...' : editingId ? 'Update Service' : 'Create Service'}
                            </button>
                            <button
                                type="button"
                                onClick={cancelForm}
                                className="px-6 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Folder-Style Category Tabs */}
            <div className="mb-0">
                <div className="flex items-end gap-0 relative">
                    {/* Tab baseline */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-slate-200 z-0" />

                    {/* All Tab */}
                    <button
                        onClick={() => setSelectedCategory('all')}
                        className={`
                            relative px-8 py-3 text-sm font-medium transition-all duration-200
                            ${selectedCategory === 'all'
                                ? 'text-white z-20'
                                : 'text-slate-600 hover:text-slate-900 z-10'
                            }
                        `}
                        style={{
                            marginRight: '-12px',
                        }}
                    >
                        {/* Tab shape with SVG for perfect rounded corners */}
                        <svg
                            className="absolute inset-0 w-full h-full"
                            viewBox="0 0 100 40"
                            preserveAspectRatio="none"
                            style={{ filter: selectedCategory === 'all' ? 'drop-shadow(0 -2px 4px rgba(0,0,0,0.1))' : 'none' }}
                        >
                            <path
                                d="M 12 40 
                                   Q 12 40, 8 36 
                                   L 2 10 
                                   Q 0 4, 6 2 
                                   L 16 0 
                                   L 84 0 
                                   Q 94 0, 98 10 
                                   L 100 36 
                                   Q 100 40, 88 40 
                                   Z"
                                fill={selectedCategory === 'all' ? '#1e293b' : '#f1f5f9'}
                                className="transition-all duration-200"
                            />
                        </svg>
                        <span className="relative z-10">All</span>
                    </button>

                    {/* Category Tabs */}
                    {Object.entries(categories).map(([value, label]) => (
                        <button
                            key={value}
                            onClick={() => setSelectedCategory(value)}
                            className={`
                                relative px-8 py-3 text-sm font-medium transition-all duration-200
                                ${selectedCategory === value
                                    ? 'text-white z-20'
                                    : 'text-slate-600 hover:text-slate-900 z-10'
                                }
                            `}
                            style={{
                                marginRight: '-12px',
                            }}
                        >
                            {/* Tab shape with SVG for perfect rounded corners */}
                            <svg
                                className="absolute inset-0 w-full h-full"
                                viewBox="0 0 100 40"
                                preserveAspectRatio="none"
                                style={{ filter: selectedCategory === value ? 'drop-shadow(0 -2px 4px rgba(0,0,0,0.1))' : 'none' }}
                            >
                                <path
                                    d="M 12 40 
                                       Q 12 40, 8 36 
                                       L 2 10 
                                       Q 0 4, 6 2 
                                       L 16 0 
                                       L 84 0 
                                       Q 94 0, 98 10 
                                       L 100 36 
                                       Q 100 40, 88 40 
                                       Z"
                                    fill={selectedCategory === value ? '#1e293b' : '#f1f5f9'}
                                    className="transition-all duration-200"
                                />
                            </svg>
                            <span className="relative z-10">{label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Services List */}
            {loading ? (
                <div className="flex items-center justify-center py-12 bg-white rounded-b-xl border border-slate-200 border-t-0">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-navy-600"></div>
                </div>
            ) : services.filter(s => selectedCategory === 'all' || s.category === selectedCategory).length === 0 ? (
                <div className="bg-white rounded-b-xl p-12 text-center border border-slate-200 border-t-0">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-slate-900 mb-1">
                        {selectedCategory === 'all' ? 'No services yet' : `No ${categories[selectedCategory]} services`}
                    </h3>
                    <p className="text-slate-500 mb-4">
                        {selectedCategory === 'all'
                            ? 'Get started by adding your first service'
                            : 'Add a service in this category or select a different tab'}
                    </p>
                    <button
                        onClick={() => setShowForm(true)}
                        className="px-4 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors"
                    >
                        Add Service
                    </button>
                </div>
            ) : (
                <div className="bg-white rounded-b-xl shadow-sm border border-slate-200 border-t-0 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">Order</th>
                                <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">Service</th>
                                <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">Category</th>
                                <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">Features</th>
                                <th className="text-left px-6 py-3 text-sm font-medium text-slate-600">Status</th>
                                <th className="text-right px-6 py-3 text-sm font-medium text-slate-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.filter(s => selectedCategory === 'all' || s.category === selectedCategory).map((service) => (
                                <tr key={service._id} className="border-b border-slate-100 hover:bg-slate-50">
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-slate-500">{service.order}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="font-medium text-slate-900">{service.title}</p>
                                        <p className="text-sm text-slate-500 line-clamp-1">{service.tagline}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-navy-600/10 text-navy-600 text-xs font-medium rounded">
                                            {categories[service.category] || service.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-slate-600">
                                            {service.features?.length || 0} features, {service.faqs?.length || 0} FAQs
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleToggleStatus(service)}
                                            className={`px-2 py-1 text-xs font-medium rounded cursor-pointer ${service.isActive
                                                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                                }`}
                                        >
                                            {service.isActive ? 'Active' : 'Inactive'}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => handleEdit(service)}
                                                className="text-navy-600 hover:text-navy-800 text-sm font-medium"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(service._id)}
                                                className="text-red-600 hover:text-red-800 text-sm font-medium"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
