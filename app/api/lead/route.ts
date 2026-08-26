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

async function getAccessToken(): Promise<string> {
  const params = new URLSearchParams({
    refresh_token: process.env.ZOHO_CRM_REFRESH_TOKEN ?? '',
    client_id: process.env.ZOHO_CRM_CLIENT_ID ?? '',
    client_secret: process.env.ZOHO_CRM_CLIENT_SECRET ?? '',
    grant_type: 'refresh_token',
  });

  const res = await fetch(`https://accounts.zoho.in/oauth/v2/token?${params}`, {
    method: 'POST',
  });
  const data = await res.json() as { access_token?: string; error?: string };
  if (!data.access_token) throw new Error(data.error ?? 'Zoho token fetch failed');
  return data.access_token;
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, company, budget, message, location } = await req.json() as Record<string, string>;

    if (!name || !email || !phone || !company || !budget) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Zoho CRM push is best-effort. A credential or API failure must never
    // cost us the lead, so it is logged and the email notification still goes out.
    try {
      const token = await getAccessToken();

      const zohoRes = await fetch('https://www.zohoapis.in/crm/v6/Leads', {
        method: 'POST',
        headers: {
          Authorization: `Zoho-oauthtoken ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: [{
            Last_Name: name,
            Email: email,
            Phone: phone,
            Mobile: phone,
            Company: company,
            Description: location ? `Source Page: ${location}\n\n${message ?? ''}` : (message ?? ''),
            Project_Details: message ?? '',
            LEADCF1: budget,
            Monthly_Budget: budget,
            Lead_Source: location ? `Performance Marketing - ${location}` : 'Performance Marketing Landing Page',
          }],
        }),
      });

      const zohoBody = await zohoRes.json().catch(() => null);
      if (!zohoRes.ok || zohoBody?.data?.[0]?.status === 'error') {
        console.error('Zoho CRM error:', JSON.stringify(zohoBody));
      } else {
        console.log('Zoho CRM response:', JSON.stringify(zohoBody));
      }
    } catch (err) {
      console.error('Zoho CRM push skipped, lead still emailed:', err);
    }

    const pageLabel = location ? `Performance Marketing — ${location}` : 'Performance Marketing Landing Page';

    makeTransport().sendMail({
      from: `"BrandThink Website" <${process.env.SMTP_USER}>`,
      to: [process.env.SMTP_TO ?? 'adityaraj@thebrandthink.com', 'ankit.rohilla@thebrandthink.com'],
      replyTo: email,
      subject: `New Lead: ${name} — ${pageLabel}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nCompany: ${company}\nBudget: ${budget}\nPage: ${pageLabel}\n\n${message ?? ''}`,
      html: `
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Company:</b> ${company}</p>
        <p><b>Budget:</b> ${budget}</p>
        <p><b>Page:</b> ${pageLabel}</p>
        ${message ? `<hr><p>${message.replace(/\n/g, '<br>')}</p>` : ''}
      `,
    }).catch(err => console.error('Email send error:', err));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Lead API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
