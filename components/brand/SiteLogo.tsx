import Image from "next/image";
import { cn } from "@/lib/utils";

const LOGO_SRC = "/images/aproch-logo.svg";
const LOGO_WIDTH = 1024;
const LOGO_HEIGHT = 336;

type SiteLogoProps = {
  className?: string;
  priority?: boolean;
};

export default function SiteLogo({ className, priority = false }: SiteLogoProps) {
  return (
    <span className={cn("site-logo inline-flex shrink-0", className)}>
      <Image
        src={LOGO_SRC}
        alt="Aproch Health"
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        priority={priority}
        className="h-full w-auto"
      />
    </span>
  );
}
