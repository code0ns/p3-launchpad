
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ButtonCustom } from "@/components/ui/button-custom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center max-w-md px-4">
        <h1 className="text-4xl font-bold mb-6">404</h1>
        <p className="text-lg text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <ButtonCustom>
            Return Home
          </ButtonCustom>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
