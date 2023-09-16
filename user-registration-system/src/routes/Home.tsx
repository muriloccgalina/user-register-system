import { useState } from 'react'
import '../App.css';
import { Card } from '../components/card/card';
import { useUserData } from '../hooks/useUserData';
import { EditModal } from '../components/edit-modal/edit-modal';
import { CreateModal } from '../components/create-modal/create-modal';

function Home() {
  const { data } = useUserData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(prev => !prev)
  }

  const handleCardGridClick = () => {
    setIsCardOpen(prev => !prev)
  }


  return (
      <div className='container'>
        <h1>Users</h1>
        <div className="card-grid">
          {isCardOpen && <EditModal closeModal={handleCardGridClick} />}
          {data?.map(userData => 
            <Card 
              key={userData.id}
              name={userData.name}
              email={userData.email}
              username={userData.username} 
              phone={userData.phone}
              gender={userData.gender}
              picture={userData.picture}
              func={handleCardGridClick}
            />
            )}
        </div>
        {isModalOpen && <CreateModal closeModal={handleOpenModal}/>}
        <button onClick={handleOpenModal}>New User</button>  
      </div>
  )
}

export default Home
