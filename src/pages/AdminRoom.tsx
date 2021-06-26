import logo from '../assets/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import '../styles/room.scss'
import { useHistory, useParams } from 'react-router-dom'
// { useAuth } from '../hooks/userAuth';
import { Question } from '../components/Question';
import { useRoom } from '../hooks/useRoom';
import deleteImage from '../assets/delete.svg';
import { database } from '../services/firebase';
import checkImg from '../assets/check.svg'
import answerimg from '../assets/answer.svg'

type RoomsParams = {
    id: string;
}

export function AdminRoom(){
    //const { user } = useAuth();
    const params = useParams<RoomsParams>()
    const history = useHistory()
    const roomId = params.id;
    const { questions, title } = useRoom(roomId);

    async function handleEndRoom() {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date()
        })

        history.push('/');

    }

    async function handleDeleteQuestion(questionId: string) {
        if(window.confirm("Tem certeza que deseja excluir essa pergunta?")) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
        }
    }

    
    async function handleCheckQuestionAsAnswered(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true
        })
        
    }


    async function handleHighLightQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighLighted: true
        })
        
    }



    return(
        <div id="page-room">
            <header>
            <div className="content">
                <img src={logo} alt="letmeask" />
                <div>
                    <RoomCode code={roomId} />
                    <Button isOutlined onClick={handleEndRoom} >Encerrar sala</Button>
                </div>
            </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                        { questions.length > 0 &&  <span>{ questions.length } perguntas</span>}
                </div>

                <div className="question-list">
                    
                    { questions.map(question => {
                        return (
                            <Question key={question.id} 
                            content={question.content} 
                            author={question.author} 
                            isAnswered={question.isAnswered}
                            isHighLighted={question.isHighlighted}
                            >
                                {!question.isAnswered && (
                                <>
                                    <button type="button" onClick={() => handleCheckQuestionAsAnswered(question.id)}>
                                        <img src={checkImg} alt="Marcar pergunta como respondida" />
                                    </button>
                                    <button type="button" onClick={() => handleHighLightQuestion(question.id)}>
                                        <img src={answerimg} alt="Dar destaque a pergunta" />
                                    </button>
                                </>
                                )}            
                                
                                <button type="button" onClick={() => handleDeleteQuestion(question.id)}>
                                    <img src={deleteImage} alt="Remover pergunta" />
                                </button>
                            </Question>
                        )
                    }) }
                </div>

            </main>
        </div>

    )
}