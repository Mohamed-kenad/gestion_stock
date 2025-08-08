import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Home, ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="w-full max-w-md">
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader className="text-center pb-3 pt-6">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
              <span className="text-white text-2xl font-bold">404</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h1>
            <p className="text-gray-500">
              Sorry, the page you're looking for doesn't exist.
            </p>
          </CardHeader>

          <CardContent className="pt-0 pb-6 px-6">
            <div className="space-y-4">
              <p className="text-sm text-gray-600 text-center">
                The page you requested could not be found. It might have been moved, deleted, or you entered the wrong URL.
              </p>
              
                             <div className="flex flex-col sm:flex-row gap-3">
                 <Button
                   onClick={() => navigate(-1)}
                   variant="outline"
                   className="flex-1 justify-center"
                 >
                   <ArrowLeft className="w-4 h-4 mr-2" />
                   Go Back
                 </Button>
                 
                 <Button
                   onClick={() => navigate('/dashboard')}
                   className="flex-1 justify-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                 >
                   <Home className="w-4 h-4 mr-2" />
                   Go Home
                 </Button>
               </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 