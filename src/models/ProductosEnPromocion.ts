import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Productos } from './Productos';
import { TipoPromocion } from './TipoPromocion';

@Entity('productosenpromocion')
export class ProductosEnPromocion {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    nombre: string;

    @Column({ type: 'text', nullable: true })
    descripcion: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    precio_en_promocion: number;

    @Column({ type: 'datetime', nullable: true })
    fecha_de_inicio: Date;

    @Column({ type: 'datetime', nullable: true })
    fecha_de_finalizacion: Date;

    @Column({ type: 'tinyint', nullable: true })
    activo: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    extra1: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    extra2: string;

    @ManyToOne(() => Productos)
    @JoinColumn({ name: 'producto_id' })
    producto: Productos;

    @ManyToOne(() => TipoPromocion)
    @JoinColumn({ name: 'promocion_id' })
    promocion: TipoPromocion;

}

