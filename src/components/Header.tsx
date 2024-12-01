import { Link } from "react-router-dom";

export default function Header() {
    return (
        <nav>
            <h1>Which Element Are You?</h1>
            <h3>&#40;Based on Complete Random Things!&#41;</h3>
            <Link to='/'>Home</Link>
            <Link to='/quiz'>Quiz</Link>
        </nav>
    );
} // HEADER