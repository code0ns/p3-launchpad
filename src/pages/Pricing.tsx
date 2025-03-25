
import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Header } from "@/components/layout/Header";
import { Card, CardContent } from "@/components/ui/card-custom";
import { ButtonCustom } from "@/components/ui/button-custom";
import { BadgeCustom } from "@/components/ui/badge-custom";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

type PricingPlan = "monthly" | "annually";

interface PlanFeature {
  name: string;
  included: boolean;
  pro: boolean;
}

interface PricingCardProps {
  title: string;
  price: string | { monthly: string; annually: string };
  description: string;
  features: PlanFeature[];
  ctaText: string;
  ctaAction: () => void;
  highlighted?: boolean;
  period: PricingPlan;
}

const PricingCard = ({ 
  title, 
  price, 
  description, 
  features, 
  ctaText, 
  ctaAction, 
  highlighted = false,
  period
}: PricingCardProps) => {
  const displayPrice = typeof price === 'string' ? price : price[period];
  
  return (
    <Card 
      className={`flex flex-col h-full transition-all duration-300 ${
        highlighted ? "border-2 border-black shadow-lg" : ""
      }`}
    >
      <CardContent className="pt-6 flex flex-col h-full">
        <div className="mb-4">
          <h3 className="text-xl font-bold">{title}</h3>
          <div className="mt-2 mb-2">
            <span className="text-3xl font-bold">{displayPrice}</span>
            {displayPrice !== "Free" && (
              <span className="text-muted-foreground ml-1">
                {period === "monthly" ? "/month" : "/year"}
              </span>
            )}
          </div>
          <p className="text-muted-foreground">{description}</p>
        </div>
        
        <ul className="space-y-3 mb-8 flex-grow">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="h-5 w-5 text-black flex-shrink-0 mt-0.5" />
              <span className="flex items-center gap-2">
                {feature.name}
                {feature.pro && <BadgeCustom variant="pro" className="scale-75">PRO</BadgeCustom>}
              </span>
            </li>
          ))}
        </ul>
        
        <div className="mt-auto">
          <ButtonCustom 
            onClick={ctaAction} 
            className={`w-full ${highlighted ? "bg-black text-white" : ""}`}
            variant={highlighted ? "default" : "outline"}
          >
            {ctaText}
          </ButtonCustom>
        </div>
      </CardContent>
    </Card>
  );
};

const Pricing = () => {
  const [pricingPeriod, setPricingPeriod] = useState<PricingPlan>("monthly");
  const navigate = useNavigate();

  const freeFeatures: PlanFeature[] = [
    { name: "Core P3 Frameworks", included: true, pro: false },
    { name: "People, Process, Profit Tabs", included: true, pro: false },
    { name: "Basic Finance Tracking", included: true, pro: false },
    { name: "Unlimited Collaborators", included: true, pro: false },
  ];

  const proFeatures: PlanFeature[] = [
    ...freeFeatures,
    { name: "Smart Reminders", included: true, pro: true },
    { name: "Goal Tracker", included: true, pro: true },
    { name: "PDF/Notion Export", included: true, pro: true },
    { name: "Prebuilt Templates", included: true, pro: true },
    { name: "Advanced Financial View", included: true, pro: true },
  ];

  const founderPlusFeatures: PlanFeature[] = [
    ...proFeatures,
    { name: "Founders Circle Community", included: true, pro: true },
    { name: "Monthly Group Coaching", included: true, pro: true },
    { name: "Quarterly 1:1 Strategy Call", included: true, pro: true },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-secondary/30">
      <Header />
      
      <main className="flex-1 pt-16">
        <Container centerContent>
          <div className="max-w-4xl w-full mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-3">Upgrade your momentum.</h1>
              <p className="text-xl text-muted-foreground">
                Build smarter, faster, and more supported with P3 Pro.
              </p>
            </div>
            
            <div className="flex justify-center mb-10">
              <div className="inline-flex items-center bg-secondary/50 p-1 rounded-full">
                <button
                  onClick={() => setPricingPeriod("monthly")}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    pricingPeriod === "monthly" ? "bg-white shadow-sm" : "hover:bg-white/20"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setPricingPeriod("annually")}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    pricingPeriod === "annually" ? "bg-white shadow-sm" : "hover:bg-white/20"
                  }`}
                >
                  Annually
                  <span className="ml-1 text-xs font-medium bg-black text-white px-1.5 py-0.5 rounded-full">
                    Save 17%
                  </span>
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <PricingCard
                title="Free"
                price="$0"
                description="Get started with the core P3 system"
                features={freeFeatures}
                ctaText="Use for Free"
                ctaAction={() => navigate('/dashboard')}
                period={pricingPeriod}
              />
              
              <PricingCard
                title="P3 Pro"
                price={{ monthly: "$9", annually: "$90" }}
                description="Unlock smart tools and deeper insights"
                features={proFeatures}
                ctaText="Go Pro →"
                ctaAction={() => {
                  // Add subscription logic here
                  alert("This would activate a Pro subscription in a real app");
                  navigate('/dashboard');
                }}
                highlighted={true}
                period={pricingPeriod}
              />
              
              <PricingCard
                title="P3 Founder+"
                price={{ monthly: "$19", annually: "$199" }}
                description="For serious builders: 1:1 feedback + perks"
                features={founderPlusFeatures}
                ctaText="Become a Founder+"
                ctaAction={() => {
                  // Add subscription logic here
                  alert("This would activate a Founder+ subscription in a real app");
                  navigate('/dashboard');
                }}
                period={pricingPeriod}
              />
            </div>
            
            <div className="mt-12 text-center text-sm text-muted-foreground">
              <p>All plans come with a 14-day money-back guarantee.</p>
              <p className="mt-2">
                <a href="#" className="underline hover:text-black transition-colors">
                  Need help choosing? Contact us
                </a>
              </p>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
};

export default Pricing;
