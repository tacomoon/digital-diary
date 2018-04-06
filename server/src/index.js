'use strict';

const Express = require('express');

const express = Express();

express.get('*', (req, res) => res.send('"Welcome to the very beginning of nothingness"'));

express.listen(3000, () => console.log('App listening on port 3000'));