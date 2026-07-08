import {
    Html,
    Head,
    Body,
    Container,
    Section,
    Text,
    Heading,
} from '@react-email/components';
import * as React from 'react';

interface AdminNotificationProps {
    inquiry: {
        _id?: string;
        fullName: string;
        email: string;
        phone: string;
        service?: string;
        company?: string;
        message: string;
    };
}

export const AdminNotification = ({ inquiry }: AdminNotificationProps) => {
    return (
        <Html>
            <Head />
            <Body style={main}>
                <Container style={container}>
                    <Heading style={h1}>New Inquiry Received</Heading>
                    
                    <Section style={detailsSection}>
                        <Text style={detailItem}><strong>Name:</strong> {inquiry.fullName}</Text>
                        <Text style={detailItem}><strong>Email:</strong> {inquiry.email}</Text>
                        <Text style={detailItem}><strong>Phone:</strong> {inquiry.phone}</Text>
                        {inquiry.company && <Text style={detailItem}><strong>Company:</strong> {inquiry.company}</Text>}
                        {inquiry.service && <Text style={detailItem}><strong>Service:</strong> {inquiry.service}</Text>}
                    </Section>

                    <Heading as="h3" style={h3}>Message</Heading>
                    <Text style={messageBox}>
                        {inquiry.message}
                    </Text>

                </Container>
            </Body>
        </Html>
    );
};

// Styles
const main = {
    backgroundColor: '#f6f9fc',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    padding: '20px 0 48px',
    marginBottom: '64px',
};

const h1 = {
    color: '#333',
    padding: '0 48px',
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'left' as const,
};

const h3 = {
    color: '#333',
    padding: '0 48px',
    fontSize: '18px',
    fontWeight: 'bold',
    marginTop: '24px',
};

const detailsSection = {
    padding: '0 48px',
    marginTop: '16px',
};

const detailItem = {
    color: '#525f7f',
    fontSize: '15px',
    margin: '4px 0',
};

const messageBox = {
    color: '#525f7f',
    fontSize: '15px',
    lineHeight: '24px',
    padding: '16px',
    margin: '0 48px',
    backgroundColor: '#f8f9fa',
    borderRadius: '4px',
    whiteSpace: 'pre-wrap' as const,
};

export default AdminNotification;
