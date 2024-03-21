import {
  TextInput,
  PasswordInput,
  Paper,
  Text,
  Button,
  Box,
  Grid,
  Group,
  Textarea,
} from "@mantine/core";
import { useState } from "react";
import { serverApi } from "../utils/serverApi";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import {
  showErrorNotification,
  showSuccessNotification,
} from "../utils/notification";

export default function RegisterUserPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });
  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      await serverApi.post("/register", form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      showSuccessNotification("Staff has been created");

      navigate("/admin");
    } catch (err) {
      console.log(err, ",<< e");
      showErrorNotification(err.response.data.message);
    }
  };

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Box m={10} w={"100%"}>
      <Grid w={"100%"}>
        <Grid.Col span={{ md: 12, lg: 6 }}>
          <form onSubmit={handleOnSubmit}>
            <Paper shadow="md" p={30} radius="md" w="100%">
              <Text size="xl" fw={700}>
                Create Staff
              </Text>
              <Group grow my="lg">
                <TextInput
                  label="Username"
                  placeholder="xavier"
                  value={form.username}
                  name="username"
                  onChange={onChange}
                />

                <TextInput
                  label="Email"
                  placeholder="assistance.xavier@gmail.com"
                  required
                  name="email"
                  value={form.email}
                  onChange={onChange}
                />
              </Group>
              <Group grow my="lg">
                <PasswordInput
                  label="Password"
                  placeholder="Your password"
                  required
                  name="password"
                  value={form.password}
                  onChange={onChange}
                />

                <TextInput
                  label="phoneNumber"
                  placeholder="087884104417"
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={onChange}
                />
              </Group>
              <Textarea
                name="address"
                value={form.address}
                onChange={onChange}
                label="Address"
                placeholder="Input placeholder"
              />
              <Button fullWidth mt="xl" type="submit">
                Create
              </Button>
            </Paper>
          </form>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
