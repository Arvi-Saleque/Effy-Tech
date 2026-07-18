import Image from "next/image";
import Link from "next/link";
import {
  FaArrowRight,
  FaArrowUpRightFromSquare,
  FaCircleCheck,
  FaCircleExclamation,
  FaCloudArrowUp,
  FaMobileScreenButton,
  FaShieldHalved,
  FaWhatsapp,
} from "react-icons/fa6";
import { MotionBoundary, TiltSurface } from "@/components/visuals";
import styles from "./confirmed.module.css";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.amaltracker.app";
const SUPPORT_URL =
  "https://wa.me/8801511190270?text=Hello%20Effy%20Tech%2C%20I%20need%20help%20with%20Islamic%20Amal%20Tracker%20email%20verification.";

function getParam(searchParams, key) {
  const value = searchParams?.[key];
  return Array.isArray(value) ? value[0] || "" : value || "";
}

function getVerificationState(searchParams) {
  const errorCode =
    getParam(searchParams, "error_code") || getParam(searchParams, "error");
  const hasError = Boolean(
    errorCode || getParam(searchParams, "error_description"),
  );

  if (!hasError) {
    return {
      tone: "success",
      eyebrow: "ACCOUNT CONFIRMATION",
      title: "Your email is verified.",
      description:
        "Your Islamic Amal Tracker account is ready. Return to the app and sign in using the email address you just verified.",
      bangla: "অ্যাপে ফিরে গিয়ে একই ইমেইল ঠিকানা দিয়ে সাইন ইন করুন।",
    };
  }

  const expired = ["otp_expired", "expired", "access_denied"].includes(
    errorCode.toLowerCase(),
  );

  return {
    tone: "error",
    eyebrow: "VERIFICATION SUPPORT",
    title: expired
      ? "This verification link has expired."
      : "The verification could not be completed.",
    description: expired
      ? "Return to Islamic Amal Tracker and request a new verification email. Only the latest verification link should be used."
      : "The link may already have been used or could not be validated. Request a new email from the app, then try again.",
    bangla:
      "অ্যাপ থেকে নতুন verification email পাঠিয়ে সর্বশেষ লিংকটি ব্যবহার করুন।",
  };
}

export default async function EmailConfirmedPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const state = getVerificationState(resolvedSearchParams);
  const isSuccess = state.tone === "success";

  return (
    <main className={`${styles.page} iam-confirmed-page`} data-tone={state.tone}>
      <div className={styles.ambientOne} aria-hidden="true" />
      <div className={styles.ambientTwo} aria-hidden="true" />

      <section className={styles.shell} aria-live="polite">
        <Link href="/projects/IAM" className={styles.brandLink}>
          <Image
            src="/images/amal/logo.png"
            alt="Islamic Amal Tracker logo"
            width={48}
            height={48}
            className={styles.brandLogo}
            priority
          />
          <span>
            <strong>Islamic Amal Tracker</strong>
            <small>Built by Effy Tech</small>
          </span>
        </Link>

        <MotionBoundary className={styles.motionBoundary}>
          <TiltSurface
            className={styles.tiltSurface}
            maxTilt={1.4}
            perspective={1400}
          >
            <div className={styles.grid}>
              <div className={styles.stageGrid} aria-hidden="true" />
              <article className={styles.statusCard}>
                <div
                  className={`${styles.stateBadge} ${
                    isSuccess ? styles.successBadge : styles.errorBadge
                  }`}
                >
                  <span aria-hidden="true" />
                  {isSuccess ? "Verification complete" : "Action required"}
                </div>

                <div
                  className={`${styles.statusIcon} ${
                    isSuccess ? styles.successIcon : styles.errorIcon
                  }`}
                  aria-hidden="true"
                >
                  {isSuccess ? <FaCircleCheck /> : <FaCircleExclamation />}
                </div>

            <p className={styles.eyebrow}>{state.eyebrow}</p>
            <h1>{state.title}</h1>
            <p className={styles.description}>{state.description}</p>
            <p className={styles.bangla}>{state.bangla}</p>

            <div className={styles.actions}>
              {isSuccess ? (
                <>
                  <a
                    href={PLAY_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.primaryAction}
                  >
                    Open on Google Play
                    <FaArrowUpRightFromSquare aria-hidden="true" />
                  </a>
                  <Link href="/projects/IAM" className={styles.secondaryAction}>
                    View the app page
                    <FaArrowRight aria-hidden="true" />
                  </Link>
                </>
              ) : (
                <>
                  <a
                    href={SUPPORT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.primaryAction}
                  >
                    Contact WhatsApp support
                    <FaWhatsapp aria-hidden="true" />
                  </a>
                  <a
                    href={PLAY_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.secondaryAction}
                  >
                    Open Google Play
                    <FaArrowUpRightFromSquare aria-hidden="true" />
                  </a>
                </>
              )}
            </div>

            <p className={styles.safetyNote}>
              If you did not request this email, no action is required.
            </p>
              </article>

              <aside className={styles.contextPanel}>
            <p className={styles.panelKicker}>WHAT HAPPENS NEXT</p>
            <h2>{isSuccess ? "Continue inside the app" : "Request a fresh link"}</h2>
            <p>
              {isSuccess
                ? "Email verification is complete. Your prayer, Amal, Dhikr and routine tracking continue inside Islamic Amal Tracker."
                : "Verification emails are generated from the app. Open the account screen, request a new email and use the newest link."}
            </p>

            <div className={styles.steps}>
              <div className={styles.step}>
                <span>
                  <FaMobileScreenButton aria-hidden="true" />
                </span>
                <div>
                  <strong>Return to the app</strong>
                  <p>Use the same verified email address.</p>
                </div>
              </div>
              <div className={styles.step}>
                <span>
                  <FaShieldHalved aria-hidden="true" />
                </span>
                <div>
                  <strong>Private by design</strong>
                  <p>Your account and sync access remain protected.</p>
                </div>
              </div>
              <div className={styles.step}>
                <span>
                  <FaCloudArrowUp aria-hidden="true" />
                </span>
                <div>
                  <strong>Optional secure sync</strong>
                  <p>Offline-first tracking remains available.</p>
                </div>
              </div>
            </div>

            <a
              href={SUPPORT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.supportLink}
            >
              Need help? Message Effy Tech support
              <FaArrowUpRightFromSquare aria-hidden="true" />
            </a>
              </aside>
            </div>
          </TiltSurface>
        </MotionBoundary>

        <p className={styles.footerText}>
          © 2026 Effy Tech. Islamic Amal Tracker support utility.
        </p>
      </section>
    </main>
  );
}
