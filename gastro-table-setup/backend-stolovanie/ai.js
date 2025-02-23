const Stolovanie = require("./models/Stolovanie");

async function optimalizujStolovanie() {
    const data = await Stolovanie.find();
    let optimalizacia = {};

    data.forEach((zaznam) => {
        zaznam.objednavky.forEach((objednavka) => {
            if (!optimalizacia[objednavka.polozka]) {
                optimalizacia[objednavka.polozka] = 0;
            }
            optimalizacia[objednavka.polozka] += objednavka.mnozstvo;
        });
    });

    return optimalizacia;
}

module.exports = optimalizujStolovanie;
