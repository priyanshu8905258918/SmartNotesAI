const TAG_COLORS = {
    "Machine Learning": "bg-blue-50 text-blue-700 border-blue-100",
    "Computer Science": "bg-purple-50 text-purple-700 border-purple-100",
    "Mathematics": "bg-violet-50 text-violet-700 border-violet-100",
    "Biology": "bg-green-50 text-green-700 border-green-100",
    "History": "bg-amber-50 text-amber-700 border-amber-100",
    "Physics": "bg-cyan-50 text-cyan-700 border-cyan-100",
    "Economics": "bg-orange-50 text-orange-700 border-orange-100",
};
export function TagBadge({ tag, size = "sm", onClick, active }) {
    const colorClass = TAG_COLORS[tag] ?? "bg-slate-50 text-slate-600 border-slate-100";
    const activeClass = active ? "ring-2 ring-offset-1 ring-[#4F6EF5]" : "";
    const sizeClass = size === "md" ? "px-3 py-1.5 text-sm" : "px-2.5 py-0.5 text-xs";
    const cursorClass = onClick ? "cursor-pointer hover:opacity-80" : "";
    return (<span className={`inline-flex items-center rounded-full border font-medium transition-all ${colorClass} ${sizeClass} ${cursorClass} ${activeClass}`} onClick={onClick}>
      {tag}
    </span>);
}
