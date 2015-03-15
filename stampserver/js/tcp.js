var soc;
var host;
var port;
var path;
 
function sendGetRequest(){
 
  host = document.getElementById("host").value;
  alert(host);
  port = document.getElementById("port").value;
  alert(port);
  path = document.getElementById("path").value;
  alert(path);
 
  try{    
    // host と port を指定して TCP クライアントソケットを作成する．
    // メモ:
    // soc = navigator.mozTCPSocket;
    // soc.open('www.google.co.jp', 80);
    // のように 2 段階に分けると，うまくいかない？
    soc = navigator.mozTCPSocket.open(host, port);
 
    soc.onopen = function(){
      try{
        // サーバにテキストを送信する．
        var ret = soc.send("GET " + path + " HTTP/1.1\r\nHost: " + host + "\r\nConnection: close\r\n\r\n");
        //alert(ret); // 成功すると true が返される．
 
      }catch(err){
        alert('Sending failed: ' + err.name);
      }
    }
                  
  }catch(err){  
    alert('Could not create a TCP socket: ' + err.message);
  } 
 
  // レスポンスを待ち受ける．
  soc.ondata = function(msg){
    //alert(typeof data); // Object が返ってくる．
 
    // レスポンスの内容を表示する．
    // msg.data で HTTP/1.1 200 Ok レスポンスの String が表示された．(ヘッダとボディ)
    alert(msg.data);
 
    soc.close();
 /*
    // MDN のサンプルでは下記のような条件分岐をさせていた．
    if (typeof data === 'string') {
      alert('Get a string: ' + msg.data);
    } else {
      alert('Get a Uint8Array');
    }
*/
  }
 
}
 
function load() {
  var el = document.getElementById("send");
  el.addEventListener("click", sendGetRequest, false);
}
 
document.addEventListener("DOMContentLoaded", load, false);
 