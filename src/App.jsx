
import { MantineProvider } from '@mantine/core';
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { Notifications } from "@mantine/notifications";

function App() {
  return (
    <>
      <MantineProvider defaultColorScheme="dark">
        <Notifications />
        <RouterProvider router={router} />
      </MantineProvider>
    </>
  );
}

export default App
