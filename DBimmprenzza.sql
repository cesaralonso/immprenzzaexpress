-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema immprenzza
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema immprenzza
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `immprenzza` DEFAULT CHARACTER SET utf8 ;
USE `immprenzza` ;

-- -----------------------------------------------------
-- Table `immprenzza`.`persona`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `immprenzza`.`persona` (
  `idPersona` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL DEFAULT NULL,
  `edad` INT(11) NULL DEFAULT NULL,
  `sexo` VARCHAR(15) NULL DEFAULT NULL,
  `RFC` VARCHAR(45) NULL DEFAULT NULL,
  `telefono` INT(11) NULL DEFAULT NULL,
  `domicilio` VARCHAR(60) NULL DEFAULT NULL,
  `baja` TINYINT(1) NULL DEFAULT NULL,
  `created_by` INT(11) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`idPersona`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `immprenzza`.`cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `immprenzza`.`cliente` (
  `idCliente` INT(11) NOT NULL AUTO_INCREMENT,
  `Persona_idPersona` INT(11) NOT NULL,
  `baja` TINYINT(1) NULL DEFAULT NULL,
  `created_by` INT(11) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`idCliente`),
  INDEX `fk_Cliente_Persona1_idx` (`Persona_idPersona` ASC),
  CONSTRAINT `fk_Cliente_Persona1`
    FOREIGN KEY (`Persona_idPersona`)
    REFERENCES `immprenzza`.`persona` (`idPersona`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `immprenzza`.`orden`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `immprenzza`.`orden` (
  `idOrden` INT(11) NOT NULL AUTO_INCREMENT,
  `factura` TINYINT(4) NULL DEFAULT NULL,
  `fecha` DATETIME NULL DEFAULT NULL,
  `status_avance` VARCHAR(25) NULL DEFAULT NULL,
  `status_pago` VARCHAR(25) NULL DEFAULT NULL,
  `subtotal` INT(11) NULL DEFAULT NULL,
  `total` INT(11) NULL DEFAULT NULL,
  `iva` INT(11) NULL DEFAULT NULL,
  `deuda` INT(11) NULL DEFAULT NULL,
  `f_limite` DATETIME NULL DEFAULT NULL,
  `Cliente_idCliente` INT(11) NOT NULL,
  `baja` TINYINT(1) NULL DEFAULT NULL,
  `created_by` INT(11) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`idOrden`),
  INDEX `fk_Orden_Cliente1_idx` (`Cliente_idCliente` ASC),
  CONSTRAINT `fk_Orden_Cliente1`
    FOREIGN KEY (`Cliente_idCliente`)
    REFERENCES `immprenzza`.`cliente` (`idCliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `immprenzza`.`abono`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `immprenzza`.`abono` (
  `idAbono` INT(11) NOT NULL AUTO_INCREMENT,
  `cantidadAbonada` INT(11) NULL DEFAULT NULL,
  `fecha` DATETIME NULL DEFAULT NULL,
  `cantidadRestante` INT(11) NULL DEFAULT NULL,
  `Orden_idOrden` INT(11) NOT NULL,
  `baja` TINYINT(1) NULL DEFAULT NULL,
  `created_by` INT(11) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`idAbono`),
  INDEX `fk_Abono_Orden1_idx` (`Orden_idOrden` ASC),
  CONSTRAINT `fk_Abono_Orden1`
    FOREIGN KEY (`Orden_idOrden`)
    REFERENCES `immprenzza`.`orden` (`idOrden`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `immprenzza`.`puesto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `immprenzza`.`puesto` (
  `idPuesto` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL DEFAULT NULL,
  `baja` TINYINT(1) NULL DEFAULT NULL,
  `created_by` INT(11) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`idPuesto`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `immprenzza`.`personal`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `immprenzza`.`personal` (
  `idPersonal` INT(11) NOT NULL AUTO_INCREMENT,
  `f_ingreso` DATETIME NULL DEFAULT NULL,
  `nomina` INT(11) NULL DEFAULT NULL,
  `frec_nomina` VARCHAR(30) NULL DEFAULT NULL,
  `Persona_idPersona` INT(11) NOT NULL,
  `Puesto_idPuesto` INT(11) NOT NULL,
  `baja` TINYINT(1) NULL DEFAULT NULL,
  `created_by` INT(11) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`idPersonal`),
  INDEX `fk_Personal_Persona1_idx` (`Persona_idPersona` ASC),
  INDEX `fk_Personal_Puesto1_idx` (`Puesto_idPuesto` ASC),
  CONSTRAINT `fk_Personal_Persona1`
    FOREIGN KEY (`Persona_idPersona`)
    REFERENCES `immprenzza`.`persona` (`idPersona`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Personal_Puesto1`
    FOREIGN KEY (`Puesto_idPuesto`)
    REFERENCES `immprenzza`.`puesto` (`idPuesto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `immprenzza`.`checkout`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `immprenzza`.`checkout` (
  `idCheckout` INT(11) NOT NULL AUTO_INCREMENT,
  `entrada` DATETIME NULL DEFAULT NULL,
  `salida` DATETIME NULL DEFAULT NULL,
  `tiempo_trabajado` INT(11) NULL DEFAULT NULL,
  `Personal_idPersonal` INT(11) NOT NULL,
  `baja` TINYINT(1) NULL DEFAULT NULL,
  `created_by` INT(11) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`idCheckout`),
  INDEX `fk_Checkout_Personal1_idx` (`Personal_idPersonal` ASC),
  CONSTRAINT `fk_Checkout_Personal1`
    FOREIGN KEY (`Personal_idPersonal`)
    REFERENCES `immprenzza`.`personal` (`idPersonal`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `immprenzza`.`modulo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `immprenzza`.`modulo` (
  `idModulo` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL DEFAULT NULL,
  `baja` TINYINT(1) NULL DEFAULT NULL,
  `created_by` INT(11) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`idModulo`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `immprenzza`.`rol`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `immprenzza`.`rol` (
  `idRol` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL DEFAULT NULL,
  `baja` TINYINT(1) NULL DEFAULT NULL,
  `created_by` INT(11) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`idRol`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `immprenzza`.`permiso`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `immprenzza`.`permiso` (
  `idPermiso` INT(11) NOT NULL AUTO_INCREMENT,
  `acceso` TINYINT(4) NULL DEFAULT NULL,
  `Rol_idRol` INT(11) NOT NULL,
  `Modulo_idModulo` INT(11) NOT NULL,
  `baja` TINYINT(1) NULL DEFAULT NULL,
  `created_by` INT(11) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`idPermiso`),
  INDEX `fk_Permiso_Rol1_idx` (`Rol_idRol` ASC),
  INDEX `fk_Permiso_Modulo1_idx` (`Modulo_idModulo` ASC),
  CONSTRAINT `fk_Permiso_Modulo1`
    FOREIGN KEY (`Modulo_idModulo`)
    REFERENCES `immprenzza`.`modulo` (`idModulo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Permiso_Rol1`
    FOREIGN KEY (`Rol_idRol`)
    REFERENCES `immprenzza`.`rol` (`idRol`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `immprenzza`.`tipotrabajo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `immprenzza`.`tipotrabajo` (
  `idTipoTrabajo` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(60) NULL DEFAULT NULL,
  `costo` INT(11) NULL DEFAULT NULL,
  `baja` TINYINT(1) NULL DEFAULT NULL,
  `created_by` INT(11) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`idTipoTrabajo`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `immprenzza`.`trabajo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `immprenzza`.`trabajo` (
  `idTrabajo` INT(11) NOT NULL AUTO_INCREMENT,
  `cantidad` INT(11) NULL DEFAULT NULL,
  `archivo` VARCHAR(150) NULL DEFAULT NULL,
  `foto` VARCHAR(150) NULL DEFAULT NULL,
  `f_entregaEsperada` DATETIME NULL DEFAULT NULL,
  `f_entregaReal` DATETIME NULL DEFAULT NULL,
  `status` VARCHAR(25) NULL DEFAULT NULL,
  `especificaciones` VARCHAR(150) NULL DEFAULT NULL,
  `f_recibe` DATETIME NULL DEFAULT NULL,
  `total` INT(11) NULL DEFAULT NULL,
  `Personal_idPersonal` INT(11) NOT NULL,
  `TipoTrabajo_idTipoTrabajo` INT(11) NOT NULL,
  `Orden_idOrden` INT(11) NOT NULL,
  `baja` TINYINT(1) NULL DEFAULT NULL,
  `created_by` INT(11) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`idTrabajo`),
  INDEX `fk_Trabajo_Personal1_idx` (`Personal_idPersonal` ASC),
  INDEX `fk_Trabajo_TipoTrabajo1_idx` (`TipoTrabajo_idTipoTrabajo` ASC),
  INDEX `fk_Trabajo_Orden1_idx` (`Orden_idOrden` ASC),
  CONSTRAINT `fk_Trabajo_Orden1`
    FOREIGN KEY (`Orden_idOrden`)
    REFERENCES `immprenzza`.`orden` (`idOrden`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Trabajo_Personal1`
    FOREIGN KEY (`Personal_idPersonal`)
    REFERENCES `immprenzza`.`personal` (`idPersonal`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Trabajo_TipoTrabajo1`
    FOREIGN KEY (`TipoTrabajo_idTipoTrabajo`)
    REFERENCES `immprenzza`.`tipotrabajo` (`idTipoTrabajo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `immprenzza`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `immprenzza`.`user` (
  `idUser` INT(11) NOT NULL AUTO_INCREMENT,
  `usuario` VARCHAR(45) NULL DEFAULT NULL,
  `password` VARCHAR(45) NULL DEFAULT NULL,
  `Rol_idRol` INT(11) NOT NULL,
  `baja` TINYINT(1) NULL DEFAULT NULL,
  `created_by` INT(11) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`idUser`),
  INDEX `fk_User_Rol_idx` (`Rol_idRol` ASC),
  CONSTRAINT `fk_User_Rol`
    FOREIGN KEY (`Rol_idRol`)
    REFERENCES `immprenzza`.`rol` (`idRol`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
