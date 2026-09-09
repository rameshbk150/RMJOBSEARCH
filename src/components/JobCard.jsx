import Link from "next/link";
import {
  FaArrowRight,
  FaBriefcase,
  FaBuilding,
  FaGraduationCap,
  FaIndianRupeeSign,
  FaLaptop,
  FaLocationDot,
} from "react-icons/fa6";

export default function JobCard({ job }) {
  return (
    <article
      className="
        group relative overflow-hidden
        rounded-[26px]
        border border-slate-200/80
        bg-white
        p-5 sm:p-6
        shadow-[0_10px_35px_rgba(15,23,42,0.06)]
        transition-all duration-300
        hover:-translate-y-1.5
        hover:border-blue-200
        hover:shadow-[0_22px_55px_rgba(37,99,235,0.14)]
      "
    >
      {/* Premium top glow */}
      <div
        className="
          pointer-events-none absolute
          -right-16 -top-16
          h-40 w-40
          rounded-full
          bg-blue-100/60
          blur-3xl
          transition-all duration-500
          group-hover:bg-blue-200/70
        "
      />

      {/* Header */}
      <div className="relative flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-4">
          {/* Company Icon */}
          <div
            className="
              flex h-14 w-14 shrink-0
              items-center justify-center
              rounded-2xl
              border border-blue-100
              bg-gradient-to-br from-blue-50 to-indigo-50
              text-blue-600
              shadow-sm
            "
          >
            <FaBuilding className="text-xl" />
          </div>

          <div className="min-w-0">
            <h2
              className="
                text-lg font-bold leading-snug
                text-slate-900
                transition-colors duration-300
                group-hover:text-blue-700
                sm:text-xl
              "
            >
              {job.title}
            </h2>

            <p className="mt-1.5 flex items-center gap-2 text-sm font-medium text-slate-500">
              <FaBuilding className="shrink-0 text-slate-400" />
              <span className="truncate">{job.company}</span>
            </p>
          </div>
        </div>

        {/* Featured Badge */}
        <span
          className="
            hidden shrink-0
            rounded-full
            border border-emerald-100
            bg-emerald-50
            px-3 py-1.5
            text-[11px] font-bold
            uppercase tracking-wide
            text-emerald-700
            sm:inline-flex
          "
        >
          Hiring
        </span>
      </div>

      {/* Divider */}
      <div className="my-5 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      {/* Job Information */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {/* Work Mode */}
        <div
          className="
            flex items-center gap-3
            rounded-xl
            border border-slate-100
            bg-slate-50/80
            px-3.5 py-3
          "
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
            <FaLaptop />
          </div>

          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Work Mode
            </p>

            <p className="mt-0.5 truncate text-sm font-semibold text-slate-700">
              {job.workMode}
            </p>
          </div>
        </div>

        {/* Job Type */}
        <div
          className="
            flex items-center gap-3
            rounded-xl
            border border-slate-100
            bg-slate-50/80
            px-3.5 py-3
          "
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
            <FaBriefcase />
          </div>

          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Job Type
            </p>

            <p className="mt-0.5 truncate text-sm font-semibold text-slate-700">
              {job.type}
            </p>
          </div>
        </div>

        {/* Qualification */}
        <div
          className="
            flex items-center gap-3
            rounded-xl
            border border-slate-100
            bg-slate-50/80
            px-3.5 py-3
          "
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
            <FaGraduationCap />
          </div>

          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Qualification
            </p>

            <p className="mt-0.5 truncate text-sm font-semibold text-slate-700">
              {job.qualification}
            </p>
          </div>
        </div>

        {/* Salary */}
        <div
          className="
            flex items-center gap-3
            rounded-xl
            border border-slate-100
            bg-slate-50/80
            px-3.5 py-3
          "
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
            <FaIndianRupeeSign />
          </div>

          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Salary
            </p>

            <p className="mt-0.5 truncate text-sm font-bold text-slate-800">
              {job.salary}
            </p>
          </div>
        </div>
      </div>

      {/* Location - optional */}
      {job.location && (
        <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
          <FaLocationDot className="text-blue-600" />
          <span>{job.location}</span>
        </div>
      )}

      {/* Skills */}
      <div className="mt-5">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
            Required Skills
          </p>

          {job.skills?.length > 0 && (
            <span className="text-xs font-medium text-slate-400">
              {job.skills.length} skills
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {job.skills?.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="
                rounded-full
                border border-blue-100
                bg-blue-50
                px-3 py-1.5
                text-xs font-semibold
                text-blue-700
              "
            >
              {skill}
            </span>
          ))}

          {job.skills?.length > 4 && (
            <span
              className="
                rounded-full
                border border-slate-200
                bg-slate-50
                px-3 py-1.5
                text-xs font-semibold
                text-slate-500
              "
            >
              +{job.skills.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-100 pt-5">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
            Opportunity
          </p>

          <p className="mt-0.5 text-sm font-semibold text-slate-700">
            Apply for this position
          </p>
        </div>

        <Link
          href={`/jobs/${job.id}`}
          className="
            inline-flex shrink-0
            items-center justify-center gap-2
            rounded-xl
            bg-gradient-to-r from-blue-600 to-indigo-600
            px-5 py-3
            text-sm font-bold
            text-white
            shadow-[0_8px_20px_rgba(37,99,235,0.25)]
            transition-all duration-300
            hover:-translate-y-0.5
            hover:shadow-[0_12px_28px_rgba(37,99,235,0.35)]
            active:scale-[0.98]
          "
        >
          View Job

          <FaArrowRight
            className="
              text-xs
              transition-transform duration-300
              group-hover:translate-x-1
            "
          />
        </Link>
      </div>
    </article>
  );
}