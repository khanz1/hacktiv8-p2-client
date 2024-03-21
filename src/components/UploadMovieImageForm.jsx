import PropTypes from "prop-types";
import { Group, Text, rem, Button, Modal } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useRef, useState } from "react";

export function UploadMovieImageForm(props) {
  const openRef = useRef(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  return (
    <Modal
      opened={props.opened}
      onClose={props.close}
      title="Upload New Cover Image"
      size="lg"
    >
      <Dropzone
        openRef={openRef}
        loading={isProcessing}
        onDrop={(file) => props.onDrop(file, setIsProcessing)}
        maxSize={3 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
      >
        <Group
          justify="center"
          gap="xl"
          mih={220}
          style={{ pointerEvents: "none" }}
        >
          <Dropzone.Accept>
            <IconUpload
              style={{
                width: rem(52),
                height: rem(52),
                color: "var(--mantine-color-blue-6)",
              }}
              stroke={1.5}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              style={{
                width: rem(52),
                height: rem(52),
                color: "var(--mantine-color-red-6)",
              }}
              stroke={1.5}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto
              style={{
                width: rem(52),
                height: rem(52),
                color: "var(--mantine-color-dimmed)",
              }}
              stroke={1.5}
            />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              Drag images here or click to select files
            </Text>
            <Text size="sm" c="dimmed" inline mt={7}>
              Attach as many files as you like, each file should not exceed 5mb
            </Text>
          </div>
        </Group>
      </Dropzone>

      {!isProcessing && (
        <Group justify="center" mt="md">
          <Button onClick={() => openRef.current?.()}>
            Select files
          </Button>
        </Group>
      )}
    </Modal>
  );
}

UploadMovieImageForm.propTypes = {
  opened: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
};
