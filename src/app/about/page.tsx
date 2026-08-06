"use client";

import { motion } from "framer-motion";
import { User, Mountain, Utensils } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 bg-background text-foreground">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">About The Homestay</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Welcome to The Kanatal Homestay by Saur Properties, a peaceful mountain retreat hosted by Suraj Singh Negi where comfort meets the untouched beauty of the Himalayas.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden border border-border">
            <Image src="/hero-kanatal.png" alt="Saur Properties Homestay" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
                <p className="text-xl font-medium text-white mb-2">"Come as a guest and leave as family."</p>
                <p className="text-white/70">- Suraj Singh Negi (Host)</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="space-y-8">
            <div className="flex gap-4">
              <div className="p-4 bg-primary/10 rounded-full h-fit text-primary"><User size={24} /></div>
              <div>
                <h3 className="text-2xl font-semibold mb-2">Our Hospitality</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Whether you are planning a family vacation, a romantic getaway or a peaceful work from mountains stay, we ensure a comfortable and memorable experience. At The Kanatal Homestay by Saur Properties, we do not just offer a stay, we offer warmth, care and a true mountain experience.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="p-4 bg-secondary/10 rounded-full h-fit text-secondary"><Mountain size={24} /></div>
              <div>
                <h3 className="text-2xl font-semibold mb-2">The Location</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Located close to Surkanda Devi Temple and Tehri Lake, our homestay is an ideal base for sightseeing and adventure activities.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="p-4 bg-foreground/5 rounded-full h-fit text-foreground"><Utensils size={24} /></div>
              <div>
                <h3 className="text-2xl font-semibold mb-2">Pure Vegetarian Dining</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Guests can enjoy scenic mountain and valley views, clean and comfortable rooms, home style freshly prepared meals, and bonfire evenings under the stars.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
