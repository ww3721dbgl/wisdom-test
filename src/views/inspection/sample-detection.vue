<template>

  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="searchParam.no"
                placeholder="检验号"
                style="width: 150px;"
                class="filter-item"
                @keyup.enter.native="handleFilter" />

      <el-date-picker v-model="searchParam.startTime"
                      type="date"
                      style="width: 150px;"
                      class="filter-item"
                      placeholder="录入-开始时间">
      </el-date-picker>

      <el-date-picker v-model="searchParam.startTime"
                      type="date"
                      style="width: 150px;"
                      class="filter-item"
                      placeholder="录入-结束时间">
      </el-date-picker>

      <el-select v-model="searchParam.guige"
                 placeholder="结果录入"
                 clearable
                 style="width: 150px"
                 class="filter-item">
        <el-option v-for="item in guigeOptions"
                   :key="item"
                   :label="item"
                   :value="item" />
      </el-select>

      <el-button class="filter-item"
                 type="primary"
                 style="width: 120px;"
                 icon="el-icon-search"
                 @click="handleFilter">
        搜索
      </el-button>
    </div>
    <div class="tab-container">
      <el-tabs style="margin-top:5px;"
               type="border-card">
        <el-tab-pane label="我的任务">
          <span slot="label">我的任务
            <el-badge :value="count" /></span>
          <div class="app-my-task-container">
            <el-row>
              <el-col :span="24">
                <div>
                  <el-input placeholder="检验单号"
                            style="width: 200px;"
                            class="filter-item" />
                </div>
              </el-col>
            </el-row>
            <el-table :key="tableKey"
                      v-loading="listLoading"
                      :data="list"
                      border
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
                  <span style="color:#fff">{{state[row.state]}}</span>
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
                  <el-button class="filter-item"
                             style="margin-left: 10px;width: 120px;"
                             type="success"
                             icon="el-icon-edit"
                             @click="handleCreate">
                    批量领检
                  </el-button>
                </div>
              </el-col>
            </el-row>
            <el-table :key="tableKey"
                      v-loading="listLoading"
                      :data="list"
                      border
                      fit
                      highlight-current-row
                      style="width: 100%;margin-top:20px"
                      :cell-style="stateClassName"
                      @sort-change="sortChange">

              <el-table-column type="selection"
                               align="center"
                               width="55">
              </el-table-column>

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
                               width="120"
                               class-name="small-padding fixed-width">
                <template slot-scope="{row}">
                  <el-button type="success"
                             size="mini"
                             @click="handleModifyStatus(row,'draft')">
                    领检
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
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>

</template>

<script>
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: '检效管理',
  components: { Pagination }
}
</script>