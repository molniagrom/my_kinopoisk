import s from "./categoryMovies.module.css"
import {PopularMovies} from "./PopularMovies/PopularMovies.tsx";
import {TopRated} from "./TopRated/TopRated.tsx";


export const CategoryMovies = () => {


    return (
        <div className={s.categoryMovies}>

            <PopularMovies/>
            <TopRated/>

        </div>
    );
};
