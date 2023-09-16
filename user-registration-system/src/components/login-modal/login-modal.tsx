import { useEffect, useState, ChangeEvent } from "react"
import { useVerifyPasswordDataMutate } from "../../hooks/useVerifyPasswordDataMutate.ts";
import { VerifyPasswordData } from "../../interface/VerifyPasswordData.ts";

import * as functions from "../../models/functions.tsx";
import * as models from "../../models/models.tsx";

import "./modal-edit.css"
import { EditData } from "../../interface/EditData.ts";

interface ModalProps {
    setUserObject: (userObject: any) => void
    closeEditModal(): void
    closeModal(): void;
}

export function LoginModal({closeModal, closeEditModal, setUserObject}: ModalProps ){
    const [value, setValue] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const {mutate, isLoading, isSuccess} = useVerifyPasswordDataMutate();

    const [visibleInput, setVisibleInput] = useState("email");

    function ChangeVisibility(e: React.MouseEvent<HTMLButtonElement>) {
        const input = e.currentTarget.value;
        setVisibleInput(input);
    }

    const submit = async () => {
        if(functions.EmptyCheck([value, password], [visibleInput, "Password"])) return;
        if(visibleInput == "email"){
            if(functions.EmailCheck(value)) return;
        }
        if(visibleInput == "phone"){
            if(!functions.ValidatePhoneNumber(value)) return;
        }
        const encryptedPassword = await functions.EncryptPassword(password);
        const verifyPasswordData: VerifyPasswordData = {
            ...(visibleInput === "email" && { email: value }),
            ...(visibleInput === "user" && { username: value }),
            ...(visibleInput === "phone" && { phone: value }),
            password: encryptedPassword,
        }
        try {
            await mutate(verifyPasswordData).then((userData) => {
                if (userData) {
                    setUserObject(userData);
                    console.log(userData)
                    closeModal();
                } else {
                    setErrorMessage("Failed login.");
                }
            })
        } catch (error) {
            setErrorMessage("An error occurred while login user.");
        }
    }

    useEffect(() => {
        if(!isSuccess) return;
        closeModal();
    }, [isSuccess])
    
    return(
            <div className="edit-modal-body">
                <button onClick={closeEditModal} className="btn-close">X</button>
                <h2>Sign in!</h2>
                <form className="edit-input-container">
                    <div className="text-inputs">
                        <div className="buttons-change">
                            <button onClick={ChangeVisibility} type="button" value="email">E-mail</button>
                            <button onClick={ChangeVisibility} type="button" value="user">User</button>
                            <button onClick={ChangeVisibility} type="button" value="phone">Phone</button>
                        </div>

                        {visibleInput === "email" && (
                        <models.Input id="email" className="standard-input" label="Email" placeholder="example@example.com" value={value} updateValue={setValue}/>
                        )}
                        {visibleInput === "user" && (
                        <models.Input id="user" className="standard-input" label="Username" value={value} updateValue={setValue}/>
                        )}
                        {visibleInput === "phone" && (
                        <models.NumberInput id="phone" className="standard-input" label="Phone" mask="(99) 99999-9999" value={value} updateValue={setValue}/>
                        )}

                        <models.Input className="standard-input" label="Password" type="password" value={password} updateValue={setPassword}/>
                    </div>
                </form>
                <button onClick={submit} className="btn-secondary">
                    {isLoading ? "Checking..." : "Confirm"}
                </button>
            </div>
    )
}