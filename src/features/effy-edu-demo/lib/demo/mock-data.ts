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
  ["Abrar Hossain", "EDU-26009", "SSC 2027", "Ideal Science School"],
  ["Maliha Rahman", "EDU-26010", "SSC 2027", "Dhaka Scholars Academy"],
  ["Zayan Kabir", "EDU-26011", "SSC 2027", "Progressive Model School"],
  ["Farzana Haque", "EDU-26012", "SSC 2027", "Cantonment Public School"],
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
    teacher_note: index === 0
      ? "Strong analytical ability; should improve written presentation."
      : `Demo progress note: ${full_name} is following the weekly practice and feedback plan.`,
    registered_at: iso(-180 + index),
    updated_at: iso(-index),
  });
});

const batches: DemoRow[] = [
  { id:"batch-hsc27", name:"HSC 2027 Physics & Mathematics", code:"HSC27-PM", slug:"hsc-2027-physics-math", subject:"Physics & Higher Mathematics", academic_level:"HSC 2027", description:"Concept-first academic program with weekly assessment and guardian reporting.", start_date:date(-120), end_date:date(240), schedule:{days:"Sat, Mon, Wed",time:"5:00 PM"}, monthly_fee:4500, admission_fee:2000, capacity:30, status:"RUNNING", admission_open:true, cover_image_url:"/effy_edu_management_system/images/flyer_hsc26_hsc27.jpg", created_at:iso(-150), updated_at:iso(-2)},
  { id:"batch-hsc26", name:"HSC 2026 Final Revision", code:"HSC26-REV", slug:"hsc-2026-final-revision", subject:"Physics & Higher Mathematics", academic_level:"HSC 2026", description:"Board-focused revision, model tests and problem-solving marathons.", start_date:date(-60), end_date:date(100), schedule:{days:"Sun, Tue, Thu",time:"6:30 PM"}, monthly_fee:4200, admission_fee:1500, capacity:26, status:"RUNNING", admission_open:true, cover_image_url:"/effy_edu_management_system/images/flyer_revision_2026.jpg", created_at:iso(-90), updated_at:iso(-1)},
  { id:"batch-admission", name:"Engineering Admission Intensive", code:"ENG-ADM", slug:"engineering-admission-intensive", subject:"Physics, Mathematics & Chemistry", academic_level:"Admission", description:"High-intensity engineering admission preparation with analytics-driven model tests.", start_date:date(-35), end_date:date(140), schedule:{days:"Sat, Sun, Tue, Thu",time:"3:30 PM"}, monthly_fee:6500, admission_fee:2500, capacity:24, status:"RUNNING", admission_open:true, cover_image_url:"/effy_edu_management_system/images/flyer_admission_science.jpg", created_at:iso(-70), updated_at:iso(-1)},
  { id:"batch-ssc27", name:"SSC 2027 Science Foundation", code:"SSC27-SCI", slug:"ssc-2027-science-foundation", subject:"General Science & Mathematics", academic_level:"SSC 2027", description:"Foundational program for class 9–10 science students.", start_date:date(-80), end_date:date(300), schedule:{days:"Fri, Sun, Tue",time:"4:00 PM"}, monthly_fee:3500, admission_fee:1200, capacity:35, status:"OPEN", admission_open:true, cover_image_url:"/effy_edu_management_system/images/flyer_hsc26_hsc27.jpg", created_at:iso(-100), updated_at:iso(-3)},
  { id:"batch-hsc25", name:"HSC 2025 Board Mastery", code:"HSC25-MASTERY", slug:"hsc-2025-board-mastery", subject:"Physics & Higher Mathematics", academic_level:"HSC 2025", description:"Completed board preparation program preserved with results, resources and payment history.", start_date:date(-620), end_date:date(-260), schedule:{days:"Sat, Mon, Wed",time:"4:30 PM"}, monthly_fee:4000, admission_fee:1500, capacity:28, status:"COMPLETED", admission_open:false, cover_image_url:"/effy_edu_management_system/images/flyer_revision_2026.jpg", created_at:iso(-660), updated_at:iso(-250)},
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
  ["sub-hsc25-phy","batch-hsc25","Board Physics","PHY-25","COMPLETED","BLUE",1,50],
  ["sub-hsc25-math","batch-hsc25","Board Mathematics","HM-25","COMPLETED","VIOLET",2,50],
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
  ["unit-9","sub-adm-chem","Physical Chemistry Essentials","PLANNED",1],
  ["unit-10","sub-ssc-sci","Measurement & Motion","RUNNING",1],
  ["unit-11","sub-ssc-sci","Matter and Energy","PLANNED",2],
  ["unit-12","sub-ssc-math","Algebraic Expressions","COMPLETED",1],
  ["unit-13","sub-ssc-math","Geometry & Mensuration","RUNNING",2],
  ["unit-14","sub-hsc25-phy","Mechanics & Waves","COMPLETED",1],
  ["unit-15","sub-hsc25-phy","Electricity & Modern Physics","COMPLETED",2],
  ["unit-16","sub-hsc25-math","Calculus & Coordinate Geometry","COMPLETED",1],
  ["unit-17","sub-hsc25-math","Probability & Statistics","COMPLETED",2],
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

enrollments.push({
  id:"enroll-1-history",
  student_id:"student-1",
  batch_id:"batch-hsc25",
  status:"COMPLETED",
  approved_at:iso(-610),
  disabled_at:null,
  disable_reason:null,
  completed_at:iso(-260),
  created_at:iso(-620),
  updated_at:iso(-250),
});

const payments: DemoRow[] = [];
enrollments.filter(e=>e.status==="ACTIVE").forEach((e, idx) => {
  for (let monthOffset=0; monthOffset<3; monthOffset++) {
    const d=new Date(now); d.setMonth(d.getMonth()-monthOffset);
    const fee=batches.find(b=>b.id===e.batch_id)?.monthly_fee || 4000;
    const paid = monthOffset === 0 && idx % 4 === 0
      ? fee / 2
      : monthOffset === 0 && idx % 4 === 1
        ? 0
        : fee;
    const status = paid === fee ? "PAID" : paid > 0 ? "PARTIALLY_PAID" : "UNPAID";
    const paidAt = paid > 0 ? iso(-monthOffset * 28 - 2) : null;
    payments.push({
      id:`pay-${idx+1}-${monthOffset}`,
      student_id:e.student_id,
      enrollment_id:e.id,
      batch_id:e.batch_id,
      billing_month:d.getMonth()+1,
      billing_year:d.getFullYear(),
      expected_amount:fee,
      paid_amount:paid,
      status,
      payment_method:paid === 0 ? null : paid === fee ? "Cash" : "Bank Transfer",
      payment_date:paidAt,
      reference_number:paid === 0 ? null : `PAY-${d.getFullYear()}-${String(idx+1).padStart(4,"0")}`,
      confirmed_at:paidAt,
      teacher_note:status === "UNPAID" ? "Guardian reminder scheduled for the next counselling call." : null,
      student_note:status === "PARTIALLY_PAID" ? "Remaining balance will be cleared this week." : null,
      created_at:iso(-monthOffset*28-5),
      updated_at:iso(-2)
    });
  }
});

for (let monthOffset = 8; monthOffset < 12; monthOffset++) {
  const d = new Date(now);
  d.setMonth(d.getMonth() - monthOffset);
  payments.push({
    id:`pay-history-${monthOffset}`,
    student_id:"student-1",
    enrollment_id:"enroll-1-history",
    batch_id:"batch-hsc25",
    billing_month:d.getMonth()+1,
    billing_year:d.getFullYear(),
    expected_amount:4000,
    paid_amount:4000,
    status:"PAID",
    payment_method:monthOffset % 2 === 0 ? "Bank Transfer" : "Cash",
    payment_date:iso(-monthOffset*28-2),
    reference_number:`HIST-${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`,
    confirmed_at:iso(-monthOffset*28-2),
    teacher_note:"Historical payment retained for completed-batch reporting.",
    student_note:null,
    created_at:iso(-monthOffset*28-5),
    updated_at:iso(-monthOffset*28-2),
  });
}

const financeCategorySeed = [
  ["10000000-0000-4000-8000-000000000001", "RENT_UTILITY", "Rent & Utility", "#2563EB"],
  ["10000000-0000-4000-8000-000000000002", "SHEETS_PRINTING", "Sheets Making & Printing", "#7C3AED"],
  ["10000000-0000-4000-8000-000000000003", "QUESTIONS_PRINTING", "Question Making & Printing", "#DB2777"],
  ["10000000-0000-4000-8000-000000000004", "EXAM_GUARD", "Exam Guard", "#EA580C"],
  ["10000000-0000-4000-8000-000000000005", "SCRIPT_EVALUATION", "Exam Script Evaluation", "#D97706"],
  ["10000000-0000-4000-8000-000000000006", "STATIONERY", "Markers, Duster & Stationery", "#059669"],
  ["10000000-0000-4000-8000-000000000007", "TRANSPORT", "Transportation", "#0891B2"],
  ["10000000-0000-4000-8000-000000000008", "EVENTS", "Events & Student Programs", "#4F46E5"],
  ["10000000-0000-4000-8000-000000000009", "OTHER", "Other", "#64748B"],
];

const financeExpenseCategories: DemoRow[] = financeCategorySeed.map(
  ([id, code, name, color_hex], index) => ({
    id,
    code,
    name,
    color_hex,
    display_order: index + 1,
    is_active: true,
    created_at: iso(-360),
    updated_at: iso(-1),
  })
);

const financeDate = (monthOffset: number, day: number) => {
  const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - monthOffset, day));
  return d.toISOString().slice(0, 10);
};

const financeExpenses: DemoRow[] = [
  [1, 0, 4, "Academy classroom rent", 18000, "BANK_TRANSFER", "Urban Learning Space", "RNT-CURRENT", "Monthly classroom and office rent", "POSTED"],
  [2, 0, 7, "HSC revision sheets", 4250, "BKASH", "Scholars Print House", "SHEET-0726", "Physics and mathematics revision sheets", "POSTED"],
  [6, 0, 10, "Whiteboard markers and stationery", 1850, "CASH", "Campus Stationery", null, "Markers, paper, folders and dusters", "POSTED"],
  [4, 0, 14, "Weekly exam invigilation", 2400, "CASH", "Demo Invigilation Team", null, "Four weekly assessment sessions", "POSTED"],
  [5, 0, 18, "Model test script evaluation", 5600, "BANK_TRANSFER", "Academic Review Team", "EVAL-26-07", "HSC and admission model-test scripts", "POSTED"],
  [7, 0, 22, "Material delivery transport", 1200, "NAGAD", "City Courier", "TR-7821", "Printed material delivery", "VOID"],
  [9, 0, 24, "Student counselling refreshments", 1650, "CASH", "Academy Refreshment Desk", "OTHER-0726", "Refreshments for the monthly guardian and student counselling day", "POSTED"],
  [1, 1, 4, "Academy classroom rent", 18000, "BANK_TRANSFER", "Urban Learning Space", "RNT-PREV", "Monthly classroom and office rent", "POSTED"],
  [3, 1, 8, "Admission model-test questions", 6900, "BANK_TRANSFER", "Scholars Print House", "QST-0626", "Question preparation and secure printing", "POSTED"],
  [6, 1, 12, "Classroom supplies", 2150, "CASH", "Campus Stationery", null, "Board and classroom consumables", "POSTED"],
  [8, 1, 20, "Student success workshop", 8500, "BKASH", "Learning Event Services", "EVT-0626", "Workshop logistics and refreshments", "POSTED"],
  [1, 2, 4, "Academy classroom rent", 18000, "BANK_TRANSFER", "Urban Learning Space", "RNT-M02", "Monthly classroom and office rent", "POSTED"],
  [2, 2, 9, "Practice sheet printing", 3900, "CASH", "Scholars Print House", "SHEET-M02", "Batch practice sheets", "POSTED"],
  [1, 3, 4, "Academy classroom rent", 17500, "BANK_TRANSFER", "Urban Learning Space", "RNT-M03", "Monthly classroom and office rent", "POSTED"],
  [5, 3, 18, "Exam script evaluation", 4800, "BKASH", "Academic Review Team", "EVAL-M03", "Monthly exam evaluation", "POSTED"],
  [1, 5, 4, "Academy classroom rent", 17500, "BANK_TRANSFER", "Urban Learning Space", "RNT-M05", "Monthly classroom and office rent", "POSTED"],
  [8, 5, 23, "Guardian progress seminar", 7200, "CASH", "Demo Event Services", "EVT-M05", "Guardian reporting seminar", "POSTED"],
  [1, 8, 4, "Academy classroom rent", 16500, "BANK_TRANSFER", "Urban Learning Space", "RNT-M08", "Monthly classroom and office rent", "POSTED"],
  [3, 10, 15, "Annual question bank printing", 11200, "BANK_TRANSFER", "Scholars Print House", "QST-M10", "Annual question-bank production", "POSTED"],
].map(([categoryNumber, monthOffset, day, title, amount, payment_method, payee, reference_number, description, status], index) => ({
  id: `finance-expense-${index + 1}`,
  category_id: financeExpenseCategories[Number(categoryNumber) - 1].id,
  title,
  amount,
  expense_date: financeDate(Number(monthOffset), Number(day)),
  payment_method,
  payee,
  reference_number,
  description,
  receipt_storage_path: index === 0 ? "finance/receipts/demo-rent-receipt.txt" : null,
  receipt_file_name: index === 0 ? "academy-rent-receipt.txt" : null,
  receipt_content_type: index === 0 ? "text/plain; charset=utf-8" : null,
  receipt_size_bytes: index === 0 ? 238 : null,
  status,
  void_reason: status === "VOID" ? "Duplicate transport entry retained for audit demonstration." : null,
  voided_at: status === "VOID" ? iso(-3) : null,
  voided_by: status === "VOID" ? "profile-teacher" : null,
  created_by: "profile-teacher",
  updated_by: "profile-teacher",
  created_at: iso(-90 + index),
  updated_at: iso(-1),
}));

const financeIncomeLedger: DemoRow[] = payments
  .filter((payment) =>
    ["PAID", "PARTIALLY_PAID"].includes(payment.status) && Number(payment.paid_amount) > 0
  )
  .map((payment) => {
    const student = studentProfiles.find((item) => item.id === payment.student_id);
    const profile = profiles.find((item) => item.id === student?.profile_id);
    const batch = batches.find((item) => item.id === payment.batch_id);
    return {
      payment_id: payment.id,
      transaction_date: String(payment.payment_date || payment.confirmed_at).slice(0, 10),
      amount: Number(payment.paid_amount),
      status: payment.status,
      payment_method: String(payment.payment_method || "CASH").toUpperCase().replaceAll(" ", "_"),
      reference_number: payment.reference_number,
      billing_month: payment.billing_month,
      billing_year: payment.billing_year,
      student_id: payment.student_id,
      batch_id: payment.batch_id,
      student_code: student?.student_code || "EDU-DEMO",
      student_name: profile?.full_name || "Demo Student",
      batch_name: batch?.name || "Demo Batch",
      batch_code: batch?.code || "DEMO",
    };
  });

const exams: DemoRow[] = [
  {id:"exam-1",batch_id:"batch-hsc27",subject_id:"sub-hsc27-phy",name:"Vector & Motion Weekly Exam",description:"Conceptual and numerical assessment",exam_type:"WEEKLY_EXAM",exam_date:date(-18),total_marks:50,pass_marks:20,status:"RESULT_PUBLISHED",published_at:iso(-15),created_at:iso(-30),updated_at:iso(-15),start_time:"17:00",duration:60,result_publication_note:"Reviewed with solution discussion."},
  {id:"exam-2",batch_id:"batch-hsc27",subject_id:"sub-hsc27-math",name:"Calculus Class Test",description:"Limits and differentiation",exam_type:"CLASS_TEST",exam_date:date(-7),total_marks:30,pass_marks:12,status:"RESULT_PUBLISHED",published_at:iso(-5),created_at:iso(-20),updated_at:iso(-5),start_time:"18:00",duration:40,result_publication_note:null},
  {id:"exam-3",batch_id:"batch-hsc26",subject_id:"sub-hsc26-phy",name:"Physics Model Test 04",description:"Full syllabus model test",exam_type:"MODEL_TEST",exam_date:date(5),total_marks:100,pass_marks:40,status:"SCHEDULED",published_at:null,created_at:iso(-10),updated_at:iso(-1),start_time:"16:00",duration:150,result_publication_note:null},
  {id:"exam-4",batch_id:"batch-admission",subject_id:"sub-adm-math",name:"Engineering Math Diagnostic",description:"Speed and accuracy diagnostic",exam_type:"MODEL_TEST",exam_date:date(-12),total_marks:100,pass_marks:45,status:"RESULT_PUBLISHED",published_at:iso(-10),created_at:iso(-25),updated_at:iso(-10),start_time:"15:30",duration:90,result_publication_note:"Merit ranking generated."},
  {id:"exam-5",batch_id:"batch-ssc27",subject_id:"sub-ssc-math",name:"Algebra Monthly Exam",description:"Monthly foundation assessment",exam_type:"MONTHLY_EXAM",exam_date:date(12),total_marks:80,pass_marks:32,status:"SCHEDULED",published_at:null,created_at:iso(-5),updated_at:iso(-1),start_time:"16:00",duration:90,result_publication_note:null},
  {id:"exam-6",batch_id:"batch-hsc26",subject_id:"sub-hsc26-math",name:"Calculus Revision Assessment",description:"Marks have been entered and are waiting for final publication.",exam_type:"CLASS_TEST",exam_date:date(-2),total_marks:40,pass_marks:16,status:"RESULT_DRAFT",published_at:null,created_at:iso(-9),updated_at:iso(-1),start_time:"18:30",duration:50,result_publication_note:null},
  {id:"exam-7",batch_id:"batch-ssc27",subject_id:"sub-ssc-sci",name:"Motion & Measurement Class Test",description:"Concept check with short numerical problems.",exam_type:"CLASS_TEST",exam_date:date(-9),total_marks:30,pass_marks:12,status:"RESULT_PUBLISHED",published_at:iso(-7),created_at:iso(-18),updated_at:iso(-7),start_time:"16:00",duration:45,result_publication_note:"Answer scripts reviewed in the next class."},
  {id:"exam-8",batch_id:"batch-admission",subject_id:"sub-adm-chem",name:"Chemistry Speed Drill",description:"MCQ speed and accuracy practice.",exam_type:"QUIZ",exam_date:date(9),total_marks:50,pass_marks:25,status:"DRAFT",published_at:null,created_at:iso(-3),updated_at:iso(-1),start_time:"15:30",duration:35,result_publication_note:null},
  {id:"exam-9",batch_id:"batch-hsc26",subject_id:"sub-hsc26-phy",name:"Electricity Revision Test",description:"Completed assessment awaiting marks entry.",exam_type:"WEEKLY_EXAM",exam_date:date(-4),total_marks:50,pass_marks:20,status:"COMPLETED",published_at:null,created_at:iso(-14),updated_at:iso(-3),start_time:"18:30",duration:60,result_publication_note:null},
  {id:"exam-10",batch_id:"batch-hsc25",subject_id:"sub-hsc25-phy",name:"HSC 2025 Final Physics Model Test",description:"Archived board-standard final model test.",exam_type:"MODEL_TEST",exam_date:date(-285),total_marks:100,pass_marks:40,status:"RESULT_PUBLISHED",published_at:iso(-282),created_at:iso(-310),updated_at:iso(-280),start_time:"10:00",duration:150,result_publication_note:"Historical merit list retained for progress reporting."},
  {id:"exam-11",batch_id:"batch-hsc25",subject_id:"sub-hsc25-math",name:"HSC 2025 Mathematics Final",description:"Completed-batch final mathematics assessment.",exam_type:"MODEL_TEST",exam_date:date(-275),total_marks:100,pass_marks:40,status:"RESULT_PUBLISHED",published_at:iso(-272),created_at:iso(-300),updated_at:iso(-270),start_time:"10:00",duration:150,result_publication_note:"Final result archived with the completed batch."},
];

const examResults: DemoRow[] = [];
exams.filter(e=>e.status==="RESULT_PUBLISHED").forEach((exam, eidx) => {
  const eligible=enrollments.filter(en=>en.batch_id===exam.batch_id && ["ACTIVE","COMPLETED"].includes(en.status));
  eligible.forEach((en, idx) => {
    const marks=Math.max(exam.pass_marks-3, exam.total_marks-(idx*5+eidx*3+4));
    examResults.push({id:`result-${exam.id}-${idx+1}`,exam_id:exam.id,student_id:en.student_id,enrollment_id:en.id,obtained_marks:marks,attendance_status:"PRESENT",grade:marks/exam.total_marks>=.8?"A+":marks/exam.total_marks>=.7?"A":"B",remarks:idx===0?"Excellent analytical work":"Good progress",rank:idx+1,created_at:iso(-10),updated_at:iso(-5)});
  });
});

enrollments
  .filter((en) => en.batch_id === "batch-hsc26" && en.status === "ACTIVE")
  .forEach((en, idx) => {
    const marks = 35 - idx * 4;
    examResults.push({
      id:`result-exam-6-${idx+1}`,
      exam_id:"exam-6",
      student_id:en.student_id,
      enrollment_id:en.id,
      obtained_marks:marks,
      attendance_status:idx === 2 ? "ABSENT" : "PRESENT",
      grade:idx === 0 ? "A+" : idx === 1 ? "A" : null,
      remarks:idx === 2 ? "Make-up assessment required." : "Draft marks pending publication review.",
      rank:null,
      created_at:iso(-2),
      updated_at:iso(-1),
    });
  });

const academicAssignments: DemoRow[] = [
  {id:"assignment-1",batch_id:"batch-hsc27",subject_id:"sub-hsc27-phy",unit_id:"unit-1",title:"Vector Resolution Practice",description:"Solve the attached vector worksheet.",instructions:"Show all diagrams and intermediate steps.",assignment_type:"HOMEWORK",status:"PUBLISHED",assigned_at:iso(-5),due_at:iso(3),total_marks:20,allow_late_submission:true,resource_url:"/effy_edu_management_system/demo/worksheet.pdf",published_at:iso(-5),closed_at:null,created_by:"profile-teacher",updated_by:"profile-teacher",created_at:iso(-5),updated_at:iso(-2)},
  {id:"assignment-2",batch_id:"batch-hsc27",subject_id:"sub-hsc27-math",unit_id:"unit-4",title:"Differentiation Problem Set",description:"Complete 15 selected calculus problems.",instructions:"Upload a clear PDF or write your solution text.",assignment_type:"PRACTICE",status:"PUBLISHED",assigned_at:iso(-2),due_at:iso(6),total_marks:30,allow_late_submission:false,resource_url:null,published_at:iso(-2),closed_at:null,created_by:"profile-teacher",updated_by:"profile-teacher",created_at:iso(-2),updated_at:iso(-1)},
  {id:"assignment-3",batch_id:"batch-admission",subject_id:"sub-adm-phy",unit_id:"unit-7",title:"Mechanics Mini Project",description:"Model a two-body collision and explain conservation laws.",instructions:"Submit a one-page report.",assignment_type:"PROJECT",status:"PUBLISHED",assigned_at:iso(-8),due_at:iso(2),total_marks:40,allow_late_submission:true,resource_url:null,published_at:iso(-8),closed_at:null,created_by:"profile-teacher",updated_by:"profile-teacher",created_at:iso(-8),updated_at:iso(-1)},
  {id:"assignment-4",batch_id:"batch-hsc26",subject_id:"sub-hsc26-phy",unit_id:"unit-5",title:"Electricity Revision Worksheet",description:"Board-focused electricity and circuit problems.",instructions:"Complete every derivation and mark difficult questions.",assignment_type:"HOMEWORK",status:"PUBLISHED",assigned_at:iso(-6),due_at:iso(1),total_marks:25,allow_late_submission:true,resource_url:"/effy_edu_management_system/demo/worksheet.pdf",published_at:iso(-6),closed_at:null,created_by:"profile-teacher",updated_by:"profile-teacher",created_at:iso(-7),updated_at:iso(-1)},
  {id:"assignment-5",batch_id:"batch-ssc27",subject_id:"sub-ssc-sci",unit_id:"unit-10",title:"Motion Observation Journal",description:"Record five real-life examples of motion and measurement.",instructions:"Add a short explanation and unit for every observation.",assignment_type:"PROJECT",status:"PUBLISHED",assigned_at:iso(-4),due_at:iso(8),total_marks:20,allow_late_submission:false,resource_url:null,published_at:iso(-4),closed_at:null,created_by:"profile-teacher",updated_by:"profile-teacher",created_at:iso(-5),updated_at:iso(-1)},
  {id:"assignment-6",batch_id:"batch-ssc27",subject_id:"sub-ssc-math",unit_id:"unit-12",title:"Algebra Practice Set",description:"Practice factorization and algebraic identities.",instructions:"Solve the selected 20 problems in order.",assignment_type:"PRACTICE",status:"PUBLISHED",assigned_at:iso(-10),due_at:iso(-1),total_marks:20,allow_late_submission:true,resource_url:"/effy_edu_management_system/demo/worksheet.pdf",published_at:iso(-10),closed_at:null,created_by:"profile-teacher",updated_by:"profile-teacher",created_at:iso(-11),updated_at:iso(-1)},
  {id:"assignment-7",batch_id:"batch-admission",subject_id:"sub-adm-chem",unit_id:"unit-9",title:"Chemistry Formula Sprint",description:"Prepare a compact physical chemistry formula map.",instructions:"Keep the final sheet within two pages.",assignment_type:"PRACTICE",status:"DRAFT",assigned_at:null,due_at:iso(12),total_marks:15,allow_late_submission:false,resource_url:null,published_at:null,closed_at:null,created_by:"profile-teacher",updated_by:"profile-teacher",created_at:iso(-2),updated_at:iso(-1)},
  {id:"assignment-8",batch_id:"batch-hsc25",subject_id:"sub-hsc25-math",unit_id:"unit-16",title:"Final Calculus Portfolio",description:"Historical final coursework from the completed HSC 2025 batch.",instructions:"Archived after teacher review and result publication.",assignment_type:"PROJECT",status:"CLOSED",assigned_at:iso(-310),due_at:iso(-290),total_marks:50,allow_late_submission:false,resource_url:"/effy_edu_management_system/demo/model-test.pdf",published_at:iso(-310),closed_at:iso(-286),created_by:"profile-teacher",updated_by:"profile-teacher",created_at:iso(-312),updated_at:iso(-286)},
  {id:"assignment-9",batch_id:"batch-hsc27",subject_id:"sub-hsc27-phy",unit_id:"unit-2",title:"Newtonian Mechanics Preview",description:"Prepare the next chapter through guided concept questions.",instructions:"Answer the ten preview questions before the next physics class.",assignment_type:"HOMEWORK",status:"PUBLISHED",assigned_at:iso(0),due_at:iso(7),total_marks:20,allow_late_submission:false,resource_url:"/effy_edu_management_system/demo/worksheet.pdf",published_at:iso(0),closed_at:null,created_by:"profile-teacher",updated_by:"profile-teacher",created_at:iso(0),updated_at:iso(0)},
];

const submissions: DemoRow[] = [
  {id:"submission-1",assignment_id:"assignment-1",student_id:"student-1",enrollment_id:"enroll-1-1",submission_text:"Completed all vector diagrams and calculations.",submission_url:null,status:"REVIEWED",submitted_at:iso(-1),marks_obtained:18,feedback:"Very good diagrams. Recheck question 7.",reviewed_by:"profile-teacher",reviewed_at:iso(0),created_at:iso(-1),updated_at:iso(0)},
  {id:"submission-2",assignment_id:"assignment-1",student_id:"student-2",enrollment_id:"enroll-2-1",submission_text:"Submitted the worksheet.",submission_url:null,status:"SUBMITTED",submitted_at:iso(-1),marks_obtained:null,feedback:null,reviewed_by:null,reviewed_at:null,created_at:iso(-1),updated_at:iso(-1)},
  {id:"submission-3",assignment_id:"assignment-2",student_id:"student-1",enrollment_id:"enroll-1-1",submission_text:"Solved all differentiation problems with graphs.",submission_url:null,status:"SUBMITTED",submitted_at:iso(0),marks_obtained:null,feedback:null,reviewed_by:null,reviewed_at:null,created_at:iso(0),updated_at:iso(0)},
  {id:"submission-4",assignment_id:"assignment-4",student_id:"student-1",enrollment_id:"enroll-1-2",submission_text:"Electricity revision worksheet completed.",submission_url:null,status:"REVIEWED",submitted_at:iso(-2),marks_obtained:23,feedback:"Accurate derivations and clear circuit diagrams.",reviewed_by:"profile-teacher",reviewed_at:iso(-1),created_at:iso(-2),updated_at:iso(-1)},
  {id:"submission-5",assignment_id:"assignment-4",student_id:"student-2",enrollment_id:"enroll-2-2",submission_text:"Attached the completed circuit practice.",submission_url:"/effy_edu_management_system/demo/worksheet.pdf",status:"SUBMITTED",submitted_at:iso(-1),marks_obtained:null,feedback:null,reviewed_by:null,reviewed_at:null,created_at:iso(-1),updated_at:iso(-1)},
  {id:"submission-6",assignment_id:"assignment-5",student_id:"student-9",enrollment_id:"enroll-9-1",submission_text:"Five motion observations with SI units.",submission_url:null,status:"REVIEWED",submitted_at:iso(-1),marks_obtained:19,feedback:"Excellent real-life examples.",reviewed_by:"profile-teacher",reviewed_at:iso(0),created_at:iso(-1),updated_at:iso(0)},
  {id:"submission-7",assignment_id:"assignment-6",student_id:"student-10",enrollment_id:"enroll-10-1",submission_text:"Algebra set completed in the notebook.",submission_url:null,status:"LATE",submitted_at:iso(0),marks_obtained:null,feedback:null,reviewed_by:null,reviewed_at:null,created_at:iso(0),updated_at:iso(0)},
  {id:"submission-8",assignment_id:"assignment-8",student_id:"student-1",enrollment_id:"enroll-1-history",submission_text:"Archived final calculus portfolio.",submission_url:"/effy_edu_management_system/demo/model-test.pdf",status:"REVIEWED",submitted_at:iso(-291),marks_obtained:46,feedback:"Strong final portfolio with complete corrections.",reviewed_by:"profile-teacher",reviewed_at:iso(-288),created_at:iso(-291),updated_at:iso(-288)},
];

const classSessions: DemoRow[] = [
  {id:"session-1",batch_id:"batch-hsc27",subject_id:"sub-hsc27-phy",unit_id:"unit-1",title:"Vector Components & Relative Motion",description:"Concept lecture and guided examples",session_type:"LECTURE",session_date:date(1),start_time:"17:00",end_time:"18:30",status:"SCHEDULED",room_name:"Room A",meeting_url:null,notes:null,created_by:"profile-teacher",updated_by:"profile-teacher",completed_at:null,cancelled_at:null,created_at:iso(-5),updated_at:iso(-1)},
  {id:"session-2",batch_id:"batch-hsc27",subject_id:"sub-hsc27-math",unit_id:"unit-4",title:"Differentiation Techniques",description:"Chain rule and implicit differentiation",session_type:"LECTURE",session_date:date(3),start_time:"17:00",end_time:"18:30",status:"SCHEDULED",room_name:"Room A",meeting_url:null,notes:null,created_by:"profile-teacher",updated_by:"profile-teacher",completed_at:null,cancelled_at:null,created_at:iso(-5),updated_at:iso(-1)},
  {id:"session-3",batch_id:"batch-hsc26",subject_id:"sub-hsc26-phy",unit_id:"unit-5",title:"Electricity Model Test Review",description:"Script review and solution discussion",session_type:"EXAM_REVIEW",session_date:date(2),start_time:"18:30",end_time:"20:00",status:"SCHEDULED",room_name:"Room B",meeting_url:null,notes:null,created_by:"profile-teacher",updated_by:"profile-teacher",completed_at:null,cancelled_at:null,created_at:iso(-3),updated_at:iso(-1)},
  {id:"session-4",batch_id:"batch-admission",subject_id:"sub-adm-math",unit_id:"unit-8",title:"Admission Calculus Sprint",description:"Timed problem-solving class",session_type:"PRACTICE",session_date:date(4),start_time:"15:30",end_time:"17:30",status:"SCHEDULED",room_name:"Lab Room",meeting_url:null,notes:null,created_by:"profile-teacher",updated_by:"profile-teacher",completed_at:null,cancelled_at:null,created_at:iso(-4),updated_at:iso(-1)},
  {id:"session-5",batch_id:"batch-hsc27",subject_id:"sub-hsc27-phy",unit_id:"unit-1",title:"Vector Worksheet Review",description:"Detailed review of assignment errors and shortcuts.",session_type:"REVISION",session_date:date(-3),start_time:"17:00",end_time:"18:30",status:"COMPLETED",room_name:"Room A",meeting_url:null,notes:"Class completed with a ten-minute guardian update.",created_by:"profile-teacher",updated_by:"profile-teacher",completed_at:iso(-3,19),cancelled_at:null,created_at:iso(-12),updated_at:iso(-3)},
  {id:"session-6",batch_id:"batch-hsc26",subject_id:"sub-hsc26-math",unit_id:"unit-6",title:"Calculus Board Problem Marathon",description:"Timed board problems and peer review.",session_type:"EXAM_PREP",session_date:date(-1),start_time:"18:30",end_time:"20:30",status:"COMPLETED",room_name:"Room B",meeting_url:null,notes:"All planned problems completed.",created_by:"profile-teacher",updated_by:"profile-teacher",completed_at:iso(-1,21),cancelled_at:null,created_at:iso(-10),updated_at:iso(-1)},
  {id:"session-7",batch_id:"batch-admission",subject_id:"sub-adm-phy",unit_id:"unit-7",title:"Mechanics Doubt-Clearing Lab",description:"Targeted support for projectile and collision problems.",session_type:"EXTRA_CLASS",session_date:date(1),start_time:"15:30",end_time:"17:00",status:"SCHEDULED",room_name:"Lab Room",meeting_url:"https://meet.example.com/edupilot-mechanics",notes:"Bring the mechanics diagnostic sheet.",created_by:"profile-teacher",updated_by:"profile-teacher",completed_at:null,cancelled_at:null,created_at:iso(-6),updated_at:iso(-1)},
  {id:"session-8",batch_id:"batch-ssc27",subject_id:"sub-ssc-sci",unit_id:"unit-10",title:"Measurement Practical Class",description:"Hands-on measurement and error calculation.",session_type:"REGULAR",session_date:date(2),start_time:"16:00",end_time:"17:30",status:"SCHEDULED",room_name:"Science Corner",meeting_url:null,notes:"Bring ruler, stopwatch and calculator.",created_by:"profile-teacher",updated_by:"profile-teacher",completed_at:null,cancelled_at:null,created_at:iso(-4),updated_at:iso(-1)},
  {id:"session-9",batch_id:"batch-ssc27",subject_id:"sub-ssc-math",unit_id:"unit-13",title:"Geometry Revision Class",description:"Cancelled demonstration record retained in the routine.",session_type:"REVISION",session_date:date(-2),start_time:"16:00",end_time:"17:30",status:"CANCELLED",room_name:"Room C",meeting_url:null,notes:"Rescheduled because of the academy event.",created_by:"profile-teacher",updated_by:"profile-teacher",completed_at:null,cancelled_at:iso(-2),created_at:iso(-9),updated_at:iso(-2)},
  {id:"session-10",batch_id:"batch-hsc25",subject_id:"sub-hsc25-phy",unit_id:"unit-15",title:"Final Physics Revision Camp",description:"Archived final revision session from the completed batch.",session_type:"EXAM_PREP",session_date:date(-286),start_time:"10:00",end_time:"13:00",status:"COMPLETED",room_name:"Assessment Hall",meeting_url:null,notes:"Completed batch archive.",created_by:"profile-teacher",updated_by:"profile-teacher",completed_at:iso(-286,13),cancelled_at:null,created_at:iso(-300),updated_at:iso(-286)},
].map((session) => ({
  ...session,
  starts_at: `${session.session_date}T${session.start_time}:00+06:00`,
  ends_at: `${session.session_date}T${session.end_time}:00+06:00`,
  location: session.room_name,
  class_link: session.meeting_url,
  student_note: session.notes,
}));

const batchContents: DemoRow[] = [
  {id:"content-1",batch_id:"batch-hsc27",subject_id:"sub-hsc27-phy",title:"Vector Formula Sheet",description:"Compact formulas, diagrams and common mistakes.",content_type:"PDF",storage_path:null,external_url:"/effy_edu_management_system/demo/vector-formulas.pdf",mime_type:"application/pdf",file_size:842000,status:"PUBLISHED",release_at:iso(-20),expires_at:null,allow_download:true,created_at:iso(-22),updated_at:iso(-2),published_at:iso(-20),published_by:"profile-teacher",created_by:"profile-teacher",updated_by:"profile-teacher",original_filename:"vector-formulas.pdf",page_count:8},
  {id:"content-2",batch_id:"batch-hsc27",subject_id:"sub-hsc27-math",title:"Calculus Concept Video",description:"Limits and derivatives visualized.",content_type:"YOUTUBE",storage_path:null,external_url:"https://www.youtube.com/watch?v=dQw4w9WgXcQ",mime_type:null,file_size:null,status:"PUBLISHED",release_at:iso(-12),expires_at:null,allow_download:false,created_at:iso(-13),updated_at:iso(-2),published_at:iso(-12),published_by:"profile-teacher",created_by:"profile-teacher",updated_by:"profile-teacher",original_filename:null,page_count:null},
  {id:"content-3",batch_id:"batch-hsc26",subject_id:"sub-hsc26-phy",title:"HSC Physics Model Test 04",description:"Full board-standard question set.",content_type:"PDF",storage_path:null,external_url:"/effy_edu_management_system/demo/model-test.pdf",mime_type:"application/pdf",file_size:1250000,status:"PUBLISHED",release_at:iso(-5),expires_at:null,allow_download:true,created_at:iso(-6),updated_at:iso(-2),published_at:iso(-5),published_by:"profile-teacher",created_by:"profile-teacher",updated_by:"profile-teacher",original_filename:"hsc-model-test.pdf",page_count:12},
  {id:"content-4",batch_id:"batch-admission",subject_id:"sub-adm-math",title:"Engineering Math Shortcuts",description:"Speed techniques for admission MCQ.",content_type:"NOTE",storage_path:null,external_url:null,mime_type:null,file_size:null,status:"PUBLISHED",release_at:iso(-8),expires_at:null,allow_download:false,created_at:iso(-9),updated_at:iso(-1),published_at:iso(-8),published_by:"profile-teacher",created_by:"profile-teacher",updated_by:"profile-teacher",original_filename:null,page_count:null},
  {id:"content-5",batch_id:"batch-hsc27",subject_id:"sub-hsc27-math",title:"Differentiation Practice Worksheet",description:"Worked examples followed by graded practice problems.",content_type:"PDF",storage_path:null,external_url:"/effy_edu_management_system/demo/worksheet.pdf",mime_type:"application/pdf",file_size:620000,status:"PUBLISHED",release_at:iso(-4),expires_at:null,allow_download:true,created_at:iso(-5),updated_at:iso(-1),published_at:iso(-4),published_by:"profile-teacher",created_by:"profile-teacher",updated_by:"profile-teacher",original_filename:"differentiation-practice.pdf",page_count:6},
  {id:"content-6",batch_id:"batch-hsc26",subject_id:"sub-hsc26-math",title:"Calculus Final Revision Map",description:"Chapter priorities, common mistakes and final-week plan.",content_type:"NOTE",storage_path:null,external_url:null,mime_type:null,file_size:null,status:"PUBLISHED",release_at:iso(-3),expires_at:null,allow_download:false,created_at:iso(-4),updated_at:iso(-1),published_at:iso(-3),published_by:"profile-teacher",created_by:"profile-teacher",updated_by:"profile-teacher",original_filename:null,page_count:null},
  {id:"content-7",batch_id:"batch-admission",subject_id:"sub-adm-phy",title:"Mechanics Model Test",description:"Admission-standard mechanics question set with time plan.",content_type:"PDF",storage_path:null,external_url:"/effy_edu_management_system/demo/model-test.pdf",mime_type:"application/pdf",file_size:1250000,status:"PUBLISHED",release_at:iso(-6),expires_at:null,allow_download:true,created_at:iso(-7),updated_at:iso(-1),published_at:iso(-6),published_by:"profile-teacher",created_by:"profile-teacher",updated_by:"profile-teacher",original_filename:"admission-mechanics-model-test.pdf",page_count:12},
  {id:"content-8",batch_id:"batch-admission",subject_id:"sub-adm-chem",title:"Physical Chemistry Formula Deck",description:"Formula deck prepared for the upcoming chemistry unit.",content_type:"PDF",storage_path:null,external_url:"/effy_edu_management_system/demo/vector-formulas.pdf",mime_type:"application/pdf",file_size:842000,status:"DRAFT",release_at:iso(4),expires_at:null,allow_download:true,created_at:iso(-2),updated_at:iso(-1),published_at:null,published_by:null,created_by:"profile-teacher",updated_by:"profile-teacher",original_filename:"chemistry-formula-deck.pdf",page_count:8},
  {id:"content-9",batch_id:"batch-ssc27",subject_id:"sub-ssc-sci",title:"Measurement & Motion Notes",description:"Illustrated notes with SI units and measurement examples.",content_type:"PDF",storage_path:null,external_url:"/effy_edu_management_system/demo/vector-formulas.pdf",mime_type:"application/pdf",file_size:842000,status:"PUBLISHED",release_at:iso(-8),expires_at:null,allow_download:true,created_at:iso(-9),updated_at:iso(-1),published_at:iso(-8),published_by:"profile-teacher",created_by:"profile-teacher",updated_by:"profile-teacher",original_filename:"measurement-motion-notes.pdf",page_count:8},
  {id:"content-10",batch_id:"batch-ssc27",subject_id:"sub-ssc-math",title:"Algebra Identity Worksheet",description:"Foundation worksheet for factorization and identities.",content_type:"PDF",storage_path:null,external_url:"/effy_edu_management_system/demo/worksheet.pdf",mime_type:"application/pdf",file_size:620000,status:"PUBLISHED",release_at:iso(-7),expires_at:null,allow_download:true,created_at:iso(-8),updated_at:iso(-1),published_at:iso(-7),published_by:"profile-teacher",created_by:"profile-teacher",updated_by:"profile-teacher",original_filename:"algebra-identity-worksheet.pdf",page_count:6},
  {id:"content-11",batch_id:"batch-hsc25",subject_id:"sub-hsc25-phy",title:"HSC 2025 Physics Final Archive",description:"Final question set and revision resource retained for the completed batch.",content_type:"PDF",storage_path:null,external_url:"/effy_edu_management_system/demo/model-test.pdf",mime_type:"application/pdf",file_size:1250000,status:"ARCHIVED",release_at:iso(-300),expires_at:null,allow_download:true,created_at:iso(-305),updated_at:iso(-260),published_at:iso(-300),published_by:"profile-teacher",created_by:"profile-teacher",updated_by:"profile-teacher",original_filename:"hsc-2025-physics-final.pdf",page_count:12},
];

const announcements: DemoRow[] = [
  {id:"announcement-1",batch_id:"batch-hsc27",subject_id:null,title:"Friday class rescheduled",message:"This Friday's class will start at 5:30 PM instead of 5:00 PM.",status:"PUBLISHED",published_at:iso(-1),release_at:iso(-1),expires_at:iso(7),published_by:"profile-teacher",created_by:"profile-teacher",updated_by:"profile-teacher",created_at:iso(-1),updated_at:iso(-1)},
  {id:"announcement-2",batch_id:"batch-hsc26",subject_id:null,title:"Model test syllabus published",message:"The complete syllabus and seating plan are now available in Materials.",status:"PUBLISHED",published_at:iso(-2),release_at:iso(-2),expires_at:null,published_by:"profile-teacher",created_by:"profile-teacher",updated_by:"profile-teacher",created_at:iso(-2),updated_at:iso(-2)},
  {id:"announcement-3",batch_id:"batch-admission",subject_id:null,title:"Special problem-solving marathon",message:"A three-hour mechanics and calculus marathon will be held this weekend.",status:"PUBLISHED",published_at:iso(-3),release_at:iso(-3),expires_at:null,published_by:"profile-teacher",created_by:"profile-teacher",updated_by:"profile-teacher",created_at:iso(-3),updated_at:iso(-3)},
  {id:"announcement-4",batch_id:"batch-ssc27",subject_id:"sub-ssc-sci",title:"Science practical materials",message:"Bring a ruler, stopwatch and calculator for the measurement practical class.",status:"PUBLISHED",published_at:iso(-1),release_at:iso(-1),expires_at:iso(4),published_by:"profile-teacher",created_by:"profile-teacher",updated_by:"profile-teacher",created_at:iso(-2),updated_at:iso(-1)},
  {id:"announcement-5",batch_id:"batch-hsc27",subject_id:"sub-hsc27-math",title:"Differentiation worksheet deadline",message:"Submit the differentiation worksheet before the next mathematics class.",status:"PUBLISHED",published_at:iso(-2),release_at:iso(-2),expires_at:iso(6),published_by:"profile-teacher",created_by:"profile-teacher",updated_by:"profile-teacher",created_at:iso(-3),updated_at:iso(-2)},
  {id:"announcement-6",batch_id:"batch-hsc26",subject_id:"sub-hsc26-phy",title:"Guardian progress briefing",message:"The monthly guardian progress briefing will be held after Thursday's revision class.",status:"PUBLISHED",published_at:iso(-1),release_at:iso(-1),expires_at:iso(5),published_by:"profile-teacher",created_by:"profile-teacher",updated_by:"profile-teacher",created_at:iso(-2),updated_at:iso(-1)},
  {id:"announcement-7",batch_id:"batch-admission",subject_id:"sub-adm-chem",title:"Chemistry module preview",message:"The physical chemistry module and diagnostic quiz will open next week.",status:"DRAFT",published_at:null,release_at:iso(5),expires_at:null,published_by:null,created_by:"profile-teacher",updated_by:"profile-teacher",created_at:iso(-1),updated_at:iso(-1)},
  {id:"announcement-8",batch_id:"batch-hsc25",subject_id:null,title:"HSC 2025 program completed",message:"Final results, resources and payment records are preserved in the completed-batch archive.",status:"ARCHIVED",published_at:iso(-260),release_at:iso(-260),expires_at:null,published_by:"profile-teacher",created_by:"profile-teacher",updated_by:"profile-teacher",created_at:iso(-262),updated_at:iso(-250)},
];

const notifications: DemoRow[] = [
  {id:"notification-1",user_id:"profile-student-1",type:"EXAM_RESULT",title:"Result published",message:"Your Vector & Motion Weekly Exam result is now available.",related_entity_type:"EXAM",related_entity_id:"exam-1",read_at:null,created_at:iso(-5)},
  {id:"notification-2",user_id:"profile-student-1",type:"ASSIGNMENT",title:"New assignment",message:"Differentiation Problem Set has been assigned.",related_entity_type:"ASSIGNMENT",related_entity_id:"assignment-2",read_at:null,created_at:iso(-2)},
  {id:"notification-3",user_id:"profile-student-1",type:"PAYMENT",title:"Payment updated",message:"Your latest tuition payment has been confirmed.",related_entity_type:"PAYMENT",related_entity_id:"pay-1-0",read_at:iso(-1),created_at:iso(-3)},
  {id:"notification-teacher",user_id:"profile-teacher",type:"ENROLLMENT",title:"New registration pending",message:"A new student registration is waiting for review.",related_entity_type:"STUDENT",related_entity_id:"student-8",read_at:null,created_at:iso(-1)},
  {id:"notification-4",user_id:"profile-student-1",type:"ANNOUNCEMENT",title:"Class time updated",message:"The Friday class will begin at 5:30 PM.",related_entity_type:"ANNOUNCEMENT",related_entity_id:"announcement-1",read_at:null,created_at:iso(-1)},
  {id:"notification-teacher-2",user_id:"profile-teacher",type:"RESULT",title:"Result draft awaiting publication",message:"Calculus Revision Assessment is ready for final review.",related_entity_type:"EXAM",related_entity_id:"exam-6",read_at:null,created_at:iso(-1)},
  {id:"notification-5",user_id:"profile-student-1",type:"ROUTINE",title:"Tomorrow's physics class",message:"Vector Components & Relative Motion starts tomorrow at 5:00 PM in Room A.",related_entity_type:"CLASS_SESSION",related_entity_id:"session-1",read_at:null,created_at:iso(0)},
  {id:"notification-6",user_id:"profile-student-1",type:"MATERIAL",title:"New revision material",message:"Calculus Final Revision Map is now available in your HSC 2026 materials.",related_entity_type:"BATCH_CONTENT",related_entity_id:"content-6",read_at:null,created_at:iso(-1)},
  {id:"notification-7",user_id:"profile-student-1",type:"ASSIGNMENT_REVIEW",title:"Assignment reviewed",message:"Your Electricity Revision Worksheet received 23 out of 25.",related_entity_type:"ASSIGNMENT",related_entity_id:"assignment-4",read_at:iso(0),created_at:iso(-1)},
  {id:"notification-8",user_id:"profile-student-1",type:"PAYMENT_DUE",title:"Current fee balance",message:"A remaining tuition balance is visible in your payment ledger.",related_entity_type:"PAYMENT",related_entity_id:"pay-1-0",read_at:null,created_at:iso(0)},
  {id:"notification-9",user_id:"profile-student-1",type:"ACADEMIC_PROGRESS",title:"Weekly progress updated",message:"Your subject completion and assessment analytics have been refreshed.",related_entity_type:"BATCH",related_entity_id:"batch-hsc27",read_at:iso(-1),created_at:iso(-2)},
  {id:"notification-teacher-3",user_id:"profile-teacher",type:"SUBMISSION",title:"Assignments awaiting review",message:"Three recent assignment submissions require teacher feedback.",related_entity_type:"ASSIGNMENT",related_entity_id:"assignment-2",read_at:null,created_at:iso(0)},
  {id:"notification-teacher-4",user_id:"profile-teacher",type:"PAYMENT_DUE",title:"Current month dues summary",message:"Unpaid and partially paid tuition records are ready for follow-up.",related_entity_type:"PAYMENT",related_entity_id:"pay-2-0",read_at:null,created_at:iso(0)},
  {id:"notification-teacher-5",user_id:"profile-teacher",type:"ROUTINE",title:"Upcoming classes prepared",message:"Four scheduled classes are visible in the academic routine.",related_entity_type:"CLASS_SESSION",related_entity_id:"session-8",read_at:iso(-1),created_at:iso(-2)},
  {id:"notification-teacher-6",user_id:"profile-teacher",type:"FINANCE",title:"Finance ledger updated",message:"Income, expense and net cash-flow summaries include the latest demo entries.",related_entity_type:"FINANCE",related_entity_id:"finance-expense-1",read_at:null,created_at:iso(-1)},
];

const auditLogs: DemoRow[] = [
  {id:"audit-1",actor_user_id:"profile-teacher",action:"PUBLISH_RESULT",entity_type:"EXAM",entity_id:"exam-2",old_value:{status:"RESULT_DRAFT"},new_value:{status:"RESULT_PUBLISHED"},ip_address:"127.0.0.1",created_at:iso(-5)},
  {id:"audit-2",actor_user_id:"profile-teacher",action:"CONFIRM_PAYMENT",entity_type:"PAYMENT",entity_id:"pay-1-0",old_value:{status:"UNPAID"},new_value:{status:"PAID"},ip_address:"127.0.0.1",created_at:iso(-3)},
  {id:"audit-3",actor_user_id:"profile-teacher",action:"CREATE_ASSIGNMENT",entity_type:"ASSIGNMENT",entity_id:"assignment-2",old_value:null,new_value:{status:"PUBLISHED"},ip_address:"127.0.0.1",created_at:iso(-2)},
  {id:"audit-4",actor_user_id:"profile-teacher",action:"DISABLE_ENROLLMENT",entity_type:"ENROLLMENT",entity_id:"enroll-6-1",old_value:{status:"ACTIVE"},new_value:{status:"DISABLED"},ip_address:"127.0.0.1",created_at:iso(-4)},
  {id:"audit-5",actor_user_id:"profile-teacher",action:"SAVE_RESULT_DRAFT",entity_type:"EXAM",entity_id:"exam-6",old_value:{status:"SCHEDULED"},new_value:{status:"RESULT_DRAFT"},ip_address:"127.0.0.1",created_at:iso(-1)},
  {id:"audit-6",actor_user_id:"profile-teacher",action:"UPDATE_STUDENT_PROFILE",entity_type:"STUDENT",entity_id:"student-1",old_value:{teacher_note:"Consistent learner."},new_value:{teacher_note:"Strong analytical ability; should improve written presentation."},ip_address:"127.0.0.1",created_at:iso(-6)},
  {id:"audit-7",actor_user_id:"profile-teacher",action:"REVIEW_ASSIGNMENT",entity_type:"ASSIGNMENT_SUBMISSION",entity_id:"submission-4",old_value:{status:"SUBMITTED",marks_obtained:null},new_value:{status:"REVIEWED",marks_obtained:23},ip_address:"127.0.0.1",created_at:iso(-1)},
  {id:"audit-8",actor_user_id:"profile-teacher",action:"UPDATE_CLASS_SESSION",entity_type:"CLASS_SESSION",entity_id:"session-5",old_value:{status:"SCHEDULED"},new_value:{status:"COMPLETED"},ip_address:"127.0.0.1",created_at:iso(-3)},
  {id:"audit-9",actor_user_id:"profile-teacher",action:"CREATE_MATERIAL",entity_type:"BATCH_CONTENT",entity_id:"content-9",old_value:null,new_value:{status:"PUBLISHED",title:"Measurement & Motion Notes"},ip_address:"127.0.0.1",created_at:iso(-8)},
  {id:"audit-10",actor_user_id:"profile-teacher",action:"VOID_FINANCE_EXPENSE",entity_type:"FINANCE_EXPENSE",entity_id:"finance-expense-6",old_value:{status:"POSTED"},new_value:{status:"VOID",void_reason:"Duplicate transport entry retained for audit demonstration."},ip_address:"127.0.0.1",created_at:iso(-3)},
];

const batchProgress = batchSubjects.map((s:any,idx:number)=>{
  const completed = s.status === "COMPLETED";
  const percentage = completed ? 100 : idx%3===0 ? 68 : idx%3===1 ? 52 : 34;
  return {id:`progress-${idx+1}`,batch_id:s.batch_id,subject_id:s.id,completion_percentage:percentage,total_units:4,completed_units:completed?4:idx%3,updated_at:completed?iso(-260):iso(-1)};
});
const subjectProgress = batchSubjects.map((s:any,idx:number)=>{
  const completed = s.status === "COMPLETED";
  const percentage = completed ? 100 : idx%3===0 ? 68 : idx%3===1 ? 52 : 34;
  return {subject_id:s.id,batch_id:s.batch_id,subject_name:s.name,status:s.status,total_units:4,completed_units:completed?4:idx%3,completion_percentage:percentage};
});
const studentPerformance = examResults.map((r:any)=>({student_id:r.student_id,batch_id:exams.find(e=>e.id===r.exam_id)?.batch_id,exam_id:r.exam_id,obtained_marks:r.obtained_marks,total_marks:exams.find(e=>e.id===r.exam_id)?.total_marks,percentage:Math.round(r.obtained_marks/(exams.find(e=>e.id===r.exam_id)?.total_marks||1)*100),grade:r.grade,rank:r.rank}));

const seededDemoTables: Record<string, DemoRow[]> = {
  profiles,
  student_profiles: studentProfiles,
  teacher_profiles:[{id:"teacher-1",profile_id:"profile-teacher",designation:"Lead Instructor & Academic Director",coaching_center_name:"EduPilot Coaching Academy",public_contact_info:"teacher@demo.edu | +880 1700-000001",created_at:iso(-600),updated_at:iso(-1)}],
  app_settings:[{id:true,coaching_center_name:"EduPilot Coaching Academy",short_name:"EduPilot",student_id_prefix:"EDU",public_phone:"+880 1700-000001",public_email:"hello@edupilot.demo",address:"Education Avenue, Dhaka, Bangladesh",default_currency:"BDT",default_timezone:"Asia/Dhaka",academic_session:"2026–2027",default_grading_scale:"STANDARD",pending_approval_contact_text:"Your registration is under review. Contact the academy for assistance.",disabled_account_contact_text:"Please contact the academy administrator.",student_rank_visible:true,completed_batches_visible:true,grades_displayed:true,updated_at:iso(-1)}],
  batches,
  batch_subjects:batchSubjects,
  subject_units:subjectUnits,
  enrollments,
  payments,
  finance_expense_categories: financeExpenseCategories,
  finance_expenses: financeExpenses,
  finance_income_ledger: financeIncomeLedger,
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

type DemoTableGlobal = typeof globalThis & {
  __EDUPILOT_DEMO_TABLES__?: Record<string, DemoRow[]>;
};

const demoGlobal = globalThis as DemoTableGlobal;
export const demoTables = demoGlobal.__EDUPILOT_DEMO_TABLES__ ||= seededDemoTables;

export const getDemoUser = (role: "TEACHER" | "STUDENT" = "TEACHER") => role === "TEACHER"
  ? { id:"auth-teacher", email:"teacher@demo.edu", user_metadata:{full_name:"Dr. Arif Rahman"} }
  : { id:"auth-student", email:"student@demo.edu", user_metadata:{full_name:"Nafis Ahmed"} };
