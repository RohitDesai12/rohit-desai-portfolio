import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { AchievementItem } from '../../data/achievements';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { ConfirmModal } from '../components/ConfirmModal';

export const AchievementsTab: React.FC = () => {
  const { achievements, updateSection } = usePortfolio();
  const [achievementList, setAchievementList] = useState<AchievementItem[]>([...achievements]);
  const [editingItem, setEditingItem] = useState<AchievementItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<AchievementItem | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  React.useEffect(() => {
    setAchievementList(achievements);
  }, [achievements]);

  const handleOpenAdd = () => {
    const newItem: AchievementItem = {
      id: `achieve-${Date.now()}`,
      title: '',
      category: 'Hackathon',
      organization: '',
      description: '',
      impactHighlight: '',
    };
    setEditingItem(newItem);
    setIsNew(true);
  };

  const handleOpenEdit = (item: AchievementItem) => {
    setEditingItem(JSON.parse(JSON.stringify(item)));
    setIsNew(false);
  };

  const handleSaveForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    if (!editingItem.title.trim() || !editingItem.organization.trim()) {
      alert('Title and Organization are required.');
      return;
    }

    setIsSaving(true);
    let updated: AchievementItem[];
    if (isNew) {
      updated = [...achievementList, editingItem];
    } else {
      updated = achievementList.map((a) => (a.id === editingItem.id ? editingItem : a));
    }

    const result = await updateSection('achievements', updated);
    if (result.success) {
      setAchievementList(updated);
      setEditingItem(null);
      setStatusMessage({
        type: 'success',
        text: `Achievement "${editingItem.title}" saved successfully!`,
      });
      setTimeout(() => setStatusMessage(null), 4000);
    } else {
      setStatusMessage({ type: 'error', text: result.error || 'Failed to save achievement.' });
    }
    setIsSaving(false);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    setIsSaving(true);
    const updated = achievementList.filter((a) => a.id !== deleteTarget.id);
    const result = await updateSection('achievements', updated);
    if (result.success) {
      setAchievementList(updated);
      setStatusMessage({
        type: 'success',
        text: `Achievement "${deleteTarget.title}" deleted.`,
      });
      setTimeout(() => setStatusMessage(null), 4000);
    } else {
      setStatusMessage({ type: 'error', text: result.error || 'Failed to delete achievement.' });
    }
    setDeleteTarget(null);
    setIsSaving(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DDDFD8] pb-4">
        <div>
          <h2 className="text-xl font-bold font-heading text-[#202522]">
            Achievements & Hackathons Manager
          </h2>
          <p className="text-xs font-mono text-[#777D78] mt-0.5">
            Manage your competitive hackathons, industry simulations, and key academic recognitions.
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
          Add Achievement
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

      {/* Achievements List */}
      <div className="space-y-4">
        {achievementList.map((item) => (
          <div
            key={item.id}
            className="border border-[#DDDFD8] bg-[#F7F7F2] p-5 hover:border-[#285943]/40 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-heading font-bold text-base text-[#202522]">
                  {item.title}
                </span>
                <Badge variant="default" size="sm">
                  {item.category}
                </Badge>
              </div>

              <div className="text-xs font-mono text-[#777D78]">
                {item.organization} {item.date && `• ${item.date}`}
              </div>

              <p className="text-xs text-[#202522] max-w-2xl leading-relaxed">
                {item.description}
              </p>

              {item.impactHighlight && (
                <div className="pt-1 flex items-center gap-1.5 text-xs font-mono text-[#285943]">
                  <Sparkles size={12} />
                  <span>{item.impactHighlight}</span>
                </div>
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
                title="Delete Achievement"
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
                {isNew ? 'ADD NEW ACHIEVEMENT' : 'EDIT ACHIEVEMENT'}
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
                  Event / Milestone Title *
                </label>
                <input
                  type="text"
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-[#F7F7F2] border border-[#DDDFD8] text-sm focus:border-[#285943] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#202522] mb-1">
                    Category
                  </label>
                  <select
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-[#F7F7F2] border border-[#DDDFD8] text-sm focus:border-[#285943] focus:outline-none"
                  >
                    <option value="Hackathon">Hackathon</option>
                    <option value="Technical Training">Technical Training</option>
                    <option value="Academic">Academic</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#202522] mb-1">
                    Organization / Host *
                  </label>
                  <input
                    type="text"
                    value={editingItem.organization}
                    onChange={(e) => setEditingItem({ ...editingItem, organization: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-[#F7F7F2] border border-[#DDDFD8] text-sm focus:border-[#285943] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#202522] mb-1">
                  Description *
                </label>
                <textarea
                  rows={3}
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-[#F7F7F2] border border-[#DDDFD8] text-sm focus:border-[#285943] focus:outline-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#202522] mb-1">
                  Key Impact / Output Highlight
                </label>
                <input
                  type="text"
                  value={editingItem.impactHighlight || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, impactHighlight: e.target.value })}
                  placeholder="e.g. Delivered working prototype under competitive constraint"
                  className="w-full px-3 py-2 bg-[#F7F7F2] border border-[#DDDFD8] text-xs font-mono focus:border-[#285943] focus:outline-none"
                />
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
                  {isSaving ? 'Saving...' : 'Save Achievement'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="Delete Achievement"
        message={`Are you sure you want to remove "${deleteTarget?.title}"?`}
        confirmLabel="Confirm Delete"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};
