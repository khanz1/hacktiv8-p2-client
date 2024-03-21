import React from "react";
import { Box, Loader, Text, Transition } from "@mantine/core";
import PropTypes from "prop-types";

export default function Loading({ state, children }) {
  if (state) {
    return (
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          justifyContent: "center",
          height: "25vh",
          alignItems: "center",
        }}
      >
        <Loader size={35} />
        <Text>Hold on while we fetch data...</Text>
      </Box>
    );
  }
  return (
    <Transition
      mounted={!state}
      transition="fade"
      duration={400}
      timingFunction="ease"
    >
      {(styles) => <div style={styles}>{children}</div>}
    </Transition>
  );
}

Loading.propTypes = {
  state: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};
