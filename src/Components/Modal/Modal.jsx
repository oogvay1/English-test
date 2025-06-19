import { useEffect, useRef, useState } from 'react';
import transition from '../../Transition';
import './Modal.css'
import useFetch from '../../Hooks/useFetch';

function validObj(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return false;
    }

    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const value = obj[key];
            if (typeof value === 'string' || Array.isArray(value)) {
                if (value.length <= 1) {
                    return false;
                }
            } else {
                return false;
            }
        }
    }

    return true;
}


function Modal() {

    let [url, setUrl] = useState('http://localhost:8080/Users');
    const data = useFetch(url);
    let age = 0;

    let [form, setForm] = useState(
        {
            name: "",
            lastname: "",
            birthdate: '10-10-1000'
        }
    )


    const saveData = async (e) => {
        e.preventDefault()

        if (form.birthdate, form.lastname, form.name) {
            try {
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(form)
                });

                if (!response.ok) {
                    throw new Error('Failed to add user');
                }

                const data = await response.json();
                console.log('User added:', data);

                setForm({
                    name: '',
                    lastname: '',
                    birthdate: ''
                });

            } catch (error) {
                console.error('Error adding user:', error);
            }
        }
    }

    const handleForm = (e) => {
        const { name, value } = e.target;

        if (name === 'birthdate') {
            const today = new Date();
            const birthDate = new Date(value);
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();

            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }

            console.log('Calculated age:', age);

            setForm({
                ...form,
                birthdate: age
            });
        } else {
            setForm({
                ...form,
                [name]: value
            });
        }
    };


    return (
        <>
            <div className="main-modal">
                <div className="Modal">
                    <div className="container">
                        <form className="form" onSubmit={(e) => saveData(e)}>
                            <div className="form-inputs">
                                <label className='name'>
                                    <input className='input' name='name' value={form.name} type="text" onChange={(e) => handleForm(e)} required autoComplete='off' />
                                    <h2 className='label-h2'>Name</h2>
                                    <i className="ri-user-line"></i>
                                </label>

                                <label className='name'>
                                    <input className='input' name='lastname' value={form.lastname} type="text" onChange={(e) => handleForm(e)} required autoComplete='off' />
                                    <h2 className='label-h2'>Lastname</h2>
                                    <i className="ri-user-line"></i>
                                </label>

                                <label className='name'>
                                    <input className='input' name='birthdate' type="date" onChange={(e) => handleForm(e)} required autoComplete='off' />
                                    <i className="ri-calendar-line"></i>
                                </label>
                            </div>

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
