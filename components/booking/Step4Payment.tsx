"use client";

import { useState } from "react";
import Image from "next/image";
import { Pencil } from "lucide-react";
import Button from "@/components/ui/Button";
import {
  useBooking,
  saveBookingToSession,
} from "@/context/BookingContext";
import { psychologist } from "@/lib/psychologist";
import {
  getSessionById,
  formatSessionEndTime,
} from "@/lib/sessions";
import { formatDisplayDate } from "@/lib/calendar";

export default function Step4Payment() {
  const booking = useBooking();
  const {
    sessionType,
    date,
    timeSlot,
    sessionMode,
    name,
    email,
    phone,
    goToStep,
  } = booking;

  const [coupon, setCoupon] = useState("");
  const [couponError, setCouponError] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const session = sessionType ? getSessionById(sessionType) : null;
  if (!session || !date || !timeSlot) return null;

  const endTime = formatSessionEndTime(timeSlot, session.duration);
  const modeLabel = sessionMode === "video" ? "Video" : "Audio";

  const applyCoupon = () => {
    if (coupon.trim()) setCouponError("Invalid code");
    else setCouponError("");
  };

  const handlePayment = async () => {
    if (!agreed) return;
    setLoading(true);
    setPaymentError("");

    try {
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: session.price,
          sessionType: session.label,
          name,
          email,
        }),
      });

      if (!res.ok) throw new Error("Failed to create order");
      const { orderId, amount } = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: amount * 100,
        currency: "INR",
        name: "Aproch Health",
        description: `${session.label} session with ${psychologist.name}`,
        order_id: orderId,
        prefill: { name, email, contact: phone },
        theme: { color: "#C4622D" },
        modal: { backdropclose: false },
        handler: async () => {
          saveBookingToSession({
            sessionType: booking.sessionType,
            date: booking.date,
            timeSlot: booking.timeSlot,
            sessionMode: booking.sessionMode,
            name: booking.name,
            email: booking.email,
            phone: booking.phone,
            age: booking.age,
            intakeMessage: booking.intakeMessage,
            currentStep: 5,
          });
          sessionStorage.setItem("bookingComplete", "true");

          await fetch("/api/send-confirmation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name,
              email,
              date: formatDisplayDate(date),
              time: `${timeSlot} – ${endTime}`,
              sessionType,
              psychologistName: psychologist.name,
              sessionMode: modeLabel,
              duration: session.duration,
            }),
          });

          window.location.href = "/confirmation";
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (response) => {
        setPaymentError(
          response.error?.description || "Payment failed. Please try again."
        );
        setLoading(false);
      });
      rzp.open();
    } catch {
      setPaymentError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-[520px]">
      <div className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden">
        <div className="flex items-start justify-between border-b border-border p-5">
          <div className="flex gap-4">
            <Image
              src={psychologist.photo}
              alt={psychologist.name}
              width={48}
              height={48}
              className="rounded-full"
            />
            <div>
              <p className="font-semibold text-dark-text">{psychologist.name}</p>
              <p className="text-sm text-muted">{psychologist.designation}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => goToStep(1)}
            className="flex items-center gap-1 text-sm text-primary"
          >
            <Pencil size={14} /> Edit
          </button>
        </div>

        <div className="border-b border-border p-5 text-sm text-body-text">
          {session.label} · {session.duration} min · {modeLabel}
        </div>

        <div className="flex items-start justify-between border-b border-border p-5">
          <div>
            <p className="text-xs text-muted">Date</p>
            <p className="font-medium text-dark-text">{formatDisplayDate(date)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted">Time</p>
            <p className="font-medium text-dark-text">
              {timeSlot} – {endTime}
            </p>
          </div>
          <button
            type="button"
            onClick={() => goToStep(2)}
            className="flex items-center gap-1 text-sm text-primary"
          >
            <Pencil size={14} /> Edit
          </button>
        </div>

        <div className="p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            Bill Summary
          </p>
          <div className="mt-3 flex justify-between text-body-text">
            <span>{session.label}</span>
            <span>₹{session.price}</span>
          </div>

          <div className="mt-4 flex gap-2">
            <input
              type="text"
              value={coupon}
              onChange={(e) => {
                setCoupon(e.target.value);
                setCouponError("");
              }}
              placeholder="Enter coupon code"
              className="flex-1 rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-primary"
            />
            <Button variant="outline" onClick={applyCoupon} className="!px-4 !py-2">
              Apply
            </Button>
          </div>
          {couponError && (
            <p className="mt-1 text-xs text-error">{couponError}</p>
          )}

          <div className="mt-4 flex justify-between border-t border-border pt-4 font-semibold text-dark-text">
            <span>Total</span>
            <span>₹{session.price}</span>
          </div>
        </div>
      </div>

      <label className="mt-6 flex items-start gap-3 text-sm text-body-text cursor-pointer">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-1 accent-primary"
        />
        By proceeding, I agree to the Terms and Conditions and Consent to Therapy
      </label>

      {paymentError && (
        <p className="mt-4 rounded-xl bg-error/10 p-3 text-sm text-error">
          {paymentError}
        </p>
      )}

      <div className="mt-6">
        <Button
          variant="yellow"
          fullWidth
          onClick={handlePayment}
          disabled={!agreed || loading}
        >
          {loading ? "Processing..." : "AGREE AND PAY →"}
        </Button>
      </div>
    </div>
  );
}
