import {useGetPopularMoviesQuery} from "../../../features/films/moviesApi.ts";
import Film from "../Film/Film.tsx";
import s from "./Trending.module.css";
import {FilmSlider} from "../FilmSlider/FilmSlider.tsx";
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";
import {Path} from "../../routing/Routing.tsx";

export const Trending = () => {
    const {data, isLoading, isError} = useGetPopularMoviesQuery({region: "MD", page: 1, language: "ru-RU"});
    const navigate = useNavigate();

    if (isLoading) {
        return <div className={s.trending}>Загрузка...</div>;
    }

    if (isError || !data) {
        return <div className={s.trending}>Ошибка при загрузке популярных фильмов.</div>;
    }

    const onClickHandler = () => {
        navigate(Path.CategoryMovies)
    }

    return (
        <div className={s.trending}>
            <h2>Trending</h2>
            <FilmSlider>
                {data.results
                    .filter(movie => movie.poster_path !== null)
                    .map((movie) => (
                        <Film
                            key={movie.id}
                            title={movie.original_title}
                            releaseDate={movie.release_date}
                            voteAverage={movie.vote_average}
                            posterPath={movie.poster_path as string}
                        />
                    ))}
            </FilmSlider>
            <Button onClick={onClickHandler}>View More</Button>
        </div>
    );
};
