<script lang="ts" setup>
</script>
<template>
  <div class="dashboard">
    <el-card shadow="always">
      <el-row :gutter="8" class="dashboard-top">
        <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
          <img src="../assets/images/panel-logo.png" class="panel-img" />
        </el-col>
        <el-col :xs="24" :sm="10" :md="10" :lg="10" :xl="10">
          <div class="title-info">
            <strong class="dashboard-title">青牛前端管理系统</strong>
            <p class="dashboard-sub-title">
              明眸善睐始于健康，科学用眼远离近视
            </p>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-row :gutter="8" class="dashboard-content">
      <el-col :xs="24" :sm="18">
        <el-card :body-style="{ padding: '35px 20px', textAlign: 'center' }">
          <template #header>
            <div class="card-header">
              <i class="iconfont icon-caidan" aria-hidden="true"></i> 视力保护
            </div>
          </template>
          <el-row :gutter="8" class="technical">
            <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6">
              <div class="item-box">
                <span class="iconfont icon-world"></span>
                <span class="technical-item">观世界之美</span>
              </div>
            </el-col>
            <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6">
              <div class="item-box">
                <span class="iconfont icon-anquan"></span>
                <span class="technical-item">爱眼保护</span>
              </div>
            </el-col>
            <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6">
              <div class="item-box">
                <span class="iconfont icon-bixudaifanghuyanjing"></span>
                <span class="technical-item">护眼行动</span>
              </div>
            </el-col>
            <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6">
              <div class="item-box">
                <span class="iconfont icon-hufu-xianshi"></span>
                <span class="technical-item">明亮双眸</span>
              </div>
            </el-col>
          </el-row>
        </el-card>
        <el-card :body-style="{ padding: '35px 20px' }" class="mg-t10">
          <template #header>
            <div class="card-header">
              <i class="iconfont icon-liebiao" aria-hidden="true"></i> 预防近视
            </div>
          </template>
          <p class="text">
            视力训练对青少年视力保护、近视防控、视力提升、拒绝眼镜有利无害，是青少年基础性、日常性、经常性的视力保护措施，是最符合青少年成长发育和身心健康的视力保护和近视干预方法。
          </p>
          <p class="text">
            青牛前端视力训练采用自然的、物理的、安全的、系统的方法，帮助青少年实施近视防控、阻止近视加深、恢复和提升裸眼视力，远离眼镜。
          </p>
          <p class="text">
            视力训练，利国利民，拯救青少年视力，让我们携手同行！
          </p>
          <ul class="article">
            <li>1. 明眸善睐始于日常保护，科学预防近视从我做起</li>
            <li>2. 近视防控，从小做起，让清晰世界陪伴孩子成长</li>
            <li>3. 读好书，更要看好“书”，正确用眼，远离近视困扰</li>
            <li>4. 爱眼护眼，点亮未来之光，拒绝近视侵蚀生活色彩</li>
            <li>5. 适度用眼，常做眼保健操，让双眼永远沐浴在明亮之中</li>
            <li>6. 预防近视，户外活动是良方，亲近自然，守护光明视界</li>
          </ul>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="6">
        <el-card :body-style="{ padding: '15px 20px', textAlign: 'left' }">
          <template #header>
            <div class="card-header">
              <i class="iconfont icon-wendang" aria-hidden="true"></i> 保护眼睛
            </div>
          </template>
          <ul class="article">
            <li>1. 限制每天连续盯着电脑、手机或电视等电子屏幕的时间</li>
            <li>2. 与书本或屏幕保持适当的距离，如30至40厘米左右</li>
            <li>3. 定时做眼保健操，有助于放松眼肌，缓解视疲劳</li>
            <li>4. 定期到专业的眼科医院进行视力检查，及时发现并纠正视力问题</li>
            <li>5. 注意手部卫生，避免不干净的手揉搓眼睛</li>
          </ul>
        </el-card>
        <el-card
          :body-style="{ padding: '15px 20px', textAlign: 'center' }"
          class="mg-t10"
        >
          <template #header>
            <div class="card-header">
              <i class="iconfont icon-wendang" aria-hidden="true"></i> 科学预防
            </div>
          </template>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<style lang="scss" scoped>
.text {
  font-size: 14px;
  color: var(--ma-primry-color);
  line-height: 25px;
}
.dashboard-top {
  display: flex;
  align-items: center;
  .panel-img {
    border-radius: 4px;
    width: 100%;
  }
  .title-info {
    text-align: center;
  }
  .dashboard-title {
    font-size: 24px;
  }
  .dashboard-sub-title {
    color: var(--ma-shallow-font-color);
    padding-top: 30px;
  }
}
.dashboard-content {
  margin-top: 20px;
}
.technical {
  .item-box {
    display: flex;
    width: 100%;
    justify-content: center;
    flex-direction: column;
    .iconfont {
      font-size: 32px;
      margin-bottom: 10px;
    }
  }
}
.article {
  margin-top: 20px;
  li {
    padding: 5px 0;
    color: var(--ma-shallow-font-color);
    cursor: pointer;
    line-height: 20px;
    font-size: 14px;
    &:hover {
      text-decoration: underline;
      color: var(--ma-primry-color);
    }
  }
}
</style>
