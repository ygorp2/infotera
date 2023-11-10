import { type FC } from "react";

const Title: FC = () => {
  return (
    <header className="flex justify-center">
      <h1 className="max-w-4xl text-center text-6xl font-semibold">
        Os melhores <span className="text-blue-500">Hoteis</span> e{" "}
        <span className="text-blue-500">Destinos</span> para a sua viagem
      </h1>
      <div className="flex items-center"></div>
    </header>
  );
};

export default Title;
