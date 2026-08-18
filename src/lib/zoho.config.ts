/* ══════════════════════════════════════════════════════════════════════
   ZOHO CRM — Web-to-Lead configuration
   ══════════════════════════════════════════════════════════════════════

   HOW TO GET YOUR KEYS:
   1. Zoho CRM → Setup → Developer Space → Webforms
   2. Create / edit a webform for the Leads module
   3. Add the fields listed in `fields` below, then Save
   4. Choose "Self-hosted / I'll host the form" and copy the generated HTML
   5. From that HTML grab:
         <input type="hidden" name="xnQsjsdp" value="  ← formKey  ">
         <input type="hidden" name="xmIwtLD"  value="  ← encKey   ">
   6. Add them to .env.local:
         NEXT_PUBLIC_ZOHO_FORM_KEY=<xnQsjsdp value>
         NEXT_PUBLIC_ZOHO_ENC_KEY=<xmIwtLD value>

   IMPORTANT:
   • Turn OFF reCAPTCHA in the Zoho webform builder — the POST will be rejected otherwise.
   • `returnURL` must be an absolute https:// URL; Zoho rejects localhost.
   ══════════════════════════════════════════════════════════════════════ */

export const ZOHO = {
  endpoint: 'https://crm.zoho.in/crm/WebToLeadForm',

  formKey: process.env.NEXT_PUBLIC_ZOHO_FORM_KEY ?? '',
  encKey:  process.env.NEXT_PUBLIC_ZOHO_ENC_KEY  ?? '',

  actionType: 'TGVhZHM=', // base64("Leads") — do not change

  returnURL:  'https://brandthink.co.in/thank-you/',
  leadSource: 'Performance Marketing Landing Page',

  /* Zoho Lead field API names. `budget` is a custom field — verify the real
     name (LEADCF1, LEADCF2 …) in the Zoho webform HTML and update if needed. */
  fields: {
    name:       'Last Name',
    email:      'Email',
    phone:      'Phone',
    company:    'Company',
    message:    'Description',
    budget:     'LEADCF1',
    leadSource: 'Lead Source',
  },
};

export const zohoReady = !!ZOHO.formKey && !!ZOHO.encKey;
