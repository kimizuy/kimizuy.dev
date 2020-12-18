import styles from './lightText.module.css'

type Props = {
  children: React.ReactNode
  className?: string
}

const LightText: React.VFC<Props> = (props) => (
  <div className={`${styles.lightText} ${props.className}`}>
    {props.children}
  </div>
)

export default LightText
