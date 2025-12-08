import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const blogPosts = [
  {
    id: 1,
    slug: "maximizing-str-revenue-2025",
    title: "Maximizing Your Short-Term Rental Revenue in 2025",
    excerpt: "Discover proven strategies to increase your Airbnb booking rates and optimize your pricing for maximum profitability.",
    date: "March 15, 2025",
    readTime: "5 min read",
    category: "Revenue Optimization",
    author: "Sarah Mitchell",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    slug: "revenue-based-financing-str-hosts",
    title: "Understanding Revenue-Based Financing for STR Hosts",
    excerpt: "Learn how revenue-based financing works and why it's the perfect funding solution for short-term rental property owners.",
    date: "March 10, 2025",
    readTime: "7 min read",
    category: "Financing",
    author: "Michael Chen",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    slug: "prepare-property-peak-season",
    title: "5 Ways to Prepare Your Property for Peak Season",
    excerpt: "Get your short-term rental ready for the busiest booking season with these essential preparation tips.",
    date: "March 5, 2025",
    readTime: "4 min read",
    category: "Property Management",
    author: "Jennifer Brooks",
    image: "/placeholder.svg"
  },
  {
    id: 4,
    slug: "future-str-2025-trends",
    title: "The Future of Short-Term Rentals: 2025 Trends",
    excerpt: "Stay ahead of the curve with insights into emerging trends shaping the short-term rental industry.",
    date: "February 28, 2025",
    readTime: "6 min read",
    category: "Industry Insights",
    author: "David Park",
    image: "/placeholder.svg"
  },
  {
    id: 5,
    slug: "tax-benefits-str-owners",
    title: "Tax Benefits for Short-Term Rental Owners",
    excerpt: "Navigate the tax landscape and discover deductions that can significantly reduce your tax burden.",
    date: "February 20, 2025",
    readTime: "8 min read",
    category: "Finance",
    author: "Amanda Torres",
    image: "/placeholder.svg"
  },
  {
    id: 6,
    slug: "building-str-portfolio",
    title: "Building Your STR Portfolio: A Step-by-Step Guide",
    excerpt: "Learn how to scale from one property to a profitable portfolio of short-term rentals.",
    date: "February 15, 2025",
    readTime: "10 min read",
    category: "Growth Strategy",
    author: "Robert Hayes",
    image: "/placeholder.svg"
  }
];

const categories = ["All", "Revenue Optimization", "Financing", "Property Management", "Industry Insights", "Finance", "Growth Strategy"];

export default function Blog() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-14 md:pb-16 px-4 bg-gradient-to-br from-primary/5 via-background to-muted/10">
          <div className="container mx-auto max-w-7xl text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-foreground px-2">
              REAP Insights & Resources
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              Expert advice, industry insights, and actionable strategies to help you succeed in the short-term rental business.
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-4 sm:py-6 md:py-8 px-3 sm:px-4 border-b bg-background/50 backdrop-blur-sm sticky top-16 z-40">
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === "All" ? "default" : "outline"}
                  size="sm"
                  className="rounded-full text-xs sm:text-sm h-8 sm:h-9 px-3 sm:px-4"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-10 sm:py-12 md:py-16 px-4">
          <div className="container mx-auto max-w-7xl">
            {/* Featured Post */}
            <Link 
              to={`/blog/${blogPosts[0].slug}`}
              className="group block mb-10 md:mb-14"
            >
              <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center p-6 md:p-8 rounded-2xl border bg-card hover:shadow-xl transition-all duration-300">
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-muted order-2 md:order-1">
                  <img
                    src={blogPosts[0].image}
                    alt={blogPosts[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="order-1 md:order-2">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wide uppercase rounded-full bg-primary text-primary-foreground">
                      Featured
                    </span>
                    <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                      {blogPosts[0].category}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors leading-tight">
                    {blogPosts[0].title}
                  </h2>
                  <p className="text-muted-foreground mb-6 line-clamp-3 text-base md:text-lg leading-relaxed">
                    {blogPosts[0].excerpt}
                  </p>
                  <span className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                    Read Article
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>

            {/* Grid of Other Posts */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {blogPosts.slice(1).map((post) => (
                <Link 
                  key={post.id} 
                  to={`/blog/${post.slug}`}
                  className="group block"
                >
                  <article className="h-full flex flex-col rounded-xl border bg-card overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="aspect-[16/10] bg-muted overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 flex flex-col p-5 sm:p-6">
                      <div className="mb-3">
                        <span className="inline-block px-2.5 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary">
                          {post.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-end pt-4 border-t">
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                          Read
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-12 sm:py-14 md:py-16 px-4 bg-gradient-to-br from-primary/5 to-muted/10">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-foreground px-2">
              Stay Updated with REAP
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 px-4">
              Get the latest insights, tips, and industry news delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-center max-w-md mx-auto px-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-md border border-input bg-background text-foreground"
              />
              <Button size="lg" className="h-10 sm:h-11 text-sm sm:text-base">
                Subscribe
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
