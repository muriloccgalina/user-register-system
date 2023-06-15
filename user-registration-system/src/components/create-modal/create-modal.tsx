import { useEffect, useState, ChangeEvent } from "react"
import { useUserDataMutate } from "../../hooks/useUserDataMutate";
import { UserData } from "../../interface/UserData";

import * as functions from "../../functions.tsx";

import "./modal.css"

interface InputProps {
    label: string,
    value: number | string,
    updateValue(value: any): void
}

interface ModalProps {
    closeModal(): void
}

const Input = ({ label, value, updateValue}: InputProps) => {
    return(
        <>
            <label>{label}</label>
            <input value={value} onChange={e => updateValue(e.target.value)} />
        </>
    )
}

const NumberInput = ({ label, value, updateValue }: InputProps) => {
    const NumberVerification = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const numericValue = inputValue.replace(/\D/g, "");
        updateValue(numericValue);
    };

    return (
        <>
            <label>{label}</label>
            <input value={value} onChange={NumberVerification} />
        </>
    );
}

const Select = ({label, updateValue}: InputProps) => {
    return(
        <>
            <label>{label}</label>
            <select
            onChange={e => updateValue(e.target.value)}>
                <option value=""/>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="nonbinary">Non-binary</option>
                <option value="others">Others</option>
            </select>
        </>
    )
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
                    <Input label="Name" value={name} updateValue={setName}/>
                    <Input label="Username" value={username} updateValue={setUsername}/>
                    <Input label="Email" value={email} updateValue={setEmail}/>
                    <NumberInput label="Phone" value={phone} updateValue={setPhone}/>
                    <Input label="Password" value={password} updateValue={setPassword}/>
                    <Select label="Gender" value="" updateValue={setGender}/>
                </form>
                <button onClick={submit} className="btn-secondary">
                    {isLoading ? "Registering..." : "Register"}
                </button>
            </div>
        </div>
    )
}