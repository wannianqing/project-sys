import { Column, Entity, OneToMany } from 'typeorm'
import { AbstractEnetity } from 'src/common/abstract.entity'
import { RoleMenuEntity } from '../roleMenu/roleMenu.entity';

@Entity({ name: 'menus' })
export class MenuEntity extends AbstractEnetity {
  @Column()
  menuname: string;
  @Column()
  parentid: number;
  @Column()
  component: string;
  @Column()
  icon: string;
  @Column()
  link: string;
  @Column({
    type:Boolean
  })
  isParent: boolean;
  @OneToMany(() => RoleMenuEntity, (roleMenu) => roleMenu.menu)
  roleMenus: RoleMenuEntity[];
}
