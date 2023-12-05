import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { Productos } from './Productos';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

@Entity('productosenpromocion')
export class ProductosEnPromocion extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    nombre: string;

    @IsNotEmpty()
    @IsString()
    @Column({ type: 'text', nullable: true })
    descripcion: string;

    @IsNotEmpty()
    @IsNumber()
    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    precio_en_promocion: number;

    @IsNotEmpty()
    //@IsDate() im  not dealing with this shit lmao
    @Column({ type: 'datetime', nullable: true })
    fecha_de_inicio: Date;

    @IsNotEmpty()
   // @IsDate() im  not dealing with this shit lmao
    @Column({ type: 'datetime', nullable: true })
    fecha_de_finalizacion: Date;

    @Column({ type: 'tinyint', nullable: true, default:1})
    activo: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    extra1: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    extra2: string;

    @ManyToOne(() => Productos)
    @JoinColumn({ name: 'producto_id' })
    producto: Productos;
}

