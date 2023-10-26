import classes from "../styles/ImageCard.module.css";
import PropTypes from "prop-types";
import { Card, Text, Group } from "@mantine/core";
import { Link } from "react-router-dom";
/*
{
            "id": 1,
            "title": "Demon Slayer -Kimetsu no Yaiba- The Movie: Mugen Train",
            "synopsis": "Tanjiro Kamado, joined with Inosuke Hashibira, a boy raised by boars who wears a boar's head, and Zenitsu Agatsuma, a scared boy who reveals his true power when he sleeps, boards the Infinity Train on a new mission with the Fire Hashira, Kyojuro Rengoku, to defeat a demon who has been tormenting the people and killing the demon slayers who oppose it!",
            "trailerUrl": null,
            "imgUrl": "https://res.cloudinary.com/dpjqm8kkk/image/upload/v1697712163/movie-images/ad462f11ffbfbbfd5b86a8ad1bb89301.png",
            "rating": 8,
            "genre": {
                "id": 1,
                "name": "Animation"
            },
            "author": {
                "id": 1,
                "username": "xavier",
                "email": "assistance.xavier@gmail.com"
            }
        }
        */
export function MovieCard({ movie }) {
  return (
    <Link style={{ textDecoration: 'none' }} to={`/movies/${movie.id}`}>
      <Card
        p="lg"
        shadow="lg"
        className={classes.card}
        radius="md"
        w={250}
        h={350}
      >
        <div
          className={classes.image}
          style={{
            backgroundImage: `url(${movie.imgUrl})`,
          }}
        />
        <div className={classes.overlay} />

        <div className={classes.content}>
          <div>
            <Text size="lg" className={classes.title} fw={500}>
              {movie.title}
            </Text>

            <Group justify="space-between" gap="xs">
              <Text size="sm" className={classes.author}>
               {movie.genre.name} - {movie.author.username}
              </Text>
            </Group>
          </div>
        </div>
      </Card>
    </Link>
  );
}
MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    synopsis: PropTypes.string.isRequired,
    trailerUrl: PropTypes.string,
    imgUrl: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    genre: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    author: PropTypes.shape({
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};