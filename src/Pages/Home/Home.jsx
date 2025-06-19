import './Home.css'
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import transition from '../../Transition';
import Modal from '../../Components/Modal/Modal';
import { useState } from 'react';

function Home() {

    return (
        <>
            <section className='section'>
                <div className="container">
                    <div className="section-inner">
                        <h1>Al Aziz Academy Test</h1>
                        <p>Click the button below and start the preview test</p>
                        <NavLink to="/tests">
                            <button className='btn' >
                                <i class="ri-arrow-right-line"></i>
                                <p>Start</p>
                                <i class="ri-arrow-right-line"></i>
                            </button>
                        </NavLink>
                        <NavLink to="/login">
                            <button className='btn' >
                                <i class="ri-arrow-right-line"></i>
                                <p>Start</p>
                                <i class="ri-arrow-right-line"></i>
                            </button>
                        </NavLink>
                    </div>
                </div>
            </section>
            <video className='video' autoPlay muted loop width="100%">
                <source src="src/assets/imgs/ace4939aefe5a2c294d49273022c3503.mp4" type="video/mp4" />
            </video>
        </>
    );
}

export default transition(Home)
