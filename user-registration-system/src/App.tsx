import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import { Card } from './components/card/card';
import { UserData } from './interface/UserData';
import { useUserData } from './hooks/useUserData';
import { CreateModal } from './components/create-modal/create-modal';

function App() {
  const { data } = useUserData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(prev => !prev)
  }

  return (
      <div className='container'>
        <h1>Users</h1>
        <div className="card-grid">
          {data?.map(userData => 
            <Card 
              name={userData.name}
              email={userData.email}
              username={userData.username} 
              phone={userData.phone}
              gender={userData.gender}  
              picture={userData.picture}
            />
            )}
        </div>
        {isModalOpen && <CreateModal closeModal={handleOpenModal}/>}
        <button onClick={handleOpenModal}>New User</button>  
      </div>
  )
}

export default App
