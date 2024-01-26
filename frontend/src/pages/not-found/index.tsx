import { LinkButton } from "../../components/buttons";

export const NotFound = () => {
  return (
    <section className="flex h-[calc(100vh-72px)] ">
      <div className="m-auto w-2/3 rounded-2xl border border-ww-red  py-28  text-center">
        <h1 className=" text-9xl font-extrabold">404</h1>
        <h2 className="pb-16 pt-8 ">Not Found</h2>

        <LinkButton to="/">Go back</LinkButton>
      </div>
    </section>
  );
};
