import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 pb-32">
      <Link 
        to="/settings" 
        className="inline-flex items-center gap-2 text-sm font-black text-muted-foreground hover:text-primary transition-colors mb-12 group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back
      </Link>

      <div className="max-w-[800px] mx-auto p-6 md:p-10 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 rounded-[2rem] shadow-xl border border-border/50">
        <h1 className="text-3xl md:text-4xl font-black text-primary mb-6">Privacy Policy</h1>
        
        <div className="space-y-4 font-medium text-sm md:text-base leading-relaxed">
          <p><strong>App Name:</strong> LunarDays - Chinese Calendar</p>
          <p><strong>Developer:</strong> LunarDays</p>
          <p><strong>Last Updated:</strong> January 2026</p>

          <h2 className="text-xl md:text-2xl font-black text-primary mt-8 mb-4">Introduction</h2>
          <p>LunarDays - Chinese Calendar ("we", "our", or "the app") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect information when you use our application.</p>

          <h2 className="text-xl md:text-2xl font-black text-primary mt-8 mb-4">Information We Collect</h2>
          <p>LunarDays - Chinese Calendar does not require registration, login, or any personal account creation. We do not directly collect or store any personally identifiable information.</p>
          <p>The following information may be collected automatically by third-party advertising partners:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li>Device type and operating system</li>
            <li>Approximate geographic location (country/region level)</li>
            <li>App usage data and interaction with advertisements</li>
            <li>IP address (used for geographic ad targeting)</li>
          </ul>

          <h2 className="text-xl md:text-2xl font-black text-primary mt-8 mb-4">Advertising</h2>
          <p>This app displays advertisements provided by third-party advertising networks including Monetag and their partners. These advertising networks may use cookies and similar technologies to serve relevant advertisements. Their data collection and use is governed by their own privacy policies.</p>

          <h2 className="text-xl md:text-2xl font-black text-primary mt-8 mb-4">Cookies</h2>
          <p>This app uses cookies and similar local storage technologies to remember your preferences and to enable advertising functionality. You will be asked to consent to cookie use when you first launch the app.</p>

          <h2 className="text-xl md:text-2xl font-black text-primary mt-8 mb-4">How We Use Information</h2>
          <p>Information collected through advertising partners is used solely to display relevant advertisements. We do not sell, trade, or transfer your information to third parties outside of our advertising partners.</p>

          <h2 className="text-xl md:text-2xl font-black text-primary mt-8 mb-4">Data Retention</h2>
          <p>We do not retain personal data on our servers. Advertising partner data retention is governed by their respective privacy policies.</p>

          <h2 className="text-xl md:text-2xl font-black text-primary mt-8 mb-4">Children's Privacy</h2>
          <p>This app is suitable for all ages. We do not knowingly collect personal information from children under 13.</p>

          <h2 className="text-xl md:text-2xl font-black text-primary mt-8 mb-4">Your Rights</h2>
          <p>Depending on your location, you may have rights regarding your personal data including the right to access, correct, or delete data held by our advertising partners. Please refer to the privacy policies of Monetag for information on exercising these rights.</p>

          <h2 className="text-xl md:text-2xl font-black text-primary mt-8 mb-4">Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. Continued use of the app after changes constitutes acceptance of the updated policy.</p>

          <h2 className="text-xl md:text-2xl font-black text-primary mt-8 mb-4">Contact</h2>
          <p>For privacy-related questions, contact us through the app's store listing page.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;