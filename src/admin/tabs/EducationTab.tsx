import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X, CheckCircle2, AlertCircle } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { EducationItem } from '../../data/education';
import { Button } from '../../components/common/Button';
import { ConfirmModal } from '../components/ConfirmModal';

export const EducationTab: React.FC = () => {
  const { education, updateSection } = usePortfolio();
  const [eduList, setEduList] = useState<EducationItem[]>([...education]);
  const [editingItem, setEditingItem] = useState<EducationItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<EducationItem | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  React.useEffect(() => {
    setEduList(education);
  }, [education]);

  const handleOpenAdd = () => {
    const newItem: EducationItem = {
      id: `edu-${Date.now()}`,
      degree: '',
      fieldOfStudy: '',
      institution: '',
      location: '',
      duration: '',
      scoreLabel: 'CGPA',
      scoreValue: '',
      highlights: [''],
    };
    setEditingItem(newItem);
    setIsNew(true);
  };

  const handleOpenEdit = (item: EducationItem) => {
    setEditingItem(JSON.parse(JSON.stringify(item)));
    setIsNew(false);
  };

  const handleSaveForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    if (!editingItem.degree.trim() || !editingItem.institution.trim()) {
      alert('Degree and Institution are required.');
      return;
    }

    setIsSaving(true);
    let updated: EducationItem[];
    if (isNew) {
      updated = [...eduList, editingItem];
    } else {
      updated = eduList.map((e) => (e.id === editingItem.id ? editingItem : e));
    }

    const result = await updateSection('education', updated);
    if (result.success) {
      setEduList(updated);
      setEditingItem(null);
      setStatusMessage({
        type: 'success',
        text: `Education milestone "${editingItem.degree}" saved successfully!`,
      });
      setTimeout(() => setStatusMessage(null), 4000);
    } else {
      setStatusMessage({ type: 'error', text: result.error || 'Failed to save education entry.' });
    }
    setIsSaving(false);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    setIsSaving(true);
    const updated = eduList.filter((e) => e.id !== deleteTarget.id);
    const result = await updateSection('education', updated);
    if (result.success) {
      setEduList(updated);
      setStatusMessage({
        type: 'success',
        text: `Education milestone "${deleteTarget.degree}" deleted.`,
      });
      setTimeout(() => setStatusMessage(null), 4000);
    } else {
      setStatusMessage({ type: 'error', text: result.error || 'Failed to delete education entry.' });
    }
    setDeleteTarget(null);
    setIsSaving(false);
  };

  const handleAddHighlight = () => {
    if (!editingItem) return;
    setEditingItem({
      ...editingItem,
      highlights: [...(editingItem.highlights || []), ''],
    });
  };

  const handleUpdateHighlight = (index: number, val: string) => {
    if (!editingItem || !editingItem.highlights) return;
    const copy = [...editingItem.highlights];
    copy[index] = val;
    setEditingItem({ ...editingItem, highlights: copy });
  };

  const handleRemoveHighlight = (index: number) => {
    if (!editingItem || !editingItem.highlights) return;
    setEditingItem({
      ...editingItem,
      highlights: editingItem.highlights.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DDDFD8] pb-4">
        <div>
          <h2 className="text-xl font-bold font-heading text-[#202522]">
            Academic History & Journey Manager
          </h2>
          <p className="text-xs font-mono text-[#777D78] mt-0.5">
            Manage your verified degree programs, academic standings, and timeline progression.
          </p>
        </div>

        <Button
          type="button"
          variant="primary"
          size="sm"
          onClick={handleOpenAdd}
          icon={<Plus size={14} />}
          iconPosition="left"
        >
          Add Milestone
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

      {/* Timeline List */}
      <div className="space-y-4">
        {eduList.map((item) => (
          <div
            key={item.id}
            className="border border-[#DDDFD8] bg-[#F7F7F2] p-5 hover:border-[#285943]/40 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-heading font-bold text-base text-[#202522]">
                  {item.degree}
                </span>
                <span className="px-2 py-0.5 bg-[#E8EEE8] border border-[#DDDFD8] font-mono text-xs text-[#285943]">
                  {item.scoreLabel}: {item.scoreValue}
                </span>
              </div>

              <div className="text-xs font-mono text-[#777D78]">
                {item.institution} {item.location && `(${item.location})`} • {item.duration}
              </div>

              {item.highlights && item.highlights.length > 0 && (
                <ul className="pt-1 space-y-1">
                  {item.highlights.map((h, i) => (
                    <li key={i} className="text-xs text-[#777D78] flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-[#285943]" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[#DDDFD8]">
              <button
                type="button"
                onClick={() => handleOpenEdit(item)}
                className="px-3 py-1.5 text-xs font-mono bg-[#E8EEE8] border border-[#DDDFD8] hover:border-[#285943] text-[#202522] rounded-xs flex items-center gap-1.5"
              >
                <Edit2 size={13} />
                <span>Edit</span>
              </button>

              <button
                type="button"
                onClick={() => setDeleteTarget(item)}
                className="p-1.5 text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 rounded-xs"
                title="Delete Entry"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div
            className="fixed inset-0 bg-[#202522]/60 backdrop-blur-xs"
            onClick={() => setEditingItem(null)}
          />

          <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-[#F7F7F2] border border-[#DDDFD8] shadow-2xl p-6 sm:p-8 z-10 my-auto text-[#202522]">
            <div className="flex items-center justify-between border-b border-[#DDDFD8] pb-4 mb-6">
              <h3 className="font-heading font-bold text-xl text-[#202522]">
                {isNew ? 'ADD ACADEMIC MILESTONE' : 'EDIT ACADEMIC MILESTONE'}
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="p-1.5 text-[#777D78] hover:text-[#202522] hover:bg-[#E8EEE8] rounded-xs"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-[#202522] mb-1">
                  Degree / Certificate Title *
                </label>
                <input
                  type="text"
                  value={editingItem.degree}
                  onChange={(e) => setEditingItem({ ...editingItem, degree: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-[#F7F7F2] border border-[#DDDFD8] text-sm focus:border-[#285943] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#202522] mb-1">
                    Institution Name *
                  </label>
                  <input
                    type="text"
                    value={editingItem.institution}
                    onChange={(e) => setEditingItem({ ...editingItem, institution: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-[#F7F7F2] border border-[#DDDFD8] text-sm focus:border-[#285943] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#202522] mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={editingItem.location || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F7F2] border border-[#DDDFD8] text-sm focus:border-[#285943] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#202522] mb-1">
                    Duration (e.g. 2023 – 2027)
                  </label>
                  <input
                    type="text"
                    value={editingItem.duration}
                    onChange={(e) => setEditingItem({ ...editingItem, duration: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F7F2] border border-[#DDDFD8] text-sm focus:border-[#285943] focus:outline-none font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#202522] mb-1">
                      Score Label
                    </label>
                    <input
                      type="text"
                      value={editingItem.scoreLabel}
                      onChange={(e) => setEditingItem({ ...editingItem, scoreLabel: e.target.value })}
                      placeholder="CGPA / %"
                      className="w-full px-3 py-2 bg-[#F7F7F2] border border-[#DDDFD8] text-sm focus:border-[#285943] focus:outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#202522] mb-1">
                      Score Value
                    </label>
                    <input
                      type="text"
                      value={editingItem.scoreValue}
                      onChange={(e) => setEditingItem({ ...editingItem, scoreValue: e.target.value })}
                      placeholder="7.63 / 10"
                      className="w-full px-3 py-2 bg-[#F7F7F2] border border-[#DDDFD8] text-sm focus:border-[#285943] focus:outline-none font-mono font-bold text-[#285943]"
                    />
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-mono uppercase text-[#202522]">
                    Milestone Highlights
                  </label>
                  <button
                    type="button"
                    onClick={handleAddHighlight}
                    className="text-xs font-mono text-[#285943] hover:underline flex items-center gap-1"
                  >
                    <Plus size={12} />
                    <span>Add Highlight</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {editingItem.highlights?.map((h, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={h}
                        onChange={(e) => handleUpdateHighlight(idx, e.target.value)}
                        className="flex-1 px-3 py-1.5 bg-[#F7F7F2] border border-[#DDDFD8] text-xs focus:border-[#285943] focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveHighlight(idx)}
                        className="p-1.5 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#DDDFD8] pt-4 flex items-center justify-end gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setEditingItem(null)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={isSaving}
                  icon={<Save size={14} />}
                  iconPosition="left"
                >
                  {isSaving ? 'Saving...' : 'Save Milestone'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="Delete Education Milestone"
        message={`Are you sure you want to remove "${deleteTarget?.degree}"?`}
        confirmLabel="Confirm Delete"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};
