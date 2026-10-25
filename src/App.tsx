import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Minus, Phone, Plus, X } from 'lucide-react';
import { COPY, ROOM_PHOTOS } from '@/content';
import { CREDITS } from '@/credits';
import { useCopy } from '@/lib/lang';
import { PHONE_DISPLAY, TEL, waUrl } from '@/lib/wa';
import { todayISO, useBooking } from '@/lib/booking';
import { HeroPic, Pic } from '@/components/Pic';
import { RoomGallery } from '@/components/RoomGallery';
import { LangSwitch } from '@/components/LangSwitch';
import { WaFab, WaIcon } from '@/components/WaFab';

/** Kawung motif: four ovals around a centre point, the classic Yogyakarta batik pattern. */
const Kawung = ({ size = 30 }: { size?: number }) => (
  <svg viewBox="0 0 40 40" width={size} height={size} aria-hidden="true">
    <g fill="none" stroke="currentColor" strokeWidth="1.6">
      <ellipse cx="20" cy="10" rx="6" ry="9" /><ellipse cx="20" cy="30" rx="6" ry="9" />
      <ellipse cx="10" cy="20" rx="9" ry="6" /><ellipse cx="30" cy="20" rx="9" ry="6" />
    </g>
    <circle cx="20" cy="20" r="1.8" fill="currentColor" />
  </svg>
);

const Divider = () => <div className="divider" aria-hidden="true"><i /><Kawung size={22} /><i /></div>;

export default function App() {
  const c = useCopy(COPY);
  const [menu, setMenu] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [solid, setSolid] = useState(false);
  const b = useBooking();

  useEffect(() => {
    document.documentElement.style.overflow = menu || sheet ? 'hidden' : '';
  }, [menu, sheet]);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on();
    window.addEventListener('scroll', on, { passive: true });
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') { setMenu(false); setSheet(false); } };
    window.addEventListener('keydown', esc);
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('keydown', esc); };
  }, []);
  const book = (room?: string) => { if (room !== undefined) b.setRoom(room); setMenu(false); setSheet(true); };

  return (
    <>
      <a href="#main" className="skip">{c.skip}</a>
      <header className={`hdr ${solid ? 'solid' : ''}`}>
        <a href="#top" className="logo"><Kawung size={26} /><span>Pendhapa Sogan</span></a>
        <nav className="dnav" aria-label="Primary">{c.nav.slice(0, 4).map(([h, l]) => <a key={h} href={h}>{l}</a>)}</nav>
        <div className="hdr-r">
          <LangSwitch label={c.langLabel} />
          <button className="b-gold desk" onClick={() => book()}>{c.reserveShort}</button>
          <button className="menu-btn mob" aria-label={c.openMenu} aria-expanded={menu} aria-controls="menu" onClick={() => setMenu(true)}><i /><i /></button>
        </div>
      </header>

      <main id="main">
        <section id="top" className="hero">
          <div className="hero-txt">
            <p className="kick">{c.heroEyebrow}</p>
            <h1>{c.heroTitle}</h1>
            <p className="hero-p">{c.heroText}</p>
          </div>
          <div className="hero-arch">
            <HeroPic alt={c.heroAlt} className="hero-img" />
            <span className="seal"><Kawung size={18} /> {c.est}</span>
          </div>
        </section>

        <section id="ndalem" className="ndalem">
          <Divider />
          <p className="kick">{c.introEyebrow}</p>
          <h2>{c.introTitle}</h2>
          <p className="body">{c.introText}</p>
          <ol className="facts">{c.facts.map(([n, l]) => <li key={l}><strong>{n}</strong><span>{l}</span></li>)}</ol>
        </section>

        <Rooms onAsk={book} />

        <section id="rasa" className="rasa">
          <p className="kick">{c.rasaEyebrow}</p>
          <h2>{c.rasaTitle}</h2>
          <ol className="rasa-list">
            {c.rasa.map((r, i) => (
              <li key={r.t}>
                <div className="rasa-img"><Pic name={r.img} alt={r.alt} sizes="(min-width: 900px) 30vw, 40vw" widths={[640, 1024]} /></div>
                <div>
                  <span className="num">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{r.t}</h3>
                  <p>{r.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="kraton" className="loc">
          <div className="loc-in">
            <p className="kick">{c.locEyebrow}</p>
            <h2>{c.locTitle}</h2>
            <p>{c.locText}</p>
            <dl className="loc-list">{c.locList.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
          </div>
        </section>

        <section id="stay" className="stay">
          <Divider />
          <p className="kick">{c.stayEyebrow}</p>
          <h2>{c.stayTitle}</h2>
          <p className="body">{c.stayText}</p>
          <div className="cta-col">
            <button className="b-sogan" onClick={() => book()}>{c.reserve} <ArrowRight size={18} /></button>
            <a className="b-wa" href={waUrl(c.waDefault)} target="_blank" rel="noopener noreferrer"><WaIcon size={20} /> {c.chat}</a>
            <a className="b-line" href={TEL}><Phone size={18} /> {c.call} <span dir="ltr">{PHONE_DISPLAY}</span></a>
          </div>
        </section>
      </main>

      <footer className="ftr">
        <div className="ftr-in">
          <a href="#top" className="logo"><Kawung size={26} /><span>Pendhapa Sogan</span></a>
          <p>{c.footerTag}</p>
          <p className="ftr-c"><strong>{c.contact}</strong><br />
            <a href={waUrl(c.waDefault)} target="_blank" rel="noopener noreferrer">WhatsApp <span dir="ltr">{PHONE_DISPLAY}</span></a><br />
            <a href={TEL}>{c.call} <span dir="ltr">{PHONE_DISPLAY}</span></a></p>
          <p className="demo">{c.demo}</p>
          <details className="cred">
            <summary>{c.credits}</summary>
            <ul>{CREDITS.map((cr) => <li key={cr.page}><a href={cr.page} target="_blank" rel="noopener noreferrer">{cr.title.replace(/\.(jpe?g|png)$/i, '')}</a>, {cr.artist}, {cr.lic}</li>)}</ul>
          </details>
          <p className="legal">{c.rights}</p>
        </div>
      </footer>

      <div className="dock">
        <button className="dock-res" onClick={() => book()} aria-haspopup="dialog">{c.reserve}</button>
      </div>
      <WaFab text={c.waDefault} label={c.waLabel} />

      {menu && (
        <div id="menu" className="menu" role="dialog" aria-modal="true" aria-label={c.menu}>
          <div className="menu-hd">
            <LangSwitch label={c.langLabel} />
            <button className="ibtn" aria-label={c.closeMenu} onClick={() => setMenu(false)} autoFocus><X size={24} /></button>
          </div>
          <nav aria-label={c.menu} className="menu-nav">
            {c.nav.map(([h, l], i) => <a key={h} href={h} onClick={() => setMenu(false)}><span>{String(i + 1).padStart(2, '0')}</span>{l}</a>)}
          </nav>
          <div className="menu-ft">
            <a href={TEL}><Phone size={16} /> <span dir="ltr">{PHONE_DISPLAY}</span></a>
            <Kawung size={28} />
          </div>
        </div>
      )}

      {sheet && <Sheet b={b} onClose={() => setSheet(false)} />}
    </>
  );
}

function Rooms({ onAsk }: { onAsk: (r: string) => void }) {
  const c = useCopy(COPY);
  const ref = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const n = c.rooms.length;
  const step = () => { const el = ref.current; const card = el?.firstElementChild as HTMLElement | null; return card ? card.offsetWidth + 16 : 1; };
  const onScroll = () => { const el = ref.current; if (el) setIdx(Math.max(0, Math.min(n - 1, Math.round(el.scrollLeft / step())))); };
  const go = (d: number) => { const el = ref.current; if (el) el.scrollTo({ left: (idx + d) * step(), behavior: 'smooth' }); };
  return (
    <section id="rooms" className="rooms">
      <div className="rooms-head">
        <div>
          <p className="kick">{c.roomsEyebrow}</p>
          <h2>{c.roomsTitle}</h2>
        </div>
        <div className="arrows">
          <button className="ibtn ring" aria-label={c.prev} disabled={idx === 0} onClick={() => go(-1)}><ArrowLeft size={18} /></button>
          <button className="ibtn ring" aria-label={c.next} disabled={idx === n - 1} onClick={() => go(1)}><ArrowRight size={18} /></button>
        </div>
      </div>
      <div className="deck" ref={ref} onScroll={onScroll} role="region" aria-label={c.roomsTitle} tabIndex={0}>
        {c.rooms.map((r, i) => (
          <article className={`room ${i === idx ? 'on' : ''}`} key={r.name}>
            <div className="arch"><RoomGallery photos={ROOM_PHOTOS[i] ?? []} alts={r.alts} label={r.name} note={c.photoNote} photoOf={c.photoOf} sizes="(min-width: 900px) 32vw, 80vw" /></div>
            <p className="r-meta">{r.meta}</p>
            <h3>{r.name}</h3>
            <p className="r-text">{r.text}</p>
            <button className="r-ask" onClick={() => onAsk(r.name)}>{c.askRoom} <ArrowRight size={16} /></button>
          </article>
        ))}
      </div>
      <div className="pager">
        <span aria-live="polite"><b>{String(idx + 1).padStart(2, '0')}</b> {c.of} {String(n).padStart(2, '0')}</span>
        <span className="dots" aria-hidden="true">{c.rooms.map((r, i) => <i key={r.name} className={i === idx ? 'on' : ''} />)}</span>
        <span className="swipe" aria-hidden="true">{c.swipe}</span>
      </div>
    </section>
  );
}

function Sheet({ b, onClose }: { b: ReturnType<typeof useBooking>; onClose: () => void }) {
  const c = useCopy(COPY);
  const [s, setS] = useState(0);
  const canNext = !b.datesInvalid;
  const dateLine = b.arrival || b.departure ? `${b.arrival || '…'} → ${b.departure || '…'}` : c.f.flexible;
  return (
    <div className="sheet-bg" onClick={onClose}>
      <form className="sheet" role="dialog" aria-modal="true" aria-labelledby="st" onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => {
          e.preventDefault();
          if (s < 2) { if (canNext) setS(s + 1); return; }
          window.open(waUrl(b.compose({ ...c.msg })), '_blank', 'noopener');
        }}>
        <div className="handle" aria-hidden="true" />
        <div className="sheet-hd">
          <h2 id="st">{c.sheetTitle}</h2>
          <button type="button" className="ibtn" aria-label={c.f.close} onClick={onClose} autoFocus><X size={22} /></button>
        </div>
        <ol className="stepper" aria-label={`${c.f.step} ${s + 1} ${c.of} 3`}>
          {c.steps.map((t, i) => (
            <li key={t} className={i === s ? 'on' : i < s ? 'done' : ''} aria-current={i === s ? 'step' : undefined}>
              <span>{i < s ? <Check size={14} /> : i + 1}</span>{t}
            </li>
          ))}
        </ol>

        {s === 0 && (
          <div className="pane">
            <div className="dates">
              <label><span>{c.f.arrival}</span><input type="date" min={todayISO()} value={b.arrival} onChange={(e) => b.setArrival(e.target.value)} /></label>
              <label><span>{c.f.departure}</span><input type="date" min={b.arrival || todayISO(1)} value={b.departure} onChange={(e) => b.setDeparture(e.target.value)} aria-invalid={b.datesInvalid} /></label>
            </div>
            {b.datesInvalid ? <p className="err" role="alert">{c.f.dateError}</p> : b.nights > 0 ? <p className="nights">{b.nights === 1 ? c.f.night : c.f.nights.replace('{n}', String(b.nights))}</p> : null}
            <div className="guests">
              <span id="gl">{c.f.guests}</span>
              <div role="group" aria-labelledby="gl" className="stepbtn">
                <button type="button" aria-label={c.f.less} disabled={b.guests <= 1} onClick={() => b.setGuests(b.guests - 1)}><Minus size={18} /></button>
                <output aria-live="polite">{b.guests}</output>
                <button type="button" aria-label={c.f.more} disabled={b.guests >= 8} onClick={() => b.setGuests(b.guests + 1)}><Plus size={18} /></button>
              </div>
            </div>
          </div>
        )}

        {s === 1 && (
          <fieldset className="pane rlist">
            <legend>{c.f.room}</legend>
            {['', ...c.rooms.map((r) => r.name)].map((name) => (
              <label key={name || 'any'} className={b.room === name ? 'on' : ''}>
                <input type="radio" name="room" value={name} checked={b.room === name} onChange={() => b.setRoom(name)} />
                <span className="radio" aria-hidden="true" />{name || c.f.anyRoom}
              </label>
            ))}
          </fieldset>
        )}

        {s === 2 && (
          <div className="pane">
            <div className="summary">
              <p className="sum-h">{c.f.summary}</p>
              <p>{dateLine}{b.nights > 0 ? ` · ${b.nights === 1 ? c.f.night : c.f.nights.replace('{n}', String(b.nights))}` : ''}</p>
              <p>{b.guests} {c.f.guests.toLowerCase()} · {b.room || c.f.anyRoom}</p>
            </div>
            <label className="note"><span>{c.f.note}</span><textarea rows={3} placeholder={c.f.notePh} value={b.note} onChange={(e) => b.setNote(e.target.value)} /></label>
          </div>
        )}

        <div className="sheet-ft">
          {s > 0 && <button type="button" className="b-line" onClick={() => setS(s - 1)}><ArrowLeft size={18} /> {c.f.back}</button>}
          {s < 2
            ? <button type="submit" className="b-sogan grow" disabled={!canNext}>{c.f.next} <ArrowRight size={18} /></button>
            : <button type="submit" className="b-wa grow"><WaIcon size={20} /> {c.f.send}</button>}
        </div>
      </form>
    </div>
  );
}
