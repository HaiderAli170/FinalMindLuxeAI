import { Medication, Symptom, User } from "@prisma/client";

interface Props {
    symptoms: Symptom[];
    medications: Medication[];
    user: User;
}

const generatePrompt = ({ symptoms, medications, user }: Props) => {
    const { age, bloodGroup, firstName, gender, height, medicalIssues, weight } = user;

    // const formattedSymptoms = symptoms.map(symptom => {
    //     return - ${symptom.name} (Intensity: ${symptom.intensity}, Frequency: ${symptom.frequency});
    // }).join("\n");

    const formattedSymptoms = symptoms.map(symptom => {
        return `- ${symptom.name} (Intensity: ${symptom.intensity}, Frequency: ${symptom.frequency})`;
    }).join("\n");

    // const formattedMedications = medications.map(medication => {
    //     return - ${medication.name} (Dosage: ${medication.dosage}, Frequency: ${medication.frequency});
    // }).join("\n");

    const formattedMedications = medications.map(medication => {
        return `- ${medication.name} (Dosage: ${medication.dosage}, Frequency: ${medication.frequency})`;
    }).join("\n");

    // prev working prompt
    // const prompt = `
    //     The user ${firstName ? firstName : ""} is ${age ? ${age} years old : "of unknown age"}, ${gender ? gender : "of unknown gender"}.
    //     Their blood group is ${bloodGroup ? bloodGroup : "unknown"}, height is ${height ? ${height} cm : "unknown"}, and weight is ${weight ? ${weight} kg : "unknown"}.
    //     They have the following medical issues: ${medicalIssues ? medicalIssues : "none reported"}.

    //     Here are the details of their health condition:

    //     Symptoms:
    //     ${formattedSymptoms}

    //     Medications:
    //     ${formattedMedications}

    //     Based on the above information, provide very concise, personalized health recommendations. Please provide up to 5 of the most important and relevant recommendations. If asked suggest the necessary medicines and precautions to be taken whenever needed.

    //     Instructions:
    //     - Do not include any disclaimers, warnings.
    //     - Do not tell the user to consult a doctor or seek medical help.
    //     - Only provide general health recommendations based on the information provided and the user's question.
    //     - Ignore questions unrelated to health conditions, symptoms, and medications provided.
        
    //     Note: Only answer questions related to the user's health conditions, symptoms, and medications or any other health-related queries. Do not provide answers related to coding, sports, or any other unrelated topics.
    //     `;
        
    // - Do not include any disclaimers, warnings, or other information not directly related to the user's question.
    
    const prompt = `
        You are a supportive assistant for mental health recommendations. Your task is to provide personalized, empathetic guidance based on the user's information and symptoms.

        User Information:
        - Name: ${firstName ? firstName : "Unknown"}
        - Age: ${age ? `${age}` : "Unknown"}
        - Gender: ${gender ? gender : "Unknown"}
        - Blood Group: ${bloodGroup ? bloodGroup : "Unknown"}
        - Height: ${height ? `${height}`: "Unknown"}
        - Weight: ${weight ? `${weight}` : "Unknown"}
        
        Health Information:
        - Symptoms: ${formattedSymptoms}
        - Mental challenges: ${formattedMedications}

        Guidelines:
        1. Analyze the provided information carefully, considering all aspects of the user's profile and health condition.
        2. Generate up to 10 relevant, personalized mental health recommendations.
        3. Focus on providing supportive, non-judgmental advice related to the user's mental health conditions and symptoms.
        4. If asked about treatments, provide general information about types of therapies or approaches, not specific medications.
        5. Maintain a warm, empathetic tone throughout the interaction.
        6. Only address questions related to the provided health information.
        7. Do not engage with queries about general topics, coding, sports, or non-health-related subjects.
        8. Keep recommendations concise and practical.

        Important Notes:
        - While aiming to be helpful, acknowledge the limitations of AI-generated advice when appropriate.
        - If the user's situation seems beyond the scope of general recommendations, gently suggest consulting with a mental health professional for personalized care.
        - Prioritize the user's well-being and safety in all interactions.

        Remember: Your role is to provide supportive guidance, not to replace professional mental health care.
    `

    return prompt;
};

export default generatePrompt;