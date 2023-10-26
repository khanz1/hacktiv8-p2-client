import { Image, Avatar, Text, Group, Badge, Rating } from "@mantine/core";
import classes from "../styles/MovieDetail.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { serverApi } from "../utils/serverApi";

export default function MovieDetailPage() {
  const [movie, setMovie] = useState({
    title: "",
    synopsis: "",
    imgUrl: "",
    rating: 5,
    author: {
      username: ""
    }
  });
  const params = useParams();

  useEffect(() => {
    const fetchMovie = async () => {
      const { data } = await serverApi.get(`/pub/movies/${params.id}`);
      console.log(data, "<< movie");
      setMovie(data);
    };

    fetchMovie();
  }, [params])

  return (
    <div>
      <Group wrap="nowrap" gap={0}>
        <Image src={movie.imgUrl} h={"100vh"} />
        <div className={classes.body}>
          <Text tt="uppercase" fw={700} size="xl">
            {movie.title}
          </Text>

          <Badge color="rgba(145, 145, 145, 1)">Adventure</Badge>
          <Text className={classes.title} mt="xs" mb="md" maw={600}>
            {movie.synopsis}
          </Text>
          <Rating value={movie.rating/2} fractions={2} readOnly />
          <Group wrap="nowrap" gap="xs">
            <Group gap="xs" wrap="nowrap">
              <Avatar
                size={50}
                src={`https://api.dicebear.com/7.x/lorelei-neutral/svg?seed=${movie.author.username}`}
              />
              <Text size="lg">- {movie.author.username}</Text>
            </Group>
          </Group>
        </div>
      </Group>
    </div>
  );
}
