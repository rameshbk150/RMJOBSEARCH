"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  FaCheck,
  FaPaperPlane,
  FaRightToBracket,
  FaSpinner,
} from "react-icons/fa6";

const readResponse = async (response) => {
  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    throw new Error(`Request failed with status ${response.status}.`);
  }

  return response.json();
};

export default function ApplyJobButton({ job }) {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState(null);
  const [checkingUser, setCheckingUser] = useState(true);
  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("User Parse Error:", error);
      localStorage.removeItem("user");
    } finally {
      setCheckingUser(false);
    }
  }, []);

  useEffect(() => {
    const checkApplication = async () => {
      if (!user?.id || !job?.id) return;

      try {
        const response = await fetch(
          `http://localhost:5000/api/applications/check/${user.id}/${job.id}`,
          {
            cache: "no-store",
          }
        );

        const data = await readResponse(response);

        if (response.ok) {
          setApplied(Boolean(data.applied));
        }
      } catch (error) {
        console.error("Application Check Error:", error);
      }
    };

    checkApplication();
  }, [user, job?.id]);

  const handleApply = async () => {
    setMessage("");
    setError("");

    if (!user?.id) {
      localStorage.setItem("redirectAfterLogin", pathname);
      router.push("/login");
      return;
    }

    if (applied) {
      setMessage("You have already applied for this job.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/applications",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            jobId: job.id,
            jobTitle: job.title,
            company: job.company,
          }),
        }
      );

      const data = await readResponse(response);

      if (!response.ok) {
        throw new Error(
          data?.message || "Unable to apply for this job."
        );
      }

      setApplied(true);
      setMessage("Application submitted successfully.");
    } catch (error) {
      console.error("Apply Job Error:", error);
      setError(error.message || "Unable to apply.");
    } finally {
      setLoading(false);
    }
  };

  if (checkingUser) {
    return (
      <button
        disabled
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-300 px-6 py-3.5 font-semibold text-white sm:w-auto"
      >
        <FaSpinner className="animate-spin" />
        Checking...
      </button>
    );
  }

  return (
    <div className="mt-5">
      <button
        type="button"
        onClick={handleApply}
        disabled={loading || applied}
        className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-semibold text-white transition sm:w-auto ${
          applied
            ? "cursor-default bg-emerald-600"
            : "bg-blue-600 hover:bg-blue-700"
        } ${
          loading ? "cursor-not-allowed opacity-70" : ""
        }`}
      >
        {loading ? (
          <>
            <FaSpinner className="animate-spin" />
            Applying...
          </>
        ) : applied ? (
          <>
            <FaCheck />
            Already Applied
          </>
        ) : user ? (
          <>
            <FaPaperPlane />
            Apply Now
          </>
        ) : (
          <>
            <FaRightToBracket />
            Login to Apply
          </>
        )}
      </button>

      {message && (
        <div className="mt-3 max-w-md rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          {message}
        </div>
      )}

      {error && (
        <div className="mt-3 max-w-md rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {error}
        </div>
      )}
    </div>
  );
}