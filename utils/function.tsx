"use client";
import { logoImage } from "@public/images";
import Picture from "@src/components/picture/Picture";
import Link from "next/link";

interface LogoImageProps {
  className?: string;
}

export const LogoImage = ({ className }: LogoImageProps) => {
  return (
    <Link href="/" className="size-8">
      <Picture
        src={logoImage}
        alt="logo"
        priority
        loading="lazy"
        className={`w-full h-auto duration-300 hover:scale-105 transition-transform hover:animate-pulse ${className}`}
      />
    </Link>
  );
};

export const extractCurrencySymbol = (html: string) => {
  if (!html) return "";
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent?.match(/[\u20A6]/)?.[0] || "";
};
