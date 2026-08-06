"use client";

import { motion } from "framer-motion";
import { Car, MapPin, Compass, Plane, Map as MapIcon } from "lucide-react";

export default function DirectionsPage() {
  const steps = [
    { title: "Arrive at Dehradun (Jolly Grant Airport) or Haridwar Railway Station", icon: <Plane size={24}/>, desc: "This is your primary entry point into Uttarakhand. Dehradun is approx 80 km away." },
    { title: "Drive Towards Mussoorie / Chamba", icon: <Compass size={24}/>, desc: "Take the scenic winding roads via Mussoorie or the Dhanaulti-Chamba route." },
    { title: "Reach Kanatal (Chamba-Mussoorie Road)", icon: <Car size={24}/>, desc: "The homestay is located in Village Saur, right off the main Chamba-Mussoorie road." },
    { title: "Look for Club Mahindra", icon: <MapIcon size={24}/>, desc: "Our property is near the famous Club Mahindra Kanatal. Call us when you arrive here!" }
  ];

  return (
    <main className="min-h-screen pt-32 pb-20 bg-background text-foreground">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">How to Reach Us</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Your journey to the serene mountains of Kanatal starts here. We are located in Village Saur on the scenic Chamba-Mussoorie road.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Animated Travel Timeline */}
          <div>
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3"><Compass className="text-primary"/> The Scenic Route</h2>
            <div className="relative border-l-2 border-primary/20 ml-6 space-y-12 pb-8">
              {steps.map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2, type: "spring", stiffness: 100 }}
                  className="relative pl-10"
                >
                  <div className="absolute -left-[21px] top-0 bg-background border-2 border-primary rounded-full p-2 text-primary shadow-[0_0_15px_rgba(234,88,12,0.4)]">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.desc}</p>
                </motion.div>
              ))}
              
              {/* Animated Vehicle traveling down the line */}
              <motion.div 
                className="absolute -left-[14px] top-0 text-secondary z-10 bg-background rounded-full p-1 border border-secondary"
                animate={{ top: ["0%", "100%"] }}
                transition={{ duration: 5, ease: "linear", repeat: Infinity }}
              >
                 <Car size={16} />
              </motion.div>
            </div>
          </div>

          {/* Interactive Google Map */}
          <div>
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3"><MapPin className="text-primary"/> Interactive Map</h2>
            <div className="bg-muted/10 p-4 rounded-3xl border border-border shadow-2xl">
              <div className="rounded-2xl overflow-hidden h-[450px] w-full relative bg-muted/20">
                 <iframe 
                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13768.188825838428!2d78.3375836!3d30.4072221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3908d7454cd22d8d%3A0xc3afbf6bc7d8531e!2sThe%20Kanatal%20Homestay%20by%20Saur%20Properties!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                   width="100%" 
                   height="100%" 
                   style={{ border: 0 }} 
                   allowFullScreen 
                   loading="lazy" 
                   referrerPolicy="no-referrer-when-downgrade"
                   className="absolute inset-0"
                 />
              </div>
              <div className="mt-6 flex justify-between items-center px-2">
                 <div>
                    <h4 className="font-semibold text-lg">Village Saur, Kanatal</h4>
                    <p className="text-sm text-muted-foreground">Uttarakhand 249145</p>
                 </div>
                 <a href="https://maps.app.goo.gl/k3xH3K1t8zZ6qQ5D8" target="_blank" className="bg-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors">
                    Open in Maps
                 </a>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </main>
  );
}
