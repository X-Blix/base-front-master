<template>
  <div class="app-container">
<!--    <div class="search-div">-->
<!--      <el-form label-width="70px" size="small">-->
<!--        <el-row>-->
<!--          <el-col :span="8">-->
<!--            <el-form-item label="模块标题">-->
<!--              <el-input v-model="searchObj.title" placeholder="模块标题" clearable />-->
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

      <el-table-column sortable prop="title" label="模块标题" />
      <el-table-column sortable prop="businessType" label="业务类型" />
      <el-table-column sortable prop="method" label="方法名称" />
      <el-table-column sortable prop="requestMethod" label="请求方式" />
      <el-table-column sortable prop="operatorType" label="操作类别" />
      <el-table-column sortable prop="operName" label="操作人员" />
      <el-table-column sortable prop="deptName" label="部门名称" />
      <el-table-column sortable prop="operUrl" label="请求URL" />

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
  </div>
</template>
<script>
import api from '@/api/log/sysOperLog'
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
      sysOperLog: defaultForm,
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
          // this.searchObj = response.data.
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
    },
  }
}
</script>
<style>
</style>
