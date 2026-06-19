import { NextResponse } from "next/server";
import { getRazorpayInstance } from "@/lib/razorpay";
import type { CreateOrderRequest } from "@/types";

export async function POST(request: Request) {
  try {
    const body: CreateOrderRequest = await request.json();
    const { amount, sessionType, name, email } = body;

    if (!amount || !sessionType || !name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const instance = getRazorpayInstance();
    const order = await instance.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `aproch_${Date.now()}`,
      notes: { sessionType, name, email },
    });

    return NextResponse.json({ orderId: order.id, amount });
  } catch (error) {
    console.error("Create order error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
