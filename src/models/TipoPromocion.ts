import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
//-------------------------
//NOT USED
//----------------------------
@Entity('tipopromocion')
export class TipoPromocion extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    Promocion: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    Descripcion: string;

}