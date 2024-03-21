import * as React from "react";
import Layout from "./Layout/index";
import { RecoilRoot } from "recoil";
import { SnackbarProvider, closeSnackbar } from "notistack";
import { 
  IconButton, 
  Icon
 } from '@midasit-dev/moaui';
 
export default function App() {
  return (
    <RecoilRoot>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        action={(key) => (
          <IconButton
            transparent
            transparentColor="white"
            onClick={() => closeSnackbar(key)}
          >
            <Icon iconName="Close" />
          </IconButton>
        )}
      >
        <Layout />
      </SnackbarProvider>
    </RecoilRoot>
  );
}
