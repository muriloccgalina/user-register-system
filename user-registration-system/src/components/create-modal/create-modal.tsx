import { useEffect, useState, ChangeEvent } from "react"
import { useUserDataMutate } from "../../hooks/useUserDataMutate";
import { UserData } from "../../interface/UserData";

import * as functions from "../../models/functions.tsx";
import * as models from "../../models/models.tsx";

import "./modal.css"

interface ModalProps {
    closeModal(): void
}

export function CreateModal({closeModal}: ModalProps ){
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [birthdate, setBirthdate] = useState(new Date());
    const [picture, setPicture] = useState("");
    const {mutate, isSuccess, isLoading} = useUserDataMutate();

    const names = ["Name", "Username", "E-mail", "Gender", "Password"];

    const submit = async () => {
        const data = [name, username, email, gender, password];
        if(functions.EmptyCheck(data, names)) return;
        if(functions.EmailCheck(email)) return;
        if(!functions.ValidatePhoneNumber(phone)) return;
        const encryptedPassword = await functions.EncryptPassword(password);
        const userData: UserData = {
            name,
            username,
            email,
            phone,
            gender,
            password: encryptedPassword,
            birthdate,
            picture
        }
        mutate(userData)
    }

    useEffect(() => {
        if(!isSuccess) return;
        closeModal();
    }, [isSuccess])
    
    return(
        <div className="modal-overlay">
            <div className="modal-body">
                <button onClick={closeModal} className="btn-close">X</button>
                <h2>Register a new user!</h2>
                <form className="input-container">
                    <div className="text-inputs">
                        <div className="separete-inputs-grid">
                            <models.Input label="Name" value={name} updateValue={setName}/>
                            <models.NumberInput label="Phone" value={phone} updateValue={setPhone}/>
                        </div>
                        <models.Input label="Email" value={email} updateValue={setEmail}/>
                        <div className="separete-inputs-grid">
                            <models.Input label="Username" value={username} updateValue={setUsername}/>
                            <models.Input label="Password" value={password} updateValue={setPassword}/>
                        </div>
                    </div>
                    <div className="select-inputs">
                        <models.CalendarInput label="Birth Date" value={birthdate} updateValue={setBirthdate}/>
                        <models.Select className="gender-select" label="Gender" value="" updateValue={setGender}/>
                    </div>
                </form>
                <button onClick={submit} className="btn-secondary">
                    {isLoading ? "Registering..." : "Register"}
                </button>
            </div>
        </div>
    )
}