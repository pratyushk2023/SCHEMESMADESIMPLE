import { useParams } from "wouter";
import { useGetScheme } from "@workspace/api-client-react";
import { ArrowLeft, Building2, Calendar, FileText, CheckCircle2, AlertCircle, Share2, ExternalLink, ChevronDown } from "lucide-react";
import { Link } from "wouter";
import { Button, Card, Badge } from "@/components/ui-elements";
import { useState } from "react";

export default function SchemeDetail() {
  const params = useParams();
  const id = parseInt(params.id || "0");
  const { data: scheme, isLoading, isError } = useGetScheme(id);
  const [activeTab, setActiveTab] = useState<'overview' | 'eligibility' | 'process'>('overview');

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError || !scheme) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center text-center px-4">
        <AlertCircle className="w-16 h-16 text-destructive mb-4" />
        <h2 className="text-2xl font-bold mb-2">Scheme Not Found</h2>
        <p className="text-muted-foreground mb-6">The scheme you are looking for does not exist or an error occurred.</p>
        <Link href="/schemes"><Button>Back to Schemes</Button></Link>
      </div>
    );
  }

  return (
    <main className="flex-1 pt-24 pb-20 bg-background min-h-screen">
      {/* Header Banner */}
      <div className="bg-white border-b border-border pt-8 pb-12 shadow-sm relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/schemes" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft size={16} className="mr-2" /> Back to listings
          </Link>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="default">{scheme.category}</Badge>
            <Badge variant="outline" className="bg-muted text-muted-foreground border-transparent">{scheme.state === 'central' ? 'Central Government' : scheme.state}</Badge>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight mb-6">{scheme.name}</h1>
          
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Building2 size={18} className="text-primary" />
              <span>{scheme.ministry}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-primary" />
              <span>Launched: {new Date(scheme.launchDate).toLocaleDateString()}</span>
            </div>
            {scheme.deadline && (
              <div className="flex items-center gap-2 text-accent font-semibold bg-accent/10 px-3 py-1 rounded-full">
                <Calendar size={18} />
                <span>Deadline: {new Date(scheme.deadline).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Left Column - Main Info */}
          <div className="flex-1">
            {/* Tabs */}
            <div className="flex border-b border-border mb-8 overflow-x-auto custom-scrollbar">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'eligibility', label: 'Eligibility & Docs' },
                { id: 'process', label: 'How to Apply' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-6 py-4 font-semibold text-sm whitespace-nowrap border-b-2 transition-colors ${activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="space-y-12">
              {activeTab === 'overview' && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <section>
                    <h3 className="text-2xl font-bold mb-4">About this scheme</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed bg-white p-6 rounded-2xl border border-border/50 shadow-sm">
                      {scheme.description}
                    </p>
                  </section>
                  
                  <section className="mt-10">
                    <h3 className="text-2xl font-bold mb-6">Key Benefits</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {scheme.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-start gap-3 bg-secondary/5 p-4 rounded-xl border border-secondary/10">
                          <CheckCircle2 className="text-secondary shrink-0 mt-0.5" size={20} />
                          <span className="font-medium text-foreground/80">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              )}

              {activeTab === 'eligibility' && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-10">
                  <section>
                    <h3 className="text-2xl font-bold mb-6">Who is eligible?</h3>
                    <ul className="space-y-4">
                      {scheme.eligibility.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-border shadow-sm">
                          <div className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold">{i+1}</div>
                          <span className="pt-1 text-foreground/80 leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold mb-6">Required Documents</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {scheme.documents.map((doc, i) => (
                        <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-border shadow-sm">
                          <FileText className="text-muted-foreground shrink-0" size={20} />
                          <span className="font-medium">{doc}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              )}

              {activeTab === 'process' && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <h3 className="text-2xl font-bold mb-8">Application Process</h3>
                  <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[1.125rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                    {scheme.steps.map((step, i) => (
                      <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        {/* Marker */}
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 font-bold z-10">
                          {step.stepNumber}
                        </div>
                        {/* Card */}
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-2xl border border-border shadow-md">
                          <h4 className="font-bold text-lg mb-2">{step.title}</h4>
                          <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* FAQs */}
            {scheme.faqs && scheme.faqs.length > 0 && (
              <section className="mt-20 pt-10 border-t border-border">
                <h3 className="text-3xl font-display font-bold mb-8">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  {scheme.faqs.map((faq, i) => (
                    <details key={i} className="group bg-white border border-border rounded-2xl overflow-hidden">
                      <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-6 text-lg hover:text-primary transition-colors">
                        <span>{faq.question}</span>
                        <span className="transition group-open:rotate-180">
                          <ChevronDown size={20} />
                        </span>
                      </summary>
                      <div className="text-muted-foreground px-6 pb-6 pt-0 leading-relaxed border-t border-border/50 mt-2 pt-4">
                        {faq.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column - Action Sidebar */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              <Card className="p-6 bg-gradient-to-br from-primary/5 to-transparent border-primary/20 shadow-xl shadow-primary/5">
                <h4 className="font-bold text-lg mb-2 text-primary">Ready to apply?</h4>
                <p className="text-sm text-muted-foreground mb-6">Make sure you have all required documents ready before proceeding.</p>
                
                {scheme.applicationUrl ? (
                  <a href={scheme.applicationUrl} target="_blank" rel="noopener noreferrer" className="block">
                    <Button className="w-full gap-2 mb-3">
                      Apply on Official Portal <ExternalLink size={16} />
                    </Button>
                  </a>
                ) : (
                  <Button className="w-full mb-3" disabled>Online Application Offline</Button>
                )}
                
                <Button variant="outline" className="w-full gap-2">
                  <Share2 size={16} /> Share Scheme
                </Button>
              </Card>

              <Card className="p-6">
                <h4 className="font-bold mb-4 flex items-center gap-2">
                  <AlertCircle className="text-accent" size={20} /> Important Note
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Information provided here is simplified for ease of understanding. Always refer to the official government guidelines for final authoritative criteria.
                </p>
              </Card>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
