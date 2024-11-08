const config = {
    ravenDB: {
        url: "https://a.free.pay-calculat.ravendb.cloud",
        database: "payment-calculations",
        certificatePath: "./certs/free-pay-calculat-client-certificate.pem"
    },
    exchangeRatesAPI: {
        url: "https://api.exchangeratesapi.io/latest",
        access_key: "c4a1087b97c7f28952c6be8d3bdbb839"
    }
};

module.exports = config;
