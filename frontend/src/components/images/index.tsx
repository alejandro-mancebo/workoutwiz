type TUrl = {
  src: string;
  alt: string;
  position?: boolean;
};

export const Image = ({ src, alt, position }: TUrl) => {
  let location;
  if (position) location = true;
  else location = false;
  return (
    <div className="aspect-3/2">
      <img
        className={`w-full bg-white ${
          location ? "border-l-8" : "border-r-8"
        } border-ww-red object-cover object-center`}
        src={src}
        alt={alt}
      />
    </div>
  );
};
