import { redirect } from "react-router-dom";

export async function requireAuth() {
    const isLoggedIn = JSON.parse(localStorage.getItem('loggedIn'));
    if (!isLoggedIn) {
        throw redirect("/login?message=You must log in first.");
    }
    return null
}