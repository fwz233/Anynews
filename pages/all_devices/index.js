import {
  DEFAULT_COLOR,
  DEFAULT_COLOR_TRANSPARENT,
} from "../../utils/config/constants";
import { DEVICE_WIDTH , DEVICE_HEIGHT } from "../../utils/config/device";
import { readFileSync, writeFileSync } from '../../utils/config/fs';
var screenState
const logger = DeviceRuntimeCore.HmLogger.getLogger("fetch_api");
const { messageBuilder } = getApp()._options.globalData;
var titleText=[]
var loadingAnimation
var newsTitle,newsTopic
var i18n= {
  "1": {
    "more": "See more",
    "title1": "Loading.",
    "title2": "Loading....",
    "title3": "Loading..",
    "title4": "Loading.....",
    "title5": "Loading...",
    "lod_notic":"One moment please",
    "switch_topic_notic":"Getting\n",
    "more_notic":"Please tell me the news platform you want to watch",
    "button_more": "Help",
    "button_setting": "About",
    "titleName-00":"XDA",
    "titleName-01":"Mobile",
    "titleName-02":"Computing",
    "titleName-03":"Latest",
    "titleName-10":"World",
    "titleName-11":"Politics",
    "titleName-12":"Business",
    "titleName-13":"health",
    "titleName-20":"World",
    "titleName-21":"Science",
    "titleName-22":"Opinion",
    "titleName-23":"Sports",
    "titleName-30":"Headlines",
    "titleName-31":"World",
    "titleName-32":"UK news",
    "titleName-33":"US news",
  },
  "0": {
    "more": "查看更多",
    "title1": "加载中.",
    "title2": "加载中....",
    "title3": "加载中..",
    "title4": "加载中.....",
    "title5": "加载中...",
    "lod_notic":"请稍等",
    "switch_topic_notic":"正在获取\n",
    "more_notic":"请告诉我你想看的新闻平台",
    "button_more": "帮助",
    "button_setting": "关于",
    "titleName-00":"XDA",
    "titleName-01":"Mobile",
    "titleName-02":"Computing",
    "titleName-03":"Latest",
    "titleName-10":"World",
    "titleName-11":"Politics",
    "titleName-12":"Business",
    "titleName-13":"health",
    "titleName-20":"World",
    "titleName-21":"Science",
    "titleName-22":"Opinion",
    "titleName-23":"Sports",
    "titleName-30":"Headlines",
    "titleName-31":"World",
    "titleName-32":"UK news",
    "titleName-33":"US news",
  }
}
Page({
  state: {},
  build() {

    //Get a news title and topic will display
    newsTitle=readFileSync('newsTitle')
    if(newsTitle.length==0)
      newsTitle=0
    newsTopic=readFileSync('newsTopic')
    if(newsTopic.length==0)
      newsTopic="0?0?0?0"
    newsTopic=newsTopic.split("?")

    //init screenState
    if(DEVICE_WIDTH==DEVICE_HEIGHT)
      screenState=0
    else
      screenState=1

    //setStatusBarVisible-Zepp
    hmUI.setStatusBarVisible(false)

    //setScreenKeep-Zepp
    hmApp.setScreenKeep(true)

    //set Screen Page and Start Page
    hmUI.setScrollView(true,DEVICE_HEIGHT,7,true)
    // hmUI.scrollToPage(1, true)

    //get network data
    this.fetchData(newsTitle,newsTopic[newsTitle]);

    //draw Screen UI
    for(var pageNum=1;pageNum<=5;pageNum++)
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: mpx_w(10)+mpx_auto(10,DEVICE_WIDTH),
      y: DEVICE_HEIGHT*pageNum+mpx_h(76),
      w: mpx_w(80)-mpx_auto(20,DEVICE_WIDTH),
      h: mpx_h(21),
      text_size: 49,
      radius: 45,
      normal_color: DEFAULT_COLOR,
      press_color: DEFAULT_COLOR_TRANSPARENT,
      click_func: (button_widget) => {
        const nowPage=hmUI.getScrollCurrentPage()-2
        logger.log("click button and view"+nowPage);
        if(loadingAnimation==false){
          writeFileSync(nowPage, false,'newsNum')
          var titleTextStr= titleText[0].getProperty(hmUI.prop.TEXT)
          logger.log("click button and view"+titleTextStr);
          hmApp.gotoPage({ file: 'pages/all_devices/news' })
        }
      },
      text:getText("more")
    });
    for(var pageNum=1;pageNum<=5;pageNum++)
    titleText.push(hmUI.createWidget(hmUI.widget.TEXT, {
      x: mpx_w(5),
      y: DEVICE_HEIGHT*pageNum+mpx_h(15),
      w: mpx_w(90),
      h: mpx_h(56),
      color: 0xffffff,
      text_size: 36,
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text_style:hmUI.text_style.WRAP,
      text:getText("title"+pageNum)
    }))













     //Show topic information toast 
     if(newsTitle==0)
     switch(newsTopic[newsTitle]){
        case "0":
        hmUI.showToast({
          text:  getText('switch_topic_notic')+"XDA"
        })
          break;
        case "1":
          hmUI.showToast({
            text:  getText('switch_topic_notic')+"Featured Mobile"
          })
          break;
        case "2":
          hmUI.showToast({
            text:  getText('switch_topic_notic')+"Featured Computing"
          })
          break;
        case "3":
          hmUI.showToast({
            text:  getText('switch_topic_notic')+"Latest"
          })
          break;
        default:
          console.log("switch news topic");
          break;
     }else if(newsTitle==1)
     switch(newsTopic[newsTitle]){
        case "0":
        hmUI.showToast({
          text:  getText('switch_topic_notic')+"CNN World"
        })
          break;
        case "1":
          hmUI.showToast({
            text:  getText('switch_topic_notic')+"CNN Politics"
          })
          break;
        case "2":
          hmUI.showToast({
            text:  getText('switch_topic_notic')+"CNN Business"
          })
          break;
        case "3":
          hmUI.showToast({
            text:  getText('switch_topic_notic')+"CNN health"
          })
          break;
        default:
          console.log("switch news topic");
          break;
     }else if(newsTitle==2)
     switch(newsTopic[newsTitle]){
        case "0":
        hmUI.showToast({
          text:  getText('switch_topic_notic')+"NYT World"
        })
          break;
        case "1":
          hmUI.showToast({
            text:  getText('switch_topic_notic')+"NYT Science"
          })
          break;
        case "2":
          hmUI.showToast({
            text:  getText('switch_topic_notic')+"NYT Opinion"
          })
          break;
        case "3":
          hmUI.showToast({
            text:  getText('switch_topic_notic')+"NYT Sports"
          })
          break;
        default:
          console.log("switch news topic");
          break;
     }else if(newsTitle==3)
     switch(newsTopic[newsTitle]){
        case "0":
        hmUI.showToast({
          text:  getText('switch_topic_notic')+"Headlines"
        })
          break;
        case "1":
          hmUI.showToast({
            text:  getText('switch_topic_notic')+"World"
          })
          break;
        case "2":
          hmUI.showToast({
            text:  getText('switch_topic_notic')+"UK latest news"
          })
          break;
        case "3":
          hmUI.showToast({
            text:  getText('switch_topic_notic')+"US news"
          })
          break;
        default:
          console.log("switch news topic");
          break;
     }
  hmUI.createWidget(hmUI.widget.BUTTON, {
      x: mpx_w(10)+mpx_auto(10,DEVICE_WIDTH),
      y: DEVICE_HEIGHT*6+mpx_h(4)+mpx_h(24)*0,
      w: mpx_w(80)-mpx_auto(20,DEVICE_WIDTH),
      h: mpx_h(20),
      text_size: 49,
      radius: 45,
      color:0x000000,
      normal_color: getButtonColorTitle("0"),
      press_color: DEFAULT_COLOR_TRANSPARENT,
      click_func: (button_widget) => {

          newsTopic[newsTitle]="0"
          var newsTopicStr=newsTopic[0]+"?"+newsTopic[1]+"?"+newsTopic[2]+"?"+newsTopic[3]
          writeFileSync(newsTopicStr, false,'newsTopic')
      
      timer.stopTimer(loadingAnimation)
      hmApp.reloadPage({ file: 'pages/all_devices/index' })
      },
      text: getText("titleName-"+newsTitle+0)
  });
  hmUI.createWidget(hmUI.widget.BUTTON, {
    x: mpx_w(10)+mpx_auto(10,DEVICE_WIDTH),
    y: DEVICE_HEIGHT*6+mpx_h(4)+mpx_h(24)*1,
    w: mpx_w(80)-mpx_auto(20,DEVICE_WIDTH),
    h: mpx_h(20),
    text_size: 49,
    radius: 45,
    color:0x000000,
    normal_color: getButtonColorTitle("1"),
    press_color: DEFAULT_COLOR_TRANSPARENT,
    click_func: (button_widget) => {

        newsTopic[newsTitle]="1"
        var newsTopicStr=newsTopic[0]+"?"+newsTopic[1]+"?"+newsTopic[2]+"?"+newsTopic[3]
        writeFileSync(newsTopicStr, false,'newsTopic')
    
    timer.stopTimer(loadingAnimation)
    hmApp.reloadPage({ file: 'pages/all_devices/index' })
    },
    text: getText("titleName-"+newsTitle+1)
}); hmUI.createWidget(hmUI.widget.BUTTON, {
  x: mpx_w(10)+mpx_auto(10,DEVICE_WIDTH),
  y: DEVICE_HEIGHT*6+mpx_h(4)+mpx_h(24)*2,
  w: mpx_w(80)-mpx_auto(20,DEVICE_WIDTH),
  h: mpx_h(20),
  text_size: 49,
  radius: 45,
  color:0x000000,
  normal_color: getButtonColorTitle("2"),
  press_color: DEFAULT_COLOR_TRANSPARENT,
  click_func: (button_widget) => {

      newsTopic[newsTitle]="2"
      var newsTopicStr=newsTopic[0]+"?"+newsTopic[1]+"?"+newsTopic[2]+"?"+newsTopic[3]
      writeFileSync(newsTopicStr, false,'newsTopic')
  
  timer.stopTimer(loadingAnimation)
  hmApp.reloadPage({ file: 'pages/all_devices/index' })
  },
  text: getText("titleName-"+newsTitle+2)
}); hmUI.createWidget(hmUI.widget.BUTTON, {
  x: mpx_w(10)+mpx_auto(10,DEVICE_WIDTH),
  y: DEVICE_HEIGHT*6+mpx_h(4)+mpx_h(24)*3,
  w: mpx_w(80)-mpx_auto(20,DEVICE_WIDTH),
  h: mpx_h(20),
  text_size: 49,
  radius: 45,
  color:0x000000,
  normal_color: getButtonColorTitle("3"),
  press_color: DEFAULT_COLOR_TRANSPARENT,
  click_func: (button_widget) => {

      newsTopic[newsTitle]="3"
      var newsTopicStr=newsTopic[0]+"?"+newsTopic[1]+"?"+newsTopic[2]+"?"+newsTopic[3]
      writeFileSync(newsTopicStr, false,'newsTopic')
  
  timer.stopTimer(loadingAnimation)
  hmApp.reloadPage({ file: 'pages/all_devices/index' })
  },
  text: getText("titleName-"+newsTitle+3)
});
if(screenState==1){
    var button= hmUI.createWidget(hmUI.widget.BUTTON, {
      x: mpx_w(10)+mpx_auto(9,DEVICE_WIDTH),
      y: mpx_h(70),
      w: mpx_w(36)-mpx_auto(9,DEVICE_WIDTH),
      h: mpx_h(25),
      text_size: 45,
      radius: 45-mpx_auto(3,DEVICE_WIDTH),
      color:0x000000,
      normal_color: getButtonColor(0),
      press_color: 0xffffff,
      click_func: (button_widget) => {
        if(newsTitle==0){
          switch (newsTopic[newsTitle]) {
            case "0":
              newsTopic[newsTitle]="1"
              var newsTopicStr=newsTopic[0]+"?"+newsTopic[1]+"?"+newsTopic[2]+"?"+newsTopic[3]
              writeFileSync(newsTopicStr, false,'newsTopic')
              break;
            case "1":
              newsTopic[newsTitle]="2"
              var newsTopicStr=newsTopic[0]+"?"+newsTopic[1]+"?"+newsTopic[2]+"?"+newsTopic[3]
              writeFileSync(newsTopicStr, false,'newsTopic')
              break;
            case "2":
              newsTopic[newsTitle]="3"
              var newsTopicStr=newsTopic[0]+"?"+newsTopic[1]+"?"+newsTopic[2]+"?"+newsTopic[3]
              writeFileSync(newsTopicStr, false,'newsTopic')
              break;
            case "3":
              newsTopic[newsTitle]="0"
              var newsTopicStr=newsTopic[0]+"?"+newsTopic[1]+"?"+newsTopic[2]+"?"+newsTopic[3]
              writeFileSync(newsTopicStr, false,'newsTopic')
              break;
            default:
              console.log("switch news topic");
              break;
          }
        }else{
          writeFileSync(0, false,'newsTitle')
        }
        timer.stopTimer(loadingAnimation)
        hmApp.reloadPage({ file: 'pages/all_devices/index' })
      },
      text:"XDA"
    });
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: mpx_w(54),
      y: mpx_h(70),
      w: mpx_w(36)-mpx_auto(9,DEVICE_WIDTH),
      h: mpx_h(25),
      text_size: 45,
      radius: 45-mpx_auto(3,DEVICE_WIDTH),
      color:0x000000,
      normal_color: getButtonColor(1),
      press_color: 0xffffff,
      click_func: (button_widget) => {
        if(newsTitle==1){
          switch (newsTopic[newsTitle]) {
            case "0":
              newsTopic[newsTitle]="1"
              var newsTopicStr=newsTopic[0]+"?"+newsTopic[1]+"?"+newsTopic[2]+"?"+newsTopic[3]
              writeFileSync(newsTopicStr, false,'newsTopic')
              break;
            case "1":
              newsTopic[newsTitle]="2"
              var newsTopicStr=newsTopic[0]+"?"+newsTopic[1]+"?"+newsTopic[2]+"?"+newsTopic[3]
              writeFileSync(newsTopicStr, false,'newsTopic')
              break;
            case "2":
              newsTopic[newsTitle]="3"
              var newsTopicStr=newsTopic[0]+"?"+newsTopic[1]+"?"+newsTopic[2]+"?"+newsTopic[3]
              writeFileSync(newsTopicStr, false,'newsTopic')
              break;
            case "3":
              newsTopic[newsTitle]="0"
              var newsTopicStr=newsTopic[0]+"?"+newsTopic[1]+"?"+newsTopic[2]+"?"+newsTopic[3]
              writeFileSync(newsTopicStr, false,'newsTopic')
              break;
            default:
              console.log("switch news topic");
              break;
          }
        }else{
          writeFileSync(1, false,'newsTitle')
        }
        timer.stopTimer(loadingAnimation)
        hmApp.reloadPage({ file: 'pages/all_devices/index' })
      },
      text:"CNN"
    });
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: mpx_w(10)+mpx_auto(9,DEVICE_WIDTH),
      y: mpx_h(40),
      w: mpx_w(36)-mpx_auto(9,DEVICE_WIDTH),
      h: mpx_h(25),
      text_size: 45,
      radius: 45-mpx_auto(3,DEVICE_WIDTH),
      color:0x000000,
      normal_color: getButtonColor(2),
      press_color: 0xffffff,
      click_func: (button_widget) => {
        if(newsTitle==2){
          switch (newsTopic[newsTitle]) {
            case "0":
              newsTopic[newsTitle]="1"
              var newsTopicStr=newsTopic[0]+"?"+newsTopic[1]+"?"+newsTopic[2]+"?"+newsTopic[3]
              writeFileSync(newsTopicStr, false,'newsTopic')
              break;
            case "1":
              newsTopic[newsTitle]="2"
              var newsTopicStr=newsTopic[0]+"?"+newsTopic[1]+"?"+newsTopic[2]+"?"+newsTopic[3]
              writeFileSync(newsTopicStr, false,'newsTopic')
              break;
            case "2":
              newsTopic[newsTitle]="3"
              var newsTopicStr=newsTopic[0]+"?"+newsTopic[1]+"?"+newsTopic[2]+"?"+newsTopic[3]
              writeFileSync(newsTopicStr, false,'newsTopic')
              break;
            case "3":
              newsTopic[newsTitle]="0"
              var newsTopicStr=newsTopic[0]+"?"+newsTopic[1]+"?"+newsTopic[2]+"?"+newsTopic[3]
              writeFileSync(newsTopicStr, false,'newsTopic')
              break;
            default:
              console.log("switch news topic");
              break;
          }
        }else{
          writeFileSync(2, false,'newsTitle')
        }
        timer.stopTimer(loadingAnimation)
        hmApp.reloadPage({ file: 'pages/all_devices/index' })
      },
      text:"NYT"
    });
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: mpx_w(54),
      y: mpx_h(40),
      w: mpx_w(36)-mpx_auto(9,DEVICE_WIDTH),
      h: mpx_h(25),
      text_size: 45,
      radius: 45-mpx_auto(3,DEVICE_WIDTH),
      color:0x000000,
      normal_color: getButtonColor(3),
      press_color: 0xffffff,
      click_func: (button_widget) => {
        if(newsTitle==3){
          switch (newsTopic[newsTitle]) {
            case "0":
              newsTopic[newsTitle]="1"
              var newsTopicStr=newsTopic[0]+"?"+newsTopic[1]+"?"+newsTopic[2]+"?"+newsTopic[3]
              writeFileSync(newsTopicStr, false,'newsTopic')
              break;
            case "1":
              newsTopic[newsTitle]="2"
              var newsTopicStr=newsTopic[0]+"?"+newsTopic[1]+"?"+newsTopic[2]+"?"+newsTopic[3]
              writeFileSync(newsTopicStr, false,'newsTopic')
              break;
            case "2":
              newsTopic[newsTitle]="3"
              var newsTopicStr=newsTopic[0]+"?"+newsTopic[1]+"?"+newsTopic[2]+"?"+newsTopic[3]
              writeFileSync(newsTopicStr, false,'newsTopic')
              break;
            case "3":
              newsTopic[newsTitle]="0"
              var newsTopicStr=newsTopic[0]+"?"+newsTopic[1]+"?"+newsTopic[2]+"?"+newsTopic[3]
              writeFileSync(newsTopicStr, false,'newsTopic')
              break;
            default:
              console.log("switch news topic");
              break;
          }
        }else{
          writeFileSync(3, false,'newsTitle')
        }
        timer.stopTimer(loadingAnimation)
        hmApp.reloadPage({ file: 'pages/all_devices/index' })
      },
      text:"TG"
    });
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: mpx_w(10)+mpx_auto(9,DEVICE_WIDTH),
      y: mpx_h(10),
      w: mpx_w(36)-mpx_auto(9,DEVICE_WIDTH),
      h: mpx_h(25),
      text_size: 41,
      radius: 54-mpx_auto(3,DEVICE_WIDTH),
      color:0x000000,
      normal_color: 0xC0C0C0,
      press_color: 0xffffff,
      click_func: (button_widget) => {
        hmUI.showToast({
          text:  getText('more_notic')
        })
      },
      text:getText("button_more")
    });
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: mpx_w(54),
      y: mpx_h(10),
      w: mpx_w(36)-mpx_auto(9,DEVICE_WIDTH),
      h: mpx_h(25),
      text_size: 41,
      radius: 54-mpx_auto(3,DEVICE_WIDTH),
      color:0x000000,
      normal_color: 0xC0C0C0,
      press_color: 0xffffff,
      click_func: (button_widget) => {
        if(loadingAnimation==false)
      hmApp.gotoPage({ file: 'pages/all_devices/about' })
      },
      text:getText("button_setting")
    });
  }else{//--------------------------------------------------------------------sbUI----------------------------------
    var button= hmUI.createWidget(hmUI.widget.BUTTON, {
      x: mpx_w(15),
      y: mpx_h(15+50),
      w: mpx_w(32.5),
      h: mpx_h(20),
      text_size: 45,
      radius: 45-mpx_auto(3,DEVICE_WIDTH),
      color:0x000000,
      normal_color: getButtonColor(0),
      press_color: 0xffffff,
      click_func: (button_widget) => {
        if(newsTitle==0){
          switch (newsTopic[newsTitle]) {
            case "0":
              newsTopic[newsTitle]="1"
              var newsTopicStr=newsTopic[0]+"?"+newsTopic[1]+"?"+newsTopic[2]+"?"+newsTopic[3]
              writeFileSync(newsTopicStr, false,'newsTopic')
              break;
            case "1":
              newsTopic[newsTitle]="2"
              var newsTopicStr=newsTopic[0]+"?"+newsTopic[1]+"?"+newsTopic[2]+"?"+newsTopic[3]
              writeFileSync(newsTopicStr, false,'newsTopic')
              break;
            case "2":
              newsTopic[newsTitle]="3"
              var newsTopicStr=newsTopic[0]+"?"+newsTopic[1]+"?"+newsTopic[2]+"?"+newsTopic[3]
              writeFileSync(newsTopicStr, false,'newsTopic')
              break;
            case "3":
              newsTopic[newsTitle]="0"
              var newsTopicStr=newsTopic[0]+"?"+newsTopic[1]+"?"+newsTopic[2]+"?"+newsTopic[3]
              writeFileSync(newsTopicStr, false,'newsTopic')
              break;
            default:
              console.log("switch news topic");
              break;
          }
        }else{
          writeFileSync(0, false,'newsTitle')
        }
        timer.stopTimer(loadingAnimation)
        hmApp.reloadPage({ file: 'pages/all_devices/index' })
      },
      text:"XDA"
    });
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: mpx_w(15+3+32.5),
      y: mpx_h(15+50),
      w: mpx_w(32.5),
      h: mpx_h(20),
      text_size: 45,
      radius: 45-mpx_auto(3,DEVICE_WIDTH),
      color:0x000000,
      normal_color: getButtonColor(1),
      press_color: 0xffffff,
      click_func: (button_widget) => {
        if(newsTitle==1){
          switch (newsTopic[newsTitle]) {
            case "0":
              newsTopic[newsTitle]="1"
              var newsTopicStr=newsTopic[0]+"?"+newsTopic[1]+"?"+newsTopic[2]+"?"+newsTopic[3]
              writeFileSync(newsTopicStr, false,'newsTopic')
              break;
            case "1":
              newsTopic[newsTitle]="2"
              var newsTopicStr=newsTopic[0]+"?"+newsTopic[1]+"?"+newsTopic[2]+"?"+newsTopic[3]
              writeFileSync(newsTopicStr, false,'newsTopic')
              break;
            case "2":
              newsTopic[newsTitle]="3"
              var newsTopicStr=newsTopic[0]+"?"+newsTopic[1]+"?"+newsTopic[2]+"?"+newsTopic[3]
              writeFileSync(newsTopicStr, false,'newsTopic')
              break;
            case "3":
              newsTopic[newsTitle]="0"
              var newsTopicStr=newsTopic[0]+"?"+newsTopic[1]+"?"+newsTopic[2]+"?"+newsTopic[3]
              writeFileSync(newsTopicStr, false,'newsTopic')
              break;
            default:
              console.log("switch news topic");
              break;
          }
        }else{
          writeFileSync(1, false,'newsTitle')
        }
        timer.stopTimer(loadingAnimation)
        hmApp.reloadPage({ file: 'pages/all_devices/index' })
      },
      text:"CNN"
    });
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: mpx_w(15),
      y: mpx_h(15+25),
      w: mpx_w(32.5),
      h: mpx_h(20),
      text_size: 45,
      radius: 45-mpx_auto(3,DEVICE_WIDTH),
      color:0x000000,
      normal_color: getButtonColor(2),
      press_color: 0xffffff,
      click_func: (button_widget) => {
        if(newsTitle==2){
          switch (newsTopic[newsTitle]) {
            case "0":
              newsTopic[newsTitle]="1"
              var newsTopicStr=newsTopic[0]+"?"+newsTopic[1]+"?"+newsTopic[2]+"?"+newsTopic[3]
              writeFileSync(newsTopicStr, false,'newsTopic')
              break;
            case "1":
              newsTopic[newsTitle]="2"
              var newsTopicStr=newsTopic[0]+"?"+newsTopic[1]+"?"+newsTopic[2]+"?"+newsTopic[3]
              writeFileSync(newsTopicStr, false,'newsTopic')
              break;
            case "2":
              newsTopic[newsTitle]="3"
              var newsTopicStr=newsTopic[0]+"?"+newsTopic[1]+"?"+newsTopic[2]+"?"+newsTopic[3]
              writeFileSync(newsTopicStr, false,'newsTopic')
              break;
            case "3":
              newsTopic[newsTitle]="0"
              var newsTopicStr=newsTopic[0]+"?"+newsTopic[1]+"?"+newsTopic[2]+"?"+newsTopic[3]
              writeFileSync(newsTopicStr, false,'newsTopic')
              break;
            default:
              console.log("switch news topic");
              break;
          }
        }else{
          writeFileSync(2, false,'newsTitle')
        }
        timer.stopTimer(loadingAnimation)
        hmApp.reloadPage({ file: 'pages/all_devices/index' })
      },
      text:"NYT"
    });
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: mpx_w(15+37.5),
      y: mpx_h(15+25),
      w: mpx_w(32.5),
      h: mpx_h(20),
      text_size: 45,
      radius: 45-mpx_auto(3,DEVICE_WIDTH),
      color:0x000000,
      normal_color: getButtonColor(3),
      press_color: 0xffffff,
      click_func: (button_widget) => {
        if(newsTitle==3){
          switch (newsTopic[newsTitle]) {
            case "0":
              newsTopic[newsTitle]="1"
              var newsTopicStr=newsTopic[0]+"?"+newsTopic[1]+"?"+newsTopic[2]+"?"+newsTopic[3]
              writeFileSync(newsTopicStr, false,'newsTopic')
              break;
            case "1":
              newsTopic[newsTitle]="2"
              var newsTopicStr=newsTopic[0]+"?"+newsTopic[1]+"?"+newsTopic[2]+"?"+newsTopic[3]
              writeFileSync(newsTopicStr, false,'newsTopic')
              break;
            case "2":
              newsTopic[newsTitle]="3"
              var newsTopicStr=newsTopic[0]+"?"+newsTopic[1]+"?"+newsTopic[2]+"?"+newsTopic[3]
              writeFileSync(newsTopicStr, false,'newsTopic')
              break;
            case "3":
              newsTopic[newsTitle]="0"
              var newsTopicStr=newsTopic[0]+"?"+newsTopic[1]+"?"+newsTopic[2]+"?"+newsTopic[3]
              writeFileSync(newsTopicStr, false,'newsTopic')
              break;
            default:
              console.log("switch news topic");
              break;
          }
        }else{
          writeFileSync(3, false,'newsTitle')
        }
        timer.stopTimer(loadingAnimation)
        hmApp.reloadPage({ file: 'pages/all_devices/index' })
      },
      text:"TG"
    });
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: mpx_w(15),
      y: mpx_h(15),
      w: mpx_w(32.5),
      h: mpx_h(20),
      text_size: 41,
      radius: 54-mpx_auto(3,DEVICE_WIDTH),
      color:0x000000,
      normal_color: 0xC0C0C0,
      press_color: 0xffffff,
      click_func: (button_widget) => {
        hmUI.showToast({
          text:  getText('more_notic')
        })
      },
      text:getText("button_more")
    });
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: mpx_w(15+37.5),
      y: mpx_h(15),
      w: mpx_w(32.5),
      h: mpx_h(20),
      text_size: 41,
      radius: 54-mpx_auto(3,DEVICE_WIDTH),
      color:0x000000,
      normal_color: 0xC0C0C0,
      press_color: 0xffffff,
      click_func: (button_widget) => {
        if(loadingAnimation==false)
      hmApp.gotoPage({ file: 'pages/all_devices/about' })
      },
      text:getText("button_setting")
    });
  }





















    

    //draw Loading animation
    loadingAnimation = timer.createTimer(
      2500,
      500,
      function (option) {
        //callback
        hmUI.scrollToPage((hmUI.getScrollCurrentPage()%5)+1, false)
      },
      { hour: 0, minute: 15, second: 30 }
    )
    
    

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
    //getButtonColor() view selected button
    function getButtonColor(buttonNum){
      if(buttonNum==newsTitle)
        return 0x8c9492;
      else
        return 0xc0dfd7;
    }
    function getButtonColorTitle(buttonNum){
      if(buttonNum==newsTopic[newsTitle])
        return 0x8c9492;
      else
        return 0xc0dfd7;
    }
  },onDestory() {
      //setScreenKeep-Zepp
      hmApp.setScreenKeep(false)
      //stop loadingAnimation
      timer.stopTimer(loadingAnimation)
  },
  fetchData(newsTitle,newsTopic) {
    messageBuilder.request({
      method: "GET_DATA_"+newsTitle+"_"+newsTopic,
    })
    .then(data => {
      logger.log('receive data')
      const { result = {} } = data
      const  text = result

      //stop loadingAnimation
      timer.stopTimer(loadingAnimation)
      loadingAnimation=false
      //scrollToPage-Zepp
      hmUI.scrollToPage(1, true)

      var resultText=text.split("fwz233");
      for(var pageNum=0;pageNum<5;pageNum++){
        titleText[pageNum].setProperty(hmUI.prop.MORE, {
          align_h:hmUI.align.LEFT,
          text:resultText[pageNum*2+2]
        })
      }

      //draw Screen UI
    for(var pageNum=1;pageNum<=5;pageNum++)
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: 0,
      y: DEVICE_HEIGHT*pageNum,
      w: mpx_w(100),
      h: mpx_h(15),
      text_size: 36,
      click_func: (button_widget) => {
      //scrollToPage-Zepp
      hmUI.scrollToPage(0, true)
      },
      text:pageNum+"/5"
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
      if(screenState==1)
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
    })
  },
});
