'use client';

import styles from './OutputSection.module.css';

export default function OutputSection({ 
  resultText, 
  onPost, 
  onShare 
}) {
  return (
    <div className={styles.outputSection}>
      <h2>変換結果</h2>
      <div className={styles.resultContainer}>
        {resultText ? (
          <textarea 
            value={resultText}
            readOnly
            className={styles.resultTextarea}
            rows={6}
          />
        ) : (
          <p className={styles.placeholder}>変換結果がここに表示されます</p>
        )}
      </div>

      <div className={styles.buttonGroup}>
        <button 
          onClick={onPost}
          disabled={!resultText}
          className={styles.secondaryBtn}
        >
          Xでポストする
        </button>
        <button 
          onClick={onShare}
          disabled={!resultText}
          className={styles.secondaryBtn}
        >
          共有する
        </button>
      </div>
    </div>
  );
} 