<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="flex-row-space-between">
        <div>
          <div class="filter-item">
            <span>部门:</span>
            <el-input v-model="searchParam.name"
                      size="mini"
                      style="width: 100px;"
                      @keyup.enter.native="handleFilter" />
          </div>
          <div class="filter-item">
            <span>姓名:</span>
            <el-input v-model="searchParam.name"
                      size="mini"
                      style="width: 100px;"
                      @keyup.enter.native="handleFilter" />
          </div>
          <div class="filter-item">
            <span>工号:</span>
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
              fit
              size="mini"
              highlight-current-row
              style="width: 100%;"
              :cell-style="stateClassName"
              @selection-change="handleSelectionChange"
              @sort-change="sortChange">

      <el-table-column type="selection"
                       align="center"
                       width="55">
      </el-table-column>

      <el-table-column label="日期"
                       width="150px"
                       prop="date"
                       sortable="custom"
                       align="center"
                       :class-name="getSortClass('date')">
        <template slot-scope="{row}">
          <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>

      <el-table-column label="部门"
                       align="center"
                       width="100px">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="组别"
                       align="center">
        <template slot-scope="{row}">
          <span>{{row.name}}</span>
        </template>
      </el-table-column>

      <el-table-column label="职务"
                       align="center">
        <template slot-scope="{row}">
          <span>{{row.name}}</span>
        </template>
      </el-table-column>

      <el-table-column label="工号"
                       align="center">
        <template slot-scope="{row}">
          <span>{{row.name}}</span>
        </template>
      </el-table-column>

      <el-table-column label="姓名"
                       align="center">
        <template slot-scope="{row}">
          <span>{{row.name}}</span>
        </template>
      </el-table-column>

      <el-table-column label="用户名"
                       align="center">
        <template slot-scope="{row}">
          <span>{{row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态"
                       prop="state"
                       align="center">
        <template slot-scope="{row}">
          <span>{{state[row.state]}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作"
                       align="center"
                       class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="text"
                     @click="handleCheckSample(row)"
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

    <el-dialog title="新增·样检"
               width="40%"
               :visible.sync="dialogAddVisible">
      <el-form ref="dataForm"
               :rules="rules"
               size="mini"
               label-width="80px"
               :model="temp">

        <div class="dialog-title"><span>样品送检</span></div>
        <el-divider></el-divider>

        <el-row>
          <el-col :span="12">
            <el-form-item label="申  请  人：">
              <el-input v-model="temp.age"
                        size="mini"
                        style="width: 100px;"></el-input>
            </el-form-item>
            <el-form-item label="申请时间：">
              <el-date-picker v-model="temp.timestamp"
                              size="mini"
                              style="width: 180px;"
                              type="datetime" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <div class="el-form-right">
              <el-form-item label-width="0px">
                <div class="el-form-no">No.T20201234</div>
              </el-form-item>
              <el-form-item label="是否存样："
                            class="el-form-check">
                <el-checkbox v-model="checked"></el-checkbox>

              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-form-item label="送样地点：">
          <el-radio-group v-model="temp.radio">
            <el-radio v-for="item in guigeOptions"
                      :key="item"
                      :label="item" />
          </el-radio-group>
        </el-form-item>

        <el-form-item label="终 产 品：">
          <el-input v-model="temp.age"
                    size="mini"
                    style="width: 100px;"></el-input>
        </el-form-item>

        <el-form-item label="样品规格：">
          <el-radio-group v-model="temp.radio">
            <el-radio v-for="item in guigeOptions"
                      :key="item"
                      :label="item" />
          </el-radio-group>
        </el-form-item>

        <el-form-item label="样品名称：">
          <el-select v-model="temp.radio"
                     size="mini"
                     clearable
                     style="width: 100px">
            <el-option v-for="item in stateOptions"
                       :key="item.key"
                       :label="item.label"
                       :value="item.label" />
          </el-select>
        </el-form-item>

        <el-form-item label="物料编码：">
          <el-input v-model="temp.age"
                    size="mini"
                    style="width: 100px;"></el-input>
        </el-form-item>

        <el-form-item label="样品等级：">
          <el-input v-model="temp.age"
                    size="mini"
                    style="width: 100px;"></el-input>
        </el-form-item>

        <el-form-item label="样品规模：">
          <el-radio-group v-model="temp.radio">
            <el-radio v-for="item in guigeOptions"
                      :key="item"
                      :label="item" />
          </el-radio-group>
        </el-form-item>

        <div>
          <div><span style="color:#878989">检项选择：</span></div>
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
                      :cell-style="stateClassName"
                      @sort-change="sortChange">

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
        </div>

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

    <el-dialog :visible.sync="dialogViewVisible"
               width="40%"
               title="查看·样检">
      <div class="el-form-no">No.T20201234</div>
      <div class="dialog-title"><span style='color:#000'>检样结果速览</span></div>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="12">
          <div class="el-dialog-item"><label>样品规格：</label><span>{{row.name}}</span></div>
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
          <div class="el-dialog-item"><label>物料编码：</label><span>{{row.name}}</span></div>
        </el-col>
        <el-col :span="12">
          <div class="el-dialog-item"><label>送样地点：</label><span>{{row.name}}</span></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="el-dialog-item"><label>样品等级：</label><span>{{row.name}}</span></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="el-dialog-item"><label>样品规格：</label><span>{{row.name}}</span></div>
        </el-col>
        <el-col :span="12">
          <div class="el-dialog-item"><label>检验时间：</label><span>{{row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span></div>
        </el-col>
      </el-row>
      <div class="flex-row-space-between"
           style="margin:10px 0 3px 0;">
        <div style="line-height:20px;"><span style="color:#878989">检项选择：</span></div>
        <el-button :type="isCheckSelect? 'red':'info'"
                   size="mini"
                   style="width: 60px; height:20px; min-height:20px;"
                   @click="checkStatus">
          复检
        </el-button>
      </div>
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
                  :cell-style="stateClassName"
                  @sort-change="sortChange">

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
          <el-table-column label="检测结果"
                           prop="no"
                           align="center">
          </el-table-column>
        </el-table>
      </div>
      <div>
        <div style="color:#878989;padding:10px 0 3px 0"><span>复检原因：</span></div>
        <div>
          <el-input type="textarea"
                    maxlength="300"
                    :rows="2"
                    size="small"
                    placeholder="请输入300字内的原因"
                    v-model="textarea">
          </el-input>
        </div>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="red"
                   size="mini"
                   style="width: 80px;"
                   @click="dialogStatus==='create'?createData():updateData()">
          提交复检
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
  name: '送检',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
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
      state: ['', '正常', '停用'],
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
      dialogViewVisible: false,
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
    checkStatus() {
      this.isCheckSelect = !this.isCheckSelect
    },
    handleFilter() {
      this.searchParam.page = 1
      this.getList()
    },
    handleCheckSample(row) {
      console.log(row)
      this.dialogViewVisible = true
      this.row = row
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
    }
  },
  handleSelectionChange(val) {
    this.multipleSelection = val
  }
}
</script>


<style lang="scss" scoped>
.el-form-no {
  text-align: right;
  font-size: 18px;
  color: #cb0000;
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
