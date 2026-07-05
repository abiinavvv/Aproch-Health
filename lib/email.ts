import { Resend } from "resend";
import type { SendConfirmationRequest } from "@/types";

// ⚠️ Replace RESEND_FROM_EMAIL with verified sender domain before launch
export async function sendBookingConfirmation(data: SendConfirmationRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.RESEND_FROM_EMAIL || "hello@aprochhealth.com";

  const sessionLabel = "Introductory Session (30 min)";

  const html = `
    <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; color: #4A4A6A;">
      <h1 style="color: #1A1A2E; font-size: 24px;">Your session is confirmed</h1>
      <p>Hi ${data.name},</p>
      <p>Thank you for booking with Aproch Health. Here are your session details:</p>
      <table style="width: 100%; border-collapse: collapse; margin: 24px 0;">
        <tr><td style="padding: 8px 0; color: #9B9BBF;">Psychologist</td><td style="padding: 8px 0;">${data.psychologistName}</td></tr>
        <tr><td style="padding: 8px 0; color: #9B9BBF;">Date</td><td style="padding: 8px 0;">${data.date}</td></tr>
        <tr><td style="padding: 8px 0; color: #9B9BBF;">Time</td><td style="padding: 8px 0;">${data.time}</td></tr>
        <tr><td style="padding: 8px 0; color: #9B9BBF;">Session</td><td style="padding: 8px 0;">${sessionLabel}</td></tr>
        ${data.sessionMode ? `<tr><td style="padding: 8px 0; color: #9B9BBF;">Mode</td><td style="padding: 8px 0;">${data.sessionMode}</td></tr>` : ""}
      </table>
      <p>Your Google Meet link will be shared by your psychologist about 30 minutes before your session.</p>
      <p style="color: #9B9BBF; font-size: 14px;">Aproch Health does not handle emergencies. If you are in crisis, contact iCall: 9152987821.</p>
    </div>
  `;

  return resend.emails.send({
    from,
    to: data.email,
    subject: "Your Aproch Health session is confirmed",
    html,
  });
}

export async function sendContactMessage(data: {
  name: string;
  email: string;
  message: string;
}) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.RESEND_FROM_EMAIL || "hello@aprochhealth.com";

  return resend.emails.send({
    from,
    to: from,
    replyTo: data.email,
    subject: `Contact from ${data.name}`,
    html: `<p><strong>From:</strong> ${data.name} (${data.email})</p><p>${data.message}</p>`,
  });
}
