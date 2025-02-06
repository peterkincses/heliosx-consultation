import { useRouter } from "next/router";

export const handleConsultationFormSubmission = async (answers: any) => {
    let success = false;
    console.log(answers);

    try {
        // Call an API to submit the form
        await new Promise(resolve => setTimeout(resolve, 2000)); // 2 seconds delay for demoing loading
        success = true
    } catch (error) {
        console.error(error);
    }

    return {
        success,
        message: success ? "Form submitted successfully" : "We are sorry, an error occurred while submitting the form. Please try again later.",
    }
}