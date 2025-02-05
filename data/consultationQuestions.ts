export type Question = {
    id: string;
    category: string;
    question: string;
    correctAnswer: boolean;
    supplementaryText?: { html: string };
}

export const questions: Question[] = [
    { id: "q1", category: "blood-pressure", question: "Are you aged between 18-65?", correctAnswer: true, },
    { id: "q2", category: "blood-pressure", question: "Are you currently taking any medication?", correctAnswer: false, },
    { id: "q3", category: "blood-pressure", question: "Do you experience migraines for more than 10 days a month?", correctAnswer: false, },
    { id: "q4", category: "blood-pressure", question: "Do your migraines last less than 4 hours without treatment or last longer than 24 hours?", correctAnswer: true, },
    {
        id: "q5", category: "blood-pressure", question: "Are you experiencing any of the following along with your migraine?", correctAnswer: false,
        supplementaryText: {
            html: "<ul><li>Weakness</li><li>Numbness</li><li>Difficulty speaking</li><li>Difficulty walking</li></ul>"
        }
    },
];