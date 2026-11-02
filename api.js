import {CONFIG} from './config.js';
import {validateItem,validateBundle,writable} from './core.js';
export class API{
 constructor(config=CONFIG,fetcher=globalThis.fetch.bind(globalThis),storage=globalThis.sessionStorage){this.config=config;this.fetch=fetcher;this.storage=storage;this.session=null;try{this.session=JSON.parse(storage.getItem('kong.admin.session')||'null');}catch{}this.refreshing=null;}
 get configured(){return /^https:\/\/[a-z0-9.-]+\.supabase\.co\/?$/.test(this.config.supabaseUrl)&&!!this.config.publishableKey&&!this.config.publishableKey.startsWith('sb_secret_');}
 store(s){this.session=s?{access_token:s.access_token,refresh_token:s.refresh_token,expires_at:Math.floor(Date.now()/1000)+(s.expires_in||3600)}:null;try{this.session?this.storage.setItem('kong.admin.session',JSON.stringify(this.session)):this.storage.removeItem('kong.admin.session');}catch{}}
 async request(path,{method='GET',body,admin=false,headers={},retry=true}={}){
  if(!this.configured)throw Error('Chưa cấu hình Supabase. Xem README.');
  if(admin&&this.session&&this.session.expires_at<Date.now()/1000+45)await this.refresh();
  const h={apikey:this.config.publishableKey,'Content-Type':'application/json',...headers};
  if(admin){if(!this.session)throw Error('Vui lòng đăng nhập lại.');h.Authorization='Bearer '+this.session.access_token;}
  const c=new AbortController();const timer=setTimeout(()=>c.abort(),20000);let res;
  try{res=await this.fetch(this.config.supabaseUrl.replace(/\/$/,'')+path,{method,headers:h,body:body===undefined?undefined:JSON.stringify(body),signal:c.signal,cache:'no-store',credentials:'omit'});}catch(e){throw Error(e.name==='AbortError'?'Máy chủ phản hồi chậm. Hãy thử lại.':'Không kết nối được máy chủ. Kiểm tra mạng và cấu hình.');}finally{clearTimeout(timer);}
  const txt=await res.text();let data;try{data=txt?JSON.parse(txt):null;}catch{throw Error('Phản hồi máy chủ không hợp lệ.');}
  if(!res.ok){if(res.status===401&&admin&&retry&&this.session){await this.refresh();return this.request(path,{method,body,admin,headers,retry:false});}throw Error(data?.msg||data?.message||data?.error_description||'Yêu cầu thất bại ('+res.status+').');}return data;
 }
 async refresh(){if(this.refreshing)return this.refreshing;this.refreshing=(async()=>{try{if(!this.session?.refresh_token)throw Error('Phiên đã hết hạn.');const s=await this.request('/auth/v1/token?grant_type=refresh_token',{method:'POST',body:{refresh_token:this.session.refresh_token}});this.store(s);}catch(e){this.store(null);throw e;}finally{this.refreshing=null;}})();return this.refreshing;}
 async login(email,password){const s=await this.request('/auth/v1/token?grant_type=password',{method:'POST',body:{email,password}});this.store(s);try{await this.checkAdmin();}catch(e){this.store(null);throw e;}}
 async checkAdmin(){const user=await this.request('/auth/v1/user',{admin:true});const ok=await this.request('/rest/v1/rpc/is_site_admin',{method:'POST',body:{},admin:true});if(!ok)throw Error('Tài khoản này chưa được cấp quyền quản trị.');return user;}
 async logout(){try{if(this.session)await this.request('/auth/v1/logout',{method:'POST',body:{},admin:true});}finally{this.store(null);}}
 async load(admin=false){const [items,settings]=await Promise.all([this.request('/rest/v1/kong_items?select=*&order=sort_order.asc&limit=500',{admin}),this.request('/rest/v1/kong_settings?id=eq.1&select=data,revision',{admin})]);if(!settings?.length)throw Error('Chưa khởi tạo cấu hình máy chủ. Chạy setup.sql.');if(!admin&&!settings[0].data?.name)throw Error('Website đang được thiết lập. Vui lòng quay lại sau.');return {schema:1,items,settings:settings[0].data,settingsRevision:settings[0].revision};}
 async saveItem(item){validateItem(item);if(item.revision){const a=await this.request('/rest/v1/kong_items?id=eq.'+item.id+'&revision=eq.'+item.revision,{method:'PATCH',body:writable(item),admin:true,headers:{Prefer:'return=representation'}});if(!a.length)throw Error('Mục đã thay đổi ở nơi khác. Tải lại rồi sửa để tránh ghi đè.');return a[0];}return (await this.request('/rest/v1/kong_items',{method:'POST',body:writable(item),admin:true,headers:{Prefer:'return=representation'}}))[0];}
 async saveSettings(data,revision){const a=await this.request('/rest/v1/kong_settings?id=eq.1&revision=eq.'+revision,{method:'PATCH',body:{data},admin:true,headers:{Prefer:'return=representation'}});if(!a.length)throw Error('Cài đặt đã đổi ở nơi khác. Hãy tải lại.');return a[0];}
 async importBundle(b){validateBundle(b);return this.request('/rest/v1/rpc/import_kong_bundle',{method:'POST',body:{bundle:{schema:1,settings:b.settings,items:b.items.map(writable)}},admin:true});}
 audit(){return this.request('/rest/v1/kong_audit?select=*&order=created_at.desc&limit=100',{admin:true});}
}
