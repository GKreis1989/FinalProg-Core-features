const createPrescription = async () => {
    const createPrescriptionBtn = $id('createPrescriptionBtn');
    const medicationIdInput = $id('medicationId');
    const quantityInput = $id('quantity');
    const unitInput = $id('unit');
    const refillsInput = $id('refills');
    const startDateInput = $id('startDate');
    const endDateInput = $id('endDate');

    createPrescriptionBtn.addEventListener('click', async () => {
        const prescriptionData = {
            medicationId: medicationIdInput.value,
            quantity: quantityInput.value,
            unit: unitInput.value,
            refills: refillsInput.value,
            startDate: startDateInput.value,
            endDate: endDateInput.value,
        };

        try {
            const response = await fetch("/routes/prescription", {
                method: "POST",
                body: JSON.stringify(prescriptionData),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.ok) {
                console.log("Prescription created ");
            } else {
                console.error("Prescription creation failed", response.statusText);
            }
        } catch (error) {
            console.error("Error during prescription creation", error);
        }
    });
};

const updatePrescription = async () => {
    const updatePrescriptionBtn = $id('updatePrescriptionBtn');
    const prescriptionIdInput = $id('prescriptionId');
    const updatedQuantityInput = $id('updatedQuantity');
    const updatedMedicationIdInput = $id('updatedMedication');
    const updatedUnitInput =$id('updatedUnit');
    const updatedRefillsInput =$id('updatedRefills');
    const updatedStartDateInput =$id('updatedStartDate');
    const updatedEndDateInput =$id('updatedEndDate');

    updatePrescriptionBtn.addEventListener('click', async () => {
        const prescriptionId = prescriptionIdInput.value;
        const updatedData = {
            medicationId: updatedMedicationIdInput.value,
            quantity: updatedQuantityInput.value,
            unit: updatedUnitInput.value,
            refills: updatedRefillsInput.value,
            startDate: updatedStartDateInput.value,
            endDate: updatedEndDateInput.value,        };

        try {
            const response = await fetch(`/routes/prescription/${prescriptionId}`, {
                method: "PUT",
                body: JSON.stringify(updatedData),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.ok) {
                console.log("Prescription updated");
            } else {
                console.error("Prescription update failed:", response.statusText);
            }
        } catch (error) {
            console.error("Error during prescription update:", error);
        }
    });
};

const assignPrescription = async () => {
    const assignPrescriptionBtn = $id('assignPrescriptionBtn');
    const prescriptionIdInput = $id('assignPrescriptionId');
    const patientIdInput = $id('assignPatientId');

    assignPrescriptionBtn.addEventListener('click', async () => {
        const prescriptionId = prescriptionIdInput.value;
        const patientId = patientIdInput.value;

        try {
            const response = await fetch(`/routes/prescription/assign-prescription/${patientId}`, {
                method: "POST",
                body: JSON.stringify({ prescriptionId }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.ok) {
                console.log("Prescription assigned");
            } else {
                console.error("Prescription assignment failed:", response.statusText);
            }
        } catch (error) {
            console.error("Error during prescription assignment:", error);
        }
    });
};
