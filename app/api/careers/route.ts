import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

function makeTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? 'smtp.zoho.in',
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, role, portfolio, resume, message } = await req.json() as Record<string, string>;

    if (!name || !email || !role || !resume) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await makeTransport().sendMail({
      from: `"BrandThink Website" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_TO ?? 'adityaraj@thebrandthink.com',
      cc: 'ankit.rohilla@thebrandthink.com',
      replyTo: email,
      subject: `Application: ${name} — ${role}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone ?? 'N/A'}\nRole: ${role}\nPortfolio: ${portfolio ?? 'N/A'}\nResume: ${resume}\n\n${message ?? ''}`,
      html: `
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone ?? 'N/A'}</p>
        <p><b>Role:</b> ${role}</p>
        <p><b>Portfolio:</b> ${portfolio ? `<a href="${portfolio}">${portfolio}</a>` : 'N/A'}</p>
        <p><b>Resume:</b> <a href="${resume}">${resume}</a></p>
        ${message ? `<hr><p>${message.replace(/\n/g, '<br>')}</p>` : ''}
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Careers API error:', err);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}
