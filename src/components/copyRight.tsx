import styles from './copyRight.module.css'

const CopyRight: React.VFC = () => {
  return (
    <div className={styles.container}>
      <p>
        {`© 2020, Built with `}
        <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">
          Next.js
        </a>
      </p>
      <p>
        {`createdBy `}
        <a
          href="https://twitter.com/kimizuy"
          target="_blank"
          rel="noopener noreferrer"
        >
          @kimizuy
        </a>
        {` & `}
        <a
          href="https://github.com/kimizuy/blog"
          target="_blank"
          rel="noopener noreferrer"
        >
          Repo
        </a>
      </p>
      <p>This site uses Google Analytics.</p>
    </div>
  )
}

export default CopyRight
