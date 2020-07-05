CREATE table tbl_user(
id int AUTO_INCREMENT,
nombre varchar (60) not null,
    apellido varchar (60) not null,
    telefono varchar (10) not null,
    email varchar (60) not null,
    fechaNacimiento date,
    fechaRegistro timestamp,
    PRIMARY KEY(id)
)