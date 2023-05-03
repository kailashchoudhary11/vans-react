import React from "react";
import "./Login.css";
import {useLoaderData} from "react-router-dom";

export function loader({request}) {
    return new URL(request.url).searchParams.get('message');
}

export default function Login() {
    const [formData, setFormData] = React.useState({
        email: "",
        password: "",
    });

    const message = useLoaderData();

    function handleSubmit(e) {
        e.preventDefault();
        const {email, password} = formData;
        setFormData({
            email: "",
            password: "",
        });
        console.log("Submitted");
    }

    function handleChange(e) {
        const {name, value} = e.target;
        setFormData(prevFormData => ({...prevFormData, [name]: value}));
    }

    return (
        <div className="login-container">   
            <h1>Sign in to your account</h1>
            {message && <h3 className="red">{message}</h3>}
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    name="email"
                    onChange={handleChange}
                    type="email"
                    placeholder="Email address"
                    value={formData.email}
                    autoFocus
                />
                <input
                    name="password"
                    onChange={handleChange}
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                />
                <button>Log in</button>
            </form>
        </div>
    );
}