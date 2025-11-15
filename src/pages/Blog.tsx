import { Calendar, Clock, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const blogPosts = [
  {
    id: 1,
    title: "Maximizing Your Short-Term Rental Revenue in 2025",
    excerpt: "Discover proven strategies to increase your Airbnb booking rates and optimize your pricing for maximum profitability.",
    date: "March 15, 2025",
    readTime: "5 min read",
    category: "Revenue Optimization",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    title: "Understanding Revenue-Based Financing for STR Hosts",
    excerpt: "Learn how revenue-based financing works and why it's the perfect funding solution for short-term rental property owners.",
    date: "March 10, 2025",
    readTime: "7 min read",
    category: "Financing",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    title: "5 Ways to Prepare Your Property for Peak Season",
    excerpt: "Get your short-term rental ready for the busiest booking season with these essential preparation tips.",
    date: "March 5, 2025",
    readTime: "4 min read",
    category: "Property Management",
    image: "/placeholder.svg"
  },
  {
    id: 4,
    title: "The Future of Short-Term Rentals: 2025 Trends",
    excerpt: "Stay ahead of the curve with insights into emerging trends shaping the short-term rental industry.",
    date: "February 28, 2025",
    readTime: "6 min read",
    category: "Industry Insights",
    image: "/placeholder.svg"
  },
  {
    id: 5,
    title: "Tax Benefits for Short-Term Rental Owners",
    excerpt: "Navigate the tax landscape and discover deductions that can significantly reduce your tax burden.",
    date: "February 20, 2025",
    readTime: "8 min read",
    category: "Finance",
    image: "/placeholder.svg"
  },
  {
    id: 6,
    title: "Building Your STR Portfolio: A Step-by-Step Guide",
    excerpt: "Learn how to scale from one property to a profitable portfolio of short-term rentals.",
    date: "February 15, 2025",
    readTime: "10 min read",
    category: "Growth Strategy",
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
        <section className="pt-32 pb-16 px-4 bg-gradient-to-br from-primary/5 via-background to-muted/10">
          <div className="container mx-auto max-w-7xl text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
              REAP Insights & Resources
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Expert advice, industry insights, and actionable strategies to help you succeed in the short-term rental business.
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 px-4 border-b bg-background/50 backdrop-blur-sm sticky top-16 z-40">
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === "All" ? "default" : "outline"}
                  size="sm"
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Card key={post.id} className="group hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                  <div className="aspect-video bg-muted overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                    </div>
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                        {post.category}
                      </span>
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" className="group/btn p-0 h-auto font-semibold">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 px-4 bg-gradient-to-br from-primary/5 to-muted/10">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Stay Updated with REAP
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Get the latest insights, tips, and industry news delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-md border border-input bg-background text-foreground"
              />
              <Button size="lg">
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
