import { useCallback, useEffect, useRef, useState } from 'react';
import { useLang } from '../../context/LanguageContext';
import { shouldShowIntro } from './intro';
import './preloader.scss';

const TYPING = 2000;
const HOLD = 240;
const EXIT = 680;
const NEWLINE_COST = 5;

const CODE_LINES = [
  [
    ['import', 'k'],
    [' { createApp } ', 'p'],
    ['from', 'k'],
    [' ', 'p'],
    ["'./core'", 's'],
  ],
  [],
  [
    ['const', 'k'],
    [' dev', 'v'],
    [' = ', 'p'],
    ['{', 'p'],
  ],
  [
    ['  name', 'prop'],
    [': ', 'p'],
    ["'Marcos Martin'", 's'],
    [',', 'p'],
  ],
  [
    ['  role', 'prop'],
    [': ', 'p'],
    ["'Full Stack Dev'", 's'],
    [',', 'p'],
  ],
  [
    ['  stack', 'prop'],
    [': ', 'p'],
    ['[', 'p'],
    ["'React'", 's'],
    [', ', 'p'],
    ["'Node'", 's'],
    [', ', 'p'],
    ["'SQL'", 's'],
    [']', 'p'],
    [',', 'p'],
  ],
  [['}', 'p']],
  [],
  [
    ['const', 'k'],
    [' app', 'v'],
    [' = ', 'p'],
    ['createApp', 'fn'],
    ['(dev)', 'p'],
  ],
  [
    ['await', 'k'],
    [' app.', 'v'],
    ['listen', 'fn'],
    ['(', 'p'],
    ['2026', 'n'],
    [')', 'p'],
  ],
];

const LINES = [];
const UNITS = [];
const META = [];
let unit = 0;
let index = 0;

CODE_LINES.forEach((tokens, lineIndex) => {
  const chars = [];
  let col = 0;

  tokens.forEach(([text, cls]) => {
    for (const ch of text) {
      chars.push({ ch, cls, index });
      UNITS.push(unit);
      META.push({ line: lineIndex, col });
      unit += 1;
      index += 1;
      col += 1;
    }
  });

  LINES.push(chars);

  if (lineIndex < CODE_LINES.length - 1) unit += NEWLINE_COST;
});

const TOTAL_UNITS = Math.max(1, unit);

const GLYPHS = [
  { t: '</>', x: '7%', y: '16%', dx: '18px', dy: '-22px', rot: '-8deg', dur: '9s', delay: '0s', o: 0.17 },
  { t: 'const', x: '86%', y: '12%', dx: '-14px', dy: '20px', rot: '5deg', dur: '11s', delay: '-2s', o: 0.13 },
  { t: '{ }', x: '14%', y: '78%', dx: '22px', dy: '-14px', rot: '10deg', dur: '10s', delay: '-4s', o: 0.15 },
  { t: '=>', x: '79%', y: '82%', dx: '-20px', dy: '-18px', rot: '-6deg', dur: '8s', delay: '-1s', o: 0.16 },
  { t: 'async', x: '3%', y: '46%', dx: '16px', dy: '18px', rot: '4deg', dur: '12s', delay: '-6s', o: 0.11 },
  { t: '[ ]', x: '93%', y: '52%', dx: '-22px', dy: '-12px', rot: '-9deg', dur: '10s', delay: '-3s', o: 0.14 },
  { t: 'npm run', x: '22%', y: '9%', dx: '12px', dy: '22px', rot: '6deg', dur: '13s', delay: '-5s', o: 0.1 },
  { t: 'git', x: '68%', y: '91%', dx: '18px', dy: '-20px', rot: '-4deg', dur: '9s', delay: '-7s', o: 0.12 },
  { t: '</div>', x: '88%', y: '70%', dx: '-16px', dy: '16px', rot: '7deg', dur: '11s', delay: '-2.5s', o: 0.1 },
  { t: '&&', x: '5%', y: '64%', dx: '20px', dy: '-16px', rot: '-5deg', dur: '8.5s', delay: '-4.5s', o: 0.13 },
];

const Preloader = ({ onDone }) => {
  const { t } = useLang();
  const [visible, setVisible] = useState(() => shouldShowIntro());
  const [leaving, setLeaving] = useState(false);
  const [done, setDone] = useState(false);
  const rootRef = useRef(null);
  const innerRef = useRef(null);
  const viewportRef = useRef(null);
  const caretRef = useRef(null);
  const barRef = useRef(null);
  const pctRef = useRef(null);
  const posRef = useRef(null);
  const charsRef = useRef([]);
  const lineElsRef = useRef([]);
  const leavingRef = useRef(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    if (!visible) return undefined;
    document.body.classList.add('isIntro');
    return () => document.body.classList.remove('isIntro');
  }, [visible]);

  const finish = useCallback(() => {
    if (leavingRef.current) return;
    leavingRef.current = true;
    setLeaving(true);
    onDoneRef.current?.();
    window.setTimeout(() => setVisible(false), EXIT + 90);
  }, []);

  useEffect(() => {
    if (!visible) return undefined;

    const chars = charsRef.current;
    const lineEls = lineElsRef.current;
    const caret = caretRef.current;
    const inner = innerRef.current;
    const viewport = viewportRef.current;

    let frame;
    let holdTimer;
    let revealed = 0;
    let lastLine = -1;
    const start = performance.now();

    const paintProgress = (units) => {
      const ratio = Math.min(1, units / TOTAL_UNITS);
      if (barRef.current) barRef.current.style.transform = `scaleX(${ratio})`;
      if (pctRef.current) pctRef.current.textContent = `${Math.round(ratio * 100)}%`;
    };

    const paintCaret = () => {
      const last = chars[revealed - 1];
      if (!last || !caret) return;

      const x = last.offsetLeft + last.offsetWidth;
      const y = last.offsetTop;

      caret.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      caret.classList.add('isOn');

      if (inner && viewport) {
        const lineHeight = last.offsetHeight || 22;
        const limit = viewport.clientHeight - 34;
        const overflow = y + lineHeight - limit;
        inner.style.transform = `translateY(${overflow > 0 ? -Math.round(overflow) : 0}px)`;
      }

      const meta = META[revealed - 1];
      if (meta && meta.line !== lastLine) {
        lastLine = meta.line;
        lineEls.forEach((el, lineIndex) => {
          if (!el) return;
          el.classList.toggle('isActive', lineIndex === meta.line);
          el.classList.toggle('isDone', lineIndex < meta.line);
        });
      }

      if (meta && posRef.current) {
        posRef.current.textContent = `Ln ${meta.line + 1} : Col ${meta.col + 1}`;
      }
    };

    const revealTo = (target) => {
      while (revealed < target) {
        chars[revealed]?.classList.add('isIn');
        revealed += 1;
      }
    };

    const tick = (now) => {
      if (leavingRef.current) return;

      const progress = Math.min(1, (now - start) / TYPING);
      const units = progress * TOTAL_UNITS;

      let target = revealed;
      while (target < UNITS.length && UNITS[target] <= units) target += 1;

      revealTo(target);
      paintCaret();
      paintProgress(units);

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        revealTo(chars.length);
        lineEls.forEach((el) => {
          if (!el) return;
          el.classList.add('isDone');
          el.classList.remove('isActive');
        });
        setDone(true);
        holdTimer = window.setTimeout(finish, HOLD);
      }
    };

    frame = requestAnimationFrame(tick);

    const onKeyDown = (event) => {
      if (event.key === 'Escape') finish();
    };

    const onPointerMove = (event) => {
      if (!rootRef.current) return;
      const x = (event.clientX / window.innerWidth - 0.5) * 18;
      const y = (event.clientY / window.innerHeight - 0.5) * 14;
      rootRef.current.style.setProperty('--mx', `${x}px`);
      rootRef.current.style.setProperty('--my', `${y}px`);
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('pointermove', onPointerMove);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(holdTimer);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, [visible, finish]);

  if (!visible) return null;

  return (
    <div
      ref={rootRef}
      className={`preloader ${leaving ? 'isLeaving' : ''} ${done ? 'isDone' : ''}`}
      onPointerDown={finish}
      aria-hidden={leaving ? 'true' : undefined}
    >
      <div className="plGlyphs" aria-hidden="true">
        {GLYPHS.map((glyph) => (
          <span
            key={glyph.t + glyph.x}
            className="plGlyph"
            style={{
              left: glyph.x,
              top: glyph.y,
              '--dx': glyph.dx,
              '--dy': glyph.dy,
              '--rot': glyph.rot,
              '--dur': glyph.dur,
              '--delay': glyph.delay,
              '--o': glyph.o,
            }}
          >
            {glyph.t}
          </span>
        ))}
      </div>

      <div className="plInner">
        <div className="plTop">
          <span className="plBrand">
            marcos<span>.martin</span>
          </span>
          <span className="plPhase">portfolio / 2026</span>
        </div>

        <div className="plWindow">
          <div className="plWinBar">
            <span className="plDots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="plTabs">
              <span className="plTab isOn">main.jsx</span>
              <span className="plTab">profile.ts</span>
            </span>
            <span className="plEncoding">UTF-8</span>
          </div>

          <div className="plViewport" ref={viewportRef} aria-hidden="true">
            <div className="plCode" ref={innerRef}>
              {LINES.map((line, lineIndex) => (
                <div
                  className="plLine"
                  key={lineIndex}
                  ref={(el) => {
                    lineElsRef.current[lineIndex] = el;
                  }}
                >
                  <span className="plNum">{String(lineIndex + 1).padStart(2, '0')}</span>
                  <span className="plText">
                    {line.map((char) => (
                      <span
                        className={`plChar tok-${char.cls}`}
                        key={char.index}
                        ref={(el) => {
                          charsRef.current[char.index] = el;
                        }}
                      >
                        {char.ch}
                      </span>
                    ))}
                  </span>
                </div>
              ))}
              <span className="plCaret" ref={caretRef} />
            </div>
            <span className="plScan" aria-hidden="true" />
          </div>

          <div className="plWinFoot">
            <span>main</span>
            <span className="plPos" ref={posRef}>
              Ln 1 : Col 1
            </span>
            <span>node 20</span>
          </div>
        </div>

        <div className="plFoot">
          <div className="plStatus">
            <span role="status">{done ? t.preloader.done : t.preloader.loading}</span>
            <span className="plPct" ref={pctRef} aria-hidden="true">
              0%
            </span>
          </div>

          <div className="plBar" aria-hidden="true">
            <span ref={barRef} />
          </div>

          <button className="plSkip" type="button" onClick={finish}>
            {t.preloader.skip}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
