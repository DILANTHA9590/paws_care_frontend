import React, { useState } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router";

export default function UpdateMedicalHistory() {
  const location = useLocation();
  const { petId, doctorId } = location.state;

  const [allPrescription, setAllPrescription] = useState([]);
  const [formData, setFormData] = useState({
    petId: petId,
    doctorId: doctorId,
    treatment: "",
    nextVisit: "",
    diagnosis: "",
    prescription: [],
  });

  const [prescription, setPrescription] = useState({
    medicine: "",
    dosage: "",
    duration: "",
    instructions: "",
  });

  function addMainFormData(e) {
    const { name, value } = e.target;

    if (name == "treatment")
      setFormData((prev) => ({ ...prev, [name]: value.split(",") }));
    return;
  }

  function sethandlePrescription(e) {
    const { name, value } = e.target;

    setPrescription((prev) => ({ ...prev, [name]: value }));
  }

  function setFieldPrescription(e) {
    if (
      !prescription.dosage ||
      !prescription.duration ||
      !prescription.instructions ||
      !prescription.medicine
    ) {
      toast.error("Please fill all fields before adding new!");
      return;
    }
    e.preventDefault();

    setFormData((prev) => ({
      ...prev,
      prescription: [...prev.prescription, { prescription }],
    }));

    setPrescription((prev) => ({
      ...prev,
      medicine: "",
      dosage: "",
      duration: "",
      instructions: "",
    }));

    toast.success("Prescription added successfully!");
  }

  function submitFormData(e) {
    e.preventDefault();

    console.log(
      "ssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
      formData
    );
  }

  return (
    <div className="h-full flex justify-center items-center">
      <form
        className="max-w-4xl w-full mx-auto p-4 bg-white shadow-md rounded-md space-y-6 
        
  sm:max-w-xl md:max-w-3xl lg:max-w-4xl  "
        onSubmit={submitFormData}
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
              value={petId || ""}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Pet ID"
              readOnly
              onChange={addMainFormData}
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
              value={doctorId}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Doctor ID"
              onChange={addMainFormData}
              readOnly
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
              value={formData.diagnosis}
              onChange={addMainFormData}
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
                onChange={sethandlePrescription}
                value={prescription.medicine}
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
                onChange={sethandlePrescription}
                value={prescription.dosage}
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
                onChange={sethandlePrescription}
                value={prescription.duration}
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
                onChange={sethandlePrescription}
                value={prescription.instructions}
              />
            </div>

            <button
              className="bg-blue-600 text-white font-bold"
              onClick={setFieldPrescription}
            >
              ADD
            </button>
          </div>
        </fieldset>

        <div className="flex items-center justify-around">
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
              value={formData.treatment}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter treatment details"
              onChange={addMainFormData}
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
              onChange={addMainFormData}
              value={formData.nextVisit}
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
