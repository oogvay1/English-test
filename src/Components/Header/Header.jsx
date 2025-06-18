import { NavLink } from 'react-router-dom';
import './Header.css'

function Header() {

    return (
        <>
            <header className='header'>
                <div className="container">
                    <div className="header-inner">
                        <div className="header-logo">
                            <NavLink to="/" >
                                <img src="src/assets/imgs/11427f39c15a1b292c23c__2_-removebg-preview.png" alt="" />
                                <h1>Quizz</h1>
                            </NavLink>
                        </div>

                        <div className="header-mode">
                            <i class="ri-sun-line sun"></i>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header
