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
  return text.split('').map(c => map[c] !== undefined ? map[c] : c).join('')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

interface PhotoRow {
  num: number;
  emoji: string;
  theme: string;
  filename: (slug: string) => string;
  description: (name: string) => string;
}

const PHOTOS: PhotoRow[] = [
  { num: 1, emoji: '🛒', theme: 'Купить семена', filename: (slug) => `foto-${slug}-sibtomat54ru-ru-1.jpg`, description: (name) => `Купить семена томата ${name} от СибТомат54.ру` },
  { num: 2, emoji: '🔪', theme: 'Разрез томата',  filename: (slug) => `foto-${slug}-sibtomat54ru-ru-2.jpg`, description: (name) => `Разрез томата ${name} на sibtomat54.ru` },
  { num: 3, emoji: '🌿', theme: 'На кусту',       filename: (slug) => `foto-${slug}-sibtomat54ru-ru-3.jpg`, description: (name) => `Томат ${name} на кусту — sibtomat54.ru` },
  { num: 4, emoji: '🏡', theme: 'В теплице',      filename: (slug) => `foto-${slug}-sibtomat54ru-ru-4.jpg`, description: (name) => `${name} в теплице — семена на sibtomat54.ru` },
  { num: 5, emoji: '📦', theme: 'Семена крупно',  filename: (slug) => `foto-${slug}-sibtomat54ru-ru-5.jpg`, description: (name) => `Семена томата ${name} купить — СибТомат54.ру` },
];

interface Params {
  name: string; nameEn: string; origin: string; breeder: string;
  ripening: string; type: string; height: string; days: string;
  weight: string; color: string; shape: string; taste: string;
  pairName: string; pairPhrase: string;
}

const emptyParams: Params = {
  name: '', nameEn: '', origin: '', breeder: '',
  ripening: '', type: '', height: '', days: '',
  weight: '', color: '', shape: '', taste: '',
  pairName: '', pairPhrase: '',
};

function generateShort(p: Params): string {
  if (!p.name) return '';
  let text = `${p.name}${p.nameEn ? ` (${p.nameEn})` : ''} — `;
  const chars: string[] = [];
  if (p.ripening) chars.push(p.ripening.toLowerCase() + ' сорт');
  if (p.type) chars.push(p.type.toLowerCase());
  if (p.origin) chars.push(`из ${p.origin}`);
  if (p.breeder) chars.push(`селекция ${p.breeder}`);
  if (chars.length) text += chars.join(', ') + '. ';
  const props: string[] = [];
  if (p.height) props.push(`высота куста ${p.height}`);
  if (p.days) props.push(`срок созревания ${p.days} дней`);
  if (p.weight) props.push(`масса плода ${p.weight}`);
  if (p.color) props.push(`окраска — ${p.color.toLowerCase()}`);
  if (p.shape) props.push(`форма — ${p.shape.toLowerCase()}`);
  if (props.length) text += props.join(', ') + '. ';
  if (p.taste) text += p.taste + '. ';
  text += 'Семена проверены в Новосибирской области — СибТомат54.ру.';
  return text;
}

function generateFull(p: Params): string {
  if (!p.name) return '';
  const lines: string[] = [];
  let intro = `${p.name}${p.nameEn ? ` (${p.nameEn})` : ''}`;
  if (p.ripening) intro += ` — ${p.ripening.toLowerCase()} сорт`;
  if (p.type) intro += ` ${p.type.toLowerCase()}`;
  if (p.origin) intro += ` из ${p.origin}`;
  if (p.breeder) intro += `, выведенный ${p.breeder}`;
  if (p.days) intro += `. Срок созревания ${p.days} дней`;
  if (p.height) intro += `, высота куста достигает ${p.height}`;
  lines.push(intro + '.');

  const fruitParts: string[] = [];
  if (p.color) fruitParts.push(`окраска плодов — ${p.color.toLowerCase()}`);
  if (p.shape) fruitParts.push(`форма — ${p.shape.toLowerCase()}`);
  if (p.weight) fruitParts.push(`масса ${p.weight}`);
  if (fruitParts.length) lines.push(`Плоды отличаются выразительной внешностью: ${fruitParts.join(', ')}.`);

  if (p.taste) {
    lines.push(`Мякоть ${p.taste.toLowerCase()}.`);
  } else {
    lines.push('Мякоть плотная, мясистая, с насыщенным вкусом. Отлично подходит для свежего потребления и салатов.');
  }

  lines.push('Семена проверены в условиях Новосибирской области — СибТомат54.ру.');

  if (p.pairName && p.pairPhrase) {
    lines.push(`Также рекомендуем сорт ${p.pairName} — идеальная пара к ${p.name}. Вместе они ${p.pairPhrase.toLowerCase()}.`);
  } else if (p.pairName) {
    lines.push(`Также рекомендуем сорт ${p.pairName} — идеальная пара к ${p.name}.`);
  }

  return lines.join('\n\n');
}

type CopyState = { row: number; col: 'file' | 'desc' } | null;
type Tab = 'files' | 'texts';

const Index = () => {
  const [p, setP] = useState<Params>(emptyParams);
  const [tab, setTab] = useState<Tab>('files');
  const [copied, setCopied] = useState<CopyState>(null);
  const [copiedText, setCopiedText] = useState<'short' | 'full' | null>(null);
  const [allCopied, setAllCopied] = useState<'files' | 'descs' | null>(null);

  const set = (key: keyof Params) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setP(prev => ({ ...prev, [key]: e.target.value }));

  const slug = transliterate(p.name.trim());
  const hasData = slug.length > 0;
  const shortDesc = generateShort(p);
  const fullDesc = generateFull(p);

  const copyCell = async (text: string, row: number, col: 'file' | 'desc') => {
    await navigator.clipboard.writeText(text);
    setCopied({ row, col });
    setTimeout(() => setCopied(null), 1800);
  };
  const copyBlock = async (text: string, which: 'short' | 'full') => {
    await navigator.clipboard.writeText(text);
    setCopiedText(which);
    setTimeout(() => setCopiedText(null), 1800);
  };
  const copyAllFiles = async () => {
    await navigator.clipboard.writeText(PHOTOS.map(ph => ph.filename(slug)).join('\n'));
    setAllCopied('files');
    setTimeout(() => setAllCopied(null), 1800);
  };
  const copyAllDescs = async () => {
    await navigator.clipboard.writeText(PHOTOS.map(ph => ph.description(p.name)).join('\n'));
    setAllCopied('descs');
    setTimeout(() => setAllCopied(null), 1800);
  };
  const isCopied = (row: number, col: 'file' | 'desc') => copied?.row === row && copied?.col === col;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--parchment)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2.5rem 1.5rem 4rem' }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
          <span style={{ fontSize: '1.5rem' }}>🍅</span>
          <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', fontWeight: 700, color: 'var(--soil-dark)' }}>
            СибТомат<span style={{ color: 'var(--terracotta)' }}>54</span>
          </span>
        </div>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.9rem', fontWeight: 700, color: 'var(--soil-dark)', marginBottom: '0.3rem' }}>
          Генератор карточки товара
        </h1>
        <p style={{ fontSize: '0.88rem', color: 'var(--soil-mid)' }}>
          Заполни параметры — получи тексты и имена файлов для Nethhouse
        </p>
      </div>

      <div style={{ width: '100%', maxWidth: 820, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

        {/* ПАРАМЕТРЫ */}
        <div className="card-warm" style={{ padding: '1.75rem 2rem' }}>
          <div className="section-label" style={{ marginBottom: '1.1rem' }}>Параметры сорта</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {([
              { key: 'name',     label: 'Название (рус)',  placeholder: 'Беркли Тай Дай' },
              { key: 'nameEn',   label: 'Название (англ)', placeholder: 'Berkeley Tie Dye' },
              { key: 'origin',   label: 'Страна',          placeholder: 'США' },
              { key: 'breeder',  label: 'Селекционер',     placeholder: 'Бред Гейтс' },
              { key: 'ripening', label: 'Срок созревания', placeholder: 'Среднеспелый' },
              { key: 'type',     label: 'Тип куста',       placeholder: 'Индетерминантный' },
              { key: 'height',   label: 'Высота',          placeholder: '180 см' },
              { key: 'days',     label: 'Дней до урожая',  placeholder: '110–120' },
              { key: 'weight',   label: 'Масса плода',     placeholder: '150–400 г' },
              { key: 'color',    label: 'Цвет плода',      placeholder: 'Коричнево-красный с зелёными штрихами' },
              { key: 'shape',    label: 'Форма плода',     placeholder: 'Бычье сердце' },
            ] as { key: keyof Params; label: string; placeholder: string }[]).map(f => (
              <div key={f.key}>
                <label style={labelStyle}>{f.label}</label>
                <input value={p[f.key]} onChange={set(f.key)} placeholder={f.placeholder} style={inputStyle} />
              </div>
            ))}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Вкус и мякоть</label>
              <textarea value={p.taste} onChange={set('taste')} placeholder="Плотная, мясистая, сладкая с уникальным ароматом" rows={2} style={{ ...inputStyle, resize: 'vertical' }} />
            </div>
          </div>
        </div>

        {/* ПЕРЕЛИНКОВКА */}
        <div className="card-warm" style={{ padding: '1.5rem 2rem' }}>
          <div className="section-label" style={{ marginBottom: '1rem' }}>Перелинковка — рекомендуемый сорт</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div>
              <label style={labelStyle}>Название сорта-пары</label>
              <input value={p.pairName} onChange={set('pairName')} placeholder="Амурские волны" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Фраза «вместе они…»</label>
              <input value={p.pairPhrase} onChange={set('pairPhrase')} placeholder="создадут палитру вкусов и красок на столе" style={inputStyle} />
            </div>
          </div>
          {p.pairName && (
            <div style={{ marginTop: '0.75rem', padding: '0.7rem 1rem', borderRadius: 8, background: '#fffdf8', border: '1px dashed var(--ochre)', fontSize: '0.83rem', color: 'var(--soil-mid)', lineHeight: 1.6 }}>
              Также рекомендуем сорт <strong style={{ color: 'var(--terracotta)' }}>{p.pairName}</strong> — идеальная пара к <strong style={{ color: 'var(--soil-dark)' }}>{p.name || '…'}</strong>.{p.pairPhrase ? ` Вместе они ${p.pairPhrase.toLowerCase()}.` : ''}
            </div>
          )}
        </div>

        {/* РЕЗУЛЬТАТЫ */}
        {hasData && (
          <>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {([['files', '📂 Файлы и alt'], ['texts', '📝 Описания']] as [Tab, string][]).map(([t, label]) => (
                <button key={t} onClick={() => setTab(t)} style={{
                  padding: '0.55rem 1.2rem', borderRadius: 8, cursor: 'pointer',
                  fontFamily: 'Golos Text, sans-serif', fontWeight: 600, fontSize: '0.88rem',
                  background: tab === t ? 'var(--terracotta)' : '#fff9f0',
                  color: tab === t ? 'var(--parchment)' : 'var(--soil-mid)',
                  border: tab === t ? '1.5px solid var(--terracotta)' : '1.5px solid var(--straw)',
                  transition: 'all 0.2s',
                }}>
                  {label}
                </button>
              ))}
            </div>

            {tab === 'files' && (
              <div className="card-warm animate-fade-in" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.8rem 6.5rem 1fr 1fr', gap: '0.75rem', alignItems: 'center', marginBottom: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--straw)' }}>
                  <div />
                  <div style={colHeadStyle}>Тема</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={colHeadStyle}>Имя файла</span>
                    <button onClick={copyAllFiles} style={copyAllBtnStyle(allCopied === 'files')}>
                      <Icon name={allCopied === 'files' ? 'CheckCheck' : 'Copy'} size={12} />
                      {allCopied === 'files' ? 'Скопированы' : 'Все'}
                    </button>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={colHeadStyle}>Alt-текст</span>
                    <button onClick={copyAllDescs} style={copyAllBtnStyle(allCopied === 'descs')}>
                      <Icon name={allCopied === 'descs' ? 'CheckCheck' : 'Copy'} size={12} />
                      {allCopied === 'descs' ? 'Скопированы' : 'Все'}
                    </button>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {PHOTOS.map((ph) => {
                    const filename = ph.filename(slug);
                    const desc = ph.description(p.name);
                    return (
                      <div key={ph.num} style={{ display: 'grid', gridTemplateColumns: '1.8rem 6.5rem 1fr 1fr', gap: '0.75rem', alignItems: 'center', padding: '0.6rem 0.5rem', borderRadius: 8, background: '#fffdf8', border: '1px solid var(--straw)' }}>
                        <div style={{ width: 22, height: 22, borderRadius: 6, background: 'var(--straw)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.68rem', fontWeight: 700, color: 'var(--soil-mid)' }}>{ph.num}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <span>{ph.emoji}</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--soil-mid)', fontWeight: 500 }}>{ph.theme}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <code style={{ flex: 1, fontSize: '0.72rem', fontFamily: 'monospace', color: 'var(--soil-dark)', wordBreak: 'break-all', lineHeight: 1.4 }}>{filename}</code>
                          <button onClick={() => copyCell(filename, ph.num, 'file')} style={copyBtnStyle(isCopied(ph.num, 'file'))}>
                            <Icon name={isCopied(ph.num, 'file') ? 'Check' : 'Copy'} size={12} />
                          </button>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <span style={{ flex: 1, fontSize: '0.78rem', color: 'var(--soil-dark)', lineHeight: 1.4 }}>{desc}</span>
                          <button onClick={() => copyCell(desc, ph.num, 'desc')} style={copyBtnStyle(isCopied(ph.num, 'desc'))}>
                            <Icon name={isCopied(ph.num, 'desc') ? 'Check' : 'Copy'} size={12} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {tab === 'texts' && (
              <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="card-warm" style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span className="section-label">Краткое описание</span>
                    <button onClick={() => copyBlock(shortDesc, 'short')} style={copyAllBtnStyle(copiedText === 'short')}>
                      <Icon name={copiedText === 'short' ? 'CheckCheck' : 'Copy'} size={13} />
                      {copiedText === 'short' ? 'Скопировано' : 'Копировать'}
                    </button>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--soil-dark)', lineHeight: 1.75, margin: 0, background: '#fffdf8', padding: '1rem', borderRadius: 8, border: '1px solid var(--straw)' }}>
                    {shortDesc}
                  </p>
                </div>

                <div className="card-warm" style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span className="section-label">Полное описание</span>
                    <button onClick={() => copyBlock(fullDesc, 'full')} style={copyAllBtnStyle(copiedText === 'full')}>
                      <Icon name={copiedText === 'full' ? 'CheckCheck' : 'Copy'} size={13} />
                      {copiedText === 'full' ? 'Скопировано' : 'Копировать'}
                    </button>
                  </div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--soil-dark)', lineHeight: 1.8, background: '#fffdf8', padding: '1rem', borderRadius: 8, border: '1px solid var(--straw)' }}>
                    {fullDesc.split('\n\n').map((para, i) => (
                      <p key={i} style={{ margin: i === 0 ? 0 : '0.8rem 0 0' }}>{para}</p>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {!hasData && (
          <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📂</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--ochre)' }}>Введи название сорта — появятся результаты</div>
          </div>
        )}

      </div>
    </div>
  );
};

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '0.68rem', fontWeight: 700,
  letterSpacing: '0.09em', textTransform: 'uppercase',
  color: 'var(--ochre)', marginBottom: '0.35rem',
};

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '0.6rem 0.85rem', borderRadius: 7,
  border: '1.5px solid var(--straw)', background: '#fffdf8',
  fontFamily: 'Golos Text, sans-serif', fontSize: '0.88rem',
  color: 'var(--soil-dark)', outline: 'none', boxSizing: 'border-box',
};

const colHeadStyle: React.CSSProperties = {
  fontSize: '0.65rem', fontWeight: 700,
  letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ochre)',
};

function copyBtnStyle(active: boolean): React.CSSProperties {
  return {
    flexShrink: 0, width: 26, height: 26, borderRadius: 6, border: 'none',
    background: active ? 'var(--green-leaf)' : 'var(--terracotta)',
    color: 'var(--parchment)', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'all 0.2s',
  };
}

function copyAllBtnStyle(active: boolean): React.CSSProperties {
  return {
    display: 'flex', alignItems: 'center', gap: '0.25rem',
    padding: '0.3rem 0.7rem', borderRadius: 6,
    border: active ? '1.5px solid var(--green-leaf)' : '1.5px solid var(--terracotta)',
    background: active ? 'rgba(74,124,89,0.1)' : 'transparent',
    color: active ? 'var(--green-leaf)' : 'var(--terracotta)',
    fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer',
    fontFamily: 'Golos Text, sans-serif', transition: 'all 0.25s',
  };
}

export default Index;
