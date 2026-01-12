import s from "./welcome.module.css";
import Autocomplete from '@mui/material/Autocomplete';
import {TextField} from "@mui/material";
import {type SyntheticEvent, useState} from "react";
import {useFetchSearcheMoviesByTitleQuery} from "../../../features/films/moviesApi.ts";

export function Welcome() {
    const [inputValue, setInputValue] = useState('')

    const {data} = useFetchSearcheMoviesByTitleQuery({query: inputValue})

    const foundMovieTitles = data?.results.map(film => film.original_title) ?? []

    const onInputChangeHandler = (_event: SyntheticEvent, value: string) => {
        setInputValue(value);
    }

    return <div className={s.welcome}>
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