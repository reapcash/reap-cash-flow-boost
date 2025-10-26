import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote: "Reap Cash helped me scale my business quickly. The process was seamless and fast!",
    author: "Sarah Mitchell",
    role: "Property Manager",
    location: "Miami, FL",
  },
  {
    id: 2,
    quote: "I got the funds I needed in under 24 hours. This is a game-changer!",
    author: "David Chen",
    role: "Vacation Rental Host",
    location: "San Diego, CA",
  },
  {
    id: 3,
    quote: "Finally, a financing solution that understands the short-term rental business. Highly recommended!",
    author: "Emily Rodriguez",
    role: "Multi-Property Owner",
    location: "Austin, TX",
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
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-secondary mb-4">
            What Hosts Are Saying
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-3xl p-8 lg:p-12 relative">
            <Quote className="absolute top-8 left-8 w-12 h-12 text-primary/20" />
            
            <div className="relative z-10 min-h-[200px] flex flex-col justify-center">
              <p className="text-2xl lg:text-3xl text-foreground mb-8 italic leading-relaxed">
                "{testimonials[currentIndex].quote}"
              </p>
              
              <div className="space-y-1">
                <p className="font-bold text-secondary text-xl">
                  {testimonials[currentIndex].author}
                </p>
                <p className="text-muted-foreground">
                  {testimonials[currentIndex].role}
                </p>
                <p className="text-sm text-muted-foreground">
                  {testimonials[currentIndex].location}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={previous}
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex ? "bg-primary w-8" : "bg-border"
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
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
