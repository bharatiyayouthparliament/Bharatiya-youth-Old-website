export const exportToCSV = (data, filename) => {
    if (!data || data.length === 0) {
        console.warn("No data to export.");
        return;
    }

    try {
        // =============================
        // SPECIAL HANDLING FOR REGISTRATIONS
        // =============================
        if (filename === "registrations") {
            const orderedHeaders = [
                "tokenNumber",
                "fullName",
                "email",
                "phone",
                "gender",
                "dob",
                "age",
                "college",
                "otherCollege",
                "course",
                "city",
                "state",
                "registrationType",
                "modeOfPresence",
                "paymentStatus",
                "amountPaid",
                "razorpayPaymentId",
                "razorpayOrderId",
                "termsAccepted",
                "tokenPrefix",
                "tokenYear",
                "tokenMonth",
                "tokenSerial",
                "registrationId",
                "createdAt"
            ];

            const replacer = (key, value) => (value === null ? "" : value);

            const csv = [
                orderedHeaders.join(","),

                ...data.map(row =>
                    orderedHeaders
                        .map(field => {
                            let value = row[field];

                            // Convert Firestore timestamp
                            if (field === "createdAt" && value?.seconds) {
                                value = new Date(value.seconds * 1000).toLocaleString();
                            }

                            return JSON.stringify(value ?? "", replacer);
                        })
                        .join(",")
                )
            ].join("\r\n");

            const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
            const link = document.createElement("a");

            const url = URL.createObjectURL(blob);
            const date = new Date().toISOString().split("T")[0];

            link.setAttribute("href", url);
            link.setAttribute("download", `${filename}_${date}.csv`);
            link.style.visibility = "hidden";

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            return; // ⛔ stop normal export
        }

        // =============================
        // NORMAL EXPORT FOR OTHER DATA
        // (unchanged)
        // =============================
        const replacer = (key, value) => (value === null ? "" : value);
        const header = Object.keys(data[0]);

        const csv = [
            header.join(","),
            ...data.map(row =>
                header
                    .map(fieldName => JSON.stringify(row[fieldName], replacer))
                    .join(",")
            )
        ].join("\r\n");

        const blob = new Blob([csv], {
            type: "text/csv;charset=utf-8;"
        });
        const link = document.createElement("a");

        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            const date = new Date().toISOString().split("T")[0];

            link.setAttribute("href", url);
            link.setAttribute("download", `${filename}_${date}.csv`);
            link.style.visibility = "hidden";

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    } catch (error) {
        console.error("Failed to export to CSV:", error);
    }
};
