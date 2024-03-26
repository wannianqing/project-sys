import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as xlsx from 'xlsx';
import { ScoreEntity } from './score.entity';
import { USER_NOT_EXIST } from 'src/common/message';
import { customMsg } from 'src/common/utils';
import { scoreData } from './score.constants';
import { UserService } from '../user/user.service';
import { BatchScoreCreate } from './score.dto';
const path = require('path');
const dayjs = require('dayjs');

@Injectable()
export class ScoreService {
  constructor(
    @InjectRepository(ScoreEntity)
    private readonly scoreRepository: Repository<ScoreEntity>,
    private readonly userService: UserService,
  ) {}
  scoreChange(num) {
    let score;
    for (let i = 0; i < scoreData.length; i++) {
      if (scoreData[i].s * 100 === num * 100) {
        score = scoreData[i].v;
        break;
      }
      if (scoreData[i + 1]) {
        if (
          scoreData[i + 1].s * 100 < num * 100 &&
          scoreData[i].s * 100 > num * 100
        ) {
          const s1 = Math.abs(num * 100 - scoreData[i + 1].s * 100);
          const s2 = Math.abs(scoreData[i].s * 100 - num * 100);

          const res = s1 > s2 ? scoreData[i].v : scoreData[i + 1].v;
          score = res;
        }
      }
    }
    return score;
  }
  analysisExcel(url) {
    const fileName = path.basename(url);
    const filePath = path.join(process.cwd(), './static', fileName);
    const workbook = xlsx.readFile(filePath);
    const sheetNames = workbook.SheetNames;
    const sheet = workbook.Sheets[sheetNames[0]];

    const regLeft = /^[A-Z]{1,2}(20)/;
    const regRight = /^[A-Z]{1,2}(21)/;
    const regTime = /^[A-Z]{1,2}(22)/;
    const regType = /^[A-Z]{1,2}(23)/;

    let leftDatas = [];
    let rightDatas = [];
    let timeDatas = [];
    let typeDatas = [];

    Object.keys(sheet).forEach((key) => {
      if (regLeft.test(key)) {
        leftDatas.push(sheet[key].w);
      }
      if (regRight.test(key)) {
        rightDatas.push(sheet[key].w);
      }
      // if(bothEyeReg.test(key)){
      //   bothDatas.push(sheet[key].w)
      // }
      if (regTime.test(key)) {
        const r = dayjs(sheet[key].w).format('YYYY-MM-DD');
        timeDatas.push(r);
      }
      if (regType.test(key)) {
        typeDatas.push(sheet[key].w);
      }
    });
    let datas = [];
    for (let i = 1; i < timeDatas.length; i++) {
      datas.push({
        left: leftDatas[i],
        right: rightDatas[i],
        // both:bothDatas[i],
        time: timeDatas[i],
        type: typeDatas[i],
      });
    }

    return datas;
  }
  async scoreCreate(createData, { userid, username }) {
    const { eye, currentLevel, distance } = createData;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayEnd = new Date(today.getTime() + 24 * 60 * 60 * 1000);
    const queryBuilder = this.scoreRepository.createQueryBuilder('scores');
    let scoreIns = await queryBuilder
      .where('scores.userid = :userid', { userid })
      .andWhere('scores.create_time BETWEEN :today AND :todayEnd', {
        today,
        todayEnd,
      })
      .getOne();

    const cacle = (distance / 5) * scoreData[currentLevel - 1].s;
    const score = this.scoreChange(cacle.toFixed(2));
    const visual = scoreData[currentLevel - 1].v;

    if (scoreIns) {
      scoreIns.visual = visual;
      scoreIns.distance = distance;
    } else {
      scoreIns = new ScoreEntity();
      scoreIns.userid = userid;
      scoreIns.username = username;
      scoreIns.visual = visual;
      scoreIns.distance = distance;
      scoreIns.type = '';
      scoreIns.create_time = new Date();
    }
    if (eye === 'left') {
      scoreIns.leftScore = score;
    } else if (eye === 'right') {
      scoreIns.rightScore = score;
    }
    const scoreResult = await this.scoreRepository.save(scoreIns);
    return { data: scoreResult };
  }

  async batchScoreCreate(body: BatchScoreCreate) {
    const { url, userid } = body;
    const user = await this.userService.handleGetOne(userid);
    if (!user) {
      return customMsg(USER_NOT_EXIST.MSG, USER_NOT_EXIST.CODE);
    }
    const excelDatas = this.analysisExcel(url);

    const queryBuilder = this.scoreRepository.createQueryBuilder('scores');
    let instances = [];

    const promises = excelDatas.map(async (item) => {
      const today = new Date(item.time);
      today.setHours(0, 0, 0, 0);
      const todayEnd = new Date(today.getTime() + 24 * 60 * 60 * 1000);

      let scoreIns = await queryBuilder
        .where('scores.userid = :userid', { userid })
        .andWhere('scores.create_time BETWEEN :today AND :todayEnd', {
          today,
          todayEnd,
        })
        .getOne();

      if (!scoreIns) {
        scoreIns = new ScoreEntity();
      }
      scoreIns.userid = userid;
      scoreIns.username = user.username;
      scoreIns.distance = 5;
      scoreIns.rightScore = item.right;
      scoreIns.leftScore = item.left;
      scoreIns.visual = 4;
      scoreIns.type = item.type;
      scoreIns.create_time = new Date(item.time);

      return scoreIns;
    });

    // 等待所有promise完成
    Promise.all(promises).then(async (resolvedInstances) => {
      instances = resolvedInstances;
      await this.scoreRepository.save(instances);
    });

    return { data: 'abc' };
  }

  async scoreList({ userid }) {
    const user = await this.userService.handleGetOne(userid);
    const queryBuilder = this.scoreRepository.createQueryBuilder('scores');

    let list = [];
    if (user.role.id != '1' && user.role.id != '2') {
      list = await queryBuilder
        .where('scores.userid = :userid', { userid })
        .orderBy('create_time', 'DESC')
        .getMany();
    } else {
      list = await queryBuilder.orderBy('create_time', 'DESC').getMany();
    }

    if (!list.length) {
      return { data: [] };
    }

    const groupByUserid = list.reduce((acc, current) => {
      const { userid } = current;
      if (!acc[userid]) {
        acc[userid] = [];
      }
      acc[userid].push(current);
      return acc;
    }, {});
    const result = [];
    Object.keys(groupByUserid).forEach((key) => {
      result.push(groupByUserid[key][0]);
    });
    return {
      data: {
        list: result,
      },
    };
  }

  async scoreListByUserid(userid) {
    const queryBuilder = this.scoreRepository.createQueryBuilder('scores');
    const list = await queryBuilder
      .where('scores.userid = :userid', { userid })
      .getMany();
    return { data: list };
  }
}
