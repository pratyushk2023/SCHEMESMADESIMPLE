import { Shield, Target, Users } from "lucide-react";
import { Card } from "@/components/ui-elements";

export default function About() {
  return (
    <main className="flex-1 pt-32 pb-20 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Bridging the Gap Between Citizens and Government</h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            We believe that every citizen deserves easy, understandable access to the welfare schemes and rights designed for their benefit.
          </p>
        </div>

        <div className="rounded-3xl overflow-hidden shadow-2xl mb-20 relative h-80">
           <img 
            src={`${import.meta.env.BASE_URL}images/about-mission.png`} 
            alt="Our Mission" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { icon: Target, title: "Our Mission", desc: "To demystify bureaucratic language and make government entitlements accessible to everyone, regardless of their background." },
            { icon: Users, title: "For the People", desc: "Built with a focus on accessibility, offering multilingual support and text-to-speech for those who need it most." },
            { icon: Shield, title: "Trusted Info", desc: "We aggregate and simplify information directly from official government portals to ensure accuracy and reliability." }
          ].map((item, i) => (
            <Card key={i} className="p-8 text-center bg-white">
              <div className="mx-auto w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                <item.icon size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
            </Card>
          ))}
        </div>

        <div className="bg-primary/5 rounded-3xl p-10 md:p-16 text-center border border-primary/10">
          <h2 className="text-3xl font-display font-bold mb-6">Open Source & Community Driven</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Schemes Made Simple is built as a public good. We welcome contributions from developers, legal experts, and citizens to help expand our database and improve the platform.
          </p>
          <a href="mailto:contact@schemesmadesimple.org" className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold bg-primary text-white hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
            Get Involved
          </a>
        </div>

      </div>
    </main>
  );
}
