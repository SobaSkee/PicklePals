"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { InstagramIcon } from "lucide-react";

type PlayerPost = {
  id: string;
  userId: string;
  username: string;
  skill: string;
  preferredCourts: string;
  availability: string;
  description?: string;
  instagram?: string;
};

export default function PlayersPage() {
  const [posts, setPosts] = useState<PlayerPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [skill, setSkill] = useState("");
  const [preferredCourts, setPreferredCourts] = useState("");
  const [availability, setAvailability] = useState("");
  const [description, setDescription] = useState("");
  const { user } = useUser();
  const [instagram, setInstagram] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetch("/api/players")
      .then((res) => res.json())
      .then(setPosts)
      .finally(() => setLoading(false));
  }, [modalOpen]);

  const myPost = posts.find((p) => p.userId === user?.id);

  const handleSubmit = async () => {
    if (!skill || !preferredCourts || !availability) {
      alert("Please fill in all required fields.");
      return;
    }

    console.log("Submitting player post...");

    const res = await fetch("/api/players", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ skill, preferredCourts, availability, description, instagram }),
    });

    if (res.ok) {
      setModalOpen(false);
      setSkill("");
      setPreferredCourts("");
      setAvailability("");
      setDescription("");
    } else {
      const error = await res.json();
      alert("Error submitting post: " + error?.message || "Unknown error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">🎾 Find Players</h1>

      {user && (
        <div className="mb-6">
          <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogTrigger asChild>
              <Button>{myPost ? "Edit My Post" : "Create Player Post"}</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{myPost ? "Edit Your Player Post" : "Create Player Post"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <Input placeholder="Skill level (e.g. Intermediate)" value={skill} onChange={(e) => setSkill(e.target.value)} />
                <Input placeholder="Preferred courts (e.g. Southwest, Northwood)" value={preferredCourts} onChange={(e) => setPreferredCourts(e.target.value)} />
                <Input placeholder="Availability (e.g. Weekends, Evenings)" value={availability} onChange={(e) => setAvailability(e.target.value)} />
                <Textarea placeholder="Add a short description..." value={description} onChange={(e) => setDescription(e.target.value)} />
                <Input
                  type="url"
                  placeholder="Instagram profile URL (optional)"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                />
                <Button onClick={handleSubmit} className="w-full" disabled={!skill || !preferredCourts || !availability}>Submit</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center mt-10">
          <div className="w-8 h-8 border-4 border-blue-400 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid gap-4">
          {posts.map((p) => (
            <div key={p.id} className="border rounded p-5 shadow-sm bg-white">
              <div className="text-xl font-semibold text-blue-600">{p.username}</div>
              <div className="text-sm text-gray-600 mb-1">🎯 <strong>Skill:</strong> {p.skill}</div>
              <div className="text-sm text-gray-600 mb-1">🏟️ <strong>Courts:</strong> {p.preferredCourts}</div>
              <div className="text-sm text-gray-600 mb-1">🕒 <strong>Availability:</strong> {p.availability}</div>
              {p.description && <p className="mt-2 text-sm italic text-gray-700">“{p.description}”</p>}
              {p.instagram && (
                <div className="mt-2">
                  <a
                    href={p.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-pink-600 hover:underline text-sm"
                  >
                    <InstagramIcon className="w-4 h-4 mr-1" strokeWidth={1.75} />
                    View Instagram
                  </a>
                </div>
              )}
              {user?.id === p.userId && (
                <Button
                  variant="destructive"
                  className="mt-2"
                  onClick={async () => {
                    const confirmed = confirm("Are you sure you want to delete your post?");
                    if (!confirmed) return;
                    const res = await fetch(`/api/players/${p.id}`, { method: "DELETE" });
                    if (res.ok) {
                      setPosts(posts.filter((post) => post.id !== p.id));
                    } else {
                      alert("Failed to delete post");
                    }
                  }}
                >
                  Delete Post
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}