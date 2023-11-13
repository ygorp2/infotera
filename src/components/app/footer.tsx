import { type FC } from "react";

const Footer: FC = () => {
  const year = new Date().getUTCFullYear();
  return (
    <footer className=" fixed bottom-0 flex justify-center bg-white pb-3 pt-5 text-lg">
      <p className="w-screen text-center font-medium">
        {" "}
        &copy; {year} | Todos os direitos reservados
      </p>
    </footer>
  );
};

export default Footer;
