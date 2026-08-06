"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";

const formSchema = z.object({
    name: z.string().min(2, "Name is required"),
    phone: z.string().min(10, "Valid phone number required"),
    guests: z.string().min(1, "Number of guests required"),
    dates: z.string().min(1, "Tentative dates required"),
});

export function ContactForm() {
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
    const { register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setStatus("loading");
        const res = await fetch("/api/leads", {
            method: "POST",
            body: JSON.stringify(values),
        });
        if (res.ok) {
            setStatus("success");
            reset();
        } else {
            setStatus("idle");
        }
    }

    if (status === "success") {
        return (
            <div className="bg-primary/10 border border-primary/20 p-8 rounded-3xl text-center">
                <h3 className="text-2xl font-semibold mb-2">Request Sent Successfully!</h3>
                <p className="text-muted-foreground">Suraj will reach out to you shortly via WhatsApp or Phone to confirm availability.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full text-left">
            <div>
                <label className="text-sm font-medium mb-1 block">Full Name</label>
                <input {...register("name")} className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors" placeholder="e.g. John Doe" />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
            </div>
            <div>
                <label className="text-sm font-medium mb-1 block">Phone / WhatsApp No.</label>
                <input {...register("phone")} className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors" placeholder="+91..." />
                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-sm font-medium mb-1 block">Total Guests</label>
                    <input {...register("guests")} type="number" className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors" placeholder="2" />
                </div>
                <div>
                    <label className="text-sm font-medium mb-1 block">Tentative Dates</label>
                    <input {...register("dates")} type="text" className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors" placeholder="e.g. 15-20 Oct" />
                </div>
            </div>
            <button type="submit" disabled={status === "loading"} className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-semibold mt-4 hover:opacity-90 transition-opacity flex justify-center items-center gap-2 shadow-lg">
                {status === "loading" ? "Sending..." : "Send Booking Inquiry"}
            </button>
            <p className="text-xs text-center text-muted-foreground mt-4">*No payment required right now. We will check availability and call you.</p>
        </form>
    )
}
