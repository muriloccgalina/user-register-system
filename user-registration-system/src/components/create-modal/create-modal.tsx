import { useEffect, useState } from "react"
import { useUserDataMutate } from "../../hooks/useUserDataMutate";
import { UserData } from "../../interface/UserData";

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

const Select = ({label, updateValue}: InputProps) => {
    return(
        <>
            <label>{label}</label>
            <select
            onChange={e => updateValue(e.target.value)}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="nonbinary">Non-binary</option>
                <option value="others">Others</option>
            </select>
        </>
    )
}

function EmptyCheck(data: any, name: string) {
        if(data.length === 0) {
            alert(name + " is blanck!");
            return true;
        }
        return false;
}

export function CreateModal({closeModal}: ModalProps ){
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [gender, setGender] = useState("");
    const {mutate, isSuccess, isLoading} = useUserDataMutate();

    const submit = () => {
        if(EmptyCheck(name, "Name")) return;
        if(EmptyCheck(username, "Username")) return;
        if(EmptyCheck(gender, "Gender")) return;
        const userData: UserData = {
            name,
            username,
            gender
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
                    <Select label="Gender" value="" updateValue={setGender}/>
                </form>
                <button onClick={submit} className="btn-secondary">
                    {isLoading ? "Registering..." : "Register"}
                </button>
            </div>
        </div>
    )
}