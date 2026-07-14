import React from "react";
import { AlertCircle, ArrowUp, ArrowRight, ArrowDown } from "lucide-react";

export default function ProjectPriorityBadge({ priority, className = "" }) {
  const config = {
    urgent: { label: "Urgent", colors: "text-red-500", Icon: AlertCircle },
    high: { label: "High", colors: "text-amber-500", Icon: ArrowUp },
    normal: { label: "Normal", colors: "text-primary-light", Icon: ArrowRight },
    low: { label: "Low", colors: "text-neutral-400", Icon: ArrowDown },
  };

  const style = config[priority] || { label: priority, colors: "text-neutral-400", Icon: ArrowRight };
  const { Icon } = style;

  return (
    <div className={`inline-flex items-center gap-1.5 text-sm font-medium ${style.colors} ${className}`}>
      <Icon className="w-4 h-4" />
      <span>{style.label}</span>
    </div>
  );
}
