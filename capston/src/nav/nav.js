import { Link } from 'react-router-dom';
import "../css/nav/nav.css";

function App() {
  return (
    <div className='navStyle'>
        <Link to="/empinfo">
            <span>기본정보</span>
        </Link>

        <Link to="/2">
            <span>인사/조직관리</span>
        </Link>

        <Link to="/3">
            <span>근태관리</span>
        </Link>

        <Link to="/4">
            <span>급여관리</span>
        </Link>

        <Link to="/5">
            <span>퇴직관리</span>
        </Link>
    </div>
  );
}

export default App;
