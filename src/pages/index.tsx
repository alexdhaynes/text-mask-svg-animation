import styles from "./index.module.css";

const IndexPage = () => {
  return (
    <dl className={styles.dl}>
      <div>
        <dt>Attempt 1:</dt>
        <dd>
          <a href="/attempt1">Link</a>
        </dd>
      </div>
      <div>
        <dt>Attempt 2:</dt>
        <dd>
          <a href="/attempt2">Link</a>
        </dd>
      </div>
      <div>
        <dt>Attempt 3:</dt>
        <dd>
          <a href="/attempt3">Link</a>
        </dd>
      </div>
      <div>
        <dt>Attempt 4:</dt>
        <dd>
          <a href="/attempt4">Link</a>
        </dd>
      </div>
    </dl>
  );
};

export default IndexPage;
