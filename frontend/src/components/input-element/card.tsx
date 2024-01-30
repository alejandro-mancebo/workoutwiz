export type CardData = {
  src: string;
  alt: string;
  title: string;
};

type CardProps = {
  cardData: CardData;
  onClick: () => void;
};

export const Card = ({ cardData, onClick }: CardProps) => {
  return (
    <div
      className="w-[17.5rem] cursor-pointer overflow-hidden rounded-xl bg-ww-moonstone "
      onClick={onClick}
    >
      <div className="h-[18.75rem]  ">
        <img className="" src={cardData.src} alt={cardData.alt} />
      </div>
      <div className="h-14 overflow-hidden overflow-ellipsis whitespace-nowrap bg-ww-red px-4 py-3 text-center text-xl font-semibold">
        {cardData.title}
      </div>
    </div>
  );
};
