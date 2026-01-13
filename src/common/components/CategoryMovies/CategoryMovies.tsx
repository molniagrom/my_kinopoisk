import s from "./categoryMovies.module.css"
import {PopularMovies} from "./PopularMovies/PopularMovies.tsx";


export const CategoryMovies = () => {


    return (
        <div className={s.categoryMovies}>

            <PopularMovies/>

        </div>
    );
};
