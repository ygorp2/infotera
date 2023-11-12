import Footer from "~/components/app/footer";
import AppForm from "~/components/app/form";
import Nav from "~/components/app/nav";
import Title from "~/components/app/title";

export default function Home() {
  return (
    <div className="w-full">
      <Nav />
      <div className="mt-44">
        <Title />
      </div>
      <AppForm />
      <Footer />
    </div>
  );
}
