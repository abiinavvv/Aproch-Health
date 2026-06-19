"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type {
  BookingState,
  BookingStep,
  SessionMode,
  SessionTypeId,
} from "@/types";

const defaultInitialState: BookingState = {
  sessionType: null,
  date: null,
  timeSlot: null,
  sessionMode: null,
  name: "",
  email: "",
  phone: "",
  age: "",
  intakeMessage: "",
  currentStep: 1,
};

interface BookingContextValue extends BookingState {
  setSessionType: (type: SessionTypeId) => void;
  setDateTime: (date: string, timeSlot: string) => void;
  setSessionMode: (mode: SessionMode) => void;
  setUserDetails: (details: Partial<BookingState>) => void;
  setStep: (step: BookingStep) => void;
  goToStep: (step: BookingStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetBooking: () => void;
  hydrateBooking: (state: BookingState) => void;
  isBookingComplete: boolean;
}

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({
  children,
  initialState: initial,
}: {
  children: ReactNode;
  initialState?: BookingState;
}) {
  const [state, setState] = useState<BookingState>(initial ?? defaultInitialState);
  const [isBookingComplete, setIsBookingComplete] = useState(false);

  const setSessionType = useCallback((type: SessionTypeId) => {
    setState((s) => ({ ...s, sessionType: type }));
  }, []);

  const setDateTime = useCallback((date: string, timeSlot: string) => {
    setState((s) => ({ ...s, date, timeSlot }));
  }, []);

  const setSessionMode = useCallback((mode: SessionMode) => {
    setState((s) => ({ ...s, sessionMode: mode }));
  }, []);

  const setUserDetails = useCallback((details: Partial<BookingState>) => {
    setState((s) => ({ ...s, ...details }));
  }, []);

  const setStep = useCallback((step: BookingStep) => {
    setState((s) => ({ ...s, currentStep: step }));
  }, []);

  const goToStep = useCallback((step: BookingStep) => {
    setState((s) => ({ ...s, currentStep: step }));
  }, []);

  const nextStep = useCallback(() => {
    setState((s) => ({
      ...s,
      currentStep: Math.min(5, s.currentStep + 1) as BookingStep,
    }));
  }, []);

  const prevStep = useCallback(() => {
    setState((s) => ({
      ...s,
      currentStep: Math.max(1, s.currentStep - 1) as BookingStep,
    }));
  }, []);

  const resetBooking = useCallback(() => {
    setState(defaultInitialState);
    setIsBookingComplete(false);
  }, []);

  const hydrateBooking = useCallback((saved: BookingState) => {
    setState({ ...saved, currentStep: 5 });
  }, []);

  return (
    <BookingContext.Provider
      value={{
        ...state,
        setSessionType,
        setDateTime,
        setSessionMode,
        setUserDetails,
        setStep,
        goToStep,
        nextStep,
        prevStep,
        resetBooking,
        hydrateBooking,
        isBookingComplete,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}

export function markBookingComplete() {
  // Used after WhatsApp booking — stored via sessionStorage for confirmation page
  if (typeof window !== "undefined") {
    sessionStorage.setItem("bookingComplete", "true");
  }
}

export function isBookingMarkedComplete(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem("bookingComplete") === "true";
}

export function saveBookingToSession(state: BookingState) {
  if (typeof window !== "undefined") {
    const {
      sessionType,
      date,
      timeSlot,
      sessionMode,
      name,
      email,
      phone,
      age,
      intakeMessage,
      currentStep,
    } = state;
    sessionStorage.setItem(
      "bookingState",
      JSON.stringify({
        sessionType,
        date,
        timeSlot,
        sessionMode,
        name,
        email,
        phone,
        age,
        intakeMessage,
        currentStep,
      })
    );
  }
}

export function loadBookingFromSession(): BookingState | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem("bookingState");
  if (!raw) return null;
  try {
    return JSON.parse(raw) as BookingState;
  } catch {
    return null;
  }
}
