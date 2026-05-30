import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { ChevronLeft, Copy, Edit3, Trash2, Sparkles, FileText, Tag, Clock, Paperclip, CheckCircle2, AlertCircle, } from "lucide-react";
import { toast } from "sonner";
import api from "./api";
import { TagBadge } from "./TagBadge";
import { AIProcessingModal } from "./AIProcessingModal";
import { EmptyState } from "./EmptyState";
const mapNote = (n) => ({
    id: n._id,
    title: n.title,
    content: n.originalContent || n.extractedText || "",
    summary: n.summary,
    revisionNotes: n.revisionPoints,
    tags: n.tags || [],
    createdAt: n.createdAt,
    updatedAt: n.updatedAt,
    aiProcessed: n.aiProcessed,
    uploadedFile: n.fileUrl ? n.fileUrl.split("/").pop() : undefined,
    wordCount: n.wordCount || 0,
});
export function NoteDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState("");
    const [editContent, setEditContent] = useState("");
    const [aiProcessing, setAiProcessing] = useState(false);
    const [aiPromise, setAiPromise] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [copied, setCopied] = useState(null);
    useEffect(() => {
        let active = true;
        const fetchNote = async () => {
            setLoading(true);
            try {
                const res = await api.get(`/notes/${id}`);
                if (active) {
                    const mapped = mapNote(res.data);
                    setNote(mapped);
                    setEditTitle(mapped.title);
                    setEditContent(mapped.content);
                }
            }
            catch (err) {
                toast.error("Failed to load note details");
                navigate("/dashboard");
            }
            finally {
                if (active)
                    setLoading(false);
            }
        };
        fetchNote();
        return () => {
            active = false;
        };
    }, [id, navigate]);
    if (loading && !note) {
        return (<div className="p-8 max-w-6xl mx-auto flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-[#4F6EF5]/30 border-t-[#4F6EF5] rounded-full animate-spin"/>
          <p className="text-sm text-muted-foreground">Loading note details...</p>
        </div>
      </div>);
    }
    if (!note) {
        return (<div className="p-6 lg:p-8">
        <button onClick={() => navigate("/dashboard")} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-[#0F172A] mb-6">
          <ChevronLeft className="w-4 h-4"/>
          Back to Dashboard
        </button>
        <EmptyState variant="no-notes"/>
      </div>);
    }
    const isAIReady = note.aiProcessed;
    const handleCopy = (text, label) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(label);
            toast.success(`${label} copied to clipboard`);
            setTimeout(() => setCopied(null), 2000);
        });
    };
    const handleAIProcess = () => {
        setAiProcessing(true);
        const promise = api.post(`/notes/${id}/process`);
        setAiPromise(promise);
    };
    const handleAIComplete = async () => {
        if (!aiPromise) return;
        try {
            await aiPromise;
            const res = await api.get(`/notes/${id}`);
            setNote(mapNote(res.data));
            toast.success("AI processing complete!");
        }
        catch (error) {
            toast.error(error.message || "Failed to process note with AI");
        }
        finally {
            setAiProcessing(false);
            setAiPromise(null);
        }
    };
    const handleDelete = async () => {
        try {
            await api.delete(`/notes/${id}`);
            toast.success("Note deleted successfully");
            navigate("/dashboard");
        }
        catch (err) {
            toast.error(err.message || "Failed to delete note");
        }
    };
    const handleSaveChanges = async () => {
        if (!editTitle.trim()) {
            toast.error("Note title is required");
            return;
        }
        if (!editContent.trim()) {
            toast.error("Note content is required");
            return;
        }
        try {
            const res = await api.put(`/notes/${id}`, {
                title: editTitle,
                originalContent: editContent,
            });
            setNote(mapNote(res.data));
            setIsEditing(false);
            toast.success("Note updated successfully");
        }
        catch (err) {
            toast.error(err.message || "Failed to update note");
        }
    };
    const formattedDate = new Date(note.updatedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
    return (<>
      <AIProcessingModal isOpen={aiProcessing} onComplete={handleAIComplete}/>

      {deleteConfirm && (<div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in-0 duration-300">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl animate-in fade-in-0 zoom-in-95 duration-300">
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center mb-4">
              <Trash2 className="w-5 h-5 text-red-500"/>
            </div>
            <h3 className="text-[#0F172A] mb-2">Delete note?</h3>
            <p className="text-sm text-muted-foreground mb-6">
              This will permanently delete "{note.title}" and all AI-generated content. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(false)} className="flex-1 px-4 py-2.5 border border-border rounded-xl text-sm text-[#0F172A] hover:bg-slate-50 transition-colors">
                Cancel
              </button>
              <button onClick={handleDelete} className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-xl text-sm hover:bg-red-600 transition-colors font-medium">
                Delete
              </button>
            </div>
          </div>
        </div>)}

      <div className="p-6 lg:p-8 max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate("/dashboard")} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-[#0F172A] transition-colors">
            <ChevronLeft className="w-4 h-4"/>
            Dashboard
          </button>
          <span className="text-border">/</span>
          <span className="text-sm text-[#0F172A] truncate max-w-xs">{note.title}</span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-6">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              {isEditing ? (<input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="text-2xl font-bold text-[#0F172A] bg-[#F8FAFC] border border-border rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#4F6EF5]/20 focus:border-[#4F6EF5] w-full max-w-md"/>) : (<h1 className="text-[#0F172A] break-words">{note.title}</h1>)}
              {isAIReady && (<span className="flex items-center gap-1 text-xs text-[#4F6EF5] bg-blue-50 border border-blue-100 rounded-full px-2 py-0.5">
                  <Sparkles className="w-3 h-3"/>
                  AI Processed
                </span>)}
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3"/>
                {formattedDate}
              </span>
              <span className="flex items-center gap-1">
                <FileText className="w-3 h-3"/>
                {note.wordCount} words
              </span>
              {note.uploadedFile && (<span className="flex items-center gap-1">
                  <Paperclip className="w-3 h-3"/>
                  {note.uploadedFile}
                </span>)}
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {isEditing ? (<>
                <button onClick={handleSaveChanges} className="flex items-center gap-1.5 bg-green-600 text-white px-4 py-2.5 rounded-xl hover:bg-green-700 transition-colors text-sm font-medium">
                  Save
                </button>
                <button onClick={() => {
                setEditTitle(note.title);
                setEditContent(note.content);
                setIsEditing(false);
            }} className="bg-white border border-border text-[#64748B] px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-colors text-sm">
                  Cancel
                </button>
              </>) : (<>
                {!isAIReady && (<button onClick={handleAIProcess} className="flex items-center gap-2 bg-[#4F6EF5] text-white px-4 py-2.5 rounded-xl hover:bg-[#3D5CE0] transition-colors text-sm font-medium">
                    <Sparkles className="w-4 h-4"/>
                    Process with AI
                  </button>)}
                <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 bg-white border border-border text-[#0F172A] px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors text-sm">
                  <Edit3 className="w-4 h-4"/>
                  <span className="hidden sm:inline">Edit</span>
                </button>
                <button onClick={() => setDeleteConfirm(true)} className="flex items-center gap-2 bg-white border border-border text-red-500 px-3 py-2.5 rounded-xl hover:bg-red-50 transition-colors text-sm">
                  <Trash2 className="w-4 h-4"/>
                </button>
              </>)}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Original */}
          <div className="space-y-5">
            <div className="bg-white border border-border rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#64748B]"/>
                  <span className="text-sm font-medium text-[#0F172A]">Original Notes</span>
                </div>
                {!isEditing && (<button onClick={() => handleCopy(note.content, "Note content")} className="flex items-center gap-1.5 text-xs text-[#64748B] hover:text-[#0F172A] transition-colors px-2.5 py-1.5 rounded-lg hover:bg-slate-50">
                    {copied === "Note content" ? <CheckCircle2 className="w-3.5 h-3.5 text-green-500"/> : <Copy className="w-3.5 h-3.5"/>}
                    {copied === "Note content" ? "Copied!" : "Copy"}
                  </button>)}
              </div>
              {isEditing ? (<textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} rows={14} className="w-full px-4 py-3 bg-[#F8FAFC] border border-border rounded-xl text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F6EF5]/20 focus:border-[#4F6EF5] resize-none leading-relaxed"/>) : (<div className="text-sm text-[#334155] leading-relaxed whitespace-pre-wrap bg-[#F8FAFC] rounded-xl p-4 max-h-80 overflow-y-auto">
                  {note.content}
                </div>)}
            </div>

            {/* Tags */}
            <div className="bg-white border border-border rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Tag className="w-4 h-4 text-[#64748B]"/>
                <span className="text-sm font-medium text-[#0F172A]">Tags</span>
                {!isAIReady && (<span className="text-xs text-[#94A3B8] ml-auto">Generated after AI processing</span>)}
              </div>
              {note.tags.length > 0 ? (<div className="flex flex-wrap gap-2">
                  {note.tags.map((tag) => <TagBadge key={tag} tag={tag} size="md"/>)}
                </div>) : (<EmptyState variant="no-tags"/>)}
            </div>
          </div>

          {/* Right: AI output */}
          <div className="space-y-5">
            {/* Summary */}
            <div className={`rounded-2xl p-5 border ${isAIReady ? "bg-[#EEF2FF] border-blue-100" : "bg-white border-border"}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className={`w-4 h-4 ${isAIReady ? "text-[#4F6EF5]" : "text-[#94A3B8]"}`}/>
                  <span className="text-sm font-medium text-[#0F172A]">AI Summary</span>
                </div>
                {isAIReady && note.summary && (<button onClick={() => handleCopy(note.summary, "Summary")} className="flex items-center gap-1.5 text-xs text-[#4F6EF5] hover:text-[#3D5CE0] transition-colors px-2.5 py-1.5 rounded-lg hover:bg-blue-100">
                    {copied === "Summary" ? <CheckCircle2 className="w-3.5 h-3.5 text-green-500"/> : <Copy className="w-3.5 h-3.5"/>}
                    {copied === "Summary" ? "Copied!" : "Copy"}
                  </button>)}
              </div>

              {isAIReady && note.summary ? (<p className="text-sm text-[#334155] leading-relaxed">{note.summary}</p>) : !isAIReady ? (<div className="text-center py-6">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-2">
                    <Sparkles className="w-4 h-4 text-[#94A3B8]"/>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Process with AI to generate a summary
                  </p>
                </div>) : (<EmptyState variant="ai-failed"/>)}
            </div>

            {/* Revision notes */}
            <div className="bg-white border border-border rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#64748B]"/>
                  <span className="text-sm font-medium text-[#0F172A]">Revision Notes</span>
                </div>
                {isAIReady && note.revisionNotes && (<button onClick={() => handleCopy(note.revisionNotes.map((r, i) => `${i + 1}. ${r}`).join("\n"), "Revision notes")} className="flex items-center gap-1.5 text-xs text-[#64748B] hover:text-[#0F172A] transition-colors px-2.5 py-1.5 rounded-lg hover:bg-slate-50">
                    {copied === "Revision notes" ? <CheckCircle2 className="w-3.5 h-3.5 text-green-500"/> : <Copy className="w-3.5 h-3.5"/>}
                    {copied === "Revision notes" ? "Copied!" : "Copy all"}
                  </button>)}
              </div>

              {isAIReady && note.revisionNotes && note.revisionNotes.length > 0 ? (<div className="space-y-2.5">
                  {note.revisionNotes.map((point, index) => (<div key={index} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-[#EEF2FF] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-[9px] font-bold text-[#4F6EF5]">{index + 1}</span>
                      </div>
                      <p className="text-sm text-[#334155] leading-relaxed">{point}</p>
                    </div>))}
                </div>) : !isAIReady ? (<div className="text-center py-6">
                  <p className="text-sm text-muted-foreground">Revision notes will appear after AI processing.</p>
                  <button onClick={handleAIProcess} className="mt-3 text-xs text-[#4F6EF5] font-medium hover:underline flex items-center gap-1 mx-auto">
                    <Sparkles className="w-3 h-3"/>
                    Process with AI
                  </button>
                </div>) : (<div className="flex items-center gap-2 text-sm text-red-500 py-4">
                  <AlertCircle className="w-4 h-4"/>
                  Failed to generate revision notes.
                </div>)}
            </div>
          </div>
        </div>
      </div>
    </>);
}
