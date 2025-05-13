import {Column, PrimaryGeneratedColumn, Entity, OneToMany, UpdateDateColumn,CreateDateColumn, BaseEntity, OneToOne, JoinTable} from 'typeorm'

import { Compras } from './Compras';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

@Entity('usuario')
export class Usuario extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @IsString()
    @Column({ type: 'varchar', length: 255, nullable: true })
    nombre: string;
    
    @IsNotEmpty()
    @IsEmail()
    @Column({ type: 'varchar', length: 255, nullable: true, unique: true})
    correo_electronico: string;

    @Length(5,255)
    @Column({ type: 'varchar', length: 255, nullable: true })
    contrasenia: string;

    @CreateDateColumn({ type: 'datetime', nullable: true })
    fecha_de_creacion: Date;

    @Column({ type: 'varchar', length: 255, nullable: true })
    usuario_de_creacion: string;

    @UpdateDateColumn({ type: 'datetime', nullable: true })
    fecha_de_actualizacion: Date;

    @Column({ type: 'varchar', length: 255, nullable: true })
    usuario_de_actualizacion: string;

    @Column({ type: 'tinyint', nullable: true, default:true})
    activo: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    extra1: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    extra2: string;

    @OneToMany(() => Compras, compras => compras.usuario)
    compras: Compras[];

}