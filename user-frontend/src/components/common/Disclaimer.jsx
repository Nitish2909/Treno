import React from 'react';
import { ShieldAlert, ExternalLink, ArrowLeft, Mail } from 'lucide-react';

const Disclaimer = () => {
  const companyName = "YourCompany";
  const domain = "www.yourcompany.com";

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Navigation / Back Action */}
        <button 
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </button>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-10 space-y-8">
          
          {/* Header Section */}
          <div className="space-y-3 text-center sm:text-left border-b border-slate-100 pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/60 text-amber-700 text-xs font-semibold tracking-wide uppercase">
              <ShieldAlert className="w-3.5 h-3.5" />
              Legal Information
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Website Disclaimer
            </h1>
            <p className="text-slate-500 text-sm sm:text-base">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          </div>

          {/* Body Content */}
          <div className="space-y-6 text-slate-600 text-base leading-relaxed">
            
            <p className="text-slate-800 font-medium">
              {companyName} provides the <a href={`https://${domain}`} className="text-indigo-600 hover:underline inline-flex items-center gap-0.5">{domain} <ExternalLink className="w-3 h-3"/></a> website as a service to the public and website owners.
            </p>

            {/* Callout Box for Key Disclaimer */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 text-slate-700 text-sm space-y-2">
              <p className="font-semibold text-slate-900">Limitation of Liability</p>
              <p>
                {companyName} is not responsible for, and expressly disclaims all liability for, damages of any kind arising out of use, reference to, or reliance on any information contained within the site. While the information contained within the site is periodically updated, no guarantee is given that the information provided in this website is correct, complete, and up-to-date.
              </p>
            </div>

            <p>
              Although the {companyName} website may include links providing direct access to other Internet resources, including websites, {companyName} is not responsible for the accuracy or content of information contained in these sites.
            </p>

            <p>
              Links from {domain} to third-party sites do not constitute an endorsement by {companyName} of the parties or their products and services. The appearance on the website of advertisements and product or service information does not constitute an endorsement by {companyName}.
            </p>

          </div>

          {/* Footer Contact Callout */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
            <p>Have questions about our legal policies?</p>
            <a 
              href="mailto:support@yourcompany.com" 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors"
            >
              <Mail className="w-4 h-4" />
              Contact Support
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Disclaimer;