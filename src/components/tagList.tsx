import styles from './tagList.module.css'

type Props = {
  tags: string[]
}

export default function TagList(p: Props) {
  return (
    <div className={styles.container}>
      {p.tags.map((tag) => (
        <Tag key={tag} tag={tag} />
      ))}
    </div>
  )
}

function Tag({ tag }: { tag: string }) {
  return <button className={`${styles.tag}`}>#{tag}</button>
}
