'use client'
import React, { useState } from 'react';
import { FiDownload, FiExternalLink, FiUsers, FiCalendar, FiBookOpen, FiAlertCircle, FiSearch, FiFilter, FiActivity } from 'react-icons/fi';
import { FaGraduationCap } from 'react-icons/fa';

interface ResearchPaper {
  id: number;
  title: string;
  authors: string;
  publishedDate: string;
  citations: number;
  description: string;
  doiUrl: string;
  localPdfPath: string;
  googleScholarUrl: string;
  pubmedUrl: string;
  openAccessUrl: string;
  tags: string[];
  thumbnail: string;
}

interface MentalHealthBlog {
  id: number;
  title: string;
  author: string;
  publishedDate: string;
  readTime: string;
  description: string;
  content: string;
  imageUrl: string;
  tags: string[];
  category: string;
}

const researchPapers: ResearchPaper[] = [
  {
    id: 1,
    title: "The Effects of Mindfulness Meditation on Mental Health: A Systematic Review",
    authors: "Sarah Johnson, PhD, Michael Smith, MD",
    publishedDate: "2023",
    citations: 156,
    description: "A comprehensive systematic review examining the impact of mindfulness meditation practices on various mental health conditions including anxiety, depression, and stress.",
    doiUrl: "https://doi.org/10.1016/j.mental.2023.01.001",
    localPdfPath: "/pdfs/mindfulness-systematic-review.pdf",
    googleScholarUrl: "https://scholar.google.com/scholar?q=mindfulness+meditation+mental+health+systematic+review",
    pubmedUrl: "https://pubmed.ncbi.nlm.nih.gov/?term=mindfulness+meditation+mental+health",
    openAccessUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8234543/",
    tags: ["Mindfulness", "Meditation", "Mental Health", "Systematic Review"],
    thumbnail: "/images/mindfulness-research.jpg"
  },
  {
    id: 2,
    title: "Cognitive Behavioral Therapy in the Digital Age: A Meta-Analysis",
    authors: "David Williams, PsyD, Emma Brown, PhD",
    publishedDate: "2023",
    citations: 89,
    description: "An extensive meta-analysis of digital CBT interventions and their effectiveness compared to traditional face-to-face therapy sessions.",
    doiUrl: "https://doi.org/10.1016/j.cbt.2023.02.002",
    localPdfPath: "/pdfs/cbt-digital-meta-analysis.pdf",
    googleScholarUrl: "https://scholar.google.com/scholar?q=digital+cbt+meta+analysis",
    pubmedUrl: "https://pubmed.ncbi.nlm.nih.gov/?term=digital+cognitive+behavioral+therapy",
    openAccessUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9156432/",
    tags: ["CBT", "Digital Therapy", "Meta-Analysis", "Online Intervention"],
    thumbnail: "/images/cbt-digital.jpg"
  },
  {
    id: 3,
    title: "Neural Correlates of Emotional Regulation: fMRI Study",
    authors: "Jennifer Lee, PhD, Robert Chen, MD",
    publishedDate: "2022",
    citations: 234,
    description: "An fMRI study investigating the neural mechanisms underlying emotional regulation strategies in healthy adults.",
    doiUrl: "https://doi.org/10.1016/j.neuro.2022.03.003",
    localPdfPath: "/pdfs/neural-correlates-emotion.pdf",
    googleScholarUrl: "https://scholar.google.com/scholar?q=neural+correlates+emotional+regulation+fmri",
    pubmedUrl: "https://pubmed.ncbi.nlm.nih.gov/?term=neural+correlates+emotional+regulation",
    openAccessUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7891234/",
    tags: ["Neuroscience", "Emotion Regulation", "fMRI", "Brain Imaging"],
    thumbnail: "/images/neural-study.jpg"
  },
  {
    id: 4,
    title: "Exercise and Depression: A Meta-Analysis of Randomized Controlled Trials",
    authors: "Maria Rodriguez, PhD, James Wilson, MD",
    publishedDate: "2023",
    citations: 312,
    description: "A comprehensive meta-analysis examining the effectiveness of exercise interventions in reducing depressive symptoms across different populations and exercise modalities.",
    doiUrl: "https://doi.org/10.1016/j.jpsych.2023.04.001",
    localPdfPath: "/pdfs/exercise-depression-meta-analysis.pdf",
    googleScholarUrl: "https://scholar.google.com/scholar?q=exercise+depression+meta+analysis+randomized+controlled+trials",
    pubmedUrl: "https://pubmed.ncbi.nlm.nih.gov/?term=exercise+depression+randomized+controlled+trials",
    openAccessUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9234567/",
    tags: ["Exercise", "Depression", "Meta-Analysis", "Physical Activity"],
    thumbnail: "/images/exercise-mental-health.jpg"
  },
  {
    id: 5,
    title: "Sleep Quality and Anxiety Disorders: A Longitudinal Study",
    authors: "Alexandra Kim, PhD, Thomas Anderson, MD",
    publishedDate: "2022",
    citations: 178,
    description: "A longitudinal study investigating the bidirectional relationship between sleep quality and anxiety disorders in a large community sample over 5 years.",
    doiUrl: "https://doi.org/10.1016/j.sleep.2022.08.002",
    localPdfPath: "/pdfs/sleep-anxiety-longitudinal.pdf",
    googleScholarUrl: "https://scholar.google.com/scholar?q=sleep+quality+anxiety+disorders+longitudinal+study",
    pubmedUrl: "https://pubmed.ncbi.nlm.nih.gov/?term=sleep+quality+anxiety+disorders+longitudinal",
    openAccessUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8765432/",
    tags: ["Sleep", "Anxiety", "Longitudinal Study", "Mental Health"],
    thumbnail: "/images/sleep-research.jpg"
  },
  {
    id: 6,
    title: "Social Media Use and Adolescent Mental Health: A Systematic Review",
    authors: "Rachel Green, PhD, Christopher Martinez, PhD",
    publishedDate: "2023",
    citations: 445,
    description: "A systematic review of the relationship between social media use and mental health outcomes in adolescents, including depression, anxiety, and self-esteem.",
    doiUrl: "https://doi.org/10.1016/j.adolescent.2023.03.003",
    localPdfPath: "/pdfs/social-media-adolescent-mental-health.pdf",
    googleScholarUrl: "https://scholar.google.com/scholar?q=social+media+adolescent+mental+health+systematic+review",
    pubmedUrl: "https://pubmed.ncbi.nlm.nih.gov/?term=social+media+adolescent+mental+health",
    openAccessUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9345678/",
    tags: ["Social Media", "Adolescent", "Mental Health", "Systematic Review"],
    thumbnail: "/images/social-media-research.jpg"
  },
  {
    id: 7,
    title: "Nutrition and Mental Health: The Role of Diet in Depression and Anxiety",
    authors: "Lisa Thompson, PhD, Mark Johnson, MD",
    publishedDate: "2022",
    citations: 267,
    description: "A comprehensive review of the evidence linking dietary patterns, specific nutrients, and mental health outcomes, with focus on depression and anxiety disorders.",
    doiUrl: "https://doi.org/10.1016/j.nutrition.2022.09.001",
    localPdfPath: "/pdfs/nutrition-mental-health-review.pdf",
    googleScholarUrl: "https://scholar.google.com/scholar?q=nutrition+mental+health+diet+depression+anxiety",
    pubmedUrl: "https://pubmed.ncbi.nlm.nih.gov/?term=nutrition+mental+health+diet+depression",
    openAccessUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8123456/",
    tags: ["Nutrition", "Diet", "Depression", "Anxiety"],
    thumbnail: "/images/nutrition-mental-health.jpg"
  },
  {
    id: 8,
    title: "Virtual Reality Therapy for PTSD: A Randomized Controlled Trial",
    authors: "Daniel Park, PhD, Sarah Miller, PsyD",
    publishedDate: "2023",
    citations: 134,
    description: "A randomized controlled trial evaluating the effectiveness of virtual reality exposure therapy for treating post-traumatic stress disorder in veterans.",
    doiUrl: "https://doi.org/10.1016/j.vr.2023.05.002",
    localPdfPath: "/pdfs/vr-therapy-ptsd-trial.pdf",
    googleScholarUrl: "https://scholar.google.com/scholar?q=virtual+reality+therapy+ptsd+randomized+controlled+trial",
    pubmedUrl: "https://pubmed.ncbi.nlm.nih.gov/?term=virtual+reality+therapy+ptsd",
    openAccessUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9456789/",
    tags: ["Virtual Reality", "PTSD", "Randomized Trial", "Exposure Therapy"],
    thumbnail: "/images/vr-therapy.jpg"
  },
  {
    id: 9,
    title: "Music Therapy for Depression: A Meta-Analysis of Clinical Trials",
    authors: "Emily Davis, PhD, Kevin White, MD",
    publishedDate: "2022",
    citations: 198,
    description: "A meta-analysis of clinical trials examining the effectiveness of music therapy interventions in reducing depressive symptoms across different age groups.",
    doiUrl: "https://doi.org/10.1016/j.music.2022.11.001",
    localPdfPath: "/pdfs/music-therapy-depression-meta-analysis.pdf",
    googleScholarUrl: "https://scholar.google.com/scholar?q=music+therapy+depression+meta+analysis+clinical+trials",
    pubmedUrl: "https://pubmed.ncbi.nlm.nih.gov/?term=music+therapy+depression+clinical+trials",
    openAccessUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8234567/",
    tags: ["Music Therapy", "Depression", "Meta-Analysis", "Clinical Trials"],
    thumbnail: "/images/music-therapy.jpg"
  },
  {
    id: 10,
    title: "Workplace Stress and Burnout: Prevention and Intervention Strategies",
    authors: "Michael Brown, PhD, Jessica Taylor, PhD",
    publishedDate: "2023",
    citations: 223,
    description: "A comprehensive review of workplace stress and burnout, including risk factors, prevention strategies, and evidence-based intervention approaches.",
    doiUrl: "https://doi.org/10.1016/j.workplace.2023.06.001",
    localPdfPath: "/pdfs/workplace-stress-burnout-review.pdf",
    googleScholarUrl: "https://scholar.google.com/scholar?q=workplace+stress+burnout+prevention+intervention",
    pubmedUrl: "https://pubmed.ncbi.nlm.nih.gov/?term=workplace+stress+burnout+prevention",
    openAccessUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9567890/",
    tags: ["Workplace", "Stress", "Burnout", "Prevention"],
    thumbnail: "/images/workplace-stress.jpg"
  },
  {
    id: 11,
    title: "Art Therapy for Trauma Recovery: A Systematic Review",
    authors: "Amanda Wilson, PhD, Robert Garcia, MD",
    publishedDate: "2022",
    citations: 145,
    description: "A systematic review of art therapy interventions for trauma recovery, examining effectiveness across different trauma types and populations.",
    doiUrl: "https://doi.org/10.1016/j.art.2022.12.002",
    localPdfPath: "/pdfs/art-therapy-trauma-review.pdf",
    googleScholarUrl: "https://scholar.google.com/scholar?q=art+therapy+trauma+recovery+systematic+review",
    pubmedUrl: "https://pubmed.ncbi.nlm.nih.gov/?term=art+therapy+trauma+recovery",
    openAccessUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8678901/",
    tags: ["Art Therapy", "Trauma", "Recovery", "Systematic Review"],
    thumbnail: "/images/art-therapy.jpg"
  },
  {
    id: 12,
    title: "Yoga and Mental Health: Evidence from Clinical Studies",
    authors: "Priya Patel, PhD, David Clark, MD",
    publishedDate: "2023",
    citations: 189,
    description: "A comprehensive review of clinical studies examining the effects of yoga on various mental health conditions including anxiety, depression, and stress.",
    doiUrl: "https://doi.org/10.1016/j.yoga.2023.07.001",
    localPdfPath: "/pdfs/yoga-mental-health-clinical-studies.pdf",
    googleScholarUrl: "https://scholar.google.com/scholar?q=yoga+mental+health+clinical+studies",
    pubmedUrl: "https://pubmed.ncbi.nlm.nih.gov/?term=yoga+mental+health+clinical+studies",
    openAccessUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9789012/",
    tags: ["Yoga", "Mental Health", "Clinical Studies", "Mind-Body"],
    thumbnail: "/images/yoga-mental-health.jpg"
  }
];

const mentalHealthBlogs: MentalHealthBlog[] = [
  {
    id: 1,
    title: "10 Daily Habits for Better Mental Health",
    author: "Dr. Sarah Mitchell",
    publishedDate: "2024-01-15",
    readTime: "8 min read",
    description: "Discover simple yet powerful daily habits that can significantly improve your mental well-being and emotional resilience.",
    content: "Mental health is just as important as physical health, and small daily practices can make a big difference. This comprehensive guide covers everything from morning routines to evening wind-down practices that support emotional well-being.",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
    tags: ["Daily Habits", "Mental Wellness", "Self-Care", "Lifestyle"],
    category: "Wellness"
  },
  {
    id: 2,
    title: "Understanding Anxiety: Signs, Symptoms, and Coping Strategies",
    author: "Dr. Michael Chen",
    publishedDate: "2024-01-12",
    readTime: "12 min read",
    description: "A comprehensive guide to understanding anxiety disorders, recognizing symptoms, and learning effective coping mechanisms.",
    content: "Anxiety affects millions of people worldwide, but understanding its nature is the first step toward managing it effectively. Learn about different types of anxiety, common triggers, and evidence-based strategies for relief.",
    imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop",
    tags: ["Anxiety", "Mental Health", "Coping Strategies", "Symptoms"],
    category: "Mental Health"
  },
  {
    id: 3,
    title: "The Science of Sleep: How Quality Rest Impacts Mental Health",
    author: "Dr. Emily Rodriguez",
    publishedDate: "2024-01-10",
    readTime: "10 min read",
    description: "Explore the fascinating connection between sleep quality and mental health, with practical tips for better sleep hygiene.",
    content: "Sleep is not just about rest—it's a crucial component of mental health. This article delves into the science behind sleep's impact on mood, cognition, and emotional regulation, plus actionable steps for better sleep.",
    imageUrl: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&h=400&fit=crop",
    tags: ["Sleep", "Mental Health", "Sleep Hygiene", "Wellness"],
    category: "Sleep"
  },
  {
    id: 4,
    title: "Mindfulness Meditation: A Beginner's Complete Guide",
    author: "Dr. Lisa Thompson",
    publishedDate: "2024-01-08",
    readTime: "15 min read",
    description: "Everything you need to know about starting a mindfulness meditation practice, from basic techniques to advanced concepts.",
    content: "Mindfulness meditation has been scientifically proven to reduce stress, improve focus, and enhance emotional well-being. This beginner-friendly guide provides step-by-step instructions and practical tips for establishing a sustainable practice.",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
    tags: ["Meditation", "Mindfulness", "Stress Relief", "Beginner"],
    category: "Meditation"
  },
  {
    id: 5,
    title: "Depression in the Digital Age: Navigating Mental Health Online",
    author: "Dr. James Wilson",
    publishedDate: "2024-01-05",
    readTime: "11 min read",
    description: "How social media and digital technology affect depression, and strategies for maintaining mental health in the digital world.",
    content: "The digital age has transformed how we experience and manage depression. This article examines the complex relationship between technology and mental health, offering balanced perspectives and practical solutions.",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop",
    tags: ["Depression", "Digital Health", "Social Media", "Technology"],
    category: "Digital Health"
  },
  {
    id: 6,
    title: "Building Resilience: How to Bounce Back from Life's Challenges",
    author: "Dr. Amanda Foster",
    publishedDate: "2024-01-03",
    readTime: "13 min read",
    description: "Learn the science of resilience and practical strategies to develop emotional strength and adaptability.",
    content: "Resilience is not about avoiding difficulties but about developing the capacity to recover and grow from them. This comprehensive guide explores the psychology of resilience and provides actionable steps for building emotional strength.",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
    tags: ["Resilience", "Mental Strength", "Personal Growth", "Psychology"],
    category: "Personal Development"
  },
  {
    id: 7,
    title: "The Power of Gratitude: Transforming Your Mental Health",
    author: "Dr. Rachel Green",
    publishedDate: "2023-12-28",
    readTime: "9 min read",
    description: "Discover how practicing gratitude can significantly improve your mental health and overall life satisfaction.",
    content: "Gratitude is more than just saying thank you—it's a powerful mental health tool. Research shows that regular gratitude practice can reduce depression, increase happiness, and improve relationships. Learn practical ways to incorporate gratitude into your daily life.",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
    tags: ["Gratitude", "Happiness", "Mental Health", "Positive Psychology"],
    category: "Positive Psychology"
  },
  {
    id: 8,
    title: "Stress Management Techniques for Busy Professionals",
    author: "Dr. Kevin Martinez",
    publishedDate: "2023-12-25",
    readTime: "14 min read",
    description: "Effective stress management strategies specifically designed for professionals juggling demanding careers and personal lives.",
    content: "Professional stress can take a significant toll on mental health. This article provides evidence-based techniques for managing workplace stress, maintaining work-life balance, and preventing burnout in high-pressure environments.",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
    tags: ["Stress Management", "Workplace", "Professional", "Burnout Prevention"],
    category: "Workplace Wellness"
  },
  {
    id: 9,
    title: "Understanding and Managing Panic Attacks",
    author: "Dr. Jennifer Lee",
    publishedDate: "2023-12-20",
    readTime: "16 min read",
    description: "A comprehensive guide to understanding panic attacks, their causes, and effective management strategies.",
    content: "Panic attacks can be terrifying experiences, but understanding them is the first step toward managing them effectively. This guide covers the science behind panic attacks, common triggers, and proven techniques for prevention and management.",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
    tags: ["Panic Attacks", "Anxiety", "Mental Health", "Coping"],
    category: "Mental Health"
  },
  {
    id: 10,
    title: "The Connection Between Physical Exercise and Mental Health",
    author: "Dr. David Park",
    publishedDate: "2023-12-18",
    readTime: "12 min read",
    description: "Explore the powerful link between physical activity and mental well-being, with practical exercise recommendations.",
    content: "Exercise is one of the most effective natural treatments for mental health conditions. This article examines the scientific evidence linking physical activity to improved mood, reduced anxiety, and better cognitive function.",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
    tags: ["Exercise", "Mental Health", "Physical Activity", "Wellness"],
    category: "Physical Health"
  },
  {
    id: 11,
    title: "Digital Detox: Reconnecting with Yourself in a Hyperconnected World",
    author: "Dr. Maria Johnson",
    publishedDate: "2023-12-15",
    readTime: "10 min read",
    description: "Learn how to take a digital detox and reconnect with yourself in our constantly connected world.",
    content: "In our hyperconnected world, taking time away from digital devices is essential for mental health. This guide provides practical strategies for digital detox, setting healthy boundaries with technology, and finding balance in the digital age.",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
    tags: ["Digital Detox", "Technology", "Mental Health", "Balance"],
    category: "Digital Wellness"
  },
  {
    id: 12,
    title: "Healing from Trauma: A Journey to Recovery",
    author: "Dr. Robert Anderson",
    publishedDate: "2023-12-12",
    readTime: "18 min read",
    description: "Understanding trauma, its effects on mental health, and evidence-based approaches to healing and recovery.",
    content: "Trauma can have profound and lasting effects on mental health, but healing is possible. This comprehensive guide explores different types of trauma, their impact on the brain and body, and various therapeutic approaches for recovery.",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df=crop",
    tags: ["Trauma", "Healing", "Recovery", "Mental Health"],
    category: "Trauma Recovery"
  }
];

const ArticlesPage = () => {
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState<ResearchPaper | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'papers' | 'blogs'>('papers');

  const handlePaperAccess = (paper: ResearchPaper) => {
    setSelectedPaper(paper);
    setShowAccessModal(true);
  };

  const allTags = Array.from(new Set([
    ...researchPapers.flatMap(paper => paper.tags),
    ...mentalHealthBlogs.flatMap(blog => blog.tags)
  ]));

  const filteredPapers = researchPapers.filter(paper => {
    const matchesSearch = paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paper.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paper.authors.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => paper.tags.includes(tag));
    
    return matchesSearch && matchesTags;
  });

  const filteredBlogs = mentalHealthBlogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => blog.tags.includes(tag));
    
    return matchesSearch && matchesTags;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-light text-gray-900 mb-4">
          Mental Health <span className="font-medium text-blue-500">Resources</span>
        </h1>
        <p className="text-gray-600 mb-8">
          Access the latest mental health research and educational content
        </p>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8">
          <button
            onClick={() => setActiveTab('papers')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'papers'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Research Papers
          </button>
          <button
            onClick={() => setActiveTab('blogs')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'blogs'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Mental Health Blogs
          </button>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={`Search ${activeTab === 'papers' ? 'papers' : 'blogs'} by title, author, or keywords...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTags(prev => 
                  prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
                )}
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
        
        {/* Research Papers Section */}
        {activeTab === 'papers' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredPapers.map((paper) => (
              <div
                key={paper.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {paper.title}
                  </h3>
                  <div className="flex items-center text-gray-600 text-sm mb-3 space-x-4">
                    <div className="flex items-center">
                      <FiUsers className="mr-1" />
                      <span>{paper.authors}</span>
                    </div>
                    <div className="flex items-center">
                      <FiCalendar className="mr-1" />
                      <span>{paper.publishedDate}</span>
                    </div>
                    <div className="flex items-center">
                      <FiBookOpen className="mr-1" />
                      <span>{paper.citations} citations</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {paper.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">
                    {paper.description}
                  </p>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handlePaperAccess(paper)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <FiDownload className="mr-2" />
                      Access Paper
                    </button>
                    <a
                      href={paper.googleScholarUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <FaGraduationCap className="mr-2" />
                      Google Scholar
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Mental Health Blogs Section */}
        {activeTab === 'blogs' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
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
                      <span>{blog.author}</span>
                    </div>
                    <div className="flex items-center">
                      <FiCalendar className="mr-1" />
                      <span>{new Date(blog.publishedDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <FiBookOpen className="mr-1" />
                      <span>{blog.readTime}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {blog.description}
                  </p>
                  <button className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                    <FiBookOpen className="mr-2" />
                    Read Article
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Access Modal */}
        {showAccessModal && selectedPaper && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex items-center mb-4">
                <FiAlertCircle className="text-blue-500 text-xl mr-2" />
                <h3 className="text-lg font-semibold">Access Options</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Choose how you would like to access this paper:
              </p>
              <div className="space-y-3">
                {/* <a
                  href={selectedPaper.localPdfPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-center"
                >
                  Download Local Copy
                </a> */}
                <a
                  href={selectedPaper.openAccessUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-center"
                >
                  Open Access Version
                </a>
                <a
                  href={selectedPaper.pubmedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  <FiActivity className="mr-2" />
                  Search on PubMed
                </a>
                <a
                  href={selectedPaper.googleScholarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  <FaGraduationCap className="mr-2" />
                  Find on Google Scholar
                </a>
                {/* <a
                  href={selectedPaper.doiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-center"
                >
                  Access via DOI
                </a> */}
              </div>
              <button
                onClick={() => setShowAccessModal(false)}
                className="mt-4 w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticlesPage; 