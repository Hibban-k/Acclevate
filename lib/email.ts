import sgMail from '@sendgrid/mail';

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'noreply@acclevate.com';
const ADMIN_EMAIL = process.env.ADMIN_NOTIFY_EMAIL || 'admin@acclevate.com';

if (SENDGRID_API_KEY) {
    sgMail.setApiKey(SENDGRID_API_KEY);
}

interface ContactFormData {
    fullName: string;
    email: string;
    phone: string;
    service?: string;
    company?: string;
    message: string;
}

export async function sendContactEmail(data: ContactFormData): Promise<boolean> {
    if (!SENDGRID_API_KEY) {
        console.warn('SendGrid API key not configured');
        return false;
    }

    const { fullName, email, phone, service, company, message } = data;

    try {
        // Send confirmation to user
        await sgMail.send({
            to: email,
            from: FROM_EMAIL,
            subject: 'Thank you for contacting Acclevate',
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2B3674;">Thank you for reaching out!</h2>
          <p>Hi ${fullName.split(' ')[0]},</p>
          <p>We've received your message and will get back to you within 24-48 hours.</p>
          <p>Best regards,<br/>The Acclevate Team</p>
        </div>
      `,
        });

        // Notify admin
        await sgMail.send({
            to: ADMIN_EMAIL,
            from: FROM_EMAIL,
            subject: `New Contact Form Submission from ${fullName}`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2B3674;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Service Interest:</strong> ${service || 'Not specified'}</p>
          <p><strong>Company:</strong> ${company || 'Not provided'}</p>
          <p><strong>Message:</strong></p>
          <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${message}</p>
        </div>
      `,
        });

        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
}
