import React, { Suspense } from "react";
import { AppProps } from "next/app";
import { Provider } from "jotai";
import { ThemeProvider } from "@emotion/react";
import { theme } from "@phobon/tokens";
import { AnimatePresence } from "framer-motion";

import { GlobalCanvas } from "@/components/GlobalCanvas";

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <AnimatePresence exitBeforeEnter>
        <Provider>
          <GlobalCanvas>
            <Component {...pageProps} />
          </GlobalCanvas>
        </Provider>
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default App;
