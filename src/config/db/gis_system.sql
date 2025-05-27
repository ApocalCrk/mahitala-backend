-- phpMyAdmin SQL Dump
-- version 5.2.1-4.fc40
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 09, 2025 at 05:57 AM
-- Server version: 10.11.10-MariaDB
-- PHP Version: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gis_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `crop_recom_range`
--

CREATE TABLE `crop_recom_range` (
  `id_crop` int(11) NOT NULL,
  `label` varchar(255) NOT NULL,
  `min_range_temperature` double NOT NULL,
  `max_range_temperature` double NOT NULL,
  `min_range_humidity` double NOT NULL,
  `max_range_humidity` double NOT NULL,
  `min_range_rainfall` double NOT NULL,
  `max_range_rainfall` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `crop_recom_range`
--

INSERT INTO `crop_recom_range` (`id_crop`, `label`, `min_range_temperature`, `max_range_temperature`, `min_range_humidity`, `max_range_humidity`, `min_range_rainfall`, `max_range_rainfall`) VALUES
(89, 'padi', 20.0454142, 26.92995077, 80.12267476, 84.96907151, 182.5616319, 298.5601175),
(90, 'jagung', 18.04185513, 26.54986394, 55.28220433, 74.82913698, 60.65171481, 109.7515385),
(91, 'kacang arab', 17.02498456, 20.99502153, 14.25803981, 19.96978871, 65.11365631, 94.78189594),
(92, 'kacang merah', 15.33042636, 24.92360104, 18.09224048, 24.96969858, 60.27552528, 149.7441028),
(93, 'kacang gude', 18.31910448, 36.97794384, 30.40046769, 69.69141302, 90.05422663, 198.8298806),
(94, 'kacang ngengat', 24.01825377, 31.99928579, 40.00933429, 64.95585424, 30.92014047, 74.44330654),
(95, 'kacang hijau', 27.01470397, 29.914544300000006, 80.03499648, 89.99615558, 36.12042927, 59.87232071),
(96, 'kacang hitam', 25.09737391, 34.9466155, 60.06534859, 69.96100028, 60.41790253, 74.91559514),
(97, 'kacang lentil', 18.06486101, 29.94413861, 60.09116626, 69.92375891, 35.03484812, 54.93937710000001),
(98, 'delima', 18.07132963, 24.96273236, 85.12912161, 94.99897537, 102.5184759, 112.4750941),
(99, 'pisang', 25.01018457, 29.90888522, 75.03193255, 84.97849241, 90.10978128, 119.84797),
(100, 'mangga', 27.00315545, 35.99009679, 45.02236377, 54.9640534, 89.29147581, 100.8124659),
(101, 'anggur', 8.825674745, 41.94865736, 80.01639435, 83.98351748, 65.01095312, 74.91506217),
(102, 'semangka', 24.04355803, 26.98603693, 80.02621335, 89.98405233, 40.12650421, 59.75980023),
(103, 'blewah', 27.02415146, 29.94349168, 90.01506395, 94.96218673, 20.21126747, 29.86681385),
(104, 'apel', 21.0365275, 23.99686172, 90.02575116, 94.92048112, 100.1173443, 124.9831618),
(105, 'jeruk', 10.01081312, 34.90665289, 90.00621688, 94.96419851, 100.1737964, 119.6946577),
(106, 'pepaya', 23.012401800000006, 43.67549305, 90.03863107, 94.94482086, 40.35153141, 248.8592986),
(107, 'kelapa', 25.00872392, 29.8690834, 90.01734526, 99.98187601, 131.09000759999998, 225.6323656),
(108, 'kapas', 22.00085141, 25.99237426, 75.00539324, 84.87668973, 60.65381719, 99.93100821),
(109, 'rami', 23.09433785, 26.98582182, 70.88259632, 89.89106506, 150.2355238, 199.83629130000003),
(110, 'kopi', 23.05951896, 27.92374437, 50.04557009, 69.94807345, 115.1564012, 199.4735636);

-- --------------------------------------------------------

--
-- Table structure for table `forecast_weekly`
--

CREATE TABLE `forecast_weekly` (
  `id_forecast` int(11) NOT NULL,
  `lat` double NOT NULL,
  `lon` double NOT NULL,
  `waktu` datetime NOT NULL,
  `kelembapan` int(11) NOT NULL,
  `suhu` int(11) NOT NULL,
  `cuaca` int(11) NOT NULL,
  `arah_angin` varchar(10) NOT NULL,
  `kecepatan_angin` int(11) NOT NULL,
  `nama_daerah` varchar(255) NOT NULL,
  `kabupaten_kota` varchar(255) NOT NULL,
  `provinsi` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `forecast_weekly`
--

INSERT INTO `forecast_weekly` (`id_forecast`, `lat`, `lon`, `waktu`, `kelembapan`, `suhu`, `cuaca`, `arah_angin`, `kecepatan_angin`, `nama_daerah`, `kabupaten_kota`, `provinsi`) VALUES
(17497, -7.916666669, 110.3167, '2025-01-08 06:00:00', 72, 29, 4, 'SW', 19, 'Bantul', 'Kab. Bantul', 'DI Yogyakarta'),
(17498, -7.916666669, 110.3167, '2025-01-09 06:00:00', 80, 30, 60, 'SW', 12, 'Bantul', 'Kab. Bantul', 'DI Yogyakarta'),
(17499, -7.916666669, 110.3167, '2025-01-10 06:00:00', 61, 29, 60, 'SW', 7, 'Bantul', 'Kab. Bantul', 'DI Yogyakarta'),
(17500, -7.916666669, 110.3167, '2025-01-11 06:00:00', 70, 29, 4, 'SW', 16, 'Bantul', 'Kab. Bantul', 'DI Yogyakarta'),
(17501, -7.916666669, 110.3167, '2025-01-12 06:00:00', 92, 25, 60, 'SE', 0, 'Bantul', 'Kab. Bantul', 'DI Yogyakarta'),
(17502, -7.916666669, 110.3167, '2025-01-13 06:00:00', 90, 25, 4, 'NW', 1, 'Bantul', 'Kab. Bantul', 'DI Yogyakarta'),
(17503, -7.916666669, 110.3167, '2025-01-14 06:00:00', 82, 28, 60, 'NE', 2, 'Bantul', 'Kab. Bantul', 'DI Yogyakarta'),
(17504, -7.916666669, 110.3167, '2025-01-15 06:00:00', 83, 27, 4, 'N', 5, 'Bantul', 'Kab. Bantul', 'DI Yogyakarta'),
(17505, -7.916666669, 110.3167, '2025-01-16 06:00:00', 95, 24, 5, 'NE', 3, 'Bantul', 'Kab. Bantul', 'DI Yogyakarta'),
(17506, -7.916666669, 110.3167, '2025-01-17 06:00:00', 71, 28, 4, 'E', 3, 'Bantul', 'Kab. Bantul', 'DI Yogyakarta'),
(17507, -7.72, 110.38, '2025-01-08 06:00:00', 71, 30, 60, 'SW', 13, 'Sleman', 'Kab. Sleman', 'DI Yogyakarta'),
(17508, -7.72, 110.38, '2025-01-09 06:00:00', 91, 28, 60, 'SW', 6, 'Sleman', 'Kab. Sleman', 'DI Yogyakarta'),
(17509, -7.72, 110.38, '2025-01-10 06:00:00', 66, 29, 60, 'S', 3, 'Sleman', 'Kab. Sleman', 'DI Yogyakarta'),
(17510, -7.72, 110.38, '2025-01-11 06:00:00', 66, 29, 4, 'SW', 11, 'Sleman', 'Kab. Sleman', 'DI Yogyakarta'),
(17511, -7.72, 110.38, '2025-01-12 06:00:00', 82, 27, 60, 'NW', 7, 'Sleman', 'Kab. Sleman', 'DI Yogyakarta'),
(17512, -7.72, 110.38, '2025-01-13 06:00:00', 91, 25, 5, 'NW', 9, 'Sleman', 'Kab. Sleman', 'DI Yogyakarta'),
(17513, -7.72, 110.38, '2025-01-14 06:00:00', 86, 26, 60, 'NW', 3, 'Sleman', 'Kab. Sleman', 'DI Yogyakarta'),
(17514, -7.72, 110.38, '2025-01-15 06:00:00', 84, 26, 60, 'NW', 10, 'Sleman', 'Kab. Sleman', 'DI Yogyakarta'),
(17515, -7.72, 110.38, '2025-01-16 06:00:00', 93, 25, 4, 'NW', 11, 'Sleman', 'Kab. Sleman', 'DI Yogyakarta'),
(17516, -7.72, 110.38, '2025-01-17 06:00:00', 64, 29, 4, 'NW', 14, 'Sleman', 'Kab. Sleman', 'DI Yogyakarta'),
(17517, -7.85, 110.15, '2025-01-08 06:00:00', 73, 29, 60, 'SW', 17, 'Wates', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17518, -7.85, 110.15, '2025-01-09 06:00:00', 84, 30, 3, 'SW', 13, 'Wates', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17519, -7.85, 110.15, '2025-01-10 06:00:00', 68, 29, 60, 'SW', 6, 'Wates', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17520, -7.85, 110.15, '2025-01-11 06:00:00', 73, 28, 4, 'SW', 14, 'Wates', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17521, -7.85, 110.15, '2025-01-12 06:00:00', 92, 25, 60, 'N', 2, 'Wates', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17522, -7.85, 110.15, '2025-01-13 06:00:00', 93, 25, 4, 'NW', 8, 'Wates', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17523, -7.85, 110.15, '2025-01-14 06:00:00', 79, 27, 4, 'NE', 4, 'Wates', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17524, -7.85, 110.15, '2025-01-15 06:00:00', 86, 26, 4, 'NW', 10, 'Wates', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17525, -7.85, 110.15, '2025-01-16 06:00:00', 97, 24, 5, 'NW', 8, 'Wates', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17526, -7.85, 110.15, '2025-01-17 06:00:00', 71, 28, 4, 'N', 6, 'Wates', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17527, -7.966666669, 110.6, '2025-01-08 06:00:00', 69, 29, 4, 'W', 20, 'Gunung Kidul', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17528, -7.966666669, 110.6, '2025-01-09 06:00:00', 79, 30, 60, 'SW', 12, 'Gunung Kidul', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17529, -7.966666669, 110.6, '2025-01-10 06:00:00', 66, 29, 4, 'SW', 7, 'Gunung Kidul', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17530, -7.966666669, 110.6, '2025-01-11 06:00:00', 67, 29, 4, 'SW', 17, 'Gunung Kidul', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17531, -7.966666669, 110.6, '2025-01-12 06:00:00', 93, 24, 60, 'N', 1, 'Gunung Kidul', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17532, -7.966666669, 110.6, '2025-01-13 06:00:00', 94, 24, 5, 'W', 8, 'Gunung Kidul', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17533, -7.966666669, 110.6, '2025-01-14 06:00:00', 84, 27, 60, 'N', 1, 'Gunung Kidul', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17534, -7.966666669, 110.6, '2025-01-15 06:00:00', 84, 26, 4, 'W', 12, 'Gunung Kidul', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17535, -7.966666669, 110.6, '2025-01-16 06:00:00', 97, 24, 5, 'NW', 10, 'Gunung Kidul', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17536, -7.966666669, 110.6, '2025-01-17 06:00:00', 71, 28, 4, 'NW', 7, 'Gunung Kidul', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17537, -7.80279, 110.37625, '2025-01-08 06:00:00', 70, 30, 60, 'SW', 15, 'Yogyakarta', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17538, -7.80279, 110.37625, '2025-01-09 06:00:00', 84, 30, 3, 'SW', 6, 'Yogyakarta', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17539, -7.80279, 110.37625, '2025-01-10 06:00:00', 64, 29, 60, 'SW', 2, 'Yogyakarta', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17540, -7.80279, 110.37625, '2025-01-11 06:00:00', 65, 30, 4, 'SW', 15, 'Yogyakarta', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17541, -7.80279, 110.37625, '2025-01-12 06:00:00', 88, 27, 60, 'SW', 3, 'Yogyakarta', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17542, -7.80279, 110.37625, '2025-01-13 06:00:00', 89, 26, 5, 'W', 4, 'Yogyakarta', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17543, -7.80279, 110.37625, '2025-01-14 06:00:00', 83, 27, 60, 'NW', 1, 'Yogyakarta', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17544, -7.80279, 110.37625, '2025-01-15 06:00:00', 83, 27, 4, 'W', 5, 'Yogyakarta', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17545, -7.80279, 110.37625, '2025-01-16 06:00:00', 90, 25, 4, 'W', 4, 'Yogyakarta', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17546, -7.80279, 110.37625, '2025-01-17 06:00:00', 65, 29, 4, 'NW', 2, 'Yogyakarta', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17547, -7.949, 110.296, '2025-01-08 06:00:00', 74, 29, 4, 'W', 14, 'Bambanglipuro', 'Kab. Bantul', 'DI Yogyakarta'),
(17548, -7.949, 110.296, '2025-01-09 06:00:00', 80, 30, 60, 'W', 17, 'Bambanglipuro', 'Kab. Bantul', 'DI Yogyakarta'),
(17549, -7.949, 110.296, '2025-01-10 06:00:00', 61, 29, 3, 'SW', 11, 'Bambanglipuro', 'Kab. Bantul', 'DI Yogyakarta'),
(17550, -7.949, 110.296, '2025-01-11 06:00:00', 72, 29, 4, 'SW', 11, 'Bambanglipuro', 'Kab. Bantul', 'DI Yogyakarta'),
(17551, -7.949, 110.296, '2025-01-12 06:00:00', 92, 25, 60, 'N', 3, 'Bambanglipuro', 'Kab. Bantul', 'DI Yogyakarta'),
(17552, -7.949, 110.296, '2025-01-13 06:00:00', 89, 26, 4, 'NW', 8, 'Bambanglipuro', 'Kab. Bantul', 'DI Yogyakarta'),
(17553, -7.949, 110.296, '2025-01-14 06:00:00', 81, 28, 60, 'N', 4, 'Bambanglipuro', 'Kab. Bantul', 'DI Yogyakarta'),
(17554, -7.949, 110.296, '2025-01-15 06:00:00', 82, 27, 4, 'NW', 11, 'Bambanglipuro', 'Kab. Bantul', 'DI Yogyakarta'),
(17555, -7.949, 110.296, '2025-01-16 06:00:00', 94, 25, 5, 'NW', 11, 'Bambanglipuro', 'Kab. Bantul', 'DI Yogyakarta'),
(17556, -7.949, 110.296, '2025-01-17 06:00:00', 72, 28, 4, 'N', 8, 'Bambanglipuro', 'Kab. Bantul', 'DI Yogyakarta'),
(17557, -7.829, 110.411, '2025-01-08 06:00:00', 71, 30, 60, 'SW', 15, 'Banguntapan', 'Kab. Bantul', 'DI Yogyakarta'),
(17558, -7.829, 110.411, '2025-01-09 06:00:00', 82, 30, 3, 'SW', 6, 'Banguntapan', 'Kab. Bantul', 'DI Yogyakarta'),
(17559, -7.829, 110.411, '2025-01-10 06:00:00', 63, 29, 60, 'SW', 2, 'Banguntapan', 'Kab. Bantul', 'DI Yogyakarta'),
(17560, -7.829, 110.411, '2025-01-11 06:00:00', 65, 30, 4, 'SW', 15, 'Banguntapan', 'Kab. Bantul', 'DI Yogyakarta'),
(17561, -7.829, 110.411, '2025-01-12 06:00:00', 90, 26, 60, 'SW', 3, 'Banguntapan', 'Kab. Bantul', 'DI Yogyakarta'),
(17562, -7.829, 110.411, '2025-01-13 06:00:00', 89, 26, 4, 'W', 4, 'Banguntapan', 'Kab. Bantul', 'DI Yogyakarta'),
(17563, -7.829, 110.411, '2025-01-14 06:00:00', 84, 27, 60, 'NW', 1, 'Banguntapan', 'Kab. Bantul', 'DI Yogyakarta'),
(17564, -7.829, 110.411, '2025-01-15 06:00:00', 84, 27, 4, 'W', 5, 'Banguntapan', 'Kab. Bantul', 'DI Yogyakarta'),
(17565, -7.829, 110.411, '2025-01-16 06:00:00', 92, 25, 4, 'W', 4, 'Banguntapan', 'Kab. Bantul', 'DI Yogyakarta'),
(17566, -7.829, 110.411, '2025-01-17 06:00:00', 66, 29, 4, 'NW', 2, 'Banguntapan', 'Kab. Bantul', 'DI Yogyakarta'),
(17567, -7.883, 110.332, '2025-01-08 06:00:00', 70, 30, 60, 'SW', 19, 'Bantul', 'Kab. Bantul', 'DI Yogyakarta'),
(17568, -7.883, 110.332, '2025-01-09 06:00:00', 80, 30, 3, 'SW', 12, 'Bantul', 'Kab. Bantul', 'DI Yogyakarta'),
(17569, -7.883, 110.332, '2025-01-10 06:00:00', 62, 29, 60, 'SW', 7, 'Bantul', 'Kab. Bantul', 'DI Yogyakarta'),
(17570, -7.883, 110.332, '2025-01-11 06:00:00', 68, 29, 4, 'SW', 16, 'Bantul', 'Kab. Bantul', 'DI Yogyakarta'),
(17571, -7.883, 110.332, '2025-01-12 06:00:00', 91, 26, 60, 'SE', 0, 'Bantul', 'Kab. Bantul', 'DI Yogyakarta'),
(17572, -7.883, 110.332, '2025-01-13 06:00:00', 89, 26, 4, 'NW', 1, 'Bantul', 'Kab. Bantul', 'DI Yogyakarta'),
(17573, -7.883, 110.332, '2025-01-14 06:00:00', 81, 28, 60, 'NE', 2, 'Bantul', 'Kab. Bantul', 'DI Yogyakarta'),
(17574, -7.883, 110.332, '2025-01-15 06:00:00', 83, 27, 4, 'N', 5, 'Bantul', 'Kab. Bantul', 'DI Yogyakarta'),
(17575, -7.883, 110.332, '2025-01-16 06:00:00', 93, 25, 5, 'NE', 3, 'Bantul', 'Kab. Bantul', 'DI Yogyakarta'),
(17576, -7.883, 110.332, '2025-01-17 06:00:00', 69, 29, 4, 'E', 3, 'Bantul', 'Kab. Bantul', 'DI Yogyakarta'),
(17577, -7.805, 110.443, '2025-01-08 06:00:00', 71, 30, 60, 'SW', 17, 'Berbah', 'Kab. Sleman', 'DI Yogyakarta'),
(17578, -7.805, 110.443, '2025-01-09 06:00:00', 84, 30, 3, 'SW', 9, 'Berbah', 'Kab. Sleman', 'DI Yogyakarta'),
(17579, -7.805, 110.443, '2025-01-10 06:00:00', 64, 29, 4, 'N', 1, 'Berbah', 'Kab. Sleman', 'DI Yogyakarta'),
(17580, -7.805, 110.443, '2025-01-11 06:00:00', 65, 30, 4, 'SW', 16, 'Berbah', 'Kab. Sleman', 'DI Yogyakarta'),
(17581, -7.805, 110.443, '2025-01-12 06:00:00', 90, 26, 60, 'SW', 5, 'Berbah', 'Kab. Sleman', 'DI Yogyakarta'),
(17582, -7.805, 110.443, '2025-01-13 06:00:00', 89, 26, 4, 'SW', 10, 'Berbah', 'Kab. Sleman', 'DI Yogyakarta'),
(17583, -7.805, 110.443, '2025-01-14 06:00:00', 85, 27, 60, 'NW', 0, 'Berbah', 'Kab. Sleman', 'DI Yogyakarta'),
(17584, -7.805, 110.443, '2025-01-15 06:00:00', 83, 27, 4, 'W', 13, 'Berbah', 'Kab. Sleman', 'DI Yogyakarta'),
(17585, -7.805, 110.443, '2025-01-16 06:00:00', 92, 25, 4, 'W', 9, 'Berbah', 'Kab. Sleman', 'DI Yogyakarta'),
(17586, -7.805, 110.443, '2025-01-17 06:00:00', 65, 29, 4, 'W', 8, 'Berbah', 'Kab. Sleman', 'DI Yogyakarta'),
(17587, -7.664, 110.462, '2025-01-08 06:00:00', 75, 28, 3, 'SW', 16, 'Cangkringan', 'Kab. Sleman', 'DI Yogyakarta'),
(17588, -7.664, 110.462, '2025-01-09 06:00:00', 92, 28, 60, 'SW', 10, 'Cangkringan', 'Kab. Sleman', 'DI Yogyakarta'),
(17589, -7.664, 110.462, '2025-01-10 06:00:00', 70, 29, 60, 'SE', 1, 'Cangkringan', 'Kab. Sleman', 'DI Yogyakarta'),
(17590, -7.664, 110.462, '2025-01-11 06:00:00', 70, 27, 4, 'SW', 11, 'Cangkringan', 'Kab. Sleman', 'DI Yogyakarta'),
(17591, -7.664, 110.462, '2025-01-12 06:00:00', 80, 26, 4, 'SW', 4, 'Cangkringan', 'Kab. Sleman', 'DI Yogyakarta'),
(17592, -7.664, 110.462, '2025-01-13 06:00:00', 92, 24, 5, 'W', 12, 'Cangkringan', 'Kab. Sleman', 'DI Yogyakarta'),
(17593, -7.664, 110.462, '2025-01-14 06:00:00', 87, 25, 60, 'NW', 1, 'Cangkringan', 'Kab. Sleman', 'DI Yogyakarta'),
(17594, -7.664, 110.462, '2025-01-15 06:00:00', 83, 25, 60, 'W', 16, 'Cangkringan', 'Kab. Sleman', 'DI Yogyakarta'),
(17595, -7.664, 110.462, '2025-01-16 06:00:00', 92, 24, 4, 'W', 13, 'Cangkringan', 'Kab. Sleman', 'DI Yogyakarta'),
(17596, -7.664, 110.462, '2025-01-17 06:00:00', 65, 28, 4, 'W', 14, 'Cangkringan', 'Kab. Sleman', 'DI Yogyakarta'),
(17597, -7.795, 110.373, '2025-01-08 06:00:00', 70, 30, 60, 'SW', 15, 'Danurejan', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17598, -7.795, 110.373, '2025-01-09 06:00:00', 84, 30, 3, 'SW', 6, 'Danurejan', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17599, -7.795, 110.373, '2025-01-10 06:00:00', 64, 29, 60, 'SW', 2, 'Danurejan', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17600, -7.795, 110.373, '2025-01-11 06:00:00', 65, 30, 4, 'SW', 15, 'Danurejan', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17601, -7.795, 110.373, '2025-01-12 06:00:00', 88, 27, 60, 'SW', 3, 'Danurejan', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17602, -7.795, 110.373, '2025-01-13 06:00:00', 89, 26, 5, 'W', 4, 'Danurejan', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17603, -7.795, 110.373, '2025-01-14 06:00:00', 83, 27, 60, 'NW', 1, 'Danurejan', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17604, -7.795, 110.373, '2025-01-15 06:00:00', 83, 27, 4, 'W', 5, 'Danurejan', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17605, -7.795, 110.373, '2025-01-16 06:00:00', 90, 25, 4, 'W', 4, 'Danurejan', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17606, -7.795, 110.373, '2025-01-17 06:00:00', 65, 29, 4, 'NW', 2, 'Danurejan', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17607, -7.759, 110.394, '2025-01-08 06:00:00', 72, 30, 60, 'SW', 15, 'Depok', 'Kab. Sleman', 'DI Yogyakarta'),
(17608, -7.759, 110.394, '2025-01-09 06:00:00', 88, 30, 60, 'SW', 6, 'Depok', 'Kab. Sleman', 'DI Yogyakarta'),
(17609, -7.759, 110.394, '2025-01-10 06:00:00', 65, 29, 60, 'SW', 2, 'Depok', 'Kab. Sleman', 'DI Yogyakarta'),
(17610, -7.759, 110.394, '2025-01-11 06:00:00', 66, 29, 4, 'SW', 15, 'Depok', 'Kab. Sleman', 'DI Yogyakarta'),
(17611, -7.759, 110.394, '2025-01-12 06:00:00', 84, 27, 60, 'SW', 3, 'Depok', 'Kab. Sleman', 'DI Yogyakarta'),
(17612, -7.759, 110.394, '2025-01-13 06:00:00', 90, 25, 5, 'W', 4, 'Depok', 'Kab. Sleman', 'DI Yogyakarta'),
(17613, -7.759, 110.394, '2025-01-14 06:00:00', 86, 26, 60, 'NW', 1, 'Depok', 'Kab. Sleman', 'DI Yogyakarta'),
(17614, -7.759, 110.394, '2025-01-15 06:00:00', 83, 26, 4, 'W', 5, 'Depok', 'Kab. Sleman', 'DI Yogyakarta'),
(17615, -7.759, 110.394, '2025-01-16 06:00:00', 93, 25, 4, 'W', 4, 'Depok', 'Kab. Sleman', 'DI Yogyakarta'),
(17616, -7.759, 110.394, '2025-01-17 06:00:00', 63, 29, 4, 'NW', 2, 'Depok', 'Kab. Sleman', 'DI Yogyakarta'),
(17617, -7.935, 110.465, '2025-01-08 06:00:00', 71, 29, 4, 'W', 19, 'Dlingo', 'Kab. Bantul', 'DI Yogyakarta'),
(17618, -7.935, 110.465, '2025-01-09 06:00:00', 80, 30, 3, 'W', 10, 'Dlingo', 'Kab. Bantul', 'DI Yogyakarta'),
(17619, -7.935, 110.465, '2025-01-10 06:00:00', 64, 29, 4, 'SW', 4, 'Dlingo', 'Kab. Bantul', 'DI Yogyakarta'),
(17620, -7.935, 110.465, '2025-01-11 06:00:00', 67, 29, 4, 'SW', 17, 'Dlingo', 'Kab. Bantul', 'DI Yogyakarta'),
(17621, -7.935, 110.465, '2025-01-12 06:00:00', 93, 25, 60, 'SW', 2, 'Dlingo', 'Kab. Bantul', 'DI Yogyakarta'),
(17622, -7.935, 110.465, '2025-01-13 06:00:00', 95, 24, 5, 'W', 8, 'Dlingo', 'Kab. Bantul', 'DI Yogyakarta'),
(17623, -7.935, 110.465, '2025-01-14 06:00:00', 84, 27, 60, 'W', 1, 'Dlingo', 'Kab. Bantul', 'DI Yogyakarta'),
(17624, -7.935, 110.465, '2025-01-15 06:00:00', 84, 26, 4, 'W', 10, 'Dlingo', 'Kab. Bantul', 'DI Yogyakarta'),
(17625, -7.935, 110.465, '2025-01-16 06:00:00', 98, 24, 5, 'W', 7, 'Dlingo', 'Kab. Bantul', 'DI Yogyakarta'),
(17626, -7.935, 110.465, '2025-01-17 06:00:00', 71, 28, 4, 'W', 5, 'Dlingo', 'Kab. Bantul', 'DI Yogyakarta'),
(17627, -7.94, 110.236, '2025-01-08 06:00:00', 76, 29, 4, 'W', 12, 'Galur', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17628, -7.94, 110.236, '2025-01-09 06:00:00', 78, 30, 3, 'W', 16, 'Galur', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17629, -7.94, 110.236, '2025-01-10 06:00:00', 63, 30, 3, 'SW', 9, 'Galur', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17630, -7.94, 110.236, '2025-01-11 06:00:00', 74, 28, 4, 'SW', 9, 'Galur', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17631, -7.94, 110.236, '2025-01-12 06:00:00', 92, 25, 60, 'N', 4, 'Galur', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17632, -7.94, 110.236, '2025-01-13 06:00:00', 89, 26, 4, 'NW', 12, 'Galur', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17633, -7.94, 110.236, '2025-01-14 06:00:00', 79, 28, 60, 'NE', 6, 'Galur', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17634, -7.94, 110.236, '2025-01-15 06:00:00', 81, 27, 4, 'NW', 14, 'Galur', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17635, -7.94, 110.236, '2025-01-16 06:00:00', 94, 25, 5, 'NW', 13, 'Galur', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17636, -7.94, 110.236, '2025-01-17 06:00:00', 73, 28, 4, 'NW', 12, 'Galur', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17637, -7.796, 110.322, '2025-01-08 06:00:00', 66, 30, 60, 'SW', 16, 'Gamping', 'Kab. Sleman', 'DI Yogyakarta'),
(17638, -7.796, 110.322, '2025-01-09 06:00:00', 84, 30, 3, 'S', 7, 'Gamping', 'Kab. Sleman', 'DI Yogyakarta'),
(17639, -7.796, 110.322, '2025-01-10 06:00:00', 66, 29, 60, 'S', 3, 'Gamping', 'Kab. Sleman', 'DI Yogyakarta'),
(17640, -7.796, 110.322, '2025-01-11 06:00:00', 65, 30, 4, 'SW', 15, 'Gamping', 'Kab. Sleman', 'DI Yogyakarta'),
(17641, -7.796, 110.322, '2025-01-12 06:00:00', 87, 27, 60, 'SW', 0, 'Gamping', 'Kab. Sleman', 'DI Yogyakarta'),
(17642, -7.796, 110.322, '2025-01-13 06:00:00', 90, 26, 5, 'W', 2, 'Gamping', 'Kab. Sleman', 'DI Yogyakarta'),
(17643, -7.796, 110.322, '2025-01-14 06:00:00', 82, 28, 60, 'N', 2, 'Gamping', 'Kab. Sleman', 'DI Yogyakarta'),
(17644, -7.796, 110.322, '2025-01-15 06:00:00', 82, 27, 4, 'N', 3, 'Gamping', 'Kab. Sleman', 'DI Yogyakarta'),
(17645, -7.796, 110.322, '2025-01-16 06:00:00', 89, 25, 5, 'NE', 1, 'Gamping', 'Kab. Sleman', 'DI Yogyakarta'),
(17646, -7.796, 110.322, '2025-01-17 06:00:00', 65, 29, 4, 'NE', 2, 'Gamping', 'Kab. Sleman', 'DI Yogyakarta'),
(17647, -7.842, 110.592, '2025-01-08 06:00:00', 69, 30, 60, 'W', 20, 'Gedangsari', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17648, -7.842, 110.592, '2025-01-09 06:00:00', 79, 30, 3, 'SW', 8, 'Gedangsari', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17649, -7.842, 110.592, '2025-01-10 06:00:00', 67, 29, 4, 'W', 1, 'Gedangsari', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17650, -7.842, 110.592, '2025-01-11 06:00:00', 64, 30, 4, 'SW', 16, 'Gedangsari', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17651, -7.842, 110.592, '2025-01-12 06:00:00', 91, 25, 60, 'E', 1, 'Gedangsari', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17652, -7.842, 110.592, '2025-01-13 06:00:00', 88, 25, 5, 'W', 7, 'Gedangsari', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17653, -7.842, 110.592, '2025-01-14 06:00:00', 85, 26, 60, 'NW', 1, 'Gedangsari', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17654, -7.842, 110.592, '2025-01-15 06:00:00', 82, 26, 4, 'W', 12, 'Gedangsari', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17655, -7.842, 110.592, '2025-01-16 06:00:00', 93, 25, 5, 'W', 9, 'Gedangsari', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17656, -7.842, 110.592, '2025-01-17 06:00:00', 67, 29, 4, 'W', 5, 'Gedangsari', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17657, -7.789, 110.359, '2025-01-08 06:00:00', 68, 30, 60, 'SW', 15, 'Gedongtengen', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17658, -7.789, 110.359, '2025-01-09 06:00:00', 84, 30, 3, 'SW', 6, 'Gedongtengen', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17659, -7.789, 110.359, '2025-01-10 06:00:00', 65, 29, 60, 'SW', 2, 'Gedongtengen', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17660, -7.789, 110.359, '2025-01-11 06:00:00', 65, 30, 4, 'SW', 15, 'Gedongtengen', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17661, -7.789, 110.359, '2025-01-12 06:00:00', 88, 27, 60, 'SW', 3, 'Gedongtengen', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17662, -7.789, 110.359, '2025-01-13 06:00:00', 89, 26, 5, 'W', 4, 'Gedongtengen', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17663, -7.789, 110.359, '2025-01-14 06:00:00', 83, 28, 60, 'NW', 1, 'Gedongtengen', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17664, -7.789, 110.359, '2025-01-15 06:00:00', 82, 27, 4, 'W', 5, 'Gedongtengen', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17665, -7.789, 110.359, '2025-01-16 06:00:00', 90, 25, 5, 'W', 4, 'Gedongtengen', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17666, -7.789, 110.359, '2025-01-17 06:00:00', 65, 29, 4, 'NW', 2, 'Gedongtengen', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17667, -7.772, 110.185, '2025-01-08 06:00:00', 68, 29, 60, 'W', 17, 'Girimulyo', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17668, -7.772, 110.185, '2025-01-09 06:00:00', 90, 28, 60, 'SW', 9, 'Girimulyo', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17669, -7.772, 110.185, '2025-01-10 06:00:00', 71, 29, 60, 'S', 5, 'Girimulyo', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17670, -7.772, 110.185, '2025-01-11 06:00:00', 71, 28, 4, 'SW', 14, 'Girimulyo', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17671, -7.772, 110.185, '2025-01-12 06:00:00', 89, 25, 4, 'NW', 4, 'Girimulyo', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17672, -7.772, 110.185, '2025-01-13 06:00:00', 96, 24, 5, 'W', 5, 'Girimulyo', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17673, -7.772, 110.185, '2025-01-14 06:00:00', 81, 27, 4, 'NW', 1, 'Girimulyo', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17674, -7.772, 110.185, '2025-01-15 06:00:00', 88, 25, 4, 'NW', 6, 'Girimulyo', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17675, -7.772, 110.185, '2025-01-16 06:00:00', 98, 23, 5, 'NW', 4, 'Girimulyo', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17676, -7.772, 110.185, '2025-01-17 06:00:00', 67, 29, 4, 'W', 5, 'Girimulyo', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17677, -8.169353, 110.766907, '2025-01-08 06:00:00', 78, 28, 4, 'W', 20, 'Girisubo', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17678, -8.169353, 110.766907, '2025-01-09 06:00:00', 86, 29, 4, 'W', 14, 'Girisubo', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17679, -8.169353, 110.766907, '2025-01-10 06:00:00', 85, 28, 60, 'S', 4, 'Girisubo', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17680, -8.169353, 110.766907, '2025-01-11 06:00:00', 73, 28, 4, 'SW', 12, 'Girisubo', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17681, -8.169353, 110.766907, '2025-01-12 06:00:00', 94, 24, 60, 'NW', 12, 'Girisubo', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17682, -8.169353, 110.766907, '2025-01-13 06:00:00', 95, 24, 5, 'NW', 11, 'Girisubo', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17683, -8.169353, 110.766907, '2025-01-14 06:00:00', 85, 26, 60, 'NW', 9, 'Girisubo', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17684, -8.169353, 110.766907, '2025-01-15 06:00:00', 85, 26, 4, 'W', 17, 'Girisubo', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17685, -8.169353, 110.766907, '2025-01-16 06:00:00', 91, 25, 5, 'NW', 15, 'Girisubo', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17686, -8.169353, 110.766907, '2025-01-17 06:00:00', 76, 28, 4, 'NW', 16, 'Girisubo', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17687, -7.77, 110.3, '2025-01-08 06:00:00', 66, 30, 60, 'SW', 16, 'Godean', 'Kab. Sleman', 'DI Yogyakarta'),
(17688, -7.77, 110.3, '2025-01-09 06:00:00', 87, 30, 3, 'S', 7, 'Godean', 'Kab. Sleman', 'DI Yogyakarta'),
(17689, -7.77, 110.3, '2025-01-10 06:00:00', 67, 29, 3, 'S', 3, 'Godean', 'Kab. Sleman', 'DI Yogyakarta'),
(17690, -7.77, 110.3, '2025-01-11 06:00:00', 64, 30, 4, 'SW', 15, 'Godean', 'Kab. Sleman', 'DI Yogyakarta'),
(17691, -7.77, 110.3, '2025-01-12 06:00:00', 86, 27, 60, 'SW', 0, 'Godean', 'Kab. Sleman', 'DI Yogyakarta'),
(17692, -7.77, 110.3, '2025-01-13 06:00:00', 91, 26, 5, 'W', 2, 'Godean', 'Kab. Sleman', 'DI Yogyakarta'),
(17693, -7.77, 110.3, '2025-01-14 06:00:00', 82, 28, 60, 'N', 2, 'Godean', 'Kab. Sleman', 'DI Yogyakarta'),
(17694, -7.77, 110.3, '2025-01-15 06:00:00', 82, 27, 4, 'N', 3, 'Godean', 'Kab. Sleman', 'DI Yogyakarta'),
(17695, -7.77, 110.3, '2025-01-16 06:00:00', 90, 25, 5, 'NE', 1, 'Godean', 'Kab. Sleman', 'DI Yogyakarta'),
(17696, -7.77, 110.3, '2025-01-17 06:00:00', 64, 29, 4, 'NE', 2, 'Godean', 'Kab. Sleman', 'DI Yogyakarta'),
(17697, -7.787, 110.388, '2025-01-08 06:00:00', 72, 30, 60, 'SW', 15, 'Gondokusuman', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17698, -7.787, 110.388, '2025-01-09 06:00:00', 86, 30, 3, 'SW', 6, 'Gondokusuman', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17699, -7.787, 110.388, '2025-01-10 06:00:00', 64, 29, 60, 'SW', 2, 'Gondokusuman', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17700, -7.787, 110.388, '2025-01-11 06:00:00', 66, 29, 4, 'SW', 15, 'Gondokusuman', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17701, -7.787, 110.388, '2025-01-12 06:00:00', 86, 26, 60, 'SW', 3, 'Gondokusuman', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17702, -7.787, 110.388, '2025-01-13 06:00:00', 89, 26, 5, 'W', 4, 'Gondokusuman', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17703, -7.787, 110.388, '2025-01-14 06:00:00', 85, 27, 60, 'NW', 1, 'Gondokusuman', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17704, -7.787, 110.388, '2025-01-15 06:00:00', 83, 26, 4, 'W', 5, 'Gondokusuman', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17705, -7.787, 110.388, '2025-01-16 06:00:00', 92, 25, 4, 'W', 4, 'Gondokusuman', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17706, -7.787, 110.388, '2025-01-17 06:00:00', 64, 29, 4, 'NW', 2, 'Gondokusuman', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17707, -7.808, 110.366, '2025-01-08 06:00:00', 70, 30, 60, 'SW', 15, 'Gondomanan', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17708, -7.808, 110.366, '2025-01-09 06:00:00', 84, 30, 3, 'SW', 6, 'Gondomanan', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17709, -7.808, 110.366, '2025-01-10 06:00:00', 64, 29, 60, 'SW', 2, 'Gondomanan', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17710, -7.808, 110.366, '2025-01-11 06:00:00', 65, 30, 4, 'SW', 15, 'Gondomanan', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17711, -7.808, 110.366, '2025-01-12 06:00:00', 88, 27, 60, 'SW', 3, 'Gondomanan', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17712, -7.808, 110.366, '2025-01-13 06:00:00', 89, 26, 5, 'W', 4, 'Gondomanan', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17713, -7.808, 110.366, '2025-01-14 06:00:00', 83, 27, 60, 'NW', 1, 'Gondomanan', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17714, -7.808, 110.366, '2025-01-15 06:00:00', 83, 27, 4, 'W', 5, 'Gondomanan', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17715, -7.808, 110.366, '2025-01-16 06:00:00', 90, 25, 4, 'W', 4, 'Gondomanan', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17716, -7.808, 110.366, '2025-01-17 06:00:00', 65, 29, 4, 'NW', 2, 'Gondomanan', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17717, -7.921, 110.382, '2025-01-08 06:00:00', 71, 29, 4, 'W', 18, 'Imogiri', 'Kab. Bantul', 'DI Yogyakarta'),
(17718, -7.921, 110.382, '2025-01-09 06:00:00', 80, 30, 60, 'SW', 10, 'Imogiri', 'Kab. Bantul', 'DI Yogyakarta'),
(17719, -7.921, 110.382, '2025-01-10 06:00:00', 62, 29, 60, 'SW', 6, 'Imogiri', 'Kab. Bantul', 'DI Yogyakarta'),
(17720, -7.921, 110.382, '2025-01-11 06:00:00', 70, 29, 4, 'SW', 16, 'Imogiri', 'Kab. Bantul', 'DI Yogyakarta'),
(17721, -7.921, 110.382, '2025-01-12 06:00:00', 93, 25, 60, 'SW', 1, 'Imogiri', 'Kab. Bantul', 'DI Yogyakarta'),
(17722, -7.921, 110.382, '2025-01-13 06:00:00', 92, 25, 4, 'SW', 2, 'Imogiri', 'Kab. Bantul', 'DI Yogyakarta'),
(17723, -7.921, 110.382, '2025-01-14 06:00:00', 84, 27, 60, 'SW', 0, 'Imogiri', 'Kab. Bantul', 'DI Yogyakarta'),
(17724, -7.921, 110.382, '2025-01-15 06:00:00', 85, 27, 4, 'W', 4, 'Imogiri', 'Kab. Bantul', 'DI Yogyakarta'),
(17725, -7.921, 110.382, '2025-01-16 06:00:00', 96, 24, 5, 'W', 1, 'Imogiri', 'Kab. Bantul', 'DI Yogyakarta'),
(17726, -7.921, 110.382, '2025-01-17 06:00:00', 71, 28, 4, 'SW', 0, 'Imogiri', 'Kab. Bantul', 'DI Yogyakarta'),
(17727, -7.897, 110.374, '2025-01-08 06:00:00', 71, 29, 4, 'W', 18, 'Jetis', 'Kab. Bantul', 'DI Yogyakarta'),
(17728, -7.897, 110.374, '2025-01-09 06:00:00', 79, 30, 3, 'SW', 10, 'Jetis', 'Kab. Bantul', 'DI Yogyakarta'),
(17729, -7.897, 110.374, '2025-01-10 06:00:00', 61, 29, 60, 'SW', 6, 'Jetis', 'Kab. Bantul', 'DI Yogyakarta'),
(17730, -7.897, 110.374, '2025-01-11 06:00:00', 68, 29, 4, 'SW', 16, 'Jetis', 'Kab. Bantul', 'DI Yogyakarta'),
(17731, -7.897, 110.374, '2025-01-12 06:00:00', 94, 25, 60, 'SW', 1, 'Jetis', 'Kab. Bantul', 'DI Yogyakarta'),
(17732, -7.897, 110.374, '2025-01-13 06:00:00', 92, 25, 4, 'SW', 2, 'Jetis', 'Kab. Bantul', 'DI Yogyakarta'),
(17733, -7.897, 110.374, '2025-01-14 06:00:00', 84, 27, 60, 'SW', 0, 'Jetis', 'Kab. Bantul', 'DI Yogyakarta'),
(17734, -7.897, 110.374, '2025-01-15 06:00:00', 85, 27, 4, 'W', 4, 'Jetis', 'Kab. Bantul', 'DI Yogyakarta'),
(17735, -7.897, 110.374, '2025-01-16 06:00:00', 96, 24, 5, 'W', 1, 'Jetis', 'Kab. Bantul', 'DI Yogyakarta'),
(17736, -7.897, 110.374, '2025-01-17 06:00:00', 70, 29, 4, 'SW', 0, 'Jetis', 'Kab. Bantul', 'DI Yogyakarta'),
(17737, -7.786, 110.362, '2025-01-08 06:00:00', 69, 30, 60, 'SW', 15, 'Jetis', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17738, -7.786, 110.362, '2025-01-09 06:00:00', 86, 30, 3, 'SW', 6, 'Jetis', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17739, -7.786, 110.362, '2025-01-10 06:00:00', 66, 29, 3, 'SW', 2, 'Jetis', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17740, -7.786, 110.362, '2025-01-11 06:00:00', 65, 30, 4, 'SW', 15, 'Jetis', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17741, -7.786, 110.362, '2025-01-12 06:00:00', 86, 27, 60, 'SW', 3, 'Jetis', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17742, -7.786, 110.362, '2025-01-13 06:00:00', 90, 26, 5, 'W', 4, 'Jetis', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17743, -7.786, 110.362, '2025-01-14 06:00:00', 83, 27, 60, 'NW', 1, 'Jetis', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17744, -7.786, 110.362, '2025-01-15 06:00:00', 83, 27, 4, 'W', 5, 'Jetis', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17745, -7.786, 110.362, '2025-01-16 06:00:00', 91, 25, 5, 'W', 4, 'Jetis', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17746, -7.786, 110.362, '2025-01-17 06:00:00', 64, 29, 4, 'NW', 2, 'Jetis', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17747, -7.77, 110.467, '2025-01-08 06:00:00', 71, 30, 60, 'SW', 17, 'Kalasan', 'Kab. Sleman', 'DI Yogyakarta'),
(17748, -7.77, 110.467, '2025-01-09 06:00:00', 86, 30, 60, 'SW', 9, 'Kalasan', 'Kab. Sleman', 'DI Yogyakarta'),
(17749, -7.77, 110.467, '2025-01-10 06:00:00', 66, 29, 4, 'N', 1, 'Kalasan', 'Kab. Sleman', 'DI Yogyakarta'),
(17750, -7.77, 110.467, '2025-01-11 06:00:00', 66, 29, 4, 'SW', 16, 'Kalasan', 'Kab. Sleman', 'DI Yogyakarta'),
(17751, -7.77, 110.467, '2025-01-12 06:00:00', 88, 26, 60, 'SW', 5, 'Kalasan', 'Kab. Sleman', 'DI Yogyakarta'),
(17752, -7.77, 110.467, '2025-01-13 06:00:00', 90, 25, 5, 'SW', 10, 'Kalasan', 'Kab. Sleman', 'DI Yogyakarta'),
(17753, -7.77, 110.467, '2025-01-14 06:00:00', 87, 26, 60, 'NW', 0, 'Kalasan', 'Kab. Sleman', 'DI Yogyakarta'),
(17754, -7.77, 110.467, '2025-01-15 06:00:00', 82, 26, 4, 'W', 13, 'Kalasan', 'Kab. Sleman', 'DI Yogyakarta'),
(17755, -7.77, 110.467, '2025-01-16 06:00:00', 92, 25, 4, 'W', 9, 'Kalasan', 'Kab. Sleman', 'DI Yogyakarta'),
(17756, -7.77, 110.467, '2025-01-17 06:00:00', 64, 29, 4, 'W', 8, 'Kalasan', 'Kab. Sleman', 'DI Yogyakarta'),
(17757, -7.674, 110.263, '2025-01-08 06:00:00', 70, 29, 3, 'W', 10, 'Kalibawang', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17758, -7.674, 110.263, '2025-01-09 06:00:00', 93, 29, 4, 'S', 0, 'Kalibawang', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17759, -7.674, 110.263, '2025-01-10 06:00:00', 69, 29, 4, 'S', 3, 'Kalibawang', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17760, -7.674, 110.263, '2025-01-11 06:00:00', 66, 29, 4, 'SW', 7, 'Kalibawang', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17761, -7.674, 110.263, '2025-01-12 06:00:00', 82, 26, 4, 'N', 6, 'Kalibawang', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17762, -7.674, 110.263, '2025-01-13 06:00:00', 94, 25, 5, 'N', 5, 'Kalibawang', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17763, -7.674, 110.263, '2025-01-14 06:00:00', 83, 27, 60, 'N', 5, 'Kalibawang', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17764, -7.674, 110.263, '2025-01-15 06:00:00', 87, 25, 60, 'N', 6, 'Kalibawang', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17765, -7.674, 110.263, '2025-01-16 06:00:00', 92, 25, 5, 'N', 6, 'Kalibawang', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17766, -7.674, 110.263, '2025-01-17 06:00:00', 66, 28, 4, 'N', 7, 'Kalibawang', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17767, -7.953, 110.676, '2025-01-08 06:00:00', 68, 29, 60, 'W', 21, 'Karangmojo', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17768, -7.953, 110.676, '2025-01-09 06:00:00', 80, 30, 60, 'SW', 10, 'Karangmojo', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17769, -7.953, 110.676, '2025-01-10 06:00:00', 69, 29, 4, 'W', 6, 'Karangmojo', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17770, -7.953, 110.676, '2025-01-11 06:00:00', 69, 29, 4, 'SW', 17, 'Karangmojo', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17771, -7.953, 110.676, '2025-01-12 06:00:00', 93, 24, 60, 'N', 2, 'Karangmojo', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17772, -7.953, 110.676, '2025-01-13 06:00:00', 91, 24, 5, 'W', 6, 'Karangmojo', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17773, -7.953, 110.676, '2025-01-14 06:00:00', 86, 26, 60, 'NW', 1, 'Karangmojo', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17774, -7.953, 110.676, '2025-01-15 06:00:00', 86, 26, 4, 'W', 12, 'Karangmojo', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17775, -7.953, 110.676, '2025-01-16 06:00:00', 95, 24, 5, 'W', 11, 'Karangmojo', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17776, -7.953, 110.676, '2025-01-17 06:00:00', 70, 28, 4, 'NW', 7, 'Karangmojo', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17777, -7.828, 110.345, '2025-01-08 06:00:00', 69, 30, 60, 'SW', 15, 'Kasihan', 'Kab. Bantul', 'DI Yogyakarta'),
(17778, -7.828, 110.345, '2025-01-09 06:00:00', 83, 30, 3, 'SW', 6, 'Kasihan', 'Kab. Bantul', 'DI Yogyakarta'),
(17779, -7.828, 110.345, '2025-01-10 06:00:00', 64, 29, 60, 'SW', 2, 'Kasihan', 'Kab. Bantul', 'DI Yogyakarta'),
(17780, -7.828, 110.345, '2025-01-11 06:00:00', 66, 30, 4, 'SW', 15, 'Kasihan', 'Kab. Bantul', 'DI Yogyakarta'),
(17781, -7.828, 110.345, '2025-01-12 06:00:00', 89, 26, 60, 'SW', 3, 'Kasihan', 'Kab. Bantul', 'DI Yogyakarta'),
(17782, -7.828, 110.345, '2025-01-13 06:00:00', 90, 26, 4, 'W', 4, 'Kasihan', 'Kab. Bantul', 'DI Yogyakarta'),
(17783, -7.828, 110.345, '2025-01-14 06:00:00', 83, 28, 60, 'NW', 1, 'Kasihan', 'Kab. Bantul', 'DI Yogyakarta'),
(17784, -7.828, 110.345, '2025-01-15 06:00:00', 83, 27, 4, 'W', 5, 'Kasihan', 'Kab. Bantul', 'DI Yogyakarta'),
(17785, -7.828, 110.345, '2025-01-16 06:00:00', 91, 25, 5, 'W', 4, 'Kasihan', 'Kab. Bantul', 'DI Yogyakarta'),
(17786, -7.828, 110.345, '2025-01-17 06:00:00', 66, 29, 4, 'NW', 2, 'Kasihan', 'Kab. Bantul', 'DI Yogyakarta'),
(17787, -7.84, 110.101, '2025-01-08 06:00:00', 76, 29, 1, 'SW', 13, 'Kokap', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17788, -7.84, 110.101, '2025-01-09 06:00:00', 84, 30, 3, 'SW', 14, 'Kokap', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17789, -7.84, 110.101, '2025-01-10 06:00:00', 69, 29, 3, 'SW', 7, 'Kokap', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17790, -7.84, 110.101, '2025-01-11 06:00:00', 74, 28, 4, 'SW', 10, 'Kokap', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17791, -7.84, 110.101, '2025-01-12 06:00:00', 94, 25, 60, 'NW', 5, 'Kokap', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17792, -7.84, 110.101, '2025-01-13 06:00:00', 94, 25, 5, 'NW', 9, 'Kokap', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17793, -7.84, 110.101, '2025-01-14 06:00:00', 80, 27, 4, 'NE', 4, 'Kokap', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17794, -7.84, 110.101, '2025-01-15 06:00:00', 88, 26, 4, 'NW', 14, 'Kokap', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17795, -7.84, 110.101, '2025-01-16 06:00:00', 97, 24, 5, 'NW', 13, 'Kokap', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17796, -7.84, 110.101, '2025-01-17 06:00:00', 73, 28, 4, 'NW', 16, 'Kokap', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17797, -7.818, 110.395, '2025-01-08 06:00:00', 71, 30, 60, 'SW', 15, 'Kotagede', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17798, -7.818, 110.395, '2025-01-09 06:00:00', 82, 30, 3, 'SW', 6, 'Kotagede', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17799, -7.818, 110.395, '2025-01-10 06:00:00', 63, 29, 60, 'SW', 2, 'Kotagede', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17800, -7.818, 110.395, '2025-01-11 06:00:00', 65, 30, 4, 'SW', 15, 'Kotagede', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17801, -7.818, 110.395, '2025-01-12 06:00:00', 90, 26, 60, 'SW', 3, 'Kotagede', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17802, -7.818, 110.395, '2025-01-13 06:00:00', 89, 26, 4, 'W', 4, 'Kotagede', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17803, -7.818, 110.395, '2025-01-14 06:00:00', 84, 27, 60, 'NW', 1, 'Kotagede', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17804, -7.818, 110.395, '2025-01-15 06:00:00', 84, 27, 4, 'W', 5, 'Kotagede', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17805, -7.818, 110.395, '2025-01-16 06:00:00', 92, 25, 4, 'W', 4, 'Kotagede', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17806, -7.818, 110.395, '2025-01-17 06:00:00', 66, 29, 4, 'NW', 2, 'Kotagede', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17807, -7.805, 110.363, '2025-01-08 06:00:00', 70, 30, 60, 'SW', 15, 'Kraton', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17808, -7.805, 110.363, '2025-01-09 06:00:00', 84, 30, 3, 'SW', 6, 'Kraton', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17809, -7.805, 110.363, '2025-01-10 06:00:00', 64, 29, 60, 'SW', 2, 'Kraton', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17810, -7.805, 110.363, '2025-01-11 06:00:00', 65, 30, 4, 'SW', 15, 'Kraton', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17811, -7.805, 110.363, '2025-01-12 06:00:00', 88, 27, 60, 'SW', 3, 'Kraton', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17812, -7.805, 110.363, '2025-01-13 06:00:00', 89, 26, 5, 'W', 4, 'Kraton', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17813, -7.805, 110.363, '2025-01-14 06:00:00', 83, 27, 60, 'NW', 1, 'Kraton', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17814, -7.805, 110.363, '2025-01-15 06:00:00', 83, 27, 4, 'W', 5, 'Kraton', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17815, -7.805, 110.363, '2025-01-16 06:00:00', 90, 25, 4, 'W', 4, 'Kraton', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17816, -7.805, 110.363, '2025-01-17 06:00:00', 65, 29, 4, 'NW', 2, 'Kraton', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17817, -7.972, 110.319, '2025-01-08 06:00:00', 75, 29, 4, 'W', 14, 'Kretek', 'Kab. Bantul', 'DI Yogyakarta'),
(17818, -7.972, 110.319, '2025-01-09 06:00:00', 81, 30, 60, 'W', 17, 'Kretek', 'Kab. Bantul', 'DI Yogyakarta'),
(17819, -7.972, 110.319, '2025-01-10 06:00:00', 62, 29, 3, 'SW', 11, 'Kretek', 'Kab. Bantul', 'DI Yogyakarta'),
(17820, -7.972, 110.319, '2025-01-11 06:00:00', 74, 28, 4, 'SW', 11, 'Kretek', 'Kab. Bantul', 'DI Yogyakarta'),
(17821, -7.972, 110.319, '2025-01-12 06:00:00', 93, 25, 60, 'N', 3, 'Kretek', 'Kab. Bantul', 'DI Yogyakarta'),
(17822, -7.972, 110.319, '2025-01-13 06:00:00', 91, 25, 5, 'NW', 8, 'Kretek', 'Kab. Bantul', 'DI Yogyakarta'),
(17823, -7.972, 110.319, '2025-01-14 06:00:00', 83, 27, 60, 'N', 4, 'Kretek', 'Kab. Bantul', 'DI Yogyakarta'),
(17824, -7.972, 110.319, '2025-01-15 06:00:00', 83, 27, 4, 'NW', 11, 'Kretek', 'Kab. Bantul', 'DI Yogyakarta'),
(17825, -7.972, 110.319, '2025-01-16 06:00:00', 94, 24, 5, 'NW', 11, 'Kretek', 'Kab. Bantul', 'DI Yogyakarta'),
(17826, -7.972, 110.319, '2025-01-17 06:00:00', 73, 28, 4, 'N', 8, 'Kretek', 'Kab. Bantul', 'DI Yogyakarta'),
(17827, -7.932, 110.231, '2025-01-08 06:00:00', 75, 29, 4, 'SW', 17, 'Lendah', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17828, -7.932, 110.231, '2025-01-09 06:00:00', 78, 30, 3, 'SW', 13, 'Lendah', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17829, -7.932, 110.231, '2025-01-10 06:00:00', 63, 29, 1, 'SW', 6, 'Lendah', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17830, -7.932, 110.231, '2025-01-11 06:00:00', 73, 29, 4, 'SW', 14, 'Lendah', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17831, -7.932, 110.231, '2025-01-12 06:00:00', 92, 25, 60, 'N', 2, 'Lendah', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17832, -7.932, 110.231, '2025-01-13 06:00:00', 89, 26, 4, 'NW', 8, 'Lendah', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17833, -7.932, 110.231, '2025-01-14 06:00:00', 78, 28, 60, 'NE', 4, 'Lendah', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17834, -7.932, 110.231, '2025-01-15 06:00:00', 82, 27, 4, 'NW', 10, 'Lendah', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17835, -7.932, 110.231, '2025-01-16 06:00:00', 95, 25, 5, 'NW', 8, 'Lendah', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17836, -7.932, 110.231, '2025-01-17 06:00:00', 72, 28, 4, 'N', 6, 'Lendah', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17837, -7.781, 110.364, '2025-01-08 06:00:00', 70, 30, 60, 'SW', 15, 'Mantrijeron', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17838, -7.781, 110.364, '2025-01-09 06:00:00', 86, 30, 3, 'SW', 6, 'Mantrijeron', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17839, -7.781, 110.364, '2025-01-10 06:00:00', 65, 29, 3, 'SW', 2, 'Mantrijeron', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17840, -7.781, 110.364, '2025-01-11 06:00:00', 65, 30, 4, 'SW', 15, 'Mantrijeron', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17841, -7.781, 110.364, '2025-01-12 06:00:00', 86, 27, 60, 'SW', 3, 'Mantrijeron', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17842, -7.781, 110.364, '2025-01-13 06:00:00', 90, 26, 5, 'W', 4, 'Mantrijeron', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17843, -7.781, 110.364, '2025-01-14 06:00:00', 84, 27, 60, 'NW', 1, 'Mantrijeron', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17844, -7.781, 110.364, '2025-01-15 06:00:00', 83, 27, 4, 'W', 5, 'Mantrijeron', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17845, -7.781, 110.364, '2025-01-16 06:00:00', 91, 25, 4, 'W', 4, 'Mantrijeron', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17846, -7.781, 110.364, '2025-01-17 06:00:00', 64, 29, 4, 'NW', 2, 'Mantrijeron', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17847, -7.808, 110.378, '2025-01-08 06:00:00', 70, 30, 60, 'SW', 15, 'Mergangsan', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17848, -7.808, 110.378, '2025-01-09 06:00:00', 84, 30, 3, 'SW', 6, 'Mergangsan', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17849, -7.808, 110.378, '2025-01-10 06:00:00', 64, 29, 60, 'SW', 2, 'Mergangsan', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17850, -7.808, 110.378, '2025-01-11 06:00:00', 65, 30, 4, 'SW', 15, 'Mergangsan', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17851, -7.808, 110.378, '2025-01-12 06:00:00', 88, 27, 60, 'SW', 3, 'Mergangsan', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17852, -7.808, 110.378, '2025-01-13 06:00:00', 89, 26, 5, 'W', 4, 'Mergangsan', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17853, -7.808, 110.378, '2025-01-14 06:00:00', 83, 27, 60, 'NW', 1, 'Mergangsan', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17854, -7.808, 110.378, '2025-01-15 06:00:00', 83, 27, 4, 'W', 5, 'Mergangsan', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17855, -7.808, 110.378, '2025-01-16 06:00:00', 90, 25, 4, 'W', 4, 'Mergangsan', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17856, -7.808, 110.378, '2025-01-17 06:00:00', 65, 29, 4, 'NW', 2, 'Mergangsan', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17857, -7.726, 110.235, '2025-01-08 06:00:00', 67, 29, 60, 'W', 12, 'Minggir', 'Kab. Sleman', 'DI Yogyakarta'),
(17858, -7.726, 110.235, '2025-01-09 06:00:00', 93, 28, 3, 'SW', 4, 'Minggir', 'Kab. Sleman', 'DI Yogyakarta'),
(17859, -7.726, 110.235, '2025-01-10 06:00:00', 71, 27, 60, 'S', 5, 'Minggir', 'Kab. Sleman', 'DI Yogyakarta'),
(17860, -7.726, 110.235, '2025-01-11 06:00:00', 70, 28, 4, 'SW', 10, 'Minggir', 'Kab. Sleman', 'DI Yogyakarta'),
(17861, -7.726, 110.235, '2025-01-12 06:00:00', 85, 26, 4, 'NW', 5, 'Minggir', 'Kab. Sleman', 'DI Yogyakarta'),
(17862, -7.726, 110.235, '2025-01-13 06:00:00', 95, 24, 5, 'W', 2, 'Minggir', 'Kab. Sleman', 'DI Yogyakarta'),
(17863, -7.726, 110.235, '2025-01-14 06:00:00', 86, 26, 60, 'NW', 3, 'Minggir', 'Kab. Sleman', 'DI Yogyakarta'),
(17864, -7.726, 110.235, '2025-01-15 06:00:00', 88, 25, 60, 'NW', 3, 'Minggir', 'Kab. Sleman', 'DI Yogyakarta'),
(17865, -7.726, 110.235, '2025-01-16 06:00:00', 96, 24, 5, 'W', 3, 'Minggir', 'Kab. Sleman', 'DI Yogyakarta'),
(17866, -7.726, 110.235, '2025-01-17 06:00:00', 65, 29, 4, 'W', 5, 'Minggir', 'Kab. Sleman', 'DI Yogyakarta'),
(17867, -7.734, 110.329, '2025-01-08 06:00:00', 68, 30, 60, 'W', 10, 'Mlati', 'Kab. Sleman', 'DI Yogyakarta'),
(17868, -7.734, 110.329, '2025-01-09 06:00:00', 91, 28, 3, 'S', 0, 'Mlati', 'Kab. Sleman', 'DI Yogyakarta'),
(17869, -7.734, 110.329, '2025-01-10 06:00:00', 68, 27, 60, 'S', 3, 'Mlati', 'Kab. Sleman', 'DI Yogyakarta'),
(17870, -7.734, 110.329, '2025-01-11 06:00:00', 64, 29, 4, 'SW', 7, 'Mlati', 'Kab. Sleman', 'DI Yogyakarta'),
(17871, -7.734, 110.329, '2025-01-12 06:00:00', 83, 27, 60, 'N', 6, 'Mlati', 'Kab. Sleman', 'DI Yogyakarta'),
(17872, -7.734, 110.329, '2025-01-13 06:00:00', 91, 25, 5, 'N', 5, 'Mlati', 'Kab. Sleman', 'DI Yogyakarta'),
(17873, -7.734, 110.329, '2025-01-14 06:00:00', 84, 27, 60, 'N', 5, 'Mlati', 'Kab. Sleman', 'DI Yogyakarta'),
(17874, -7.734, 110.329, '2025-01-15 06:00:00', 84, 26, 60, 'N', 6, 'Mlati', 'Kab. Sleman', 'DI Yogyakarta'),
(17875, -7.734, 110.329, '2025-01-16 06:00:00', 92, 25, 5, 'N', 6, 'Mlati', 'Kab. Sleman', 'DI Yogyakarta'),
(17876, -7.734, 110.329, '2025-01-17 06:00:00', 64, 29, 4, 'N', 7, 'Mlati', 'Kab. Sleman', 'DI Yogyakarta'),
(17877, -7.773, 110.254, '2025-01-08 06:00:00', 66, 30, 60, 'SW', 16, 'Moyudan', 'Kab. Sleman', 'DI Yogyakarta'),
(17878, -7.773, 110.254, '2025-01-09 06:00:00', 88, 29, 3, 'S', 7, 'Moyudan', 'Kab. Sleman', 'DI Yogyakarta'),
(17879, -7.773, 110.254, '2025-01-10 06:00:00', 69, 29, 3, 'S', 3, 'Moyudan', 'Kab. Sleman', 'DI Yogyakarta'),
(17880, -7.773, 110.254, '2025-01-11 06:00:00', 67, 29, 4, 'SW', 15, 'Moyudan', 'Kab. Sleman', 'DI Yogyakarta'),
(17881, -7.773, 110.254, '2025-01-12 06:00:00', 87, 26, 60, 'SW', 0, 'Moyudan', 'Kab. Sleman', 'DI Yogyakarta'),
(17882, -7.773, 110.254, '2025-01-13 06:00:00', 93, 25, 5, 'W', 2, 'Moyudan', 'Kab. Sleman', 'DI Yogyakarta'),
(17883, -7.773, 110.254, '2025-01-14 06:00:00', 82, 27, 60, 'N', 2, 'Moyudan', 'Kab. Sleman', 'DI Yogyakarta'),
(17884, -7.773, 110.254, '2025-01-15 06:00:00', 85, 26, 4, 'N', 3, 'Moyudan', 'Kab. Sleman', 'DI Yogyakarta'),
(17885, -7.773, 110.254, '2025-01-16 06:00:00', 93, 24, 5, 'NE', 1, 'Moyudan', 'Kab. Sleman', 'DI Yogyakarta'),
(17886, -7.773, 110.254, '2025-01-17 06:00:00', 64, 29, 4, 'NE', 2, 'Moyudan', 'Kab. Sleman', 'DI Yogyakarta'),
(17887, -7.767, 110.211, '2025-01-08 06:00:00', 66, 29, 60, 'W', 17, 'Nanggulan', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17888, -7.767, 110.211, '2025-01-09 06:00:00', 89, 28, 60, 'SW', 9, 'Nanggulan', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17889, -7.767, 110.211, '2025-01-10 06:00:00', 71, 29, 60, 'S', 5, 'Nanggulan', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17890, -7.767, 110.211, '2025-01-11 06:00:00', 71, 28, 4, 'SW', 14, 'Nanggulan', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17891, -7.767, 110.211, '2025-01-12 06:00:00', 87, 25, 4, 'NW', 4, 'Nanggulan', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17892, -7.767, 110.211, '2025-01-13 06:00:00', 95, 24, 5, 'W', 5, 'Nanggulan', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17893, -7.767, 110.211, '2025-01-14 06:00:00', 82, 27, 4, 'NW', 1, 'Nanggulan', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17894, -7.767, 110.211, '2025-01-15 06:00:00', 87, 26, 4, 'NW', 6, 'Nanggulan', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17895, -7.767, 110.211, '2025-01-16 06:00:00', 97, 24, 5, 'NW', 4, 'Nanggulan', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17896, -7.767, 110.211, '2025-01-17 06:00:00', 66, 29, 4, 'W', 5, 'Nanggulan', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(17897, -7.724, 110.401, '2025-01-08 06:00:00', 73, 30, 60, 'SW', 13, 'Ngaglik', 'Kab. Sleman', 'DI Yogyakarta'),
(17898, -7.724, 110.401, '2025-01-09 06:00:00', 91, 30, 60, 'SW', 6, 'Ngaglik', 'Kab. Sleman', 'DI Yogyakarta'),
(17899, -7.724, 110.401, '2025-01-10 06:00:00', 66, 29, 60, 'S', 3, 'Ngaglik', 'Kab. Sleman', 'DI Yogyakarta'),
(17900, -7.724, 110.401, '2025-01-11 06:00:00', 67, 29, 4, 'SW', 11, 'Ngaglik', 'Kab. Sleman', 'DI Yogyakarta'),
(17901, -7.724, 110.401, '2025-01-12 06:00:00', 82, 27, 4, 'NW', 7, 'Ngaglik', 'Kab. Sleman', 'DI Yogyakarta'),
(17902, -7.724, 110.401, '2025-01-13 06:00:00', 91, 25, 5, 'NW', 9, 'Ngaglik', 'Kab. Sleman', 'DI Yogyakarta'),
(17903, -7.724, 110.401, '2025-01-14 06:00:00', 87, 26, 60, 'NW', 3, 'Ngaglik', 'Kab. Sleman', 'DI Yogyakarta'),
(17904, -7.724, 110.401, '2025-01-15 06:00:00', 83, 26, 4, 'NW', 10, 'Ngaglik', 'Kab. Sleman', 'DI Yogyakarta'),
(17905, -7.724, 110.401, '2025-01-16 06:00:00', 94, 25, 4, 'NW', 11, 'Ngaglik', 'Kab. Sleman', 'DI Yogyakarta'),
(17906, -7.724, 110.401, '2025-01-17 06:00:00', 64, 29, 4, 'NW', 14, 'Ngaglik', 'Kab. Sleman', 'DI Yogyakarta'),
(17907, -7.808, 110.356, '2025-01-08 06:00:00', 68, 30, 60, 'SW', 15, 'Ngampilan', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17908, -7.808, 110.356, '2025-01-09 06:00:00', 84, 30, 3, 'SW', 6, 'Ngampilan', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17909, -7.808, 110.356, '2025-01-10 06:00:00', 65, 29, 60, 'SW', 2, 'Ngampilan', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17910, -7.808, 110.356, '2025-01-11 06:00:00', 65, 30, 4, 'SW', 15, 'Ngampilan', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17911, -7.808, 110.356, '2025-01-12 06:00:00', 88, 27, 60, 'SW', 3, 'Ngampilan', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17912, -7.808, 110.356, '2025-01-13 06:00:00', 89, 26, 5, 'W', 4, 'Ngampilan', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17913, -7.808, 110.356, '2025-01-14 06:00:00', 83, 28, 60, 'NW', 1, 'Ngampilan', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17914, -7.808, 110.356, '2025-01-15 06:00:00', 82, 27, 4, 'W', 5, 'Ngampilan', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17915, -7.808, 110.356, '2025-01-16 06:00:00', 90, 25, 5, 'W', 4, 'Ngampilan', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17916, -7.808, 110.356, '2025-01-17 06:00:00', 65, 29, 4, 'NW', 2, 'Ngampilan', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17917, -7.838724, 110.701332, '2025-01-08 06:00:00', 71, 30, 60, 'W', 19, 'Ngawen', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17918, -7.838724, 110.701332, '2025-01-09 06:00:00', 78, 29, 3, 'SW', 6, 'Ngawen', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17919, -7.838724, 110.701332, '2025-01-10 06:00:00', 68, 30, 4, 'NW', 2, 'Ngawen', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17920, -7.838724, 110.701332, '2025-01-11 06:00:00', 67, 29, 4, 'SW', 14, 'Ngawen', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17921, -7.838724, 110.701332, '2025-01-12 06:00:00', 91, 24, 60, 'E', 2, 'Ngawen', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17922, -7.838724, 110.701332, '2025-01-13 06:00:00', 88, 25, 5, 'W', 6, 'Ngawen', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17923, -7.838724, 110.701332, '2025-01-14 06:00:00', 87, 26, 60, 'W', 1, 'Ngawen', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17924, -7.838724, 110.701332, '2025-01-15 06:00:00', 85, 26, 4, 'W', 13, 'Ngawen', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17925, -7.838724, 110.701332, '2025-01-16 06:00:00', 90, 25, 4, 'W', 11, 'Ngawen', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17926, -7.838724, 110.701332, '2025-01-17 06:00:00', 66, 29, 4, 'W', 5, 'Ngawen', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17927, -7.698, 110.445, '2025-01-08 06:00:00', 73, 29, 60, 'SW', 16, 'Ngemplak', 'Kab. Sleman', 'DI Yogyakarta'),
(17928, -7.698, 110.445, '2025-01-09 06:00:00', 92, 30, 60, 'SW', 10, 'Ngemplak', 'Kab. Sleman', 'DI Yogyakarta'),
(17929, -7.698, 110.445, '2025-01-10 06:00:00', 69, 29, 60, 'SE', 1, 'Ngemplak', 'Kab. Sleman', 'DI Yogyakarta'),
(17930, -7.698, 110.445, '2025-01-11 06:00:00', 69, 28, 4, 'SW', 11, 'Ngemplak', 'Kab. Sleman', 'DI Yogyakarta'),
(17931, -7.698, 110.445, '2025-01-12 06:00:00', 80, 26, 4, 'SW', 4, 'Ngemplak', 'Kab. Sleman', 'DI Yogyakarta'),
(17932, -7.698, 110.445, '2025-01-13 06:00:00', 91, 25, 5, 'W', 12, 'Ngemplak', 'Kab. Sleman', 'DI Yogyakarta');
INSERT INTO `forecast_weekly` (`id_forecast`, `lat`, `lon`, `waktu`, `kelembapan`, `suhu`, `cuaca`, `arah_angin`, `kecepatan_angin`, `nama_daerah`, `kabupaten_kota`, `provinsi`) VALUES
(17933, -7.698, 110.445, '2025-01-14 06:00:00', 88, 25, 60, 'NW', 1, 'Ngemplak', 'Kab. Sleman', 'DI Yogyakarta'),
(17934, -7.698, 110.445, '2025-01-15 06:00:00', 82, 26, 60, 'W', 16, 'Ngemplak', 'Kab. Sleman', 'DI Yogyakarta'),
(17935, -7.698, 110.445, '2025-01-16 06:00:00', 93, 25, 4, 'W', 13, 'Ngemplak', 'Kab. Sleman', 'DI Yogyakarta'),
(17936, -7.698, 110.445, '2025-01-17 06:00:00', 64, 29, 4, 'W', 14, 'Ngemplak', 'Kab. Sleman', 'DI Yogyakarta'),
(17937, -7.881, 110.62, '2025-01-08 06:00:00', 68, 29, 60, 'W', 20, 'Nglipar', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17938, -7.881, 110.62, '2025-01-09 06:00:00', 78, 30, 60, 'SW', 8, 'Nglipar', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17939, -7.881, 110.62, '2025-01-10 06:00:00', 66, 29, 4, 'W', 1, 'Nglipar', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17940, -7.881, 110.62, '2025-01-11 06:00:00', 66, 30, 4, 'SW', 16, 'Nglipar', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17941, -7.881, 110.62, '2025-01-12 06:00:00', 91, 25, 60, 'E', 1, 'Nglipar', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17942, -7.881, 110.62, '2025-01-13 06:00:00', 90, 25, 5, 'W', 7, 'Nglipar', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17943, -7.881, 110.62, '2025-01-14 06:00:00', 85, 26, 60, 'NW', 1, 'Nglipar', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17944, -7.881, 110.62, '2025-01-15 06:00:00', 83, 26, 4, 'W', 12, 'Nglipar', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17945, -7.881, 110.62, '2025-01-16 06:00:00', 93, 24, 5, 'W', 9, 'Nglipar', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17946, -7.881, 110.62, '2025-01-17 06:00:00', 68, 29, 4, 'W', 5, 'Nglipar', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17947, -7.884, 110.271, '2025-01-08 06:00:00', 70, 30, 60, 'SW', 19, 'Pajangan', 'Kab. Bantul', 'DI Yogyakarta'),
(17948, -7.884, 110.271, '2025-01-09 06:00:00', 80, 30, 3, 'SW', 12, 'Pajangan', 'Kab. Bantul', 'DI Yogyakarta'),
(17949, -7.884, 110.271, '2025-01-10 06:00:00', 63, 29, 60, 'SW', 7, 'Pajangan', 'Kab. Bantul', 'DI Yogyakarta'),
(17950, -7.884, 110.271, '2025-01-11 06:00:00', 69, 29, 4, 'SW', 16, 'Pajangan', 'Kab. Bantul', 'DI Yogyakarta'),
(17951, -7.884, 110.271, '2025-01-12 06:00:00', 90, 26, 60, 'SE', 0, 'Pajangan', 'Kab. Bantul', 'DI Yogyakarta'),
(17952, -7.884, 110.271, '2025-01-13 06:00:00', 89, 26, 4, 'NW', 1, 'Pajangan', 'Kab. Bantul', 'DI Yogyakarta'),
(17953, -7.884, 110.271, '2025-01-14 06:00:00', 79, 28, 60, 'NE', 2, 'Pajangan', 'Kab. Bantul', 'DI Yogyakarta'),
(17954, -7.884, 110.271, '2025-01-15 06:00:00', 82, 27, 4, 'N', 5, 'Pajangan', 'Kab. Bantul', 'DI Yogyakarta'),
(17955, -7.884, 110.271, '2025-01-16 06:00:00', 94, 25, 5, 'NE', 3, 'Pajangan', 'Kab. Bantul', 'DI Yogyakarta'),
(17956, -7.884, 110.271, '2025-01-17 06:00:00', 69, 29, 4, 'E', 3, 'Pajangan', 'Kab. Bantul', 'DI Yogyakarta'),
(17957, -7.701, 110.42, '2025-01-08 06:00:00', 73, 29, 3, 'SW', 13, 'Pakem', 'Kab. Sleman', 'DI Yogyakarta'),
(17958, -7.701, 110.42, '2025-01-09 06:00:00', 93, 29, 60, 'SW', 6, 'Pakem', 'Kab. Sleman', 'DI Yogyakarta'),
(17959, -7.701, 110.42, '2025-01-10 06:00:00', 68, 29, 60, 'S', 3, 'Pakem', 'Kab. Sleman', 'DI Yogyakarta'),
(17960, -7.701, 110.42, '2025-01-11 06:00:00', 69, 28, 4, 'SW', 11, 'Pakem', 'Kab. Sleman', 'DI Yogyakarta'),
(17961, -7.701, 110.42, '2025-01-12 06:00:00', 80, 26, 4, 'NW', 7, 'Pakem', 'Kab. Sleman', 'DI Yogyakarta'),
(17962, -7.701, 110.42, '2025-01-13 06:00:00', 91, 25, 5, 'NW', 9, 'Pakem', 'Kab. Sleman', 'DI Yogyakarta'),
(17963, -7.701, 110.42, '2025-01-14 06:00:00', 88, 25, 60, 'NW', 3, 'Pakem', 'Kab. Sleman', 'DI Yogyakarta'),
(17964, -7.701, 110.42, '2025-01-15 06:00:00', 82, 26, 60, 'NW', 10, 'Pakem', 'Kab. Sleman', 'DI Yogyakarta'),
(17965, -7.701, 110.42, '2025-01-16 06:00:00', 94, 25, 4, 'NW', 11, 'Pakem', 'Kab. Sleman', 'DI Yogyakarta'),
(17966, -7.701, 110.42, '2025-01-17 06:00:00', 64, 29, 4, 'NW', 14, 'Pakem', 'Kab. Sleman', 'DI Yogyakarta'),
(17967, -7.802, 110.38, '2025-01-08 06:00:00', 70, 30, 60, 'SW', 15, 'Pakualaman', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17968, -7.802, 110.38, '2025-01-09 06:00:00', 84, 30, 3, 'SW', 6, 'Pakualaman', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17969, -7.802, 110.38, '2025-01-10 06:00:00', 64, 29, 60, 'SW', 2, 'Pakualaman', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17970, -7.802, 110.38, '2025-01-11 06:00:00', 65, 30, 4, 'SW', 15, 'Pakualaman', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17971, -7.802, 110.38, '2025-01-12 06:00:00', 88, 27, 60, 'SW', 3, 'Pakualaman', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17972, -7.802, 110.38, '2025-01-13 06:00:00', 89, 26, 5, 'W', 4, 'Pakualaman', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17973, -7.802, 110.38, '2025-01-14 06:00:00', 83, 27, 60, 'NW', 1, 'Pakualaman', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17974, -7.802, 110.38, '2025-01-15 06:00:00', 83, 27, 4, 'W', 5, 'Pakualaman', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17975, -7.802, 110.38, '2025-01-16 06:00:00', 90, 25, 4, 'W', 4, 'Pakualaman', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17976, -7.802, 110.38, '2025-01-17 06:00:00', 65, 29, 4, 'NW', 2, 'Pakualaman', 'Kota Yogyakarta', 'DI Yogyakarta'),
(17977, -8.003, 110.509, '2025-01-08 06:00:00', 71, 28, 4, 'W', 19, 'Paliyan', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17978, -8.003, 110.509, '2025-01-09 06:00:00', 84, 30, 3, 'W', 14, 'Paliyan', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17979, -8.003, 110.509, '2025-01-10 06:00:00', 66, 29, 4, 'SW', 10, 'Paliyan', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17980, -8.003, 110.509, '2025-01-11 06:00:00', 69, 29, 4, 'SW', 16, 'Paliyan', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17981, -8.003, 110.509, '2025-01-12 06:00:00', 95, 24, 60, 'NW', 4, 'Paliyan', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17982, -8.003, 110.509, '2025-01-13 06:00:00', 95, 24, 5, 'W', 9, 'Paliyan', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17983, -8.003, 110.509, '2025-01-14 06:00:00', 83, 27, 60, 'NW', 3, 'Paliyan', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17984, -8.003, 110.509, '2025-01-15 06:00:00', 85, 26, 4, 'W', 11, 'Paliyan', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17985, -8.003, 110.509, '2025-01-16 06:00:00', 98, 24, 5, 'NW', 10, 'Paliyan', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17986, -8.003, 110.509, '2025-01-17 06:00:00', 74, 28, 4, 'NW', 10, 'Paliyan', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17987, -7.91, 110.298, '2025-01-08 06:00:00', 71, 30, 60, 'SW', 19, 'Pandak', 'Kab. Bantul', 'DI Yogyakarta'),
(17988, -7.91, 110.298, '2025-01-09 06:00:00', 79, 30, 3, 'SW', 12, 'Pandak', 'Kab. Bantul', 'DI Yogyakarta'),
(17989, -7.91, 110.298, '2025-01-10 06:00:00', 60, 29, 60, 'SW', 7, 'Pandak', 'Kab. Bantul', 'DI Yogyakarta'),
(17990, -7.91, 110.298, '2025-01-11 06:00:00', 69, 29, 4, 'SW', 16, 'Pandak', 'Kab. Bantul', 'DI Yogyakarta'),
(17991, -7.91, 110.298, '2025-01-12 06:00:00', 91, 26, 60, 'SE', 0, 'Pandak', 'Kab. Bantul', 'DI Yogyakarta'),
(17992, -7.91, 110.298, '2025-01-13 06:00:00', 88, 26, 4, 'NW', 1, 'Pandak', 'Kab. Bantul', 'DI Yogyakarta'),
(17993, -7.91, 110.298, '2025-01-14 06:00:00', 80, 28, 60, 'NE', 2, 'Pandak', 'Kab. Bantul', 'DI Yogyakarta'),
(17994, -7.91, 110.298, '2025-01-15 06:00:00', 83, 27, 4, 'N', 5, 'Pandak', 'Kab. Bantul', 'DI Yogyakarta'),
(17995, -7.91, 110.298, '2025-01-16 06:00:00', 94, 25, 5, 'NE', 3, 'Pandak', 'Kab. Bantul', 'DI Yogyakarta'),
(17996, -7.91, 110.298, '2025-01-17 06:00:00', 70, 29, 4, 'E', 3, 'Pandak', 'Kab. Bantul', 'DI Yogyakarta'),
(17997, -8.016, 110.421, '2025-01-08 06:00:00', 74, 28, 4, 'W', 17, 'Panggang', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17998, -8.016, 110.421, '2025-01-09 06:00:00', 83, 30, 3, 'W', 16, 'Panggang', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(17999, -8.016, 110.421, '2025-01-10 06:00:00', 65, 29, 4, 'SW', 11, 'Panggang', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18000, -8.016, 110.421, '2025-01-11 06:00:00', 75, 28, 4, 'SW', 13, 'Panggang', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18001, -8.016, 110.421, '2025-01-12 06:00:00', 93, 25, 60, 'NW', 5, 'Panggang', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18002, -8.016, 110.421, '2025-01-13 06:00:00', 94, 24, 5, 'NW', 7, 'Panggang', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18003, -8.016, 110.421, '2025-01-14 06:00:00', 84, 27, 60, 'NW', 4, 'Panggang', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18004, -8.016, 110.421, '2025-01-15 06:00:00', 85, 26, 4, 'NW', 10, 'Panggang', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18005, -8.016, 110.421, '2025-01-16 06:00:00', 95, 24, 5, 'NW', 11, 'Panggang', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18006, -8.016, 110.421, '2025-01-17 06:00:00', 75, 28, 4, 'NW', 9, 'Panggang', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18007, -7.905, 110.17, '2025-01-08 06:00:00', 75, 29, 60, 'SW', 17, 'Panjatan', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(18008, -7.905, 110.17, '2025-01-09 06:00:00', 79, 30, 3, 'SW', 13, 'Panjatan', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(18009, -7.905, 110.17, '2025-01-10 06:00:00', 65, 29, 1, 'SW', 6, 'Panjatan', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(18010, -7.905, 110.17, '2025-01-11 06:00:00', 74, 28, 4, 'SW', 14, 'Panjatan', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(18011, -7.905, 110.17, '2025-01-12 06:00:00', 93, 25, 60, 'N', 2, 'Panjatan', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(18012, -7.905, 110.17, '2025-01-13 06:00:00', 89, 26, 4, 'NW', 8, 'Panjatan', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(18013, -7.905, 110.17, '2025-01-14 06:00:00', 78, 28, 60, 'NE', 4, 'Panjatan', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(18014, -7.905, 110.17, '2025-01-15 06:00:00', 82, 27, 4, 'NW', 10, 'Panjatan', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(18015, -7.905, 110.17, '2025-01-16 06:00:00', 96, 24, 5, 'NW', 8, 'Panjatan', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(18016, -7.905, 110.17, '2025-01-17 06:00:00', 72, 28, 4, 'N', 6, 'Panjatan', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(18017, -7.852, 110.488, '2025-01-08 06:00:00', 70, 29, 3, 'W', 19, 'Patuk', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18018, -7.852, 110.488, '2025-01-09 06:00:00', 82, 30, 3, 'W', 10, 'Patuk', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18019, -7.852, 110.488, '2025-01-10 06:00:00', 64, 29, 60, 'SW', 4, 'Patuk', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18020, -7.852, 110.488, '2025-01-11 06:00:00', 65, 29, 4, 'SW', 17, 'Patuk', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18021, -7.852, 110.488, '2025-01-12 06:00:00', 92, 25, 60, 'SW', 2, 'Patuk', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18022, -7.852, 110.488, '2025-01-13 06:00:00', 93, 25, 5, 'W', 8, 'Patuk', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18023, -7.852, 110.488, '2025-01-14 06:00:00', 86, 26, 60, 'W', 1, 'Patuk', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18024, -7.852, 110.488, '2025-01-15 06:00:00', 83, 26, 4, 'W', 10, 'Patuk', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18025, -7.852, 110.488, '2025-01-16 06:00:00', 96, 24, 5, 'W', 7, 'Patuk', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18026, -7.852, 110.488, '2025-01-17 06:00:00', 67, 29, 4, 'W', 5, 'Patuk', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18027, -7.842, 110.169, '2025-01-08 06:00:00', 72, 29, 60, 'SW', 17, 'Pengasih', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(18028, -7.842, 110.169, '2025-01-09 06:00:00', 83, 30, 3, 'SW', 13, 'Pengasih', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(18029, -7.842, 110.169, '2025-01-10 06:00:00', 68, 29, 60, 'SW', 6, 'Pengasih', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(18030, -7.842, 110.169, '2025-01-11 06:00:00', 72, 28, 4, 'SW', 14, 'Pengasih', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(18031, -7.842, 110.169, '2025-01-12 06:00:00', 91, 25, 60, 'N', 2, 'Pengasih', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(18032, -7.842, 110.169, '2025-01-13 06:00:00', 92, 25, 4, 'NW', 8, 'Pengasih', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(18033, -7.842, 110.169, '2025-01-14 06:00:00', 78, 28, 60, 'NE', 4, 'Pengasih', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(18034, -7.842, 110.169, '2025-01-15 06:00:00', 85, 26, 4, 'NW', 10, 'Pengasih', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(18035, -7.842, 110.169, '2025-01-16 06:00:00', 97, 24, 5, 'NW', 8, 'Pengasih', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(18036, -7.842, 110.169, '2025-01-17 06:00:00', 70, 29, 4, 'N', 6, 'Pengasih', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(18037, -7.839, 110.477, '2025-01-08 06:00:00', 70, 29, 3, 'W', 19, 'Piyungan', 'Kab. Bantul', 'DI Yogyakarta'),
(18038, -7.839, 110.477, '2025-01-09 06:00:00', 82, 30, 3, 'W', 10, 'Piyungan', 'Kab. Bantul', 'DI Yogyakarta'),
(18039, -7.839, 110.477, '2025-01-10 06:00:00', 64, 29, 60, 'SW', 4, 'Piyungan', 'Kab. Bantul', 'DI Yogyakarta'),
(18040, -7.839, 110.477, '2025-01-11 06:00:00', 65, 29, 4, 'SW', 17, 'Piyungan', 'Kab. Bantul', 'DI Yogyakarta'),
(18041, -7.839, 110.477, '2025-01-12 06:00:00', 92, 25, 60, 'SW', 2, 'Piyungan', 'Kab. Bantul', 'DI Yogyakarta'),
(18042, -7.839, 110.477, '2025-01-13 06:00:00', 92, 25, 5, 'W', 8, 'Piyungan', 'Kab. Bantul', 'DI Yogyakarta'),
(18043, -7.839, 110.477, '2025-01-14 06:00:00', 85, 26, 60, 'W', 1, 'Piyungan', 'Kab. Bantul', 'DI Yogyakarta'),
(18044, -7.839, 110.477, '2025-01-15 06:00:00', 84, 26, 4, 'W', 10, 'Piyungan', 'Kab. Bantul', 'DI Yogyakarta'),
(18045, -7.839, 110.477, '2025-01-16 06:00:00', 95, 24, 5, 'W', 7, 'Piyungan', 'Kab. Bantul', 'DI Yogyakarta'),
(18046, -7.839, 110.477, '2025-01-17 06:00:00', 67, 29, 4, 'W', 5, 'Piyungan', 'Kab. Bantul', 'DI Yogyakarta'),
(18047, -7.944, 110.55, '2025-01-08 06:00:00', 70, 29, 4, 'W', 20, 'Playen', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18048, -7.944, 110.55, '2025-01-09 06:00:00', 80, 30, 3, 'SW', 12, 'Playen', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18049, -7.944, 110.55, '2025-01-10 06:00:00', 65, 29, 4, 'SW', 7, 'Playen', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18050, -7.944, 110.55, '2025-01-11 06:00:00', 67, 29, 4, 'SW', 17, 'Playen', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18051, -7.944, 110.55, '2025-01-12 06:00:00', 93, 25, 60, 'N', 1, 'Playen', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18052, -7.944, 110.55, '2025-01-13 06:00:00', 94, 24, 5, 'W', 8, 'Playen', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18053, -7.944, 110.55, '2025-01-14 06:00:00', 84, 27, 60, 'N', 1, 'Playen', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18054, -7.944, 110.55, '2025-01-15 06:00:00', 84, 26, 4, 'W', 12, 'Playen', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18055, -7.944, 110.55, '2025-01-16 06:00:00', 97, 24, 5, 'NW', 10, 'Playen', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18056, -7.944, 110.55, '2025-01-17 06:00:00', 71, 28, 4, 'NW', 7, 'Playen', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18057, -7.867, 110.408, '2025-01-08 06:00:00', 70, 29, 60, 'W', 18, 'Pleret', 'Kab. Bantul', 'DI Yogyakarta'),
(18058, -7.867, 110.408, '2025-01-09 06:00:00', 81, 30, 3, 'SW', 10, 'Pleret', 'Kab. Bantul', 'DI Yogyakarta'),
(18059, -7.867, 110.408, '2025-01-10 06:00:00', 62, 29, 60, 'SW', 6, 'Pleret', 'Kab. Bantul', 'DI Yogyakarta'),
(18060, -7.867, 110.408, '2025-01-11 06:00:00', 67, 29, 4, 'SW', 16, 'Pleret', 'Kab. Bantul', 'DI Yogyakarta'),
(18061, -7.867, 110.408, '2025-01-12 06:00:00', 93, 26, 60, 'SW', 1, 'Pleret', 'Kab. Bantul', 'DI Yogyakarta'),
(18062, -7.867, 110.408, '2025-01-13 06:00:00', 92, 25, 5, 'SW', 2, 'Pleret', 'Kab. Bantul', 'DI Yogyakarta'),
(18063, -7.867, 110.408, '2025-01-14 06:00:00', 85, 27, 60, 'SW', 0, 'Pleret', 'Kab. Bantul', 'DI Yogyakarta'),
(18064, -7.867, 110.408, '2025-01-15 06:00:00', 85, 27, 4, 'W', 4, 'Pleret', 'Kab. Bantul', 'DI Yogyakarta'),
(18065, -7.867, 110.408, '2025-01-16 06:00:00', 95, 24, 5, 'W', 1, 'Pleret', 'Kab. Bantul', 'DI Yogyakarta'),
(18066, -7.867, 110.408, '2025-01-17 06:00:00', 69, 29, 4, 'SW', 0, 'Pleret', 'Kab. Bantul', 'DI Yogyakarta'),
(18067, -7.98, 110.718, '2025-01-08 06:00:00', 69, 28, 60, 'W', 21, 'Ponjong', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18068, -7.98, 110.718, '2025-01-09 06:00:00', 82, 30, 60, 'SW', 10, 'Ponjong', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18069, -7.98, 110.718, '2025-01-10 06:00:00', 71, 29, 60, 'W', 6, 'Ponjong', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18070, -7.98, 110.718, '2025-01-11 06:00:00', 70, 29, 4, 'SW', 17, 'Ponjong', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18071, -7.98, 110.718, '2025-01-12 06:00:00', 94, 24, 60, 'N', 2, 'Ponjong', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18072, -7.98, 110.718, '2025-01-13 06:00:00', 91, 24, 5, 'W', 6, 'Ponjong', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18073, -7.98, 110.718, '2025-01-14 06:00:00', 86, 26, 60, 'NW', 1, 'Ponjong', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18074, -7.98, 110.718, '2025-01-15 06:00:00', 87, 26, 4, 'W', 12, 'Ponjong', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18075, -7.98, 110.718, '2025-01-16 06:00:00', 95, 24, 5, 'W', 11, 'Ponjong', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18076, -7.98, 110.718, '2025-01-17 06:00:00', 70, 28, 4, 'NW', 7, 'Ponjong', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18077, -7.756, 110.49, '2025-01-08 06:00:00', 71, 30, 3, 'SW', 17, 'Prambanan', 'Kab. Sleman', 'DI Yogyakarta'),
(18078, -7.756, 110.49, '2025-01-09 06:00:00', 88, 30, 4, 'SW', 9, 'Prambanan', 'Kab. Sleman', 'DI Yogyakarta'),
(18079, -7.756, 110.49, '2025-01-10 06:00:00', 68, 30, 4, 'N', 1, 'Prambanan', 'Kab. Sleman', 'DI Yogyakarta'),
(18080, -7.756, 110.49, '2025-01-11 06:00:00', 67, 29, 4, 'SW', 16, 'Prambanan', 'Kab. Sleman', 'DI Yogyakarta'),
(18081, -7.756, 110.49, '2025-01-12 06:00:00', 86, 26, 60, 'SW', 5, 'Prambanan', 'Kab. Sleman', 'DI Yogyakarta'),
(18082, -7.756, 110.49, '2025-01-13 06:00:00', 90, 25, 5, 'SW', 10, 'Prambanan', 'Kab. Sleman', 'DI Yogyakarta'),
(18083, -7.756, 110.49, '2025-01-14 06:00:00', 88, 25, 60, 'NW', 0, 'Prambanan', 'Kab. Sleman', 'DI Yogyakarta'),
(18084, -7.756, 110.49, '2025-01-15 06:00:00', 81, 26, 4, 'W', 13, 'Prambanan', 'Kab. Sleman', 'DI Yogyakarta'),
(18085, -7.756, 110.49, '2025-01-16 06:00:00', 92, 25, 4, 'W', 9, 'Prambanan', 'Kab. Sleman', 'DI Yogyakarta'),
(18086, -7.756, 110.49, '2025-01-17 06:00:00', 63, 29, 4, 'W', 8, 'Prambanan', 'Kab. Sleman', 'DI Yogyakarta'),
(18087, -7.956, 110.344, '2025-01-08 06:00:00', 73, 29, 4, 'W', 17, 'Pundong', 'Kab. Bantul', 'DI Yogyakarta'),
(18088, -7.956, 110.344, '2025-01-09 06:00:00', 81, 30, 60, 'W', 16, 'Pundong', 'Kab. Bantul', 'DI Yogyakarta'),
(18089, -7.956, 110.344, '2025-01-10 06:00:00', 62, 29, 3, 'SW', 11, 'Pundong', 'Kab. Bantul', 'DI Yogyakarta'),
(18090, -7.956, 110.344, '2025-01-11 06:00:00', 72, 29, 4, 'SW', 13, 'Pundong', 'Kab. Bantul', 'DI Yogyakarta'),
(18091, -7.956, 110.344, '2025-01-12 06:00:00', 93, 25, 60, 'NW', 5, 'Pundong', 'Kab. Bantul', 'DI Yogyakarta'),
(18092, -7.956, 110.344, '2025-01-13 06:00:00', 92, 25, 4, 'NW', 7, 'Pundong', 'Kab. Bantul', 'DI Yogyakarta'),
(18093, -7.956, 110.344, '2025-01-14 06:00:00', 83, 27, 60, 'NW', 4, 'Pundong', 'Kab. Bantul', 'DI Yogyakarta'),
(18094, -7.956, 110.344, '2025-01-15 06:00:00', 84, 27, 4, 'NW', 10, 'Pundong', 'Kab. Bantul', 'DI Yogyakarta'),
(18095, -7.956, 110.344, '2025-01-16 06:00:00', 95, 24, 5, 'NW', 11, 'Pundong', 'Kab. Bantul', 'DI Yogyakarta'),
(18096, -7.956, 110.344, '2025-01-17 06:00:00', 72, 28, 4, 'NW', 9, 'Pundong', 'Kab. Bantul', 'DI Yogyakarta'),
(18097, -8, 110.382, '2025-01-08 06:00:00', 74, 28, 4, 'W', 17, 'Purwosari', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18098, -8, 110.382, '2025-01-09 06:00:00', 83, 30, 3, 'W', 16, 'Purwosari', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18099, -8, 110.382, '2025-01-10 06:00:00', 64, 29, 4, 'SW', 11, 'Purwosari', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18100, -8, 110.382, '2025-01-11 06:00:00', 75, 28, 4, 'SW', 13, 'Purwosari', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18101, -8, 110.382, '2025-01-12 06:00:00', 93, 24, 60, 'NW', 5, 'Purwosari', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18102, -8, 110.382, '2025-01-13 06:00:00', 94, 25, 5, 'NW', 7, 'Purwosari', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18103, -8, 110.382, '2025-01-14 06:00:00', 84, 27, 60, 'NW', 4, 'Purwosari', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18104, -8, 110.382, '2025-01-15 06:00:00', 84, 27, 4, 'NW', 10, 'Purwosari', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18105, -8, 110.382, '2025-01-16 06:00:00', 96, 24, 5, 'NW', 11, 'Purwosari', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18106, -8, 110.382, '2025-01-17 06:00:00', 74, 28, 4, 'NW', 9, 'Purwosari', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18107, -8.083, 110.764, '2025-01-08 06:00:00', 74, 28, 4, 'W', 19, 'Rongkop', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18108, -8.083, 110.764, '2025-01-09 06:00:00', 85, 30, 60, 'SW', 10, 'Rongkop', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18109, -8.083, 110.764, '2025-01-10 06:00:00', 80, 29, 60, 'SW', 10, 'Rongkop', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18110, -8.083, 110.764, '2025-01-11 06:00:00', 70, 28, 4, 'SW', 14, 'Rongkop', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18111, -8.083, 110.764, '2025-01-12 06:00:00', 94, 23, 60, 'NW', 8, 'Rongkop', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18112, -8.083, 110.764, '2025-01-13 06:00:00', 92, 24, 5, 'NW', 6, 'Rongkop', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18113, -8.083, 110.764, '2025-01-14 06:00:00', 86, 26, 60, 'N', 5, 'Rongkop', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18114, -8.083, 110.764, '2025-01-15 06:00:00', 85, 26, 4, 'W', 14, 'Rongkop', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18115, -8.083, 110.764, '2025-01-16 06:00:00', 94, 24, 4, 'NW', 11, 'Rongkop', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18116, -8.083, 110.764, '2025-01-17 06:00:00', 73, 28, 4, 'NW', 13, 'Rongkop', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18117, -7.682412, 110.186005, '2025-01-08 06:00:00', 70, 29, 60, 'W', 12, 'Samigaluh', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(18118, -7.682412, 110.186005, '2025-01-09 06:00:00', 94, 28, 60, 'SW', 4, 'Samigaluh', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(18119, -7.682412, 110.186005, '2025-01-10 06:00:00', 70, 27, 60, 'S', 5, 'Samigaluh', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(18120, -7.682412, 110.186005, '2025-01-11 06:00:00', 71, 28, 4, 'SW', 10, 'Samigaluh', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(18121, -7.682412, 110.186005, '2025-01-12 06:00:00', 84, 25, 4, 'NW', 5, 'Samigaluh', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(18122, -7.682412, 110.186005, '2025-01-13 06:00:00', 97, 24, 5, 'W', 2, 'Samigaluh', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(18123, -7.682412, 110.186005, '2025-01-14 06:00:00', 85, 26, 4, 'NW', 3, 'Samigaluh', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(18124, -7.682412, 110.186005, '2025-01-15 06:00:00', 90, 25, 60, 'NW', 3, 'Samigaluh', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(18125, -7.682412, 110.186005, '2025-01-16 06:00:00', 96, 24, 5, 'W', 3, 'Samigaluh', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(18126, -7.682412, 110.186005, '2025-01-17 06:00:00', 69, 28, 4, 'W', 5, 'Samigaluh', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(18127, -7.968, 110.266, '2025-01-08 06:00:00', 76, 29, 4, 'W', 14, 'Sanden', 'Kab. Bantul', 'DI Yogyakarta'),
(18128, -7.968, 110.266, '2025-01-09 06:00:00', 80, 30, 3, 'W', 17, 'Sanden', 'Kab. Bantul', 'DI Yogyakarta'),
(18129, -7.968, 110.266, '2025-01-10 06:00:00', 62, 30, 3, 'SW', 11, 'Sanden', 'Kab. Bantul', 'DI Yogyakarta'),
(18130, -7.968, 110.266, '2025-01-11 06:00:00', 74, 28, 4, 'SW', 11, 'Sanden', 'Kab. Bantul', 'DI Yogyakarta'),
(18131, -7.968, 110.266, '2025-01-12 06:00:00', 92, 25, 60, 'N', 3, 'Sanden', 'Kab. Bantul', 'DI Yogyakarta'),
(18132, -7.968, 110.266, '2025-01-13 06:00:00', 90, 26, 4, 'NW', 8, 'Sanden', 'Kab. Bantul', 'DI Yogyakarta'),
(18133, -7.968, 110.266, '2025-01-14 06:00:00', 81, 27, 60, 'N', 4, 'Sanden', 'Kab. Bantul', 'DI Yogyakarta'),
(18134, -7.968, 110.266, '2025-01-15 06:00:00', 82, 27, 4, 'NW', 11, 'Sanden', 'Kab. Bantul', 'DI Yogyakarta'),
(18135, -7.968, 110.266, '2025-01-16 06:00:00', 93, 25, 5, 'NW', 11, 'Sanden', 'Kab. Bantul', 'DI Yogyakarta'),
(18136, -7.968, 110.266, '2025-01-17 06:00:00', 74, 28, 4, 'N', 8, 'Sanden', 'Kab. Bantul', 'DI Yogyakarta'),
(18137, -8.034754, 110.465469, '2025-01-08 06:00:00', 73, 28, 4, 'W', 19, 'Saptosari', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18138, -8.034754, 110.465469, '2025-01-09 06:00:00', 83, 30, 3, 'W', 14, 'Saptosari', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18139, -8.034754, 110.465469, '2025-01-10 06:00:00', 65, 29, 4, 'SW', 10, 'Saptosari', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18140, -8.034754, 110.465469, '2025-01-11 06:00:00', 72, 28, 4, 'SW', 16, 'Saptosari', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18141, -8.034754, 110.465469, '2025-01-12 06:00:00', 93, 24, 60, 'NW', 4, 'Saptosari', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18142, -8.034754, 110.465469, '2025-01-13 06:00:00', 94, 24, 5, 'W', 9, 'Saptosari', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18143, -8.034754, 110.465469, '2025-01-14 06:00:00', 84, 27, 60, 'NW', 3, 'Saptosari', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18144, -8.034754, 110.465469, '2025-01-15 06:00:00', 85, 26, 4, 'W', 11, 'Saptosari', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18145, -8.034754, 110.465469, '2025-01-16 06:00:00', 95, 24, 5, 'NW', 10, 'Saptosari', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18146, -8.034754, 110.465469, '2025-01-17 06:00:00', 75, 28, 4, 'NW', 10, 'Saptosari', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18147, -7.814, 110.258, '2025-01-08 06:00:00', 67, 30, 60, 'SW', 16, 'Sedayu', 'Kab. Bantul', 'DI Yogyakarta'),
(18148, -7.814, 110.258, '2025-01-09 06:00:00', 84, 30, 3, 'S', 7, 'Sedayu', 'Kab. Bantul', 'DI Yogyakarta'),
(18149, -7.814, 110.258, '2025-01-10 06:00:00', 67, 29, 3, 'S', 3, 'Sedayu', 'Kab. Bantul', 'DI Yogyakarta'),
(18150, -7.814, 110.258, '2025-01-11 06:00:00', 68, 29, 4, 'SW', 15, 'Sedayu', 'Kab. Bantul', 'DI Yogyakarta'),
(18151, -7.814, 110.258, '2025-01-12 06:00:00', 89, 26, 60, 'SW', 0, 'Sedayu', 'Kab. Bantul', 'DI Yogyakarta'),
(18152, -7.814, 110.258, '2025-01-13 06:00:00', 92, 25, 5, 'W', 2, 'Sedayu', 'Kab. Bantul', 'DI Yogyakarta'),
(18153, -7.814, 110.258, '2025-01-14 06:00:00', 80, 28, 60, 'N', 2, 'Sedayu', 'Kab. Bantul', 'DI Yogyakarta'),
(18154, -7.814, 110.258, '2025-01-15 06:00:00', 83, 27, 4, 'N', 3, 'Sedayu', 'Kab. Bantul', 'DI Yogyakarta'),
(18155, -7.814, 110.258, '2025-01-16 06:00:00', 94, 24, 5, 'NE', 1, 'Sedayu', 'Kab. Bantul', 'DI Yogyakarta'),
(18156, -7.814, 110.258, '2025-01-17 06:00:00', 66, 29, 4, 'NE', 2, 'Sedayu', 'Kab. Bantul', 'DI Yogyakarta'),
(18157, -8.003, 110.649, '2025-01-08 06:00:00', 70, 29, 4, 'W', 21, 'Semanu', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18158, -8.003, 110.649, '2025-01-09 06:00:00', 81, 30, 60, 'SW', 10, 'Semanu', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18159, -8.003, 110.649, '2025-01-10 06:00:00', 69, 29, 4, 'W', 6, 'Semanu', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18160, -8.003, 110.649, '2025-01-11 06:00:00', 69, 29, 4, 'SW', 17, 'Semanu', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18161, -8.003, 110.649, '2025-01-12 06:00:00', 95, 24, 60, 'N', 2, 'Semanu', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18162, -8.003, 110.649, '2025-01-13 06:00:00', 92, 24, 5, 'W', 6, 'Semanu', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18163, -8.003, 110.649, '2025-01-14 06:00:00', 85, 26, 60, 'NW', 1, 'Semanu', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18164, -8.003, 110.649, '2025-01-15 06:00:00', 85, 26, 4, 'W', 12, 'Semanu', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18165, -8.003, 110.649, '2025-01-16 06:00:00', 98, 24, 5, 'W', 11, 'Semanu', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18166, -8.003, 110.649, '2025-01-17 06:00:00', 72, 28, 4, 'NW', 7, 'Semanu', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18167, -7.886508, 110.741501, '2025-01-08 06:00:00', 71, 29, 60, 'W', 18, 'Semin', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18168, -7.886508, 110.741501, '2025-01-09 06:00:00', 80, 29, 4, 'SW', 5, 'Semin', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18169, -7.886508, 110.741501, '2025-01-10 06:00:00', 71, 29, 4, 'N', 4, 'Semin', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18170, -7.886508, 110.741501, '2025-01-11 06:00:00', 69, 29, 4, 'W', 14, 'Semin', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18171, -7.886508, 110.741501, '2025-01-12 06:00:00', 90, 24, 60, 'W', 1, 'Semin', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18172, -7.886508, 110.741501, '2025-01-13 06:00:00', 91, 25, 5, 'SW', 5, 'Semin', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18173, -7.886508, 110.741501, '2025-01-14 06:00:00', 88, 25, 60, 'SW', 1, 'Semin', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18174, -7.886508, 110.741501, '2025-01-15 06:00:00', 87, 26, 4, 'W', 12, 'Semin', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18175, -7.886508, 110.741501, '2025-01-16 06:00:00', 90, 25, 4, 'W', 9, 'Semin', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18176, -7.886508, 110.741501, '2025-01-17 06:00:00', 67, 29, 4, 'SW', 5, 'Semin', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18177, -7.848, 110.218, '2025-01-08 06:00:00', 70, 29, 60, 'SW', 17, 'Sentolo', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(18178, -7.848, 110.218, '2025-01-09 06:00:00', 83, 30, 3, 'SW', 13, 'Sentolo', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(18179, -7.848, 110.218, '2025-01-10 06:00:00', 67, 29, 60, 'SW', 6, 'Sentolo', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(18180, -7.848, 110.218, '2025-01-11 06:00:00', 70, 29, 4, 'SW', 14, 'Sentolo', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(18181, -7.848, 110.218, '2025-01-12 06:00:00', 90, 26, 60, 'N', 2, 'Sentolo', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(18182, -7.848, 110.218, '2025-01-13 06:00:00', 91, 25, 4, 'NW', 8, 'Sentolo', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(18183, -7.848, 110.218, '2025-01-14 06:00:00', 78, 28, 60, 'NE', 4, 'Sentolo', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(18184, -7.848, 110.218, '2025-01-15 06:00:00', 83, 27, 4, 'NW', 10, 'Sentolo', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(18185, -7.848, 110.218, '2025-01-16 06:00:00', 95, 24, 5, 'NW', 8, 'Sentolo', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(18186, -7.848, 110.218, '2025-01-17 06:00:00', 68, 29, 4, 'N', 6, 'Sentolo', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(18187, -7.849, 110.359, '2025-01-08 06:00:00', 69, 30, 60, 'W', 18, 'Sewon', 'Kab. Bantul', 'DI Yogyakarta'),
(18188, -7.849, 110.359, '2025-01-09 06:00:00', 82, 30, 3, 'SW', 10, 'Sewon', 'Kab. Bantul', 'DI Yogyakarta'),
(18189, -7.849, 110.359, '2025-01-10 06:00:00', 63, 29, 60, 'SW', 6, 'Sewon', 'Kab. Bantul', 'DI Yogyakarta'),
(18190, -7.849, 110.359, '2025-01-11 06:00:00', 66, 30, 4, 'SW', 16, 'Sewon', 'Kab. Bantul', 'DI Yogyakarta'),
(18191, -7.849, 110.359, '2025-01-12 06:00:00', 90, 26, 60, 'SW', 1, 'Sewon', 'Kab. Bantul', 'DI Yogyakarta'),
(18192, -7.849, 110.359, '2025-01-13 06:00:00', 90, 26, 4, 'SW', 2, 'Sewon', 'Kab. Bantul', 'DI Yogyakarta'),
(18193, -7.849, 110.359, '2025-01-14 06:00:00', 83, 28, 60, 'SW', 0, 'Sewon', 'Kab. Bantul', 'DI Yogyakarta'),
(18194, -7.849, 110.359, '2025-01-15 06:00:00', 83, 27, 4, 'W', 4, 'Sewon', 'Kab. Bantul', 'DI Yogyakarta'),
(18195, -7.849, 110.359, '2025-01-16 06:00:00', 93, 25, 5, 'W', 1, 'Sewon', 'Kab. Bantul', 'DI Yogyakarta'),
(18196, -7.849, 110.359, '2025-01-17 06:00:00', 67, 29, 4, 'SW', 0, 'Sewon', 'Kab. Bantul', 'DI Yogyakarta'),
(18197, -7.721, 110.308, '2025-01-08 06:00:00', 67, 30, 60, 'W', 10, 'Seyegan', 'Kab. Sleman', 'DI Yogyakarta'),
(18198, -7.721, 110.308, '2025-01-09 06:00:00', 92, 28, 3, 'S', 0, 'Seyegan', 'Kab. Sleman', 'DI Yogyakarta'),
(18199, -7.721, 110.308, '2025-01-10 06:00:00', 68, 27, 4, 'S', 3, 'Seyegan', 'Kab. Sleman', 'DI Yogyakarta'),
(18200, -7.721, 110.308, '2025-01-11 06:00:00', 63, 30, 4, 'SW', 7, 'Seyegan', 'Kab. Sleman', 'DI Yogyakarta'),
(18201, -7.721, 110.308, '2025-01-12 06:00:00', 83, 27, 60, 'N', 6, 'Seyegan', 'Kab. Sleman', 'DI Yogyakarta'),
(18202, -7.721, 110.308, '2025-01-13 06:00:00', 91, 25, 5, 'N', 5, 'Seyegan', 'Kab. Sleman', 'DI Yogyakarta'),
(18203, -7.721, 110.308, '2025-01-14 06:00:00', 83, 27, 60, 'N', 5, 'Seyegan', 'Kab. Sleman', 'DI Yogyakarta'),
(18204, -7.721, 110.308, '2025-01-15 06:00:00', 85, 26, 60, 'N', 6, 'Seyegan', 'Kab. Sleman', 'DI Yogyakarta'),
(18205, -7.721, 110.308, '2025-01-16 06:00:00', 91, 25, 5, 'N', 6, 'Seyegan', 'Kab. Sleman', 'DI Yogyakarta'),
(18206, -7.721, 110.308, '2025-01-17 06:00:00', 64, 29, 4, 'N', 7, 'Seyegan', 'Kab. Sleman', 'DI Yogyakarta'),
(18207, -7.939, 110.246, '2025-01-08 06:00:00', 76, 29, 4, 'W', 14, 'Srandakan', 'Kab. Bantul', 'DI Yogyakarta'),
(18208, -7.939, 110.246, '2025-01-09 06:00:00', 79, 30, 3, 'W', 17, 'Srandakan', 'Kab. Bantul', 'DI Yogyakarta'),
(18209, -7.939, 110.246, '2025-01-10 06:00:00', 62, 30, 3, 'SW', 11, 'Srandakan', 'Kab. Bantul', 'DI Yogyakarta'),
(18210, -7.939, 110.246, '2025-01-11 06:00:00', 74, 29, 4, 'SW', 11, 'Srandakan', 'Kab. Bantul', 'DI Yogyakarta'),
(18211, -7.939, 110.246, '2025-01-12 06:00:00', 92, 25, 60, 'N', 3, 'Srandakan', 'Kab. Bantul', 'DI Yogyakarta'),
(18212, -7.939, 110.246, '2025-01-13 06:00:00', 89, 26, 4, 'NW', 8, 'Srandakan', 'Kab. Bantul', 'DI Yogyakarta'),
(18213, -7.939, 110.246, '2025-01-14 06:00:00', 80, 28, 60, 'N', 4, 'Srandakan', 'Kab. Bantul', 'DI Yogyakarta'),
(18214, -7.939, 110.246, '2025-01-15 06:00:00', 82, 27, 4, 'NW', 11, 'Srandakan', 'Kab. Bantul', 'DI Yogyakarta'),
(18215, -7.939, 110.246, '2025-01-16 06:00:00', 94, 25, 5, 'NW', 11, 'Srandakan', 'Kab. Bantul', 'DI Yogyakarta'),
(18216, -7.939, 110.246, '2025-01-17 06:00:00', 72, 28, 4, 'N', 8, 'Srandakan', 'Kab. Bantul', 'DI Yogyakarta'),
(18217, -8.067, 110.589, '2025-01-08 06:00:00', 73, 28, 4, 'W', 16, 'Tanjungsari', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18218, -8.067, 110.589, '2025-01-09 06:00:00', 82, 30, 3, 'W', 15, 'Tanjungsari', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18219, -8.067, 110.589, '2025-01-10 06:00:00', 67, 30, 4, 'SW', 11, 'Tanjungsari', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18220, -8.067, 110.589, '2025-01-11 06:00:00', 70, 29, 4, 'SW', 16, 'Tanjungsari', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18221, -8.067, 110.589, '2025-01-12 06:00:00', 94, 24, 60, 'NW', 6, 'Tanjungsari', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18222, -8.067, 110.589, '2025-01-13 06:00:00', 94, 24, 5, 'NW', 9, 'Tanjungsari', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18223, -8.067, 110.589, '2025-01-14 06:00:00', 84, 27, 60, 'NW', 5, 'Tanjungsari', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18224, -8.067, 110.589, '2025-01-15 06:00:00', 84, 27, 4, 'NW', 13, 'Tanjungsari', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18225, -8.067, 110.589, '2025-01-16 06:00:00', 96, 24, 5, 'NW', 15, 'Tanjungsari', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18226, -8.067, 110.589, '2025-01-17 06:00:00', 74, 28, 4, 'NW', 12, 'Tanjungsari', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18227, -7.783, 110.356, '2025-01-08 06:00:00', 69, 30, 60, 'SW', 15, 'Tegalrejo', 'Kota Yogyakarta', 'DI Yogyakarta'),
(18228, -7.783, 110.356, '2025-01-09 06:00:00', 86, 30, 3, 'SW', 6, 'Tegalrejo', 'Kota Yogyakarta', 'DI Yogyakarta'),
(18229, -7.783, 110.356, '2025-01-10 06:00:00', 66, 29, 3, 'SW', 2, 'Tegalrejo', 'Kota Yogyakarta', 'DI Yogyakarta'),
(18230, -7.783, 110.356, '2025-01-11 06:00:00', 65, 30, 4, 'SW', 15, 'Tegalrejo', 'Kota Yogyakarta', 'DI Yogyakarta'),
(18231, -7.783, 110.356, '2025-01-12 06:00:00', 86, 27, 60, 'SW', 3, 'Tegalrejo', 'Kota Yogyakarta', 'DI Yogyakarta'),
(18232, -7.783, 110.356, '2025-01-13 06:00:00', 90, 26, 5, 'W', 4, 'Tegalrejo', 'Kota Yogyakarta', 'DI Yogyakarta'),
(18233, -7.783, 110.356, '2025-01-14 06:00:00', 83, 27, 60, 'NW', 1, 'Tegalrejo', 'Kota Yogyakarta', 'DI Yogyakarta'),
(18234, -7.783, 110.356, '2025-01-15 06:00:00', 83, 27, 4, 'W', 5, 'Tegalrejo', 'Kota Yogyakarta', 'DI Yogyakarta'),
(18235, -7.783, 110.356, '2025-01-16 06:00:00', 91, 25, 5, 'W', 4, 'Tegalrejo', 'Kota Yogyakarta', 'DI Yogyakarta'),
(18236, -7.783, 110.356, '2025-01-17 06:00:00', 64, 29, 4, 'NW', 2, 'Tegalrejo', 'Kota Yogyakarta', 'DI Yogyakarta'),
(18237, -7.887, 110.078, '2025-01-08 06:00:00', 77, 29, 1, 'SW', 13, 'Temon', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(18238, -7.887, 110.078, '2025-01-09 06:00:00', 82, 30, 3, 'SW', 14, 'Temon', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(18239, -7.887, 110.078, '2025-01-10 06:00:00', 68, 29, 1, 'SW', 7, 'Temon', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(18240, -7.887, 110.078, '2025-01-11 06:00:00', 76, 28, 4, 'SW', 10, 'Temon', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(18241, -7.887, 110.078, '2025-01-12 06:00:00', 92, 25, 60, 'NW', 5, 'Temon', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(18242, -7.887, 110.078, '2025-01-13 06:00:00', 91, 25, 4, 'NW', 9, 'Temon', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(18243, -7.887, 110.078, '2025-01-14 06:00:00', 82, 27, 60, 'NE', 4, 'Temon', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(18244, -7.887, 110.078, '2025-01-15 06:00:00', 86, 26, 4, 'NW', 14, 'Temon', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(18245, -7.887, 110.078, '2025-01-16 06:00:00', 94, 24, 5, 'NW', 13, 'Temon', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(18246, -7.887, 110.078, '2025-01-17 06:00:00', 74, 28, 4, 'NW', 16, 'Temon', 'Kab. Kulon Progo', 'DI Yogyakarta'),
(18247, -7.652, 110.327, '2025-01-08 06:00:00', 74, 28, 60, 'W', 10, 'Tempel', 'Kab. Sleman', 'DI Yogyakarta'),
(18248, -7.652, 110.327, '2025-01-09 06:00:00', 91, 28, 3, 'S', 0, 'Tempel', 'Kab. Sleman', 'DI Yogyakarta'),
(18249, -7.652, 110.327, '2025-01-10 06:00:00', 67, 27, 4, 'S', 3, 'Tempel', 'Kab. Sleman', 'DI Yogyakarta'),
(18250, -7.652, 110.327, '2025-01-11 06:00:00', 67, 28, 4, 'SW', 7, 'Tempel', 'Kab. Sleman', 'DI Yogyakarta'),
(18251, -7.652, 110.327, '2025-01-12 06:00:00', 82, 26, 4, 'N', 6, 'Tempel', 'Kab. Sleman', 'DI Yogyakarta'),
(18252, -7.652, 110.327, '2025-01-13 06:00:00', 94, 24, 5, 'N', 5, 'Tempel', 'Kab. Sleman', 'DI Yogyakarta'),
(18253, -7.652, 110.327, '2025-01-14 06:00:00', 82, 26, 60, 'N', 5, 'Tempel', 'Kab. Sleman', 'DI Yogyakarta'),
(18254, -7.652, 110.327, '2025-01-15 06:00:00', 88, 25, 60, 'N', 6, 'Tempel', 'Kab. Sleman', 'DI Yogyakarta'),
(18255, -7.652, 110.327, '2025-01-16 06:00:00', 91, 24, 5, 'N', 6, 'Tempel', 'Kab. Sleman', 'DI Yogyakarta'),
(18256, -7.652, 110.327, '2025-01-17 06:00:00', 67, 28, 4, 'N', 7, 'Tempel', 'Kab. Sleman', 'DI Yogyakarta'),
(18257, -8.091, 110.628, '2025-01-08 06:00:00', 75, 28, 4, 'W', 16, 'Tepus', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18258, -8.091, 110.628, '2025-01-09 06:00:00', 85, 30, 3, 'W', 15, 'Tepus', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18259, -8.091, 110.628, '2025-01-10 06:00:00', 70, 29, 60, 'SW', 11, 'Tepus', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18260, -8.091, 110.628, '2025-01-11 06:00:00', 71, 28, 4, 'SW', 16, 'Tepus', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18261, -8.091, 110.628, '2025-01-12 06:00:00', 94, 24, 60, 'NW', 6, 'Tepus', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18262, -8.091, 110.628, '2025-01-13 06:00:00', 93, 24, 5, 'NW', 9, 'Tepus', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18263, -8.091, 110.628, '2025-01-14 06:00:00', 85, 26, 60, 'NW', 5, 'Tepus', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18264, -8.091, 110.628, '2025-01-15 06:00:00', 84, 26, 4, 'NW', 13, 'Tepus', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18265, -8.091, 110.628, '2025-01-16 06:00:00', 96, 24, 5, 'NW', 15, 'Tepus', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18266, -8.091, 110.628, '2025-01-17 06:00:00', 75, 28, 4, 'NW', 12, 'Tepus', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18267, -7.652, 110.37, '2025-01-08 06:00:00', 76, 28, 60, 'SW', 13, 'Turi', 'Kab. Sleman', 'DI Yogyakarta'),
(18268, -7.652, 110.37, '2025-01-09 06:00:00', 93, 28, 60, 'SW', 6, 'Turi', 'Kab. Sleman', 'DI Yogyakarta'),
(18269, -7.652, 110.37, '2025-01-10 06:00:00', 67, 26, 60, 'S', 3, 'Turi', 'Kab. Sleman', 'DI Yogyakarta'),
(18270, -7.652, 110.37, '2025-01-11 06:00:00', 70, 27, 4, 'SW', 11, 'Turi', 'Kab. Sleman', 'DI Yogyakarta'),
(18271, -7.652, 110.37, '2025-01-12 06:00:00', 81, 25, 60, 'NW', 7, 'Turi', 'Kab. Sleman', 'DI Yogyakarta'),
(18272, -7.652, 110.37, '2025-01-13 06:00:00', 93, 23, 5, 'NW', 9, 'Turi', 'Kab. Sleman', 'DI Yogyakarta'),
(18273, -7.652, 110.37, '2025-01-14 06:00:00', 85, 25, 60, 'NW', 3, 'Turi', 'Kab. Sleman', 'DI Yogyakarta'),
(18274, -7.652, 110.37, '2025-01-15 06:00:00', 87, 24, 60, 'NW', 10, 'Turi', 'Kab. Sleman', 'DI Yogyakarta'),
(18275, -7.652, 110.37, '2025-01-16 06:00:00', 92, 23, 5, 'NW', 11, 'Turi', 'Kab. Sleman', 'DI Yogyakarta'),
(18276, -7.652, 110.37, '2025-01-17 06:00:00', 66, 28, 4, 'NW', 14, 'Turi', 'Kab. Sleman', 'DI Yogyakarta'),
(18277, -7.81, 110.371, '2025-01-08 06:00:00', 70, 30, 60, 'SW', 15, 'Umbulharjo', 'Kota Yogyakarta', 'DI Yogyakarta'),
(18278, -7.81, 110.371, '2025-01-09 06:00:00', 84, 30, 3, 'SW', 6, 'Umbulharjo', 'Kota Yogyakarta', 'DI Yogyakarta'),
(18279, -7.81, 110.371, '2025-01-10 06:00:00', 64, 29, 60, 'SW', 2, 'Umbulharjo', 'Kota Yogyakarta', 'DI Yogyakarta'),
(18280, -7.81, 110.371, '2025-01-11 06:00:00', 65, 30, 4, 'SW', 15, 'Umbulharjo', 'Kota Yogyakarta', 'DI Yogyakarta'),
(18281, -7.81, 110.371, '2025-01-12 06:00:00', 88, 27, 60, 'SW', 3, 'Umbulharjo', 'Kota Yogyakarta', 'DI Yogyakarta'),
(18282, -7.81, 110.371, '2025-01-13 06:00:00', 89, 26, 5, 'W', 4, 'Umbulharjo', 'Kota Yogyakarta', 'DI Yogyakarta'),
(18283, -7.81, 110.371, '2025-01-14 06:00:00', 83, 27, 60, 'NW', 1, 'Umbulharjo', 'Kota Yogyakarta', 'DI Yogyakarta'),
(18284, -7.81, 110.371, '2025-01-15 06:00:00', 83, 27, 4, 'W', 5, 'Umbulharjo', 'Kota Yogyakarta', 'DI Yogyakarta'),
(18285, -7.81, 110.371, '2025-01-16 06:00:00', 90, 25, 4, 'W', 4, 'Umbulharjo', 'Kota Yogyakarta', 'DI Yogyakarta'),
(18286, -7.81, 110.371, '2025-01-17 06:00:00', 65, 29, 4, 'NW', 2, 'Umbulharjo', 'Kota Yogyakarta', 'DI Yogyakarta'),
(18287, -7.81, 110.348, '2025-01-08 06:00:00', 68, 30, 60, 'SW', 15, 'Wirobrajan', 'Kota Yogyakarta', 'DI Yogyakarta'),
(18288, -7.81, 110.348, '2025-01-09 06:00:00', 84, 30, 3, 'SW', 6, 'Wirobrajan', 'Kota Yogyakarta', 'DI Yogyakarta'),
(18289, -7.81, 110.348, '2025-01-10 06:00:00', 65, 29, 60, 'SW', 2, 'Wirobrajan', 'Kota Yogyakarta', 'DI Yogyakarta'),
(18290, -7.81, 110.348, '2025-01-11 06:00:00', 65, 30, 4, 'SW', 15, 'Wirobrajan', 'Kota Yogyakarta', 'DI Yogyakarta'),
(18291, -7.81, 110.348, '2025-01-12 06:00:00', 88, 27, 60, 'SW', 3, 'Wirobrajan', 'Kota Yogyakarta', 'DI Yogyakarta'),
(18292, -7.81, 110.348, '2025-01-13 06:00:00', 89, 26, 5, 'W', 4, 'Wirobrajan', 'Kota Yogyakarta', 'DI Yogyakarta'),
(18293, -7.81, 110.348, '2025-01-14 06:00:00', 83, 28, 60, 'NW', 1, 'Wirobrajan', 'Kota Yogyakarta', 'DI Yogyakarta'),
(18294, -7.81, 110.348, '2025-01-15 06:00:00', 82, 27, 4, 'W', 5, 'Wirobrajan', 'Kota Yogyakarta', 'DI Yogyakarta'),
(18295, -7.81, 110.348, '2025-01-16 06:00:00', 90, 25, 5, 'W', 4, 'Wirobrajan', 'Kota Yogyakarta', 'DI Yogyakarta'),
(18296, -7.81, 110.348, '2025-01-17 06:00:00', 65, 29, 4, 'NW', 2, 'Wirobrajan', 'Kota Yogyakarta', 'DI Yogyakarta'),
(18297, -7.966, 110.6, '2025-01-08 06:00:00', 69, 29, 4, 'W', 20, 'Wonosari', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18298, -7.966, 110.6, '2025-01-09 06:00:00', 79, 30, 60, 'SW', 12, 'Wonosari', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18299, -7.966, 110.6, '2025-01-10 06:00:00', 66, 29, 4, 'SW', 7, 'Wonosari', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18300, -7.966, 110.6, '2025-01-11 06:00:00', 67, 29, 4, 'SW', 17, 'Wonosari', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18301, -7.966, 110.6, '2025-01-12 06:00:00', 93, 24, 60, 'N', 1, 'Wonosari', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18302, -7.966, 110.6, '2025-01-13 06:00:00', 94, 24, 5, 'W', 8, 'Wonosari', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18303, -7.966, 110.6, '2025-01-14 06:00:00', 84, 27, 60, 'N', 1, 'Wonosari', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18304, -7.966, 110.6, '2025-01-15 06:00:00', 84, 26, 4, 'W', 12, 'Wonosari', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18305, -7.966, 110.6, '2025-01-16 06:00:00', 97, 24, 5, 'NW', 10, 'Wonosari', 'Kab. Gunung Kidul', 'DI Yogyakarta'),
(18306, -7.966, 110.6, '2025-01-17 06:00:00', 71, 28, 4, 'NW', 7, 'Wonosari', 'Kab. Gunung Kidul', 'DI Yogyakarta');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `username` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

<<<<<<< HEAD:db/gis_system.sql
INSERT INTO `forum_akses` (`username`, `token`) VALUES
('aaaa', 'a30a3897069aadd7face425b0a22e73e63eb00e1b42a540a9d6b9fb8948d7f1c'),
('abel', 'c11ec089e1a85bcb8f0b43a11033c7b6fa85db72476f4640b022b3dfe5d05ccd'),
('aryo', '085d46936ccc6d5aef0d31b55520c17dde5455a4ff4a45eb9e6aa2f4f5b44a96'),
('Aryowiranata', 'e4cddc2f313955f7d43314b60443954dc36107a22a08a607da2f4e2d5c9a4ad9'),
('Aryowiranata1', '78d21e28e0535b133d3e2961b9b46a6d4e38e07037ee01d2ca1b08e93bbe30e1'),
('Bita', '3a65c09360e6e4f1dbc73c16ff0e6e08b516f42f4d64829467c6df47c1d376a3'),
('Cirara', 'b641b398c66fffe14e49e76badac634613131228c49071450eea01209bcad586'),
('David', 'a2b539ffc5fd1e58438198fc609d3dce3c9cbc12f2f86be892845820ee1f0a48'),
('dendy', '7e22227c068f164c06cee6a2b834271c60df269ecdcb45455cf6ae44c1183cd7'),
('dendy1', 'e5354553c339500736885b7aaa3ea4a0b85aa9f14fbc03f646bac8a71b8203e8'),
('dendyy', '8e8478f5104fde28ffaa6badbbeae1ac62e42c6b844e3c40fcf89b3449b9950e'),
('erwin', 'aedacf17ba64f34c0c7fcfed47c7baa065ab33bdb8709d02a5eca4a5f6bf4fc6'),
('iqbalalbatmi', 'd7c2bc62818115e4490fdc98077eb3df4fe8b150d465863387b424a877f4cda2'),
('kevin', 'c3034944f93f8a2ec41fefcfcb78d21e35561b82dabaf6a92b7590299530b845'),
=======
INSERT INTO `users` (`username`, `token`) VALUES
>>>>>>> bb2ab9f562cda5eca81b35d0512b810782d3581e:src/config/db/gis_system.sql
('test', '5e45e4e92b4edfaee04f3c4b02ddfbe7d54e81d4c057ee9714c2198d05fd324c'),
('test123', '59fc412e3da2e9bae59e5760c15cd401c2892a42ebd098287846aab357103c2d'),
('test1234', 'cdd478f3345f952d5338cb82566840c32911fc87c02ddf86dc28f8a94b98e468'),
('thomas', 'c75e7fab58521757f219cf9f3710a65f3d456a4e3f3e8a35c1f3c65f0d5d094c'),
('tom', '3b13d567fbf7d3ef59b812fa24a9bd01116b928517f536ca3180cf311eba64cb'),
('Tsabita', 'ab49c4090717e6ac5b3a8eeadffe8a4da2c24ef47ea635708ce1f9c71bbe2e5b'),
('udin', '872ee2fd2d577213895a2b4c4da15ae5f8e5409a607c00bc5eb2f3580596d150'),
('vera', 'd204135b9d469944c4306b4bada63d7e09ea8e99feef0cd78c98aa3fcf57f370'),
('yusuf', '841c8b1c14924180070717377bb063e1f228cbe133a65644b112b73fe75715ee');

-- --------------------------------------------------------

--
-- Table structure for table `forum_diskusi`
--

CREATE TABLE `forum_diskusi` (
  `id_diskusi` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `tgl_dibuat` datetime NOT NULL DEFAULT current_timestamp(),
  `gambar` varchar(255) DEFAULT NULL,
  `judul` varchar(255) NOT NULL,
  `isi` longtext NOT NULL,
  `jumlah_pembaca` int(11) NOT NULL DEFAULT 0,
  `id_kategori` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `forum_diskusi`
--

INSERT INTO `forum_diskusi` (`id_diskusi`, `username`, `tgl_dibuat`, `gambar`, `judul`, `isi`, `jumlah_pembaca`, `id_kategori`) VALUES
(7, 'erwin', '2024-11-25 20:38:47', NULL, 'ikan', '<p>cfcghvjvjh</p>', 16, 2),
(8, 'erwin', '2024-11-26 08:04:24', NULL, 'Ubi cilembu', '<p>Ubi</p>', 11, 1),
(9, 'thomas', '2024-11-26 08:06:27', NULL, 'Makanan', '<p>nkjsakjnwskqklwnkl</p>', 5, 1),
(10, 'David', '2024-11-26 08:18:01', NULL, 'tanaman untuk musim hujan', '<p>Tanaman apa?</p>', 17, 1),
(11, 'kevin', '2024-11-26 09:39:12', NULL, 'Tanaman yang cocok di musim hujan', '<p>Tanaman padi&nbsp;</p>', 31, 2),
(13, 'Aryowiranata', '2024-12-17 20:38:33', NULL, 'tanaman herbal', '<p>apa aja atanaman yang cocok untuk jadi herbal?</p>', 1, 4),
(14, 'Aryowiranata1', '2024-12-17 21:33:59', NULL, 'tanaman herbal', '<p>tanaman herbal apa aja sih??</p>', 1, 4),
(15, 'dendy', '2024-12-17 21:40:10', NULL, 'tanaman herbal ', '<p>tanaman obat ittu apa aja ya???</p>', 4, 4);

-- --------------------------------------------------------

--
-- Table structure for table `kategori`
--

CREATE TABLE `kategori` (
  `id_kategori` int(11) NOT NULL,
  `nama_kategori` varchar(255) NOT NULL,
  `gambar` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `kategori`
--

INSERT INTO `kategori` (`id_kategori`, `nama_kategori`, `gambar`) VALUES
(1, 'Pangan', 'images/kategori/pangan.png'),
(2, 'Perkebunan', 'images/kategori/perkebunan.jpg'),
(3, 'Tanaman Hias', 'images/kategori/tanaman-hias.jpg'),
(4, 'Tanaman Obat', 'images/kategori/tanaman-obat.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `predictions`
--

CREATE TABLE `predictions` (
  `id_predicted` double NOT NULL,
  `lat` double NOT NULL,
  `lon` double NOT NULL,
  `provinsi` varchar(255) NOT NULL,
  `rainfall` double NOT NULL,
  `sifat_hujan_rata` double NOT NULL,
  `temperature` double NOT NULL,
  `humidity` double NOT NULL,
  `predicted` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `predictions`
--

INSERT INTO `predictions` (`id_predicted`, `lat`, `lon`, `provinsi`, `rainfall`, `sifat_hujan_rata`, `temperature`, `humidity`, `predicted`) VALUES
(1, -8.15, 110.65, 'Daerah Istimewa Yogyakarta', 505.7902333333333, 126.11606666666668, 24.418803418803417, 91.54700854700856, 'pepaya'),
(2, -8.15, 110.7, 'Daerah Istimewa Yogyakarta', 470.8722333333333, 124.83923333333333, 24.418803418803417, 91.54700854700856, 'pepaya'),
(3, -8.15, 110.75, 'Daerah Istimewa Yogyakarta', 432.3306, 123.37846666666668, 24.418803418803417, 91.54700854700856, 'pepaya'),
(4, -8.1, 110.45, 'Daerah Istimewa Yogyakarta', 423.4125333333333, 118.5039, 24.418803418803417, 91.54700854700856, 'pepaya'),
(5, -8.1, 110.5, 'Daerah Istimewa Yogyakarta', 430.4212, 119.24476666666668, 24.418803418803417, 91.54700854700856, 'pepaya'),
(6, -8.1, 110.55, 'Daerah Istimewa Yogyakarta', 449.9531, 120.37243333333332, 24.418803418803417, 91.54700854700856, 'pepaya'),
(7, -8.1, 110.6, 'Daerah Istimewa Yogyakarta', 481.5729, 120.65683333333334, 24.418803418803417, 91.54700854700856, 'pepaya'),
(8, -8.1, 110.65, 'Daerah Istimewa Yogyakarta', 486.4374666666667, 120.33453333333334, 24.418803418803417, 91.54700854700856, 'pepaya'),
(9, -8.1, 110.7, 'Daerah Istimewa Yogyakarta', 445.2694, 119.11853333333332, 24.418803418803417, 91.54700854700856, 'pepaya'),
(10, -8.1, 110.75, 'Daerah Istimewa Yogyakarta', 403.4119666666666, 117.72826666666668, 24.418803418803417, 91.54700854700856, 'pepaya'),
(11, -8.05, 110.4, 'Daerah Istimewa Yogyakarta', 387.2301000000001, 113.51723333333332, 24.418803418803417, 91.54700854700856, 'pepaya'),
(12, -8.05, 110.45, 'Daerah Istimewa Yogyakarta', 409.4965, 114.2425, 24.418803418803417, 91.54700854700856, 'pepaya'),
(13, -8.05, 110.5, 'Daerah Istimewa Yogyakarta', 394.4708333333333, 114.75083333333332, 24.418803418803417, 91.54700854700856, 'pepaya'),
(14, -8.05, 110.55, 'Daerah Istimewa Yogyakarta', 390.839, 114.9022, 24.418803418803417, 91.54700854700856, 'pepaya'),
(15, -8.05, 110.6, 'Daerah Istimewa Yogyakarta', 420.7284666666667, 115.19833333333332, 24.418803418803417, 91.54700854700856, 'pepaya'),
(16, -8.05, 110.65, 'Daerah Istimewa Yogyakarta', 415.7337333333333, 114.78993333333334, 24.418803418803417, 91.54700854700856, 'pepaya'),
(17, -8.05, 110.7, 'Daerah Istimewa Yogyakarta', 398.8674, 114.14776666666668, 24.418803418803417, 91.54700854700856, 'pepaya'),
(18, -8.05, 110.75, 'Daerah Istimewa Yogyakarta', 371.3022, 113.13973333333333, 24.418803418803417, 91.54700854700856, 'pepaya'),
(19, -8, 110.35, 'Daerah Istimewa Yogyakarta', 393.6088, 110.81763333333332, 24.418803418803417, 91.54700854700856, 'pepaya'),
(20, -8, 110.4, 'Daerah Istimewa Yogyakarta', 385.37916666666666, 110.31026666666668, 24.418803418803417, 91.54700854700856, 'pepaya'),
(21, -8, 110.45, 'Daerah Istimewa Yogyakarta', 386.18143333333336, 111.03256666666668, 24.418803418803417, 91.54700854700856, 'pepaya'),
(22, -8, 110.5, 'Daerah Istimewa Yogyakarta', 361.6535333333333, 111.288, 24.418803418803417, 91.54700854700856, 'pepaya'),
(23, -8, 110.55, 'Daerah Istimewa Yogyakarta', 353.4855, 111.19773333333336, 24.418803418803417, 91.54700854700856, 'pepaya'),
(24, -8, 110.6, 'Daerah Istimewa Yogyakarta', 355.19620000000003, 111.1361, 24.418803418803417, 91.54700854700856, 'pepaya'),
(25, -8, 110.65, 'Daerah Istimewa Yogyakarta', 350.8876666666667, 111.00936666666666, 24.418803418803417, 91.54700854700856, 'pepaya'),
(26, -8, 110.7, 'Daerah Istimewa Yogyakarta', 354.7662, 111.09499999999998, 24.418803418803417, 91.54700854700856, 'pepaya'),
(27, -8, 110.75, 'Daerah Istimewa Yogyakarta', 326.74410000000006, 110.32356666666668, 24.418803418803417, 91.54700854700856, 'pepaya'),
(28, -7.95, 110.45, 'Daerah Istimewa Yogyakarta', 387.5989666666667, 110.59006666666666, 24.418803418803417, 91.54700854700856, 'pepaya'),
(29, -7.95, 110.5, 'Daerah Istimewa Yogyakarta', 367.8949, 110.95386666666666, 24.418803418803417, 91.54700854700856, 'pepaya'),
(30, -7.95, 110.55, 'Daerah Istimewa Yogyakarta', 364.7687333333333, 111.08203333333334, 24.418803418803417, 91.54700854700856, 'pepaya'),
(31, -7.95, 110.6, 'Daerah Istimewa Yogyakarta', 358.97350000000006, 111.21686666666666, 24.418803418803417, 91.54700854700856, 'pepaya'),
(32, -7.95, 110.65, 'Daerah Istimewa Yogyakarta', 341.7989666666667, 110.8494, 24.418803418803417, 91.54700854700856, 'pepaya'),
(33, -7.95, 110.7, 'Daerah Istimewa Yogyakarta', 301.3663, 109.56673333333332, 24.418803418803417, 91.54700854700856, 'pepaya'),
(34, -7.95, 110.75, 'Daerah Istimewa Yogyakarta', 287.05553333333336, 109.20143333333333, 24.418803418803417, 91.54700854700856, 'pepaya'),
(35, -7.9, 110.5, 'Daerah Istimewa Yogyakarta', 389.2762333333333, 112.40796666666668, 24.418803418803417, 91.54700854700856, 'pepaya'),
(36, -7.9, 110.55, 'Daerah Istimewa Yogyakarta', 399.5261, 112.76763333333334, 24.418803418803417, 91.54700854700856, 'pepaya'),
(37, -7.9, 110.6, 'Daerah Istimewa Yogyakarta', 362.2857, 112.47176666666668, 24.418803418803417, 91.54700854700856, 'pepaya'),
(38, -7.9, 110.65, 'Daerah Istimewa Yogyakarta', 313.3932, 111.1349, 24.418803418803417, 91.54700854700856, 'pepaya'),
(39, -7.9, 110.7, 'Daerah Istimewa Yogyakarta', 267.7662666666667, 108.69906666666668, 24.418803418803417, 91.54700854700856, 'pepaya'),
(40, -7.9, 110.75, 'Daerah Istimewa Yogyakarta', 265.8661666666667, 108.34643333333332, 24.418803418803417, 91.54700854700856, 'pepaya'),
(41, -7.85, 110.5, 'Daerah Istimewa Yogyakarta', 388.96206666666666, 114.3178, 24.418803418803417, 91.54700854700856, 'pepaya'),
(42, -7.85, 110.55, 'Daerah Istimewa Yogyakarta', 367.1469, 114.79653333333331, 24.418803418803417, 91.54700854700856, 'pepaya'),
(43, -7.85, 110.6, 'Daerah Istimewa Yogyakarta', 342.2598666666667, 113.69293333333331, 24.418803418803417, 91.54700854700856, 'pepaya'),
(44, -7.85, 110.65, 'Daerah Istimewa Yogyakarta', 302.3824, 111.4704, 24.418803418803417, 91.54700854700856, 'pepaya'),
(45, -7.85, 110.7, 'Daerah Istimewa Yogyakarta', 269.00083333333333, 108.90500000000002, 24.418803418803417, 91.54700854700856, 'pepaya'),
(46, -7.85, 110.75, 'Daerah Istimewa Yogyakarta', 287.37166666666667, 109.55583333333334, 24.418803418803417, 91.54700854700856, 'pepaya'),
(47, -7.8, 110.55, 'Daerah Istimewa Yogyakarta', 349.1897333333333, 115.72356666666668, 24.418803418803417, 91.54700854700856, 'pepaya'),
(48, -7.8, 110.6, 'Daerah Istimewa Yogyakarta', 330.02320000000003, 114.29013333333332, 24.418803418803417, 91.54700854700856, 'pepaya'),
(49, -7.8, 110.65, 'Daerah Istimewa Yogyakarta', 314.0804, 112.77546666666667, 24.418803418803417, 91.54700854700856, 'pepaya'),
(50, -8, 110.25, 'Daerah Istimewa Yogyakarta', 475.6472333333333, 113.92286666666666, 25.103448275862068, 90.6293103448276, 'pepaya'),
(51, -8, 110.3, 'Daerah Istimewa Yogyakarta', 468.4510333333333, 112.76606666666667, 25.103448275862068, 90.6293103448276, 'pepaya'),
(52, -7.95, 110.25, 'Daerah Istimewa Yogyakarta', 490.6269333333333, 112.93346666666666, 25.103448275862068, 90.6293103448276, 'pepaya'),
(53, -7.95, 110.3, 'Daerah Istimewa Yogyakarta', 470.0970333333333, 111.75926666666668, 25.103448275862068, 90.6293103448276, 'pepaya'),
(54, -7.95, 110.35, 'Daerah Istimewa Yogyakarta', 400.1694333333333, 109.6789, 25.103448275862068, 90.6293103448276, 'pepaya'),
(55, -7.95, 110.4, 'Daerah Istimewa Yogyakarta', 368.75573333333335, 108.89796666666666, 25.103448275862068, 90.6293103448276, 'pepaya'),
(56, -7.9, 110.3, 'Daerah Istimewa Yogyakarta', 412.5820333333333, 111.47679999999998, 25.103448275862068, 90.6293103448276, 'pepaya'),
(57, -7.9, 110.35, 'Daerah Istimewa Yogyakarta', 385.7861333333333, 110.14673333333332, 25.103448275862068, 90.6293103448276, 'pepaya'),
(58, -7.9, 110.4, 'Daerah Istimewa Yogyakarta', 406.2742333333333, 111.30926666666666, 25.103448275862068, 90.6293103448276, 'pepaya'),
(59, -7.9, 110.45, 'Daerah Istimewa Yogyakarta', 406.4611, 112.0945, 25.103448275862068, 90.6293103448276, 'pepaya'),
(60, -7.85, 110.25, 'Daerah Istimewa Yogyakarta', 347.03086666666667, 111.2973, 25.103448275862068, 90.6293103448276, 'pepaya'),
(61, -7.85, 110.3, 'Daerah Istimewa Yogyakarta', 386.0975, 111.93326666666668, 25.103448275862068, 90.6293103448276, 'pepaya'),
(62, -7.85, 110.35, 'Daerah Istimewa Yogyakarta', 393.741, 112.33666666666666, 25.103448275862068, 90.6293103448276, 'pepaya'),
(63, -7.85, 110.4, 'Daerah Istimewa Yogyakarta', 403.46566666666666, 112.4284, 25.103448275862068, 90.6293103448276, 'pepaya'),
(64, -7.85, 110.45, 'Daerah Istimewa Yogyakarta', 400.5391666666666, 113.54756666666668, 25.103448275862068, 90.6293103448276, 'pepaya'),
(65, -7.8, 110.4, 'Daerah Istimewa Yogyakarta', 396.99933333333337, 113.31876666666666, 25.103448275862068, 90.6293103448276, 'pepaya'),
(66, -7.95, 110.15, 'Daerah Istimewa Yogyakarta', 353.3850333333333, 112.44183333333336, 24.94871794871795, 90.23076923076924, 'pepaya'),
(67, -7.95, 110.2, 'Daerah Istimewa Yogyakarta', 399.9724333333333, 112.51833333333332, 24.94871794871795, 90.23076923076924, 'pepaya'),
(68, -7.9, 110.05, 'Daerah Istimewa Yogyakarta', 371.8486, 112.86966666666666, 24.94871794871795, 90.23076923076924, 'pepaya'),
(69, -7.9, 110.1, 'Daerah Istimewa Yogyakarta', 362.2166333333333, 111.9896, 24.94871794871795, 90.23076923076924, 'pepaya'),
(70, -7.9, 110.15, 'Daerah Istimewa Yogyakarta', 345.48606666666666, 111.1787, 24.94871794871795, 90.23076923076924, 'pepaya'),
(71, -7.9, 110.2, 'Daerah Istimewa Yogyakarta', 380.3741, 111.89263333333334, 24.94871794871795, 90.23076923076924, 'pepaya'),
(72, -7.9, 110.25, 'Daerah Istimewa Yogyakarta', 409.3101, 112.3851, 24.94871794871795, 90.23076923076924, 'pepaya'),
(73, -7.85, 110.05, 'Daerah Istimewa Yogyakarta', 382.30896666666666, 111.5179, 24.94871794871795, 90.23076923076924, 'pepaya'),
(74, -7.85, 110.1, 'Daerah Istimewa Yogyakarta', 387.6412, 111.41193333333337, 24.94871794871795, 90.23076923076924, 'pepaya'),
(75, -7.85, 110.15, 'Daerah Istimewa Yogyakarta', 355.7754333333333, 110.91313333333332, 24.94871794871795, 90.23076923076924, 'pepaya'),
(76, -7.85, 110.2, 'Daerah Istimewa Yogyakarta', 322.1594, 111.0244, 24.94871794871795, 90.23076923076924, 'pepaya'),
(77, -7.8, 110.1, 'Daerah Istimewa Yogyakarta', 404.1448, 111.0274, 24.94871794871795, 90.23076923076924, 'pepaya'),
(78, -7.8, 110.15, 'Daerah Istimewa Yogyakarta', 355.0502, 110.32066666666668, 24.94871794871795, 90.23076923076924, 'pepaya'),
(79, -7.8, 110.2, 'Daerah Istimewa Yogyakarta', 313.6559666666667, 109.4726, 24.94871794871795, 90.23076923076924, 'pepaya'),
(80, -7.75, 110.15, 'Daerah Istimewa Yogyakarta', 376.4960333333333, 112.2435, 24.94871794871795, 90.23076923076924, 'pepaya'),
(81, -7.75, 110.2, 'Daerah Istimewa Yogyakarta', 334.8032, 111.7092, 24.94871794871795, 90.23076923076924, 'pepaya'),
(82, -7.7, 110.15, 'Daerah Istimewa Yogyakarta', 427.172, 115.09633333333332, 24.94871794871795, 90.23076923076924, 'pepaya'),
(83, -7.7, 110.2, 'Daerah Istimewa Yogyakarta', 411.5508, 115.7384, 24.94871794871795, 90.23076923076924, 'pepaya'),
(84, -7.7, 110.25, 'Daerah Istimewa Yogyakarta', 412.0985, 116.3899, 24.94871794871795, 90.23076923076924, 'pepaya'),
(85, -7.65, 110.15, 'Daerah Istimewa Yogyakarta', 487.0428666666666, 118.4979, 24.94871794871795, 90.23076923076924, 'pepaya'),
(86, -7.65, 110.25, 'Daerah Istimewa Yogyakarta', 440.73983333333337, 119.8304, 24.94871794871795, 90.23076923076924, 'pepaya'),
(87, -7.8, 110.35, 'Daerah Istimewa Yogyakarta', 385.1565333333333, 112.28786666666667, 25.15384615384616, 89.84615384615384, 'pepaya'),
(88, -7.8, 110.25, 'Daerah Istimewa Yogyakarta', 333.3326333333334, 110.76606666666667, 24.64957264957265, 88.95726495726495, 'pepaya'),
(89, -7.8, 110.3, 'Daerah Istimewa Yogyakarta', 346.2377333333334, 111.8719, 24.64957264957265, 88.95726495726495, 'pepaya'),
(90, -7.8, 110.45, 'Daerah Istimewa Yogyakarta', 383.69883333333337, 114.91523333333332, 24.64957264957265, 88.95726495726495, 'pepaya'),
(91, -7.8, 110.5, 'Daerah Istimewa Yogyakarta', 361.5283, 116.08223333333336, 24.64957264957265, 88.95726495726495, 'pepaya'),
(92, -7.75, 110.25, 'Daerah Istimewa Yogyakarta', 348.9137333333333, 113.34723333333334, 24.64957264957265, 88.95726495726495, 'pepaya'),
(93, -7.75, 110.3, 'Daerah Istimewa Yogyakarta', 391.8246, 114.32826666666666, 24.64957264957265, 88.95726495726495, 'pepaya'),
(94, -7.75, 110.35, 'Daerah Istimewa Yogyakarta', 415.4040333333333, 115.4138, 24.64957264957265, 88.95726495726495, 'pepaya'),
(95, -7.75, 110.4, 'Daerah Istimewa Yogyakarta', 435.6092333333333, 116.4689, 24.64957264957265, 88.95726495726495, 'pepaya'),
(96, -7.75, 110.45, 'Daerah Istimewa Yogyakarta', 402.527, 116.8162, 24.64957264957265, 88.95726495726495, 'pepaya'),
(97, -7.7, 110.3, 'Daerah Istimewa Yogyakarta', 435.56756666666666, 118.08683333333332, 24.64957264957265, 88.95726495726495, 'pepaya'),
(98, -7.7, 110.35, 'Daerah Istimewa Yogyakarta', 482.6584, 118.63893333333334, 24.64957264957265, 88.95726495726495, 'pepaya'),
(99, -7.7, 110.4, 'Daerah Istimewa Yogyakarta', 473.4943666666666, 118.62016666666666, 24.64957264957265, 88.95726495726495, 'pepaya'),
(100, -7.7, 110.45, 'Daerah Istimewa Yogyakarta', 437.5907333333333, 119.04383333333334, 24.64957264957265, 88.95726495726495, 'pepaya'),
(101, -7.65, 110.35, 'Daerah Istimewa Yogyakarta', 508.5409, 120.9197, 24.64957264957265, 88.95726495726495, 'pepaya'),
(102, -7.65, 110.4, 'Daerah Istimewa Yogyakarta', 503.96793333333335, 120.13496666666668, 24.64957264957265, 88.95726495726495, 'pepaya'),
(103, -7.65, 110.45, 'Daerah Istimewa Yogyakarta', 479.6045666666666, 118.8972, 24.64957264957265, 88.95726495726495, 'pepaya'),
(104, -7.6, 110.4, 'Daerah Istimewa Yogyakarta', 517.3793666666667, 120.03086666666664, 24.64957264957265, 88.95726495726495, 'pepaya'),
(105, -7.6, 110.45, 'Daerah Istimewa Yogyakarta', 502.87806666666665, 119.49533333333332, 24.64957264957265, 88.95726495726495, 'pepaya'),
(106, -7.55, 110.45, 'Daerah Istimewa Yogyakarta', 518.7620333333333, 119.4459, 24.64957264957265, 88.95726495726495, 'pepaya');

-- --------------------------------------------------------

--
-- Table structure for table `user_in_diskusi`
--

CREATE TABLE `user_in_diskusi` (
  `id_interact` int(11) NOT NULL,
  `id_diskusi` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `tanggal` datetime NOT NULL DEFAULT current_timestamp(),
  `isi` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_in_diskusi`
--

INSERT INTO `user_in_diskusi` (`id_interact`, `id_diskusi`, `username`, `tanggal`, `isi`) VALUES
(46, 8, 'thomas', '2024-11-26 08:05:27', 'Ubi apa yang enak di musim hijan pak'),
(48, 11, 'vera', '2024-11-28 13:35:07', 'selain tanaman padi, tanaman apa lagi  ya yang cocok untuk musim hujan?'),
(51, 14, 'Aryowiranata1', '2024-12-17 21:34:11', 'jahe'),
(52, 15, 'dendy', '2024-12-17 21:40:22', 'jahe'),
(53, 11, 'dendy1', '2024-12-17 22:21:29', 'mungkin jagung'),
(54, 11, 'aryo', '2024-12-18 09:00:39', 'ubi kayu'),
(55, 11, 'dendyy', '2024-12-18 09:42:49', 'ubi cilembu');

-- --------------------------------------------------------

--
-- Table structure for table `user_reply_diskusi`
--

CREATE TABLE `user_reply_diskusi` (
  `id_reply` int(11) NOT NULL,
  `id_interact` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `tanggal` datetime NOT NULL DEFAULT current_timestamp(),
  `isi` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `crop_recom_range`
--
ALTER TABLE `crop_recom_range`
  ADD PRIMARY KEY (`id_crop`);

--
-- Indexes for table `forecast_weekly`
--
ALTER TABLE `forecast_weekly`
  ADD PRIMARY KEY (`id_forecast`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `forum_diskusi`
--
ALTER TABLE `forum_diskusi`
  ADD PRIMARY KEY (`id_diskusi`),
  ADD KEY `id_kategori` (`id_kategori`),
  ADD KEY `username` (`username`);

--
-- Indexes for table `kategori`
--
ALTER TABLE `kategori`
  ADD PRIMARY KEY (`id_kategori`);

--
-- Indexes for table `predictions`
--
ALTER TABLE `predictions`
  ADD PRIMARY KEY (`id_predicted`);

--
-- Indexes for table `user_in_diskusi`
--
ALTER TABLE `user_in_diskusi`
  ADD PRIMARY KEY (`id_interact`),
  ADD KEY `id_diskusi` (`id_diskusi`),
  ADD KEY `username` (`username`);

--
-- Indexes for table `user_reply_diskusi`
--
ALTER TABLE `user_reply_diskusi`
  ADD PRIMARY KEY (`id_reply`),
  ADD KEY `id_interact` (`id_interact`),
  ADD KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `crop_recom_range`
--
ALTER TABLE `crop_recom_range`
  MODIFY `id_crop` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;

--
-- AUTO_INCREMENT for table `forecast_weekly`
--
ALTER TABLE `forecast_weekly`
  MODIFY `id_forecast` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18307;

--
-- AUTO_INCREMENT for table `forum_diskusi`
--
ALTER TABLE `forum_diskusi`
  MODIFY `id_diskusi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `kategori`
--
ALTER TABLE `kategori`
  MODIFY `id_kategori` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `predictions`
--
ALTER TABLE `predictions`
  MODIFY `id_predicted` double NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

--
-- AUTO_INCREMENT for table `user_in_diskusi`
--
ALTER TABLE `user_in_diskusi`
  MODIFY `id_interact` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `user_reply_diskusi`
--
ALTER TABLE `user_reply_diskusi`
  MODIFY `id_reply` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `forum_diskusi`
--
ALTER TABLE `forum_diskusi`
  ADD CONSTRAINT `kategori_ibfk_1` FOREIGN KEY (`id_kategori`) REFERENCES `kategori` (`id_kategori`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_in_diskusi`
--
ALTER TABLE `user_in_diskusi`
  ADD CONSTRAINT `diskusi_ibfk_1` FOREIGN KEY (`id_diskusi`) REFERENCES `forum_diskusi` (`id_diskusi`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_ibfk_2` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_reply_diskusi`
--
ALTER TABLE `user_reply_diskusi`
  ADD CONSTRAINT `interact_ibfk_1` FOREIGN KEY (`id_interact`) REFERENCES `user_in_diskusi` (`id_interact`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_ibfk_3` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
