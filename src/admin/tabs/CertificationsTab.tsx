import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, Save, X, CheckCircle2, AlertCircle, FileText } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { CertificationItem } from '../../data/certifications';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { ConfirmModal } from '../components/ConfirmModal';
import { FileUploadInput } from '../components/FileUploadInput';
import { CertificateViewerModal } from '../../components/certificate/CertificateViewerModal';

export const CertificationsTab: React.FC = () => {
  const { certifications, updateSection } = usePortfolio();
  const [certList, setCertList] = useState<CertificationItem[]>([...certifications]);
  const [editingCert, setEditingCert] = useState<CertificationItem | null>(null);
  const [isNewCert, setIsNewCert] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<CertificationItem | null>(null);
  const [previewCert, setPreviewCert] = useState<CertificationItem | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  React.useEffect(() => {
    setCertList(certifications);
  }, [certifications]);

  const handleOpenAdd = () => {
    const newEntry: CertificationItem = {
      id: `cert-${Date.now()}`,
      title: '',
      issuer: '',
      date: 'Completed',
      score: '',
      rollNo: '',
      certificatePdf: '',
      resultPdf: '',
      documents: [
        { label: 'Official Certificate', pdfPath: '' }
      ],
      hidden: false,
      notes: '',
    };
    setEditingCert(newEntry);
    setIsNewCert(true);
  };

  const handleOpenEdit = (cert: CertificationItem) => {
    const copy = JSON.parse(JSON.stringify(cert));
    if (!copy.documents || copy.documents.length === 0) {
      copy.documents = [{ label: 'Official Certificate', pdfPath: copy.certificatePdf || '' }];
      if (copy.resultPdf) {
        copy.documents.push({ label: 'Result Sheet', pdfPath: copy.resultPdf });
      }
    }
    setEditingCert(copy);
    setIsNewCert(false);
  };

  const handleToggleVisibility = async (id: string) => {
    const updated = certList.map((c) =>
      c.id === id ? { ...c, hidden: !c.hidden } : c
    );
    setCertList(updated);
    await updateSection('certifications', updated);
  };

  const handleSaveCertForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCert) return;

    if (!editingCert.title.trim() || !editingCert.issuer.trim()) {
      alert('Title and Issuer are required.');
      return;
    }

    setIsSaving(true);

    // Synchronize primary certificatePdf and resultPdf from documents
    const primaryDoc = editingCert.documents?.[0];
    const secondaryDoc = editingCert.documents?.[1];

    const finalCert: CertificationItem = {
      ...editingCert,
      certificatePdf: primaryDoc?.pdfPath || editingCert.certificatePdf,
      resultPdf: secondaryDoc?.pdfPath || editingCert.resultPdf,
    };

    let updated: CertificationItem[];
    if (isNewCert) {
      updated = [...certList, finalCert];
    } else {
      updated = certList.map((c) => (c.id === finalCert.id ? finalCert : c));
    }

    const result = await updateSection('certifications', updated);
    if (result.success) {
      setCertList(updated);
      setEditingCert(null);
      setStatusMessage({
        type: 'success',
        text: `Certification "${finalCert.title}" saved successfully!`,
      });
      setTimeout(() => setStatusMessage(null), 4000);
    } else {
      setStatusMessage({ type: 'error', text: result.error || 'Failed to save certification.' });
    }
    setIsSaving(false);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    setIsSaving(true);
    const updated = certList.filter((c) => c.id !== deleteTarget.id);
    const result = await updateSection('certifications', updated);
    if (result.success) {
      setCertList(updated);
      setStatusMessage({
        type: 'success',
        text: `Certification "${deleteTarget.title}" deleted.`,
      });
      setTimeout(() => setStatusMessage(null), 4000);
    } else {
      setStatusMessage({ type: 'error', text: result.error || 'Failed to delete certification.' });
    }
    setDeleteTarget(null);
    setIsSaving(false);
  };

  const handleAddDocumentItem = () => {
    if (!editingCert) return;
    const docs = editingCert.documents || [];
    setEditingCert({
      ...editingCert,
      documents: [...docs, { label: `Document ${docs.length + 1}`, pdfPath: '' }],
    });
  };

  const handleUpdateDocumentItem = (index: number, field: 'label' | 'pdfPath', val: string) => {
    if (!editingCert || !editingCert.documents) return;
    const updatedDocs = [...editingCert.documents];
    updatedDocs[index] = { ...updatedDocs[index], [field]: val };
    setEditingCert({ ...editingCert, documents: updatedDocs });
  };

  const handleRemoveDocumentItem = (index: number) => {
    if (!editingCert || !editingCert.documents) return;
    const updatedDocs = editingCert.documents.filter((_, i) => i !== index);
    setEditingCert({ ...editingCert, documents: updatedDocs });
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DDDFD8] pb-4">
        <div>
          <h2 className="text-xl font-bold font-heading text-[#202522]">
            Certifications & Results Manager
          </h2>
          <p className="text-xs font-mono text-[#777D78] mt-0.5">
            Manage your accredited credentials, upload certificate PDFs & result transcripts, and toggle visibility.
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
          Add Certification
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

      {/* Certifications Table/Cards */}
      <div className="space-y-4">
        {certList.map((cert) => (
          <div
            key={cert.id}
            className={`border p-5 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 ${
              cert.hidden
                ? 'bg-[#F0F2EB]/50 border-dashed border-[#DDDFD8] opacity-75'
                : 'bg-[#F7F7F2] border-[#DDDFD8] hover:border-[#285943]/40'
            }`}
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-heading font-bold text-base text-[#202522]">
                  {cert.title}
                </span>
                {cert.hidden ? (
                  <Badge variant="outline" size="sm" className="text-red-700 border-red-200 bg-red-50">
                    Hidden from Public
                  </Badge>
                ) : (
                  <Badge variant="accent" size="sm">
                    Visible
                  </Badge>
                )}
                {cert.score && (
                  <Badge variant="default" size="sm">
                    Score: {cert.score}
                  </Badge>
                )}
              </div>

              <div className="text-xs font-mono text-[#285943]">
                {cert.issuer} {cert.rollNo && `// Roll: ${cert.rollNo}`} {cert.date && `(${cert.date})`}
              </div>

              {cert.notes && (
                <p className="text-xs text-[#777D78] max-w-2xl">
                  {cert.notes}
                </p>
              )}

              <div className="flex items-center gap-3 pt-1 text-[11px] font-mono text-[#777D78]">
                <span>
                  Attached Documents: {cert.documents?.length || (cert.certificatePdf ? 1 : 0)} file(s)
                </span>
                {cert.certificatePdf && (
                  <button
                    onClick={() => setPreviewCert(cert)}
                    className="text-[#285943] hover:underline flex items-center gap-1 font-semibold"
                  >
                    <Eye size={12} />
                    <span>Test In-Website View</span>
                  </button>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[#DDDFD8]">
              <button
                type="button"
                onClick={() => handleToggleVisibility(cert.id)}
                className="px-2.5 py-1.5 text-xs font-mono border border-[#DDDFD8] bg-[#E8EEE8] hover:border-[#285943] text-[#202522] rounded-xs flex items-center gap-1"
                title={cert.hidden ? 'Show on Public Site' : 'Hide from Public Site'}
              >
                {cert.hidden ? <Eye size={13} /> : <EyeOff size={13} />}
                <span>{cert.hidden ? 'Show' : 'Hide'}</span>
              </button>

              <button
                type="button"
                onClick={() => handleOpenEdit(cert)}
                className="px-3 py-1.5 text-xs font-mono bg-[#E8EEE8] border border-[#DDDFD8] hover:border-[#285943] text-[#202522] rounded-xs flex items-center gap-1.5"
              >
                <Edit2 size={13} />
                <span>Edit</span>
              </button>

              <button
                type="button"
                onClick={() => setDeleteTarget(cert)}
                className="p-1.5 text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 rounded-xs"
                title="Delete Certification"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add Modal */}
      {editingCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div
            className="fixed inset-0 bg-[#202522]/60 backdrop-blur-xs"
            onClick={() => setEditingCert(null)}
          />

          <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-[#F7F7F2] border border-[#DDDFD8] shadow-2xl p-6 sm:p-8 z-10 my-auto text-[#202522]">
            <div className="flex items-center justify-between border-b border-[#DDDFD8] pb-4 mb-6">
              <div>
                <span className="font-mono text-xs text-[#285943] font-semibold">
                  {isNewCert ? 'ADD NEW CERTIFICATION' : 'EDIT CERTIFICATION'}
                </span>
                <h3 className="font-heading font-bold text-xl text-[#202522]">
                  {editingCert.title || 'Untitled Certification'}
                </h3>
              </div>
              <button
                onClick={() => setEditingCert(null)}
                className="p-1.5 text-[#777D78] hover:text-[#202522] hover:bg-[#E8EEE8] rounded-xs"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveCertForm} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#202522] mb-1">
                    Certification Title *
                  </label>
                  <input
                    type="text"
                    value={editingCert.title}
                    onChange={(e) => setEditingCert({ ...editingCert, title: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-[#F7F7F2] border border-[#DDDFD8] text-sm focus:border-[#285943] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#202522] mb-1">
                    Issuing Organization / Program *
                  </label>
                  <input
                    type="text"
                    value={editingCert.issuer}
                    onChange={(e) => setEditingCert({ ...editingCert, issuer: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-[#F7F7F2] border border-[#DDDFD8] text-sm focus:border-[#285943] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#202522] mb-1">
                    Score / Grade (e.g. 75% Elite, 60%, Completed)
                  </label>
                  <input
                    type="text"
                    value={editingCert.score || ''}
                    onChange={(e) => setEditingCert({ ...editingCert, score: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F7F2] border border-[#DDDFD8] text-sm focus:border-[#285943] focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#202522] mb-1">
                    Session / Date (e.g. Jul – Oct 2026)
                  </label>
                  <input
                    type="text"
                    value={editingCert.date || ''}
                    onChange={(e) => setEditingCert({ ...editingCert, date: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F7F2] border border-[#DDDFD8] text-sm focus:border-[#285943] focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#202522] mb-1">
                    Roll Number / Credential ID
                  </label>
                  <input
                    type="text"
                    value={editingCert.rollNo || ''}
                    onChange={(e) => setEditingCert({ ...editingCert, rollNo: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F7F2] border border-[#DDDFD8] text-sm focus:border-[#285943] focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#202522] mb-1">
                    Public Visibility
                  </label>
                  <div className="pt-2 flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="cert-hidden-toggle"
                      checked={!editingCert.hidden}
                      onChange={(e) => setEditingCert({ ...editingCert, hidden: !e.target.checked })}
                      className="w-4 h-4 text-[#285943] focus:ring-[#285943] rounded"
                    />
                    <label htmlFor="cert-hidden-toggle" className="text-xs font-mono text-[#202522]">
                      Display on Public Portfolio Website
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#202522] mb-1">
                  Description / Topic Notes
                </label>
                <textarea
                  rows={2}
                  value={editingCert.notes || ''}
                  onChange={(e) => setEditingCert({ ...editingCert, notes: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F7F7F2] border border-[#DDDFD8] text-sm focus:border-[#285943] focus:outline-none"
                />
              </div>

              {/* Multi-Document Attachments */}
              <div className="border-t border-[#DDDFD8] pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#285943] font-semibold">
                    <FileText size={15} />
                    <span>Attached Certificate & Result Documents</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddDocumentItem}
                    className="text-xs font-mono text-[#285943] hover:underline flex items-center gap-1"
                  >
                    <Plus size={12} />
                    <span>Add Document Tab</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {editingCert.documents?.map((doc, idx) => (
                    <div key={idx} className="p-4 bg-[#E8EEE8]/40 border border-[#DDDFD8] space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-[#285943]">
                          DOCUMENT #{idx + 1}
                        </span>
                        {editingCert.documents && editingCert.documents.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveDocumentItem(idx)}
                            className="text-red-600 hover:text-red-700 text-xs font-mono"
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase text-[#202522] mb-1">
                          Document Label (e.g. Certificate of Completion, Result & Grade Sheet)
                        </label>
                        <input
                          type="text"
                          value={doc.label}
                          onChange={(e) => handleUpdateDocumentItem(idx, 'label', e.target.value)}
                          className="w-full px-3 py-1.5 bg-[#F7F7F2] border border-[#DDDFD8] text-xs font-mono focus:border-[#285943] focus:outline-none"
                          required
                        />
                      </div>

                      <FileUploadInput
                        label="PDF Document File"
                        value={doc.pdfPath}
                        accept=".pdf"
                        onChange={(url) => handleUpdateDocumentItem(idx, 'pdfPath', url)}
                        helperText="Upload PDF certificate/result or provide asset path."
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="border-t border-[#DDDFD8] pt-4 flex items-center justify-end gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setEditingCert(null)}
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
                  {isSaving ? 'Saving...' : 'Save Certification'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="Delete Certification Entry"
        message={`Are you sure you want to remove "${deleteTarget?.title}"?`}
        confirmLabel="Confirm Delete"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />

      {/* Test Preview Modal */}
      <CertificateViewerModal
        certificate={previewCert}
        isOpen={Boolean(previewCert)}
        onClose={() => setPreviewCert(null)}
      />
    </div>
  );
};
