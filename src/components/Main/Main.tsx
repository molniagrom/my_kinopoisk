import s from "./main.module.css"

export const Main = () => {

    return (
        <div className={s.main}>
            <div className={s.welcome}>
                <section className={s.hero__content}>
                    <div className={s.content__wrapper}>
                        <div className={s.text}>
                            <h1>Welcome.</h1>

                            <p>
                                Millions of movies, TV shows and people to discover. Explore now.
                            </p>
                        </div>
                        <form role="search" className={s.hero__search}>
                            <input
                                id="search"
                                type="search"
                                name="query"
                                placeholder="Search for a movie, tv show, person…"
                            />

                            <button type="submit">Search</button>
                        </form>
                    </div>
                </section>
            </div>

        </div>
    );
};

export default Main;
