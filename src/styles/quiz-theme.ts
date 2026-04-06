export const QUIZ_CSS = `
  :root,[data-theme="light"]{
    --bg:#F2F2F7;--surface:#FFF;--raised:#FFF;
    --fill:rgba(116,116,128,0.08);--fill2:rgba(118,118,128,0.12);--fill3:rgba(120,120,128,0.16);
    --sep:rgba(60,60,67,0.18);--sep2:rgba(60,60,67,0.29);
    --t1:#000;--t2:rgba(60,60,67,0.6);--t3:rgba(60,60,67,0.47);--t4:rgba(60,60,67,0.18);--td:#C7C7CC;
    --glass:rgba(255,255,255,0.78);--glass-b:rgba(60,60,67,0.1);
    --ok:#34C759;--ok-s:rgba(52,199,89,0.12);--ok-t:#248A3D;
    --err:#FF3B30;--err-s:rgba(255,59,48,0.1);--err-t:#D70015;
    --sh-card:0 0 0 .5px rgba(0,0,0,.03),0 2px 16px rgba(0,0,0,.06);
    --sh-menu:0 0 0 .5px rgba(0,0,0,.06),0 12px 40px rgba(0,0,0,.14);
    --sh-chip:0 0 0 .5px rgba(0,0,0,.04),0 1px 4px rgba(0,0,0,.05);
  }
  [data-theme="dark"]{
    --bg:#000;--surface:#1C1C1E;--raised:#2C2C2E;
    --fill:rgba(118,118,128,0.24);--fill2:rgba(120,120,128,0.36);--fill3:rgba(120,120,128,0.32);
    --sep:rgba(84,84,88,0.36);--sep2:rgba(84,84,88,0.65);
    --t1:#FFF;--t2:rgba(235,235,245,0.6);--t3:rgba(235,235,245,0.47);--t4:rgba(235,235,245,0.18);--td:#48484A;
    --glass:rgba(28,28,30,0.86);--glass-b:rgba(84,84,88,0.3);
    --ok:#30D158;--ok-s:rgba(48,209,88,0.2);--ok-t:#30D158;
    --err:#FF453A;--err-s:rgba(255,69,58,0.2);--err-t:#FF453A;
    --sh-card:0 0 0 .5px rgba(84,84,88,.3),0 2px 16px rgba(0,0,0,.45);
    --sh-menu:0 0 0 .5px rgba(84,84,88,.4),0 12px 40px rgba(0,0,0,.6);
    --sh-chip:0 0 0 .5px rgba(84,84,88,.3),0 1px 4px rgba(0,0,0,.35);
  }
  @keyframes up{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
  @keyframes si{from{opacity:0;transform:scale(.96)}to{opacity:1;transform:scale(1)}}
  @keyframes pop{0%{transform:scale(1)}50%{transform:scale(1.02)}100%{transform:scale(1)}}
  @keyframes nud{0%,100%{transform:translateX(0)}25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}
  @keyframes rd{from{stroke-dashoffset:var(--rc)}}
  .au{animation:up .32s cubic-bezier(.33,1,.68,1) both}
  .asi{animation:si .4s cubic-bezier(.33,1,.68,1) both}
  .ap{animation:pop .3s ease}.an{animation:nud .32s ease}
  .ard{animation:rd 1s cubic-bezier(.33,1,.68,1) .15s both}
  *{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
  .glass{background:var(--glass);backdrop-filter:saturate(180%) blur(20px);-webkit-backdrop-filter:saturate(180%) blur(20px)}
  .hide-sb{-ms-overflow-style:none;scrollbar-width:none}.hide-sb::-webkit-scrollbar{display:none}
  .snap-x{scroll-snap-type:x mandatory}.snap-mandatory{scroll-snap-type:x mandatory}.snap-center{scroll-snap-align:center}
  .carousel-wrap .carousel-arrow{opacity:0;transition:opacity .25s}
  .carousel-wrap:hover .carousel-arrow{opacity:1}
  @media(hover:none){.carousel-wrap .carousel-arrow{display:none}}
  .ob{transition:background .18s,border-color .18s,transform .12s,box-shadow .18s}
  .ob:active:not([disabled]){transform:scale(.98)}
`;
