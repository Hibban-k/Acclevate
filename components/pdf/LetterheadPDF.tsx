import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Svg, Path } from '@react-pdf/renderer';

const TEAL     = '#456F6A';
const DARK     = '#1B2B3A';
const MUTED    = '#64748b';
const LIGHT_BG = '#F5F5F0';
const BORDER   = '#DDE3E3';
const HEADER_H = 90;
const FOOTER_H = 120;
const PAD      = 40;

const styles = StyleSheet.create({
  page: {
    backgroundColor: LIGHT_BG,
    fontFamily: 'Helvetica',
    color: DARK,
    paddingTop: HEADER_H + 20,
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
    paddingTop: 12,
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
  footerContactRow1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 20,
  },
  footerContactRow2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
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
    marginHorizontal: 12,
  },
  footerTaglineRow: {
    borderTopWidth: 1,
    borderTopColor: BORDER,
    paddingTop: 10,
    flexDirection: 'row',
    gap: 8,
  },
  taglineItem: {
    fontSize: 7.5,
    fontFamily: 'Helvetica-Bold',
    color: TEAL,
    letterSpacing: 1.5,
  },

  // ─── LETTER CONTENT ─────────────────────────────────────────────────────────
  metaSection: {
    flexDirection: 'row',
    marginBottom: 28,
  },
  clientBlock: {
    width: '55%',
    paddingRight: 20,
    borderRightWidth: 1,
    borderRightColor: BORDER,
  },
  toLabel: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    color: TEAL,
    letterSpacing: 2,
    marginBottom: 6,
  },
  clientName: {
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    color: DARK,
    marginBottom: 3,
  },
  clientLine: {
    fontSize: 9,
    color: MUTED,
    lineHeight: 1.5,
  },
  dateBlock: {
    width: '45%',
    paddingLeft: 20,
  },
  dateGroup: {
    marginBottom: 14,
  },
  dateLabel: {
    fontSize: 8,
    color: MUTED,
    marginBottom: 3,
  },
  dateValue: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: DARK,
  },
  separator: {
    borderTopWidth: 2,
    borderTopColor: TEAL,
    width: 30,
    marginBottom: 20,
  },
  subjectBlock: {
    marginBottom: 24,
  },
  subjectLabel: {
    fontSize: 7.5,
    fontFamily: 'Helvetica-Bold',
    color: TEAL,
    letterSpacing: 2,
    marginBottom: 6,
  },
  subjectText: {
    fontSize: 18,
    fontFamily: 'Times-Roman',
    color: DARK,
    lineHeight: 1.2,
  },
  bodyText: {
    fontSize: 9.5,
    color: DARK,
    lineHeight: 1.8,
    marginBottom: 20,
  },
  signOff: {
    marginTop: 10,
  },
  signOffText: {
    fontSize: 9.5,
    color: DARK,
    marginBottom: 4,
  },
  signOffName: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: DARK,
    marginBottom: 12,
  },
  signatureLine: {
    fontSize: 22,
    fontFamily: 'Times-Italic',
    color: TEAL,
    marginBottom: 4,
  },
  authorizedText: {
    fontSize: 8,
    color: MUTED,
  },
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

interface LetterheadProps { data: any; }

export const LetterheadPDF: React.FC<LetterheadProps> = ({ data }) => (
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
        <Image src={data.baseUrl + '/images/letterhead-bg.png'} style={styles.watermark} />

        {/* Row 1: phone + email + website */}
        <View style={styles.footerContactRow1}>
          <View style={styles.contactChunk}>
            <PhoneIcon />
            <Text style={styles.contactText}>{data.phone || '+91 94828 34887'}</Text>
          </View>
          <View style={styles.contactChunk}>
            <MailIcon />
            <Text style={styles.contactText}>{data.email || 'hello@acclevate.com'}</Text>
          </View>
          <View style={styles.contactChunk}>
            <WebIcon />
            <Text style={styles.contactText}>{data.website || 'www.acclevate.com'}</Text>
          </View>
        </View>

        {/* Row 2: address */}
        <View style={styles.footerContactRow2}>
          <View style={styles.contactChunk}>
            <PinIcon />
            <Text style={styles.contactText}>{data.address || 'Bengaluru'}</Text>
          </View>
        </View>

        {/* Bottom tagline */}
        <View style={styles.footerTaglineRow}>
          <Text style={styles.taglineItem}>BUILD</Text>
          <Text style={styles.taglineItem}>/</Text>
          <Text style={styles.taglineItem}>COMPLY</Text>
          <Text style={styles.taglineItem}>/</Text>
          <Text style={styles.taglineItem}>GROW</Text>
        </View>
      </View>

      {/* ── Dynamic Content ── */}

      {/* TO + Date/Ref side by side */}
      <View style={styles.metaSection}>
        <View style={styles.clientBlock}>
          <Text style={styles.toLabel}>T O</Text>
          <Text style={styles.clientName}>{data.clientName}</Text>
          <Text style={styles.clientLine}>{data.clientCompany}</Text>
          <Text style={styles.clientLine}>{data.clientAddress1}</Text>
          <Text style={styles.clientLine}>{data.clientAddress2}</Text>
        </View>
        <View style={styles.dateBlock}>
          <View style={styles.dateGroup}>
            <Text style={styles.dateLabel}>Date</Text>
            <Text style={styles.dateValue}>{data.date}</Text>
          </View>
          <View style={styles.dateGroup}>
            <Text style={styles.dateLabel}>Reference No.</Text>
            <Text style={styles.dateValue}>{data.referenceNo}</Text>
          </View>
        </View>
      </View>

      {/* Separator line */}
      <View style={styles.separator} />

      {/* Subject */}
      <View style={styles.subjectBlock}>
        <Text style={styles.subjectLabel}>S U B J E C T</Text>
        <Text style={styles.subjectText}>{data.subject}</Text>
      </View>

      {/* Body */}
      <Text style={styles.bodyText}>{data.salutation}</Text>
      <Text style={styles.bodyText}>{data.content}</Text>

      {/* Sign-off */}
      <View style={styles.signOff} wrap={false}>
        <Text style={styles.signOffText}>Warm Regards,</Text>
        <Text style={styles.signOffName}>Team Acclevate</Text>
        <Text style={styles.signatureLine}>Acclevate</Text>
        <Text style={styles.authorizedText}>Authorized Signatory</Text>
      </View>

    </Page>
  </Document>
);
