import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Productos } from './Productos';
import { Usuario } from './Usuario';
import { DetalladoCompras } from './DetalladoCompras';

@Entity('carritoitem')
export class CarritoItem extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number;

    @ManyToOne(() => DetalladoCompras, detalladoCompras => detalladoCompras.carritoItems)
    carrito: DetalladoCompras;

    @ManyToOne(() => Productos, producto => producto.carritoItems)
    producto: Productos;
}

//@OneToOne(()=> Carrito, carrito => carrito.usuario)
