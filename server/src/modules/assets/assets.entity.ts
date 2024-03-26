import { Column, Entity } from 'typeorm'
import { AbstractEnetity } from 'src/common/abstract.entity'

@Entity({ name: 'assets' })
export class AssetsEntity extends AbstractEnetity {
  @Column()
  type: number;
  @Column()
  name: string;
  @Column()
  url: string;
  @Column()
  train:number
  @Column()
  pid: number;
}
