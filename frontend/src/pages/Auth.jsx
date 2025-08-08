import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Mail, Lock, ArrowRight } from "lucide-react"
import api from "@/lib/api"
import { showError, showSuccess } from "@/components/ui/notify"
import { useAuth } from "@/context/AuthContext"
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners"

export default function Auth() {
  const {user, updateAuthState, loading, isAuthenticated} = useAuth();
  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, loading, navigate]);


  if (loading) {
    return (
            <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
                <BeatLoader color="#9c20d5" />
            </div> 
           );
  }

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    if (!isLogin && data.password !== data.confirmPassword) {
      showError("Password and Confirm Password do not match");
      setIsLoading(false)
      return;
    }
    
    try {
      if (isLogin) {
        const response = await api.post("/login", {
          email: data.email,
          password: data.password
        });
        if (response.status === 200) {
          updateAuthState(response.data.token, response.data.user)
          showSuccess(response.data.message);
          navigate('/dashboard')
        }
      } else {
        const response = await api.post("/register", {
          name: data.name,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword
        });
        if (response.status === 201) {
          showSuccess(response.data.message);
          setIsLogin(true); // Switch to login mode
          setData({ name: "", email: "", password: "", confirmPassword: "" }); 
        }
      }
    } catch (error) {
      console.log(error);
      showError(error.response?.data?.message || "An error occurred");

    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="w-full max-w-sm">
        {/* Compact Toggle */}
        <div className="flex mb-4 p-0.5 bg-gray-100 rounded-lg">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-1.5 px-3 rounded-md text-xs font-medium transition-all duration-200 ${
              isLogin ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-1.5 px-3 rounded-md text-xs font-medium transition-all duration-200 ${
              !isLogin ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Compact Card */}
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader className="text-center pb-3 pt-4">
            <div className="mx-auto w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-2">
              <div className="w-4 h-4 bg-white rounded-full" />
            </div>
            <h1 className="text-lg font-semibold text-gray-900">{isLogin ? "Welcome back" : "Get started"}</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              {isLogin ? "Sign in to your account" : "Create your account"}
            </p>
          </CardHeader>

          <CardContent className="pt-0 pb-4 px-4">
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Name field for register */}
              {!isLogin && (
                <div className="space-y-1">
                  <Label htmlFor="name" className="text-xs font-medium text-gray-600">
                    Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-gray-400" />
                    <Input
                      id="name"
                      name="name"
                      placeholder="Full name"
                      className="pl-8 h-9 text-sm border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      autoComplete="name"
                      required
                      value={data.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}

              {/* Email field */}
              <div className="space-y-1">
                <Label htmlFor="email" className="text-xs font-medium text-gray-600">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-8 h-9 text-sm border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    autoComplete="email"
                    required
                    value={data.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Password field */}
              <div className="space-y-1">
                <Label htmlFor="password" className="text-xs font-medium text-gray-600">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-8 h-9 text-sm border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    autoComplete={isLogin ? "current-password" : "new-password"}
                    required
                    value={data.password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Confirm password field */}
              {!isLogin && (
                <div className="space-y-1">
                  <Label htmlFor="confirm-password" className="text-xs font-medium text-gray-600">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-gray-400" />
                    <Input
                      id="confirm-password"
                      name="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      className="pl-8 h-9 text-sm border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      autoComplete="new-password"
                      required
                      value={data.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}
              

              {/* Forgot password */}
              {isLogin && (
                <div className="text-right">
                  <button type="button" className="text-xs text-blue-600 hover:text-blue-500">
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Submit button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-9 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm font-medium rounded-lg transition-all duration-200 group mt-4"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    <span className="text-xs">{isLogin ? "Signing in..." : "Creating..."}</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <span>{isLogin ? "Sign In" : "Sign Up"}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                )}
              </Button>
            </form>

            {/* Compact footer */}
            <p className="text-center text-xs text-gray-400 mt-3">
              By continuing, you agree to our <button className="text-blue-600 hover:underline">Terms</button>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
