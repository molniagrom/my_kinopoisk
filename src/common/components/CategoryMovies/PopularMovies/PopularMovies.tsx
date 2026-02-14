// import s from "../categoryMovies.module.css";
// import Film from "../../Film/Film.tsx";
// import {useEffect, useState} from "react";
//
// import Button from "@mui/material/Button";
// import {MOVIES_TO_SHOW} from "../../../constants";
// import {useLazyGetPopularMoviesQuery} from "../../../../features/films/moviesApi.ts";
// import type {Movie} from "../../../../features/films/filmsApi.types.ts";
// import { selectPopularMovies } from "../../../../features/films/moviesSelectors.ts";
// import {useDispatch, useSelector} from "react-redux";
// import {setPopularMovies} from "../../../../features/films/moviesSlice.ts";
//
// export const PopularMovies = () => {
//     // Состояние для хранения всех загруженных фильмов
//     const allMovies = useSelector(selectPopularMovies);
//     const dispatch = useDispatch()
//     // const [allMovies, setAllMovies] = useState<Movie[]>([]);
//     // Состояние для отслеживания количества видимых фильмов
//     const [visibleCount, setVisibleCount] = useState(MOVIES_TO_SHOW);
//     // Состояние для номера страницы, запрашиваемой у API
//     const [apiPage, setApiPage] = useState(1);
//
//     const [fetchMovies, {data, isFetching}] =
//         useLazyGetPopularMoviesQuery();
//
//     // Загружаем первую страницу фильмов при монтировании компонента
//     useEffect(() => {
//          fetchMovies({page: apiPage});
//     }, [apiPage, fetchMovies]);
//
//     // Когда приходят новые данные от API, добавляем их в общий список
//     useEffect(() => {
//         if (data?.results) {
//             // Добавляем только те фильмы, которых еще нет в списке
//            dispatch(setPopularMovies(prevMovies => {
//                 const newMovies = data.results.filter(
//                     newMovie => !prevMovies.some(prevMovie => prevMovie.id === newMovie.id)
//                 );
//                 return [...prevMovies, ...newMovies];
//             }))
//         }
//     }, [data]);
//
//     const onClickHandler = () => {
//         const newVisibleCount = visibleCount + (MOVIES_TO_SHOW * 2);
//
//         // Если для показа следующих 5 фильмов не хватает данных, и загрузка не идет,
//         // запрашиваем следующую страницу у API
//         if (newVisibleCount > allMovies.length && !isFetching) {
//             setApiPage(prevPage => prevPage + 1);
//         }
//
//         setVisibleCount(newVisibleCount);
//     }
//
//     return (
//         <div>
//             <h1>Popular Movies</h1>
//             <div className={s.popularMovies}>
//                 {allMovies
//                     .slice(0, visibleCount) // Показываем только часть фильмов
//                     .filter(movie => movie.poster_path !== null)
//                     .map((movie) => (
//                         <Film
//                             key={movie.id}
//                             title={movie.original_title}
//                             releaseDate={movie.release_date}
//                             voteAverage={movie.vote_average}
//                             posterPath={movie.poster_path as string}
//                         />
//                     ))}
//                 {/* Показываем кнопку, только если есть еще фильмы для отображения */}
//                 {visibleCount < (data?.total_results || 0) && (
//                     <Button onClick={onClickHandler} disabled={isFetching}>
//                         {isFetching ? 'Loading...' : 'View More'}
//                     </Button>
//                 )}
//             </div>
//         </div>
//     )
// }

import s from "../categoryMovies.module.css";
import Film from "../../Film/Film.tsx";
import {useState} from "react";

import Button from "@mui/material/Button";
import {MOVIES_TO_SHOW} from "../../../constants";
import {useGetPopularMoviesQuery} from "../../../../features/films/moviesApi.ts";
import {EmptyMoviesState} from "../EmptyMoviesState/EmptyMoviesState.tsx";


export const PopularMovies = () => {
    // Состояние для отслеживания количества видимых фильмов
    const [visibleCount, setVisibleCount] = useState(MOVIES_TO_SHOW);
    // Состояние для номера страницы, запрашиваемой у API
    const [page, setPage] = useState(1);

    const {data, isFetching} = useGetPopularMoviesQuery({page});
    const allMovies = data?.results ?? [];

    const onClickHandler = () => {
        const newVisibleCount = visibleCount + (MOVIES_TO_SHOW * 2);

        // Если для показа следующих 5 фильмов не хватает данных, и загрузка не идет,
        // запрашиваем следующую страницу у API
        if (newVisibleCount > allMovies.length && !isFetching) {
            setPage(prevPage => prevPage + 1);
        }

        setVisibleCount(newVisibleCount);
    }

    return (
        <div>
            <h1>Popular Movies</h1>
            {!isFetching && allMovies.length === 0 && <EmptyMoviesState/>}
            <div className={s.popularMovies}>
                {allMovies
                    .slice(0, visibleCount) // Показываем только часть фильмов
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
                {/* Показываем кнопку, только если есть еще фильмы для отображения */}
                {visibleCount < (data?.total_results || 0) && (
                    <Button onClick={onClickHandler} disabled={isFetching}>
                        {isFetching ? 'Loading...' : 'View More'}
                    </Button>
                )}
            </div>
        </div>
    )
}
