<template>
    <div class="content">
      <!-- 后台内容首页四个管理框 -->
      <section>
          <div>
            <p><i class="iconfont icon-lubiao01"></i>询比价项目管理</p>
            <ul>
              <li>
                <a href="javascript:;">
                  <p>新建</p>
                  <span>10</span>
                </a>
              </li>
              <li>
                <a href="javascript:;">
                  <p>待发布</p>
                  <span>8</span>
                </a>
              </li>
              <li>
                <a href="javascript:;">
                  <p>进行中</p>
                  <span>10</span>
                </a>
              </li>
              <li>
                <a href="javascript:;">
                  <p>已归档</p>
                  <span>10</span>
                </a>
              </li>
              <li>
                <a href="javascript:;">
                  <p>废弃</p>
                  <span>10</span>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p><i class="iconfont icon-jingjia"></i>竞价项目管理</p>
            <ul>
              <li>
                <a href="javascript:;">
                  <p>新建</p>
                  <span>10</span>
                </a>
              </li>
              <li>
                <a href="javascript:;">
                  <p>待发布</p>
                  <span>8</span>
                </a>
              </li>
              <li>
                <a href="javascript:;">
                  <p>进行中</p>
                  <span>10</span>
                </a>
              </li>
              <li>
                <a href="javascript:;">
                  <p>已归档</p>
                  <span>10</span>
                </a>
              </li>
              <li>
                <a href="javascript:;">
                  <p>废弃</p>
                  <span>10</span>
                </a>
              </li>
            </ul>
          </div>
      </section>
      <section>
          <div>
            <p><i class="iconfont icon-icon-paper"></i>招标申请管理</p>
            <ul>
              <li>
                <a href="javascript:;">
                  <p>新建</p>
                  <span>10</span>
                </a>
              </li>
              <li>
                <a href="javascript:;">
                  <p>审批</p>
                  <span>10</span>
                </a>
              </li>
              <li>
                <a href="javascript:;">
                  <p>列表</p>
                  <span>10</span>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p><i class="iconfont icon-suoyouzhaobiaoxiangmu"></i>招标项目管理</p>
            <ul>
              <li>
                <a href="javascript:;">
                  <p>新建</p>
                  <span>10</span>
                </a>
              </li>
              <li>
                <a href="javascript:;">
                  <p>待发布</p>
                  <span>8</span>
                </a>
              </li>
              <li>
                <a href="javascript:;">
                  <p>评标专家抽取</p>
                  <span>10</span>
                </a>
              </li>
              <li>
                <a href="javascript:;">
                  <p>正在投标</p>
                  <span>10</span>
                </a>
              </li>
              <li>
                <a href="javascript:;">
                  <p>代授权</p>
                  <span>264</span>
                </a>
              </li>
              <li>
                <a href="javascript:;">
                  <p>已归档</p>
                  <span>10</span>
                </a>
              </li>
            </ul>
          </div>
      </section>
      <!-- 特办事项 -->
      <article>
          <p>特办事项</p>
      </article>
      <!-- 图表 -->
      <ul>
        <li><p>本年采购金额按月分析</p></li>
        <li><p>本年采购金额按月分析</p></li>
        <li><p>采购物料类型分析</p></li>
        <li><p>采购物料类型分析</p></li>
      </ul>
    </div>
</template>
<script>
export default {

}
</script>
<style scoped lang='less'>
.content {
  width: 100%;
}
.content>section {
  display: flex;
  width: 100%;
  height: 170px;
  margin-bottom: 19px;
}
.content>section div{
  width: 50%;
  height: 100%;
  background-color: #fff;
  box-shadow:0px 3px 6px 0px rgba(0, 0, 0, 0.08);
}
.content section>div:nth-child(1) {
  margin-right: 18px;
}
section>div p{
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  font-family:MicrosoftYaHeiLight;
  color:rgba(0,0,0,1);
  border-bottom: 1px solid rgba(238,238,238,1);
}
section>div p i{
  margin: 0 15px;
}
section>div ul {
  display: flex;
  justify-content: space-around;
}
section>div ul li {
  box-sizing: border-box;
  margin: 22px 0;
  width: 142.6px;
  height: 80px;
  background:rgba(248,248,248,1);
  // background-color: red;
  border-radius:3px;
}
section>div ul li a {
  display: block;
  padding: 0 15px;
  font-family:MicrosoftYaHeiLight;
  font-weight:400;
  color:rgba(103,103,103,1);
}
section>div ul li a span {
  color: #009688;
}
section:nth-child(2)>div:nth-child(1) ul li {
  width: 249px;
}
section:nth-child(2)>div:nth-child(2) ul li {
  width: 118.3px;
}
article {
  width: 100%;
  height: 140px;
  background-color: #fff;
  box-shadow:0px 3px 6px 0px rgba(0, 0, 0, 0.08);
}
article p{
  margin-left: 15px;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  font-family:MicrosoftYaHeiLight;
  color:rgba(0,0,0,1);
  border-bottom: 1px solid rgba(238,238,238,1);
}
.content>ul {
  display: flex;
  justify-content: space-between;
}
.content>ul li {
  margin-top: 15px;
  width: 380px;
  height: 300px;
  background-color: #fff;
}
.content>ul li p {
  padding-left: 15px;
  height: 50px;
  line-height: 50px;
  color:rgba(0,0,0,1);
  box-shadow:0px 3px 6px 0px rgba(0, 0, 0, 0.08);
  border-bottom: 1px solid rgba(238,238,238,1);
}
</style>
