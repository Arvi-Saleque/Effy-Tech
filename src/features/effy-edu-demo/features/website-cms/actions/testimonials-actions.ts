// @ts-nocheck -- Isolated generalized demo uses a dynamic local mock adapter.
"use server";
import { revalidatePath } from "next/cache";
import { testimonials as seedTestimonials } from "@/features/effy-edu-demo/data/testimonials";

export interface TestimonialItem { id:string; name:string; role:"Student"|"Parent"; message:string; rating:number; image:string; batch:string; achievement?:string; is_approved:boolean; created_at:string; updated_at:string; }
const g=globalThis as typeof globalThis & {__EDUPILOT_TESTIMONIALS__?:TestimonialItem[]};
const store=g.__EDUPILOT_TESTIMONIALS__ ||= seedTestimonials.map((t:any,i:number)=>({...t,is_approved:true,created_at:new Date(Date.now()-i*86400000).toISOString(),updated_at:new Date().toISOString()}));
export async function getPublicTestimonials(){return store.filter(t=>t.is_approved);}
export async function getAllTestimonialsAdmin(){return store;}
export async function toggleTestimonialApproval(id:string,isApproved:boolean){const t=store.find(x=>x.id===id);if(t)t.is_approved=isApproved;revalidatePath("/effy_edu_management_system");return {success:true};}
export async function deleteTestimonial(id:string){const i=store.findIndex(x=>x.id===id);if(i>=0)store.splice(i,1);revalidatePath("/effy_edu_management_system");return {success:true};}
export async function submitReview(payload:any){store.unshift({id:`review-${Date.now()}`,...payload,image:"/effy_edu_management_system/images/student.png",is_approved:false,created_at:new Date().toISOString(),updated_at:new Date().toISOString()});return {success:true};}
