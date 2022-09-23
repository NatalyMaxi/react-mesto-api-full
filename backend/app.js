require('dotenv').config(); // Dotenv — это модуль с нулевой зависимостью, который загружает переменные среды из .envфайла в файлы process.env.
const express = require('express');
const cors = require('cors');
const helmet = require('helmet'); // помогает защитить приложение от некоторых широко известных веб-уязвимостей путем соответствующей настройки заголовков HTTP
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');
const { options } = require('./middlewares/cors');
const { createUser, login } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const {
  validationCreateUser,
  validationLogin,
} = require('./utils/utils');

const NotFoundError = require('./Error/NotFoundError');

const { PORT = 3000 } = process.env;
const app = express();
app.use('*', cors(options));
app.use(helmet());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger); // подключаем логгер запросов

// для проверки ревьювером, что сервер падает и Pm2 должен его восстановить
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
}); // Не забыть удалить этот код после успешного прохождения ревью

app.post('/signin', validationLogin, login);

app.post('/signup', validationCreateUser, createUser);

app.use(auth); // защищает маршруты, которым нужны авторизация

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

// Обработка запроса на несуществующий роут

app.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемая страница не найдена'));
});

app.use(errorLogger); // подключаем логгер ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`Сервер запущен на ${PORT} порту`);
});
