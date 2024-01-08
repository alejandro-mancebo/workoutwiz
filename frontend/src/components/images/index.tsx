interface Url {
  src: string;
  alt: string;
  position?: boolean;
}

export const Image = ({ src, alt, position }: Url) => {
  let location;
  if (position) location = true;
  else location = false;
  return (
    <div className="aspect-3/2">
      <img
        className={`bg-white w-full ${
          location ? "border-l-8" : "border-r-8"
        } object-cover object-center border-ww-red`}
        src={src}
        alt={alt}
      />
    </div>
  );
};
