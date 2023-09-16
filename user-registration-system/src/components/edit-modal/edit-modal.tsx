import { useEffect, useState, ChangeEvent } from "react"
import { EditData } from "../../interface/EditData";
import { LoginModal } from "../login-modal/login-modal.tsx";

import * as functions from "../../models/functions.tsx";
import * as models from "../../models/models.tsx";

import "./modal-edit.css"
import { useEditDataMutate } from "../../hooks/useEditDataMutate.ts";

interface ModalProps {
    closeModal(): void
}

export function EditModal({closeModal}: ModalProps ){
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoginCardOpen, setIsLoginCardOpen] = useState(true);
    const [userObject, setUserObject] = useState({
        id: null,
        name: "",
        email: "",
        username: "",
        phone: undefined,
        birthdate: "",
        gender: "",
        picture: ""      
    });

    const handleLoginCardGrid = () => {
        setIsLoginCardOpen(prev => !prev)
    }

    const handleCloseEdit = () => {
        handleLoginCardGrid();
        closeModal();
    }

    const handleLoginDateChange = (date: any) => {
        setUserObject(date);
    }

    const [id, setId] = useState(userObject.id)
    const [name, setName] = useState(userObject.name);
    const [username, setUsername] = useState(userObject.username);
    const [gender, setGender] = useState(userObject.gender);
    const [email, setEmail] = useState(userObject.email);
    const [phone, setPhone] = useState(userObject.phone);
    const [birthdate, setBirthdate] = useState(userObject.birthdate);
    const [picture, setPicture] = useState(userObject.picture);
    const {mutate, isSuccess, isLoading} = useEditDataMutate();

    const names = ["Name", "Username", "E-mail", "Gender", "BirthDate"];
    const data = [name, username, email, gender, birthdate];

    const submit = async () => {
        if(id == null || id == undefined) throw new Error;
        if(functions.EmptyCheck(data, names)) return;
        if(functions.EmailCheck(email)) return;
        //if(!functions.ValidatePhoneNumber(phone)) return;
        const birthdateFormatted = await functions.DateFormatter(birthdate);
        const editData: EditData = {
            id: id,
            name,
            username,
            email,
            phone,
            gender,
            birthdate: birthdateFormatted,
            picture
        }

        try {
            await mutate(editData);
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
        setId(userObject.id)
        setName(userObject.name);
        setUsername(userObject.username);
        setGender(userObject.gender);
        setEmail(userObject.email);
        setPhone(userObject.phone);
        setBirthdate(userObject.birthdate);
    }, [userObject]);

    useEffect(() => {
        if(!isSuccess) return;
        closeModal();
    }, [isSuccess])
    
    return(
        <div className="edit-modal-overlay">
            {isLoginCardOpen && <LoginModal closeEditModal={handleCloseEdit} closeModal={handleLoginCardGrid} setUserObject={handleLoginDateChange}/>}
            {!isLoginCardOpen &&
            <div className="modal-overlay">
                <div className="modal-body">
                    <button onClick={closeModal} className="btn-close">X</button>
                    <h2>Edit your user!</h2>
                    <form className="input-container">
                        <div className="text-inputs">
                            <div className="separete-inputs-grid">
                                <models.Input className="standard-input" label="Name" placeholder="Your fullname..." value={name} updateValue={setName}/>
                                <models.NumberInput className="standard-input" label="Phone" mask="(99) 99999-9999" value={phone} updateValue={setPhone}/>
                            </div>
                            <models.Input className="standard-input" label="Email" placeholder="example@example.com" value={email} updateValue={setEmail}/>
                            <div className="separete-inputs-grid">
                                <models.Input className="standard-input" label="Username" value={username} updateValue={setUsername}/>
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
            }
        </div>
    )
}