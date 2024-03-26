import { Column, Entity,OneToMany } from 'typeorm'
import { AbstractEnetity } from 'src/common/abstract.entity'
import { RoleMenuEntity } from '../roleMenu/roleMenu.entity';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'roles' })
export class RoleEntity extends AbstractEnetity {
  @Column()
  rolename: string;
  @Column()
  remark: string;
  @OneToMany(() => RoleMenuEntity, (roleMenu) => roleMenu.role)
  roleMenus: RoleMenuEntity[];
  @OneToMany(()=>UserEntity,user => user.role)
  user:UserEntity[]
}
