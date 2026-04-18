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

interface PhotoRow {
  num: number;
  emoji: string;
  theme: string;
  filename: (slug: string, name: string) => string;
  description: (name: string) => string;
}

const PHOTOS: PhotoRow[] = [
  {
    num: 1,
    emoji: '🛒',
    theme: 'Купить семена',
    filename: (slug) => `foto-${slug}-sibtomat54ru-ru-1.jpg`,
    description: (name) => `Купить семена ${name} от СибТомат54.ру`,
  },
  {
    num: 2,
    emoji: '🔪',
    theme: 'Разрез томата',
    filename: (slug) => `foto-${slug}-sibtomat54ru-ru-2.jpg`,
    description: (name) => `Разрез томата ${name} на sibtomat54.ru`,
  },
  {
    num: 3,
    emoji: '🌿',
    theme: 'На кусту',
    filename: (slug) => `foto-${slug}-sibtomat54ru-ru-3.jpg`,
    description: (name) => `Томат ${name} на кусту — sibtomat54.ru`,
  },
  {
    num: 4,
    emoji: '🏡',
    theme: 'В теплице',
    filename: (slug) => `foto-${slug}-sibtomat54ru-ru-4.jpg`,
    description: (name) => `${name} в теплице — семена на sibtomat54.ru`,
  },
  {
    num: 5,
    emoji: '📦',
    theme: 'Семена крупно',
    filename: (slug) => `foto-${slug}-sibtomat54ru-ru-5.jpg`,
    description: (name) => `Семена томата ${name} купить — СибТомат54.ру`,
  },
];

type CopyState = { row: number; col: 'file' | 'desc' } | null;

const Index = () => {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState<CopyState>(null);
  const [allCopied, setAllCopied] = useState<'files' | 'descs' | null>(null);

  const name = input.trim();
  const slug = transliterate(name);
  const hasData = slug.length > 0;

  const copyText = async (text: string, row: number, col: 'file' | 'desc') => {
    await navigator.clipboard.writeText(text);
    setCopied({ row, col });
    setTimeout(() => setCopied(null), 1800);
  };

  const copyAllFiles = async () => {
    const text = PHOTOS.map(p => p.filename(slug, name)).join('\n');
    await navigator.clipboard.writeText(text);
    setAllCopied('files');
    setTimeout(() => setAllCopied(null), 1800);
  };

  const copyAllDescs = async () => {
    const text = PHOTOS.map(p => p.description(name)).join('\n');
    await navigator.clipboard.writeText(text);
    setAllCopied('descs');
    setTimeout(() => setAllCopied(null), 1800);
  };

  const isCopied = (row: number, col: 'file' | 'desc') =>
    copied?.row === row && copied?.col === col;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--parchment)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '3rem 1.5rem 4rem' }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '1.6rem' }}>🍅</span>
          <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontWeight: 700, color: 'var(--soil-dark)' }}>
            СибТомат<span style={{ color: 'var(--terracotta)' }}>54</span>
          </span>
        </div>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 700, color: 'var(--soil-dark)', marginBottom: '0.4rem' }}>
          Генератор подписей для фото
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--soil-mid)' }}>
          Введи название сорта — получи имена файлов и описания для 5 фото
        </p>
      </div>

      {/* Input */}
      <div className="card-warm animate-fade-in" style={{ width: '100%', maxWidth: 780, padding: '1.75rem 2rem', marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ochre)', marginBottom: '0.6rem' }}>
          Название сорта
        </label>
        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Чарли Чаплин (Charlie Chaplin, США)"
            style={{
              flex: 1, padding: '0.75rem 1rem', borderRadius: 8,
              border: '1.5px solid var(--straw)', background: '#fffdf8',
              fontFamily: 'Golos Text, sans-serif', fontSize: '1rem',
              color: 'var(--soil-dark)', outline: 'none', transition: 'border-color 0.2s',
            }}
            onFocus={e => (e.target.style.borderColor = 'var(--terracotta)')}
            onBlur={e => (e.target.style.borderColor = 'var(--straw)')}
            autoFocus
          />
          {input && (
            <button
              onClick={() => setInput('')}
              style={{ padding: '0.75rem', borderRadius: 8, border: '1.5px solid var(--straw)', background: '#fffdf8', cursor: 'pointer', color: 'var(--ochre)' }}
            >
              <Icon name="X" size={16} />
            </button>
          )}
        </div>
        {hasData && (
          <div style={{ marginTop: '0.6rem', fontSize: '0.78rem', color: 'var(--soil-mid)' }}>
            Слаг: <code style={{ background: 'var(--straw)', padding: '0.15rem 0.4rem', borderRadius: 4, fontFamily: 'monospace', color: 'var(--soil-dark)' }}>{slug}</code>
          </div>
        )}
      </div>

      {/* Table */}
      {hasData && (
        <div className="card-warm animate-fade-in" style={{ width: '100%', maxWidth: 780, padding: '1.5rem' }}>

          {/* Column headers + copy-all buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: '2rem 7rem 1fr 1fr', gap: '0.75rem', alignItems: 'center', marginBottom: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--straw)' }}>
            <div />
            <div style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ochre)' }}>Тема</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ochre)' }}>Имя файла</span>
              <button onClick={copyAllFiles} style={copyAllBtnStyle(allCopied === 'files')}>
                <Icon name={allCopied === 'files' ? 'CheckCheck' : 'Copy'} size={12} />
                {allCopied === 'files' ? 'Скопированы' : 'Все'}
              </button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ochre)' }}>Описание (alt)</span>
              <button onClick={copyAllDescs} style={copyAllBtnStyle(allCopied === 'descs')}>
                <Icon name={allCopied === 'descs' ? 'CheckCheck' : 'Copy'} size={12} />
                {allCopied === 'descs' ? 'Скопированы' : 'Все'}
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {PHOTOS.map((p) => {
              const filename = p.filename(slug, name);
              const desc = p.description(name);
              return (
                <div key={p.num} style={{
                  display: 'grid', gridTemplateColumns: '2rem 7rem 1fr 1fr',
                  gap: '0.75rem', alignItems: 'center',
                  padding: '0.65rem 0.5rem', borderRadius: 8,
                  background: '#fffdf8', border: '1px solid var(--straw)',
                  transition: 'all 0.15s',
                }}>
                  {/* № */}
                  <div style={{ width: 24, height: 24, borderRadius: 6, background: 'var(--straw)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700, color: 'var(--soil-mid)', flexShrink: 0 }}>
                    {p.num}
                  </div>

                  {/* Тема */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <span style={{ fontSize: '1rem' }}>{p.emoji}</span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--soil-mid)', fontWeight: 500, lineHeight: 1.3 }}>{p.theme}</span>
                  </div>

                  {/* Имя файла */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <code style={{ flex: 1, fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--soil-dark)', wordBreak: 'break-all', lineHeight: 1.4, background: isCopied(p.num, 'file') ? 'rgba(74,124,89,0.08)' : 'transparent', borderRadius: 4, padding: '0.1rem 0.2rem', transition: 'background 0.2s' }}>
                      {filename}
                    </code>
                    <button onClick={() => copyText(filename, p.num, 'file')} style={copyBtnStyle(isCopied(p.num, 'file'))}>
                      <Icon name={isCopied(p.num, 'file') ? 'Check' : 'Copy'} size={12} />
                    </button>
                  </div>

                  {/* Описание */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ flex: 1, fontSize: '0.8rem', color: 'var(--soil-dark)', lineHeight: 1.4, background: isCopied(p.num, 'desc') ? 'rgba(74,124,89,0.08)' : 'transparent', borderRadius: 4, padding: '0.1rem 0.2rem', transition: 'background 0.2s' }}>
                      {desc}
                    </span>
                    <button onClick={() => copyText(desc, p.num, 'desc')} style={copyBtnStyle(isCopied(p.num, 'desc'))}>
                      <Icon name={isCopied(p.num, 'desc') ? 'Check' : 'Copy'} size={12} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty state */}
      {!hasData && (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📂</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--ochre)' }}>Введи название сорта выше</div>
        </div>
      )}
    </div>
  );
};

function copyBtnStyle(active: boolean): React.CSSProperties {
  return {
    flexShrink: 0,
    width: 28, height: 28,
    borderRadius: 6, border: 'none',
    background: active ? 'var(--green-leaf)' : 'var(--terracotta)',
    color: 'var(--parchment)',
    cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'all 0.2s',
  };
}

function copyAllBtnStyle(active: boolean): React.CSSProperties {
  return {
    display: 'flex', alignItems: 'center', gap: '0.25rem',
    padding: '0.25rem 0.6rem',
    borderRadius: 6,
    border: active ? '1.5px solid var(--green-leaf)' : '1.5px solid var(--terracotta)',
    background: active ? 'rgba(74,124,89,0.1)' : 'transparent',
    color: active ? 'var(--green-leaf)' : 'var(--terracotta)',
    fontSize: '0.72rem', fontWeight: 600,
    cursor: 'pointer', fontFamily: 'Golos Text, sans-serif',
    transition: 'all 0.25s',
  };
}

export default Index;
