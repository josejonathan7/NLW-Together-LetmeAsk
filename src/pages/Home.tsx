import illustrationImg from '../assets/illustration.svg'
import logoImg from '../assets/logo.svg'
import googleIconImg from '../assets/google-icon.svg'

import '../styles/auth.scss'
import { Button } from '../components/Button'

export function Home(){
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
                    <button className="create-room">
                        <img src={googleIconImg} alt="" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">Ou entre em uma sala</div>
                    <form action="">
                        <input 
                        type="text" 
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