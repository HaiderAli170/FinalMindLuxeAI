"use client";
import { ArrowLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
const mentalIllnesses = [
  {
    id: 1,
    title: "Anxiety Disorder",
    description: `
      Anxiety disorders encompass a range of conditions characterized by excessive and persistent feelings of anxiety and fear. These feelings can interfere with daily activities, relationships, and overall quality of life. Some common types of anxiety disorders include:
      Generalized Anxiety Disorder (GAD): People with GAD experience excessive worry and fear about various aspects of their life, even when there is no specific cause for concern.
      Panic Disorder: Panic disorder involves recurring panic attacks—sudden episodes of intense fear or discomfort, often accompanied by physical symptoms like rapid heartbeat, sweating, trembling, and a sense of impending doom.
      Social Anxiety Disorder (Social Phobia): This disorder is characterized by intense fear and avoidance of social situations due to a fear of being judged, embarrassed, or humiliated.
      Specific Phobias: Specific phobias involve an intense and irrational fear of a particular object, situation, or activity. Common phobias include fear of heights, spiders, flying, and enclosed spaces.
      Obsessive-Compulsive Disorder (OCD): OCD involves intrusive and distressing thoughts (obsessions) that lead to compulsive behaviors or rituals performed to reduce anxiety.
      Post-Traumatic Stress Disorder (PTSD): PTSD can develop after exposure to a traumatic event. It involves intrusive memories, nightmares, and emotional distress related to the trauma.
    `,
    images: [
      "https://www.cdc.gov/childrensmentalhealth/images/Depression-Anxiety-Behavior-Disorders-chart.jpg?_=03418",
    ],
    link: "/anxiety",
  },
  {
    id: 2,
    title: "Depression",
    description: `
      Depression is a common and serious medical illness that negatively affects how you feel, the way you think, and how you act. It causes feelings of sadness and/or a loss of interest in activities once enjoyed. It can lead to a variety of emotional and physical problems and can decrease a person’s ability to function at work and at home.

      Symptoms of Depression:
      - Persistent sadness, anxiety, or "empty" mood
      - Feelings of hopelessness or pessimism
      - Irritability
      - Loss of interest in hobbies or activities
      - Fatigue and decreased energy
      - Difficulty concentrating, remembering, or making decisions
      - Changes in sleep patterns (insomnia or oversleeping)
      - Changes in appetite or weight
      - Thoughts of death or suicide

      Types of Depression:
      Major Depressive Disorder (MDD): Severe symptoms that interfere with daily life.
      Persistent Depressive Disorder (PDD): Chronic depression lasting for at least two years.
      Bipolar Disorder: Alternating periods of depression and mania.
      Seasonal Affective Disorder (SAD): Depression related to changes in seasons, typically during winter.
    `,
    images: [
      "https://assets-global.website-files.com/60b79f6742e9397ba3ee0357/640b4ccc0771bdf381e60449_depression%20by%20demographic-1.png",
    ],
    link: "/depression",
  },
  {
    id: 3,
    title: "Obsessive-Compulsive Disorder (OCD)",
    description: `
      Obsessive-Compulsive Disorder (OCD) is a chronic mental health condition characterized by unwanted, recurring thoughts (obsessions) and repetitive behaviors (compulsions). These behaviors are performed to reduce the anxiety caused by the obsessions, but they often provide only temporary relief.

       Common Obsessions:
      - Fear of contamination or germs
      - Unwanted forbidden or taboo thoughts
      - Aggressive thoughts toward others or self
      - Need for symmetry or exactness

       Common Compulsions:
      - Excessive cleaning or handWashing
      - Ordering and arranging things in a particular way
      - Repeatedly checking on things (e.g., locks, appliances)
      - Counting or repeating words silently

       Treatment Options:
      - Cognitive Behavioral Therapy (CBT): Specifically, Exposure and Response Prevention (ERP) is effective for OCD.
      - Medication: Selective Serotonin ReupTake Inhibitors (SSRIs) are commonly prescribed.
      - Lifestyle Changes: Stress management and mindfulness techniques can help reduce symptoms.
    `,
    images: [
      "https://superblog.supercdn.cloud/site_cuid_cl92i00jg261301kozfglx818f/images/obsessive-compulsive-disorder-ocd-1685709447808-compressed.jpg",
    ],
    link: "/ocd",
  },
  {
    id: 4,
    title: "Panic Disorder",
    description: `
      Panic Disorder is a type of anxiety disorder characterized by recurrent and unexpected panic attacks. These attacks are sudden periods of intense fear or discomfort that peak within minutes and are accompanied by physical symptoms.

       Symptoms of Panic Attacks:
      - Rapid heartbeat or palpitations
      - Sweating
      - Trembling or shaking
      - Shortness of breath or a feeling of being smothered
      - Chest pain or discomfort
      - Nausea or abdominal distress
      - Dizziness or lightheadedness
      - Fear of losing control or "going crazy"
      - Fear of dying

       Causes of Panic Disorder:
      - Genetic predisposition
      - Major life stressors
      - Changes in brain function
      - Sensitivity to stress or negative emotions

       Treatment Options:
      - Therapy: Cognitive Behavioral Therapy (CBT) is highly effective.
      - Medication: Antidepressants and anti-anxiety medications can help manage symptoms.
      - Lifestyle Changes: Regular exercise, stress management, and avoiding caffeine or alcohol can reduce the frequency of panic attacks.
    `,
    images: [
      "https://images.prismic.io/cerebral/42857718-d8da-4e17-8a20-b8d1fdd31158_Panic%20Attacks.png?ixlib=gatsbyFP&auto=compress%2Cformat&fit=max&w=3420&h=1897",
    ],
    link: "/panic-disorder",
  },
  {
    id: 5,
    title: "Bipolar Disorder",
    description: `
      Bipolar Disorder, formerly known as manic depression, is a mental health condition characterized by extreme mood swings that include emotional highs (mania or hypomania) and lows (depression).

       Types of Bipolar Disorder:
      - Bipolar I Disorder: Defined by manic episodes lasting at least 7 days or severe manic symptoms requiring hospitalization.
      - Bipolar II Disorder: Characterized by a pattern of depressive episodes and hypomanic episodes, but not full-blown manic episodes.
      - Cyclothymic Disorder: A milder form of bipolar disorder with periods of hypomanic symptoms and depressive symptoms lasting for at least 2 years.

       Symptoms of Mania:
      - Increased energy, activity, or restlessness
      - Euphoria or extreme irritability
      - Racing thoughts or rapid speech
      - Decreased need for sleep
      - Impulsive or risky behavior

       Symptoms of Depression:
      - Persistent sadness or hopelessness
      - Loss of interest in activities
      - Fatigue or low energy
      - Difficulty concentrating
      - Thoughts of death or suicide

       Treatment Options:
      - Medication: Mood stabilizers, antipsychotics, and antidepressants.
      - Therapy: Cognitive Behavioral Therapy (CBT) and psychoeducation.
      - Lifestyle Changes: Regular sleep patterns, stress management, and avoiding drugs or alcohol.
    `,
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPcGLdRM1yXyiPCTN6KMDsypH7FHMnrlX1Lw&usqp=CAU",
    ],
    link: "/bipolar-disorder",
  },
  {
    id: 6,
    title: "Schizophrenia",
    description: `
      Schizophrenia is a serious mental disorder characterized by distorted thinking, perceptions, emotions, and behavior. People with schizophrenia may experience hallucinations, delusions, and disorganized thinking, which can significantly impair daily functioning.

       Symptoms of Schizophrenia:
      - Positive Symptoms: Hallucinations, delusions, and disorganized speech or behavior.
      - Negative Symptoms: Reduced emotional expression, lack of motivation, and social withdrawal.
      - Cognitive Symptoms: Difficulty concentrating, memory problems, and impaired decision-making.

       Causes of Schizophrenia:
      - Genetic factors
      - Brain chemistry imbalances
      - Environmental factors (e.g., exposure to viruses or malnutrition before birth)
      - Substance abuse

       Treatment Options:
      - Medication: Antipsychotic medications are the primary treatment.
      - Therapy: Cognitive Behavioral Therapy (CBT) and family therapy.
      - Support Services: Vocational training, social skills training, and community support programs.
    `,
    images: [
      "https://www.health.com/thmb/sMXUhpkvLq2h7VEBwdjnOH1vHIQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Health-Schizophrenia-Overview-PaigeMcLaughlin-Final-e784ef4214264c8ea708309a09c4901e.jpg",
    ],
    link: "/schizophrenia",
  },
  {
    id: 7,
    title: "Post-Traumatic Stress Disorder (PTSD)",
    description: `
      Post-Traumatic Stress Disorder (PTSD) is a mental health condition triggered by experiencing or witnessing a traumatic event. Symptoms may include flashbacks, nightmares, severe anxiety, and uncontrollable thoughts about the event.

       Symptoms of PTSD:
      - Intrusive Memories: Recurrent, unwanted memories of the traumatic event.
      - Avoidance: Avoiding places, activities, or people that remind you of the trauma.
      - Negative Changes in Thinking and Mood: Feelings of hopelessness, memory problems, and difficulty maintaining close relationships.
      - Changes in Physical and Emotional Reactions: Being easily startled, feeling tense, and having difficulty sleeping.

       Causes of PTSD:
      - Exposure to traumatic events (e.g., war, natural disasters, assault)
      - Genetic predisposition
      - Brain structure and function

       Treatment Options:
      - Therapy: Cognitive Behavioral Therapy (CBT), Eye Movement Desensitization and Reprocessing (EMDR), and exposure therapy.
      - Medication: Antidepressants and anti-anxiety medications.
      - Support Groups: Connecting with others who have experienced similar trauma.
    `,
    images: [
      "https://d2jx2rerrg6sh3.cloudfront.net/images/Article_Images/ImageForArticle_7061_1662009165227664.jpg",
    ],
    link: "/ptsd",
  },
  {
    id: 8,
    title: "Psychosis",
    description: `
      Psychosis is a mental health condition characterized by a loss of contact with reality. People experiencing psychosis may have hallucinations, delusions, and disorganized thinking.

       Symptoms of Psychosis:
      - Hallucinations: Seeing, hearing, or feeling things that are not real.
      - Delusions: Strong beliefs that are not based in reality.
      - Disorganized Thinking: Incoherent speech or difficulty organizing thoughts.
      - Lack of Insight: Inability to recognize that their experiences are not real.

       Causes of Psychosis:
      - Mental health disorders (e.g., schizophrenia, bipolar disorder)
      - Substance abuse
      - Severe stress or trauma
      - Medical conditions (e.g., brain tumors, infections)

       Treatment Options:
      - Medication: Antipsychotic medications are the primary treatment.
      - Therapy: Cognitive Behavioral Therapy (CBT) and family therapy.
      - Support Services: Early intervention programs and community support.
    `,
    images: [
      "https://www.singhealth.com.sg/sites/shcommonassets/Assets/conditions-treatments/images/seo/psychosis-ct.jpg",
    ],
    link: "/psychosis",
  },
];
const ArticlePost = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  // Find matching illness
  const illness = mentalIllnesses.find((ill) => ill.id === Number(id));

  if (!illness) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 max-w-2xl">
          <h1 className="text-4xl font-bold text-red-600 mb-4">
            404 - Post Not Found
          </h1>
          <button
            onClick={() => router.back()}
            className="mt-4 px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Return to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[60vh]">
        <div className="absolute inset-0">
          <img
            src={illness.images[0]} // Use the first image as the hero image
            alt={illness.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/30" />
        </div>

        {/* Back Button */}
        <button
          onClick={() => router.push("/dashboard/articles")}
          className="relative hover:bg-gray-600 cursor-pointer top-4 left-4 p-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-black hover:text-yellow-600" />
        </button>

        {/* Hero Content */}
        <div className="relative h-full flex items-end pb-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 max-w-3xl">
              {illness.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-center mx-auto px-4 py-16 max-w-4xl">
        <article className="prose lg:prose-xl">
          {/* Description */}
          <div className="space-y-6 text-gray-700 leading-relaxed">
            {illness.description.split("\n").map((paragraph, index) => (
              <p key={index} className="text-lg mb-6">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Image Gallery */}
          {illness.images.length > 1 && (
            <div className="mt-12 grid grid-cols-2 gap-4">
              {illness.images.slice(1).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${illness.title} illustration ${index + 1}`}
                  className="rounded-lg shadow-lg object-cover h-48 w-full"
                />
              ))}
            </div>
          )}

          {/* Back to Blog Button */}
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => router.push("/dashboard/articles")}
              className="px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to All Articles
            </button>
          </div>
        </article>
      </div>
    </div>
  );
};

export default ArticlePost;
