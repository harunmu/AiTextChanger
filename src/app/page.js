'use client';


import { useState } from 'react';
import styles from './page.module.css';
import InputSection from './components/InputSection';
import OutputSection from './components/OutputSection';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [resultText, setResultText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('positive');
  const [message, setMessage] = useState({ text: '', type: '' });

  const themes = [
    { value: 'positive', label: 'ポジティブ' },
    { value: 'negative', label: 'ネガティブ' },
    { value: 'gal', label: 'ギャル' },
    { value: 'mesugaki', label: 'メスガキ' }
  ];

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  const getThemePrompt = (theme) => {
    const prompts = {
      'positive': '次の文章をポジティブで明るい表現に変換してください。前向きで元気な感じにしてください。',
      'negative': '次の文章をネガティブで暗い表現に変換してください。悲観的で落ち込んだ感じにしてください。',
      'gal': '次の文章をギャル語に変換してください。若い女性が使うようなカジュアルで可愛い表現にしてください。',
      'mesugaki': '次の文章をメスガキ風の生意気で小馬鹿にするようなでも少し可愛い表現に変換してください。少し反抗的だけど愛嬌のある感じにしてください。'
    };
    return prompts[theme] || prompts['positive'];
  };

  const simulateAIConversion = async (text) => {
    const themePrompt = getThemePrompt(selectedTheme);
    const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    
    if (!GEMINI_API_KEY) {
      throw new Error('APIキーが設定されていません');
    }
    
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=' + GEMINI_API_KEY;
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: `${themePrompt}\n\n元の文章: "${text}"\n\n上記の文章を指定されたスタイルに変換してください。変換後の文章だけを回答してください。説明や追加の文章は不要です。`
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      }
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
      
      if (!response.ok) {
        throw new Error('APIリクエスト失敗: ' + response.status);
      }
      
      const data = await response.json();
      console.log('Gemini API Response:', data); // デバッグ用

      if (!data.candidates || data.candidates.length === 0) {
        throw new Error('APIレスポンスに候補がありません');
      }

      const candidate = data.candidates[0];
      if (!candidate.content || !candidate.content.parts || candidate.content.parts.length === 0) {
        throw new Error('APIレスポンスに内容がありません');
      }

      const result = candidate.content.parts[0].text;
      if (!result || result.trim() === '') {
        throw new Error('空の変換結果が返されました');
      }

      return result.trim();
    } catch (error) {
      console.error('Gemini APIエラー:', error);
      throw error;
    }
  };

  const handleConvert = async () => {
    const text = inputText.trim();
    
    if (!text) {
      showMessage('文章を入力してください', 'error');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const convertedText = await simulateAIConversion(text);
      setResultText(convertedText);
      showMessage('変換が完了しました', 'success');
    } catch (error) {
      showMessage('変換中にエラーが発生しました', 'error');
      console.error('変換エラー:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setInputText('');
    setResultText('');
    showMessage('入力内容をクリアしました', 'success');
  };

  const handlePost = () => {
    if (!resultText) return;
    const postUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(resultText)}`;
    window.open(postUrl, '_blank');
  };

  const handleShare = async () => {
    if (!resultText) return;
    
    if (navigator.share) {
      await navigator.share({
        text: resultText,
      });
    } else {
      await navigator.clipboard.writeText(resultText);
      showMessage('クリップボードにコピーしました', 'success');
    }
  };

  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault();
      if (!isLoading && inputText.trim()) {
        handleConvert();
      }
    }
  };

  return (
    <div className={styles.container}>
      {message.text && (
        <div className={`${styles.message} ${styles[message.type]}`}>
          {message.text}
        </div>
      )}
      
      <header className={styles.header}>
        <h1>AI文章変換ツール</h1>
        <p>文章を入力してAIによる変換結果を確認できます</p>
      </header>
      
      <main className={styles.main}>
        <InputSection 
          inputText={inputText}
          setInputText={setInputText}
          selectedTheme={selectedTheme}
          setSelectedTheme={setSelectedTheme}
          themes={themes}
          onConvert={handleConvert}
          onClear={handleClear}
          isLoading={isLoading}
          onKeyDown={handleKeyDown}
        />
        
        <OutputSection 
          resultText={resultText}
          onPost={handlePost}
          onShare={handleShare}
        />
      </main>
      
      <footer className={styles.footer}>
        <p>&copy; 2025 AI文章変換ツール</p>
      </footer>
    </div>
  );
}
