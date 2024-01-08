import { Button } from "../buttons";

interface ICardText {
  title: string;
  content: string;
  buttonText: string;
}

export const CardText = ({ title, content, buttonText }: ICardText) => {
  return (
    <div className="w-full">
      <div className="px-1">
        <h2 className=" text-center ">{title}</h2>
        <div className=" px-4 pt-4 pb-10 text-2xl">{content}</div>
        <div className=" pl-6">
          <Button>{buttonText} </Button>
        </div>
      </div>
    </div>
  );
};
