import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Usuarios } from './Usuarios';

@Entity('compras')
export class Compras {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', nullable: true })
    descripcion: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    nombre_del_cliente: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    precio_total: number;

    @Column({ type: 'int', nullable: true })
    total_de_productos: number;

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

    @ManyToOne(() => Usuarios, usuario => usuario.compras)
    usuario: Usuarios;

}
