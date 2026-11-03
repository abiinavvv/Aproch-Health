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
  NutritionOfferId,
  ServiceId,
  SessionMode,
  SessionTypeId,
} from "@/types";
import { getDefaultNutritionist } from "@/lib/nutritionists";

export const defaultBookingState: BookingState = {
  service: null,
  psychologistSlug: null,
  nutritionistSlug: null,
  sessionType: null,
  nutritionOfferId: null,
  date: null,
  timeSlot: null,
  sessionMode: null,
  name: "",
  email: "",
  phone: "",
  phoneCountryCode: "+91",
  age: "",
  intakeMessage: "",
  currentStep: 1,
};

/** Last step number on the /book page (before /confirmation). */
export function getBookingMaxBookStep(service: ServiceId): BookingStep {
  return service === "nutrition" ? 5 : 4;
}

/** Confirmation / Done step number. */
export function getBookingDoneStep(service: ServiceId): BookingStep {
  return service === "nutrition" ? 6 : 5;
}

interface BookingContextValue extends BookingState {
  setService: (service: ServiceId) => void;
  setPsychologistSlug: (slug: string) => void;
  setNutritionistSlug: (slug: string) => void;
  setSessionType: (type: SessionTypeId) => void;
  setNutritionOfferId: (id: NutritionOfferId) => void;
  setDateTime: (date: string, timeSlot: string) => void;
  setSessionMode: (mode: SessionMode) => void;
  setUserDetails: (details: Partial<BookingState>) => void;
  setStep: (step: BookingStep) => void;
  goToStep: (step: BookingStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  clearService: () => void;
  resetBooking: () => void;
  hydrateBooking: (state: BookingState) => void;
  isBookingComplete: boolean;
  maxBookStep: BookingStep;
  doneStep: BookingStep;
}

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({
  children,
  initialState: initial,
}: {
  children: ReactNode;
  initialState?: BookingState;
}) {
  const [state, setState] = useState<BookingState>(initial ?? defaultBookingState);
  const [isBookingComplete, setIsBookingComplete] = useState(false);

  const setService = useCallback((service: ServiceId) => {
    setState((s) => ({
      ...s,
      service,
      psychologistSlug: null,
      nutritionistSlug:
        service === "nutrition" ? getDefaultNutritionist().slug : null,
      nutritionOfferId: null,
      sessionType: service === "therapy" ? "introductory" : null,
      date: null,
      timeSlot: null,
      sessionMode: null,
      currentStep: 1,
    }));
  }, []);

  const clearService = useCallback(() => {
    setState((s) => ({
      ...defaultBookingState,
      name: s.name,
      email: s.email,
      phone: s.phone,
      phoneCountryCode: s.phoneCountryCode,
      age: s.age,
      intakeMessage: s.intakeMessage,
    }));
  }, []);

  const setPsychologistSlug = useCallback((slug: string) => {
    setState((s) => ({
      ...s,
      service: "therapy",
      psychologistSlug: slug,
      sessionType: "introductory",
    }));
  }, []);

  const setNutritionistSlug = useCallback((slug: string) => {
    setState((s) => ({
      ...s,
      service: "nutrition",
      nutritionistSlug: slug,
    }));
  }, []);

  const setSessionType = useCallback((type: SessionTypeId) => {
    setState((s) => ({ ...s, sessionType: type }));
  }, []);

  const setNutritionOfferId = useCallback((id: NutritionOfferId) => {
    setState((s) => ({ ...s, nutritionOfferId: id, service: "nutrition" }));
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
    setState((s) => {
      if (!s.service) return s;
      const max = getBookingDoneStep(s.service);
      return {
        ...s,
        currentStep: Math.min(max, s.currentStep + 1) as BookingStep,
      };
    });
  }, []);

  const prevStep = useCallback(() => {
    setState((s) => {
      if (s.currentStep <= 1 && s.service) {
        // Back from first service step → return to service picker
        return {
          ...defaultBookingState,
          name: s.name,
          email: s.email,
          phone: s.phone,
          phoneCountryCode: s.phoneCountryCode,
          age: s.age,
          intakeMessage: s.intakeMessage,
        };
      }
      return {
        ...s,
        currentStep: Math.max(1, s.currentStep - 1) as BookingStep,
      };
    });
  }, []);

  const resetBooking = useCallback(() => {
    setState(defaultBookingState);
    setIsBookingComplete(false);
  }, []);

  const hydrateBooking = useCallback((saved: BookingState) => {
    const service = saved.service ?? "therapy";
    setState({
      ...defaultBookingState,
      ...saved,
      service,
      currentStep: getBookingDoneStep(service),
    });
  }, []);

  const activeService = state.service ?? "therapy";
  const maxBookStep = getBookingMaxBookStep(activeService);
  const doneStep = getBookingDoneStep(activeService);

  return (
    <BookingContext.Provider
      value={{
        ...state,
        setService,
        setPsychologistSlug,
        setNutritionistSlug,
        setSessionType,
        setNutritionOfferId,
        setDateTime,
        setSessionMode,
        setUserDetails,
        setStep,
        goToStep,
        nextStep,
        prevStep,
        clearService,
        resetBooking,
        hydrateBooking,
        isBookingComplete,
        maxBookStep,
        doneStep,
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
    sessionStorage.setItem(
      "bookingState",
      JSON.stringify({
        service: state.service,
        psychologistSlug: state.psychologistSlug,
        nutritionistSlug: state.nutritionistSlug,
        sessionType: state.sessionType,
        nutritionOfferId: state.nutritionOfferId,
        date: state.date,
        timeSlot: state.timeSlot,
        sessionMode: state.sessionMode,
        name: state.name,
        email: state.email,
        phone: state.phone,
        phoneCountryCode: state.phoneCountryCode,
        age: state.age,
        intakeMessage: state.intakeMessage,
        currentStep: state.currentStep,
      })
    );
  }
}

export function loadBookingFromSession(): BookingState | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem("bookingState");
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<BookingState>;
    return { ...defaultBookingState, ...parsed };
  } catch {
    return null;
  }
}
