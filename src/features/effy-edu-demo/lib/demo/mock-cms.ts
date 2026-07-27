// @ts-nocheck -- Isolated generalized demo uses a dynamic local mock adapter.
import { courses } from "@/features/effy-edu-demo/data/courses";
import { studentResults } from "@/features/effy-edu-demo/data/results";
import { topStudentsData } from "@/features/effy-edu-demo/data/top-students";
import { youtubeClasses } from "@/features/effy-edu-demo/data/youtubeClasses";
import { albumsData } from "@/features/effy-edu-demo/data/albums";
import { faqs } from "@/features/effy-edu-demo/data/faq";

export type DemoSection = {
  id: string;
  page_key: string;
  section_key: string;
  eyebrow?: string | null;
  title?: string | null;
  subtitle?: string | null;
  description?: string | null;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  content: Record<string, any>;
  mediaUrl?: string | null;
  fileUrl?: string | null;
};

const section = (page:string,key:string,data:Partial<DemoSection>):DemoSection => ({
  id:`section-${key.toLowerCase()}`,
  page_key:page,
  section_key:key,
  status:"PUBLISHED",
  content:{},
  mediaUrl:null,
  ...data,
});

const siteSections: Record<string, DemoSection> = {
  "GLOBAL|GLOBAL_SETTINGS": section("GLOBAL","GLOBAL_SETTINGS",{content:{
    coachingCenterName:"EduPilot Coaching Academy",
    tagline:"Admissions open for academic and admission programs",
    shortDescription:"A complete coaching ecosystem for concept-first learning, regular assessment, transparent progress tracking and measurable student outcomes.",
    logoUrl:"/effy_edu_management_system/images/edupilot-logo.svg",
    phone:"+880 1700-000001", whatsapp:"8801700000001", email:"hello@edupilot.demo",
    address:"Education Avenue, Dhaka, Bangladesh", nearbyLandmark:"beside the central academic district", officeHours:"Daily 3:00 PM – 9:00 PM",
    facebookUrl:"https://facebook.com", youtubeUrl:"https://youtube.com",
    googleMapEmbedUrl:"https://maps.google.com/maps?q=Dhaka%20Bangladesh&t=&z=13&ie=UTF8&iwloc=&output=embed",
    googleMapDirectionUrl:"https://maps.google.com/?q=Dhaka+Bangladesh",
    teacherName:"Dr. Arif Rahman", teacherDesignation:"Lead Instructor & Academic Director", teacherExperience:"12+ Years",
    teacherSpecialty:"Physics, Mathematics & Admission Strategy",
    teacherBio:"An experienced academic mentor focused on conceptual clarity, structured problem solving and data-informed student guidance.",
    heroHeadline:"Build concepts. Measure progress. Achieve more.",
    heroDescription:"Academic and admission coaching powered by structured classes, assessment analytics and direct mentorship.",
    footerDescription:"A modern coaching ecosystem for academic excellence and competitive admission preparation.",
    footerNotice:"This is a frontend demonstration. Admission and payment actions use mock data only.",
    footerCopyright:`© ${new Date().getFullYear()} EduPilot Coaching Academy. Demo project.`,
    quickLinks:[
      {label:"Home",href:"/effy_edu_management_system"},{label:"Programs",href:"/effy_edu_management_system/#courses"},{label:"Results",href:"/effy_edu_management_system/#results"},{label:"Materials",href:"/effy_edu_management_system/materials"},{label:"Student Portal",href:"/effy_edu_management_system/student",isPortal:true},{label:"Teacher Console",href:"/effy_edu_management_system/teacher",isPortal:true}
    ]
  }}),
  "HOME|HOME_HERO": section("HOME","HOME_HERO",{content:{
    tagline:"Academic & Admission Care",
    headline:"Learn with clarity. Perform with confidence.",
    description:"Concept-first classes, weekly assessments, personalized progress tracking and direct academic mentorship in one integrated coaching ecosystem.",
    features:["Small focused batches","Weekly exams & analytics","Premium lecture resources"],
    teacherName:"Dr. Arif Rahman", teacherTitle:"Lead Instructor & Academic Director", teacherSubtitle:"Physics • Mathematics • Admission", teacherImage:"/effy_edu_management_system/images/demo-instructor.png"
  }}),
  "HOME|HOME_STATS": section("HOME","HOME_STATS",{content:{stats:[
    {number:"12+",label:"Years Experience",description:"Academic and admission mentoring",iconName:"Award"},
    {number:"1,250+",label:"Students Guided",description:"Across SSC, HSC and admission",iconName:"Users"},
    {number:"48+",label:"Successful Batches",description:"Structured learning programs",iconName:"GraduationCap"},
    {number:"Weekly",label:"Assessment System",description:"Continuous progress evaluation",iconName:"CheckCircle"},
  ]}}),
  "HOME|HOME_FEATURED_COURSES": section("HOME","HOME_FEATURED_COURSES",{eyebrow:"Batches & Programs",title:"Offered Batches",description:"Structured programs designed for board excellence and competitive admission preparation.",content:{selectedCourseIds:courses.slice(0,5).map(c=>c.id)}}),
  "HOME|HOME_WHY_CHOOSE": section("HOME","HOME_WHY_CHOOSE",{content:{
    eyebrow:"Why learn with us?",heading:"A learning system built around",highlightedText:"student progress.",description:"Every class, assessment and support workflow is designed to make academic growth visible and actionable.",
    benefits:[
      {title:"Concept-first teaching",description:"Understand the logic before memorizing formulas.",iconName:"Cpu"},
      {title:"Small batch attention",description:"Focused feedback and individual doubt resolution.",iconName:"Users"},
      {title:"Weekly assessment",description:"Regular quizzes, model tests and performance analytics.",iconName:"ClipboardList"},
      {title:"Premium resources",description:"Curated notes, worksheets and recorded support materials.",iconName:"NotebookTabs"},
      {title:"Guardian visibility",description:"Clear progress and payment history for accountability.",iconName:"MessageCircle"},
      {title:"Admission strategy",description:"Time management, exam patterns and merit-focused practice.",iconName:"UserCheck"},
    ],
    trustItems:[
      {label:"Concept First",iconName:"GraduationCap"},
      {label:"Accountability Always",iconName:"Target"},
      {label:"Student Success",iconName:"Users"},
      {label:"Trust & Transparency",iconName:"ShieldCheck"}
    ]
  }}),
  "HOME|HOME_TEACHER": section("HOME","HOME_TEACHER",{content:{
    teacherName:"Dr. Arif Rahman",teacherTitle:"Lead Instructor & Academic Director",teacherSubtitle:"Physics • Mathematics • Admission Strategy",
    teacherImage:"/effy_edu_management_system/images/demo-instructor.png",teacherSpecialty:"Concept visualization, analytical problem solving and student performance strategy",
    teacherBio:"A dedicated academic mentor who combines board-standard fundamentals with admission-level analytical thinking. Classes prioritize visualization, derivation and deliberate practice.",
    teachingMethods:[
      {title:"Concept visualization",desc:"Use diagrams, simulations and intuitive explanations before formula application."},
      {title:"Guided problem solving",desc:"Progress from foundational examples to timed admission-level problems."},
      {title:"Assessment feedback",desc:"Turn weekly exam data into specific revision priorities."},
      {title:"Individual support",desc:"Dedicated doubt-clearing and guardian communication for consistent progress."}
    ]
  }}),
  "HOME|HOME_TOP_STUDENTS": section("HOME","HOME_TOP_STUDENTS",{content:{header:{eyebrow:"Monthly Excellence",title:"Top of the Month",description:"Celebrating consistency, improvement and academic discipline."},months:topStudentsData}}),
  "HOME|HOME_STUDENT_SUCCESS": section("HOME","HOME_STUDENT_SUCCESS",{eyebrow:"Student Outcomes",title:"Success Stories",description:"Students who converted consistent preparation into remarkable academic results.",content:{selectedStudentIds:studentResults.slice(0,5).map(s=>s.id)}}),
  "HOME|HOME_YOUTUBE_CLASSES": section("HOME","HOME_YOUTUBE_CLASSES",{content:{header:{badge:"Free Concept Lectures",title:"Concept Breakdown Theater",description:"Explore selected concept lectures and solution sessions from the demo playlist.",moreTitle:"More free lectures",moreText:"Additional concept breakdowns, model-test solutions and revision videos can be published through the CMS.",playlistTitle:"Playlist Classes"},classes:youtubeClasses}}),
  "HOME|HOME_TESTIMONIALS": section("HOME","HOME_TESTIMONIALS",{eyebrow:"Student & Guardian Voice",title:"What our community says",description:"Feedback from learners and families about the learning experience.",content:{selectedTestimonialIds:[]}}),
  "HOME|HOME_NEWS_EVENTS": section("HOME","HOME_NEWS_EVENTS",{eyebrow:"Latest Updates",title:"News & Events",description:"Admission notices, workshops, exams and academic celebrations.",content:{}}),
  "HOME|HOME_GALLERY": section("HOME","HOME_GALLERY",{eyebrow:"Captured Moments",title:"Inside the Academy",description:"Classrooms, workshops, resources and student achievements.",content:{selectedAlbumIds:albumsData.slice(0,4).map(a=>a.id)}}),

  "COURSES|COURSES_HERO": section("COURSES","COURSES_HERO",{eyebrow:"ACADEMIC PROGRAMS",title:"Courses &",subtitle:"Batches",description:"Explore structured programs for board preparation, academic mastery and competitive admissions.",mediaUrl:"/effy_edu_management_system/images/flyer_hsc26_hsc27.jpg"}),
  "RESULTS|RESULTS_HERO": section("RESULTS","RESULTS_HERO",{eyebrow:"STUDENT OUTCOMES",title:"Success Stories &",subtitle:"Achievements",description:"Celebrate students who transformed consistent preparation into exceptional results.",mediaUrl:"/effy_edu_management_system/images/gallery-event.png"}),
  "MATERIALS|MATERIALS_HERO": section("MATERIALS","MATERIALS_HERO",{eyebrow:"STUDY MATERIALS",title:"Premium Study",subtitle:"Resources",description:"Browse demo notes, formula sheets, worksheets and practice resources.",mediaUrl:"/effy_edu_management_system/images/gallery-notes.png"}),
  "MATERIALS|MATERIALS_CATEGORIES": section("MATERIALS","MATERIALS_CATEGORIES",{content:{categories:["Physics","Higher Mathematics","Admission","Model Tests"]}}),
  "GALLERY|GALLERY_HERO": section("GALLERY","GALLERY_HERO",{eyebrow:"ACADEMY GALLERY",title:"Learning in",subtitle:"Action",description:"A visual tour of classes, workshops, study resources and achievements.",mediaUrl:"/effy_edu_management_system/images/gallery-classroom.png"}),
  "GALLERY|GALLERY_ALBUMS": section("GALLERY","GALLERY_ALBUMS",{content:{albums:albumsData}}),
  "CONTACT|CONTACT_HERO": section("CONTACT","CONTACT_HERO",{eyebrow:"GET IN TOUCH",title:"Contact &",subtitle:"FAQ",description:"Contact the academy for batch schedules, admission information or academic guidance.",mediaUrl:"/effy_edu_management_system/images/gallery-classroom.png"}),
  "CONTACT|CONTACT_INFO": section("CONTACT","CONTACT_INFO",{content:{address:"Education Avenue, Dhaka, Bangladesh",transitInfo:"Located in a central academic district with convenient public transport access.",securityInfo:"Monitored learning environment with guardian-friendly visiting hours.",mapEmbedUrl:"https://maps.google.com/maps?q=Dhaka%20Bangladesh&t=&z=13&ie=UTF8&iwloc=&output=embed",mapDirectionUrl:"https://maps.google.com/?q=Dhaka+Bangladesh"}}),
  "CONTACT|CONTACT_FAQ": section("CONTACT","CONTACT_FAQ",{content:{faqs}}),
  "ACADEMIC_CALENDAR|CALENDAR_HERO": section("ACADEMIC_CALENDAR","CALENDAR_HERO",{eyebrow:"SCHEDULE & TIMELINE",title:"Academic Calendar",subtitle:"Session 2026–2027",description:"Review the yearly academic roadmap, assessment milestones and major program dates.",mediaUrl:"/effy_edu_management_system/images/gallery-classroom.png"}),
  "ACADEMIC_CALENDAR|CALENDAR_CARD": section("ACADEMIC_CALENDAR","CALENDAR_CARD",{mediaUrl:"/effy_edu_management_system/images/demo-calendar.svg",fileUrl:"/effy_edu_management_system/images/demo-calendar.svg"}),
  "CLASS_ROUTINE|ROUTINE_HERO": section("CLASS_ROUTINE","ROUTINE_HERO",{eyebrow:"WEEKLY SCHEDULE",title:"Class Routine",subtitle:"Active Batches",description:"See the weekly demo schedule for lectures, practice sessions and assessments.",mediaUrl:"/effy_edu_management_system/images/gallery-classroom.png"}),
  "CLASS_ROUTINE|ROUTINE_CARD": section("CLASS_ROUTINE","ROUTINE_CARD",{mediaUrl:"/effy_edu_management_system/images/demo-routine.svg",fileUrl:"/effy_edu_management_system/images/demo-routine.svg"}),
  "NEWS_EVENTS|NEWS_EVENTS_HERO": section("NEWS_EVENTS","NEWS_EVENTS_HERO",{eyebrow:"NEWS & EVENTS",title:"Latest News &",subtitle:"Upcoming Events",description:"Stay informed about admission sessions, model tests, workshops and student celebrations.",mediaUrl:"/effy_edu_management_system/images/gallery-event.png"}),
  "NEWS_EVENTS|NEWS_EVENTS_CATEGORIES": section("NEWS_EVENTS","NEWS_EVENTS_CATEGORIES",{content:{categories:["EVENT","NOTICE","NEWS"]}}),
  "REVIEWS|REVIEWS_HERO": section("REVIEWS","REVIEWS_HERO",{eyebrow:"REVIEWS",title:"Student & Guardian",subtitle:"Feedback",description:"Read detailed experiences from learners and families.",mediaUrl:"/effy_edu_management_system/images/gallery-event.png"}),
};

const sectionItems:Record<string,any[]> = {
  COURSES_CARDS:courses.map((c,index)=>({id:c.id,section_id:"section-courses-cards",title:c.title,subtitle:c.subtitle,body:c.description,media_id:null,mediaUrl:c.bannerImage,sort_order:index,status:"PUBLISHED",metadata:{target:c.target,subjects:c.subjects,type:c.type,fallbackImageUrl:c.bannerImage,schedule:c.schedule,duration:c.duration,features:c.features,whatsappText:c.whatsappText}})),
  RESULTS_STUDENTS:studentResults.map((s,index)=>({id:s.id,section_id:"section-results-students",title:s.studentName,subtitle:s.college,body:s.note,media_id:null,mediaUrl:s.image,sort_order:index,status:"PUBLISHED",metadata:{achievement:s.achievement,course:s.course,examType:s.examType,year:s.year,fallbackImageUrl:s.image}})),
  MATERIALS_ITEMS:[
    {id:"mat-1",title:"Vector Formula Sheet",subtitle:"Physics",body:"Compact diagrams, formulas and common mistakes for vector mechanics.",mediaUrl:"/effy_edu_management_system/images/gallery-notes.png",sort_order:1,status:"PUBLISHED",metadata:{fileType:"PDF",fileUrl:"/effy_edu_management_system/demo/vector-formulas.pdf",downloadable:true}},
    {id:"mat-2",title:"Calculus Visual Summary",subtitle:"Higher Mathematics",body:"A visual roadmap for limits, derivatives and applications.",mediaUrl:"/effy_edu_management_system/images/gallery-solve.png",sort_order:2,status:"PUBLISHED",metadata:{fileType:"IMAGE",fileUrl:"/effy_edu_management_system/images/gallery-solve.png",downloadable:true}},
    {id:"mat-3",title:"Engineering Admission Model Test",subtitle:"Admission",body:"A complete mixed-subject practice paper with timing guidance.",mediaUrl:"/effy_edu_management_system/images/flyer_admission_science.jpg",sort_order:3,status:"PUBLISHED",metadata:{fileType:"PDF",fileUrl:"/effy_edu_management_system/demo/model-test.pdf",downloadable:true}},
    {id:"mat-4",title:"HSC Physics Revision Checklist",subtitle:"Model Tests",body:"High-yield topics and final revision checklist.",mediaUrl:"/effy_edu_management_system/images/flyer_revision_2026.jpg",sort_order:4,status:"PUBLISHED",metadata:{fileType:"LINK",fileUrl:"/effy_edu_management_system/materials",downloadable:false}},
  ],
  NEWS_EVENTS_ITEMS:[
    {id:"news-1",title:"HSC 2027 Orientation & Academic Roadmap",subtitle:"EVENT",body:"A detailed orientation on class structure, assessment policy, guardian reporting and the complete academic roadmap.",mediaUrl:"/effy_edu_management_system/images/flyer_hsc26_hsc27.jpg",sort_order:1,status:"PUBLISHED",metadata:{category:"EVENT",date:"02",month:"AUG",year:"2026",time:"4:00 PM",location:"EduPilot Main Campus",excerpt:"Meet the academic team and understand the complete HSC learning roadmap.",featured:true}},
    {id:"news-2",title:"Engineering Scholarship Model Test Registration",subtitle:"NOTICE",body:"Registration is open for a full-length engineering admission model test with detailed analytics.",mediaUrl:"/effy_edu_management_system/images/flyer_model_test_2025.png",sort_order:2,status:"PUBLISHED",metadata:{category:"NOTICE",date:"09",month:"AUG",year:"2026",time:"10:00 AM",location:"Assessment Hall",excerpt:"A merit-based model test with performance breakdown and scholarship awards.",featured:false}},
    {id:"news-3",title:"Monthly Excellence Award Announced",subtitle:"NEWS",body:"This month's top performers and most improved students have been recognized.",mediaUrl:"/effy_edu_management_system/images/gallery-event.png",sort_order:3,status:"PUBLISHED",metadata:{category:"NEWS",date:"20",month:"JUL",year:"2026",time:"6:30 PM",location:"EduPilot Academy",excerpt:"Celebrating disciplined preparation, improvement and academic consistency.",featured:false}},
  ],
};

const globalStore = globalThis as typeof globalThis & { __EDUPILOT_SECTIONS__?:Record<string,DemoSection>; __EDUPILOT_ITEMS__?:Record<string,any[]> };
export const demoSections = globalStore.__EDUPILOT_SECTIONS__ ||= siteSections;
export const demoSectionItems = globalStore.__EDUPILOT_ITEMS__ ||= sectionItems;

export function getDemoSection(pageKey:string,sectionKey:string){ return demoSections[`${pageKey}|${sectionKey}`] || null; }
export function setDemoSection(pageKey:string,sectionKey:string,payload:any){
  const key=`${pageKey}|${sectionKey}`; const existing=getDemoSection(pageKey,sectionKey) || section(pageKey,sectionKey,{});
  demoSections[key]={...existing,...payload,content:payload.content||existing.content,id:existing.id}; return demoSections[key];
}
export function getDemoItems(sectionKey:string){ return demoSectionItems[sectionKey] || []; }
export function upsertDemoItem(sectionKey:string,payload:any){
  const list=demoSectionItems[sectionKey] ||= []; const id=payload.id||`${sectionKey.toLowerCase()}-${Date.now()}`;
  const item={id,section_id:`section-${sectionKey.toLowerCase()}`,title:payload.title,subtitle:payload.subtitle||null,body:payload.body||null,media_id:payload.media_id||null,mediaUrl:payload.mediaUrl||payload.metadata?.fallbackImageUrl||null,metadata:payload.metadata||{},sort_order:payload.sort_order??list.length,status:payload.status||"PUBLISHED"};
  const i=list.findIndex(x=>x.id===id); if(i>=0) list[i]={...list[i],...item}; else list.push(item); return item;
}
export function deleteDemoItem(id:string){ Object.values(demoSectionItems).forEach(list=>{const i=list.findIndex(x=>x.id===id);if(i>=0)list.splice(i,1)}); }
