import s from "../categoryMovies.module.css";

export const EmptyMoviesState = () => {
    return (
        <div className={s.emptyMoviesState}>
            Пока фильмов для вашкго региона нет, но надеемся скоро появятся
        </div>
    );
};
