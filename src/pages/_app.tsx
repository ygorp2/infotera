import { type AppType } from "next/app";

import { Poppins } from "next/font/google";
import { api } from "~/utils/api";

import "~/styles/globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={poppins.className}>
      <Component {...pageProps} />;
    </div>
  );
};

export default api.withTRPC(MyApp);
