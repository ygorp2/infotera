import { type FC } from "react";

import { Home as HomeIcon, LogIn as LogInIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "../ui/button";

const Nav: FC = () => {
  const router = useRouter();
  return (
    <nav>
      <div className="mx-20 mt-2 flex justify-between">
        <Button variant={"link"} asChild>
          <Link href={"/"}>
            <span className="text-2xl text-[#03284D]">Infotravel</span>
          </Link>
        </Button>
        <div className="flex items-center">
          <div>
            {router.pathname !== "/" && (
              <Button variant={"link"} asChild>
                <Link href={"/"}>
                  <HomeIcon size={20} color="#AAB9C7" />
                  <span className="ml-2 text-base text-gray-400">
                    Página inicial
                  </span>
                </Link>
              </Button>
            )}
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
      </div>
    </nav>
  );
};

export default Nav;
