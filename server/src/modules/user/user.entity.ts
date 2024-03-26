import { Column, Entity, ManyToOne } from 'typeorm'
import { AbstractEnetity } from 'src/common/abstract.entity'
import { RoleEntity } from '../role/role.entity';
import { FirmEntity } from '../firm/firm.entity';

@Entity({ name: 'users' })
export class UserEntity extends AbstractEnetity {
  @Column({ type:'int', comment:'序号' })
  num: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ type:'tinyint', comment:'年龄' })
  age:number;

  @Column({ type: "tinyint", default:1, comment:'性别: 1男  2女' })
  gender:number;

  @Column({ type: "varchar", comment:'手机号码' })
  phone:string;

  @Column({ type: "varchar", comment:'班级' })
  grade:string;

  @Column({ type: "varchar", comment:'城市' })
  province:string;

  @Column({ comment:'学校' })
  school:string;

  @Column({ type: "tinyint", default:1, comment:'账号类别:1个人  2机构' })
  type:number;

  @Column({ type:'varchar', nullable:true, comment:'设备id' })
  deviceid:string;

  @Column({ type:'tinyint', default:1, comment:'账号状态:1 停用 2 启用，默认停用' })
  status:number;

  @ManyToOne(() => FirmEntity, (firm)=>firm.user)
  firm:FirmEntity

  @ManyToOne(() => RoleEntity, (role)=>role.user)
  role:RoleEntity
}
