import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote: "I no longer wait 45 days for my commission — REAP lets me reinvest faster.",
    author: "Sarah Martinez",
    role: "Real Estate Agent",
    location: "Austin, TX",
  },
  {
    id: 2,
    quote: "The platform feels built for us — clean, transparent, and fast.",
    author: "James Chen",
    role: "Property Manager",
    location: "San Diego, CA",
  },
  {
    id: 3,
    quote: "REAP helped me bridge the gap between projects without taking on traditional loans.",
    author: "Emily Rodriguez",
    role: "Contractor",
    location: "Miami, FL",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const previous = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 sm:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-primary tracking-wide uppercase mb-3">
            Testimonials
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-foreground">
            What Professionals Are Saying
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-card border border-border rounded-xl p-8 sm:p-10 lg:p-12 relative">
            <Quote className="absolute top-8 left-8 w-10 h-10 text-primary/10" />

            <div className="relative z-10 min-h-[180px] flex flex-col justify-center">
              <p className="text-xl sm:text-2xl text-foreground mb-8 leading-relaxed">
                "{testimonials[currentIndex].quote.split("REAP").map((part, i, arr) =>
                  i < arr.length - 1 ? (
                    <span key={i}>
                      {part}
                      <span className="text-primary">REAP</span>
                    </span>
                  ) : (
                    part
                  )
                )}"
              </p>

              <div>
                <p className="text-base font-medium text-foreground">
                  {testimonials[currentIndex].author}
                </p>
                <p className="text-sm text-muted-foreground">
                  {testimonials[currentIndex].role} • {testimonials[currentIndex].location}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 mt-8 pt-6 border-t border-border">
              <Button
                variant="outline"
                size="icon"
                onClick={previous}
                aria-label="Previous testimonial"
                className="h-9 w-9"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex ? "bg-primary w-6" : "bg-border"
                    }`}
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={next}
                aria-label="Next testimonial"
                className="h-9 w-9"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
