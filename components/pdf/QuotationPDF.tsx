import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Svg, Path } from '@react-pdf/renderer';

// ─── DESIGN TOKENS ─────────────────────────────────────────────────────────────
const TEAL      = '#456F6A';
const DARK      = '#1B2B3A';
const MUTED     = '#64748b';
const LIGHT_BG  = '#F5F5F0';
const BORDER    = '#DDE3E3';
const WHITE     = '#FFFFFF';
const HEADER_H  = 90;
const FOOTER_H  = 220;
const PAD       = 32;

const styles = StyleSheet.create({
  page: {
    backgroundColor: LIGHT_BG,
    fontFamily: 'Helvetica',
    color: DARK,
    paddingTop: HEADER_H + 16,
    paddingBottom: FOOTER_H,
    paddingLeft: PAD,
    paddingRight: PAD,
  },

  // ─── FIXED HEADER ───────────────────────────────────────────────────────────
  fixedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_H,
    backgroundColor: LIGHT_BG,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: PAD,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  // Logo: fixed width+height + objectFit so it never distorts
  logo: {
    width: 200,
    height: 65,
    objectFit: 'contain',
    objectPositionX: 0,
    objectPositionY: 'center',
    opacity: 0.85,
  },
  headerRight: {
    alignItems: 'flex-end',
    width: '48%',
  },
  headerTagLine: {
    fontSize: 6,
    fontFamily: 'Helvetica-Bold',
    color: TEAL,
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  headerSubLine: {
    fontSize: 8,
    fontFamily: 'Helvetica-Oblique',
    color: TEAL,
    lineHeight: 1.4,
    textAlign: 'right',
    maxWidth: 200,
  },

  // ─── FIXED FOOTER ───────────────────────────────────────────────────────────
  fixedFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: FOOTER_H,
    backgroundColor: LIGHT_BG,
    paddingHorizontal: PAD,
    paddingTop: 14,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: BORDER,
  },
  watermark: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 220,
    height: 'auto',
    opacity: 0.7,
  },
  footerTopRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  termsCol: {
    width: '55%',
    paddingRight: 16,
    borderRightWidth: 1,
    borderRightColor: BORDER,
  },
  nextStepsCol: {
    width: '45%',
    paddingLeft: 16,
  },
  footerSectionTitle: {
    fontSize: 7.5,
    fontFamily: 'Helvetica-Bold',
    color: TEAL,
    letterSpacing: 2,
    marginBottom: 6,
  },
  termsItem: {
    fontSize: 7.5,
    color: MUTED,
    lineHeight: 1.5,
    marginBottom: 2,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  stepIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#E2EAEA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  stepText: {
    fontSize: 8,
    color: MUTED,
  },
  footerSignOff: {
    marginBottom: 10,
  },
  signOffLine: {
    width: 20,
    borderTopWidth: 2,
    borderTopColor: TEAL,
    marginBottom: 4,
  },
  signOffText: {
    fontSize: 8,
    color: MUTED,
    marginBottom: 2,
  },
  signOffName: {
    fontSize: 8.5,
    fontFamily: 'Helvetica-Bold',
    color: DARK,
  },
  footerContactBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: BORDER,
    paddingTop: 10,
  },
  contactChunk: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  contactText: {
    fontSize: 7,
    color: MUTED,
  },
  dividerV: {
    width: 1,
    height: 12,
    backgroundColor: BORDER,
  },
  taglineTeal: {
    fontSize: 9,
    fontFamily: 'Helvetica-Oblique',
    color: TEAL,
    textAlign: 'right',
    lineHeight: 1.4,
  },

  // ─── PAGE 1 CONTENT ─────────────────────────────────────────────────────────
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  titleLeft: {
    width: '55%',
  },
  serviceLabel: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: TEAL,
    letterSpacing: 2.5,
    marginBottom: 4,
  },
  mainTitle: {
    fontSize: 32,
    fontFamily: 'Times-Roman',
    color: DARK,
    marginBottom: 4,
    lineHeight: 1.1,
  },
  titleUnderline: {
    width: 32,
    borderTopWidth: 2,
    borderTopColor: TEAL,
    marginBottom: 8,
  },
  titleDesc: {
    fontSize: 8.5,
    color: MUTED,
    lineHeight: 1.5,
    maxWidth: 260,
  },
  metaBox: {
    width: '40%',
    backgroundColor: WHITE,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 12,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  metaRowLast: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5,
  },
  metaLabel: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    color: MUTED,
    letterSpacing: 0.8,
  },
  metaValue: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: DARK,
  },

  // Client section
  clientSection: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: WHITE,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: BORDER,
    overflow: 'hidden',
  },
  clientLeft: {
    width: '50%',
    padding: 14,
    borderRightWidth: 1,
    borderRightColor: BORDER,
  },
  clientRight: {
    width: '50%',
    padding: 14,
  },
  billToLabel: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    color: TEAL,
    letterSpacing: 2,
    marginBottom: 6,
  },
  clientName: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: DARK,
    marginBottom: 3,
  },
  clientLine: {
    fontSize: 8.5,
    color: MUTED,
    lineHeight: 1.5,
  },
  salutation: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: DARK,
    marginBottom: 6,
  },
  introText: {
    fontSize: 8.5,
    color: MUTED,
    lineHeight: 1.6,
  },

  // ─── TABLE ──────────────────────────────────────────────────────────────────
  table: {
    width: '100%',
    marginBottom: 16,
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: TEAL,
    paddingVertical: 7,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  thCell: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    color: WHITE,
    letterSpacing: 0.8,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    alignItems: 'center',
    backgroundColor: WHITE,
  },
  tableRowAlt: {
    backgroundColor: '#F9FAF9',
  },
  // Column widths
  colNo:   { width: '7%' },
  colIcon: { width: '8%' },
  colSvc:  { width: '25%', paddingRight: 6 },
  colDesc: { width: '40%', paddingRight: 6 },
  colFee:  { width: '20%', alignItems: 'flex-end' },

  itemNo: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: MUTED,
  },
  itemIconBox: {
    width: 26,
    height: 26,
    borderRadius: 4,
    backgroundColor: '#E8EFEE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: 8.5,
    fontFamily: 'Helvetica-Bold',
    color: DARK,
    lineHeight: 1.3,
  },
  itemBullet: {
    fontSize: 7.5,
    color: MUTED,
    marginBottom: 2,
    lineHeight: 1.4,
  },
  feeText: {
    fontSize: 9.5,
    fontFamily: 'Helvetica-Bold',
    color: DARK,
  },
  feeSuffix: {
    fontSize: 7.5,
    color: MUTED,
  },

  // ─── TOTALS ─────────────────────────────────────────────────────────────────
  totalsSection: {
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  totalsBox: {
    width: '42%',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    backgroundColor: WHITE,
  },
  totalLabel: { fontSize: 8, color: MUTED },
  totalValue: { fontSize: 8.5, fontFamily: 'Helvetica-Bold', color: DARK },
  payableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: TEAL,
    borderRadius: 4,
    marginTop: 2,
  },
  payableLabel: { fontSize: 8, fontFamily: 'Helvetica-Bold', color: WHITE, letterSpacing: 1 },
  payableValue: { fontSize: 10, fontFamily: 'Helvetica-Bold', color: WHITE },
});

// ─── SVG ICON HELPERS ──────────────────────────────────────────────────────────
const PhoneIcon = () => (
  <Svg viewBox="0 0 24 24" style={{ width: 8, height: 8 }}>
    <Path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill={TEAL}/>
  </Svg>
);
const MailIcon = () => (
  <Svg viewBox="0 0 24 24" style={{ width: 8, height: 8 }}>
    <Path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill={TEAL}/>
  </Svg>
);
const WebIcon = () => (
  <Svg viewBox="0 0 24 24" style={{ width: 8, height: 8 }}>
    <Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill={TEAL}/>
  </Svg>
);
const PinIcon = () => (
  <Svg viewBox="0 0 24 24" style={{ width: 8, height: 8 }}>
    <Path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill={TEAL}/>
  </Svg>
);
const DocIcon = () => (
  <Svg viewBox="0 0 24 24" style={{ width: 8, height: 8 }}>
    <Path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" fill={TEAL}/>
  </Svg>
);
const CheckIcon = () => (
  <Svg viewBox="0 0 24 24" style={{ width: 8, height: 8 }}>
    <Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill={TEAL}/>
  </Svg>
);
const EnvIcon = () => (
  <Svg viewBox="0 0 24 24" style={{ width: 8, height: 8 }}>
    <Path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill={TEAL}/>
  </Svg>
);

// ─── SHARED HEADER ─────────────────────────────────────────────────────────────
const Header = ({ baseUrl }: { baseUrl: string }) => (
  <View style={styles.fixedHeader} fixed>
    <Image src={baseUrl + '/logo.png'} style={styles.logo} />
    <View style={styles.headerRight}>
      <Text style={styles.headerTagLine}>COMPLIANCE / ACCOUNTING / REGISTRATION / GROWTH</Text>
      <Text style={styles.headerSubLine}>Your Trusted Partner in Business Compliance{'\n'}and Sustainable Growth.</Text>
    </View>
  </View>
);

// ─── SHARED FOOTER ─────────────────────────────────────────────────────────────
const Footer = ({ baseUrl }: { baseUrl: string }) => (
  <View style={styles.fixedFooter} fixed>
    <Image src={baseUrl + '/images/quotation-bg.png'} style={styles.watermark} />

    <View style={styles.footerTopRow}>
      {/* Terms */}
      <View style={styles.termsCol}>
        <Text style={styles.footerSectionTitle}>TERMS & CONDITIONS</Text>
        <Text style={styles.termsItem}>1. Quotation is valid for 15 days from the date of issue.</Text>
        <Text style={styles.termsItem}>2. Payment terms: 50% advance, 50% before final delivery.</Text>
        <Text style={styles.termsItem}>3. Any additional government fees (if applicable) will be charged separately.</Text>
        <Text style={styles.termsItem}>4. Work will commence upon receipt of advance payment and signed authorization.</Text>
        <Text style={styles.termsItem}>5. The above services are subject to terms and conditions of Acclevate Business Solutions.</Text>
      </View>
      {/* Next Steps */}
      <View style={styles.nextStepsCol}>
        <Text style={styles.footerSectionTitle}>NEXT STEPS</Text>
        <View style={styles.stepRow}>
          <View style={styles.stepIcon}><DocIcon /></View>
          <Text style={styles.stepText}>Review the quotation</Text>
        </View>
        <View style={styles.stepRow}>
          <View style={styles.stepIcon}><CheckIcon /></View>
          <Text style={styles.stepText}>Confirm and approve</Text>
        </View>
        <View style={styles.stepRow}>
          <View style={styles.stepIcon}><EnvIcon /></View>
          <Text style={styles.stepText}>{"We'll get started right away"}</Text>
        </View>
      </View>
    </View>

    {/* Sign-off */}
    <View style={styles.footerSignOff}>
      <View style={styles.signOffLine} />
      <Text style={styles.signOffText}>Looking forward to working with you.</Text>
      <Text style={styles.signOffName}>Team Acclevate</Text>
    </View>

    {/* Contact bar */}
    <View style={styles.footerContactBar}>
      <View style={styles.contactChunk}>
        <PhoneIcon />
        <Text style={styles.contactText}>+91 98765 43210</Text>
      </View>
      <View style={styles.dividerV} />
      <View style={styles.contactChunk}>
        <MailIcon />
        <Text style={styles.contactText}>hello@acclevate.com</Text>
      </View>
      <View style={styles.dividerV} />
      <View style={styles.contactChunk}>
        <WebIcon />
        <Text style={styles.contactText}>www.acclevate.com</Text>
      </View>
      <View style={styles.dividerV} />
      <View style={styles.contactChunk}>
        <PinIcon />
        <Text style={styles.contactText}>123 Business Street,{'\n'}Your City, Your State – 123456</Text>
      </View>
      <View style={styles.dividerV} />
      <Text style={styles.taglineTeal}>{'Your Growth\nOur Priority'}</Text>
    </View>
  </View>
);

// ─── TABLE ROW ─────────────────────────────────────────────────────────────────
const ItemRow = ({ item, idx }: { item: any; idx: number }) => (
  <View style={[styles.tableRow, idx % 2 !== 0 ? styles.tableRowAlt : {}]} wrap={false}>
    <View style={styles.colNo}>
      <Text style={styles.itemNo}>{String(idx + 1).padStart(2, '0')}</Text>
    </View>
    <View style={styles.colIcon}>
      <View style={styles.itemIconBox}>
        <DocIcon />
      </View>
    </View>
    <View style={styles.colSvc}>
      <Text style={styles.itemTitle}>{item.title.replace(/\n/g, ' ')}</Text>
    </View>
    <View style={styles.colDesc}>
      {item.scope.split('\n').filter(Boolean).map((b: string, i: number) => (
        <Text key={i} style={styles.itemBullet}>{'• ' + b}</Text>
      ))}
    </View>
    <View style={styles.colFee}>
      <Text style={styles.feeText}>{'Rs. ' + item.rate.toLocaleString('en-IN')}</Text>
      {item.suffix && <Text style={styles.feeSuffix}>{item.suffix}</Text>}
    </View>
  </View>
);

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────
interface QuotationProps { data: any; }

export const QuotationPDF: React.FC<QuotationProps> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page} wrap>

      {/* Fixed header on every page */}
      <Header baseUrl={data.baseUrl} />

      {/* Fixed footer on every page */}
      <Footer baseUrl={data.baseUrl} />

      {/* ── PAGE 1 ONLY: Title + Meta ── */}
      <View style={styles.titleSection}>
        <View style={styles.titleLeft}>
          <Text style={styles.serviceLabel}>S E R V I C E</Text>
          <Text style={styles.mainTitle}>Quotation</Text>
          <View style={styles.titleUnderline} />
          <Text style={styles.titleDesc}>
            We provide expert-led business solutions to help you stay compliant, save time and focus on what matters most — your growth.
          </Text>
        </View>
        <View style={styles.metaBox}>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>QUOTATION NO.</Text>
            <Text style={styles.metaValue}>{data.quotationNo}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>DATE</Text>
            <Text style={styles.metaValue}>{data.date}</Text>
          </View>
          <View style={styles.metaRowLast}>
            <Text style={styles.metaLabel}>VALID UNTIL</Text>
            <Text style={styles.metaValue}>{data.validUntil}</Text>
          </View>
        </View>
      </View>

      {/* ── PAGE 1 ONLY: Client + Intro ── */}
      <View style={styles.clientSection}>
        <View style={styles.clientLeft}>
          <Text style={styles.billToLabel}>BILL TO</Text>
          <Text style={styles.clientName}>{data.clientName}</Text>
          <Text style={styles.clientLine}>{data.clientAddress1}</Text>
          <Text style={styles.clientLine}>{data.clientAddress2}</Text>
          <Text style={styles.clientLine}>GSTIN: {data.clientGSTIN}</Text>
        </View>
        <View style={styles.clientRight}>
          <Text style={styles.salutation}>{data.salutation}</Text>
          <Text style={styles.introText}>{data.introduction}</Text>
        </View>
      </View>

      {/* ── SERVICE TABLE (auto-paginate) ── */}
      <View style={styles.table}>
        {/* Table header repeats on every page */}
        <View style={styles.tableHeaderRow} fixed>
          <Text style={[styles.thCell, styles.colNo]}>S. NO.</Text>
          <Text style={[styles.thCell, styles.colIcon]}> </Text>
          <Text style={[styles.thCell, styles.colSvc]}>SERVICE</Text>
          <Text style={[styles.thCell, styles.colDesc]}>SCOPE / DESCRIPTION</Text>
          <Text style={[styles.thCell, styles.colFee, { textAlign: 'right' }]}>PROFESSIONAL FEE</Text>
        </View>

        {data.items.map((item: any, idx: number) => (
          <ItemRow key={idx} item={item} idx={idx} />
        ))}
      </View>

      {/* ── TOTALS ── */}
      <View style={styles.totalsSection} wrap={false}>
        <View style={styles.totalsBox}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>SUBTOTAL</Text>
            <Text style={styles.totalValue}>{'Rs. ' + data.subtotal.toLocaleString('en-IN')}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>GST (18%)</Text>
            <Text style={styles.totalValue}>{'Rs. ' + data.gst.toLocaleString('en-IN')}</Text>
          </View>
          <View style={styles.payableRow}>
            <Text style={styles.payableLabel}>TOTAL PAYABLE</Text>
            <Text style={styles.payableValue}>{'Rs. ' + data.total.toLocaleString('en-IN')}</Text>
          </View>
        </View>
      </View>

    </Page>
  </Document>
);
