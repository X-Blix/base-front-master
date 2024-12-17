<template>
  <div class="app-container">
<!--    <div class="search-div">-->
<!--      <el-form label-width="70px" size="small">-->
<!--        <el-row>-->
<!--          <el-col :span="8">-->
<!--            <el-form-item label="用户账号">-->
<!--              <el-input v-model="searchObj.username" placeholder="用户账号" clearable />-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--        <el-row style="display:flex">-->
<!--          <el-button type="primary" icon="el-icon-search" size="mini" @click="fetchData()">搜索</el-button>-->
<!--          <el-button icon="el-icon-refresh" size="mini" @click="resetData">重置</el-button>-->
<!--        </el-row>-->
<!--      </el-form>-->
<!--    </div>-->
    <!-- 列表 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      :row-key="getRowKeys"
      stripe
      border
      style="width: 100%;margin-top: 10px;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        label="序号"
        width="70"
        align="center"
      >
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column sortable prop="username" label="用户账号" />
      <el-table-column sortable prop="ipaddr" label="登录IP地址" />
      <el-table-column sortable prop="status" label="登录状态（0成功 1失败）" />
      <el-table-column sortable prop="msg" label="提示信息" />
      <el-table-column sortable prop="accessTime" label="访问时间" />
      <el-table-column sortable prop="createTime" label="创建时间" />
      <el-table-column sortable prop="updateTime" label="修改时间" />
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      :current-page="page"
      :total="total"
      :page-size="limit"
      style="padding: 30px 0; text-align: center;"
      :page-sizes="[5, 10, 50, 100]"
      layout="total,sizes, prev, pager, next, jumper"
      @size-change="sizeChangeHandle"
      @current-change="fetchData"
    />
    <el-dialog title="添加/修改" :visible.sync="dialogVisible" width="40%">
      <el-form
        ref="dataForm"
        :model="sysLoginLog"
        :rules="rules"
        label-width="100px"
        size="small"
        style="padding-right: 40px;"
      >
        <el-form-item label="用户账号" prop="username">
          <el-input v-model="sysLoginLog.username" clearable />
        </el-form-item>
        <el-form-item label="登录IP地址" prop="ipaddr">
          <el-input v-model="sysLoginLog.ipaddr" clearable />
        </el-form-item>
        <el-form-item label="登录状态（0成功 1失败）" prop="status">
          <el-input v-model="sysLoginLog.status" clearable />
        </el-form-item>
        <el-form-item label="提示信息" prop="msg">
          <el-input v-model="sysLoginLog.msg" clearable />
        </el-form-item>
        <el-form-item label="访问时间" prop="accessTime">
          <el-date-picker
            v-model="sysLoginLog.accessTime"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" icon="el-icon-refresh-right" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" icon="el-icon-check" size="small" @click="saveOrUpdate()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import api from '@/api/log/sysLoginLog'
const defaultForm = {
}
export default {
  components: {
  },
  data() {
    return {
      listLoading: true, // 数据是否正在加载
      list: [], // banner列表
      total: 0, // 数据库中的总记录数
      page: 1, // 默认页码
      limit: 5, // 每页记录数
      searchObj: {}, // 查询表单对象
      dialogVisible: false,
      sysLoginLog: defaultForm,
      saveBtnDisabled: false,
      selectValue: [], // 复选框选择内容封装数组
      rules: {
      }
    }
  },
  // 生命周期函数：内存准备完毕，页面尚未渲染
  created() {
    console.log('list created......')
    this.fetchData()
  },
  // 生命周期函数：内存准备完毕，页面渲染成功
  mounted() {
    console.log('list mounted......')
  },
  methods: {
    getRowKeys(row) {
      return row.id
    },
    // 每页数
    sizeChangeHandle(val) {
      this.limit = val
      this.page = 1
      this.fetchData(this.page)
    },
    // 加载banner列表数据
    fetchData(page = 1) {
      debugger
      this.page = page
      api.getPageList(this.page, this.limit, this.searchObj).then(
        response => {
          // this.list = response.data.list
          this.list = response.data.records
          this.total = response.data.total
          // 数据加载并绑定成功
          this.listLoading = false
        }
      )
    },
    // 重置查询表单
    resetData() {
      console.log('重置查询表单')
      this.searchObj = {}
      this.fetchData()
    }
  }
}
</script>
<style>

</style>
