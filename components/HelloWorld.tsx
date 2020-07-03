import styles from "../styles/utils.module.css"

type Props = {
  value: string
}

export default function ({ value }: Props) {
  return <div className={styles.heading2Xl}>Hello World {value}</div>
}
