import { useState } from "react";
import * as XLSX from "xlsx";

const UploadExcel = ({ onDataProcessed }) => {
  const [fileName, setFileName] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = (e) => {
      const bufferArray = e.target.result;
      const workbook = XLSX.read(bufferArray, { type: "buffer" });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      onDataProcessed(jsonData); // Posielame spracované dáta do stavu
    };
  };

  return (
    <div className="p-4 border rounded-md">
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      {fileName && <p>Načítaný súbor: {fileName}</p>}
    </div>
  );
};

export default UploadExcel;
