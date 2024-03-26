import { Entity, ManyToOne } from 'typeorm'
import { AbstractEnetity } from 'src/common/abstract.entity'
import { RoleEntity } from '../role/role.entity';
import { MenuEntity } from '../menu/menu.entity';

@Entity({ name: 'role_menu' })
export class RoleMenuEntity extends AbstractEnetity {
  @ManyToOne(() => RoleEntity, (role) => role.roleMenus)
  role: RoleEntity;

  @ManyToOne(() => MenuEntity, (menu) => menu.roleMenus)
  menu: MenuEntity;
}
