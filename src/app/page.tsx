import { ArrowRight, MapPin, User, Mountain, Utensils, BedDouble, Check, Compass, Car, Map as MapIcon, Plane } from "lucide-react";
import Image from "next/image";
import { ContactForm } from "@/components/ContactForm";
import { AnimatedTimelineCar } from "@/components/AnimatedTimelineCar";
import { client } from "../../sanity/lib/client";

// Define the Room interface
interface Room {
  title: string;
  description: string;
  features: string[];
  price: string;
  image: string;
}

export default async function Home() {
  
  // Fallback hardcoded rooms in case Sanity is not configured yet
  const fallbackRooms: Room[] = [
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

  // Try to fetch rooms from Sanity
  let rooms: Room[] = fallbackRooms;
  try {
    const sanityRooms = await client.fetch(`*[_type == "room"]{
      title, 
      description, 
      features, 
      price, 
      "image": image.asset->url
    }`);
    if (sanityRooms && sanityRooms.length > 0) {
      rooms = sanityRooms;
    }
  } catch (error) {
    console.warn("Sanity is not yet configured. Using fallback local data.");
  }

  const steps = [
    { title: "Arrive at Dehradun (Jolly Grant Airport) or Haridwar Railway Station", icon: <Plane size={24}/>, desc: "This is your primary entry point into Uttarakhand. Dehradun is approx 80 km away." },
    { title: "Drive Towards Mussoorie / Chamba", icon: <Compass size={24}/>, desc: "Take the scenic winding roads via Mussoorie or the Dhanaulti-Chamba route." },
    { title: "Reach Kanatal (Chamba-Mussoorie Road)", icon: <Car size={24}/>, desc: "The homestay is located in Village Saur, right off the main Chamba-Mussoorie road." },
    { title: "Look for Club Mahindra", icon: <MapIcon size={24}/>, desc: "Our property is near the famous Club Mahindra Kanatal. Call us when you arrive here!" }
  ];

  return (
    <main className="flex-1 flex flex-col min-h-screen relative overflow-x-hidden bg-background">
      {/* Photorealistic Background with Premium Fade */}
      <div className="absolute inset-0 z-0 pointer-events-none h-screen">
        <Image
          src="/hero-kanatal.png"
          alt="Majestic Kanatal Sunset Background"
          fill
          priority
          className="object-cover opacity-60 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
        <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] rounded-full bg-primary/20 blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-secondary/10 blur-[150px] mix-blend-screen" />
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center pt-32 pb-24 min-h-screen justify-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-background/50 text-foreground shadow-lg backdrop-blur-xl text-sm font-medium mb-8">
          <MapPin size={16} className="text-secondary" />
          <span>Village Saur, Kanatal, Uttarakhand</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter text-foreground mb-6 max-w-5xl leading-[1.1] drop-shadow-md">
          Welcome to The Kanatal Homestay by <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Saur Properties</span>
        </h1>

        <p className="text-lg md:text-xl text-foreground max-w-3xl mb-12 leading-relaxed drop-shadow-md font-medium">
          A peaceful mountain retreat hosted by Suraj Singh Negi where comfort meets the untouched beauty of the Himalayas. Nestled in the serene hills of Kanatal, our homestay offers a perfect escape from the chaos of city life.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <a href="#book" className="cursor-pointer group relative inline-flex items-center gap-2 justify-center px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium overflow-hidden transition-all hover:scale-105 shadow-[0_0_40px_-10px_rgba(234,88,12,0.6)]">
            <span className="relative z-10 flex items-center gap-2">
              Book Your Stay <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
        </div>
      </div>

      <div className="bg-background relative z-20">
        
        {/* About Section */}
        <section id="about" className="py-24 border-b border-border/50">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="mb-16 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">About The Homestay</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Welcome to The Kanatal Homestay by Saur Properties, a peaceful mountain retreat hosted by Suraj Singh Negi where comfort meets the untouched beauty of the Himalayas.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div className="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden border border-border">
                <Image src="/hero-kanatal.png" alt="Saur Properties Homestay" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-xl font-medium text-white mb-2">"Come as a guest and leave as family."</p>
                    <p className="text-white/70">- Suraj Singh Negi (Host)</p>
                </div>
              </div>

              <div className="space-y-8">
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
              </div>
            </div>
          </div>
        </section>

        {/* Rooms Section */}
        <section id="rooms" className="py-24 border-b border-border/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[150px] pointer-events-none" />
          <div className="container mx-auto px-6 max-w-6xl relative z-10">
            <div className="mb-16 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Accommodation</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Thoughtfully designed rooms that blend modern comfort with traditional homestay warmth.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mt-12">
              {rooms.map((room) => (
                 <div 
                   key={room.title}
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
                     <h3 className="text-2xl font-semibold mb-3 text-foreground">{room.title}</h3>
                     <p className="text-muted-foreground text-sm mb-6 leading-relaxed flex-1">{room.description}</p>
                     <div className="space-y-3 mb-6">
                       {room.features?.map(f => (
                         <div key={f} className="flex items-center gap-2 text-sm font-medium text-foreground/80">
                           <Check size={16} className="text-secondary" />
                           {f}
                         </div>
                       ))}
                     </div>
                     <div className="text-2xl font-bold text-foreground">
                        {room.price}
                     </div>
                     <a href="#book" className="w-full mt-6 py-3 rounded-xl border border-primary/20 text-primary font-medium hover:bg-primary hover:text-primary-foreground transition-colors relative overflow-hidden text-center block">
                       Check Availability
                     </a>
                   </div>
                 </div>
              ))}
            </div>
          </div>
        </section>

        {/* Directions Section */}
        <section id="location" className="py-24 border-b border-border/50">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="mb-16 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">How to Reach Us</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Your journey to the serene mountains of Kanatal starts here. We are located in Village Saur on the scenic Chamba-Mussoorie road.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Travel Timeline */}
              <div>
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3"><Compass className="text-primary"/> The Scenic Route</h3>
                <div className="relative border-l-2 border-primary/20 ml-6 space-y-12 pb-8">
                  {steps.map((step, i) => (
                    <div key={i} className="relative pl-10">
                      <div className="absolute -left-[21px] top-0 bg-background border-2 border-primary rounded-full p-2 text-primary shadow-[0_0_15px_rgba(234,88,12,0.4)]">
                        {step.icon}
                      </div>
                      <h4 className="text-xl font-semibold mb-2">{step.title}</h4>
                      <p className="text-muted-foreground">{step.desc}</p>
                    </div>
                  ))}
                  <AnimatedTimelineCar />
                </div>
              </div>

              {/* Interactive Google Map */}
              <div>
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3"><MapPin className="text-primary"/> Interactive Map</h3>
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
                        <h5 className="font-semibold text-lg">Village Saur, Kanatal</h5>
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
        </section>
      </div>

      <div className="bg-background w-full relative z-10 py-32" id="book">
        <div className="container mx-auto px-6 max-w-lg">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Request a Booking</h2>
            <p className="text-muted-foreground">Fill out the form below and Suraj will personally contact you.</p>
          </div>
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
