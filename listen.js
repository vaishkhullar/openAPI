const app = require("./app");

const { PORT = 9091 } = process.env;

console.log(PORT);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
