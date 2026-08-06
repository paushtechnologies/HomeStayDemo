import { NextResponse } from "next/server";

// Development Mock DB (In memory)
let _mockLeads: any[] = [];

export async function POST(req: Request) {
    try {
        const data = await req.json();
        console.log("New Lead Received via API:", data);

        // Simulate latency
        await new Promise(r => setTimeout(r, 1000));

        _mockLeads.push({ ...data, id: Date.now() });

        return NextResponse.json({ success: true, message: "Lead saved successfully" });
    } catch (err) {
        return NextResponse.json({ error: "Failed to process lead" }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({ leads: _mockLeads });
}
