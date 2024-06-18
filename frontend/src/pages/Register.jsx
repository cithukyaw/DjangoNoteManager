import Form from "../components/Form.jsx";

function Register() {
    return (
        <>
            <Form route="/api/user/register" method="register"/>
            <a href='/login'>If you already have an account, login here.</a>
        </>
    );
}

export default Register;
