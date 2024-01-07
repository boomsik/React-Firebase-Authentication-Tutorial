import { useState, useEffect } from "react";
import {
    collection,
    getDocs,
    addDoc,
    doc,
    deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase-config";
import "./CreateUsers.css";
function CreateUsers() {
    const [users, setUsers] = useState([]);
    const [newName, setNewName] = useState("");
    const [newSurname, setNewSurname] = useState("");
    const UsersCollectionRef = collection(db, "names");

    const createUser = async () => {
        await addDoc(UsersCollectionRef, {
            name: newName,
            surname: newSurname,
        });
    };
    const deleteUser = async (id) => {
        const userDoc = doc(db, "names", id);
        await deleteDoc(userDoc);
    };
    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(UsersCollectionRef);
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            console.log(data);
        };
        getUsers();
    }, []);
    return (
        <div className="creater">
            <input
                placeholder="Name"
                onChange={(e) => {
                    setNewName(e.target.value);
                }}
            />
            <input
                placeholder="Surname"
                onChange={(e) => {
                    setNewSurname(e.target.value);
                }}
            />
            <button onClick={createUser} type="button">
                Creacte users
            </button>
            {users.map((user) => {
                // console.log(users);
                return (
                    <div>
                        <p>{user.name}</p>
                        <p>{user.surname}</p>
                        <button
                            onClick={() => {
                                deleteUser(user.id);
                            }}
                        >
                            Delete user
                        </button>
                    </div>
                );
            })}
        </div>
    );
}

export default CreateUsers;
