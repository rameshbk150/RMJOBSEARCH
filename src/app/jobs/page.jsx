"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import JobCard from "@/components/JobCard";
import { jobsData } from "@/data/DataSite";

export default function JobsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 py-12" /> }>
      <JobsPageContent />
    </Suspense>
  );
}

function JobsPageContent() {
  const searchParams = useSearchParams();

  // Get search query from Header
  const urlSearch = searchParams.get("q") || "";

  const [search, setSearch] = useState(urlSearch);

  const [filters, setFilters] = useState({
    type: "",
    workMode: "",
    category: "",
    experience: "",
    location: "",
  });

  // ======================================================
  // FILTER OPTIONS
  // ======================================================

  const jobTypes = [
    ...new Set(
      jobsData
        .map((job) => job.type)
        .filter(Boolean)
    ),
  ];

  const workModes = [
    ...new Set(
      jobsData
        .map((job) => job.workMode)
        .filter(Boolean)
    ),
  ];

  const categories = [
    ...new Set(
      jobsData
        .map((job) => job.category)
        .filter(Boolean)
    ),
  ];

  const experiences = [
    ...new Set(
      jobsData
        .map((job) => job.experience)
        .filter(Boolean)
    ),
  ];

  const locations = [
    ...new Set(
      jobsData
        .map((job) => job.location)
        .filter(Boolean)
    ),
  ];

  // ======================================================
  // FILTER JOBS
  // ======================================================

  const filteredJobs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return jobsData.filter((job) => {
      // -----------------------------------------------
      // SEARCH
      // -----------------------------------------------

      const searchableText = [
        job.title,
        job.company,
        job.location,
        job.category,
        job.experience,
        job.qualification,
        job.salary,
        job.description,

        ...(job.skills || []),
        ...(job.responsibilities || []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !query ||
        searchableText.includes(query);

      // -----------------------------------------------
      // JOB TYPE
      // -----------------------------------------------

      const matchesType =
        !filters.type ||
        job.type === filters.type;

      // -----------------------------------------------
      // WORK MODE
      // -----------------------------------------------

      const matchesWorkMode =
        !filters.workMode ||
        job.workMode === filters.workMode;

      // -----------------------------------------------
      // CATEGORY
      // -----------------------------------------------

      const matchesCategory =
        !filters.category ||
        job.category === filters.category;

      // -----------------------------------------------
      // EXPERIENCE
      // -----------------------------------------------

      const matchesExperience =
        !filters.experience ||
        job.experience === filters.experience;

      // -----------------------------------------------
      // LOCATION
      // -----------------------------------------------

      const matchesLocation =
        !filters.location ||
        job.location === filters.location;

      return (
        matchesSearch &&
        matchesType &&
        matchesWorkMode &&
        matchesCategory &&
        matchesExperience &&
        matchesLocation
      );
    });
  }, [search, filters]);

  // ======================================================
  // FILTER CHANGE
  // ======================================================

  const handleFilterChange = (
    filterName,
    value
  ) => {
    setFilters((previous) => ({
      ...previous,
      [filterName]: value,
    }));
  };

  // ======================================================
  // CLEAR ALL
  // ======================================================

  const clearFilters = () => {
    setSearch("");

    setFilters({
      type: "",
      workMode: "",
      category: "",
      experience: "",
      location: "",
    });
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12">

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ================================================= */}
        {/* HEADING */}
        {/* ================================================= */}

        <div className="mb-8">

          <h1 className="text-3xl font-bold text-gray-900">
            Latest Jobs
          </h1>

          <p className="mt-2 text-gray-500">
            Find the latest job opportunities
            from top companies.
          </p>

        </div>

        {/* ================================================= */}
        {/* SEARCH BOX */}
        {/* ================================================= */}

        <div className="mb-6">

          <div className="relative">

            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search jobs, companies, skills..."
              className="
                w-full
                rounded-xl
                border
                border-gray-200
                bg-white
                px-5
                py-4
                text-gray-900
                shadow-sm
                outline-none
                transition
                placeholder:text-gray-400
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-100
              "
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-sm
                  font-medium
                  text-gray-400
                  hover:text-gray-700
                "
              >
                Clear
              </button>
            )}

          </div>

        </div>

        {/* ================================================= */}
        {/* FILTERS */}
        {/* ================================================= */}

        <div className="
          mb-8
          rounded-2xl
          border
          border-gray-200
          bg-white
          p-5
          shadow-sm
        ">

          <div className="
            mb-4
            flex
            items-center
            justify-between
          ">

            <h2 className="text-lg font-semibold text-gray-900">
              Filter Jobs
            </h2>

            <button
              type="button"
              onClick={clearFilters}
              className="
                text-sm
                font-medium
                text-blue-600
                hover:text-blue-800
              "
            >
              Clear Filters
            </button>

          </div>

          <div className="
            grid
            gap-4
            sm:grid-cols-2
            lg:grid-cols-5
          ">

            {/* JOB TYPE */}

            <select
              value={filters.type}
              onChange={(event) =>
                handleFilterChange(
                  "type",
                  event.target.value
                )
              }
              className="
                rounded-lg
                border
                border-gray-200
                bg-white
                px-4
                py-3
                text-sm
                text-gray-700
                outline-none
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-100
              "
            >
              <option value="">
                All Job Types
              </option>

              {jobTypes.map((type) => (
                <option
                  key={type}
                  value={type}
                >
                  {type}
                </option>
              ))}
            </select>

            {/* WORK MODE */}

            <select
              value={filters.workMode}
              onChange={(event) =>
                handleFilterChange(
                  "workMode",
                  event.target.value
                )
              }
              className="
                rounded-lg
                border
                border-gray-200
                bg-white
                px-4
                py-3
                text-sm
                text-gray-700
                outline-none
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-100
              "
            >
              <option value="">
                All Work Modes
              </option>

              {workModes.map((mode) => (
                <option
                  key={mode}
                  value={mode}
                >
                  {mode}
                </option>
              ))}
            </select>

            {/* CATEGORY */}

            <select
              value={filters.category}
              onChange={(event) =>
                handleFilterChange(
                  "category",
                  event.target.value
                )
              }
              className="
                rounded-lg
                border
                border-gray-200
                bg-white
                px-4
                py-3
                text-sm
                text-gray-700
                outline-none
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-100
              "
            >
              <option value="">
                All Categories
              </option>

              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              ))}
            </select>

            {/* EXPERIENCE */}

            <select
              value={filters.experience}
              onChange={(event) =>
                handleFilterChange(
                  "experience",
                  event.target.value
                )
              }
              className="
                rounded-lg
                border
                border-gray-200
                bg-white
                px-4
                py-3
                text-sm
                text-gray-700
                outline-none
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-100
              "
            >
              <option value="">
                All Experience
              </option>

              {experiences.map((experience) => (
                <option
                  key={experience}
                  value={experience}
                >
                  {experience}
                </option>
              ))}
            </select>

            {/* LOCATION */}

            <select
              value={filters.location}
              onChange={(event) =>
                handleFilterChange(
                  "location",
                  event.target.value
                )
              }
              className="
                rounded-lg
                border
                border-gray-200
                bg-white
                px-4
                py-3
                text-sm
                text-gray-700
                outline-none
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-100
              "
            >
              <option value="">
                All Locations
              </option>

              {locations.map((location) => (
                <option
                  key={location}
                  value={location}
                >
                  {location}
                </option>
              ))}
            </select>

          </div>

        </div>

        {/* ================================================= */}
        {/* RESULTS COUNT */}
        {/* ================================================= */}

        <div className="mb-6 flex items-center justify-between">

          <div>

            <h2 className="text-xl font-semibold text-gray-900">
              {filteredJobs.length}{" "}
              {filteredJobs.length === 1
                ? "Job"
                : "Jobs"}{" "}
              Found
            </h2>

            {search && (
              <p className="mt-1 text-sm text-gray-500">
                Showing results for{" "}
                <span className="font-medium text-gray-700">
                  "{search}"
                </span>
              </p>
            )}

          </div>

        </div>

        {/* ================================================= */}
        {/* JOBS GRID */}
        {/* ================================================= */}

        {filteredJobs.length > 0 ? (

          <div className="
            grid
            gap-6
            md:grid-cols-2
            lg:grid-cols-3
          ">

            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
              />
            ))}

          </div>

        ) : (

          /* ================================================= */
          /* NO RESULTS */
          /* ================================================= */

          <div className="
            rounded-2xl
            border
            border-gray-200
            bg-white
            px-6
            py-16
            text-center
            shadow-sm
          ">

            <div className="mx-auto mb-4 text-5xl">
              🔍
            </div>

            <h3 className="text-xl font-semibold text-gray-900">
              No jobs found
            </h3>

            <p className="mx-auto mt-2 max-w-md text-gray-500">
              We couldn't find any jobs matching
              your search or selected filters.
              Try changing your search criteria.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="
                mt-6
                rounded-lg
                bg-blue-600
                px-5
                py-3
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-blue-700
              "
            >
              Clear All Filters
            </button>

          </div>

        )}

      </section>

    </main>
  );
}