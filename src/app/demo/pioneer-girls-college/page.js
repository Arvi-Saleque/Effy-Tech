'use client';

import {
  Award, BookOpen, Building2, CalendarDays, ChevronRight, Clock3,
  Download, Eye, GraduationCap,
  Mail, MapPin, Menu, Phone, Search, Trophy, Users,
  X, FlaskConical, Landmark, FileText, HeartHandshake,
  Target, Sparkles, ArrowRight, Library, Globe2
} from 'lucide-react';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { useState } from 'react';

const ASSET_PATH = '/demos/pioneer-girls-college';

const notices = [
  { day:'18', month:'JUN', tag:'ACADEMIC', title:'HSC form fill-up schedule for the 2026 academic session', isNew:true },
  { day:'15', month:'JUN', tag:'ADMISSION', title:'Admission application for class XI is now open', isNew:true },
  { day:'12', month:'JUN', tag:'EXAM', title:'First terminal examination routine published', isNew:false },
  { day:'08', month:'JUN', tag:'EVENT', title:'Inter-college debate competition registration notice', isNew:false }
];

const tickerNotices = [
  '২০২৫-২০২৬ শিক্ষাবর্ষে একাদশ শ্রেণিতে ভর্তি আবেদন চলছে',
  'HSC form fill-up extended until ৩০/০৬/২০২৬',
  'প্রথম সাময়িক পরীক্ষার রুটিন প্রকাশিত হয়েছে',
  'Admission form download and fee payment notice published'
];

const quickLinks = [
  [GraduationCap,'Admission'], [CalendarDays,'Class Routine'], [FileText,'Exam Routine'], [Award,'Results'],
  [Users,'Teachers'], [Building2,'Departments'], [CalendarDays,'Academic Calendar'], [Download,'Downloads']
];

const programs = [
  {title:'Science', icon:FlaskConical, text:'Physics, Chemistry, Biology, Mathematics and modern laboratory facilities.'},
  {title:'Humanities', icon:BookOpen, text:'Bangla, English, History, Civics, Economics and social sciences.'},
  {title:'Business Studies', icon:Landmark, text:'Accounting, Finance, Management, Marketing and entrepreneurship.'},
  {title:'Co-curricular', icon:Trophy, text:'Debate, culture, sports, clubs, leadership and community engagement.'}
];

const news = [
  [`${ASSET_PATH}/news-achievement.jpg`,'Achievement','Students secure top positions in board examinations'],
  [`${ASSET_PATH}/news-science.jpg`,'Academic','Science exhibition showcases young innovators'],
  [`${ASSET_PATH}/news-event.jpg`,'Event','Annual cultural festival celebrated on campus']
];

const gallery = [
  `${ASSET_PATH}/gallery-campus.jpg`,
  `${ASSET_PATH}/gallery-classrooms.jpg`,
  `${ASSET_PATH}/gallery-lab.jpg`,
  `${ASSET_PATH}/gallery-library.jpg`,
  `${ASSET_PATH}/gallery-activities.jpg`
];

function SectionTitle({ eyebrow, title, subtitle, action }) {
  return <div className="section-heading">
    <div>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
    {action && <a href="#" className="text-link">{action}<ArrowRight size={16}/></a>}
  </div>
}

export default function Home() {
  const [menuOpen,setMenuOpen] = useState(false);
  return <main className="pioneer-college-demo">
    <a className="demo-badge" href="https://effytechbd.com" target="_blank" rel="noopener noreferrer">
      Website Demo by Effy Tech
    </a>
    <div className="topbar">
      <div className="container topbar-inner">
        <div className="topbar-group"><span>EIIN: 108765</span><i/><span>College Code: 5201</span><i/><span>Established: 2005</span></div>
        <div className="topbar-group"><span><Phone size={14}/> +880 1712-345678</span><span><Mail size={14}/> info@pioneergirlscollege.edu.bd</span><span><Clock3 size={14}/> 9:00 AM–4:00 PM</span><span>বাংলা | English</span></div>
      </div>
    </div>

    <header className="header">
      <div className="container nav-wrap">
        <a className="brand" href="#top">
          <div className="brand-mark"><BookOpen size={30}/></div>
          <div><strong>Pioneer Girls College</strong><span>Educate • Empower • Excel</span></div>
        </a>
        <nav className={menuOpen ? 'nav open' : 'nav'}>
          {['Home','About','Administration','Academic','Departments','Teachers','Notices','Results','Gallery','Contact'].map((x,i)=><a key={x} href={'#'+x.toLowerCase()} className={i===0?'active':''}>{x}</a>)}
          <button className="nav-search" aria-label="Search"><Search size={19}/></button>
        </nav>
        <button className="menu-btn" aria-label="Toggle navigation" onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X/>:<Menu/>}</button>
      </div>
    </header>

    <section className="hero" id="top">
      <div className="hero-bg"/>
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow light">A legacy of learning</span>
          <h1>Empowering Women,<br/><em>Inspiring Excellence</em></h1>
          <p>Pioneer Girls College nurtures knowledge, confidence, discipline and leadership—preparing every student to build a brighter future.</p>
          <div className="hero-actions"><a href="#about" className="btn gold"><Building2 size={19}/>Explore College</a><a href="#admission" className="btn ghost"><GraduationCap size={19}/>Admission Info</a></div>
          <div className="hero-mini"><span><Users/>2,450+ Students</span><span><Award/>96.8% Success Rate</span><span><BookOpen/>28,500+ Books</span></div>
        </div>
        <aside className="principal-card">
          <div className="quote">“</div>
          <span className="eyebrow">Principal's message</span>
          <img src={`${ASSET_PATH}/principal.jpg`} alt="Principal"/>
          <h3>Prof. Dr. Farhana Ahmed</h3><small>Principal</small>
          <p>Every girl has the potential to make a difference. Our role is to nurture minds with knowledge, hearts with values and hands with skills.</p>
          <a href="#" className="btn navy">Read Full Message <ChevronRight size={18}/></a>
        </aside>
      </div>
    </section>

    <div className="ticker" aria-label="Important updates">
      <div className="ticker-label"><Sparkles size={16}/>Announcements</div>
      <div className="ticker-window">
        <div className="ticker-track">
          {[...tickerNotices, ...tickerNotices].map((item, index)=>
            <a href="#notices" className="ticker-item" key={`${item}-${index}`}>
              <span>{index % tickerNotices.length === 0 ? '✱' : '#'}</span>{item}
            </a>
          )}
        </div>
      </div>
    </div>

    <section className="section" id="notices">
      <div className="container">
        <SectionTitle eyebrow="Stay informed" title="Latest Notices" subtitle="Important academic and administrative updates in one place." action="View all notices"/>
        <div className="notice-list">
          {notices.map((n)=><article className="notice-row" key={n.day+n.title}>
            <div className="date-box"><strong>{n.day}</strong><span>{n.month}</span><small>2026</small></div>
            <span className={'tag '+n.tag.toLowerCase()}>{n.tag}</span>
            <h3>{n.title} {n.isNew&&<b className="new">NEW</b>}</h3>
            <div className="notice-actions"><button><Eye size={17}/>View</button><button><Download size={17}/>Download</button></div>
          </article>)}
        </div>
      </div>
    </section>

    <section className="section soft" id="admission">
      <div className="container">
        <SectionTitle eyebrow="Useful services" title="Quick Access" subtitle="Reach the most requested information without searching through menus."/>
        <div className="quick-grid">{quickLinks.map(([Icon,label])=><a className="quick-card" href="#" key={label}><span><Icon/></span><strong>{label}</strong><ChevronRight size={18}/></a>)}</div>
      </div>
    </section>

    <section className="section" id="about">
      <div className="container history-grid">
        <div className="history-media">
          <img className="history-main" src={`${ASSET_PATH}/campus-main.jpg`} alt="College campus"/>
          <img className="history-small" src={`${ASSET_PATH}/library.jpg`} alt="College library"/>
          <div className="year-badge"><span>Established</span><strong>2005</strong><small>With Excellence</small></div>
        </div>
        <div className="history-copy">
          <span className="eyebrow">Our history</span><h2>A proud journey of education, values and progress</h2>
          <p>Founded with a clear commitment to women's education, Pioneer Girls College has grown into a trusted institution known for academic discipline, supportive teaching and responsible citizenship.</p>
          <p>Our campus combines strong traditions with contemporary learning, digital facilities and meaningful co-curricular opportunities.</p>
          <ul><li><HeartHandshake/>Strong foundation in values and ethics</li><li><Target/>Focused academic mentoring</li><li><Globe2/>Future-ready skills and leadership</li></ul>
          <a href="#" className="btn navy">Read Full History <ArrowRight size={18}/></a>
        </div>
      </div>
    </section>

    <section className="stats-section"><div className="container stats-grid">
      {[[CalendarDays,'2005','Established'],[Users,'2,450+','Students'],[Users,'120+','Teachers'],[Building2,'12','Departments'],[Trophy,'96.8%','Success Rate'],[Library,'28,500+','Library Books']].map(([Icon,num,label])=><div className="stat" key={label}><Icon/><strong>{num}</strong><span>{label}</span></div>)}
    </div></section>

    <section className="section soft" id="academic"><div className="container">
      <SectionTitle eyebrow="Academic excellence" title="Programs that prepare students for the future" subtitle="Structured learning pathways supported by experienced teachers and modern resources." action="Explore academics"/>
      <div className="program-grid">{programs.map(({title,icon:Icon,text})=><article className="program-card" key={title}><span><Icon/></span><h3>{title}</h3><p>{text}</p><a href="#">View details <ArrowRight size={16}/></a></article>)}</div>
    </div></section>

    <section className="section" id="administration"><div className="container">
      <SectionTitle eyebrow="Leadership" title="Administration & Faculty" subtitle="Experienced educators committed to student growth and institutional excellence." action="View all faculty"/>
      <div className="faculty-grid">
        {[
          [`${ASSET_PATH}/principal.jpg`,'Prof. Dr. Farhana Ahmed','Principal'],
          [`${ASSET_PATH}/vice-principal.jpg`,'Ms. Nasrin Sultana','Vice Principal'],
          [`${ASSET_PATH}/science-head.jpg`,'Dr. Md. Arif Hossain','Head, Science Department'],
          [`${ASSET_PATH}/faculty-coordinator.jpg`,'Ms. Shahana Akter','Senior Faculty Coordinator']
        ].map(([img,name,role])=><article className="faculty-card" key={name}><img src={img} alt={name}/><div><span>{role}</span><h3>{name}</h3><p>Experienced educator focused on academic quality, mentoring and student success.</p><a href="#">View profile <ArrowRight size={15}/></a></div></article>)}
      </div>
    </div></section>

    <section className="achievement"><div className="container achievement-grid">
      <div><span className="eyebrow light">Featured achievement</span><h2>Best Women's College Excellence Award 2026</h2><p>Recognized for academic excellence, leadership development and community engagement.</p><a className="btn gold" href="#"><Trophy size={18}/>View Achievement</a></div>
      <Trophy className="giant-trophy"/>
      <div className="achievement-stats"><span><strong>98%</strong>Academic success</span><span><strong>25+</strong>Scholarships</span><span><strong>150+</strong>Awards</span><span><strong>5000+</strong>Alumni</span></div>
    </div></section>

    <section className="section" id="gallery"><div className="container">
      <SectionTitle eyebrow="Campus stories" title="Latest News & Events" subtitle="Academic, cultural and community moments from our college." action="View all news"/>
      <div className="news-grid">{news.map(([img,tag,title])=><article className="news-card" key={title}><img src={img} alt="News"/><div><span className="tag academic">{tag}</span><h3>{title}</h3><p>Discover recent achievements, activities and learning experiences from our campus community.</p><a href="#">Read more <ArrowRight size={15}/></a></div></article>)}</div>

      <div className="gallery-head"><SectionTitle eyebrow="Beyond classrooms" title="Campus Life & Gallery" subtitle="A vibrant environment for learning, friendship, creativity and growth." action="View full gallery"/></div>
      <div className="gallery-grid">{gallery.map((src,i)=><div className={'gallery-item item-'+i} key={src}><img src={src} alt="Campus life"/><span>{['Campus Life','Classrooms','Science Lab','Library','Activities'][i]}</span></div>)}</div>
    </div></section>

    <section className="section soft"><div className="container contact-grid" id="contact">
      <div><span className="eyebrow">Get in touch</span><h2>Contact & Location</h2><p>We are available to help students, guardians and visitors during official college hours.</p>
        <div className="contact-list"><span><MapPin/>12 College Road, Mirpur, Dhaka–1216</span><span><Phone/>+880 1712-345678</span><span><Mail/>info@pioneergirlscollege.edu.bd</span><span><Clock3/>Saturday–Thursday, 9:00 AM–4:00 PM</span></div>
        <a className="btn gold" href="https://maps.google.com" target="_blank" rel="noopener noreferrer"><MapPin size={18}/>Get Direction</a>
      </div>
      <div className="map-card"><div className="map-grid"/><MapPin className="map-pin"/><div className="map-label"><strong>Pioneer Girls College</strong><span>Mirpur, Dhaka</span></div></div>
    </div></section>

    <footer className="footer"><div className="container footer-grid">
      <div><a className="brand footer-brand" href="#top"><div className="brand-mark"><BookOpen size={27}/></div><div><strong>Pioneer Girls College</strong><span>Educate • Empower • Excel</span></div></a><p>Providing quality education, strong values and future-ready opportunities for young women.</p><div className="social"><a><FaFacebookF/></a><a><FaInstagram/></a><a><FaYoutube/></a></div></div>
      <div><h4>Quick Links</h4><a>About Us</a><a>Administration</a><a>Departments</a><a>Notices</a><a>Contact</a></div>
      <div><h4>Academic Links</h4><a>Programs</a><a>Class Routine</a><a>Exam Routine</a><a>Results</a><a>Calendar</a></div>
      <div><h4>Contact Information</h4><span><MapPin/>Mirpur, Dhaka–1216</span><span><Phone/>+880 1712-345678</span><span><Mail/>info@pioneergirlscollege.edu.bd</span></div>
    </div><div className="container footer-bottom"><span>© 2026 Pioneer Girls College. All rights reserved.</span><span>Privacy Policy · Terms of Use · Sitemap</span></div></footer>
  </main>
}
