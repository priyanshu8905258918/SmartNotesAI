import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { Sparkles, Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle2, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import api from "./api";
export function SignupPage() {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/dashboard");
        }
    }, [navigate]);
    const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const update = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        if (errors[field])
            setErrors((prev) => { const next = { ...prev }; delete next[field]; return next; });
    };
    const passwordStrength = (() => {
        const p = form.password;
        if (!p)
            return 0;
        let score = 0;
        if (p.length >= 8)
            score++;
        if (/[A-Z]/.test(p))
            score++;
        if (/[0-9]/.test(p))
            score++;
        if (/[^A-Za-z0-9]/.test(p))
            score++;
        return score;
    })();
    const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][passwordStrength];
    const strengthColor = ["", "bg-red-400", "bg-amber-400", "bg-blue-400", "bg-green-500"][passwordStrength];
    const validate = () => {
        const errs = {};
        if (!form.name.trim())
            errs.name = "Full name is required";
        if (!form.email)
            errs.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(form.email))
            errs.email = "Enter a valid email";
        if (!form.password)
            errs.password = "Password is required";
        else if (form.password.length < 8)
            errs.password = "Password must be at least 8 characters";
        if (form.password !== form.confirmPassword)
            errs.confirmPassword = "Passwords do not match";
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
            const response = await api.post("/auth/signup", {
                name: form.name,
                email: form.email,
                password: form.password,
            });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            toast.success("Account created! Welcome to SmartNotes AI.");
            navigate("/dashboard");
        }
        catch (error) {
            toast.error(error.message || "Failed to create account. Please try again.");
            setErrors({ form: error.message || "Failed to create account" });
        }
        finally {
            setLoading(false);
        }
    };
    return (<div className="min-h-screen bg-[#F8F8F7] flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-[45%] bg-[#0F172A] flex-col justify-between p-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-16 right-16 w-48 h-48 rounded-full bg-[#4F6EF5]"/>
          <div className="absolute bottom-20 left-8 w-64 h-64 rounded-full bg-[#4F6EF5]"/>
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
          <p className="text-[#4F6EF5] text-xs font-semibold uppercase tracking-wider mb-4">
            Join 10,000+ learners
          </p>
          <h2 className="text-3xl font-semibold text-white mb-6 leading-tight">
            Your AI study partner, starting today
          </h2>

          <div className="space-y-4">
            {[
            { title: "Free to get started", desc: "No credit card required. Create notes immediately." },
            { title: "AI processes in seconds", desc: "Upload or type — get summaries and revision notes fast." },
            { title: "Organized automatically", desc: "Tags, filters, and search built right in." },
        ].map(({ title, desc }) => (<div key={title} className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-[#4F6EF5]/20 border border-[#4F6EF5]/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4F6EF5]"/>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{title}</p>
                  <p className="text-xs text-[#64748B] mt-0.5">{desc}</p>
                </div>
              </div>))}
          </div>
        </div>

        <p className="relative z-10 text-[#475569] text-xs">© 2025 SmartNotes AI</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-medium text-[#64748B] hover:text-[#0F172A] mb-6 transition-colors">
            <ChevronLeft className="w-3.5 h-3.5"/>
            Back to Home
          </Link>

          <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-[#0F172A] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white"/>
            </div>
            <span className="font-semibold text-[#0F172A]">SmartNotes</span>
            <span className="font-semibold text-[#4F6EF5]">AI</span>
          </Link>

          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-[#0F172A] mb-1.5">Create your account</h1>
            <p className="text-[#64748B] text-sm">Free forever. No credit card needed.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full name */}
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-1.5">Full name</label>
              <input type="text" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Alex Johnson" className={`w-full h-11 px-4 bg-white border rounded-xl text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 transition-all ${errors.name ? "border-red-300 focus:ring-red-100" : "border-border focus:ring-[#4F6EF5]/20 focus:border-[#4F6EF5]"}`}/>
              {errors.name && (<p className="flex items-center gap-1.5 text-xs text-red-500 mt-1.5">
                  <AlertCircle className="w-3.5 h-3.5"/>{errors.name}
                </p>)}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-1.5">Email address</label>
              <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" className={`w-full h-11 px-4 bg-white border rounded-xl text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 transition-all ${errors.email ? "border-red-300 focus:ring-red-100" : "border-border focus:ring-[#4F6EF5]/20 focus:border-[#4F6EF5]"}`}/>
              {errors.email && (<p className="flex items-center gap-1.5 text-xs text-red-500 mt-1.5">
                  <AlertCircle className="w-3.5 h-3.5"/>{errors.email}
                </p>)}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-1.5">Password</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} value={form.password} onChange={(e) => update("password", e.target.value)} placeholder="Min. 8 characters" className={`w-full h-11 px-4 pr-11 bg-white border rounded-xl text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 transition-all ${errors.password ? "border-red-300 focus:ring-red-100" : "border-border focus:ring-[#4F6EF5]/20 focus:border-[#4F6EF5]"}`}/>
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#94A3B8] hover:text-[#64748B]">
                  {showPassword ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
                </button>
              </div>
              {form.password && (<div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4].map((level) => (<div key={level} className={`h-1 flex-1 rounded-full transition-all ${passwordStrength >= level ? strengthColor : "bg-slate-200"}`}/>))}
                  </div>
                  {strengthLabel && (<p className="text-xs text-[#64748B]">Password strength: <span className="font-medium">{strengthLabel}</span></p>)}
                </div>)}
              {errors.password && (<p className="flex items-center gap-1.5 text-xs text-red-500 mt-1.5">
                  <AlertCircle className="w-3.5 h-3.5"/>{errors.password}
                </p>)}
            </div>

            {/* Confirm password */}
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-1.5">Confirm password</label>
              <div className="relative">
                <input type={showConfirm ? "text" : "password"} value={form.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)} placeholder="Repeat your password" className={`w-full h-11 px-4 pr-11 bg-white border rounded-xl text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 transition-all ${errors.confirmPassword ? "border-red-300 focus:ring-red-100" : "border-border focus:ring-[#4F6EF5]/20 focus:border-[#4F6EF5]"}`}/>
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#94A3B8] hover:text-[#64748B]">
                  {showConfirm ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
                </button>
              </div>
              {errors.confirmPassword && (<p className="flex items-center gap-1.5 text-xs text-red-500 mt-1.5">
                  <AlertCircle className="w-3.5 h-3.5"/>{errors.confirmPassword}
                </p>)}
            </div>

            <button type="submit" disabled={loading} className="w-full h-11 bg-[#0F172A] text-white rounded-xl flex items-center justify-center gap-2 hover:bg-[#1E293B] disabled:opacity-60 disabled:cursor-not-allowed transition-all font-medium mt-1">
              {loading ? (<div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>) : (<>
                  Create Account
                  <ArrowRight className="w-4 h-4"/>
                </>)}
            </button>

            <p className="text-xs text-center text-[#94A3B8]">
              By creating an account you agree to our{" "}
              <span className="text-[#4F6EF5] cursor-pointer hover:underline">Terms</span> and{" "}
              <span className="text-[#4F6EF5] cursor-pointer hover:underline">Privacy Policy</span>.
            </p>
          </form>

          <p className="text-center text-sm text-[#64748B] mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-[#4F6EF5] font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>);
}
