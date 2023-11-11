import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from 'typeorm';
import { Compras } from './Compras';
import { Productos } from './Productos';

@Entity('detallado_compras')
export class DetalladoCompras extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', nullable: true })
    cantidad: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    precio_total: number;

    @Column({ type: 'datetime', nullable: true })
    fecha_de_creacion: Date;

    @Column({ type: 'varchar', length: 255, nullable: true })
    usuario_de_creacion: string;

    @Column({ type: 'datetime', nullable: true })
    fecha_de_actualizacion: Date;

    @Column({ type: 'varchar', length: 255, nullable: true })
    usuario_de_actualizacion: string;

    @Column({ type: 'tinyint', nullable: true })
    activo: number;

    @ManyToOne(() => Compras, compra => compra.id)
    compra: Compras;

    @ManyToOne(() => Productos, producto => producto.id)
    producto: Productos;

}

