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
          <span>审核状态:</span>
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
          <span>物料等级:</span>
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
          <span>物料规格:</span>
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
          <span>物料编码:</span>
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
      </div>

      <div>
        <div class="filter-item">
          <span>申请人:</span>
          <el-input v-model="searchParam.applicant"
                    size="mini"
                    style="width: 100px;"
                    @keyup.enter.native="handleFilter" />
        </div>
        <div class="filter-item">
          <span>标准编号:</span>
          <el-input v-model="searchParam.no"
                    size="mini"
                    style="width: 100px;"
                    @keyup.enter.native="handleFilter" />
        </div>
        <div class="filter-item">
          <span style="letter-spacing:0.5em;margin-right:-0.5em;">终产品</span>
          <span>:</span>
          <el-input v-model="searchParam.no"
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
        <div class="filter-item filter-item-btn-search">
          <i class="el-icon-search"
             @click="handleFilter"></i>
        </div>
        <el-button class="filter-btn-item"
                   size="mini"
                   style="margin-left: 30px;width: 80px;"
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
                       prop="date"
                       sortable="custom"
                       align="center"
                       :class-name="getSortClass('date')">
        <template slot-scope="{row}">
          <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column label="标准编号"
                       prop="no"
                       align="center"
                       width="150">
        <template slot-scope="{row}">
          <span>{{ row.no }}</span>
        </template>
      </el-table-column>

      <el-table-column label="审核状态"
                       prop="state"
                       width="80px"
                       align="center">
        <template slot-scope="{row}">
          <span>{{state[row.state]}}</span>
        </template>
      </el-table-column>

      <el-table-column label="物料名称"
                       prop="no"
                       align="center"
                       width="150">
        <template slot-scope="{row}">
          <span>{{ row.no }}</span>
        </template>
      </el-table-column>

      <el-table-column label="物料规格"
                       width="80px"
                       align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="物料等级"
                       width="80px">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="物料编码"
                       width="80px">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="补充说明"
                       width="120px">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作"
                       align="center"
                       width="120"
                       class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <label @click="handleView(row)"
                 class="table-view">
            查看
          </label> ·
          <label @click="handleUpdate(row)"
                 class="table-view">
            修订
          </label>

        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0"
                :total="total"
                :page.sync="searchParam.page"
                :limit.sync="searchParam.limit"
                @pagination="getList" />

    <el-dialog :visible.sync="dialogAddVisible"
               width="40%"
               title="新增·质量标准">
      <el-form ref="dataForm"
               :rules="rules"
               :model="temp"
               label-position="left"
               size="mini"
               label-width="0px">
        <div class="dialog-title"><span>新增质量标准</span></div>
        <el-divider></el-divider>
        <el-row type="flex"
                align="middle">
          <el-col :span="12"
                  style="margin-top:10px">
            <div class="el-dialog-item"><label class="w3"
                     style="margin-right:-0.5em">申请号</label><label>：</label>
              <el-input v-model="temp.title"
                        size="mini"
                        style="width: 140px;" />
            </div>
            <div class="el-dialog-item"><label>起草时间：</label>
              <el-date-picker v-model="searchParam.time"
                              size="mini"
                              type="date"
                              style="width: 140px;">
              </el-date-picker>
            </div>
            <div class="el-dialog-item"><label class="w3"
                     style="margin-right:-0.5em">起草人</label><label>：</label>
              <el-input v-model="temp.title"
                        size="mini"
                        style="width: 140px;" />
            </div>
            <div class="el-dialog-item"
                 style="margin-top:20px"><label>标准编号：</label>
              <el-input v-model="temp.title"
                        size="mini"
                        style="width: 140px;" />
            </div>
            <div class="el-dialog-item"><label class="w2"
                     style="margin-right:-2em">版本</label><label>：</label>
              <el-input v-model="temp.title"
                        size="mini"
                        style="width: 140px;" />
            </div>
          </el-col>
          <el-col :span="12">
            <div class="el-col-frame">
              <el-row type="flex"
                      align="middle">
                <legend>物料信息</legend>
                <div style="margin:15px 15px 9px 15px">
                  <div class="el-dialog-item"><label>物料编码：</label>P01028</div>
                  <div class="el-dialog-item"><label class="w3">检验号</label>：P01028</div>
                  <div class="el-dialog-item"><label>申请时间：</label>P01028</div>
                  <div class="el-dialog-item"><label>物料规格：</label>P01028</div>
                  <div class="el-dialog-item"><label>物料名称：</label>P01028</div>
                  <div class="el-dialog-item"><label>物料等级：</label>P01028</div>
                </div>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <div class="flex-row-space-between"
             style="margin:20px 0 0px 0;">
          <div style="line-height:20px;"><span style="color:#878989">标准明细：</span></div>
          <div>
            <i class="el-icon-search"
               @click="handleFilter"></i>
            <i class="el-icon-search"
               style="margin-left:10px"
               @click="handleFilter"></i>
          </div>
        </div>
        <div class="el-dialog-table el-div-green">
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
                             width="40">
            </el-table-column>
            <el-table-column label="检项名称"
                             prop="no"
                             align="center">
            </el-table-column>
            <el-table-column label="质量标准"
                             prop="no"
                             align="center">
            </el-table-column>
            <el-table-column label="方法名称"
                             prop="no"
                             align="center">
            </el-table-column>
            <el-table-column label="方法名称"
                             prop="no"
                             align="center">
            </el-table-column>
            <el-table-column label="方法名称"
                             prop="no"
                             align="center">
            </el-table-column>
            <el-table-column label="工时"
                             prop="no"
                             align="center">
            </el-table-column>
          </el-table>
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

    <el-dialog :visible.sync="dialogEditVisible"
               width="40%"
               title="修订·质量标准">
      <el-form ref="dataForm"
               :rules="rules"
               :model="temp"
               label-position="left"
               size="mini"
               label-width="0px">
        <div class="dialog-title"><span style='color:#cb0000'>修订质量标准</span></div>
        <el-divider></el-divider>
        <el-row type="flex"
                align="middle">
          <el-col :span="12"
                  style="margin-top:10px">
            <div class="el-dialog-item"><label class="w3"
                     style="margin-right:-0.5em">申请号</label><label>：</label>
              <el-input v-model="temp.title"
                        size="mini"
                        style="width: 140px;" />
            </div>
            <div class="el-dialog-item"><label>起草时间：</label>
              <el-date-picker v-model="searchParam.time"
                              size="mini"
                              type="date"
                              style="width: 140px;">
              </el-date-picker>
            </div>
            <div class="el-dialog-item"><label class="w3"
                     style="margin-right:-0.5em">起草人</label><label>：</label>
              <el-input v-model="temp.title"
                        size="mini"
                        style="width: 140px;" />
            </div>
            <div class="el-dialog-item"
                 style="margin-top:20px"><label>标准编号：</label>
              <el-input v-model="temp.title"
                        size="mini"
                        style="width: 140px;" />
            </div>
            <div class="el-dialog-item"><label class="w2"
                     style="margin-right:-2em">版本</label><label>：</label>
              <el-input v-model="temp.title"
                        size="mini"
                        style="width: 140px;" />
            </div>
          </el-col>
          <el-col :span="12">
            <div class="el-col-frame">
              <el-row type="flex"
                      align="middle">
                <legend>物料信息</legend>
                <div style="margin:15px 15px 9px 15px">
                  <div class="el-dialog-item"><label>物料编码：</label>P01028</div>
                  <div class="el-dialog-item"><label class="w3">检验号</label>：P01028</div>
                  <div class="el-dialog-item"><label>申请时间：</label>P01028</div>
                  <div class="el-dialog-item"><label>物料规格：</label>P01028</div>
                  <div class="el-dialog-item"><label>物料名称：</label>P01028</div>
                  <div class="el-dialog-item"><label>物料等级：</label>P01028</div>
                </div>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <div class="flex-row-space-between"
             style="margin:20px 0 0px 0;">
          <div style="line-height:20px;"><span style="color:#878989">标准明细：</span></div>
          <div>
            <i class="el-icon-search"
               @click="handleFilter"></i>
            <i class="el-icon-search"
               style="margin-left:10px"
               @click="handleFilter"></i>
          </div>
        </div>
        <div class="el-dialog-table el-div-green">
          <el-table :key="tableKey"
                    v-loading="listLoading"
                    :data="list"
                    border
                    fit
                    height="100px"
                    size="mini"
                    highlight-current-row
                    style="width: 100%;"
                    :cell-style="stateClassName"
                    @sort-change="sortChange">

            <el-table-column type="selection"
                             align="center"
                             width="40">
            </el-table-column>
            <el-table-column label="检项名称"
                             prop="no"
                             align="center">
            </el-table-column>
            <el-table-column label="质量标准"
                             prop="no"
                             align="center">
            </el-table-column>
            <el-table-column label="方法名称"
                             prop="no"
                             align="center">
            </el-table-column>
            <el-table-column label="方法名称"
                             prop="no"
                             align="center">
            </el-table-column>
            <el-table-column label="方法名称"
                             prop="no"
                             align="center">
            </el-table-column>
            <el-table-column label="工时"
                             prop="no"
                             align="center">
            </el-table-column>
          </el-table>
        </div>
        <div class="el-dialog-table el-div-version"
             style="margin-top:20px">
          <el-table :key="tableKey"
                    v-loading="listLoading"
                    :data="list"
                    border
                    fit
                    height="100px"
                    size="mini"
                    highlight-current-row
                    style="width: 100%;"
                    :cell-style="stateClassName"
                    @sort-change="sortChange">

            <el-table-column type="selection"
                             align="center"
                             width="40">

            </el-table-column>
            <el-table-column label="标准编号"
                             prop="no"
                             align="center">
              <template slot-scope="{row}">
                <span>{{ row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="版本"
                             prop="no"
                             align="center">
              <template slot-scope="{row}">
                <span>{{ row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="补充说明"
                             prop="no"
                             align="center">
              <template slot-scope="{row}">
                <span>{{ row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="修订人"
                             prop="no"
                             align="center">
              <template slot-scope="{row}">
                <span>{{ row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="修订时间"
                             prop="no"
                             align="center">
              <template slot-scope="{row}">
                <span>{{ row.name }}</span>
              </template>
            </el-table-column>
          </el-table>
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
               title="质量标准·审批">
      <el-form ref="dataForm"
               :rules="rules"
               :model="temp"
               label-position="left"
               size="mini"
               label-width="0px">
        <div class="dialog-title"><span>质量标准版本查看</span></div>
        <el-divider></el-divider>
        <el-row type="flex"
                align="middle">
          <el-col :span="12"
                  style="margin-top:10px">
            <div class="el-dialog-item"><label class="w3"
                     style="margin-right:-0.5em">申请号</label>：<span>{{row.name}}</span>
            </div>
            <div class="el-dialog-item">
              <div class="el-dialog-item"><label>起草时间：</label><span>{{row.name}}</span></div>
            </div>
            <div class="el-dialog-item"><label class="w3"
                     style="margin-right:-0.5em">起草人</label>：<span>{{row.name}}</span>
            </div>
            <div class="el-dialog-item"
                 style="margin-top:20px"><label>标准编号：</label>
              <span>{{row.name}}</span>
            </div>
            <div class="el-dialog-item"><label class="w2"
                     style="margin-right:-2em">版本</label>：
              <span>{{row.name}}</span>
            </div>
          </el-col>
          <el-col :span="12"> 
            <div class="el-col-frame">
              <el-row type="flex"
                      align="middle">
                <legend>物料信息</legend>
                <div style="margin:15px 15px 9px 15px">
                  <div class="el-dialog-item"><label>物料编码：</label>P01028</div>
                  <div class="el-dialog-item"><label class="w3">检验号</label>：P01028</div>
                  <div class="el-dialog-item"><label>申请时间：</label>P01028</div>
                  <div class="el-dialog-item"><label>物料规格：</label>P01028</div>
                  <div class="el-dialog-item"><label>物料名称：</label>P01028</div>
                  <div class="el-dialog-item"><label>物料等级：</label>P01028</div>
                </div>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <div class="flex-row-space-between">
          <div style="line-height:20px;"><span style="color:#878989;font-size:13px">标准明细：</span></div>
        </div>
        <div class="el-dialog-table el-div-green">
          <el-table :key="tableKey"
                    v-loading="listLoading"
                    :data="list"
                    border
                    fit
                    height="100px"
                    size="mini"
                    highlight-current-row
                    style="width: 100%;"
                    :cell-style="stateClassName"
                    @sort-change="sortChange">
            <el-table-column label="序号"
                             prop="no"
                             align="center">
            </el-table-column>
            <el-table-column label="检项名称"
                             prop="no"
                             align="center">
            </el-table-column>
            <el-table-column label="质量标准"
                             prop="no"
                             align="center">
            </el-table-column>
            <el-table-column label="方法名称"
                             prop="no"
                             align="center">
            </el-table-column>
            <el-table-column label="方法名称"
                             prop="no"
                             align="center">
            </el-table-column>
            <el-table-column label="方法名称"
                             prop="no"
                             align="center">
            </el-table-column>
            <el-table-column label="工时"
                             prop="no"
                             align="center">
            </el-table-column>
          </el-table>
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
  </div>
</template>

<script>
// import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
import waves from '@/views/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: '检验方法',
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
        sort: '+date'
      },
      row: [],
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
      dialogAddVisible: false,
      dialogEditVisible: false,
      dialogViewVisible: false,
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

      if (columnIndex == 5) {
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
    handleView(row) {
      console.log(row)
      this.dialogViewVisible = true
    },
    handleFilter() {},
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
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
      this.dialogAddVisible = true
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
      console.log(row)

      this.dialogEditVisible = true
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
.el-div-version {
  .el-table .el-table__header th {
    background-color: #d8dad7;
    color: #7e7f7d;
  }
}
</style>

<style lang="scss" scoped>
.el-col-frame {
  border: 1px solid #dcdfe6;
  width: 100%;
  legend {
    background: #fff;
    margin-left: -9px;
    writing-mode: tb-rl;
    color: #878989;
    padding: 10px 0;
  }
}

.el-dialog .el-button--primary {
  background-color: #4f9f9d;
  border-color: #4f9f9d;
}
</style>
