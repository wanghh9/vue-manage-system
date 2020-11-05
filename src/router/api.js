/**
 * Created by kevenfeng on 2017/3/15.
 */

// start ======== 配置提取
let defConfig = require('../model/defConfig')('req');
// let casConfig = require('../model/defConfig')('cas');
// let otherConfig = require('../model/defConfig')('otherConfig');


// 管理后台数据接口
let defaultUrl = defConfig.default;

var Cas = require('../src/common/login/Cas.js');
const cas = new Cas(new ICache(),new ISession(),casConfig.casUrl,casConfig.systemId,new Helper());
cas.setSignKey(casConfig.signKey)

//设置跨域访问
router.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", " Origin, X-Requested-With, Content-Type, Accept");
    //允许请求资源的方式
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
})



router.post('/addAdvertise', function (req, res, next) {
    let reqOptions = req.body
    if (reqOptions.payload.activity_pic_url == undefined) {
        reqOptions.payload.activity_pic_url = "";
    }
    var sql = "insert into t_dt_activity_list(priority,activity_name,activity_desc,activity_pic_url,activity_url,type,status,last_edit_time,online_time,offline_time) values(1,'" + reqOptions.payload.activity_name + "','','" + reqOptions.payload.activity_pic_url + "','" + reqOptions.payload.activity_url + "'," + reqOptions.payload.type + ",0,now(),'" + reqOptions.payload.online_time + "','" + reqOptions.payload.offline_time + "')";
    var sqlOptions = {
        sql: sql,
        params: []
    };
    dbCommonFuncDT.executeMysql(sqlOptions).then(function (data) {
        let result = {
            ret: 0,
            data: '操作成功'
        }
        res.json(result)
    }, function (error) {
        var result = {
            ret: -1,
            data: error
        };
        res.json(result);
    });
})

/**
 * 新接口,互动直播
 */
router.post('/getLiveRoomConsole', function (req, res, next) {
    let url = defaultUrl + '/liveRoom/getLiveRoomConsole'
    axios({
        method: 'post',
        url: url,
        data: JSON.stringify(req.body),
        headers: {
            'content-type': 'application/json',
            'tenantId':req.body.tenantId
        }
    }).then(data => {
        res.send(data.data)
    }).catch(e => {
        console.log('getLiveRoom::  ' + e.message)
        res.status(500)
        res.send(e.response.data)
    })
})


module.exports = router