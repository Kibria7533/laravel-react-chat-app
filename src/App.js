import React from "react";
import { PusherProvider } from "@harelpls/use-pusher";
import Example from "./Example";
const config = {
  // required config props
  clientKey: "e07a1de7d158f0f09e94",
  cluster: "ap2",
};

const App = () => {
  return(
      <>
      <h1>Messege:::</h1>
          <PusherProvider {...config}>
              <Example />
          </PusherProvider>
      </>
  )
};



export  default  App;