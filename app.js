const express = require("express");
const apiRouter = require("./server/routes");

const app = express();

// To serve image (static file)
app.use(express.static("public"));
// header content-type json
app.use(express.json());
// use the router
app.use("/api/kos", apiRouter);
// base setup
app.listen(process.env.PORT || "3000", () => {
    console.log(`Server is running on port : ${process.env.PORT || "3000"}`);
});
