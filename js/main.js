$(function(){
  // 初期処理
  $.get(csvfile, readCsv, 'text')
  .done(function( data ) {
    dispQuestion();
  });
  // 解答ボタン押下
  $('#a-btn').click(function(e) {
    dispAnswer();
  });
  // 次へボタン押下
  $('#next-btn').click(function(e) {
    $('html, body').animate({
        scrollTop: 0
      }, 800)
      .promise()
      .done(function() {
        dispQuestion();
    });
  });
});

var csvfile = 'data/question.csv';
var csvData = [];
var selectedIndexs = [];
var qData = [];
var challengeCnt = 0;
var correctCnt = 0;

// CSVファイル読み込み
function readCsv(data) {
  csvData = $.csv.toArrays(data);
  csvData.shift();
}
// 正答率表示
function dispCorrectRate() {
  var correctCntText = correctCnt;
  var incorrectCntText = challengeCnt - correctCnt;
  var correctRateText = Math.round((correctCnt/challengeCnt*100), 1) + "%";
  $('#correctCnt-text').text(correctCntText);
  $('#incorrectCnt-text').text(incorrectCntText);
  $('#correctRate-text').text(correctRateText);
}
// 問題文表示
function dispQuestion() {
  var randIndex = 0;
  var selectFlg = true;
  while (selectFlg) {
    randIndex = Math.floor(Math.random() * csvData.length);
    if($.inArray(randIndex, selectedIndexs) < 0){
      selectedIndexs.push(randIndex);
      selectFlg = false;
      if(selectedIndexs.length === csvData.length)selectedIndexs = [];
    }
  }
  qData = csvData[randIndex];
  var yText = "平成" + qData[1] + "年 No." + qData[2];
  var qText = qData[3].replace(/\r|\n|\r\n/g, '<br>');
  $('#y-text').text(yText);
  $('#q-text').html(qText);
  $('#list-01-text').text(qData[4]);
  $('#list-02-text').text(qData[5]);
  $('#list-03-text').text(qData[6]);
  $('#list-04-text').text(qData[7]);
  $('#list-05-text').text(qData[8]);
  $('#list-tab a:first-child').tab('show')
  $('#a-area').hide();
  $('#a-btn').show();
  challengeCnt++;
}
// 解答、解説表示
function dispAnswer() {
  var answer = 0;
  var result = false;
  $('a[data-toggle="list"]').each(function(i) {
    if($.inArray("active", this.classList) > 0)answer = Number(this.text);
  });
  if(answer == qData[9]) result =true;
  if(result){
    $('#a-result').addClass('alert-success');
    $('#a-result').removeClass('alert-danger');
    $('#a-text').text('おうよ！');
    correctCnt++;
  }else{
    $('#a-result').addClass('alert-danger');
    $('#a-result').removeClass('alert-success');
    $('#a-text').text('てやんでい！');
  }
  var explanationText = qData[10].replace(/\r|\n|\r\n/g, '<br>');
  $('#a-explanation').html(explanationText);
  $('#a-area').show();
  $('#a-btn').hide();
  dispCorrectRate();
}
