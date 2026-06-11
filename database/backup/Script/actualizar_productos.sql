-- Script SQL para actualizar productos de "El Mundo de Mery"
-- Este script reemplaza todos los productos, categorías y tamaños
-- Actualizado: 07-06-2026

SET FOREIGN_KEY_CHECKS=0;

-- 1. Eliminar todos los datos existentes
DELETE FROM product_sizes;
DELETE FROM products;
DELETE FROM categories;
DELETE FROM size;

-- 2. Insertar categorías con label en mayúsculas
INSERT INTO categories (id_category, name, description, image_url, label, event_status) VALUES
(1, 'Dijes', 'Pequeñas piezas de cerámica decorativas ideales para colgar o coleccionar.', '/categorias/Dijes/Aguila%20Calva.png', 'DIJES', 1),
(2, 'Minis', 'Figuras de cerámica en miniatura con detalles artesanales únicos.', '/categorias/Minis/Chirimoya.png', 'MINIS', 1),
(3, 'Pulgas', 'Piezas pequeñas de cerámica con diseños creativos y divertidos.', '/categorias/Pulgas/C%C3%B3ndor%20Andino.png', 'PULGAS', 1),
(4, 'Small', 'Figuras de cerámica de tamaño mediano perfectas para decorar.', '/categorias/Small/Delf%C3%ADn%20Zafiro.png', 'SMALL', 1),
(5, 'Super Small', 'Las piezas más pequeñas de nuestra colección, ideales para regalos.', '/categorias/Super%20Small/Caballo%20Pucará%20Rojo.jpg', 'SUPER SMALL', 1);

-- 3. Insertar tamaños (sizes)
INSERT INTO size (id_size, name, dimension) VALUES
(1, 'Dije', '1x1 cm'),
(2, 'Mini', '1.5x1.5 cm'),
(3, 'Pulga', '2x2 cm'),
(4, 'Small', '3x3 cm'),
(5, 'Super Small', '4x4 cm');

-- 4. Insertar productos (30 productos, 6 por categoría)

-- Categoría 1: Dijes (6 productos)
INSERT INTO products (id_product, name, image_url, price, stock, status, id_category) VALUES
(1, 'Dije Águila Calva', '/categorias/Dijes/Aguila%20Calva.png', 15.00, 25, 1, 1),
(2, 'Dije Búho Coral', '/categorias/Dijes/B%C3%BAho%20Coral.png', 15.00, 30, 1, 1),
(3, 'Dije Búho Graduado', '/categorias/Dijes/B%C3%BAho%20Graduado.png', 15.00, 20, 1, 1),
(4, 'Dije Foca Costera', '/categorias/Dijes/Foca%20Costera.png', 15.00, 22, 1, 1),
(5, 'Dije Jaguar Ámbar', '/categorias/Dijes/Jaguar%20%C3%81mbar.png', 18.00, 18, 1, 1),
(6, 'Dije Tigre Imperial', '/categorias/Dijes/Tigre%20Imperial.png', 18.00, 15, 1, 1);

-- Categoría 2: Minis (6 productos)
INSERT INTO products (id_product, name, image_url, price, stock, status, id_category) VALUES
(7, 'Mini Chirimoya', '/categorias/Minis/Chirimoya.png', 25.00, 15, 1, 2),
(8, 'Mini Fresa', '/categorias/Minis/Fresa.png', 25.00, 12, 1, 2),
(9, 'Mini Manzana', '/categorias/Minis/Manzana.png', 28.00, 10, 1, 2),
(10, 'Mini Naranja', '/categorias/Minis/Naranja.png', 28.00, 14, 1, 2),
(11, 'Mini Pera', '/categorias/Minis/Pera.png', 25.00, 18, 1, 2),
(12, 'Mini Sandía', '/categorias/Minis/Sandia.png', 30.00, 10, 1, 2);

-- Categoría 3: Pulgas (6 productos)
INSERT INTO products (id_product, name, image_url, price, stock, status, id_category) VALUES
(13, 'Pulga Cóndor Andino', '/categorias/Pulgas/C%C3%B3ndor%20Andino.png', 35.00, 20, 1, 3),
(14, 'Pulga Conejo de Pascua', '/categorias/Pulgas/Conejo%20de%20Pascua.png', 35.00, 18, 1, 3),
(15, 'Pulga Delfín Perla Azul', '/categorias/Pulgas/Delf%C3%ADn%20Perla%20Azul.png', 38.00, 15, 1, 3),
(16, 'Pulga Gato Marfil', '/categorias/Pulgas/Gato%20Marfil.png', 38.00, 12, 1, 3),
(17, 'Pulga Pez Esmeralda', '/categorias/Pulgas/Pez%20Esmeralda.png', 35.00, 16, 1, 3),
(18, 'Pulga Ratón Nevado', '/categorias/Pulgas/Rat%C3%B3n%20Nevado.png', 32.00, 20, 1, 3);

-- Categoría 4: Small (6 productos)
INSERT INTO products (id_product, name, image_url, price, stock, status, id_category) VALUES
(19, 'Small Delfín Zafiro', '/categorias/Small/Delf%C3%ADn%20Zafiro.png', 55.00, 10, 1, 4),
(20, 'Small Flamengo Rosa del Trópico', '/categorias/Small/Flamengo%20Rosa%20del%20Tr%C3%B3pico.png', 58.00, 8, 1, 4),
(21, 'Small Llama Tradicional', '/categorias/Small/Llama%20Tradicional.png', 55.00, 12, 1, 4),
(22, 'Small Lobo Marino Ámbar', '/categorias/Small/Lobo%20Marino%20%C3%81mbar.png', 60.00, 10, 1, 4),
(23, 'Small Pez Palometa Dorado', '/categorias/Small/Pez%20Palometa%20Dorado.png', 58.00, 9, 1, 4),
(24, 'Small Vaca Lola', '/categorias/Small/Vaca%20Lola.png', 52.00, 14, 1, 4);

-- Categoría 5: Super Small (6 productos)
INSERT INTO products (id_product, name, image_url, price, stock, status, id_category) VALUES
(25, 'Super Small Caballo Pucará Rojo', '/categorias/Super%20Small/Caballo%20Pucará%20Rojo.jpg', 75.00, 6, 1, 5),
(26, 'Super Small Casa de Belén', '/categorias/Super%20Small/Casa%20de%20Bel%C3%A9n.jpg', 78.00, 5, 1, 5),
(27, 'Super Small Celebración Celestial', '/categorias/Super%20Small/Celebraci%C3%B3n%20Celestial.jpg', 80.00, 4, 1, 5),
(28, 'Super Small Ekeko de la Abundancia', '/categorias/Super%20Small/Ekeko%20de%20la%20Abundancia.png', 82.00, 6, 1, 5),
(29, 'Super Small Ekeko de la Prosperidad', '/categorias/Super%20Small/Ekeko%20de%20la%20Prosperidad.png', 75.00, 7, 1, 5),
(30, 'Super Small Llama Acuática', '/categorias/Super%20Small/Llama%20Acu%C3%A1tica.jpg', 72.00, 8, 1, 5);

-- 5. Insertar relaciones product_sizes (cada producto con su tamaño correspondiente)

-- Dijes (tamaño 1: Dije)
INSERT INTO product_sizes (id_product, id_size) VALUES
(1, 1), (2, 1), (3, 1), (4, 1), (5, 1), (6, 1);

-- Minis (tamaño 2: Mini)
INSERT INTO product_sizes (id_product, id_size) VALUES
(7, 2), (8, 2), (9, 2), (10, 2), (11, 2), (12, 2);

-- Pulgas (tamaño 3: Pulga)
INSERT INTO product_sizes (id_product, id_size) VALUES
(13, 3), (14, 3), (15, 3), (16, 3), (17, 3), (18, 3);

-- Small (tamaño 4: Small)
INSERT INTO product_sizes (id_product, id_size) VALUES
(19, 4), (20, 4), (21, 4), (22, 4), (23, 4), (24, 4);

-- Super Small (tamaño 5: Super Small)
INSERT INTO product_sizes (id_product, id_size) VALUES
(25, 5), (26, 5), (27, 5), (28, 5), (29, 5), (30, 5);

SET FOREIGN_KEY_CHECKS=1;