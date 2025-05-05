"use client";
import React from "react";
import Link from "next/link";

const mentalIllnesses = [
  {
    id: 1,
    title: "Anxiety Disorder",
    description:
      "A mental health disorder characterized by excessive worry and fear.",
    image:
      "https://www.calmclinic.com/storage/images/213/qoxihx/main/w1600.png",
    link: "blogs/anxiety",
  },
  {
    id: 2,
    title: "Depression",
    description:
      "A common and serious medical illness that negatively affects how you feel, the way you think and how you act.",
    image:
      "https://www.sciencenews.org/wp-content/uploads/2023/02/021123_LS_depression_feat.jpg",
    link: "blogs/depression",
  },

  {
    id: 3,
    title: "Obsessive-Compulsive Disorder",
    description:
      "A common, chronic, and long-lasting disorder in which a person has uncontrollable, reoccurring thoughts and/or behaviors that he or she feels the urge to repeat over and over.",
    image:
      "https://superblog.supercdn.cloud/site_cuid_cl92i00jg261301kozfglx818f/images/obsessive-compulsive-disorder-ocd-1685709447808-compressed.jpg",
    link: "blogs/ocd",
  },

  {
    id: 4,
    title: "Panic Disorder",
    description:
      "A sudden episode of intense fear that triggers severe physical reactions when there is no real danger or apparent cause.",
    image:
      "https://images.prismic.io/cerebral/42857718-d8da-4e17-8a20-b8d1fdd31158_Panic%20Attacks.png?ixlib=gatsbyFP&auto=compress%2Cformat&fit=max&w=3420&h=1897",
    link: "blogs/panicdisorder",
  },

  {
    id: 5,
    title: "Bipolar affective disorder",
    description:
      "A type of mood disorder, previously referred to as ‘manic depression’. A person with bipolar disorder experiences episodes of mania (elation) and depression.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPcGLdRM1yXyiPCTN6KMDsypH7FHMnrlX1Lw&usqp=CAU",
    link: "blogs/bipolar-article",
  },

  {
    id: 6,
    title: "Schizophrenia",
    description:
      "A serious mental illness that affects how a person thinks, feels, and behaves",
    image:
      "https://www.health.com/thmb/sMXUhpkvLq2h7VEBwdjnOH1vHIQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Health-Schizophrenia-Overview-PaigeMcLaughlin-Final-e784ef4214264c8ea708309a09c4901e.jpg",
    link: "blogs/schizophrenia",
  },

  {
    id: 7,
    title: "Post-traumatic Stress Disorder",
    description:
      "A mental health condition that can develop in some people who have experienced a shocking, scary, or dangerous event.",
    image:
      "https://d2jx2rerrg6sh3.cloudfront.net/images/Article_Images/ImageForArticle_7061_1662009165227664.jpg",
    link: "blogs/ptsd",
  },

  {
    id: 8,
    title: "Psychosis",
    description:   "A mental health condition characterized by impaired relationship with reality, often involving hallucinations or delusions.",
    image:"https://www.singhealth.com.sg/sites/shcommonassets/Assets/conditions-treatments/images/seo/psychosis-ct.jpg",
    link: "blogs/psychosis",
  },
  {
    id: 9,
    title: "Psychosis",
    description:   "A mental health condition characterized by impaired relationship with reality, often involving hallucinations or delusions.",
    image:"https://www.singhealth.com.sg/sites/shcommonassets/Assets/conditions-treatments/images/seo/psychosis-ct.jpg",
    link: "blogs/psychosis",
  },
];
const MentalHealthPage = () => {
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
              Understanding Mental Health
            </h1>
            <p className="text-lg md:text-xl text-gray-200">
              Mental health is an essential part of our overall well-being.
              Explore our resources to learn more about different mental health
              conditions and find support.
            </p>
          </div>
        </div>
      </div>

      {/* Cards Grid Section */}
      <div className=" flex flex-col justify-center items-center  mx-auto px-4 py-16 k">
        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
          Mental Health Conditions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mentalIllnesses.map((illness) => (
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
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {illness.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {illness.description}
                </p>
                <Link href={`/dashboard/articles/${illness.id}`} passHref>
                  <button className="w-full py-2 px-4 bg-gray-900 text-white rounded-lg hover:bg-yellow-500 transition-colors duration-300">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MentalHealthPage;
