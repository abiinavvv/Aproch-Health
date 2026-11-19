import { cn } from "@/lib/utils";

type PsychologistPhotoProps = {
  photo: string;
  photoWebp?: string;
  alt: string;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  width?: number;
  height?: number;
};

export default function PsychologistPhoto({
  photo,
  photoWebp,
  alt,
  className,
  fill = false,
  priority = false,
  width,
  height,
}: PsychologistPhotoProps) {
  const imgClassName = cn(fill && "h-full w-full object-cover", className);

  return (
    <picture className={fill ? "absolute inset-0 block h-full w-full" : "block"}>
      {photoWebp ? <source srcSet={photoWebp} type="image/webp" /> : null}
      <img
        src={photo}
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
