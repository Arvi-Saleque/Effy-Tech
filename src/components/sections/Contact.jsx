/* ============================================================
   Contact — Split layout: info + form with gradient mesh BG
   ─────────────────────────────────────────────────
   Left: bold headline, contact info, social icons
   Right: floating-label form (ContactForm component)
   Background: animated gradient mesh (CSS @property)
   ============================================================ */

"use client";

import { motion } from "framer-motion";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import siteConfig from "@/theme/siteConfig";
import { SocialLinks } from "@/components/ui";
import ContactForm from "./ContactForm";

const infoItems = [
  {
    icon: HiOutlineMail,
    label: "Email",
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
  },
  {
    icon: HiOutlinePhone,
    label: "Phone",
    value: siteConfig.contact.phone,
    href: `tel:${siteConfig.contact.phone.replace(/\s/g, "")}`,
  },
  {
    icon: HiOutlineLocationMarker,
    label: "Office",
    value: siteConfig.contact.address,
    href: null,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-surface-dark py-24 sm:py-32"
    >
      {/* ── Subtle dark gradient mesh BG ──────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 h-[600px] w-[600px] rounded-full bg-primary/6 blur-[150px]" />
        <div className="absolute bottom-1/4 left-1/4 h-[400px] w-[400px] rounded-full bg-primary-light/4 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(45,212,191,0.4) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ──────────────────────────────────── */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block rounded-full border border-primary-light/20 bg-primary-light/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-primary-light mb-4">
            Contact
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-text-inverse sm:text-4xl lg:text-5xl">
            Let&apos;s Build Something{" "}
            <span className="text-gradient-primary">Great</span>
          </h2>
        </motion.div>

        {/* ── Two-Column Grid ─────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ── Left: Info ──────────────────────────────────────── */}
          <div className="flex flex-col justify-center">
            <motion.p
              className="text-lg text-neutral-400 leading-relaxed mb-10"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
            >
              Have a project in mind or need technical expertise? We&apos;d love
              to hear from you. Drop us a message and our team will get back to
              you within 24 hours.
            </motion.p>

            {/* Contact items */}
            <div className="space-y-6 mb-10">
              {infoItems.map(({ icon: Icon, label, value, href }, i) => (
                <motion.div
                  key={label}
                  className="flex items-start gap-4"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i + 1}
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-light/10 text-primary-light">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-0.5">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm font-medium text-neutral-200 hover:text-primary-light transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-neutral-200">
                        {value}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={4}
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">
                Follow Us
              </p>
              <SocialLinks links={siteConfig.socials} size="md" light />
            </motion.div>
          </div>

          {/* ── Right: Form ─────────────────────────────────────── */}
          <motion.div
            className="rounded-2xl border border-neutral-700/40 bg-neutral-800/60 p-6 shadow-lg backdrop-blur-sm sm:p-8"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
