<template>

  <el-container>
    <el-header style="height:40px;line-height:40px;">信息交互</el-header>
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
  margin: 20px 30px 30px 50px;
  height: 65vh;
}

.el-header {
  background: #4f9f9d;
  color: #fff;
  text-align: center;
  line-height: 60px;
  height: 40px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.el-main {
  height: 100%;
  padding: 0px;
  padding-top: 10px;
  border: solid 1px #4f9f9d;
}
</style>