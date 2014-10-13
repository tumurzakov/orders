--
-- Tabelstructuur voor tabel `cf_or_orders`
--

DROP TABLE IF EXISTS `cf_or_orders`;
CREATE TABLE IF NOT EXISTS `cf_or_orders` (
  `model_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`model_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `go_links_or_orders`
--

DROP TABLE IF EXISTS `go_links_or_orders`;
CREATE TABLE IF NOT EXISTS `go_links_or_orders` (
  `id` int(11) NOT NULL,
  `folder_id` int(11) NOT NULL,
  `model_id` int(11) NOT NULL,
  `model_type_id` int(11) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `ctime` int(11) NOT NULL,
  KEY `link_id` (`model_id`,`model_type_id`),
  KEY `id` (`id`,`folder_id`),
  KEY `ctime` (`ctime`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------



--
-- Tabelstructuur voor tabel `or_orders`
--

DROP TABLE IF EXISTS `or_orders`;
CREATE TABLE IF NOT EXISTS `or_orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `ctime` int(11) NOT NULL DEFAULT '0',
  `mtime` int(11) NOT NULL DEFAULT '0',
  `muser_id` int(11) NOT NULL DEFAULT '0',
  `name` varchar(100) DEFAULT NULL,
  `content` text,
  `files_folder_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  FULLTEXT KEY `content` (`content`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------
