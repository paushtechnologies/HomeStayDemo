"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export function WhatsAppWidget() {
    const phoneNumber = "+910000000000"; // Placeholder for Suraj's number
    const message = "Hi! I would like to inquire about booking The Kanatal Homestay.";
    const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <motion.a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center isolate"
        >
            <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-20 -z-10" />
            <MessageCircle size={32} />
        </motion.a>
    );
}
