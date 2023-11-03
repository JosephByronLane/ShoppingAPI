import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import { Usuario } from './Usuario';

@Entity('productos')
export class Productos {

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

    @Column('int', { nullable: true })
    cantidad_en_existencia: number;

    @Column({ type: 'varchar', length: 50, nullable: true })
    unidad_de_medida: string;

    @Column('datetime', { nullable: true })
    fecha_de_creacion: Date;

    @Column({ type: 'varchar', length: 255, nullable: true })
    usuario_de_creacion: string;

    @Column('datetime', { nullable: true })
    fecha_de_actualizacion: Date;

    @Column({ type: 'varchar', length: 255, nullable: true })
    usuario_de_actualizacion: string;

    @Column('tinyint', { nullable: true })
    activo: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    extra1: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    extra2: string;

    @ManyToOne(() => Usuario)
    @JoinColumn({ name: 'id_usuario' })
    usuario: Usuario;
}