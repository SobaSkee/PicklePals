 "use client";
import { useUser } from "@clerk/nextjs";
import React, { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";

type Tournament = {
  id: string;
  name: string;
  host: string;
  court: string;
  maxSize: number;
  description?: string;
};

function Page() {
  const [open, setOpen] = useState(false);
  const { isSignedIn } = useUser();
  const [name, setName] = useState("");
  const [host, setHost] = useState("");
  const [court, setCourt] = useState("");
  const [maxSize, setMaxSize] = useState(0);
  const [description, setDescription] = useState("");
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const res = await fetch("/api/tournaments");
        const data = await res.json();
        setTournaments(data);
      } catch (err) {
        console.error("Failed to fetch tournaments:", err);
      }
    };

    fetchTournaments();
  }, []);

  return (
    <div className="pt-24 px-6 pb-32 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-800">
          Upcoming Tournaments
        </h1>
        {isSignedIn && (
          <div className="flex justify-center mb-8">
            <button
              onClick={() => setOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Create Tournament
            </button>
          </div>
        )}

        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">New Tournament</h2>
              <input className="border px-3 py-2 w-full" placeholder="Name" onChange={(e) => setName(e.target.value)} />
              <input className="border px-3 py-2 w-full" placeholder="Host" onChange={(e) => setHost(e.target.value)} />
              <input className="border px-3 py-2 w-full" placeholder="Court" onChange={(e) => setCourt(e.target.value)} />
              <input className="border px-3 py-2 w-full" type="number" placeholder="Max Size" onChange={(e) => setMaxSize(Number(e.target.value))} />
              <textarea className="border px-3 py-2 w-full" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
              <div className="flex justify-end gap-2">
                <button className="text-gray-500" onClick={() => setOpen(false)}>Cancel</button>
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  onClick={async () => {
                    await fetch("/api/tournaments", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify({ name, host, court, maxSize, description, users: [] })
                    });
                    setOpen(false);
                    router.refresh();
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}

        {tournaments.map((tournament) => (
          <div key={tournament.id} className="mb-8 p-6 rounded-xl shadow-md bg-white border border-gray-200">
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">{tournament.name}</h2>
            <div className="text-sm text-gray-600 mb-1"><span className="font-medium">Host:</span> {tournament.host}</div>
            <div className="text-sm text-gray-600 mb-1"><span className="font-medium">Court:</span> {tournament.court}</div>
            <div className="text-sm text-gray-600 mb-1"><span className="font-medium">Max Size:</span> {tournament.maxSize > 0 ? tournament.maxSize : "Not specified"}</div>
            {tournament.description && (
              <p className="text-sm text-gray-700 mt-4 leading-relaxed">
                {tournament.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;
