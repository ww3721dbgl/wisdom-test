<template>

  <el-container>
    <el-header>公告栏</el-header>
    <el-main>
      <transaction-table />
    </el-main>
  </el-container>

</template>

<script>
import TransactionTable from './components/TransactionTable'

export default {
  components: {
    TransactionTable
  }
}
</script>


<style lang="scss" scoped>
.el-container {
  margin: 32px;
  border: solid 2px #1790fe;
  height: 80vh;
}

.el-header {
  background: #1790fe;
  color: #fff;
  text-align: center;
  line-height: 60px;
}

.el-main {
  height: 100%;
  padding: 0px;
  padding-left: 10px;
  padding-right: 10px;
}
</style>