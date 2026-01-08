import { useGetPopularMoviesQuery } from "../../../features/films/moviesApi.ts";
import Film from "../Film/Film.tsx";
import s from "./Trending.module.css";
import { FilmSlider } from "../FilmSlider/FilmSlider.tsx";

export const Trending = () => {
    const { data, isLoading, isError } = useGetPopularMoviesQuery({ region: "MD", page: 1, language: "ru-RU" });

    if (isLoading) {
        return <div className={s.trending}>Загрузка...</div>;
    }

    if (isError || !data) {
        return <div className={s.trending}>Ошибка при загрузке популярных фильмов.</div>;
    }

    return (
        <div className={s.trending}>
            <h2>Популярные фильмы</h2>
            <FilmSlider>
                {data.results
                    .filter(movie => movie.poster_path !== null)
                    .map((movie) => (
                        <Film
                            key={movie.id}
                            title={movie.original_title}
                            releaseDate={movie.release_date}
                            voteAverage={movie.vote_average}
                            posterPath={movie.poster_path}
                        />
                    ))}
            </FilmSlider>
        </div>
    );
};
