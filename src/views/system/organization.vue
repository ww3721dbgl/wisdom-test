<template>
  <div class="app-container">
    <div class="filter-container">

      <el-button class="filter-btn-item"
                 size="mini"
                 style="margin-left: 10px;width: 80px;"
                 type="primary"
                 icon="el-icon-edit"
                 @click="handleCreate">
        新增
      </el-button>

      <el-button class="filter-btn-item"
                 size="mini"
                 style="margin-left: 10px;width: 80px;"
                 type="info"
                 icon="el-icon-delete"
                 @click="handleDelete">
        删除
      </el-button>
    </div>
    <div class="app-main-container">
      <div class="el-dev-logo">
        <svg-icon class="svg-icon"
                  icon-class="organization" />
      </div>
      <div class="el-dev-line">
        <div class="el-dev-divider"></div>
        <div class="el-div-tree mytree">
          <el-tree :data="data"
                   show-checkbox
                   :indent="0"
                   default-expand-all
                   node-key="id"
                   ref="tree"
                   highlight-current>
          </el-tree>
        </div>

      </div>
    </div>

    <el-dialog :visible.sync="dialogAddVisible"
               width="20%"
               title="新增部门">
      <el-form ref="dataForm"
               :rules="rules"
               :model="temp"
               label-position="left"
               size="mini"
               label-width="0px">
        <div class="dialog-title"><span>新增部门</span></div>
        <el-divider></el-divider>
        <div class="el-dialog-item el-dialog-input" style="margin-top:40px;">
          <el-checkbox v-model="checked"></el-checkbox><label style=" margin-left: 10px;">一级：</label>
          <el-input v-model="temp.title"
                    size="mini"
                    style="width: 140px" />
        </div>
        <div class="el-dialog-item  el-dialog-input">
          <el-checkbox v-model="checked"></el-checkbox><label style=" margin-left: 10px;">二级：</label>
          <el-input v-model="temp.title"
                    size="mini"
                    style="width: 140px" />
        </div>

        <div class="el-dialog-item  el-dialog-input">
          <el-checkbox v-model="checked"></el-checkbox><label style=" margin-left: 10px;">三级：</label>
          <el-input v-model="temp.title"
                    size="mini"
                    style="width: 140px" />
        </div>

      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="green"
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
export default {
  name: '组织管理',
  data() {
    return {
      data: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1'
                },
                {
                  id: 10,
                  label: '三级 1-1-2'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            {
              id: 5,
              label: '二级 2-1'
            },
            {
              id: 6,
              label: '二级 2-2'
            }
          ]
        },
        {
          id: 3,
          label: '一级 3',
          children: [
            {
              id: 7,
              label: '二级 3-1'
            },
            {
              id: 8,
              label: '二级 3-2'
            }
          ]
        }
      ],
      dialogAddVisible: false,
      checked: false,
      temp: { title: '' }
    }
  },
  methods: {
    handleDelete() {
      this.$notify({
        title: '提示',
        message: '删除成功！',
        type: 'success',
        duration: 2000
      })
      this.list.remove(0)
    },
    handleCreate() {
      this.dialogStatus = 'create'
      this.dialogAddVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    }
  }
}
</script>

<style lang="scss" >
.el-div-tree {
  .tree-container /deep/ .el-tree > .el-tree-node:after {
    border-top: none;
  }
}
// .mytree /deep/ {
//   .el-tree > .el-tree-node:after {
//     border-top: none;
//   }
//   .el-tree-node {
//     position: relative;
//     padding-left: 16px;
//   }
//   //节点有间隙，隐藏掉展开按钮就好了,如果觉得空隙没事可以删掉
//   .el-tree-node__expand-icon.is-leaf {
//     display: none;
//   }
//   .el-tree-node__children {
//     padding-left: 16px;
//   }

//   .el-tree-node :last-child:before {
//     height: 38px;
//   }

//   .el-tree > .el-tree-node:before {
//     border-left: none;
//   }

//   .el-tree > .el-tree-node:after {
//     border-top: none;
//   }

//   .el-tree-node:before {
//     content: '';
//     left: -4px;
//     position: absolute;
//     right: auto;
//     border-width: 1px;
//   }

//   .el-tree-node:after {
//     content: '';
//     left: -4px;
//     position: absolute;
//     right: auto;
//     border-width: 1px;
//   }

//   .el-tree-node:before {
//     border-left: 1px solid #4386c6;
//     bottom: 0px;
//     height: 100%;
//     top: -26px;
//     width: 1px;
//   }

//   .el-tree-node:after {
//     border-top: 1px solid #4386c6;
//     height: 20px;
//     top: 12px;
//     width: 24px;
//   }
// }
</style>
<style lang="scss" scoped>
.filter-container {
  display: flex;
  flex-direction: row-reverse;
}

.app-main-container {
  margin: 10px 25px;
}

.el-dev-logo {
  text-align: center;
  width: 86px;
  border-bottom: solid 1px #bebfbe;
  .svg-icon {
    width: 36px;
    height: 36px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
}
.el-dev-divider {
  background-color: #bebfbe;
  position: relative;
  margin-left: 83px;
  margin-top: 5px;
  display: block;
  height: 1px;
  width: 20px;
  transform: rotate(40deg);
}
.el-div-tree {
  margin-left: 100px;
  margin-top: 6px;
}
.el-dialog-input {
  .el-checkbox {
    width: auto;
  }
}

.mytree /deep/ {
  border-left: 1px solid #bebfbe;
  padding-top: 40px;

  .el-tree-node__expand-icon{
      font-size: 16px;
  }

  .el-tree > .el-tree-node:after {
    border-top: none;
  }
  .el-tree-node {
    position: relative;
    padding-left: 16px;
  }

  //节点有间隙，隐藏掉展开按钮就好了,如果觉得空隙没事可以删掉
  .el-tree-node__expand-icon.is-leaf {
    display: none;
  }
  .el-tree-node__children {
    padding-left: 16px;
  }

  .el-tree-node :last-child:before {
    height: 38px;
  }

  .el-tree > .el-tree-node:before {
    content: '●';
    color: #bebfbe;
    left: -6px;
    top: 3px;
    border-left: none;
  }

  .el-tree > .el-tree-node:after {
    border-top: 1px solid #bebfbe;
  }

  .el-tree-node:before {
    content: '';
    left: 0px;
    padding-bottom: 10px;
    position: absolute;
    right: auto;
    border-width: 1px;
  }

  .el-tree-node:after {
    content: '';
    left: 0px;
    color: #bebfbe;
    position: absolute;
    right: auto;
    border-width: 1px;
  }

  .el-tree-node:before {
    border-left: 1px solid #bebfbe;
    bottom: 0px;
    height: 100%;
    top: -26px;
    width: 1px;
  }

  .el-tree-node:after {
    border-top: 1px solid #bebfbe;
    height: 10px;
    line-height: 1px;
    top: 12px;
    width: 24px;
  }
}
</style>