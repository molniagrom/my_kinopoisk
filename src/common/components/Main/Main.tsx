import s from "./main.module.css"
import {Welcome} from "../Welcome/Welcome.tsx";
import { Trending } from "../Trending/Trending.tsx";

export const Main = () => {

    return (
        <div className={s.main}>
            <Welcome/>
            <Trending/>
        </div>
    );
};

export default Main;
