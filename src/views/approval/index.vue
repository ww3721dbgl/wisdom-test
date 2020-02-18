<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="filter-container-item">
        <div class="filter-item">
          <span>名称</span>
          <el-input v-model="searchParam.no"
                    size="mini"
                    style="width: 100px;"
                    @keyup.enter.native="handleFilter" />
        </div>
        <div class="filter-item">
          <span>审核状态</span>
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
          <span>时间</span>
          <el-date-picker v-model="searchParam.startTime"
                          size="mini"
                          type="date"
                          style="width: 140px;"></el-date-picker>
          <span>&nbsp;-</span>
          <el-date-picker v-model="searchParam.startTime"
                          size="mini"
                          style="width: 140px;"></el-date-picker>
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
        <el-tab-pane label="检验报告">
          <span slot="label">
            检验报告
            <el-badge :value="count" />
          </span>
          <div class="app-report-approval-container">
            <el-row>
              <el-col :span="24">
                <div class="el-input-scan">
                  <span class="svg-container">
                    <svg-icon icon-class="scan" />
                  </span>
                  扫码审批
                  <el-input style="width: 160px; margin-left:10px;"
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
              <el-table-column label="审批号"
                               prop="no"
                               align="center"
                               width="150">
                <template slot-scope="{row}">
                  <span>{{ row.no }}</span>
                </template>
              </el-table-column>

              <el-table-column label="检验号"
                               align="center"
                               width="100">
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

              <el-table-column label="样品批号"
                               align="center"
                               width="80px">
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

              <el-table-column label="送样地点"
                               align="center"
                               width="120px">
                <template slot-scope="{row}">
                  <span>{{ row.name }}</span>
                </template>
              </el-table-column>

              <el-table-column label="检验人"
                               align="center"
                               width="80px">
                <template slot-scope="{row}">
                  <span>{{ row.name }}</span>
                </template>
              </el-table-column>

              <el-table-column label="送审时间"
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

              <el-table-column label="状态"
                               prop="state"
                               width="80px"
                               align="center">
                <template slot-scope="{row}">
                  <span>{{state[row.state]}}</span>
                </template>
              </el-table-column>

              <el-table-column label="审核时间"
                               width="150px"
                               align="center">
                <template slot-scope="{row}">
                  <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
                </template>
              </el-table-column>

              <el-table-column label="操作"
                               align="center"
                               width="120"
                               class-name="small-padding fixed-width">
                <template slot-scope="{row}">
                  <label @click="handleCreate(row)"
                         class="table-view">查看</label>
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
        <el-tab-pane label="物料编码">
          <span slot="label">
            物料编码
            <el-badge :value="count" />
          </span>
          <div class="app-other-approval-container">
            <el-table :key="tableKey"
                      v-loading="listLoading"
                      :data="list"
                      border
                      size="mini"
                      fit
                      highlight-current-row
                      style="width: 100%;margin-top:20px"
                      :cell-style="stateClassNameNo"
                      @sort-change="sortChange">
              <el-table-column label="审批号"
                               prop="no"
                               align="center"
                               width="150">
                <template slot-scope="{row}">
                  <span>{{ row.no }}</span>
                </template>
              </el-table-column>

              <el-table-column label="申请人"
                               align="center"
                               width="80px">
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

              <el-table-column label="参考物料"
                               align="center"
                               width="80px">
                <template slot-scope="{row}">
                  <span>{{ row.name }}</span>
                </template>
              </el-table-column>

              <el-table-column label="物料编码"
                               align="center"
                               width="80px">
                <template slot-scope="{row}">
                  <span>{{ row.name }}</span>
                </template>
              </el-table-column>

              <el-table-column label="送审时间"
                               width="150px"
                               align="center">
                <template slot-scope="{row}">
                  <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
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

              <el-table-column label="完成时间"
                               width="150px"
                               align="center">
                <template slot-scope="{row}">
                  <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
                </template>
              </el-table-column>

              <el-table-column label="操作"
                               align="center"
                               width="120"
                               class-name="small-padding fixed-width">
                <template slot-scope="{row}">
                  <label @click="handleCreate1(row)"
                         class="table-view">查看</label>
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
        <el-tab-pane label="检验方法">
          <span slot="label">
            检验方法
            <el-badge :value="count" />
          </span>
          <div class="app-other-approval-container">
            <el-table :key="tableKey"
                      v-loading="listLoading"
                      :data="list"
                      border
                      size="mini"
                      fit
                      highlight-current-row
                      style="width: 100%;margin-top:20px"
                      :cell-style="stateClassNameDetection"
                      @sort-change="sortChange">
              <el-table-column label="审批号"
                               prop="no"
                               align="center"
                               width="150">
                <template slot-scope="{row}">
                  <span>{{ row.no }}</span>
                </template>
              </el-table-column>

              <el-table-column label="申请人"
                               align="center"
                               width="80px">
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

              <el-table-column label="检项名称"
                               align="center"
                               width="80px">
                <template slot-scope="{row}">
                  <span>{{ row.name }}</span>
                </template>
              </el-table-column>

              <el-table-column label="方法名称"
                               align="center"
                               width="180px">
                <template slot-scope="{row}">
                  <span>{{ row.name }}</span>
                </template>
              </el-table-column>

              <el-table-column label="方法属性"
                               align="center"
                               width="80px">
                <template slot-scope="{row}">
                  <span>{{ row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column label="送审时间"
                               width="150px"
                               align="center">
                <template slot-scope="{row}">
                  <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
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

              <el-table-column label="完成时间"
                               width="150px"
                               align="center">
                <template slot-scope="{row}">
                  <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
                </template>
              </el-table-column>

              <el-table-column label="操作"
                               align="center"
                               width="120"
                               class-name="small-padding fixed-width">
                <template slot-scope="{row}">
                  <label @click="handleCreate2(row)"
                         class="table-view">查看</label>
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
        <el-tab-pane label="质量标准">
          <span slot="label">
            质量标准
            <el-badge :value="count" />
          </span>
          <div class="app-other-approval-container">
            <el-table :key="tableKey"
                      v-loading="listLoading"
                      :data="list"
                      border
                      size="mini"
                      fit
                      highlight-current-row
                      style="width: 100%;margin-top:20px"
                      :cell-style="stateClassNameQuality"
                      @sort-change="sortChange">
              <el-table-column label="审批号"
                               prop="no"
                               align="center"
                               width="150"
                               :class-name="getSortClass('no')">
                <template slot-scope="{row}">
                  <span>{{ row.no }}</span>
                </template>
              </el-table-column>

              <el-table-column label="起修人"
                               align="center"
                               width="100">
                <template slot-scope="{row}">
                  <span>{{ row.name }}</span>
                </template>
              </el-table-column>

              <el-table-column label="物料名称"
                               align="center"
                               width="80px">
                <template slot-scope="{row}">
                  <span>{{ row.name }}</span>
                </template>
              </el-table-column>

              <el-table-column label="检项名称"
                               align="center"
                               width="80px">
                <template slot-scope="{row}">
                  <span>{{ row.name }}</span>
                </template>
              </el-table-column>

              <el-table-column label="质量标准"
                               align="center"
                               width="80px">
                <template slot-scope="{row}">
                  <span>{{ row.name }}</span>
                </template>
              </el-table-column>

              <el-table-column label="方法名称"
                               align="center"
                               width="80px">
                <template slot-scope="{row}">
                  <span>{{ row.name }}</span>
                </template>
              </el-table-column>

              <el-table-column label="方法编号"
                               align="center"
                               width="80px">
                <template slot-scope="{row}">
                  <span>{{ row.name }}</span>
                </template>
              </el-table-column>

              <el-table-column label="工时"
                               width="150px"
                               align="center">
                <template slot-scope="{row}">
                  <span>{{ row.name}}</span>
                </template>
              </el-table-column>

              <el-table-column label="起修时间"
                               width="150px"
                               align="center">
                <template slot-scope="{row}">
                  <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
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

              <el-table-column label="完成时间"
                               width="150px"
                               align="center">
                <template slot-scope="{row}">
                  <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
                </template>
              </el-table-column>

              <el-table-column label="操作"
                               align="center"
                               width="120"
                               class-name="small-padding fixed-width">
                <template slot-scope="{row}">
                  <el-button type="success"
                             size="mini"
                             @click="handleCreate3(row)">领检</el-button>
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

    <el-dialog :visible.sync="dialogReportVisible"
               width="40%"
               title="检验报告 · 审批">

      <div class="dialog-title"><span style="color:#000;margin-left:25px">检验报告审批</span>
        <svg-icon v-if="false"
                  class="svg-pending"
                  icon-class="pending" />
        <svg-icon v-else
                  class="svg-pending"
                  icon-class="approved" />
      </div>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="12">
          <div class="el-dialog-item"><label>物料编码：</label><span>{{row.name}}</span></div>
        </el-col>
        <el-col :span="12">
          <div class="el-dialog-item"><label class="w3">检验号</label>：<span>{{row.name}}</span></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="el-dialog-item"><label>样品名称：</label><span>{{row.name}}</span></div>
        </el-col>
        <el-col :span="12">
          <div class="el-dialog-item"><label>所属部门：</label><span>{{row.name}}</span></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="el-dialog-item"><label>样品等级：</label><span>{{row.name}}</span></div>
        </el-col>
        <el-col :span="12">
          <div class="el-dialog-item"><label class="w3">申请人</label>：<span>{{row.name}}</span></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="el-dialog-item"><label>样品规模：</label><span>{{row.name}}</span></div>
        </el-col>
        <el-col :span="12">
          <div class="el-dialog-item"><label>送样地点：</label><span>{{row.name}}</span></div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <div class="el-dialog-item"><label>样品批号：</label><span>{{row.name}}</span></div>
        </el-col>
        <el-col :span="12">
          <div class="el-dialog-item"><label>申请时间：</label><span>{{row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span></div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24"
                style="margin-top:10px;">
          <div class="el-dialog-item"><label>标准编号：</label><span>{{row.name}}</span></div>
        </el-col>
      </el-row>

      <div class="flex-row-space-between"
           style="margin:0">
        <div style="line-height:16px;"><span style="color:#878989">检项：</span></div>
        <div>
          <i class="el-icon-search"
             @click="handleFilter"></i>
          <i class="el-icon-search"
             style="margin-left:10px"
             @click="handleFilter"></i>
          <i class="el-icon-search"
             style="margin-left:10px"
             @click="handleFilter"></i>
          <i class="el-icon-search"
             style="margin-left:10px"
             @click="handleFilter"></i>
        </div>
      </div>
      <div class="el-dialog-table el-div-version"
           style="border: 0px; margin-top: 0px;">
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
                           align="center"
                           width="50">

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
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="结果判定"
                           prop="no"
                           align="center">
            <template slot-scope="{row}">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="备注"
                           prop="no"
                           align="center">
            <template slot-scope="{row}">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="检验人"
                           prop="no"
                           align="center">
            <template slot-scope="{row}">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-row>
        <el-col :span="24"
                style="margin-top:10px;">
          <div class="el-dialog-item"><label>结果判定：</label><span>{{row.name}}</span></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="el-dialog-item">
            <div><label>审批意见：</label></div>
            <el-input type="textarea"
                      maxlength="200"
                      :rows="2"
                      size="small"
                      placeholder="请输入500字内的审批意见"
                      v-model="textarea">
            </el-input>
          </div>
        </el-col>
      </el-row>

      <div slot="footer"
           class="dialog-footer">
        <el-button type="red"
                   size="mini"
                   style="width: 80px;"
                   @click="dialogStatus==='create'?createData():updateData()">
          驳回
        </el-button>
        <el-button type="primary"
                   size="mini"
                   style="width: 80px;margin-left:30%"
                   @click="dialogStatus==='create'?createData():updateData()">
          批准
        </el-button>

      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogReviewVisible"
               width="40%"
               title="复检 · 审批">

      <div class="dialog-title"><span style="color:#cb0000;margin-left:25px">复检审批</span>
        <svg-icon v-if="true"
                  class="svg-pending"
                  icon-class="pending" />
        <svg-icon v-else
                  class="svg-pending"
                  icon-class="approved" />
      </div>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="12">
          <div class="el-dialog-item"><label>物料编码：</label><span>{{row.name}}</span></div>
        </el-col>
        <el-col :span="12">
          <div class="el-dialog-item"><label class="w3">检验号</label>：<span>{{row.name}}</span></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="el-dialog-item"><label>样品名称：</label><span>{{row.name}}</span></div>
        </el-col>
        <el-col :span="12">
          <div class="el-dialog-item"><label>所属部门：</label><span>{{row.name}}</span></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="el-dialog-item"><label>样品等级：</label><span>{{row.name}}</span></div>
        </el-col>
        <el-col :span="12">
          <div class="el-dialog-item"><label class="w3">申请人</label>：<span>{{row.name}}</span></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="el-dialog-item"><label>样品规模：</label><span>{{row.name}}</span></div>
        </el-col>
        <el-col :span="12">
          <div class="el-dialog-item"><label>送样地点：</label><span>{{row.name}}</span></div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <div class="el-dialog-item"><label>样品批号：</label><span>{{row.name}}</span></div>
        </el-col>
        <el-col :span="12">
          <div class="el-dialog-item"><label>申请时间：</label><span>{{row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span></div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24"
                style="margin-top:10px;">
          <div class="el-dialog-item"><label>标准编号：</label><span>{{row.name}}</span></div>
        </el-col>
      </el-row>

      <div class="flex-row-space-between"
           style="margin:0">
        <div style="line-height:16px;"><span style="color:#878989">检项：</span></div>
        <div>
          <i class="el-icon-search"
             @click="handleFilter"></i>
          <i class="el-icon-search"
             style="margin-left:10px"
             @click="handleFilter"></i>
          <i class="el-icon-search"
             style="margin-left:10px"
             @click="handleFilter"></i>
          <i class="el-icon-search"
             style="margin-left:10px"
             @click="handleFilter"></i>
        </div>
      </div>
      <div class="el-dialog-table el-div-version"
           style="border: 0px; margin-top: 0px;">
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
                           align="center"
                           width="50">

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
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="结果判定"
                           prop="no"
                           align="center">
            <template slot-scope="{row}">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="备注"
                           prop="no"
                           align="center">
            <template slot-scope="{row}">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="检验人"
                           prop="no"
                           align="center">
            <template slot-scope="{row}">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-row>
        <el-col :span="24"
                style="margin-top:10px;">
          <div class="el-dialog-item"><label>结果判定：</label><span>{{row.name}}</span></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="el-dialog-item"><label>审批意见：</label><span>{{row.name}}</span></div>
        </el-col>
      </el-row>
      <div class="flex-row-space-between"
           style="margin:0">
        <div style="line-height:16px;"><span style="color:#cb0000">复检项：</span></div>
        <div>
          <i class="el-icon-search"
             @click="handleFilter"></i>
        </div>
      </div>
      <div class="el-dialog-table el-div-version"
           style="border: 0px; margin-top: 0px;">
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
                           align="center"
                           width="50">

          </el-table-column>
          <el-table-column label="检项名称"
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
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="检验人"
                           prop="no"
                           align="center">
            <template slot-scope="{row}">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-row>
        <el-col :span="24"
                style="margin-top:10px">
          <div class="el-dialog-item"><label style="color:#cb0000">复检判定：</label>
            <el-radio-group v-model="radio">
              <el-radio :label="1">无误</el-radio>
              <el-radio :label="2">偏差</el-radio>
            </el-radio-group>
          </div>
        </el-col>
      </el-row>
      <div slot="footer"
           class="dialog-footer ">
        <el-button type="red"
                   size="mini"
                   style="width: 80px;"
                   @click="dialogStatus==='create'?createData():updateData()">
          驳回
        </el-button>
        <el-button type="primary"
                   size="mini"
                   style="width: 120px;margin-left:20%"
                   @click="dialogStatus==='create'?createData():updateData()">
          复检批准
        </el-button>

      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogMaterialsVisible"
               width="40%"
               title="物料编码 · 审批">

      <div class="dialog-title"><span style="margin-left:25px">物料编码审批</span>
        <svg-icon v-if="false"
                  class="svg-pending"
                  icon-class="pending" />
        <svg-icon v-else
                  class="svg-pending"
                  icon-class="approved" />
      </div>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="12">
          <div class="el-dialog-item"><label>检项名称：</label><span>{{row.name}}</span></div>
        </el-col>
        <el-col :span="12">
          <div class="el-dialog-item"><label class="w3">申请号</label>：<span>{{row.name}}</span></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="el-dialog-item"><label>方法依据：</label><span>{{row.name}}</span></div>
        </el-col>
        <el-col :span="12">
          <div class="el-dialog-item"><label class="w2">部门</label>：<span>{{row.name}}</span></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="el-dialog-item"><label>方法类别：</label><span>{{row.name}}</span></div>
        </el-col>
        <el-col :span="12">
          <div class="el-dialog-item"><label class="w3">申请人</label>：<span>{{row.name}}</span></div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <div class="el-dialog-item"><label>参考物料：</label><span>{{row.name}}</span></div>
        </el-col>
        <el-col :span="12">
          <div class="el-dialog-item"><label>申请时间：</label><span>{{row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="el-dialog-item"><label>物料等级：</label><span>{{row.name}}</span></div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <div class="el-dialog-item"><label>物料编码：</label><span>{{row.name}}</span></div>
        </el-col>
        <el-col :span="12">
          <div class="el-dialog-item"><label style="color:#4f9f9d">新建质量标准人：</label>
            <el-input v-model="temp.title"
                      size="mini"
                      style="width: 100px;" />
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24"
                style="margin-top:5px">
          <div class="el-dialog-item"><label>产品描述：</label>
            <div style="width:87%"><span></span></div>
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24"
                style="margin-top:5px">
          <div class="el-dialog-item"><label>补充说明：</label>
            <div style="width:87%"><span></span></div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24"
                style="margin-top:5px">
          <div class="el-dialog-item">
            <div><label>审批意见：</label></div>
            <el-input type="textarea"
                      maxlength="200"
                      :rows="2"
                      style="width: 87%"
                      size="small"
                      placeholder="请输入500字内的审批意见"
                      v-model="textarea">
            </el-input>
          </div>
        </el-col>
      </el-row>

      <div slot="footer"
           class="dialog-footer">
        <el-button type="red"
                   size="mini"
                   style="width: 80px;"
                   @click="dialogStatus==='create'?createData():updateData()">
          驳回
        </el-button>
        <el-button type="primary"
                   size="mini"
                   style="width: 80px;margin-left:30%"
                   @click="dialogStatus==='create'?createData():updateData()">
          批准
        </el-button>

      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogTestMethodVisible"
               width="40%"
               title="检验方法 · 审批">

      <div class="dialog-title"><span style="margin-left:25px">检验方法审批</span>
        <svg-icon v-if="false"
                  class="svg-pending"
                  icon-class="pending" />
        <svg-icon v-else
                  class="svg-pending"
                  icon-class="approved" />
      </div>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="12">
          <div class="el-dialog-item"><label>物料名称：</label><span>{{row.name}}</span></div>
        </el-col>
        <el-col :span="12">
          <div class="el-dialog-item"><label class="w3">申请号</label>：<span>{{row.name}}</span></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="el-dialog-item"><label>方法依据：</label><span>{{row.name}}</span></div>
        </el-col>
        <el-col :span="12">
          <div class="el-dialog-item"><label class="w2">部门</label>：<span>{{row.name}}</span></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="el-dialog-item"><label>方法类别：</label><span>{{row.name}}</span></div>
        </el-col>
        <el-col :span="12">
          <div class="el-dialog-item"><label class="w3">申请人</label>：<span>{{row.name}}</span></div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <div class="el-dialog-item"><label>方法名称：</label><span>{{row.name}}</span></div>
        </el-col>
        <el-col :span="12">
          <div class="el-dialog-item"><label>申请时间：</label><span>{{row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="el-dialog-item"><label>方法编号：</label><span>{{row.name}}</span></div>
        </el-col>
        <el-col :span="12">
          <div class="el-dialog-item"><label class="w2">工时</label>：<span>{{row.name}}</span></div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <div class="el-dialog-item"><label>方法属性：</label><span>{{row.name}}</span></div>
        </el-col>
        <el-col :span="12">
          <div class="el-dialog-item"><label class="w2">版本</label>：<span>{{row.name}}</span></div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24"
                style="margin-top:5px">
          <div class="el-dialog-item"
               style="display: block;"><label>检验方法：</label>
            <el-input type="textarea"
                      maxlength="200"
                      :rows="2"
                      disabled
                      style="width: 100%"
                      size="small"
                      v-model="textarea"> </el-input>
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24"
                style="margin-top:5px">
          <div class="el-dialog-item"
               style="display: block;"><label>检验记录：</label>
            <el-input type="textarea"
                      maxlength="200"
                      :rows="2"
                      disabled
                      style="width: 100%"
                      size="small"
                      v-model="textarea"> </el-input>
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24"
                style="margin-top:5px">
          <div class="el-dialog-item"
               style="display: block;"><label>审批意见：</label>
            <el-input type="textarea"
                      maxlength="200"
                      :rows="2"
                      style="width: 100%"
                      size="small"
                      v-model="textarea"> </el-input>
          </div>
        </el-col>
      </el-row>

      <div slot="footer"
           class="dialog-footer">
        <el-button type="red"
                   size="mini"
                   style="width: 80px;"
                   @click="dialogStatus==='create'?createData():updateData()">
          驳回
        </el-button>
        <el-button type="primary"
                   size="mini"
                   style="width: 80px;margin-left:30%"
                   @click="dialogStatus==='create'?createData():updateData()">
          批准
        </el-button>

      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogStandardVisible"
               width="40%"
               title="质量标准 · 审批">

      <el-form ref="dataForm"
               :rules="rules"
               :model="temp"
               label-position="left"
               size="mini"
               label-width="0px">
        <div class="dialog-title"><span>质量标准审批</span></div>
        <el-divider></el-divider>
        <el-row type="flex"
                align="middle">
          <el-col :span="12"
                  style="margin-top:10px">
            <div class="el-dialog-item"><label class="w3"
                     style="margin-right:-0.5em">申请号</label>：<span>S1900001</span>
            </div>
            <div class="el-dialog-item">
              <div class="el-dialog-item"><label>起草时间：</label><span>2019-12-12 10:00</span></div>
            </div>
            <div class="el-dialog-item"><label class="w3"
                     style="margin-right:-0.5em">起草人</label>：<span>李维恭</span>
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
      <el-row>
        <el-col :span="24"
                style="margin-top:10px">
          <div class="el-dialog-item"
               style="display: block;"><label>审批意见：</label>
            <el-input type="textarea"
                      maxlength="200"
                      :rows="2"
                      style="width: 100%"
                      size="small"
                      v-model="textarea"> </el-input>
          </div>
        </el-col>
      </el-row>

      <div slot="footer"
           class="dialog-footer">
        <el-button type="red"
                   size="mini"
                   style="width: 80px;"
                   @click="dialogStatus==='create'?createData():updateData()">
          驳回
        </el-button>
        <el-button type="primary"
                   size="mini"
                   style="width: 80px;margin-left:30%"
                   @click="dialogStatus==='create'?createData():updateData()">
          批准
        </el-button>

      </div>
    </el-dialog>

     <el-dialog :visible.sync="dialogStandardEditVisible"
               width="40%"
               title="质量标准 · 审批">

      <el-form ref="dataForm"
               :rules="rules"
               :model="temp"
               label-position="left"
               size="mini"
               label-width="0px">
        <div class="dialog-title"><span>质量标准审批</span></div>
        <el-divider></el-divider>
        <el-row type="flex"
                align="middle">
          <el-col :span="12"
                  style="margin-top:10px">
            <div class="el-dialog-item"><label class="w3"
                     style="margin-right:-0.5em">申请号</label>：<span>S1900001</span>
            </div>
            <div class="el-dialog-item">
              <div class="el-dialog-item"><label>起草时间：</label><span>2019-12-12 10:00</span></div>
            </div>
            <div class="el-dialog-item"><label class="w3"
                     style="margin-right:-0.5em">起草人</label>：<span>李维恭</span>
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
        <div class="flex-row-space-between" style="margin-top:10px">
          <div style="line-height:20px;"><span style="color:#878989;font-size:13px">历史版本：</span></div>
        </div>
        <div class="el-dialog-table el-div-version"
             >
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
      <el-row>
        <el-col :span="24"
                style="margin-top:10px">
          <div class="el-dialog-item"
               style="display: block;"><label>审批意见：</label>
            <el-input type="textarea"
                      maxlength="200"
                      :rows="2"
                      style="width: 100%"
                      size="small"
                      v-model="textarea"> </el-input>
          </div>
        </el-col>
      </el-row>

      <div slot="footer"
           class="dialog-footer">
        <el-button type="red"
                   size="mini"
                   style="width: 80px;"
                   @click="dialogStatus==='create'?createData():updateData()">
          驳回
        </el-button>
        <el-button type="primary"
                   size="mini"
                   style="width: 80px;margin-left:30%"
                   @click="dialogStatus==='create'?createData():updateData()">
          批准
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
      radio: 1,
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
      row: [],
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
      dialogReportVisible: false,
      dialogReviewVisible: false,
      dialogMaterialsVisible: false,
      dialogTestMethodVisible: false,
      dialogStandardVisible: false,
      dialogStandardEditVisible: false,
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

      if (columnIndex == 10) {
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
    stateClassNameNo({ row, columnIndex }) {
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
    stateClassNameDetection({ row, columnIndex }) {
      console.log(columnIndex)
      console.log('state', row.state)

      if (columnIndex == 7) {
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
    stateClassNameQuality({ row, columnIndex }) {
      console.log(columnIndex)
      console.log('state', row.state)

      if (columnIndex == 9) {
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
      this.dialogReportVisible = true
      this.dialogReviewVisible = true
    },
    handleCreate1() {
      this.dialogMaterialsVisible = true
    },
    handleCreate2() {
      this.dialogTestMethodVisible = true
    },
    handleCreate3() {
      this.dialogStandardVisible = true
      this.dialogStandardEditVisible = true
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogReportVisible = true
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
          //     this.dialogReportVisible = false
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
  .el-table {
    .el-table__header th {
      background-color: #d8dad7;
      color: #7e7f7d;
    }
    // .el-table__body td {
    //   background-color: #fff;
    // }
    // th.is-leaf {
    //   border-bottom: 1px solid #a8aaa9;
    // }
    // td {
    //   border-bottom: 1px solid #a8aaa9;
    // }
  }
  //   .el-table--border th,
  //   .el-table--border td {
  //     border-right: 1px solid #a8aaa9;
  //   }
  //   .el-table--group,
  //   .el-table--border {
  //     border: 1px solid #a8aaa9;
  //   }
}
</style>

<style lang="scss" scoped>
.app-container {
  padding: 20px 0;
}

.el-input-scan {
  font-size: 13px;
  color: #d81a06;
}

.svg-container {
  padding: 6px 0px 6px 15px;
  vertical-align: middle;
  width: 30px;
  display: inline-block;
}

.svg-pending {
  width: 50px;
  height: 50px;
  fill: currentColor;
  overflow: hidden;
  float: right;
  margin-top: -20px;
  transform: rotate(15deg);
}

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