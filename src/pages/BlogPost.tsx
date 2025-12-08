import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Share2, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// Import blog images
import blogStrRevenue from "@/assets/blog-str-revenue.jpg";
import blogRbfFinancing from "@/assets/blog-rbf-financing.jpg";
import blogPeakSeason from "@/assets/blog-peak-season.jpg";
import blogStrTrends from "@/assets/blog-str-trends.jpg";
import blogTaxBenefits from "@/assets/blog-tax-benefits.jpg";
import blogStrPortfolio from "@/assets/blog-str-portfolio.jpg";

const blogPosts = [
  {
    id: 1,
    slug: "maximizing-str-revenue-2025",
    title: "Maximizing Your Short-Term Rental Revenue in 2025",
    excerpt: "Discover proven strategies to increase your Airbnb booking rates and optimize your pricing for maximum profitability.",
    content: `
      <p class="lead">The short-term rental landscape continues to evolve rapidly, and 2025 presents both challenges and unprecedented opportunities for hosts who adapt their strategies accordingly.</p>
      
      <h2>Understanding Dynamic Pricing</h2>
      <p>Dynamic pricing is no longer optional—it's essential. The most successful hosts in 2025 are leveraging AI-powered pricing tools that adjust rates in real-time based on demand, local events, competitor pricing, and seasonal trends.</p>
      
      <h2>Optimizing Your Listing</h2>
      <p>Your listing is your storefront. Professional photography, compelling descriptions, and strategic keyword placement can increase your visibility by up to 40%. Focus on what makes your property unique and address the needs of your target guest demographic.</p>
      
      <h2>Guest Experience Excellence</h2>
      <p>Five-star reviews drive bookings. Consider implementing automated check-in systems, providing local experience guides, and maintaining impeccable cleanliness standards. Small touches like welcome baskets or personalized recommendations can transform a good stay into an exceptional one.</p>
      
      <h2>Diversifying Your Platforms</h2>
      <p>While Airbnb remains dominant, successful hosts are diversifying across multiple platforms including VRBO, Booking.com, and direct booking websites. This reduces dependency on any single platform and maximizes occupancy rates.</p>
    `,
    date: "March 15, 2025",
    readTime: "5 min read",
    category: "Revenue Optimization",
    author: "Sarah Mitchell",
    authorRole: "STR Strategy Expert",
    image: blogStrRevenue
  },
  {
    id: 2,
    slug: "revenue-based-financing-str-hosts",
    title: "Understanding Revenue-Based Financing for STR Hosts",
    excerpt: "Learn how revenue-based financing works and why it's the perfect funding solution for short-term rental property owners.",
    content: `
      <p class="lead">Traditional bank loans often don't work for short-term rental operators. Revenue-based financing offers a flexible alternative that aligns with the unique cash flow patterns of STR businesses.</p>
      
      <h2>What is Revenue-Based Financing?</h2>
      <p>Revenue-based financing (RBF) provides capital in exchange for a percentage of your future revenue. Unlike traditional loans, there are no fixed monthly payments—your repayment adjusts based on your actual income.</p>
      
      <h2>Why RBF Works for STR Hosts</h2>
      <p>Short-term rentals experience seasonal fluctuations. During peak seasons, you repay more; during slower periods, your payments decrease automatically. This flexibility protects your cash flow and reduces financial stress.</p>
      
      <h2>Qualification Criteria</h2>
      <p>Lenders typically evaluate your booking history, revenue trends, and property performance rather than personal credit scores. This makes RBF accessible to hosts who might not qualify for traditional financing.</p>
      
      <h2>Strategic Uses of RBF Capital</h2>
      <p>Smart hosts use RBF for property upgrades, new property acquisitions, marketing investments, or bridging seasonal gaps. The key is ensuring the capital generates returns that exceed the financing cost.</p>
    `,
    date: "March 10, 2025",
    readTime: "7 min read",
    category: "Financing",
    author: "Michael Chen",
    authorRole: "Financial Advisor",
    image: blogRbfFinancing
  },
  {
    id: 3,
    slug: "prepare-property-peak-season",
    title: "5 Ways to Prepare Your Property for Peak Season",
    excerpt: "Get your short-term rental ready for the busiest booking season with these essential preparation tips.",
    content: `
      <p class="lead">Peak season can make or break your annual revenue. Proper preparation ensures you capture maximum bookings while delivering exceptional guest experiences.</p>
      
      <h2>1. Deep Clean and Maintenance Audit</h2>
      <p>Schedule a comprehensive deep clean and maintenance inspection before peak season begins. Address any repairs, update worn items, and ensure all systems are functioning optimally.</p>
      
      <h2>2. Refresh Your Photography</h2>
      <p>Outdated photos hurt your booking rate. Invest in professional photography that showcases your property in its best light, including any recent upgrades or seasonal features.</p>
      
      <h2>3. Update Your Amenities</h2>
      <p>Review guest feedback and competitor listings. Consider adding high-demand amenities like high-speed WiFi upgrades, streaming services, or outdoor entertainment areas.</p>
      
      <h2>4. Optimize Your Calendar</h2>
      <p>Set appropriate minimum stays, adjust pricing for peak dates, and block time for turnover between guests. Strategic calendar management maximizes revenue while maintaining quality.</p>
      
      <h2>5. Strengthen Your Team</h2>
      <p>Ensure your cleaning crew, maintenance contacts, and backup resources are confirmed and ready. Peak season is not the time for team gaps.</p>
    `,
    date: "March 5, 2025",
    readTime: "4 min read",
    category: "Property Management",
    author: "Jennifer Brooks",
    authorRole: "Property Manager",
    image: blogPeakSeason
  },
  {
    id: 4,
    slug: "future-str-2025-trends",
    title: "The Future of Short-Term Rentals: 2025 Trends",
    excerpt: "Stay ahead of the curve with insights into emerging trends shaping the short-term rental industry.",
    content: `
      <p class="lead">The short-term rental industry is at an inflection point. Understanding emerging trends is crucial for hosts who want to stay competitive in an evolving market.</p>
      
      <h2>AI-Powered Guest Services</h2>
      <p>Artificial intelligence is transforming guest communication. Smart chatbots handle inquiries 24/7, while AI concierges provide personalized recommendations that enhance the guest experience.</p>
      
      <h2>Sustainability Focus</h2>
      <p>Eco-conscious travelers increasingly prefer sustainable accommodations. Properties with solar power, water conservation systems, and eco-friendly amenities command premium rates.</p>
      
      <h2>Extended Stay Growth</h2>
      <p>Remote work has permanently changed travel patterns. Properties optimized for 30+ day stays are seeing increased demand from digital nomads and remote workers.</p>
      
      <h2>Regulatory Evolution</h2>
      <p>Cities worldwide are implementing new STR regulations. Successful hosts proactively ensure compliance while advocating for reasonable policies through industry associations.</p>
    `,
    date: "February 28, 2025",
    readTime: "6 min read",
    category: "Industry Insights",
    author: "David Park",
    authorRole: "Industry Analyst",
    image: blogStrTrends
  },
  {
    id: 5,
    slug: "tax-benefits-str-owners",
    title: "Tax Benefits for Short-Term Rental Owners",
    excerpt: "Navigate the tax landscape and discover deductions that can significantly reduce your tax burden.",
    content: `
      <p class="lead">Short-term rental ownership offers significant tax advantages when properly structured. Understanding these benefits can dramatically improve your bottom line.</p>
      
      <h2>Depreciation Deductions</h2>
      <p>Property depreciation is one of the most powerful tax benefits available to STR owners. You can deduct the cost of your property over 27.5 years, creating substantial paper losses that offset rental income.</p>
      
      <h2>Operating Expense Deductions</h2>
      <p>Nearly all costs associated with running your STR are deductible: cleaning fees, supplies, utilities, insurance, property management, marketing, and professional services.</p>
      
      <h2>Home Office Deduction</h2>
      <p>If you manage your rentals from home, you may qualify for home office deductions covering a portion of your housing costs, internet, and phone expenses.</p>
      
      <h2>Cost Segregation Studies</h2>
      <p>A cost segregation study can accelerate depreciation on certain property components, potentially generating significant first-year tax savings for new property acquisitions.</p>
    `,
    date: "February 20, 2025",
    readTime: "8 min read",
    category: "Finance",
    author: "Amanda Torres",
    authorRole: "Tax Specialist",
    image: blogTaxBenefits
  },
  {
    id: 6,
    slug: "building-str-portfolio",
    title: "Building Your STR Portfolio: A Step-by-Step Guide",
    excerpt: "Learn how to scale from one property to a profitable portfolio of short-term rentals.",
    content: `
      <p class="lead">Scaling from a single property to a portfolio requires strategic planning, proper systems, and access to capital. Here's how successful hosts build rental empires.</p>
      
      <h2>Perfect Your First Property</h2>
      <p>Before scaling, ensure your first property runs like clockwork. Document all processes, optimize your systems, and achieve consistent profitability and reviews.</p>
      
      <h2>Build Your Team</h2>
      <p>You can't scale alone. Develop relationships with reliable cleaners, maintenance professionals, property managers, and other service providers who can grow with you.</p>
      
      <h2>Secure Financing</h2>
      <p>Explore financing options including conventional mortgages, DSCR loans, private money, and revenue-based financing. Having multiple funding sources enables faster growth.</p>
      
      <h2>Choose Markets Strategically</h2>
      <p>Diversify across markets with different demand drivers—beach, mountain, urban, and event-driven destinations each have unique risk profiles and seasonality.</p>
      
      <h2>Implement Technology</h2>
      <p>Property management software, dynamic pricing tools, and smart home technology become essential as you scale. Invest in systems that automate repetitive tasks.</p>
    `,
    date: "February 15, 2025",
    readTime: "10 min read",
    category: "Growth Strategy",
    author: "Robert Hayes",
    authorRole: "Portfolio Investor",
    image: blogStrPortfolio
  }
];

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const post = blogPosts.find(p => p.slug === slug);
  
  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
            <Button onClick={() => navigate('/blog')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedPosts = blogPosts.filter(p => p.id !== post.id && p.category === post.category).slice(0, 2);
  const otherPosts = relatedPosts.length < 2 
    ? [...relatedPosts, ...blogPosts.filter(p => p.id !== post.id && !relatedPosts.includes(p)).slice(0, 2 - relatedPosts.length)]
    : relatedPosts;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-muted/30">
          <div className="container mx-auto max-w-4xl px-4 py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground truncate max-w-[200px]">{post.title}</span>
            </nav>
          </div>
        </div>

        {/* Article Header */}
        <article className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
          <header className="mb-8 md:mb-12">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wide uppercase rounded-full bg-primary/10 text-primary">
                {post.category}
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6 text-foreground tracking-tight">
              {post.title}
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
              {post.excerpt}
            </p>
            
          </header>

          {/* Featured Image */}
          <div className="aspect-[21/9] rounded-xl overflow-hidden bg-muted mb-10 md:mb-14">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Actions */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/blog')}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Button>
            
            <Button variant="outline" size="sm" className="gap-2">
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </Button>
          </div>

          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none
              prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
              prose-lead:text-xl prose-lead:text-foreground prose-lead:font-normal prose-lead:leading-relaxed
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground prose-strong:font-semibold
            "
            dangerouslySetInnerHTML={{ __html: post.content }}
          />


          {/* Related Articles */}
          {otherPosts.length > 0 && (
            <section className="mt-14 md:mt-20">
              <h2 className="text-2xl font-bold mb-6 text-foreground">Continue Reading</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {otherPosts.map((related) => (
                  <Link 
                    key={related.id} 
                    to={`/blog/${related.slug}`}
                    className="group block p-5 rounded-xl border bg-card hover:shadow-lg transition-all duration-300"
                  >
                    <span className="inline-block px-2.5 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary mb-3">
                      {related.category}
                    </span>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                      {related.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {related.excerpt}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{related.date}</span>
                      <span>·</span>
                      <span>{related.readTime}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Back to Blog CTA */}
          <div className="mt-14 text-center">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/blog')}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              View All Articles
            </Button>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
