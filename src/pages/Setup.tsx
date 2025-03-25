
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card-custom";
import { ButtonCustom } from "@/components/ui/button-custom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Container } from "@/components/layout/Container";

type BusinessStage = "Just starting" | "Building MVP" | "Testing idea" | "Selling already";

interface SetupData {
  businessIdea: string;
  founders: "solo" | "co-founders";
  stage: BusinessStage;
}

const Steps = [
  {
    id: "businessIdea",
    title: "What's your business idea?",
    description: "Describe your idea in 1-2 lines."
  },
  {
    id: "founders",
    title: "Are you solo or with co-founders?",
    description: "This helps us tailor your dashboard experience."
  },
  {
    id: "stage",
    title: "What's your current stage?",
    description: "Select the option that best describes where you are."
  }
];

const Setup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [setupData, setSetupData] = useState<SetupData>({
    businessIdea: "",
    founders: "solo",
    stage: "Just starting"
  });
  const [fadeOut, setFadeOut] = useState(false);

  const totalSteps = Steps.length;
  const currentStep = Steps[step];

  const handleNext = () => {
    if (step < totalSteps - 1) {
      handleTransition(() => setStep(step + 1));
    } else {
      localStorage.setItem('p3SetupData', JSON.stringify(setupData));
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (step > 0) {
      handleTransition(() => setStep(step - 1));
    } else {
      navigate('/');
    }
  };

  const handleTransition = (callback: () => void) => {
    setFadeOut(true);
    setTimeout(() => {
      callback();
      setFadeOut(false);
    }, 300);
  };

  const updateSetupData = (field: keyof SetupData, value: any) => {
    setSetupData({ ...setupData, [field]: value });
  };

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <div className="w-full max-w-md">
            <Textarea
              value={setupData.businessIdea}
              onChange={(e) => updateSetupData("businessIdea", e.target.value)}
              placeholder="Briefly describe your business idea..."
              className="w-full h-32 px-4 py-3 rounded-xl border border-border focus:shadow-glow focus:border-black/30 focus:outline-none transition-all duration-300 resize-none"
            />
          </div>
        );
      case 1:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md">
            <Card 
              interactive 
              className={`text-center py-8 ${setupData.founders === 'solo' ? 'ring-1 ring-black shadow-glow' : ''}`}
              onClick={() => updateSetupData("founders", "solo")}
            >
              <p className="text-lg font-medium">Solo Founder</p>
            </Card>
            <Card 
              interactive 
              className={`text-center py-8 ${setupData.founders === 'co-founders' ? 'ring-1 ring-black shadow-glow' : ''}`}
              onClick={() => updateSetupData("founders", "co-founders")}
            >
              <p className="text-lg font-medium">Co-Founders</p>
            </Card>
          </div>
        );
      case 2:
        return (
          <div className="grid grid-cols-1 gap-3 w-full max-w-md">
            {["Just starting", "Building MVP", "Testing idea", "Selling already"].map((option) => (
              <Card
                key={option}
                interactive
                className={`py-4 px-4 ${setupData.stage === option ? 'ring-1 ring-black shadow-glow' : ''}`}
                onClick={() => updateSetupData("stage", option as BusinessStage)}
              >
                <p className="text-lg font-medium">{option}</p>
              </Card>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  const isNextDisabled = () => {
    if (step === 0 && setupData.businessIdea.trim() === "") return true;
    return false;
  };

  return (
    <div className="min-h-screen flex flex-col bg-secondary/30">
      <div className="h-1 bg-black w-full">
        <div 
          className="h-full bg-black transition-all duration-500 ease-in-out" 
          style={{ width: `${(step + 1) / totalSteps * 100}%` }}
        />
      </div>
      
      <Container fullScreen className="flex-1 flex flex-col items-center justify-center">
        <div className={`w-full max-w-2xl mx-auto transition-opacity duration-300 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">{currentStep.title}</h2>
            <p className="text-muted-foreground">{currentStep.description}</p>
          </div>
          
          <div className="flex justify-center mb-12">
            {renderStepContent()}
          </div>
          
          <div className="flex justify-between">
            <button
              onClick={handleBack}
              className="flex items-center text-muted-foreground hover:text-black transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>
            
            <ButtonCustom
              onClick={handleNext}
              disabled={isNextDisabled()}
              withArrow
            >
              {step === totalSteps - 1 ? "Complete Setup" : "Continue"}
            </ButtonCustom>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Setup;
