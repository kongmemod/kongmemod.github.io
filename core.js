export const KINDS={download:'Bản tải',key:'Lấy key',file:'File mod',guide:'Hướng dẫn'};
export const PLATFORMS={ios:'iOS',android:'Android',all:'Tất cả'};
export const STATUSES={ready:'Sẵn sàng',maintenance:'Đang cập nhật',paused:'Tạm ngưng'};
export const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function safeURL(v,{asset=false}={}){
 if(!v)return '';
 if(asset){const local=v.replace(/^\.\/assets\//,'./');if(/^\.\/[a-zA-Z0-9_-][a-zA-Z0-9_.-]*\.(?:png|jpe?g|gif|webp|svg)$/i.test(local))return local;}
 try{const u=new URL(v);return u.protocol==='https:'&&!u.username&&!u.password?u.href:'';}catch{return '';}
}
export const activeAt=(start,end,now=Date.now())=>(!start||Date.parse(start)<=now)&&(!end||Date.parse(end)>now);
export const isVisible=(x,now=Date.now())=>x.published&&!x.deleted_at&&activeAt(x.starts_at,x.ends_at,now);
export function ordered(items){return [...items].sort((a,b)=>Number(b.featured)-Number(a.featured)||a.sort_order-b.sort_order||a.title.localeCompare(b.title,'vi'));}
export function filterItems(items,{kind='',platform='all',query='',favorites=null,sort='default'}={}){
 const q=query.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replaceAll('đ','d');
 let a=items.filter(x=>(!kind||x.kind===kind)&&(platform==='all'||x.platform===platform||x.platform==='all')&&(!favorites||favorites.includes(x.id))&&(!q||(x.title+' '+x.description).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replaceAll('đ','d').includes(q)));
 return sort==='newest'?a.sort((a,b)=>Date.parse(b.updated_at)-Date.parse(a.updated_at)):ordered(a);
}
export function validateItem(x){
 if(!x||typeof x!=='object'||Array.isArray(x))throw Error('Mục không hợp lệ.');
 if(!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(x.id||''))throw Error('ID không hợp lệ.');
 if(typeof x.title!=='string'||!x.title.trim()||x.title.length>140)throw Error('Tên cần từ 1–140 ký tự.');
 if(!KINDS[x.kind]||!PLATFORMS[x.platform]||!STATUSES[x.status])throw Error('Loại mục, nền tảng hoặc trạng thái không hợp lệ.');
 if(x.url&&!safeURL(x.url))throw Error('Link phải bắt đầu bằng https://.');
 if(x.status==='ready'&&!safeURL(x.url))throw Error('Mục sẵn sàng cần có link HTTPS.');
 if(x.image&&!safeURL(x.image,{asset:true}))throw Error('Ảnh cần là link HTTPS hoặc ảnh nằm cùng thư mục trong gói.');
 if(!Array.isArray(x.preview_media)||x.preview_media.length>8)throw Error('Tối đa 8 ảnh/video preview.');
 for(const p of x.preview_media)if(!p||!['image','video'].includes(p.type)||!safeURL(p.url))throw Error('Preview cần link HTTPS và loại ảnh/video hợp lệ.');
 for(const k of ['starts_at','ends_at','deleted_at'])if(x[k]!==null&&x[k]!==undefined&&(!Number.isFinite(Date.parse(x[k]))||typeof x[k]!=='string'))throw Error('Ngày không hợp lệ.');
 if(x.starts_at&&x.ends_at&&Date.parse(x.starts_at)>=Date.parse(x.ends_at))throw Error('Giờ kết thúc phải sau giờ bắt đầu.');
 if(!Number.isSafeInteger(x.sort_order)||Math.abs(x.sort_order)>1000000)throw Error('Thứ tự phải là số nguyên trong ±1.000.000.');
 for(const k of ['published','featured','preview_enabled'])if(typeof x[k]!=='boolean')throw Error('Công tắc không hợp lệ.');
 for(const k of ['description','maintenance_message','changelog','version_label'])if(typeof x[k]!=='string'||x[k].length>10000)throw Error('Nội dung quá dài hoặc không hợp lệ.');
 return x;
}
export function validateSettings(s){
 if(!s||typeof s!=='object'||Array.isArray(s))throw Error('Cấu hình không hợp lệ.');
 for(const k of ['name','eyebrow','tagline','description','avatar','shop_url','tiktok_url','discord1_url','discord2_url','maintenance_message','announcement','event_title','footer'])if(typeof s[k]!=='string'||s[k].length>10000)throw Error('Thiếu hoặc sai cấu hình: '+k);
 if(!s.name.trim()||s.name.length>80)throw Error('Tên web cần từ 1–80 ký tự.');
 for(const k of ['avatar','shop_url','tiktok_url','discord1_url','discord2_url'])if(s[k]&&!safeURL(s[k],{asset:k==='avatar'}))throw Error('Link cấu hình không hợp lệ: '+k);
 for(const k of ['preview_enabled','maintenance','announcement_enabled','event_enabled'])if(typeof s[k]!=='boolean')throw Error('Công tắc cấu hình không hợp lệ.');
 for(const prefix of ['announcement','event']){
  for(const part of ['start','end'])if(s[prefix+'_'+part]&&!Number.isFinite(Date.parse(s[prefix+'_'+part])))throw Error('Ngày cấu hình không hợp lệ.');
  if(s[prefix+'_start']&&s[prefix+'_end']&&Date.parse(s[prefix+'_start'])>=Date.parse(s[prefix+'_end']))throw Error('Giờ kết thúc phải sau giờ bắt đầu.');
 }
 if(!Array.isArray(s.event_groups)||s.event_groups.length>8)throw Error('Tối đa 8 nhóm key.');
 for(const g of s.event_groups)if(!g||typeof g.name!=='string'||!g.name.trim()||!Array.isArray(g.keys)||g.keys.length>1000||g.keys.some(k=>typeof k!=='string'||k.length>300))throw Error('Nhóm key không hợp lệ.');
 return s;
}
export function validateBundle(b){
 if(!b||b.schema!==1||!Array.isArray(b.items)||b.items.length>500)throw Error('Sai định dạng sao lưu hoặc quá 500 mục.');
 validateSettings(b.settings);const ids=new Set();for(const i of b.items){validateItem(i);if(ids.has(i.id))throw Error('Trùng ID trong sao lưu.');ids.add(i.id);}return b;
}
export function writable(x){const y={...x};delete y.revision;delete y.updated_at;return y;}
export const dateVN=v=>new Intl.DateTimeFormat('vi-VN',{timeZone:'Asia/Ho_Chi_Minh',day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit'}).format(new Date(v));
export function vnInput(v){if(!v)return '';const d=new Date(Date.parse(v)+7*3600000);return d.toISOString().slice(0,16);}
export const fromVN=v=>v?new Date(v+':00+07:00').toISOString():null;
export function uid(){if(crypto.randomUUID)return crypto.randomUUID();const b=crypto.getRandomValues(new Uint8Array(16));b[6]=(b[6]&15)|64;b[8]=(b[8]&63)|128;const h=Array.from(b,x=>x.toString(16).padStart(2,'0')).join('');return h.slice(0,8)+'-'+h.slice(8,12)+'-'+h.slice(12,16)+'-'+h.slice(16,20)+'-'+h.slice(20);}
export function emptyItem(kind='download'){return {id:uid(),title:'',kind,platform:'ios',url:'',image:'',description:'',status:'ready',maintenance_message:'Đang cập nhật. Vui lòng quay lại sau.',published:false,featured:false,sort_order:0,starts_at:null,ends_at:null,preview_enabled:false,preview_media:[],changelog:'',version_label:'',deleted_at:null};}
export function downloadJSON(name,data){const u=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),10000);}
