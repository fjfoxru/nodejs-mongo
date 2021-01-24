const express = require('express');
const router = express.Router();


router.post('/user/login', (request, responce) => {
    responce.status(201);
    responce.json({ id: 1, mail: "test@mail.ru" });
});


module.exports = router;