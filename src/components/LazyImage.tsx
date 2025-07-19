import React from "react";
import { useLazyImage } from "../hooks/useLazyImage";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  placeholderSrc?: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  placeholderSrc = "",
  ...props
}) => {
  const { ref, loaded } = useLazyImage();
  return (
    <img
      ref={ref}
      src={loaded ? src : placeholderSrc}
      alt={alt}
      {...props}
      style={{
        filter: loaded ? "none" : "blur(8px)",
        transition: "filter 0.3s",
        ...props.style,
      }}
    />
  );
};
