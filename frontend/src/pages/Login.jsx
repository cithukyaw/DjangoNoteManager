import Form from "../components/Form.jsx";

function Login() {
    return (
        <div className="container">
            <Form route="/api/token" method="login" />
            <a href='/register'>Create an account</a>
        </div>
    );
}

export default Login;
