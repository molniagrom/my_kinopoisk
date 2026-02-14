import s from "../categoryMovies.module.css";
import Film from "../../Film/Film.tsx";
import {useState} from "react";
import Button from "@mui/material/Button";
import {MOVIES_TO_SHOW} from "../../../constants";
import {useGetUpcomingMoviesQuery} from "../../../../features/films/moviesApi.ts";
import {EmptyMoviesState} from "../EmptyMoviesState/EmptyMoviesState.tsx";

export const Upcoming = () => {
    const [visibleCount, setVisibleCount] = useState(MOVIES_TO_SHOW);
    const [page, setPage] = useState(1);

    const {data, isFetching} = useGetUpcomingMoviesQuery({page});
    const allMovies = data?.results ?? [];

    const onClickHandler = () => {
        const newVisibleCount = visibleCount + (MOVIES_TO_SHOW * 2);

        if (newVisibleCount > allMovies.length && !isFetching) {
            setPage(prevPage => prevPage + 1);
        }

        setVisibleCount(newVisibleCount);
    };

    return (
        <div>
            <h1>Upcoming</h1>
            {!isFetching && allMovies.length === 0 && <EmptyMoviesState/>}
            <div className={s.popularMovies}>
                {allMovies
                    .slice(0, visibleCount)
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
                {visibleCount < (data?.total_results || 0) && (
                    <Button onClick={onClickHandler} disabled={isFetching}>
                        {isFetching ? 'Loading...' : 'View More'}
                    </Button>
                )}
            </div>
        </div>
    );
};
