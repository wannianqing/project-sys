import { Column, Entity, OneToMany } from 'typeorm'
import { AbstractEnetity } from 'src/common/abstract.entity'
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'firm' })
export class FirmEntity extends AbstractEnetity {
  @Column()
  name: string;
  @Column()
  addr:string;
  @OneToMany(()=>UserEntity,user => user.firm)
  user:UserEntity[]
}
