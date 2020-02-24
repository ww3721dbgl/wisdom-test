<template>
  <div class="app-container">
    <div class="filter-container"
         style="margin-left:20px">
      <div>
        <div class="filter-item">
          <span>检验号:</span>
          <el-input v-model="searchParam.no"
                    size="mini"
                    style="width: 100px;"
                    @keyup.enter.native="handleFilter" />
        </div>

        <div class="filter-item">
          <span>录入时间:</span>
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

        <div class="filter-item">
          <span>结果录入:</span>
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
        <div class="filter-item filter-item-btn-search">
          <i class="el-icon-search"
             @click="handleFilter"></i>
        </div>
      </div>
    </div>
    <div class="tab-container">
      <el-tabs style="margin-top:5px;"
               type="border-card">
        <el-tab-pane label="我的任务">
          <span slot="label">
            我的任务
            <el-badge :value="count" />
          </span>
          <div class="app-my-task-container">
            <el-row>
              <el-col :span="24"
                      style="padding-left:20px">
                <div>
                  <span class="svg-container">
                    <svg-icon class="svg-icon"
                              icon-class="edit" />
                  </span>
                  <el-input placeholder="扫码输入检验单号"
                            style="width: 160px"
                            size="mini" />
                </div>
              </el-col>
            </el-row>
            <el-table :key="tableKey"
                      v-loading="listLoading"
                      :data="list"
                      border
                      size="mini"
                      fit
                      highlight-current-row
                      style="width: 100%;margin-top:20px"
                      :cell-style="stateClassName"
                      @sort-change="sortChange">

              <el-table-column label="检验单号"
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

              <el-table-column label="送检时间"
                               width="150px"
                               align="center">
                <template slot-scope="{row}">
                  <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
                </template>
              </el-table-column>

              <el-table-column label="物料编码"
                               width="120px"
                               align="center">
                <template slot-scope="{row}">
                  <span>{{ row.name }}</span>
                </template>
              </el-table-column>

              <el-table-column label="样品名称"
                               width="150px"
                               align="center">
                <template slot-scope="{row}">
                  <span>{{ row.name }}</span>
                </template>
              </el-table-column>

              <el-table-column label="样品规格"
                               align="center"
                               width="80px">
                <template slot-scope="{row}">
                  <span>{{ row.name }}</span>
                </template>
              </el-table-column>

              <el-table-column label="样品等级"
                               align="center"
                               width="80px">
                <template slot-scope="{row}">
                  <span>{{ row.name }}</span>
                </template>
              </el-table-column>

              <el-table-column label="送样地点"
                               align="center"
                               width="120px">
                <template slot-scope="{row}">
                  <span>{{ row.name }}</span>
                </template>
              </el-table-column>

              <el-table-column label="检项数"
                               align="center"
                               width="80px">
                <template slot-scope="{row}">
                  <span>{{ row.name }}</span>
                </template>
              </el-table-column>

              <el-table-column label="结果录入"
                               align="center"
                               width="200px">
                <template slot-scope="{row}">
                  <span>{{ row.name }}</span>
                </template>
              </el-table-column>

              <el-table-column label="录入时间"
                               width="150px"
                               align="center">
                <template slot-scope="{row}">
                  <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
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
            </el-table>
            <pagination v-show="total>0"
                        :total="total"
                        :page.sync="searchParam.page"
                        :limit.sync="searchParam.limit"
                        @pagination="getList" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="待领任务">
          <div class="app-pending-task-container">
            <el-row>
              <el-col :span="24"
                      style="text-align: right;">
                <div>
                  <el-button size="mini"
                             style="margin-left: 10px;width: 100px;"
                             type="primary"
                             icon="el-icon-edit-outline"
                             @click="handleDetections">批量领检</el-button>
                </div>
              </el-col>
            </el-row>
            <el-table :key="tableKey"
                      v-loading="listLoading"
                      :data="list"
                      border
                      size="mini"
                      fit
                      highlight-current-row
                      style="width: 100%;margin-top:20px"
                      :cell-style="stateClassName"
                      @sort-change="sortChange">
              <el-table-column type="selection"
                               align="center"
                               width="55"></el-table-column>

              <el-table-column label="检验号"
                               prop="no"
                               align="center"
                               width="150"
                               :class-name="getSortClass('no')">
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

              <el-table-column label="送检时间"
                               width="150px"
                               align="center">
                <template slot-scope="{row}">
                  <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
                </template>
              </el-table-column>

              <el-table-column label="样品规格"
                               align="center"
                               width="80px">
                <template slot-scope="{row}">
                  <span>{{ row.name }}</span>
                </template>
              </el-table-column>

              <el-table-column label="样品等级"
                               align="center"
                               width="80px">
                <template slot-scope="{row}">
                  <span>{{ row.name }}</span>
                </template>
              </el-table-column>

              <el-table-column label="送样地点"
                               align="center"
                               width="120px">
                <template slot-scope="{row}">
                  <span>{{ row.name }}</span>
                </template>
              </el-table-column>

              <el-table-column label="结果录入"
                               align="center"
                               width="200px">
                <template slot-scope="{row}">
                  <span>{{ row.name }}</span>
                </template>
              </el-table-column>

              <el-table-column label="录入时间"
                               width="150px"
                               align="center">
                <template slot-scope="{row}">
                  <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
                </template>
              </el-table-column>

              <el-table-column label="检项数"
                               align="center"
                               width="80px">
                <template slot-scope="{row}">
                  <span>{{ row.name }}</span>
                </template>
              </el-table-column>

              <el-table-column label="操作"
                               align="center"
                               width="120">
                <template slot-scope="{row}">

                  <el-button v-if="row.state == 1"
                             type="primary"
                             icon="el-icon-edit-outline"
                             size="mini"
                             @click="handleDetection(row)">领检</el-button>
                  <el-button v-else
                             type="info"
                             icon="el-icon-edit-outline"
                             size="mini"
                             @click="handleDetection(row)">领检</el-button>
                </template>
              </el-table-column>
            </el-table>
            <pagination v-show="total>0"
                        :total="total"
                        :page.sync="searchParam.page"
                        :limit.sync="searchParam.limit"
                        @pagination="getList" />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <el-dialog :visible.sync="dialogzViewVisible"
               append-to-body
               width="40%"
               title="检样领检">

      <div class="dialog-title"><span style='color:#cb0000'>检样领检</span></div>
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
        <el-col :span="24">
          <div class="el-dialog-item"><label>检项数量：</label><span>{{row.name}}</span></div>
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

      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   size="mini"
                   style="width: 80px;"
                   @click="dialogStatus==='create'?createData():updateData()">
          领检
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogEnterVisible"
               append-to-body
               width="40%"
               title="检验结果录入">

      <div class="dialog-title"><span>检验结果录入</span></div>
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
      <div class="flex-row-space-between">
        <div style="line-height:15px; font-size:13px;"><span style="color:#878989">检项数量：</span><span>{{row.name}}</span></div>
        <el-button type="primary"
                   size="mini"
                   style="width: 60px; height:15px; min-height:15px; font-size: 8px;"
                   @click="updateJpg">
          JPG上传
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
            <template slot-scope="{row}">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="质量标准"
                           prop="no"
                           align="center">
            <template slot-scope="{row}">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="检验结果"
                           prop="no"
                           align="center">
            <template slot-scope="{row}">
              <el-input v-model="searchParam.no"
                        size="mini"
                        @keyup.enter.native="handleFilter">{{ row.name }}</el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="flex-row-space-between"
           style="margin-top:10px">
        <div style="line-height:15px; font-size:13px;"><span style="color:#878989">复检项：</span></div>
        <el-button type="primary"
                   size="mini"
                   style="width: 60px; height:15px; min-height:15px; font-size: 8px;"
                   @click="updateJpg">
          JPG上传
        </el-button>
      </div>
      <div class="el-dialog-table el-div-review">
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
            <template slot-scope="{row}">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="质量标准"
                           prop="no"
                           align="center">
            <template slot-scope="{row}">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="检验结果"
                           prop="no"
                           align="center">
            <template slot-scope="{row}">
              <el-input v-model="searchParam.no"
                        size="mini"
                        @keyup.enter.native="handleFilter">{{ row.name }}</el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   size="mini"
                   style="width: 80px;"
                   @click="dialogStatus==='create'?createData():updateData()">
          领检
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
  name: 'sample-detection',
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
      dialogzViewVisible: false,
      dialogEnterVisible: false,
      count: 10,
      row: [],
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
      if (columnIndex == 11) {
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
    handleDetection(row) {
      this.row = row
      this.dialogzViewVisible = true
    },
    handleDetections() {
      this.dialogEnterVisible = true
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
    updateJpg() {},
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
.el-div-review {
  .el-table .el-table__header th {
    background-color: #c55a0e;
  }
}

.el-dialog {
  .el-table .el-input__inner {
    border: 0px;
    background-color: transparent;
  }
}
</style>

<style lang="scss" scoped>
.app-container {
  padding: 20px 0;
}

.svg-container {
  color: #2995de;
  vertical-align: middle;
  width: 30px;
  display: inline-block;
}

.el-dialog .dialog-footer .el-button--primary {
  background-color: #4f9f9d;
  border-color: #4f9f9d;
}
</style>