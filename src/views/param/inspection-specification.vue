<template>
  <div class="app-container">
    <div class="filter-container">
      <div>
        <div class="filter-item">
          <span>送样地点:</span>
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
        <div class="filter-item">
          <span>方法属性:</span>
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
        <div class="filter-item">
          <span>检验规则:</span>
          <el-input v-model="searchParam.name"
                    size="mini"
                    style="width: 100px;"
                    @keyup.enter.native="handleFilter" />
        </div>
      </div>
      <div class="flex-row-space-between">
        <div>
          <div class="filter-item">
            <span style="letter-spacing:0.5em;margin-right:-0.5em;">检验组</span><span>:</span>
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
          <div class="filter-item">
            <span style="letter-spacing:0.5em;margin-right:-0.5em;">规则值</span><span>:</span>
            <el-input v-model="searchParam.name"
                      size="mini"
                      style="width: 270px;"
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
              @selection-change="handleSelectionChange"
              @sort-change="sortChange">

      <el-table-column type="selection"
                       align="center"
                       width="55">
      </el-table-column>

      <el-table-column label="规则编码"
                       prop="no"
                       align="center">

        <template slot-scope="{row}">
          <span>{{ row.no }}</span>
        </template>
      </el-table-column>

      <el-table-column label="等级"
                       align="center">

        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="送样地点"
                       align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="方法属性"
                       align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="物料名称"
                       align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="规则值"
                       align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="检验组"
                       align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="编辑"
                       align="center"
                       class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="text"
                     @click="handleCheckSample(row)"
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

    <el-dialog title="新增·样检"
               width="40%"
               append-to-body
               :visible.sync="dialogAddVisible">
      <el-form ref="dataForm"
               :rules="rules"
               size="mini"
               label-width="80px"
               :model="temp">

        <div class="dialog-title"><span>样品送检</span></div>
        <el-divider></el-divider>

        <el-row>
          <el-col :span="24">
            <div class="el-dialog-item"><label>样品规格：</label>
              <el-select v-model="temp.radio"
                         size="mini"
                         clearable
                         style="width: 100px">
                <el-option v-for="item in stateOptions"
                           :key="item.key"
                           :label="item.label"
                           :value="item.label" />
              </el-select>

            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <div class="el-dialog-item"><label>物料名称：</label>
              <el-input v-model="temp.title"
                        size="mini"
                        style="width: 100px;" />
            </div>
          </el-col>
          <el-col :span="12">
            <div class="el-dialog-item"><label>物料规格：</label>
              <el-select v-model="temp.radio"
                         size="mini"
                         clearable
                         style="width: 100px">
                <el-option v-for="item in stateOptions"
                           :key="item.key"
                           :label="item.label"
                           :value="item.label" />
              </el-select>
            </div>
          </el-col>
        </el-row>

        <div class="el-dialog-group"><label>送样地点：</label>
          <el-checkbox-group v-model="checkedCities"
                             style="width:87%"
                             @change="handleCheckedCitiesChange">
            <el-checkbox v-for="city in cities"
                         :label="city"
                         :key="city">{{city}}</el-checkbox>
          </el-checkbox-group>
        </div>

        <div class="el-dialog-group"><label>方法属性：</label>
          <el-checkbox-group v-model="checkedCities"
                             style="width:87%"
                             @change="handleCheckedCitiesChange">
            <el-checkbox v-for="city in cities"
                         :label="city"
                         :key="city">{{city}}</el-checkbox>
          </el-checkbox-group>
        </div>

        <div class="el-dialog-group"><label>送样部门：</label>
          <el-checkbox-group v-model="checkedCities"
                             style="width:87%"
                             @change="handleCheckedCitiesChange">
            <el-checkbox v-for="city in cities"
                         :label="city"
                         :key="city">{{city}}</el-checkbox>
          </el-checkbox-group>
        </div>

        <div>
          <div><span style="color:#878989">检验部门：</span></div>
          <div class="el-dialog-dep">
            <el-checkbox-group v-model="checkedCities"
                               @change="handleCheckedCitiesChange">
              <el-checkbox v-for="city in cities"
                           :label="city"
                           :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>

      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   size="mini"
                   style="width: 80px;"
                   @click="dialogStatus==='create'?createData():updateData()">
          完成
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
  name: 'inspection-specification',
  components: { Pagination },
  directives: { waves },
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
      textarea: '',
      row: [],
      cities: [
        '上海',
        '北京',
        '广州',
        '深圳',
        '上海1',
        '北京1',
        '广州1',
        '深圳1',
        '上海2',
        '北京2',
        '广州2',
        '深圳2',
        '上海3',
        '北京3',
        '广州3',
        '深圳3'
      ],
      checkedCities: [],
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
      state: [' ', '未送样', '待领检', '检验中', '复检中', '审核中', '完成'],
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
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleCheckedCitiesChange(value) {
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

.el-dialog .el-button--primary {
  background-color: #4f9f9d;
  border-color: #4f9f9d;
}

.el-dialog-dep {
  border: solid 1px #4f9f9d;
  overflow: auto;
  margin-top: 3px;
  padding: 10px 10px 10px 30px;
  height: 100px;
  border-radius: 4px;
  .el-checkbox {
    width: 90px;
  }
}

.el-dialog-group {
  display: flex;
  flex-direction: row;
  color: #878989;
  font-size: 13px;
  margin-bottom: 10px;
}
</style>
