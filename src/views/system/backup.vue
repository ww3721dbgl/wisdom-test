<template>
  <div class="app-container">
    <div class="red">
      <svg-icon class="svg-icon" icon-class="backup" />
      <div class="back-block">
        <div class="back-time">
          <span>2019-12-23</span>
        </div>
        <div class="back-message">
          <span>备份成功</span>
        </div>
      </div>
    </div>
    <div class="clear"></div>
    <div class="blue">
      <svg-icon class="svg-icon" icon-class="backup" />
      <div class="back-block">
        <div class="back-time">
          <span>2019-12-23</span>
        </div>
        <div class="back-message">
          <span>失败</span>
        </div>
      </div>
    </div>
    <div class="clear"></div>
    <div class="grey">
      <svg-icon class="svg-icon" icon-class="backup" />
      <div class="back-block">
        <div class="back-time">
          <span>2019-12-23</span>
        </div>
        <div class="back-message">
          <span>备份成功</span>
        </div>
      </div>
    </div>
    <div class="clear"></div>
  </div>
</template>


<style lang="scss" scoped>
.svg-icon {
  width: 30px;
  height: 30px;
  vertical-align: middle;
  margin-bottom: 2px;
}
.red {
  color: #d81c03;
  padding-top: 80px;
  padding-left: 160px;
}
.blue {
  color: #1290d3;
  padding-top: 40px;
  padding-left: 160px;
}
.grey {
  color: #878887;
  padding-top: 40px;
  padding-left: 160px;
}
.svg-icon {
  float: left;
}
.back-block {
  width: 350px;
  float: left;
  margin-top: 10px;
}
.back-time {
  width: 150px;
  float: left;
  margin-left: 30px;
}
.back-message {
  width: 150px;
  float: left;
}
.clear {
  clear: both;
}
</style>
