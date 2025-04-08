import { useState } from "react";

export default function Authenticate( { token }) {
    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState("");

    async function handleAuthenticateToken() {
        try {
            const response = await fetch("https://fsa-jwt-practice.herokuapp.com/authenticate", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // Use the token from local storage
                },
            });
            const result = await response.json();
            console.log(result); // Log the result to the console
            setSuccessMessage(result.message);
            setUsername(result.data.username); // Set the username from the response
            setError(null); // Clear any previous error message
        } catch (error) {
            setError(error.message);
            setSuccessMessage(null);
            setUsername(null);
        }          
    }

    return (
        <>
            <h2>Authenticate!</h2>
            {successMessage && <p style={{ color: "darkgreen"}}>{successMessage}</p>} {/*Display success message in green*/}
            {error && <p style={{ color: "red"}}>{error}</p>} {/* Display error message in red*/}
            {username && <p>Welcome, {username} </p>}
            <button onClick={handleAuthenticateToken}>
                Authenticate Token
            </button>
        </>
    );
}