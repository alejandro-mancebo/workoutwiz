import { Image } from "../images";
import IMAGES from "../../assets/images";
import { CardText } from "../cards";

interface ISection {
  src: string;
  alt: string;
  title: string;
  content: string;
  position?: boolean;
}

export const Section = ({ src, alt, title, content, position }: ISection) => {
  const location = position || false;
  return (
    <section className="grid grid-rows-1 grid-cols-2 gap-8 py-8">
      {location ? (
        <>
          <CardText title={title} content={content} buttonText={"submit"} />
          <Image src={src} alt={alt} position={position} />
        </>
      ) : (
        <>
          <Image src={src} alt={alt} position={position} />
          <CardText title={title} content={content} buttonText={"submit"} />
        </>
      )}
    </section>
  );
};
