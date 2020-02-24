<template>
  <div class="app-container">
    <div class="filter-container">
      <div>
        <div class="filter-item">
          <span>申请号:</span>
          <el-input v-model="searchParam.no"
                    size="mini"
                    style="width: 100px;"
                    @keyup.enter.native="handleFilter" />
        </div>
        <div class="filter-item">
          <span>物料编码:</span>
          <el-input v-model="searchParam.applicant"
                    size="mini"
                    style="width: 100px;"
                    @keyup.enter.native="handleFilter" />
        </div>
        <div class="filter-item">
          <span>申请时间:</span>
          <el-date-picker v-model="searchParam.startTime"
                          size="mini"
                          type="date"
                          style="width: 140px;"></el-date-picker>
          <span>&nbsp;-</span>
          <el-date-picker v-model="searchParam.startTime"
                          size="mini"
                          type="date"
                          style="width: 140px;"></el-date-picker>
        </div>
      </div>
      <div class="flex-row-space-between">
        <div>
          <div class="filter-item">
            <span>申请人:</span>
            <el-input v-model="searchParam.applicant"
                      size="mini"
                      style="width: 100px;"
                      @keyup.enter.native="handleFilter" />
          </div>
          <div class="filter-item">
            <span style="letter-spacing:0.5em;margin-right:-0.5em;">终产品</span><span>:</span>
            <el-input v-model="searchParam.name"
                      size="mini"
                      style="width: 100px;"
                      @keyup.enter.native="handleFilter" />
          </div>
          <div class="filter-item">
            <span class="w2"
                  style="margin-right:-2em">规格</span><span>:</span>
            <el-select v-model="searchParam.guige"
                       size="mini"
                       clearable
                       style="width: 100px">
              <el-option v-for="item in guigeOptions"
                         :key="item"
                         :label="item"
                         :value="item" />
            </el-select>
          </div>
          <div class="filter-item"
               style="margin-left:33px;">
            <span class="w2"
                  style="margin-right:-2em">等级</span><span>:</span>
            <el-select v-model="searchParam.grade"
                       size="mini"
                       clearable
                       style="width: 100px">
              <el-option v-for="item in gradeOptions"
                         :key="item.key"
                         :label="item.label"
                         :value="item.label" />
            </el-select>
          </div>
          <div class="filter-item filter-item-btn-search">
            <i class="el-icon-search"
               @click="handleFilter"></i>
          </div>
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
                     @click="handleCreate">新增</el-button>
        </div>
      </div>
    </div>
    <el-table :key="tableKey"
              v-loading="listLoading"
              :data="list"
              border
              size="mini"
              fit
              highlight-current-row
              style="width: 100%;"
              :cell-style="stateClassName"
              @sort-change="sortChange">
      <el-table-column type="selection"
                       align="center"
                       width="55"></el-table-column>

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
          <span>{{state[row.state]}}</span>
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

      <el-table-column label="说明"
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
          <el-button type="text"
                     @click="handleCreate(row)"
                     size='mini'>
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

    <el-dialog width="40%"
               title="新增·物料编码"
               append-to-body
               :visible.sync="dialogAddVisible">
      <el-form ref="dataForm"
               :rules="rules"
               :model="temp"
               label-position="left"
               size="mini"
               label-width="0px">
        <div class="dialog-title"><span>新增物料编码</span></div>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="12">
            <div class="el-dialog-item"><label>物料名称：</label>
              <el-input v-model="temp.title"
                        size="mini"
                        style="width: 100px;" />
            </div>
          </el-col>
          <el-col :span="12">
            <div class="el-dialog-item el-form-right"><label class="w3"
                     style="margin-right:-0.5em">申请号</label>：
              <el-input v-model="temp.title"
                        size="mini"
                        style="width: 100px;" />
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <div class="el-dialog-item"><label>英文缩写：</label>
              <el-input v-model="temp.title"
                        size="mini"
                        style="width: 100px;" />
            </div>
          </el-col>
          <el-col :span="12">
            <div class="el-dialog-item el-form-right"><label>所属部门：</label>
              <el-input v-model="temp.title"
                        size="mini"
                        style="width: 100px;" />
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <div class="el-dialog-item"><label>物料规格：</label>
              <el-input v-model="temp.title"
                        size="mini"
                        style="width: 100px;" />
            </div>
          </el-col>
          <el-col :span="12">
            <div class="el-dialog-item el-form-right"><label class="w3"
                     style="margin-right:-0.5em">申请人</label>：
              <el-input v-model="temp.title"
                        size="mini"
                        style="width: 100px;" />
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="el-dialog-item"><label>参考物料：</label>
              <el-input v-model="temp.title"
                        size="mini"
                        style="width: 100px;" />
            </div>
          </el-col>
          <el-col :span="12">
            <div class="el-dialog-item el-form-right"><label>申请时间：</label>
              <el-input v-model="temp.title"
                        size="mini"
                        style="width: 100px;" />
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="el-dialog-item"><label>物料等级：</label>
              <el-input v-model="temp.title"
                        size="mini"
                        style="width: 100px;" />
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="el-dialog-item"><label>物料编码：</label>
              <el-input v-model="temp.title"
                        size="mini"
                        style="width: 100px;" />
            </div>
          </el-col>
          <el-col :span="12">
            <div class="el-dialog-item el-form-right"><label>工艺节点：</label>
              <el-input v-model="temp.title"
                        size="mini"
                        style="width: 100px;" />
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24"
                  class="el-col-line">
            <div class="el-dialog-item"
                 style=""><label>产品描述：</label></div>
            <el-input type="textarea"
                      maxlength="200"
                      style="width: 87%"
                      :rows="2"
                      size="small"
                      placeholder="请输入200字内的描述"
                      v-model="textarea">
            </el-input>

          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24"
                  class="el-col-line">
            <div class="el-dialog-item"><label>补充说明：</label></div>
            <el-input type="textarea"
                      maxlength="200"
                      style="width: 87%"
                      :rows="2"
                      size="small"
                      placeholder="请输入200字内的说明"
                      v-model="textarea">
            </el-input>

          </el-col>
        </el-row>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   size="mini"
                   style="width: 80px;"
                   @click="dialogStatus==='create'?createData():updateData()">
          提交
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
  name: 'material-coding',
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
      textarea:"", 
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
      dialogAddVisible: false,
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

      if (columnIndex == 8) {
        switch (row.state) {
          case 1:
            return 'color: #909399;'
          case 2:
            return 'color: #f56c6c;'
          case 3:
          case 4:
          case 5:
            return 'color: #E6A23C;'
          case 6:
            return 'color: #67c23a;'
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
          //     this.dialogAddVisible = false
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
          //     this.dialogAddVisible = false
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
.el-col-line {
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
}
.el-dialog .el-button--primary {
  background-color: #4f9f9d;
  border-color: #4f9f9d;
}

.el-dialog .el-button--red {
  background-color: #c00400;
  border-color: #c00400;
}
</style>
