// import './App.css'
import {Routing} from "./common/routing/Routing.tsx";
import Header from "./common/components/header/Header.tsx";

function App() {

    return (
        <>
            <Header/>
            <main>
                <Routing/>
            </main>
        </>
    )
}

export default App
