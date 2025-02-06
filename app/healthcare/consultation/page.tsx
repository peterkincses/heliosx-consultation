import { ConsultationTypes } from "@/data/consultationTypes";
import Link from "next/link";

export default function Consultation() {
  return (
    <div className="container mx-auto p-5">
      <div className="max-w-2xl">
        <div className="mb-5">
          <h1 className="text-2xl font-bold mb-5">Consultation</h1>
          <div className="flex justify-between md:items-center">
            <p className="text-gray-600 text-sm mb-2">
              Please select the type of consultation you would like to have.
            </p>
          </div>
        </div>
        {ConsultationTypes.length > 0 && (
          <div>
            <ul>
              {ConsultationTypes.map((consultationType) => (
                <li key={consultationType.slug}>
                  <Link href={`/healthcare/consultation/${consultationType.slug}`}
                        className="block p-5 border-b border-gray-200 hover:bg-gray-100 transition-background duration-200">
                    <h2 className="text-lg font-semibold mb-2">
                      {consultationType.name} {consultationType.canConsult && <span className="bg-green-300 py-1 px-3 text-sm">Available</span>}
                    </h2>
                    <p>
                      Start Consultation
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

