import './App.css'
import {Routing} from "./common/routing/Routing.tsx";
import Header from "./common/components/header/Header.tsx";
import { Footer } from "./common/components/Footer/Footer.tsx";

function App() {

    return (
        <div className="app">
            <Header/>
            <main className="appMain">
                <Routing/>
            </main>
            <Footer />
        </div>
    )
}

export default App
