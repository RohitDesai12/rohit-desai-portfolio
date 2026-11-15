import React, { useState } from 'react';
import { Linkedin, Github, Send, ArrowUpRight, Copy, Check } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { Container } from '../components/common/Container';
import { SectionHeader } from '../components/common/SectionHeader';
import { Button } from '../components/common/Button';

export const ContactSection: React.FC = () => {
  const { personal } = usePortfolio();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [copiedEmail, setCopiedEmail] = useState(false);

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Please provide your name';
    if (!formData.email.trim()) {
      errors.email = 'Please provide your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please provide a valid email address';
    }
    if (!formData.message.trim()) errors.message = 'Please enter your message';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Authentic mailto trigger: Opens user's email client with pre-filled content
    // Completely transparent; avoids misleading fake AJAX success messages
    const subjectEncoded = encodeURIComponent(formData.subject || `Portfolio Inquiry from ${formData.name}`);
    const bodyEncoded = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${personal.email}?subject=${subjectEncoded}&body=${bodyEncoded}`;
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="py-24 bg-[#F7F7F2]">
      <Container>
        <SectionHeader
          number="06"
          tag="GET IN TOUCH"
          title="LET'S CONNECT."
          subtitle="Interested in building useful software and exploring meaningful engineering opportunities. Feel free to reach out."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Direct Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="border border-[#DDDFD8] bg-[#E8EEE8] p-6 sm:p-8 space-y-6">
              <div className="font-mono text-xs uppercase text-[#285943] font-semibold tracking-wider border-b border-[#DDDFD8] pb-3">
                DIRECT CONTACT CHANNELS
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <span className="font-mono text-xs text-[#777D78] uppercase block">
                  EMAIL ADDRESS
                </span>
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={`mailto:${personal.email}`}
                    className="font-medium text-sm sm:text-base text-[#202522] hover:text-[#285943] transition-colors break-all"
                  >
                    {personal.email}
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 text-[#777D78] hover:text-[#202522] hover:bg-[#F7F7F2] rounded-xs transition-colors shrink-0"
                    title="Copy Email"
                    aria-label="Copy Email address"
                  >
                    {copiedEmail ? <Check size={16} className="text-[#285943]" /> : <Copy size={16} />}
                  </button>
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <span className="font-mono text-xs text-[#777D78] uppercase block">
                  TELEPHONE
                </span>
                <a
                  href={`tel:${personal.phone.replace(/\s+/g, '')}`}
                  className="font-medium text-sm sm:text-base text-[#202522] hover:text-[#285943] transition-colors font-mono"
                >
                  {personal.phone}
                </a>
              </div>

              {/* Location */}
              <div className="space-y-1.5">
                <span className="font-mono text-xs text-[#777D78] uppercase block">
                  LOCATION
                </span>
                <div className="text-sm sm:text-base text-[#202522]">
                  {personal.location}
                </div>
              </div>

              {/* Social Profiles */}
              <div className="pt-2 border-t border-[#DDDFD8] space-y-3">
                <span className="font-mono text-xs text-[#777D78] uppercase block">
                  PROFESSIONAL PROFILES
                </span>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={personal.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F7F7F2] border border-[#DDDFD8] text-xs font-mono text-[#202522] hover:border-[#285943] hover:text-[#285943] transition-colors"
                  >
                    <Linkedin size={13} />
                    <span>LinkedIn</span>
                    <ArrowUpRight size={11} />
                  </a>

                  <a
                    href={personal.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F7F7F2] border border-[#DDDFD8] text-xs font-mono text-[#202522] hover:border-[#285943] hover:text-[#285943] transition-colors"
                  >
                    <Github size={13} />
                    <span>GitHub</span>
                    <ArrowUpRight size={11} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="border border-[#DDDFD8] bg-[#F7F7F2] p-6 sm:p-8">
              <div className="border-b border-[#DDDFD8] pb-3 mb-6 flex items-center justify-between">
                <div className="font-mono text-xs uppercase text-[#285943] font-semibold tracking-wider">
                  SEND AN EMAIL MESSAGE
                </div>
                <span className="font-mono text-[11px] text-[#777D78]">
                  via default email client
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-mono uppercase text-[#202522] mb-1.5"
                    >
                      Your Name <span className="text-[#285943]">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-3.5 py-2.5 bg-[#F7F7F2] border border-[#DDDFD8] text-sm text-[#202522] focus:border-[#285943] focus:outline-none transition-colors"
                    />
                    {formErrors.name && (
                      <p className="mt-1 text-xs text-red-600 font-mono">{formErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-mono uppercase text-[#202522] mb-1.5"
                    >
                      Your Email <span className="text-[#285943]">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="w-full px-3.5 py-2.5 bg-[#F7F7F2] border border-[#DDDFD8] text-sm text-[#202522] focus:border-[#285943] focus:outline-none transition-colors"
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-xs text-red-600 font-mono">{formErrors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-mono uppercase text-[#202522] mb-1.5"
                  >
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Project Inquiry / Opportunity"
                    className="w-full px-3.5 py-2.5 bg-[#F7F7F2] border border-[#DDDFD8] text-sm text-[#202522] focus:border-[#285943] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-mono uppercase text-[#202522] mb-1.5"
                  >
                    Message <span className="text-[#285943]">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Hello Rohit, I would like to discuss..."
                    className="w-full px-3.5 py-2.5 bg-[#F7F7F2] border border-[#DDDFD8] text-sm text-[#202522] focus:border-[#285943] focus:outline-none transition-colors resize-y"
                  />
                  {formErrors.message && (
                    <p className="mt-1 text-xs text-red-600 font-mono">{formErrors.message}</p>
                  )}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    icon={<Send size={15} />}
                    iconPosition="right"
                  >
                    Initiate Email Message
                  </Button>

                  <p className="text-[11px] font-mono text-[#777D78]">
                    Launches your system email app directly.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
