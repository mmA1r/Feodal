-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Окт 26 2022 г., 03:29
-- Версия сервера: 8.0.30
-- Версия PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `feodal`
--

-- --------------------------------------------------------

--
-- Структура таблицы `chat`
--

CREATE TABLE `chat` (
  `id` int NOT NULL,
  `user_id` varchar(256) NOT NULL,
  `name` varchar(256) NOT NULL,
  `message` varchar(256) NOT NULL,
  `message_to` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `chat`
--

INSERT INTO `chat` (`id`, `user_id`, `name`, `message`, `message_to`) VALUES
(213, '414', 'alex', 'Ya tut', ''),
(575, '130', 'alex', 'Hi', 'alex'),
(577, '130', 'alex', 'Hi', 'alsan'),
(579, '130', 'alex', 'How are you?', ''),
(580, '130', 'alex', 'i`m fine, thx', 'alex'),
(581, '684', 'aslan', 'You`re so pity ***', 'alex'),
(582, '130', 'alex', '....thx...', 'aslan'),
(583, '130', 'alex', 'I`m fine now....', ''),
(584, '130', 'alex', 'Ok', ''),
(585, '130', 'alex', 'Hi', 'alex'),
(586, '130', 'alex', 'Hello', 'aslan'),
(587, '130', 'alex', 'HI', 'alex'),
(588, '130', 'alex', 'Hello world', ''),
(589, '141', 'aslan', 'life is drain', ''),
(590, '130', 'alex', 'sad true', ''),
(591, '130', 'alex', 'sad true...', 'aslan'),
(592, '130', 'alex', 'yeah...', 'alex'),
(593, '130', 'alex', 'ok', ''),
(617, '130', 'alex', 'YA USTAL', 'alex'),
(620, '130', 'alex', 'Yolo', 'alsan'),
(623, '130', 'alex', 'Shit...', ''),
(624, '130', 'alex', 'Так.... Ну это говно какое-то ну по факту что-то дерьмо я накодил...', ''),
(625, '130', 'alex', 'i`m fucked up', '');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `login` varchar(256) NOT NULL,
  `password` varchar(256) NOT NULL,
  `name` varchar(256) NOT NULL,
  `token` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `login`, `password`, `name`, `token`) VALUES
(130, 'alex', '123', 'alex', '49c5d875045aa9d4b24951534570efce'),
(132, 'check', '123', 'check', NULL),
(141, 'aslan', '123', 'aslan', '');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `login` (`login`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=626;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=142;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
