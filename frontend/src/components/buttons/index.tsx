export const Button = ({ children }: any) => {
  return (
    <button
      type="button"
      className="font-monserrat font-bold text-xl bg-ww-red border rounded-xl text-white py-2 w-48 transition ease-in-out hover:bg-transparent hover:border-ww-red hover:duration-700 tracking-wide"
    >
      {children}
    </button>
  );
};
