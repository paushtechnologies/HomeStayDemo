"use client";

import { useEffect, useState } from "react";
import { Lock, LayoutDashboard } from "lucide-react";

export default function AdminPage() {
    const [auth, setAuth] = useState(false);
    const [leads, setLeads] = useState<any[]>([]);

    useEffect(() => {
        if (auth) {
            fetch("/api/leads").then(r => r.json()).then(d => setLeads(d.leads || []));
        }
    }, [auth]);

    if (!auth) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="bg-muted/10 p-8 rounded-3xl border border-border w-full max-w-sm text-center shadow-xl">
                    <Lock className="mx-auto mb-6 text-primary" size={32} />
                    <h1 className="text-2xl font-bold mb-6">Host Login</h1>
                    <input
                        type="password"
                        placeholder="Passcode (try 1234)"
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 mb-4 focus:outline-primary transition-colors text-center"
                        onChange={(e) => { if (e.target.value === "1234") setAuth(true) }}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-20 bg-background text-foreground">
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-3xl font-bold flex items-center gap-3"><LayoutDashboard className="text-primary" /> Leads Dashboard</h1>
                    <p className="text-sm font-medium text-muted-foreground">Connected to Cloudflare D1 (Mock)</p>
                </div>

                {leads.length === 0 ? (
                    <div className="text-center py-20 bg-muted/5 rounded-3xl border border-dashed border-border flex flex-col items-center">
                        <p className="text-muted-foreground mb-4">No bookings inquiries yet...</p>
                        <p className="text-sm">Submit one from the home page to test it!</p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {leads.reverse().map((lead) => (
                            <div key={lead.id} className="bg-secondary/5 border border-secondary/20 p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <h3 className="font-semibold text-lg">{lead.name}</h3>
                                    <p className="text-sm text-muted-foreground">{lead.phone} • {lead.guests} Guests • Dates: {lead.dates}</p>
                                </div>
                                <div className="text-xs font-medium text-muted-foreground opacity-50 bg-background px-3 py-1 rounded-full">
                                    {lead.createdAt ? new Date(lead.createdAt).toLocaleString() : "Just now"}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
