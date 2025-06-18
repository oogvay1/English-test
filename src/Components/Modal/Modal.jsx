import './Modal.css'

function Modal() {

    return (
        <>
            <div className="Modal">
                <div className="container">
                    <form className="form">
                            <label className='name'>
                                <h2>Name</h2>
                                <input name='name' type="text" placeholder='Name...'/>
                            </label>

                            <label className='name'>
                                <h2>Lastname</h2>
                                <input name='lastname' type="text" placeholder='Lastname...' />
                            </label>

                            <label className='name'>
                                <h2>Age</h2>
                                <input name='age' type="text" placeholder='Age...' />
                            </label>

                            <div className="submit-btn">
                                <button>Submit</button>
                            </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Modal
