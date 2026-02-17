import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const body = await request.json();
    const { Vorname, Nachname, Email, Telefonnummer, message } = body;

    // Validate required fields
    if (!Vorname || !Nachname || !Email || !Telefonnummer) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create email content
    const emailContent = `
Neue Kontaktanfrage von der Website:

Name: ${Vorname} ${Nachname}
Email: ${Email}
Telefonnummer: ${Telefonnummer}
${message ? `Nachricht: ${message}` : ''}

---
Diese E-Mail wurde automatisch von der Taj Mahal Restaurant Website gesendet.
    `.trim();

    // Configure nodemailer transporter with GoDaddy SMTP settings
    // Settings are loaded from .env.local file
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    
    // Check if SMTP credentials are configured
    if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
      console.error('SMTP configuration missing. Please check .env.local file.');
      return NextResponse.json(
        { 
          error: 'Email server not configured. Please contact the administrator.',
          details: 'SMTP settings missing'
        },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      tls: {
        rejectUnauthorized: false, // Allow self-signed certificates if needed
      },
    });

    // Send email to info@taj-mahal-poing.de
    const mailOptions = {
      from: process.env.SMTP_FROM || `"Taj Mahal Website" <${smtpUser}>`,
      to: 'info@taj-mahal-poing.de',
      subject: `Neue Kontaktanfrage von ${Vorname} ${Nachname}`,
      text: emailContent,
      replyTo: Email,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully to info@taj-mahal-poing.de');
      console.log('Message ID:', info.messageId);
      
      return NextResponse.json(
        { 
          message: 'Email sent successfully to info@taj-mahal-poing.de',
          messageId: info.messageId
        },
        { status: 200 }
      );
    } catch (smtpError) {
      console.error('SMTP Error sending email:', smtpError);
      console.error('Error details:', {
        code: smtpError.code,
        command: smtpError.command,
        response: smtpError.response,
      });
      
      return NextResponse.json(
        { 
          error: 'Failed to send email',
          details: smtpError.message || 'SMTP connection failed'
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error processing form:', error);
    return NextResponse.json(
      { error: 'Failed to process form', details: error.message },
      { status: 500 }
    );
  }
}

