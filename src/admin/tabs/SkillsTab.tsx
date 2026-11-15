import React, { useState } from 'react';
import { Plus, Trash2, Save, CheckCircle2, AlertCircle } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { SkillCategory, SkillItem } from '../../data/skills';
import { Button } from '../../components/common/Button';

export const SkillsTab: React.FC = () => {
  const { skills, updateSection } = usePortfolio();
  const [categories, setCategories] = useState<SkillCategory[]>([...skills]);
  const [newSkillInputs, setNewSkillInputs] = useState<Record<string, { name: string; tag: string }>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  React.useEffect(() => {
    setCategories(skills);
  }, [skills]);

  const handleAddCategory = () => {
    const newCat: SkillCategory = {
      id: `category-${Date.now()}`,
      categoryTitle: 'New Skill Category',
      categoryDescription: 'Description of technologies in this group.',
      skills: [],
    };
    setCategories([...categories, newCat]);
  };

  const handleUpdateCategoryMeta = (catId: string, field: 'categoryTitle' | 'categoryDescription', val: string) => {
    setCategories(
      categories.map((c) => (c.id === catId ? { ...c, [field]: val } : c))
    );
  };

  const handleRemoveCategory = (catId: string) => {
    if (confirm('Delete this entire skill category?')) {
      setCategories(categories.filter((c) => c.id !== catId));
    }
  };

  const handleAddSkillToCategory = (catId: string) => {
    const input = newSkillInputs[catId];
    if (!input || !input.name.trim()) return;

    const newSkill: SkillItem = {
      name: input.name.trim(),
      tag: input.tag.trim() || undefined,
    };

    setCategories(
      categories.map((c) =>
        c.id === catId ? { ...c, skills: [...c.skills, newSkill] } : c
      )
    );

    setNewSkillInputs({
      ...newSkillInputs,
      [catId]: { name: '', tag: '' },
    });
  };

  const handleRemoveSkill = (catId: string, skillName: string) => {
    setCategories(
      categories.map((c) =>
        c.id === catId
          ? { ...c, skills: c.skills.filter((s) => s.name !== skillName) }
          : c
      )
    );
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    setStatusMessage(null);

    const result = await updateSection('skills', categories);
    if (result.success) {
      setStatusMessage({ type: 'success', text: 'All skill categories updated successfully!' });
      setTimeout(() => setStatusMessage(null), 4000);
    } else {
      setStatusMessage({ type: 'error', text: result.error || 'Failed to update skills.' });
    }
    setIsSaving(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DDDFD8] pb-4">
        <div>
          <h2 className="text-xl font-bold font-heading text-[#202522]">
            Skills & Engineering Toolkit Manager
          </h2>
          <p className="text-xs font-mono text-[#777D78] mt-0.5">
            Add or remove skills and configure technical categories without fake ratings or arbitrary bars.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddCategory}
            icon={<Plus size={14} />}
            iconPosition="left"
          >
            Add Category
          </Button>

          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={handleSaveAll}
            disabled={isSaving}
            icon={<Save size={14} />}
            iconPosition="left"
          >
            {isSaving ? 'Saving...' : 'Save Skills Changes'}
          </Button>
        </div>
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

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="border border-[#DDDFD8] bg-[#F7F7F2] p-5 space-y-4 hover:border-[#285943]/40 transition-colors"
          >
            <div className="flex items-start justify-between gap-3 border-b border-[#DDDFD8] pb-3">
              <div className="flex-1 space-y-1.5">
                <input
                  type="text"
                  value={category.categoryTitle}
                  onChange={(e) =>
                    handleUpdateCategoryMeta(category.id, 'categoryTitle', e.target.value)
                  }
                  className="w-full font-heading font-bold text-base text-[#202522] bg-transparent border-b border-transparent focus:border-[#285943] focus:outline-none"
                  placeholder="Category Title"
                />
                <input
                  type="text"
                  value={category.categoryDescription}
                  onChange={(e) =>
                    handleUpdateCategoryMeta(category.id, 'categoryDescription', e.target.value)
                  }
                  className="w-full text-xs text-[#777D78] bg-transparent border-b border-transparent focus:border-[#285943] focus:outline-none"
                  placeholder="Category short description"
                />
              </div>

              <button
                type="button"
                onClick={() => handleRemoveCategory(category.id)}
                className="p-1.5 text-red-600 hover:bg-red-50 rounded-xs"
                title="Delete Category"
              >
                <Trash2 size={14} />
              </button>
            </div>

            {/* Current Skills Chips */}
            <div className="flex flex-wrap gap-2 min-h-[40px]">
              {category.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#E8EEE8] border border-[#DDDFD8] text-xs font-mono text-[#202522] rounded-xs"
                >
                  <span>{skill.name}</span>
                  {skill.tag && (
                    <span className="text-[10px] text-[#285943] font-semibold">
                      • {skill.tag}
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(category.id, skill.name)}
                    className="text-[#777D78] hover:text-red-700 ml-1"
                    title="Remove skill"
                  >
                    ×
                  </button>
                </div>
              ))}
              {category.skills.length === 0 && (
                <span className="text-xs font-mono text-[#777D78] italic">
                  No skills in this category yet.
                </span>
              )}
            </div>

            {/* Add Skill to this Category Form */}
            <div className="pt-2 border-t border-[#DDDFD8]/60 flex items-center gap-2">
              <input
                type="text"
                placeholder="Skill name (e.g. Docker)"
                value={newSkillInputs[category.id]?.name || ''}
                onChange={(e) =>
                  setNewSkillInputs({
                    ...newSkillInputs,
                    [category.id]: {
                      name: e.target.value,
                      tag: newSkillInputs[category.id]?.tag || '',
                    },
                  })
                }
                className="flex-1 px-2.5 py-1.5 bg-[#F7F7F2] border border-[#DDDFD8] text-xs font-mono focus:border-[#285943] focus:outline-none"
              />
              <input
                type="text"
                placeholder="Tag (opt)"
                value={newSkillInputs[category.id]?.tag || ''}
                onChange={(e) =>
                  setNewSkillInputs({
                    ...newSkillInputs,
                    [category.id]: {
                      name: newSkillInputs[category.id]?.name || '',
                      tag: e.target.value,
                    },
                  })
                }
                className="w-24 px-2 py-1.5 bg-[#F7F7F2] border border-[#DDDFD8] text-xs font-mono focus:border-[#285943] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => handleAddSkillToCategory(category.id)}
                className="px-2.5 py-1.5 bg-[#285943] text-[#F7F7F2] text-xs font-mono hover:bg-[#1E4332] rounded-xs"
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
