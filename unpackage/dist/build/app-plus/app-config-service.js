
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/login/index","pages/login/register","pages/login/enterpriseLogin","pages/login/personLogin","pages/login/phoneNumberBind","pages/login/personVerificationCodeLogin","pages/login/passwordForget","pages/login/protocol","pages/enterprise/myPark/parkBind","pages/home/home","pages/home/search","pages/enterprise/contact/contact","pages/enterprise/contact/addContact","pages/enterprise/contact/add_Contact","pages/enterprise/contact/contactList","pages/enterprise/contact/detail","pages/enterprise/changePassword","pages/enterprise/enterprise","pages/enterprise/about","pages/enterprise/changePhoneNumber","pages/enterprise/feedBack","pages/enterprise/myPark/parkApply","pages/login/parkSelect","pages/enterprise/informationPublish/informationPublish","pages/enterprise/informationPublish/publish","pages/enterprise/informationPublish/publishDetails","pages/enterprise/inform/inform","pages/enterprise/inform/systemInform","pages/enterprise/inform/meetingInform","pages/enterprise/inform/feedBackInform","pages/enterprise/inform/feedBackDetail","pages/enterprise/inform/enterpriseDetail","pages/enterprise/inform/policyInform","pages/enterprise/inform/rectifyInform","pages/enterprise/inform/rectifyDetail","pages/enterprise/industrySelect","pages/home/informationFill/informationFill","pages/home/informationFill/questionnaireNoFill","pages/home/informationFill/questionnaireFilled","pages/home/informationFill/questionnaireOverdue","pages/enterprise/myGoods/goodsdetail","pages/enterprise/myGoods/myGoods","pages/enterprise/myGoods/search","pages/enterprise/myGoods/publish","pages/home/supply/supply","pages/home/supply/search","pages/home/supply/supplydetail","pages/home/supply/like","pages/home/supply/publish","pages/home/noticeAnnouncement/noticeAnnouncement","pages/home/noticeAnnouncement/activityPolicydetail","pages/home/noticeAnnouncement/importantNoticedetail","pages/home/friendlyPolicy/friendlyPolicy","pages/home/friendlyPolicy/industrySelect","pages/home/friendlyPolicy/policyDetail","pages/home/enterpriseSevice/enterpriseSevice","pages/home/enterpriseSevice/search","pages/home/financeAssistant/financeAssistant","pages/home/financeAssistant/financeAssistantDetail","pages/enterprise/contact/selectjob","pages/enterprise/contact/changeContact","pages/home/meetingInform/meetingInform","pages/home/meetingInform/meetingDetailNoApply","pages/home/meetingInform/meetingDetailApplied","pages/home/meetingInform/addParticipator","pages/personal/personal","pages/home/viewDetail/viewDetail","pages/login/industrySelect"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"招通达","navigationBarBackgroundColor":"#FFFFFF","backgroundColor":"#F8F8F8"},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":false,"autoclose":false},"appname":"招通达","compilerVersion":"3.0.7","entryPagePath":"pages/login/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/login/index","meta":{"isQuit":true},"window":{"navigationBarTitleText":"","navigationStyle":"custom"}},{"path":"/pages/login/register","meta":{},"window":{"navigationBarTitleText":"企业注册","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/login/enterpriseLogin","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/login/personLogin","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/login/phoneNumberBind","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/login/personVerificationCodeLogin","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/login/passwordForget","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/login/protocol","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/enterprise/myPark/parkBind","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/home/home","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom","scrollIndicator":"none"}},{"path":"/pages/home/search","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/enterprise/contact/contact","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/enterprise/contact/addContact","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/enterprise/contact/add_Contact","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/enterprise/contact/contactList","meta":{},"window":{"navigationBarTitleText":"联系人","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#2D6BDD","navigationBarTextStyle":"white"}},{"path":"/pages/enterprise/contact/detail","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/enterprise/changePassword","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/enterprise/enterprise","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/enterprise/about","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/enterprise/changePhoneNumber","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/enterprise/feedBack","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/enterprise/myPark/parkApply","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/login/parkSelect","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/enterprise/informationPublish/informationPublish","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/enterprise/informationPublish/publish","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/enterprise/informationPublish/publishDetails","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/enterprise/inform/inform","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/enterprise/inform/systemInform","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/enterprise/inform/meetingInform","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/enterprise/inform/feedBackInform","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/enterprise/inform/feedBackDetail","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/enterprise/inform/enterpriseDetail","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/enterprise/inform/policyInform","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/enterprise/inform/rectifyInform","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/enterprise/inform/rectifyDetail","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/enterprise/industrySelect","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/home/informationFill/informationFill","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/home/informationFill/questionnaireNoFill","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/home/informationFill/questionnaireFilled","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/home/informationFill/questionnaireOverdue","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/enterprise/myGoods/goodsdetail","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/enterprise/myGoods/myGoods","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/enterprise/myGoods/search","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/enterprise/myGoods/publish","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/home/supply/supply","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/home/supply/search","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/home/supply/supplydetail","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/home/supply/like","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/home/supply/publish","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/home/noticeAnnouncement/noticeAnnouncement","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/home/noticeAnnouncement/activityPolicydetail","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/home/noticeAnnouncement/importantNoticedetail","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/home/friendlyPolicy/friendlyPolicy","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/home/friendlyPolicy/industrySelect","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/home/friendlyPolicy/policyDetail","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/home/enterpriseSevice/enterpriseSevice","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":true,"navigationStyle":"custom"}},{"path":"/pages/home/enterpriseSevice/search","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":true,"navigationStyle":"custom"}},{"path":"/pages/home/financeAssistant/financeAssistant","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/home/financeAssistant/financeAssistantDetail","meta":{},"window":{"navigationBarTitleText":"详情","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#2D6BDD","navigationBarTextStyle":"white"}},{"path":"/pages/enterprise/contact/selectjob","meta":{},"window":{"navigationBarTitleText":"选择职务","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/enterprise/contact/changeContact","meta":{},"window":{"enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/home/meetingInform/meetingInform","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/home/meetingInform/meetingDetailNoApply","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/home/meetingInform/meetingDetailApplied","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/home/meetingInform/addParticipator","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/personal/personal","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/home/viewDetail/viewDetail","meta":{},"window":{"navigationBarTitleText":"详情","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#2D6BDD","navigationBarTextStyle":"white"}},{"path":"/pages/login/industrySelect","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
