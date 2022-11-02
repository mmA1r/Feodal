-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Ноя 01 2022 г., 19:12
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
-- Структура таблицы `castles`
--

CREATE TABLE `castles` (
  `id` int NOT NULL,
  `ownerId` int NOT NULL,
  `lvl` int NOT NULL DEFAULT '1',
  `gold` int NOT NULL DEFAULT '1000',
  `posX` float NOT NULL,
  `posY` float NOT NULL,
  `hp` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `castles`
--

INSERT INTO `castles` (`id`, `ownerId`, `lvl`, `gold`, `posX`, `posY`, `hp`) VALUES
(2, 2, 1, 1000, 1, 2, 300);

-- --------------------------------------------------------

--
-- Структура таблицы `castlesLevels`
--

CREATE TABLE `castlesLevels` (
  `id` int NOT NULL,
  `name` varchar(256) NOT NULL,
  `maxHp` int NOT NULL,
  `cost` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `castlesLevels`
--

INSERT INTO `castlesLevels` (`id`, `name`, `maxHp`, `cost`) VALUES
(1, 'Гортус', 300, 0),
(2, 'Виртус', 650, 1000),
(3, 'Принципал', 1200, 2500),
(4, 'Торнорум', 2000, 10000),
(5, 'Доминион', 5000, 45000);

-- --------------------------------------------------------

--
-- Структура таблицы `maps`
--

CREATE TABLE `maps` (
  `id` int NOT NULL,
  `name` varchar(256) NOT NULL,
  `map` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `messages`
--

CREATE TABLE `messages` (
  `id` int NOT NULL,
  `userId` int NOT NULL,
  `message` varchar(256) NOT NULL,
  `messageTo` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `messages`
--

INSERT INTO `messages` (`id`, `userId`, `message`, `messageTo`) VALUES
(7, 2, 'ghbdtn', NULL),
(8, 2, 'ghbdtn', NULL),
(9, 2, 'ghbdtn', 2),
(10, 2, 'ghbdtn', NULL),
(11, 2, 'ghbdtn', NULL),
(12, 2, 'ghbdtn', NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `statuses`
--

CREATE TABLE `statuses` (
  `id` int NOT NULL,
  `chatHash` varchar(256) NOT NULL,
  `castlesHash` varchar(256) NOT NULL,
  `unitsHash` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `statuses`
--

INSERT INTO `statuses` (`id`, `chatHash`, `castlesHash`, `unitsHash`) VALUES
(1, '98fb113e7ac63c531bdd05d0a6a8cf41', '3acc0266515201e58e51c7189ed9ab87', 'c3bd042044ed6cd0ea3767e23435ff29');

-- --------------------------------------------------------

--
-- Структура таблицы `units`
--

CREATE TABLE `units` (
  `id` int NOT NULL,
  `typeId` int NOT NULL,
  `ownerId` int NOT NULL,
  `hp` int NOT NULL,
  `posX` float NOT NULL DEFAULT '0',
  `posY` float DEFAULT '0',
  `status` varchar(256) NOT NULL DEFAULT 'inCastle'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `units`
--

INSERT INTO `units` (`id`, `typeId`, `ownerId`, `hp`, `posX`, `posY`, `status`) VALUES
(33, 1, 2, 10, 0, 0, 'inCastle'),
(34, 1, 2, 10, 0, 0, 'inCastle'),
(35, 1, 2, 10, 0, 0, 'inCastle');

-- --------------------------------------------------------

--
-- Структура таблицы `unitsTypes`
--

CREATE TABLE `unitsTypes` (
  `id` int NOT NULL,
  `name` varchar(256) NOT NULL,
  `maxHp` int NOT NULL,
  `cost` int NOT NULL,
  `atk` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `unitsTypes`
--

INSERT INTO `unitsTypes` (`id`, `name`, `maxHp`, `cost`, `atk`) VALUES
(1, 'soldier', 10, 100, 1);

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
(1, 'vasya', '12345', 'Vasya Pupkin', NULL),
(2, 'admin', 'admin', 'Administrator', '5fd5611b52d4b90cce86848e59fd966a');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `castles`
--
ALTER TABLE `castles`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `castlesLevels`
--
ALTER TABLE `castlesLevels`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `maps`
--
ALTER TABLE `maps`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `statuses`
--
ALTER TABLE `statuses`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `units`
--
ALTER TABLE `units`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `unitsTypes`
--
ALTER TABLE `unitsTypes`
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
-- AUTO_INCREMENT для таблицы `castles`
--
ALTER TABLE `castles`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `castlesLevels`
--
ALTER TABLE `castlesLevels`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `maps`
--
ALTER TABLE `maps`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT для таблицы `statuses`
--
ALTER TABLE `statuses`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `units`
--
ALTER TABLE `units`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT для таблицы `unitsTypes`
--
ALTER TABLE `unitsTypes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
