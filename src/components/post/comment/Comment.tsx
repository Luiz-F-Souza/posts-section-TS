import { Avatar } from "../../avatar/Avatar"
import styles from "./Comment.module.css"
import { Trash, ThumbsUp } from "@phosphor-icons/react"
import { formatDistanceToNow, format } from "date-fns"
import ptBR from "date-fns/locale/pt-BR"
import { SinglePostAuthorType } from "../../../App"


// content: string, 
// postedAt: Date 

type CommentPropsType = {
  content: string,
  postedAt: string,
  likes: number,
  id: string,
  author: SinglePostAuthorType,
  onDeleteComment: (id: string, commentToDelete: string) => void,
  onAddMoreLikes: (id: string, commentToLike: string) => void
}

function Comment({content, postedAt, likes, id, author, onDeleteComment, onAddMoreLikes}: CommentPropsType) {

  const ISODate = new Date(postedAt)
  const brFormatDate = format(ISODate, "dd 'de' LLLL 'às' HH:mm'h'", {locale: ptBR})
  const postedAtDistanceToNow = formatDistanceToNow(ISODate, {
    locale: ptBR,
    addSuffix: true
  })
  return (
    <div className={styles.comment}>

      <Avatar src={author.imgUrl} hasBorder={false} />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <h3><strong>{author.name}</strong></h3>
              <time title={brFormatDate} dateTime={ISODate.toISOString()}>{postedAtDistanceToNow}</time>
            </div>
            {/* Sempre que um botão tiver apenas um icone sem texto é legal por um title pros leitores de tela */}
            <button title="Botão de deletar comentário" onClick={() => onDeleteComment(id, content)}> 
              <Trash size={24} />
            </button>
          </header>

          <p className={styles.commentText}>{content}</p>

        </div>

        <footer>
            <button title="Botão de aplaudir - (curtir) o post" onClick={() => onAddMoreLikes(id, content) }>

              <ThumbsUp />

              <p className={styles.footerLikeCount}>
                Aplaudir

                <span>
                  {likes}
                </span>
              </p>
            </button>
        </footer>
      </div>
    </div>
  )
}

export {Comment}