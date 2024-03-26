import { Column, Entity,OneToMany } from 'typeorm'
import { AbstractEnetity } from 'src/common/abstract.entity'

@Entity({ name: 'trains' })
export class TrainEntity extends AbstractEnetity {
  @Column()
  name: string;
  @Column()
  cover: string;
  @Column()
  intro: string;
  @Column()
  type: number;
}
