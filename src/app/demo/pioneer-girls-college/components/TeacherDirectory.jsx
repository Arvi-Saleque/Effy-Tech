"use client";

import { useMemo, useState } from "react";
import { Search, UserRound } from "lucide-react";

export default function TeacherDirectory({ teachers }) {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("সব বিভাগ");

  const departments = useMemo(
    () => ["সব বিভাগ", ...Array.from(new Set(teachers.map((teacher) => teacher.department))).sort()],
    [teachers],
  );

  const filteredTeachers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return teachers.filter((teacher) => {
      const matchesDepartment = department === "সব বিভাগ" || teacher.department === department;
      const searchable = `${teacher.name} ${teacher.designation} ${teacher.department}`.toLowerCase();
      return matchesDepartment && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [department, query, teachers]);

  return (
    <section className="pgc-section">
      <div className="pgc-container">
        <div className="pgc-directory-tools">
          <label className="pgc-search-field">
            <Search size={18} aria-hidden="true" />
            <span className="pgc-sr-only">শিক্ষক খুঁজুন</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="নাম, পদবি বা বিভাগ লিখুন"
            />
          </label>
          <label className="pgc-select-field">
            <span>বিভাগ</span>
            <select value={department} onChange={(event) => setDepartment(event.target.value)}>
              {departments.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>

        {filteredTeachers.length > 0 ? (
          <div className="pgc-teacher-grid">
            {filteredTeachers.map((teacher) => (
              <article className="pgc-teacher-card" key={`${teacher.name}-${teacher.department}`}>
                <div className="pgc-teacher-card__avatar" aria-hidden="true">
                  <UserRound size={26} />
                </div>
                <div>
                  <h3>{teacher.name}</h3>
                  <p>{teacher.designation}</p>
                  <span>{teacher.department}</span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="pgc-empty-state">এই অনুসন্ধানের সঙ্গে মিল পাওয়া যায়নি।</p>
        )}
      </div>
    </section>
  );
}
