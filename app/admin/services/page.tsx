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

interface InternalLink {
  targetService: string;
  anchorText: string;
  isPrimary: boolean;
}

interface Service {
  _id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  category: string | { _id: string; name: string };
  coveredServices: { name: string; description: string }[];
  relatedServices: (string | { _id: string; title: string; category?: any })[];
  internalLinks?: {
    targetService: string | { _id: string; title: string; category?: any };
    anchorText: string;
    isPrimary: boolean;
  }[];
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
  internalLinks: InternalLink[];
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
  internalLinks: [],
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
  const [relatedSearch, setRelatedSearch] = useState<string>("");
  const [relatedCategoryFilter, setRelatedCategoryFilter] = useState<string>("all");
  
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
      relatedServices: formData.relatedServices,
      internalLinks: formData.internalLinks.filter(
        (l) => l.targetService && l.anchorText.trim()
      ),
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
      setRelatedSearch("");
      setRelatedCategoryFilter("all");
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
      relatedServices: Array.isArray(service.relatedServices)
        ? service.relatedServices
            .map((rs: any) => (typeof rs === "object" && rs !== null ? rs._id : rs))
            .filter(Boolean)
        : [],
      internalLinks: Array.isArray(service.internalLinks)
        ? service.internalLinks
            .map((il: any) => ({
              targetService:
                typeof il.targetService === "object" && il.targetService !== null
                  ? il.targetService._id
                  : il.targetService || "",
              anchorText: il.anchorText || "",
              isPrimary: !!il.isPrimary,
            }))
            .filter((il: any) => Boolean(il.targetService))
        : [],
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
    setEditingId(service._id);
    setRelatedSearch("");
    setRelatedCategoryFilter("all");
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
    setRelatedSearch("");
    setRelatedCategoryFilter("all");
  };

  // Cross Services (Related) management
  const toggleRelatedService = (serviceId: string) => {
    setFormData((prev) => {
      const exists = prev.relatedServices.includes(serviceId);
      return {
        ...prev,
        relatedServices: exists
          ? prev.relatedServices.filter((id) => id !== serviceId)
          : [...prev.relatedServices, serviceId],
      };
    });
  };

  const removeRelatedService = (serviceId: string) => {
    setFormData((prev) => ({
      ...prev,
      relatedServices: prev.relatedServices.filter((id) => id !== serviceId),
    }));
  };

  const clearAllRelatedServices = () => {
    setFormData((prev) => ({
      ...prev,
      relatedServices: [],
    }));
  };

  // Internal Links management
  const addInternalLink = () => {
    const selectable = services.filter((s) => s._id !== editingId);
    const defaultTarget = selectable[0]?._id || "";
    setFormData((prev) => ({
      ...prev,
      internalLinks: [
        ...prev.internalLinks,
        { targetService: defaultTarget, anchorText: "", isPrimary: false },
      ],
    }));
  };

  const updateInternalLink = (
    index: number,
    field: keyof InternalLink,
    value: any
  ) => {
    setFormData((prev) => {
      const updated = [...prev.internalLinks];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, internalLinks: updated };
    });
  };

  const removeInternalLink = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      internalLinks: prev.internalLinks.filter((_, i) => i !== index),
    }));
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

  const getCategoryName = (cat: any) => {
    if (!cat) return "General";
    if (typeof cat === "object" && cat.name) return cat.name;
    const found = categories.find((c) => c._id === cat || c.slug === cat);
    return found ? found.name : "General";
  };

  const selectableServices = services.filter((s) => s._id !== editingId);

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
                  {formData.image && (
                    <div className="mt-2.5 flex items-center gap-3 p-2 bg-slate-50 border border-slate-200 rounded-lg">
                      <div className="relative w-12 h-12 rounded-md overflow-hidden bg-white border border-slate-200 shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={formData.image}
                          alt="Main Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-slate-700 truncate">
                          {formData.image}
                        </p>
                        <p className="text-[10px] text-slate-400">Current service image</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, image: "" }))}
                        className="text-xs text-red-600 hover:text-red-700 px-2 py-1 hover:bg-red-50 rounded"
                        title="Remove image"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Lists and Relationships */}
              <div className="mb-6 space-y-6">
                {/* Connected Cross Services Section */}
                <div className="pt-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <label className="block text-sm font-semibold text-text-primary">
                          Connected Cross Services (Related Solutions)
                        </label>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
                          {formData.relatedServices.length} selected
                        </span>
                      </div>
                      <p className="text-xs text-text-secondary mt-0.5">
                        Select complementary services to showcase in the &ldquo;Related Services&rdquo; section on this service&rsquo;s page.
                      </p>
                    </div>
                    {formData.relatedServices.length > 0 && (
                      <button
                        type="button"
                        onClick={clearAllRelatedServices}
                        className="text-xs text-red-600 hover:text-red-700 font-medium self-start sm:self-auto"
                      >
                        Clear all
                      </button>
                    )}
                  </div>

                  {/* Selected Chips */}
                  {formData.relatedServices.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3 p-3 bg-slate-50 border border-slate-200 rounded-lg">
                      {formData.relatedServices.map((id) => {
                        const s = services.find((item) => item._id === id);
                        return (
                          <span
                            key={id}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-charcoal text-white shadow-xs"
                          >
                            <span className="opacity-70 text-[10px] uppercase tracking-wider">
                              {getCategoryName(s?.category)}
                            </span>
                            <span>•</span>
                            <span className="max-w-[200px] truncate">{s?.title || id}</span>
                            <button
                              type="button"
                              onClick={() => removeRelatedService(id)}
                              className="ml-1 hover:text-red-300 font-bold"
                              title="Remove"
                            >
                              ×
                            </button>
                          </span>
                        );
                      })}
                    </div>
                  )}

                  {/* Search & Category Filter */}
                  <div className="flex flex-col sm:flex-row gap-2 mb-3">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={relatedSearch}
                        onChange={(e) => setRelatedSearch(e.target.value)}
                        placeholder="Filter services by title or slug..."
                        className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:ring-1 focus:ring-navy-600 outline-none bg-white"
                      />
                      <svg
                        className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <select
                      value={relatedCategoryFilter}
                      onChange={(e) => setRelatedCategoryFilter(e.target.value)}
                      className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 focus:ring-1 focus:ring-navy-600 outline-none bg-white text-slate-700"
                    >
                      <option value="all">All Categories</option>
                      {categories.map((c) => (
                        <option key={c._id} value={c._id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Scrollable Selection Grid */}
                  <div className="max-h-56 overflow-y-auto border border-slate-200 rounded-lg p-2 bg-white space-y-1">
                    {selectableServices
                      .filter((s) => {
                        const matchesSearch =
                          relatedSearch.trim() === "" ||
                          s.title.toLowerCase().includes(relatedSearch.toLowerCase()) ||
                          (s.slug && s.slug.toLowerCase().includes(relatedSearch.toLowerCase()));
                        const sCatId =
                          typeof s.category === "object" && s.category !== null
                            ? (s.category as any)._id
                            : s.category;
                        const matchesCategory =
                          relatedCategoryFilter === "all" || sCatId === relatedCategoryFilter;
                        return matchesSearch && matchesCategory;
                      })
                      .map((s) => {
                        const isSelected = formData.relatedServices.includes(s._id);
                        return (
                          <div
                            key={s._id}
                            onClick={() => toggleRelatedService(s._id)}
                            className={`flex items-center justify-between p-2 rounded-lg cursor-pointer text-xs transition-colors border ${
                              isSelected
                                ? "bg-slate-100 border-charcoal/40 text-charcoal font-medium"
                                : "border-transparent hover:bg-slate-50 text-slate-700"
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => {}}
                                className="rounded border-slate-300 text-charcoal focus:ring-navy-600 pointer-events-none"
                              />
                              <span className="truncate">{s.title}</span>
                            </div>
                            <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 shrink-0 uppercase tracking-wider">
                              {getCategoryName(s.category)}
                            </span>
                          </div>
                        );
                      })}
                    {selectableServices.length === 0 && (
                      <p className="text-xs text-slate-400 py-3 text-center">
                        No other services available to link.
                      </p>
                    )}
                  </div>
                </div>

                {/* Internal Service Linking Section */}
                <div className="pt-6 border-t border-slate-100">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <label className="block text-sm font-semibold text-text-primary">
                          Internal Service Linking (In-Content Keywords)
                        </label>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
                          {formData.internalLinks.length} configured
                        </span>
                      </div>
                      <p className="text-xs text-text-secondary mt-0.5">
                        Specific keywords in the description will automatically convert into hyperlinks pointing to other services.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={addInternalLink}
                      className="text-xs px-3 py-1.5 bg-background text-text-secondary rounded-lg hover:bg-slate-200 flex items-center gap-1 self-start sm:self-auto font-medium"
                    >
                      + Add Internal Link
                    </button>
                  </div>

                  {formData.internalLinks.length === 0 ? (
                    <div className="p-4 bg-slate-50 border border-dashed border-slate-200 rounded-lg text-center">
                      <p className="text-xs text-text-secondary">
                        No internal link keywords configured yet. Click &ldquo;+ Add Internal Link&rdquo; to auto-link keywords in your description to related services.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {formData.internalLinks.map((link, index) => (
                        <div
                          key={index}
                          className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg flex flex-col md:flex-row md:items-center gap-3"
                        >
                          {/* Target Service Select */}
                          <div className="flex-1">
                            <label className="block text-[11px] font-medium text-slate-600 mb-1">
                              Target Service
                            </label>
                            <select
                              value={link.targetService}
                              onChange={(e) => updateInternalLink(index, "targetService", e.target.value)}
                              className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 focus:ring-1 focus:ring-navy-600 outline-none bg-white"
                            >
                              <option value="" disabled>Select target service...</option>
                              {selectableServices.map((s) => (
                                <option key={s._id} value={s._id}>
                                  {s.title} ({getCategoryName(s.category)})
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Anchor Text / Keyword */}
                          <div className="flex-1">
                            <label className="block text-[11px] font-medium text-slate-600 mb-1">
                              Exact Anchor Text / Keyword
                            </label>
                            <input
                              type="text"
                              value={link.anchorText}
                              onChange={(e) => updateInternalLink(index, "anchorText", e.target.value)}
                              placeholder="e.g., virtual CFO, company registration"
                              className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 focus:ring-1 focus:ring-navy-600 outline-none bg-white"
                            />
                          </div>

                          {/* Primary Toggle & Delete */}
                          <div className="flex items-center justify-between md:justify-end gap-3 pt-2 md:pt-4">
                            <label className="flex items-center gap-1.5 cursor-pointer text-xs text-slate-600">
                              <input
                                type="checkbox"
                                checked={link.isPrimary}
                                onChange={(e) => updateInternalLink(index, "isPrimary", e.target.checked)}
                                className="rounded border-slate-300 text-charcoal focus:ring-navy-600"
                              />
                              <span>Primary</span>
                            </label>
                            <button
                              type="button"
                              onClick={() => removeInternalLink(index)}
                              className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50"
                              title="Remove internal link"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                      <p className="text-[11px] text-slate-500 italic">
                        Tip: When this anchor text appears anywhere in the description text, it will be rendered as a clickable link leading directly to the target service.
                      </p>
                    </div>
                  )}
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
                          {formData.ogImage && (
                            <div className="mt-2 flex items-center gap-3 p-2 bg-white border border-slate-200 rounded-lg">
                              <div className="relative w-12 h-12 rounded-md overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={formData.ogImage}
                                  alt="OG Preview"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium text-slate-700 truncate">
                                  {formData.ogImage}
                                </p>
                                <p className="text-[10px] text-slate-400">Social share preview</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => setFormData((prev) => ({ ...prev, ogImage: "" }))}
                                className="text-xs text-red-600 hover:text-red-700 px-2 py-1 hover:bg-red-50 rounded"
                              >
                                Remove
                              </button>
                            </div>
                          )}
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








