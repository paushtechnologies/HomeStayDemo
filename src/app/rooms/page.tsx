"use client";

import { motion } from "framer-motion";
import { BedDouble, Check } from "lucide-react";
import Image from "next/image";

export default function RoomsPage() {
  const rooms = [
    {
      title: "Luxury Room",
      description: "Our finest accommodation offering premium comfort, expansive views, and elegant Garhwali decor.",
      features: ["King size bed", "Mountain facing", "Premium amenities", "Free Wi-Fi"],
      price: "₹3,500 / night",
      image: "/real-room-1.jpg"
    },
    {
      title: "Deluxe Room (With Balcony)",
      description: "Wake up and step directly into the morning mist on your private balcony.",
      features: ["Private balcony", "Queen size bed", "Garden view", "Free Wi-Fi"],
      price: "₹2,800 / night",
      image: "/real-room-2.jpg"
    },
    {
      title: "Deluxe Room (Without Balcony)",
      description: "A cozy, warm, and authentic room perfect for couples seeking peaceful rest after a long day of trekking.",
      features: ["Queen size bed", "Cozy interiors", "Free Wi-Fi"],
      price: "₹2,200 / night",
      image: "/real-room-3.jpg"
    }
  ];

  return (
    <main className="min-h-screen pt-32 pb-20 bg-background">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground tracking-tight">Accommodation</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Thoughtfully designed rooms that blend modern comfort with traditional homestay warmth.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mt-12">
          {rooms.map((room, i) => (
             <motion.div 
               key={room.title}
               initial={{ opacity: 0, y: 20 }} 
               whileInView={{ opacity: 1, y: 0 }} 
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }} 
               className="bg-muted/10 border border-border rounded-3xl hover:bg-muted/30 transition-colors group relative overflow-hidden flex flex-col"
             >
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 transition-transform origin-left z-20" />
               
               <div className="relative w-full h-64 overflow-hidden rounded-t-3xl border-b border-border">
                 <Image 
                   src={room.image} 
                   alt={room.title} 
                   fill 
                   className="object-cover transition-transform duration-700 group-hover:scale-110" 
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-50" />
               </div>

               <div className="p-8 flex flex-col flex-1">
                 <BedDouble size={28} className="text-primary mb-6" />
                 <h2 className="text-2xl font-semibold mb-3 text-foreground">{room.title}</h2>
                 <p className="text-muted-foreground text-sm mb-6 leading-relaxed flex-1">{room.description}</p>
                 <div className="space-y-3 mb-6">
                   {room.features.map(f => (
                     <div key={f} className="flex items-center gap-2 text-sm font-medium text-foreground/80">
                       <Check size={16} className="text-secondary" />
                       {f}
                     </div>
                   ))}
                 </div>
                 <div className="text-2xl font-bold text-foreground">
                    {room.price}
                 </div>
                 <button className="w-full mt-6 py-3 rounded-xl border border-primary/20 text-primary font-medium hover:bg-primary hover:text-primary-foreground transition-colors relative overflow-hidden">
                   Check Availability
                 </button>
               </div>
             </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
