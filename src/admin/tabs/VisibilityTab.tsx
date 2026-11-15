import React, { useState } from 'react';
import { Save, CheckCircle2, AlertCircle, ToggleLeft, ToggleRight, Radio } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { SiteConfig } from '../../data/siteConfig';
import { Button } from '../../components/common/Button';

export const VisibilityTab: React.FC = () => {
  const { siteConfig, updateSection } = usePortfolio();
  const [config, setConfig] = useState<SiteConfig>({ ...siteConfig });
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  React.useEffect(() => {
    setConfig(siteConfig);
  }, [siteConfig]);

  const handleToggle = (key: keyof SiteConfig) => {
    if (typeof config[key] === 'boolean') {
      setConfig({ ...config, [key]: !config[key] });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setStatusMessage(null);

    const result = await updateSection('siteConfig', config);
    if (result.success) {
      setStatusMessage({ type: 'success', text: 'Section visibility settings updated successfully!' });
      setTimeout(() => setStatusMessage(null), 4000);
    } else {
      setStatusMessage({ type: 'error', text: result.error || 'Failed to update visibility settings.' });
    }
    setIsSaving(false);
  };

  const sectionToggles: { key: keyof SiteConfig; label: string; desc: string }[] = [
    { key: 'showAbout', label: 'About Section', desc: 'Narrative engineering bio and academic spec panel.' },
    { key: 'showProjects', label: 'Selected Projects Section', desc: 'Alternating showcase and deep-dive case studies.' },
    { key: 'showSkills', label: 'Technical Skills Section', desc: 'Categorized languages, frameworks, databases, and CS toolkit.' },
    { key: 'showEducation', label: 'Journey & Education Section', desc: 'Vertical chronological timeline of academic milestones.' },
    { key: 'showCertifications', label: 'Accredited Certifications', desc: 'Official certificates and in-website document viewer.' },
    { key: 'showAchievements', label: 'Achievements & Hackathons', desc: 'PU Code Hackathon prototype and simulation milestones.' },
    { key: 'showContact', label: 'Contact & Connect Section', desc: 'Direct contact channels and validated message composer.' },
  ];

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DDDFD8] pb-4">
        <div>
          <h2 className="text-xl font-bold font-heading text-[#202522]">
            Section Visibility & Availability Controls
          </h2>
          <p className="text-xs font-mono text-[#777D78] mt-0.5">
            Turn public website sections on or off without altering components.
          </p>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="sm"
          disabled={isSaving}
          icon={<Save size={14} />}
          iconPosition="left"
        >
          {isSaving ? 'Saving Settings...' : 'Save Visibility Settings'}
        </Button>
      </div>

      {statusMessage && (
        <div
          className={`p-3.5 border text-xs font-mono flex items-center gap-2 ${
            statusMessage.type === 'success'
              ? 'bg-[#E8EEE8] border-[#285943]/30 text-[#285943]'
              : 'bg-red-50 border-red-200 text-red-700'
          }`}
        >
          {statusMessage.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Availability Status Badge Card */}
      <div className="border border-[#DDDFD8] bg-[#E8EEE8]/40 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#285943] font-semibold">
              <Radio size={14} />
              <span>Hero Availability Pulse Badge</span>
            </div>
            <p className="text-xs text-[#777D78] mt-1">
              Shows a live status indicator chip in the Hero header. Disabled by default per your privacy rules.
            </p>
          </div>

          <button
            type="button"
            onClick={() => handleToggle('showAvailabilityBadge')}
            className={`p-1 text-2xl transition-colors ${
              config.showAvailabilityBadge ? 'text-[#285943]' : 'text-[#777D78]'
            }`}
          >
            {config.showAvailabilityBadge ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
          </button>
        </div>

        {config.showAvailabilityBadge && (
          <div className="pt-2 border-t border-[#DDDFD8]">
            <label className="block text-xs font-mono uppercase text-[#202522] mb-1">
              Availability Badge Text
            </label>
            <input
              type="text"
              value={config.availabilityText}
              onChange={(e) => setConfig({ ...config, availabilityText: e.target.value })}
              className="w-full px-3 py-2 bg-[#F7F7F2] border border-[#DDDFD8] text-xs font-mono focus:border-[#285943] focus:outline-none"
            />
          </div>
        )}
      </div>

      {/* Modular Section Toggles */}
      <div className="border border-[#DDDFD8] bg-[#F7F7F2] divide-y divide-[#DDDFD8]">
        {sectionToggles.map((item) => {
          const isEnabled = Boolean(config[item.key]);
          return (
            <div key={item.key} className="p-4 sm:p-5 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-heading font-bold text-sm text-[#202522]">
                    {item.label}
                  </span>
                  <span
                    className={`px-2 py-0.5 text-[10px] font-mono rounded-xs ${
                      isEnabled
                        ? 'bg-[#E8EEE8] text-[#285943] font-semibold'
                        : 'bg-red-50 text-red-700'
                    }`}
                  >
                    {isEnabled ? 'VISIBLE' : 'HIDDEN'}
                  </span>
                </div>
                <p className="text-xs text-[#777D78]">{item.desc}</p>
              </div>

              <button
                type="button"
                onClick={() => handleToggle(item.key)}
                className={`transition-colors shrink-0 ${
                  isEnabled ? 'text-[#285943]' : 'text-[#777D78]'
                }`}
              >
                {isEnabled ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
              </button>
            </div>
          );
        })}
      </div>
    </form>
  );
};
