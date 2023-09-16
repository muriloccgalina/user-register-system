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
    const [birthdate, setBirthdate] = useState("");
    const [picture, setPicture] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const {mutate, isSuccess, isLoading} = useUserDataMutate();

    const names = ["Name", "Username", "E-mail", "Gender", "Password", "BirthDate"];
    const data = [name, username, email, gender, password, birthdate];

    const submit = async () => {
        if(functions.EmptyCheck(data, names)) return;
        if(functions.EmailCheck(email)) return;
        if(!functions.ValidatePhoneNumber(phone)) return;
        const encryptedPassword = await functions.EncryptPassword(password);
        const birthdateFormatted = await functions.DateFormatter(birthdate);
        
        const userData: UserData = {
            name,
            username,
            email,
            phone,
            gender,
            password: encryptedPassword,
            birthdate: birthdateFormatted,
            picture
        }
        try {
        await mutate(userData);
        if (isSuccess) {
            closeModal();
        } else {
            setErrorMessage("Failed to register user.");
        }
        } catch (error) {
            setErrorMessage("An error occurred while registering user.");
        }
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
                            <models.Input className="standard-input" label="Name" placeholder="Your fullname..." value={name} updateValue={setName}/>
                            <models.NumberInput className="standard-input" label="Phone" mask="(99) 99999-9999" value={phone} updateValue={setPhone}/>
                        </div>
                        <models.Input className="standard-input" label="Email" placeholder="example@example.com" value={email} updateValue={setEmail}/>
                        <div className="separete-inputs-grid">
                            <models.Input className="standard-input" label="Username" value={username} updateValue={setUsername}/>
                            <models.Input className="standard-input" label="Password" type="password" value={password} updateValue={setPassword}/>
                        </div>
                    </div>
                    <div className="select-inputs">
                        <models.DateInput className="calendar-input" label="Birth Date" value={birthdate} updateValue={setBirthdate} mask="99/99/9999" placeholder="dd/mm/yyyy"/>
                        <models.Select className="gender-select" label="Gender" value={gender} updateValue={setGender}/>
                    </div>
                </form>
                <button onClick={submit} className="btn-secondary">
                    {isLoading ? "Registering..." : "Register"}
                </button>
            </div>
        </div>
    )
}