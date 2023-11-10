import { type FC } from "react";

import { LogIn as LogInIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const Nav: FC = () => {
  return (
    <nav>
      <div className="mx-16 mt-2 flex justify-between">
        <Button variant={"link"} asChild>
          <Link href={"#"}>
            <span className="text-2xl text-[#03284D]">Infotravel</span>
          </Link>
        </Button>
        <div className="flex items-center">
          <Button variant={"link"} asChild>
            <Link href={"#"}>
              <LogInIcon size={20} color="#AAB9C7" />
              <span className="ml-2 text-base text-gray-400">
                Iniciar sessão
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
