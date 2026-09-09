"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  UserRound,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Pencil,
  Building2,
  CalendarDays,
  Award,
  FileText,
  Loader2,
  LogIn,
  Plus,
  CheckCircle2,
} from "lucide-react";

export default function ProfilePage() {
  const [loggedUser, setLoggedUser] =
    useState(null);

  const [profile, setProfile] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [profileExists, setProfileExists] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        setError("");

        /* ===================================
           CHECK LOGIN
        =================================== */

        const storedUser =
          localStorage.getItem("user");

        if (!storedUser) {
          setLoggedUser(null);
          return;
        }

        let parsedUser;

        try {
          parsedUser =
            JSON.parse(storedUser);
        } catch {
          localStorage.removeItem("user");
          setLoggedUser(null);
          return;
        }

        if (!parsedUser?.id) {
          localStorage.removeItem("user");
          setLoggedUser(null);
          return;
        }

        setLoggedUser(parsedUser);

        /* ===================================
           GET PROFILE
        =================================== */

        const response = await fetch(
          `http://localhost:5000/api/profile/${parsedUser.id}`,
          {
            cache: "no-store",
          }
        );

        const data =
          await response.json();

        if (
          response.status === 404
        ) {
          setProfileExists(false);
          setProfile(null);
          return;
        }

        if (!response.ok) {
          throw new Error(
            data?.message ||
              "Unable to load profile."
          );
        }

        setProfileExists(true);

        setProfile({
          id: data.profile.id,

          userId:
            data.profile.user_id,

          name:
            data.profile.name || "",

          email:
            data.profile.email || "",

          phone:
            data.profile.phone || "",

          location:
            data.profile.location || "",

          title:
            data.profile.job_title || "",

          company:
            data.profile.company || "",

          experience:
            data.profile.experience || "",

          education:
            data.profile.education || "",

          availability:
            data.profile.availability ||
            "",

          skills:
            data.profile.skills || [],

          avatar:
            data.profile.avatar || "",

          resume:
            data.profile.resume || "",
        });
      } catch (error) {
        console.error(
          "Profile Error:",
          error
        );

        setError(
          error.message ||
            "Unable to load profile."
        );
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  /* =====================================
     LOADING
  ===================================== */

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2
            size={38}
            className="mx-auto animate-spin text-blue-600"
          />

          <p className="mt-4 text-sm font-medium text-slate-500">
            Loading profile...
          </p>
        </div>
      </main>
    );
  }

  /* =====================================
     NOT LOGGED IN
  ===================================== */

  if (!loggedUser) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-lg">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <UserRound size={30} />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-slate-900">
            Create Your Profile
          </h1>

          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
            Please login first to create
            and manage your professional
            profile.
          </p>

          <Link
            href="/login"
            className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            <LogIn size={18} />
            Login to Create Profile
          </Link>

          <p className="mt-5 text-sm text-slate-500">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Register
            </Link>
          </p>
        </div>
      </main>
    );
  }

  /* =====================================
     ERROR
  ===================================== */

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="max-w-md rounded-2xl border border-red-200 bg-white p-6 text-center">
          <p className="text-red-600">
            {error}
          </p>
        </div>
      </main>
    );
  }

  /* =====================================
     LOGGED IN BUT PROFILE NOT CREATED
  ===================================== */

  if (!profileExists) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-lg">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <Plus size={28} />
          </div>

          <p className="mt-5 text-sm font-semibold text-blue-600">
            Welcome {loggedUser.name}
          </p>

          <h1 className="mt-2 text-2xl font-bold text-slate-900">
            Create Your Job Profile
          </h1>

          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
            Add your professional details,
            skills and experience so
            recruiters can learn more about
            you.
          </p>

          <Link
            href="/profile/edit"
            className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            <Plus size={18} />
            Create Profile
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* HEADER */}

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-600">
              Candidate Profile
            </p>

            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              My Profile
            </h1>
          </div>

          <Link
            href="/profile/edit"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <Pencil size={16} />
            Edit Profile
          </Link>
        </div>

        {/* HERO */}

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="h-36 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600" />

          <div className="px-6 pb-7">
            <div className="-mt-14 flex flex-col gap-5 sm:flex-row sm:items-end">
              <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-3xl border-4 border-white bg-blue-50 shadow-lg">
                {profile.avatar ? (
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <UserRound
                    size={44}
                    className="text-blue-600"
                  />
                )}
              </div>

              <div className="pb-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-slate-900">
                    {profile.name}
                  </h2>

                  <CheckCircle2
                    size={18}
                    className="text-emerald-500"
                  />
                </div>

                <p className="mt-1 font-semibold text-slate-600">
                  {profile.title ||
                    "Job title not added"}
                </p>

                <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                  <MapPin size={15} />

                  {profile.location ||
                    "Location not added"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* DETAILS */}

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <ProfileSection
            title="Personal Information"
          >
            <Detail
              icon={<Mail size={18} />}
              label="Email"
              value={profile.email}
            />

            <Detail
              icon={<Phone size={18} />}
              label="Phone"
              value={
                profile.phone ||
                "Not added"
              }
            />

            <Detail
              icon={<MapPin size={18} />}
              label="Location"
              value={
                profile.location ||
                "Not added"
              }
            />

            <Detail
              icon={
                <CalendarDays size={18} />
              }
              label="Availability"
              value={
                profile.availability ||
                "Not added"
              }
            />
          </ProfileSection>

          <ProfileSection
            title="Professional Details"
          >
            <Detail
              icon={
                <Briefcase size={18} />
              }
              label="Job Title"
              value={
                profile.title ||
                "Not added"
              }
            />

            <Detail
              icon={
                <Building2 size={18} />
              }
              label="Company"
              value={
                profile.company ||
                "Not added"
              }
            />

            <Detail
              icon={<Award size={18} />}
              label="Experience"
              value={
                profile.experience ||
                "Not added"
              }
            />

            <Detail
              icon={
                <GraduationCap
                  size={18}
                />
              }
              label="Education"
              value={
                profile.education ||
                "Not added"
              }
            />
          </ProfileSection>
        </div>

        {/* SKILLS */}

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Skills
          </h2>

          <div className="mt-4 flex flex-wrap gap-2">
            {profile.skills?.length >
            0 ? (
              profile.skills.map(
                (skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700"
                  >
                    {skill}
                  </span>
                )
              )
            ) : (
              <p className="text-sm text-slate-500">
                No skills added.
              </p>
            )}
          </div>
        </section>

        {/* RESUME */}

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-500">
              <FileText size={22} />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Resume
              </p>

              <p className="font-semibold text-slate-900">
                {profile.resume ||
                  "No resume uploaded"}
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function ProfileSection({
  title,
  children,
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900">
        {title}
      </h2>

      <div className="mt-5 space-y-4">
        {children}
      </div>
    </section>
  );
}

function Detail({
  icon,
  label,
  value,
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
      <div className="text-blue-600">
        {icon}
      </div>

      <div>
        <p className="text-xs text-slate-500">
          {label}
        </p>

        <p className="mt-1 text-sm font-semibold text-slate-800">
          {value}
        </p>
      </div>
    </div>
  );
}