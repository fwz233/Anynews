import { MessageBuilder } from '../shared/message'
import { DEFAULT_TODOLIST } from '../utils/config/constants'
const messageBuilder = new MessageBuilder()
function getTodoList() {
  return settings.settingsStorage.getItem('todoList') ?
    JSON.parse(settings.settingsStorage.getItem('todoList')) : [...DEFAULT_TODOLIST]
}
var newsLink=[,,,,]
// Simulating an asynchronous network request using Promise
const mockAPI = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        body: {
          data: {
            text: 'HELLO ZEPPOS'
          }
        }
      })
    }, 1000)
  })
}


const fetchData = async (ctx) => {
  try {
    // Requesting network data using the fetch API
    // The sample program is for simulation only and does not request real network data, so it is commented here
    // Example of a GET method request
    // const { body: { data = {} } = {} } = await fetch({
    //   url: 'https://v2.jinrishici.com/one.json',
    //   method: 'GET'
    // })
    // Example of a POST method request
    // const { body: { data = {} } = {} } = await fetch({
    //   url: 'https://xxx.com/api/xxx',
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     text: 'Hello Zepp OS'
    //   })
    // })

    // A network request is simulated here
   // const { body: { data = {} } = {} } = await mockAPI()

  await fetch('https://www.xda-developers.com/')
  .then(response => response.text())
  .then(data => {
// data就是我们请求的repos
// console.log(data)JSON.stringify()

// var parser = new DOMParser();
// var doc = parser.parseFromString(data, 'text/html');

// let div = document.createElement("div"); 
// div.innerHTML = data; 

var splitRes=data.split("<h3 class=\"bc-title\">");//·-datetime
var resultContext=""
for(var sb=1;sb<=5;sb++){
var splitContext=splitRes[sb].split(/href=\"|\" class=\"|\>|<\/a>/)
  newsLink[sb-1]=splitContext[1]
  splitContext=splitContext[1]+"fwz233"+splitContext[3]
  resultContext=resultContext+"fwz233"+splitContext
}
resultContext=resultContext.replaceAll("&amp;","&");
resultContext=resultContext.replaceAll("&#039;","'");
ctx.response({
  data: { result: resultContext},
})
});
    // ctx.response({
    //   data: { result: data },
    // })
  } catch (error) {
    ctx.response({
      data: { result: 'ERROR' },
    })
  }
}
const fetchData_1 = async (ctx) => {
  try {
  await fetch('https://www.xda-developers.com/')
  .then(response => response.text())
  .then(data => {

var splitTopic=data.split("Featured Mobile")

var splitRes=splitTopic[1].split("<h3 class=\"bc-title\">");//·-datetime
var resultContext=""
for(var sb=1;sb<=5;sb++){
var splitContext=splitRes[sb].split(/href=\"|\" class=\"|>|<\/a>/)
  newsLink[sb-1]=splitContext[1]
  splitContext=splitContext[1]+"fwz233"+splitContext[3]
  resultContext=resultContext+"fwz233"+splitContext
}
resultContext=resultContext.replaceAll("&amp;","&");
resultContext=resultContext.replaceAll("&#039;","'");
ctx.response({
  data: { result: resultContext},
})
});
  } catch (error) {
    ctx.response({
      data: { result: 'ERROR' },
    })
  }
}
const fetchData_2 = async (ctx) => {
  try {
  await fetch('https://www.xda-developers.com/')
  .then(response => response.text())
  .then(data => {

var splitTopic=data.split("Featured Computing")

var splitRes=splitTopic[1].split("<h3 class=\"bc-title\">");//·-datetime
var resultContext=""
for(var sb=1;sb<=5;sb++){
var splitContext=splitRes[sb].split(/href=\"|\" class=\"|>|<\/a>/)
  newsLink[sb-1]=splitContext[1]
  splitContext=splitContext[1]+"fwz233"+splitContext[3]
  resultContext=resultContext+"fwz233"+splitContext
}
resultContext=resultContext.replaceAll("&amp;","&");
resultContext=resultContext.replaceAll("&#039;","'");
ctx.response({
  data: { result: resultContext},
})
});
  } catch (error) {
    ctx.response({
      data: { result: 'ERROR' },
    })
  }
}
const fetchData_3 = async (ctx) => {
  try {
  await fetch('https://www.xda-developers.com/')
  .then(response => response.text())
  .then(data => {

var splitTopic=data.split("title\">Latest<\/h2>")

var splitRes=splitTopic[1].split("<h3 class=\"bc-title\">");//·-datetime
var resultContext=""
for(var sb=1;sb<=5;sb++){
var splitContext=splitRes[sb].split(/href=\"|\" class=\"|>|<\/a>/)
  newsLink[sb-1]=splitContext[1]
  splitContext=splitContext[1]+"fwz233"+splitContext[3]
  resultContext=resultContext+"fwz233"+splitContext
}
resultContext=resultContext.replaceAll("&amp;","&");
resultContext=resultContext.replaceAll("&#039;","'");
ctx.response({
  data: { result: resultContext},
})
});
  } catch (error) {
    ctx.response({
      data: { result: 'ERROR' },
    })
  }
}
const fetchData_1_0 = async (ctx) => {
  try {
  await fetch('https://edition.cnn.com/world')
  .then(response => response.text())
  .then(data => {

var splitRes=data.split(" data-editable=\"headline\">");//·-datetime
var resultContext=""
for(var sb=1;sb<=5;sb++){
var splitContext=splitRes[sb].split(/href=\"|\" class=\"/)
  newsLink[sb-1]=splitContext[1]
  resultContext=resultContext+"fwz233"+splitContext[1]
splitContext=splitRes[sb].split("<\/div>")
resultContext=resultContext+"fwz233"+splitContext[0]
}

ctx.response({
  data: { result: resultContext},
})
});
  } catch (error) {
    ctx.response({
      data: { result: 'ERROR' },
    })
  }
}
const fetchData_1_1 = async (ctx) => {
  try {
  await fetch('https://edition.cnn.com/politics')
  .then(response => response.text())
  .then(data => {

var splitRes=data.split(" data-editable=\"headline\">");//·-datetime
var resultContext=""
for(var sb=1;sb<=5;sb++){
var splitContext=splitRes[sb].split(/href=\"|\" class=\"/)
  newsLink[sb-1]=splitContext[1]
  resultContext=resultContext+"fwz233"+splitContext[1]
splitContext=splitRes[sb].split("<\/div>")
resultContext=resultContext+"fwz233"+splitContext[0]
}

ctx.response({
  data: { result: resultContext},
})
});
  } catch (error) {
    ctx.response({
      data: { result: 'ERROR' },
    })
  }
}
const fetchData_1_2 = async (ctx) => {
  try {
  await fetch('https://edition.cnn.com/business')
  .then(response => response.text())
  .then(data => {

var splitRes=data.split(" data-editable=\"headline\">");//·-datetime
var resultContext=""
for(var sb=1;sb<=5;sb++){
var splitContext=splitRes[sb].split(/href=\"|\" class=\"/)
  newsLink[sb-1]=splitContext[1]
  resultContext=resultContext+"fwz233"+splitContext[1]
splitContext=splitRes[sb].split("<\/div>")
resultContext=resultContext+"fwz233"+splitContext[0]
}

ctx.response({
  data: { result: resultContext},
})
});
  } catch (error) {
    ctx.response({
      data: { result: 'ERROR' },
    })
  }
}
const fetchData_1_3 = async (ctx) => {
  try {
  await fetch('https://edition.cnn.com/health')
  .then(response => response.text())
  .then(data => {

var splitRes=data.split(" data-editable=\"headline\">");//·-datetime
var resultContext=""
for(var sb=1;sb<=5;sb++){
var splitContext=splitRes[sb].split(/href=\"|\" class=\"/)
  newsLink[sb-1]=splitContext[1]
  resultContext=resultContext+"fwz233"+splitContext[1]
splitContext=splitRes[sb].split("<\/div>")
resultContext=resultContext+"fwz233"+splitContext[0]
}

ctx.response({
  data: { result: resultContext},
})
});
  } catch (error) {
    ctx.response({
      data: { result: 'ERROR' },
    })
  }
}
const fetchData_2_0 = async (ctx) => {
  try {
  await fetch('https://www.nytimes.com/international/section/world')
  .then(response => response.text())
  .then(data => {

var splitRes=data.split("<a data-rref=\"\" href=\"");//·-datetime
var resultContext=""
for(var sb=2;sb<=8;sb=sb+2){
var splitContext=splitRes[sb].split(/\">|<\/a><\/h2>/)
  newsLink[(sb/2)-1]=splitContext[0]
  if(splitContext[1].indexOf("<div")!=-1)
    splitContext[1]="error?! Send feedback email to me"
  resultContext=resultContext+"fwz233"+splitContext[0]+"fwz233"+splitContext[1]
}

var splitRes=splitRes[9].split("\"><a href=\"");
var splitContext=splitRes[1].split(/\">|<\/a><\/h2>/)
  newsLink[5]=splitContext[0]
  if(splitContext[1].indexOf("<div")!=-1)
    splitContext[1]="error?! Send feedback email to me"
  resultContext=resultContext+"fwz233"+splitContext[0]+"fwz233"+splitContext[1]

ctx.response({
  data: { result: resultContext},
})
});
  } catch (error) {
    ctx.response({
      data: { result: 'ERROR' },
    })
  }
}
const fetchData_2_1 = async (ctx) => {
  try {
  await fetch('https://www.nytimes.com/international/section/science')
  .then(response => response.text())
  .then(data => {

var splitRes=data.split("<a data-rref=\"\" href=\"");//·-datetime
var resultContext=""
for(var sb=2;sb<=8;sb=sb+2){
var splitContext=splitRes[sb].split(/\">|<\/a><\/h2>/)
  newsLink[(sb/2)-1]=splitContext[0]
  if(splitContext[1].indexOf("<div")!=-1)
    splitContext[1]="error?! Send feedback email to me"
  resultContext=resultContext+"fwz233"+splitContext[0]+"fwz233"+splitContext[1]
}

var splitRes=splitRes[9].split("\"><a href=\"");
var splitContext=splitRes[1].split(/\">|<\/a><\/h2>/)
  newsLink[5]=splitContext[0]
  if(splitContext[1].indexOf("<div")!=-1)
    splitContext[1]="error?! Send feedback email to me"
  resultContext=resultContext+"fwz233"+splitContext[0]+"fwz233"+splitContext[1]

ctx.response({
  data: { result: resultContext},
})
});
  } catch (error) {
    ctx.response({
      data: { result: 'ERROR' },
    })
  }
}
const fetchData_2_2 = async (ctx) => {
  try {
  await fetch('https://www.nytimes.com/international/section/opinion')
  .then(response => response.text())
  .then(data => {

var splitRes=data.split("<a data-rref=\"\" href=\"");//·-datetime
var resultContext=""
for(var sb=2;sb<=8;sb=sb+2){
var splitContext=splitRes[sb].split(/\">|<\/a><\/h2>/)
  newsLink[(sb/2)-1]=splitContext[0]
  if(splitContext[1].indexOf("<div")!=-1)
    splitContext[1]="error?! Send feedback email to me"
  resultContext=resultContext+"fwz233"+splitContext[0]+"fwz233"+splitContext[1]
}

var splitRes=splitRes[9].split("\"><a href=\"");
var splitContext=splitRes[1].split(/\">|<\/a><\/h2>/)
  newsLink[5]=splitContext[0]
  if(splitContext[1].indexOf("<div")!=-1)
    splitContext[1]="error?! Send feedback email to me"
  resultContext=resultContext+"fwz233"+splitContext[0]+"fwz233"+splitContext[1]

ctx.response({
  data: { result: resultContext},
})
});
  } catch (error) {
    ctx.response({
      data: { result: 'ERROR' },
    })
  }
}
const fetchData_2_3 = async (ctx) => {
  try {
  await fetch('https://www.nytimes.com/international/section/sports')
  .then(response => response.text())
  .then(data => {

var splitRes=data.split("<a data-rref=\"\" href=\"");//·-datetime
var resultContext=""
for(var sb=2;sb<=8;sb=sb+2){
var splitContext=splitRes[sb].split(/\">|<\/a><\/h2>/)
  newsLink[(sb/2)-1]=splitContext[0]
  if(splitContext[1].indexOf("<div")!=-1)
    splitContext[1]="error?! Send feedback email to me"
  resultContext=resultContext+"fwz233"+splitContext[0]+"fwz233"+splitContext[1]
}

var splitRes=splitRes[9].split("\"><a href=\"");
var splitContext=splitRes[1].split(/\">|<\/a><\/h2>/)
  newsLink[5]=splitContext[0]
  if(splitContext[1].indexOf("<div")!=-1)
    splitContext[1]="error?! Send feedback email to me"
  resultContext=resultContext+"fwz233"+splitContext[0]+"fwz233"+splitContext[1]

ctx.response({
  data: { result: resultContext},
})
});
  } catch (error) {
    ctx.response({
      data: { result: 'ERROR' },
    })
  }
}
const fetchData_3_0 = async (ctx) => {
  try {
  await fetch('https://www.theguardian.com/international')
  .then(response => response.text())
  .then(data => {

var splitRes=data.split("<h3 class=\"fc-item__title\"><a href=\"");//·-datetime
var resultContext=""
for(var sb=1;sb<=5;sb=sb+1){
var splitContext=splitRes[sb].split(/\" class=\"fc-item__link\"|<span class="fc-item__kicker">|<\/span>|<span class=\"js-headline-text\">/)
  newsLink[sb-1]=splitContext[0]
  resultContext=resultContext+"fwz233"+splitContext[0]+"fwz233"+splitContext[2]+"/"+splitContext[4]
}
ctx.response({
  data: { result: resultContext},
})
});
  } catch (error) {
    ctx.response({
      data: { result: 'ERROR' },
    })
  }
}
const fetchData_3_1 = async (ctx) => {
  try {
  await fetch('https://www.theguardian.com/world')
  .then(response => response.text())
  .then(data => {

var splitRes=data.split("<h3 class=\"fc-item__title\"><a href=\"");//·-datetime
var resultContext=""
for(var sb=1;sb<=5;sb=sb+1){
  var splitContext=splitRes[sb].split(/\" class=\"fc-item__link\"|<span class=\"js-headline-text\">|<\/span>/)
  newsLink[sb-1]=splitContext[0]
  resultContext=resultContext+"fwz233"+splitContext[0]+"fwz233"+splitContext[2]
}
ctx.response({
  data: { result: resultContext},
})
});
  } catch (error) {
    ctx.response({
      data: { result: 'ERROR' },
    })
  }
}
const fetchData_3_2 = async (ctx) => {
  try {
  await fetch('https://www.theguardian.com/uk-news')
  .then(response => response.text())
  .then(data => {

var splitRes=data.split("<h3 class=\"fc-item__title\"><a href=\"");//·-datetime
var resultContext=""
for(var sb=1;sb<=5;sb=sb+1){
  var splitContext=splitRes[sb].split(/\" class=\"fc-item__link\"|<span class=\"js-headline-text\">|<\/span>/)
  newsLink[sb-1]=splitContext[0]
  resultContext=resultContext+"fwz233"+splitContext[0]+"fwz233"+splitContext[2]
}
ctx.response({
  data: { result: resultContext},
})
});
  } catch (error) {
    ctx.response({
      data: { result: 'ERROR' },
    })
  }
}
const fetchData_3_3 = async (ctx) => {
  try {
  await fetch('https://www.theguardian.com/us-news')
  .then(response => response.text())
  .then(data => {

var splitRes=data.split("<h3 class=\"fc-item__title\"><a href=\"");//·-datetime
var resultContext=""
for(var sb=1;sb<=5;sb=sb+1){
  var splitContext=splitRes[sb].split(/\" class=\"fc-item__link\"|<span class=\"js-headline-text\">|<\/span>/)
  newsLink[sb-1]=splitContext[0]
  resultContext=resultContext+"fwz233"+splitContext[0]+"fwz233"+splitContext[2]
}
ctx.response({
  data: { result: resultContext},
})
});
  } catch (error) {
    ctx.response({
      data: { result: 'ERROR' },
    })
  }
}








const fetchData_text = async (ctx,viewNumber) => {
  try {
  await fetch('https://www.xda-developers.com'+newsLink[viewNumber])
  .then(response => response.text())
  .then(data => {

var splitTitle=data.split(/<title>|<\/title>/);
var resultContext=splitTitle[1]

var splitDescription=data.split("<meta property=\"og:description\" content=\"");
splitDescription=splitDescription[1].split("\"\/>");
var resultContext=resultContext+"\n\n"+splitDescription[0]

var splitContext=data.split("<p>")
for(var sb=1;sb<splitContext.length;sb++){
  var splitContextResult=splitContext[sb].split("<\/p>")
  resultContext=resultContext+"\n\n"+splitContextResult[0]
}
resultContext=resultContext.replaceAll("&amp;","&");
resultContext=resultContext.replaceAll("&#38;","&");
resultContext=resultContext.replaceAll("&#039;","'");
resultContext=resultContext.replaceAll("&#39;","'");
resultContext=resultContext.replaceAll("&quot;","\"");
resultContext=resultContext.replaceAll("&#34;","\"");
resultContext=resultContext.replaceAll("<strong>","");
resultContext=resultContext.replaceAll("<\/strong>","");
resultContext=resultContext.replaceAll("<em>","");
resultContext=resultContext.replaceAll("<\/em>","");
resultContext=resultContext.replaceAll("<\/a>","");
// "	&#34;	&quot;
// &	&#38;	&amp;
// <	&#60;	&lt;
// >	&#62;	&gt;
// 不断开空格(non-breaking space)	&#160;	&nbsp;
 var resultContextSplit=resultContext.split(/<a href=\"|\">/)
 resultContext=""
for(var sb=0;sb<resultContextSplit.length;sb=sb+2){
  resultContext=resultContext+resultContextSplit[sb]
}

ctx.response({
  data: { result: resultContext},
})
});
  } catch (error) {
    ctx.response({
      data: { result: 'ERROR' },
    })
  }
}
const fetchData_text_1 = async (ctx,viewNumber) => {
  try {
  await fetch('https://edition.cnn.com'+newsLink[viewNumber])
  .then(response => response.text())
  .then(data => {

var splitTitle=data.split(/\"articleBody\":\"|\",\"author\"/);
var resultContext=splitTitle[1]
resultContext=resultContext.replaceAll("   ","\n\n");

ctx.response({
  data: { result: resultContext},
})
});
  } catch (error) {
    ctx.response({
      data: { result: 'ERROR' },
    })
  }
}
const fetchData_text_2 = async (ctx,viewNumber) => {
  try {
  await fetch('https://www.nytimes.com/'+newsLink[viewNumber])
  .then(response => response.text())
  .then(data => {

var splitDescription=data.split("name=\"description\" content=\"");
splitDescription=splitDescription[1].split("\"\/>");
var resultContext=splitDescription[0]

var splitContext=data.split("<p class=\"css-at9mc1 evys1bk0\">")
for(var sb=1;sb<splitContext.length;sb++){
  var splitContextResult=splitContext[sb].split("<\/p>")
  resultContext=resultContext+"\n\n"+splitContextResult[0]
}
resultContext=resultContext.replaceAll("<\/a>","");
var resultContextSplit=resultContext.split(/<a class=\"css-yywogo\" href=\"|\">/)
resultContext=""
for(var sb=0;sb<resultContextSplit.length;sb=sb+2){
 resultContext=resultContext+resultContextSplit[sb]
}
ctx.response({
  data: { result: resultContext},
})
});
  } catch (error) {
    ctx.response({
      data: { result: 'ERROR' },
    })
  }
}
const fetchData_text_3 = async (ctx,viewNumber) => {
  try {
  await fetch(newsLink[viewNumber])
  .then(response => response.text())
  .then(data => {

var splitDescription=data.split("<meta name=\"description\" content=\"");
splitDescription=splitDescription[1].split("\" \/>");
var resultContext=splitDescription[0]

var splitContext=data.split("<p class=\"dcr-h26idz\">")
for(var sb=1;sb<splitContext.length;sb++){
  var splitContextResult=splitContext[sb].split("<\/p>")
  resultContext=resultContext+"\n\n"+splitContextResult[0]
}
resultContext=resultContext.replaceAll("<\/a>","");
var resultContextSplit=resultContext.split(/<a href=\"|\">/)
resultContext=""
for(var sb=0;sb<resultContextSplit.length;sb=sb+2){
 resultContext=resultContext+resultContextSplit[sb]
}
ctx.response({
  data: { result: resultContext},
})
});
  } catch (error) {
    ctx.response({
      data: { result: 'ERROR' },
    })
  }
}


AppSideService({
  onInit() {
    messageBuilder.listen(() => {})

    messageBuilder.on('request', (ctx) => {
      const jsonRpc = messageBuilder.buf2Json(ctx.request.payload)
      if (jsonRpc.method === 'GET_DATA_0_0') {
        return fetchData(ctx)
      }else if (jsonRpc.method === 'GET_DATA_0_1') {
        return fetchData_1(ctx)
      }else if (jsonRpc.method === 'GET_DATA_0_2') {
        return fetchData_2(ctx)
      }else if (jsonRpc.method === 'GET_DATA_0_3') {
        return fetchData_3(ctx)
      }else if (jsonRpc.method === 'GET_DATA_1_0') {
        return fetchData_1_0(ctx)
      }else if (jsonRpc.method === 'GET_DATA_1_1') {
        return fetchData_1_1(ctx)
      }else if (jsonRpc.method === 'GET_DATA_1_2') {
        return fetchData_1_2(ctx)
      }else if (jsonRpc.method === 'GET_DATA_1_3') {
        return fetchData_1_3(ctx)
      }else if (jsonRpc.method === 'GET_DATA_2_0') {
        return fetchData_2_0(ctx)
      }else if (jsonRpc.method === 'GET_DATA_2_1') {
        return fetchData_2_1(ctx)
      }else if (jsonRpc.method === 'GET_DATA_2_2') {
        return fetchData_2_2(ctx)
      }else if (jsonRpc.method === 'GET_DATA_2_3') {
        return fetchData_2_3(ctx)
      }else if (jsonRpc.method === 'GET_DATA_3_0') {
        return fetchData_3_0(ctx)
      }else if (jsonRpc.method === 'GET_DATA_3_1') {
        return fetchData_3_1(ctx)
      }else if (jsonRpc.method === 'GET_DATA_3_2') {
        return fetchData_3_2(ctx)
      }else if (jsonRpc.method === 'GET_DATA_3_3') {
        return fetchData_3_3(ctx)
      }else if (jsonRpc.method === 'GET_NEWS_DATA_0_0') {
        return fetchData_text(ctx,0)
      }else if (jsonRpc.method === 'GET_NEWS_DATA_0_1') {
        return fetchData_text(ctx,1)
      }else if (jsonRpc.method === 'GET_NEWS_DATA_0_2') {
        return fetchData_text(ctx,2)
      }else if (jsonRpc.method === 'GET_NEWS_DATA_0_3') {
        return fetchData_text(ctx,3)
      }else if (jsonRpc.method === 'GET_NEWS_DATA_0_4') {
        return fetchData_text(ctx,4)
      }else if (jsonRpc.method === 'GET_NEWS_DATA_1_0') {
        return fetchData_text_1(ctx,0)
      }else if (jsonRpc.method === 'GET_NEWS_DATA_1_1') {
        return fetchData_text_1(ctx,1)
      }else if (jsonRpc.method === 'GET_NEWS_DATA_1_2') {
        return fetchData_text_1(ctx,2)
      }else if (jsonRpc.method === 'GET_NEWS_DATA_1_3') {
        return fetchData_text_1(ctx,3)
      }else if (jsonRpc.method === 'GET_NEWS_DATA_1_4') {
        return fetchData_text_1(ctx,4)
      }else if (jsonRpc.method === 'GET_NEWS_DATA_2_0') {
        return fetchData_text_2(ctx,0)
      }else if (jsonRpc.method === 'GET_NEWS_DATA_2_1') {
        return fetchData_text_2(ctx,1)
      }else if (jsonRpc.method === 'GET_NEWS_DATA_2_2') {
        return fetchData_text_2(ctx,2)
      }else if (jsonRpc.method === 'GET_NEWS_DATA_2_3') {
        return fetchData_text_2(ctx,3)
      }else if (jsonRpc.method === 'GET_NEWS_DATA_2_4') {
        return fetchData_text_2(ctx,4)
      }else if (jsonRpc.method === 'GET_NEWS_DATA_3_1') {
        return fetchData_text_2(ctx,1)
      }else if (jsonRpc.method === 'GET_NEWS_DATA_3_2') {
        return fetchData_text_2(ctx,2)
      }else if (jsonRpc.method === 'GET_NEWS_DATA_3_3') {
        return fetchData_text_2(ctx,3)
      }else if (jsonRpc.method === 'GET_NEWS_DATA_3_4') {
        return fetchData_text_2(ctx,4)
      }
    })
  },

  onRun() {
  },

  onDestroy() {
  }
})
