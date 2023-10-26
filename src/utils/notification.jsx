import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
export const showErrorNotification = (message) => {
  notifications.show({
    title: "Error",
    color: "red",
    icon: <IconX />,
    message,
  });
}

export const showSuccessNotification = (message) => {
  notifications.show({
    title: "Success",
    color: "green",
    icon: <IconCheck />,
    message,
  });
}