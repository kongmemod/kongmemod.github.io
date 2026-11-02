// Decorative CSS motion only. The catalog and admin never depend on animation.
export function initEffects(){
 const root=document.documentElement,button=document.querySelector('#effects');
 if(!button)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let preference='on';try{preference=localStorage.getItem('kong.effects')||'on';}catch{}
 function sync(){
  const enabled=preference!=='off'&&!reduced.matches;
  root.dataset.effects=!enabled?'off':document.hidden?'paused':'on';
  button.setAttribute('aria-pressed',String(enabled));
  button.disabled=reduced.matches;
  button.title=reduced.matches?'Đã giảm chuyển động theo cài đặt thiết bị':enabled?'Tắt hiệu ứng chuyển động':'Bật hiệu ứng chuyển động';
 }
 button.addEventListener('click',()=>{preference=preference==='off'?'on':'off';try{localStorage.setItem('kong.effects',preference);}catch{}sync();});
 document.addEventListener('visibilitychange',sync);
 reduced.addEventListener('change',sync);
 window.addEventListener('storage',e=>{if(e.key==='kong.effects'){preference=e.newValue||'on';sync();}});
 sync();
}
