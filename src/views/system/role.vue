<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="flex-row-space-between">
        <div>

        </div>
        <div>
          <el-button class="filter-btn-item"
                     size="mini"
                     style="margin-left: 10px;width: 80px;"
                     type="info"
                     icon="el-icon-delete"
                     @click="handleCreate">删除</el-button>
          <el-button class="filter-btn-item"
                     size="mini"
                     style="margin-left: 10px;width: 80px;"
                     type="primary"
                     icon="el-icon-edit"
                     @click="handleCheckSample">新增</el-button>
        </div>
      </div>
    </div>
    <el-table :key="tableKey"
              v-loading="listLoading"
              :data="list"
              border
              fit
              size="mini"
              highlight-current-row
              style="width: 100%;">

      <el-table-column type="selection"
                       align="center"
                       width="55">
      </el-table-column>

      <el-table-column label="部门"
                       align="center"
                       width="125px">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="角色"
                       width="125px"
                       align="center">
        <template slot-scope="{row}">
          <span>{{row.name}}</span>
        </template>
      </el-table-column>

      <el-table-column label="权限"
                       align="center">
        <template slot-scope="{row}">
          <span>{{row.name}}</span>
        </template>
      </el-table-column>

      <el-table-column label="状态"
                       prop="state"
                       width="90px"
                       align="center">
        <template slot-scope="{row}">
          <span>{{state[row.state]}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作"
                       align="center"
                       width="130"
                       class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="text"
                     @click="handleCheckSample(row)"
                     size='mini'>
            编辑
          </el-button>

        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0"
                :total="total"
                :page.sync="searchParam.page"
                :limit.sync="searchParam.limit"
                @pagination="getList" />

    <el-dialog :visible.sync="dialogEditVisible"
               width="80%"
               append-to-body
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :show-close="false"
               title="编辑·角色权限管理">
      <div class="dialog-title"><span style='color:#000'>角色权限管理编辑</span></div>
      <el-divider></el-divider>
      <div class="el-dialog-item"><label>部门</label><label>：</label>
        <el-select v-model="searchParam.state"
                   size="mini"
                   clearable
                   style="width: 100px">
          <el-option v-for="item in stateOptions"
                     :key="item.key"
                     :label="item.label"
                     :value="item.label" />
        </el-select>
      </div>
      <div class="el-dialog-item"
           style="margin-left:20px;"><label>角色名称</label><label>：</label>
        <el-select v-model="searchParam.state"
                   size="mini"
                   clearable
                   style="width: 100px">
          <el-option v-for="item in stateOptions"
                     :key="item.key"
                     :label="item.label"
                     :value="item.label" />
        </el-select>
      </div>
      <div class="el-dialog-role">
        <el-table :key="tableKey"
                  v-loading="listLoading"
                  :data="routes"
                  :show-header="false"
                  border
                  fit
                  height="380px"
                  size="mini"
                  highlight-current-row
                  style="width: 100%;"
                  :span-method="arraySpanMethod">

          <el-table-column label="序号"
                           prop="index"
                           align="center"
                           width="55">
          </el-table-column>
          <el-table-column label="主标题"
                           prop="title"
                           width="160"
                           align="center">
          </el-table-column>
          <el-table-column label="副序号"
                           prop="subIndex"
                           width="60"
                           align="center">
          </el-table-column>
          <el-table-column label="副标题"
                           width="160"
                           prop="subTitle"
                           align="center">
            <template slot-scope="{row}">
              <el-checkbox>{{ row.subTitle }}</el-checkbox>

            </template>
          </el-table-column>
          <el-table-column label="操作"
                           class-name="small-padding fixed-width">
            <template slot-scope="{row}">
              <el-checkbox-group v-model="row.checkedRole"
                                 @change="handleCheckedRoleChange(row)">
                <el-checkbox label="查询"></el-checkbox>
                <el-checkbox label="新增"></el-checkbox>
                <el-checkbox label="删除"></el-checkbox>
                <el-checkbox label="编辑"></el-checkbox>
              </el-checkbox-group>

            </template>
          </el-table-column>
        </el-table>
      </div>

      <div slot="footer"
           class="dialog-footer">
        <el-button type="green"
                   size="mini"
                   style="width: 80px;"
                   @click="dialogStatus==='create'?createData():updateData()">
          完成
        </el-button>
        <el-button type="primary"
                   size="mini"
                   style="width: 80px;margin-left:30%"
                   @click="handleCancel">
          返回
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
import waves from '@/views/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'role',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      checkedRole: [],
      list: [
        { no: 'T20190001', timestamp: 1580980988, name: '山梨酸钾', state: 1 },
        { no: 'T20190001', timestamp: 1580980988, name: '山梨酸钾', state: 2 },
        { no: 'T20190001', timestamp: 1580980988, name: '山梨酸钾', state: 1 },
        { no: 'T20190001', timestamp: 1580980988, name: '山梨酸钾', state: 2 },
        { no: 'T20190001', timestamp: 1580980988, name: '山梨酸钾', state: 1 },
        { no: 'T20190001', timestamp: 1580980988, name: '山梨酸钾', state: 1 },
        { no: 'T20190001', timestamp: 1580980988, name: '山梨酸钾', state: 1 },
        { no: 'T20190001', timestamp: 1580980988, name: '山梨酸钾', state: 2 },
        { no: 'T20190001', timestamp: 1580980988, name: '山梨酸钾', state: 2 },
        { no: 'T20190001', timestamp: 1580980988, name: '山梨酸钾', state: 2 },
        { no: 'T20190001', timestamp: 1580980988, name: '山梨酸钾', state: 2 },
        { no: 'T20190001', timestamp: 1580980988, name: '山梨酸钾', state: 2 }
      ],
      routes: [
        {
          index: 1,
          span: 2,
          title: '送检',
          subIndex: 1.1,
          subTitle: '样品送检',
          checkedRole: []
        },
        {
          index: 1,
          span: 0,
          title: '送检',
          subIndex: 1.2,
          subTitle: '物料编码',
          checkedRole: []
        },
        {
          index: 2,
          span: 4,
          title: '检验',
          subIndex: 2.1,
          subTitle: '样品检测',
          checkedRole: []
        },
        {
          index: 2,
          span: 0,
          title: '检验',
          subIndex: 2.2,
          subTitle: '检验方法',
          checkedRole: []
        },
        {
          index: 2,
          span: 0,
          title: '检验',
          subIndex: 2.3,
          subTitle: '质量标准',
          checkedRole: []
        },
        {
          index: 2,
          span: 0,
          title: '检验',
          subIndex: 2.4,
          subTitle: '存样管理',
          checkedRole: []
        },
        {
          index: 3,
          span: 4,
          title: '审批',
          subIndex: 3.1,
          subTitle: '检验报告',
          checkedRole: []
        },
        {
          index: 3,
          span: 0,
          title: '审批',
          subIndex: 3.2,
          subTitle: '物料编码',
          checkedRole: []
        },
        {
          index: 3,
          span: 0,
          title: '审批',
          subIndex: 3.3,
          subTitle: '检验方法',
          checkedRole: []
        },
        {
          index: 3,
          span: 0,
          title: '审批',
          subIndex: 3.4,
          subTitle: '质量标准',
          checkedRole: []
        },
        {
          index: 4,
          span: 4,
          title: '检效',
          subIndex: 4.1,
          subTitle: '检验报告',
          checkedRole: []
        },
        {
          index: 4,
          span: 0,
          title: '检效',
          subIndex: 4.2,
          subTitle: '物料编码',
          checkedRole: []
        },
        {
          index: 4,
          span: 0,
          title: '检效',
          subIndex: 4.3,
          subTitle: '检验方法',
          checkedRole: []
        },
        {
          index: 4,
          span: 0,
          title: '检效',
          subIndex: 4.4,
          subTitle: '质量标准',
          checkedRole: []
        }
      ],
      textarea: '',
      row: [],
      multipleSelection: [],
      total: 11,
      listLoading: true,
      searchParam: {
        page: 1,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+date'
      },
      guigeOptions: ['成品', '半成品'],
      state: ['', '启用', '停用'],
      stateOptions: [
        { label: '未送样', key: 1 },
        { label: '待领检', key: 2 },
        { label: '检验中', key: 3 },
        { label: '复检中', key: 4 },
        { label: '审核中', key: 5 },
        { label: '完成', key: 6 }
      ],
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published',
        radio: ''
      },
      dialogAddVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogEditVisible: false,
      pvData: [],
      downloadLoading: false,
      isCheckSelect: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /**
     * 设置流程状态
     */
    stateClassName({ row, columnIndex }) {
      console.log(columnIndex)
      console.log('state', row.state)
    },
    getList() {
      this.listLoading = true
      setTimeout(() => {
        this.listLoading = false
      }, 1.5 * 1000)
      //   fetchList(this.searchParam).then(response => {
      //     this.list = response.data.items
      //     this.total = response.data.total

      //   })
    },
    checkStatus() {
      this.isCheckSelect = !this.isCheckSelect
    },
    handleFilter() {
      this.searchParam.page = 1
      this.getList()
    },
    handleCheckSample(row) {
      console.log(row)
      this.dialogEditVisible = true
      this.row = row
    },
    handleCancel() {
      this.dialogEditVisible = false
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'date') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.searchParam.sort = '+date'
      } else {
        this.searchParam.sort = '-date'
      }
      this.handleFilter()
    },
    handleCreate() {
      this.dialogStatus = 'create'
      this.dialogAddVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          //   createArticle(this.temp).then(() => {
          //     this.list.unshift(this.temp)
          //     this.dialogFormVisible = false
          //     this.$notify({
          //       title: 'Success',
          //       message: 'Created Successfully',
          //       type: 'success',
          //       duration: 2000
          //     })
          //   })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogAddVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          //   updateArticle(tempData).then(() => {
          //     const index = this.list.findIndex(v => v.id === this.temp.id)
          //     this.list.splice(index, 1, this.temp)
          //     this.dialogFormVisible = false
          //     this.$notify({
          //       title: 'Success',
          //       message: 'Update Successfully',
          //       type: 'success',
          //       duration: 2000
          //     })
          //   })
        }
      })
    },
    handleDelete() {
      this.$notify({
        title: '提示',
        message: '删除成功！',
        type: 'success',
        duration: 2000
      })
      this.list.remove(0)
    },
    handleFetchPv(pv) {
      console.log(pv)

      //   fetchPv(pv).then(response => {
      //     this.pvData = response.data.pvData
      //     this.dialogPvVisible = true
      //   })
    },
    formatJson(filterVal) {
      return this.list.map(v =>
        filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
    },
    getSortClass: function(date) {
      const sort = this.searchParam.sort
      return sort === `+${date}` ? 'ascending' : 'descending'
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    arraySpanMethod({ row, columnIndex }) {
      console.log(row)
      console.log(columnIndex)

      if (columnIndex < 2) {
        if (row.span === 0) {
          return [0, 0]
        } else {
          return [row.span, 1]
        }
      }
    },
    handleCheckedRoleChange(value) {
      console.log(value)
    }
  }
}
</script>


<style lang="scss" scoped>
.el-form-no {
  text-align: right;
  font-size: 18px;
  color: #cb0000;
}

.el-dialog-item {
  display: inline-block;
}
</style>
