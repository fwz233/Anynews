import {
  DEFAULT_COLOR,
  DEFAULT_COLOR_TRANSPARENT,
} from "../../utils/config/constants";
import { DEVICE_WIDTH , DEVICE_HEIGHT } from "../../utils/config/device";
import { readFileSync, writeFileSync } from '../../utils/config/fs';
var screenState
// const logger = DeviceRuntimeCore.HmLogger.getLogger("fetch_api");
// const { messageBuilder } = getApp()._options.globalData;
var titleText
var i18n= {
  "1": {
    "more": "Developer: fwz233\nGithub homepage:\nhttps://github.com/fwz233\nFeedback email: fwz233@qq.com\nPlease tell me the news platform you need, or you can build and publish the news platform you want based on open source code",
    "first_notic":"Can't go any further",
  },
  "0": {
    "more": "开发者:fwz233\nGithub主页:\nhttps://github.com/fwz233\n反馈邮箱:fwz233@qq.com\n请告诉我你需要的新闻平台，或者你可以基于开源代码构建并发布你想要的新闻平台",
    "first_notic":"不能再往前了",
  }
}
var newsNum,newsTitle;
Page({
  state: {},
  build() {

    //Get a news will display
    // newsNum=readFileSync('newsNum')
    // if(newsNum.length==0)
    //   newsNum=0
    // newsTitle=readFileSync('newsTitle')
    // if(newsTitle.length==0)
    //   newsTitle=0

    //init screenState
    if(DEVICE_WIDTH==DEVICE_HEIGHT)
      screenState=0
    else
      screenState=1
    //setStatusBarVisible-Zepp
    hmUI.setStatusBarVisible(false)

    //setScreenKeep-Zepp
    hmApp.setScreenKeep(true)

    titleText=hmUI.createWidget(hmUI.widget.TEXT, {
      x: 54,
      y: mpx_h(5),
      w: DEVICE_WIDTH-108,
      h: mpx_h(95),
      color: 0xffffff,
      text_size: 24,
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
      hmApp.setScreenKeep(false)
  },
//   fetchData() {
//     messageBuilder.request({
//       method: "GET_NEWS_DATA_"+newsTitle+"_"+newsNum,
//     })
//     .then(data => {
//       logger.log('receive data')
//       const { result = {} } = data
//       const  text = result
//       logger.log(text)
//       var resultText
//       var pageNum=0,page=[0],nowPageNum=0
//       var calculateHeight
//       const { width, height }= hmUI.getTextLayout(text, {
//         text_size: 36,
//         text_width: DEVICE_WIDTH-108
//       })
//       var pagetTotal=Math.ceil(height/((90/100)*DEVICE_HEIGHT)),pageNow=1

//       do{
//       nowPageNum++
//       resultText=text.substring(pageNum,nowPageNum)
//       const { width, height }= hmUI.getTextLayout(resultText, {
//         text_size: 36,
//         text_width: DEVICE_WIDTH-108
//       })
//       calculateHeight=height
//       }while(calculateHeight<((90/100)*DEVICE_HEIGHT))
//       resultText=text.substring(pageNum,nowPageNum+36)
//       page.push(nowPageNum)
//       titleText.setProperty(hmUI.prop.MORE, {
//         align_h:hmUI.align.LEFT,
//         align_v:hmUI.align.TOP,
//         text:resultText
//       })
//       pageNum=page.slice(-1)
//       nowPageNum=pageNum

//       hmUI.createWidget(hmUI.widget.BUTTON, {
//         x: -117,
//         y:0,
//         w: 166,
//         h: DEVICE_HEIGHT,
//         press_src: 'clickdown.png',
//         normal_src: 'stop.png',
//         click_func: (button_widget) => {
//           if(pageNow>1){
//             pageNow--
//             pageNum=page.pop()
//             pageNum=page.pop()
//             pageNum=page.slice(-1)
//             nowPageNum=pageNum
//             do{
//               nowPageNum++
//               resultText=text.substring(pageNum,nowPageNum)
//               const { width, height }= hmUI.getTextLayout(resultText, {
//                 text_size: 36,
//                 text_width: DEVICE_WIDTH-108
//               })
//               calculateHeight=height
//               }while(calculateHeight<((90/100)*DEVICE_HEIGHT))
//               resultText=text.substring(pageNum,nowPageNum+36)
//               page.push(nowPageNum)
//               titleText.setProperty(hmUI.prop.MORE, {
//                 align_h:hmUI.align.LEFT,
//                 align_v:hmUI.align.TOP,
//                 text:resultText
//               })
//               pageNum=page.slice(-1)
//               nowPageNum=pageNum
//           }else if(pageNow==1){
//             hmUI.showToast({
//               text: getText('first_notic')
//             })
//           }
//         },
//       })
//       hmUI.createWidget(hmUI.widget.BUTTON, {
//         x: DEVICE_WIDTH-49,
//         y:0,
//         w: 166,
//         h: DEVICE_HEIGHT,
//         press_src: 'clickdown.png',
//         normal_src: 'start.png',
//         click_func: (button_widget) => {
//           if(pageNow<pagetTotal){
//             pageNow++
//             do{
//               nowPageNum++
//               resultText=text.substring(pageNum,nowPageNum)
//               const { width, height }= hmUI.getTextLayout(resultText, {
//                 text_size: 36,
//                 text_width: DEVICE_WIDTH-108
//               })
//               calculateHeight=height
//               }while(calculateHeight<((90/100)*DEVICE_HEIGHT))
//               resultText=text.substring(pageNum,nowPageNum+36)
//               page.push(nowPageNum)
//               titleText.setProperty(hmUI.prop.MORE, {
//                 align_h:hmUI.align.LEFT,
//                 align_v:hmUI.align.TOP,
//                 text:resultText
//               })
//               pageNum=page.slice(-1)
//               nowPageNum=pageNum
//           }else if(pageNow==pagetTotal){
//             resultText=text.substring(pageNum)
//             titleText.setProperty(hmUI.prop.MORE, {
//               align_h:hmUI.align.LEFT,
//               align_v:hmUI.align.TOP,
//               text:resultText
//             })
//           }
          
//         },
//       })
//       //i18n polyfill
//         function getText(str){
//           if(hmSetting.getLanguage()!=0)
//             str=i18n[1][str]
//           else
//             str=i18n[0][str]
//         return str
//         }
//       //what fuck code who wirte
//     })
//   },
});
