drop database if exists waysafe;
create database if not exists waysafe;
use waysafe;
SET foreign_key_checks = 0;
-- =========================================
-- CRIAÇÃO DAS TABELAS DO BANCO DE ACIDENTES
-- =========================================

-- Tabela EMPRESA
CREATE TABLE EMPRESA (
    idEMPRESA INT AUTO_INCREMENT PRIMARY KEY,
    CNPJ CHAR(14),
    CEP CHAR(8),
    complemento VARCHAR(45),
    NOME VARCHAR(45) NOT NULL,
    EMAIL VARCHAR(45),
    TELEFONE CHAR(11)
);

-- Tabela USUARIO
CREATE TABLE USUARIO (
    idUSUARIO INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(45) NOT NULL,
    senha VARCHAR(256) NOT NULL,
    nome varchar(45),
    fk_empresa INT,
    FOREIGN KEY (fk_empresa) REFERENCES EMPRESA(idEMPRESA)
);

-- Tabela RODOVIAS
CREATE TABLE RODOVIAS (
    idRODOVIAS INT AUTO_INCREMENT PRIMARY KEY,
    rodovia_cod_numeric VARCHAR(45) NOT NULL
);

-- Tabela classe_acidente
CREATE TABLE classe_acidente (
    idClasse_acid INT AUTO_INCREMENT PRIMARY KEY,
    descr VARCHAR(45) NOT NULL
);

-- Tabela ACIDENTE
CREATE TABLE ACIDENTE (
    idACIDENTE INT AUTO_INCREMENT PRIMARY KEY,
    fk_rodovias INT,
    fk_classe_acid INT,
    fk_empresa INT,
    data_hora DATETIME NOT NULL,
    tipo_acidente VARCHAR(45),
    metereologia VARCHAR(45),
    visibilidade VARCHAR(45),
    denominacao VARCHAR(45),
    municipio VARCHAR(45),
    regional_der VARCHAR(45),
    jurisdicao VARCHAR(45),
    latitude VARCHAR(45),
    longitude VARCHAR(45),
    FOREIGN KEY (fk_rodovias) REFERENCES RODOVIAS(idRODOVIAS),
    FOREIGN KEY (fk_classe_acid) REFERENCES classe_acidente(idClasse_acid),
    FOREIGN KEY (fk_empresa) REFERENCES EMPRESA(idEMPRESA)
);

-- Tabela VITIMAS
CREATE TABLE VITIMAS (
    fk_acidente INT PRIMARY KEY,
    vitima_ilesa INT,
    vitima_fatal INT,
    vitima_fer_leve INT,
    vitima_fer_media INT,
    vitima_fer_grave INT,
    vitimas_fer_seminfo INT,
    FOREIGN KEY (fk_acidente) REFERENCES ACIDENTE(idACIDENTE)
);

CREATE TABLE LOG(
	idLog INT PRIMARY KEY auto_increment,
	status Varchar(7) NOT NULL ,
    mensagem VARCHAR(255) NOT NULL,
    horario datetime default current_timestamp,
    arquivo varchar(100),
    constraint chk_log check(Status IN ("Sucesso","Erro"))
    );
    
    -- insert into LOG(status,mensagem) values ("Sucesso","Rolou isso");

    

-- INSERT INTO ACIDENTE (
--     fk_rodovias,
--     fk_classe_acid,
--     fk_empresa,
--     data_hora,
--     tipo_acidente,
--     metereologia,
--     visibilidade,
--    denominacao,
--     municipio,
--     reginal_der,
--     jurisdicao,
--     latitude,
--     longitude
-- ) VALUES
-- (1, 1, 1, '2024-10-05', 'Colisão Frontal', 'Chuva Leve', 'Boa', 'SP-330 - Km 50', 'Campinas', 'DER-SP', 'Estadual', '-22.9099', '-47.0626'),
-- (1, 1, 1, '2024-11-10', 'Atropelamento', 'Céu Claro', 'Boa', 'SP-330 - Km 80', 'Limeira', 'DER-SP', 'Estadual', '-22.5611', '-47.4017');


-- select * from acidente where idACIDENTE=202519180;
-- select * from vitimas where fk_acidente=202519180;

-- INSERT INTO VITIMAS (
--     fk_acidente,
--     vitima_ilesa,
--     vitima_fatal,
--     vitima_fer_leve,
--     vitima_fer_media,
--     vitima_fer_grave
-- ) VALUES
-- (1, 2, 0, 1, 0, 1),
-- (2, 0, 1, 0, 0, 0);





