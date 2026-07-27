// @ts-nocheck -- Isolated generalized demo uses a dynamic local mock adapter.
import { demoTables, getDemoUser, type DemoRow } from "./mock-data";
import { normalizeSchedule } from "../schedule";

const uid = (prefix="demo") => `${prefix}-${Math.random().toString(36).slice(2,10)}`;
const clone = <T>(value:T):T => JSON.parse(JSON.stringify(value));
const getPath = (obj:any, path:string) => path.split(".").reduce((v,k)=>v == null ? undefined : v[k], obj);
const normalize = (value:any) => value instanceof Date ? value.toISOString() : value;

function enrich(table:string, raw:DemoRow):DemoRow {
  const row = clone(raw);
  const find=(t:string,id:any,field="id")=>demoTables[t]?.find(r=>r[field]===id);
  const profileForStudent = (student:any) => student ? find("profiles",student.profile_id) : null;
  if (table === "batches") {
    const schedule = normalizeSchedule(row.schedule);
    row.schedule = schedule ? { days: schedule.daysText, time: schedule.time } : null;
  }
  if (table === "student_profiles") {
    const p=find("profiles",row.profile_id); row.profile=p; row.profiles=p;
    row.enrollments=(demoTables.enrollments||[]).filter(e=>e.student_id===row.id).map(e=>enrich("enrollments",e));
  }
  if (table === "teacher_profiles") { const p=find("profiles",row.profile_id); row.profile=p; row.profiles=p; }
  if (table === "enrollments") {
    const b=find("batches",row.batch_id); const s=find("student_profiles",row.student_id);
    row.batch=b; row.batches=b; row.student=s?{...s,profile:profileForStudent(s),profiles:profileForStudent(s)}:null; row.student_profiles=row.student;
  }
  if (table === "payments") {
    const b=find("batches",row.batch_id); const s=find("student_profiles",row.student_id); const e=find("enrollments",row.enrollment_id);
    row.batch=b; row.batches=b; row.student=s?{...s,profile:profileForStudent(s),profiles:profileForStudent(s)}:null; row.student_profiles=row.student; row.enrollment=e;
  }
  if (table === "batch_subjects") { const b=find("batches",row.batch_id); row.batch=b; row.batches=b; }
  if (table === "subject_units") { const s=find("batch_subjects",row.subject_id); row.subject=s; row.batch_subjects=s; }
  if (table === "academic_assignments") {
    const b=find("batches",row.batch_id), s=find("batch_subjects",row.subject_id), u=find("subject_units",row.unit_id);
    row.batch=b; row.batches=b; row.subject=s; row.batch_subjects=s; row.unit=u; row.subject_units=u;
  }
  if (table === "academic_assignment_submissions") {
    const a=find("academic_assignments",row.assignment_id), s=find("student_profiles",row.student_id);
    row.assignment=a; row.academic_assignments=a; row.student=s?{...s,profile:profileForStudent(s),profiles:profileForStudent(s)}:null; row.student_profiles=row.student;
  }
  if (table === "academic_class_sessions") {
    const b=find("batches",row.batch_id), s=find("batch_subjects",row.subject_id), u=find("subject_units",row.unit_id);
    row.batch=b; row.batches=b; row.subject=s; row.batch_subjects=s; row.unit=u; row.subject_units=u;
  }
  if (table === "batch_contents") {
    const b=find("batches",row.batch_id), s=find("batch_subjects",row.subject_id);
    row.batch=b; row.batches=b; row.subject=s; row.batch_subjects=s;
  }
  if (table === "exams") {
    const b=find("batches",row.batch_id), s=find("batch_subjects",row.subject_id);
    row.batch=b; row.batches=b; row.subject=s; row.batch_subjects=s;
  }
  if (table === "exam_results") {
    const e=find("exams",row.exam_id), s=find("student_profiles",row.student_id), en=find("enrollments",row.enrollment_id);
    row.exam=e?enrich("exams",e):null; row.exams=row.exam; row.student=s?{...s,profile:profileForStudent(s),profiles:profileForStudent(s)}:null; row.enrollment=en;
  }
  if (table === "announcements") {
    const b=find("batches",row.batch_id), p=find("profiles",row.published_by);
    row.batch=b; row.batches=b; row.profile=p; row.profiles=p;
  }
  if (table === "audit_logs") { const p=find("profiles",row.actor_user_id); row.actor=p; row.profiles=p; }
  return row;
}

type Filter=(row:any)=>boolean;
class MockQuery implements PromiseLike<any> {
  table:string; operation:"select"|"insert"|"update"|"delete"|"upsert"="select"; payload:any=null;
  filters:Filter[]=[]; orders:{key:string;ascending:boolean}[]=[]; max:number|null=null; slice:[number,number]|null=null; opts:any={}; singleMode:"none"|"single"|"maybe"="none";
  constructor(table:string){this.table=table;}
  select(_columns="*", opts:any={}){this.opts={...this.opts,...opts}; return this;}
  insert(payload:any){this.operation="insert";this.payload=payload;return this;}
  upsert(payload:any){this.operation="upsert";this.payload=payload;return this;}
  update(payload:any){this.operation="update";this.payload=payload;return this;}
  delete(){this.operation="delete";return this;}
  eq(key:string,val:any){this.filters.push(r=>normalize(getPath(r,key))===normalize(val));return this;}
  neq(key:string,val:any){this.filters.push(r=>normalize(getPath(r,key))!==normalize(val));return this;}
  gt(key:string,val:any){this.filters.push(r=>getPath(r,key)>val);return this;}
  gte(key:string,val:any){this.filters.push(r=>getPath(r,key)>=val);return this;}
  lt(key:string,val:any){this.filters.push(r=>getPath(r,key)<val);return this;}
  lte(key:string,val:any){this.filters.push(r=>getPath(r,key)<=val);return this;}
  in(key:string,vals:any[]){this.filters.push(r=>vals.includes(getPath(r,key)));return this;}
  is(key:string,val:any){this.filters.push(r=>getPath(r,key)===val);return this;}
  not(key:string,op:string,val:any){
    if(op==="is") this.filters.push(r=>getPath(r,key)!==val);
    else if(op==="in") {
      const values = Array.isArray(val)
        ? val
        : String(val).replace(/^\(|\)$/g, "").split(",").map(v=>v.trim().replace(/^['"]|['"]$/g, "")).filter(Boolean);
      this.filters.push(r=>!values.includes(String(getPath(r,key))));
    } else this.filters.push(r=>getPath(r,key)!==val);
    return this;
  }
  ilike(key:string,pattern:string){const q=String(pattern).replace(/%/g,"").toLowerCase();this.filters.push(r=>String(getPath(r,key)||"").toLowerCase().includes(q));return this;}
  contains(key:string,val:any){this.filters.push(r=>{const x=getPath(r,key);return Array.isArray(x)&&Array.isArray(val)?val.every(v=>x.includes(v)):false});return this;}
  match(obj:Record<string,any>){Object.entries(obj).forEach(([k,v])=>this.eq(k,v));return this;}
  or(expression:string){
    const parts:string[]=[];
    let current=""; let depth=0; let quote="";
    for(const char of expression){
      if((char==='"' || char==="'") && (!quote || quote===char)) quote=quote?"":char;
      if(!quote){ if(char==='(') depth++; if(char===')') depth=Math.max(0,depth-1); }
      if(char===',' && depth===0 && !quote){ if(current.trim()) parts.push(current.trim()); current=""; }
      else current+=char;
    }
    if(current.trim()) parts.push(current.trim());
    this.filters.push(row=>parts.some(part=>{
      const [key,op,...rest]=part.split("."); const val=rest.join("."); const actual=getPath(row,key);
      if(op==="ilike") return String(actual||"").toLowerCase().includes(val.replace(/%/g,"").toLowerCase());
      if(op==="eq") return String(actual)===val;
      if(op==="is") return (val==="null"?actual==null:String(actual)===val);
      if(op==="in") {
        const values=val.replace(/^\(|\)$/g,"").split(",").map(v=>v.trim().replace(/^['"]|['"]$/g,"")).filter(Boolean);
        return values.includes(String(actual));
      }
      return false;
    })); return this;
  }
  order(key:string,opts:any={}){this.orders.push({key,ascending:opts.ascending!==false});return this;}
  limit(n:number){this.max=n;return this;}
  range(a:number,b:number){this.slice=[a,b];return this;}
  single(){this.singleMode="single";return this.execute();}
  maybeSingle(){this.singleMode="maybe";return this.execute();}
  then<TResult1=any,TResult2=never>(onfulfilled?:((value:any)=>TResult1|PromiseLike<TResult1>)|null,onrejected?:((reason:any)=>TResult2|PromiseLike<TResult2>)|null){return this.execute().then(onfulfilled,onrejected);}
  async execute(): Promise<any> {
    const tableRows=demoTables[this.table] || (demoTables[this.table]=[]);
    let rows=tableRows.map(r=>enrich(this.table,r));
    rows=this.filters.reduce((acc,f)=>acc.filter(f),rows);
    if(this.operation==="insert"||this.operation==="upsert"){
      const list=Array.isArray(this.payload)?this.payload:[this.payload];
      const inserted=list.map((p:any)=>({id:p.id||uid(this.table.replace(/s$/, "")),...clone(p),created_at:p.created_at||new Date().toISOString(),updated_at:p.updated_at||new Date().toISOString()}));
      inserted.forEach((item:any)=>{const ix=tableRows.findIndex(r=>r.id===item.id); if(this.operation==="upsert"&&ix>=0)tableRows[ix]={...tableRows[ix],...item};else tableRows.push(item)});
      rows=inserted.map(r=>enrich(this.table,r));
    } else if(this.operation==="update"){
      const ids=new Set(rows.map(r=>r.id)); tableRows.forEach((r,i)=>{if(ids.has(r.id))tableRows[i]={...r,...clone(this.payload),updated_at:new Date().toISOString()}}); rows=tableRows.filter(r=>ids.has(r.id)).map(r=>enrich(this.table,r));
    } else if(this.operation==="delete"){
      const ids=new Set(rows.map(r=>r.id)); for(let i=tableRows.length-1;i>=0;i--)if(ids.has(tableRows[i].id))tableRows.splice(i,1);
    }
    this.orders.slice().reverse().forEach(o=>rows.sort((a,b)=>{const av=getPath(a,o.key),bv=getPath(b,o.key);return (av===bv?0:av>bv?1:-1)*(o.ascending?1:-1)}));
    const count=rows.length;
    if(this.slice) rows=rows.slice(this.slice[0],this.slice[1]+1);
    if(this.max!=null) rows=rows.slice(0,this.max);
    if(this.opts.head) return {data:null,error:null,count};
    if(this.singleMode!=="none"){
      const data=rows[0]||null;
      if(!data&&this.singleMode==="single") return {data:null,error:{code:"PGRST116",message:"No rows found"},count};
      return {data,error:null,count};
    }
    return {data:clone(rows),error:null,count};
  }
}



type RealtimeStatus = "SUBSCRIBED" | "CLOSED" | "CHANNEL_ERROR" | "TIMED_OUT";

class MockRealtimeChannel {
  readonly topic: string;
  private handlers: Array<{ event: string; filter: any; callback: (...args: any[]) => void }> = [];
  private closed = false;

  constructor(topic: string) {
    this.topic = topic;
  }

  on(event: string, filter: any, callback: (...args: any[]) => void) {
    this.handlers.push({ event, filter, callback });
    return this;
  }

  subscribe(callback?: (status: RealtimeStatus, error?: Error) => void) {
    if (callback) {
      queueMicrotask(() => {
        if (!this.closed) callback("SUBSCRIBED");
      });
    }
    return this;
  }

  async unsubscribe() {
    this.closed = true;
    this.handlers = [];
    return "ok" as const;
  }

  async send(_payload: any) {
    return this.closed ? "error" as const : "ok" as const;
  }

  async track(_payload: any) {
    return this.closed ? "error" as const : "ok" as const;
  }

  async untrack() {
    return this.closed ? "error" as const : "ok" as const;
  }
}

const listeners=new Set<(event:string,session:any)=>void>();
const DEMO_ROLE_KEY = "edupilot-demo-role";

const readCookieRole = (): "TEACHER" | "STUDENT" | null => {
  try {
    if (typeof document === "undefined") return null;
    const match = document.cookie.match(new RegExp(`(?:^|; )${DEMO_ROLE_KEY}=([^;]*)`));
    const value = match ? decodeURIComponent(match[1]) : null;
    return value === "TEACHER" || value === "STUDENT" ? value : null;
  } catch {
    return null;
  }
};

const getBrowserRole = (): "TEACHER" | "STUDENT" | null => {
  try {
    const value = typeof localStorage !== "undefined" ? localStorage.getItem(DEMO_ROLE_KEY) : null;
    if (value === "TEACHER" || value === "STUDENT") return value;
  } catch {}
  return readCookieRole();
};

const persistBrowserRole = (role: "TEACHER" | "STUDENT") => {
  try {
    if (typeof localStorage !== "undefined") localStorage.setItem(DEMO_ROLE_KEY, role);
  } catch {}
  try {
    if (typeof document !== "undefined") {
      document.cookie = `${DEMO_ROLE_KEY}=${encodeURIComponent(role)}; Path=/; Max-Age=604800; SameSite=Lax`;
    }
  } catch {}
};

const clearBrowserRole = () => {
  try {
    if (typeof localStorage !== "undefined") localStorage.removeItem(DEMO_ROLE_KEY);
  } catch {}
  try {
    if (typeof document !== "undefined") {
      document.cookie = `${DEMO_ROLE_KEY}=; Path=/; Max-Age=0; SameSite=Lax`;
    }
  } catch {}
};

export function createMockSupabase(defaultRole:"TEACHER"|"STUDENT"|null="TEACHER") {
  const auth:any={
    async getUser(){const role=typeof window!=="undefined"?getBrowserRole():defaultRole;return {data:{user:role?getDemoUser(role):null},error:null}},
    async getSession(){const role=typeof window!=="undefined"?getBrowserRole():defaultRole;return {data:{session:role?{user:getDemoUser(role)}:null},error:null}},
    async signInWithPassword({email}:{email:string}){const role=email.toLowerCase().includes("teacher")||email.toLowerCase().includes("admin")?"TEACHER":"STUDENT";persistBrowserRole(role); const session={user:getDemoUser(role)};listeners.forEach(l=>l("SIGNED_IN",session));return {data:{user:session.user,session},error:null}},
    async signUp({email}:{email:string}){const session={user:{...getDemoUser("STUDENT"),email}};persistBrowserRole("STUDENT");listeners.forEach(l=>l("SIGNED_IN",session));return {data:{user:session.user,session},error:null}},
    async signOut(){clearBrowserRole();listeners.forEach(l=>l("SIGNED_OUT",null));return {error:null}},
    async updateUser(payload:any){return {data:{user:{...getDemoUser(getBrowserRole()||defaultRole||"STUDENT"),...payload?.data}},error:null}},
    async resetPasswordForEmail(){return {data:{},error:null}},
    onAuthStateChange(cb:any){listeners.add(cb);return {data:{subscription:{unsubscribe:()=>listeners.delete(cb)}}}},
    admin:{async listUsers(){return {data:{users:[getDemoUser("TEACHER"),getDemoUser("STUDENT")]},error:null}},async createUser(p:any){return {data:{user:{id:uid("auth"),...p}},error:null}},async updateUserById(id:string,p:any){return {data:{user:{id,...p}},error:null}},async deleteUser(){return {data:{},error:null}}}
  };
  const realtimeChannels = new Set<MockRealtimeChannel>();

  return {
    from:(table:string)=>new MockQuery(table),
    rpc:async(name:string,args:any)=> name==="get_student_teacher_note"?{data:demoTables.student_profiles.find(s=>s.id===args?.p_student_id)?.teacher_note||null,error:null}:{data:true,error:null},
    channel:(topic:string) => {
      const channel = new MockRealtimeChannel(topic);
      realtimeChannels.add(channel);
      return channel;
    },
    removeChannel:async(channel:MockRealtimeChannel) => {
      realtimeChannels.delete(channel);
      return channel?.unsubscribe ? channel.unsubscribe() : "ok";
    },
    removeAllChannels:async() => {
      const channels = Array.from(realtimeChannels);
      realtimeChannels.clear();
      await Promise.all(channels.map((channel) => channel.unsubscribe()));
      return channels.map(() => "ok" as const);
    },
    getChannels:() => Array.from(realtimeChannels),
    auth,
    storage:{from:(_bucket:string)=>({upload:async(_p:string,_f:any)=>({data:{path:_p},error:null}),remove:async()=>({data:[],error:null}),createSignedUrl:async(path:string)=>({data:{signedUrl:path},error:null}),getPublicUrl:(path:string)=>({data:{publicUrl:path}})})}
  } as any;
}
