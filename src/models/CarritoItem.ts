import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Productos } from './Productos';
import { Usuario } from './Usuario';


@Entity('carrito')
export class CarritoItem extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Productos, producto => producto.carritoItems)
    producto: Productos;

    @Column()
    quantity: number;

    @ManyToOne(() => Usuario, usuario => usuario.carrito)
    usuario: Usuario;
}

//@OneToOne(()=> Carrito, carrito => carrito.usuario)
