"use client";

import React from "react";

const helplines = [
  {
    name: "Umang Pakistan",
    description:
      "Umang provides free, confidential support for people experiencing emotional distress, suicidal thoughts, or mental health challenges. Available 24/7.",
    phone: "0311-7786264",
    website: "https://www.umang.com.pk/",
    topics: ["Suicidal Thoughts", "Depression", "Anxiety", "Emotional Support"],
    languages: ["Urdu", "English"],
  },
  {
    name: "Rozan Helpline",
    description:
      "Rozan offers counseling and support for mental health, emotional well-being, and crisis situations. Reach out for a listening ear.",
    phone: "0304-1111741",
    website: "https://rozan.org/contact-us/",
    topics: ["Mental Health", "Stress", "Family Issues", "Crisis Support"],
    languages: ["Urdu", "English"],
  },
  {
    name: "Taskeen Helpline",
    description:
      "Taskeen provides mental health support, guidance, and resources for individuals facing psychological distress.",
    phone: "0332-5267936",
    website: "https://taskeen.org/seek-help/",
    topics: ["Mental Health", "Suicidal Thoughts", "Counseling"],
    languages: ["Urdu", "English"],
  },
  {
    name: "Befrienders Karachi",
    description:
      "Befrienders offers emotional support to anyone in distress, struggling to cope, or at risk of suicide.",
    phone: "021-3497 0000",
    website: "https://befrienders.org/",
    topics: ["Suicidal Thoughts", "Loneliness", "Emotional Support"],
    languages: ["Urdu", "English"],
  },
];

function HelplineCard({ helpline }: { helpline: typeof helplines[0] }) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-6 flex flex-col gap-3 border border-zinc-200 dark:border-zinc-800 hover:shadow-2xl transition-shadow">
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-tr from-blue-400 to-purple-500 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold text-xl shadow">
          {helpline.name[0]}
        </div>
        <div>
          <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
            {helpline.name}
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {helpline.languages.join(", ")}
          </p>
        </div>
      </div>
      <p className="text-zinc-700 dark:text-zinc-200">{helpline.description}</p>
      <div className="flex flex-wrap gap-2 mt-2">
        {helpline.topics.map((topic) => (
          <span
            key={topic}
            className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 px-2 py-0.5 rounded text-xs font-medium"
          >
            {topic}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-4 mt-3">
        <a
          href={`tel:${helpline.phone.replace(/[^0-9+]/g, "")}`}
          className="inline-flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded transition font-semibold text-sm shadow"
        >
          📞 {helpline.phone}
        </a>
        <a
          href={helpline.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded transition font-semibold text-sm shadow"
        >
          🌐 Website
        </a>
      </div>
    </div>
  );
}

export default function HelplinesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-800 py-12 px-4">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-extrabold text-blue-700 dark:text-blue-300 mb-3">
          Mental Health Helplines in Pakistan
        </h1>
        <p className="text-lg text-zinc-700 dark:text-zinc-200">
          If you or someone you know is struggling with mental health or experiencing suicidal thoughts, please reach out to a helpline below. You are not alone.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
        {helplines.map((helpline) => (
          <HelplineCard key={helpline.name} helpline={helpline} />
        ))}
      </div>
      <div className="max-w-2xl mx-auto mt-12 text-center text-zinc-600 dark:text-zinc-400 text-sm">
        <p>
          <strong>Disclaimer:</strong> This information is for support purposes only. If you are in immediate danger, please contact emergency services.
        </p>
      </div>
    </main>
  );
}
