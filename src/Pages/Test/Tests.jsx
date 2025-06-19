import Modal from '../../Components/Modal/Modal';
import "./Test.css";
import { useState } from "react";

function Tests() {
    return (
        <>
            <section>
                <div className="test-user">
                    <div className="container">
                        <video className="video" autoPlay muted loop width="100%">
                            <source
                                src="src/assets/imgs/ace4939aefe5a2c294d49273022c3503.mp4"
                                type="video/mp4"/>
                        </video>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Tests;
