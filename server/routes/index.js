const express = require("express");
const db = require("../db");
const multer = require("multer");
const path = require("path");
const Kos = require("../db");
const router = express.Router();

// define storage as place to store image
let storage = multer.diskStorage({
    destination: "public/images/",
    filename: function (_, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    }
});

router.post("/", async (req, res) => {
    // move image to storage
    const upload = multer({
        storage: storage
    }).single("gambar");

    // store to db
    upload(req, res, async e => {
        // thrw error
        if (e) {
            console.log(e);
            res.status(500).json(e);
        }

        const kos = new Kos({
            nama: req.body.nama,
            telp: req.body.telp,
            biaya: req.body.biaya,
            deskripsi: req.body.deskripsi,
            alamat: req.body.alamat,
            gambar: req.file.filename
        });

        try {
            await db.create(kos);
            res.status(201).json({
                message: "Kos has been created successfully"
            });
        } catch (e) {
            console.log(e);
            res.status(500).json(e);
        }
    });
});

router.get("/", async (_, res) => {
    try {
        let results = await db.all();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});

router.get("/:id", async (req, res) => {
    try {
        let results = await db.show(req.params.id);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});

module.exports = router;
