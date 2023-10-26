import axios from 'axios';

export const serverApi = axios.create({
  baseURL: 'http://localhost:3000'
});

export const fetchAdminMovies = async () => {
  const { data } = await serverApi.get("/movies", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });

  return data;
}

export const fetchAdminGenres = async () => {
  const { data } = await serverApi.get("/genres", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });

  return data;
}