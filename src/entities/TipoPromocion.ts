import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tipopromocion')
export class TipoPromocion {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    Promocion: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    Descripcion: string;

}