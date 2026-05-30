import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Sparkles, ArrowRight, FileText, Zap, BookOpen, Tag, Upload, BarChart3, CheckCircle2, Star, } from "lucide-react";
import api from "./api";
const FEATURES = [
    {
        Icon: Zap,
        title: "AI-Powered Summaries",
        description: "Transform lengthy notes into concise, actionable summaries in seconds.",
        color: "bg-blue-50",
        iconColor: "text-[#4F6EF5]",
    },
    {
        Icon: BookOpen,
        title: "Smart Revision Notes",
        description: "Auto-generate structured revision points to help you retain key concepts.",
        color: "bg-green-50",
        iconColor: "text-green-600",
    },
    {
        Icon: Tag,
        title: "Auto-Generated Tags",
        description: "Intelligent tagging categorizes your notes automatically for easy organization.",
        color: "bg-amber-50",
        iconColor: "text-amber-600",
    },
    {
        Icon: Upload,
        title: "Document Upload",
        description: "Upload PDFs and DOCX files and let AI extract and structure the content.",
        color: "bg-purple-50",
        iconColor: "text-purple-600",
    },
    {
        Icon: BarChart3,
        title: "Study Analytics",
        description: "Track your note-taking patterns and study progress over time.",
        color: "bg-rose-50",
        iconColor: "text-rose-500",
    },
    {
        Icon: FileText,
        title: "Organized Dashboard",
        description: "A clean, searchable workspace for all your notes with powerful filtering.",
        color: "bg-cyan-50",
        iconColor: "text-cyan-600",
    },
];
const STEPS = [
    {
        number: "01",
        title: "Write or Upload",
        description: "Type your notes directly or upload a PDF/DOCX document from your course material.",
    },
    {
        number: "02",
        title: "Let AI Process",
        description: "Hit the AI Process button and SmartNotes analyzes, summarizes, and structures your content.",
    },
    {
        number: "03",
        title: "Review & Revise",
        description: "Get a clean summary, bullet-point revision notes, and auto-generated tags ready to study from.",
    },
];
const BENEFITS = [
    "Save hours of manual note summarization",
    "Retain more with structured revision points",
    "Organize notes with intelligent auto-tagging",
    "Access everything from one clean dashboard",
    "Upload PDFs and DOCX files seamlessly",
    "Study smarter, not harder",
];
export function LandingPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [stats, setStats] = useState({ totalNotes: 0, totalUsers: 0, aiProcessed: 0 });
    useEffect(() => {
        api.get("/public-stats")
            .then(res => {
                if (res.data) {
                    setStats(res.data);
                }
            })
            .catch(err => {
                // Silently fallback to mock data
            });
    }, []);
    return (<div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#0F172A] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white"/>
            </div>
            <span className="font-semibold text-[#0F172A] tracking-tight">SmartNotes</span>
            <span className="font-semibold text-[#4F6EF5] tracking-tight">AI</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm text-[#64748B] hover:text-[#0F172A] transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm text-[#64748B] hover:text-[#0F172A] transition-colors">How it works</a>
            <button onClick={() => navigate("/about")} className="text-sm text-[#64748B] hover:text-[#0F172A] transition-colors">About</button>
          </div>

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

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-16 lg:pt-28 lg:pb-24">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-[#4F6EF5] text-xs font-medium px-3 py-1.5 rounded-full mb-6">
            <Sparkles className="w-3.5 h-3.5"/>
            AI-powered study assistant
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#0F172A] leading-tight tracking-tight mb-6">
            Turn long notes into{" "}
            <span className="text-[#4F6EF5]">smart revision</span>{" "}
            material
          </h1>

          <p className="text-lg text-[#64748B] leading-relaxed mb-10 max-w-2xl mx-auto">
            SmartNotes AI automatically summarizes your study notes, generates revision points,
            and organizes everything with intelligent tags — so you can focus on learning.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
            <button onClick={() => navigate(localStorage.getItem("token") ? "/dashboard" : "/signup")} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#0F172A] text-white px-6 py-3 rounded-xl hover:bg-[#1E293B] transition-all font-medium shadow-sm">
              {localStorage.getItem("token") ? "Go to Dashboard" : "Get Started Free"}
              <ArrowRight className="w-4 h-4"/>
            </button>
          </div>

          <p className="text-xs text-[#94A3B8]">No credit card required · Free to get started</p>
        </div>

        {/* Hero mockup */}
        <div className="mt-16 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 pointer-events-none" style={{ top: "70%" }}/>
          <div className="bg-[#F8F8F7] border border-border rounded-2xl p-4 shadow-xl max-w-4xl mx-auto">
            {/* Mock dashboard header */}
            <div className="bg-white rounded-xl border border-border overflow-hidden shadow-sm">
              <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-[#F8FAFC]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-300"/>
                  <div className="w-3 h-3 rounded-full bg-amber-300"/>
                  <div className="w-3 h-3 rounded-full bg-green-300"/>
                </div>
                <div className="flex-1 bg-white border border-border rounded-md h-6 max-w-xs"/>
              </div>
              <div className="flex h-52">
                {/* Mock sidebar */}
                <div className="w-44 border-r border-border p-3 space-y-1 flex-shrink-0 hidden sm:block">
                  <div className="h-7 bg-[#F1F5F9] rounded-lg"/>
                  {["bg-slate-100", "bg-slate-50", "bg-slate-50", "bg-slate-50"].map((bg, i) => (<div key={i} className={`h-7 ${bg} rounded-lg`}/>))}
                </div>
                {/* Mock content */}
                <div className="flex-1 p-4 space-y-3">
                  <div className="grid grid-cols-3 gap-2">
                    {["bg-blue-50", "bg-green-50", "bg-amber-50"].map((bg, i) => (<div key={i} className={`${bg} rounded-xl p-3`}>
                        <div className="w-8 h-8 bg-white/70 rounded-lg mb-2"/>
                        <div className="h-3 bg-white/70 rounded w-3/4 mb-1"/>
                        <div className="h-4 bg-white/70 rounded w-1/2"/>
                      </div>))}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[0, 1, 2, 3].map((i) => (<div key={i} className="bg-white border border-border rounded-xl p-3 space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-md bg-slate-100"/>
                          <div className="h-3 bg-slate-100 rounded flex-1"/>
                          {i % 2 === 0 && <div className="w-8 h-4 bg-blue-50 rounded-full"/>}
                        </div>
                        <div className="space-y-1">
                          <div className="h-2.5 bg-slate-50 rounded w-full"/>
                          <div className="h-2.5 bg-slate-50 rounded w-4/5"/>
                        </div>
                        <div className="flex gap-1">
                          <div className="h-4 w-16 bg-blue-50 rounded-full"/>
                          <div className="h-4 w-12 bg-green-50 rounded-full"/>
                        </div>
                      </div>))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="border-y border-border bg-[#F8F8F7] py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="text-center text-xs text-[#94A3B8] uppercase tracking-wider mb-6 font-medium">
            Trusted by students and professionals
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
            { value: stats.totalNotes ? `${stats.totalNotes}` : "10K+", label: "Notes Created" },
            { value: stats.aiProcessed ? `${stats.aiProcessed}` : "8K+", label: "AI Summaries" },
            { value: stats.totalUsers ? `${stats.totalUsers}` : "2K+", label: "Users Joined" },
            { value: "4.9", label: "Avg Rating" },
        ].map(({ value, label }) => (<div key={label}>
                <div className="text-2xl font-semibold text-[#0F172A]">{value}</div>
                <div className="text-xs text-[#64748B] mt-1">{label}</div>
              </div>))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 lg:py-28">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#0F172A] mb-4">
            Everything you need to study smarter
          </h2>
          <p className="text-[#64748B] max-w-xl mx-auto">
            Powerful AI tools designed to transform the way you take notes and prepare for exams.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(({ Icon, title, description, color, iconColor }) => (<div key={title} className="bg-white border border-border rounded-2xl p-6 hover:shadow-md transition-all">
              <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mb-4`}>
                <Icon className={`w-5 h-5 ${iconColor}`}/>
              </div>
              <h3 className="text-[#0F172A] mb-2">{title}</h3>
              <p className="text-sm text-[#64748B] leading-relaxed">{description}</p>
            </div>))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-[#F8F8F7] border-y border-border py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#0F172A] mb-4">
              How it works
            </h2>
            <p className="text-[#64748B] max-w-xl mx-auto">
              Three simple steps to transform your notes into powerful study material.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map(({ number, title, description }, index) => (<div key={number} className="relative">
                {index < STEPS.length - 1 && (<div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-border to-transparent -translate-x-1/2 z-0"/>)}
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-border flex items-center justify-center mb-5 shadow-sm">
                    <span className="text-lg font-semibold text-[#4F6EF5]">{number}</span>
                  </div>
                  <h3 className="text-[#0F172A] mb-2">{title}</h3>
                  <p className="text-sm text-[#64748B] leading-relaxed">{description}</p>
                </div>
              </div>))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#0F172A] mb-5">
              Stop wasting time on manual summaries
            </h2>
            <p className="text-[#64748B] leading-relaxed mb-8">
              Students spend hours re-reading and summarizing notes. SmartNotes AI does it in
              seconds, giving you more time to understand and apply what you've learned.
            </p>
            <div className="space-y-3">
              {BENEFITS.map((benefit) => (<div key={benefit} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-green-600"/>
                  </div>
                  <span className="text-sm text-[#0F172A]">{benefit}</span>
                </div>))}
            </div>
          </div>

          <div className="space-y-4">
            {/* Mock note detail card */}
            <div className="bg-white border border-border rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-4 h-4 text-[#64748B]"/>
                <span className="text-sm font-medium text-[#0F172A]">Neural Networks — Lecture 5</span>
                <span className="ml-auto flex items-center gap-1 text-xs text-[#4F6EF5] bg-blue-50 border border-blue-100 rounded-full px-2 py-0.5">
                  <Sparkles className="w-3 h-3"/>
                  AI
                </span>
              </div>
              <div className="space-y-2">
                <div className="h-2.5 bg-slate-100 rounded w-full"/>
                <div className="h-2.5 bg-slate-100 rounded w-5/6"/>
                <div className="h-2.5 bg-slate-100 rounded w-4/5"/>
              </div>
            </div>

            <div className="bg-[#EEF2FF] border border-blue-100 rounded-2xl p-5">
              <p className="text-xs font-semibold text-[#4F6EF5] uppercase tracking-wider mb-3">AI Summary</p>
              <div className="space-y-2">
                <div className="h-2.5 bg-blue-100 rounded w-full"/>
                <div className="h-2.5 bg-blue-100 rounded w-5/6"/>
                <div className="h-2.5 bg-blue-100 rounded w-3/4"/>
              </div>
            </div>

            <div className="bg-white border border-border rounded-2xl p-5">
              <p className="text-xs font-semibold text-[#0F172A] uppercase tracking-wider mb-3">Revision Notes</p>
              <div className="space-y-2">
                {[0, 1, 2].map((i) => (<div key={i} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#4F6EF5] flex-shrink-0"/>
                    <div className="h-2.5 bg-slate-100 rounded flex-1" style={{ width: `${75 + i * 5}%` }}/>
                  </div>))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#F8F8F7] border-y border-border py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-center text-3xl font-semibold text-[#0F172A] mb-12">
            What our users say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
            {
                name: "Priya Sharma",
                role: "Medical Student",
                text: "SmartNotes AI saved me hours every week during exam prep. The revision notes are incredibly accurate.",
            },
            {
                name: "James Liu",
                role: "Software Engineer",
                text: "I use it for documentation and technical reading. The AI summaries help me absorb complex topics much faster.",
            },
            {
                name: "Sofia Martinez",
                role: "Law Student",
                text: "Managing case notes used to be a nightmare. Now I can process entire chapters in minutes.",
            },
        ].map(({ name, role, text }) => (<div key={name} className="bg-white rounded-2xl border border-border p-6">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (<Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400"/>))}
                </div>
                <p className="text-sm text-[#334155] leading-relaxed mb-5">"{text}"</p>
                <div>
                  <p className="text-sm font-medium text-[#0F172A]">{name}</p>
                  <p className="text-xs text-muted-foreground">{role}</p>
                </div>
              </div>))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="bg-[#0F172A] rounded-2xl px-8 py-14 text-center">
          <h2 className="text-3xl font-semibold text-white mb-4">
            Ready to study smarter?
          </h2>
          <p className="text-[#94A3B8] mb-8 max-w-lg mx-auto">
            Join thousands of students and professionals who are transforming their notes with AI.
          </p>
          {localStorage.getItem("token") ? (
            <button onClick={() => navigate("/dashboard")} className="inline-flex items-center gap-2 bg-[#4F6EF5] text-white px-8 py-3 rounded-xl hover:bg-[#3D5CE0] transition-colors font-medium mx-auto">
              Go to Dashboard
              <ArrowRight className="w-4 h-4"/>
            </button>
          ) : (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-sm mx-auto">
              <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 text-sm"/>
              <button onClick={() => navigate("/signup")} className="w-full sm:w-auto flex-shrink-0 bg-[#4F6EF5] text-white px-6 py-3 rounded-xl hover:bg-[#3D5CE0] transition-colors font-medium text-sm whitespace-nowrap">
                Get Started Free
              </button>
            </div>
          )}
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

            <div className="flex items-center gap-6">
              <button onClick={() => navigate("/about")} className="text-xs text-[#64748B] hover:text-[#0F172A]">About</button>
              <a href="#features" className="text-xs text-[#64748B] hover:text-[#0F172A]">Features</a>
              <button onClick={() => navigate("/login")} className="text-xs text-[#64748B] hover:text-[#0F172A]">Sign in</button>
            </div>

            <p className="text-xs text-[#94A3B8]">© 2025 SmartNotes AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>);
}
