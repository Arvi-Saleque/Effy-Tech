'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, AlertCircle } from 'react-icons/fa6';
import Button from '@/components/ui/Button';

export default function EmailConfirmedPage() {
  const searchParams = useSearchParams();
  const hasError = searchParams.has('error') || searchParams.has('error_code');

  return (
    <>
      <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-primary-lightest via-neutral-50 to-accent-lightest">
        <div className="w-full max-w-md">
          {/* Card Container */}
          <div className="bg-neutral-white rounded-2xl shadow-lg p-8 sm:p-10 border border-neutral-200">
            {/* Logo / Brand */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-lightest mb-4">
                <span className="text-lg font-bold text-primary">E</span>
              </div>
              <p className="text-sm font-medium text-text-secondary">Effy Tech</p>
            </div>

            {/* Success State */}
            {!hasError && (
              <>
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-lightest">
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                  </div>
                </div>

                {/* Heading */}
                <h1 className="text-2xl sm:text-3xl font-bold text-text-primary text-center mb-3">
                  Email Verified Successfully
                </h1>

                {/* Project Title */}
                <p className="text-sm font-semibold text-primary text-center mb-4 uppercase tracking-wide">
                  Islamic Amal Tracker
                </p>

                {/* Supporting Text */}
                <p className="text-text-secondary text-center mb-8 leading-relaxed">
                  Your email has been confirmed. You can now return to the Islamic Amal Tracker app and sign in.
                </p>

                {/* CTA Button */}
                <div className="mb-6">
                  <Button
                    href="/"
                    variant="primary"
                    size="lg"
                    className="w-full"
                  >
                    Back to EffyTech
                  </Button>
                </div>

                {/* Secondary Link */}
                <div className="text-center">
                  <Link
                    href="/projects/IAM"
                    className="text-primary hover:text-primary-dark font-medium text-sm transition-colors"
                  >
                    Learn more about Islamic Amal Tracker
                  </Link>
                </div>
              </>
            )}

            {/* Error State */}
            {hasError && (
              <>
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100">
                    <AlertCircle className="w-8 h-8 text-error" />
                  </div>
                </div>

                {/* Heading */}
                <h1 className="text-2xl sm:text-3xl font-bold text-text-primary text-center mb-3">
                  Verification Link Issue
                </h1>

                {/* Project Title */}
                <p className="text-sm font-semibold text-primary text-center mb-4 uppercase tracking-wide">
                  Islamic Amal Tracker
                </p>

                {/* Supporting Text */}
                <p className="text-text-secondary text-center mb-8 leading-relaxed">
                  This verification link may be expired or already used. Please return to the app and request a new verification email.
                </p>

                {/* CTA Button */}
                <div className="mb-6">
                  <Button
                    href="/"
                    variant="primary"
                    size="lg"
                    className="w-full"
                  >
                    Back to EffyTech
                  </Button>
                </div>

                {/* Secondary Link */}
                <div className="text-center">
                  <Link
                    href="/projects/IAM"
                    className="text-primary hover:text-primary-dark font-medium text-sm transition-colors"
                  >
                    Return to Islamic Amal Tracker
                  </Link>
                </div>
              </>
            )}

            {/* Footer Note */}
            <div className="mt-8 pt-6 border-t border-neutral-200">
              <p className="text-xs text-text-tertiary text-center">
                If you didn't request this email, you can safely ignore it.
              </p>
            </div>
          </div>

          {/* Subtle Branding Footer */}
          <p className="text-center text-xs text-text-tertiary mt-6">
            © 2026 Effy Tech. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
}

export const metadata = {
  title: 'Email Verified | Islamic Amal Tracker',
  description: 'Your Islamic Amal Tracker email has been verified. Return to the app and sign in.',
  robots: 'noindex, nofollow',
};
