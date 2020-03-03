import {useState} from 'react'

const SignupComponent = () => {

    const [values, setValues] = useState({
        name: 'hello',
        email: 'hello@gmail.com',
        password: 'hello',
        error: '',
        loading: false,
        message: '',
        showForm: true
    })

    const { name, email, password, error, loading, message, showForm } = values

    const handleSubmit = (e) => {
        console.table({ name, email, password, error, loading, message, showForm })
        e.preventDefault()
    }

    const handleChange = name => e => {
        setValues({...values, error: false, [name]: e.target.value})
    }

    const signupForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input 
                        className="form-control" 
                        value={name}
                        type="text" 
                        onChange={handleChange('name')}
                        placeholder="Tape your name" />
                </div>
                <div className="form-group">
                    <input 
                        value={email}
                        className="form-control" 
                        type="text" 
                        onChange={handleChange('email')}
                        placeholder="Tape your email" />
                </div>
                <div className="form-group">
                    <input 
                        className="form-control" 
                        type="password" 
                        value={password}
                        onChange={handleChange('password')}
                        placeholder="Tape your password" />
                </div>
                <div>
                    <button className="btn btn-primary">Signup</button>
                </div>
            </form>
        )
    }

    return (
        <React.Fragment>
            {signupForm()}
        </React.Fragment>
    )
}

export default SignupComponent;