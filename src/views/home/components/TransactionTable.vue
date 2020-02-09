<template>
  <div>
    <el-table class="el-table-notice"
              :data="list"
              :show-header=false
              style="width: 100%;"
              @row-click="handleClick">
      <el-table-column width="240">
        <template slot-scope="scope">
          <i class="el-icon-time"
             style="padding-left:20px;padding-right:20px;"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="200"
                       :show-overflow-tooltip=true>
        <template slot-scope="scope">
          <div :class="[scope.row.state == 0? 'no-read':'']">{{ scope.row.title }}</div>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog class="el-table-notice"
               title="信息交互"
               :visible.sync="dialogVisible"
               width="50%"
               append-to-body>
      <el-row type="flex"
              justify="center">
        <div class="el-dialog-title no-read">{{ dialogTitle }}</div>
      </el-row>
      <el-row>
        <div class="el-dialog-message no-read">{{ dialogMessage }}</div>
      </el-row>
      <el-row type="flex"
              justify="end">
        <div class="el-dialog-time no-read">{{ dialogTime }}</div>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      dialogTitle: '',
      dialogMessage: '',
      dialogTime: '',
      list: [
        {
          date: '2016-05-03 10:00:00',
          title: '关于2020年放假通知1',
          message:
            '放假啦放假啊老地方见啊浪费大量风景放假啊大量风景啊浪费几点1',
          state: 0
        },
        {
          date: '2016-05-03 10:00:00',
          title: '关于2020年放假通知2',
          message:
            '放假啦放假啊老地方见啊浪费大量风景放假啊大量风景啊浪费几点2',
          state: 1
        }
      ]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleClick(row) {
      console.log(row)
      this.dialogTitle = row.title
      this.dialogMessage = row.message
      this.dialogTime = row.date
      this.dialogVisible = true
    },
    /**
     * 获取信息列表
     */
    fetchData() {}
  }
}
</script>
<style lang="scss">
.el-table-notice {
  border: 0;
  th,
  tr,
  td {
    border: 0;
    background-color: #fff;
    padding: 2px 0;
  }
  &::before {
    height: 0px;
  }
  &::after {
    width: 0;
  }

  .el-table__fixed:before {
    height: 0;
  }

  .el-table__row td {
    border: none;
  }
  .el-table__body td {
    background-color: #fff;
  }
  .el-dialog__body {
    padding: 10px 40px;
  }
}
</style>

<style lang="scss" scoped>
.el-dialog-title {
  margin-top: 20px;
}
.el-dialog-message {
  margin: 30px 0;
}
.el-dialog-time {
  margin-bottom: 30px;
}
.no-read {
  color: #f56c6c;
}
</style>