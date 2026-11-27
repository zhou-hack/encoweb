import { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  AudioLines,
  CalendarDays,
  Check,
  ClipboardList,
  Image as ImageIcon,
  LayoutGrid,
  Maximize2,
  Mic,
  PackageOpen,
  Play,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';
import '@fontsource-variable/inter';
import './styles.css';
import wordmark from './assets/enco-wordmark.svg';
import encoIcon from './assets/enco-icon.png';
import campusBoard from './assets/campus-board.webp';
import scheduleResult from './assets/schedule-result.webp';
import courseTable from './assets/course-table.webp';
import voiceResult from './assets/voice-result.webp';
import filmPoster from './assets/demo-poster.webp';
import courseScreen from './assets/course-screen.webp';
import voiceScreen from './assets/voice-screen.webp';

const FILM_URL = `${import.meta.env.BASE_URL}media/enco-film.mp4`;

const chapters = [
  { time: 0, label: '校园的一天' },
  { time: 22, label: '说一句，就记好' },
  { time: 43, label: '截图导入课表' },
  { time: 69, label: '让它真正去做' },
];

const interfaceDetails = {
  board: {
    title: '你的今天，一眼看清。',
    subtitle: '校园看板',
    image: campusBoard,
    description: '下一节课、日程、快递和待办，被整理成不同颜色的卡片。重要的信息留在首页，不必在多个应用之间来回寻找。',
    caption: 'enco 真实产品界面',
  },
  voice: {
    title: '一句话，记好两件事。',
    subtitle: '自然语言交互',
    image: voiceResult,
    description: '说出组会时间与报告截止时间，enco 理解其中的两件事，分别保存到日程和待办。保存结果清楚可见，也可以撤销。',
    caption: '真实识别与保存结果',
  },
  course: {
    title: '一张截图，一周课表就位。',
    subtitle: 'AI 课表',
    image: courseScreen,
    description: '上传课表截图，识别课程、时间与地点。核对候选课程后保存，完整的每周课表就整理好了。',
    caption: '真实课表导入结果',
  },
  voiceScreen: {
    title: '每一个安排，都有回应。',
    subtitle: '语音记录',
    image: voiceScreen,
    description: '说出组会时间与报告截止时间，enco 理解其中的两件事，分别保存到日程和待办。保存结果清楚可见，也可以撤销。',
    caption: '真实语音与保存结果',
  },
};

function Brand({ className = '' }) {
  return <img className={`brand ${className}`} src={wordmark} alt="enco" />;
}

function Header({ onWatch }) {
  return (
    <header className="site-header" id="top">
      <div className="header-inner">
        <a href="#top" className="brand-link" aria-label="enco 首页">
          <Brand />
        </a>
        <nav className="main-nav" aria-label="主导航">
          <a href="#features">发现功能</a>
          <a href="#try">试试指令</a>
          <a href="#screens">真机界面</a>
          <a href="#film">产品影片</a>
        </nav>
        <button className="button button-dark header-watch" onClick={() => onWatch(0)}>
          <Play size={15} fill="currentColor" />
          观看影片
        </button>
      </div>
    </header>
  );
}

function Hero({ onWatch }) {
  const [taskDone, setTaskDone] = useState(false);

  function moveLayers(event) {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const scene = event.currentTarget;
    const bounds = scene.getBoundingClientRect();
    scene.style.setProperty('--pointer-x', ((event.clientX - bounds.left) / bounds.width - .5) * 2);
    scene.style.setProperty('--pointer-y', ((event.clientY - bounds.top) / bounds.height - .5) * 2);
  }

  function resetLayers(event) {
    event.currentTarget.style.setProperty('--pointer-x', 0);
    event.currentTarget.style.setProperty('--pointer-y', 0);
  }

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="hero-kicker entrance entrance-one">
          <Sparkles size={16} />
          你的校园生活 AI Agent
        </p>
        <h1 id="hero-title" className="hero-title hero-title-chinese" aria-label="说一句，校园生活就位。">
          <span className="title-line">
            <span className="reveal-word word-one">说一句，</span>
          </span>
          <span className="title-line">
            <span className="reveal-word word-two">校园生活就位。</span>
          </span>
        </h1>
        <p className="hero-translation entrance entrance-two">
          Say it. <span className="english-tagline">See it happen.</span>
        </p>
        <p className="hero-description entrance entrance-three">
          课程、日程、待办与快递，交给懂校园的 enco。
          <br />
          说一句，看改变发生。
        </p>
        <div className="hero-actions entrance entrance-four">
          <a className="button button-dark button-large" href="#features">
            探索校园看板
            <ArrowDown size={18} />
          </a>
          <button className="film-link" onClick={() => onWatch(0)}>
            <span className="play-ring"><Play size={14} fill="currentColor" /></span>
            观看 2:21 影片
          </button>
        </div>
        <p className="hero-footnote entrance entrance-four">真实界面，真实校园，自然交互。</p>
      </div>

      <div className="hero-scene entrance-scene" aria-label="由日程、快递、待办卡片围绕的 enco 校园看板" onPointerMove={moveLayers} onPointerLeave={resetLayers}>
        <div className="scene-backdrop" />
        <svg className="scene-connector" viewBox="0 0 600 590" fill="none" aria-hidden="true">
          <path d="M90 471C42 400 55 215 165 145C287 67 438 116 485 231C511 295 490 367 438 421" stroke="currentColor" strokeWidth="1.4" strokeDasharray="4 7" />
          <circle cx="90" cy="471" r="4" fill="currentColor" />
          <circle cx="438" cy="421" r="4" fill="currentColor" />
        </svg>
        <div className="phone">
          <img src={campusBoard} alt="enco 校园看板：下一节体育课、AI 开发结果汇报、两件快递和打卡待办" />
        </div>

        <button className="float-card schedule-card" onClick={() => onWatch(13)} aria-label="观看智能日程片段">
          <span className="float-card-label"><CalendarDays size={17} />日程</span>
          <strong>11月24日 14:30</strong>
          <span className="schedule-name">AI 开发结果汇报</span>
          <span className="schedule-place">F502 <ArrowUpRight size={14} /></span>
        </button>

        <button className="float-card parcel-card" onClick={() => onWatch(22)} aria-label="观看快递查询片段">
          <span className="float-card-label"><PackageOpen size={17} />我的快递</span>
          <span className="parcel-station">东门驿站</span>
          <span className="parcel-label">取件码</span>
          <strong>200-1-2836</strong>
        </button>

        <button
          className={`float-card todo-card ${taskDone ? 'is-done' : ''}`}
          onClick={() => setTaskDone((done) => !done)}
          aria-pressed={taskDone}
          aria-label={taskDone ? '将交实验报告标为未完成' : '将交实验报告标为已完成'}
        >
          <span className="float-card-label">今日待办</span>
          <span className="todo-row">
            <span className="todo-check">{taskDone && <Check size={15} strokeWidth={2.5} />}</span>
            <strong>交实验报告</strong>
          </span>
          <span className="todo-status">{taskDone ? '已完成，干得漂亮' : '今天 18:00 截止'}</span>
        </button>

        <div className="voice-note">
          <AudioLines size={22} />
          <span>“我还有什么快递没取？”</span>
          <span className="voice-dot" />
        </div>
        <img className="scene-pixel" src={encoIcon} alt="" />
      </div>
    </section>
  );
}

function InterfaceDialog({ detail, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="interface-dialog"
      aria-labelledby="dialog-title"
      onCancel={onClose}
      onClick={(event) => event.target === event.currentTarget && onClose()}
    >
      <div className="dialog-panel">
        <button className="icon-button dialog-close" onClick={onClose} aria-label="关闭界面详情" autoFocus>
          <X size={22} />
        </button>
        <div className="dialog-copy">
          <span className="card-label">{detail.subtitle}</span>
          <h2 id="dialog-title">{detail.title}</h2>
          <p>{detail.description}</p>
          <span className="dialog-caption"><span className="status-dot" />{detail.caption}</span>
        </div>
        <div className="dialog-screen">
          <img src={detail.image} alt={detail.title} />
        </div>
      </div>
    </dialog>
  );
}

function VoiceDemo({ onDetail }) {
  const [state, setState] = useState('idle');
  const timerRef = useRef(null);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  function runDemo() {
    window.clearTimeout(timerRef.current);
    setState('listening');
    timerRef.current = window.setTimeout(() => setState('saved'), 1000);
  }

  return (
    <article className="feature-card voice-card" data-reveal>
      <div className="feature-card-top">
        <span className="card-label"><Mic size={17} />自然语言</span>
        <AudioLines className={state === 'listening' ? 'is-listening' : ''} size={23} />
      </div>
      <h3>一句话，<br />记好两件事。</h3>
      <p className="voice-prompt">“明天下午两点开组会，<br />晚上六点前交实验报告。”</p>
      <div className={`voice-result ${state === 'saved' ? 'is-saved' : ''}`} aria-live="polite">
        {state === 'listening' ? (
          <span className="listening-state"><span className="waveform"><i /><i /><i /><i /><i /></span>正在理解你的安排…</span>
        ) : state === 'saved' ? (
          <>
            <span><CalendarDays size={15} />组会 <Check size={14} /></span>
            <span><Check size={15} />交实验报告 <Check size={14} /></span>
          </>
        ) : (
          <button className="demo-button" onClick={runDemo}>
            看看 enco 怎么记 <ArrowRight size={16} />
          </button>
        )}
        {state === 'saved' && (
          <button className="replay-button" onClick={runDemo} aria-label="重新演示语音保存">
            <RotateCcw size={14} />
          </button>
        )}
      </div>
      <button className="text-link voice-detail" onClick={onDetail}>查看真实结果 <ArrowUpRight size={15} /></button>
    </article>
  );
}

function Features({ onDetail, onWatch }) {
  return (
    <section className="features-section" id="features" aria-labelledby="features-title">
      <div className="section-heading" data-reveal>
        <h2 id="features-title">信息很满，<br />生活不乱。</h2>
        <p>把零散的校园事务，收进一张张看得懂的卡片。<br />每一件事，都有自己的位置。</p>
      </div>

      <div className="feature-grid">
        <article className="feature-card board-card" data-reveal>
          <div className="board-copy">
            <span className="card-label"><CalendarDays size={17} />校园看板</span>
            <h3>你的今天，<br />一眼看清。</h3>
            <p>不必寻找，重要的事就在眼前。</p>
          </div>
          <div className="board-note">
            <span>11 月 24 日 · 星期二</span>
            <span className="next-class-label">下一节课</span>
            <strong>10:10</strong>
            <span>体育（一）</span>
            <span className="class-place">田径场（本部教学楼）</span>
          </div>
          <div className="board-phone">
            <img src={campusBoard} alt="校园看板真实界面" loading="lazy" />
          </div>
          <button className="text-link board-detail" onClick={() => onDetail('board')}>
            展开校园看板 <ArrowUpRight size={16} />
          </button>
        </article>

        <VoiceDemo onDetail={() => onDetail('voice')} />

        <article className="feature-card parcel-feature" data-reveal style={{ '--reveal-delay': '90ms' }}>
          <div className="parcel-feature-copy">
            <span className="card-label"><PackageOpen size={17} />我的快递</span>
            <h3>取件这件事，<br />开口就有答案。</h3>
            <button className="text-link" onClick={() => onWatch(22)}>
              观看快递查询 <ArrowUpRight size={15} />
            </button>
          </div>
          <div className="parcel-ticket" aria-hidden="true">
            <PackageOpen size={26} strokeWidth={1.5} />
            <span>东门驿站</span>
            <strong>200-1-2836</strong>
            <span className="ticket-caption">你的取件码</span>
          </div>
        </article>

        <article className="feature-card timetable-card" data-reveal>
          <span className="card-label"><ImageIcon size={17} />AI 课表</span>
          <h3>一张截图，<br />一周课表就位。</h3>
          <p>识别课程信息，核对后保存。<br />少一次输入，多一份从容。</p>
          <button className="text-link" onClick={() => onWatch(43)}>
            查看导入过程 <ArrowUpRight size={15} />
          </button>
          <div className="timetable-screen">
            <img src={courseTable} alt="AI 识别后导入的七天课表" loading="lazy" />
          </div>
        </article>

        <article className="feature-card agent-card" data-reveal style={{ '--reveal-delay': '90ms' }}>
          <div className="agent-copy">
            <span className="card-label"><Sparkles size={17} />手机控制</span>
            <h3>从理解，<br />到真正去做。</h3>
            <p>获得授权后，跨应用完成你的任务。<br />每一步都看得见，重要操作由你把关。</p>
            <button className="button button-light" onClick={() => onWatch(69)}>
              观看真实执行 <ArrowUpRight size={16} />
            </button>
          </div>
          <div className="draft-card">
            <div className="draft-heading">
              <img src={encoIcon} alt="" />
              <div><strong>校园生活助手</strong><span>enco 已准备好执行</span></div>
              <span className="draft-dot" />
            </div>
            <div className="draft-message">打开微信，<br />发送我的当前位置。</div>
            <span className="draft-control"><ShieldCheck size={15} />每一步都看得见</span>
          </div>
        </article>
      </div>
    </section>
  );
}

function ScrollStory() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const phoneRef = useRef(null);
  const cardRefs = useRef([]);
  const connectorRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motion.matches) return;

    function update() {
      frameRef.current = null;
      const section = sectionRef.current;
      const stage = stageRef.current;
      const phone = phoneRef.current;
      if (!section || !stage || !phone) return;
      const travel = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = Math.max(0, Math.min(1, -section.getBoundingClientRect().top / travel));
      const phase = progress < .5 ? progress * 2 : (1 - progress) * 2;
      const eased = phase * phase * (3 - 2 * phase);
      const stageBounds = stage.getBoundingClientRect();
      const phoneBounds = phone.getBoundingClientRect();
      const scale = window.innerWidth < 650 ? .58 : 1;
      const phoneScale = 1 - eased * .11;
      const phoneX = (stageBounds.width * .65 - (phoneBounds.left - stageBounds.left + phoneBounds.width / 2)) * eased;
      phone.style.translate = `${phoneX}px 0`;
      phone.style.scale = phoneScale;
      stage.style.setProperty('--story-progress', eased);
      connectorRef.current.style.opacity = eased * .7;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const bounds = card.getBoundingClientRect();
        const x = phoneBounds.left + phoneBounds.width / 2 - (bounds.left + bounds.width / 2);
        const y = phoneBounds.top + phoneBounds.height * (.28 + index * .13) - (bounds.top + bounds.height / 2);
        card.style.translate = `${x * eased}px ${y * eased}px`;
        card.style.rotate = `${(1 - eased) * (index % 2 ? 7 : -7)}deg`;
        card.style.scale = 1 - eased * .65;
      });
    }

    function requestUpdate() {
      if (frameRef.current === null) frameRef.current = window.requestAnimationFrame(update);
    }

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <section className="scroll-story" ref={sectionRef} aria-labelledby="story-title">
      <div className="story-sticky">
        <div className="story-copy">
          <span className="story-label"><LayoutGrid size={17} />一个看板，装下今天</span>
          <h2 id="story-title">零散的事，<br />各就各位。</h2>
          <p>不必记住每一件事。<br />让 enco 把它们放在合适的位置。</p>
          <span className="story-scroll-hint"><ArrowDown size={15} />继续滚动，看看板成形</span>
        </div>
        <div className="story-stage" ref={stageRef}>
          <div className="story-orbit" />
          <div className="story-phone" ref={phoneRef}>
            <img src={campusBoard} alt="课程、日程、快递和待办归位后的校园看板" loading="lazy" />
          </div>
          <div className="story-card story-card-class" ref={(node) => { cardRefs.current[0] = node; }}>
            <CalendarDays size={19} /><span><small>下一节课</small><strong>体育（一）</strong><span>10:10 · 田径场</span></span>
          </div>
          <div className="story-card story-card-schedule" ref={(node) => { cardRefs.current[1] = node; }}>
            <CalendarDays size={19} /><span><small>日程</small><strong>AI 开发结果汇报</strong><span>14:30 · F502</span></span>
          </div>
          <div className="story-card story-card-parcel" ref={(node) => { cardRefs.current[2] = node; }}>
            <PackageOpen size={19} /><span><small>快递</small><strong>东门驿站</strong><span>200-1-2836</span></span>
          </div>
          <div className="story-card story-card-todo" ref={(node) => { cardRefs.current[3] = node; }}>
            <Check size={19} /><span><small>待办</small><strong>交实验报告</strong><span>18:00 截止</span></span>
          </div>
          <svg className="story-connector" ref={connectorRef} viewBox="0 0 400 440" fill="none" aria-hidden="true">
            <path d="M10 32C144 27 83 204 218 202M5 180H161M16 374C121 366 91 249 218 244M22 259C106 256 128 303 221 290" stroke="currentColor" strokeWidth="1.3" strokeDasharray="4 6" />
          </svg>
          <span className="story-result"><Check size={16} />今天，已经安排好。</span>
        </div>
      </div>
    </section>
  );
}

const demoExamples = [
  {
    label: '查明天的课', icon: CalendarDays, prompt: '明天第 3、4 节在哪儿上？',
    reply: '明天 10:10 上体育（一），在田径场。',
    records: [{ icon: CalendarDays, tone: 'blue', title: '体育（一）', detail: '10:10–11:45 · 田径场（本部教学楼）' }],
  },
  {
    label: '安排两件事', icon: ClipboardList, prompt: '明天下午两点开组会，晚上六点前交实验报告。',
    reply: '已保存 2 项看板改动，一件事也不会漏。',
    records: [
      { icon: CalendarDays, tone: 'apricot', title: '组会', detail: '明天 14:00 · 日程' },
      { icon: ClipboardList, tone: 'mint', title: '交实验报告', detail: '明天 18:00 · 待办' },
    ],
  },
  {
    label: '查我的快递', icon: PackageOpen, prompt: '我还有什么快递没取？',
    reply: '看板里有一件待取快递，这是你之前保存的取件信息。',
    records: [{ icon: PackageOpen, tone: 'purple', title: '东门驿站', detail: '取件码 200-1-2836' }],
  },
];

function CommandDemo() {
  const [selected, setSelected] = useState(0);
  const [phase, setPhase] = useState('done');
  const timerRef = useRef(null);
  const example = demoExamples[selected];

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  function selectExample(index) {
    window.clearTimeout(timerRef.current);
    setSelected(index);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('done');
      return;
    }
    setPhase('thinking');
    timerRef.current = window.setTimeout(() => setPhase('done'), 650);
  }

  return (
    <section className="command-section" id="try" aria-labelledby="try-title">
      <div className="command-copy" data-reveal>
        <h2 id="try-title">试着说一句。</h2>
        <p>不用学习指令，像平时说话一样。<br />选一句，看看 enco 怎么回应。</p>
        <div className="command-options" role="group" aria-label="选择预设演示指令">
          {demoExamples.map(({ label, icon: Icon }, index) => (
            <button key={label} aria-pressed={selected === index} onClick={() => selectExample(index)}>
              <Icon size={17} />{label}<ArrowRight size={14} />
            </button>
          ))}
        </div>
      </div>
      <div className="command-window" data-reveal>
        <div className="command-window-top">
          <span><img src={encoIcon} alt="" />和 enco 说一句</span><span>预设演示</span>
        </div>
        <div className="command-body" aria-live="polite" aria-busy={phase === 'thinking'}>
          <div className="command-bubble" key={`prompt-${selected}`}>{example.prompt}</div>
          {phase === 'thinking' ? (
            <div className="command-thinking"><span className="waveform"><i /><i /><i /><i /><i /></span>正在理解…</div>
          ) : (
            <div className="command-response" key={`response-${selected}`}>
              <p>{example.reply}</p>
              {example.records.map(({ icon: Icon, title, detail, tone }, index) => (
                <div className={`command-record record-${tone}`} key={title} style={{ '--record-order': index }}>
                  <Icon size={20} /><span><strong>{title}</strong><small>{detail}</small></span><Check size={16} />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="command-input"><Mic size={18} /><span>告诉 enco 你想做什么…</span><AudioLines size={19} /></div>
      </div>
    </section>
  );
}

const screenItems = [
  { id: 'board', label: '校园看板', caption: '今天的事，都在这里。', image: campusBoard, tone: 'mint' },
  { id: 'course', label: 'AI 课表', caption: '从截图，到一周安排。', image: courseScreen, tone: 'blue' },
  { id: 'voice', label: '语音记录', caption: '一句话，留下清晰结果。', image: voiceScreen, tone: 'apricot' },
];

function ScreenGallery({ onDetail }) {
  return (
    <section className="screens-section" id="screens" aria-labelledby="screens-title">
      <div className="screens-heading" data-reveal>
        <h2 id="screens-title">不是效果图。<br />是 enco 真实的样子。</h2>
        <p>每一张卡片背后，<br />都是看得见、能核对的结果。</p>
      </div>
      <div className="screens-grid">
        {screenItems.map(({ id, label, caption, image, tone }, index) => (
          <button className={`screen-card screen-${tone}`} key={id} data-reveal style={{ '--reveal-delay': `${index * 90}ms` }} onClick={() => onDetail(id)} aria-label={`展开${label}真实界面`}>
            <span className="screen-card-heading"><span>{label}</span><Maximize2 size={16} /></span>
            <span className="screen-card-phone"><img src={image} alt="" loading="lazy" /></span>
            <span className="screen-card-caption">{caption}<ArrowUpRight size={15} /></span>
          </button>
        ))}
      </div>
    </section>
  );
}

function AgentStory() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    { title: '说出任务', description: '打开微信，发送我的当前位置。', icon: Mic },
    { title: '授权执行', description: '确认任务范围，允许 enco 操作手机。', icon: ShieldCheck },
    { title: '看见过程', description: '跨应用执行，每一步都能查看。', icon: Sparkles },
  ];

  return (
    <section className="agent-story" aria-labelledby="agent-story-title">
      <div className="agent-story-copy">
        <span className="story-label"><Sparkles size={16} />从一句话，到一次行动</span>
        <h2 id="agent-story-title">不止理解。<br />还真的去做。</h2>
        <div className="agent-step-buttons" role="group" aria-label="查看 Agent 执行步骤">
          {steps.map(({ title, description, icon: Icon }, index) => (
            <button key={title} className={activeStep === index ? 'is-active' : ''} onClick={() => setActiveStep(index)} aria-pressed={activeStep === index}>
              <span className="agent-step-icon"><Icon size={19} /></span>
              <span><strong>{title}</strong><small>{description}</small></span><ArrowRight size={17} />
            </button>
          ))}
        </div>
      </div>
      <div className={`agent-execution agent-phase-${activeStep}`}>
        <div className="agent-path" aria-hidden="true" />
        <div className="agent-pixel-logo"><img src={encoIcon} alt="" /></div>
        <div className="agent-task-card" key={activeStep}>
          <span className="agent-task-status"><span />{activeStep === 0 ? '收到你的任务' : activeStep === 1 ? '等待你的授权' : '任务正在执行'}</span>
          <h3>{steps[activeStep].title}</h3>
          <p>{activeStep === 0 ? '“打开微信，发送我的当前位置。”' : activeStep === 1 ? '本次操作需要你的允许。\n你可以随时停止任务。' : '打开微信 → 选择联系人\n获取位置 → 准备消息'}</p>
          <div className="agent-progress" aria-hidden="true"><i /><i /><i /></div>
        </div>
        <span className="agent-privacy"><ShieldCheck size={16} />重要操作，由你把关</span>
      </div>
    </section>
  );
}

function Film({ videoRef, onReady, onWatch, hasStarted, setHasStarted }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const [error, setError] = useState('');

  function handleTimeUpdate(event) {
    const time = event.currentTarget.currentTime;
    let current = 0;
    chapters.forEach((chapter, index) => {
      if (time >= chapter.time) current = index;
    });
    setActiveChapter(current);
  }

  return (
    <section className="film-section" id="film" aria-labelledby="film-title">
      <div className="film-heading" data-reveal>
        <h2 id="film-title">一句话之后，<br />看看发生了什么。</h2>
        <p>真实界面，真实校园。<br />和每一个恰好的回应。</p>
      </div>
      <div className="film-player">
        <video
          ref={videoRef}
          src={FILM_URL}
          poster={filmPoster}
          controls
          playsInline
          preload="metadata"
          aria-label="enco 产品宣传片，时长 2 分 21 秒"
          onLoadedMetadata={onReady}
          onPlay={() => { setIsPlaying(true); setHasStarted(true); setError(''); }}
          onPlaying={() => setHasStarted(true)}
          onPause={() => setIsPlaying(false)}
          onSeeking={() => setHasStarted(true)}
          onEnded={() => { setIsPlaying(false); setHasStarted(false); }}
          onTimeUpdate={handleTimeUpdate}
          onError={() => setError('影片暂时无法加载，请刷新页面后重试。')}
        />
        {!hasStarted && (
          <div className="film-cover">
            <span className="film-cover-top"><span>enco / 产品影片</span><span>02:21</span></span>
            <button className="film-play" onClick={() => onWatch(0)} aria-label="播放 enco 完整产品影片">
              <Play size={28} fill="currentColor" />
            </button>
            <span className="film-cover-title">Campus life, in sync.</span>
          </div>
        )}
      </div>
      {error && <p className="film-error" role="alert">{error}</p>}
      <div className="chapter-navigation" aria-label="按片段观看">
        <span className="chapter-label">选一个片段</span>
        <div className="chapter-buttons">
          {chapters.map((chapter, index) => (
            <button
              key={chapter.time}
              className={activeChapter === index ? 'is-active' : ''}
              onClick={() => onWatch(chapter.time)}
              aria-pressed={activeChapter === index}
            >
              <span>{String(Math.floor(chapter.time / 60)).padStart(2, '0')}:{String(chapter.time % 60).padStart(2, '0')}</span>
              {chapter.label}
            </button>
          ))}
        </div>
        <span className="film-state">{isPlaying ? '正在播放' : '完整影片 · 02:21'}</span>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer" id="about">
      <div className="footer-top">
        <span className="footer-note">把琐碎交给 enco，把时间留给自己。</span>
        <a href="#top" className="back-to-top">回到顶部 <ArrowUpRight size={17} /></a>
      </div>
      <h2>让校园生活井井有条，<br />把大学时光还给你。</h2>
      <div className="footer-bottom">
        <Brand />
        <p>Say it. See it happen.</p>
        <span>为校园生活而生</span>
      </div>
    </footer>
  );
}

export function App() {
  const [detailKey, setDetailKey] = useState(null);
  const [hasStarted, setHasStarted] = useState(false);
  const videoRef = useRef(null);
  const pendingSeekRef = useRef(null);
  const mainRef = useRef(null);

  useEffect(() => {
    const main = mainRef.current;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motion.matches || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) {
          target.classList.add('is-revealed');
          observer.unobserve(target);
        }
      });
    }, { threshold: .13 });
    main.querySelectorAll('[data-reveal]').forEach((target) => observer.observe(target));
    main.dataset.revealReady = '';
    return () => {
      observer.disconnect();
      delete main.dataset.revealReady;
    };
  }, []);

  function seekVideo() {
    const video = videoRef.current;
    if (pendingSeekRef.current !== null && video.readyState >= 1) {
      video.currentTime = Math.min(pendingSeekRef.current, video.duration || pendingSeekRef.current);
      pendingSeekRef.current = null;
    }
  }

  function watchFilm(time = 0) {
    const video = videoRef.current;
    pendingSeekRef.current = time;
    document.getElementById('film').scrollIntoView({ behavior: 'smooth', block: 'start' });
    seekVideo();
    video.play().catch(() => {
      // Native controls remain available if the browser blocks playback.
    });
  }

  return (
    <>
      <a href="#main" className="skip-link">跳至主要内容</a>
      <Header onWatch={watchFilm} />
      <main id="main" ref={mainRef}>
        <Hero onWatch={watchFilm} />
        <ScrollStory />
        <Features onDetail={setDetailKey} onWatch={watchFilm} />
        <CommandDemo />
        <ScreenGallery onDetail={setDetailKey} />
        <AgentStory />
        <Film
          videoRef={videoRef}
          onReady={seekVideo}
          onWatch={watchFilm}
          hasStarted={hasStarted}
          setHasStarted={setHasStarted}
        />
      </main>
      <Footer />
      {detailKey && <InterfaceDialog detail={interfaceDetails[detailKey]} onClose={() => setDetailKey(null)} />}
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
