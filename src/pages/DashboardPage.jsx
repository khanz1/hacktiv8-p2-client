import {
  Table,
  Anchor,
  Text,
  Group,
  ScrollArea,
  Button,
  ActionIcon,
  rem,
  Box,
  Tooltip,
  ScrollAreaAutosize,
} from "@mantine/core";
import { IconPlus, IconPencil, IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { fetchAdminMovies, serverApi } from "../utils/serverApi";
import Sidebar from "../components/Sidebar";
import { useDisclosure } from "@mantine/hooks";
import { Form } from "../components/MovieForm";
import { UploadMovieImageForm } from "../components/UploadMovieImageForm";
import {
  showErrorNotification,
  showSuccessNotification,
} from "../utils/notification";

const initialSelectedMovie = {
  id: 0,
  title: "",
  synopsis: "",
  genre: { name: "" },
  rating: 1,
  trailerUrl: "",
  imgUrl: "",
};

export default function DashboardPage() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(initialSelectedMovie);
  const [opened, { open, close }] = useDisclosure(false);
  const [uploadOpened, { open: openUpload, close: closeUpload }] =
    useDisclosure(false);
  const [formState, setFormState] = useState("create");

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await fetchAdminMovies();

      setMovies(data);
    };

    fetchMovies();
  }, []);

  const handleCreateMovie = async (form) => {
    try {
      const { data } = await serverApi.post("/movies", form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      if (data) {
        showSuccessNotification("Movie has been created");
        const dataMovies = await fetchAdminMovies();
        setMovies(dataMovies);
        close();
      }
    } catch (err) {
      showErrorNotification(err.response.data.message);
    }
  };

  const handleUpdateMovie = async (form) => {
    try {
      const { data } = await serverApi.put("/movies/" + selectedMovie.id, form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      if (data) {
        showSuccessNotification("Movie has been updated");
        const dataMovies = await fetchAdminMovies();
        setMovies(dataMovies);
        setSelectedMovie(initialSelectedMovie);
        close();
      }
    } catch (err) {
      showErrorNotification(err.response.data.message);
    }
  };

  const handleUploadImage = async (file, setIsProcessing) => {
    setIsProcessing(true);
    const formData = new FormData();
    formData.append("image", file[0]);

    try {
      const { data } = await serverApi.patch(
        `/movies/${selectedMovie.id}/image_url`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (data) {
        showSuccessNotification("Image has been updated");
        const dataMovies = await fetchAdminMovies();
        setMovies(dataMovies);
        closeUpload();
      }
    } catch (err) {
      showErrorNotification(err.response.data.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteMovie = async (movie) => {
    try {
      const { data } = await serverApi.delete(`/movies/${movie.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      if (data) {
        showSuccessNotification("Movie has been deleted");
        const dataMovies = await fetchAdminMovies();
        setMovies(dataMovies);
      }
    } catch (err) {
      showErrorNotification(err.response.data.message);
    }
  };

  const handleOpenEditForm = (movie) => {
    setSelectedMovie(movie);
    setFormState("update");
    open();
  };

  const handleOpenCreateForm = () => {
    setFormState("create");
    open();
  };

  const handleOnUploadOpen = (movie) => {
    setSelectedMovie(movie);
    openUpload();
  };

  return (
    <Box>
      <UploadMovieImageForm
        opened={uploadOpened}
        close={closeUpload}
        onDrop={handleUploadImage}
      />
      <Form
        formState={formState}
        movie={selectedMovie}
        opened={opened}
        open={open}
        close={close}
        onSubmit={(form) => {
          if (formState === "create") {
            handleCreateMovie(form);
          } else {
            handleUpdateMovie(form);
          }
        }}
      />
      <Box style={{ position: 'sticky', top: 0 }}>
        <Group justify="space-between" align="center" py="lg">
          <Text size="xl" fw={700}>
            List of Movies
          </Text>
          <Button
            variant="filled"
            leftSection={<IconPlus />}
            onClick={handleOpenCreateForm}
          >
            Create
          </Button>
        </Group>
        <ScrollArea>
          <Table highlightOnHover verticalSpacing="xs">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>No</Table.Th>
                <Table.Th>Title</Table.Th>
                <Table.Th>Synopsis</Table.Th>
                <Table.Th>Image</Table.Th>
                <Table.Th>Rating</Table.Th>
                <Table.Th>Author</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {movies.map((movie, i) => {
                return (
                  <Table.Tr key={movie.id}>
                    <Table.Td>
                      <Anchor component="button" fz="sm">
                        {i + 1}
                      </Anchor>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm">{movie.title}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm">{movie.synopsis}</Text>
                    </Table.Td>
                    <Table.Td
                      style={{
                        cursor: movie.isImageUpdatable ? "pointer" : "inherit",
                      }}
                      onClick={() =>
                        movie.isImageUpdatable && handleOnUploadOpen(movie)
                      }
                    >
                      {movie.isImageUpdatable ? (
                        <Tooltip label="Click to update image">
                          <img
                            width={150}
                            src={movie.imgUrl}
                            alt={`poster of movie ${movie.title}`}
                          />
                        </Tooltip>
                      ) : (
                        <img
                          width={150}
                          src={movie.imgUrl}
                          alt={`poster of movie ${movie.title}`}
                        />
                      )}
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm">{movie.rating}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm">{movie.author.username}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Group gap={0} justify="flex-end">
                        {movie.isUpdatable && (
                          <ActionIcon variant="subtle" color="gray">
                            <IconPencil
                              onClick={() => handleOpenEditForm(movie)}
                              style={{ width: rem(16), height: rem(16) }}
                              stroke={1.5}
                            />
                          </ActionIcon>
                        )}
                        {movie.isDeletable && (
                          <ActionIcon variant="subtle" color="red">
                            <IconTrash
                              onClick={() => handleDeleteMovie(movie)}
                              style={{ width: rem(16), height: rem(16) }}
                              stroke={1.5}
                            />
                          </ActionIcon>
                        )}
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                );
              })}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      </Box>
    </Box>
  );
}
