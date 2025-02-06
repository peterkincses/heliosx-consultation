const ConsultationSuccess = () => {
    // needs further work to check if the user has completed the consultation, otherwise redirect to consultation landing page
    return (
        <div className="container mx-auto p-5">
            <div className="mb-5">
                <h1 className="text-2xl font-bold mb-5">Consultation</h1>
                <p className="text-gray-600 text-sm bg-green-200 px-5 py-2">
                    Thank you for completing the consultation. We are reviewing your answers and will be in touch shortly.
                </p>
            </div>
        </div>
    );
}

export default ConsultationSuccess