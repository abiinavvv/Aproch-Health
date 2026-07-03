"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Phone } from "lucide-react";
import {
  COLLAPSED_SUICIDE_HELPLINE_COUNT,
  crisisHelplineSections,
  type CrisisHelpline,
  type CrisisSection,
} from "@/lib/crisis-helplines";

function HelplineRow({ entry }: { entry: CrisisHelpline }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-white/10 py-3 last:border-b-0 md:gap-4 md:py-4 lg:py-5">
      <div className="min-w-0">
        <p className="text-sm font-medium text-white md:text-base lg:text-lg">
          {entry.name}{" "}
          <span className="font-normal text-white/80">({entry.hours})</span>
        </p>
        <p className="mt-0.5 text-xs text-white/70 md:mt-1 md:text-sm lg:text-base">{entry.phone}</p>
      </div>
      <a
        href={entry.tel}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#2ecc71] text-white transition-colors hover:bg-[#27ae60] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:h-10 md:w-10 lg:h-12 lg:w-12"
        aria-label={`Call ${entry.name}`}
      >
        <Phone size={16} className="md:h-[18px] md:w-[18px]" aria-hidden />
      </a>
    </div>
  );
}

function SectionBlock({ section }: { section: CrisisSection }) {
  const multiColumn = section.helplines.length > 1;

  return (
    <div className="border-t border-white/15 pt-4 first:border-t-0 first:pt-0 md:pt-6 lg:pt-8">
      <h3 className="mb-2 text-base font-semibold text-white md:mb-3 md:text-lg lg:text-xl">
        {section.title}
      </h3>
      <div
        className={
          multiColumn
            ? "lg:grid lg:grid-cols-2 lg:gap-x-10"
            : undefined
        }
      >
        {section.helplines.map((entry) => (
          <HelplineRow key={`${section.id}-${entry.phone}`} entry={entry} />
        ))}
      </div>
    </div>
  );
}

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isDesktop;
}

export default function CrisisHelplinesPanel() {
  const [expanded, setExpanded] = useState(false);
  const isDesktop = useIsDesktop();
  const showAll = expanded || isDesktop;

  const suicideSection = crisisHelplineSections[0];

  const collapsedHelplines = suicideSection.helplines.slice(
    0,
    COLLAPSED_SUICIDE_HELPLINE_COUNT
  );

  return (
    <div className="rounded-2xl bg-[#135B66] p-4 shadow-lg md:p-6 lg:rounded-3xl lg:p-10">
      <h2 className="text-lg font-semibold text-white md:text-xl lg:text-3xl">
        Professional Support
      </h2>
      <p className="mt-1.5 max-w-2xl text-xs leading-relaxed text-white/85 md:mt-2 md:text-sm lg:text-lg">
        Professionals or helplines I can contact during crisis in my location.
      </p>

      <div className="mt-5 md:mt-8 lg:mt-10">
        {showAll ? (
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:gap-y-2">
            {crisisHelplineSections.map((section) => (
              <div
                key={section.id}
                className={
                  section.id === "suicide" || section.id === "emergency"
                    ? "lg:col-span-2"
                    : undefined
                }
              >
                <SectionBlock section={section} />
              </div>
            ))}
          </div>
        ) : (
          <div>
            <h3 className="mb-2 text-base font-semibold text-white md:text-lg">
              {suicideSection.title}
            </h3>
            <div>
              {collapsedHelplines.map((entry) => (
                <HelplineRow key={entry.phone} entry={entry} />
              ))}
            </div>
          </div>
        )}
      </div>

      {!isDesktop && (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="mt-4 flex w-full items-center justify-center gap-1 text-xs font-medium text-white/90 transition-colors hover:text-white md:mt-6 md:text-sm"
        >
          {expanded ? (
            <>
              See Less <ChevronUp size={16} aria-hidden />
            </>
          ) : (
            <>
              See More <ChevronDown size={16} aria-hidden />
            </>
          )}
        </button>
      )}
    </div>
  );
}
