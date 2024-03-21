import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { AppShell } from "@mantine/core";

export default function AdminLayout() {
  return (
    <AppShell
      navbar={{
        width: 250,
        breakpoint: "sm",
      }}
      padding="md"
    >
      <AppShell.Navbar p="md">
        <Sidebar />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
