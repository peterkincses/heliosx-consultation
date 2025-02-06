"use client";

import { Question } from "@/data/consultationQuestions";
import { useEffect, useState } from "react";
import { handleConsultationFormSubmission } from "../utils/consultationForm";
import { useRouter } from "next/navigation";

const defaultErrorMessage = "We are unable to supply you with treatment. Please consult your GP.";

export const useConsultationForm = ({
    slug,
}: {
    slug: string;
}) => {
    const router = useRouter();

    const [formData, setFormData] = useState<{
        answers: { [key: string]: { value: string | boolean; error: string | null } };
        currentStep: number;
    }>({
        answers: {},
        currentStep: 0,
    });
    const [canSubmit, setCanSubmit] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const {currentStep, answers} = formData;

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch(`/api/consultation/questions?slug=${slug}`);
                const data = await response.json();
                if (response.ok) {
                    setQuestions(data);
                    const formData = sessionStorage.getItem(`consultation-${slug}`);
                    if (formData) {
                        setFormData(JSON.parse(formData));
                    } else {
                        setFormData({
                            answers: data.reduce(
                                (acc: any, question: any) => ({
                                    ...acc,
                                    [question.id]: { value: null, error: null },
                                }),
                                {}
                            ),
                            currentStep: 0,
                        });
                    }
                } else {
                    setErrorMessage(data.error || "Failed to load questions.");
                }
            } catch (err) {
                setErrorMessage("Something went wrong.");
                console.log(err)
            } finally {
                setLoading(false);
            }
        }
        fetchQuestions()
    }, [slug]);

    useEffect(() => {
        if (formData?.answers && Object.keys(formData?.answers).length > 0) {
            sessionStorage.setItem(`consultation-${slug}`, JSON.stringify(formData));
            setCanSubmit(
                questions.length === Object.values(answers).length &&
                Object.values(answers).every((answer) => answer.value !== null && answer.error === null)
            );
        }
    }, [formData, slug, questions.length])

    const handleNext = () => {
        if (currentStep < questions.length - 1) {
            setFormData((prev) => ({
                ...prev,
                currentStep: prev.currentStep + 1,
            }));
        }
    }

    const handlePrev = () => {
        if (currentStep > 0) {
            setFormData((prev) => ({
                ...prev,
                currentStep: prev.currentStep - 1,
            }));
        }
    }

    const setValue = (id: string, value: boolean) => {
        const isCorrectAnswer = questions[currentStep].correctAnswer === value;
        setFormData((prev) => ({
            ...prev, 
            answers: {
                ...prev.answers,
                [id]: {
                    value,
                    error: isCorrectAnswer ? null : defaultErrorMessage
                },
            },
        }));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        
        const transformedAnswers = Object.entries(answers).map(([key, { value }]) => ({
            [key]: value
        }));

        const response = await handleConsultationFormSubmission({
            slug,
            formData: transformedAnswers,
        });

        if (response.success) {
            setFormData({answers: {}, currentStep: 0}) // clear form data
            sessionStorage.removeItem(`consultation-${slug}`); // clear session storage
            setLoading(false);
            console.log(response.message);
            router.push("/healthcare/consultation/thank-you");
            return
        } else {
            setErrorMessage(response.message);
            setLoading(false);
        }

        alert(response.message); // error message - use toast or modal instead of basic alert or use setErrorMessage
    }

    console.log("formData", formData)

    return {
        step: currentStep,
        canSubmit,
        errorMessage,
        formData,
        handleSubmit,
        questions,
        loading,
        handleNext,
        handlePrev,
        setValue,
    }
}