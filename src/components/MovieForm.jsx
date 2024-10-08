import {
  Button,
  TextInput,
  Modal,
  Group,
  Stack,
  Select,
  Textarea,
} from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { serverApi } from "../utils/serverApi";
import { showErrorNotification } from "../utils/notification";
import Overlay from "./Overlay";

export function Form({ opened, close, onSubmit, movie, formState }) {
  const [genres, setGenres] = useState([]);
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState(1);
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [trailerUrl, setTrailerUrl] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchGenres = async () => {
      const { data } = await serverApi.get("/genres", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      setGenres(data);
      setGenre(data[0]?.name);
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    if (formState === "update") {
      setTitle(movie.title);
      setSynopsis(movie.synopsis);
      setGenre(movie.genre.name);
      setRating(movie.rating);
      setTrailerUrl(movie.trailerUrl || "");
      setImgUrl(movie.imgUrl);
    } else {
      setTitle("");
      setSynopsis("");
      setGenre(genres[0]?.name);
      setRating(1);
      setTrailerUrl("");
      setImgUrl("");
    }
  }, [movie, formState, opened]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setVisible(true);
    try {
      setVisible(true);
      await onSubmit({
        title,
        synopsis,
        genreId: genres.find(({ name }) => name === genre).id,
        rating,
        trailerUrl,
        imgUrl,
      });
    } catch (err) {
      showErrorNotification(err.response.data.message);
    } finally {
      setVisible(false);
    }
  };

  const genreList = useMemo(() => genres.map(({ name }) => name), [genres]);

  const actionTitle = useMemo(
    () => formState.charAt(0).toUpperCase() + formState.slice(1),
    [formState]
  );

  return (
    <Modal opened={opened} onClose={close} title={`${actionTitle} Movie`}>
      <Overlay state={visible}>
        <form onSubmit={handleSubmit}>
          <Stack>
            <TextInput
              data-autofocus
              label="Title"
              placeholder="Your name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <Textarea
              required
              label="Synopsis"
              placeholder="A Brief description of the movie"
              value={synopsis}
              onChange={(e) => setSynopsis(e.target.value)}
            />

            <Group justify="space-between" grow>
              <Select
                w="100%"
                label="Genre"
                data={genreList}
                value={genre}
                onChange={setGenre}
              />
              <Select
                w="100%"
                label="Rating"
                data={Array.from({ length: 10 }, (_, i) => i + 1)}
                value={rating}
                onChange={setRating}
              />
            </Group>

            <Group justify="space-between" grow>
              <TextInput
                required
                label="Image URL"
                placeholder="Your full path image url"
                value={imgUrl}
                onChange={(e) => setImgUrl(e.target.value)}
              />
              <TextInput
                label="Trailer URL"
                placeholder="Your full path trailer url"
                value={trailerUrl}
                onChange={(e) => setTrailerUrl(e.target.value)}
              />
            </Group>

            <Group justify="center">
              <Button type="submit">{actionTitle}</Button>
            </Group>
          </Stack>
        </form>
      </Overlay>
    </Modal>
  );
}
Form.propTypes = {
  opened: PropTypes.bool.isRequired,
  formState: PropTypes.oneOf(["create", "update"]).isRequired,
  close: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  movie: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    synopsis: PropTypes.string,
    trailerUrl: PropTypes.string,
    imgUrl: PropTypes.string,
    rating: PropTypes.number,
    genre: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    author: PropTypes.shape({
      id: PropTypes.number,
      username: PropTypes.string,
      email: PropTypes.string,
    }),
  }),
};
