import styles from './lightText.module.css'

type Props = {
  className?: string
}

const LightText: React.FC<Props> = (props) => (
  <div className={`${styles.lightText} ${props.className}`}>
    {props.children}
  </div>
)

export default LightText
