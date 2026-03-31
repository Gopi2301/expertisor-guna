-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 27, 2026 at 02:03 PM
-- Server version: 10.11.15-MariaDB
-- PHP Version: 8.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `yppgpgkj_dev_cms`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_users`
--

CREATE TABLE `admin_users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `last_login` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin_users`
--

INSERT INTO `admin_users` (`id`, `username`, `password_hash`, `email`, `created_at`, `last_login`) VALUES
(1, 'admin', '$2y$10$g2Ef5ceKwKlf81SI1I9eAOCWzDQE1QfkyASDF4nn6Arcd5OwP2.7e', 'admin@expertisoracademy.in', '2025-12-12 12:24:39', '2026-01-27 08:15:34');

-- --------------------------------------------------------

--
-- Table structure for table `auth_tokens`
--

CREATE TABLE `auth_tokens` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `token_hash` varchar(255) NOT NULL,
  `expires_at` timestamp NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `auth_tokens`
--

INSERT INTO `auth_tokens` (`id`, `user_id`, `token_hash`, `expires_at`, `created_at`) VALUES
(2, 1, '45006445c4598225966c40225ccfd5ffc215cd30978665a7c9c18f3c9241901b', '2025-12-13 07:30:22', '2025-12-12 13:00:22'),
(3, 1, '8aaf03274d48a30060359fce384e6affce82e7abeb02876f5f2b2568052a3580', '2025-12-13 07:35:48', '2025-12-12 13:05:48'),
(4, 1, 'fb24777ea0da7d692eb6118e03b0d4169be76870fb79ff99b5e5faaca7ca92bc', '2025-12-13 10:24:21', '2025-12-12 15:54:21'),
(5, 1, '088dcb948fde1bcc81ca06403a529e506cdd00b79699e68f8db25cb1dffcef19', '2025-12-13 11:00:27', '2025-12-12 16:30:27'),
(6, 1, 'eb2b441e645ff862a4b28c0e28745c07eae93c369dc0aff213db5e71a4ebb3e8', '2025-12-13 13:01:29', '2025-12-12 18:31:29'),
(7, 1, 'eb23e0ee00aa311e3276dc981bb9775983a7a031728b18f0713583feab3a46cf', '2025-12-13 13:10:49', '2025-12-12 18:40:49'),
(8, 1, '4b3d2805dd3bc6408f5f55eb174a6885eee9227d5b8b635b74ba2547d981daaf', '2025-12-13 13:23:58', '2025-12-12 18:53:58'),
(9, 1, '02fe082397f3f47e51022cae7e4ece89644a431446ac8670d9f44cb851eec0db', '2025-12-13 14:12:40', '2025-12-12 19:42:40'),
(10, 1, 'e975f9b51db9bcfeb81b0243803a1b85e123f1fc23269173fe1fa560fbafe15f', '2025-12-13 14:12:51', '2025-12-12 19:42:51'),
(11, 1, '480912be3c4c83c016dd92a9761bfa8b2728e6dd8ab031a40264d50466d1c24b', '2025-12-14 01:00:13', '2025-12-13 06:30:13'),
(12, 1, 'ab5f5e26c932e2f1afd67c2d2e71dddb5daf49762fd27c63410159fa9bed8b3d', '2025-12-14 01:03:16', '2025-12-13 06:33:16'),
(13, 1, '15a2fab0979f9096b53f44a93e89c9eb3f387afeefc83660af25d8e3b56ac740', '2025-12-14 01:39:58', '2025-12-13 07:09:58'),
(14, 1, '9aade8ec17371e05d46217ca784adda76fb826ae74bdf1cefe944da797df3033', '2025-12-14 01:45:55', '2025-12-13 07:15:55'),
(15, 1, '8c96e6b7d60591f9f76c2bc3c046b7f77d12eb8c47d5a83fbaf224843d1a40f8', '2025-12-14 08:17:51', '2025-12-13 13:47:51'),
(16, 1, 'd4160f359ae5da319ca3abc25a7f0ca9b6890b9733a84e9b9ca81ace282996fb', '2025-12-15 02:12:46', '2025-12-14 07:42:46'),
(17, 1, '764a5f24a8bf35baa19054326283e9cbbcc66595309f7febed9b3e21d82329af', '2025-12-15 03:45:47', '2025-12-14 09:15:47'),
(18, 1, '1972337a9f15bdfea67d3061d484418a1c9741a314beeaddb49980844641b669', '2025-12-15 04:08:55', '2025-12-14 09:38:55'),
(19, 1, 'f52f7ad92f4e434730f32d2476a35a22384f3c3a7d7e4fcbecea2122c9cf4250', '2025-12-15 12:25:14', '2025-12-14 17:55:14'),
(20, 1, 'c813c528179c8d70b77455a85de7a83408c01f111e35bcd8af882f877fb79bde', '2025-12-15 12:28:36', '2025-12-14 17:58:36'),
(21, 1, '11a608d50eac36b30213d4971d273dac3110420f84781d9a2b3bbb25cd1a07dd', '2025-12-15 23:18:01', '2025-12-15 04:48:01'),
(22, 1, 'fa950fbc942e9734562898cac2b7166f62bc4b7a5cafac1e9560fea584a4cb2e', '2025-12-15 23:37:44', '2025-12-15 05:07:44'),
(23, 1, 'a157c33a0a9713558c37e6998606c4c1da6a06d64cce8aaa9f748e93e31629a1', '2025-12-15 23:40:43', '2025-12-15 05:10:43'),
(24, 1, 'fe89f69cc132091c07e77fce1c1da506a54bf763c75d65e8c0a679c9f99c0d03', '2025-12-15 23:46:32', '2025-12-15 05:16:32'),
(25, 1, 'd1016b5b46f03aee4bc799f7b6ad3cff342fd241d63c1a9feb73de0cc9c495a5', '2025-12-16 00:42:10', '2025-12-15 06:12:10'),
(27, 1, '626933ed46d3bc46dfe44451044fb075ed6273411c3b8e43887f8c0e885f564b', '2025-12-16 02:19:23', '2025-12-15 07:49:23'),
(28, 1, 'c805995f624a11dbbe5cc44d02797846ad252f2e1af592ed89b6186d2df5b095', '2025-12-16 06:34:05', '2025-12-15 12:04:05'),
(29, 1, '95b7751ed6460395d5fd120e3371109603a503aad56a2e871add9c9bbfb7cab7', '2025-12-16 08:02:05', '2025-12-15 13:32:05'),
(30, 1, '16a01e9e5f16327dd00fcf0e0061cb40700d85fbd1cc04b0291625f895bca2e1', '2025-12-16 08:34:55', '2025-12-15 14:04:55'),
(31, 1, '93b53cb8699e27df674bafea22e468adf94280da6860d2d6e3a50b8d4fba67e4', '2025-12-17 01:40:04', '2025-12-16 07:10:04'),
(33, 1, '0b78520ea5e677afb042511a17fe176e08ce4d7d6f0fe48aefeecf9c68340537', '2025-12-17 02:08:50', '2025-12-16 07:38:50'),
(34, 1, '8c9c28bbd245cfc5a4a678d01c5781cd4dca6d2b41500c6311d1955daba26419', '2025-12-17 02:32:19', '2025-12-16 08:02:19'),
(35, 1, '2fc9ce1b752a27b7833c98efd4e801b68758d88ec89750e0ac96731220f46e00', '2025-12-17 04:58:42', '2025-12-16 10:28:42'),
(36, 1, '7f3741c21abfb6cc6a748071ec1269bfb5b929ba1719536de2657b92398bfc24', '2025-12-17 05:48:09', '2025-12-16 11:18:09'),
(37, 1, 'e029c7ef01197cf5b4b5566631cd3260c84071e0359c4518371d3a0f612b4266', '2025-12-17 08:11:50', '2025-12-16 13:41:50'),
(38, 1, '0d8c818c2a75e0175c6a4f8dc9e5576e2a637c6d4cd2190610ed9944363c9b0b', '2025-12-17 13:12:50', '2025-12-16 18:42:50'),
(39, 1, 'ddf5e3e0a657a1c2f884959199506746702ae252941580e29e555390df567713', '2025-12-17 13:29:09', '2025-12-16 18:59:09'),
(40, 1, '78d93b572f1aed96a6d85499deb125b6a99ee2bdac9c26775581525781d9ac54', '2025-12-18 00:28:36', '2025-12-17 05:58:36'),
(41, 1, '77457ddc2808961b5176f4e4f4b2596225051cadffac4a19c9b601cfea3d5cb0', '2025-12-18 01:44:39', '2025-12-17 07:14:39'),
(42, 1, '02088f4dcbb31c940ae75df9f40711775334ac9badef3b344e6ad3a16bac72c0', '2025-12-18 02:01:11', '2025-12-17 07:31:11'),
(43, 1, '756014189442e8d11a98bbd9a404f9f3f7169fa333371300a43668fe09a9e213', '2025-12-19 00:43:25', '2025-12-18 06:13:25'),
(44, 1, '62bcf5b7490f505310995f1148d4995c6cbc640747a5ddea79b2d4a4cfd3be69', '2025-12-19 01:21:19', '2025-12-18 06:51:19'),
(45, 1, '04a70330ea8c53c88ddf67397c8439b6a2d77672e3719a361af328d68c30bced', '2025-12-20 06:45:03', '2025-12-19 12:15:03'),
(46, 1, '4222e589fb2f2c90ae8b5b5ecd59ff9da53989e996e2dcd5c20a549f3b5d74e5', '2025-12-20 06:47:07', '2025-12-19 12:17:07'),
(47, 1, 'ff8eb9856410c788a053c5899cb476a04e832c4bd1e8c2d15cd12a754bfe951f', '2025-12-20 22:41:03', '2025-12-20 04:11:03'),
(48, 1, '9bef4d6fdc3f165e5a56527eb9fbccf5f7e8265c580192feacdc0a806802696e', '2025-12-21 00:28:05', '2025-12-20 05:58:05'),
(49, 1, '0d4f1005d6dd13bbd7d3d57cb2b7427122c46dcd8d685aa18cacdd09c382f580', '2025-12-21 23:26:55', '2025-12-21 04:56:55'),
(50, 1, '620d4015a86c935407ee8ecc8e0c8c57185f8bacd125c4a08c5b18f5d9bf7370', '2025-12-21 23:36:32', '2025-12-21 05:06:32'),
(51, 1, '858a2b73e19e09925a30527ccbc8f626ba4876101cfe747dfee2c59c6e38aa03', '2025-12-22 21:52:02', '2025-12-22 03:22:02'),
(52, 1, '7fcad8cbae71bbbccfb6f81d44097948dfbe5984ae7686d857f372c1afabf77b', '2025-12-22 22:08:31', '2025-12-22 03:38:31'),
(53, 1, 'd7930e06c4aa232aaf2f90162f6a48df132869ffde14699b208a2f3f61d6456b', '2025-12-23 04:33:27', '2025-12-22 10:03:27'),
(54, 1, 'ea30931010e6872d1ee3da68ee50e611e8d9a503f8dd7bd92b234d6fd5495398', '2025-12-23 04:34:50', '2025-12-22 10:04:50'),
(55, 1, '1accfc71c031dde72439482494c3566d605209ca87f57e62fd5b15ddee285778', '2025-12-23 23:06:23', '2025-12-23 04:36:23'),
(56, 1, '29217a5bbfbc903122578226bae0fcf2a9863c5e9be96fb5ad14ed68008727a4', '2025-12-24 02:10:10', '2025-12-23 07:40:10'),
(57, 1, '78e97b3a9ca51f372dfba0a5257663c49a719b41bdfbe7003f87f5c8a4af0fdb', '2025-12-24 05:18:56', '2025-12-23 10:48:56'),
(58, 1, '88192d7546131a0e51c75aa4616cc23a049ec49a5deea873d8ecf49fdf944063', '2025-12-24 05:49:28', '2025-12-23 11:19:28'),
(59, 1, 'b2599d8aa160d0a3c43c1e9ef0955248ae0f323622f115f63fadd9d8f3c87c4b', '2025-12-25 01:47:38', '2025-12-24 07:17:38'),
(60, 1, 'dedf49ad764723edaae4e45280806edd88f66435ac153692c676af76f40749ed', '2025-12-25 02:40:50', '2025-12-24 08:10:50'),
(61, 1, '5e58250e17f2c63fc6a936bce9a07745ad555d0887cb5fed8b4a466a5bb7357f', '2025-12-31 11:53:18', '2025-12-30 17:23:18'),
(62, 1, '56b9ba4ead573ade8e2c1994ad8fe460ef37d7dce8bd65d55ed99c6ab7abd87a', '2026-01-06 01:25:24', '2026-01-05 06:55:24'),
(63, 1, '8dfcdf4f4794484b0665db705029b1ed2b66b272fed78563a8819906175c7b87', '2026-01-06 01:51:43', '2026-01-05 07:21:43'),
(64, 1, 'cbf0f590c4e1e77c8a90fcb1861854e02e86e61b6d4c6d7aa644002be6c872dc', '2026-01-06 09:08:51', '2026-01-05 14:38:51'),
(65, 1, 'b9b3233bb0d5353a6e295497e448d3af43f6cedf88e57b9283e00e3fef55d803', '2026-01-08 22:19:11', '2026-01-08 03:49:11'),
(66, 1, '782e4f67db9a55e38379e2c9b7adbe6b302e64d43c9c675794e1e22211f39603', '2026-01-14 06:27:55', '2026-01-13 11:57:55'),
(67, 1, 'ffed90c3939b81719e626ca4b7010e34bfda59ea5d1b761cb1d28ba640cfcf2c', '2026-01-15 04:42:34', '2026-01-14 10:12:34'),
(68, 1, '9525a02bf805211dc03ee9455185724d5570ec1e021aef7f7d8b1f218450e717', '2026-01-16 10:08:57', '2026-01-15 15:38:57'),
(69, 1, '036b8c552b5e16460933e417d8e554fa0da72e5633b2f7df17a1177cd088bd88', '2026-01-22 05:27:40', '2026-01-21 10:57:40'),
(70, 1, '4fbbff67ed7b97e111035ceaf075a8fb2d5675d69b32cb7b827045fdfe632a43', '2026-01-27 01:10:59', '2026-01-26 06:40:59'),
(71, 1, '188521a8a371c1a43401bf5980be657fc0fa6be762b3e22fbc394322c3c743e3', '2026-01-28 02:45:34', '2026-01-27 08:15:34');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `display_order` int(11) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `display_order`, `created_at`) VALUES
(1, 'Technology', 'technology', 1, '2025-12-12 12:24:39'),
(2, 'Business', 'business', 2, '2025-12-12 12:24:39'),
(3, 'Civil', 'civil', 3, '2025-12-12 12:24:39'),
(4, 'Mechanical', 'mechanical', 4, '2025-12-12 12:24:39'),
(5, 'Marketing', 'marketing', 5, '2025-12-12 12:24:39');

-- --------------------------------------------------------

--
-- Table structure for table `cms_templates`
--

CREATE TABLE `cms_templates` (
  `id` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `status` enum('draft','published') DEFAULT 'draft',
  `sections` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`sections`)),
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `published_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `status` enum('DRAFT','PUBLISHED') DEFAULT 'DRAFT',
  `category_id` int(11) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `mentor_name` varchar(100) DEFAULT '',
  `mentor_image` varchar(500) DEFAULT '',
  `rating` decimal(2,1) DEFAULT 4.9,
  `student_count` varchar(50) DEFAULT '0+',
  `language` varchar(50) DEFAULT 'Tamil',
  `duration` varchar(50) DEFAULT '0h',
  `thumbnail` varchar(500) DEFAULT '',
  `deal_name` varchar(255) NOT NULL DEFAULT '',
  `deal_course` varchar(255) NOT NULL DEFAULT '',
  `deal_course_id` varchar(255) NOT NULL DEFAULT '',
  `template_id` varchar(100) DEFAULT NULL,
  `hero_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`hero_data`)),
  `form_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`form_data`)),
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `published_at` timestamp NULL DEFAULT NULL,
  `subtitle` varchar(255) DEFAULT NULL,
  `module_count` int(11) DEFAULT NULL,
  `reviews_count` int(11) DEFAULT 0,
  `instructor` varchar(255) DEFAULT '',
  `description` text DEFAULT NULL,
  `level` varchar(50) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `slug`, `status`, `category_id`, `title`, `mentor_name`, `mentor_image`, `rating`, `student_count`, `language`, `duration`, `thumbnail`, `template_id`, `hero_data`, `form_data`, `created_at`, `updated_at`, `published_at`, `subtitle`, `module_count`, `reviews_count`, `instructor`, `description`, `level`) VALUES
(30, 'adman', 'DRAFT', 2, 'adman', '', '', 4.9, '0+', 'Hindi', '12h', '', 'simple-elite', '{\"headline\":{\"parts\":[{\"text\":\"Transform your\",\"highlight\":false},{\"text\":\"mindset, career,\",\"highlight\":true},{\"text\":\"and\",\"highlight\":false},{\"text\":\"business\",\"highlight\":true},{\"text\":\"in\",\"highlight\":false},{\"text\":\"90 days\",\"highlight\":true},{\"text\":\"with my personalized transformation framework.\",\"highlight\":false}]},\"guarantee\":\"If you don\'t get results, I\'ll work with you again for free until you get results.\",\"video\":{\"embedUrl\":\"\",\"thumbnail\":\"\"},\"buttons\":{\"primary\":{\"text\":\"Apply Now\",\"action\":\"openModal\"},\"secondary\":{\"text\":\"Download Brochure\",\"url\":\"\",\"enabled\":false}},\"features\":{\"title\":\"What You will get in this 90 days personalized transformation?\",\"items\":[{\"text\":\"1:1 Mentorship Calls with Raghulan Gowthamian\"},{\"text\":\"Monthly Group Mastermind Calls with the Elite Community\"},{\"text\":\"A Personalized Strategy Blueprint for Your Mindset, Career, and Business\"},{\"text\":\"Continuous Support for Real Transformation\"}]},\"cta\":{\"text\":\"Apply Now\",\"seatsRemaining\":5}}', '{\"title\":\"STRUGGLING TO FIGURE IT OUT ALONE?\",\"subtitle\":\"Get Expert 1:1 Guidance\",\"formAction\":\"\",\"submitButton\":\"Get Fast Help\"}', '2025-12-16 10:39:15', '2025-12-16 11:07:16', NULL, 'Modeling,Texture', 32, 80, 'AB', 'Modeling, Texture', 'advanced'),
(31, 'video-editing-tamil', 'PUBLISHED', 1, 'Video Editing', '', 'https://drive.google.com/file/d/180sbh6enVJHL0HaiPIlxSnNqynP1FxwF/view?usp=sharing', 4.9, '0+', 'Tamil', '40h 30M', '/assets/uploads/upload_6970b18638a59_1768993158.jpg', 'simple-elite', '{\"headline\":{\"parts\":[{\"text\":\"Edit Faster\",\"highlight\":false},{\"text\":\" |  Earn More\",\"highlight\":true}]},\"guarantee\":\"If you don\'t get results, I\'ll work with you again for free until you get results.\",\"video\":{\"embedUrl\":\"\",\"thumbnail\":\"\",\"youtubeUrl\":\"https:\\/\\/youtu.be\\/hYNlh8SdcbU?si=lLspZ8JsNYfbDZ_r\",\"youtubeId\":\"hYNlh8SdcbU\"},\"buttons\":{\"primary\":{\"text\":\"Apply Now\",\"action\":\"openModal\"},\"secondary\":{\"text\":\"Download Brochure\",\"url\":\"\",\"enabled\":false}},\"features\":{\"title\":\"What You will get in this 90 days personalized transformation?\",\"items\":[]},\"cta\":{\"text\":\"Apply Now\",\"seatsRemaining\":5}}', '{\"title\":\"STRUGGLING TO FIGURE IT OUT ALONE?\",\"subtitle\":\"Get Expert 1:1 Guidance\",\"formAction\":\"\",\"submitButton\":\"Get Fast Help\"}', '2025-12-16 10:53:03', '2026-01-21 10:59:23', '2026-01-21 10:59:23', '', 56, 847, 'Tharun Kumar', '', 'all-levels'),
(32, 'microsoft-project-training-tamil', 'PUBLISHED', 1, 'Microsoft Project Tamil', '', '/assets/uploads/upload_6941a2367a2e9_1765909046.png', 4.9, '0+', 'Tamil', '37 Modules', '/assets/uploads/upload_694c0a9dc8d11_1766591133.jpg', 'simple-elite', '{\"headline\":{\"parts\":[{\"text\":\"Rework, Missed Deadlines, and Firefighting are \",\"highlight\":false},{\"text\":\"Not Execution Problems\",\"highlight\":true}]},\"guarantee\":\"They are planning problems. Microsoft Project helps you structure schedules so projects don\\u2019t fall apart midway\\n\",\"video\":{\"embedUrl\":\"https:\\/\\/www.youtube.com\\/embed\\/7kY8G14972Q?si=JSIH_kSxVWdCiLKo\",\"thumbnail\":\"\",\"youtubeUrl\":\"https:\\/\\/youtu.be\\/7kY8G14972Q\",\"youtubeId\":\"7kY8G14972Q\",\"customThumbnail\":\"\"},\"buttons\":{\"primary\":{\"text\":\"Apply Now\",\"action\":\"openModal\"},\"secondary\":{\"text\":\"Download Brochure\",\"url\":\"\",\"enabled\":false}},\"features\":{\"title\":\"What You will get in this 90 days personalized transformation?\",\"items\":[{\"text\":\"1:1 Mentorship Calls with Raghulan Gowthamian\"},{\"text\":\"Monthly Group Mastermind Calls with the Elite Community\"},{\"text\":\"A Personalized Strategy Blueprint for Your Mindset, Career, and Business\"},{\"text\":\"Continuous Support for Real Transformation\"}]},\"cta\":{\"text\":\"Apply Now\",\"seatsRemaining\":5}}', '{\"title\":\"STRUGGLING TO FIGURE IT OUT ALONE?\",\"subtitle\":\"Get Expert 1:1 Guidance\",\"formAction\":\"\",\"submitButton\":\"Get Fast Help\"}', '2025-12-16 12:54:53', '2025-12-24 15:45:36', '2025-12-24 15:45:36', 'Planning, Scheduling, Resource Management, Reporting and more.', NULL, 234, 'Raghulan Gowthaman', 'Planning, Scheduling, Resource Management, Reporting and more.', 'all-levels'),
(33, 'microsoft-project-training-english', 'PUBLISHED', 1, 'Microsoft Project English ', '', '/assets/uploads/upload_6941a2ad8c374_1765909165.png', 4.9, '0+', 'English', '37 Modules', '/assets/uploads/upload_694c0a91a3e85_1766591121.jpg', 'simple-elite', '{\"headline\":{\"parts\":[{\"text\":\"Rework, Missed Deadlines, and Firefighting are \",\"highlight\":false},{\"text\":\"Not Execution Problems\",\"highlight\":true}]},\"guarantee\":\"They are planning problems. Microsoft Project helps you structure schedules so projects don\\u2019t fall apart midway.\",\"video\":{\"embedUrl\":\"\",\"thumbnail\":\"\",\"youtubeUrl\":\"https:\\/\\/youtu.be\\/tpHDTydP_WE\",\"youtubeId\":\"tpHDTydP_WE\"},\"buttons\":{\"primary\":{\"text\":\"Apply Now\",\"action\":\"openModal\"},\"secondary\":{\"text\":\"Download Brochure\",\"url\":\"\",\"enabled\":false}},\"features\":{\"title\":\"What You will get in this 90 days personalized transformation?\",\"items\":[{\"text\":\"1:1 Mentorship Calls with Raghulan Gowthamian\"},{\"text\":\"Monthly Group Mastermind Calls with the Elite Community\"},{\"text\":\"A Personalized Strategy Blueprint for Your Mindset, Career, and Business\"},{\"text\":\"Continuous Support for Real Transformation\"}]},\"cta\":{\"text\":\"Apply Now\",\"seatsRemaining\":5}}', '{\"title\":\"STRUGGLING TO FIGURE IT OUT ALONE?\",\"subtitle\":\"Get Expert 1:1 Guidance\",\"formAction\":\"\",\"submitButton\":\"Get Fast Help\"}', '2025-12-16 13:50:02', '2025-12-24 15:45:24', '2025-12-24 15:45:24', '', NULL, 0, 'Raghulan Gowthaman', 'Planning, Scheduling, Resource Management, Reporting and more.', 'all-levels'),
(34, 'thinkercad-tamil', 'PUBLISHED', 1, 'ThinkerCad Tamil', '', '/assets/uploads/upload_6941a46dc9041_1765909613.png', 4.9, '0+', 'Tamil', '12 Modules', '/assets/uploads/upload_694c0a8365967_1766591107.jpg', 'simple-elite', '{\"headline\":{\"parts\":[{\"text\":\"Help Your Child Become  \",\"highlight\":false},{\"text\":\"One of the Few\",\"highlight\":true},{\"text\":\" Who Build Real Skills Early\",\"highlight\":false}]},\"guarantee\":\"Turn Screen Time Into Real Skills That Build Logic, Creativity, and Confidence Using ThinkerCAD.\\n\",\"video\":{\"embedUrl\":\"\",\"thumbnail\":\"\",\"youtubeUrl\":\"https:\\/\\/youtu.be\\/ENz1Mo4WSW8\",\"youtubeId\":\"ENz1Mo4WSW8\"},\"buttons\":{\"primary\":{\"text\":\"Apply Now\",\"action\":\"openModal\"},\"secondary\":{\"text\":\"Download Brochure\",\"url\":\"\",\"enabled\":false}},\"features\":{\"title\":\"What You will get in this 90 days personalized transformation?\",\"items\":[{\"text\":\"1:1 Mentorship Calls with Raghulan Gowthamian\"},{\"text\":\"Monthly Group Mastermind Calls with the Elite Community\"},{\"text\":\"A Personalized Strategy Blueprint for Your Mindset, Career, and Business\"},{\"text\":\"Continuous Support for Real Transformation\"}]},\"cta\":{\"text\":\"Apply Now\",\"seatsRemaining\":5}}', '{\"title\":\"STRUGGLING TO FIGURE IT OUT ALONE?\",\"subtitle\":\"Get Expert 1:1 Guidance\",\"formAction\":\"\",\"submitButton\":\"Get Fast Help\"}', '2025-12-16 13:58:50', '2025-12-24 15:45:11', '2025-12-24 15:45:11', '', NULL, 7656, 'Raghulan Gowthaman', '3D Design,Creative Thinking,Modeling and more.', 'all-levels'),
(35, 'ai-agents-llmops-developer-program', 'PUBLISHED', 1, 'AI Agents & LLMOps Developer Program', '', '/assets/uploads/upload_6941a0286fc27_1765908520.png', 4.6, '0+', 'Tamil', '43 Modules', '/assets/uploads/upload_69690ac51eec2_1768491717.jpg', 'simple-elite', '{\"headline\":{\"parts\":[{\"text\":\"Prompting Is Not a Career.\",\"highlight\":false},{\"text\":\" Building AI Systems Is\",\"highlight\":true}]},\"guarantee\":\"Most developers use AI tools. Very few build AI systems that run in real production products.\",\"video\":{\"embedUrl\":\"\",\"thumbnail\":\"\",\"youtubeUrl\":\"https:\\/\\/youtu.be\\/9U7E64fvLf4\",\"youtubeId\":\"9U7E64fvLf4\"},\"buttons\":{\"primary\":{\"text\":\"Apply Now\",\"action\":\"openModal\"},\"secondary\":{\"text\":\"Download Brochure\",\"url\":\"\",\"enabled\":false}},\"features\":{\"title\":\"What You will get in this 90 days personalized transformation?\",\"items\":[]},\"cta\":{\"text\":\"Apply Now\",\"seatsRemaining\":5}}', '{\"title\":\"STRUGGLING TO FIGURE IT OUT ALONE?\",\"subtitle\":\"Get Expert 1:1 Guidance\",\"formAction\":\"\",\"submitButton\":\"Get Fast Help\"}', '2025-12-16 17:53:29', '2026-01-15 15:42:03', '2026-01-15 15:42:03', '', NULL, 7579, 'Moganesan M', 'AI Agent , LLMOps Pipelines,  Real World Systems and More.', 'all-levels'),
(37, 'thinkercad-english', 'DRAFT', 1, 'ThinkerCad English', '', '/assets/uploads/upload_6941a46dc9041_1765909613.png', 4.7, '0+', 'English', '12 Modules', '/assets/uploads/upload_696633ef1d488_1768305647.jpg', 'simple-elite', '{\"headline\":{\"parts\":[{\"text\":\"Help Your Child Become  \",\"highlight\":false},{\"text\":\"One of the Few\",\"highlight\":true},{\"text\":\" Who Build Real Skills Early\",\"highlight\":false}]},\"guarantee\":\"Turn Screen Time Into Real Skills That Build Logic, Creativity, and Confidence Using ThinkerCAD.\\n\",\"video\":{\"embedUrl\":\"\",\"thumbnail\":\"\",\"youtubeUrl\":\"https:\\/\\/youtu.be\\/_H8VhdMVwbQ\",\"youtubeId\":\"_H8VhdMVwbQ\"},\"buttons\":{\"primary\":{\"text\":\"Apply Now\",\"action\":\"openModal\"},\"secondary\":{\"text\":\"Download Brochure\",\"url\":\"\",\"enabled\":false}},\"features\":{\"title\":\"What You will get in this 90 days personalized transformation?\",\"items\":[{\"text\":\"1:1 Mentorship Calls with Raghulan Gowthamian\"},{\"text\":\"Monthly Group Mastermind Calls with the Elite Community\"},{\"text\":\"A Personalized Strategy Blueprint for Your Mindset, Career, and Business\"},{\"text\":\"Continuous Support for Real Transformation\"}]},\"cta\":{\"text\":\"Apply Now\",\"seatsRemaining\":5}}', '{\"title\":\"STRUGGLING TO FIGURE IT OUT ALONE?\",\"subtitle\":\"Get Expert 1:1 Guidance\",\"formAction\":\"\",\"submitButton\":\"Get Fast Help\"}', '2025-12-16 18:29:13', '2026-01-13 12:00:51', NULL, '', NULL, 134, 'Raghulan Gowthaman', '3D Design,Creative Thinking,Modeling and more.', 'beginner'),
(39, 'fffg', 'DRAFT', NULL, 'fffg', '', '', 4.9, '0+', 'Tamil', '0h', '', 'full-course', '{\"headline\":{\"parts\":[{\"text\":\"Transform your\",\"highlight\":false},{\"text\":\"mindset, career,\",\"highlight\":true},{\"text\":\"and\",\"highlight\":false},{\"text\":\"business\",\"highlight\":true},{\"text\":\"in\",\"highlight\":false},{\"text\":\"90 days\",\"highlight\":true},{\"text\":\"with my personalized transformation framework.\",\"highlight\":false}]},\"guarantee\":\"If you don\'t get results, I\'ll work with you again for free until you get results.\",\"video\":{\"embedUrl\":\"\",\"thumbnail\":\"\"},\"buttons\":{\"primary\":{\"text\":\"Apply Now\",\"action\":\"openModal\"},\"secondary\":{\"text\":\"Download Brochure\",\"url\":\"\",\"enabled\":false}},\"features\":{\"title\":\"What You will get in this 90 days personalized transformation?\",\"items\":[{\"text\":\"1:1 Mentorship Calls with Raghulan Gowthamian\"},{\"text\":\"Monthly Group Mastermind Calls with the Elite Community\"},{\"text\":\"A Personalized Strategy Blueprint for Your Mindset, Career, and Business\"},{\"text\":\"Continuous Support for Real Transformation\"}]},\"cta\":{\"text\":\"Apply Now\",\"seatsRemaining\":5}}', '{\"title\":\"STRUGGLING TO FIGURE IT OUT ALONE?\",\"subtitle\":\"Get Expert 1:1 Guidance\",\"formAction\":\"\",\"submitButton\":\"Get Fast Help\"}', '2026-01-05 13:55:00', '2026-01-05 13:58:46', NULL, '', NULL, 0, '', '', 'All levels'),
(40, 'focus-research-labs', 'PUBLISHED', 2, 'How to Start a Design & Build Firm | 100M+ Revenue System', '', '/assets/uploads/upload_69776861b32a2_1769433185.png', 4.9, '0+', 'Tamil', '30h', '/assets/uploads/upload_697765e9516c2_1769432553.png', 'simple-elite', '{\"headline\":{\"parts\":[{\"text\":\"Your \",\"highlight\":false},{\"text\":\"Design or Construction \",\"highlight\":true},{\"text\":\"Skills aren\\u2019t the Problem. The Way You\\u2019re Running the Firm Is.\",\"highlight\":false}]},\"guarantee\":\"If you don\'t get results, I\'ll work with you again for free until you get results.\",\"video\":{\"embedUrl\":\"\",\"thumbnail\":\"\",\"youtubeUrl\":\"https:\\/\\/youtu.be\\/0HCnf-g0mQ0\",\"youtubeId\":\"0HCnf-g0mQ0\"},\"buttons\":{\"primary\":{\"text\":\"Apply Now\",\"action\":\"openModal\"},\"secondary\":{\"text\":\"Download Brochure\",\"url\":\"\",\"enabled\":false}},\"features\":{\"title\":\"What You will get in this 90 days personalized transformation?\",\"items\":[{\"text\":\"1:1 Mentorship Calls with Raghulan Gowthamian\"},{\"text\":\"Monthly Group Mastermind Calls with the Elite Community\"},{\"text\":\"A Personalized Strategy Blueprint for Your Mindset, Career, and Business\"},{\"text\":\"Continuous Support for Real Transformation\"}]},\"cta\":{\"text\":\"Apply Now\",\"seatsRemaining\":5}}', '{\"title\":\"STRUGGLING TO FIGURE IT OUT ALONE?\",\"subtitle\":\"Get Expert 1:1 Guidance\",\"formAction\":\"\",\"submitButton\":\"Get Fast Help\"}', '2026-01-26 13:09:36', '2026-01-26 14:56:23', '2026-01-26 14:56:23', 'For Architects, Interior & Construction Professionals', NULL, 5630, '', '', 'All levels'),
(41, 'build-real-elearning-with-articulate-storyline-tamil', 'DRAFT', 1, 'Build Real eLearning With Articulate Storyline | Tamil ', '', '', 4.9, '0+', 'Tamil', '0h', '', 'simple-elite', '{\"headline\":{\"parts\":[{\"text\":\"Knowing \",\"highlight\":false},{\"text\":\"PowerPoint Isn\\u2019t Enough. \",\"highlight\":true},{\"text\":\"Real eLearning Needs Structure\",\"highlight\":false}]},\"guarantee\":\"Learn how to design interactive, job-ready eLearning using Articulate Storyline\\nwithout trial and error, broken logic, or boring slides\",\"video\":{\"embedUrl\":\"\",\"thumbnail\":\"\"},\"buttons\":{\"primary\":{\"text\":\"Apply Now\",\"action\":\"openModal\"},\"secondary\":{\"text\":\"Download Brochure\",\"url\":\"\",\"enabled\":false}},\"features\":{\"title\":\"What You will get in this 90 days personalized transformation?\",\"items\":[{\"text\":\"1:1 Mentorship Calls with Raghulan Gowthamian\"},{\"text\":\"Monthly Group Mastermind Calls with the Elite Community\"},{\"text\":\"A Personalized Strategy Blueprint for Your Mindset, Career, and Business\"},{\"text\":\"Continuous Support for Real Transformation\"}]},\"cta\":{\"text\":\"Apply Now\",\"seatsRemaining\":5}}', '{\"title\":\"STRUGGLING TO FIGURE IT OUT ALONE?\",\"subtitle\":\"Get Expert 1:1 Guidance\",\"formAction\":\"\",\"submitButton\":\"Get Fast Help\"}', '2026-01-26 15:16:15', '2026-01-26 15:16:15', NULL, 'Interactive modules, scenarios, quizzes, and SCORM-ready courses for real projects', NULL, 0, '', '', 'All levels'),
(42, 'design-real-3d-models-with-sketchup', 'PUBLISHED', 3, 'Design Real 3D Models With SketchUp', '', '', 4.9, '0+', 'Tamil', '0h', '/assets/uploads/upload_69778317b84c8_1769440023.jpg', 'simple-elite', '{\"headline\":{\"parts\":[{\"text\":\"\",\"highlight\":false}]},\"guarantee\":\"If you don\'t get results, I\'ll work with you again for free until you get results.\",\"video\":{\"embedUrl\":\"\",\"thumbnail\":\"\",\"youtubeUrl\":\"https:\\/\\/youtu.be\\/jlhNHftxZEc\",\"youtubeId\":\"jlhNHftxZEc\"},\"buttons\":{\"primary\":{\"text\":\"Apply Now\",\"action\":\"openModal\"},\"secondary\":{\"text\":\"Download Brochure\",\"url\":\"\",\"enabled\":false}},\"features\":{\"title\":\"What You will get in this 90 days personalized transformation?\",\"items\":[{\"text\":\"1:1 Mentorship Calls with Raghulan Gowthamian\"},{\"text\":\"Monthly Group Mastermind Calls with the Elite Community\"},{\"text\":\"A Personalized Strategy Blueprint for Your Mindset, Career, and Business\"},{\"text\":\"Continuous Support for Real Transformation\"}]},\"cta\":{\"text\":\"Apply Now\",\"seatsRemaining\":5}}', '{\"title\":\"STRUGGLING TO FIGURE IT OUT ALONE?\",\"subtitle\":\"Get Expert 1:1 Guidance\",\"formAction\":\"\",\"submitButton\":\"Get Fast Help\"}', '2026-01-26 15:30:02', '2026-01-26 15:44:10', '2026-01-26 15:44:10', 'Floor plans, interiors, exteriors, and client-ready 3D visuals', NULL, 0, '', '', 'All levels'),
(43, 'sketupp-english', 'DRAFT', NULL, 'sketupp-english', '', '', 4.9, '0+', 'Tamil', '0h', '', 'simple-elite', '{\"headline\":{\"parts\":[]},\"guarantee\":\"If you don\'t get results, I\'ll work with you again for free until you get results.\",\"video\":{\"embedUrl\":\"\",\"thumbnail\":\"\"},\"buttons\":{\"primary\":{\"text\":\"Apply Now\",\"action\":\"openModal\"},\"secondary\":{\"text\":\"Download Brochure\",\"url\":\"\",\"enabled\":false}},\"features\":{\"title\":\"What You will get in this 90 days personalized transformation?\",\"items\":[{\"text\":\"1:1 Mentorship Calls with Raghulan Gowthamian\"},{\"text\":\"Monthly Group Mastermind Calls with the Elite Community\"},{\"text\":\"A Personalized Strategy Blueprint for Your Mindset, Career, and Business\"},{\"text\":\"Continuous Support for Real Transformation\"}]},\"cta\":{\"text\":\"Apply Now\",\"seatsRemaining\":5}}', '{\"title\":\"STRUGGLING TO FIGURE IT OUT ALONE?\",\"subtitle\":\"Get Expert 1:1 Guidance\",\"formAction\":\"\",\"submitButton\":\"Get Fast Help\"}', '2026-01-26 15:30:26', '2026-01-26 15:30:26', NULL, '', NULL, 0, '', '', 'All levels'),
(44, 'monday-com', 'DRAFT', NULL, 'monday.com', '', '', 4.9, '0+', 'Tamil', '0h', '', 'simple-elite', '{\"headline\":{\"parts\":[]},\"guarantee\":\"If you don\'t get results, I\'ll work with you again for free until you get results.\",\"video\":{\"embedUrl\":\"\",\"thumbnail\":\"\",\"youtubeUrl\":\"https:\\/\\/youtu.be\\/jdFLISUkRgw\",\"youtubeId\":\"jdFLISUkRgw\"},\"buttons\":{\"primary\":{\"text\":\"Apply Now\",\"action\":\"openModal\"},\"secondary\":{\"text\":\"Download Brochure\",\"url\":\"\",\"enabled\":false}},\"features\":{\"title\":\"What You will get in this 90 days personalized transformation?\",\"items\":[{\"text\":\"1:1 Mentorship Calls with Raghulan Gowthamian\"},{\"text\":\"Monthly Group Mastermind Calls with the Elite Community\"},{\"text\":\"A Personalized Strategy Blueprint for Your Mindset, Career, and Business\"},{\"text\":\"Continuous Support for Real Transformation\"}]},\"cta\":{\"text\":\"Apply Now\",\"seatsRemaining\":5}}', '{\"title\":\"STRUGGLING TO FIGURE IT OUT ALONE?\",\"subtitle\":\"Get Expert 1:1 Guidance\",\"formAction\":\"\",\"submitButton\":\"Get Fast Help\"}', '2026-01-26 15:40:46', '2026-01-26 15:40:46', NULL, '', NULL, 0, '', '', 'All levels'),
(45, 'monday-com-engli', 'DRAFT', NULL, 'monday.com | engli', '', '', 4.9, '0+', 'Tamil', '0h', '', 'simple-elite', '{\"headline\":{\"parts\":[]},\"guarantee\":\"If you don\'t get results, I\'ll work with you again for free until you get results.\",\"video\":{\"embedUrl\":\"\",\"thumbnail\":\"\",\"youtubeUrl\":\"https:\\/\\/youtu.be\\/Dqjsq8wzstM\",\"youtubeId\":\"Dqjsq8wzstM\"},\"buttons\":{\"primary\":{\"text\":\"Apply Now\",\"action\":\"openModal\"},\"secondary\":{\"text\":\"Download Brochure\",\"url\":\"\",\"enabled\":false}},\"features\":{\"title\":\"What You will get in this 90 days personalized transformation?\",\"items\":[{\"text\":\"1:1 Mentorship Calls with Raghulan Gowthamian\"},{\"text\":\"Monthly Group Mastermind Calls with the Elite Community\"},{\"text\":\"A Personalized Strategy Blueprint for Your Mindset, Career, and Business\"},{\"text\":\"Continuous Support for Real Transformation\"}]},\"cta\":{\"text\":\"Apply Now\",\"seatsRemaining\":5}}', '{\"title\":\"STRUGGLING TO FIGURE IT OUT ALONE?\",\"subtitle\":\"Get Expert 1:1 Guidance\",\"formAction\":\"\",\"submitButton\":\"Get Fast Help\"}', '2026-01-26 15:42:38', '2026-01-26 15:42:38', NULL, '', NULL, 0, '', '', 'All levels');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_users`
--
ALTER TABLE `admin_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `auth_tokens`
--
ALTER TABLE `auth_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `idx_token_hash` (`token_hash`),
  ADD KEY `idx_expires_at` (`expires_at`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `cms_templates`
--
ALTER TABLE `cms_templates`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_slug` (`slug`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `category_id` (`category_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_users`
--
ALTER TABLE `admin_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `auth_tokens`
--
ALTER TABLE `auth_tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `auth_tokens`
--
ALTER TABLE `auth_tokens`
  ADD CONSTRAINT `auth_tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `admin_users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
