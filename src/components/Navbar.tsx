import Link from "next/link";
import { Sparkles, Map, User, Home as HomeIcon } from "lucide-react";

export function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-50 bg-background/50 backdrop-blur-xl border-b border-white/5 py-4">
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link href="/" className="text-xl font-bold tracking-tight flex items-center gap-2">
                    <span className="text-primary font-semibold">T K H</span>
                    <span className="text-foreground/80 hidden sm:inline-block">The Kanatal Homestay</span>
                </Link>
                <div className="flex gap-6 items-center text-sm font-medium text-foreground/80">
                    <Link href="/#about" className="hover:text-primary transition-colors flex items-center gap-1"><User size={16} /> Host & Dining</Link>
                    <Link href="/#rooms" className="hover:text-primary transition-colors flex items-center gap-1"><HomeIcon size={16} /> Rooms</Link>
                    <Link href="/#location" className="hover:text-primary transition-colors flex items-center gap-1"><Map size={16} /> Location</Link>
                    <Link href="/#book" className="px-5 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all flex items-center gap-2">
                        <Sparkles size={14} /> Book
                    </Link>
                </div>
            </div>
        </nav>
    );
}
