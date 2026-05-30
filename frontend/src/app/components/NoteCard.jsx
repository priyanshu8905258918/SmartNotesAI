import { FileText, Sparkles, Clock, Paperclip } from "lucide-react";
import { useNavigate } from "react-router";
import { TagBadge } from "./TagBadge";
function timeAgo(dateStr) {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diff < 60)
        return "just now";
    if (diff < 3600)
        return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400)
        return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
}
export function NoteCard({ note }) {
    const navigate = useNavigate();
    const preview = note.content.slice(0, 120).replace(/\n+/g, " ").trim();
    return (<div onClick={() => navigate(`/dashboard/notes/${note.id}`)} className="bg-card border border-border rounded-xl p-5 cursor-pointer hover:shadow-md hover:border-[rgba(79,110,245,0.2)] transition-all duration-200 group">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-[#F1F5F9] flex items-center justify-center flex-shrink-0">
            <FileText className="w-4 h-4 text-[#64748B]"/>
          </div>
          <h3 className="truncate text-[#0F172A] group-hover:text-[#4F6EF5] transition-colors">
            {note.title}
          </h3>
        </div>
        {note.aiProcessed && (<span className="flex items-center gap-1 text-xs text-[#4F6EF5] bg-blue-50 border border-blue-100 rounded-full px-2 py-0.5 flex-shrink-0">
            <Sparkles className="w-3 h-3"/>
            AI
          </span>)}
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
        {preview}…
      </p>

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {note.tags.slice(0, 2).map((tag) => (<TagBadge key={tag} tag={tag}/>))}
          {note.tags.length > 2 && (<span className="text-xs text-muted-foreground px-2 py-0.5">
              +{note.tags.length - 2}
            </span>)}
        </div>

        <div className="flex items-center gap-3 text-xs text-muted-foreground flex-shrink-0">
          {note.uploadedFile && (<span className="flex items-center gap-1">
              <Paperclip className="w-3 h-3"/>
              PDF
            </span>)}
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3"/>
            {timeAgo(note.updatedAt)}
          </span>
        </div>
      </div>
    </div>);
}
