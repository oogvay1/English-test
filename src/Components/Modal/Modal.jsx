import { useRef, useState } from 'react';
import transition from '../../Transition';
import './Modal.css'

function Modal() {

    let [form, setForm] = useState(
        {
            name: "",
            lastname: "",
            birthdate: ""
        }
    )

    const handleForm = (e) => {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value
        })
    }

    let age = 0;
    if (form.birthdate) {
        const today = new Date();
        const birthDate = new Date(form.birthdate);
        age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        const d = today.getDay() - birthDate.getDay();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()) || d < 0) {
            age--;
        }
    }

    const saveData = (e) => {
        
    }

    return (
        <>
            <div className="main-modal">
                <div className="Modal">
                    <div className="container">
                        <form className="form" onSubmit={(e) => saveData(e)}>
                            <label className='name'>
                                <input className='input' name='name' type="text" onChange={(e) => handleForm(e)} required />
                                <h2 className='label-h2'>Name</h2>
                                <i className="ri-user-line"></i>
                            </label>

                            <label className='name'>
                                <input className='input' name='lastname' type="text" onChange={(e) => handleForm(e)} required />
                                <h2 className='label-h2'>Lastname</h2>
                                <i className="ri-user-line"></i>
                            </label>

                            <label className='name'>
                                <input className='input' name='birthdate' type="date" onChange={(e) => handleForm(e)} required />
                                <i class="ri-calendar-line"></i>
                            </label>

                            <button className='submit-btn' >Submit</button>
                        </form>
                    </div>
                </div>
            </div>

            <video className='video' autoPlay muted loop width="100%">
                <source src="src/assets/imgs/ace4939aefe5a2c294d49273022c3503.mp4" type="video/mp4" />
            </video>
        </>
    );
}

export default transition(Modal)
