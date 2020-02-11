<template>
  <div class="app-container">
    <div class="filter-container">
      <div>
        <div class="filter-item">
          <span>申请号:</span>
          <el-input
            v-model="searchParam.no"
            size="mini"
            style="width: 100px;"
            @keyup.enter.native="handleFilter"
          />
        </div>
        <div class="filter-item">
          <span>审核状态:</span>
          <el-select v-model="searchParam.state" size="mini" clearable style="width: 100px">
            <el-option
              v-for="item in stateOptions"
              :key="item.key"
              :label="item.label"
              :value="item.label"
            />
          </el-select>
        </div>
        <div class="filter-item">
          <span>物料等级:</span>
          <el-select v-model="searchParam.state" size="mini" clearable style="width: 100px">
            <el-option
              v-for="item in stateOptions"
              :key="item.key"
              :label="item.label"
              :value="item.label"
            />
          </el-select>
        </div>
        <div class="filter-item">
          <span>物料规格:</span>
          <el-select v-model="searchParam.state" size="mini" clearable style="width: 100px">
            <el-option
              v-for="item in stateOptions"
              :key="item.key"
              :label="item.label"
              :value="item.label"
            />
          </el-select>
        </div>
        <div class="filter-item">
          <span>物料编码:</span>
          <el-select v-model="searchParam.state" size="mini" clearable style="width: 100px">
            <el-option
              v-for="item in stateOptions"
              :key="item.key"
              :label="item.label"
              :value="item.label"
            />
          </el-select>
        </div>
      </div>

      <div>
        <div class="filter-item">
          <span>申请人:</span>
          <el-input
            v-model="searchParam.applicant"
            size="mini"
            style="width: 100px;"
            @keyup.enter.native="handleFilter"
          />
        </div>
        <div class="filter-item">
          <span>标准编号:</span>
          <el-input
            v-model="searchParam.no"
            size="mini"
            style="width: 100px;"
            @keyup.enter.native="handleFilter"
          />
        </div>
        <div class="filter-item">
          <span style="letter-spacing:0.5em;margin-right:-0.5em;">终产品</span>
          <span>:</span>
          <el-input
            v-model="searchParam.no"
            size="mini"
            style="width: 100px;"
            @keyup.enter.native="handleFilter"
          />
        </div>
        <div class="filter-item">
          <span>申请时间:</span>
          <el-date-picker
            v-model="searchParam.startTime"
            size="mini"
            type="date"
            style="width: 100px;"
          ></el-date-picker>
          <span>&nbsp;-</span>
          <el-date-picker
            v-model="searchParam.startTime"
            size="mini"
            type="date"
            style="width: 100px;"
          ></el-date-picker>
        </div>
        <div class="filter-item filter-item-btn-search">
          <i class="el-icon-search" @click="handleFilter"></i>
        </div>
        <el-button
          class="filter-btn-item"
          size="mini"
          style="margin-left: 30px;width: 80px;"
          type="info"
          icon="el-icon-delete"
          @click="handleCreate"
        >删除</el-button>
        <el-button
          class="filter-btn-item"
          size="mini"
          style="margin-left: 10px;width: 80px;"
          type="primary"
          icon="el-icon-edit"
          @click="handleCreate"
        >新增</el-button>
      </div>
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      size="mini"
      fit
      highlight-current-row
      style="width: 100%;"
      :cell-style="stateClassName"
      @sort-change="sortChange"
    >
      <el-table-column type="selection" align="center" width="55"></el-table-column>

      <el-table-column label="申请号" prop="no" align="center" width="150">
        <template slot-scope="{row}">
          <span>{{ row.no }}</span>
        </template>
      </el-table-column>

      <el-table-column label="申请人" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="申请时间"
        width="150px"
        prop="date"
        sortable="custom"
        align="center"
        :class-name="getSortClass('date')"
      >
        <template slot-scope="{row}">
          <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column label="标准编号" prop="no" align="center" width="150">
        <template slot-scope="{row}">
          <span>{{ row.no }}</span>
        </template>
      </el-table-column>

      <el-table-column label="审核状态" prop="state" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{state[row.state]}}</span>
        </template>
      </el-table-column>

      <el-table-column label="物料名称" prop="no" align="center" width="150">
        <template slot-scope="{row}">
          <span>{{ row.no }}</span>
        </template>
      </el-table-column>

      <el-table-column label="物料规格" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="物料等级" width="80px">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="物料编码" width="80px">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="补充说明" width="120px">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作"
                       align="center"
                       width="120"
                       class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <label @click="handleModifyStatus(row,'draft')" class="table-view">
            查看
          </label>

        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="searchParam.page"
      :limit.sync="searchParam.limit"
      @pagination="getList"
    />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="Type" prop="type">
          <el-select v-model="temp.type" class="filter-item" placeholder="Please select">
            <el-option
              v-for="item in calendarTypeOptions"
              :key="item.key"
              :label="item.display_name"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Date" prop="timestamp">
          <el-date-picker
            v-model="temp.timestamp"
            type="datetime"
            placeholder="Please pick a date"
          />
        </el-form-item>
        <el-form-item label="Title" prop="title">
          <el-input v-model="temp.title" />
        </el-form-item>

        <el-form-item label="Status">
          <el-select v-model="temp.status" class="filter-item" placeholder="Please select">
            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="Imp">
          <el-rate
            v-model="temp.importance"
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
            :max="3"
            style="margin-top:8px;"
          />
        </el-form-item>
        <el-form-item label="Remark">
          <el-input
            v-model="temp.remark"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">Confirm</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
import waves from "@/views/directive/waves"; // waves directive
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination

export default {
  name: "检验方法",
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      tableKey: 0,
      list: [
        { no: "T20190001", timestamp: 1580980988, name: "山梨酸钾", state: 1 },
        { no: "T20190001", timestamp: 1580980988, name: "山梨酸钾", state: 2 },
        { no: "T20190001", timestamp: 1580980988, name: "山梨酸钾", state: 3 },
        { no: "T20190001", timestamp: 1580980988, name: "山梨酸钾", state: 4 },
        { no: "T20190001", timestamp: 1580980988, name: "山梨酸钾", state: 5 },
        { no: "T20190001", timestamp: 1580980988, name: "山梨酸钾", state: 6 },
        { no: "T20190001", timestamp: 1580980988, name: "山梨酸钾", state: 1 },
        { no: "T20190001", timestamp: 1580980988, name: "山梨酸钾", state: 2 },
        { no: "T20190001", timestamp: 1580980988, name: "山梨酸钾", state: 3 },
        { no: "T20190001", timestamp: 1580980988, name: "山梨酸钾", state: 4 },
        { no: "T20190001", timestamp: 1580980988, name: "山梨酸钾", state: 5 },
        { no: "T20190001", timestamp: 1580980988, name: "山梨酸钾", state: 6 }
      ],
      total: 11,
      listLoading: true,
      searchParam: {
        page: 1,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+date"
      },
      guigeOptions: ["成品", "半成品"],
      state: [" ", "未送样", "待领检", "检验中", "复检中", "审核中", "完成"],
      stateOptions: [
        { label: "未送样", key: 1 },
        { label: "待领检", key: 2 },
        { label: "检验中", key: 3 },
        { label: "复检中", key: 4 },
        { label: "审核中", key: 5 },
        { label: "完成", key: 6 }
      ],
      calendarTypeOptions: {},
      sortOptions: [
        { label: "ID Ascending", key: "+id" },
        { label: "ID Descending", key: "-id" }
      ],
      statusOptions: ["published", "draft", "deleted"],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: "",
        timestamp: new Date(),
        title: "",
        type: "",
        status: "published"
      },
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "Edit",
        create: "Create"
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [
          { required: true, message: "type is required", trigger: "change" }
        ],
        timestamp: [
          {
            type: "date",
            required: true,
            message: "timestamp is required",
            trigger: "change"
          }
        ],
        title: [
          { required: true, message: "title is required", trigger: "blur" }
        ]
      },
      downloadLoading: false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /**
     * 设置流程状态
     */
    stateClassName({ row, columnIndex }) {
      console.log(columnIndex);
      console.log("state", row.state);

      if (columnIndex == 5) {
        switch (row.state) {
          case 1:
            return "color: #909399;";
          case 2:
            return "color: #f56c6c;";
          case 3:
          case 4:
          case 5:
            return "color: #E6A23C;";
          case 6:
            return "color: #67c23a;";
        }
      }
    },
    getList() {
      this.listLoading = true;
      setTimeout(() => {
        this.listLoading = false;
      }, 1.5 * 1000);
      //   fetchList(this.searchParam).then(response => {
      //     this.list = response.data.items
      //     this.total = response.data.total

      //   })
    },
    handleFilter() {
      this.searchParam.page = 1;
      this.getList();
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: "操作Success",
        type: "success"
      });
      row.status = status;
    },
    sortChange(data) {
      const { prop, order } = data;
      if (prop === "date") {
        this.sortByID(order);
      }
    },
    sortByID(order) {
      if (order === "ascending") {
        this.searchParam.sort = "+date";
      } else {
        this.searchParam.sort = "-date";
      }
      this.handleFilter();
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: "",
        timestamp: new Date(),
        title: "",
        status: "published",
        type: ""
      };
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    createData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024; // mock a id
          this.temp.author = "vue-element-admin";
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
      });
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row); // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp);
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    updateData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp);
          tempData.timestamp = +new Date(tempData.timestamp); // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
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
      });
    },
    handleDelete(row, index) {
      this.$notify({
        title: "Success",
        message: "Delete Successfully",
        type: "success",
        duration: 2000
      });
      this.list.splice(index, 1);
    },
    handleFetchPv(pv) {
      console.log(pv);

      //   fetchPv(pv).then(response => {
      //     this.pvData = response.data.pvData
      //     this.dialogPvVisible = true
      //   })
    },
    formatJson(filterVal) {
      return this.list.map(v =>
        filterVal.map(j => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
    getSortClass: function(date) {
      const sort = this.searchParam.sort;
      return sort === `+${date}` ? "ascending" : "descending";
    }
  }
};
</script>


<style lang="scss" scoped>
</style>
