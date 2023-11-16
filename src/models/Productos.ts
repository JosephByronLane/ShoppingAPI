import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    BaseEntity,
    UpdateDateColumn,
    CreateDateColumn,
    OneToMany,
    OneToOne
} from 'typeorm';
import { DetalladoCompras } from './DetalladoCompras';
@Entity('productos')
export class Productos extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    nombre: string;

    @Column('text', { nullable: true })
    descripcion: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    precio: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    categoria: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    fabricante: string;

    @Column('int', { nullable: false, default: 0})
    cantidad_en_existencia: number;

    @Column({ type: 'varchar', length: 50, nullable: true })
    unidad_de_medida: string;

    @CreateDateColumn()
    fecha_de_creacion: Date;

    @Column({ type: 'varchar', length: 255, nullable: true })
    usuario_de_creacion: string;

    @UpdateDateColumn()
    fecha_de_actualizacion: Date;

    @Column({ type: 'varchar', length: 255, nullable: true })
    usuario_de_actualizacion: string;

    @Column('tinyint', { nullable: true })
    activo: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    extra2: string;

    @OneToOne(() => DetalladoCompras, detalladoCompras => detalladoCompras.producto)
    detalleCompra: DetalladoCompras; // Only if you have a bidirectional relationship
}