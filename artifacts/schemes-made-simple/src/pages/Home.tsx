import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Search, ArrowRight, FileText, CheckCircle2, Users, ShieldCheck } from "lucide-react";
import { Button, Input, Card } from "@/components/ui-elements";

export default function Home() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/schemes?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const categories = [
    { name: "Agriculture", icon: "🌾", count: "45+" },
    { name: "Education", icon: "📚", count: "120+" },
    { name: "Health", icon: "🏥", count: "80+" },
    { name: "Housing", icon: "🏠", count: "30+" },
    { name: "Employment", icon: "💼", count: "65+" },
    { name: "Women & Child", icon: "👩‍👧", count: "90+" },
  ];

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-grain">
        <div className="absolute inset-0 z-0">
          <img 
            src={`${import.meta.env.BASE_URL}images/hero-bg.png`}
            alt="Abstract Background" 
            className="w-full h-full object-cover opacity-60 mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6 border border-primary/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Updated with latest 2024 Schemes
              </span>
              <h1 className="text-5xl lg:text-7xl font-display font-extrabold text-foreground leading-[1.1] mb-6">
                Discover Government Schemes <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Made Simple.</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                Find exactly what you're eligible for in seconds. We break down complex government welfare programs into easy, actionable steps.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="max-w-2xl mx-auto bg-white p-2 rounded-2xl shadow-xl shadow-primary/5 border border-border/50 flex items-center"
            >
              <form onSubmit={handleSearch} className="flex-1 flex items-center">
                <Search className="w-6 h-6 text-muted-foreground ml-4" />
                <Input 
                  type="text" 
                  placeholder="E.g., Schemes for students, farmers, housing..." 
                  className="border-0 focus:ring-0 shadow-none text-lg py-4 bg-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button type="submit" size="lg" className="rounded-xl hidden sm:flex">
                  Search Schemes
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-display font-bold mb-4">Browse by Category</h2>
              <p className="text-muted-foreground">Find schemes organized by sector and impact area.</p>
            </div>
            <Link href="/schemes" className="hidden sm:flex text-primary font-semibold items-center gap-2 hover:gap-3 transition-all">
              View All <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Link href={`/schemes?category=${encodeURIComponent(cat.name)}`}>
                  <Card className="p-6 flex flex-col items-center text-center cursor-pointer hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{cat.icon}</div>
                    <h3 className="font-semibold text-foreground mb-1">{cat.name}</h3>
                    <p className="text-sm text-muted-foreground">{cat.count} Schemes</p>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground">Three simple steps to claim your benefits.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Search, title: "1. Discover", desc: "Search or browse through hundreds of centralized and state schemes." },
              { icon: FileText, title: "2. Check Eligibility", desc: "Read plain-English criteria and gather required documents." },
              { icon: CheckCircle2, title: "3. Apply", desc: "Follow our step-by-step guides to successfully submit your application." }
            ].map((step, i) => (
              <div key={i} className="text-center relative">
                <div className="w-20 h-20 mx-auto bg-white rounded-2xl shadow-lg border border-border flex items-center justify-center mb-6 relative z-10">
                  <step.icon className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                {i < 2 && <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/30 to-transparent border-t-2 border-dashed border-primary/20 z-0" />}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
