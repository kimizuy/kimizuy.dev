import styles from './copyRight.module.css'

export const CopyRight: React.VFC = () => {
  return (
    <div className={styles.copyRight}>
      <p>
        <small>
          {`© 2020, Built with `}
          <a
            href="https://nextjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Next.js
          </a>
        </small>
      </p>
      <p>
        <small>
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
        </small>
      </p>
      <p>
        <small>This site uses Google Analytics.</small>
      </p>
    </div>
  )
}
