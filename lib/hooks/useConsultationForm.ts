"use client";

import { Question } from "@/data/consultationQuestions";
import { useCallback, useEffect, useState } from "react";
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

    const isFormValid = useCallback(() => {
        return (
            questions.length > 0 &&
            questions.length === Object.values(answers).length &&
            Object.values(answers).every((answer) => answer.value !== null && answer.error === null)
        );
    }, [answers, questions.length]);

    useEffect(() => {
        if (Object.keys(answers).length === 0) return;
        sessionStorage.setItem(`consultation-${slug}`, JSON.stringify(formData));
        setCanSubmit(isFormValid());

    }, [answers, formData, isFormValid, slug]);

    const handleNext = useCallback(() => {
        setFormData((prev) => {
            if (prev.currentStep < questions.length - 1) {
                return { ...prev, currentStep: prev.currentStep + 1 };
            }
            return prev;
        });
    }, [questions])

    const handlePrev = useCallback(() => {
        setFormData((prev) => {
            if (prev.currentStep > 0) {
                return { ...prev, currentStep: prev.currentStep - 1 };
            }
            return prev;
        });
    }, []);

    const setValue = useCallback((question: Question, value: boolean) => {
        setFormData((prev) => ({
            ...prev, 
            answers: {
                ...prev.answers,
                [question.id]: {
                    value,
                    error: question.correctAnswer === value ? null : defaultErrorMessage
                },
            },
        }));
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage(""); // Clear previous errors

        try {
            const transformedAnswers = Object.fromEntries(
                Object.entries(answers).map(([key, { value }]) => [key, value])
            );

            const response = await handleConsultationFormSubmission({
                slug,
                formData: transformedAnswers,
            });

            if (response.success) {
                setFormData({ answers: {}, currentStep: 0 }); // Reset form
                sessionStorage.removeItem(`consultation-${slug}`); // Clear session storage
                router.push("/healthcare/consultation/thank-you");
            } else {
                setErrorMessage(response.message);
            }
        } catch (error) {
            console.error("Submission error:", error);
            setErrorMessage("An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false); // Ensure loading state is cleared in all cases
        }
    };

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