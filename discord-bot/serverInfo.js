const query = require('samp-query');

const server = {
    host: '195.18.27.241',  // Замените на IP вашего SAMP сервера
    port: 1606   // Замените на порт вашего SAMP сервера
};

const getServerInfo = () => {
    return new Promise((resolve, reject) => {
        query(server, (error, response) => {
            if (error) {
                return reject(error);
            }
            resolve(response);
        });
    });
};

module.exports = getServerInfo;
