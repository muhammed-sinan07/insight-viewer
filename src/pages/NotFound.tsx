import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-6 p-8">
          <div className="text-8xl font-bold text-primary/20">404</div>
          <h1 className="text-3xl font-bold text-foreground">Page Not Found</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild variant="outline" className="gap-2">
              <Link to="/">
                <ArrowLeft className="h-4 w-4" />
                Go Back
              </Link>
            </Button>
            <Button asChild className="gap-2">
              <Link to="/">
                <Home className="h-4 w-4" />
                Home
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
