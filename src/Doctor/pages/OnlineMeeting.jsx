import React from "react";

export default function OnlineMeeting() {
  const meetings = [
    {
      id: 1,
      title: "Pet Care Follow-up Meeting",
      date: "2025-07-15",
      time: "10:00 AM",
      link: "https://meet.example.com/meeting1",
    },
    {
      id: 2,
      title: "New Patient Consultation",
      date: "2025-07-18",
      time: "02:30 PM",
      link: "https://meet.example.com/meeting2",
    },
    {
      id: 3,
      title: "Vaccination Discussion",
      date: "2025-07-20",
      time: "11:15 AM",
      link: "https://meet.example.com/meeting3",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto ">
      <h2 className="text-2xl font-bold mb-4">My Online Meetings</h2>
      {meetings.map((meeting) => (
        <div
          key={meeting.id}
          className="bg-white shadow-md rounded-lg p-4 mb-4"
        >
          <h3 className="text-xl font-semibold mb-2">{meeting.title}</h3>
          <p className="text-gray-600 mb-1">📅 Date: {meeting.date}</p>
          <p className="text-gray-600 mb-3">🕒 Time: {meeting.time}</p>
          <a
            href={meeting.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Join Meeting
          </a>
        </div>
      ))}
    </div>
  );
}
