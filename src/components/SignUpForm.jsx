import { useState } from "react";

export default function SignUpForm() {
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState(null);

// This function will be called when the form is submitted
async function handleSubmit(e) { 
    e.preventDefault();
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
    } catch (error) {
        setError(error.message);
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


