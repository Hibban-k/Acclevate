import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Svg, Path } from '@react-pdf/renderer';

const TEAL     = '#456F6A';
const DARK     = '#1B2B3A';
const MUTED    = '#64748b';
const LIGHT_BG = '#F5F5F0';
const BORDER   = '#DDE3E3';
const WHITE    = '#FFFFFF';
const HEADER_H = 90;
const FOOTER_H = 200;
const PAD      = 32;

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
    width: '45%',
  },
  headerTagLine: {
    fontSize: 6.5,
    fontFamily: 'Helvetica-Bold',
    color: TEAL,
    letterSpacing: 1.5,
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
    marginBottom: 14,
  },
  termsCol: {
    width: '55%',
    paddingRight: 16,
    borderRightWidth: 1,
    borderRightColor: BORDER,
  },
  paymentCol: {
    width: '45%',
    paddingLeft: 16,
  },
  footerSectionTitle: {
    fontSize: 7.5,
    fontFamily: 'Helvetica-Bold',
    color: DARK,
    marginBottom: 6,
  },
  termsItem: {
    fontSize: 7.5,
    color: MUTED,
    lineHeight: 1.5,
    marginBottom: 2,
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  paymentIcon: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#E2EAEA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  paymentLabel: {
    fontSize: 7.5,
    color: MUTED,
    width: 60,
  },
  paymentValue: {
    fontSize: 7.5,
    fontFamily: 'Helvetica-Bold',
    color: DARK,
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
    marginBottom: 10,
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

  // ─── INVOICE CONTENT ────────────────────────────────────────────────────────
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  titleLeft: {
    width: '55%',
  },
  invoiceLabel: {
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
  },
  titleUnderline: {
    width: 32,
    borderTopWidth: 2,
    borderTopColor: TEAL,
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
    fontSize: 7.5,
    color: MUTED,
  },
  metaValue: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: DARK,
  },
  clientSection: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: WHITE,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: BORDER,
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
  fromLabel: {
    fontSize: 7,
    color: MUTED,
    marginBottom: 6,
  },
  clientName: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: DARK,
    marginBottom: 3,
  },
  clientLine: {
    fontSize: 8.5,
    color: MUTED,
    lineHeight: 1.5,
  },

  // Table
  table: { width: '100%', marginBottom: 16 },
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
    letterSpacing: 0.5,
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
  tableRowAlt: { backgroundColor: '#F9FAF9' },
  colNo:   { width: '8%' },
  colDesc: { width: '44%', paddingRight: 8 },
  colQty:  { width: '12%', alignItems: 'center' },
  colRate: { width: '18%', alignItems: 'flex-end' },
  colAmt:  { width: '18%', alignItems: 'flex-end' },
  itemNo: { fontSize: 8, fontFamily: 'Helvetica-Bold', color: MUTED },
  itemTitle: { fontSize: 8.5, fontFamily: 'Helvetica-Bold', color: DARK, marginBottom: 2 },
  itemSubtitle: { fontSize: 7.5, color: MUTED, lineHeight: 1.4 },
  cellText: { fontSize: 8.5, color: DARK },
  cellBold: { fontSize: 8.5, fontFamily: 'Helvetica-Bold', color: DARK },

  // Totals
  totalsSection: { alignItems: 'flex-end', marginBottom: 24 },
  totalsBox: { width: '42%' },
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
  payableLabel: { fontSize: 8, fontFamily: 'Helvetica-Bold', color: WHITE },
  payableValue: { fontSize: 10, fontFamily: 'Helvetica-Bold', color: WHITE },
});

// Icons
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
const BankIcon = () => (
  <Svg viewBox="0 0 24 24" style={{ width: 7, height: 7 }}>
    <Path d="M11.5 1L2 6v2h19V6m-5 4v7h3v-7M2 20v2h19v-2M6 10v7h3v-7m4 0v7h3v-7H13z" fill={TEAL}/>
  </Svg>
);

interface InvoiceProps { data: any; }

export const InvoicePDF: React.FC<InvoiceProps> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page} wrap>

      {/* Fixed header */}
      <View style={styles.fixedHeader} fixed>
        <Image src={data.baseUrl + '/logo.png'} style={styles.logo} />
        <View style={styles.headerRight}>
          <Text style={styles.headerTagLine}>COMPLIANCE / ACCOUNTING / REGISTRATION / GROWTH</Text>
          <Text style={styles.headerSubLine}>{'Your Trusted Partner in Business Compliance\nand Sustainable Growth.'}</Text>
        </View>
      </View>

      {/* Fixed footer */}
      <View style={styles.fixedFooter} fixed>
        <Image src={data.baseUrl + '/images/quotation-bg.png'} style={styles.watermark} />

        <View style={styles.footerTopRow}>
          {/* Terms */}
          <View style={styles.termsCol}>
            <Text style={styles.footerSectionTitle}>Terms & Conditions</Text>
            <Text style={styles.termsItem}>1. Invoice is due within 15 days from the date of issue.</Text>
            <Text style={styles.termsItem}>2. Payment terms: 50% advance, 50% before final delivery.</Text>
            <Text style={styles.termsItem}>3. Any additional government fees (if applicable) will be charged separately.</Text>
            <Text style={styles.termsItem}>4. Work will commence upon receipt of advance payment and signed authorization.</Text>
          </View>
          {/* Payment Details */}
          <View style={styles.paymentCol}>
            <Text style={styles.footerSectionTitle}>Payment Details</Text>
            <View style={styles.paymentRow}>
              <View style={styles.paymentIcon}><BankIcon /></View>
              <Text style={styles.paymentLabel}>Bank Name</Text>
              <Text style={styles.paymentValue}>{data.bankName || 'ICICI Bank'}</Text>
            </View>
            <View style={styles.paymentRow}>
              <View style={styles.paymentIcon}><BankIcon /></View>
              <Text style={styles.paymentLabel}>A/c No</Text>
              <Text style={styles.paymentValue}>{data.accountNo || '1234 5678 9012'}</Text>
            </View>
            <View style={styles.paymentRow}>
              <View style={styles.paymentIcon}><BankIcon /></View>
              <Text style={styles.paymentLabel}>IFSC</Text>
              <Text style={styles.paymentValue}>{data.ifsc || 'ICIC0001234'}</Text>
            </View>
            <View style={styles.paymentRow}>
              <View style={styles.paymentIcon}><BankIcon /></View>
              <Text style={styles.paymentLabel}>Account Name</Text>
              <Text style={styles.paymentValue}>{data.accountName || 'Acclevate Business Solutions'}</Text>
            </View>
          </View>
        </View>

        <View style={styles.signOffLine} />
        <Text style={styles.signOffText}>Thank you for your business!</Text>

        <View style={styles.footerContactBar}>
          <View style={styles.contactChunk}>
            <PhoneIcon />
            <Text style={styles.contactText}>{data.phone || '+91 98765 43210'}</Text>
          </View>
          <View style={styles.dividerV} />
          <View style={styles.contactChunk}>
            <MailIcon />
            <Text style={styles.contactText}>{data.email || 'hello@acclevate.com'}</Text>
          </View>
          <View style={styles.dividerV} />
          <View style={styles.contactChunk}>
            <WebIcon />
            <Text style={styles.contactText}>{data.website || 'www.acclevate.com'}</Text>
          </View>
          <View style={styles.dividerV} />
          <View style={styles.contactChunk}>
            <PinIcon />
            <Text style={styles.contactText}>{data.address || '123 Business Street,\nYour City, Your State – 123456'}</Text>
          </View>
        </View>
      </View>

      {/* ── Dynamic Content ── */}
      {/* Title + Meta */}
      <View style={styles.titleSection}>
        <View style={styles.titleLeft}>
          <Text style={styles.invoiceLabel}>T A X  I N V O I C E</Text>
          <Text style={styles.mainTitle}>Invoice</Text>
          <View style={styles.titleUnderline} />
        </View>
        <View style={styles.metaBox}>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Invoice No.</Text>
            <Text style={styles.metaValue}>{data.invoiceNo}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Date</Text>
            <Text style={styles.metaValue}>{data.date}</Text>
          </View>
          <View style={styles.metaRowLast}>
            <Text style={styles.metaLabel}>Due Date</Text>
            <Text style={styles.metaValue}>{data.dueDate}</Text>
          </View>
        </View>
      </View>

      {/* Client + From */}
      <View style={styles.clientSection}>
        <View style={styles.clientLeft}>
          <Text style={styles.billToLabel}>BILL TO</Text>
          <Text style={styles.clientName}>{data.clientName}</Text>
          <Text style={styles.clientLine}>{data.clientCompany}</Text>
          <Text style={styles.clientLine}>{data.clientAddress1}</Text>
          <Text style={styles.clientLine}>{data.clientAddress2}</Text>
          <Text style={styles.clientLine}>GSTIN: {data.clientGSTIN}</Text>
        </View>
        <View style={styles.clientRight}>
          <Text style={styles.fromLabel}>From</Text>
          <Text style={styles.clientName}>Acclevate Business Solutions</Text>
          <Text style={styles.clientLine}>123 Business Street,</Text>
          <Text style={styles.clientLine}>Your City, Your State – 123456</Text>
          <Text style={styles.clientLine}>GSTIN: 27ABCDE1234F1Z5</Text>
        </View>
      </View>

      {/* Table */}
      <View style={styles.table}>
        <View style={styles.tableHeaderRow} fixed>
          <Text style={[styles.thCell, styles.colNo]}>S. NO.</Text>
          <Text style={[styles.thCell, styles.colDesc]}>SERVICE / DESCRIPTION</Text>
          <Text style={[styles.thCell, styles.colQty, { textAlign: 'center' }]}>QTY</Text>
          <Text style={[styles.thCell, styles.colRate, { textAlign: 'right' }]}>RATE (INR)</Text>
          <Text style={[styles.thCell, styles.colAmt, { textAlign: 'right' }]}>AMOUNT (INR)</Text>
        </View>

        {data.items.map((item: any, idx: number) => (
          <View key={idx} style={[styles.tableRow, idx % 2 !== 0 ? styles.tableRowAlt : {}]} wrap={false}>
            <View style={styles.colNo}>
              <Text style={styles.itemNo}>{String(idx + 1).padStart(2, '0')}</Text>
            </View>
            <View style={styles.colDesc}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
            </View>
            <View style={styles.colQty}>
              <Text style={[styles.cellText, { textAlign: 'center' }]}>{item.qty}</Text>
            </View>
            <View style={styles.colRate}>
              <Text style={styles.cellText}>{'Rs. ' + item.rate.toLocaleString('en-IN')}</Text>
            </View>
            <View style={styles.colAmt}>
              <Text style={styles.cellBold}>{'Rs. ' + (item.qty * item.rate).toLocaleString('en-IN')}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Totals */}
      <View style={styles.totalsSection} wrap={false}>
        <View style={styles.totalsBox}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal</Text>
            <Text style={styles.totalValue}>{'Rs. ' + data.subtotal.toLocaleString('en-IN')}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>GST (18%)</Text>
            <Text style={styles.totalValue}>{'Rs. ' + data.gst.toLocaleString('en-IN')}</Text>
          </View>
          <View style={styles.payableRow}>
            <Text style={styles.payableLabel}>Total Payable</Text>
            <Text style={styles.payableValue}>{'Rs. ' + data.total.toLocaleString('en-IN')}</Text>
          </View>
        </View>
      </View>

    </Page>
  </Document>
);
