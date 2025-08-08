'use client';

import styles from './InputSection.module.css';

export default function InputSection({ 
  inputText, 
  setInputText, 
  selectedTheme, 
  setSelectedTheme, 
  themes, 
  onConvert, 
  onClear, 
  isLoading, 
  onKeyDown 
}) {
  return (
    <div className={styles.inputSection}>
      <h2>入力文章</h2>
      <textarea 
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="ここに変換したい文章を入力してください..."
        rows={8}
        className={styles.textarea}
      />
      <div className={styles.themeSelectGroup}>
        <label htmlFor="themeSelect">テーマ選択：</label>
        <select 
          id="themeSelect"
          value={selectedTheme}
          onChange={(e) => setSelectedTheme(e.target.value)}
          className={styles.themeSelect}
        >
          {themes.map(theme => (
            <option key={theme.value} value={theme.value}>
              {theme.label}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.buttonGroup}>
        <button 
          onClick={onConvert}
          disabled={isLoading || !inputText.trim()}
          className={styles.primaryBtn}
        >
          {isLoading ? (
            <>
              <span className={styles.loading}></span>
              変換中...
            </>
          ) : (
            '変換実行'
          )}
        </button>
        <button 
          onClick={onClear}
          className={styles.secondaryBtn}
        >
          クリア
        </button>
      </div>
    </div>
  );
} 