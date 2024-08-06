import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import { auth } from "../../firebase.config";

async function registerUser(email, password) {
	try {
		const userCredential = await createUserWithEmailAndPassword(auth, email, password);
		const user = userCredential.user;
		return user;
	} catch (error) {
		const errorCode = error.code;
		const errorMessage = error.message;
		console.error("Error creating user: ", errorCode, errorMessage);
		throw new Error(errorMessage); // Propagate the error to the caller
	}
}

async function login(email, password) {
	try {
		const userCredential = await signInWithEmailAndPassword(auth, email, password);
		const user = userCredential.user;
		return user; // Return the user object for further use
	} catch (error) {
		const errorCode = error.code;
		const errorMessage = error.message;
		console.error("Error logging in user: ", errorCode, errorMessage);
		throw new Error(errorMessage); // Propagate the error to the caller
	}
}

async function logout() {
	try {
		await signOut(auth);
		console.log("User logged out");
	} catch (error) {
		const errorCode = error.code;
		const errorMessage = error.message;
		console.error("Error logging out user: ", errorCode, errorMessage);
		throw new Error(errorMessage); // Propagate the error to the caller
	}
}

export { registerUser, login, logout };
