import { FileText, Search, AlertCircle, Sparkles } from "lucide-react";
import { useNavigate } from "react-router";
const CONFIG = {
    "no-notes": {
        Icon: FileText,
        title: "No notes yet",
        description: "Start building your knowledge base. Create your first note to get started.",
        action: { label: "Create your first note", primary: true },
        iconBg: "bg-blue-50",
        iconColor: "text-[#4F6EF5]",
    },
    "no-results": {
        Icon: Search,
        title: "No results found",
        description: "Try adjusting your search or filters to find what you're looking for.",
        iconBg: "bg-slate-100",
        iconColor: "text-slate-400",
    },
    "ai-failed": {
        Icon: AlertCircle,
        title: "AI processing failed",
        description: "Something went wrong while processing your note. Please try again.",
        action: { label: "Try again", primary: false },
        iconBg: "bg-red-50",
        iconColor: "text-red-400",
    },
    "no-tags": {
        Icon: Sparkles,
        title: "No tags yet",
        description: "Tags are automatically generated after AI processing your notes.",
        iconBg: "bg-purple-50",
        iconColor: "text-purple-400",
    },
};
export function EmptyState({ variant, searchQuery, onRetry }) {
    const navigate = useNavigate();
    const config = CONFIG[variant];
    const { Icon, title, description, action, iconBg, iconColor } = config;
    const displayDescription = searchQuery && variant === "no-results"
        ? `No notes match "${searchQuery}". Try a different search term or clear your filters.`
        : description;
    const handleAction = () => {
        if (variant === "no-notes")
            navigate("/dashboard/notes/new");
        if (variant === "ai-failed" && onRetry)
            onRetry();
    };
    return (<div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className={`w-14 h-14 rounded-2xl ${iconBg} flex items-center justify-center mb-4`}>
        <Icon className={`w-6 h-6 ${iconColor}`}/>
      </div>
      <h3 className="text-[#0F172A] mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm leading-relaxed mb-6">
        {displayDescription}
      </p>
      {action && (<button onClick={handleAction} className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${action.primary
                ? "bg-[#0F172A] text-white hover:bg-[#1E293B]"
                : "bg-white text-[#0F172A] border border-border hover:bg-slate-50"}`}>
          {action.label}
        </button>)}
    </div>);
}
