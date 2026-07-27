// @ts-nocheck -- Isolated generalized demo uses a dynamic local mock adapter.
if (process.env.NODE_ENV !== "test" && !process.env.NODE_TEST_CONTEXT) {
  require("server-only");
}
import { createClient } from "./supabase/server";
import { DEMO_TEACHER_PROFILE, demoTables, getDemoUser } from "./demo/mock-data";

export class UnauthorizedError extends Error { constructor(message="Authentication required."){super(message);this.name="UnauthorizedError";} }
export class ForbiddenError extends Error { constructor(message="Access denied."){super(message);this.name="ForbiddenError";} }

const studentProfile = demoTables.student_profiles[0];
const studentUser = getDemoUser("STUDENT");
const studentBaseProfile = demoTables.profiles.find((p:any)=>p.id===studentProfile.profile_id);

export async function requireAuthenticatedUser(){ return getDemoUser("TEACHER"); }
export async function requireActiveUser(){ return {user:getDemoUser("TEACHER"),profile:DEMO_TEACHER_PROFILE}; }
export async function requireTeacher(){ return {user:getDemoUser("TEACHER"),profile:DEMO_TEACHER_PROFILE}; }
export async function requireStudent(){ return {user:studentUser,profile:studentBaseProfile,studentProfile}; }
export async function requireActiveStudent(){ return requireStudent(); }
export async function requireActiveEnrollment(batchId:string){
  const enrollment=demoTables.enrollments.find((e:any)=>e.student_id===studentProfile.id&&e.batch_id===batchId&&e.status==="ACTIVE") || demoTables.enrollments.find((e:any)=>e.student_id===studentProfile.id);
  return {...await requireStudent(),enrollment};
}
export async function requireStudentOwnership(studentId:string){
  const target=demoTables.student_profiles.find((s:any)=>s.id===studentId)||studentProfile;
  return {user:getDemoUser("TEACHER"),profile:DEMO_TEACHER_PROFILE,studentProfile:target};
}
export async function requireNotificationOwnership(notificationId:string){
  const notification=demoTables.notifications.find((n:any)=>n.id===notificationId)||demoTables.notifications[0];
  return {user:studentUser,profile:studentBaseProfile,notification};
}
export async function requirePaymentOwnership(paymentId:string){
  const payment=demoTables.payments.find((p:any)=>p.id===paymentId)||demoTables.payments[0];
  return {user:getDemoUser("TEACHER"),profile:DEMO_TEACHER_PROFILE,payment};
}
export async function requireResultOwnership(resultId:string){
  const result=demoTables.exam_results.find((r:any)=>r.id===resultId)||demoTables.exam_results[0];
  return {user:studentUser,profile:studentBaseProfile,result};
}
export async function requireMaterialAccess(contentId:string){
  const material=demoTables.batch_contents.find((m:any)=>m.id===contentId)||demoTables.batch_contents[0];
  return {user:studentUser,profile:studentBaseProfile,studentProfile,material};
}
