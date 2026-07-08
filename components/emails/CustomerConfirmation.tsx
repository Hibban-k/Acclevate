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

interface CustomerConfirmationProps {
    fullName: string;
}

export const CustomerConfirmation = ({ fullName }: CustomerConfirmationProps) => {
    return (
        <Html>
            <Head />
            <Body style={main}>
                <Container style={container}>
                    <Heading style={h1}>Thank you for reaching out!</Heading>
                    <Text style={text}>
                        Hi {fullName},
                    </Text>
                    <Text style={text}>
                        We have received your inquiry and our team is currently reviewing it. 
                        We aim to respond to all inquiries within 1 business day.
                    </Text>
                    <Section style={footer}>
                        <Text style={footerText}>
                            Best regards,<br />
                            The Acclevate Team
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

// Simple inline styles for React Email
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

const text = {
    color: '#525f7f',
    fontSize: '16px',
    lineHeight: '24px',
    padding: '0 48px',
    textAlign: 'left' as const,
};

const footer = {
    padding: '0 48px',
};

const footerText = {
    color: '#8898aa',
    fontSize: '14px',
};

export default CustomerConfirmation;
