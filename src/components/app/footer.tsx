import { type FC } from "react";

const Footer: FC = () => {
  const year = new Date().getUTCFullYear();
  return (
    <footer className="absolute bottom-0 flex justify-center bg-white py-4 text-lg">
      <p className="w-screen text-center">
        {" "}
        &copy; {year} | Todos os direitos reservados
      </p>
    </footer>
  );
};

export default Footer;
