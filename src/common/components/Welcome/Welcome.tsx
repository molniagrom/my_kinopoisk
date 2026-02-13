import s from "./welcome.module.css";
import Autocomplete from '@mui/material/Autocomplete';
import {TextField} from "@mui/material";
import {type CSSProperties, type SyntheticEvent, useEffect, useState} from "react";
import {
    useFetchSearcheMoviesByTitleQuery,
    useGetPopularMoviesBackdropQuery,
} from "../../../features/films/moviesApi.ts";

export function Welcome() {
    const [inputValue, setInputValue] = useState('')

    const {data} = useFetchSearcheMoviesByTitleQuery({query: inputValue})
    const {data: popularMoviesData} = useGetPopularMoviesBackdropQuery()

    const foundMovieTitles = data?.results.map(film => film.original_title) ?? []

    const [randomBackdropPath, setRandomBackdropPath] = useState<string | null>(null)

    useEffect(() => {
        const moviesWithBackdrop = popularMoviesData?.results.filter(movie => movie.backdrop_path)

        if (!moviesWithBackdrop?.length) {
            return
        }

        const timeoutId = window.setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * moviesWithBackdrop.length)
            setRandomBackdropPath(moviesWithBackdrop[randomIndex].backdrop_path)
        }, 0)

        return () => window.clearTimeout(timeoutId)
    }, [popularMoviesData])

    const welcomeStyle: CSSProperties | undefined = randomBackdropPath
        ? {
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("https://image.tmdb.org/t/p/original${randomBackdropPath}")`,
        }
        : undefined

    const onInputChangeHandler = (_event: SyntheticEvent, value: string) => {
        setInputValue(value);
    }

    return <div className={s.welcome} style={welcomeStyle}>
        <section className={s.hero__content}>
            <div className={s.content__wrapper}>
                <div className={s.text}>
                    <h1>Welcome.</h1>
                    <p>
                        Millions of movies, TV shows and people to discover. Explore now.
                    </p>
                </div>
                <form role="search" className={s.hero__search}>
                    <Autocomplete
                        className={s.autocomplete}
                        onInputChange={onInputChangeHandler}
                        disablePortal
                        options={foundMovieTitles}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Movie"
                                className={s.textField}
                            />
                        )}
                    />
                    <button type="submit">Search</button>
                </form>
            </div>
        </section>
    </div>;
}
