var p1;
var p2;
var p3;

function setp1 (val) {
  p1=val;
  $('.p1').css('display','none');
  $('.p2').css('display','inline-block');
  console.log(p1)
}
function setp2 (val) {
  p2=val;
  $('.p2').css('display','none');
  $('.p3').css('display','inline-block');
  console.log(p2)
}
function setp3 (val) {
  p3=val;
  console.log(p3)
  login()
}

var login = function(){
  var data = {"p1": p1, "p2": p2, "p3":p3};
  console.log(data);
  $.post( '/login', data, function(recv) {
        console.log("hidden shit");
        if (recv["error"]==0)
        {
          window.location.replace("/stuff.html");
        }
      },
       'json' // I expect a JSON response
    );
}

