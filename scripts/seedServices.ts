// scripts/seedServices.ts
import 'dotenv/config';
import { connectDB } from '@/lib/db';
import { serviceService } from '@/lib/services/service.service';
import slugify from 'slugify';

// Utility to generate a slug
const generateSlug = (title: string) =>
  slugify(title, { lower: true, strict: true });

// Placeholder description generator
const placeholderDesc = (title: string) =>
  `${title} – professional service provided by Acclevate. Our experts deliver comprehensive solutions to meet your business needs.`;

// List of service titles (extracted from the provided list)
const serviceTitles: string[] = [
  // Business Entity Registration & Global Setup
  'Proprietorship Registration',
  'Partnership Firm Registration',
  'Private Limited Company Registration',
  'OPC Company Registration',
  'LLP Registration',
  'UAE Company Registration',
  'Singapore Company Registration',
  'USA Company Registration',
  'UK Company Registration',
  // Taxation & GST Services
  'GST Registration',
  'GST Return Filings',
  'GST Annual Return Filings',
  'GST LUT',
  'GST Refund',
  'GST Notice Handling',
  'Temporary GST Registration',
  'GST Audit',
  'GST Assessment & Litigation',
  'ITR Filing',
  'Tax Planning Consultancy',
  'Income Tax Notice Handling',
  'Appeal Services',
  'Lower TDS Certificate',
  'TDS Return Filings',
  'Capital Gain Consultancy',
  'Transaction Consultancy',
  'Tax Audit',
  'NRI Taxation Consultancy',
  '15CA CB Certification',
  // Intellectual Property & Design Services
  'Trademark Registration',
  'USA Trademark Registration',
  'International Trademark',
  'Trademark Renewal',
  'Trademark Transfer',
  'Series of Trademarks',
  'Trademark Rectification',
  'Trademark Opposition',
  'Trademark Objection',
  'Trademark Hearing',
  'Trademark Infringement Notice',
  'Patent Registration',
  'Copyright Registration',
  'Copyright Objection',
  'Design Registration',
  'Design Objection',
  'Logo Designing',
  // Corporate Governance & Compliance Services
  'New DIN',
  'DIN KYC',
  'DIN Reactivation',
  'Director Change',
  'Director Resigning',
  'Remove Director',
  'Name Change',
  'Registered Office Change',
  'MOA/AOA Amendment',
  'Increase Authorized Capital',
  'Pvt Limited Compliance',
  'OPC Compliance',
  'LLP Compliance',
  'Appointment of Auditor (ADT-1)',
  'Share Transfer',
  // Legal Documentation & Agreement Services
  'Founders Agreement',
  'Shareholders Agreement',
  'Share Purchase Agreement',
  'MOU',
  'Term Sheet',
  'Joint Venture Agreement',
  'Partnership Deed',
  'Offer Letter',
  'Appointment Letter',
  'Promotion Letter',
  'Resignation Letter',
  'Freelancer Agreement',
  'Consultancy Agreement',
  'Non-Disclosure Agreement (NDA)',
  'Franchise Agreement',
  'Agency Agreement',
  'Rent Deed',
  'Lease Agreement',
  'Will',
  'Gift Deed',
  'Consumer Complaint',
  // Business Reconstruction & Exit Services
  'Proprietorship to OPC',
  'Proprietorship to Partnership',
  'Proprietorship to PVT Ltd',
  'Proprietorship to LLP',
  'LLP to Private Limited Company',
  'Convert OPC to Private Limited',
  'Convert Partnership to LLP',
  'Convert Partnership to Private Limited',
  'Convert Pvt Ltd to LLP',
  'Convert Pvt Ltd to Public Limited',
  'PVT Ltd Winding Up',
  'LLP Winding Up',
  'Winding Up OPC',
  'Close Partnership Firm',
  'Close LLP',
  'Change LLP Agreement',
  'Change Partnership Deed',
  // Specialized Business Services
  'ISO Certification',
  'ISO 9001:2015 Quality Management System',
  'Funding',
];

const seed = async () => {
  await connectDB();
  for (const title of serviceTitles) {
    const slug = generateSlug(title);
    const shortDescription = placeholderDesc(title);
    const description = `${shortDescription} Our dedicated team ensures compliance, efficiency, and peace of mind.`;
    const metaTitle = `${title} – Acclevate Service`;
    const metaDescription = `Professional ${title.toLowerCase()} services by Acclevate. Expertise, compliance, and results you can trust.`;
    const keywords = [title, 'Acclevate', 'Business Services'];
    const ogTitle = metaTitle;
    const ogDescription = metaDescription;
    const ogImage = 'https://via.placeholder.com/1200x630.png?text=Acclevate+Service';

    // Upsert – if a service with this slug exists, update it; otherwise create.
    await serviceService.createService({
      title,
      slug,
      tagline: `${title} by Acclevate`,
      category: 'strategy',
      shortDescription,
      description,
      metaTitle,
      metaDescription,
      keywords,
      ogTitle,
      ogDescription,
      ogImage,
    });
  }
  console.log('✅ Seed completed –', serviceTitles.length, 'services inserted/updated');
  process.exit(0);
};

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
