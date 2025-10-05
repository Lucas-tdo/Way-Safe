create database waysafe;
use waysafe;
-- =========================================
-- CRIAÇÃO DAS TABELAS DO BANCO DE ACIDENTES
-- =========================================

-- Tabela EMPRESA
CREATE TABLE EMPRESA (
    idEMPRESA INT AUTO_INCREMENT PRIMARY KEY,
    CNPJ CHAR(14) NOT NULL,
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
    senha CHAR(32) NOT NULL,
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
    data_hora DATE NOT NULL,
    tipo_acidente VARCHAR(45),
    metereologia VARCHAR(45),
    visibilidade VARCHAR(45),
    denominacao VARCHAR(45),
    municipio VARCHAR(45),
    reginal_der VARCHAR(45),
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
    FOREIGN KEY (fk_acidente) REFERENCES ACIDENTE(idACIDENTE)
);




