import { Star as StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type FC } from "react";
import useGetHotels from "~/hooks/useGetHotels";
import { Button } from "../ui/button";

const HotelsList: FC = () => {
  const { data: hotels } = useGetHotels();
  return (
    <div className="mx-28 my-12 flex flex-wrap justify-center gap-12">
      {hotels?.map((hotel) => {
        return (
          <div
            className="flex min-h-min w-[31%] justify-center rounded-xl bg-white pb-4 text-lg"
            key={hotel.id}
          >
            <div className="flex flex-col">
              <div>
                <Image
                  src={hotel.hotel.image}
                  alt={`Foto do hotel: ${hotel.hotel.name}`}
                  width={550}
                  height={375}
                  className="rounded-xl"
                />
                <div className="mx-4 -mt-12 mb-8">
                  <span className="text-3xl text-white">
                    R$ {hotel.lowestPrice?.amount}
                  </span>
                  <span className="ml-1 text-xs text-gray-300">/ noite</span>
                </div>
              </div>
              <div className="mx-4">
                <p className="text-lg font-semibold text-[#07264C]">
                  {hotel.hotel.name}
                </p>
                <div className=" flex items-center justify-between">
                  <p className="flex">
                    {
                      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                      [...Array(Math.floor(hotel.hotel.stars))].map((e, i) => (
                        <StarIcon fill="#F3C319" stroke="1" key={i} />
                      ))
                    }
                  </p>
                  <Button variant={"submit"} asChild>
                    <Link href={`hotels/${hotel.id}`}>Ver mais</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HotelsList;
