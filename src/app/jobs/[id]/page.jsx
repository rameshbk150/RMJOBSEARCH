import Link from "next/link";
import { notFound } from "next/navigation";

import { jobsData } from "@/data/DataSite";

import ApplyJobButton from "@/components/ApplyJobButton";

import {
  FaArrowLeft,
  FaBuilding,
  FaLocationDot,
  FaBriefcase,
  FaLaptop,
  FaGraduationCap,
  FaIndianRupeeSign,
  FaClock,
  FaUserGroup,
} from "react-icons/fa6";

export default async function JobDetailsPage({
  params,
}) {
  const { id } = await params;

  const job = jobsData.find(
    (item) =>
      item.id === Number(id)
  );

  if (!job) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 py-10 sm:py-12">
      <section
        className="
          mx-auto
          max-w-5xl
          px-4
          sm:px-6
          lg:px-8
        "
      >
        {/* BACK */}
        <Link
          href="/jobs"
          className="
            mb-6
            inline-flex
            items-center
            gap-2
            text-sm
            font-semibold
            text-blue-600
            transition
            hover:text-blue-700
          "
        >
          <FaArrowLeft />

          Back to Jobs
        </Link>

        <div
          className="
            overflow-hidden
            rounded-[28px]
            border
            border-slate-200
            bg-white
            shadow-[0_15px_50px_rgba(15,23,42,0.07)]
          "
        >
          {/* HEADER */}
          <div
            className="
              bg-gradient-to-br
              from-white
              via-blue-50/50
              to-indigo-50/60
              p-6
              md:p-8
            "
          >
            <div className="flex flex-wrap gap-2">
              {job.category && (
                <span
                  className="
                    rounded-full
                    border
                    border-blue-100
                    bg-blue-50
                    px-3
                    py-1.5
                    text-xs
                    font-bold
                    text-blue-700
                  "
                >
                  {job.category}
                </span>
              )}

              {job.featured && (
                <span
                  className="
                    rounded-full
                    border
                    border-amber-100
                    bg-amber-50
                    px-3
                    py-1.5
                    text-xs
                    font-bold
                    text-amber-700
                  "
                >
                  Featured
                </span>
              )}
            </div>

            <h1
              className="
                mt-5
                text-2xl
                font-extrabold
                tracking-tight
                text-slate-900
                sm:text-3xl
                md:text-4xl
              "
            >
              {job.title}
            </h1>

            <div
              className="
                mt-5
                flex
                flex-wrap
                items-center
                gap-x-6
                gap-y-3
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-sm
                  font-semibold
                  text-slate-700
                "
              >
                <FaBuilding className="text-blue-600" />

                {job.company}
              </div>

              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-sm
                  text-slate-500
                "
              >
                <FaLocationDot className="text-blue-600" />

                {job.location}
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            {/* DETAILS */}
            <div
              className="
                grid
                gap-4
                sm:grid-cols-2
                lg:grid-cols-3
              "
            >
              <DetailItem
                icon={
                  <FaIndianRupeeSign />
                }
                label="Salary"
                value={job.salary}
              />

              <DetailItem
                icon={<FaBriefcase />}
                label="Job Type"
                value={job.type}
              />

              <DetailItem
                icon={<FaLaptop />}
                label="Work Mode"
                value={job.workMode}
              />

              <DetailItem
                icon={<FaClock />}
                label="Experience"
                value={job.experience}
              />

              <DetailItem
                icon={
                  <FaGraduationCap />
                }
                label="Qualification"
                value={
                  job.qualification
                }
              />

              <DetailItem
                icon={<FaUserGroup />}
                label="Openings"
                value={`${job.openings} Openings`}
              />
            </div>

            {/* DESCRIPTION */}
            <div
              className="
                mt-8
                border-t
                border-slate-100
                pt-8
              "
            >
              <h2
                className="
                  text-xl
                  font-bold
                  text-slate-900
                "
              >
                Job Description
              </h2>

              <p
                className="
                  mt-3
                  leading-7
                  text-slate-600
                "
              >
                {job.description}
              </p>
            </div>

            {/* SKILLS */}
            <div
              className="
                mt-8
                border-t
                border-slate-100
                pt-8
              "
            >
              <h2
                className="
                  text-xl
                  font-bold
                  text-slate-900
                "
              >
                Required Skills
              </h2>

              <div
                className="
                  mt-4
                  flex
                  flex-wrap
                  gap-2
                "
              >
                {job.skills?.map(
                  (skill) => (
                    <span
                      key={skill}
                      className="
                        rounded-full
                        border
                        border-blue-100
                        bg-blue-50
                        px-4
                        py-2
                        text-sm
                        font-semibold
                        text-blue-700
                      "
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* RESPONSIBILITIES */}
            <div
              className="
                mt-8
                border-t
                border-slate-100
                pt-8
              "
            >
              <h2
                className="
                  text-xl
                  font-bold
                  text-slate-900
                "
              >
                Responsibilities
              </h2>

              <ul className="mt-4 space-y-3">
                {job.responsibilities?.map(
                  (item, index) => (
                    <li
                      key={index}
                      className="
                        flex
                        items-start
                        gap-3
                        leading-7
                        text-slate-600
                      "
                    >
                      <span
                        className="
                          mt-2.5
                          h-2
                          w-2
                          shrink-0
                          rounded-full
                          bg-blue-600
                        "
                      />

                      {item}
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* DATES */}
            <div
              className="
                mt-8
                grid
                gap-4
                border-t
                border-slate-100
                pt-8
                sm:grid-cols-2
              "
            >
              <div
                className="
                  rounded-xl
                  bg-slate-50
                  p-4
                "
              >
                <p
                  className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide
                    text-slate-400
                  "
                >
                  Posted Date
                </p>

                <p
                  className="
                    mt-1
                    font-semibold
                    text-slate-800
                  "
                >
                  {job.postedDate}
                </p>
              </div>

              <div
                className="
                  rounded-xl
                  bg-slate-50
                  p-4
                "
              >
                <p
                  className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide
                    text-slate-400
                  "
                >
                  Application Deadline
                </p>

                <p
                  className="
                    mt-1
                    font-semibold
                    text-slate-800
                  "
                >
                  {job.deadline}
                </p>
              </div>
            </div>

            {/* APPLY */}
            <ApplyJobButton
              job={{
                id: job.id,
                title: job.title,
                company: job.company,
              }}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function DetailItem({
  icon,
  label,
  value,
}) {
  return (
    <div
      className="
        flex
        items-start
        gap-3
        rounded-2xl
        border
        border-slate-100
        bg-slate-50
        p-4
      "
    >
      <div
        className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-blue-100
          text-blue-600
        "
      >
        {icon}
      </div>

      <div>
        <p
          className="
            text-xs
            font-medium
            text-slate-400
          "
        >
          {label}
        </p>

        <p
          className="
            mt-1
            text-sm
            font-bold
            text-slate-800
          "
        >
          {value}
        </p>
      </div>
    </div>
  );
}