import {
  CheckCircle as CheckCircleIcon,
  CheckIcon,
  MapPin as MapPinIcon,
  StarIcon,
  XCircle as XCircleIcon,
} from "lucide-react";
import {
  type GetServerSideProps,
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
  type NextPage,
} from "next";
import Error from "next/error";
import Image from "next/image";
import Footer from "~/components/app/footer";
import AppForm from "~/components/app/form";
import Nav from "~/components/app/nav";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import useGetHotel from "~/hooks/useGetHotel";
import { ssrHelper } from "~/utils/ssrHelper";

interface Props {
  hotelId: number;
}

const HotelPage: NextPage<Props> = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const {
    data: hotel,
    isError,
    isFetching,
  } = useGetHotel({ hotelId: props.hotelId });

  if ((!hotel || isError) && !isFetching) {
    return <Error statusCode={404} />;
  }

  return (
    <div className="w-full">
      <Nav />
      <AppForm />
      <div>
        {hotel && (
          <div className="mx-28 mb-16 mt-6 flex flex-col rounded-xl bg-white py-4">
            <div className="flex justify-center">
              <Image
                src={hotel.hotel.image}
                alt={`Foto do hotel: ${hotel.hotel.name}`}
                width={550}
                height={375}
                className="mr-4 rounded-xl"
              />
              <div className="flex flex-col">
                <h1 className="text-2xl font-semibold text-[#07264C]">
                  {hotel.hotel.name}
                </h1>
                <p className="flex items-center">
                  <MapPinIcon color="gray" size={20} className="mr-2" />
                  {hotel.hotel.address}
                </p>
                <p className="mt-2 flex">
                  {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    [...Array(Math.floor(hotel.hotel.stars))].map((e, i) => (
                      <StarIcon fill="#F3C319" stroke="1" key={i} />
                    ))
                  }
                </p>
                <p className=" mt-4 max-w-[68em] leading-7 text-gray-500">
                  {hotel.hotel.description}
                </p>
              </div>
            </div>
            <div className="ml-20 mt-6">
              <h2 className="text-2xl font-bold text-[#07264C]">
                Quartos disponiveis
              </h2>
              {hotel.rooms?.map((room, index) => {
                return (
                  <div
                    key={index}
                    className="m-4 ml-0 mr-14 flex items-center justify-between rounded-xl bg-background p-4"
                  >
                    <div>
                      <p className="mb-3 text-xl font-semibold">
                        {room.roomType.name}
                      </p>
                      {room.cancellationPolicies.refundable ? (
                        <p className="flex items-center text-blue-500">
                          <CheckCircleIcon
                            className="mr-3"
                            color="hsl(210, 80%, 51%)"
                            size={20}
                          />
                          Cancelamento gratuito
                        </p>
                      ) : (
                        <p className="flex items-center text-red-500">
                          <XCircleIcon className="mr-3" color="red" size={20} />
                          Multa de cancelamento
                        </p>
                      )}
                    </div>
                    <div className="flex items-center">
                      <div className="mr-14">
                        <p className="text-4xl font-semibold text-blue-500">
                          R$ {Math.floor(room.price.amount)}
                          <span className="text-sm font-normal">/ noite</span>
                        </p>
                        <p className="text-gray-400">Pagamento no hotel</p>
                      </div>
                      <div>
                        <Dialog>
                          <DialogTrigger>
                            <Button variant={"submit"} className="!p-6">
                              Reservar agora
                            </Button>
                            <DialogContent className="flex h-screen max-w-[99%] flex-col items-center justify-center bg-[#1E435A] text-white opacity-90">
                              <p>
                                <CheckIcon
                                  className="rounded-full bg-[#51B853] p-4"
                                  size={80}
                                  strokeWidth="2px"
                                />
                              </p>
                              <span className="mt-4 text-5xl font-medium">
                                Obrigado!
                              </span>
                              <p className="text-2xl">
                                Reserva Realizada com sucesso.
                              </p>
                            </DialogContent>
                          </DialogTrigger>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context: GetServerSidePropsContext,
) => {
  const hotelId = Number(context.query.hotelId);

  if (!hotelId) {
    return {
      notFound: true,
    };
  }
  const trpc = ssrHelper();
  await trpc.server.getHotel.prefetch({ hotelId });

  return {
    props: {
      trpcState: trpc.dehydrate(),
      hotelId,
    },
  };
};

export default HotelPage;
