import React, { useState } from "react";
import UploadExcel from "./components/UploadExcel";
import TableScene from "./components/TableScene";

function App() {
    const [data, setData] = useState([]);

    return (
        <div>
            <h1>Gastro softvér s video mappingom 🚀</h1>
            <UploadExcel setData={setData} />
            <TableScene data={data} />
        </div>
    );
}

export default App;
