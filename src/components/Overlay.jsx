import React from 'react';
import { Box, LoadingOverlay } from '@mantine/core';
import PropTypes from 'prop-types';

export default function Overlay({ state, children }) {
  return (
    <Box>
      <LoadingOverlay
        visible={state}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      {children}
    </Box>
  )
}

Overlay.propTypes = {
  state: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};