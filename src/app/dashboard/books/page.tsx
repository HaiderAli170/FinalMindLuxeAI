'use client'
import React, { useState } from 'react';
import { FiBookOpen, FiUsers, FiCalendar, FiSearch } from 'react-icons/fi';
import Image from 'next/image';

interface Book {
  id: number;
  title: string;
  author: string;
  publishedDate: string;
  description: string;
  coverUrl: string;
  tags: string[];
  infoUrl: string;
}

const books: Book[] = [
  {
    id: 1,
    title: "The Body Keeps the Score",
    author: "Bessel van der Kolk",
    publishedDate: "2014",
    description: "Trauma expert explores how trauma reshapes body and brain, offering new paths to recovery through innovative treatments.",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/I/71Q5t+Zkr+L.jpg",
    tags: ["Trauma", "PTSD", "Healing", "Neuroscience"],
    infoUrl: "https://www.goodreads.com/book/show/18693771-the-body-keeps-the-score"
  },
  {
    id: 2,
    title: "Lost Connections",
    author: "Johann Hari",
    publishedDate: "2018",
    description: "Investigates the root causes of depression and anxiety, offering science-based solutions beyond medication.",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/I/81Jp+CVTIoL.jpg",
    tags: ["Depression", "Anxiety", "Social Connection", "Research"],
    infoUrl: "https://www.goodreads.com/book/show/34921573-lost-connections"
  },
  {
    id: 3,
    title: "Maybe You Should Talk to Someone",
    author: "Lori Gottlieb",
    publishedDate: "2019",
    description: "A therapist goes to therapy, revealing profound truths about mental health through dual perspectives.",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/I/81+UqXYLiFL.jpg",
    tags: ["Therapy", "Memoir", "Relationships", "Self-Discovery"],
    infoUrl: "https://www.goodreads.com/book/show/37570546-maybe-you-should-talk-to-someone"
  },
  {
    id: 4,
    title: "The Happiness Trap",
    author: "Russ Harris",
    publishedDate: "2008",
    description: "Introduces ACT (Acceptance and Commitment Therapy) to help reduce stress and live more fully.",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/I/71Q4+WZR0VL.jpg",
    tags: ["ACT", "Mindfulness", "Stress", "Self-Help"],
    infoUrl: "https://www.goodreads.com/book/show/1128732.The_Happiness_Trap"
  },
  {
    id: 5,
    title: "Daring Greatly",
    author: "Brené Brown",
    publishedDate: "2012",
    description: "Explores the power of vulnerability and how it transforms the way we live, love, and lead.",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/I/71Q5t+Zkr+L.jpg",
    tags: ["Vulnerability", "Courage", "Shame", "Personal Growth"],
    infoUrl: "https://www.goodreads.com/book/show/13588356-daring-greatly"
  },
  {
    id: 6,
    title: "When the Body Says No",
    author: "Gabor Maté",
    publishedDate: "2003",
    description: "Examines the connection between emotional stress and physical illness, with case studies.",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/I/71+1x0hQKFL.jpg",
    tags: ["Mind-Body", "Stress", "Healing", "Case Studies"],
    infoUrl: "https://www.goodreads.com/book/show/110804.When_the_Body_Says_No"
  },
  {
    id: 7,
    title: "The Noonday Demon",
    author: "Andrew Solomon",
    publishedDate: "2001",
    description: "An expansive examination of depression combining personal experience, research and cultural analysis.",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/I/71Q5t+Zkr+L.jpg",
    tags: ["Depression", "Memoir", "Research", "History"],
    infoUrl: "https://www.goodreads.com/book/show/7144.The_Noonday_Demon"
  },
  {
    id: 8,
    title: "Reasons to Stay Alive",
    author: "Matt Haig",
    publishedDate: "2015",
    description: "A personal account of overcoming depression with insights on how to live better and feel more alive.",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/I/71Q5t+Zkr+L.jpg",
    tags: ["Depression", "Memoir", "Hope", "Recovery"],
    infoUrl: "https://www.goodreads.com/book/show/23363874-reasons-to-stay-alive"
  },
  {
    id: 9,
    title: "An Unquiet Mind",
    author: "Kay Redfield Jamison",
    publishedDate: "1995",
    description: "A psychiatrist's memoir about her own experience with bipolar disorder and how it shaped her work.",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/I/71Q5t+Zkr+L.jpg",
    tags: ["Bipolar", "Memoir", "Psychiatry", "Mental Illness"],
    infoUrl: "https://www.goodreads.com/book/show/361459.An_Unquiet_Mind"
  },
  {
    id: 10,
    title: "The Mindful Way Through Depression",
    author: "Mark Williams",
    publishedDate: "2007",
    description: "Teaches mindfulness-based cognitive therapy techniques to break the cycle of chronic unhappiness.",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/I/71JQeQw+3FL.jpg",
    tags: ["Mindfulness", "CBT", "Depression", "Meditation"],
    infoUrl: "https://www.goodreads.com/book/show/1094311.The_Mindful_Way_through_Depression"
  },
  {
    id: 11,
    title: "First, We Make the Beast Beautiful",
    author: "Sarah Wilson",
    publishedDate: "2017",
    description: "A personal journey through anxiety with research, humor and practical advice for sufferers.",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/I/71Q5t+Zkr+L.jpg",
    tags: ["Anxiety", "Memoir", "Self-Help", "Wellbeing"],
    infoUrl: "https://www.goodreads.com/book/show/31845516-first-we-make-the-beast-beautiful"
  },
  {
    id: 12,
    title: "Attached",
    author: "Amir Levine",
    publishedDate: "2010",
    description: "Explains attachment theory and how understanding your attachment style can improve relationships.",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/I/71Q5t+Zkr+L.jpg",
    tags: ["Relationships", "Attachment", "Psychology", "Self-Help"],
    infoUrl: "https://www.goodreads.com/book/show/10377222-attached"
  }
];

const allTags = Array.from(new Set(books.flatMap(book => book.tags)));

const BooksPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filteredBooks = books.filter(book => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some(tag => book.tags.includes(tag));

    return matchesSearch && matchesTags;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-light text-gray-900 mb-4">
          Mental Health <span className="font-medium text-blue-500">Books</span>
        </h1>
        <p className="text-gray-600 mb-8">
          Explore our collection of books to support your mental wellbeing journey.
        </p>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search books by title, author, or keywords..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() =>
                  setSelectedTags(prev =>
                    prev.includes(tag)
                      ? prev.filter(t => t !== tag)
                      : [...prev, tag]
                  )
                }
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedTags.includes(tag)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBooks.map(book => (
            <div
              key={book.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
            
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {book.title}
                </h3>
                <div className="flex items-center text-gray-600 text-sm mb-2 space-x-3">
                  <div className="flex items-center">
                    <FiUsers className="mr-1" />
                    <span>{book.author}</span>
                  </div>
                  <div className="flex items-center">
                    <FiCalendar className="mr-1" />
                    <span>{book.publishedDate}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {book.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
                  {book.description}
                </p>
                <a
                  href={book.infoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <FiBookOpen className="mr-2" />
                  Learn More
                </a>
              </div>
            </div>
          ))}
          {filteredBooks.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-12">
              No books found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BooksPage;