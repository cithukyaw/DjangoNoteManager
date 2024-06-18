import Form from "../components/Form.jsx";

function Register() {
    return (
        <div className="container">
            <Form route="/api/user/register" method="register"/>
            <a href='/login'>If you already have an account, login here.</a>
        </div>
    );
}

export default Register;
