// need to write the schema of the sms I want to consider, for example "diabete glycemie 1.5" or "hypertension 12/8" to parse them and store them in the database
const patterns = [
    {
        name: "diabete",
        regex: /diabete glycemie (\d+\.?\d*)/i,
    },
    {
        name: "hypertension",
        regex: /hypertension (\d+)\/(\d+)/i,
    },
];

module.exports = { patterns };
