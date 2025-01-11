import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

export default function Feedback() {
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/submitFeedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedback),
      });

      if (response.ok) {
        setSubmitted(true);
        setFeedback({ name: "", email: "", message: "" }); // Reset form
      } else {
        console.error("Failed to submit feedback:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Feedback Form</h1>
      {submitted ? (
        <div className="text-green-600 text-lg">Thank you for your feedback!</div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 border p-6 shadow-md rounded-md max-w-md mx-auto"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={feedback.name}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={feedback.email}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={feedback.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full border rounded px-3 py-2"
              placeholder="Enter your feedback"
            ></textarea>
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {loading ? "Submitting..." : "Submit Feedback"}
          </Button>
        </form>
      )}
    </div>
  );
}
