// @ts-nocheck -- Isolated generalized demo uses a dynamic local mock adapter.
"use server";
import { revalidatePath } from "next/cache";
import { deleteDemoItem, getDemoItems, getDemoSection, setDemoSection, upsertDemoItem } from "@/features/effy-edu-demo/lib/demo/mock-cms";

export async function getPageSection(pageKey:string,sectionKey:string){ return getDemoSection(pageKey,sectionKey); }
export async function updatePageSection(pageKey:string,sectionKey:string,payload:any){ setDemoSection(pageKey,sectionKey,payload); revalidatePath("/effy_edu_management_system","layout"); return {success:true}; }
export async function getSectionItems(sectionKey:string){ return getDemoItems(sectionKey); }
export async function upsertSectionItem(sectionKey:string,payload:any){ const item=upsertDemoItem(sectionKey,payload); revalidatePath("/effy_edu_management_system","layout"); return {success:true,item}; }
export async function deleteSectionItem(itemId:string){ deleteDemoItem(itemId); revalidatePath("/effy_edu_management_system","layout"); return {success:true}; }
