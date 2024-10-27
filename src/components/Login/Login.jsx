import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();

		axios
			.post(`http://localhost:5000/api/auth/login`, {
				email,
				password,
			})
			.then((res) => {
				console.log(res.data);

				if (res.status === 200) {
					navigate("/home");
					alert(`Welcome back, ${res.data.email}!`);
				} else alert("Unknown Error Occurred!");
			})
			.catch((err) => {
				if (err.response)
					alert(err.response.data || "An error occurred!");
				else alert("Network Error! Please try again.");

				console.log(err);
			});
	};

	return (
		<div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
			<div className="bg-white p-3 rounded w-25">
				<h2>Log In</h2>
				<form onSubmit={handleSubmit}>
					<div className="mb-3">
						<label htmlFor="email">
							<strong>Email</strong>
						</label>
						<input
							id="email"
							type="email"
							placeholder="Enter Email"
							autoComplete="off"
							name="email"
							className="form-control rounded-0"
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="password">
							<strong>Password</strong>
						</label>
						<input
							id="password"
							type="password"
							placeholder="Enter Password"
							autoComplete="off"
							name="password"
							className="form-control rounded-0"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<button
						type="submit"
						className="btn btn-success w-100 rounded-0"
					>
						Log In
					</button>
				</form>
				<p>Don't have an Account?</p>
				<Link
					to="/signup"
					className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
				>
					Sign Up
				</Link>
			</div>
		</div>
	);
}

export default Login;
