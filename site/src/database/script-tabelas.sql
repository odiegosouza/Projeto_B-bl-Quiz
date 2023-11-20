-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql - banco local - ambiente de desenvolvimento
*/

create database BibliQuiz;

use BibliQuiz;

-- criando as tabelas --

create table Usuario (
idUsuario int primary key auto_increment,
nome varchar(45),
email varchar(45),
senha varchar(45)
);

create table Quiz (
idQuiz int primary key
);

create table Questoes (
idQuestoes int primary key,
descricao varchar(100),
opcoes varchar(100),
fkQuizQuestoes int, constraint fkQuizQuestoes foreign key (fkQuizQuestoes) references Quiz(idQuiz)
);


create table Feedback (
idFeedback int primary key auto_increment,
comentario varchar(260),
nota int
);

create table Tentativa (
idTentativa int auto_increment,
fkQuiz int, constraint fkQuiz foreign key (fkQuiz) references quiz(idquiz),
fkUsuario int, constraint fkusuario foreign key (fkusuario) references usuario(idusuario),
fkFeedback int, constraint fkFeedback foreign key (fkFeedback) references Feedback(idFeedback),
qtd_acertos varchar(45),
PRIMARY KEY (idTentativa, fkQuiz, fkUsuario)
);


-- inserindo os dados --

insert into Quiz value
(1);

insert into Usuario (nome, email, senha) values
('Leonardo Vasconcelos', 'leonardo.paulino@sptech.school', '123456');

select * from Usuario;

INSERT INTO Tentativa VALUES
(null, 1, 1, null, 7);


select usuario.idUsuario,usuario.nome, usuario.email,tentativa.* from Tentativa
join Usuario on Usuario.idUsuario = Tentativa.fkUsuario;


















/*
comandos para criar usuário em banco de dados azure, sqlserver,
com permissão de insert + update + delete + select
*/

-- CREATE USER [usuarioParaAPIWebDataViz_datawriter_datareader]
-- WITH PASSWORD = '#Gf_senhaParaAPIWebDataViz',
-- DEFAULT_SCHEMA = dbo;

-- EXEC sys.sp_addrolemember @rolename = N'db_datawriter',
-- @membername = N'usuarioParaAPIWebDataViz_datawriter_datareader';

-- EXEC sys.sp_addrolemember @rolename = N'db_datareader',
-- @membername = N'usuarioParaAPIWebDataViz_datawriter_datareader';
