const config = {
    ravenDB: {
        url: "https://a.free.pay-calculat.ravendb.cloud",
        database: "payment-calculations",
        certificatePath: "./certs/free-pay-calculat-client-certificate.pem"
    },
    exchangeRatesAPI: {
        url: "https://api.exchangeratesapi.io/latest",
        access_key: "927f45a497ac85d5cda8d9eaff8e9c4e"
    }
};

module.exports = config;
