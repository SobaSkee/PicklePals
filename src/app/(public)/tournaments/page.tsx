"use client";
import { useUser } from "@clerk/nextjs";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Tournament = {
  id: string;
  name: string;
  host: string;
  court: string;
  maxSize: number;
  description?: string;
  userId: string;
  users: string[];
  image: string;
};

const fetchTournaments = async (
  setTournaments: React.Dispatch<React.SetStateAction<Tournament[]>>,
  setUsernames: React.Dispatch<React.SetStateAction<Record<string, string>>>
) => {
  try {
    const res = await fetch("/api/tournaments");
    const data = await res.json();
    setTournaments(data);

    const ids = Array.from(new Set(data.flatMap((t: Tournament) => t.users)));
    const nameMap: Record<string, string> = {};

    for (const rawId of ids) {
      const id = String(rawId);
      try {
        const res = await fetch(`/api/user/${id}`);
        const info: { username: string } = await res.json();
        nameMap[id] = info.username || "Unknown";
      } catch {
        nameMap[id] = "Unknown";
      }
    }

    setUsernames(nameMap);
  } catch (err) {
    console.error("Failed to fetch tournaments:", err);
  }
};

function Page() {
  const [open, setOpen] = useState(false);
  const { isSignedIn, user } = useUser();
  const [name, setName] = useState("");
  const [court, setCourt] = useState("");
  const [maxSize, setMaxSize] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const router = useRouter();
  const [usernames, setUsernames] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchTournaments(setTournaments, setUsernames);
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
              <input className="border px-3 py-2 w-full" placeholder="Court" onChange={(e) => setCourt(e.target.value)} />
              <input className="border px-3 py-2 w-full" type="number" placeholder="Max Size" onChange={(e) => setMaxSize(Number(e.target.value))} />
              <textarea className="border px-3 py-2 w-full" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
              <input
                className="border px-3 py-2 w-full"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setImage(reader.result as string);
                    };
                    reader.readAsDataURL(e.target.files[0]);
                  }
                }}
              />
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
                      body: JSON.stringify({ name, court, maxSize, description, image, users: [] })
                    });
                    setOpen(false);
                    fetchTournaments(setTournaments, setUsernames);
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
            {tournament.image && (
              <img
                src={`${tournament.image}`}
                alt={tournament.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
            )}
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">{tournament.name}</h2>
            <div className="text-sm text-gray-600 mb-1"><span className="font-medium">Host:</span> {tournament.host}</div>
            <div className="text-sm text-gray-600 mb-1"><span className="font-medium">Court:</span> {tournament.court}</div>
            <div className="text-sm text-gray-600 mb-1"><span className="font-medium">Max Size:</span> {tournament.maxSize > 0 ? tournament.maxSize : "Not specified"}</div>
            {tournament.description && (
              <p className="text-sm text-gray-700 mt-4 leading-relaxed">
                {tournament.description}
              </p>
            )}
            <div className="flex flex-wrap gap-2 mt-4">
              {user?.id === tournament.userId && (
                <button
                  onClick={async () => {
                    await fetch(`/api/tournaments/${tournament.id}`, {
                      method: "DELETE",
                    });
                    await fetchTournaments(setTournaments, setUsernames);
                  }}
                  className="bg-red-600 text-white px-3 py-1.5 rounded hover:bg-red-700 transition text-sm"
                >
                  Delete
                </button>
              )}
              {isSignedIn && (
                <>
                  {!tournament.users.includes(user.id) ? (
                    <button
                      onClick={async () => {
                        await fetch(`/api/tournaments/${tournament.id}`, {
                          method: "PATCH",
                          headers: {
                            "Content-Type": "application/json"
                          },
                          body: JSON.stringify({ userId: user.id })
                        });
                        await fetchTournaments(setTournaments, setUsernames);
                      }}
                      className="bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 transition text-sm"
                    >
                      RSVP
                    </button>
                  ) : (
                    <button
                      onClick={async () => {
                        await fetch(`/api/tournaments/${tournament.id}`, {
                          method: "PATCH",
                          headers: {
                            "Content-Type": "application/json"
                          },
                          body: JSON.stringify({ userId: user.id, remove: true })
                        });
                        await fetchTournaments(setTournaments, setUsernames);
                      }}
                      className="bg-yellow-500 text-white px-3 py-1.5 rounded hover:bg-yellow-600 transition text-sm"
                    >
                      Leave RSVP
                    </button>
                  )}
                </>
              )}
            </div>
            {user?.id === tournament.userId && tournament.users.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-semibold text-gray-700 mb-1">RSVP'd Players:</p>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {tournament.users.map((userId) => (
                    <li key={userId}>{usernames[userId] || userId}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;
