/* WARNING: This file was automatically generated by templito.
 * Do not manually edit this file if you plan to continue using templito.
 */

define(function () {
	var App = {};

App.PreTemplates || (App.PreTemplates = {});

App.PreTemplates.footballTemplate = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='\r\n<div class="container-fluid">\r\n<div class="row-fluid break-line"></div>\r\n'+
((__t=( this.renderHat() ))==null?'':__t)+
'\r\n<div class="row-fluid foootbal-main-bets">\r\n<div class="span2 event-information">\r\n</div>\r\n<div class="span2 offset2">\r\n\t<div class="row-fluid">\r\n\t\t';
 if (bettypes[1]) { 
__p+='\r\n\t\t<div class="container-fluid bettype-wrapper '+
((__t=( bettypes[1].status ))==null?'':__t)+
'" bettype="1">\r\n\t\t\t<div class="row-fluid bettype-caption">'+
((__t=( bettypes[1].name ))==null?'':__t)+
'</div>\r\n\t\t\t<div class="container-fluid markets">\r\n\t\t\t\t'+
((__t=( this.renderMarket(bettypes[1].markets, 3) ))==null?'':__t)+
'\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t';
 } 
__p+='\r\n\t</div>\r\n\t<div class="row-fluid">\r\n\t\t';
 if (bettypes[3]) { 
__p+='\r\n\t\t<div class="container-fluid bettype-wrapper '+
((__t=( bettypes[3].status ))==null?'':__t)+
'" bettype="3">\r\n\t\t\t<div class="row-fluid bettype-caption">'+
((__t=( bettypes[3].name ))==null?'':__t)+
'</div>\r\n\t\t\t<div class="container-fluid markets">\r\n\t\t\t\t'+
((__t=( this.renderMarket(bettypes[3].markets, 3) ))==null?'':__t)+
'\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t';
 } 
__p+='\r\n\t</div>\r\n</div>\r\n<div class="span2">\r\n\t';
 if (bettypes[10]) { 
__p+='\r\n\t<div class="container-fluid bettype-wrapper '+
((__t=( bettypes[10].status ))==null?'':__t)+
'" bettype="10">\r\n\t\t<div class="row-fluid bettype-caption">'+
((__t=( bettypes[10].name ))==null?'':__t)+
'</div>\r\n\t\t<div class="container-fluid markets">\r\n\t\t\t'+
((__t=( this.renderMarket(bettypes[10].markets, 2, 'foraTemplate') ))==null?'':__t)+
'\r\n\t\t</div>\r\n\t</div>\r\n\t';
 } 
__p+='\r\n</div>\r\n<div class="span2">\r\n\t';
 if (bettypes[12]) { 
__p+='\r\n\t<div class="container-fluid bettype-wrappe '+
((__t=( bettypes[12].status ))==null?'':__t)+
'r" bettype="12">\r\n\t\t<div class="row-fluid bettype-caption">'+
((__t=( bettypes[12].name ))==null?'':__t)+
'</div>\r\n\t\t<div class="container-fluid markets">\r\n\t\t\t'+
((__t=( this.renderMarket(bettypes[12].markets, 2, 'foraTemplate') ))==null?'':__t)+
'\r\n\t\t</div>\r\n\t</div>\r\n\t';
 } 
__p+='\r\n</div>\r\n<div class="span2">\r\n\t';
 if (bettypes[33]) { 
__p+='\r\n\t<div class="container-fluid bettype-wrapper '+
((__t=( bettypes[33].status ))==null?'':__t)+
'" bettype="33">\r\n\t\t<div class="row-fluid bettype-caption">'+
((__t=( bettypes[33].name ))==null?'':__t)+
'</div>\r\n\t\t<div class="container-fluid markets">\r\n\t\t\t'+
((__t=( this.renderMarket(bettypes[33].markets, 2) ))==null?'':__t)+
'\r\n\t\t</div>\r\n\t</div>\r\n\t';
 } 
__p+='\r\n</div>\r\n<div class="span1">\r\n\t';
 if (bettypes[102]) { 
__p+='\r\n\t<div class="container-fluid bettype-wrapper '+
((__t=( bettypes[102].status ))==null?'':__t)+
'" bettype="102">\r\n\t\t<div class="row-fluid bettype-caption">'+
((__t=( bettypes[102].name ))==null?'':__t)+
'</div>\r\n\t\t<div class="container-fluid markets">\r\n\t\t\t'+
((__t=( this.renderMarket(bettypes[102].markets, 1) ))==null?'':__t)+
'\r\n\t\t</div>\r\n\t</div>\r\n\t';
 } 
__p+='\r\n</div>\r\n<div class="span1">\r\n\t';
 if (bettypes[103]) { 
__p+='\r\n\t<div class="container-fluid bettype-wrapper '+
((__t=( bettypes[103].status ))==null?'':__t)+
'" bettype="103">\r\n\t\t<div class="row-fluid bettype-caption">'+
((__t=( bettypes[103].name ))==null?'':__t)+
'</div>\r\n\t\t<div class="container-fluid markets">\r\n\t\t\t'+
((__t=( this.renderMarket(bettypes[103].markets, 1) ))==null?'':__t)+
'\r\n\t\t</div>\r\n\t</div>\r\n\t';
 } 
__p+='\r\n</div>\r\n\t'+
((__t=( this.renderTimeBets(event.status_code) ))==null?'':__t)+
'\r\n</div>\r\n</div>\r\n';
}
return __p;
};

App.PreTemplates.footballHatTemplate = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="row-fluid football-hat event-hat">\r\n\t<div class="span2 event-num"><img src="img/sport_1.png">'+
((__t=( event_num ))==null?'':__t)+
'</div>\r\n\t<div class="span2 event-status">'+
((__t=( event.starttime ))==null?'':__t)+
'</div>\r\n\t<div class="span5 competitors text-center"> '+
((__t=( event.competitors.home.name ))==null?'':__t)+
' - '+
((__t=( event.competitors.away.name ))==null?'':__t)+
' </div>\r\n\t<div class="span1 score text-center"> '+
((__t=( event_stat.score ))==null?'':__t)+
'</div>\r\n\t<div class="span2 status text-center">'+
((__t=( event.status ))==null?'':__t)+
'</div>\r\n\t</div>\r\n</div>\r\n';
}
return __p;
};

App.PreTemplates.firstTimeTemplate = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="row-fluid foootbal-firsttime-bets">\r\n\t<div class="span2 event-information">\r\n\t\t<div class="container-fluid match-part">\r\n\t\t\t1 Тайм\r\n\t\t\t';
 console.log(this) 
__p+='\r\n\t\t</div>\r\n\t</div>\r\n\t<div class="span2 offset2">\r\n\t\t<div class="row-fluid">\r\n\t\t\t';
 if (bettypes[4]) { 
__p+='\r\n\t\t\t<div class="container-fluid bettype-wrapper '+
((__t=( bettypes[4].status ))==null?'':__t)+
'" bettype="4">\r\n\t\t\t\t<div class="row-fluid bettype-caption">'+
((__t=( bettypes[4].name ))==null?'':__t)+
'</div>\r\n\t\t\t\t<div class="container-fluid markets">\r\n\t\t\t\t\t'+
((__t=( this.renderMarket(bettypes[4].markets, 3) ))==null?'':__t)+
'\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t';
 } 
__p+='\r\n\t\t</div>\r\n\t\t<div class="row-fluid double">\r\n\t\t</div>\r\n\t</div>\r\n\t<div class="span2 fora">\r\n\t</div>\r\n\t<div class="span2 totyl">\r\n\t</div>\r\n\t<div class="span2">\r\n\t\t';
 if (bettypes[143]) { 
__p+='\r\n\t\t<div class="container-fluid bettype-wrapper '+
((__t=( bettypes[143].status ))==null?'':__t)+
'" bettype="143">\r\n\t\t\t<div class="row-fluid bettype-caption">'+
((__t=( bettypes[143].name ))==null?'':__t)+
'</div>\r\n\t\t\t<div class="container-fluid markets">\r\n\t\t\t\t'+
((__t=( this.renderMarket(bettypes[143].markets, 2) ))==null?'':__t)+
'\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t';
 } 
__p+='\r\n\t</div>\r\n\t<div class="span1">\r\n\t\t';
 if (bettypes[144]) { 
__p+='\r\n\t\t<div class="container-fluid bettype-wrapper '+
((__t=( bettypes[144].status ))==null?'':__t)+
'" bettype="144">\r\n\t\t\t<div class="row-fluid bettype-caption">'+
((__t=( bettypes[144].name ))==null?'':__t)+
'</div>\r\n\t\t\t<div class="container-fluid markets">\r\n\t\t\t\t'+
((__t=( this.renderMarket(bettypes[144].markets, 1) ))==null?'':__t)+
'\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t';
 } 
__p+='\r\n\t</div>\r\n\t<div class="span1">\r\n\t\t';
 if (bettypes[145]) { 
__p+='\r\n\t\t<div class="container-fluid bettype-wrapper '+
((__t=( bettypes[145].status ))==null?'':__t)+
'" bettype="145">\r\n\t\t\t<div class="row-fluid bettype-caption">'+
((__t=( bettypes[145].name ))==null?'':__t)+
'</div>\r\n\t\t\t<div class="container-fluid markets">\r\n\t\t\t\t'+
((__t=( this.renderMarket(bettypes[145].markets, 1) ))==null?'':__t)+
'\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t';
 } 
__p+='\r\n\t</div>\r\n</div>\r\n';
}
return __p;
};

App.PreTemplates.foraOddTemplate = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="'+
((__t=( width ))==null?'':__t)+
' bet '+
((__t=( odd.status ))==null?'':__t)+
'">\r\n\t<div class="container-fluid">\r\n\t\t<div class="row-fluid  outcome">'+
((__t=( odd.outcome ))==null?'':__t)+
' '+
((__t=( odd.values.join('') ))==null?'':__t)+
'</div>\r\n\t\t<div class="row-fluid odd">\r\n\t\t\t<div class="span4 castcode">'+
((__t=( odd.code ))==null?'':__t)+
'</div>\r\n\t\t\t<div class="span8 coef">'+
((__t=( odd.coef ))==null?'':__t)+
'</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n';
}
return __p;
};

App.PreTemplates.beforeScoreTemplate = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="offset2 span2">'+
((__t=( event.time_to_start ))==null?'':__t)+
'</div>\r\n';
}
return __p;
};

App.PreTemplates.oddTemplate = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="'+
((__t=( width ))==null?'':__t)+
' bet '+
((__t=( odd.status ))==null?'':__t)+
'">\r\n\t<div class="container-fluid">\r\n\t\t<div class="row-fluid  outcome">'+
((__t=( odd.outcome ))==null?'':__t)+
'</div>\r\n\t\t<div class="row-fluid odd">\r\n\t\t\t<div class="span4 castcode">'+
((__t=( odd.code ))==null?'':__t)+
'</div>\r\n\t\t\t<div class="span8 coef">'+
((__t=( odd.coef ))==null?'':__t)+
'</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n';
}
return __p;
};

App.PreTemplates.marketTemplate = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="row-fluid market-wrapper '+
((__t=( market.status ))==null?'':__t)+
'" market="'+
((__t=( market.market ))==null?'':__t)+
'">\r\n\t'+
((__t=( self.renderOdds(market.odds, size, useForaTemplate) ))==null?'':__t)+
'\r\n</div>\r\n';
}
return __p;
};

App.PreTemplates.tennisHatTemplate = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="row-fluid tennis-hat event-hat">\r\n\t<div class="span1 event-num"><img src="img/sport_1.png">'+
((__t=( event_num ))==null?'':__t)+
'</div>\r\n\t<div class="span1 event-status">'+
((__t=( event.starttime ))==null?'':__t)+
'</div>\r\n\t<div class="span6 competitors text-center"> '+
((__t=( event.competitors.home.name ))==null?'':__t)+
' - '+
((__t=( event.competitors.away.name ))==null?'':__t)+
' </div>\r\n\t'+
((__t=( this.renderScore() ))==null?'':__t)+
'\r\n</div>\r\n';
}
return __p;
};

App.PreTemplates.setTemplate = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="row-fluid tennis-set-bets">\r\n\t<div class="span2 event-information">\r\n\t\t<div class="container-fluid">\r\n\t\t\t<div class="row-fluid">\r\n\t\t\t\t'+
((__t=( setname ))==null?'':__t)+
'\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class="span2 offset2">\r\n\t\t<div class="row-fluid">\r\n\t\t\t';
 if (eventModel.bettypes[set.main]) { 
__p+='\r\n\t\t\t<div class="container-fluid bettype-wrapper" bettype="'+
((__t=( set.main ))==null?'':__t)+
'">\r\n\t\t\t\t<div class="row-fluid bettype-caption">'+
((__t=( eventModel.bettypes[set.main].name ))==null?'':__t)+
'</div>\r\n\t\t\t\t<div class="container-fluid markets">\r\n\t\t\t\t\t'+
((__t=( this.renderMarket(eventModel.bettypes[set.main].markets, 2) ))==null?'':__t)+
'\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t';
 } 
__p+='\r\n\t\t</div>\r\n\t\t<div class="row-fluid">\r\n\t\t\t';
 if (eventModel.bettypes[set.total]) { 
__p+='\r\n\t\t\t<div class="container-fluid bettype-wrapper" bettype="'+
((__t=( set.total ))==null?'':__t)+
'">\r\n\t\t\t\t<div class="row-fluid bettype-caption">'+
((__t=( eventModel.bettypes[set.total].name ))==null?'':__t)+
'</div>\r\n\t\t\t\t<div class="container-fluid markets">\r\n\t\t\t\t\t'+
((__t=( this.renderMarket(eventModel.bettypes[set.total].markets, 2, 'useForaOddTemplate') ))==null?'':__t)+
'\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t';
 } 
__p+='\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n';
}
return __p;
};

App.PreTemplates.secondTimeTemplate = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div>\r\n\t';
 console.log(this) 
__p+='</div>\r\n';
}
return __p;
};

App.PreTemplates.tennisTemplate = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='\r\n<div class="container-fluid">\r\n<div class="row-fluid tennis-main-bets">\r\n<div class="span2 event-information">\r\n</div>\r\n<div class="span2 offset2">\r\n\t<div class="row-fluid">\r\n\t\t';
 if (bettypes[2]) { 
__p+='\r\n\t\t<div class="container-fluid bettype-wrapper" bettype="2">\r\n\t\t\t<div class="row-fluid bettype-caption">'+
((__t=( bettypes[2].name ))==null?'':__t)+
'</div>\r\n\t\t\t<div class="container-fluid markets">\r\n\t\t\t\t'+
((__t=( this.renderMarket(bettypes[2].markets, 2) ))==null?'':__t)+
'\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t';
 } 
__p+='\r\n\t</div>\r\n\t<div class="row-fluid">\r\n\t\t';
 if (bettypes[122]) { 
__p+='\r\n\t\t<div class="container-fluid bettype-wrapper" bettype="122">\r\n\t\t\t<div class="row-fluid bettype-caption">'+
((__t=( bettypes[122].name ))==null?'':__t)+
'</div>\r\n\t\t\t<div class="container-fluid markets">\r\n\t\t\t\t'+
((__t=( this.renderMarket(bettypes[122].markets, 2) ))==null?'':__t)+
'\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t';
 } 
__p+='\r\n\t</div>\r\n\t<div class="row-fluid">\r\n\t\t';
 if (bettypes[128]) { 
__p+='\r\n\t\t<div class="container-fluid bettype-wrapper" bettype="128">\r\n\t\t\t<div class="row-fluid bettype-caption">'+
((__t=( bettypes[128].name ))==null?'':__t)+
'</div>\r\n\t\t\t<div class="container-fluid markets">\r\n\t\t\t\t'+
((__t=( this.renderMarket(bettypes[128].markets, 3) ))==null?'':__t)+
'\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t';
 } 
__p+='\r\n\t</div>\r\n</div>\r\n<div class="span2">\r\n\t';
 if (bettypes[79]) { 
__p+='\r\n\t<div class="container-fluid bettype-wrapper" bettype="79">\r\n\t\t<div class="row-fluid bettype-caption">'+
((__t=( bettypes[79].name ))==null?'':__t)+
'</div>\r\n\t\t<div class="container-fluid markets">\r\n\t\t\t'+
((__t=( this.renderMarket(bettypes[79].markets, 2, 'useForaTemplate') ))==null?'':__t)+
'\r\n\t\t</div>\r\n\t</div>\r\n\t';
 } 
__p+='\r\n</div>\r\n<div class="span2">\r\n\t';
 if (bettypes[80]) { 
__p+='\r\n\t<div class="container-fluid bettype-wrapper" bettype="80">\r\n\t\t<div class="row-fluid bettype-caption">'+
((__t=( bettypes[80].name ))==null?'':__t)+
'</div>\r\n\t\t<div class="container-fluid markets">\r\n\t\t\t'+
((__t=( this.renderMarket(bettypes[80].markets, 2, 'useForaTemplate') ))==null?'':__t)+
'\r\n\t\t</div>\r\n\t</div>\r\n\t';
 } 
__p+='\r\n</div>\r\n<div class="span2">\r\n\t';
 if (bettypes[9]) { 
__p+='\r\n\t<div class="container-fluid bettype-wrapper" bettype="9">\r\n\t\t<div class="row-fluid bettype-caption">'+
((__t=( bettypes[80].name ))==null?'':__t)+
'</div>\r\n\t\t<div class="container-fluid markets">\r\n\t\t\t'+
((__t=( this.renderMarket(bettypes[9].markets, 2) ))==null?'':__t)+
'\r\n\t\t</div>\r\n\t</div>\r\n\t';
 } 
__p+='\r\n</div>\r\n<div class="span2">\r\n\t<div class="row-fluid">\r\n\t\t';
 if (bettypes[8]) { 
__p+='\r\n\t\t<div class="container-fluid bettype-wrapper" bettype="80">\r\n\t\t\t<div class="row-fluid bettype-caption">'+
((__t=( bettypes[8].name ))==null?'':__t)+
'</div>\r\n\t\t\t<div class="container-fluid markets">\r\n\t\t\t\t'+
((__t=( this.renderMarket(bettypes[8].markets, 2) ))==null?'':__t)+
'\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t';
 } 
__p+='\r\n\t</div>\r\n\t<div class="row-fluid">\r\n\t\t';
 if (bettypes[121]) { 
__p+='\r\n\t\t<div class="container-fluid bettype-wrapper" bettype="121">\r\n\t\t\t<div class="row-fluid bettype-caption">'+
((__t=( bettypes[121].name ))==null?'':__t)+
'</div>\r\n\t\t\t<div class="container-fluid markets">\r\n\t\t\t\t'+
((__t=( this.renderMarket(bettypes[121].markets, 2) ))==null?'':__t)+
'\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t';
 } 
__p+='\r\n\t</div>\r\n</div>\r\n</div>\r\n</div>\r\n';
}
return __p;
};

App.PreTemplates.tennisScoreTemplate = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="span4">\r\n\t<div class="row-fluid">\r\n\t\t<div class="span1half score">\r\n\t\t\t<div class="row-fluid score-home">\r\n\t\t\t\tevent_stat.score.split(:)[0]\r\n\t\t\t</div>\r\n\t\t\t<div class="row-fluid score-away">\r\n\t\t\t\tevent_stat.score.split(:)[1]\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class="span1half set-score">\r\n\t\t\t<div class="row-fluid set-score-home">\r\n\t\t\t\tevent_stat.setscore[0].split(:)[0]\r\n\t\t\t</div>\r\n\t\t\t<div class="row-fluid set-score-away">\r\n\t\t\t\tevent_stat.setscore[0].split(:)[1]\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class="span1half set-score">\r\n\t\t\t<div class="row-fluid set-score-home">\r\n\t\t\t\tevent_stat.setscore[0].split(:)[0]\r\n\t\t\t</div>\r\n\t\t\t<div class="row-fluid set-score-away">\r\n\t\t\t\tevent_stat.setscore[0].split(:)[1]\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class="span1half set-score">\r\n\t\t\t<div class="row-fluid set-score-home">\r\n\t\t\t\tevent_stat.setscore[1].split(:)[0]\r\n\t\t\t</div>\r\n\t\t\t<div class="row-fluid set-score-away">\r\n\t\t\t\tevent_stat.setscore[1].split(:)[1]\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class="span1half set-score">\r\n\t\t\t<div class="row-fluid set-score-home">\r\n\t\t\t\tevent_stat.setscore[2].split(:)[0]\r\n\t\t\t</div>\r\n\t\t\t<div class="row-fluid set-score-away">\r\n\t\t\t\tevent_stat.setscore[2].split(:)[1]\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class="span1half set-score">\r\n\t\t\t<div class="row-fluid set-score-home">\r\n\t\t\t\tevent_stat.setscore[3].split(:)[0]\r\n\t\t\t</div>\r\n\t\t\t<div class="row-fluid set-score-away">\r\n\t\t\t\tevent_stat.setscore[3].split(:)[1]\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class="span1half set-score">\r\n\t\t\t<div class="row-fluid set-score-home">\r\n\t\t\t\tevent_stat.setscore[4].split(:)[0]\r\n\t\t\t</div>\r\n\t\t\t<div class="row-fluid set-score-away">\r\n\t\t\t\tevent_stat.setscore[4].split(:)[1]\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class="span1half set-score">\r\n\t\t\t<div class="row-fluid set-score-home">\r\n\t\t\t\tevent_stat.setscore[5].split(:)[0]\r\n\t\t\t</div>\r\n\t\t\t<div class="row-fluid set-score-away">\r\n\t\t\t\tevent_stat.setscore[5].split(:)[1]\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class="span1half game-score">\r\n\t\t\t<div class="row-fluid set-score-home">\r\n\t\t\t\tevent_stat.gamescore.split(:)[0]\r\n\t\t\t</div>\r\n\t\t\t<div class="row-fluid set-score-away">\r\n\t\t\t\tevent_stat.gamescore.split(:)[1]\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n';
}
return __p;
};



	return App.PreTemplates;
});
