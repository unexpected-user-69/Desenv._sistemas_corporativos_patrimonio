import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

/**
 * Entity simplificada de Patrimonio para o Events Service.
 * 
 * Por enquanto, mantemos referência direta ao banco compartilhado.
 * No futuro, quando Patrimonio Service for criado, esta entity será removida
 * e substituída por HTTP client.
 */
@Entity({ name: 'patrimonios' })
export class Patrimonio {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id!: string;

  @Column({ name: 'codigo', type: 'varchar', length: 50 })
  codigo!: string;

  @Column({ name: 'nome', type: 'varchar', length: 255 })
  nome!: string;
}





