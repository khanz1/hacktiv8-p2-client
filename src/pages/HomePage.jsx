import {
  Container,
  Pagination,
  Grid,
  Card,
  Input,
  InputLabel,
  Box,
  Select,
  Group,
  Text,
  Checkbox,
  Stack,
} from "@mantine/core";
import { MovieCard } from "../components/MovieCard";
import { IconSearch } from "@tabler/icons-react";
import { useEffect, useMemo, useState } from "react";
import { serverApi } from "../utils/serverApi";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [requestParams, setRequestParams] = useState({
    search: "",
    filter: [],
    sort: "-createdAt",
    page: {
      size: 8,
      number: 1,
    },
  });

  const setPage = (page) => {
    setRequestParams({
      ...requestParams,
      page: {
        ...requestParams.page,
        number: page,
      },
    });
  };

  useEffect(() => {
    const fetchGenres = async () => {
      const { data } = await serverApi.get("/pub/genres");
      setGenres(data);
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await serverApi.get("/pub/movies", {
        params: requestParams,
      });

      setMovies(data.data);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
      setTotalData(data.totalData);
    };

    fetchMovies();
  }, [requestParams]);

  const metaPage = useMemo(() => {
    const fromItem = requestParams.page.size * (currentPage - 1) + 1;
    return {
      fromItem,
      toItem: fromItem + movies.length - 1,
    };
  }, [requestParams, movies, currentPage]);

  const sorting = useMemo(() => {
    return {
      value: requestParams.sort[0].startsWith("-") ? `Latest` : `Oldest`,
    };
  }, [requestParams])

  return (
    <Container size="xl" my={25}>
      <Grid>
        <Grid.Col span={2}>
          <Card shadow="sm" radius="md" withBorder>
            <InputLabel>Search</InputLabel>
            <Input
              placeholder="Search Movie"
              leftSection={<IconSearch size={16} />}
              value={requestParams.search}
              onChange={(event) => {
                setRequestParams({
                  ...requestParams,
                  search: event.currentTarget.value,
                });
              }}
            />
            <Box my={10} />
            <InputLabel>Filter by Genre</InputLabel>
            <Stack my="sm">
              {genres.map((genre) => (
                <Checkbox
                  checked={requestParams.filter.includes(genre.id)}
                  label={genre.name}
                  onChange={(event) => {
                    let filter = requestParams.filter;
                    if (event.target.checked) {
                      filter.push(genre.id);
                    } else {
                      filter = filter.filter((id) => id !== genre.id);
                    }

                    setRequestParams({
                      ...requestParams,
                      filter,
                    });
                  }}
                  key={genre.id}
                />
              ))}
            </Stack>
          </Card>
        </Grid.Col>
        <Grid.Col span={10}>
          <Group justify="space-between" mb="md" mx="xl">
            <Select
              placeholder="Pick value"
              data={["Latest", "Oldest"]}
              value={sorting.value}
              onChange={(value) => {
                console.log(value, '<<< b')
                const sortBy =
                  value === "Latest" ? "-createdAt" : "createdAt";
                setRequestParams({
                  ...requestParams,
                  sort: sortBy,
                });
              }}
            />

            <Text>
              Showing {metaPage.fromItem} - {metaPage.toItem} movie from total{" "}
              {totalData}
            </Text>
          </Group>
          <div
            style={{
              display: "flex",
              gap: 5,
              flexWrap: "wrap",
              justifyContent: "center",
              alignContent: "flex-start",
            }}
          >
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Pagination
              my={20}
              value={+currentPage}
              total={totalPages}
              onChange={setPage}
            />
          </div>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
