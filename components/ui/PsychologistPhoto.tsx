import { cn } from "@/lib/utils";
import { psychologist } from "@/lib/psychologist";

const WEBP = "/images/psychologist.webp";
const PNG = "/images/psychologist.png";

type PsychologistPhotoProps = {
  alt?: string;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  width?: number;
  height?: number;
};

export default function PsychologistPhoto({
  alt = psychologist.name,
  className,
  fill = false,
  priority = false,
  width,
  height,
}: PsychologistPhotoProps) {
  const imgClassName = cn(fill && "h-full w-full object-cover", className);

  return (
    <picture className={fill ? "absolute inset-0 block h-full w-full" : "block"}>
      <source srcSet={WEBP} type="image/webp" />
      <img
        src={PNG}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={imgClassName}
      />
    </picture>
  );
}
