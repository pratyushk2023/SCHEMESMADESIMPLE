import { Link, useLocation } from "wouter";
import { Search, Menu, X, Landmark, MessageSquareText } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui-elements";

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Schemes", path: "/schemes" },
    { name: "Legal Helper", path: "/chat" },
    { name: "About", path: "/about" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent",
        isScrolled ? "bg-white/80 backdrop-blur-md border-border shadow-sm py-3" : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-primary p-2.5 rounded-xl text-white group-hover:scale-105 transition-transform duration-300 shadow-md shadow-primary/20">
              <Landmark size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold leading-tight tracking-tight text-foreground">
                Schemes<span className="text-primary">MadeSimple</span>
              </h1>
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">Govt Initiatives</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={cn(
                  "text-sm font-semibold transition-colors duration-200 relative py-2",
                  location === link.path ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.name}
                {location === link.path && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <select className="appearance-none bg-muted/50 border border-border text-sm font-medium rounded-lg pl-4 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20">
                <option>English</option>
                <option>हिंदी</option>
                <option>தமிழ்</option>
              </select>
            </div>
            <Link href="/chat">
              <Button variant="primary" size="sm" className="gap-2">
                <MessageSquareText size={16} />
                Ask Assistant
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-border shadow-lg p-4 flex flex-col gap-4 md:hidden animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "p-3 rounded-xl font-medium",
                location === link.path ? "bg-primary/5 text-primary" : "text-foreground hover:bg-muted"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
