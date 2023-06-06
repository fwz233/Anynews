import { DEVICE_WIDTH , DEVICE_HEIGHT } from "../../utils/config/device";
import { readFileSync, writeFileSync } from '../../utils/config/fs';
var screenState
const logger = DeviceRuntimeCore.HmLogger.getLogger("fetch_api");
const { messageBuilder } = getApp()._options.globalData;
var titleText=[]
var loadingAnimation,getTitleOK=true
var newsTitle,newsTopic

// ,
//         {
//           "name": "band71",
//           "deviceSource": 252
//         },
//         {
//           "name": "band72",
//           "deviceSource": 253
//         },
//         {
//           "name": "band73",
//           "deviceSource": 254
//         }
var i18n= {
  "1": {
    "more": "See more",
    "settingTitle":"Setting",
    "aboutTitle":"About",
    "title1": "Loading...",
    "title2": "Loading...",
    "title3": "Loading...",
    "title4": "Loading...",
    "title5": "Loading...",
    "lod_notic":"One moment please",
    "switch_topic_notic":"Getting\n",
    "more_notic":"Please tell me the news platform you want to watch",
    "button_more": "Help",
    "help1": "Click to view full text",
    "help2": "Scroll down to settings",
    "help3": "Swipe to show more",
    "button_setting": "About",
    "xda": "XDA",
    "cnn": "CNN",
    "nyt": "NYT",
    "tg": "TG",
    "titleName-00":"Headlines",
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
    "about": "Developer: fwz233\nGithub homepage:\nhttps://github.com/fwz233\nFeedback: fwz233@qq.com\ntell me news you like,\nor your build own software",

  },
  "0": {
    "more": "查看更多",
    "settingTitle":"设置",
    "aboutTitle":"关于",
    "title1": "加载中...",
    "title2": "加载中...",
    "title3": "加载中...",
    "title4": "加载中...",
    "title5": "加载中...",
    "lod_notic":"请稍等",
    "switch_topic_notic":"正在获取\n",
    "more_notic":"请告诉我你想看的新闻平台",
    "button_more": "帮助",
    "help1": "点击查看全文",
    "help2": "下滑进入设置",
    "help3": "上滑查看更多新闻",
    "button_setting": "关于",
    "xda": "XDA",
    "cnn": "CNN",
    "nyt": "NYT",
    "tg": "TG",
    "titleName-00":"Headlines",
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
    "about": "开发者:fwz233\nGithub主页:\nhttps://github.com/fwz233\n反馈邮箱:fwz233@qq.com\n请告诉我你需要的新闻平台，\n或者你可以构建你自己的\nAnynews",

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
    hmUI.setScrollView(true,DEVICE_HEIGHT,2,true)
    // hmUI.scrollToPage(1, true)

    //get network data
    this.fetchData(newsTitle,newsTopic[newsTitle]);

    //draw Screen UI
    
if(screenState==1){
    for(var pageNum=1;pageNum<=5;pageNum++)
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: mpx_w(10),
      y: DEVICE_HEIGHT*pageNum+mpx_h(76),
      w: mpx_w(80),
      h: mpx_h(21),
      text_size: 49,
      radius: 45,
      color:0x000000,
      normal_color: 0xc0dfd7,
      press_color: 0xc0dfd7,
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
      h: 52*5,
      color: 0xffffff,
      text_size: 36,
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text_style:hmUI.text_style.WRAP,
      text:getText("title"+pageNum)
    }))
  }else{
    for(var pageNum=1;pageNum<=5;pageNum++)
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: mpx_w(15),
      y: DEVICE_HEIGHT*pageNum+mpx_h(15+49+3),
      w: mpx_w(70),
      h: mpx_h(18),
      text_size: 49,
      radius: 45,
      color:0x000000,
      normal_color: 0xc0dfd7,
      press_color: 0xc0dfd7,
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
      x: mpx_w(15),
      y: DEVICE_HEIGHT*pageNum+mpx_h(18),
      w: mpx_w(70),
      h: 52*4,
      color: 0xffffff,
      text_size: 36,
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.TOP,
      text_style:hmUI.text_style.WRAP,
      text:getText("title"+pageNum)
    }))
  }












     //Show topic information toast 
     if(newsTitle==0)
     switch(newsTopic[newsTitle]){
        case "0":
        hmUI.showToast({
          text:  getText('switch_topic_notic')+"Headlines"
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


     if(screenState==1){
  hmUI.createWidget(hmUI.widget.BUTTON, {
      x: mpx_w(10),
      y: DEVICE_HEIGHT*6+mpx_h(4)+mpx_h(24)*0,
      w: mpx_w(80),
      h: mpx_h(20),
      text_size: 49,
      radius: 45,
      color:0x000000,
      normal_color: getButtonColorTitle("0"),
      press_color: 0xc0dfd7,
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
    x: mpx_w(10),
    y: DEVICE_HEIGHT*6+mpx_h(4)+mpx_h(24)*1,
    w: mpx_w(80),
    h: mpx_h(20),
    text_size: 49,
    radius: 45,
    color:0x000000,
    normal_color: getButtonColorTitle("1"),
    press_color: 0xc0dfd7,
    click_func: (button_widget) => {

        newsTopic[newsTitle]="1"
        var newsTopicStr=newsTopic[0]+"?"+newsTopic[1]+"?"+newsTopic[2]+"?"+newsTopic[3]
        writeFileSync(newsTopicStr, false,'newsTopic')
    
    timer.stopTimer(loadingAnimation)
    hmApp.reloadPage({ file: 'pages/all_devices/index' })
    },
    text: getText("titleName-"+newsTitle+1)
}); hmUI.createWidget(hmUI.widget.BUTTON, {
  x: mpx_w(10),
  y: DEVICE_HEIGHT*6+mpx_h(4)+mpx_h(24)*2,
  w: mpx_w(80),
  h: mpx_h(20),
  text_size: 49,
  radius: 45,
  color:0x000000,
  normal_color: getButtonColorTitle("2"),
  press_color: 0xc0dfd7,
  click_func: (button_widget) => {

      newsTopic[newsTitle]="2"
      var newsTopicStr=newsTopic[0]+"?"+newsTopic[1]+"?"+newsTopic[2]+"?"+newsTopic[3]
      writeFileSync(newsTopicStr, false,'newsTopic')
  
  timer.stopTimer(loadingAnimation)
  hmApp.reloadPage({ file: 'pages/all_devices/index' })
  },
  text: getText("titleName-"+newsTitle+2)
}); hmUI.createWidget(hmUI.widget.BUTTON, {
  x: mpx_w(10),
  y: DEVICE_HEIGHT*6+mpx_h(4)+mpx_h(24)*3,
  w: mpx_w(80),
  h: mpx_h(20),
  text_size: 49,
  radius: 45,
  color:0x000000,
  normal_color: getButtonColorTitle("3"),
  press_color: 0xc0dfd7,
  click_func: (button_widget) => {

      newsTopic[newsTitle]="3"
      var newsTopicStr=newsTopic[0]+"?"+newsTopic[1]+"?"+newsTopic[2]+"?"+newsTopic[3]
      writeFileSync(newsTopicStr, false,'newsTopic')
  
  timer.stopTimer(loadingAnimation)
  hmApp.reloadPage({ file: 'pages/all_devices/index' })
  },
  text: getText("titleName-"+newsTitle+3)
});
     }else{//--------------------------------------------------------------------------------
      hmUI.createWidget(hmUI.widget.BUTTON, {
        x: mpx_w(15),
        y: DEVICE_HEIGHT*6+mpx_h(15-2)+mpx_h(19)*0,
        w: mpx_w(70),
        h: mpx_h(18),
        text_size: 49,
        radius: 39,
        color:0x000000,
        normal_color: getButtonColorTitle("0"),
        press_color: 0xc0dfd7,
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
      x: mpx_w(15),
      y: DEVICE_HEIGHT*6+mpx_h(15-2+0.25)+mpx_h(19)*1,
      w: mpx_w(70),
      h: mpx_h(18),
      text_size: 49,
      radius: 39,
      color:0x000000,
      normal_color: getButtonColorTitle("1"),
      press_color: 0xc0dfd7,
      click_func: (button_widget) => {
  
          newsTopic[newsTitle]="1"
          var newsTopicStr=newsTopic[0]+"?"+newsTopic[1]+"?"+newsTopic[2]+"?"+newsTopic[3]
          writeFileSync(newsTopicStr, false,'newsTopic')
      
      timer.stopTimer(loadingAnimation)
      hmApp.reloadPage({ file: 'pages/all_devices/index' })
      },
      text: getText("titleName-"+newsTitle+1)
  }); hmUI.createWidget(hmUI.widget.BUTTON, {
    x: mpx_w(15),
    y: DEVICE_HEIGHT*6+mpx_h(15-2+0.5)+mpx_h(19)*2,
    w: mpx_w(70),
    h: mpx_h(18),
    text_size: 49,
    radius: 39,
    color:0x000000,
    normal_color: getButtonColorTitle("2"),
    press_color: 0xc0dfd7,
    click_func: (button_widget) => {
  
        newsTopic[newsTitle]="2"
        var newsTopicStr=newsTopic[0]+"?"+newsTopic[1]+"?"+newsTopic[2]+"?"+newsTopic[3]
        writeFileSync(newsTopicStr, false,'newsTopic')
    
    timer.stopTimer(loadingAnimation)
    hmApp.reloadPage({ file: 'pages/all_devices/index' })
    },
    text: getText("titleName-"+newsTitle+2)
  }); hmUI.createWidget(hmUI.widget.BUTTON, {
    x: mpx_w(15),
    y: DEVICE_HEIGHT*6+mpx_h(15-2+0.75)+mpx_h(19)*3,
    w: mpx_w(70),
    h: mpx_h(18),
    text_size: 49,
    radius: 39,
    color:0x000000,
    normal_color: getButtonColorTitle("3"),
    press_color: 0xc0dfd7,
    click_func: (button_widget) => {
  
        newsTopic[newsTitle]="3"
        var newsTopicStr=newsTopic[0]+"?"+newsTopic[1]+"?"+newsTopic[2]+"?"+newsTopic[3]
        writeFileSync(newsTopicStr, false,'newsTopic')
    
    timer.stopTimer(loadingAnimation)
    hmApp.reloadPage({ file: 'pages/all_devices/index' })
    },
    text: getText("titleName-"+newsTitle+3)
  });
     }






if(screenState==1){
  hmUI.createWidget(hmUI.widget.TEXT, {
    x: mpx_w(0),
    y: mpx_h(0),
    w: mpx_w(100),
    h: mpx_h(20),
    color: 0xffffff,
    text_size: 49,
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.CENTER_V,
    text_style:hmUI.text_style.WRAP,
    text:getText("settingTitle")
  })
    var button= hmUI.createWidget(hmUI.widget.BUTTON, {
      x: mpx_w(9),
      y: mpx_h(75),
      w: mpx_w(39),
      h: mpx_h(20),
      text_size: 45,
      radius: 39,
      color:0x000000,
      normal_color: getButtonColor(0),
      press_color: 0xc0dfd7,
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
      text:getText("xda")
    });
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: mpx_w(52),
      y: mpx_h(75),
      w: mpx_w(39),
      h: mpx_h(20),
      text_size: 45,
      radius: 39,
      color:0x000000,
      normal_color: getButtonColor(1),
      press_color: 0xc0dfd7,
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
      text:getText("cnn")
    });
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: mpx_w(9),
      y: mpx_h(50),
      w: mpx_w(39),
      h: mpx_h(20),
      text_size: 45,
      radius: 39,
      color:0x000000,
      normal_color: getButtonColor(2),
      press_color: 0xc0dfd7,
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
      text:getText("nyt")
    });
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: mpx_w(52),
      y: mpx_h(50),
      w: mpx_w(39),
      h: mpx_h(20),
      text_size: 45,
      radius: 39,
      color:0x000000,
      normal_color: getButtonColor(3),
      press_color: 0xc0dfd7,
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
      text:getText("tg")
    });
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: mpx_w(9),
      y: mpx_h(25),
      w: mpx_w(39),
      h: mpx_h(20),
      text_size: 41,
      radius: 39,
      color:0x000000,
      normal_color: getButtonColor(4),
      press_color: 0xc0dfd7,
      click_func: (button_widget) => {
          HelpPage()
      },
      text:getText("button_more")
    });
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: mpx_w(52),
      y: mpx_h(25),
      w: mpx_w(39),
      h: mpx_h(20),
      text_size: 41,
      radius: 39,
      color:0x000000,
      normal_color: getButtonColor(4),
      press_color: 0xc0dfd7,
      click_func: (button_widget) => {
        SettingPage()
        },
      text:getText("button_setting")
    });
  }else{//--------------------------------------------------------------------sbUI----------------------------------
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: mpx_w(0),
      y: mpx_h(0),
      w: mpx_w(100),
      h: mpx_h(15),
      color: 0xffffff,
      text_size: 38,
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text_style:hmUI.text_style.WRAP,
      text:getText("settingTitle")
    })
    var button= hmUI.createWidget(hmUI.widget.BUTTON, {
      x: mpx_w(15),
      y: mpx_h(15+50),
      w: mpx_w(32.5),
      h: mpx_h(20),
      text_size: 45,
      radius: 45-mpx_auto(3,DEVICE_WIDTH),
      color:0x000000,
      normal_color: getButtonColor(0),
      press_color: 0xc0dfd7,
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
      text:getText("xda")
    });
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: mpx_w(15+37.5),
      y: mpx_h(15+50),
      w: mpx_w(32.5),
      h: mpx_h(20),
      text_size: 45,
      radius: 45-mpx_auto(3,DEVICE_WIDTH),
      color:0x000000,
      normal_color: getButtonColor(1),
      press_color: 0xc0dfd7,
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
      text:getText("cnn")
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
      press_color: 0xc0dfd7,
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
      text:getText("nyt")
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
      press_color: 0xc0dfd7,
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
      text:getText("tg")
    });
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: mpx_w(15),
      y: mpx_h(15),
      w: mpx_w(32.5),
      h: mpx_h(20),
      text_size: 41,
      radius: 45-mpx_auto(3,DEVICE_WIDTH),
      color:0x000000,
      normal_color: getButtonColor(4),
      press_color: 0xc0dfd7,
      click_func: (button_widget) => {
        HelpPage()
      },
      text:getText("button_more")
    });
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: mpx_w(15+37.5),
      y: mpx_h(15),
      w: mpx_w(32.5),
      h: mpx_h(20),
      text_size: 41,
      radius: 45-mpx_auto(3,DEVICE_WIDTH),
      color:0x000000,
      normal_color: getButtonColor(4),
      press_color: 0xc0dfd7,
      click_func: (button_widget) => {
        SettingPage()
      },
      text:getText("button_setting")
    });
  }


  function HelpPage(){
    hmUI.setScrollView(true,DEVICE_HEIGHT,8,true)//7
    hmUI.scrollToPage(7, false)
  hmUI.createWidget(hmUI.widget.IMG, {
      x: mpx_w(50)-32,
      y: DEVICE_HEIGHT*7+mpx_h(40),
      src: 'touch.png'
    })
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 0,
      y: DEVICE_HEIGHT*7+mpx_h(40)+64,
      w: mpx_w(100),
      h: 46,
      color: 0xffffff,
      text_size: 36,
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text_style: hmUI.text_style.NONE,
      text: getText("help1")
    })
    hmUI.createWidget(hmUI.widget.IMG, {
      x: mpx_w(50)-32,
      y: DEVICE_HEIGHT*7+mpx_h(5),
      src: 'down.png'
    })
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 0,
      y: DEVICE_HEIGHT*7+mpx_h(5)+64,
      w: mpx_w(100),
      h: 46,
      color: 0xffffff,
      text_size: 36,
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text_style: hmUI.text_style.NONE,
      text: getText("help2")
    })
    hmUI.createWidget(hmUI.widget.IMG, {
      x: mpx_w(50)-32,
      y: DEVICE_HEIGHT*7+mpx_h(85),
      src: 'up.png'
    })
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 0,
      y: DEVICE_HEIGHT*7+mpx_h(85)-46,
      w: mpx_w(100),
      h: 46,
      color: 0xffffff,
      text_size: 36,
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text_style: hmUI.text_style.NONE,
      text: getText("help3")
    })

    hmApp.registerGestureEvent(function (event) {
      let msg = 'none'
      switch (event) {
        case hmApp.gesture.UP:
          msg = 'up'
          break
        case hmApp.gesture.DOWN:
          msg = 'down'
          break
        case hmApp.gesture.LEFT:
          msg = 'left'
          break
        case hmApp.gesture.RIGHT:
          msg = 'right'
          break
        default:
          break
      }
      console.log(`receive gesture event ${msg}`)
    
      // 取消注册手势监听
      hmApp.unregisterGestureEvent()
      //取消注册按键监听
      hmApp.unregisterKeyEvent();
      //取消注册按键监听
      hmApp.unregisterSpinEvent()
     
       if(getTitleOK!=false){
       hmUI.setScrollView(true,DEVICE_HEIGHT,2,true)
}else{
 hmUI.setScrollView(true,DEVICE_HEIGHT,7,true)
}
  
      hmUI.scrollToPage(1, false)
      //不跳过默认手势
      return ture
    })
//注册按键监听 一个JsApp重复注册会导致上一个注册的回调失效
hmApp.registerKeyEvent(function (key, action) {
  console.log('receive key code:' + code + ' action:' + action)
  let msg = ''
  let ret = true 
  switch (key) {
    case hmApp.key.BACK:
      msg = 'back.'
      break
    case hmApp.key.SELECT:
      msg = 'select.'
      break
    case hmApp.key.HOME:
      msg = 'home.'
      ret = true  //跳过默认 home键处理
      break
    case hmApp.key.UP:
      msg = 'up.'
      break
    case hmApp.key.DOWN:
      msg = 'down.'
      break
    case hmApp.key.SHORTCUT:
      msg = 'shortcut.'
      break
    default:
      msg = 'none.'
      break
  }

  switch (action) {
    case hmApp.action.CLICK:
      msg = msg + 'click'
      break
    case hmApp.action.LONG_PRESS:
      msg = msg + 'longPress'
      break
    case hmApp.action.DOUBLE_CLICK:
      msg = msg + 'doubleClick'
      break
    case hmApp.action.RELEASE:
      msg = msg + 'release'
      break
    case hmApp.action.PRESS:
      msg = msg + 'press'
      break
    default:
      msg = msg + 'none'
      break
  }

  console.log('receive key:' + msg)
      // 取消注册手势监听
      hmApp.unregisterGestureEvent()
      //取消注册按键监听
      hmApp.unregisterKeyEvent();
      //取消注册按键监听
      hmApp.unregisterSpinEvent()
   
       if(getTitleOK!=false){
       hmUI.setScrollView(true,DEVICE_HEIGHT,2,true)
}else{
 hmUI.setScrollView(true,DEVICE_HEIGHT,7,true)
}
      hmUI.scrollToPage(1, false)
  return ret
})
hmApp.registerSpinEvent(function (key, degree) {
  console.log('receive key:' + key + ' degree:' + degree) //这里的 key 目前只能是 HOME，可以不用判断
        // 取消注册手势监听
        hmApp.unregisterGestureEvent()
        //取消注册按键监听
        hmApp.unregisterKeyEvent();
        //取消注册按键监听
        hmApp.unregisterSpinEvent()
       
         if(getTitleOK!=false){
       hmUI.setScrollView(true,DEVICE_HEIGHT,2,true)
}else{
 hmUI.setScrollView(true,DEVICE_HEIGHT,7,true)
}
        hmUI.scrollToPage(1, false)
})
  }
  function SettingPage(){
    hmUI.setScrollView(true,DEVICE_HEIGHT,9,true)//7
    hmUI.scrollToPage(8, false)

    hmUI.createWidget(hmUI.widget.TEXT, {
      x: mpx_w(0),
      y: DEVICE_HEIGHT*8+mpx_h(0),
      w: mpx_w(100),
      h: mpx_h(20),
      color: 0xffffff,
      text_size: 38,
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text_style:hmUI.text_style.WRAP,
      text:getText("aboutTitle")
    })
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: mpx_w(0),
      y: DEVICE_HEIGHT*8+mpx_h(15),
      w: mpx_w(100),
      h: mpx_h(85),
      color: 0xffffff,
      text_size: 29,
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text_style:hmUI.text_style.WRAP,
      text:getText("about")
    })
    hmApp.registerGestureEvent(function (event) {
      let msg = 'none'
      switch (event) {
        case hmApp.gesture.UP:
          msg = 'up'
          break
        case hmApp.gesture.DOWN:
          msg = 'down'
          break
        case hmApp.gesture.LEFT:
          msg = 'left'
          break
        case hmApp.gesture.RIGHT:
          msg = 'right'
          break
        default:
          break
      }
      console.log(`receive gesture event ${msg}`)
    
      // 取消注册手势监听
      hmApp.unregisterGestureEvent()
      //取消注册按键监听
      hmApp.unregisterKeyEvent();
      //取消注册按键监听
      hmApp.unregisterSpinEvent()
 
       if(getTitleOK!=false){
       hmUI.setScrollView(true,DEVICE_HEIGHT,2,true)
}else{
 hmUI.setScrollView(true,DEVICE_HEIGHT,7,true)
}
      hmUI.scrollToPage(1, false)
  

      //不跳过默认手势
      return ture
    })
//注册按键监听 一个JsApp重复注册会导致上一个注册的回调失效
hmApp.registerKeyEvent(function (key, action) {
  console.log('receive key code:' + code + ' action:' + action)
  let msg = ''
  let ret = true 
  switch (key) {
    case hmApp.key.BACK:
      msg = 'back.'
      break
    case hmApp.key.SELECT:
      msg = 'select.'
      break
    case hmApp.key.HOME:
      msg = 'home.'
      ret = true  //跳过默认 home键处理
      break
    case hmApp.key.UP:
      msg = 'up.'
      break
    case hmApp.key.DOWN:
      msg = 'down.'
      break
    case hmApp.key.SHORTCUT:
      msg = 'shortcut.'
      break
    default:
      msg = 'none.'
      break
  }

  switch (action) {
    case hmApp.action.CLICK:
      msg = msg + 'click'
      break
    case hmApp.action.LONG_PRESS:
      msg = msg + 'longPress'
      break
    case hmApp.action.DOUBLE_CLICK:
      msg = msg + 'doubleClick'
      break
    case hmApp.action.RELEASE:
      msg = msg + 'release'
      break
    case hmApp.action.PRESS:
      msg = msg + 'press'
      break
    default:
      msg = msg + 'none'
      break
  }

  console.log('receive key:' + msg)
      // 取消注册手势监听
      hmApp.unregisterGestureEvent()
      //取消注册按键监听
      hmApp.unregisterKeyEvent();
      //取消注册按键监听
      hmApp.unregisterSpinEvent()
  
       if(getTitleOK!=false){
       hmUI.setScrollView(true,DEVICE_HEIGHT,2,true)
}else{
 hmUI.setScrollView(true,DEVICE_HEIGHT,7,true)
}

      hmUI.scrollToPage(1, false)
  return ret
})
hmApp.registerSpinEvent(function (key, degree) {
  console.log('receive key:' + key + ' degree:' + degree) //这里的 key 目前只能是 HOME，可以不用判断
        // 取消注册手势监听
        hmApp.unregisterGestureEvent()
        //取消注册按键监听
        hmApp.unregisterKeyEvent();
        //取消注册按键监听
        hmApp.unregisterSpinEvent()
       
         if(getTitleOK!=false){
       hmUI.setScrollView(true,DEVICE_HEIGHT,2,true)
}else{
 hmUI.setScrollView(true,DEVICE_HEIGHT,7,true)
}

        hmUI.scrollToPage(1, false)
})
  }


















    

    // //draw Loading animation
    // loadingAnimation = timer.createTimer(
    //   2500,
    //   500,
    //   function (option) {
    //     //callback
    //     hmUI.scrollToPage((hmUI.getScrollCurrentPage()%5)+1, false)
    //   },
    //   { hour: 0, minute: 15, second: 30 }
    // )
    
    

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
        return 0xc0dfd7;
      else
        return 0x8c9492;
    }
    function getButtonColorTitle(buttonNum){
      if(buttonNum==newsTopic[newsTitle])
        return 0xc0dfd7;
      else
        return 0x8c9492;
    }
  },onDestory() {
      //setScreenKeep-Zepp
      hmApp.setScreenKeep(false)
      //stop loadingAnimation
      timer.stopTimer(loadingAnimation)


      // 取消注册手势监听
hmApp.unregisterGestureEvent()
//取消注册按键监听
hmApp.unregisterKeyEvent();
//取消注册按键监听
hmApp.unregisterSpinEvent()
  },
  fetchData(newsTitle,newsTopic) {
    messageBuilder.request({
      method: "GET_DATA_"+newsTitle+"_"+newsTopic,
    })
    .then(data => {
      logger.log('receive data')
      const { result = {} } = data
      const  text = result

      //成功获取标题内容
      getTitleOK=false;

      // 取消注册手势监听
      hmApp.unregisterGestureEvent()
      //取消注册按键监听
      hmApp.unregisterKeyEvent();
      //取消注册按键监听
      hmApp.unregisterSpinEvent()
  //...stop help page control (It's my sb code)
      hmUI.setScrollView(true,DEVICE_HEIGHT,7,true)

      //stop loadingAnimation
      timer.stopTimer(loadingAnimation)
      loadingAnimation=false
      //scrollToPage-Zepp
      hmUI.scrollToPage(1, true)
    

      var resultText=text.split("fwz233");
      for(var pageNum=0;pageNum<5;pageNum++){
        var resultTextHeight
        if(screenState==0){
        // const { width, height } = hmUI.getTextLayout(resultText[pageNum*2+2], {
        //   text_size: 36,
        //   text_width: mpx_w(80)
        // })
        // resultTextHeight=height
        titleText[pageNum].setProperty(hmUI.prop.MORE, {
          align_h:hmUI.align.LEFT,
          text:resultText[pageNum*2+2]
        })
        }else{
        // const { width, height } = hmUI.getTextLayout(resultText[pageNum*2+2], {
        //   text_size: 36,
        //   text_width: mpx_w(70)
        // })
        // resultTextHeight=height
        // if(resultTextHeight>52*5)
        // titleText[pageNum].setProperty(hmUI.prop.MORE, {
        //   align_v: hmUI.align.TOP,
        //   align_h:hmUI.align.LEFT,
        //   text:resultText[pageNum*2+2]
        // })
        // else
        titleText[pageNum].setProperty(hmUI.prop.MORE, {
          align_h:hmUI.align.LEFT,
          text:resultText[pageNum*2+2]
        })
        }
      }

      //draw Screen UI
    for(var pageNum=1;pageNum<=5;pageNum++)
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: 0,
      y: DEVICE_HEIGHT*pageNum,
      w: mpx_w(100),
      h: mpx_h(15),
      text_size: 36,
      normal_src:"setting_mini.png",
      press_src:"setting_mini_press.png",
      click_func: (button_widget) => {
      //scrollToPage-Zepp
      hmUI.scrollToPage(0, true)
      },
    })
    for(var pageNum=1;pageNum<=5;pageNum++){
      hmUI.createWidget(hmUI.widget.CIRCLE, {
        center_x: mpx_w(96)-mpx_auto(2,DEVICE_WIDTH),
        center_y: mpx_h(100)*pageNum+mpx_h(50-1-3-1-3),
        radius: 3,
        color: 0x808080,
        alpha: 255
      })
      hmUI.createWidget(hmUI.widget.CIRCLE, {
        center_x: mpx_w(96)-mpx_auto(1,DEVICE_WIDTH),
        center_y: mpx_h(100)*pageNum+mpx_h(50-1-3),
        radius: 3,
        color: 0x808080,
        alpha: 255
      })
      hmUI.createWidget(hmUI.widget.CIRCLE, {
        center_x: mpx_w(96)-mpx_auto(0.8,DEVICE_WIDTH),
        center_y: mpx_h(100)*pageNum+mpx_h(50),
        radius: 3,
        color: 0x808080,
        alpha: 255
      })
      hmUI.createWidget(hmUI.widget.CIRCLE, {
        center_x: mpx_w(96)-mpx_auto(1,DEVICE_WIDTH),
        center_y: mpx_h(100)*pageNum+mpx_h(50+1+3),
        radius: 3,
        color: 0x808080,
        alpha: 255
      })
      hmUI.createWidget(hmUI.widget.CIRCLE, {
        center_x: mpx_w(96)-mpx_auto(2,DEVICE_WIDTH),
        center_y: mpx_h(100)*pageNum+mpx_h(50+1+3+1+3),
        radius: 3,
        color: 0x808080,
        alpha: 255
      })
    }
    for(var pageNum=1;pageNum<=5;pageNum++)
      hmUI.createWidget(hmUI.widget.CIRCLE, {
        center_x: mpx_w(96)-mpx_auto(Math.abs(3-pageNum)+sbbbbb(pageNum),DEVICE_WIDTH),
        center_y: mpx_h(100)*pageNum+mpx_h(38+(1+3)*pageNum),
        radius: 3,
        color: 0xffffff,
        alpha: 255
      })
      function sbbbbb(sbbb){
        if(sbbb==3)
        return 0.8
        else
        return 0
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
    })
  },
});
