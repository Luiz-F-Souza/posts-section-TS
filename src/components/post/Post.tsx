import styles from "./Post.module.css"

import { FormEvent, useState } from 'react'
import { Comment } from "./comment/Comment.tsx"
import { Avatar } from "../avatar/Avatar"
import { format as formatDate, formatDistanceToNow } from "date-fns"
import ptBR from "date-fns/locale/pt-BR"
import { SinglePostAuthorType, SinglePostType } from "../../App.tsx"





type PostPropsType = {
  id: string,
  author: SinglePostAuthorType,
  post: SinglePostType,
  onNewComment: (id: string, content: string, postedAt: string) => void,
  onDeleteComment: (id: string, commentToDelete: string) => void,
  onAddMoreLikes: (id: string, commentToLike: string) => void
}
function Post({ id, author, post, onNewComment, onDeleteComment, onAddMoreLikes }: PostPropsType) {

  const ISODate = new Date(post.postedAt)
  const [ newCommentText, setNewCommentText ] = useState("")
  const brFormattedDate = formatDate(ISODate,"dd 'de' LLLL 'às' HH:mm'h'", { locale: ptBR})

  const postedAtRelativeToNow = formatDistanceToNow(ISODate, {
    locale: ptBR,
    addSuffix: true
  })

  function handleSubmit(e: FormEvent<HTMLFormElement>){
    e.preventDefault()

    if(newCommentText.length === 0) return
    onNewComment(id, newCommentText, new Date().toISOString())
    setNewCommentText("")
  }

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.imgUrl} hasBorder={true}/>
          <div className={styles.authorInfo}>
            <h3><strong>{author.name}</strong></h3>
            <p className={styles.authorJob}>{author.role}</p>
          </div>
        </div>

        <time title={brFormattedDate} dateTime={post.postedAt}>Publicado {postedAtRelativeToNow}</time>
      </header>

      <div className={styles.content}>
        {
          post.content.map(line => {
            const { type, content } = line
            if(type === "a") return <p key={`${type}_${content}`}><a href="#">{content}</a></p>
            else return <p key={`${type}_${content}`}>{content}</p>
          })
        }
      </div>

      <form className={styles.commentForm} onSubmit={(e) => handleSubmit(e)}>
        <strong>Deixe seu feedback</strong>

        <textarea value={newCommentText} onChange={(e) => setNewCommentText(e.target.value)} placeholder="Deixe um comentário" />
        <div className={styles.buttonWrapper}>
          <button type="submit">Publicar</button>
        </div>
        
      </form>

      <div className={styles.commentList}>
        {
          post.comments?.map(comment => {
            const { content, postedAt, likes } = comment

            return <Comment key={content} likes={likes} content={content} postedAt={postedAt} onDeleteComment={onDeleteComment} onAddMoreLikes={onAddMoreLikes} id={id} author={{name: "Miguel Araujo", role:"Front-end Senior", imgUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"}} />
          })
        }
      </div>
    </article>
  )
}

export { Post }