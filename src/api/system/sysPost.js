import request from '@/utils/request'

// 常量
const api_name = '/admin/system/sysPost'

export default {

  // 列表
  getPageList(page, limit, searchObj) {
    return request({
      // 接口路径
      url: `${api_name}/${page}/${limit}`,
      method: 'get', // 提交方式
      // 参数
      params: searchObj
    })
  },
  // 删除
  removeById(id) {
    return request({
      url: `${api_name}/remove/${id}`,
      method: 'delete' // 提交方式
    })
  },
  // 添加的方法
  saveRole(role) {
    return request({
      // 接口路径
      url: `${api_name}/save`,
      method: 'post', // 提交方式
      // 传递json格式
      data: role
    })
  },
  // 修改的方法
  updateRole(role) {
    return request({
      // 接口路径
      url: `${api_name}/update`,
      method: 'post', // 提交方式
      data: role
    })
  },

  // 批量删除
  batchRemove(idList) {
    return request({
      // 接口路径
      url: `${api_name}/batchRemove`,
      method: 'delete', // 提交方式
      data: idList
    })
  },
  getById(id) {
    return request({
      url: `${api_name}/get/${id}`,
      method: 'get'
    })
  }

}
