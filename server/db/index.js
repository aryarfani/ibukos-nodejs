const mysql = require("mysql");

const pool = mysql.createPool({
    connectionLimit: 10,
    user: "root",
    password: "",
    database: "ibukos",
    host: "localhost",
    port: "3306"
});

const Kos = function (kos) {
    this.member_id = 5;
    this.nama = kos.nama;
    this.telp = kos.telp;
    this.biaya = kos.biaya;
    this.deskripsi = kos.deskripsi;
    this.alamat = kos.alamat;
    this.gambar = kos.gambar;
};

Kos.create = newKos => {
    return new Promise((resolve, reject) => {
        pool.query("INSERT INTO kos SET ?", newKos, (err, results) => {
            if (err) {
                return reject(err);
            }

            return resolve(results);
        });
    });
};

Kos.all = () => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM kos", (err, results) => {
            if (err) {
                return reject(err);
            }

            return resolve(results);
        });
    });
};

Kos.show = id => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM kos WHERE id = ?", [id], (err, results) => {
            if (err) {
                return reject(err);
            }

            return resolve(results[0]);
        });
    });
};

module.exports = Kos;
