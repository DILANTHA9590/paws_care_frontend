import React from "react";

export default function UpdateMedicalHistory() {
  return (
    <div className="h-full flex justify-center items-center">
      <form
        className="max-w-4xl w-full mx-auto p-4 bg-white shadow-md rounded-md space-y-6 
  sm:max-w-xl md:max-w-3xl lg:max-w-4xl  "
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Medical History Form
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="petId"
              className="block text-gray-700 font-medium mb-1"
            >
              Pet ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="petId"
              name="petId"
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Pet ID"
            />
          </div>

          <div>
            <label
              htmlFor="doctorId"
              className="block text-gray-700 font-medium mb-1"
            >
              Doctor ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="doctorId"
              name="doctorId"
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Doctor ID"
            />
          </div>

          <div>
            <label
              htmlFor="diagnosis"
              className="block text-gray-700 font-medium mb-1"
            >
              Diagnosis <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="diagnosis"
              name="diagnosis"
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter diagnosis"
            />
          </div>
        </div>

        <fieldset className="border border-gray-300 rounded p-4">
          <legend className="text-gray-700 font-semibold mb-2">
            Prescription (Optional)
          </legend>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="medicine" className="block text-gray-700 mb-1">
                Medicine
              </label>
              <input
                type="text"
                id="medicine"
                name="medicine"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Medicine name"
              />
            </div>

            <div>
              <label htmlFor="dosage" className="block text-gray-700 mb-1">
                Dosage
              </label>
              <input
                type="text"
                id="dosage"
                name="dosage"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Dosage"
              />
            </div>

            <div>
              <label htmlFor="duration" className="block text-gray-700 mb-1">
                Duration
              </label>
              <input
                type="text"
                id="duration"
                name="duration"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Duration"
              />
            </div>

            <div>
              <label
                htmlFor="instructions"
                className="block text-gray-700 mb-1"
              >
                Instructions
              </label>
              <input
                type="text"
                id="instructions"
                name="instructions"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Instructions"
              />
            </div>
          </div>
        </fieldset>

        <div className="flex">
          <div>
            <label
              htmlFor="treatment"
              className="block text-gray-700 font-medium mb-1"
            >
              Treatment <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="treatment"
              name="treatment"
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter treatment details"
            />
          </div>

          <div>
            <label
              htmlFor="nextVisit"
              className="block text-gray-700 font-medium mb-1"
            >
              Next Visit Date
            </label>
            <input
              type="date"
              id="nextVisit"
              name="nextVisit"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
