import React, { forwardRef, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Phone, Lock } from "lucide-react";

/* ---------------------------
   Validation schemas
--------------------------- */
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = z.object({
  displayName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
});

type LoginFormData = z.infer<typeof loginSchema>;
type SignupFormData = z.infer<typeof signupSchema>;

/* ---------------------------
   Input with Icon wrapper
--------------------------- */
const InputWithIcon = forwardRef<HTMLInputElement, { icon?: React.ComponentType<any>; [k: string]: any }>(
  ({ icon: Icon, ...props }, ref) => {
    const innerRef = useRef<HTMLInputElement | null>(null);

    const setRefs = (el: HTMLInputElement | null) => {
      innerRef.current = el;
      if (!ref) return;
      if (typeof ref === "function") ref(el);
      else (ref as React.MutableRefObject<HTMLInputElement | null>).current = el;
    };

    return (
      <div className="relative w-full" onClick={() => innerRef.current?.focus()}>
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
        )}
        <Input {...props} ref={setRefs} className="pl-10 w-full" />
      </div>
    );
  }
);
InputWithIcon.displayName = "InputWithIcon";

/* ---------------------------
   Auth Component
--------------------------- */
export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: { displayName: "", email: "", password: "", phone: "" },
  });

  const handleLogin = async (data: LoginFormData) => {
    setLoading(true);
    const { error } = await signIn(data.email, data.password);
    if (error) toast({ title: "Login Failed", description: error.message, variant: "destructive" });
    else {
      toast({ title: "Welcome back!", description: "Successfully logged in." });
      navigate("/");
    }
    setLoading(false);
  };

  const handleSignup = async (data: SignupFormData) => {
    setLoading(true);
    const { error } = await signUp(data.email, data.password, data.phone, data.displayName);
    if (error) toast({ title: "Signup Failed", description: error.message, variant: "destructive" });
    else {
      toast({ title: "Account Created!", description: "Please check your email to verify your account." });
      setIsLogin(true);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">{isLogin ? "Sign In" : "Sign Up"}</h1>

        <Card className="p-6">
          <CardContent>
            {isLogin ? (
              <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                <InputWithIcon
                  icon={Mail}
                  type="email"
                  placeholder="your@email.com"
                  {...loginForm.register("email")}
                />
                <InputWithIcon
                  icon={Lock}
                  type="password"
                  placeholder="••••••••"
                  {...loginForm.register("password")}
                />
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            ) : (
              <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-4">
                <InputWithIcon
                  icon={User}
                  placeholder="Your full name"
                  {...signupForm.register("displayName")}
                />
                <InputWithIcon
                  icon={Mail}
                  type="email"
                  placeholder="your@email.com"
                  {...signupForm.register("email")}
                />
                <InputWithIcon
                  icon={Phone}
                  type="tel"
                  placeholder="+91 9876543210"
                  {...signupForm.register("phone")}
                />
                <InputWithIcon
                  icon={Lock}
                  type="password"
                  placeholder="••••••••"
                  {...signupForm.register("password")}
                />
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            )}

            <div className="mt-4 text-center">
              <Button variant="ghost" size="sm" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
