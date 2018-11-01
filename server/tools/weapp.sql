-- phpMyAdmin SQL Dump
-- version 4.4.15.10
-- https://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: 2018-11-01 04:52:13
-- 服务器版本： 5.7.24
-- PHP Version: 5.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `weapp`
--

-- --------------------------------------------------------

--
-- 表的结构 `motto`
--

CREATE TABLE IF NOT EXISTS `motto` (
  `id` int(11) NOT NULL,
  `text` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `author` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='首页的格言';

--
-- 转存表中的数据 `motto`
--

INSERT INTO `motto` (`id`, `text`, `author`) VALUES
(1, '从零开始，斗破苍穹，七界传说', '——源自小说名'),
(2, '天道酬勤', NULL),
(3, '消失的夜月，迟到的凌辰。', NULL),
(4, '你学习一门技术的最佳时机是三年前，其次是现在。', NULL),
(5, 'Don''t give up!', NULL),
(6, '学如逆水行舟，不进则退。心似平原走马，易放难收。', '——《增广贤文》'),
(7, '成不了药就成为毒，不然你只是普通的水而已。', '——卧烟远江 《花物语》'),
(8, '愿一直努力', NULL),
(9, '天道酬勤，越努力，越幸运！', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `motto`
--
ALTER TABLE `motto`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `motto`
--
ALTER TABLE `motto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=10;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
