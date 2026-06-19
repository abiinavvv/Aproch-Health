import { NextResponse } from "next/server";
import { sendContactMessage } from "@/lib/email";
import type { ContactFormData } from "@/types";

export async function POST(request: Request) {
  try {
    const body: ContactFormData = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    console.log("Contact form submission:", { name, email, message });

    if (!process.env.RESEND_API_KEY) {
      console.error("Contact form: RESEND_API_KEY is not configured");
      return NextResponse.json(
        { error: "Email service is not configured. Please contact us via WhatsApp." },
        { status: 503 }
      );
    }

    await sendContactMessage({ name, email, message });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
