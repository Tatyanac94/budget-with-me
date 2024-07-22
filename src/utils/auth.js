// auth.js 

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
  } from "firebase/auth";
  
  import { auth } from "../firebase.config"; // Adjust the path as per your project structure
  
  async function registerUser(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // The user signed up
      const user = userCredential.user;
      console.log("Created user:", user);
      return user;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error creating user:", errorCode, errorMessage);
      throw error;
    }
  }
  
  async function login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // The user signed in
      const user = userCredential.user;
      console.log("User logged in:", user);
      return user;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error logging in user:", errorCode, errorMessage);
      throw error;
    }
  }
  
  async function logout() {
    try {
      await signOut(auth);
      // The user signed out
      console.log("User logged out");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error logging out user:", errorCode, errorMessage);
      throw error;
    }
  }
  
  export { registerUser, login, logout };
  