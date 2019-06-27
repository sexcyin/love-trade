const app = getApp()

Page({
  data: {
    msg: '',
    openid: '',
    nickName: ''
  },
  onLoad: function (options) {
  },
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    const { amount, reason } = e.detail.value;
    if (!amount || !reason) {
      wx.showToast({
        icon: 'none',
        title: '请填写内容',
      });
      return;
    }
    const db = wx.cloud.database();
    wx.showLoading({
      title: '申请中',
      mask: true
    })
    db.collection('trade').add({
      data: {
        amount,
        reason,
        nickName: app.globalData.userInfo.nickName,
        createDate: Date.now(),
        type: 1, // 借钱
        status: 1, // 待审批
        admin_openid: app.globalData.openid
      },
      success: res => {
        wx.showToast({
          title: '申请成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
        wx.navigateTo({
          url: '../index/index',
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '申请失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  }
})