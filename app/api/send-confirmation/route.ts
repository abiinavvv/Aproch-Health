import { NextResponse } from "next/server";
import { sendBookingConfirmation } from "@/lib/email";
import type { SendConfirmationRequest } from "@/types";

export async function POST(request: Request) {
  try {
    const body: SendConfirmationRequest = await request.json();
    const { name, email, date, time, sessionType, psychologistName } = body;

    if (!name || !email || !date || !time || !sessionType || !psychologistName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (process.env.RESEND_API_KEY) {
      await sendBookingConfirmation(body);
    } else {
      console.log("Confirmation email (no RESEND_API_KEY):", body);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Send confirmation error:", error);
    return NextResponse.json({ error: "Failed to send confirmation" }, { status: 500 });
  }
}
