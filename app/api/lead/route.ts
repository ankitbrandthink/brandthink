import { NextRequest, NextResponse } from 'next/server';

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
    const { name, email, phone, company, budget, message } = await req.json() as Record<string, string>;

    if (!name || !email || !phone || !company || !budget) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

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
          Description: message ?? '',
          LEADCF1: budget,
          Lead_Source: 'Performance Marketing Landing Page',
        }],
      }),
    });

    if (!zohoRes.ok) {
      const err = await zohoRes.json();
      console.error('Zoho CRM error:', err);
      return NextResponse.json({ error: 'CRM error' }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Lead API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
