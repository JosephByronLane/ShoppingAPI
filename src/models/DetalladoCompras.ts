import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToOne, JoinTable, JoinColumn } from 'typeorm';
import { Compras } from './Compras';
import { Productos } from './Productos';
import { IsNotEmpty, IsNumber } from 'class-validator';


@Entity('detallado_compras')
export class DetalladoCompras extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @IsNumber()
    @Column({ type: 'int', default: 0 })
    cantidad: number;
    
    @CreateDateColumn({ type: 'datetime', nullable: true })
    fecha_de_creacion: Date;

    @Column({ type: 'varchar', length: 255, nullable: true })
    usuario_de_creacion: string;

    @UpdateDateColumn({ type: 'datetime', nullable: true })
    fecha_de_actualizacion: Date;

    @ManyToOne(() => Compras)
    @JoinColumn()
    compra: Compras;

    @ManyToOne(() => Productos)
    @JoinColumn()
    producto: Productos;
}

