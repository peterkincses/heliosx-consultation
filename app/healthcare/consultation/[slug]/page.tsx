"use client";

import Spinner from "@/components/Spinner";
import { useConsultationForm } from "@/lib/hooks/useConsultationForm";
import { useParams } from "next/navigation";

const primaryButtonClasses = "rounded-lg px-10 py-2 bg-green-500 text-white border border-green-600 disabled:opacity-50 disabled:bg-green-500 hover:bg-green-600";
const secondaryButtonClasses = "rounded-lg px-10 py-2 bg-white border text-gray-800 border-gray-800 disabled:opacity-50 disabled:border-gray-400";
const customInputClasses = "rounded-lg px-6 py-2 border border-gray-300 cursor-pointer hover:bg-gray-100 hover:border-gray-600";

export default function Consultation() {
  const { slug } = useParams(); // Get slug from the URL

    const {
        step,
        canSubmit,
        formData,
        handleSubmit,
        errorMessage,
        questions,
        loading,
        handleNext,
        handlePrev,
        setValue,
    } = useConsultationForm({ slug: slug as string });

  const currentQuestion = questions[step];  
  const currentAnswer = formData.answers?.[currentQuestion?.id]

  if (loading) {
    return (
        <div className="container mx-auto p-10 min-h-[500px] flex justify-center items-center">
            <div className="mb-5">
                <Spinner />
            </div>
        </div>
    );
  }

  return (
    <div className="container mx-auto p-5 min-h-[500px]">
      <div className="mb-5">
        <h1 className="text-2xl font-bold mb-5">
            Consultation
        </h1>
        {questions.length > 0 && (
            <div className="flex justify-between md:items-center">
                <p className="text-gray-600 text-sm mb-2">
                    Please answer the following questions to determine if you are eligible for treatment.
                </p>
                <div>
                    <span className="py-1 px-5 bg-green-100 whitespace-nowrap">
                        {`${step + 1} / ${questions.length}`}
                    </span>
                </div>
            </div>
        )}
      </div>

      {errorMessage && <p className="py-1 px-5 bg-red-100 mb-3">{errorMessage}</p>}


      {questions.length === 0 ? (
        <p className="py-1 px-5 bg-red-100 mb-3">No questions found</p>
      ) : (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col border">
                    <label htmlFor={questions[step].id} className="py-2 px-5 bg-gray-200">
                        {questions[step].question}
                    </label>

                    {currentQuestion.supplementaryText && (
                        <div className="p-5 pb-0" dangerouslySetInnerHTML={{ __html: currentQuestion.supplementaryText.html }} />
                    )}

                    <div className="flex flex-col gap-4 p-5">
                        <div className="flex gap-4">
                            <label className={customInputClasses}>
                                <input
                                    type="radio"
                                    name={currentQuestion.id}
                                    value="true"
                                    checked={currentAnswer?.value === true}
                                    className="mr-2"
                                    onChange={() => setValue(currentQuestion.id, true)}
                                />
                                Yes
                            </label>
                            <label className={customInputClasses}>
                                <input
                                    type="radio"
                                    name={currentQuestion.id}
                                    value="false"
                                    checked={currentAnswer?.value === false}
                                    className="mr-2"
                                    onChange={() => setValue(currentQuestion.id, false)}
                                />
                                No
                            </label>
                        </div>
                        {currentAnswer?.error && <p className="bg-red-100 py-3 px-5 border border-red-200">{currentAnswer?.error}</p>}
                    </div>
                </div>

                <div className="flex flex-col-reverse sm:flex-row gap-4 justify-between">
                    {step > 0 && <button type="button" onClick={handlePrev} className={secondaryButtonClasses}>Back</button>}
                    {step < questions.length - 1 && (
                        <button type="button"
                            onClick={handleNext}
                            className={`${primaryButtonClasses}`}
                            disabled={currentAnswer?.value === null || !!currentAnswer?.error}
                        >
                            Next
                        </button>
                    )}
                    {step === questions.length - 1 && (
                        <button type="submit"
                            disabled={!canSubmit}
                            className={`${primaryButtonClasses}`}
                        >
                            Submit
                        </button>
                    )}
                </div>
            </div>
        </form>
     )}
    </div>
  );
}