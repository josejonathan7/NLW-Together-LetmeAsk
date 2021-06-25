import { useHistory } from 'react-router-dom'
import illustrationImg from '../assets/illustration.svg'
import logoImg from '../assets/logo.svg'
import googleIconImg from '../assets/google-icon.svg'
import '../styles/auth.scss'
import { Button } from '../components/Button'
import { useAuth } from '../hooks/userAuth'
import { FormEvent, useState } from 'react'
import { database } from '../services/firebase'


export function Home(){
    const history = useHistory();
    const { signInWithGoogle, user } = useAuth()
    const [ roomCode, setRoomCode ] = useState('')
    
    async function handleCreateRoom(){  
        if(!user){
            await signInWithGoogle()
        }
        
        history.push("/rooms/new")    
    }

    async function handleJoinRoom(event: FormEvent){
        event.preventDefault()

        if(roomCode.trim() === ''){
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if(!roomRef.exists()){
            alert("Room does not exists")
            return
        }

        if(roomRef.val().endedAt){
            alert('Room does not exists!');
            return;
        }

        history.push(`/rooms/${roomCode}`)
    }

    return(
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie aulas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
           </aside>
           <main>
               <div className="main-content">
                   <img src={logoImg} alt="Letmeask" />
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">Ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input 
                        type="text" 
                        onChange={event => setRoomCode(event.target.value)}
                        value={roomCode}
                        placeholder="Digite o código da sala" 
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
               </div>
           </main>
        </div>
    )
}