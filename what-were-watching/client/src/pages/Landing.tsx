import { Button } from "@/components/ui/button";
import { Film, Users, Star, Eye } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center space-y-8 mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <Film className="w-12 h-12 text-primary" />
            <h1 className="text-5xl font-heading font-bold" data-testid="text-app-title">
              WatchList
            </h1>
          </div>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The shared movie and TV show tracker designed for couples
          </p>

          <div className="pt-8">
            <Button 
              size="lg" 
              onClick={() => window.location.href = "/api/login"}
              className="px-8 py-6 text-lg"
              data-testid="button-login"
            >
              Get Started
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center p-6 rounded-lg bg-card border">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-heading font-semibold text-lg mb-2">Shared Priority</h3>
            <p className="text-muted-foreground text-sm">
              Both rate titles high? Get the 🔥 MUST WATCH tag to know what to watch next
            </p>
          </div>

          <div className="text-center p-6 rounded-lg bg-card border">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Eye className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-heading font-semibold text-lg mb-2">Progress Tracking</h3>
            <p className="text-muted-foreground text-sm">
              Track individual progress and get spoiler alerts when one person is ahead
            </p>
          </div>

          <div className="text-center p-6 rounded-lg bg-card border">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Star className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-heading font-semibold text-lg mb-2">Auto Metadata</h3>
            <p className="text-muted-foreground text-sm">
              Just search for a title - we'll automatically fetch posters, runtime, and plot
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
