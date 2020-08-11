import styles from './tagList.module.css'

type Props = {
  nameList: string[]
}

export default function TagList(p: Props) {
  return p.nameList.map((name) => <Tag name={name} />)
}

function Tag({ name }: { name: string }) {
  return <button className={`${styles.tag}`}>#{name}</button>
}
