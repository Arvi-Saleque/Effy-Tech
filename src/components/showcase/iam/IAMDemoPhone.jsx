"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import {
  FaBell,
  FaBookOpen,
  FaChartLine,
  FaCheck,
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight,
  FaHome,
  FaMosque,
  FaPrayingHands,
  FaQuran,
  FaRedo,
  FaThLarge,
} from "react-icons/fa";

const demoTabs = [
  { id: "today", label: "Today", Icon: FaHome },
  { id: "prayer", label: "Prayer", Icon: FaMosque },
  { id: "amal", label: "Amal", Icon: FaCheckCircle },
  { id: "dhikr", label: "Dhikr", Icon: FaPrayingHands },
  { id: "more", label: "More", Icon: FaThLarge },
];

const prayerOptions = ["Jamaah", "Awal", "Pending", "Late", "Kaza", "Missed"];

const moreItems = [
  { label: "Reading", Icon: FaBookOpen, tourHint: "Reading" },
  { label: "Dua Library", Icon: FaQuran, tourHint: "Dua" },
  { label: "Statistics", Icon: FaChartLine, tourHint: "Progress" },
  { label: "Reminders", Icon: FaBell, tourHint: "Reminder" },
];

function ProgressRing({ value, size = 58, stroke = 6 }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg className="-rotate-90" width={size} height={size} aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e8e3d7"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e9b900"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-500"
        />
      </svg>
      <span className="absolute inset-0 grid place-items-center text-[11px] font-extrabold text-[#1e293b]">
        {value}%
      </span>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="flex h-7 shrink-0 items-center justify-between px-4 text-[9px] font-bold text-[#1f2937]">
      <span>10:30</span>
      <div className="flex items-center gap-1 text-[8px]">
        <span>4G</span>
        <span className="tracking-[-1px]">▮▮▮</span>
        <span>●</span>
      </div>
    </div>
  );
}

function DemoHeader({ title, subtitle, icon: Icon }) {
  return (
    <div className="rounded-[22px] border border-[#eadca5] bg-gradient-to-br from-[#fffdf7] to-[#fbf2d7] p-4 shadow-[0_10px_28px_rgba(79,66,27,0.08)]">
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#f9edbd] text-[#e8b600]">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-[19px] font-extrabold leading-tight text-[#172033]">
            {title}
          </h3>
          <p className="mt-1 text-[9px] font-semibold leading-relaxed text-[#647084]">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}

function TodayScreen({ onNavigate }) {
  return (
    <div className="space-y-3 pb-3">
      <DemoHeader
        title="Assalamu Alaikum"
        subtitle="Stay mindful of today’s prayer, Amal and Dhikr."
        icon={FaHome}
      />

      <button
        type="button"
        onClick={() => onNavigate("prayer")}
        className="w-full rounded-[22px] border border-[#eadca5] bg-[#fffdf7] p-4 text-left shadow-[0_8px_24px_rgba(79,66,27,0.07)] transition active:scale-[0.99]"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#e7b500]">
              Prayer Times
            </p>
            <p className="mt-2 text-[23px] font-extrabold text-[#182133]">Isha</p>
            <p className="mt-0.5 text-[11px] font-bold text-[#e7b500]">
              8:11 PM – 12:00 AM
            </p>
          </div>
          <ProgressRing value={62} size={62} />
        </div>
        <div className="mt-4 grid grid-cols-5 gap-1 border-t border-[#eee8dc] pt-3">
          {["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"].map((item, index) => (
            <div key={item} className="text-center">
              <span
                className={`mx-auto block h-2.5 w-2.5 rounded-full border ${
                  index === 4
                    ? "border-[#e7b500] bg-[#e7b500]"
                    : "border-[#8b95a6] bg-transparent"
                }`}
              />
              <span className="mt-1 block text-[7px] font-bold text-[#374151]">
                {item}
              </span>
            </div>
          ))}
        </div>
      </button>

      <div className="rounded-[22px] border border-[#eadca5] bg-[#fffaf0] p-4 shadow-[0_8px_24px_rgba(79,66,27,0.06)]">
        <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#e7b500]">
          Next Best Action
        </p>
        <p className="mt-2 text-[16px] font-extrabold text-[#1f2937]">
          Durood is still pending.
        </p>
        <p className="mt-1 text-[9px] font-semibold text-[#667085]">
          Complete your After Isha routine.
        </p>
        <button
          type="button"
          onClick={() => onNavigate("amal")}
          className="mt-3 ml-auto flex items-center gap-2 rounded-full bg-[#efbd00] px-4 py-2 text-[10px] font-extrabold text-white shadow-[0_8px_20px_rgba(239,189,0,0.24)]"
        >
          Continue <FaChevronRight className="h-2.5 w-2.5" />
        </button>
      </div>

      <div className="rounded-[22px] border border-[#ece7dd] bg-white p-4 shadow-[0_8px_24px_rgba(79,66,27,0.05)]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[15px] font-extrabold text-[#1f2937]">Today’s Progress</p>
            <p className="mt-1 text-[25px] font-black text-[#182133]">25%</p>
          </div>
          <span className="rounded-full bg-[#def7ea] px-2.5 py-1 text-[8px] font-extrabold text-[#15976a]">
            ↑ 25% from yesterday
          </span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            { id: "prayer", label: "Prayer", Icon: FaMosque, value: 40 },
            { id: "amal", label: "Amal", Icon: FaCheckCircle, value: 25 },
            { id: "dhikr", label: "Dhikr", Icon: FaPrayingHands, value: 10 },
          ].map(({ id, label, Icon, value }) => (
            <button
              key={id}
              type="button"
              onClick={() => onNavigate(id)}
              className="rounded-2xl bg-[#fbfaf6] px-2 py-3 text-center transition hover:bg-[#f8f2df] active:scale-[0.98]"
            >
              <div className="mx-auto grid h-9 w-9 place-items-center rounded-full bg-[#fff6d8] text-[#e7b500]">
                <Icon className="h-4 w-4" />
              </div>
              <p className="mt-2 text-[9px] font-extrabold text-[#273244]">{label}</p>
              <p className="mt-0.5 text-[8px] font-bold text-[#8a94a5]">{value}%</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function PrayerScreen({ prayerChoice, setPrayerChoice }) {
  return (
    <div className="space-y-3 pb-3">
      <DemoHeader
        title="Prayer"
        subtitle="Track Fard, Sunnah and Kaza with detailed status."
        icon={FaMosque}
      />

      <div className="rounded-[24px] border-2 border-[#e9bd18] bg-[#fffefa] p-4 shadow-[0_10px_28px_rgba(173,132,0,0.11)]">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full border border-[#e9bd18] bg-[#fffdf3]">
              <span className="h-4 w-4 rounded-full bg-[#efbd00]" />
            </div>
            <div>
              <h4 className="text-[19px] font-extrabold text-[#182133]">Dhuhr</h4>
              <p className="text-[9px] font-bold text-[#667085]">4 fard rakat</p>
            </div>
          </div>
          <p className="text-[14px] font-extrabold text-[#e5b400]">12:07 PM</p>
        </div>

        <div className="mt-4 rounded-2xl border border-[#ece8df] bg-white p-3">
          <p className="text-[12px] font-extrabold text-[#1f2937]">Fard</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {prayerOptions.map((option) => {
              const selected = prayerChoice === option;
              const danger = option === "Missed";
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setPrayerChoice(option)}
                  className={`rounded-full border px-3 py-2 text-[9px] font-extrabold transition active:scale-95 ${
                    selected
                      ? danger
                        ? "border-[#ef4444] bg-[#ef4444] text-white"
                        : "border-[#efbd00] bg-[#efbd00] text-white"
                      : "border-[#ddd8cf] bg-[#fffefa] text-[#4b5563]"
                  }`}
                >
                  {selected && <FaCheck className="mr-1 inline h-2.5 w-2.5" />}
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <button
            type="button"
            className="rounded-2xl border border-[#ece8df] bg-white p-3 text-left"
          >
            <p className="text-[10px] font-extrabold text-[#1f2937]">Sunnah before</p>
            <p className="mt-1 text-[9px] font-bold text-[#14a673]">✓ Prayed</p>
          </button>
          <button
            type="button"
            className="rounded-2xl border border-[#ece8df] bg-white p-3 text-left"
          >
            <p className="text-[10px] font-extrabold text-[#1f2937]">Sunnah after</p>
            <p className="mt-1 text-[9px] font-bold text-[#ef4444]">Missed</p>
          </button>
        </div>
      </div>

      {["Asr", "Maghrib", "Isha"].map((name, index) => (
        <div
          key={name}
          className="flex items-center justify-between rounded-[20px] border border-[#ece8df] bg-white px-4 py-3 shadow-[0_6px_18px_rgba(79,66,27,0.04)]"
        >
          <div className="flex items-center gap-3">
            <span className="h-8 w-8 rounded-full border-2 border-dashed border-[#99a1ad]" />
            <div>
              <p className="text-[14px] font-extrabold text-[#1f2937]">{name}</p>
              <p className="text-[8px] font-bold text-[#7b8492]">4 fard rakat</p>
            </div>
          </div>
          <p className="text-[11px] font-extrabold text-[#4b5563]">
            {["4:45 PM", "6:51 PM", "8:11 PM"][index]}
          </p>
        </div>
      ))}
    </div>
  );
}

function AmalScreen({ amalDone, setAmalDone }) {
  const completed = amalDone ? 3 : 2;
  const progress = Math.round((completed / 8) * 100);

  return (
    <div className="space-y-3 pb-3">
      <DemoHeader
        title="Amal"
        subtitle="Create fully custom daily Amal items and routines."
        icon={FaCheckCircle}
      />

      <div className="flex gap-2 overflow-hidden">
        {['All', 'Miswak', 'Nafl Prayer', 'Quran'].map((filter, index) => (
          <button
            key={filter}
            type="button"
            className={`shrink-0 rounded-full px-3 py-2 text-[9px] font-extrabold ${
              index === 0
                ? "bg-[#efbd00] text-white"
                : "border border-[#ded9d0] bg-white text-[#566072]"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="rounded-[22px] border border-[#eadca5] bg-[#fffefa] p-4 shadow-[0_8px_24px_rgba(79,66,27,0.06)]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[16px] font-extrabold text-[#1f2937]">Today’s Amal</p>
            <p className="mt-1 text-[9px] font-bold text-[#667085]">8 items planned today</p>
          </div>
          <ProgressRing value={progress} size={58} />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 border-t border-[#eee8dc] pt-4">
          <div className="text-center">
            <div className="mx-auto grid h-9 w-9 place-items-center rounded-full bg-[#dcf7eb] text-[#18a873]">
              <FaCheckCircle className="h-4 w-4" />
            </div>
            <p className="mt-2 text-[9px] font-bold text-[#667085]">Completed</p>
            <p className="text-[14px] font-black text-[#172033]">{completed}/8</p>
          </div>
          <div className="text-center">
            <div className="mx-auto grid h-9 w-9 place-items-center rounded-full bg-[#fff5d6] text-[#e4ae00]">⌛</div>
            <p className="mt-2 text-[9px] font-bold text-[#667085]">Remaining</p>
            <p className="text-[14px] font-black text-[#172033]">{8 - completed}</p>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setAmalDone((value) => !value)}
        className={`w-full rounded-[20px] border-2 p-4 text-left transition active:scale-[0.99] ${
          amalDone
            ? "border-[#19b77d] bg-[#effcf7]"
            : "border-[#e9bd18] bg-[#fffdf6]"
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={`grid h-10 w-10 place-items-center rounded-full ${
                amalDone
                  ? "bg-[#d8f7e9] text-[#16a36f]"
                  : "bg-[#fff4ca] text-[#dfad00]"
              }`}
            >
              <FaCheckCircle className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[14px] font-extrabold text-[#1f2937]">Use miswak</p>
              <p className="text-[9px] font-bold text-[#87909e]">Miswak</p>
            </div>
          </div>
          <span
            className={`rounded-full px-3 py-2 text-[9px] font-extrabold ${
              amalDone
                ? "bg-[#18a873] text-white"
                : "border border-[#e9bd18] text-[#dba900]"
            }`}
          >
            {amalDone ? "✓ Completed" : "Mark Done"}
          </span>
        </div>
      </button>
    </div>
  );
}

function DhikrScreen({ count, setCount }) {
  const target = 100;
  const progress = Math.min(100, Math.round((count / target) * 100));

  return (
    <div className="space-y-3 pb-3">
      <DemoHeader
        title="Dhikr"
        subtitle="Count, track targets and build a consistent habit."
        icon={FaPrayingHands}
      />

      <div className="rounded-[22px] border border-[#eadca5] bg-[#fffefa] p-4 text-center shadow-[0_8px_24px_rgba(79,66,27,0.06)]">
        <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#d9a800]">
          Astaghfirullah
        </p>
        <p className="mt-1 text-[9px] font-semibold text-[#7c8594]">Target: {target}</p>

        <button
          type="button"
          onClick={() => setCount((value) => value + 1)}
          className="relative mx-auto mt-4 grid h-36 w-36 place-items-center rounded-full border-[9px] border-[#f4e8af] bg-gradient-to-br from-[#fffef8] to-[#fff2c2] shadow-[0_18px_45px_rgba(176,132,0,0.18)] transition active:scale-95"
          aria-label="Increase Dhikr count"
        >
          <div>
            <p className="text-[40px] font-black leading-none text-[#172033]">{count}</p>
            <p className="mt-2 text-[9px] font-extrabold text-[#dba900]">Tap to count</p>
          </div>
          <span
            className="absolute inset-[-9px] rounded-full border-[9px] border-transparent"
            style={{
              background: `conic-gradient(#e9b900 ${progress * 3.6}deg, transparent 0) border-box`,
              WebkitMask:
                "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          />
        </button>

        <p className="mt-4 text-[10px] font-extrabold text-[#435067]">{progress}% completed</p>
        <div className="mt-3 flex justify-center gap-2">
          <button
            type="button"
            onClick={() => setCount((value) => Math.max(0, value - 1))}
            className="rounded-full border border-[#ddd8cf] bg-white px-4 py-2 text-[10px] font-extrabold text-[#4b5563]"
          >
            -1
          </button>
          <button
            type="button"
            onClick={() => setCount((value) => value + 10)}
            className="rounded-full bg-[#efbd00] px-4 py-2 text-[10px] font-extrabold text-white"
          >
            +10
          </button>
          <button
            type="button"
            onClick={() => setCount(0)}
            className="grid h-8 w-8 place-items-center rounded-full border border-[#ddd8cf] bg-white text-[#4b5563]"
            aria-label="Reset Dhikr count"
          >
            <FaRedo className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

function MoreScreen({ onOpenTour }) {
  return (
    <div className="space-y-3 pb-3">
      <DemoHeader
        title="More"
        subtitle="Explore routines, reminders, Dua, insights and settings."
        icon={FaThLarge}
      />

      <div className="grid grid-cols-2 gap-3">
        {moreItems.map(({ label, Icon, tourHint }) => (
          <button
            key={label}
            type="button"
            onClick={() => onOpenTour(tourHint)}
            className="rounded-[20px] border border-[#ece8df] bg-white p-4 text-left shadow-[0_8px_22px_rgba(79,66,27,0.05)] transition hover:border-[#e9bd18] hover:bg-[#fffdf6] active:scale-[0.98]"
          >
            <div className="grid h-10 w-10 place-items-center rounded-full bg-[#fff4cc] text-[#e3af00]">
              <Icon className="h-4 w-4" />
            </div>
            <p className="mt-3 text-[12px] font-extrabold text-[#1f2937]">{label}</p>
            <p className="mt-1 text-[8px] font-semibold text-[#8992a0]">Open preview</p>
          </button>
        ))}
      </div>

      <div className="rounded-[20px] border border-[#eadca5] bg-[#fffaf0] p-4">
        <p className="text-[11px] font-extrabold text-[#1f2937]">Demo privacy</p>
        <p className="mt-1 text-[8px] font-semibold leading-relaxed text-[#6d7685]">
          Nothing is saved. This interactive preview resets when the page reloads.
        </p>
      </div>
    </div>
  );
}

function BottomNavigation({ activeTab, onChange }) {
  return (
    <div className="relative z-20 grid h-[66px] shrink-0 grid-cols-5 border-t border-[#e8e2d8] bg-[#fffdf8]/95 px-1 pb-1 backdrop-blur-xl">
      {demoTabs.map(({ id, label, Icon }) => {
        const active = activeTab === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className="relative flex flex-col items-center justify-center gap-1"
            aria-pressed={active}
          >
            {active && (
              <motion.span
                layoutId="iam-demo-active-tab"
                className="absolute -top-3 h-12 w-12 rounded-full border border-[#f2df8a] bg-[#fff1bd] shadow-[0_8px_22px_rgba(177,132,0,0.18)]"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <Icon
              className={`relative h-4 w-4 ${
                active ? "text-[#e2ad00]" : "text-[#526074]"
              }`}
            />
            <span
              className={`relative text-[7px] font-extrabold ${
                active ? "text-[#1f2937]" : "text-[#526074]"
              }`}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function AppDemo({ onOpenTour }) {
  const [activeTab, setActiveTab] = useState("today");
  const [prayerChoice, setPrayerChoice] = useState("Jamaah");
  const [amalDone, setAmalDone] = useState(false);
  const [dhikrCount, setDhikrCount] = useState(18);

  const content = {
    today: <TodayScreen onNavigate={setActiveTab} />,
    prayer: (
      <PrayerScreen
        prayerChoice={prayerChoice}
        setPrayerChoice={setPrayerChoice}
      />
    ),
    amal: <AmalScreen amalDone={amalDone} setAmalDone={setAmalDone} />,
    dhikr: <DhikrScreen count={dhikrCount} setCount={setDhikrCount} />,
    more: <MoreScreen onOpenTour={onOpenTour} />,
  }[activeTab];

  return (
    <div className="flex h-full flex-col bg-[#f7f4ec] text-[#1f2937]">
      <StatusBar />
      <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-3 pt-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            {content}
          </motion.div>
        </AnimatePresence>
      </div>
      <BottomNavigation activeTab={activeTab} onChange={setActiveTab} />
    </div>
  );
}

function ScreenTour({ screenshots, index, setIndex }) {
  const startX = useRef(null);
  const total = screenshots.length;
  const current = screenshots[index];

  const go = (direction) => {
    setIndex((value) => (value + direction + total) % total);
  };

  const onTouchStart = (event) => {
    startX.current = event.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event) => {
    if (startX.current == null) return;
    const endX = event.changedTouches[0]?.clientX ?? startX.current;
    const delta = endX - startX.current;
    startX.current = null;
    if (Math.abs(delta) < 42) return;
    go(delta > 0 ? -1 : 1);
  };

  if (!current) return null;

  return (
    <div
      className="relative h-full overflow-hidden bg-[#f7f4ec]"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.img
          key={current.src}
          src={current.src}
          alt={current.label}
          className="h-full w-full object-cover"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.99 }}
          transition={{ duration: 0.28 }}
          draggable={false}
        />
      </AnimatePresence>

      <div className="absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-black/55 to-transparent px-3 pb-8 pt-3 text-white">
        <span className="rounded-full bg-black/35 px-2.5 py-1 text-[8px] font-bold backdrop-blur-md">
          {index + 1} / {total}
        </span>
        <span className="max-w-[68%] truncate rounded-full bg-black/35 px-2.5 py-1 text-[8px] font-bold backdrop-blur-md">
          {current.label}
        </span>
      </div>

      <button
        type="button"
        onClick={() => go(-1)}
        className="absolute left-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-black/45 text-white backdrop-blur-md transition hover:bg-black/60"
        aria-label="Previous screenshot"
      >
        <FaChevronLeft className="h-3 w-3" />
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-black/45 text-white backdrop-blur-md transition hover:bg-black/60"
        aria-label="Next screenshot"
      >
        <FaChevronRight className="h-3 w-3" />
      </button>

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent px-4 pb-4 pt-12 text-center text-white">
        <p className="text-[8px] font-semibold opacity-90">Swipe or use arrows to explore</p>
        <div className="mx-auto mt-2 flex max-w-[220px] justify-center gap-1 overflow-hidden">
          {screenshots.slice(0, 9).map((shot, dotIndex) => (
            <button
              key={shot.src}
              type="button"
              onClick={() => setIndex(dotIndex)}
              className={`h-1.5 rounded-full transition-all ${
                dotIndex === index ? "w-5 bg-white" : "w-1.5 bg-white/45"
              }`}
              aria-label={`Show ${shot.label}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function IAMDemoPhone({
  screenshots = [],
  initialScreenshot,
  appName = "Islamic Amal Tracker",
}) {
  const orderedScreenshots = useMemo(() => {
    if (!initialScreenshot) return screenshots;
    const match = screenshots.find((item) => item.src === initialScreenshot);
    if (!match) return screenshots;
    return [match, ...screenshots.filter((item) => item.src !== initialScreenshot)];
  }, [initialScreenshot, screenshots]);

  const [mode, setMode] = useState("demo");
  const [tourIndex, setTourIndex] = useState(0);

  const openTourFor = (hint) => {
    const index = orderedScreenshots.findIndex((item) =>
      item.label.toLowerCase().includes(hint.toLowerCase()),
    );
    setTourIndex(index >= 0 ? index : 0);
    setMode("tour");
  };

  return (
    <div id="iam-demo" className="relative mx-auto w-full max-w-[430px]">
      <div className="mx-auto mb-4 flex w-fit rounded-full border border-neutral-700/50 bg-neutral-900/85 p-1 shadow-[0_14px_35px_rgba(0,0,0,0.24)] backdrop-blur-xl">
        {[
          { id: "demo", label: "App Demo" },
          { id: "tour", label: "Screen Tour" },
        ].map((item) => {
          const active = mode === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setMode(item.id)}
              aria-pressed={active}
              className={`relative rounded-full px-5 py-2 text-xs font-bold transition ${
                active ? "text-neutral-950" : "text-neutral-400 hover:text-neutral-100"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="iam-demo-mode"
                  className="absolute inset-0 rounded-full bg-primary-light"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative">{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="relative mx-auto w-[min(88vw,350px)]">
        <div className="absolute -inset-8 rounded-[4rem] bg-primary/10 blur-[55px]" />
        <div className="relative aspect-[720/1529] overflow-hidden rounded-[2.85rem] border-[7px] border-[#171c26] bg-[#171c26] p-[3px] shadow-[0_35px_110px_rgba(0,0,0,0.52)]">
          <div className="absolute left-1/2 top-[8px] z-30 h-[18px] w-[92px] -translate-x-1/2 rounded-full bg-[#171c26]" />
          <div className="absolute inset-[3px] overflow-hidden rounded-[2.35rem] bg-[#f7f4ec]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={mode}
                className="h-full"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.24 }}
              >
                {mode === "demo" ? (
                  <AppDemo onOpenTour={openTourFor} />
                ) : (
                  <ScreenTour
                    screenshots={orderedScreenshots}
                    index={tourIndex}
                    setIndex={setTourIndex}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-[11px] font-medium text-neutral-500">
        {mode === "demo"
          ? `Try a private, non-saving ${appName} demo.`
          : "Explore the real app screens inside the phone."}
      </p>
    </div>
  );
}
