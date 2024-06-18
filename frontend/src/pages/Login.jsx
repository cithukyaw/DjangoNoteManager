import Form from "../components/Form.jsx";

function Login() {
    return (
        <>
            <Form route="/api/token" method="login" />
            <a href='/register'>Create an account</a>
        </>
    );
}

export default Login;
