import React from "react";
import Link from "next/link";
import { 
  Briefcase, 
  Layers, 
  CheckSquare, 
  AlertTriangle, 
  Clock, 
  FileText, 
  Users, 
  Activity 
} from "lucide-react";

export default function ExecutiveSummary({ stats }) {
  const cards = [
    {
      title: "Active Projects",
      value: stats.activeProjects,
      icon: <Briefcase className="h-5 w-5" />,
      color: "text-primary-light",
      bg: "bg-primary/10",
      border: "border-primary-light/20",
      href: "/admin/projects?status=active"
    },
    {
      title: "Active Tasks",
      value: stats.activeTasks,
      icon: <Layers className="h-5 w-5" />,
      color: "text-indigo-400",
      bg: "bg-indigo-500/10",
      border: "border-indigo-500/20",
      href: null
    },
    {
      title: "Blocked Tasks",
      value: stats.blockedTasks,
      icon: <AlertTriangle className="h-5 w-5" />,
      color: "text-rose-400",
      bg: "bg-rose-500/10",
      border: "border-rose-500/20",
      href: null
    },
    {
      title: "Overdue Tasks",
      value: stats.overdueTasks,
      icon: <Clock className="h-5 w-5" />,
      color: "text-orange-400",
      bg: "bg-orange-500/10",
      border: "border-orange-500/20",
      href: null
    },
    {
      title: "Reports Awaiting Review",
      value: stats.reportsAwaitingReview,
      icon: <FileText className="h-5 w-5" />,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
      href: "/admin/reports"
    },
    {
      title: "Working Now",
      value: stats.activeNow,
      icon: <Activity className="h-5 w-5" />,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      href: null // scroll down
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
      {cards.map((card, idx) => {
        const content = (
          <div className="bg-neutral-900/40 border border-neutral-800/80 p-4 rounded-2xl shadow-lg backdrop-blur-xl hover:border-neutral-700 transition-colors h-full flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-2">
              <div className={`h-8 w-8 rounded-lg ${card.bg} ${card.border} border flex items-center justify-center ${card.color} shrink-0`}>
                {card.icon}
              </div>
              <span className="text-2xl font-bold text-neutral-100">{card.value}</span>
            </div>
            <span className="text-[11px] text-neutral-400 font-semibold uppercase tracking-wider block">
              {card.title}
            </span>
          </div>
        );

        if (card.href) {
          return (
            <Link key={idx} href={card.href} className="block">
              {content}
            </Link>
          );
        }

        return <div key={idx}>{content}</div>;
      })}
    </div>
  );
}
