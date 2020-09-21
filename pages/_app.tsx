import React from "react";
import { AppProps } from "next/app";
import { Provider } from "jotai";
import { ThemeProvider } from "styled-components";
import { theme } from "@phobon/tokens";
import { AnimatePresence } from "framer-motion";

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <AnimatePresence exitBeforeEnter>
        <Provider>
          <Component {...pageProps} />
        </Provider>
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default App;
