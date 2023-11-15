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
idQuiz int primary key,
tipo varchar(45)
);


/* não irei usar essa tabela, farei as questoes no proprio vetor
create table Questoes (
idQuestoes int primary key,
descricao varchar(100),
opcoes varchar(1),
fkQuizQuestoes int, constraint fkQuizQuestoes foreign key (fkQuizQuestoes) references Quiz(idQuiz)
);
*/

create table Feedback (
idFeedback int primary key auto_increment,
comentario varchar(260),
nota varchar(10)
);

create table Tentativa (
idTentativa int auto_increment,
fkQuiz int,
fkUsuario int,
PRIMARY KEY (idTentativa, fkQuiz, fkUsuario),
fkFeedback int, constraint fkFeedback foreign key (fkFeedback) references Feedback(idFeedback),
qtd_acertos varchar(45)
);



select * from Usuario;




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
