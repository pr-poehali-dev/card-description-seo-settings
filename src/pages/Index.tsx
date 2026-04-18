import Icon from '@/components/ui/icon';

const TOMATO_IMAGE = "https://cdn.poehali.dev/projects/a66dc981-d76b-4b76-952c-34be790d56b4/files/575c7785-1203-41b0-a72d-1e15b4668353.jpg";

const params = [
  { icon: "Ruler", label: "Высота куста", value: "55–75 см" },
  { icon: "Clock", label: "Срок созревания", value: "75–80 дней" },
  { icon: "TreeDeciduous", label: "Тип роста", value: "Детерминант (Дварф)" },
  { icon: "Weight", label: "Масса плода", value: "80–150 г" },
  { icon: "Palette", label: "Цвет мякоти", value: "Лилово-бордовый" },
  { icon: "Sprout", label: "Тип листа", value: "Картофельный" },
];

const relatedSorts = [
  { num: 82, name: "Индиго Черри Дропс", slug: "indigo-cherry-drops", color: "#4a3060", desc: "Тёмно-фиолетовый дварф с кистями черри" },
  { num: 84, name: "Тоскана Виолет", slug: "toskana-violet", color: "#6b4a8a", desc: "Итальянский карлик с антоцианом" },
  { num: 81, name: "Блю Крим Тигр", slug: "blue-cream-tiger", color: "#5c6b3a", desc: "Полосатый дварф с зеленоватым плечом" },
];

const Index = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--parchment)' }}>

      {/* Header */}
      <header style={{ borderBottom: '1px solid var(--straw)', backgroundColor: '#fff9f0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0.9rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.5rem' }}>🍅</span>
            <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', fontWeight: 700, color: 'var(--soil-dark)', letterSpacing: '-0.02em' }}>
              СибТомат<span style={{ color: 'var(--terracotta)' }}>54</span>
            </span>
          </div>
          <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <a href="#" style={{ color: '#888', fontSize: '0.88rem', textDecoration: 'none', fontWeight: 500 }}>Каталог</a>
            <a href="#" style={{ color: '#888', fontSize: '0.88rem', textDecoration: 'none', fontWeight: 500 }}>Об авторе</a>
            <a href="#" style={{ color: '#888', fontSize: '0.88rem', textDecoration: 'none', fontWeight: 500 }}>Доставка</a>
            <button className="btn-primary" style={{ padding: '0.5rem 1.1rem', fontSize: '0.88rem' }}>Корзина</button>
          </nav>
        </div>
      </header>

      {/* Breadcrumb */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0.8rem 1.5rem' }}>
        <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', fontSize: '0.8rem', color: 'var(--ochre)' }}>
          <a href="#" style={{ color: 'var(--ochre)', textDecoration: 'none' }}>Каталог</a>
          <span>›</span>
          <a href="#" style={{ color: 'var(--ochre)', textDecoration: 'none' }}>Дварфы</a>
          <span>›</span>
          <span style={{ color: 'var(--soil-mid)' }}>Пурпурное сердце</span>
        </div>
      </div>

      {/* Main product block */}
      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem 3rem' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>

          {/* LEFT — Image */}
          <div className="animate-fade-in" style={{ position: 'sticky', top: '2rem' }}>
            <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 8px 40px rgba(61,43,31,0.15)', position: 'relative' }}>
              <img
                src={TOMATO_IMAGE}
                alt="Гном Пурпурное сердце в разрезе с лиловой мякотью на фото"
                style={{ width: '100%', height: 480, objectFit: 'cover', display: 'block' }}
              />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'linear-gradient(transparent, rgba(61,43,31,0.75))',
                padding: '2rem 1.5rem 1.5rem',
                color: 'white'
              }}>
                <div style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.8, marginBottom: 4 }}>
                  Dwarf Tomato Project · Australia
                </div>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', fontWeight: 600 }}>
                  Семена проверены в Новосибирской области
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.75rem' }}>
              {[
                { label: 'На кусту', emoji: '🌿' },
                { label: 'В разрезе', emoji: '🔪' },
                { label: 'В теплице', emoji: '🏡' },
              ].map((t) => (
                <div key={t.label} style={{
                  flex: 1, background: '#fff9f0', border: '2px solid var(--straw)',
                  borderRadius: 10, padding: '0.7rem', textAlign: 'center', cursor: 'pointer', fontSize: '1.3rem'
                }}>
                  {t.emoji}
                  <div style={{ fontSize: '0.7rem', color: 'var(--soil-mid)', marginTop: 3 }}>{t.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Info */}
          <div className="animate-fade-in" style={{ animationDelay: '0.12s' }}>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.8rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <span className="badge-param" style={{ background: 'var(--soil-dark)', color: 'var(--parchment)', border: 'none' }}>№83</span>
              <span className="tag-purple">Дварф</span>
              <span className="tag-purple">Австралия</span>
              <span style={{ fontSize: '0.75rem', color: '#999', marginLeft: 'auto' }}>Dwarf Tomato Project</span>
            </div>

            <h1 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '2.6rem',
              fontWeight: 700,
              color: 'var(--soil-dark)',
              lineHeight: 1.15,
              marginBottom: '0.3rem'
            }}>
              Гном Пурпурное сердце
            </h1>
            <div style={{ fontSize: '1rem', color: 'var(--purple-tomato)', fontStyle: 'italic', marginBottom: '1.2rem' }}>
              Dwarf Purple Heart · Australia
            </div>

            <div className="wood-divider" style={{ marginBottom: '1.2rem' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.2rem', fontWeight: 700, color: 'var(--terracotta)' }}>
                120 ₽
              </span>
              <span style={{ fontSize: '0.85rem', color: '#888', lineHeight: 1.5 }}>
                10 семян<br />включая пересылку
              </span>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
              <button className="btn-primary" style={{ flex: 1 }}>🛒 Купить семена</button>
              <button className="btn-secondary">❤️ В избранное</button>
            </div>

            {/* Params */}
            <div style={{ marginBottom: '2rem' }}>
              <div className="section-label" style={{ marginBottom: '0.75rem' }}>Параметры сорта</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                {params.map((p) => (
                  <div key={p.label} className="card-warm" style={{ padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <Icon name={p.icon} fallback="Circle" size={16} style={{ color: 'var(--terracotta)', flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--ochre)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>{p.label}</div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--soil-dark)' }}>{p.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery quick */}
            <div className="card-warm" style={{ padding: '1rem 1.2rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.4rem' }}>📦</span>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--soil-dark)', fontSize: '0.9rem', marginBottom: '0.2rem' }}>Условия отправки</div>
                  <div style={{ fontSize: '0.83rem', color: 'var(--soil-mid)', lineHeight: 1.6 }}>
                    Отправка Почтой России в любой регион.<br />
                    Срок хранения семян <strong>до 8 лет</strong> при правильном хранении.
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Full description */}
        <div style={{ marginTop: '3.5rem' }}>
          <div className="wood-divider" style={{ marginBottom: '2.5rem' }} />
          <div style={{ maxWidth: 780 }}>
            <div className="section-label" style={{ marginBottom: '0.6rem' }}>История и характер сорта</div>
            <h2 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1.9rem',
              fontWeight: 600,
              color: 'var(--soil-dark)',
              marginBottom: '1.5rem',
              lineHeight: 1.2
            }}>
              Атлет с тёмной душой: как рождался Пурпурный гном
            </h2>

            <div style={{ fontSize: '1rem', lineHeight: 1.85, color: 'var(--soil-mid)' }}>
              <p style={{ marginBottom: '1.2rem' }}>
                На контрасте с{' '}
                <a href="#sort-84" style={{ color: 'var(--terracotta)', textDecoration: 'underline', textDecorationColor: 'var(--ochre)' }}>
                  Тосканой Виолет (№84)
                </a>{' '}
                — итальянским пижоном — наш{' '}
                <strong style={{ color: 'var(--soil-dark)' }}>Пурпурный гном</strong>{' '}
                напоминает скорее коренастого сибирского атлета: невысокий, мощный, с характером. Куст
                вырастает до 70 см — настоящий дубок в мире дварфов. Не жирует, не тянется ввысь,
                а честно работает: завязывает плоды весом до 150 граммов, один за другим.
              </p>

              <p style={{ marginBottom: '1.2rem' }}>
                <strong>История сорта</strong> уходит в{' '}
                <em>Dwarf Tomato Project</em> — международный проект по созданию компактных томатов
                с выдающимся вкусом. Пурпурное сердце выведено в Австралии при участии Сюзанн Оливье
                и стало одной из самых тёмных линий проекта. Антоцианы дают плодам ту самую лиловую
                мякоть, ради которой его и разыскивают ценители.
              </p>

              <p style={{ marginBottom: '1.2rem' }}>
                У меня на грядках в Новосибирской области он показал себя крепко. Сиеста в междурядье
                была короткой — не успеешь оглянуться, как первые плоды уже просятся в корзину.
                Через 75–80 дней после высадки рассады. Вкус насыщенный, с виноградной кислинкой
                и сахаром одновременно — словно из кубышки достали что-то особенное.{' '}
                <strong>Покушать</strong> с куста — отдельное удовольствие, домой уже
                не всё доносишь.
              </p>

              <p style={{ marginBottom: '1.2rem' }}>
                Лист картофельного типа — широкий, тёмно-зелёный, плотный как у молодого
                папоротника. В теплице при умеренном поливе не капризничает.
                Сорт детерминантный — рост сам останавливается, пасынкование минимальное.
                Хорошо для тех, кто любит результат без лишних телодвижений.
              </p>

              <p>
                Семена упакованы по 10 штук, срок хранения{' '}
                <strong style={{ color: 'var(--soil-dark)' }}>до 8 лет</strong> в сухом прохладном
                месте. Отправка Почтой России. А если понравится — загляните ещё и на{' '}
                <a href="#sort-82" style={{ color: 'var(--terracotta)', textDecoration: 'underline', textDecorationColor: 'var(--ochre)' }}>
                  Индиго Черри Дропс (№82)
                </a>
                {' '}— тёмные черри-кисти в пару к этому атлету смотрятся просто шикарно.
              </p>
            </div>
          </div>
        </div>

        {/* Delivery full */}
        <div style={{ marginTop: '2.5rem' }}>
          <div className="wood-divider" style={{ marginBottom: '2rem' }} />
          <div className="section-label" style={{ marginBottom: '1rem' }}>Отправка и хранение</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            {[
              { icon: '📮', title: 'Почта России', desc: 'Отправляем в любой регион страны. Трек-номер предоставляется.' },
              { icon: '⏳', title: 'Срок хранения', desc: 'До 8 лет при хранении в сухом прохладном месте без попадания света.' },
              { icon: '🌱', title: 'Всхожесть', desc: 'Семена проверены в Новосибирской области. Всхожесть 85–95%.' },
            ].map((item) => (
              <div key={item.title} className="card-warm" style={{ padding: '1.25rem' }}>
                <div style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>{item.icon}</div>
                <div style={{ fontWeight: 700, color: 'var(--soil-dark)', fontSize: '0.95rem', marginBottom: '0.4rem' }}>{item.title}</div>
                <div style={{ fontSize: '0.83rem', color: 'var(--soil-mid)', lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Related */}
        <div style={{ marginTop: '3rem' }}>
          <div className="wood-divider" style={{ marginBottom: '2rem' }} />
          <div className="section-label" style={{ marginBottom: '0.5rem' }}>Смотрите также</div>
          <h3 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '1.7rem',
            fontWeight: 600,
            color: 'var(--soil-dark)',
            marginBottom: '1.25rem'
          }}>
            Похожие дварфы из коллекции
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            {relatedSorts.map((s) => (
              <a
                key={s.num}
                href={`/${s.slug}`}
                id={`sort-${s.num}`}
                className="card-warm related-card"
                style={{ padding: '1.25rem', display: 'block', textDecoration: 'none' }}
              >
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 10,
                    background: s.color, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem'
                  }}>🍅</div>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--ochre)', fontWeight: 700, letterSpacing: '0.08em', marginBottom: 2 }}>№{s.num}</div>
                    <div style={{ fontWeight: 700, color: 'var(--soil-dark)', fontSize: '0.92rem', lineHeight: 1.3, marginBottom: '0.3rem' }}>{s.name}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--soil-mid)', lineHeight: 1.5 }}>{s.desc}</div>
                  </div>
                </div>
                <div style={{ marginTop: '0.85rem', paddingTop: '0.7rem', borderTop: '1px solid var(--straw)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--terracotta)', fontWeight: 600 }}>120 ₽ · 10 сем.</span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--ochre)' }}>Смотреть →</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* SEO text */}
        <div style={{ marginTop: '3rem', padding: '1.5rem', background: 'var(--straw)', borderRadius: 12 }}>
          <div className="section-label" style={{ marginBottom: '0.5rem' }}>О сорте</div>
          <p style={{ fontSize: '0.82rem', color: 'var(--soil-mid)', lineHeight: 1.7, margin: 0 }}>
            Томат Пурпурное сердце — купить семена от Натальи Перебериной в интернет-магазине СибТомат54.
            Дварф Пурпурное сердце (Dwarf Purple Heart) — редкий сорт из Dwarf Tomato Project (Австралия).
            Гном Пурпурное сердце на кусту в теплице. URL: purpurnoe-serdce-dwarf-australia.
          </p>
        </div>

      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--straw)', backgroundColor: 'var(--soil-dark)', color: 'var(--straw)', padding: '2rem 1.5rem', marginTop: '3rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.3rem' }}>
              СибТомат<span style={{ color: 'var(--terracotta)' }}>54</span>
            </div>
            <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Семена от Натальи Перебериной · Новосибирск</div>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.83rem', opacity: 0.8 }}>
            <a href="#" style={{ color: 'var(--straw)', textDecoration: 'none' }}>Каталог</a>
            <a href="#" style={{ color: 'var(--straw)', textDecoration: 'none' }}>Доставка</a>
            <a href="#" style={{ color: 'var(--straw)', textDecoration: 'none' }}>Контакты</a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Index;