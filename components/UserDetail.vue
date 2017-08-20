<style scoped>
  .detailView{
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width:95vw;
    padding: 2vh 0;
  }
  .leftView{
    width:65vw;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
  .leftTitle{
    text-align: right;
    min-width:30vw;
    color:#ddd;
  }
  .leftDetailName{
    min-width:25vw;
    text-align: center;
    border:1px solid;
    border-radius: 3px;
  }
  .leftUserDetailView{
    min-width:25vw;
    text-align: center;
    color:#ddd;
  }
  .rightView{
    min-width:20vw;
    text-align: center;
    color:#ddd;
  }
</style>

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
        </div>
        <div style="color:#afafaf">
          {{'巅峰功力 ' + ((global.user.avatar.force > global.user.user.topForce) ? global.user.avatar.force : global.user.user.topForce)}}
        </div>
      </div>
    </div>
    <!--主要部分-->
    <div style="width:95vw;border-top:1px solid #ddd;border-bottom:1px solid #ddd;display:flex;flex-direction: column;justify-content: space-around;align-items: center;flex:75vh;position: relative">
      <!--竖线-->
      <div style="position:absolute;width:1px;height:70vh;background-color: #ddd;right:22vw;"></div>
      <!--装备信息-->
      <div style="flex:10vh;display: flex;flex-direction: column;justify-content: center">
        <div class="detailView" style="padding:1vh 0;">
          <div class="leftView">
            <span class="leftTitle"></span>
            <span class="leftDetailName" style="border:none"></span>
          </div>
          <div class="rightView">功力加成</div>
        </div>
        <div class="detailView">
          <div class="leftView">
            <span class="leftTitle">当前角色天赋：</span>
            <span class="leftDetailName" :style="{color: global.talnetColorArr[global.user.avatar.talnetAdd], borderColor: global.talnetColorArr[global.user.avatar.talnetAdd]}">
              {{global.talnetNameArr[global.user.avatar.talnetAdd]}}
            </span>
          </div>
          <div class="rightView">{{global.user.avatar.talnetAdd + '%'}}</div>
        </div>
        <div class="detailView">
          <div class="leftView">
            <span class="leftTitle">当前武功：</span>
            <span class="leftDetailName" :style="{color: global.weaponKongfuColorArr[global.user.avatar.kongfuAdd], borderColor: global.weaponKongfuColorArr[global.user.avatar.kongfuAdd]}">
              {{global.elements[global.user.avatar.kongfuId].name}}
            </span>
          </div>
          <div class="rightView">
            {{global.user.avatar.kongfuAdd + '%'}}
          </div>
        </div>
        <div class="detailView">
          <div class="leftView">
            <span class="leftTitle">当前兵器：</span>
            <span class="leftDetailName" :style="{color: global.weaponKongfuColorArr[global.user.avatar.weaponAdd], borderColor: global.weaponKongfuColorArr[global.user.avatar.weaponAdd]}">
              {{global.elements[global.user.avatar.weaponId].name}}
            </span>
          </div>
          <div class="rightView">
            {{global.user.avatar.weaponAdd + '%'}}
          </div>
        </div>
      </div>
      <div style="height:1px;width:70vw;background-color: #ddd;align-self: flex-start;position: relative;top:2vh;"></div>
      <!--帐号信息-->
      <div style="flex:20vh;display: flex;flex-direction: column;justify-content: center">
        <div class="detailView">
          <div class="leftView">
            <span class="leftTitle">玩家转身次数：</span>
            <span class="leftUserDetailView">{{global.user.user.reviveTime}}次</span>
          </div>
          <div class="rightView"></div>
        </div>
        <div class="detailView">
          <div class="leftView">
            <span class="leftTitle">永久功力加成&nbsp;&nbsp;</span>
            <span class="leftUserDetailView">{{(parseInt(global.user.user.immAdd) - 100) + '%'}}</span>
          </div>
          <div class="rightView">210%</div>
        </div>
        <div class="detailView">
          <div class="leftView">
            <span class="leftTitle">共获武学：</span>
            <span class="leftUserDetailView">1种</span>
          </div>
          <div class="rightView"></div>
        </div>
        <div class="detailView">
          <div class="leftView">
            <span class="leftTitle">共获兵器：</span>
            <span class="leftUserDetailView">1种</span>
          </div>
          <div class="rightView"></div>
        </div>
      </div>
    </div>
    <!--按钮组-->
    <div style="flex: 14vh;display: flex;flex-direction: row;justify-content: space-between;align-items: center;width:95vw;">
      <my-button style="width:40vw;height:5.5vh;" @click="goBack()">确认</my-button>
      <my-button style="width:40vw;height:5.5vh;" @click="goAchievement()">成就</my-button>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import global from '@/global'
  import MyButton from '@/components/MyButton'
  import MyAlert from '@/components/MyAlert'
  // import axios from 'axios'
  Vue.component(MyButton.name, MyButton)
  Vue.component(MyAlert.name, MyAlert)

  export default {
    data () {
      return {
        global: global
      }
    },
    created: function () {

    },
    methods: {
      goBack () {
        window.history.back()
      },
      goAchievement () {
        console.log('点击成就')
      }
    }
  }
</script>

