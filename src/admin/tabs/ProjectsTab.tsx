import React, { useState } from 'react';
import { Plus, Edit2, Trash2, ArrowUp, ArrowDown, Save, X, CheckCircle2, AlertCircle, FileText, Upload, Image as ImageIcon } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ProjectItem, ProjectDiagramConfig } from '../../data/projects';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { ConfirmModal } from '../components/ConfirmModal';

export const ProjectsTab: React.FC = () => {
  const { projects, updateSection } = usePortfolio();
  const [projectList, setProjectList] = useState<ProjectItem[]>([...projects]);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isNewProject, setIsNewProject] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<ProjectItem | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [manualImageUrl, setManualImageUrl] = useState('');

  // Synchronize when context projects update
  React.useEffect(() => {
    setProjectList(projects);
  }, [projects]);

  const handleBatchImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !editingProject) return;

    setIsUploadingImages(true);
    setUploadError(null);

    const token = localStorage.getItem('rohit_portfolio_admin_token');
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    try {
      const res = await fetch('/api/upload-multiple', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to upload images');
      }

      const currentImages = editingProject.images || (editingProject.previewImage ? [editingProject.previewImage] : []);
      const newImages = [...currentImages, ...data.urls];

      setEditingProject({
        ...editingProject,
        images: newImages,
        previewImage: newImages[0] || '',
      });
    } catch (err: any) {
      setUploadError(err.message || 'Image upload failed');
    } finally {
      setIsUploadingImages(false);
      e.target.value = '';
    }
  };

  const handleAddManualImage = () => {
    if (!manualImageUrl.trim() || !editingProject) return;
    const currentImages = editingProject.images || (editingProject.previewImage ? [editingProject.previewImage] : []);
    const newImages = [...currentImages, manualImageUrl.trim()];
    setEditingProject({
      ...editingProject,
      images: newImages,
      previewImage: newImages[0] || '',
    });
    setManualImageUrl('');
  };

  const handleRemoveImage = (index: number) => {
    if (!editingProject) return;
    const currentImages = editingProject.images || (editingProject.previewImage ? [editingProject.previewImage] : []);
    const updated = currentImages.filter((_, i) => i !== index);
    setEditingProject({
      ...editingProject,
      images: updated,
      previewImage: updated[0] || '',
    });
  };

  const handleMoveImage = (index: number, direction: 'up' | 'down') => {
    if (!editingProject) return;
    const currentImages = [...(editingProject.images || (editingProject.previewImage ? [editingProject.previewImage] : []))];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= currentImages.length) return;

    const temp = currentImages[index];
    currentImages[index] = currentImages[targetIndex];
    currentImages[targetIndex] = temp;

    setEditingProject({
      ...editingProject,
      images: currentImages,
      previewImage: currentImages[0] || '',
    });
  };

  const handleApplyDiagramPreset = (preset: 'ai' | 'iot' | 'web' | 'cloud') => {
    if (!editingProject) return;
    let config = {
      inputNode1: 'Input Node 1',
      inputNode2: 'Input Node 2',
      centerLabel: 'FLOW',
      outputNode1: 'Output Node 1',
      outputNode2: 'Output Node 2',
    };

    if (preset === 'ai') {
      config = {
        inputNode1: 'Skill Assessment',
        inputNode2: 'Resume Profile',
        centerLabel: 'NLP / ML',
        outputNode1: 'Roadmap',
        outputNode2: 'Tailored CV',
      };
    } else if (preset === 'iot') {
      config = {
        inputNode1: 'IoT Telemetry',
        inputNode2: 'Sensor Intake',
        centerLabel: 'Pipeline',
        outputNode1: 'Forecasting',
        outputNode2: 'Closed-Loop',
      };
    } else if (preset === 'web') {
      config = {
        inputNode1: 'Client UI',
        inputNode2: 'User Session',
        centerLabel: 'REST / ORM',
        outputNode1: 'PostgreSQL',
        outputNode2: 'Cache / CDN',
      };
    } else if (preset === 'cloud') {
      config = {
        inputNode1: 'Git Push',
        inputNode2: 'Docker Image',
        centerLabel: 'CI / CD',
        outputNode1: 'Kubernetes',
        outputNode2: 'Monitoring',
      };
    }

    setEditingProject({
      ...editingProject,
      placeholderTheme: {
        ...editingProject.placeholderTheme,
        diagramType: 'custom',
        diagramConfig: config,
      },
    });
  };

  const activeDiagramConfig: ProjectDiagramConfig = editingProject?.placeholderTheme?.diagramConfig || {
    inputNode1: editingProject?.placeholderTheme?.diagramType === 'sensor-pipeline' ? 'IoT Telemetry' : 'Skill Assessment',
    inputNode2: editingProject?.placeholderTheme?.diagramType === 'sensor-pipeline' ? 'Sensor Intake' : 'Resume Profile',
    centerLabel: editingProject?.placeholderTheme?.diagramType === 'sensor-pipeline' ? 'Pipeline' : 'NLP / ML',
    outputNode1: editingProject?.placeholderTheme?.diagramType === 'sensor-pipeline' ? 'Forecasting' : 'Roadmap',
    outputNode2: editingProject?.placeholderTheme?.diagramType === 'sensor-pipeline' ? 'Closed-Loop' : 'Tailored CV',
  };

  const updateDiagramField = (field: keyof ProjectDiagramConfig, value: string) => {
    if (!editingProject) return;
    setEditingProject({
      ...editingProject,
      placeholderTheme: {
        ...editingProject.placeholderTheme,
        diagramType: 'custom',
        diagramConfig: {
          ...activeDiagramConfig,
          [field]: value,
        },
      },
    });
  };

  const handleOpenAdd = () => {
    const nextNumber = String(projectList.length + 1).padStart(2, '0');
    const newProj: ProjectItem = {
      id: `project-${Date.now()}`,
      number: nextNumber,
      title: '',
      subtitle: '',
      timeline: '2026',
      shortDescription: '',
      featured: true,
      technologies: [],
      keyFeatures: [],
      myContribution: [],
      images: [],
      previewImage: '',
      caseStudy: {
        problem: '',
        objective: '',
        technicalApproach: '',
        implementationDetails: [''],
        contribution: [''],
        challengesAndLearnings: [''],
      },
      placeholderTheme: {
        accentColor: '#285943',
        diagramType: 'custom',
        diagramConfig: {
          inputNode1: 'Client UI',
          inputNode2: 'Data Store',
          centerLabel: 'API / PIPELINE',
          outputNode1: 'Service Out',
          outputNode2: 'User Response',
        },
      },
      githubUrl: '',
      demoUrl: '',
    };
    setEditingProject(newProj);
    setIsNewProject(true);
  };

  const handleOpenEdit = (project: ProjectItem) => {
    const clone: ProjectItem = JSON.parse(JSON.stringify(project));
    if (!clone.placeholderTheme) {
      clone.placeholderTheme = { accentColor: '#285943', diagramType: 'custom' };
    }
    if (!clone.placeholderTheme.diagramConfig) {
      clone.placeholderTheme.diagramConfig =
        clone.placeholderTheme.diagramType === 'sensor-pipeline'
          ? {
              inputNode1: 'IoT Telemetry',
              inputNode2: 'Sensor Intake',
              centerLabel: 'Pipeline',
              outputNode1: 'Forecasting',
              outputNode2: 'Closed-Loop',
            }
          : {
              inputNode1: 'Skill Assessment',
              inputNode2: 'Resume Profile',
              centerLabel: 'NLP / ML',
              outputNode1: 'Roadmap',
              outputNode2: 'Tailored CV',
            };
    }
    setEditingProject(clone);
    setIsNewProject(false);
  };

  const handleSaveProjectForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    if (!editingProject.title.trim()) {
      alert('Please enter a project title');
      return;
    }

    setIsSaving(true);
    let updated: ProjectItem[];
    if (isNewProject) {
      updated = [...projectList, editingProject];
    } else {
      updated = projectList.map((p) => (p.id === editingProject.id ? editingProject : p));
    }

    // Re-index project numbers
    updated = updated.map((p, idx) => ({
      ...p,
      number: String(idx + 1).padStart(2, '0'),
    }));

    const result = await updateSection('projects', updated);
    if (result.success) {
      setProjectList(updated);
      setEditingProject(null);
      setStatusMessage({
        type: 'success',
        text: `Project "${editingProject.title}" saved successfully!`,
      });
      setTimeout(() => setStatusMessage(null), 4000);
    } else {
      setStatusMessage({ type: 'error', text: result.error || 'Failed to save project.' });
    }
    setIsSaving(false);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    setIsSaving(true);
    let updated = projectList.filter((p) => p.id !== deleteTarget.id);
    updated = updated.map((p, idx) => ({
      ...p,
      number: String(idx + 1).padStart(2, '0'),
    }));

    const result = await updateSection('projects', updated);
    if (result.success) {
      setProjectList(updated);
      setStatusMessage({
        type: 'success',
        text: `Project "${deleteTarget.title}" deleted.`,
      });
      setTimeout(() => setStatusMessage(null), 4000);
    } else {
      setStatusMessage({ type: 'error', text: result.error || 'Failed to delete project.' });
    }
    setDeleteTarget(null);
    setIsSaving(false);
  };

  const handleMoveOrder = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= projectList.length) return;

    const copy = [...projectList];
    const temp = copy[index];
    copy[index] = copy[targetIndex];
    copy[targetIndex] = temp;

    const renumbered = copy.map((p, idx) => ({
      ...p,
      number: String(idx + 1).padStart(2, '0'),
    }));

    setProjectList(renumbered);
    await updateSection('projects', renumbered);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DDDFD8] pb-4">
        <div>
          <h2 className="text-xl font-bold font-heading text-[#202522]">
            Projects & Case Studies Manager
          </h2>
          <p className="text-xs font-mono text-[#777D78] mt-0.5">
            Manage your showcase projects, 8-section technical case studies, and code links.
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
          Add New Project
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

      {/* Projects List */}
      <div className="space-y-4">
        {projectList.map((project, idx) => (
          <div
            key={project.id}
            className="border border-[#DDDFD8] bg-[#F7F7F2] p-5 hover:border-[#285943]/40 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#285943]">
                  PROJECT {project.number}
                </span>
                <span className="text-[#DDDFD8]">/</span>
                <span className="font-mono text-xs text-[#777D78]">{project.timeline}</span>
                {project.featured && (
                  <span className="px-1.5 py-0.2 bg-[#E8EEE8] border border-[#DDDFD8] text-[10px] font-mono text-[#285943]">
                    Featured
                  </span>
                )}
              </div>

              <h3 className="font-heading font-bold text-lg text-[#202522]">
                {project.title}
              </h3>
              <p className="text-xs text-[#777D78] max-w-2xl line-clamp-2">
                {project.shortDescription}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.technologies.slice(0, 6).map((tech) => (
                  <Badge key={tech} variant="default" size="sm">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[#DDDFD8]">
              <button
                type="button"
                onClick={() => handleMoveOrder(idx, 'up')}
                disabled={idx === 0}
                className="p-1.5 text-[#777D78] hover:text-[#202522] hover:bg-[#E8EEE8] disabled:opacity-30 rounded-xs"
                title="Move Up"
              >
                <ArrowUp size={15} />
              </button>
              <button
                type="button"
                onClick={() => handleMoveOrder(idx, 'down')}
                disabled={idx === projectList.length - 1}
                className="p-1.5 text-[#777D78] hover:text-[#202522] hover:bg-[#E8EEE8] disabled:opacity-30 rounded-xs"
                title="Move Down"
              >
                <ArrowDown size={15} />
              </button>
              <button
                type="button"
                onClick={() => handleOpenEdit(project)}
                className="px-3 py-1.5 text-xs font-mono bg-[#E8EEE8] border border-[#DDDFD8] hover:border-[#285943] text-[#202522] rounded-xs flex items-center gap-1.5"
              >
                <Edit2 size={13} />
                <span>Edit</span>
              </button>
              <button
                type="button"
                onClick={() => setDeleteTarget(project)}
                className="p-1.5 text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 rounded-xs"
                title="Delete Project"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add Modal Form */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div
            className="fixed inset-0 bg-[#202522]/60 backdrop-blur-xs"
            onClick={() => setEditingProject(null)}
          />

          <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#F7F7F2] border border-[#DDDFD8] shadow-2xl p-6 sm:p-8 z-10 my-auto text-[#202522]">
            <div className="flex items-center justify-between border-b border-[#DDDFD8] pb-4 mb-6">
              <div>
                <span className="font-mono text-xs text-[#285943] font-semibold">
                  {isNewProject ? 'CREATE NEW ENTRY' : `EDIT PROJECT ${editingProject.number}`}
                </span>
                <h3 className="font-heading font-bold text-xl text-[#202522]">
                  {editingProject.title || 'Untitled Project'}
                </h3>
              </div>
              <button
                onClick={() => setEditingProject(null)}
                className="p-1.5 text-[#777D78] hover:text-[#202522] hover:bg-[#E8EEE8] rounded-xs"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveProjectForm} className="space-y-6">
              {/* Core Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#202522] mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-[#F7F7F2] border border-[#DDDFD8] text-sm focus:border-[#285943] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#202522] mb-1">
                    Subtitle / Architecture Focus
                  </label>
                  <input
                    type="text"
                    value={editingProject.subtitle}
                    onChange={(e) => setEditingProject({ ...editingProject, subtitle: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F7F2] border border-[#DDDFD8] text-sm focus:border-[#285943] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#202522] mb-1">
                    Timeline (e.g. May 2026 – Oct 2026)
                  </label>
                  <input
                    type="text"
                    value={editingProject.timeline}
                    onChange={(e) => setEditingProject({ ...editingProject, timeline: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F7F2] border border-[#DDDFD8] text-sm focus:border-[#285943] focus:outline-none font-mono"
                  />
                </div>
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-xs font-mono uppercase text-[#202522] mb-1">
                  Card Short Overview *
                </label>
                <textarea
                  rows={2}
                  value={editingProject.shortDescription}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, shortDescription: e.target.value })
                  }
                  required
                  className="w-full px-3 py-2 bg-[#F7F7F2] border border-[#DDDFD8] text-sm focus:border-[#285943] focus:outline-none leading-relaxed"
                />
              </div>

              {/* Core Contribution Highlight */}
              <div>
                <label className="block text-xs font-mono uppercase text-[#202522] mb-1 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-[#285943]" />
                  <span>Core Contribution (Featured Highlight on Project Card)</span>
                </label>
                <textarea
                  rows={2}
                  value={editingProject.myContribution?.[0] || ''}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      myContribution: [e.target.value],
                    })
                  }
                  placeholder="e.g. Developed NLP/ML-powered recommendation workflows and integrated model inference with backend APIs to generate personalized career and skill recommendations."
                  className="w-full px-3 py-2 bg-[#F7F7F2] border border-[#DDDFD8] text-sm focus:border-[#285943] focus:outline-none leading-relaxed"
                />
                <p className="text-[11px] font-mono text-[#777D78] mt-1">
                  This text appears directly inside the &ldquo;CORE CONTRIBUTION&rdquo; highlight card on the project preview.
                </p>
              </div>

              {/* Technologies (comma separated or chip list) */}
              <div>
                <label className="block text-xs font-mono uppercase text-[#202522] mb-1">
                  Technologies (comma separated)
                </label>
                <input
                  type="text"
                  value={editingProject.technologies.join(', ')}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      technologies: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                    })
                  }
                  placeholder="Python, NLP, Flask, React.js"
                  className="w-full px-3 py-2 bg-[#F7F7F2] border border-[#DDDFD8] text-sm focus:border-[#285943] focus:outline-none font-mono"
                />
              </div>

              {/* URLs & Optional Screenshot */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#202522] mb-1">
                    GitHub Repository URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={editingProject.githubUrl || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-2 bg-[#F7F7F2] border border-[#DDDFD8] text-xs font-mono focus:border-[#285943] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#202522] mb-1">
                    Live Demo URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={editingProject.demoUrl || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, demoUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 bg-[#F7F7F2] border border-[#DDDFD8] text-xs font-mono focus:border-[#285943] focus:outline-none"
                  />
                </div>
              </div>

              {/* Multi-Screenshot Gallery (Supports up to 10+ images with Auto-play & Carousel) */}
              <div className="border border-[#DDDFD8] bg-[#E8EEE8]/40 p-4 sm:p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#DDDFD8] pb-3">
                  <div className="flex items-center gap-2">
                    <ImageIcon size={16} className="text-[#285943]" />
                    <h4 className="font-mono text-xs uppercase text-[#285943] font-semibold">
                      Project Screenshots & Carousel (Supports 10+ Images)
                    </h4>
                  </div>
                  <span className="text-[11px] font-mono text-[#777D78]">
                    {(editingProject.images || (editingProject.previewImage ? [editingProject.previewImage] : [])).length} Images Uploaded
                  </span>
                </div>

                <p className="text-xs text-[#777D78] leading-relaxed">
                  Upload multiple screenshots for this project (supports at least 10 images). On the live portfolio, they will automatically cycle as an interactive slideshow with left/right arrows. <strong className="text-[#202522]">If no images are uploaded, the project will automatically display the architectural schematic diagram.</strong>
                </p>

                {uploadError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-mono flex items-center gap-2">
                    <AlertCircle size={14} className="shrink-0" />
                    <span>{uploadError}</span>
                  </div>
                )}

                {/* Upload Buttons & Manual Add */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <label className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#285943] text-[#F7F7F2] hover:bg-[#1E4332] text-xs font-mono uppercase tracking-wider font-semibold cursor-pointer rounded-xs transition-colors shrink-0">
                    <Upload size={14} className={isUploadingImages ? 'animate-bounce' : ''} />
                    <span>{isUploadingImages ? 'Uploading Images...' : 'Upload Images (Select Multiple)'}</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleBatchImageUpload}
                      disabled={isUploadingImages}
                      className="hidden"
                    />
                  </label>

                  <div className="flex flex-1 items-center gap-2">
                    <input
                      type="text"
                      value={manualImageUrl}
                      onChange={(e) => setManualImageUrl(e.target.value)}
                      placeholder="Or paste image URL (/assets/... or https://...)"
                      className="flex-1 px-3 py-2 bg-[#F7F7F2] border border-[#DDDFD8] text-xs font-mono focus:border-[#285943] focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddManualImage}
                      disabled={!manualImageUrl.trim()}
                      className="px-3 py-2 bg-[#E8EEE8] border border-[#DDDFD8] hover:border-[#285943] text-xs font-mono text-[#202522] disabled:opacity-40 rounded-xs cursor-pointer"
                    >
                      Add URL
                    </button>
                  </div>
                </div>

                {/* Image List Preview Grid */}
                {(() => {
                  const currentImages = editingProject.images || (editingProject.previewImage ? [editingProject.previewImage] : []);
                  if (currentImages.length === 0) {
                    return (
                      <div className="p-4 border border-dashed border-[#DDDFD8] text-center text-xs font-mono text-[#777D78] bg-[#F7F7F2]">
                        No screenshots uploaded yet. The editorial schematic diagram will be shown by default.
                      </div>
                    );
                  }

                  return (
                    <div className="space-y-2 pt-2">
                      <span className="block font-mono text-[11px] uppercase text-[#777D78]">
                        Re-order & Manage Slideshow Sequence:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {currentImages.map((imgUrl, imgIdx) => (
                          <div
                            key={imgIdx}
                            className="border border-[#DDDFD8] bg-[#F7F7F2] p-2 flex flex-col justify-between space-y-2 shadow-xs group"
                          >
                            <div className="relative aspect-[16/10] bg-[#202522]/5 overflow-hidden border border-[#DDDFD8]/60 flex items-center justify-center">
                              <img
                                src={imgUrl}
                                alt={`Screenshot ${imgIdx + 1}`}
                                className="w-full h-full object-contain"
                              />
                              <span className="absolute top-1 left-1 bg-[#202522]/80 text-[#F7F7F2] text-[10px] font-mono px-1.5 py-0.5 rounded-xs">
                                #{imgIdx + 1} {imgIdx === 0 ? '(Cover)' : ''}
                              </span>
                            </div>

                            <div className="flex items-center justify-between gap-1 pt-1 border-t border-[#DDDFD8]/60">
                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  onClick={() => handleMoveImage(imgIdx, 'up')}
                                  disabled={imgIdx === 0}
                                  className="p-1 text-[#777D78] hover:text-[#202522] disabled:opacity-30 rounded-xs hover:bg-[#E8EEE8] cursor-pointer"
                                  title="Move Left / Earlier"
                                >
                                  <ArrowUp size={13} className="-rotate-90" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleMoveImage(imgIdx, 'down')}
                                  disabled={imgIdx === currentImages.length - 1}
                                  className="p-1 text-[#777D78] hover:text-[#202522] disabled:opacity-30 rounded-xs hover:bg-[#E8EEE8] cursor-pointer"
                                  title="Move Right / Later"
                                >
                                  <ArrowDown size={13} className="-rotate-90" />
                                </button>
                              </div>

                              <button
                                type="button"
                                onClick={() => handleRemoveImage(imgIdx)}
                                className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-xs transition-colors flex items-center gap-1 text-[11px] font-mono cursor-pointer"
                                title="Remove screenshot"
                              >
                                <Trash2 size={13} />
                                <span>Remove</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Custom Architectural Schematic Diagram (Fallback Preview) */}
              <div className="border border-[#DDDFD8] bg-[#F7F7F2] p-4 sm:p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#DDDFD8] pb-3">
                  <div>
                    <h4 className="font-mono text-xs uppercase text-[#285943] font-semibold">
                      Architectural Schematic Diagram (Visual Motif)
                    </h4>
                    <p className="text-xs text-[#777D78] mt-0.5">
                      Customize the node labels according to your specific project architecture. Shown whenever no screenshots are uploaded.
                    </p>
                  </div>

                  {/* Preset quick-fill pills */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-mono uppercase text-[#777D78] mr-1">Quick Fill:</span>
                    <button
                      type="button"
                      onClick={() => handleApplyDiagramPreset('ai')}
                      className="px-2 py-1 bg-[#E8EEE8] hover:bg-[#285943] hover:text-[#F7F7F2] border border-[#DDDFD8] text-[10px] font-mono rounded-xs transition-colors cursor-pointer"
                    >
                      AI / ML
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplyDiagramPreset('iot')}
                      className="px-2 py-1 bg-[#E8EEE8] hover:bg-[#285943] hover:text-[#F7F7F2] border border-[#DDDFD8] text-[10px] font-mono rounded-xs transition-colors cursor-pointer"
                    >
                      IoT / Sensor
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplyDiagramPreset('web')}
                      className="px-2 py-1 bg-[#E8EEE8] hover:bg-[#285943] hover:text-[#F7F7F2] border border-[#DDDFD8] text-[10px] font-mono rounded-xs transition-colors cursor-pointer"
                    >
                      Web / REST
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplyDiagramPreset('cloud')}
                      className="px-2 py-1 bg-[#E8EEE8] hover:bg-[#285943] hover:text-[#F7F7F2] border border-[#DDDFD8] text-[10px] font-mono rounded-xs transition-colors cursor-pointer"
                    >
                      Cloud / DevOps
                    </button>
                  </div>
                </div>

                {/* 5 Node Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#202522] mb-1">
                      Left Top Node (Input 1)
                    </label>
                    <input
                      type="text"
                      value={activeDiagramConfig.inputNode1 || ''}
                      onChange={(e) => updateDiagramField('inputNode1', e.target.value)}
                      placeholder="e.g. Skill Assessment"
                      className="w-full px-2.5 py-1.5 bg-[#F7F7F2] border border-[#DDDFD8] text-xs font-mono focus:border-[#285943] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#202522] mb-1">
                      Center Pipeline Label
                    </label>
                    <input
                      type="text"
                      value={activeDiagramConfig.centerLabel || ''}
                      onChange={(e) => updateDiagramField('centerLabel', e.target.value)}
                      placeholder="e.g. NLP / ML"
                      className="w-full px-2.5 py-1.5 bg-[#F7F7F2] border border-[#DDDFD8] text-xs font-mono focus:border-[#285943] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#202522] mb-1">
                      Right Top Node (Output 1)
                    </label>
                    <input
                      type="text"
                      value={activeDiagramConfig.outputNode1 || ''}
                      onChange={(e) => updateDiagramField('outputNode1', e.target.value)}
                      placeholder="e.g. Roadmap"
                      className="w-full px-2.5 py-1.5 bg-[#F7F7F2] border border-[#DDDFD8] text-xs font-mono focus:border-[#285943] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#202522] mb-1">
                      Left Bottom Node (Input 2 - Optional)
                    </label>
                    <input
                      type="text"
                      value={activeDiagramConfig.inputNode2 || ''}
                      onChange={(e) => updateDiagramField('inputNode2', e.target.value)}
                      placeholder="e.g. Resume Profile"
                      className="w-full px-2.5 py-1.5 bg-[#F7F7F2] border border-[#DDDFD8] text-xs font-mono focus:border-[#285943] focus:outline-none"
                    />
                  </div>

                  <div className="hidden lg:block" />

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#202522] mb-1">
                      Right Bottom Node (Output 2 - Optional)
                    </label>
                    <input
                      type="text"
                      value={activeDiagramConfig.outputNode2 || ''}
                      onChange={(e) => updateDiagramField('outputNode2', e.target.value)}
                      placeholder="e.g. Tailored CV"
                      className="w-full px-2.5 py-1.5 bg-[#F7F7F2] border border-[#DDDFD8] text-xs font-mono focus:border-[#285943] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Live Diagram Mini Preview */}
                <div className="pt-2 border-t border-[#DDDFD8]">
                  <span className="block text-[10px] font-mono uppercase text-[#777D78] mb-2">
                    Live Diagram Preview (As rendered on homepage):
                  </span>
                  <div className="bg-[#E8EEE8] border border-[#DDDFD8] p-4 flex items-center justify-center max-w-md mx-auto">
                    <div className="w-full flex items-center justify-between gap-2 font-mono text-xs">
                      <div className="space-y-2 text-center min-w-0 flex-1">
                        <div className="px-2 py-1 bg-[#F7F7F2] border border-[#DDDFD8] shadow-xs truncate text-[10px]">
                          {activeDiagramConfig.inputNode1 || 'Input 1'}
                        </div>
                        {activeDiagramConfig.inputNode2 && (
                          <div className="px-2 py-1 bg-[#F7F7F2] border border-[#DDDFD8] shadow-xs truncate text-[10px]">
                            {activeDiagramConfig.inputNode2}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col items-center gap-0.5 text-[#285943] shrink-0 px-1">
                        <span className="text-sm font-bold">→</span>
                        <span className="text-[9px] tracking-wider text-[#777D78] uppercase truncate max-w-[70px]">
                          {activeDiagramConfig.centerLabel || 'FLOW'}
                        </span>
                        <span className="text-sm font-bold">→</span>
                      </div>

                      <div className="space-y-2 text-center min-w-0 flex-1">
                        <div className="px-2 py-1 bg-[#285943] text-[#F7F7F2] font-medium shadow-xs truncate text-[10px]">
                          {activeDiagramConfig.outputNode1 || 'Output 1'}
                        </div>
                        {activeDiagramConfig.outputNode2 && (
                          <div className="px-2 py-1 bg-[#F7F7F2] border border-[#285943] text-[#285943] shadow-xs truncate text-[10px]">
                            {activeDiagramConfig.outputNode2}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 8-Section Case Study Details */}
              <div className="border-t border-[#DDDFD8] pt-6 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#285943] font-semibold">
                  <FileText size={15} />
                  <span>Case Study Specification Fields</span>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#202522] mb-1">
                    02 // Problem Statement
                  </label>
                  <textarea
                    rows={2}
                    value={editingProject.caseStudy.problem}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        caseStudy: { ...editingProject.caseStudy, problem: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 bg-[#F7F7F2] border border-[#DDDFD8] text-xs focus:border-[#285943] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#202522] mb-1">
                    03 // Engineering Objective
                  </label>
                  <textarea
                    rows={2}
                    value={editingProject.caseStudy.objective}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        caseStudy: { ...editingProject.caseStudy, objective: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 bg-[#F7F7F2] border border-[#DDDFD8] text-xs focus:border-[#285943] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#202522] mb-1">
                    04 // Technical Approach
                  </label>
                  <textarea
                    rows={2}
                    value={editingProject.caseStudy.technicalApproach}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        caseStudy: { ...editingProject.caseStudy, technicalApproach: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 bg-[#F7F7F2] border border-[#DDDFD8] text-xs focus:border-[#285943] focus:outline-none"
                  />
                </div>
              </div>

              {/* Modal Actions */}
              <div className="border-t border-[#DDDFD8] pt-4 flex items-center justify-end gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setEditingProject(null)}
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
                  {isSaving ? 'Saving Project...' : 'Save Project Entry'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="Delete Project Entry"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This change will be permanently saved to the portfolio database.`}
        confirmLabel="Confirm Delete"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};
