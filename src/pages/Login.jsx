import React from "react";
import "./Login.css";
import { useLoaderData, Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { loginUser } from "../api";

export async function loader({ request }) {
    return new URL(request.url).searchParams.get('message');
}

export async function action({ request }) {
    const formData = await request.formData();

    const email = formData.get('email');
    const password = formData.get('password');

    const redirectTo = new URL(request.url).searchParams.get('redirectTo');

    try {
        const data = await loginUser({ email, password });
        localStorage.setItem('loggedIn', true);
        return redirect(redirectTo || "/host");
    } catch(error) {
        return error;
    }
}

export default function Login() {
    const error = useActionData();
    const message = useLoaderData();
    const navigation = useNavigation();
    const status = navigation.state;
    
    return (
        <div className="login-container">
            <h1>Sign in to your account</h1>
            {message && <h3 className="red">{message}</h3>}
            {error && <h3 className="red">Error: {error.message}</h3>}
            <Form 
                method="post" 
                className="login-form"
                replace
            >
                <input
                    name="email"
                    type="email"
                    placeholder="Email address"
                    autoFocus
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                />
                <button disabled={status == "submitting"}>
                    {
                        status == "submitting" ?
                            "Logging In" :
                            "Log In"
                    }
                </button>
            </Form>
        </div>
    );
}