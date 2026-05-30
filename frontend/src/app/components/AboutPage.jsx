import { useNavigate } from "react-router";
import { Sparkles, Target, Lightbulb, Users, Zap, BookOpen, Tag, Upload, Search, ArrowRight, ChevronLeft, } from "lucide-react";
const FEATURES = [
    {
        Icon: Zap,
        title: "AI-Powered Summaries",
        description: "Instantly condense long notes into clear, concise summaries powered by advanced AI.",
        color: "bg-blue-50",
        iconColor: "text-[#4F6EF5]",
    },
    {
        Icon: BookOpen,
        title: "Smart Revision Notes",
        description: "Auto-generate structured bullet-point revision notes from any content.",
        color: "bg-green-50",
        iconColor: "text-green-600",
    },
    {
        Icon: Tag,
        title: "Auto-Generated Tags",
        description: "AI automatically categorizes your notes with relevant tags for fast retrieval.",
        color: "bg-amber-50",
        iconColor: "text-amber-600",
    },
    {
        Icon: Upload,
        title: "Document Upload",
        description: "Upload PDF and DOCX files and extract structured content automatically.",
        color: "bg-purple-50",
        iconColor: "text-purple-600",
    },
    {
        Icon: Search,
        title: "Powerful Search",
        description: "Search across all your notes with full-text search and tag filtering.",
        color: "bg-rose-50",
        iconColor: "text-rose-500",
    },
    {
        Icon: Users,
        title: "For Everyone",
        description: "Designed for students, developers, researchers, and working professionals.",
        color: "bg-cyan-50",
        iconColor: "text-cyan-600",
    },
];
const TEAM = [
    { name: "Priyanshu", role: "Founder & Lead Developer", initials: "P", bg: "bg-[#4F6EF5]" },
];
export function AboutPage() {
    const navigate = useNavigate();
    return (<div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-[#0F172A] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white"/>
            </div>
            <span className="font-semibold text-[#0F172A]">SmartNotes</span>
            <span className="font-semibold text-[#4F6EF5]">AI</span>
          </button>

          <div className="flex items-center gap-3">
            {localStorage.getItem("token") ? (
              <button onClick={() => navigate("/dashboard")} className="text-sm bg-[#4F6EF5] text-white px-4 py-2 rounded-lg hover:bg-[#3D5CE0] transition-colors font-medium">
                Dashboard
              </button>
            ) : (
              <>
                <button onClick={() => navigate("/login")} className="text-sm text-[#0F172A] hover:text-[#4F6EF5] transition-colors font-medium">
                  Sign in
                </button>
                <button onClick={() => navigate("/signup")} className="text-sm bg-[#0F172A] text-white px-4 py-2 rounded-lg hover:bg-[#1E293B] transition-colors font-medium">
                  Get started
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Back link */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
        <button onClick={() => navigate("/")} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-[#0F172A] transition-colors">
          <ChevronLeft className="w-4 h-4"/>
          Back to home
        </button>
      </div>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 lg:py-20">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-[#4F6EF5] text-xs font-medium px-3 py-1.5 rounded-full mb-5">
            <Sparkles className="w-3.5 h-3.5"/>
            About SmartNotes AI
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold text-[#0F172A] leading-tight mb-5">
            Built for learners who want to learn better
          </h1>
          <p className="text-lg text-[#64748B] leading-relaxed">
            SmartNotes AI exists to close the gap between reading and understanding.
            We believe that the future of learning is AI-assisted, not AI-replaced.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-[#F8F8F7] border-y border-border py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-[#4F6EF5]"/>
                <span className="text-sm font-semibold text-[#4F6EF5] uppercase tracking-wider">Our Mission</span>
              </div>
              <h2 className="text-3xl font-semibold text-[#0F172A] mb-5 leading-tight">
                Make learning more efficient for everyone
              </h2>
              <p className="text-[#64748B] leading-relaxed mb-5">
                Every student knows the feeling: you've read the chapter, attended the lecture, taken the notes —
                but somehow, when the exam comes, it all feels distant. The problem isn't effort. It's retention.
              </p>
              <p className="text-[#64748B] leading-relaxed">
                SmartNotes AI uses advanced language models to turn your raw notes into structured study material.
                Summaries that capture the essence. Revision points you can actually memorize. Tags that connect ideas across subjects.
              </p>
            </div>

            <div className="space-y-4">
              {[
            {
                Icon: Lightbulb,
                color: "bg-amber-50",
                iconColor: "text-amber-600",
                title: "Problem we solve",
                desc: "Students spend too much time re-reading and re-organizing notes instead of actually learning.",
            },
            {
                Icon: Target,
                color: "bg-blue-50",
                iconColor: "text-[#4F6EF5]",
                title: "Our approach",
                desc: "AI does the heavy lifting so you can focus on understanding, application, and memory.",
            },
            {
                Icon: Users,
                color: "bg-green-50",
                iconColor: "text-green-600",
                title: "Who we serve",
                desc: "Students, developers, researchers, and professionals who take notes regularly.",
            },
        ].map(({ Icon, color, iconColor, title, desc }) => (<div key={title} className="bg-white border border-border rounded-2xl p-5 flex gap-4">
                  <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-5 h-5 ${iconColor}`}/>
                  </div>
                  <div>
                    <h4 className="text-[#0F172A] mb-1">{title}</h4>
                    <p className="text-sm text-[#64748B] leading-relaxed">{desc}</p>
                  </div>
                </div>))}
            </div>
          </div>
        </div>
      </section>

      {/* Features overview */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 lg:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-[#0F172A] mb-4">What SmartNotes AI does</h2>
          <p className="text-[#64748B] max-w-xl mx-auto">
            A complete toolkit for note-taking, AI processing, and knowledge organization.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(({ Icon, title, description, color, iconColor }) => (<div key={title} className="border border-border rounded-2xl p-5 hover:shadow-sm transition-all bg-white">
              <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mb-4`}>
                <Icon className={`w-5 h-5 ${iconColor}`}/>
              </div>
              <h3 className="text-[#0F172A] mb-2">{title}</h3>
              <p className="text-sm text-[#64748B] leading-relaxed">{description}</p>
            </div>))}
        </div>
      </section>

      {/* Why we built it */}
      <section className="bg-[#F8F8F7] border-y border-border py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-[#4F6EF5]"/>
            <span className="text-sm font-semibold text-[#4F6EF5] uppercase tracking-wider">Why we built this</span>
          </div>
          <h2 className="text-3xl font-semibold text-[#0F172A] mb-6 leading-tight">
            The notes problem is universal
          </h2>
          <div className="space-y-4 text-left">
            <p className="text-[#64748B] leading-relaxed">
              We started SmartNotes AI after noticing a simple truth: note-taking apps are great at storing information
              but terrible at helping you actually use it. You end up with hundreds of notes but no system to study from.
            </p>
            <p className="text-[#64748B] leading-relaxed">
              The breakthrough came when we realized that modern AI is uniquely good at the things humans find tedious —
              summarization, categorization, and generating structured outlines from unstructured text.
            </p>
            <p className="text-[#64748B] leading-relaxed">
              So we built the tool we wished existed: one that takes your messy notes and turns them into clean,
              structured study material — automatically.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 lg:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-[#0F172A] mb-4">The team behind it</h2>
          <p className="text-[#64748B]">A small, focused team building AI tools that actually help people learn.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          {TEAM.map(({ name, role, initials, bg }) => (<div key={name} className="bg-white border border-border rounded-2xl p-6 text-center">
              <div className={`w-14 h-14 rounded-2xl ${bg} flex items-center justify-center mx-auto mb-4`}>
                <span className="text-white font-semibold">{initials}</span>
              </div>
              <p className="font-medium text-[#0F172A] text-sm">{name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{role}</p>
            </div>))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="bg-[#0F172A] rounded-2xl px-8 py-14 text-center">
          <h2 className="text-3xl font-semibold text-white mb-4">Start learning smarter today</h2>
          <p className="text-[#94A3B8] mb-8 max-w-md mx-auto">
            Free to get started. No credit card required. Join thousands of learners already using SmartNotes AI.
          </p>
          <button onClick={() => navigate("/signup")} className="inline-flex items-center gap-2 bg-[#4F6EF5] text-white px-8 py-3 rounded-xl hover:bg-[#3D5CE0] transition-colors font-medium">
            Get Started Free
            <ArrowRight className="w-4 h-4"/>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-[#0F172A] flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white"/>
              </div>
              <span className="text-sm font-medium text-[#0F172A]">SmartNotes AI</span>
            </div>
            <p className="text-xs text-[#94A3B8]">© 2025 SmartNotes AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>);
}
