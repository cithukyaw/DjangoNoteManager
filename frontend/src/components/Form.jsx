import {useState} from "react";
import {useNavigate} from "react-router-dom";
import api from "../api.js";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../constants.js";
import "../styles/Form.scss"
import {LoadingIndicator} from "./LoadingIndicator.jsx";
import {FormError} from "./FormError.jsx";

// eslint-disable-next-line react/prop-types
function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const name = method === 'login' ? 'Login' : 'Register';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await api.post(route, {username, password})
            if (method === 'login') {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate('/');
            } else {
                navigate('/login');
            }
        } catch (error) {
            if (error.response.status !== 500) {
                setErrors(error.response.data);
                console.log(errors);
            } else {
                alert(error);
            }
        } finally {
            setLoading(false);
        }
    }

    return <form onSubmit={handleSubmit} className="form-container">
        <h1>{name}</h1>
        <div>
            <FormError errors={errors} field="detail"></FormError>
            <input
                className={'form-input' + (errors.hasOwnProperty('username') ? ' input-error ' : '')}
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <FormError errors={errors} field="username"></FormError>
        </div>
        <div>
            <input
                className={'form-input' + (errors.hasOwnProperty('password') ? ' input-error ' : '')}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <FormError errors={errors} field="password"></FormError>
        </div>
        {loading && <LoadingIndicator/>}
        <button className="form-button" type="submit">{name}</button>
    </form>
}

export default Form;
