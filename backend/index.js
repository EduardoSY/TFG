const app = require("./app");

const {
    API_VERSION,
    IP_SERVER
} = require ("./constants");

const PORT = process.env.port || 3977;

app.listen (PORT, () => {
console.log("##############")
console.log("## API REST ##")
console.log("##############")
console.log(`http://${IP_SERVER}:${PORT}/api/${API_VERSION}`)
});