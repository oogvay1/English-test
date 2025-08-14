import { useEffect, useRef, useState } from 'react';
import transition from '../../Transition';
import './Modal.css';
import useFetch from '../../Hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import video from '../../../public/ace4939aefe5a2c294d49273022c3503.mp4';
import ScrollVelocity from '../Background/Background';
import Loader from '../Loader';

function Modal() {
    const [url, setUrl] = useState('https://english-test-l6zz.onrender.com/Users');
    const [saved, setSaved] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef([]);
    const ageRef = useRef(null);
    const navigate = useNavigate();
    const [errorAge, setErrorAge] = useState(false);
    const [branchName, setBranchName] = useState('Select branch');
    const [categoryName, setCategoryName] = useState('Select category');
    const cate = useState([]);
    const cateRef = useRef(null);
    const formRef = useRef(null);

    const initial = {
        name: "",
        lastname: "",
        birthdate: '',
        age: '',
        phone: '',
        branch: '',
        category: '',
    };
    console.log(isLoading)
    const [form, setForm] = useState(initial);

    const isValid = inputRef.current.every(
        (el) => el && el.value.trim() !== ''
    ) && form.age < 100 && form.branch !== 'Select branch' && form.branch !== '';

    const saveData = async (e) => {
        e.preventDefault();

        if (form.age > 80) {
            setErrorAge(true);
        } else {
            setErrorAge(false);
        }

        if (isValid) {

            try {
                setIsLoading(true);

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
                navigate('/tests', {
                    state: {
                        selectedLevel: form.category
                    }
                });
            } catch (error) {
                console.error('Error adding user:', error);
            } finally {
                setIsLoading(false);
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
                age: age,
            });
        } else {
            setForm({
                ...form,
                [name]: value,
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

    useEffect(() => {
        setForm({
            ...form,
            branch: branchName,
            category: categoryName
        })
    }, [branchName, categoryName])

    const [branch, setBranch] = useState([]);
    const text = useRef(null);

    useEffect(() => {
        const li = document.querySelectorAll('.drop-li');

        li.forEach((el, index) => {
            el.addEventListener('click', () => {
                branch.push(el.textContent)
                document.querySelector('.ul').classList.remove('open')
                text.current.style.filter = "blur(0px)";
                document.querySelector('.ul').classList.add('close');
                document.querySelectorAll('.name').forEach(el => el.style.filter = 'blur(0px)')
                cateRef.current.style.filter = "blur(0px)";
                let selected = branch[branch.length - 1];
                setBranchName(selected)
            })
        });

        text.current.addEventListener('click', () => {
            document.querySelector('.ul-cate').classList.remove('open')
            document.querySelector('.ul').classList.remove('close')
            text.current.style.filter = "blur(7px)";
            cateRef.current.style.filter = "blur(7px)";
            document.querySelectorAll('.name').forEach(el => el.style.filter = 'blur(5px)')
            document.querySelector('.ul').classList.add('open');
        })
    }, [])

    useEffect(() => {
        const li = document.querySelectorAll('.drop-li2');

        li.forEach(el => {
            el.addEventListener('click', () => {
                cate.push(el.textContent);
                document.querySelector('.ul-cate').classList.remove('open');
                document.querySelector('.ul-cate').classList.add('close');
                cateRef.current.style.filter = "blur(0px)";
                document.querySelectorAll('.name').forEach(el => el.style.filter = 'blur(0px)')
                let selected = cate[cate.length - 1];
                text.current.style.filter = "blur(0px)";
                setCategoryName(selected);
            });
        });

        cateRef.current.addEventListener('click', () => {
            document.querySelector('.ul-cate').classList.remove('open')
            cateRef.current.style.filter = "blur(7px)";
            document.querySelector('.ul-cate').classList.add('open');
            document.querySelectorAll('.name').forEach(el => el.style.filter = 'blur(5px)')
            text.current.style.filter = "blur(7px)";
            document.querySelector('.ul').classList.remove('close')
        })
    }, [])
    const filial = ["Niyozbosh", "Gulbahor", "Xalqabod", "Do`stobod", "Olmazor", "Kasblar", "Kids", "Konditerski", "Chinoz"];
    const categoryList = ["Beginner", "Beg - Ele", "Ele - Pre-Inter", "Pre-Inter - Inter", "All"]

    return (
        <>
            <div className="main-modal">
                <div className="container">
                    <div className="Modal">
                        <form ref={formRef} className="form" onSubmit={saveData}>

                            <div className="form-drops">
                                <div className="drop-down">
                                    <h1 name="branch" ref={text}>{branchName}</h1>
                                    <ul className='ul'>
                                        {filial.map((el, index) => (
                                            <li key={index} className='drop-li'>{el}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="drop-down">
                                    <h1 name="branch" ref={cateRef}>{categoryName}</h1>
                                    <ul className='ul-cate'>
                                        {categoryList.map((el, index) => (
                                            <li key={index} className='drop-li2'>{el}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

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
                                <button className='submit-btn' onClick={saveData}>{isLoading ? (<Loader />) : (<p>Submit</p>)}</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default transition(Modal);