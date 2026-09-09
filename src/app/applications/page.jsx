"use client";

import { useEffect, useState } from "react";

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/applications",
          {
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (response.ok) {
          setApplications(data.applications || []);
        }
      } catch (error) {
        console.error("Applications Error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-slate-900">
          Applications
        </h1>

        {loading ? (
          <p className="mt-6 text-slate-500">
            Loading applications...
          </p>
        ) : applications.length === 0 ? (
          <p className="mt-6 text-slate-500">
            No applications found.
          </p>
        ) : (
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead className="bg-slate-50">
                  <tr className="text-left text-xs font-bold uppercase text-slate-500">
                    <th className="px-5 py-4">Candidate</th>
                    <th className="px-5 py-4">Email</th>
                    <th className="px-5 py-4">Job</th>
                    <th className="px-5 py-4">Company</th>
                    <th className="px-5 py-4">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {applications.map((application) => (
                    <tr
                      key={application.id}
                      className="border-t border-slate-100"
                    >
                      <td className="px-5 py-4 font-semibold text-slate-800">
                        {application.candidate_name}
                      </td>

                      <td className="px-5 py-4 text-slate-600">
                        {application.candidate_email}
                      </td>

                      <td className="px-5 py-4 text-slate-600">
                        {application.job_title}
                      </td>

                      <td className="px-5 py-4 text-slate-600">
                        {application.company}
                      </td>

                      <td className="px-5 py-4">
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">
                          {application.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}