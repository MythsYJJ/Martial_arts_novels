<style scoped>
  .articleView{
    border:1px solid #888;
    border-radius: 2%;
    width:95vw;
    display: flex;
    align-self: center;
    overflow: scroll;
    padding:0 2vw;
    flex:70vh;
  }
</style>

<template>
  <div style="display: flex;flex-direction: column;align-items: center;justify-content: space-around;height:100vh;width:100%;">
    <div style="color:#ddd;font-size:20pt;flex:10vh;display: flex;justify-content: center;align-items: center">
      武侠世界
    </div>
    <div class="articleView">
      <pre style="text-align: left;padding: 0;margin: 0;width:90vw;overflow-x: hidden;overflow-y: scroll;white-space: pre-wrap;color:#aaa;line-height: 180%;position: relative;top:-2vh;">
双月同天重生夜，
天机无限降祥泉。
且看今夜腥风起，
时空错现乱中原。

话说十五年前中秋之夜，中原大地天生异象。空中竟同现两轮明月。
一场惊天浩劫伴随此象油然而生！
无数不同时代叱咤风云的江湖人物均悉数莫名来到此处。
不仅如此，绝世的武学，旷世的神兵也随之相继而出。

更为惊异的是，是夜，一枚巨石伴随火光从天而降，坠落于祥泉村十里之外。
村中有大胆之人前往探究，发现巨石上刻有四句莫名之语，
“天地现八卦，日月定乾坤。生时魂重转，逝后命复轮。
——天时乾坤印”

而后几经高人所译而传遍江湖。言析“天时乾坤印”可使人无限重生，凭借此物甚至可穿越时空。
此言一出，江湖又掀腥风。同时也让朝廷为之动荡。
同年，朝廷颁布号令，改年号为[双月]。并下令张贴皇榜昭告天下，以：“文武双修制，以御江湖事”为由招揽部分强势门派，由其共同建立了“九大书院”。
招收天赋高超之学子，实行文武双修之制度。以备江湖之动乱。

然而中原大地有实有势有志之士皆各怀心思。
有以欲得此物而称霸中原者居多，有以回归故里者一二，亦有以四方共存为目标者几何！
一时间，江湖纷乱，百派争鸣…
      </pre>
    </div>
    <div style="flex:20vh;display:flex;justify-content: center;align-items: center">
      <my-button style="width:40vw;height:6vh;border-color: #888;color:#ddd" v-on:click="$router.push({path: 'Main'})">开启旅程</my-button>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  // import global from '@/global'
  import MyButton from '@/components/MyButton'
  Vue.component(MyButton.name, MyButton)

  export default {
    data () {
      return {}
    },
    created: function () {

    },
    methods: {}
  }
</script>
