import { ReactNode } from 'react'
import '../styles/question.scss'
import cx from 'classnames'

type QuestionProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    };
    children?: ReactNode;
    isAnswered?: boolean;
    isHighLighted?: boolean;
}

export function Question({ children, content, author, isAnswered = false, isHighLighted = false}: QuestionProps) {

        return (
            <div className={cx('question', { answered: isAnswered }, { highlight: isHighLighted && !isAnswered})}>
                <p>{content}</p>
                <footer>
                    <div className="user-nfo">
                        <img src={author.avatar} alt={author.name} />
                        <span>{author.name}</span>
                    </div>
                    <div>
                        {children}
                    </div>
                </footer>
            </div>
        )
}


