import type { Metadata } from 'next';
import Script from 'next/script';
import { Outfit, Montserrat, Kanit } from 'next/font/google';
import '@/styles/landing.css';

export const metadata: Metadata = {
  title: 'Best Digital Marketing Agency in India | Get A Quote Now',
  description:
    "We build your brand's future with social media marketing campaigns, performance marketing services, ecommerce website development services.",
  robots: {
    index: true,
    follow: true,
    googleBot: { 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  alternates: {
    canonical: 'https://thebrandthink.com/performance-marketing-agency-in-india/',
  },
  openGraph: {
    locale: 'en_US',
    type: 'article',
    title: 'Best Digital Marketing Agency in India | Get A Quote Now',
    description:
      "We build your brand's future with social media marketing campaigns, performance marketing services, ecommerce website development services.",
    url: 'https://thebrandthink.com/performance-marketing-agency-in-india/',
    siteName: 'BrandThink',
    images: [
      {
        url: 'https://thebrandthink.com/wp-content/uploads/2026/04/Google-Review-Logo-scaled.png',
        width: 2560,
        height: 1440,
        type: 'image/png',
      },
    ],
  },
  twitter: { card: 'summary_large_image' },
};

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-o',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-m',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});
const kanit = Kanit({
  subsets: ['latin'],
  variable: '--font-k',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${outfit.variable} ${montserrat.variable} ${kanit.variable}`}>
      {/* ── Google Ads (AW-11298616134) ── */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=AW-11298616134"
      />
      <Script id="gads-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'AW-11298616134');
      `}</Script>

      {/* ── Meta / Facebook Pixel (3 pixel IDs) ── */}
      <Script id="fb-pixel" strategy="afterInteractive">{`
        !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
        n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
        (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '3498047713779428');
        fbq('init', '1022067106009344');
        fbq('init', '1946109352864410');
        fbq('track', 'PageView');
      `}</Script>
      {/* noscript fallback sits in <body> via layout JSX */}
      <noscript>
        <img
          height="1" width="1" style={{ display: 'none' }} alt=""
          src="https://www.facebook.com/tr?id=1022067106009344&ev=PageView&noscript=1"
        />
      </noscript>

      {/* ── Microsoft Clarity (trj305ams6) ── */}
      <Script id="ms-clarity" strategy="afterInteractive">{`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;
          t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window,document,"clarity","script","trj305ams6");
      `}</Script>

      {/* ── Zoho CRM — GCLID bridge (populates hidden zc_gad field) ── */}
      <Script
        strategy="afterInteractive"
        src="https://crm.zoho.in/crm/javascript/zcga.js"
      />

      {children}
    </div>
  );
}
