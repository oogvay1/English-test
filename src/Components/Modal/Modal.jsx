import { useEffect, useRef, useState } from 'react';
import transition from '../../Transition';
import './Modal.css';
import useFetch from '../../Hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import video from '../../../public/ace4939aefe5a2c294d49273022c3503.mp4';

function Modal() {
    const [url, setUrl] = useState('http://localhost:8080/Users');
    const [saved, setSaved] = useState(false);
    const data = useFetch(url);
    const inputRef = useRef([]);
    const ageRef = useRef(null);
    const navigate = useNavigate();
    const [errorAge, setErrorAge] = useState(false);

    const initial = {
        name: "",
        lastname: "",
        birthdate: '',
        age: '',
        phone: ''
    };

    const [form, setForm] = useState(initial);

    const isValid = inputRef.current.every(
        (el) => el && el.value.trim() !== ''
    ) && form.age < 100;

    const saveData = async (e) => {
        e.preventDefault();

        if (isValid) {
            try {
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(form)
                });

                if (!response.ok) throw new Error('Failed to add user');

                const data = await response.json();
                localStorage.setItem("userId", data.id);
                setForm(initial);
                navigate('/tests');
            } catch (error) {
                console.error('Error adding user:', error);
            }
        } else {
            inputRef.current.forEach(el => {
                if (el && el.value.trim() === '') {
                    el.parentElement.style.borderBottom = '2px solid red';
                } else if (el) {
                    el.parentElement.style.borderBottom = '';
                }
            });
        }
    };

    const handleForm = (e) => {
        const { name, value } = e.target;
        const birthDate = new Date(value);

        if (name === 'birthdate') {
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();

            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }

            setForm({
                ...form,
                birthdate: value,
                age: age
            });
        } else {
            setForm({
                ...form,
                [name]: value
            });
        }

        if (saved) {
            inputRef.current.forEach(el => {
                if (el && el.value.trim() !== '') {
                    el.parentElement.style.borderBottom = '2px solid #fff';
                } else if (el) {
                    el.parentElement.style.borderBottom = '2px solid red';
                }
            });
        }
    };

    return (
        <>
            <div className="main-modal">
                <div className="Modal">
                    <div className="container">
                        <form className="form" onSubmit={saveData}>
                            <div className="form-inputs">
                                <label className='name'>
                                    <input ref={(el) => {
                                        if (el && !inputRef.current.includes(el)) {
                                            inputRef.current.push(el);
                                        }
                                    }} className={`input ${form.name ? 'filled' : ''}`} name='name' value={form.name} type="text" onChange={handleForm} autoComplete='off' />
                                    <h2 className='label-h2'>Name</h2>
                                    <i className="ri-user-line"></i>
                                </label>

                                <label className='name'>
                                    <input ref={(el) => {
                                        if (el && !inputRef.current.includes(el)) {
                                            inputRef.current.push(el);
                                        }
                                    }} className={`input ${form.lastname ? 'filledd' : ''}`} name='lastname' value={form.lastname} type="text" onChange={handleForm} autoComplete='off' />
                                    <h2 className='label-h2'>Lastname</h2>
                                    <i className="ri-user-line"></i>
                                </label>

                                <label className='name'>
                                    <input ref={(el) => {
                                        if (el && !inputRef.current.includes(el)) {
                                            inputRef.current.push(el);
                                        }
                                    }} className={`input ${form.phone ? 'filledd' : ''}`} name='phone' value={form.phone} type="tel" onChange={handleForm} autoComplete='off' />
                                    <h2 className='label-h2'>Phone</h2>
                                    <i className="ri-phone-line"></i>
                                </label>

                                <label ref={ageRef} className='name'>
                                    <input ref={(el) => {
                                        if (el && !inputRef.current.includes(el)) {
                                            inputRef.current.push(el);
                                        }
                                    }} className='input' name='birthdate' value={form.birthdate} type="date" onChange={handleForm} autoComplete='off' />
                                    {errorAge && <p className='valid-p'>Enter valid age</p>}
                                    <i className="ri-calendar-line"></i>
                                </label>
                            </div>

                            <button className='submit-btn' onClick={saveData}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>

            <video className='video' autoPlay muted loop width="100%">
                <source src={video} type="video/mp4" />
            </video>
        </>
    );
}

export default transition(Modal);
