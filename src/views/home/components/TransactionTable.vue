<template>
  <el-table :data="list"
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
        <el-dialog :title="dialogTitle"
                   :visible.sync="dialogVisible"
                   width="60%"
                   append-to-body center>
                   <el-row>
          <div style="margin:30px 0">{{ dialogMessage }}</div></el-row>
          <el-row type="flex"
                  justify="end">
            <div style="margin:30px 30px 0  0">{{ dialogTime }}</div>
          </el-row>
        </el-dialog>
      </template>
    </el-table-column>
  </el-table>

</template>

<script>
// import { transactionList } from '@/api/remote-search'

export default {
  data() {
    return {
      dialogVisible: false,
      dialogTitle: '通知',
      dialogMessage: '',
      dialogTime:'',
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
    fetchData() {
      //   transactionList().then(response => {
      //     this.list = response.data.items.slice(0, 8)
      //   })
    }
  }
}
</script>

<style lang="scss" scoped>
.no-read {
  color: #f56c6c;
}
</style>