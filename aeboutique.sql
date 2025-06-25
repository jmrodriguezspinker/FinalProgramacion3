-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-06-2025 a las 23:37:57
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `aeboutique`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carts`
--

CREATE TABLE `carts` (
  `id` int(11) NOT NULL,
  `isActive` tinyint(4) NOT NULL DEFAULT 1,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `carts`
--

INSERT INTO `carts` (`id`, `isActive`, `createdAt`, `updatedAt`, `userId`) VALUES
(1, 0, '2025-06-24 18:25:59.998904', '2025-06-24 18:26:13.000000', 1),
(2, 1, '2025-06-24 18:26:13.382033', '2025-06-24 18:26:13.382033', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cart_items`
--

CREATE TABLE `cart_items` (
  `id` int(11) NOT NULL,
  `quantity` tinyint(4) NOT NULL,
  `cartId` int(11) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cart_items`
--

INSERT INTO `cart_items` (`id`, `quantity`, `cartId`, `productId`) VALUES
(1, 4, 1, 114);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `status` enum('Pendiente','Completado','Cancelado') NOT NULL DEFAULT 'Pendiente',
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `orders`
--

INSERT INTO `orders` (`id`, `total`, `status`, `createdAt`, `updatedAt`, `userId`) VALUES
(1, 192000.00, 'Pendiente', '2025-06-24 18:26:12.318312', '2025-06-24 18:26:12.318312', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `quantity` tinyint(4) NOT NULL,
  `priceAtPurchase` decimal(10,2) NOT NULL,
  `orderId` int(11) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `order_items`
--

INSERT INTO `order_items` (`id`, `quantity`, `priceAtPurchase`, `orderId`, `productId`) VALUES
(1, 4, 48000.00, 1, 114);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `description` tinytext DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `inStock` int(11) NOT NULL DEFAULT 0,
  `brand` varchar(50) NOT NULL,
  `category` enum('Blusa','Abrigo','Sweater','Pantalón','Falda','Deportivo','Vestido','Calzado','Ropa de Baño','Accesorio') NOT NULL,
  `img` varchar(200) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `title`, `description`, `price`, `inStock`, `brand`, `category`, `img`, `createdAt`, `updatedAt`) VALUES
(1, 'Bufanda Hindú', 'Stola Hinhú 120x30 cm', 3000.00, 10, 'Dior', 'Accesorio', 'http://localhost:5000/images/bufanda-hindu.jpg', '2025-06-21 20:51:10.829386', '2025-06-24 16:49:06.903402'),
(2, 'Pantalón Rayado', 'Pantalón Estilizado para Mujer', 20000.00, 10, 'Hèrmes', 'Pantalón', 'http://localhost:5000/images/pantalon-mujer-1.jpg', '2025-06-21 20:51:10.829386', '2025-06-24 16:49:06.772505'),
(4, 'Blusa de Seda Clásica', 'Elegante blusa de seda, corte clásico, perfecta para la oficina o eventos.', 59990.00, 45, 'SedaGlam', 'Blusa', 'http://localhost:5000/images/blusa-seda-clasica.jpg', '2025-06-23 14:21:40.000000', '2025-06-24 16:49:06.661216'),
(5, 'Blusa con Volantes y Encaje', 'Blusa romántica con detalles de volantes y encaje en el escote y puños.', 45500.00, 38, 'RomanticChic', 'Blusa', 'http://localhost:5000/images/blusa-volantes-encaje.jpg', '2025-06-23 14:21:40.000000', '2025-06-24 16:49:06.661216'),
(6, 'Blusa de Algodón Casual', 'Blusa de algodón suave y transpirable, ideal para el uso diario.', 32000.00, 60, 'ComfyDay', 'Blusa', 'http://localhost:5000/images/blusa-algodon-casual.jpg', '2025-06-23 14:21:40.000000', '2025-06-24 16:49:06.661216'),
(7, 'Blusa Estampada de Verano', 'Blusa ligera con estampado floral vibrante, perfecta para días cálidos.', 39990.00, 52, 'VeranoVibes', 'Blusa', 'http://localhost:5000/images/blusa-estampada-verano.jpg', '2025-06-23 14:21:40.000000', '2025-06-24 16:49:06.661216'),
(8, 'Camisa Blanca Oxford', 'Camisa clásica de algodón Oxford, esencial en cualquier guardarropa.', 48000.00, 55, 'ClassicWear', 'Blusa', 'http://localhost:5000/images/camisa-blanca-oxford.jpg', '2025-06-23 14:21:41.000000', '2025-06-24 16:49:06.661216'),
(9, 'Camisa de Jean Oversize', 'Camisa de jean estilo oversize, cómoda y a la moda.', 62500.00, 40, 'DenimCool', 'Blusa', 'http://localhost:5000/images/camisa-jean-oversize.jpg', '2025-06-23 14:21:41.000000', '2025-06-24 16:49:06.661216'),
(10, 'Camisa a Rayas Lino', 'Camisa de lino a rayas, fresca y perfecta para un look casual de verano.', 40000.00, 48, 'LinoFresh', 'Blusa', 'http://localhost:5000/images/camisa-rayas-lino.jpg', '2025-06-23 14:21:41.000000', '2025-06-24 16:49:06.661216'),
(11, 'Camisa de Seda con Botones', 'Camisa elegante de seda con botones ocultos, ideal para la noche.', 70000.00, 30, 'NocheChic', 'Blusa', 'http://localhost:5000/images/camisa-seda-botones.jpg', '2025-06-23 14:21:41.000000', '2025-06-24 16:49:06.661216'),
(12, 'Sweater de Lana Trenzado', 'Sweater de lana con patrón trenzado, muy abrigado y estiloso.', 85000.00, 35, 'WoolWarm', 'Abrigo', 'http://localhost:5000/images/sweater-lana-trenzado.jpg', '2025-06-23 14:21:41.000000', '2025-06-24 16:49:06.729061'),
(13, 'Sweater Cuello Tortuga Fino', 'Sweater de cuello tortuga de tejido fino, ideal para combinar en capas.', 60000.00, 42, 'LayerUp', 'Abrigo', 'http://localhost:5000/images/sweater-cuello-tortuga-fino.jpg', '2025-06-23 14:21:41.000000', '2025-06-24 16:49:06.729061'),
(14, 'Sweater Oversize de Mohair', 'Sweater oversize de mohair, suave y con un toque de lujo.', 95000.00, 28, 'MohairDream', 'Abrigo', 'http://localhost:5000/images/sweater-oversize-mohair.jpg', '2025-06-23 14:21:41.000000', '2025-06-24 16:49:06.729061'),
(15, 'Sweater Rayado de Punto', 'Sweater de punto con diseño de rayas horizontales, clásico y moderno.', 72000.00, 33, 'StripeKnit', 'Abrigo', 'http://localhost:5000/images/sweater-rayado-punto.jpg', '2025-06-23 14:21:41.000000', '2025-06-24 16:49:06.729061'),
(16, 'Cárdigan Largo de Cashmere', 'Cárdigan extra largo de cashmere, increíblemente suave y elegante.', 120000.00, 20, 'CashmereElite', 'Abrigo', 'http://localhost:5000/images/cardigan-largo-cashmere.jpg', '2025-06-23 14:21:41.000000', '2025-06-24 16:49:06.729061'),
(17, 'Cárdigan Corto de Punto Fino', 'Cárdigan corto de punto fino, perfecto para llevar sobre vestidos o blusas.', 55000.00, 40, 'KnitLite', 'Abrigo', 'http://localhost:5000/images/cardigan-corto-punto-fino.jpg', '2025-06-23 14:21:41.000000', '2025-06-24 16:49:06.729061'),
(18, 'Cárdigan Texturizado Abierto', 'Cárdigan de diseño abierto con textura, ideal para looks casuales.', 68000.00, 35, 'OpenFlow', 'Abrigo', 'http://localhost:5000/images/cardigan-texturizado-abierto.jpg', '2025-06-23 14:21:41.000000', '2025-06-24 16:49:06.729061'),
(19, 'Cárdigan con Botones Perla', 'Cárdigan clásico con botones de perla, un toque sofisticado.', 78000.00, 27, 'PearlTouch', 'Abrigo', 'http://localhost:5000/images/cardigan-botones-perla.jpg', '2025-06-23 14:21:41.000000', '2025-06-24 16:49:06.729061'),
(20, 'Abrigo de Lana Clásico', 'Abrigo largo de lana con corte clásico, ideal para el invierno.', 180000.00, 15, 'WinterChic', 'Abrigo', 'http://localhost:5000/images/abrigo-lana-clasico.jpg', '2025-06-23 14:21:41.000000', '2025-06-24 16:49:06.729061'),
(21, 'Trench Coat Impermeable', 'Gabardina impermeable con cinturón, estilo atemporal y funcional.', 150000.00, 22, 'RainGuard', 'Abrigo', 'http://localhost:5000/images/trench-coat-impermeable.jpg', '2025-06-23 14:21:41.000000', '2025-06-24 16:49:06.729061'),
(22, 'Abrigo de Pelo Sintético', 'Abrigo de pelo sintético suave y voluminoso, para un look glamuroso.', 220000.00, 10, 'FauxFurLux', 'Abrigo', 'http://localhost:5000/images/abrigo-pelo-sintetico.jpg', '2025-06-23 14:21:41.000000', '2025-06-24 16:49:06.729061'),
(23, 'Parka Acolchada con Capucha', 'Parka acolchada y cálida con capucha, perfecta para el frío extremo.', 130000.00, 18, 'UrbanExplorer', 'Abrigo', 'http://localhost:5000/images/parka-acolchada-capucha.jpg', '2025-06-23 14:21:41.000000', '2025-06-24 16:49:06.729061'),
(24, 'Chaqueta de Cuero Sintético', 'Chaqueta estilo biker de cuero sintético, con cierres metálicos.', 89990.00, 30, 'RebelLook', 'Abrigo', 'http://localhost:5000/images/chaqueta-cuero-sintetico.jpg', '2025-06-23 14:21:41.000000', '2025-06-24 16:49:06.729061'),
(25, 'Blazer Cruzado de Lino', 'Blazer cruzado de lino, ideal para un look formal o casual.', 75000.00, 32, 'LinoBiz', 'Abrigo', 'http://localhost:5000/images/blazer-cruzado-lino.jpg', '2025-06-23 14:21:41.000000', '2025-06-24 16:49:06.729061'),
(26, 'Cazadora Vaquera Oversize', 'Cazadora de jean oversize, estilo retro y versátil.', 68000.00, 45, 'DenimForever', 'Abrigo', 'http://localhost:5000/images/cazadora-vaquera-oversize.jpg', '2025-06-23 14:21:41.000000', '2025-06-24 16:49:06.729061'),
(27, 'Chaqueta Bomber Satinada', 'Chaqueta bomber de satén con detalles bordados, estilo deportivo chic.', 79000.00, 25, 'SatinSport', 'Abrigo', 'http://localhost:5000/images/chaqueta-bomber-satinada.jpg', '2025-06-23 14:21:41.000000', '2025-06-24 16:49:06.729061'),
(28, 'Buzo con Capucha Básico', 'Buzo con capucha de felpa, suave y cómodo, ideal para el día a día.', 50000.00, 50, 'UrbanComfy', 'Sweater', 'http://localhost:5000/images/buzo-capucha-basico.jpg', '2025-06-23 14:21:41.000000', '2025-06-24 16:49:06.749927'),
(29, 'Buzo Cropped con Capucha', 'Buzo corto con capucha, perfecto para combinar con pantalones de tiro alto.', 48000.00, 40, 'CropTrend', 'Sweater', 'http://localhost:5000/images/buzo-cropped-capucha.jpg', '2025-06-23 14:21:41.000000', '2025-06-24 16:49:06.749927'),
(30, 'Buzo Oversize con Estampado', 'Buzo oversize con capucha y estampado gráfico en la espalda.', 55000.00, 35, 'ArtHoodie', 'Sweater', 'http://localhost:5000/images/buzo-oversize-estampado.jpg', '2025-06-23 14:21:41.000000', '2025-06-24 16:49:06.749927'),
(31, 'Buzo con Capucha y Cierre', 'Buzo con capucha y cierre frontal, ideal para capas.', 58000.00, 42, 'ZipHood', 'Sweater', 'http://localhost:5000/images/buzo-capucha-cierre.jpg', '2025-06-23 14:21:41.000000', '2025-06-24 16:49:06.749927'),
(32, 'Remera Algodón Básica', 'Remera de algodón 100%, corte clásico y cuello redondo, esencial.', 18000.00, 100, 'EssentialFab', 'Blusa', 'http://localhost:5000/images/remera-algodon-basica.jpg', '2025-06-23 14:21:41.000000', '2025-06-24 16:49:06.661216'),
(33, 'Remera Cropped Estampada', 'Remera corta con estampado frontal, ideal para looks juveniles.', 25000.00, 80, 'PrintVibe', 'Blusa', 'http://localhost:5000/images/remera-cropped-estampada.jpg', '2025-06-23 14:21:41.000000', '2025-06-24 16:49:06.661216'),
(34, 'Remera Larga de Algodón', 'Remera larga de algodón, perfecta para usar con leggings o shorts.', 22000.00, 75, 'LongComfort', 'Blusa', 'http://localhost:5000/images/remera-larga-algodon.jpg', '2025-06-23 14:21:41.000000', '2025-06-24 16:49:06.661216'),
(35, 'Remera con Nudo Frontal', 'Remera con diseño de nudo frontal, moderna y casual.', 28000.00, 60, 'KnotStyle', 'Blusa', 'http://localhost:5000/images/remera-nudo-frontal.jpg', '2025-06-23 14:21:41.000000', '2025-06-24 16:49:06.661216'),
(36, 'Top de Punto Acanalado', 'Top de punto acanalado, ajustado y versátil, ideal para combinar.', 29990.00, 55, 'RibKnit', 'Blusa', 'http://localhost:5000/images/top-punto-acanalado.jpg', '2025-06-23 14:21:41.000000', '2025-06-24 16:49:06.661216'),
(37, 'Top de Satén con Tirantes', 'Top de satén con tirantes finos, perfecto para looks elegantes de noche.', 38000.00, 30, 'NightGlam', 'Blusa', 'http://localhost:5000/images/top-saten-tirantes.jpg', '2025-06-23 14:21:41.000000', '2025-06-24 16:49:06.661216'),
(38, 'Top Corto Deportivo', 'Top deportivo corto, con buen soporte, ideal para entrenar.', 22000.00, 65, 'SportFit', 'Blusa', 'http://localhost:5000/images/top-corto-deportivo.jpg', '2025-06-23 14:21:41.000000', '2025-06-24 16:49:06.661216'),
(39, 'Top de Encaje Bralette', 'Top estilo bralette con detalles de encaje, para usar bajo transparencias.', 35000.00, 40, 'LaceDelicate', 'Blusa', 'http://localhost:5000/images/top-encaje-bralette.jpg', '2025-06-23 14:21:41.000000', '2025-06-24 16:49:06.661216'),
(40, 'Pantalón Palazzo de Lino', 'Pantalón palazzo ancho de lino, cómodo y fresco para el verano.', 55000.00, 40, 'LinoFlow', 'Pantalón', 'http://localhost:5000/images/pantalon-palazzo-lino.jpg', '2025-06-23 14:21:41.000000', '2025-06-24 16:49:06.772505'),
(41, 'Pantalón Sastre Cigarette', 'Pantalón sastre con corte cigarette, elegante para la oficina.', 68000.00, 35, 'TailoredChic', 'Pantalón', 'http://localhost:5000/images/pantalon-sastre-cigarette.jpg', '2025-06-23 14:21:41.000000', '2025-06-24 16:49:06.772505'),
(42, 'Pantalón Cargo de Algodón', 'Pantalón cargo de algodón con bolsillos laterales, estilo utilitario.', 49990.00, 50, 'UtilityWear', 'Pantalón', 'http://localhost:5000/images/pantalon-cargo-algodon.jpg', '2025-06-23 14:21:41.000000', '2025-06-24 16:49:06.772505'),
(43, 'Pantalón de Cuero PU Ajustado', 'Pantalón ajustado de cuero sintético (PU), ideal para un look audaz.', 78000.00, 28, 'LeatherLook', 'Pantalón', 'http://localhost:5000/images/pantalon-cuero-pu-ajustado.jpg', '2025-06-23 14:21:41.000000', '2025-06-24 16:49:06.772505'),
(44, 'Jeans Skinny de Tiro Alto', 'Jeans ajustados skinny con tiro alto, realzan la figura.', 65000.00, 80, 'SkinnyFit', 'Pantalón', 'http://localhost:5000/images/jeans-skinny-tiro-alto.jpg', '2025-06-23 14:21:41.000000', '2025-06-24 16:49:06.772505'),
(45, 'Jeans Rectos Vintage', 'Jeans de corte recto con lavado vintage, estilo retro y cómodo.', 72000.00, 60, 'VintageDenim', 'Pantalón', 'http://localhost:5000/images/jeans-rectos-vintage.jpg', '2025-06-23 14:21:41.000000', '2025-06-24 16:49:06.772505'),
(46, 'Jeans Boyfriend Rotos', 'Jeans estilo boyfriend con rotos estratégicos, look casual y desenfadado.', 68000.00, 55, 'RebelDenim', 'Pantalón', 'http://localhost:5000/images/jeans-boyfriend-rotos.jpg', '2025-06-23 14:21:41.000000', '2025-06-24 16:49:06.772505'),
(47, 'Jeans Flare de Tiro Medio', 'Jeans acampanados flare con tiro medio, estilo setentero renovado.', 75000.00, 45, 'FlareBack', 'Pantalón', 'http://localhost:5000/images/jeans-flare-tiro-medio.jpg', '2025-06-23 14:21:41.000000', '2025-06-24 16:49:06.772505'),
(48, 'Falda Midi Plisada', 'Falda midi plisada de tela ligera, ideal para un look romántico.', 40000.00, 50, 'PleatChic', 'Falda', 'http://localhost:5000/images/falda-midi-plisada.jpg', '2025-06-23 14:21:41.000000', '2025-06-24 16:49:06.801276'),
(49, 'Minifalda de Jean con Botones', 'Minifalda de jean con cierre de botones frontales, estilo casual.', 35000.00, 60, 'DenimMini', 'Falda', 'http://localhost:5000/images/minifalda-jean-botones.jpg', '2025-06-23 14:21:41.000000', '2025-06-24 16:49:06.801276'),
(50, 'Falda Lápiz de Eco-cuero', 'Falda lápiz de eco-cuero, para un look sofisticado y moderno.', 55000.00, 30, 'LeatherPencil', 'Falda', 'http://localhost:5000/images/falda-lapiz-ecocuero.jpg', '2025-06-23 14:21:41.000000', '2025-06-24 16:49:06.801276'),
(51, 'Falda Larga Bohemio Estampada', 'Falda larga estilo bohemio con estampado vibrante, ideal para festivales.', 48000.00, 40, 'BohoDream', 'Falda', 'http://localhost:5000/images/falda-larga-bohemio-estampada.jpg', '2025-06-23 14:21:41.000000', '2025-06-24 16:49:06.801276'),
(52, 'Shorts de Lino con Elástico', 'Shorts de lino con cintura elástica, frescos y cómodos para el verano.', 28000.00, 70, 'SummerBreeze', 'Falda', 'http://localhost:5000/images/shorts-lino-elastico.jpg', '2025-06-23 14:21:41.000000', '2025-06-24 16:49:06.801276'),
(53, 'Shorts de Jean Desgastados', 'Shorts de jean con efecto desgastado y dobladillo deshilachado.', 34000.00, 65, 'DistressDenim', 'Falda', 'http://localhost:5000/images/shorts-jean-desgastados.jpg', '2025-06-23 14:21:41.000000', '2025-06-24 16:49:06.801276'),
(54, 'Shorts de Biker Negros', 'Shorts estilo biker de tejido elástico, ideales para deporte o casual.', 25000.00, 85, 'BikerChic', 'Falda', 'http://localhost:5000/images/shorts-biker-negros.jpg', '2025-06-23 14:21:41.000000', '2025-06-24 16:49:06.801276'),
(55, 'Shorts de Sastre de Tiro Alto', 'Shorts de sastre con tiro alto y pinzas, elegantes y versátiles.', 39000.00, 48, 'TailoredShorts', 'Falda', 'http://localhost:5000/images/shorts-sastre-tiro-alto.jpg', '2025-06-23 14:21:41.000000', '2025-06-24 16:49:06.801276'),
(56, 'Calza Deportiva Alta Compresión', 'Calzas deportivas con alta compresión, perfectas para entrenamientos intensos.', 42000.00, 60, 'SportPro', 'Deportivo', 'http://localhost:5000/images/calza-deportiva-alta-compresion.jpg', '2025-06-23 14:21:41.000000', '2025-06-24 16:49:06.829913'),
(57, 'Calza de Algodón Básica', 'Calza de algodón suave, ideal para el uso diario y la comodidad.', 20000.00, 90, 'ComfyLeg', 'Deportivo', 'http://localhost:5000/images/calza-algodon-basica.jpg', '2025-06-23 14:21:41.000000', '2025-06-24 16:49:06.829913'),
(58, 'Calza de Cuero PU Brillante', 'Calza de cuero sintético (PU) brillante, para un look audaz y de noche.', 38000.00, 35, 'ShineLegs', 'Deportivo', 'http://localhost:5000/images/calza-cuero-pu-brillante.jpg', '2025-06-23 14:21:41.000000', '2025-06-24 16:49:06.829913'),
(59, 'Calza Térmica Invierno', 'Calza térmica forrada para invierno, extra cálida y cómoda.', 35000.00, 45, 'WarmComfort', 'Deportivo', 'http://localhost:5000/images/calza-termica-invierno.jpg', '2025-06-23 14:21:41.000000', '2025-06-24 16:49:06.829913'),
(60, 'Vestido Midi Estampado Floral', 'Vestido midi con estampado floral, ideal para un look fresco y femenino.', 55000.00, 40, 'FlowerDream', 'Vestido', 'http://localhost:5000/images/vestido-midi-estampado-floral.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:49:06.851683'),
(61, 'Vestido Negro LBD', 'Clásico \"Little Black Dress\" ajustado, perfecto para cualquier ocasión.', 68000.00, 30, 'BlackElegance', 'Vestido', 'http://localhost:5000/images/vestido-negro-lbd.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:49:06.851683'),
(62, 'Vestido de Noche Largo de Gasa', 'Vestido largo de noche con capas de gasa y detalles brillantes.', 95000.00, 20, 'NightGown', 'Vestido', 'http://localhost:5000/images/vestido-noche-largo-gasa.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:49:06.851683'),
(63, 'Vestido Camisero de Lino', 'Vestido estilo camisero de lino, cómodo y casual, con cinturón.', 60000.00, 35, 'LinoShirtDress', 'Vestido', 'http://localhost:5000/images/vestido-camisero-lino.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:49:06.851683'),
(64, 'Mono Largo Estampado', 'Mono largo de pierna ancha con estampado tropical, ideal para el verano.', 75000.00, 30, 'TropicalJumpsuit', 'Vestido', 'http://localhost:5000/images/mono-largo-estampado.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:49:06.851683'),
(65, 'Mono Corto de Jean', 'Mono corto de jean, cómodo y con estilo casual para el día a día.', 50000.00, 40, 'DenimShorty', 'Vestido', 'http://localhost:5000/images/mono-corto-jean.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:49:06.851683'),
(66, 'Mono Elegante de Noche', 'Mono de noche elegante con corte entallado y escote pronunciado.', 85000.00, 25, 'GlamJumpsuit', 'Vestido', 'http://localhost:5000/images/mono-elegante-noche.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:49:06.851683'),
(67, 'Mono Deportivo de Algodón', 'Mono deportivo de algodón, ideal para un look athleisure cómodo.', 60000.00, 35, 'SportyJumpsuit', 'Deportivo', 'http://localhost:5000/images/mono-deportivo-algodon.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:49:06.829913'),
(68, 'Conjunto de Blazer y Pantalón Sastre', 'Conjunto elegante de blazer y pantalón sastre, perfecto para eventos.', 150000.00, 20, 'TailoredSet', 'Vestido', 'http://localhost:5000/images/conjunto-blazer-pantalon-sastre.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:49:06.851683'),
(69, 'Conjunto de Top y Falda Midi', 'Conjunto de top corto y falda midi a juego, estampado floral.', 85000.00, 28, 'FloralSet', 'Vestido', 'http://localhost:5000/images/conjunto-top-falda-midi.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:49:06.851683'),
(70, 'Conjunto de Short y Camisa Lino', 'Conjunto de shorts y camisa oversize de lino, ideal para el verano.', 70000.00, 35, 'LinoDuo', 'Vestido', 'http://localhost:5000/images/conjunto-short-camisa-lino.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:49:06.851683'),
(71, 'Conjunto Deportivo Crop Top y Legging', 'Conjunto deportivo de crop top y leggings de alta compresión.', 95000.00, 40, 'ActiveSet', 'Deportivo', 'http://localhost:5000/images/conjunto-deportivo-crop-top-legging.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:49:06.829913'),
(72, 'Zapatos de Cuero Clásicos', 'Zapatos de cuero negro con tacón bajo, ideales para la oficina.', 90000.00, 50, 'ClassicStep', 'Calzado', 'http://localhost:5000/images/zapatos-cuero-clasicos.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:45:13.239508'),
(73, 'Mocasines de Antelina', 'Cómodos mocasines de antelina con detalle metálico.', 70000.00, 45, 'ComfyLoafer', 'Calzado', 'http://localhost:5000/images/mocasines-antelina.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:45:13.239508'),
(74, 'Zapatos Oxford de Charol', 'Zapatos estilo Oxford de charol brillante, un toque sofisticado.', 85000.00, 30, 'ShineOxford', 'Calzado', 'http://localhost:5000/images/zapatos-oxford-charol.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:45:13.239508'),
(75, 'Zapatos Bailarinas con Lazo', 'Clásicas bailarinas con lazo decorativo, cómodas y elegantes.', 60000.00, 55, 'BalletCharm', 'Calzado', 'http://localhost:5000/images/zapatos-bailarinas-lazo.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:45:13.239508'),
(76, 'Sandalias de Tiras Planas', 'Sandalias planas de múltiples tiras, ideales para el verano.', 40000.00, 60, 'SummerWalk', 'Calzado', 'http://localhost:5000/images/sandalias-tiras-planas.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:45:13.239508'),
(77, 'Sandalias de Plataforma Esparto', 'Sandalias de plataforma con suela de esparto, estilo bohemio.', 70000.00, 35, 'EspartoGlam', 'Calzado', 'http://localhost:5000/images/sandalias-plataforma-esparto.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:45:13.239508'),
(78, 'Sandalias con Tacón Cuña', 'Sandalias con tacón de cuña, cómodas y con estilo para cualquier evento.', 65000.00, 40, 'WedgeComfort', 'Calzado', 'http://localhost:5000/images/sandalias-tacon-cuna.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:45:13.239508'),
(79, 'Sandalias Gladiadoras Altas', 'Sandalias gladiadoras altas con cierres de cordones, estilo audaz.', 55000.00, 30, 'GladiatorLook', 'Calzado', 'http://localhost:5000/images/sandalias-gladiadoras-altas.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:45:13.239508'),
(80, 'Botas Altas de Cuero Negro', 'Botas altas de cuero negro, perfectas para el invierno.', 110000.00, 25, 'LeatherHigh', 'Calzado', 'http://localhost:5000/images/botas-altas-cuero-negro.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:45:13.239508'),
(81, 'Botines Chelsea de Gamuza', 'Botines Chelsea de gamuza, cómodos y fáciles de combinar.', 85000.00, 30, 'SuedeChelsea', 'Calzado', 'http://localhost:5000/images/botines-chelsea-gamuza.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:45:13.239508'),
(82, 'Botas de Combate Chunky', 'Botas de combate con suela chunky, estilo moderno y audaz.', 95000.00, 28, 'CombatStrong', 'Calzado', 'http://localhost:5000/images/botas-combate-chunky.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:45:13.239508'),
(83, 'Botas de Lluvia Elegantes', 'Botas de lluvia con diseño elegante, funcionales y con estilo.', 70000.00, 35, 'RainyDayChic', 'Calzado', 'http://localhost:5000/images/botas-lluvia-elegantes.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:45:13.239508'),
(84, 'Zapatos de Tacón Stiletto', 'Clásicos zapatos de tacón stiletto, elegantes para cualquier ocasión.', 75000.00, 40, 'StilettoQueen', 'Calzado', 'http://localhost:5000/images/tacones-stiletto.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:45:13.239508'),
(85, 'Sandalias de Tacón Bloque', 'Sandalias con tacón de bloque, cómodas y estables, ideales para el día.', 60000.00, 35, 'BlockHeel', 'Calzado', 'http://localhost:5000/images/sandalias-tacon-bloque.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:45:13.239508'),
(86, 'Botines de Tacón Ancho', 'Botines de tacón ancho, cómodos y modernos para el otoño/invierno.', 80000.00, 30, 'AnkleComfort', 'Calzado', 'http://localhost:5000/images/botines-tacon-ancho.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:45:13.239508'),
(87, 'Zapatos de Plataforma con Pulsera', 'Zapatos de plataforma con pulsera al tobillo, para un look de fiesta.', 88000.00, 25, 'PlatformParty', 'Calzado', 'http://localhost:5000/images/zapatos-plataforma-pulsera.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:45:13.239508'),
(88, 'Zapatillas Blancas Clásicas', 'Zapatillas blancas de diseño clásico, versátiles para cualquier outfit.', 65000.00, 70, 'UrbanClassics', 'Calzado', 'http://localhost:5000/images/zapatillas-blancas-clasicas.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:45:13.239508'),
(89, 'Zapatillas Deportivas Running', 'Zapatillas deportivas ligeras y cómodas, ideales para correr.', 85000.00, 55, 'RunFast', 'Calzado', 'http://localhost:5000/images/zapatillas-deportivas-running.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:45:13.239508'),
(90, 'Zapatillas Urbanas de Plataforma', 'Zapatillas urbanas con suela de plataforma, para un look moderno.', 75000.00, 45, 'PlatformKicks', 'Calzado', 'http://localhost:5000/images/zapatillas-urbanas-plataforma.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:45:13.239508'),
(91, 'Zapatillas de Lona Bajas', 'Zapatillas de lona bajas, un básico cómodo para el día a día.', 40000.00, 60, 'CanvasEase', 'Calzado', 'http://localhost:5000/images/zapatillas-lona-bajas.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:45:13.239508'),
(92, 'Bolso de Hombro de Cuero', 'Bolso de hombro de cuero genuino, con diseño elegante y espacioso.', 120000.00, 30, 'LeatherCarry', 'Accesorio', 'http://localhost:5000/images/bolso-hombro-cuero.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:49:06.903402'),
(93, 'Mini Bolso Cruzado', 'Mini bolso cruzado, perfecto para llevar lo esencial de forma ligera.', 45000.00, 50, 'MiniCross', 'Accesorio', 'http://localhost:5000/images/mini-bolso-cruzado.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:49:06.903402'),
(94, 'Mochila Urbana de Nylon', 'Mochila de nylon resistente al agua, ideal para el uso diario o viajes.', 80000.00, 40, 'UrbanPack', 'Accesorio', 'http://localhost:5000/images/mochila-urbana-nylon.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:49:06.903402'),
(95, 'Clutch de Fiesta Brillante', 'Clutch de fiesta con brillos, ideal para complementar un look de noche.', 60000.00, 25, 'PartyClutch', 'Accesorio', 'http://localhost:5000/images/clutch-fiesta-brillante.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:49:06.903402'),
(96, 'Billetera de Cuero Clásica', 'Billetera de cuero con múltiples compartimentos para tarjetas y billetes.', 35000.00, 50, 'LeatherWallet', 'Accesorio', 'http://localhost:5000/images/billetera-cuero-clasica.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:49:06.903402'),
(97, 'Billetera Compacta con Cierre', 'Billetera compacta con cierre, ideal para llevar en bolsos pequeños.', 28000.00, 60, 'ZipWallet', 'Accesorio', 'http://localhost:5000/images/billetera-compacta-cierre.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:49:06.903402'),
(98, 'Billetera Tarjetero Minimalista', 'Tarjetero minimalista de piel, perfecto para llevar solo lo esencial.', 20000.00, 70, 'CardSleek', 'Accesorio', 'http://localhost:5000/images/billetera-tarjetero-minimalista.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:49:06.903402'),
(99, 'Billetera con Cadena Metálica', 'Billetera con diseño moderno y cadena metálica decorativa.', 40000.00, 45, 'ChainChic', 'Accesorio', 'http://localhost:5000/images/billetera-cadena-metalica.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:49:06.903402'),
(100, 'Pendientes de Aro Dorados', 'Clásicos pendientes de aro dorados, perfectos para el uso diario.', 25000.00, 80, 'GoldHoops', 'Accesorio', 'http://localhost:5000/images/pendientes-aro-dorados.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:49:06.903402'),
(101, 'Collar de Perlas Finas', 'Elegante collar de perlas cultivadas, un clásico atemporal.', 55000.00, 40, 'PearlNeck', 'Accesorio', 'http://localhost:5000/images/collar-perlas-finas.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:49:06.903402'),
(102, 'Pulsera de Plata con Charms', 'Pulsera de plata esterlina con pequeños charms intercambiables.', 38000.00, 60, 'SilverCharm', 'Accesorio', 'http://localhost:5000/images/pulsera-plata-charms.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:49:06.903402'),
(103, 'Anillo de Compromiso Diamante Simulado', 'Anillo de compromiso con diamante simulado, corte brillante.', 70000.00, 30, 'DiamondGlow', 'Accesorio', 'http://localhost:5000/images/anillo-compromiso-diamante-simulado.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:49:06.903402'),
(104, 'Sombrero de Sol de Paja', 'Sombrero de sol de paja con ala ancha, ideal para la playa y el verano.', 30000.00, 50, 'SunShield', 'Accesorio', 'http://localhost:5000/images/sombrero-sol-paja.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:49:06.903402'),
(105, 'Gorro de Lana Invierno', 'Gorro de lana suave y cálido para el invierno, con pompón.', 22000.00, 60, 'WinterWarmth', 'Accesorio', 'http://localhost:5000/images/gorro-lana-invierno.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:49:06.903402'),
(106, 'Gorra de Béisbol Bordada', 'Gorra de béisbol de algodón con bordado frontal, estilo casual.', 28000.00, 45, 'SportyCap', 'Accesorio', 'http://localhost:5000/images/gorra-beisbol-bordada.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:49:06.903402'),
(107, 'Boina Francesa de Lana', 'Clásica boina francesa de lana, un toque chic y sofisticado.', 35000.00, 30, 'FrenchChic', 'Accesorio', 'http://localhost:5000/images/boina-francesa-lana.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:49:06.903402'),
(108, 'Bufanda de Cashmere Larga', 'Bufanda larga de cashmere, muy suave y abrigada.', 50000.00, 40, 'CashmereWrap', 'Accesorio', 'http://localhost:5000/images/bufanda-cashmere-larga.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:49:06.903402'),
(109, 'Pañuelo de Seda Estampado', 'Pañuelo de seda con estampado colorido, versátil para cabello o cuello.', 25000.00, 60, 'SilkArt', 'Accesorio', 'http://localhost:5000/images/panuelo-seda-estampado.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:49:06.903402'),
(110, 'Bufanda de Punto Infinito', 'Bufanda de punto con diseño infinito, fácil de usar y muy cálida.', 35000.00, 50, 'InfinityKnit', 'Accesorio', 'http://localhost:5000/images/bufanda-punto-infinito.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:49:06.903402'),
(111, 'Foulard de Lino Ligero', 'Foulard de lino ligero, perfecto para climas cálidos y como accesorio.', 28000.00, 45, 'LinenLight', 'Accesorio', 'http://localhost:5000/images/foulard-lino-ligero.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:49:06.903402'),
(112, 'Cinturón de Cuero Clásico', 'Cinturón de cuero genuino con hebilla clásica, esencial.', 40000.00, 55, 'LeatherBuckle', 'Accesorio', 'http://localhost:5000/images/cinturon-cuero-clasico.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:49:06.903402'),
(113, 'Cinturón Trenzado con Hebilla Redonda', 'Cinturón trenzado con hebilla redonda, para un look bohemio.', 32000.00, 48, 'BohoBelt', 'Accesorio', 'http://localhost:5000/images/cinturon-trenzado-hebilla-redonda.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:49:06.903402'),
(114, 'Cinturón Fino con Pedrería', 'Cinturón fino con detalles de pedrería, ideal para vestidos de fiesta.', 48000.00, 30, 'GemBelt', 'Accesorio', 'http://localhost:5000/images/cinturon-fino-pedreria.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:49:06.903402'),
(115, 'Cinturón Ancho Elástico', 'Cinturón ancho elástico con hebilla decorativa, para marcar la cintura.', 29000.00, 40, 'ElasticWaist', 'Accesorio', 'http://localhost:5000/images/cinturon-ancho-elastico.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:49:06.903402'),
(116, 'Gafas de Sol Ojo de Gato', 'Gafas de sol estilo ojo de gato, con montura elegante y protección UV.', 39990.00, 50, 'CatEyeShades', 'Accesorio', 'http://localhost:5000/images/gafas-sol-ojo-gato.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:49:06.903402'),
(117, 'Gafas de Sol Aviador Clásicas', 'Gafas de sol estilo aviador, diseño atemporal y unisex.', 45000.00, 45, 'AviatorCool', 'Accesorio', 'http://localhost:5000/images/gafas-sol-aviador-clasicas.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:49:06.903402'),
(118, 'Gafas de Sol Redondas Vintage', 'Gafas de sol redondas con montura vintage, estilo retro y moderno.', 35000.00, 40, 'RetroRound', 'Accesorio', 'http://localhost:5000/images/gafas-sol-redondas-vintage.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:49:06.903402'),
(119, 'Gafas de Sol Grandes Cuadradas', 'Gafas de sol con montura grande y cuadrada, para un look audaz.', 42000.00, 38, 'BigSquare', 'Accesorio', 'http://localhost:5000/images/gafas-sol-grandes-cuadradas.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:49:06.903402'),
(120, 'Set de Scrunchies de Seda', 'Set de 5 scrunchies de seda, ideales para proteger el cabello.', 15000.00, 100, 'SilkHair', 'Accesorio', 'http://localhost:5000/images/set-scrunchies-seda.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:49:06.903402'),
(121, 'Cinta de Pelo Ancha Turbante', 'Cinta de pelo ancha estilo turbante, para un look chic y cómodo.', 12000.00, 90, 'HeadbandStyle', 'Accesorio', 'http://localhost:5000/images/cinta-pelo-ancha-turbante.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:49:06.903402'),
(122, 'Estuche de Maquillaje de Viaje', 'Estuche compacto de maquillaje, ideal para viajes o el día a día.', 20000.00, 75, 'TravelBeauty', 'Accesorio', 'http://localhost:5000/images/estuche-maquillaje-viaje.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:49:06.903402'),
(123, 'Guantes de Cuero con Forro', 'Guantes de cuero genuino con forro cálido, elegantes para el invierno.', 40000.00, 60, 'LeatherWarm', 'Accesorio', 'http://localhost:5000/images/guantes-cuero-forro.jpg', '2025-06-23 14:21:42.000000', '2025-06-24 16:49:06.903402'),
(124, 'Top Deportivo de Alto Impacto', 'Top deportivo de alto impacto, con buen soporte para entrenamientos.', 35000.00, 50, 'ActiveFit', 'Blusa', 'http://localhost:5000/images/top-deportivo-alto-impacto.jpg', '2025-06-23 14:21:43.000000', '2025-06-24 16:49:06.661216'),
(125, 'Pantalón Jogger de Deporte', 'Pantalón jogger cómodo y transpirable, ideal para el gimnasio o casual.', 45000.00, 40, 'GymComfort', 'Pantalón', 'http://localhost:5000/images/pantalon-jogger-deporte.jpg', '2025-06-23 14:21:43.000000', '2025-06-24 16:49:06.772505'),
(126, 'Camiseta Técnica Dry-Fit', 'Camiseta técnica de secado rápido, perfecta para cualquier actividad física.', 30000.00, 60, 'DryMotion', 'Blusa', 'http://localhost:5000/images/camiseta-tecnica-dry-fit.jpg', '2025-06-23 14:21:43.000000', '2025-06-24 16:49:06.661216'),
(127, 'Conjunto de 2 piezas (Crop Top y Calza)', 'Conjunto deportivo de crop top y calza, elasticado y cómodo.', 70000.00, 35, 'SportyDuo', 'Deportivo', 'http://localhost:5000/images/conjunto-2-piezas-crop-top-calza.jpg', '2025-06-23 14:21:43.000000', '2025-06-24 16:49:06.829913'),
(128, 'Bikini de Dos Piezas', 'Bikini de dos piezas con top bandeau y parte inferior de tiro alto.', 50000.00, 45, 'BeachVibes', 'Ropa de Baño', 'http://localhost:5000/images/bikini-dos-piezas.jpg', '2025-06-23 14:21:43.000000', '2025-06-24 16:45:13.324264'),
(129, 'Traje de Baño Entero con Recortes', 'Traje de baño de una pieza con recortes estratégicos, muy elegante.', 65000.00, 30, 'ElegantSwim', 'Ropa de Baño', 'http://localhost:5000/images/traje-bano-entero-recortes.jpg', '2025-06-23 14:21:43.000000', '2025-06-24 16:45:13.324264'),
(130, 'Tankini Set Estampado', 'Conjunto de tankini estampado con top largo y braguita a juego.', 55000.00, 38, 'TankiniFun', 'Ropa de Baño', 'http://localhost:5000/images/tankini-set-estampado.jpg', '2025-06-23 14:21:43.000000', '2025-06-24 16:45:13.324264'),
(131, 'Bañador de Una Pieza Deportivo', 'Bañador deportivo de una pieza, con buen soporte y resistencia al cloro.', 60000.00, 40, 'SwimPro', 'Ropa de Baño', 'http://localhost:5000/images/banador-una-pieza-deportivo.jpg', '2025-06-23 14:21:43.000000', '2025-06-24 16:45:13.324264');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  `firstName` varchar(50) DEFAULT NULL,
  `lastName` varchar(50) DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `firstName`, `lastName`, `createdAt`, `updatedAt`) VALUES
(1, 'test@email.com', '$2a$10$DjjW0Oy./ypeU/oJGfRg/upDB9JE9u8odw4A1x2tqmCbvezPx4Kmu', NULL, NULL, '2025-06-24 16:55:32.223327', '2025-06-24 16:55:32.223327'),
(2, 'hola@email.com', '$2a$10$QxhRjG1H.VoRW2gKp.WgYuXnPHX0hxskw51QA/guJq4Y9fcF38kW2', NULL, NULL, '2025-06-24 17:46:54.907413', '2025-06-24 17:46:54.907413'),
(3, 'adios@email.com', '$2a$10$i1tRs.CNBVQP4KZ2Ute0xOJTJdkpKLFnxnbsZP0u0qLbXYxwdrLNe', NULL, NULL, '2025-06-24 17:51:15.841547', '2025-06-24 17:51:15.841547'),
(4, 'prueba@email.com', '$2a$10$Cx1ZZjowYxiUxPqMp9taF.bpDIQiPqjbZAMjRaOx9TryLO.OqyM8S', NULL, NULL, '2025-06-24 17:53:51.877250', '2025-06-24 17:53:51.877250');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_69828a178f152f157dcf2f70a89` (`userId`);

--
-- Indices de la tabla `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_2bf7996b7946ce753b60a87468` (`cartId`,`productId`),
  ADD KEY `FK_72679d98b31c737937b8932ebe6` (`productId`);

--
-- Indices de la tabla `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_151b79a83ba240b0cb31b2302d1` (`userId`);

--
-- Indices de la tabla `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_f1d359a55923bb45b057fbdab0d` (`orderId`),
  ADD KEY `FK_cdb99c05982d5191ac8465ac010` (`productId`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_97672ac88f789774dd47f7c8be` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=132;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `FK_69828a178f152f157dcf2f70a89` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Filtros para la tabla `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `FK_72679d98b31c737937b8932ebe6` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_edd714311619a5ad09525045838` FOREIGN KEY (`cartId`) REFERENCES `carts` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Filtros para la tabla `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `FK_151b79a83ba240b0cb31b2302d1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `FK_cdb99c05982d5191ac8465ac010` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_f1d359a55923bb45b057fbdab0d` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
