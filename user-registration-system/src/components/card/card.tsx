import "./card.css";

interface CardProps {
    name: string,
    email: string,
    username: string,
    phone?: number | string,
    gender: string,
    picture?: string
}

export function Card({ name, username, email, phone, gender}: CardProps) {
    return(
        <div className="card">
            <h2>{username}</h2>
            <p>Name: {name}</p>
            <p>Email: {email}</p>
            <p>Phone: {phone}</p>
            <p>Gender: {gender}</p>
        </div>
    )
}