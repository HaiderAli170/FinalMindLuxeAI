"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FiBookOpen, FiCalendar, FiUsers, FiSearch } from "react-icons/fi";
import { getBlogs, getMentalIllnesses } from "@/actions";

const MentalHealthPage = () => {
  const [activeTab, setActiveTab] = useState("conditions");
  const [searchTerm, setSearchTerm] = useState("");
  const [blogs, setBlogs]:any = useState([]);
  const [mentalIllnesses, setMentalIllnesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]:any = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const blogsData = await getBlogs();
        const illnessesData = await getMentalIllnesses();
        setBlogs(blogsData);
        setMentalIllnesses(illnessesData);
      } catch (err) {
        setError("Failed to load data. Please try again later.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredBlogs = blogs.filter((blog: { title: string; description: string; author: string; }) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (blog.author && blog.author.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50 h-full">
      {/* Hero Section with Background Image */}
      <div className="relative h-[60vh]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1598940603846-a1edd0ef2574?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Mental Health Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Hero Text */}
        <div className="relative flex items-center justify-center h-full text-center px-4">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Mental Health Resources
            </h1>
            <p className="text-lg md:text-xl font-normal text-gray-200">
              Explore mental health conditions and educational content to better understand and support mental well-being.
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8">
          <button
            onClick={() => setActiveTab("conditions")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === "conditions"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Mental Health Conditions
          </button>
          <button
            onClick={() => setActiveTab("blogs")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === "blogs"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Educational Blogs
          </button>
        </div>

        {/* Search Bar for Blogs */}
        {activeTab === "blogs" && (
          <div className="mb-8">
            <div className="relative max-w-md">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search blogs by title, author, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center text-gray-600">Loading resources...</div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center text-red-600">{error}</div>
        )}

        {/* Mental Health Conditions Section */}
        {!loading && !error && activeTab === "conditions" && (
          <div className="flex flex-col justify-center items-center mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-12 text-center">
              Mental Health Conditions
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mentalIllnesses.map((illness:any) => (
                <div
                  key={illness.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    src={illness.image}
                    alt={illness.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {illness.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {illness.description}
                    </p>
                    <a
                      href={illness.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-block text-center text-sm py-2 px-4 bg-gray-900 text-white rounded-lg hover:bg-yellow-500 transition-colors duration-300"
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Educational Blogs Section */}
        {!loading && !error && activeTab === "blogs" && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
              Educational Mental Health Blogs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogs.map((blog:any) => (
                <div
                  key={blog.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={blog.imageUrl}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
                      {blog.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {blog.title}
                    </h3>
                    <div className="flex items-center text-gray-600 text-sm mb-3 space-x-4">
                      <div className="flex items-center">
                        <FiUsers className="mr-1" />
                        <span>{blog.author || "Unknown Author"}</span>
                      </div>
                      <div className="flex items-center">
                        <FiCalendar className="mr-1" />
                        <span>{blog.publishedDate ? new Date(blog.publishedDate).toLocaleDateString() : "No Date"}</span>
                      </div>
                      <div className="flex items-center">
                        <FiBookOpen className="mr-1" />
                        <span>{blog.readTime || "N/A"}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {blog.description}
                    </p>
                    <a
                      href={blog.blogUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      <FiBookOpen className="mr-2" />
                      Read Blog
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentalHealthPage;