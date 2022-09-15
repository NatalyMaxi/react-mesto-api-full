module.exports.options = {
  origin: [ // Массив доменов, с которых разрешены кросс-доменные запросы.
    'http://localhost:3000',
    'https://domainname.nataly.nomoredomains.sbs',
    'https://praktikum.tk',
    'http://praktikum.tk',
    'localhost:3000',
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // настраивает заголовок CORS Access-Control-Allow-Methods.
  preflightContinue: false, // передать предварительный ответ CORS следующему обработчику.
  optionsSuccessStatus: 204, // Предоставляет код состояния для успешных OPTIONSзапросов.
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true, // сообщает браузерам, следует ли предоставлять ответ внешнему коду JS.
};
