import styles from './copyRight.module.css'

export default function CopyRight() {
  return (
    <div className={styles.container}>
      <p>
        © 2020, Built with{' '}
        <a href="https://nextjs.org/" target="_blank" rel="noopener">
          Next.js
        </a>
      </p>
      <p>
        createdBy{' '}
        <a href="https://twitter.com/kimizuy" target="_blank" rel="noopener">
          @kimizuy
        </a>
      </p>
      <p>
        source code is{' '}
        <a
          href="https://github.com/kimizuy/blog"
          target="_blank"
          rel="noopener"
        >
          here
        </a>
      </p>
    </div>
  )
}
