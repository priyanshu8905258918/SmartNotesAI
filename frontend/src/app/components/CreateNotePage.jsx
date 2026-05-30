import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router";
import { Upload, FileText, X, Sparkles, Save, AlertCircle, CheckCircle2, File, ChevronLeft, } from "lucide-react";
import { toast } from "sonner";
import { AIProcessingModal } from "./AIProcessingModal";
import api from "./api";
export function CreateNotePage() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [uploadState, setUploadState] = useState("idle");
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [uploadError, setUploadError] = useState("");
    const [isDragging, setIsDragging] = useState(false);
    const [aiProcessing, setAiProcessing] = useState(false);
    const [errors, setErrors] = useState({});
    const fileInputRef = useRef(null);
    const [extractedText, setExtractedText] = useState("");
    const [fileUrl, setFileUrl] = useState("");
    const [fileType, setFileType] = useState("");
    const [createdNoteId, setCreatedNoteId] = useState(null);
    const [saving, setSaving] = useState(false);
    const ALLOWED_TYPES = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    const MAX_SIZE_MB = 10;
    const handleFile = async (file) => {
        setUploadError("");
        if (!ALLOWED_TYPES.includes(file.type)) {
            setUploadError("Only PDF and DOCX files are supported.");
            setUploadState("error");
            return;
        }
        if (file.size > MAX_SIZE_MB * 1024 * 1024) {
            setUploadError(`File size must be under ${MAX_SIZE_MB}MB.`);
            setUploadState("error");
            return;
        }
        setUploadedFile(file);
        setUploadState("uploading");
        setUploadProgress(0);
        try {
            const formData = new FormData();
            formData.append("file", file);
            const response = await api.post("/notes/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.total) {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setUploadProgress(percentCompleted);
                    }
                },
            });
            setUploadState("done");
            toast.success(`${file.name} uploaded and parsed successfully`);
            setTitle(response.data.title || file.name.replace(/\.[^/.]+$/, ""));
            setContent(response.data.extractedText || "");
            setExtractedText(response.data.extractedText || "");
            setFileUrl(response.data.fileUrl || "");
            setFileType(response.data.fileType || "");
        }
        catch (error) {
            setUploadError(error.message || "Failed to upload and parse file.");
            setUploadState("error");
            toast.error("File parsing failed.");
        }
    };
    const onDrop = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file)
            handleFile(file);
    }, []);
    const onDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };
    const onDragLeave = () => setIsDragging(false);
    const removeFile = () => {
        setUploadedFile(null);
        setUploadState("idle");
        setUploadProgress(0);
        setUploadError("");
        setExtractedText("");
        setFileUrl("");
        setFileType("");
        if (fileInputRef.current)
            fileInputRef.current.value = "";
    };
    const validate = () => {
        const errs = {};
        if (!title.trim())
            errs.title = "Note title is required";
        if (!content.trim())
            errs.content = "Note content is required";
        return errs;
    };
    const handleSave = async () => {
        const errs = validate();
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }
        setSaving(true);
        try {
            await api.post("/notes", {
                title,
                originalContent: content,
                extractedText,
                fileUrl,
                fileType,
            });
            toast.success("Note saved successfully");
            navigate("/dashboard");
        }
        catch (error) {
            toast.error(error.message || "Failed to save note");
        }
        finally {
            setSaving(false);
        }
    };
    const handleAIProcess = async () => {
        const errs = validate();
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }
        setAiProcessing(true);
        try {
            const saveRes = await api.post("/notes", {
                title,
                originalContent: content,
                extractedText,
                fileUrl,
                fileType,
            });
            const noteId = saveRes.data._id;
            setCreatedNoteId(noteId);
            await api.post(`/notes/${noteId}/process`);
        }
        catch (error) {
            toast.error(error.message || "AI processing failed");
            setAiProcessing(false);
        }
    };
    const handleAIComplete = () => {
        setAiProcessing(false);
        toast.success("AI processing complete!");
        if (createdNoteId) {
            navigate(`/dashboard/notes/${createdNoteId}`);
        }
        else {
            navigate("/dashboard");
        }
    };
    const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
    return (<>
      <AIProcessingModal isOpen={aiProcessing} onComplete={handleAIComplete}/>

      <div className="p-6 lg:p-8 max-w-4xl mx-auto">
        {/* Back + header */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate("/dashboard")} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-[#0F172A] transition-colors">
            <ChevronLeft className="w-4 h-4"/>
            Dashboard
          </button>
          <span className="text-border">/</span>
          <span className="text-sm text-[#0F172A]">Create Note</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main editor */}
          <div className="lg:col-span-2 space-y-5">
            {/* Title */}
            <div className="bg-white border border-border rounded-2xl p-5">
              <label className="block text-sm font-medium text-[#0F172A] mb-2">Note Title</label>
              <input type="text" value={title} onChange={(e) => { setTitle(e.target.value); if (errors.title)
        setErrors(p => { const n = { ...p }; delete n.title; return n; }); }} placeholder="e.g. Introduction to Thermodynamics" className={`w-full h-11 px-4 bg-[#F8FAFC] border rounded-xl text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 transition-all ${errors.title ? "border-red-300 focus:ring-red-100" : "border-border focus:ring-[#4F6EF5]/20 focus:border-[#4F6EF5]"}`}/>
              {errors.title && (<p className="flex items-center gap-1.5 text-xs text-red-500 mt-1.5">
                  <AlertCircle className="w-3.5 h-3.5"/>{errors.title}
                </p>)}
            </div>

            {/* Content */}
            <div className="bg-white border border-border rounded-2xl p-5">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-[#0F172A]">Note Content</label>
                <span className="text-xs text-muted-foreground">{wordCount} words</span>
              </div>
              <textarea value={content} onChange={(e) => { setContent(e.target.value); if (errors.content)
        setErrors(p => { const n = { ...p }; delete n.content; return n; }); }} placeholder="Start writing your notes here... You can type lecture notes, key concepts, formulas, or any study material you want AI to process." rows={16} className={`w-full px-4 py-3 bg-[#F8FAFC] border rounded-xl text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 transition-all resize-none leading-relaxed ${errors.content ? "border-red-300 focus:ring-red-100" : "border-border focus:ring-[#4F6EF5]/20 focus:border-[#4F6EF5]"}`}/>
              {errors.content && (<p className="flex items-center gap-1.5 text-xs text-red-500 mt-1.5">
                  <AlertCircle className="w-3.5 h-3.5"/>{errors.content}
                </p>)}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Upload */}
            <div className="bg-white border border-border rounded-2xl p-5">
              <h3 className="text-[#0F172A] mb-1">Upload Document</h3>
              <p className="text-xs text-muted-foreground mb-4">PDF or DOCX, max 10MB</p>

              {uploadState === "idle" && (<div onDrop={onDrop} onDragOver={onDragOver} onDragLeave={onDragLeave} onClick={() => fileInputRef.current?.click()} className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${isDragging
                ? "border-[#4F6EF5] bg-blue-50"
                : "border-border hover:border-[#94A3B8] hover:bg-slate-50"}`}>
                  <Upload className={`w-8 h-8 mx-auto mb-3 ${isDragging ? "text-[#4F6EF5]" : "text-[#94A3B8]"}`}/>
                  <p className="text-sm font-medium text-[#0F172A] mb-1">
                    {isDragging ? "Drop it here" : "Drag & drop"}
                  </p>
                  <p className="text-xs text-muted-foreground">or click to browse files</p>
                  <input ref={fileInputRef} type="file" accept=".pdf,.docx" className="hidden" onChange={(e) => { if (e.target.files?.[0])
            handleFile(e.target.files[0]); }}/>
                </div>)}

              {uploadState === "uploading" && (<div className="space-y-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <File className="w-4 h-4 text-[#4F6EF5]"/>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#0F172A] truncate">{uploadedFile?.name}</p>
                      <p className="text-xs text-muted-foreground">{uploadProgress}% uploaded</p>
                    </div>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#4F6EF5] rounded-full transition-all duration-200" style={{ width: `${uploadProgress}%` }}/>
                  </div>
                </div>)}

              {uploadState === "done" && (<div className="flex items-center gap-2.5 p-3 bg-green-50 border border-green-100 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0"/>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#0F172A] truncate">{uploadedFile?.name}</p>
                    <p className="text-xs text-green-600">Upload complete</p>
                  </div>
                  <button onClick={removeFile} className="p-1 rounded hover:bg-green-100 transition-colors">
                    <X className="w-3.5 h-3.5 text-green-600"/>
                  </button>
                </div>)}

              {uploadState === "error" && (<div className="space-y-3">
                  <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-100 rounded-xl">
                    <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5"/>
                    <p className="text-xs text-red-600">{uploadError}</p>
                  </div>
                  <button onClick={removeFile} className="w-full text-xs text-[#4F6EF5] hover:underline">
                    Try a different file
                  </button>
                </div>)}
            </div>

            {/* AI tip */}
            <div className="bg-[#EEF2FF] border border-blue-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-[#4F6EF5]"/>
                <p className="text-sm font-medium text-[#0F172A]">AI Processing</p>
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed">
                After saving, click "Process with AI" to generate a summary, revision notes, and tags automatically.
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-2.5">
              <button onClick={handleAIProcess} className="w-full flex items-center justify-center gap-2 bg-[#4F6EF5] text-white px-4 py-3 rounded-xl hover:bg-[#3D5CE0] transition-colors font-medium text-sm">
                <Sparkles className="w-4 h-4"/>
                Process with AI
              </button>
              <button onClick={handleSave} className="w-full flex items-center justify-center gap-2 bg-[#0F172A] text-white px-4 py-3 rounded-xl hover:bg-[#1E293B] transition-colors font-medium text-sm">
                <Save className="w-4 h-4"/>
                Save Note
              </button>
              <button onClick={() => navigate("/dashboard")} className="w-full px-4 py-2.5 rounded-xl border border-border text-sm text-[#64748B] hover:bg-slate-50 transition-colors">
                Cancel
              </button>
            </div>

            {/* File types */}
            <div className="bg-white border border-border rounded-2xl p-4">
              <p className="text-xs font-medium text-[#0F172A] mb-2">Supported formats</p>
              <div className="flex gap-2">
                <span className="flex items-center gap-1.5 text-xs text-[#64748B] bg-[#F8FAFC] border border-border rounded-lg px-2.5 py-1.5">
                  <FileText className="w-3 h-3"/>
                  PDF
                </span>
                <span className="flex items-center gap-1.5 text-xs text-[#64748B] bg-[#F8FAFC] border border-border rounded-lg px-2.5 py-1.5">
                  <FileText className="w-3 h-3"/>
                  DOCX
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>);
}
