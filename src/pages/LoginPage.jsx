import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Container,
  Button,
} from "@mantine/core";
import { useState } from "react";
import { serverApi } from "../utils/serverApi";
import { useNavigate } from "react-router-dom";
import {
  showErrorNotification,
  showSuccessNotification,
} from "../utils/notification";

export default function LoginPage() {
  const [email, setEmail] = useState("assistance.xavier@gmail.com");
  const [password, setPassword] = useState("12345678");
  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await serverApi.post("/login", { email, password });
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("role", data.role);

      showSuccessNotification("Login success");
      navigate("/admin");
    } catch (err) {
      showErrorNotification(err.response.data.message);
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center">Welcome to MyMovieList!</Title>

      <form onSubmit={handleOnSubmit}>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Email"
            placeholder="you@mantine.dev"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button fullWidth mt="xl" type="submit">
            Sign in
          </Button>
        </Paper>
      </form>
    </Container>
  );
}
