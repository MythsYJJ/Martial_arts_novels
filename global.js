/**
 * Created by Administrator on 2017/6/27.
 */
/* global wx */
// import event from '@/json/event'
// import elements from '@/json/elements'
// import select from '@/json/select'
import axios from 'axios'
import testuser from '@/json/testuser'

export default{
  async sleep (ms) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, ms)
    })
  },
  // apibase: 'http://192.168.1.78:4040/',
  // apibase: 'http://martial.m7games.com/',
  apibase: 'http://dev.m7games.com/',
  event: null,
  elements: null,
  select: null,
  user: testuser,
  totalPower: null, // 总功力加成
  triggerEvent: null, // 当前历练事件
  addOverviewText: null, // 历练事件完成后需要添加进概述的文字
  addkongfuArr: [], // 动效增加功力数组
  describeTextArr: [], // 进主程序页面前描述
  deathResetText: ['欢迎来到，德莱联盟<br/>敌军还有30秒到达战场，个色特伊拉！'],
  articleText: ['欢迎来到，德莱联盟<br/>敌军还有30秒到达战场，个色特伊拉！'],
  experienceText: [],
  selectTextArr: [],
  selectColorArr: ['#fff', 'green', 'orange', '#e4393c'], // 选项颜色组
  weaponKongfuColorArr: {15: 'yellow', 20: 'orange', 25: 'red', 0: 'green'}, // 武器和武功对应颜色
  articleColorArr: ['green', 'orange', 'yellow', '#e4393c'],
  talnetNameArr: {5: '天赋异禀', 10: '天纵奇才', 15: '天命之子'},
  talnetColorArr: {5: 'yellow', 10: 'orange', 15: 'red'},
  async getJson (textname) {
    await axios.get(`${this.apibase}static/${textname}.json`).then((resp) => {
      this[textname] = resp.data
    })
  },
  getTime (value) {
    return value.getFullYear() + '.' + (value.getMonth() + 1) + '.' + value.getDate()
  },
  countDown (value) {
    return parseInt(value / 1000 / 60) + ':' + parseInt(value / 1000)
  },
  /* getCountDownTime: function (value) {
    if (value === 0) {
      return ''
    }
    let createTime = value / 1000
    let now = new Date().getTime() / 1000
    this.remain = Math.floor(createTime - now)
    console.log('remain ', this.remain)
    let minute = (Math.floor(this.remain / 60) % 60).toString()
    let second = (this.remain % 60).toString()
    if (minute.length === 1) {
      minute = '0' + minute
    }
    if (second.length === 1) {
      second = '0' + second
    }
    return minute + ' : ' + second
  }, */
  onwx () {
    wx.ready(function () {
      wx.onMenuShareTimeline({
        title: '武侠小说', // 分享标题
        link: 'http://wxgame-dev.m7games.com/wxgame/api/index', // 分享链接
        imgUrl: 'http://m7games.com/wxgame.png', // 分享图标
        success: function () {
          alert('分享到朋友圈')
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {
          alert('取消了')
          // 用户取消分享后执行的回调函数
        }
      })
      wx.onMenuShareAppMessage({
        title: '武侠小说', // 分享标题
        desc: '测试用', // 分享描述
        link: 'http://wxgame-dev.m7games.com/wxgame/api/index', // 分享链接
        imgUrl: 'http://m7games.com/wxgame.png', // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
          alert('分享给好友...')
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {
          alert('取消了')
          // 用户取消分享后执行的回调函数
        }
      })
    })
  },
  initwx () {
    if (this.wxdata) {
      /*
       wx.config(this.wxdata)
       setTimeout(() => {
       this.onwx()
       }, 1000)
       */
    } else {
      /* axios.get(`${this.apibase}wxconfig`, {params: {}}).then((resp) => {
        if (resp.status !== 200) {
          this.errMsg = 'server error'
          return
        }
        if (resp.data.result !== 'ok') {
          this.errMsg = resp.data.msg
          return
        }
        this.wxdata = resp.data.wxdata
        // this.wxdata.debug = true
        wx.config(this.wxdata)
        this.onwx()
        wx.error(function (res) {
          alert(res)
          console.log(`wx error: ${res}`)
        })
      }) */
    }
  }
}
