type Consultation = {
    name: string;
    slug: string;
    canConsult: boolean;
}
export const ConsultationTypes: Consultation[] = [
    {
        name: "General Consultation",
        slug: "general-consultation",
        canConsult: false
    },
    {
        name: "Blood Pressure",
        slug: "blood-pressure",
        canConsult: false
    },
    {
        name: "Diabetes",
        slug: "diabetes",
        canConsult: false
    },
    {
        name: "Hair Loss",
        slug: "hair-loss",
        canConsult: false
    },
    {
        name: "Hay Fever",
        slug: "hay-fever",
        canConsult: true
    },
    {
        name: "High Cholesterol",
        slug: "high-cholesterol",
        canConsult: false
    },
    {
        name: "Migraine",
        slug: "migraine",
        canConsult: true
    },
    {
        name: "Weight Loss",
        slug: "weight-loss",
        canConsult: false
    },
]