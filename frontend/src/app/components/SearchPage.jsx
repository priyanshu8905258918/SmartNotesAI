import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { Search, SlidersHorizontal, X, ArrowUpDown } from "lucide-react";
import api from "./api";
import { NoteCard } from "./NoteCard";
import { TagBadge } from "./TagBadge";
import { EmptyState } from "./EmptyState";
import { toast } from "sonner";
const SORT_LABELS = {
    newest: "Newest first",
    oldest: "Oldest first",
    "title-asc": "Title A–Z",
    "title-desc": "Title Z–A",
};
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
export function SearchPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("q") ?? "");
    const [activeTags, setActiveTags] = useState(new Set());
    const [sort, setSort] = useState("newest");
    const [showSort, setShowSort] = useState(false);
    const [aiOnly, setAiOnly] = useState(false);
    const [notes, setNotes] = useState([]);
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const limit = 6;
    useEffect(() => {
        const q = searchParams.get("q");
        if (q)
            setQuery(q);
    }, [searchParams]);
    useEffect(() => {
        const fetchTags = async () => {
            try {
                const res = await api.get("/notes/tags");
                setTags(res.data);
            }
            catch (e) {
                console.error(e);
            }
        };
        fetchTags();
    }, []);
    useEffect(() => {
        let active = true;
        const fetchNotes = async () => {
            setLoading(true);
            try {
                const params = {
                    page,
                    limit,
                    sort,
                };
                if (query)
                    params.q = query;
                if (activeTags.size > 0) {
                    params.tag = Array.from(activeTags)[0];
                }
                if (aiOnly)
                    params.aiProcessed = "true";
                const res = await api.get("/notes", { params });
                if (active) {
                    setNotes(res.data.notes.map(mapNote));
                    setTotal(res.data.total);
                }
            }
            catch (err) {
                toast.error("Failed to load search results");
            }
            finally {
                if (active)
                    setLoading(false);
            }
        };
        const delayDebounceFn = setTimeout(fetchNotes, 300);
        return () => {
            active = false;
            clearTimeout(delayDebounceFn);
        };
    }, [query, activeTags, sort, aiOnly, page]);
    const toggleTag = (tag) => {
        setPage(1);
        setActiveTags((prev) => {
            const next = new Set(prev);
            if (next.has(tag))
                next.delete(tag);
            else
                next.add(tag);
            return next;
        });
    };
    const clearAll = () => {
        setQuery("");
        setActiveTags(new Set());
        setAiOnly(false);
        setPage(1);
        setSearchParams({});
    };
    const hasFilters = query || activeTags.size > 0 || aiOnly;
    return (<div className="p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-[#0F172A] mb-1">Search Notes</h1>
        <p className="text-sm text-muted-foreground">
          {total} {total === 1 ? "result" : "results"} found
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="space-y-5">
          <div className="bg-white border border-border rounded-2xl p-4">
            <label className="text-xs font-medium text-[#0F172A] mb-2 block">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]"/>
              <input type="text" placeholder="Search notes…" value={query} onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
        }} className="w-full h-9 pl-9 pr-3 bg-[#F8FAFC] border border-border rounded-xl text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#4F6EF5]/20 focus:border-[#4F6EF5] transition-all"/>
              {query && (<button onClick={() => {
                setQuery("");
                setPage(1);
            }} className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded text-[#94A3B8] hover:text-[#64748B]">
                  <X className="w-3.5 h-3.5"/>
                </button>)}
            </div>
          </div>

          <div className="bg-white border border-border rounded-2xl p-4">
            <label className="text-xs font-medium text-[#0F172A] mb-2 block">Sort by</label>
            <div className="relative">
              <button onClick={() => setShowSort(!showSort)} className="w-full h-9 px-3 bg-[#F8FAFC] border border-border rounded-xl text-sm text-[#0F172A] flex items-center justify-between hover:border-[#94A3B8] transition-all">
                <span>{SORT_LABELS[sort]}</span>
                <ArrowUpDown className="w-3.5 h-3.5 text-[#94A3B8]"/>
              </button>
              {showSort && (<>
                  <div className="fixed inset-0 z-10" onClick={() => setShowSort(false)}/>
                  <div className="absolute top-10 left-0 right-0 bg-white border border-border rounded-xl shadow-lg z-20 overflow-hidden">
                    {Object.keys(SORT_LABELS).map((option) => (<button key={option} onClick={() => {
                    setSort(option);
                    setPage(1);
                    setShowSort(false);
                }} className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${sort === option ? "bg-[#F1F5F9] text-[#4F6EF5] font-medium" : "text-[#0F172A] hover:bg-slate-50"}`}>
                        {SORT_LABELS[option]}
                      </button>))}
                  </div>
                </>)}
            </div>
          </div>

          <div className="bg-white border border-border rounded-2xl p-4">
            <label className="text-xs font-medium text-[#0F172A] mb-3 block">Filter by Tag</label>
            <div className="space-y-1.5">
              {tags.map((tag) => (<button key={tag.name} onClick={() => toggleTag(tag.name)} className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg transition-all text-sm ${activeTags.has(tag.name) ? "bg-blue-50" : "hover:bg-slate-50"}`}>
                  <TagBadge tag={tag.name} active={activeTags.has(tag.name)}/>
                  <span className="text-xs text-muted-foreground">{tag.count}</span>
                </button>))}
              {tags.length === 0 && (<p className="text-xs text-muted-foreground text-center py-2">No tags available</p>)}
            </div>
          </div>

          <div className="bg-white border border-border rounded-2xl p-4">
            <label className="text-xs font-medium text-[#0F172A] mb-3 block">Other Filters</label>
            <button onClick={() => {
            setAiOnly(!aiOnly);
            setPage(1);
        }} className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl border transition-all text-sm ${aiOnly ? "bg-blue-50 border-blue-200 text-[#4F6EF5]" : "border-border text-[#64748B] hover:bg-slate-50"}`}>
              <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${aiOnly ? "bg-[#4F6EF5] border-[#4F6EF5]" : "border-[#CBD5E1]"}`}>
                {aiOnly && <div className="w-2 h-2 bg-white rounded-sm"/>}
              </div>
              AI processed only
            </button>
          </div>

          {hasFilters && (<button onClick={clearAll} className="w-full flex items-center justify-center gap-2 text-sm text-[#64748B] hover:text-[#0F172A] border border-border rounded-xl py-2.5 hover:bg-slate-50 transition-all">
              <X className="w-3.5 h-3.5"/>
              Clear all filters
            </button>)}
        </div>

        <div className="lg:col-span-3">
          {(activeTags.size > 0 || aiOnly) && (<div className="flex flex-wrap items-center gap-2 mb-4 p-3 bg-[#F8FAFC] border border-border rounded-xl">
              <div className="flex items-center gap-1.5 mr-1">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#64748B]"/>
                <span className="text-xs text-[#64748B]">Active:</span>
              </div>
              {Array.from(activeTags).map((tag) => (<button key={tag} onClick={() => toggleTag(tag)} className="flex items-center gap-1.5 bg-white border border-blue-200 text-[#4F6EF5] text-xs px-2.5 py-1 rounded-full hover:bg-blue-50 transition-colors">
                  {tag}
                  <X className="w-3 h-3"/>
                </button>))}
              {aiOnly && (<button onClick={() => { setAiOnly(false); setPage(1); }} className="flex items-center gap-1.5 bg-white border border-blue-200 text-[#4F6EF5] text-xs px-2.5 py-1 rounded-full hover:bg-blue-50 transition-colors">
                  AI only
                  <X className="w-3 h-3"/>
                </button>)}
            </div>)}

          {loading ? (<div className="flex items-center justify-center py-20 min-h-[30vh]">
              <div className="flex flex-col items-center gap-3">
                <div className="w-6 h-6 border-2 border-[#4F6EF5]/30 border-t-[#4F6EF5] rounded-full animate-spin"/>
                <p className="text-xs text-muted-foreground">Searching notes...</p>
              </div>
            </div>) : notes.length === 0 ? (<EmptyState variant="no-results" searchQuery={query || undefined}/>) : (<div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {notes.map((note) => (<NoteCard key={note.id} note={note}/>))}
              </div>

              {total > limit && (<div className="flex items-center justify-between border-t border-border pt-4">
                  <button disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))} className="px-3 py-1.5 border border-border rounded-xl text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors">
                    Previous
                  </button>
                  <span className="text-xs text-muted-foreground">
                    Page {page} of {Math.ceil(total / limit)}
                  </span>
                  <button disabled={page >= Math.ceil(total / limit)} onClick={() => setPage((p) => p + 1)} className="px-3 py-1.5 border border-border rounded-xl text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors">
                    Next
                  </button>
                </div>)}
            </div>)}
        </div>
      </div>
    </div>);
}
