import {
  DEFAULT_COLOR,
  DEFAULT_COLOR_TRANSPARENT,
} from "../../utils/config/constants";
import { DEVICE_WIDTH , DEVICE_HEIGHT } from "../../utils/config/device";
import { readFileSync, writeFileSync } from '../../utils/config/fs';
var screenState
const logger = DeviceRuntimeCore.HmLogger.getLogger("fetch_api");
const { messageBuilder } = getApp()._options.globalData;
var resultAllText=""
var i18n= {
  "1": {
    "more": "Loading...",
    "first_notic":"can't go any further",
    "end":"\n\nDo you want to continue loading the next content?",
  },
  "0": {
    "more": "加载中...",
    "first_notic":"不能再往前了",
    "end":"\n\n是否继续加载接下来的内容?",
  }
}
var newsNum,newsTitle;
Page({
  state: {},
  build() {

    //Get a news will display
    newsNum=readFileSync('newsNum')
    if(newsNum.length==0)
      newsNum=0
    newsTitle=readFileSync('newsTitle')
    if(newsTitle.length==0)
      newsTitle=0

    //init screenState
    if(DEVICE_WIDTH==DEVICE_HEIGHT)
      screenState=0
    else
      screenState=1
    //setStatusBarVisible-Zepp
    hmUI.setStatusBarVisible(false)

    //setScreenKeep-Zepp
    hmApp.setScreenKeep(true)

    //get network data
    this.fetchData();

    //draw Screen UI
    // for(var pageNum=1;pageNum<=5;pageNum++)
    // hmUI.createWidget(hmUI.widget.BUTTON, {
    //   x: mpx_w(10),
    //   y: DEVICE_HEIGHT*pageNum+mpx_h(76),
    //   w: mpx_w(80),
    //   h: mpx_h(21),
    //   text_size: 56,
    //   radius: 45,
    //   normal_color: DEFAULT_COLOR,
    //   press_color: DEFAULT_COLOR_TRANSPARENT,
    //   click_func: (button_widget) => {
    //     logger.log("click button");
        
    //   },
    //   text:getText("more")
    // });
    titleText=hmUI.createWidget(hmUI.widget.TEXT, {
      x: 54,
      y: mpx_h(5)+mpx_auto(5,DEVICE_HEIGHT),
      w: DEVICE_WIDTH-108,
      h: mpx_h(90)-mpx_auto(10,DEVICE_HEIGHT),
      color: 0xffffff,
      text_size: 36,
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text_style:hmUI.text_style.WRAP,
      text:getText("more")
    })

    

    //function----
    function mpx_w(screenPx){
      screenPx=(screenPx/100)*DEVICE_WIDTH
      return screenPx
    }
    function mpx_h(screenPx){
      screenPx=(screenPx/100)*DEVICE_HEIGHT
      return screenPx
    }
    function mpx_auto(screenPx,devicePx){
      if(screenState==0)
      screenPx=(screenPx/100)*DEVICE_HEIGHT
      else
      screenPx=0
      return screenPx
    }
    //i18n polyfill
    function getText(str){
        if(hmSetting.getLanguage()!=0)
          str=i18n[1][str]
        else
          str=i18n[0][str]
      return str
    }
  },onDestory() {
      //setScreenKeep-Zepp
      messageBuilder.request({
        method: "FETCH_NEWS_CONTENT_STOP",
      })
      hmApp.setScreenKeep(false)
  },
  fetchData() {
    messageBuilder.request({
      method: "GET_NEWS_DATA_"+newsTitle+"_"+newsNum,
    })
    .then(data => {
      logger.log('receive data')
      const { result = {} } = data
      const  text = result
      logger.log(text)
  //News inish and reloadPage
      //if(text=="News_Finish"){=========================================================


        hmUI.setScrollView(true,DEVICE_HEIGHT,1,true)


    if(text!="News_Finish"){  
        resultAllText=text+getText('end');

     
      const { width, height }= hmUI.getTextLayout(resultAllText, {
        text_size: 36,
        text_width: DEVICE_WIDTH-mpx_w(10)
      })
      var lenghtResultAllText=Math.floor(height/(DEVICE_WIDTH-mpx_w(10)))-1
      var pageNum=0;
      titleText.setProperty(hmUI.prop.MORE, {
        x: mpx_w(5),
        y: mpx_h(5),
        w: DEVICE_WIDTH-mpx_w(10),
        h: height,
        align_h:hmUI.align.LEFT,
        align_v:hmUI.align.TOP,
        text:resultAllText
      })

      // hmUI.createWidget(hmUI.widget.FILL_RECT, {
      //   x: -1*mpx_h(10),
      //   y:0,
      //   w: DEVICE_WIDTH,
      //   h: mpx_h(10),
      //   radius: 0,
      //   color: 0x000000
      // })

     
      hmUI.createWidget(hmUI.widget.FILL_RECT, {
        x: 0,
        y:DEVICE_HEIGHT-72,
        w: DEVICE_WIDTH,
        h: 123,
        radius: 0,
        color: 0x000000
      })

        hmUI.createWidget(hmUI.widget.BUTTON, {
            x: 0,
            y:DEVICE_HEIGHT-72,
            w: DEVICE_WIDTH/2,
            h: 72,
            press_src: 'clickdown.png',
            normal_src: 'stop.png',
            click_func: (button_widget) => {
        if(pageNum!=0){
          pageNum--
          titleText.setProperty(hmUI.prop.MORE, {
            x: mpx_w(5),
            y: mpx_h(5)-(DEVICE_HEIGHT-72)*pageNum,
            w: DEVICE_WIDTH-mpx_w(10),
            h: height,
            align_h:hmUI.align.LEFT,
            align_v:hmUI.align.TOP,
            text:resultAllText
          })
        }else{
          hmUI.showToast({
            text:  getText('first_notic')
          })
      }
            },
          })

          hmUI.createWidget(hmUI.widget.BUTTON, {
            x: DEVICE_WIDTH/2,
            y:DEVICE_HEIGHT-72,
            w: DEVICE_WIDTH/2,
            h: 72,
            press_src: 'clickdown.png',
            normal_src: 'start.png',
            click_func: (button_widget) => {
              if(pageNum<lenghtResultAllText){
                    pageNum++
              titleText.setProperty(hmUI.prop.MORE, {
                x: mpx_w(5),
                y: mpx_h(5)-(DEVICE_HEIGHT-72)*pageNum,
                w: DEVICE_WIDTH-mpx_w(10),
                h: height, 
              })
              }else{
                this.fetchData()
              }
          
            },
          })

        }else{
          // 页面返回
hmApp.goBack()
        }

     
    
      //function----
    function mpx_w(screenPx){
      screenPx=(screenPx/100)*DEVICE_WIDTH
      return screenPx
    }
    function mpx_h(screenPx){
      screenPx=(screenPx/100)*DEVICE_HEIGHT
      return screenPx
    }
    function mpx_auto(screenPx,devicePx){
      if(screenState==0)
      screenPx=(screenPx/100)*DEVICE_HEIGHT
      else
      screenPx=0
      return screenPx
    }
      //i18n polyfill
        function getText(str){
          if(hmSetting.getLanguage()!=0)
            str=i18n[1][str]
          else
            str=i18n[0][str]
        return str
        }
      //what fuck code who wirte
      
      
  //  } else{============================================================================

  //   resultAllText=resultAllText+text
  //   this.fetchData()

  //   }=============================================================================
    })
  },
});
