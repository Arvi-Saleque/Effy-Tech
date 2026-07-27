// @ts-nocheck -- Isolated generalized demo uses a dynamic local mock adapter.
export interface AlbumImage {
  id: string;
  url: string;
  alt: string;
}

export interface GalleryAlbum {
  id: string;
  title: string;
  category: "Events" | "Classroom" | "Awards" | "Study Material" | "Farewell";
  date: string;
  description: string;
  coverImage: string;
  images: AlbumImage[];
}

export const albumsData: GalleryAlbum[] = [
  {
    id: "annual-prize-giving-2026",
    title: "Annual Prize Giving 2026",
    category: "Events",
    date: "June 25, 2026",
    description: "Celebrating the brilliant minds of EduPilot Coaching Academy. Our annual award ceremony honoring the top performers of the year across all batches.",
    coverImage: "/effy_edu_management_system/images/gallery-event.png",
    images: [
      { id: "img-1", url: "/effy_edu_management_system/images/gallery-event.png", alt: "Prize giving ceremony" },
      { id: "img-2", url: "/effy_edu_management_system/images/s1.jpeg", alt: "Top student receiving award" },
      { id: "img-3", url: "/effy_edu_management_system/images/s2.jpeg", alt: "Students cheering" },
      { id: "img-4", url: "/effy_edu_management_system/images/s3.jpeg", alt: "Group photo" },
      { id: "img-5", url: "/effy_edu_management_system/images/s4.jpeg", alt: "Teachers speech" },
    ],
  },
  {
    id: "interactive-classroom",
    title: "Interactive Classroom Sessions",
    category: "Classroom",
    date: "Ongoing",
    description: "A glimpse into our interactive and engaging physics classes where complex concepts are simplified through 3D visualization and practical examples.",
    coverImage: "/effy_edu_management_system/images/gallery-classroom.png",
    images: [
      { id: "img-6", url: "/effy_edu_management_system/images/gallery-classroom.png", alt: "Classroom session" },
      { id: "img-7", url: "/effy_edu_management_system/images/s5.jpeg", alt: "Student solving problem" },
      { id: "img-8", url: "/effy_edu_management_system/images/s1.jpeg", alt: "Teacher explaining Mechanics" },
      { id: "img-9", url: "/effy_edu_management_system/images/gallery-solve.png", alt: "Group discussion" },
    ],
  },
  {
    id: "study-materials-notes",
    title: "Premium Lecture Sheets",
    category: "Study Material",
    date: "2026 Batch",
    description: "Exclusive handwritten notes, formula sheets, and shortcut techniques provided to our students to give them a competitive edge.",
    coverImage: "/effy_edu_management_system/images/gallery-notes.png",
    images: [
      { id: "img-10", url: "/effy_edu_management_system/images/gallery-notes.png", alt: "Physics notes" },
      { id: "img-11", url: "/effy_edu_management_system/images/flyer_admission_science.jpg", alt: "Admission flyer" },
      { id: "img-12", url: "/effy_edu_management_system/images/flyer_hsc26_hsc27.jpg", alt: "HSC Flyer" },
    ],
  },
  {
    id: "solve-class-marathon",
    title: "Board Question Solve Marathon",
    category: "Classroom",
    date: "April 2026",
    description: "Intensive 5-hour marathon solving past board questions and complex engineering admission problems.",
    coverImage: "/effy_edu_management_system/images/gallery-solve.png",
    images: [
      { id: "img-13", url: "/effy_edu_management_system/images/gallery-solve.png", alt: "Solve class" },
      { id: "img-14", url: "/effy_edu_management_system/images/s2.jpeg", alt: "Student focus" },
      { id: "img-15", url: "/effy_edu_management_system/images/s3.jpeg", alt: "Board discussion" },
      { id: "img-16", url: "/effy_edu_management_system/images/s4.jpeg", alt: "Problem solving" },
      { id: "img-17", url: "/effy_edu_management_system/images/gallery-classroom.png", alt: "Full classroom" },
    ],
  }
];
