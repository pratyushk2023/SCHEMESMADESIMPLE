import { Landmark } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-white py-16 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-white/10 p-2.5 rounded-xl text-white">
                <Landmark size={24} />
              </div>
              <h2 className="text-2xl font-display font-bold">SchemesMadeSimple</h2>
            </div>
            <p className="text-white/60 leading-relaxed max-w-md">
              Empowering citizens by simplifying access to government welfare schemes, 
              entitlements, and legal rights through technology and clear information.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><a href="/schemes" className="text-white/60 hover:text-white transition-colors">Browse Schemes</a></li>
              <li><a href="/chat" className="text-white/60 hover:text-white transition-colors">Legal Assistant</a></li>
              <li><a href="/about" className="text-white/60 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors">Accessibility Statement</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6">Categories</h3>
            <ul className="space-y-4">
              <li><a href="/schemes?category=Agriculture" className="text-white/60 hover:text-white transition-colors">Agriculture</a></li>
              <li><a href="/schemes?category=Education" className="text-white/60 hover:text-white transition-colors">Education</a></li>
              <li><a href="/schemes?category=Health" className="text-white/60 hover:text-white transition-colors">Health & Wellness</a></li>
              <li><a href="/schemes?category=Housing" className="text-white/60 hover:text-white transition-colors">Housing</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-sm">
          <p>© {new Date().getFullYear()} Schemes Made Simple. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
