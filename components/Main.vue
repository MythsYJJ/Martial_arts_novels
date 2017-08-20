<template>
  <div style="display: flex;flex-direction: column;align-items: center;justify-content: center;">
    <!--头部-->
    <div class="mainText" style="flex: 10vh;width:100vw;display: flex;flex-direction: column;align-items: center;justify-content: space-around">
      <div style="display:flex;justify-content: space-between;width:95vw;">
        <div id="username" style="color:#cacaca">{{global.user.user.nickname}}</div>
        <div id="kongfu" style="color:#00da00">{{"功力加成 " + global.totalPower + '%'}}</div>
      </div>
      <div style="display:flex;justify-content: space-between;width:95vw;">
        <div id="nowkongfu" style="color:#da0000;position:relative">
          <div>
            {{'当前功力 ' + global.user.avatar.force}}
          </div>
          <div v-for="text in global.addkongfuArr">
            <div class="addkongfu">功力+{{text}}</div>
          </div>
        </div>
        <a v-on:click="goUserDetail()" style="text-decoration: underline;color:#afafaf">人物详情</a>
      </div>
    </div>
    <!--主体展示内容-->
    <div class="mainText" style="flex: 62vh;width:95vw;border:3px solid #4c4c4c;border-radius: 2%;text-align: left;padding:5px;overflow: scroll" id="articleViewDiv" v-on:click="textAllIn()">
      <!--进场游戏描述-->
      <div id="describeView" style="overflow-y: scroll" v-if="this.describeStatus">
        <div v-for="text in global.describeTextArr" v-html="text"></div>
      </div>
      <!--主体概述-->
      <div id="articleView" style="overflow-y: scroll" v-else-if="!this.describeStatus && !this.experienceStatus">
        <div v-for="text in global.articleText" style="margin: 10px auto;" v-html="text">
        </div>
      </div>
      <!--历练-->
      <div id="experienceView" style="overflow-y: scroll" v-else>
        <div v-for="text in global.experienceText" style="margin: 10px auto;" v-html="text">
        </div>
      </div>
    </div>
    <!--选择项-->
    <!--进入主体内容按钮-->
    <div style="flex:16vh;width:95vw;display: flex;flex-direction: column;justify-content: space-around" v-if="this.describeStatus">
      <my-button style="height:6vh;" v-if="this.textOneByOneFinish" @click="startGame()">
        初入江湖
      </my-button>
    </div>
    <!--普通状态-->
    <div class="mainText" style="flex: 16vh;display: flex;flex-direction: row;justify-content: space-between;align-items: center;width:95vw;" v-if="!this.experienceStatus && !this.describeStatus">
        <div style="display: flex;flex-direction: column;justify-content: space-between;height:11vh">
          <my-button style="width:40vw;height:5vh;" @click="experience()">历练</my-button>
          <div style="height:5vh;display: flex;flex-direction:column;justify-content: center;align-items: center;">
            <div class="text">
              <span>精力</span>
              <span style="color:#e4393c">{{global.user.user.energy}}</span>
              <span>/3</span>
            </div>
            <div class="text">
              {{this.count}}
            </div>
          </div>
        </div>
        <div style="display: flex;flex-direction: column;justify-content: space-between;height:11.5vh">
          <my-button :style="this.transmigration ? {} : {backgroundColor: '#999'}" style="width:40vw;height:5vh;" @click="goTransmigration()">转生</my-button>
          <div style="height:5vh;display: flex;flex-direction:column;justify-content: center;align-items: center;"  v-if="!this.transmigration">
              <div class="text">
                再历练<span style="color:#e4393c">{{this.residueEvent}}</span>次即可转身
              </div>
              <div class="text">转身后功力提升更快</div>
          </div>
          <div style="height:5vh;display: flex;flex-direction:column;justify-content: center;align-items: center;"  v-else>
            <div class="text">您功成名就，可以转生了</div>
          </div>
        </div>
    </div>
    <!--历练状态-->
    <div style="flex:16vh;width:95vw;display: flex;flex-direction: column;justify-content: space-around" v-else-if="this.experienceStatus && !this.describeStatus && !this.experienceStatusSuccess">
      <div v-if="!this.textOneByOneFinish"></div>
      <div v-for="select in global.selectTextArr" v-else>
        <my-button :style="{color: global.selectColorArr[select.color - 1]}" style="width:95vw;height:6vh" @click="chooseSelect(select)" v-html="select.desc"></my-button>
      </div>
    </div>
    <!--历练完成按钮-->
    <div style="flex:16vh;width:95vw;display: flex;flex-direction: column;justify-content: space-around" v-else-if="this.experienceStatus && !this.describeStatus && this.experienceStatusSuccess && !this.equipStatus">
      <my-button style="width:95vw;height:6vh" @click="deathFunc(experienceData)" v-if="this.textOneByOneFinish && this.deathStatus">就此转生</my-button>
      <my-button style="width:95vw;height:6vh" @click="backMain()" v-if="this.textOneByOneFinish && !this.deathStatus">确认</my-button>
    </div>
    <div style="flex:16vh;width:95vw;display: flex;flex-direction: column;justify-content: space-around" v-else-if="this.experienceStatus && !this.describeStatus && this.experienceStatusSuccess && this.equipStatus">
      <my-button style="width:95vw;height:6vh" @click="isEquip(1)">替换</my-button>
      <my-button style="width:95vw;height:6vh" @click="isEquip(0)">保留</my-button>
    </div>
    <!--底部-->
    <div class="mainText" style="flex: 10vh;display: flex;width:95vw;justify-content: space-between;align-items: center" v-if="!this.describeStatus && !this.deathStatus">
      <div style="display:flex;flex-direction: column;border:4px solid #ddd;border-radius: 5px;height:7vh;">
        <div style="background-color: #b2b2b2;width:60vw;color:#525252;flex: auto;font-size: 3vw;display: flex;align-items: center;justify-content: center">
          <div class="text">你在长安小巷教训恶霸</div>
        </div>
        <div style="background-color: #fff;width:60vw;height:3vh;border-top:4px solid #ddd;flex:auto;overflow: hidden;">
          <div class="progressBar" style="background-color: #1596fe;height:3vh;" id="progressBar"></div>
        </div>
      </div>
      <my-button @click="" style="width:25vw;height:7vh">好友对决</my-button>
    </div>
    <!--alert-->
    <my-alert v-show="this.alertView" :textAlert="this.textAlert" :textWarning="this.textWarning" @isEquip="isEquip()" @notEquip="notEquip()"></my-alert>
    <!--<my-death v-show="this.deathStatus" :textWarning="'死亡轮回，重头再来'" @backIndex="backIndex()"></my-death>-->
  </div>
</template>

<script>
  import Vue from 'vue'
  import global from '@/global'
  import MyButton from '@/components/MyButton'
  import MyAlert from '@/components/MyAlert'
  import DeathAlert from '@/components/DeathAlert'
  import axios from 'axios'
  Vue.component(MyButton.name, MyButton)
  Vue.component(MyAlert.name, MyAlert)
  Vue.component(DeathAlert.name, DeathAlert)

  export default {
    data () {
      return {
        global: global,
        countTimer: null,
        addForceTimer: null,
        experienceData: null,
        describeStatus: true, // 进主体内容前的游戏概览状态
        experienceStatus: false, // 是否处在历练状态
        experienceStatusSuccess: false, // 历练完成的选项状态
        equipStatus: false, // 切换武器秘籍状态'
        deathStatus: false, // 死亡状态
        textOneByOneFinish: false, // 逐字段落全部出现之后唤出选择项
        // articleText: global.articleText, // 概要数组
        // experienceText: global.experienceText, // 历练数组
        // addkongfuArr: global.addkongfuArr, // 功力动效数组
        // selectText: global.selectTextArr,
        progressBarAnimate: 0,
        progressBarStatus: true,
        residueEvent: null, // 剩余历练数转生
        transmigration: false, // 是否可以转生
        alertView: false, // 控制alert
        textAlert: '',
        textWarning: '',
        equipId: null,
        equipType: null,
        sel: null, // 当前选中的事件
        count: null,
        timer: null,
        recover: global.user.user.energyRecoverTime, // 第一次获取的倒计时值
        recoverTime: null,
        // 段落逐字data
        textTimer: null,
        strText: '',
        str: '',
        arrIdx: null,
        textOneByOneNow: null
      }
    },
    beforeCreate: async function () {
      console.log('当前时间：', new Date().getTime() + 5001)
      console.log('json中的倒计时间：', global.user.user.energyRecoverTime)
      global.initwx()
      global.getJson('event')
      global.getJson('elements')
      global.getJson('select')
    },
    created: function () {
      this.str = `这里是进场描述<br>这里是进场描述<br>这里是进场描述<br>这里是进场描述<br>这里是进场描述<br>这里是进场描述<br>这里是进场描述<br>这里是进场描述<br>这里是进场描述<br>这里是进场描述<br>这里是进场描述<br>这里是进场描述<br>`
      this.textOneByOne(global.describeTextArr, global.describeTextArr.length)
      global.user.user.immAdd = parseInt(global.user.user.immAdd)
      if (parseInt(global.user.avatar.eventTime) >= 5) {
        this.transmigration = true
      } else {
        this.residueEvent = 5 - parseInt(global.user.avatar.eventTime)
      }
      this.allKonfuAdd()
      if (global.user.user.energy < 3) {
        this.count = this.getCountDownTime(this.recover)
        this.timer = setInterval(() => {
          this.count = this.getCountDownTime(this.recover)
        }, 1000)
      }
    },
    mounted: function () {
      /* this.addForceTimer = setInterval(function () {
        this.progressBar(1)
      }.bind(this), 3000) */
    },
    methods: {
      // 段落逐字显现
      textOneByOne (addArr, addArrIdx) { // 需要添加到的arr， 添加到arr的index
        let i = 0
        this.arrIdx = addArrIdx
        this.textOneByOneNow = addArr
        this.textTimer = setInterval(() => {
          if (this.strText.length === this.str.length) {
            console.log('触发clear')
            this.clearTextTimerFunc()
            this.textOneByOneFinish = true
          } else {
            console.log('触发substring')
            this.strText += this.str.substring(i, i + 1)
            addArr.splice(this.arrIdx, 1, this.strText)
            i++
          }
        }, 90)
      },
      textAllIn () {
        if (this.str) {
          console.log('点击触发全部文字显现')
          this.strText = this.str
          this.textOneByOneNow.splice(this.arrIdx, 1, this.strText)
          this.clearTextTimerFunc()
          this.textOneByOneFinish = true
          // console.log('str: ', this.str, 'strText: ' + this.strText, 'arrIdx: ' + this.arrIdx, 'textOneByOneNow' + this.textOneByOneNow)
        } else {
          console.log('触发文字显现但没有数据')
        }
      },
      clearTextTimerFunc () {
        clearInterval(this.textTimer)
        this.str = ''
        this.strText = ''
        this.arrIdx = null
        this.textOneByOneNow = null
      },
      allKonfuAdd () { // 总功力加成
        global.totalPower =
          global.user.user.immAdd +
          global.user.avatar.talnetAdd +
          global.user.avatar.weaponAdd +
          global.user.avatar.kongfuAdd - 100
      },
      async addText (text) {
        /* this.str = text
        this.textOneByOne(global.articleText, global.articleText.length) */
        global.articleText.splice(global.articleText.length, 0, text)
        let articleViewDiv = document.getElementById('articleViewDiv')
        await global.sleep(10)
        articleViewDiv.scrollTop = articleViewDiv.scrollHeight
        text = null
      },
      experience () {
        // 历练开始
        console.log('点击历练')
        axios.get(`${global.apibase}api/event/startevent`, {params: {token: global.user.token}}).then((resp) => {
          if (resp.data.status === 'err') {
            console.log('err:', resp.data.msg)
          } else {
            console.log(resp.data)
            /* this.global.user.user.energy = resp.data.energy
             console.log(global.user.user)
             this.timer = new Date(resp.data.recover).getTime()
             console.log(this.timer) */
            let data = resp.data
            let text = null
            console.log(global.user.user.energy)
            // 精力控制
            global.user.user.energy = data.energy
            console.log(global.user.user.energy)
            if (data.recover) {
              clearInterval(this.timer)
              this.count = this.getCountDownTime(new Date(data.recover.toLocaleString()).getTime())
              this.timer = setInterval(() => {
                this.count = this.getCountDownTime(new Date(data.recover.toLocaleString()).getTime())
              }, 1000)
            }
            // global.getCountDownTime(new Date(data.recover.toLocaleString()).getTime())
            console.log('event事件id:', data.event.id)
            for (let i of global.event) {
              if (data.event.id === i.id) {
                console.log('event事件对象:', i)
                global.triggerEvent = i
                text = i.format
                break
              }
            }
            let bbb = text.replace(/\[(\d+).(\w+)\]/g, function () {
              let index = parseInt(arguments[1])
              let type = arguments[2]
              let elementId = data.event.getElements[index]
              let selectData = global.elements[elementId]
              return `${selectData[type]}`
            })
            console.log(bbb)
            // 逐字出现push
            this.str = bbb
            this.textOneByOne(global.experienceText, global.experienceText.length)
            for (let selectcode of data.event.getSelects) {
              global.selectTextArr.push(global.select[selectcode])
            }
            console.log('select', global.selectTextArr)
            this.experienceStatus = true
          }
        })
      },
      chooseSelect (sel) {
        console.log('selected: ', sel)
        this.sel = sel
        axios.get(`${global.apibase}api/event/selectoption`, {params: {token: global.user.token, opt: sel.id}}).then(async (resp) => {
          console.log('selectedResp:', resp.data)
          if (resp.data.status === 'ok') {
            // 处理死亡事件
            this.experienceData = resp.data
            if (this.experienceData.avatar) {
              // this.deathFunc(resp.data)
              console.log('死亡处理：', global.elements[this.experienceData.element])
              this.textOneByOneFinish = false
              this.deathStatus = true
              clearInterval(this.addForceTimer)
              this.str = global.elements[this.experienceData.element].effect_desc
              this.textOneByOne(global.experienceText, global.experienceText.length)
              global.addOverviewText = global.elements[this.experienceData.element].effect_easy_desc
              this.experienceStatusSuccess = true
              return
            }
            console.log(global.elements[this.experienceData.element])
            if (global.elements[this.experienceData.element].type === 5) {
              // 武器
              if (this.experienceData.success) {
                global.experienceText.push(sel.success_word)
                /* this.str = sel.success_word
                this.textOneByOne(global.experienceText, global.experienceText.length) */
              } else {
                global.experienceText.push(sel.fail_word)
                /* this.str = sel.fail_word
                this.textOneByOne(global.experienceText, global.experienceText.length) */
              }
              // ${Math.abs(global.elements[this.experienceData.element].value)}
              this.textAlert = `<span style="color:#e4393c">每个角色只能佩戴一件兵器</span>`
              this.textWarning = `<span style="color:#e4393c">是否替换？</span>`
              this.experienceStatusSuccess = true
              this.equipStatus = true
              this.equipId = global.elements[this.experienceData.element].id
              this.equipType = global.elements[this.experienceData.element].type
              // 两把武器的对比字段需加入
              console.log('当前拥有的武器', global.elements[global.user.avatar.weaponId].name)
              global.experienceText.push(`${this.textAlert}`)
              global.experienceText.push(`当前兵器为<span style="color:yellow">[${global.elements[global.user.avatar.weaponId].name}]</span>，功力加成为 <span style="color:yellow">${global.elements[global.user.avatar.weaponId].value}%</span>`)
              global.experienceText.push(`寻得兵器为<span style="color:#e4393c">[${global.elements[this.experienceData.element].name}]</span>，功力加成为 <span style="color:#e4393c">${global.elements[this.experienceData.element].value}%</span>`)
              global.experienceText.push(`${this.textWarning}`)
              /* if (global.user.avatar.weaponId) {
                console.log('武器id', global.user.avatar.weaponId)
                axios.get(`${global.apibase}api/event/replaceequip`, {params: {token: global.user.token, id: global.elements[resp.data.element].id, equip: 1}}).then((resp) => {
                  console.log(resp.data)
                })
              } else {
                console.log('当前没有武器')
              }
              global.user.avatar.weaponId = global.elements[resp.data.element].id
              global.user.avatar.weaponAdd = global.elements[resp.data.element].value
              this.allKonfuAdd() */
            } else if (global.elements[this.experienceData.element].type === 7) {
              // 武功秘籍
              this.textAlert = `<span style="color:#e4393c">每个角色只能练习一本武功秘籍</span>`
              this.textWarning = `<span style="color:#e4393c">是否替换？</span>`
              if (this.experienceData.success) {
                global.experienceText.push(sel.success_word)
              } else {
                global.experienceText.push(sel.fail_word)
              }
              this.experienceStatusSuccess = true
              this.equipStatus = true
              this.equipId = global.elements[this.experienceData.element].id
              this.equipType = global.elements[this.experienceData.element].type
              /* global.experienceText.push(`${this.textAlert}，${this.textWarning}`)
              global.experienceText.push(`当前您拥有的武功秘籍为：[${global.elements[global.user.avatar.kongfuId].name}]，功力加成为：${global.elements[global.user.avatar.kongfuId].value}%`)
              global.experienceText.push(`替换的武功秘籍为：[${global.elements[this.experienceData.element].name}]，功力加成为：${global.elements[this.experienceData.element].value}%`) */
              console.log('当前拥有的武功秘籍', global.elements[global.user.avatar.kongfuId].name)
              global.experienceText.push(`${this.textAlert}`)
              global.experienceText.push(`当前秘籍为<span style="color:yellow">[${global.elements[global.user.avatar.kongfuId].name}]</span>，功力加成为 <span style="color:yellow">${global.elements[global.user.avatar.kongfuId].value}%</span>`)
              global.experienceText.push(`寻得秘籍为<span style="color:#e4393c">[${global.elements[this.experienceData.element].name}]</span>，功力加成为 <span style="color:#e4393c">${global.elements[this.experienceData.element].value}%</span>`)
              global.experienceText.push(`${this.textWarning}`)
              /* global.user.avatar.kongfuId = global.elements[resp.data.element].id
              global.user.avatar.kongfuAdd = global.elements[resp.data.element].value
              this.allKonfuAdd() */
            } else {
              // 普通事件
              this.experienceNormalFunc(sel)
            }
            let eventTime = this.experienceData.eventTime
            if (eventTime >= 5) {
              this.transmigration = true
            } else {
              this.residueEvent = 5 - eventTime
            }
          } else {
            console.log(this.experienceData.status, this.experienceData.msg)
          }
        })
      },
      experienceNormalFunc (sel) {
        if (this.experienceData.success) {
          global.experienceText.push(sel.success_word)
        } else {
          global.experienceText.push(sel.fail_word)
        }
        global.experienceText.push(`${global.elements[this.experienceData.element].effect_desc} ${Math.abs(global.elements[this.experienceData.element].value * (global.user.user.immAdd / 100))}`)
        if (global.elements[this.experienceData.element].value === 0) {
          global.addOverviewText = `你在<span style="color: ${global.articleColorArr[global.triggerEvent.type - 1]}">${global.triggerEvent.name}</span>历练中，${global.elements[this.experienceData.element].effect_easy_desc}`
        } else {
          global.addOverviewText = `你在<span style="color: ${global.articleColorArr[global.triggerEvent.type - 1]}">${global.triggerEvent.name}</span>历练中，${global.elements[this.experienceData.element].effect_easy_desc} <span style="color: ${(global.elements[this.experienceData.element].value >= 0) ? 'green' : 'red'}">${Math.abs(global.elements[this.experienceData.element].value * (global.user.user.immAdd / 100))}</span>`
        }
        global.user.avatar.force = this.experienceData.force
        this.progressBar(global.elements[this.experienceData.element].value)
        // console.log(global.addOverviewText)
        // console.log(global.triggerEvent.name)
        this.experienceStatusSuccess = true
      },
      // 替换武器func
      isEquip (num) {
        console.log('点击替换')
        axios.get(`${global.apibase}api/event/replaceequip`, {params: {token: global.user.token, id: this.equipId, equip: num}}).then((resp) => {
          console.log(resp.data)
          this.equipStatus = false
          if (num === 0) {
            console.log('点击保留：', global.elements[this.sel.not_want_drop])
            global.experienceText.push(global.elements[this.sel.not_want_drop].effect_desc + `<span style="color: ${(global.elements[this.experienceData.element].value >= 0) ? 'green' : 'red'}">${global.elements[this.sel.not_want_drop].value * (global.user.user.immAdd / 100)}</span>`)
            global.addOverviewText = global.elements[this.sel.not_want_drop].effect_easy_desc + `<span style="color: ${(global.elements[this.experienceData.element].value >= 0) ? 'green' : 'red'}">${global.elements[this.sel.not_want_drop].value * (global.user.user.immAdd / 100)}</span>`
          } else {
            if (this.equipType === 5) {
              global.experienceText.push(`${global.elements[this.experienceData.element].effect_desc}<span style="color:${global.weaponKongfuColorArr[global.elements[this.experienceData.element].value]}">[${global.elements[this.experienceData.element].name}]</span>，武器给予的功力加成变更为 <span style="color:${global.weaponKongfuColorArr[global.elements[this.experienceData.element].value]}">${Math.abs(global.elements[this.experienceData.element].value)}%</span>`)
              global.addOverviewText = `你在<span style="color: ${global.articleColorArr[global.triggerEvent.type - 1]}">${global.triggerEvent.name}</span>历练中，${global.elements[this.experienceData.element].effect_easy_desc}<span style="color:${global.weaponKongfuColorArr[global.elements[this.experienceData.element].value]}">[${global.elements[this.experienceData.element].name}]</span>，所持武器的功力加成变更为 <span style="color: ${(global.elements[this.experienceData.element].value >= 0) ? 'green' : 'red'}">${Math.abs(global.elements[this.experienceData.element].value)}%</span>`
              global.user.avatar.weaponId = global.elements[this.experienceData.element].id
              global.user.avatar.weaponAdd = global.elements[this.experienceData.element].value
            } else if (this.equipType === 7) {
              global.experienceText.push(`${global.elements[this.experienceData.element].effect_desc}<span style="color:${global.weaponKongfuColorArr[global.elements[this.experienceData.element].value]}">[${global.elements[this.experienceData.element].name}]</span>,武学给予的功力加成变更为 <span style="color:${global.weaponKongfuColorArr[global.elements[this.experienceData.element].value]}">${Math.abs(global.elements[this.experienceData.element].value)}%</span>`)
              global.addOverviewText = `你在<span style="color: ${global.articleColorArr[global.triggerEvent.type - 1]}">${global.triggerEvent.name}</span>历练中，${global.elements[this.experienceData.element].effect_easy_desc}<span style="color:${global.weaponKongfuColorArr[global.elements[this.experienceData.element].value]}">[${global.elements[this.experienceData.element].name}]</span>,武学的功力加成变更为 <span style="color: ${(global.elements[this.experienceData.element].value >= 0) ? 'green' : 'red'}">${Math.abs(global.elements[this.experienceData.element].value)}%</span>`
              global.user.avatar.kongfuId = global.elements[this.experienceData.element].id
              global.user.avatar.kongfuAdd = global.elements[this.experienceData.element].value
            }
            this.allKonfuAdd()
          }
          this.progressBar(parseInt(resp.data.force) - parseInt(global.user.avatar.force))
          global.user.avatar.force = resp.data.force
        })
      },
      showAlert () {
        this.alertView = true
      },
      backMain () {
        console.log('返回概要')
        this.textOneByOneFinish = false
        global.selectTextArr = []
        global.triggerEvent = []
        global.experienceText = []
        this.experienceStatusSuccess = false
        this.experienceStatus = false
        this.textOneByOneFinish = false
        this.addText(global.addOverviewText)
      },
      async goTransmigration () {
        // 转生
        // 测试用
        if (this.transmigration) {
          console.log('点击转生')
          let resp = await axios.get(`${global.apibase}api/event/revive`, {params: {token: global.user.token}})
          if (resp.status === 200) {
            console.log(resp)
            let data = resp.data
            if (data.status === 'ok') {
              this.deathFunc(data)
              console.log(global.user)
            } else {
              console.log(data)
            }
          }
        } else {
          console.log('无法转生')
        }
      },
      progressBar (num) { // 增加功力
        /* let progressBar = document.getElementById('progressBar')
        console.log(progressBar.style.width)
        progressBar.style.width = this.progressBarAnimate + 'vw'
        this.progressBarAnimate ++
        console.log(progressBar.style.width) */
        global.user.avatar.force += num
        global.addkongfuArr.push(num)
      },
      getCountDownTime (value) { // 精力恢复
        if (value === 0) {
          return ''
        }
        let createTime = value / 1000
        let now = new Date().getTime() / 1000
        this.remain = Math.floor(createTime - now)
        if (this.remain <= 0) {
          global.user.user.energy++
          if (global.user.user.energy >= 3) {
            global.user.user.energy = 3
            clearInterval(this.timer)
            return ''
          }
          setTimeout(() => {
            clearInterval(this.timer)
            this.recoverTime = new Date().getTime() + 600000
            this.timer = setInterval(() => {
              this.count = this.getCountDownTime(this.recoverTime)
            }, 1000)
          }, 1)
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
      },
      goUserDetail () {
        this.$router.push(`/UserDetail`)
      },
      // 死亡处理
      deathFunc (data) {
        console.log('死亡处理：', data)
        this.textOneByOneFinish = false
        // 调用data.element
        global.user.user.immAdd = parseInt(data.immAdd)
        global.user.user.reviveTime = data.reviveTime
        global.user.avatar = data.avatar
        this.allKonfuAdd()
        global.articleText = global.deathResetText
        global.experienceText = []
        global.selectTextArr = []
        global.addkongfuArr = []
        global.describeTextArr = []
        this.describeStatus = true
        this.experienceStatus = false
        this.experienceStatusSuccess = false
        this.equipStatus = false
        this.deathStatus = false
        this.textOneByOneFinish = false
        this.str = `这里是进场描述<br>这里是进场描述<br>这里是进场描述<br>这里是进场描述<br>这里是进场描述<br>这里是进场描述<br>这里是进场描述<br>这里是进场描述<br>这里是进场描述<br>这里是进场描述<br>这里是进场描述<br>这里是进场描述<br>`
        this.textOneByOne(global.describeTextArr, global.describeTextArr.length)
      },
      backIndex () {
        this.$router.push({path: '/'})
      },
      // 开始游戏
      startGame () {
        global.describeTextArr = []
        this.describeStatus = false
        this.textOneByOneFinish = false
        if (!this.addForceTimer) {
          this.addForceTimer = setInterval(function () {
            this.progressBar(1)
          }.bind(this), 3000)
        }
      }
    }
  }
</script>

<style scoped>
  .text{
    width:40vw;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  @keyframes progressbar {
    0% {width:0vw}
    100% {width:63vw}
  }
  .progressBar{
    animation-name: progressbar;
    animation-duration: 3s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
  @keyframes addkongfu {
    0% {top:1px}
    100% {top:-3vh;opacity:0}
  }
  .addkongfu{
    animation-name: addkongfu;
    animation-duration: 0.7s;
    animation-timing-function: linear;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    color:#00da00;
    position:absolute;
    top:1px;
    right:-20vw;
    font-size:13px;
  }
</style>
