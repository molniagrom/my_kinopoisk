import s from "./categoryMovies.module.css"
import {PopularMovies} from "./PopularMovies/PopularMovies.tsx";
import {TopRated} from "./TopRated/TopRated.tsx";
import {NowPlaying} from "./NowPlaying/NowPlaying.tsx";
import {Upcoming} from "./Upcoming/Upcoming.tsx";


export const CategoryMovies = () => {


    return (
        <div className={s.categoryMovies}>

            <PopularMovies/>
            <TopRated/>
            <NowPlaying/>
            <Upcoming/>

        </div>
    );
};
