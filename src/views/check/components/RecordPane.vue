<template>
  <div class="app-container">
    <div class="filter-container"
         style="margin-left:10px">
      <div>
        <div class="filter-item">
          <span>检验人:</span>
          <el-input v-model="searchParam.name"
                    size="mini"
                    style="width: 100px;"
                    @keyup.enter.native="handleFilter" />
        </div>
        <div class="filter-item">
          <span>检验号:</span>
          <el-input v-model="searchParam.name"
                    size="mini"
                    style="width: 100px;"
                    @keyup.enter.native="handleFilter" />
        </div>

        <div class="filter-item filter-item-btn-search">
          <i class="el-icon-search"
             @click="handleFilter"></i>
        </div>
      </div>
    </div>
    <div class="el-table-frame1">
      <el-table :key="tableKey"
                v-loading="listLoading"
                :data="list"
                border
                size="mini"
                fit
                highlight-current-row
                style="width: 100%;"
                :cell-style="stateClassName">

        <el-table-column label="工号"
                         align="center">
          <template slot-scope="{row}">
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="姓名"
                         align="center">
          <template slot-scope="{row}">
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="组别"
                         prop="no"
                         align="center">
          <template slot-scope="{row}">
            <span>{{ row.no }}</span>
          </template>
        </el-table-column>

        <el-table-column label="检验号"
                         align="center">
          <template slot-scope="{row}">
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="检项数"
                         align="center">
          <template slot-scope="{row}">
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="打印数"
                         align="center">
          <template slot-scope="{row}">
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="打印时间"
                         align="center">
          <template slot-scope="{row}">
            <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作"
                         align="center"
                         width="120"
                         class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button type="text"
                       @click="handlePrint(row)"
                       size='mini'>
              <svg-icon class="svg-icon"
                        icon-class="print1" />
            </el-button>

          </template>
        </el-table-column>

      </el-table>

      <pagination v-show="total>0"
                  :total="total"
                  :page.sync="searchParam.page"
                  :limit.sync="searchParam.limit"
                  @pagination="getList" />

    </div>

    <el-dialog :visible.sync="dialogPrintVisible"
               width="40%"
               title="检验记录单复打">

      <div class="dialog-title"><span style='color:#cb0000'>检验记录单复打</span></div>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="12">
          <div class="el-dialog-item"><label>样品规格：</label><span>{{row.name}}</span></div>
        </el-col>
        <el-col :span="12">
          <div class="el-dialog-item"><label class="w3">检验号</label>：<span>{{row.name}}</span></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="el-dialog-item"><label>物料编码：</label><span>{{row.name}}</span></div>
        </el-col>
        <el-col :span="12">
          <div class="el-dialog-item"><label class="w3">申请人</label>：<span>{{row.name}}</span></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="el-dialog-item"><label>样品名称：</label><span>{{row.name}}</span></div>
        </el-col>
        <el-col :span="12">
          <div class="el-dialog-item"><label>申请时间：</label><span>{{row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="el-dialog-item"><label>样品等级：</label><span>{{row.name}}</span></div>
        </el-col>
        <el-col :span="12">
          <div class="el-dialog-item"><label>送样地点：</label><span>{{row.name}}</span></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="el-dialog-item"><label>样品规模：</label><span>{{row.name}}</span></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="el-dialog-item"><label>检项数量：</label><span>{{row.name}}</span></div>
        </el-col>
        <el-col :span="12">
          <div class="el-dialog-item"><label class="w3">检验人</label>：<span style='color:#cb0000'>{{row.name}}</span></div>
        </el-col>
      </el-row>
      <div class="el-dialog-table">
        <el-table :key="tableKey"
                  v-loading="listLoading"
                  :data="list"
                  border
                  fit
                  height="150px"
                  size="mini"
                  highlight-current-row
                  style="width: 100%;"
                  :cell-style="stateClassName">

          <el-table-column type="selection"
                           align="center"
                           width="55">
          </el-table-column>
          <el-table-column label="检项名称"
                           prop="no"
                           align="center">
          </el-table-column>
          <el-table-column label="质量标准"
                           prop="no"
                           align="center">
          </el-table-column>
        </el-table>
      </div>

      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   size="mini"
                   style="width: 80px;"
                   @click="dialogStatus==='create'?createData():updateData()">
          复打
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/views/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: '样品检验',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      count: 10,
      tableKey: 0,
      list: [
        { no: 'T20190001', timestamp: 1580980988, name: '山梨酸钾', state: 1 },
        { no: 'T20190001', timestamp: 1580980988, name: '山梨酸钾', state: 2 },
        { no: 'T20190001', timestamp: 1580980988, name: '山梨酸钾', state: 3 },
        { no: 'T20190001', timestamp: 1580980988, name: '山梨酸钾', state: 4 },
        { no: 'T20190001', timestamp: 1580980988, name: '山梨酸钾', state: 5 },
        { no: 'T20190001', timestamp: 1580980988, name: '山梨酸钾', state: 6 },
        { no: 'T20190001', timestamp: 1580980988, name: '山梨酸钾', state: 1 },
        { no: 'T20190001', timestamp: 1580980988, name: '山梨酸钾', state: 2 },
        { no: 'T20190001', timestamp: 1580980988, name: '山梨酸钾', state: 3 },
        { no: 'T20190001', timestamp: 1580980988, name: '山梨酸钾', state: 4 },
        { no: 'T20190001', timestamp: 1580980988, name: '山梨酸钾', state: 5 },
        { no: 'T20190001', timestamp: 1580980988, name: '山梨酸钾', state: 6 }
      ],
      row: [],
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
      state: [' ', '未送样', '待领检', '检验中', '复检中', '审核中', '完成'],
      stateOptions: [
        { label: '未送样', key: 1 },
        { label: '待领检', key: 2 },
        { label: '检验中', key: 3 },
        { label: '复检中', key: 4 },
        { label: '审核中', key: 5 },
        { label: '完成', key: 6 }
      ],
      calendarTypeOptions: {},
      sortOptions: [
        { label: 'ID Ascending', key: '+id' },
        { label: 'ID Descending', key: '-id' }
      ],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogPrintVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [
          { required: true, message: 'type is required', trigger: 'change' }
        ],
        timestamp: [
          {
            type: 'date',
            required: true,
            message: 'timestamp is required',
            trigger: 'change'
          }
        ],
        title: [
          { required: true, message: 'title is required', trigger: 'blur' }
        ]
      },
      downloadLoading: false
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
    //   console.log(columnIndex)
    //   console.log('state', row.state)

      if (columnIndex == 11) {
        switch (row.state) {
          case 1:
            return 'background: #909399;'
          case 2:
            return 'background: #f56c6c;'
          case 3:
          case 4:
          case 5:
            return 'background: #E6A23C;'
          case 6:
            return 'background: #67c23a;'
        }
      }
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
    handlePrint() {
      this.dialogPrintVisible = true
    },
    handleFilter() {},
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
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
      this.dialogFormVisible = true
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
    handleDelete(row, index) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
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
    }
  }
}
</script>

<style lang="scss" >
.el-button-excel {
  .el-button--text {
    color: #2995d4;
  }
}
</style>

<style lang="scss" scoped>
.el-table-frame1 {
  margin: 0 10px 10px 10px;
}
.el-button {
  .svg-icon {
    width: 16px;
    height: 16px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
}

.el-dialog .el-button--primary {
  background-color: #4f9f9d;
  border-color: #4f9f9d;
}
</style>