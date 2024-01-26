import { Button } from "../buttons";

type TCardText = {
  title: string;
  content: string;
  buttonText: string;
};

export const CardText = ({ title, content, buttonText }: TCardText) => {
  return (
    <div className="w-full pt-6">
      <div className="px-1">
        <h2 className=" text-center ">{title}</h2>
        <div className="px-4 pb-12 pt-10 text-2xl">{content}</div>
        <div className=" pl-6">
          <Button type="button">{buttonText} </Button>
        </div>
      </div>
    </div>
  );
};
