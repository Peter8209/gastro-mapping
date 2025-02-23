import React from "react";
import * as XLSX from "xlsx";

const UploadExcel = ({ setData }) => {
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        console.log("📂 Súbor bol vybraný:", file.name);

        const reader = new FileReader();
        reader.readAsArrayBuffer(file);

        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const parsedData = XLSX.utils.sheet_to_json(sheet, { raw: true });

            // ✅ Fixné ID pre každý objekt (1 - 23) a preddefinované súradnice
            const defaultValues = Array.from({ length: 23 }, (_, i) => ({
                id: i + 1,
                akcia: parsedData[i]?.["Akcia"] || `Položka ${i + 1}`,
                x: parsedData[i]?.["X (cm)"] !== undefined ? parseFloat(parsedData[i]["X (cm)"]) : 10 + i * 8,
                y: parsedData[i]?.["Y (cm)"] !== undefined ? parseFloat(parsedData[i]["Y (cm)"]) : 20 + i * 4,
                z: parsedData[i]?.["Z (cm)"] !== undefined ? parseFloat(parsedData[i]["Z (cm)"]) : (i % 2 === 0 ? 5 : 10),
            }));

            console.log("✅ Fixné hodnoty pre ID 1-23:", defaultValues);
            alert("Súbor bol úspešne nahraný!");

            setData(defaultValues);
        };
    };

    return (
        <div>
            <h3>📂 Nahrajte súbor XLSX:</h3>
            <input type="file" accept=".xlsx" onChange={handleFileUpload} />
        </div>
    );
};

export default UploadExcel;


