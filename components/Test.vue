<template>
  <div style="color:#fff" v-on:click="test()">
    <div>体力回复机制</div>
    <div>
      <span>{{this.energy}}</span>
      <span>/</span>
      <span>10</span>
    </div>
    <div>{{this.count}}</div>
    <div>段落逐字出现</div>
    <div v-for="text in this.text">
      {{text}}
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        energy: 0,
        count: null,
        timer: null,
        recover: new Date().getTime() + 5000,
        recoverTime: null,
        text: ['江湖小报第一段第一章节', '江湖小报第一段第二章节，'],
        textTimer: null,
        strText: '',
        str: '这里是江湖小报第三段，这是一段用来测试段落逐字出现的文字段落，加长一点~？？？？？？？？差不多把这是一段用来测试段落逐字出现的文字段落，加长一点~？？？？？？？？差不多把这是一段用来测试段落逐字出现的文字段落，加长一点~？？？？？？？？差不多把这是一段用来测试段落逐字出现的文字段落，加长一点~？？？？？？？？差不多把这是一段用来测试段落逐字出现的文字段落，加长一点~？？？？？？？？差不多把这是一段用来测试段落逐字出现的文字段落，加长一点~？？？？？？？？差不多把这是一段用来测试段落逐字出现的文字段落，加长一点~？？？？？？？？差不多把',
        arrIdx: null
      }
    },
    created: function () {
      this.count = this.getCountDownTime(this.recover + 1000)
      this.timer = setInterval(() => {
        this.count = this.getCountDownTime(this.recover)
      }, 1000)
      this.textTest()
    },
    methods: {
      test () {
        console.log('点击触发全部文字显现')
        window.clearInterval(this.textTimer)
        this.strText = this.str
        this.text.splice(this.arrIdx, 1, this.strText)
      },
      textTest () {
        let i = 0
        this.arrIdx = this.text.length
        this.textTimer = setInterval(() => {
          if (this.strText.length === this.str.length) {
            window.clearInterval(this.textTimer)
            console.log('触发clear')
          } else {
            console.log('触发substring')
            this.strText += this.str.substring(i, i + 1)
            this.text.splice(this.arrIdx, 1, this.strText)
            i++
          }
        }, 90)
      },
      getCountDownTime (value) {
        if (value === 0) {
          return ''
        }
        let createTime = value / 1000
        let now = new Date().getTime() / 1000
        this.remain = Math.floor(createTime - now)
        if (this.remain <= 0) {
          this.energy++
          clearInterval(this.timer)
          this.recoverTime = new Date().getTime() + 10000
          this.timer = setInterval(() => {
            this.count = this.getCountDownTime(this.recoverTime + 1000)
          }, 1000)
        }
        let minute = (Math.floor(this.remain / 60) % 60).toString()
        let second = (this.remain % 60).toString()
        if (minute.length === 1) {
          minute = '0' + minute
        }
        if (second.length === 1) {
          second = '0' + second
        }
        return minute + ' : ' + second
      }
    }
  }
</script>

<style scoped>
</style>
