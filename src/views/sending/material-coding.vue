<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="searchParam.no"
                placeholder="申请号"
                style="width: 150px;"
                class="filter-item"
                @keyup.enter.native="handleFilter" />

      <el-input v-model="searchParam.applicant"
                placeholder="物料编码"
                style="width: 150px;"
                class="filter-item"
                @keyup.enter.native="handleFilter" />

      <el-date-picker v-model="searchParam.startTime"
                      type="date"
                      style="width: 150px;"
                      class="filter-item"
                      placeholder="申请-开始时间">
      </el-date-picker>

      <el-date-picker v-model="searchParam.startTime"
                      type="date"
                      style="width: 150px;"
                      class="filter-item"
                      placeholder="申请-结束时间">
      </el-date-picker>

      <el-input v-model="searchParam.applicant"
                placeholder="申请人"
                style="width: 150px;"
                class="filter-item"
                @keyup.enter.native="handleFilter" />

      <el-input v-model="searchParam.name"
                placeholder="终产品"
                style="width: 150px;"
                class="filter-item"
                @keyup.enter.native="handleFilter" />

      <el-select v-model="searchParam.guige"
                 placeholder="规格"
                 clearable
                 style="width: 150px"
                 class="filter-item">
        <el-option v-for="item in guigeOptions"
                   :key="item"
                   :label="item"
                   :value="item" />
      </el-select>

      <el-select v-model="searchParam.grade"
                 placeholder="等级"
                 clearable
                 style="width: 150px"
                 class="filter-item">
        <el-option v-for="item in gradeOptions"
                   :key="item.key"
                   :label="item.label"
                   :value="item.label" />
      </el-select>

      <el-button v-waves
                 class="filter-item"
                 type="primary"
                 style="width: 120px;"
                 icon="el-icon-search"
                 @click="handleFilter">
        搜索
      </el-button>
      <el-button class="filter-item"
                 style="margin-left: 10px;width: 120px;"
                 type="success"
                 icon="el-icon-edit"
                 @click="handleCreate">
        新增
      </el-button>
      <el-button class="filter-item"
                 style="margin-left: 10px;width: 120px;"
                 type="danger"
                 icon="el-icon-delete"
                 @click="handleCreate">
        删除
      </el-button>
    </div>
    <el-table :key="tableKey"
              v-loading="listLoading"
              :data="list"
              border
              fit
              highlight-current-row
              style="width: 100%;"
              :cell-style="stateClassName"
              @sort-change="sortChange">

      <el-table-column type="selection"
                       align="center"
                       width="55">
      </el-table-column>

      <el-table-column label="申请号"
                       prop="no"
                       align="center"
                       width="150">

        <template slot-scope="{row}">
          <span>{{ row.no }}</span>
        </template>
      </el-table-column>

      <el-table-column label="申请人"
                       align="center"
                       width="100">

        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="申请时间"
                       width="150px"
                       align="center">
        <template slot-scope="{row}">
          <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column label="物料编号"
                       width="120px"
                       align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="物料名称"
                       width="150px"
                       align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="规格"
                       align="center"
                       width="80px">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="等级"
                       align="center"
                       width="80px">

        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="状态"
                       prop="state"
                       width="80px"
                       align="center">
        <template slot-scope="{row}">
          <span style="color:#fff">{{state[row.state]}}</span>
        </template>
      </el-table-column>

      <el-table-column label="英文简称"
                       align="center"
                       width="80px">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="产品描述"
                       align="center"
                       width="200px">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="产品说明"
                       align="center"
                       width="200px">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作"
                       align="center"
                       width="120"
                       class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button v-if="row.status!='draft'"
                     size="mini"
                     @click="handleModifyStatus(row,'draft')">
            查看
          </el-button>

        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0"
                :total="total"
                :page.sync="searchParam.page"
                :limit.sync="searchParam.limit"
                @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]"
               :visible.sync="dialogFormVisible">
      <el-form ref="dataForm"
               :rules="rules"
               :model="temp"
               label-position="left"
               label-width="70px"
               style="width: 400px; margin-left:50px;">
        <el-form-item label="Type"
                      prop="type">
          <el-select v-model="temp.type"
                     class="filter-item"
                     placeholder="Please select">
            <el-option v-for="item in calendarTypeOptions"
                       :key="item.key"
                       :label="item.display_name"
                       :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="Date"
                      prop="timestamp">
          <el-date-picker v-model="temp.timestamp"
                          type="datetime"
                          placeholder="Please pick a date" />
        </el-form-item>
        <el-form-item label="Title"
                      prop="title">
          <el-input v-model="temp.title" />
        </el-form-item>

        <el-form-item label="Status">
          <el-select v-model="temp.status"
                     class="filter-item"
                     placeholder="Please select">
            <el-option v-for="item in statusOptions"
                       :key="item"
                       :label="item"
                       :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="Imp">
          <el-rate v-model="temp.importance"
                   :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                   :max="3"
                   style="margin-top:8px;" />
        </el-form-item>
        <el-form-item label="Remark">
          <el-input v-model="temp.remark"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    type="textarea"
                    placeholder="Please input" />
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary"
                   @click="dialogStatus==='create'?createData():updateData()">
          Confirm
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible"
               title="Reading statistics">
      <el-table :data="pvData"
                border
                fit
                highlight-current-row
                style="width: 100%">
        <el-table-column prop="key"
                         label="Channel" />
        <el-table-column prop="pv"
                         label="Pv" />
      </el-table>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="dialogPvVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
import waves from '@/views/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
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
      total: 11,
      listLoading: true,
      searchParam: {
        page: 1,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      guigeOptions: ['成品', '半成品'],
      state: [' ', '未送样', '待领检', '检验中', '复检中', '审核中', '完成'],
      gradeOptions: [
        { label: '药用级', key: 1 },
        { label: '工业级', key: 2 }
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
      dialogFormVisible: false,
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
      console.log(columnIndex)
      console.log('state', row.state)

      if (columnIndex == 8) {
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
    handleFilter() {
      this.searchParam.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.searchParam.sort = '+id'
      } else {
        this.searchParam.sort = '-id'
      }
      this.handleFilter()
    },
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
    getSortClass: function(key) {
      const sort = this.searchParam.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>


<style lang="scss" scoped>
</style>
