import { useState } from 'react';
import Icon from '@/components/ui/icon';

function transliterate(text: string): string {
  const map: Record<string, string> = {
    'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'yo','ж':'zh','з':'z',
    'и':'i','й':'y','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r',
    'с':'s','т':'t','у':'u','ф':'f','х':'kh','ц':'ts','ч':'ch','ш':'sh','щ':'sch',
    'ъ':'','ы':'y','ь':'','э':'e','ю':'yu','я':'ya',
    'А':'a','Б':'b','В':'v','Г':'g','Д':'d','Е':'e','Ё':'yo','Ж':'zh','З':'z',
    'И':'i','Й':'y','К':'k','Л':'l','М':'m','Н':'n','О':'o','П':'p','Р':'r',
    'С':'s','Т':'t','У':'u','Ф':'f','Х':'kh','Ц':'ts','Ч':'ch','Ш':'sh','Щ':'sch',
    'Ъ':'','Ы':'y','Ь':'','Э':'e','Ю':'yu','Я':'ya',
  };
  return text
    .split('')
    .map(c => map[c] !== undefined ? map[c] : c)
    .join('')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function generateNames(input: string): string[] {
  const slug = transliterate(input.trim());
  if (!slug) return [];
  return Array.from({ length: 5 }, (_, i) => `foto-${slug}-sibtomat54ru-ru-${i + 1}.jpg`);
}

const Index = () => {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState<number | null>(null);
  const [allCopied, setAllCopied] = useState(false);

  const names = generateNames(input);

  const copyOne = async (text: string, idx: number) => {
    await navigator.clipboard.writeText(text);
    setCopied(idx);
    setTimeout(() => setCopied(null), 1800);
  };

  const copyAll = async () => {
    await navigator.clipboard.writeText(names.join('\n'));
    setAllCopied(true);
    setTimeout(() => setAllCopied(false), 1800);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--parchment)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: '3rem 1.5rem' }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '1.6rem' }}>🍅</span>
          <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontWeight: 700, color: 'var(--soil-dark)' }}>
            СибТомат<span style={{ color: 'var(--terracotta)' }}>54</span>
          </span>
        </div>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 700, color: 'var(--soil-dark)', marginBottom: '0.4rem' }}>
          Генератор имён файлов
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--soil-mid)', maxWidth: 400 }}>
          Введи название сорта — получи 5 готовых имён для фото
        </p>
      </div>

      {/* Input card */}
      <div className="card-warm animate-fade-in" style={{ width: '100%', maxWidth: 560, padding: '2rem', marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ochre)', marginBottom: '0.6rem' }}>
          Название сорта
        </label>
        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Чарли Чаплин (Charlie Chaplin)"
            style={{
              flex: 1,
              padding: '0.75rem 1rem',
              borderRadius: 8,
              border: '1.5px solid var(--straw)',
              background: '#fffdf8',
              fontFamily: 'Golos Text, sans-serif',
              fontSize: '1rem',
              color: 'var(--soil-dark)',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={e => (e.target.style.borderColor = 'var(--terracotta)')}
            onBlur={e => (e.target.style.borderColor = 'var(--straw)')}
            autoFocus
          />
          {input && (
            <button
              onClick={() => setInput('')}
              style={{
                padding: '0.75rem',
                borderRadius: 8,
                border: '1.5px solid var(--straw)',
                background: '#fffdf8',
                cursor: 'pointer',
                color: 'var(--ochre)',
                transition: 'all 0.2s',
              }}
              title="Очистить"
            >
              <Icon name="X" size={16} />
            </button>
          )}
        </div>

        {/* Preview slug */}
        {names.length > 0 && (
          <div style={{ marginTop: '0.75rem', fontSize: '0.78rem', color: 'var(--soil-mid)' }}>
            Слаг: <code style={{ background: 'var(--straw)', padding: '0.15rem 0.4rem', borderRadius: 4, fontFamily: 'monospace', color: 'var(--soil-dark)' }}>
              {transliterate(input.trim())}
            </code>
          </div>
        )}
      </div>

      {/* Results */}
      {names.length > 0 && (
        <div className="card-warm animate-fade-in" style={{ width: '100%', maxWidth: 560, padding: '1.5rem' }}>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span className="section-label">Имена файлов</span>
            <button
              onClick={copyAll}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.35rem',
                padding: '0.4rem 0.9rem',
                borderRadius: 7,
                border: allCopied ? '1.5px solid var(--green-leaf)' : '1.5px solid var(--terracotta)',
                background: allCopied ? 'rgba(74,124,89,0.1)' : 'transparent',
                color: allCopied ? 'var(--green-leaf)' : 'var(--terracotta)',
                fontSize: '0.8rem', fontWeight: 600,
                cursor: 'pointer', fontFamily: 'Golos Text, sans-serif',
                transition: 'all 0.25s',
              }}
            >
              <Icon name={allCopied ? 'CheckCheck' : 'Copy'} size={14} />
              {allCopied ? 'Скопированы все' : 'Копировать все'}
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {names.map((name, i) => (
              <div
                key={i}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  padding: '0.7rem 0.9rem',
                  borderRadius: 8,
                  background: copied === i ? 'rgba(74,124,89,0.08)' : '#fffdf8',
                  border: copied === i ? '1.5px solid var(--green-leaf)' : '1.5px solid var(--straw)',
                  transition: 'all 0.2s',
                }}
              >
                <span style={{
                  minWidth: 22, height: 22, borderRadius: 6,
                  background: 'var(--straw)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.7rem', fontWeight: 700, color: 'var(--soil-mid)', flexShrink: 0,
                }}>
                  {i + 1}
                </span>
                <code style={{
                  flex: 1, fontSize: '0.85rem',
                  fontFamily: 'monospace',
                  color: 'var(--soil-dark)',
                  wordBreak: 'break-all',
                  lineHeight: 1.4,
                }}>
                  {name}
                </code>
                <button
                  onClick={() => copyOne(name, i)}
                  style={{
                    flexShrink: 0,
                    padding: '0.35rem 0.7rem',
                    borderRadius: 6,
                    border: 'none',
                    background: copied === i ? 'var(--green-leaf)' : 'var(--terracotta)',
                    color: 'var(--parchment)',
                    fontSize: '0.75rem', fontWeight: 600,
                    cursor: 'pointer', fontFamily: 'Golos Text, sans-serif',
                    display: 'flex', alignItems: 'center', gap: '0.3rem',
                    transition: 'all 0.2s',
                  }}
                >
                  <Icon name={copied === i ? 'Check' : 'Copy'} size={13} />
                  {copied === i ? 'OK' : 'Копировать'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {!input && (
        <div style={{ textAlign: 'center', color: 'var(--straw)', marginTop: '1rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📂</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--ochre)' }}>Введи название сорта выше</div>
        </div>
      )}

    </div>
  );
};

export default Index;
