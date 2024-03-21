import { Table, Anchor, Text, Box } from "@mantine/core";
import { useEffect, useState } from "react";
import { fetchAdminGenres } from "../utils/serverApi";
import Loading from "../components/Loading";
import { showErrorNotification } from "../utils/notification";

export default function GenreListPage() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setLoading(true);
        const data = await fetchAdminGenres();

        setGenres(data);
      } catch (err) {
        showErrorNotification(err.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  return (
    <Box m={10} w={"100%"}>
      <Text size="xl" fw={700} my="lg">
        List of Genres
      </Text>
      <Loading state={loading}>
        <Table.ScrollContainer minWidth={800}>
          <Table highlightOnHover verticalSpacing="xs">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>No</Table.Th>
                <Table.Th>Name</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {genres.map((genre, i) => (
                <Table.Tr key={genre.id}>
                  <Table.Td>
                    <Anchor component="button" fz="sm">
                      {i + 1}
                    </Anchor>
                  </Table.Td>
                  <Table.Td>{genre.name}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Loading>
    </Box>
  );
}
