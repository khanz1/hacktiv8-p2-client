import { Image, Avatar, Text, Group, Badge, Rating, ActionIcon, Box, Stack } from "@mantine/core";
import classes from "../styles/MovieDetail.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { serverApi } from "../utils/serverApi";
import { IconArrowBack } from "@tabler/icons-react";

export default function MovieDetailPage() {
  const navigate = useNavigate();
  const [movie, setMovie] = useState({
    title: "",
    synopsis: "",
    imgUrl: "",
    rating: 5,
    author: {
      username: "",
    },
  });
  const params = useParams();

  useEffect(() => {
    const fetchMovie = async () => {
      const { data } = await serverApi.get(`/pub/movies/${params.id}`);
      setMovie(data);
    };

    fetchMovie();
  }, [params]);

  return (
    <Box>
      <ActionIcon
        style={{ position: "absolute", top: "1%", left: "1%" }}
        variant="subtle"
        color="gray"
        size="xl"
        radius="xs"
        aria-label="Button Back"
        onClick={() => navigate(-1)}
      >
        <IconArrowBack style={{ width: "70%", height: "70%" }} stroke={1.5} />
      </ActionIcon>
      <Group wrap="nowrap" grow justify="space-between" gap={"lg"}>
        <Image src={movie.imgUrl} h="100vh" />
        <Stack gap="xs">
          <Text tt="uppercase" fw={700} size="xl">
            {movie.title}
          </Text>

          <Badge color="rgba(145, 145, 145, 1)">Adventure</Badge>
          <Text className={classes.title} mt="xs" mb="md" maw={600}>
            {movie.synopsis}
          </Text>
          <Rating value={movie.rating / 2} fractions={2} readOnly />
          <Group wrap="nowrap" gap="xs">
            <Group gap="xs" wrap="nowrap">
              <Avatar
                size={50}
                src={`https://api.dicebear.com/7.x/lorelei-neutral/svg?seed=${movie.author.username}`}
              />
              <Text size="lg">- {movie.author.username}</Text>
            </Group>
          </Group>
        </Stack>
      </Group>
    </Box>
  );
}
