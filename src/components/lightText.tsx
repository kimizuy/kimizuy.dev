import styles from './lightText.module.css'

type Props = {
  children: React.ReactNode
  className?: string
}

export const LightText: React.VFC<Props> = (props) => (
  <div className={`${styles.lightText} ${props.className}`}>
    {props.children}
  </div>
)
