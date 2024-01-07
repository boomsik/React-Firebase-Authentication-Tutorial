import { useEffect, useState } from "react";
import { auth } from "../../firebase-config";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import CreateUsers from "../CreateUsers/CreateUsers";
function Authentication() {
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [user, setUser] = useState({});

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    }, []);
    // const currentUserRender = user.email.length;
    // console.log(currentUserRender);
    // console.log(user.email);
    // console.log(123);
    // console.log("123");
    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword
            );
            console.log(user);
        } catch (error) {
            console.log(error.message);
        }
    };
    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            );
            console.log(user);
        } catch (error) {
            console.log(error.message);
        }
    };
    const logout = async () => {
        await signOut(auth);
    };
    return (
        <div>
            <div>
                <h3> Register new User</h3>
                <input
                    type="text"
                    placeholder="Email"
                    onChange={(e) => {
                        setRegisterEmail(e.target.value);
                    }}
                />
                <input
                    type="text"
                    placeholder="Password"
                    onChange={(e) => {
                        setRegisterPassword(e.target.value);
                    }}
                />
                <button type="button" onClick={register}>
                    Create new User
                </button>
            </div>
            <div>
                <h3> Login</h3>
                <input
                    type="text"
                    placeholder="Email"
                    onChange={(e) => {
                        setLoginEmail(e.target.value);
                    }}
                />
                <input
                    type="text"
                    placeholder="Password"
                    onChange={(e) => {
                        setLoginPassword(e.target.value);
                    }}
                />
                <button type="button" onClick={login}>
                    Login
                </button>
            </div>
            <h4> User Loggen in: {user?.email}</h4>
            <button type="button" onClick={logout}>
                Sign Out
            </button>
            {user?.email && <CreateUsers />}
        </div>
    );
}
export default Authentication;
