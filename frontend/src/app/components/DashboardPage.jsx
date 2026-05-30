import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Plus, FileText, Sparkles, Paperclip, TrendingUp, ArrowRight, } from "lucide-react";
import api from "./api";
import { NoteCard } from "./NoteCard";
import { TagBadge } from "./TagBadge";
import { EmptyState } from "./EmptyState";
import { toast } from "sonner";
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
function StatCard({ label, value, sub, Icon, iconBg, iconColor, }) {
    return (<div className="bg-white border border-border rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-muted-foreground">{label}</span>
        <div className={`w-8 h-8 rounded-xl ${iconBg} flex items-center justify-center`}>
          <Icon className={`w-4 h-4 ${iconColor}`}/>
        </div>
      </div>
      <div className="flex items-end gap-2">
        <span className="text-3xl font-semibold text-[#0F172A]">{value}</span>
      </div>
      {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
    </div>);
}
export function DashboardPage() {
    const navigate = useNavigate();
    const [activeTag, setActiveTag] = useState(null);
    const [notes, setNotes] = useState([]);
    const [tags, setTags] = useState([]);
    const [stats, setStats] = useState({ totalNotes: 0, aiProcessed: 0, uploadedDocs: 0 });
    const [loading, setLoading] = useState(true);
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : { name: "Learner" };
    const firstName = user.name ? user.name.split(" ")[0] : "Learner";
    useEffect(() => {
        let active = true;
        const fetchData = async () => {
            setLoading(true);
            try {
                const notesUrl = activeTag ? `/notes?limit=6&tag=${encodeURIComponent(activeTag)}` : `/notes?limit=6`;
                const [notesRes, tagsRes, statsRes] = await Promise.all([
                    api.get(notesUrl),
                    api.get("/notes/tags"),
                    api.get("/notes/stats"),
                ]);
                if (active) {
                    setNotes(notesRes.data.notes.map(mapNote));
                    setTags(tagsRes.data);
                    setStats(statsRes.data);
                }
            }
            catch (err) {
                toast.error("Failed to load dashboard data");
            }
            finally {
                if (active)
                    setLoading(false);
            }
        };
        fetchData();
        return () => {
            active = false;
        };
    }, [activeTag]);
    const recentNotes = notes.slice(0, 6);
    if (loading && notes.length === 0) {
        return (<div className="p-8 max-w-6xl mx-auto flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-[#4F6EF5]/30 border-t-[#4F6EF5] rounded-full animate-spin"/>
          <p className="text-sm text-muted-foreground">Loading your workspace...</p>
        </div>
      </div>);
    }
    return (<div className="p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[#0F172A] mb-1">Good morning, {firstName} 👋</h1>
          <p className="text-sm text-muted-foreground">
            You have {stats.totalNotes - stats.aiProcessed} notes waiting for AI processing.
          </p>
        </div>
        <button onClick={() => navigate("/dashboard/notes/new")} className="flex items-center gap-2 bg-[#0F172A] text-white px-4 py-2.5 rounded-xl hover:bg-[#1E293B] transition-colors text-sm font-medium">
          <Plus className="w-4 h-4"/>
          <span className="hidden sm:inline">New Note</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard label="Total Notes" value={stats.totalNotes} sub="All time" Icon={FileText} iconBg="bg-blue-50" iconColor="text-[#4F6EF5]"/>
        <StatCard label="AI Processed" value={stats.aiProcessed} sub={stats.totalNotes > 0 ? `${Math.round((stats.aiProcessed / stats.totalNotes) * 100)}% of your notes` : "0% of your notes"} Icon={Sparkles} iconBg="bg-purple-50" iconColor="text-purple-500"/>
        <StatCard label="Uploaded Docs" value={stats.uploadedDocs} sub="PDFs & DOCX files" Icon={Paperclip} iconBg="bg-green-50" iconColor="text-green-500"/>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notes section */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[#0F172A]">Recent Notes</h2>
            <button onClick={() => navigate("/dashboard/search")} className="flex items-center gap-1 text-sm text-[#4F6EF5] hover:text-[#3D5CE0] transition-colors">
              View all
              <ArrowRight className="w-3.5 h-3.5"/>
            </button>
          </div>

          {/* Tag filter bar */}
          {activeTag && (<div className="flex items-center gap-2 mb-4 p-3 bg-blue-50 border border-blue-100 rounded-xl">
              <span className="text-xs text-[#4F6EF5]">Filtered by:</span>
              <TagBadge tag={activeTag} active/>
              <button onClick={() => setActiveTag(null)} className="ml-auto text-xs text-[#4F6EF5] hover:underline">
                Clear filter
              </button>
            </div>)}

          {recentNotes.length === 0 ? (<EmptyState variant="no-notes"/>) : (<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recentNotes.map((note) => (<NoteCard key={note.id} note={note}/>))}
            </div>)}
        </div>

        {/* Sidebar panel */}
        <div className="space-y-5">
          {/* Tags */}
          <div className="bg-white border border-border rounded-2xl p-5">
            <h3 className="text-[#0F172A] mb-4 flex items-center gap-2">
              Recent Tags
            </h3>
            <div className="space-y-2">
              {tags.map((tag) => (<button key={tag.name} onClick={() => setActiveTag(activeTag === tag.name ? null : tag.name)} className="w-full flex items-center justify-between group hover:bg-slate-50 rounded-lg px-2 py-1.5 transition-colors">
                  <TagBadge tag={tag.name} active={activeTag === tag.name}/>
                  <span className="text-xs text-muted-foreground">{tag.count}</span>
                </button>))}
              {tags.length === 0 && (<p className="text-xs text-muted-foreground py-2 text-center">No tags generated yet</p>)}
            </div>
          </div>

          {/* Quick actions */}
          <div className="bg-white border border-border rounded-2xl p-5">
            <h3 className="text-[#0F172A] mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button onClick={() => navigate("/dashboard/notes/new")} className="w-full flex items-center gap-3 p-3 rounded-xl bg-[#F8FAFC] hover:bg-[#F1F5F9] transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-white border border-border flex items-center justify-center">
                  <Plus className="w-4 h-4 text-[#4F6EF5]"/>
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-[#0F172A]">Create Note</p>
                  <p className="text-xs text-muted-foreground">Write or upload content</p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#CBD5E1] ml-auto opacity-0 group-hover:opacity-100 transition-opacity"/>
              </button>

              <button onClick={() => navigate("/dashboard/search")} className="w-full flex items-center gap-3 p-3 rounded-xl bg-[#F8FAFC] hover:bg-[#F1F5F9] transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-white border border-border flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-green-500"/>
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-[#0F172A]">Search Notes</p>
                  <p className="text-xs text-muted-foreground">Find anything fast</p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#CBD5E1] ml-auto opacity-0 group-hover:opacity-100 transition-opacity"/>
              </button>
            </div>
          </div>

          {/* Unprocessed notes prompt */}
          {stats.totalNotes - stats.aiProcessed > 0 && (<div className="bg-[#EEF2FF] border border-blue-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-[#4F6EF5]"/>
                <p className="text-sm font-medium text-[#0F172A]">AI Ready</p>
              </div>
              <p className="text-xs text-[#64748B] mb-3">
                You have {stats.totalNotes - stats.aiProcessed} notes waiting for AI processing.
              </p>
              <button onClick={() => navigate("/dashboard/search?aiProcessed=false")} className="text-xs text-[#4F6EF5] font-medium hover:underline flex items-center gap-1">
                View pending notes <ArrowRight className="w-3 h-3"/>
              </button>
            </div>)}
        </div>
      </div>
    </div>);
}
