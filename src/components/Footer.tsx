import Link from "next/link";
import { Mountain } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-border bg-muted/20 py-12">
            <div className="container mx-auto px-6 text-center text-muted-foreground flex flex-col items-center">
                <Mountain size={32} className="text-secondary/50 mb-6" />
                <h3 className="text-xl font-bold text-foreground mb-2 tracking-tight">The Kanatal Homestay</h3>
                <p className="mb-6 opacity-70">By Saur Properties</p>
                <div className="flex gap-4 text-sm mb-12">
                    <Link href="/about" className="hover:text-primary transition-colors">Our Story</Link>
                    <Link href="/rooms" className="hover:text-primary transition-colors">Rooms</Link>
                    <Link href="/directions" className="hover:text-primary transition-colors">Location</Link>
                    <Link href="/admin" className="hover:text-primary transition-colors">Admin Portal</Link>
                </div>
                <p className="text-xs opacity-50">&copy; {new Date().getFullYear()} The Kanatal Homestay. All rights reserved.</p>
            </div>
        </footer>
    );
}
