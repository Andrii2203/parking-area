const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { DocumentStore } = require("ravendb");
const fs = require("fs");
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
const config = require("./config/config");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const store = new DocumentStore(config.ravenDB.url, config.ravenDB.database);
store.authOptions = {
    certificate: fs.readFileSync(config.ravenDB.certificatePath),
    type: "pem"
};
store.initialize();

const weekdayRate = 1.15;
const weekendRate = weekdayRate * 1.3;
let exchangeRates = {};

app.get("/api/rates", (req, res) => {
    res.json({
        weekdayRate,
        weekendRate
    });
});

fetchExchangeRates();

function calculateTotalCost(startDateTime, endDateTime, discountPercentage) {
    const start = new Date(startDateTime);
    const end = new Date(endDateTime);
    const diffInMs = end.getTime() - start.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);

    if(diffInHours <= 0) {
        return { error: "End time must be after start time." };
    }

    let cost = 0;
    for(let i = 0; i < diffInHours; i++) {
        const currentHour = new Date(start.getTime() + i * (1000 * 60 * 60));
        const isWeekend = currentHour.getDay() === 0 || currentHour.getDay() === 6;
        cost += isWeekend ? weekendRate : weekdayRate;
    }

    const discount = discountPercentage ? (cost * (parseFloat(discountPercentage) / 100)) : 0;
    return cost - discount;
}

async function fetchExchangeRates() {
    try {
        const response = await fetch(`${config.exchangeRatesAPI.url}?access_key=${config.exchangeRatesAPI.accessKey}`);
        const data = await response.json();
        
        if(data.rates) {
            exchangeRates = data.rates;
        } else {
            console.error("Error can find currencies");
        }
    } catch(error) {
        console.error("Error:", error);
    }
}

function convertCurrency(amount, currency) {
    if(!exchangeRates[currency]) {
        throw new Error(`Rates for ${currency} cannot be found in exchangeRates`);
    }
    return amount * exchangeRates[currency];
}

app.post("/api/calculate", async (req, res) => {
    const { startDateTime, endDateTime, discountPercentage, currency, paymentDate } = req.body;
    const totalCost = calculateTotalCost(startDateTime, endDateTime, discountPercentage);

    if(totalCost.error) {
        return res.status(400).json({ error: totalCost.error });
    }

    try {
        let convertedCost = totalCost;

        if(currency && currency !== "USD") {
            convertedCost = convertCurrency(totalCost, currency);
        }
        
        res.json({ totalCost: convertedCost, currency: currency || "USD" });
    } catch (error) {
        console.error("Error fetching exchange rates:", error);
        res.status(500).json({ error: "Error fetching exchange rates" });
    }
});

app.post("/api/data", async (req, res) => {
    const session = store.openSession();
    try {
        const data = req.body;
        console.log("Data being saved:", data);
        await session.store(data);
        await session.saveChanges();
        res.status(201).send({ message: "Data saved successfully!" });
    } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).send({ message: "Error saving data", error: error.message });
    }
});

app.get("/api/data", async (req, res) => {
    const session = store.openSession();
    try {
        const data = await session.query({ collection: "@all_docs" }).all();
        const formattedData = data.map(doc => ({
            id: doc.id,
            firstName: doc.firstName,
            lastName: doc.lastName,
            phone: doc.phone,
            carModel: doc.carModel,
            licensePlate: doc.licensePlate,
            startDateTime: doc.startDateTime,
            endDateTime: doc.endDateTime,
            parkingArea: doc.parkingArea,
            discountPercentage: doc.discountPercentage,
            totalCost: doc.totalCost,
            currency: doc.currency || "USD",
        }));
        res.status(200).send(formattedData);
    } catch (error) {
        console.error("Error retrieving data:", error);
        res.status(500).send({ message: "Error retrieving data", error: error.message });
    }
});

app.put("/api/data/:id", async (req, res) => {
    const session = store.openSession();
    const id = req.params.id;
    const updatedData = req.body;

    try {
        const doc = await session.load(id);
        if(!doc) {
            return res.status(404).send({ message: "Document not found" });
        }

        doc.firstName = updatedData.firstName;
        doc.lastName = updatedData.lastName;
        doc.phone = updatedData.phone;
        doc.carModel = updatedData.carModel;
        doc.licensePlate = updatedData.licensePlate;
        doc.startDateTime = updatedData.startDateTime;
        doc.endDateTime = updatedData.endDateTime;
        doc.totalCost = updatedData.totalCost;

        await session.saveChanges()
        res.status(204).send();
    } catch (error) {
        console.error("Error updating data:", error);
        res.status(500).send({ message: "Error updating data", error: error.message });
    }

});

app.delete("/api/data/:id", async (req, res) => {
    const session = store.openSession();
    const id = req.params.id;

    try {
        const doc = await session.load(id);
        if (!doc) {
            return res.status(404).send({ message: "Document not found" });
        }
        await session.delete(doc);
        await session.saveChanges();
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting data:", error);
        res.status(500).send({ message: "Error deleting data", error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
