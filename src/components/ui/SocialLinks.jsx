/* ============================================================
   SocialLinks — Row of social media icons
   Reads platforms from props or siteConfig.
   Uses react-icons for consistent iconography.
   ============================================================ */

import {
  FaGithub,
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";

const iconMap = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  twitter: FaTwitter,
  instagram: FaInstagram,
  facebook: FaFacebookF,
  youtube: FaYoutube,
};

const sizeStyles = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

export default function SocialLinks({
  links = [],
  size = "md",
  light = false,
  className = "",
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {links.map(({ platform, url }) => {
        const Icon = iconMap[platform];
        if (!Icon) return null;

        return (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={platform}
            className={`flex items-center justify-center rounded-full p-2 transition-colors
              ${
                light
                  ? "text-neutral-400 hover:text-text-inverse hover:bg-neutral-700"
                  : "text-text-tertiary hover:text-primary hover:bg-primary-lightest"
              }`}
          >
            <Icon className={sizeStyles[size]} />
          </a>
        );
      })}
    </div>
  );
}
