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
qtd_acertos int,
PRIMARY KEY (idTentativa, fkQuiz, fkUsuario)
);

-- inserindo os dados --

insert into Quiz value
(1);

insert into Usuario (nome, email, senha) values
('Rayssa', 'rayssa@sptech.school', 'Rayssa7173@');

insert into tentativa (fkQuiz, fkUsuario, qtd_acertos) values
(1,2,19);

insert into feedback (idFeedback, comentario, nota) values
(null, "Maravilha, acertou quase todas!", 19);


select * from usuario;
select * from tentativa ;

select * from tentativa; select distinct tentativa.fkUsuario,max(qtd_acertos) maximo, usuario.nome 
from Tentativa join Usuario on Usuario.idUsuario = Tentativa.fkUsuario
group by tentativa.fkUsuario order by maximo desc;


select usuario.idUsuario, usuario.nome, usuario.email, tentativa.* from tentativa
join usuario on tentativa.fkUsuario = usuario.idUsuario where tentativa.qtd_acertos = (select max(qtd_acertos) from tentativa);

select usuario.idUsuario, usuario.nome, usuario.email, tentativa.* from tentativa
join usuario on tentativa.fkUsuario = usuario.idUsuario where tentativa.qtd_acertos = (select min(qtd_acertos)from tentativa);


drop database bibliquiz;















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
