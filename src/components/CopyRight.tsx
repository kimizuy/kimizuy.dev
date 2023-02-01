import { GITHUB, TWITTER } from "../utils/constants";
import styles from "./CopyRight.module.css";

export function CopyRight() {
  return (
    <div className={styles.container}>
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
          <a href={TWITTER} target="_blank" rel="noopener noreferrer">
            @kimizuy
          </a>
          {` & `}
          <a href={GITHUB} target="_blank" rel="noopener noreferrer">
            Repo
          </a>
        </small>
      </p>
    </div>
  );
}
