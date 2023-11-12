import { type NextPage } from "next";
import AppForm from "~/components/app/form";
import HotelsList from "~/components/app/hotels-list";
import Nav from "~/components/app/nav";

const SearchPage: NextPage = () => {
  return (
    <div className="w-full">
      <Nav />
      <AppForm />
      <HotelsList />
    </div>
  );
};

export default SearchPage;
