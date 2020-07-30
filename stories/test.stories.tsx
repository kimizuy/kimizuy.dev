import styles from '../stories/test.module.css'

export default { title: 'Test' }

export const test = () => (
  <div className={styles.container}>
    <img
      className={styles.objectFitCover}
      src="https://i.stack.imgur.com/UJ3pb.jpg"
    />
  </div>
)
