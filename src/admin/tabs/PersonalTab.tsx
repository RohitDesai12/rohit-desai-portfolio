import React, { useState } from 'react';
import { Save, Plus, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { PersonalData } from '../../data/personal';
import { Button } from '../../components/common/Button';

export const PersonalTab: React.FC = () => {
  const { personal, updateSection } = usePortfolio();
  const [formData, setFormData] = useState<PersonalData>({ ...personal });
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setStatusMessage(null);

    const result = await updateSection('personal', formData);
    if (result.success) {
      setStatusMessage({ type: 'success', text: 'Personal details and bio updated successfully!' });
      setTimeout(() => setStatusMessage(null), 4000);
    } else {
      setStatusMessage({ type: 'error', text: result.error || 'Failed to update personal details.' });
    }
    setIsSaving(false);
  };

  const handleAddSummaryParagraph = () => {
    setFormData({
      ...formData,
      editorialSummary: [...formData.editorialSummary, ''],
    });
  };

  const handleUpdateSummaryParagraph = (index: number, text: string) => {
    const updated = [...formData.editorialSummary];
    updated[index] = text;
    setFormData({ ...formData, editorialSummary: updated });
  };

  const handleRemoveSummaryParagraph = (index: number) => {
    setFormData({
      ...formData,
      editorialSummary: formData.editorialSummary.filter((_, i) => i !== index),
    });
  };

  const handleAddFocusArea = () => {
    setFormData({
      ...formData,
      academicHighlights: {
        ...formData.academicHighlights,
        focusAreas: [...formData.academicHighlights.focusAreas, ''],
      },
    });
  };

  const handleUpdateFocusArea = (index: number, text: string) => {
    const updated = [...formData.academicHighlights.focusAreas];
    updated[index] = text;
    setFormData({
      ...formData,
      academicHighlights: {
        ...formData.academicHighlights,
        focusAreas: updated,
      },
    });
  };

  const handleRemoveFocusArea = (index: number) => {
    setFormData({
      ...formData,
      academicHighlights: {
        ...formData.academicHighlights,
        focusAreas: formData.academicHighlights.focusAreas.filter((_, i) => i !== index),
      },
    });
  };

  return (
    <form onSubmit={handleSave} className="space-y-8">
      {/* Action Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DDDFD8] pb-4">
        <div>
          <h2 className="text-xl font-bold font-heading text-[#202522]">
            Personal Profile & Bio Management
          </h2>
          <p className="text-xs font-mono text-[#777D78] mt-0.5">
            Update your public developer identity, contact information, and editorial statement.
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
          {isSaving ? 'Saving Changes...' : 'Save Profile Changes'}
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

      {/* Basic Identity */}
      <div className="border border-[#DDDFD8] bg-[#F7F7F2] p-6 space-y-4">
        <h3 className="font-mono text-xs uppercase text-[#285943] font-semibold border-b border-[#DDDFD8] pb-2">
          Basic Identity & Positioning
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase text-[#202522] mb-1">
              Full Legal Name
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-3 py-2 bg-[#F7F7F2] border border-[#DDDFD8] text-sm focus:border-[#285943] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-[#202522] mb-1">
              Display Name
            </label>
            <input
              type="text"
              value={formData.displayName}
              onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
              className="w-full px-3 py-2 bg-[#F7F7F2] border border-[#DDDFD8] text-sm focus:border-[#285943] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-[#202522] mb-1">
              Monogram (2-3 chars)
            </label>
            <input
              type="text"
              maxLength={3}
              value={formData.monogram}
              onChange={(e) => setFormData({ ...formData, monogram: e.target.value })}
              className="w-full px-3 py-2 bg-[#F7F7F2] border border-[#DDDFD8] text-sm focus:border-[#285943] focus:outline-none font-mono"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase text-[#202522] mb-1">
              Professional Role Title
            </label>
            <input
              type="text"
              value={formData.professionalRole}
              onChange={(e) => setFormData({ ...formData, professionalRole: e.target.value })}
              className="w-full px-3 py-2 bg-[#F7F7F2] border border-[#DDDFD8] text-sm focus:border-[#285943] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-[#202522] mb-1">
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3 py-2 bg-[#F7F7F2] border border-[#DDDFD8] text-sm focus:border-[#285943] focus:outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-[#202522] mb-1">
            Hero Tagline / Value Proposition
          </label>
          <textarea
            rows={2}
            value={formData.tagline}
            onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
            className="w-full px-3 py-2 bg-[#F7F7F2] border border-[#DDDFD8] text-sm focus:border-[#285943] focus:outline-none"
            required
          />
        </div>
      </div>

      {/* Contact & Social Handles */}
      <div className="border border-[#DDDFD8] bg-[#F7F7F2] p-6 space-y-4">
        <h3 className="font-mono text-xs uppercase text-[#285943] font-semibold border-b border-[#DDDFD8] pb-2">
          Contact Channels & Developer Profiles
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase text-[#202522] mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 bg-[#F7F7F2] border border-[#DDDFD8] text-sm focus:border-[#285943] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-[#202522] mb-1">
              Phone Number
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 bg-[#F7F7F2] border border-[#DDDFD8] text-sm focus:border-[#285943] focus:outline-none font-mono"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-[#202522] mb-1">
              GitHub Profile URL
            </label>
            <input
              type="url"
              value={formData.socialLinks.github}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  socialLinks: { ...formData.socialLinks, github: e.target.value },
                })
              }
              className="w-full px-3 py-2 bg-[#F7F7F2] border border-[#DDDFD8] text-sm focus:border-[#285943] focus:outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-[#202522] mb-1">
              LinkedIn Profile URL
            </label>
            <input
              type="url"
              value={formData.socialLinks.linkedin}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  socialLinks: { ...formData.socialLinks, linkedin: e.target.value },
                })
              }
              className="w-full px-3 py-2 bg-[#F7F7F2] border border-[#DDDFD8] text-sm focus:border-[#285943] focus:outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-[#202522] mb-1">
              LeetCode URL
            </label>
            <input
              type="url"
              value={formData.socialLinks.leetcode || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  socialLinks: { ...formData.socialLinks, leetcode: e.target.value },
                })
              }
              className="w-full px-3 py-2 bg-[#F7F7F2] border border-[#DDDFD8] text-sm focus:border-[#285943] focus:outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-[#202522] mb-1">
              GeeksForGeeks URL
            </label>
            <input
              type="url"
              value={formData.socialLinks.geeksforgeeks || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  socialLinks: { ...formData.socialLinks, geeksforgeeks: e.target.value },
                })
              }
              className="w-full px-3 py-2 bg-[#F7F7F2] border border-[#DDDFD8] text-sm focus:border-[#285943] focus:outline-none font-mono"
            />
          </div>
        </div>
      </div>

      {/* Editorial Summary Paragraphs */}
      <div className="border border-[#DDDFD8] bg-[#F7F7F2] p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[#DDDFD8] pb-2">
          <h3 className="font-mono text-xs uppercase text-[#285943] font-semibold">
            About Section Narrative Paragraphs
          </h3>
          <button
            type="button"
            onClick={handleAddSummaryParagraph}
            className="text-xs font-mono text-[#285943] hover:underline flex items-center gap-1"
          >
            <Plus size={13} />
            <span>Add Paragraph</span>
          </button>
        </div>

        <div className="space-y-3">
          {formData.editorialSummary.map((para, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="font-mono text-xs text-[#777D78] mt-2 w-6">
                #{idx + 1}
              </span>
              <textarea
                rows={3}
                value={para}
                onChange={(e) => handleUpdateSummaryParagraph(idx, e.target.value)}
                className="flex-1 px-3 py-2 bg-[#F7F7F2] border border-[#DDDFD8] text-sm focus:border-[#285943] focus:outline-none leading-relaxed"
                placeholder="Enter editorial narrative paragraph..."
              />
              <button
                type="button"
                onClick={() => handleRemoveSummaryParagraph(idx)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-xs"
                title="Remove paragraph"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Academic Highlights */}
      <div className="border border-[#DDDFD8] bg-[#F7F7F2] p-6 space-y-4">
        <h3 className="font-mono text-xs uppercase text-[#285943] font-semibold border-b border-[#DDDFD8] pb-2">
          Academic Highlights (About Spec Panel)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase text-[#202522] mb-1">
              Degree Program
            </label>
            <input
              type="text"
              value={formData.academicHighlights.degree}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  academicHighlights: {
                    ...formData.academicHighlights,
                    degree: e.target.value,
                  },
                })
              }
              className="w-full px-3 py-2 bg-[#F7F7F2] border border-[#DDDFD8] text-sm focus:border-[#285943] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-[#202522] mb-1">
              Institution Name
            </label>
            <input
              type="text"
              value={formData.academicHighlights.institution}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  academicHighlights: {
                    ...formData.academicHighlights,
                    institution: e.target.value,
                  },
                })
              }
              className="w-full px-3 py-2 bg-[#F7F7F2] border border-[#DDDFD8] text-sm focus:border-[#285943] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-[#202522] mb-1">
              Current CGPA
            </label>
            <input
              type="text"
              value={formData.academicHighlights.cgpa}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  academicHighlights: {
                    ...formData.academicHighlights,
                    cgpa: e.target.value,
                  },
                })
              }
              className="w-full px-3 py-2 bg-[#F7F7F2] border border-[#DDDFD8] text-sm focus:border-[#285943] focus:outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-[#202522] mb-1">
              Graduation Year
            </label>
            <input
              type="text"
              value={formData.academicHighlights.graduationYear}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  academicHighlights: {
                    ...formData.academicHighlights,
                    graduationYear: e.target.value,
                  },
                })
              }
              className="w-full px-3 py-2 bg-[#F7F7F2] border border-[#DDDFD8] text-sm focus:border-[#285943] focus:outline-none font-mono"
            />
          </div>
        </div>

        {/* Focus Areas */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-mono uppercase text-[#202522]">
              Technical Focus Areas
            </label>
            <button
              type="button"
              onClick={handleAddFocusArea}
              className="text-xs font-mono text-[#285943] hover:underline flex items-center gap-1"
            >
              <Plus size={12} />
              <span>Add Focus Area</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {formData.academicHighlights.focusAreas.map((area, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={area}
                  onChange={(e) => handleUpdateFocusArea(idx, e.target.value)}
                  className="flex-1 px-3 py-1.5 bg-[#F7F7F2] border border-[#DDDFD8] text-xs font-mono focus:border-[#285943] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveFocusArea(idx)}
                  className="p-1.5 text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
};
