import React, { useState, useEffect, useRef } from "react";

const TableScene = ({ data }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const intervalRef = useRef(null);

    // ✅ Ak nie sú dáta, zobrazíme text mimo podmienky s Hookmi
    const hasData = data && data.length > 0;

    const handleNext = () => {
        if (hasData) {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
        }
    };

    const handlePlay = () => {
        setIsPlaying((prev) => !prev);
    };

    useEffect(() => {
        if (isPlaying && hasData) {
            intervalRef.current = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
            }, 1000);
        } else {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
    }, [isPlaying, hasData]);

    const { id = "?", akcia = "Neznáma akcia", x = 0, y = 0, z = 0 } = hasData ? data[currentIndex] : {};

    console.log(`🎬 Animácia: ID: ${id}, Akcia: ${akcia}, X: ${x}, Y: ${y}, Z: ${z}`);

    return (
        <div style={{ textAlign: "center", marginTop: "20px", position: "relative" }}>
            {hasData ? (
                <>
                    <h2>🛠 Animácia stolovania: ID {id}</h2>
                    <p><strong>{akcia}</strong></p>
                    <p><strong>Súradnice:</strong> X: {x} cm, Y: {y} cm, Z: {z} cm</p>

                    {/* ✅ Zobrazenie stola */}
                    <div
                        style={{
                            width: "200px",
                            height: "100px",
                            backgroundColor: "burlywood",
                            border: "2px solid brown",
                            margin: "20px auto",
                            position: "relative",
                        }}
                    >
                        {/* ✅ Pizza sa postupne odrezáva */}
                        {data.slice(0, currentIndex + 1).map((item, index) => (
                            <div
                                key={index}
                                style={{
                                    position: "absolute",
                                    left: `${item.x}px`,
                                    top: `${item.y}px`,
                                    width: "20px",
                                    height: "20px",
                                    backgroundColor: index === currentIndex ? "red" : "yellow",
                                    borderRadius: "50%",
                                    transition: "opacity 0.5s ease-in-out",
                                }}
                            ></div>
                        ))}
                    </div>

                    <button onClick={handleNext} style={{ marginTop: "20px", padding: "10px", fontSize: "16px" }}>
                        Next
                    </button>
                    <button onClick={handlePlay} style={{ marginLeft: "10px", padding: "10px", fontSize: "16px" }}>
                        {isPlaying ? "Pause" : "Play"}
                    </button>
                </>
            ) : (
                <p>❌ Prosím, nahrajte XLSX súbor.</p>
            )}
        </div>
    );
};

export default TableScene;



