-- Crie uma tabela temporária para armazenar números de 0 a 23 (representando as horas do dia)
use onbus_data;
CREATE TEMPORARY TABLE IF NOT EXISTS numeros (numero INT);
INSERT INTO numeros (numero) VALUES (0),(1),(2),(3),(4),(5),(6),(7),(8),(9),(10),(11),(12),(13),(14),(15),(16),(17),(18),(19),(20),(21),(22),(23);

-- Crie as viagens aleatórias com duração de 30 minutos
INSERT INTO viagem (inicio, duracao, onibus_id, motorista_id, linha_id)
SELECT
  TIMESTAMP(DATE(NOW()), '00:00:00') + INTERVAL numero * 30 MINUTE AS inicio,
  TIMESTAMP(DATE(NOW()), '00:00:00') + INTERVAL numero * 30 + 30 MINUTE AS duracao,
  (
    SELECT id_onibus FROM onibus ORDER BY RAND() LIMIT 1
  ) AS onibus_id,
  (
    SELECT id_motorista FROM motorista ORDER BY RAND() LIMIT 1
  ) AS motorista_id,
  (
    SELECT id_linha FROM linha ORDER BY RAND() LIMIT 1
  ) AS linha_id
FROM numeros
WHERE EXISTS (SELECT 1 FROM onibus WHERE id_onibus = (SELECT id_onibus FROM onibus ORDER BY RAND() LIMIT 1));  -- Garante que o ID do ônibus existe

-- Exclua a tabela temporária quando não for mais necessária
DROP TEMPORARY TABLE IF EXISTS numeros;

-- Visualize os dados inseridos
SELECT * FROM viagem;