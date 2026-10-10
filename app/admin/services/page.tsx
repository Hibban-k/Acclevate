"use client";

import { useEffect, useState } from "react";
import { getCategoriesAction } from "@/lib/actions/categories";
import {
  getServicesAction,
  createServiceAction,
  updateServiceAction,
  deleteServiceAction,
} from "@/lib/actions/services";
import { uploadImageAction } from "@/lib/actions/upload";

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
  slug: string;
  tagline: string;
  description: string;
  category: string | { _id: string; name: string };
  coveredServices: { name: string; description: string }[];
  relatedServices: (string | { _id: string; title: string })[];
  features: Feature[];
  faqs: FAQ[];
  isActive: boolean;
  order: number;
  shortDescription: string;
  metaTitle: string;
  metaDescription: string;
  image?: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  structuredData?: any;
  createdAt: string;
  updatedAt: string;
}

interface FormData {
  title: string;
  slug: string;
  tagline: string;
  description: string;
  category: string;
  coveredServices: { name: string; description: string }[];
  relatedServices: string[];
  features: Feature[];
  faqs: FAQ[];
  isActive: boolean;
  order: number;
  shortDescription: string;
  metaTitle: string;
  metaDescription: string;
  image: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  canonicalUrl: string;
  structuredData: string;
}

const emptyFormData: FormData = {
  title: "",
  slug: "",
  tagline: "",
  description: "",
  category: "strategy",
  coveredServices: [],
  relatedServices: [],
  features: [],
  faqs: [],
  isActive: true,
  order: 0,
  shortDescription: "",
  metaTitle: "",
  metaDescription: "",
  image: "",
  keywords: "",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  canonicalUrl: "",
  structuredData: "",
};

const emptyFeature: Feature = {
  title: "",
  description: "",
};

const emptyFAQ: FAQ = {
  question: "",
  answer: "",
};

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>(emptyFormData);
  const [saving, setSaving] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: "image" | "ogImage", folder: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingField(field);
    const uploadData = new FormData();
    uploadData.append("file", file);

    try {
      const url = await uploadImageAction(uploadData, folder);
      setFormData((prev) => ({ ...prev, [field]: url }));
    } catch (error: any) {
      console.error("Upload failed", error);
      alert("Failed to upload image: " + error.message);
    } finally {
      setUploadingField(null);
    }
  };
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [relatedServicesStr, setRelatedServicesStr] = useState<string>("");
  
  async function fetchData() {
    try {
      const [servicesData, categoriesData] = await Promise.all([
        getServicesAction(),
        getCategoriesAction()
      ]);
      setServices(Array.isArray(servicesData) ? servicesData : []);
      setCategories(Array.isArray(categoriesData) ? categoriesData : []);
      
      if (Array.isArray(categoriesData) && categoriesData.length > 0) {
          emptyFormData.category = categoriesData[0]._id;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    let parsedStructuredData = null;
    if (formData.structuredData.trim()) {
      try {
        parsedStructuredData = JSON.parse(formData.structuredData);
      } catch (e) {
        alert("Invalid JSON in Structured Data. Please provide valid JSON or leave it blank.");
        setSaving(false);
        return;
      }
    }

    const dataToSave = {
      ...formData,
      keywords: formData.keywords.split(",").map((k) => k.trim()).filter(Boolean),
      structuredData: parsedStructuredData,
      relatedServices: relatedServicesStr
        .split(",")
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
      setRelatedServicesStr("");
      fetchData();
    } catch (error: any) {
      console.error("Error saving service:", error);
      alert(error.message || "Failed to save service");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (service: Service) => {
    setFormData({
      title: service.title,
      slug: service.slug || "",
      tagline: service.tagline,
      description: service.description,
      category: typeof service.category === "object" && service.category !== null ? (service.category as any)._id : service.category,
      coveredServices: service.coveredServices?.map(cs => ({ name: cs.name || "", description: cs.description || "" })) || [],
      relatedServices: service.relatedServices?.map(rs => typeof rs === "object" ? (rs as any)._id : rs) || [],
      features: service.features || [],
      faqs: service.faqs || [],
      isActive: service.isActive,
      order: service.order,
      shortDescription: service.shortDescription || "",
      metaTitle: service.metaTitle || "",
      metaDescription: service.metaDescription || "",
        image: service.image || "",
        keywords: service.keywords?.join(", ") || "",
        ogTitle: service.ogTitle || "",
        ogDescription: service.ogDescription || "",
        ogImage: service.ogImage || "",
        canonicalUrl: service.canonicalUrl || "",
        structuredData: service.structuredData ? JSON.stringify(service.structuredData, null, 2) : "",
      });
    setRelatedServicesStr(
      service.relatedServices ? service.relatedServices.map(rs => typeof rs === "object" ? (rs as any)._id : rs).join(", ") : "",
    );
        setEditingId(service._id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    try {
      await deleteServiceAction(id);
      fetchData();
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  const handleToggleStatus = async (service: Service) => {
    try {
      await updateServiceAction(service._id, {
        ...service,
        isActive: !service.isActive,
      });
      fetchData();
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData(emptyFormData);
    setRelatedServicesStr("");
      };

  // Covered Services management
  const addCoveredService = () => {
    setFormData({
      ...formData,
      coveredServices: [...formData.coveredServices, { name: "", description: "" }],
    });
  };

  const updateCoveredService = (index: number, field: "name" | "description", value: string) => {
    const updated = [...formData.coveredServices];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, coveredServices: updated });
  };

  const removeCoveredService = (index: number) => {
    setFormData({
      ...formData,
      coveredServices: formData.coveredServices.filter((_, i) => i !== index),
    });
  };

  // Feature management
  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, { ...emptyFeature }],
    });
  };

  const updateFeature = (
    index: number,
    field: keyof Feature,
    value: string,
  ) => {
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
          <h1 className="text-3xl font-bold text-text-primary">Services</h1>
          <p className="text-text-secondary mt-1">Manage your services</p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-charcoal text-white rounded-lg hover:bg-charcoal transition-colors flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Service
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h2 className="text-xl font-semibold mb-6">
            {editingId ? "Edit Service" : "Add New Service"}
          </h2>
          <form onSubmit={handleSubmit}>
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-navy-600 focus:border-charcoal outline-none border border-slate-200"
                    placeholder="e.g., Business Consulting"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-navy-600 focus:border-charcoal outline-none border border-slate-200"
                  >
                    {categories.map((cat) => (<option key={cat._id} value={cat._id}>{cat.name}</option>))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Tagline <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-navy-600 focus:border-charcoal outline-none border border-slate-200"
                    placeholder="A short catchy tagline"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Slug
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-navy-600 focus:border-charcoal outline-none border border-slate-200"
                    placeholder="auto-generated if empty"
                  />
                </div>
              </div>

              {/* Main Content */}
              <div className="mb-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Short Description (Summary)
                  </label>
                  <textarea
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-navy-600 focus:border-charcoal bg-white"
                    rows={2}
                    placeholder="Brief summary for listings"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-navy-600 focus:border-charcoal outline-none border border-slate-200 min-h-[120px]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Main Image
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="flex-1 px-3 py-2 rounded-lg focus:ring-2 focus:ring-navy-600 focus:border-charcoal outline-none border border-slate-200"
                      placeholder="Image URL or upload"
                    />
                    <label className="cursor-pointer px-4 py-2 bg-slate-100 hover:bg-slate-200 text-sm font-medium text-slate-700 rounded-lg flex items-center justify-center transition-colors">
                      {uploadingField === 'image' ? 'Uploading...' : 'Upload'}
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={(e) => handleImageUpload(e, 'image', 'services')}
                        disabled={uploadingField === 'image'}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Lists and Relationships */}
              <div className="mb-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Related Services (Comma-separated ObjectIds)
                  </label>
                  <input
                    type="text"
                    value={relatedServicesStr}
                    onChange={(e) => setRelatedServicesStr(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-navy-600 focus:border-charcoal outline-none border border-slate-200"
                    placeholder="e.g., 60f1b..."
                  />
                </div>

                {/* Covered Services Section */}
                <div className="pt-6 border-t border-slate-100">
                  <div className="flex justify-between items-center mb-4">
                    <label className="block text-sm font-medium text-text-primary">
                      Covered Services
                    </label>
                    <button
                      type="button"
                      onClick={addCoveredService}
                      className="text-xs px-3 py-1.5 bg-background text-text-secondary rounded-lg hover:bg-slate-200"
                    >
                      + Add Covered Service
                    </button>
                  </div>
                  {formData.coveredServices.length === 0 ? (
                    <p className="text-sm text-text-secondary italic">
                      No covered services added yet
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {formData.coveredServices.map((cs, index) => (
                        <div key={index} className="p-4 bg-background rounded-lg border border-slate-100">
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                              Service {index + 1}
                            </h4>
                            <button
                              type="button"
                              onClick={() => removeCoveredService(index)}
                              className="text-red-500 hover:text-red-700 p-1"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <label className="block text-xs text-text-secondary mb-1">Name</label>
                              <input
                                type="text"
                                value={cs.name}
                                onChange={(e) => updateCoveredService(index, "name", e.target.value)}
                                className="w-full px-3 py-2 text-sm rounded-lg focus:ring-1 focus:ring-navy-600 focus:border-charcoal outline-none bg-white border border-slate-200"
                                placeholder="Service name"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-text-secondary mb-1">Short Description</label>
                              <input
                                type="text"
                                value={cs.description}
                                onChange={(e) => updateCoveredService(index, "description", e.target.value)}
                                className="w-full px-3 py-2 text-sm rounded-lg focus:ring-1 focus:ring-navy-600 focus:border-charcoal outline-none bg-white border border-slate-200"
                                placeholder="Brief description"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Features Section */}
                <div className="pt-6 border-t border-slate-100">
                  <div className="flex justify-between items-center mb-4">
                    <label className="block text-sm font-medium text-text-primary">
                      Features
                    </label>
                    <button
                      type="button"
                      onClick={addFeature}
                      className="text-xs px-3 py-1.5 bg-background text-text-secondary rounded-lg hover:bg-slate-200"
                    >
                      + Add Feature
                    </button>
                  </div>
                  {formData.features.length === 0 ? (
                    <p className="text-sm text-text-secondary italic">
                      No features added yet
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {formData.features.map((feature, index) => (
                        <div key={index} className="p-4 bg-background rounded-lg border border-slate-100">
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                              Feature {index + 1}
                            </h4>
                            <button
                              type="button"
                              onClick={() => removeFeature(index)}
                              className="text-red-500 hover:text-red-700 p-1"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <label className="block text-xs text-text-secondary mb-1">Title</label>
                              <input
                                type="text"
                                value={feature.title}
                                onChange={(e) => updateFeature(index, "title", e.target.value)}
                                className="w-full px-2 py-1.5 text-sm rounded-lg border border-slate-200"
                                placeholder="Feature title"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-text-secondary mb-1">Description</label>
                              <input
                                type="text"
                                value={feature.description}
                                onChange={(e) => updateFeature(index, "description", e.target.value)}
                                className="w-full px-2 py-1.5 text-sm rounded-lg border border-slate-200"
                                placeholder="Feature description"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* FAQs Section */}
                <div className="pt-6 border-t border-slate-100">
                  <div className="flex justify-between items-center mb-4">
                    <label className="block text-sm font-medium text-text-primary">
                      FAQs
                    </label>
                    <button
                      type="button"
                      onClick={addFaq}
                      className="text-xs px-3 py-1.5 bg-background text-text-secondary rounded-lg hover:bg-slate-200"
                    >
                      + Add FAQ
                    </button>
                  </div>
                  {formData.faqs.length === 0 ? (
                    <p className="text-sm text-text-secondary italic">
                      No FAQs added yet
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {formData.faqs.map((faq, index) => (
                        <div key={index} className="p-4 bg-background rounded-lg border border-slate-100">
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                              FAQ {index + 1}
                            </h4>
                            <button
                              type="button"
                              onClick={() => removeFaq(index)}
                              className="text-red-500 hover:text-red-700 p-1"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <label className="block text-xs text-text-secondary mb-1">Question</label>
                              <input
                                type="text"
                                value={faq.question}
                                onChange={(e) => updateFaq(index, "question", e.target.value)}
                                className="w-full px-3 py-2 text-sm rounded-lg focus:ring-1 focus:ring-navy-600 focus:border-charcoal outline-none bg-white border border-slate-200"
                                placeholder="e.g., What documents are required?"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-text-secondary mb-1">Answer</label>
                              <textarea
                                value={faq.answer}
                                onChange={(e) => updateFaq(index, "answer", e.target.value)}
                                className="w-full px-3 py-2 text-sm rounded-lg focus:ring-1 focus:ring-navy-600 focus:border-charcoal outline-none bg-white border border-slate-200"
                                rows={2}
                                placeholder="Clear and concise answer"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Configuration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 pt-6 border-t border-slate-100">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-navy-600 focus:border-charcoal outline-none border border-slate-200"
                  />
                </div>
                <div className="flex items-center">
                  <label className="relative inline-flex items-center cursor-pointer mt-6">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-navy-600/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-charcoal"></div>
                    <span className="ml-3 text-sm font-medium text-text-secondary">
                      Active
                    </span>
                  </label>
                </div>
              </div>

              {/* SEO & Advanced Section */}
              <div className="mb-8 border border-slate-200 p-6 rounded-xl space-y-8 bg-slate-50/50">
                <div>
                  <h3 className="font-medium text-slate-800 mb-4 border-b pb-2">SEO & Metadata Settings</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1">Meta Title</label>
                        <input
                          type="text"
                          value={formData.metaTitle}
                          onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                          className="w-full px-4 py-2 border border-border rounded-lg outline-none focus:ring-2 focus:ring-navy-600 focus:border-charcoal bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1">Canonical URL</label>
                        <input
                          type="text"
                          value={formData.canonicalUrl}
                          onChange={(e) => setFormData({ ...formData, canonicalUrl: e.target.value })}
                          className="w-full px-4 py-2 border border-border rounded-lg outline-none focus:ring-2 focus:ring-navy-600 focus:border-charcoal bg-white"
                          placeholder="https://acclevate.com/services/..."
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1">Meta Description</label>
                      <textarea
                        value={formData.metaDescription}
                        onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                        className="w-full px-4 py-2 border border-border rounded-lg outline-none focus:ring-2 focus:ring-navy-600 focus:border-charcoal bg-white"
                        rows={2}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1">Keywords (Comma-separated)</label>
                      <input
                        type="text"
                        value={formData.keywords}
                        onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                        className="w-full px-4 py-2 border border-border rounded-lg outline-none focus:ring-2 focus:ring-navy-600 focus:border-charcoal bg-white"
                        placeholder="accounting, gst filing, business growth"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-slate-800 mb-4 border-b pb-2">Social / Open Graph (OG)</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1">OG Title</label>
                        <input
                          type="text"
                          value={formData.ogTitle}
                          onChange={(e) => setFormData({ ...formData, ogTitle: e.target.value })}
                          className="w-full px-4 py-2 border border-border rounded-lg outline-none focus:ring-2 focus:ring-navy-600 focus:border-charcoal bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1">OG Image</label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={formData.ogImage}
                              onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
                              className="flex-1 px-4 py-2 border border-border rounded-lg outline-none focus:ring-2 focus:ring-navy-600 focus:border-charcoal bg-white"
                              placeholder="URL or upload"
                            />
                            <label className="cursor-pointer px-3 py-2 bg-slate-100 hover:bg-slate-200 text-sm font-medium text-slate-700 rounded-lg flex items-center justify-center transition-colors border border-border">
                              {uploadingField === 'ogImage' ? '...' : 'Upload'}
                              <input 
                                type="file" 
                                accept="image/*" 
                                className="hidden" 
                                onChange={(e) => handleImageUpload(e, 'ogImage', 'og-images')}
                                disabled={uploadingField === 'ogImage'}
                              />
                            </label>
                          </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1">OG Description</label>
                      <textarea
                        value={formData.ogDescription}
                        onChange={(e) => setFormData({ ...formData, ogDescription: e.target.value })}
                        className="w-full px-4 py-2 border border-border rounded-lg outline-none focus:ring-2 focus:ring-navy-600 focus:border-charcoal bg-white"
                        rows={2}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-slate-800 mb-4 border-b pb-2">Advanced</h3>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Structured Data (JSON-LD Schema)</label>
                    <textarea
                      value={formData.structuredData}
                      onChange={(e) => setFormData({ ...formData, structuredData: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg outline-none focus:ring-2 focus:ring-navy-600 focus:border-charcoal bg-white font-mono text-xs"
                      rows={6}
                      placeholder='{ "@context": "https://schema.org", "@type": "Service", ... }'
                    />
                    <p className="text-xs text-text-secondary mt-1">Provide a valid JSON object. Will be injected as application/ld+json.</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={cancelForm}
                  className="px-4 py-2 text-sm font-medium text-text-secondary bg-background hover:bg-slate-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 text-sm font-medium text-white bg-charcoal hover:bg-text-primary rounded-lg transition-colors disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Service"}
                </button>
              </div>
            </form>
        </div>
      )}

      {/* Folder-Style Category Tabs */}
      <div className="mb-0">
        <div className="flex items-end gap-0 relative overflow-x-auto hide-scrollbar">
          {/* Tab baseline */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-slate-200 z-0" />

          {/* All Tab */}
          <button
            onClick={() => setSelectedCategory("all")}
            className={`
                            relative shrink-0 whitespace-nowrap px-8 py-3 text-sm font-medium transition-all duration-200
                            ${
                              selectedCategory === "all"
                                ? "text-white z-20"
                                : "text-text-secondary hover:text-text-primary z-10"
                            }
                        `}
            style={{
              marginRight: "-12px",
            }}
          >
            {/* Tab shape with SVG for perfect rounded corners */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 40"
              preserveAspectRatio="none"
              style={{
                filter:
                  selectedCategory === "all"
                    ? "drop-shadow(0 -2px 4px rgba(0,0,0,0.1))"
                    : "none",
              }}
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
                fill={selectedCategory === "all" ? "#1e293b" : "#f1f5f9"}
                className="transition-all duration-200"
              />
            </svg>
            <span className="relative z-10">All</span>
          </button>

          {/* Category Tabs */}
          {categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => setSelectedCategory(cat._id)}
                className={`relative shrink-0 whitespace-nowrap px-8 py-3 text-sm font-medium transition-all duration-200 ${selectedCategory === cat._id ? "text-white z-20" : "text-text-secondary hover:text-text-primary z-10"}`}
                style={{ marginRight: "-12px" }}
              >
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none" style={{ filter: selectedCategory === cat._id ? "drop-shadow(0 -2px 4px rgba(0,0,0,0.1))" : "none" }}>
                  <path d="M 12 40 Q 12 40, 8 36 L 2 10 Q 0 4, 6 2 L 16 0 Q 100 40, 88 40 Z" fill={selectedCategory === cat._id ? "#1e293b" : "#f1f5f9"} className="transition-all duration-200" />
                </svg>
                <span className="relative z-10">{cat.name}</span>
              </button>
            ))}
        </div>
      </div>

      {/* Services List */}
      {loading ? (
        <div className="flex items-center justify-center py-12 bg-white rounded-b-xl border-t-0">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-charcoal"></div>
        </div>
      ) : services.filter(
          (s) => selectedCategory === "all" || s.category === selectedCategory || (typeof s.category === "object" && s.category !== null && (s.category as any)._id === selectedCategory),
        ).length === 0 ? (
        <div className="bg-white rounded-b-xl p-12 text-center border-t-0">
          <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-text-primary mb-1">
            {selectedCategory === "all"
              ? "No services yet"
              : `No ${categories.find(c => c._id === selectedCategory)?.name || "selected"} services`}
          </h3>
          <p className="text-text-secondary mb-4">
            {selectedCategory === "all"
              ? "Get started by adding your first service"
              : "Add a service in this category or select a different tab"}
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-charcoal text-white rounded-lg hover:bg-charcoal transition-colors"
          >
            Add Service
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-b-xl shadow-sm border-t-0 overflow-hidden">
          <table className="w-full">
            <thead className="bg-background">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-medium text-text-secondary">
                  Order
                </th>
                <th className="text-left px-6 py-3 text-sm font-medium text-text-secondary">
                  Service
                </th>
                <th className="text-left px-6 py-3 text-sm font-medium text-text-secondary">
                  Category
                </th>
                <th className="text-left px-6 py-3 text-sm font-medium text-text-secondary">
                  Features
                </th>
                <th className="text-left px-6 py-3 text-sm font-medium text-text-secondary">
                  Status
                </th>
                <th className="text-right px-6 py-3 text-sm font-medium text-text-secondary">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {services
                .filter(
                  (s) =>
                    selectedCategory === "all" ||
                    s.category === selectedCategory || (typeof s.category === "object" && s.category !== null && (s.category as any)._id === selectedCategory),
                )
                .map((service) => (
                  <tr key={service._id} className="hover:bg-background">
                    <td className="px-6 py-4">
                      <span className="text-sm text-text-secondary">
                        {service.order}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-text-primary">
                        {service.title}
                      </p>
                      <p className="text-sm text-text-secondary line-clamp-1">
                        {service.tagline}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-charcoal/10 text-charcoal text-xs font-medium rounded">
                        {(typeof service.category === 'object' && service.category !== null) ? (service.category as any).name : (categories.find(c => c._id === service.category)?.name || service.category as string)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-text-secondary">
                        {service.features?.length || 0} features,{" "}
                        {service.faqs?.length || 0} FAQs
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleStatus(service)}
                        className={`px-2 py-1 text-xs font-medium rounded cursor-pointer ${
                          service.isActive
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-background text-text-secondary hover:bg-slate-200"
                        }`}
                      >
                        {service.isActive ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(service)}
                          className="text-charcoal hover:text-text-primary text-sm font-medium"
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








