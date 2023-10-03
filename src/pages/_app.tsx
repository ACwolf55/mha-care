import { type AppType } from "next/app";

import { api } from "~/utils/api";
import { Theme } from "@twilio-paste/core/dist/theme";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {

  return (
    <Theme.Provider theme='twilio'>
  <Component {...pageProps} />
  </Theme.Provider>
  )
};

export default api.withTRPC(MyApp);
