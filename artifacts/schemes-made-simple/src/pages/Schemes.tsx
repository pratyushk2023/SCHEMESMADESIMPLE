import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useListSchemes, useListCategories } from "@workspace/api-client-react";
import { Search, Filter, ChevronRight, FileText, CalendarDays, Building2 } from "lucide-react";
import { Button, Input, Card, Badge } from "@/components/ui-elements";

export default function Schemes() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [state, setState] = useState(searchParams.get("state") || "");
  const [page, setPage] = useState(1);

  const { data: schemesData, isLoading: isSchemesLoading } = useListSchemes({
    search: search || undefined,
    category: category || undefined,
    state: state || undefined,
    page,
    limit: 12
  });

  const { data: categoriesData } = useListCategories();

  // Handle local state to URL sync (optional, keeping it simple with just state for now, but good to have)
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1); // Reset to page 1 on new search
  };

  return (
    <main className="flex-1 pt-24 pb-20 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-display font-bold mb-4">Welfare Schemes</h1>
          <p className="text-lg text-muted-foreground">Find and filter government initiatives applicable to you.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="w-full lg:w-72 flex-shrink-0 space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-2 font-bold text-lg mb-6 pb-4 border-b border-border">
                <Filter size={20} className="text-primary" /> Filters
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-foreground">State / Region</label>
                  <select 
                    value={state}
                    onChange={(e) => { setState(e.target.value); setPage(1); }}
                    className="w-full rounded-xl border-2 border-border bg-white px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                  >
                    <option value="">All Regions</option>
                    <option value="central">Central Government</option>
                    <option value="maharashtra">Maharashtra</option>
                    <option value="karnataka">Karnataka</option>
                    <option value="delhi">Delhi</option>
                    {/* Add more as needed */}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-foreground">Category</label>
                  <div className="space-y-2">
                    <button 
                      onClick={() => { setCategory(""); setPage(1); }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${category === "" ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-muted text-muted-foreground'}`}
                    >
                      All Categories
                    </button>
                    {categoriesData?.categories?.map((cat) => (
                      <button 
                        key={cat}
                        onClick={() => { setCategory(cat); setPage(1); }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${category === cat ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-muted text-muted-foreground'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input 
                  type="text" 
                  placeholder="Search by scheme name, keyword..." 
                  className="pl-12"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Button type="submit">Search</Button>
            </form>

            {/* Results */}
            {isSchemesLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <Card key={i} className="p-6 h-64 animate-pulse bg-muted/50 border-0" />
                ))}
              </div>
            ) : schemesData?.schemes.length === 0 ? (
              <Card className="p-12 text-center flex flex-col items-center">
                <FileText className="w-16 h-16 text-muted-foreground/30 mb-4" />
                <h3 className="text-xl font-bold mb-2">No schemes found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
                <Button variant="outline" className="mt-6" onClick={() => { setSearch(""); setCategory(""); setState(""); }}>
                  Clear Filters
                </Button>
              </Card>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  {schemesData?.schemes.map((scheme) => (
                    <Card key={scheme.id} className="flex flex-col p-6 hover:border-primary/30 transition-colors">
                      <div className="flex justify-between items-start mb-4">
                        <Badge variant="default" className="mb-2">{scheme.category}</Badge>
                        <Badge variant="outline" className="bg-muted text-muted-foreground border-transparent">{scheme.state === 'central' ? 'Central' : scheme.state}</Badge>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2 line-clamp-2">{scheme.name}</h3>
                      <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1">
                        {scheme.description}
                      </p>
                      
                      <div className="space-y-2 mb-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Building2 size={16} />
                          <span className="truncate">{scheme.ministry}</span>
                        </div>
                        {scheme.deadline && (
                          <div className="flex items-center gap-2 text-accent font-medium">
                            <CalendarDays size={16} />
                            <span>Deadline: {new Date(scheme.deadline).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>

                      <div className="mt-auto pt-4 border-t border-border">
                        <Link href={`/scheme/${scheme.id}`}>
                          <Button variant="ghost" className="w-full justify-between px-0 hover:bg-transparent text-primary hover:text-primary/80 group">
                            View Details 
                            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Pagination */}
                {schemesData && schemesData.totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                    >
                      Previous
                    </Button>
                    <span className="px-4 font-medium text-sm text-muted-foreground">
                      Page {page} of {schemesData.totalPages}
                    </span>
                    <Button 
                      variant="outline" 
                      onClick={() => setPage(p => Math.min(schemesData.totalPages, p + 1))}
                      disabled={page === schemesData.totalPages}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
