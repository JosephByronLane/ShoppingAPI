import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Productos } from './Productos';
import { Usuario } from './Usuario';


@Entity('carrito')
export class Carrito extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Productos)
    producto: Productos;

    @Column()
    quantity: number;

    @ManyToOne(() => Usuario)
    usuario: Usuario;
}