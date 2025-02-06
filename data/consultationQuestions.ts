export type Question = {
    id: string;
    category: string;
    question: string;
    correctAnswer: boolean;
    supplementaryText?: { html: string };
}

export const questions: Question[] = [
    { id: "q1", category: "migraine", question: "Are you aged between 18-65?", correctAnswer: true, },
    { id: "q2", category: "migraine", question: "Are you currently taking any medication?", correctAnswer: false, },
    { id: "q3", category: "migraine", question: "Do you experience migraines for more than 10 days a month?", correctAnswer: false, },
    { id: "q4", category: "migraine", question: "Do your migraines last less than 4 hours without treatment or last longer than 24 hours?", correctAnswer: true, },
    {
        id: "q5", category: "migraine", question: "Are you experiencing any of the following along with your migraine?", correctAnswer: false,
        supplementaryText: {
            html: "<ul><li>Weakness</li><li>Numbness</li><li>Difficulty speaking</li><li>Difficulty walking</li></ul>"
        }
    },

    { id: "q6", category: "hay-fever", question: "Have you previously experienced an allergic reaction to antihistamines such as fexofenadine, loratadine or cetirizine or are you lactose intolerant?", correctAnswer: false, },
    { id: "q7", category: "hay-fever", question: "Are you breast feeding or pregnant or planning to become pregnant in the next 6 months?", correctAnswer: false, },
    { id: "q8", category: "hay-fever", question: "Have you been diagnosed with any of the following?", correctAnswer: false, 
        supplementaryText: {
            html: "<ul><li>Kidney or liver problems</li><li>A history of heart problems such as an irregular or fast heartbeat or angina</li><li>Epilepsy</li></ul>"
        }
    },
    { id: "q9", category: "hay-fever", question: "Have you taken antihistamine tablets before?", correctAnswer: true, },
    {
        id: "q10", category: "hay-fever", question: "Do you understand there is a possibility that oral antihistamines may cause drowsiness and affect driving or operating machinery? You should check that the antihistamine tablets you receive do not make you feel sleepy or dizzy before driving or operating machinery.", 
        correctAnswer: true,
    },
    {
        id: "q11", category: "hay-fever", question: "Do you understand you should stop taking antihistamine tablets and speak to your GP if your symptoms do not improve after 2 weeks of starting treatment?",
        correctAnswer: true,
    },
    
];