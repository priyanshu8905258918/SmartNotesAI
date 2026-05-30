import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { Sparkles, Eye, EyeOff, ArrowRight, AlertCircle, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import api from "./api";
export function LoginPage() {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/dashboard");
        }
    }, [navigate]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const validate = () => {
        const errs = {};
        if (!email)
            errs.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(email))
            errs.email = "Enter a valid email address";
        if (!password)
            errs.password = "Password is required";
        else if (password.length < 8)
            errs.password = "Password must be at least 8 characters";
        return errs;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }
        setErrors({});
        setLoading(true);
        try {
            const response = await api.post("/auth/login", { email, password });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            toast.success(`Welcome back, ${response.data.user.name}!`);
            navigate("/dashboard");
        }
        catch (error) {
            toast.error(error.message || "Failed to sign in. Please check your credentials.");
            setErrors({ form: error.message || "Failed to sign in" });
        }
        finally {
            setLoading(false);
        }
    };
    return (<div className="min-h-screen bg-[#F8F8F7] flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-[45%] bg-[#0F172A] flex-col justify-between p-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-[#4F6EF5]"/>
          <div className="absolute bottom-32 right-10 w-56 h-56 rounded-full bg-[#4F6EF5]"/>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-white"/>
        </div>

        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white"/>
            </div>
            <span className="text-white font-semibold">SmartNotes AI</span>
          </Link>
        </div>

        <div className="relative z-10">
          <h2 className="text-3xl font-semibold text-white mb-4 leading-tight">
            Turn long notes into smart revision material
          </h2>
          <p className="text-[#94A3B8] text-sm leading-relaxed mb-8">
            AI-powered summaries, revision notes, and intelligent tagging — all in one clean workspace.
          </p>

          <div className="space-y-3">
            {[
            "Automatic AI summaries in seconds",
            "Structured revision bullet points",
            "Smart auto-generated tags",
            "Upload PDFs and DOCX files",
        ].map((feature) => (<div key={feature} className="flex items-center gap-2.5">
                <div className="w-4 h-4 rounded-full bg-[#4F6EF5]/20 border border-[#4F6EF5]/40 flex items-center justify-center flex-shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#4F6EF5]"/>
                </div>
                <span className="text-sm text-[#CBD5E1]">{feature}</span>
              </div>))}
          </div>
        </div>

        <p className="relative z-10 text-[#475569] text-xs">
          © 2025 SmartNotes AI
        </p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-medium text-[#64748B] hover:text-[#0F172A] mb-6 transition-colors">
            <ChevronLeft className="w-3.5 h-3.5"/>
            Back to Home
          </Link>

          {/* Mobile logo */}
          <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-[#0F172A] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white"/>
            </div>
            <span className="font-semibold text-[#0F172A]">SmartNotes</span>
            <span className="font-semibold text-[#4F6EF5]">AI</span>
          </Link>

          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-[#0F172A] mb-1.5">Welcome back</h1>
            <p className="text-[#64748B] text-sm">Sign in to your account to continue.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-1.5">
                Email address
              </label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className={`w-full h-11 px-4 bg-white border rounded-xl text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 transition-all ${errors.email
            ? "border-red-300 focus:ring-red-100"
            : "border-border focus:ring-[#4F6EF5]/20 focus:border-[#4F6EF5]"}`}/>
              {errors.email && (<p className="flex items-center gap-1.5 text-xs text-red-500 mt-1.5">
                  <AlertCircle className="w-3.5 h-3.5"/>
                  {errors.email}
                </p>)}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-[#0F172A]">Password</label>
                <button type="button" className="text-xs text-[#4F6EF5] hover:underline">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className={`w-full h-11 px-4 pr-11 bg-white border rounded-xl text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 transition-all ${errors.password
            ? "border-red-300 focus:ring-red-100"
            : "border-border focus:ring-[#4F6EF5]/20 focus:border-[#4F6EF5]"}`}/>
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#94A3B8] hover:text-[#64748B]">
                  {showPassword ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
                </button>
              </div>
              {errors.password && (<p className="flex items-center gap-1.5 text-xs text-red-500 mt-1.5">
                  <AlertCircle className="w-3.5 h-3.5"/>
                  {errors.password}
                </p>)}
            </div>

            <button type="submit" disabled={loading} className="w-full h-11 bg-[#0F172A] text-white rounded-xl flex items-center justify-center gap-2 hover:bg-[#1E293B] disabled:opacity-60 disabled:cursor-not-allowed transition-all font-medium mt-2">
              {loading ? (<div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>) : (<>
                  Sign in
                  <ArrowRight className="w-4 h-4"/>
                </>)}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-border">
            <div className="relative flex items-center justify-center mb-5">
              <span className="bg-[#F8F8F7] px-3 text-xs text-[#94A3B8]">or continue with</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
            { name: "Google", logo: "G" },
            { name: "GitHub", logo: "GH" },
        ].map(({ name, logo }) => (<button key={name} type="button" className="h-11 bg-white border border-border rounded-xl flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
                  <span className="text-xs font-semibold text-[#64748B]">{logo}</span>
                  <span className="text-sm text-[#0F172A]">{name}</span>
                </button>))}
            </div>
          </div>

          <p className="text-center text-sm text-[#64748B] mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#4F6EF5] font-medium hover:underline">
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>);
}
