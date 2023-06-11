import "./card.css";

interface CardProps {
    name: string,
    username: string,
    gender: string
}

export function Card({ name, username, gender}: CardProps) {
    return(
        <div className="card">
            <h2>{name}</h2>
            <p>Username: {username}</p>
            <p>Gender: {gender}</p>
        </div>
    )
}