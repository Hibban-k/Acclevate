'use client';

import { useEffect, useState } from 'react';
import { getCategoriesAction, createCategoryAction, updateCategoryAction, deleteCategoryAction } from '@/lib/actions/categories';
import { uploadImageAction } from '@/lib/actions/upload';
import slugify from 'slugify';

interface CategoryDetail {
    heading: string;
    shortPoint: string;
}

interface Category {
    _id: string;
    name: string;
    slug: string;
    details: CategoryDetail[];
    shortDescription: string;
    img: string;
    image?: string;
    isActive: boolean;
    order: number;
    metaTitle?: string;
    metaDescription?: string;
}

const emptyForm = {
    name: '',
    slug: '',
    details: [],
    shortDescription: '',
    img: '',
    isActive: true,
    order: 0,
    metaTitle: '',
    metaDescription: '',
};

const emptyDetail = { heading: '', shortPoint: '' };

export default function AdminCategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState<{
        name: string;
        slug: string;
        details: CategoryDetail[];
        shortDescription: string;
        img: string;
        isActive: boolean;
        order: number;
        metaTitle: string;
        metaDescription: string;
    }>(emptyForm);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingImage(true);
        const uploadData = new FormData();
        uploadData.append('file', file);

        try {
            const url = await uploadImageAction(uploadData, 'categories');
            setFormData(prev => ({ ...prev, img: url }));
        } catch (error: any) {
            console.error('Upload failed', error);
            alert('Failed to upload image: ' + (error.message || 'Unknown error'));
        } finally {
            setUploadingImage(false);
        }
    };

    async function fetchCategories() {
        try {
            setLoading(true);
            const data = await getCategoriesAction();
            setCategories(data || []);
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    const toggleStatus = async (id: string, isActive: boolean) => {
        try {
            await updateCategoryAction(id, { isActive: !isActive });
            fetchCategories();
        } catch (error) {
            console.error(error);
        }
    };

    const deleteCategory = async (id: string) => {
        if (!confirm('Are you sure you want to delete this category?')) return;
        try {
            await deleteCategoryAction(id);
            fetchCategories();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (cat: Category) => {
        setFormData({
            name: cat.name,
            slug: cat.slug,
            details: cat.details || [],
            shortDescription: cat.shortDescription || '',
            img: cat.img || cat.image || '',
            isActive: cat.isActive,
            order: cat.order || 0,
            metaTitle: cat.metaTitle || '',
            metaDescription: cat.metaDescription || '',
        });
        setEditingId(cat._id);
        setShowForm(true);
    };

    const addDetail = () => {
        setFormData(prev => ({
            ...prev,
            details: [...prev.details, { ...emptyDetail }]
        }));
    };

    const updateDetail = (index: number, field: keyof CategoryDetail, value: string) => {
        const updated = [...formData.details];
        updated[index] = { ...updated[index], [field]: value };
        setFormData(prev => ({ ...prev, details: updated }));
    };

    const removeDetail = (index: number) => {
        setFormData(prev => ({
            ...prev,
            details: prev.details.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const submitData: any = { ...formData, image: formData.img };
            if (!submitData.slug) {
                submitData.slug = slugify(submitData.name, { lower: true, strict: true });
            }
            if (editingId) {
                await updateCategoryAction(editingId, submitData);
            } else {
                await createCategoryAction(submitData);
            }
            setShowForm(false);
            setEditingId(null);
            setFormData(emptyForm);
            fetchCategories();
        } catch (error) {
            console.error('Failed to save category', error);
            alert('Error saving category');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div>
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Categories</h1>
                    <p className="text-slate-500 mt-1">Manage service categories</p>
                </div>
                {!showForm && (
                    <button
                        onClick={() => {
                            setFormData(emptyForm);
                            setEditingId(null);
                            setShowForm(true);
                        }}
                        className="px-4 py-2 bg-charcoal text-white rounded-lg hover:bg-charcoal transition-colors flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Category
                    </button>
                )}
            </div>

            {showForm && (
                <div className="bg-white rounded-xl shadow-sm border border-border p-6 mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-text-primary">
                            {editingId ? 'Edit Category' : 'New Category'}
                        </h2>
                        <button type="button" onClick={() => setShowForm(false)} className="text-text-secondary hover:text-text-primary">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-text-secondary mb-2">Name *</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2 border border-border rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-secondary mb-2">Slug</label>
                                <input
                                    type="text"
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    placeholder="auto-generated if empty"
                                    className="w-full px-4 py-2 border border-border rounded-lg"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-text-secondary mb-2">Short Description</label>
                                <textarea
                                    value={formData.shortDescription}
                                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                                    className="w-full px-4 py-2 border border-border rounded-lg"
                                    rows={2}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-text-secondary mb-2">Category Image</label>
                                <div className="flex gap-2 items-center">
                                    <input
                                        type="text"
                                        value={formData.img}
                                        onChange={(e) => setFormData({ ...formData, img: e.target.value })}
                                        placeholder="Paste image URL or click Upload"
                                        className="flex-1 px-4 py-2 border border-border rounded-lg outline-none focus:ring-2 focus:ring-brand-primary"
                                    />
                                    <label className="cursor-pointer px-4 py-2 bg-slate-100 hover:bg-slate-200 text-sm font-medium text-slate-700 rounded-lg flex items-center justify-center transition-colors border border-border shrink-0">
                                        {uploadingImage ? (
                                            <span className="flex items-center gap-2">
                                                <svg className="animate-spin h-4 w-4 text-brand-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Uploading...
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1.5">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                                </svg>
                                                Upload Image
                                            </span>
                                        )}
                                        <input 
                                            type="file" 
                                            accept="image/*" 
                                            className="hidden" 
                                            onChange={handleImageUpload}
                                            disabled={uploadingImage}
                                        />
                                    </label>
                                    {formData.img && (
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, img: '' })}
                                            className="px-3 py-2 text-xs text-red-600 hover:bg-red-50 rounded-lg border border-red-200 transition-colors shrink-0"
                                            title="Clear image"
                                        >
                                            Clear
                                        </button>
                                    )}
                                </div>
                                {formData.img && (
                                    <div className="mt-3 flex items-center gap-3 p-2 bg-slate-50 border border-border rounded-lg w-fit">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img 
                                            src={formData.img} 
                                            alt="Category preview" 
                                            className="w-16 h-12 object-cover rounded-md border border-border"
                                        />
                                        <div className="text-xs text-text-secondary pr-2">
                                            <span className="font-medium text-text-primary block">Current Image Preview</span>
                                            <span className="truncate max-w-[280px] block text-slate-400">{formData.img}</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Details Array */}
                            <div className="md:col-span-2 border border-slate-200 p-4 rounded-xl">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-medium text-slate-800">Category Details</h3>
                                    <button type="button" onClick={addDetail} className="text-brand-primary text-sm font-medium hover:underline">+ Add Detail</button>
                                </div>
                                {formData.details.map((detail, index) => (
                                    <div key={index} className="flex gap-4 mb-3 items-start">
                                        <div className="flex-1 space-y-2">
                                            <input 
                                                type="text" 
                                                placeholder="Heading" 
                                                value={detail.heading} 
                                                onChange={(e) => updateDetail(index, 'heading', e.target.value)}
                                                className="w-full px-3 py-1.5 border border-border rounded-lg text-sm"
                                            />
                                            <input 
                                                type="text" 
                                                placeholder="Short Point" 
                                                value={detail.shortPoint} 
                                                onChange={(e) => updateDetail(index, 'shortPoint', e.target.value)}
                                                className="w-full px-3 py-1.5 border border-border rounded-lg text-sm"
                                            />
                                        </div>
                                        <button type="button" onClick={() => removeDetail(index)} className="mt-1 text-red-500 hover:text-red-700">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* SEO Meta */}
                            <div className="md:col-span-2 border border-slate-200 p-4 rounded-xl space-y-4">
                                <h3 className="font-medium text-slate-800">SEO Settings</h3>
                                <div>
                                    <label className="block text-sm font-medium text-text-secondary mb-1">Meta Title</label>
                                    <input
                                        type="text"
                                        value={formData.metaTitle}
                                        onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                                        className="w-full px-4 py-2 border border-border rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-secondary mb-1">Meta Description</label>
                                    <textarea
                                        value={formData.metaDescription}
                                        onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                                        className="w-full px-4 py-2 border border-border rounded-lg"
                                        rows={2}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-text-secondary mb-2">Order</label>
                                <input
                                    type="number"
                                    value={formData.order}
                                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                                    className="w-full px-4 py-2 border border-border rounded-lg"
                                />
                            </div>
                            <div className="flex items-end mb-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.isActive}
                                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                        className="w-4 h-4 rounded border-border text-brand-primary focus:ring-brand-primary"
                                    />
                                    <span className="text-sm font-medium text-text-primary">Is Active</span>
                                </label>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="submit"
                                disabled={saving}
                                className="px-6 py-2 bg-charcoal text-white rounded-lg disabled:opacity-50"
                            >
                                {saving ? 'Saving...' : (editingId ? 'Update' : 'Create')}
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="px-6 py-2 border border-border rounded-lg hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {!showForm && (
                loading ? (
                    <div className="text-slate-500 flex justify-center py-10">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-800"></div>
                    </div>
                ) : categories.length === 0 ? (
                    <div className="bg-white rounded-xl p-8 text-center text-slate-500 border border-slate-100 shadow-sm">
                        No categories found. Create one above!
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-slate-50 border-b border-slate-100">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Order</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Name</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Status</th>
                                    <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {categories.map((cat) => (
                                    <tr key={cat._id} className="hover:bg-slate-50">
                                        <td className="px-6 py-4 text-slate-600 font-medium">{cat.order}</td>
                                        <td className="px-6 py-4">
                                            <div className="text-slate-800 font-medium">{cat.name}</div>
                                            <div className="text-slate-400 text-sm">/{cat.slug}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button 
                                                onClick={() => toggleStatus(cat._id, cat.isActive)}
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                    cat.isActive 
                                                        ? 'bg-green-100 text-green-700' 
                                                        : 'bg-slate-100 text-slate-500'
                                                }`}
                                            >
                                                {cat.isActive ? 'Active' : 'Inactive'}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button 
                                                onClick={() => handleEdit(cat)}
                                                className="text-brand-primary hover:text-navy-700 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors mr-2"
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                onClick={() => deleteCategory(cat._id)}
                                                className="text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
            )}
        </div>
    );
}
