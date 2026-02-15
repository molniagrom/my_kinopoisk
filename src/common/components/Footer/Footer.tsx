import s from "./footer.module.css";

export const Footer = () => {
    return (
        <footer className={s.footer}>
            <p className={s.text}>{"\u00A9 2025 Kinopoisk Demo \u00B7 Data courtesy of TMDB."}</p>
        </footer>
    );
};
