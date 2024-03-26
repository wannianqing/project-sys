import { Column, CreateDateColumn, Entity,OneToMany } from 'typeorm'
import { AbstractEnetity } from 'src/common/abstract.entity'

@Entity({ name: 'scores' })
export class ScoreEntity extends AbstractEnetity {
  @Column({ type:'tinyint', comment:'用户id' })
  userid:number;

  @Column({ type:'varchar', comment:'用户名' })
  username:string;

  @Column({ type:'varchar', nullable:true, comment:'左眼分数' })
  leftScore:string;

  @Column({ type:'varchar', nullable:true, comment:'右眼分数' })
  rightScore:string;

  @Column({ type:'varchar', comment:'当前等级分数' })
  visual:number;

  @Column({ type:'int', comment:'距离' })
  distance:number;

  @Column({ type:'varchar', comment:'训练类型' })
  type:string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  create_time: Date;
}
