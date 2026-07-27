// @ts-nocheck -- Isolated generalized demo uses a dynamic local mock adapter.
export type DemoRow = Record<string, any>;

const now = new Date();
const iso = (days = 0, hour = 10) => {
  const d = new Date(now);
  d.setDate(d.getDate() + days);
  d.setHours(hour, 0, 0, 0);
  return d.toISOString();
};
const date = (days = 0) => iso(days).slice(0, 10);

export const DEMO_TEACHER_PROFILE = {
  id: "profile-teacher",
  auth_user_id: "auth-teacher",
  role: "TEACHER",
  full_name: "Dr. Arif Rahman",
  email: "teacher@demo.edu",
  phone: "+880 1700-000001",
  avatar_url: "/effy_edu_management_system/images/demo-instructor.png",
  avatar_cloudinary_public_id: null,
  account_status: "ACTIVE",
  created_at: iso(-600),
  updated_at: iso(-1),
};

const studentNames = [
  ["Nafis Ahmed", "EDU-26001", "HSC 2027", "City Science College"],
  ["Raisa Karim", "EDU-26002", "HSC 2027", "Central Women's College"],
  ["Samiul Hasan", "EDU-26003", "HSC 2026", "Model College"],
  ["Nusrat Jahan", "EDU-26004", "SSC 2027", "Scholars School"],
  ["Ayan Chowdhury", "EDU-26005", "Admission", "National College"],
  ["Tasnim Noor", "EDU-26006", "HSC 2026", "Sunrise College"],
  ["Fahim Mahmud", "EDU-26007", "Admission", "Metropolitan College"],
  ["Mehjabin Islam", "EDU-26008", "SSC 2027", "Greenfield School"],
];

const profiles: DemoRow[] = [DEMO_TEACHER_PROFILE];
const studentProfiles: DemoRow[] = [];
studentNames.forEach(([full_name, code, level, institution], index) => {
  const pId = `profile-student-${index + 1}`;
  profiles.push({
    id: pId,
    auth_user_id: index === 0 ? "auth-student" : `auth-student-${index + 1}`,
    role: "STUDENT",
    full_name,
    email: `${full_name.toLowerCase().replace(/[^a-z]+/g, ".").replace(/^\.|\.$/g, "")}@demo.edu`,
    phone: `+880 18${String(10000000 + index).padStart(8, "0")}`,
    avatar_url: `/effy_edu_management_system/images/s${(index % 5) + 1}.jpeg`,
    avatar_cloudinary_public_id: null,
    account_status: index === 5 ? "DISABLED" : "ACTIVE",
    created_at: iso(-180 + index),
    updated_at: iso(-index),
  });
  studentProfiles.push({
    id: `student-${index + 1}`,
    profile_id: pId,
    student_code: code,
    academic_level: level,
    institution,
    guardian_name: `Guardian of ${full_name}`,
    guardian_phone: `+880 19${String(20000000 + index).padStart(8, "0")}`,
    address: "Dhaka, Bangladesh",
    date_of_birth: `200${7 + (index % 3)}-0${(index % 8) + 1}-15`,
    registration_status: index === 7 ? "PENDING" : "APPROVED",
    teacher_note: index === 0 ? "Strong analytical ability; should improve written presentation." : null,
    registered_at: iso(-180 + index),
    updated_at: iso(-index),
  });
});

const batches: DemoRow[] = [
  { id:"batch-hsc27", name:"HSC 2027 Physics & Mathematics", code:"HSC27-PM", slug:"hsc-2027-physics-math", subject:"Physics & Higher Mathematics", academic_level:"HSC 2027", description:"Concept-first academic program with weekly assessment and guardian reporting.", start_date:date(-120), end_date:date(240), schedule:{days:"Sat, Mon, Wed",time:"5:00 PM"}, monthly_fee:4500, admission_fee:2000, capacity:30, status:"RUNNING", admission_open:true, cover_image_url:"/effy_edu_management_system/images/flyer_hsc26_hsc27.jpg", created_at:iso(-150), updated_at:iso(-2)},
  { id:"batch-hsc26", name:"HSC 2026 Final Revision", code:"HSC26-REV", slug:"hsc-2026-final-revision", subject:"Physics & Higher Mathematics", academic_level:"HSC 2026", description:"Board-focused revision, model tests and problem-solving marathons.", start_date:date(-60), end_date:date(100), schedule:{days:"Sun, Tue, Thu",time:"6:30 PM"}, monthly_fee:4200, admission_fee:1500, capacity:26, status:"RUNNING", admission_open:true, cover_image_url:"/effy_edu_management_system/images/flyer_revision_2026.jpg", created_at:iso(-90), updated_at:iso(-1)},
  { id:"batch-admission", name:"Engineering Admission Intensive", code:"ENG-ADM", slug:"engineering-admission-intensive", subject:"Physics, Mathematics & Chemistry", academic_level:"Admission", description:"High-intensity engineering admission preparation with analytics-driven model tests.", start_date:date(-35), end_date:date(140), schedule:{days:"Sat, Sun, Tue, Thu",time:"3:30 PM"}, monthly_fee:6500, admission_fee:2500, capacity:24, status:"RUNNING", admission_open:true, cover_image_url:"/effy_edu_management_system/images/flyer_admission_science.jpg", created_at:iso(-70), updated_at:iso(-1)},
  { id:"batch-ssc27", name:"SSC 2027 Science Foundation", code:"SSC27-SCI", slug:"ssc-2027-science-foundation", subject:"General Science & Mathematics", academic_level:"SSC 2027", description:"Foundational program for class 9–10 science students.", start_date:date(-80), end_date:date(300), schedule:{days:"Fri, Sun, Tue",time:"4:00 PM"}, monthly_fee:3500, admission_fee:1200, capacity:35, status:"OPEN", admission_open:true, cover_image_url:"/effy_edu_management_system/images/flyer_hsc26_hsc27.jpg", created_at:iso(-100), updated_at:iso(-3)},
];

const batchSubjects: DemoRow[] = [
  ["sub-hsc27-phy","batch-hsc27","Physics","PHY","RUNNING","BLUE",1,55],
  ["sub-hsc27-math","batch-hsc27","Higher Mathematics","HM","RUNNING","VIOLET",2,45],
  ["sub-hsc26-phy","batch-hsc26","Physics Revision","PHY-R","RUNNING","NAVY",1,50],
  ["sub-hsc26-math","batch-hsc26","Mathematics Revision","HM-R","RUNNING","AMBER",2,50],
  ["sub-adm-phy","batch-admission","Admission Physics","A-PHY","RUNNING","BLUE",1,35],
  ["sub-adm-math","batch-admission","Admission Mathematics","A-MATH","RUNNING","VIOLET",2,40],
  ["sub-adm-chem","batch-admission","Admission Chemistry","A-CHEM","UPCOMING","EMERALD",3,25],
  ["sub-ssc-sci","batch-ssc27","Science Foundation","SCI","RUNNING","EMERALD",1,60],
  ["sub-ssc-math","batch-ssc27","Mathematics Foundation","MATH","RUNNING","AMBER",2,40],
].map(([id,batch_id,name,code,status,theme_key,display_order,weight]) => ({id,batch_id,name,code,description:`Structured ${name} syllabus`,status,start_date:date(-80),end_date:date(220),theme_key,display_order,weight,is_default:display_order===1,completed_at:null,created_by:"profile-teacher",updated_by:"profile-teacher",created_at:iso(-90),updated_at:iso(-2)}));

const subjectUnits: DemoRow[] = [
  ["unit-1","sub-hsc27-phy","Vector & Motion","RUNNING",1],
  ["unit-2","sub-hsc27-phy","Newtonian Mechanics","PLANNED",2],
  ["unit-3","sub-hsc27-math","Functions & Limits","COMPLETED",1],
  ["unit-4","sub-hsc27-math","Differentiation","RUNNING",2],
  ["unit-5","sub-hsc26-phy","Electricity Revision","RUNNING",1],
  ["unit-6","sub-hsc26-math","Calculus Model Problems","RUNNING",1],
  ["unit-7","sub-adm-phy","Advanced Mechanics","RUNNING",1],
  ["unit-8","sub-adm-math","Admission Calculus","RUNNING",1],
].map(([id,subject_id,title,status,sequence_no]) => ({id,subject_id,title,description:`Core lessons and guided practice for ${title}.`,unit_type:"CHAPTER",status,sequence_no,weight:10,planned_start_date:date(-30),planned_end_date:date(30),completed_at:status==="COMPLETED"?iso(-8):null,created_by:"profile-teacher",updated_by:"profile-teacher",created_at:iso(-60),updated_at:iso(-2)}));

const enrollments: DemoRow[] = [];
studentProfiles.forEach((student, idx) => {
  // Keep one approved student without a batch so the admin dashboard can
  // demonstrate its incomplete-enrollment workflow.
  if (idx === 6) return;

  const batchIds = idx < 3 ? ["batch-hsc27","batch-hsc26"] : idx < 5 ? ["batch-admission"] : ["batch-ssc27"];
  batchIds.forEach((batchId, j) => {
    const status = student.registration_status === "PENDING" ? "PENDING" : idx === 5 ? "DISABLED" : "ACTIVE";
    enrollments.push({
      id:`enroll-${idx+1}-${j+1}`,
      student_id:student.id,
      batch_id:batchId,
      status,
      approved_at:student.registration_status==="APPROVED"?iso(-100+j):null,
      disabled_at:status === "DISABLED" ? iso(-4) : null,
      disable_reason:status === "DISABLED" ? "Demo account temporarily suspended for overdue document verification." : null,
      completed_at:null,
      created_at:iso(-120+j),
      updated_at:iso(-2)
    });
  });
});

const payments: DemoRow[] = [];
enrollments.filter(e=>e.status==="ACTIVE").forEach((e, idx) => {
  for (let monthOffset=0; monthOffset<3; monthOffset++) {
    const d=new Date(now); d.setMonth(d.getMonth()-monthOffset);
    const fee=batches.find(b=>b.id===e.batch_id)?.monthly_fee || 4000;
    const paid = monthOffset===0 && idx%3===0 ? fee/2 : fee;
    payments.push({id:`pay-${idx+1}-${monthOffset}`,student_id:e.student_id,enrollment_id:e.id,batch_id:e.batch_id,billing_month:d.getMonth()+1,billing_year:d.getFullYear(),expected_amount:fee,paid_amount:paid,status:paid===fee?"PAID":"PARTIALLY_PAID",payment_method:paid===fee?"Cash":"Bank Transfer",payment_date:iso(-monthOffset*28-2),reference_number:`PAY-${d.getFullYear()}-${String(idx+1).padStart(4,"0")}`,confirmed_at:iso(-monthOffset*28-2),teacher_note:null,student_note:null,created_at:iso(-monthOffset*28-5),updated_at:iso(-2)});
  }
});

const exams: DemoRow[] = [
  {id:"exam-1",batch_id:"batch-hsc27",subject_id:"sub-hsc27-phy",name:"Vector & Motion Weekly Exam",description:"Conceptual and numerical assessment",exam_type:"WEEKLY_EXAM",exam_date:date(-18),total_marks:50,pass_marks:20,status:"RESULT_PUBLISHED",published_at:iso(-15),created_at:iso(-30),updated_at:iso(-15),start_time:"17:00",duration:60,result_publication_note:"Reviewed with solution discussion."},
  {id:"exam-2",batch_id:"batch-hsc27",subject_id:"sub-hsc27-math",name:"Calculus Class Test",description:"Limits and differentiation",exam_type:"CLASS_TEST",exam_date:date(-7),total_marks:30,pass_marks:12,status:"RESULT_PUBLISHED",published_at:iso(-5),created_at:iso(-20),updated_at:iso(-5),start_time:"18:00",duration:40,result_publication_note:null},
  {id:"exam-3",batch_id:"batch-hsc26",subject_id:"sub-hsc26-phy",name:"Physics Model Test 04",description:"Full syllabus model test",exam_type:"MODEL_TEST",exam_date:date(5),total_marks:100,pass_marks:40,status:"SCHEDULED",published_at:null,created_at:iso(-10),updated_at:iso(-1),start_time:"16:00",duration:150,result_publication_note:null},
  {id:"exam-4",batch_id:"batch-admission",subject_id:"sub-adm-math",name:"Engineering Math Diagnostic",description:"Speed and accuracy diagnostic",exam_type:"MODEL_TEST",exam_date:date(-12),total_marks:100,pass_marks:45,status:"RESULT_PUBLISHED",published_at:iso(-10),created_at:iso(-25),updated_at:iso(-10),start_time:"15:30",duration:90,result_publication_note:"Merit ranking generated."},
  {id:"exam-5",batch_id:"batch-ssc27",subject_id:"sub-ssc-math",name:"Algebra Monthly Exam",description:"Monthly foundation assessment",exam_type:"MONTHLY_EXAM",exam_date:date(12),total_marks:80,pass_marks:32,status:"SCHEDULED",published_at:null,created_at:iso(-5),updated_at:iso(-1),start_time:"16:00",duration:90,result_publication_note:null},
  {id:"exam-6",batch_id:"batch-hsc26",subject_id:"sub-hsc26-math",name:"Calculus Revision Assessment",description:"Marks have been entered and are waiting for final publication.",exam_type:"CLASS_TEST",exam_date:date(-2),total_marks:40,pass_marks:16,status:"RESULT_DRAFT",published_at:null,created_at:iso(-9),updated_at:iso(-1),start_time:"18:30",duration:50,result_publication_note:null},
];

const examResults: DemoRow[] = [];
exams.filter(e=>e.status==="RESULT_PUBLISHED").forEach((exam, eidx) => {
  const eligible=enrollments.filter(en=>en.batch_id===exam.batch_id && en.status==="ACTIVE");
  eligible.forEach((en, idx) => {
    const marks=Math.max(exam.pass_marks-3, exam.total_marks-(idx*5+eidx*3+4));
    examResults.push({id:`result-${exam.id}-${idx+1}`,exam_id:exam.id,student_id:en.student_id,enrollment_id:en.id,obtained_marks:marks,attendance_status:"PRESENT",grade:marks/exam.total_marks>=.8?"A+":marks/exam.total_marks>=.7?"A":"B",remarks:idx===0?"Excellent analytical work":"Good progress",rank:idx+1,created_at:iso(-10),updated_at:iso(-5)});
  });
});

const academicAssignments: DemoRow[] = [
  {id:"assignment-1",batch_id:"batch-hsc27",subject_id:"sub-hsc27-phy",unit_id:"unit-1",title:"Vector Resolution Practice",description:"Solve the attached vector worksheet.",instructions:"Show all diagrams and intermediate steps.",assignment_type:"HOMEWORK",status:"PUBLISHED",assigned_at:iso(-5),due_at:iso(3),total_marks:20,allow_late_submission:true,resource_url:"/effy_edu_management_system/demo/worksheet.pdf",published_at:iso(-5),closed_at:null,created_by:"profile-teacher",updated_by:"profile-teacher",created_at:iso(-5),updated_at:iso(-2)},
  {id:"assignment-2",batch_id:"batch-hsc27",subject_id:"sub-hsc27-math",unit_id:"unit-4",title:"Differentiation Problem Set",description:"Complete 15 selected calculus problems.",instructions:"Upload a clear PDF or write your solution text.",assignment_type:"PRACTICE",status:"PUBLISHED",assigned_at:iso(-2),due_at:iso(6),total_marks:30,allow_late_submission:false,resource_url:null,published_at:iso(-2),closed_at:null,created_by:"profile-teacher",updated_by:"profile-teacher",created_at:iso(-2),updated_at:iso(-1)},
  {id:"assignment-3",batch_id:"batch-admission",subject_id:"sub-adm-phy",unit_id:"unit-7",title:"Mechanics Mini Project",description:"Model a two-body collision and explain conservation laws.",instructions:"Submit a one-page report.",assignment_type:"PROJECT",status:"PUBLISHED",assigned_at:iso(-8),due_at:iso(2),total_marks:40,allow_late_submission:true,resource_url:null,published_at:iso(-8),closed_at:null,created_by:"profile-teacher",updated_by:"profile-teacher",created_at:iso(-8),updated_at:iso(-1)},
];

const submissions: DemoRow[] = [
  {id:"submission-1",assignment_id:"assignment-1",student_id:"student-1",enrollment_id:"enroll-1-1",submission_text:"Completed all vector diagrams and calculations.",submission_url:null,status:"REVIEWED",submitted_at:iso(-1),marks_obtained:18,feedback:"Very good diagrams. Recheck question 7.",reviewed_by:"profile-teacher",reviewed_at:iso(0),created_at:iso(-1),updated_at:iso(0)},
  {id:"submission-2",assignment_id:"assignment-1",student_id:"student-2",enrollment_id:"enroll-2-1",submission_text:"Submitted the worksheet.",submission_url:null,status:"SUBMITTED",submitted_at:iso(-1),marks_obtained:null,feedback:null,reviewed_by:null,reviewed_at:null,created_at:iso(-1),updated_at:iso(-1)},
];

const classSessions: DemoRow[] = [
  {id:"session-1",batch_id:"batch-hsc27",subject_id:"sub-hsc27-phy",unit_id:"unit-1",title:"Vector Components & Relative Motion",description:"Concept lecture and guided examples",session_type:"LECTURE",session_date:date(1),start_time:"17:00",end_time:"18:30",status:"SCHEDULED",room_name:"Room A",meeting_url:null,notes:null,created_by:"profile-teacher",updated_by:"profile-teacher",completed_at:null,cancelled_at:null,created_at:iso(-5),updated_at:iso(-1)},
  {id:"session-2",batch_id:"batch-hsc27",subject_id:"sub-hsc27-math",unit_id:"unit-4",title:"Differentiation Techniques",description:"Chain rule and implicit differentiation",session_type:"LECTURE",session_date:date(3),start_time:"17:00",end_time:"18:30",status:"SCHEDULED",room_name:"Room A",meeting_url:null,notes:null,created_by:"profile-teacher",updated_by:"profile-teacher",completed_at:null,cancelled_at:null,created_at:iso(-5),updated_at:iso(-1)},
  {id:"session-3",batch_id:"batch-hsc26",subject_id:"sub-hsc26-phy",unit_id:"unit-5",title:"Electricity Model Test Review",description:"Script review and solution discussion",session_type:"EXAM_REVIEW",session_date:date(2),start_time:"18:30",end_time:"20:00",status:"SCHEDULED",room_name:"Room B",meeting_url:null,notes:null,created_by:"profile-teacher",updated_by:"profile-teacher",completed_at:null,cancelled_at:null,created_at:iso(-3),updated_at:iso(-1)},
  {id:"session-4",batch_id:"batch-admission",subject_id:"sub-adm-math",unit_id:"unit-8",title:"Admission Calculus Sprint",description:"Timed problem-solving class",session_type:"PRACTICE",session_date:date(4),start_time:"15:30",end_time:"17:30",status:"SCHEDULED",room_name:"Lab Room",meeting_url:null,notes:null,created_by:"profile-teacher",updated_by:"profile-teacher",completed_at:null,cancelled_at:null,created_at:iso(-4),updated_at:iso(-1)},
];

const batchContents: DemoRow[] = [
  {id:"content-1",batch_id:"batch-hsc27",subject_id:"sub-hsc27-phy",title:"Vector Formula Sheet",description:"Compact formulas, diagrams and common mistakes.",content_type:"PDF",storage_path:null,external_url:"/effy_edu_management_system/demo/vector-formulas.pdf",mime_type:"application/pdf",file_size:842000,status:"PUBLISHED",release_at:iso(-20),expires_at:null,allow_download:true,created_at:iso(-22),updated_at:iso(-2),published_at:iso(-20),published_by:"profile-teacher",created_by:"profile-teacher",updated_by:"profile-teacher",original_filename:"vector-formulas.pdf",page_count:8},
  {id:"content-2",batch_id:"batch-hsc27",subject_id:"sub-hsc27-math",title:"Calculus Concept Video",description:"Limits and derivatives visualized.",content_type:"YOUTUBE",storage_path:null,external_url:"https://www.youtube.com/watch?v=dQw4w9WgXcQ",mime_type:null,file_size:null,status:"PUBLISHED",release_at:iso(-12),expires_at:null,allow_download:false,created_at:iso(-13),updated_at:iso(-2),published_at:iso(-12),published_by:"profile-teacher",created_by:"profile-teacher",updated_by:"profile-teacher",original_filename:null,page_count:null},
  {id:"content-3",batch_id:"batch-hsc26",subject_id:"sub-hsc26-phy",title:"HSC Physics Model Test 04",description:"Full board-standard question set.",content_type:"PDF",storage_path:null,external_url:"/effy_edu_management_system/demo/model-test.pdf",mime_type:"application/pdf",file_size:1250000,status:"PUBLISHED",release_at:iso(-5),expires_at:null,allow_download:true,created_at:iso(-6),updated_at:iso(-2),published_at:iso(-5),published_by:"profile-teacher",created_by:"profile-teacher",updated_by:"profile-teacher",original_filename:"hsc-model-test.pdf",page_count:12},
  {id:"content-4",batch_id:"batch-admission",subject_id:"sub-adm-math",title:"Engineering Math Shortcuts",description:"Speed techniques for admission MCQ.",content_type:"NOTE",storage_path:null,external_url:null,mime_type:null,file_size:null,status:"PUBLISHED",release_at:iso(-8),expires_at:null,allow_download:false,created_at:iso(-9),updated_at:iso(-1),published_at:iso(-8),published_by:"profile-teacher",created_by:"profile-teacher",updated_by:"profile-teacher",original_filename:null,page_count:null},
];

const announcements: DemoRow[] = [
  {id:"announcement-1",batch_id:"batch-hsc27",subject_id:null,title:"Friday class rescheduled",message:"This Friday's class will start at 5:30 PM instead of 5:00 PM.",status:"PUBLISHED",published_at:iso(-1),release_at:iso(-1),expires_at:iso(7),published_by:"profile-teacher",created_by:"profile-teacher",updated_by:"profile-teacher",created_at:iso(-1),updated_at:iso(-1)},
  {id:"announcement-2",batch_id:"batch-hsc26",subject_id:null,title:"Model test syllabus published",message:"The complete syllabus and seating plan are now available in Materials.",status:"PUBLISHED",published_at:iso(-2),release_at:iso(-2),expires_at:null,published_by:"profile-teacher",created_by:"profile-teacher",updated_by:"profile-teacher",created_at:iso(-2),updated_at:iso(-2)},
  {id:"announcement-3",batch_id:"batch-admission",subject_id:null,title:"Special problem-solving marathon",message:"A three-hour mechanics and calculus marathon will be held this weekend.",status:"PUBLISHED",published_at:iso(-3),release_at:iso(-3),expires_at:null,published_by:"profile-teacher",created_by:"profile-teacher",updated_by:"profile-teacher",created_at:iso(-3),updated_at:iso(-3)},
];

const notifications: DemoRow[] = [
  {id:"notification-1",user_id:"profile-student-1",type:"EXAM_RESULT",title:"Result published",message:"Your Vector & Motion Weekly Exam result is now available.",related_entity_type:"EXAM",related_entity_id:"exam-1",read_at:null,created_at:iso(-5)},
  {id:"notification-2",user_id:"profile-student-1",type:"ASSIGNMENT",title:"New assignment",message:"Differentiation Problem Set has been assigned.",related_entity_type:"ASSIGNMENT",related_entity_id:"assignment-2",read_at:null,created_at:iso(-2)},
  {id:"notification-3",user_id:"profile-student-1",type:"PAYMENT",title:"Payment updated",message:"Your latest tuition payment has been confirmed.",related_entity_type:"PAYMENT",related_entity_id:"pay-1-0",read_at:iso(-1),created_at:iso(-3)},
  {id:"notification-teacher",user_id:"profile-teacher",type:"ENROLLMENT",title:"New registration pending",message:"A new student registration is waiting for review.",related_entity_type:"STUDENT",related_entity_id:"student-8",read_at:null,created_at:iso(-1)},
  {id:"notification-4",user_id:"profile-student-1",type:"ANNOUNCEMENT",title:"Class time updated",message:"The Friday class will begin at 5:30 PM.",related_entity_type:"ANNOUNCEMENT",related_entity_id:"announcement-1",read_at:null,created_at:iso(-1)},
  {id:"notification-teacher-2",user_id:"profile-teacher",type:"RESULT",title:"Result draft awaiting publication",message:"Calculus Revision Assessment is ready for final review.",related_entity_type:"EXAM",related_entity_id:"exam-6",read_at:null,created_at:iso(-1)},
];

const auditLogs: DemoRow[] = [
  {id:"audit-1",actor_user_id:"profile-teacher",action:"PUBLISH_RESULT",entity_type:"EXAM",entity_id:"exam-2",old_value:{status:"RESULT_DRAFT"},new_value:{status:"RESULT_PUBLISHED"},ip_address:"127.0.0.1",created_at:iso(-5)},
  {id:"audit-2",actor_user_id:"profile-teacher",action:"CONFIRM_PAYMENT",entity_type:"PAYMENT",entity_id:"pay-1-0",old_value:{status:"UNPAID"},new_value:{status:"PAID"},ip_address:"127.0.0.1",created_at:iso(-3)},
  {id:"audit-3",actor_user_id:"profile-teacher",action:"CREATE_ASSIGNMENT",entity_type:"ASSIGNMENT",entity_id:"assignment-2",old_value:null,new_value:{status:"PUBLISHED"},ip_address:"127.0.0.1",created_at:iso(-2)},
  {id:"audit-4",actor_user_id:"profile-teacher",action:"DISABLE_ENROLLMENT",entity_type:"ENROLLMENT",entity_id:"enroll-6-1",old_value:{status:"ACTIVE"},new_value:{status:"DISABLED"},ip_address:"127.0.0.1",created_at:iso(-4)},
  {id:"audit-5",actor_user_id:"profile-teacher",action:"SAVE_RESULT_DRAFT",entity_type:"EXAM",entity_id:"exam-6",old_value:{status:"SCHEDULED"},new_value:{status:"RESULT_DRAFT"},ip_address:"127.0.0.1",created_at:iso(-1)},
];

const batchProgress = batchSubjects.map((s:any,idx:number)=>({id:`progress-${idx+1}`,batch_id:s.batch_id,subject_id:s.id,completion_percentage:idx%3===0?68:idx%3===1?52:34,total_units:4,completed_units:idx%3,updated_at:iso(-1)}));
const subjectProgress = batchSubjects.map((s:any,idx:number)=>({subject_id:s.id,batch_id:s.batch_id,subject_name:s.name,status:s.status,total_units:4,completed_units:idx%3,completion_percentage:idx%3===0?68:idx%3===1?52:34}));
const studentPerformance = examResults.map((r:any)=>({student_id:r.student_id,batch_id:exams.find(e=>e.id===r.exam_id)?.batch_id,exam_id:r.exam_id,obtained_marks:r.obtained_marks,total_marks:exams.find(e=>e.id===r.exam_id)?.total_marks,percentage:Math.round(r.obtained_marks/(exams.find(e=>e.id===r.exam_id)?.total_marks||1)*100),grade:r.grade,rank:r.rank}));

export const demoTables: Record<string, DemoRow[]> = {
  profiles,
  student_profiles: studentProfiles,
  teacher_profiles:[{id:"teacher-1",profile_id:"profile-teacher",designation:"Lead Instructor & Academic Director",coaching_center_name:"EduPilot Coaching Academy",public_contact_info:"teacher@demo.edu | +880 1700-000001",created_at:iso(-600),updated_at:iso(-1)}],
  app_settings:[{id:true,coaching_center_name:"EduPilot Coaching Academy",short_name:"EduPilot",student_id_prefix:"EDU",public_phone:"+880 1700-000001",public_email:"hello@edupilot.demo",address:"Education Avenue, Dhaka, Bangladesh",default_currency:"BDT",default_timezone:"Asia/Dhaka",academic_session:"2026–2027",default_grading_scale:"STANDARD",pending_approval_contact_text:"Your registration is under review. Contact the academy for assistance.",disabled_account_contact_text:"Please contact the academy administrator.",student_rank_visible:true,completed_batches_visible:true,grades_displayed:true,updated_at:iso(-1)}],
  batches,
  batch_subjects:batchSubjects,
  subject_units:subjectUnits,
  enrollments,
  payments,
  exams,
  exam_results:examResults,
  academic_assignments:academicAssignments,
  academic_assignment_submissions:submissions,
  academic_class_sessions:classSessions,
  batch_contents:batchContents,
  announcements,
  notifications,
  audit_logs:auditLogs,
  batch_academic_progress:batchProgress,
  subject_progress_summary:subjectProgress,
  student_subject_performance:studentPerformance,
  rate_limits:[],
  site_settings:[{id:1,site_name:"EduPilot Coaching Academy",site_short_name:"EduPilot",tagline:"Concept-first learning. Measurable progress.",site_description:"A complete academic and admission coaching ecosystem.",primary_phone:"+880 1700-000001",secondary_phone:"+880 1700-000002",whatsapp_number:"8801700000001",email:"hello@edupilot.demo",address_line:"Education Avenue",city:"Dhaka",country:"Bangladesh"}],
};

export const getDemoUser = (role: "TEACHER" | "STUDENT" = "TEACHER") => role === "TEACHER"
  ? { id:"auth-teacher", email:"teacher@demo.edu", user_metadata:{full_name:"Dr. Arif Rahman"} }
  : { id:"auth-student", email:"student@demo.edu", user_metadata:{full_name:"Nafis Ahmed"} };
