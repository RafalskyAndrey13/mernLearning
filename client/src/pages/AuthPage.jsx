import {useState, useEffect, useContext} from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/AuthContext';

export const AuthPage = () => {
    const message = useMessage();
    const auth = useContext(AuthContext);
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const {loading, error, request, clearError} = useHttp();

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form});
            message(data.message);
        } catch (e) {

        }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form});
            auth.login(data.token, data.userId);
            message(data.message);
        } catch (e) {

        }
    }

    return (
    <div className="row">
        <div className="col s6 offset-s3">
            <h1>Short the Link</h1>
            <div class="row">
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Login</span>
                        <div>
                            <div class="input-field">
                                <input 
                                    placeholder="Email" 
                                    id="email" 
                                    type="email" 
                                    className="yellow-input"
                                    onChange={changeHandler}
                                    value={form.email}
                                    name="email"/>
                                <label for="email">Email</label>
                            </div>
                            <div class="input-field">
                                <input 
                                    placeholder="Password" 
                                    id="password" 
                                    type="password"
                                    value={form.password}
                                    className="yellow-input"
                                    onChange={changeHandler}
                                    name="password" />
                                <label for="password">Password</label>
                            </div>
                            
                        </div>
                    </div>
                    <div className="card-action">
                        <button disabled={loading} className="btn yellow darken-4" onClick={loginHandler} style={{marginRight: 10}}>Login</button>
                        <button disabled={loading} className="btn grey lighten-1 black-text" onClick={registerHandler}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default AuthPage;
