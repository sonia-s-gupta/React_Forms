import { useState } from "react";

export default function SignUpForm({ setToken }) {
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState(null);
const [successMessage, setSuccessMessage] = useState(null);

// This function will be called when the form is submitted
async function handleSubmit(e) { 
    e.preventDefault();

//Form Validation
    if (username.length < 8) {
        setError("Username must be at least 8 characters long");
        setSuccessMessage(null);
        return;
    }

    try {
        const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }, 
            body: JSON.stringify({username, password}),
        });
        const result = await response.json();
        console.log(result);

        //Saves the token to local storage if it exists
        if (result.token) {
            setToken(result.token);
        }

        // Clears form after a successful submission
        setUsername("");
        setPassword("");
        setError(null);
        
    } catch (error) {
        setError(error.message);
        setSuccessMessage(null);
    }
}

//Print the form to the browser
    return ( 
        <>
         <h2>Sign Up!</h2>
            {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
         <label>
            Username: {" "}
            <input
                value={username}
                onChange={ (e) => setUsername(e.target.value)} 
            />
         </label>
         <label>
            Password: {" "}
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
        </label>
            <button type="submit">Submit</button>
        </form>
        </>
    );
}


