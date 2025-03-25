
import { useState, useEffect } from "react";
import { Container } from "@/components/layout/Container";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Header } from "@/components/layout/Header";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header transparent />
      
      <main className="flex-1 flex items-center">
        <Container>
          <div className={`max-w-3xl mx-auto text-center transform transition-all duration-700 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Start Smart. Build Lean.
              <br />
              Grow with Clarity.
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed">
              Your business, aligned around People, Process, and Profit from day one.
            </p>
            
            <div className="mt-10 flex justify-center">
              <ButtonCustom 
                withArrow 
                size="lg" 
                onClick={() => navigate('/setup')}
                className="text-lg px-8 py-7"
              >
                Start My Path
              </ButtonCustom>
            </div>
          </div>
        </Container>
      </main>
      
      <footer className="py-8 border-t">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center text-muted-foreground">
          <p>P3 Starter — Your foundation for People, Process, and Profit</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
