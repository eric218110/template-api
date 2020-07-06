import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export abstract class MainEntity {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  protected createdIn: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  protected updatedIn: string;
}
