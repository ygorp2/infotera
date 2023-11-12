import {
  type GetServerSideProps,
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
  type NextPage,
} from "next";
import Error from "next/error";
import Image from "next/image";
import AppForm from "~/components/app/form";
import Nav from "~/components/app/nav";
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
          <div className="mt-6 flex justify-center">
            <Image
              src={hotel.hotel.image}
              alt={`Foto do hotel: ${hotel.hotel.name}`}
              width={550}
              height={375}
              className="rounded-xl"
            />
            <div className="flex flex-col">
              <p className="text-2xl font-semibold text-[#07264C]">
                {hotel.hotel.name}
              </p>
            </div>
          </div>
        )}
      </div>
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
