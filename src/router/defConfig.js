const DEV = {
    // db: {
    //     host: '',
    //     baseName: '',
    //     user: '',
    //     pwd: ''
    // },
    req: {
        default:'',
    }
}
const SIT = {
    req: {
        default:'http://127.0.0.1',
    }
}


const CONFIG = {SIT, UAT, PRD};
// - 判断环境
let ENV;
if(process.env.NODE_ENV === 'production'){
    ENV = 'PRD';
}else{
    ENV = 'SIT';
}
// - 根据环境获取对应的配置列表
const defConfig = CONFIG[ENV];

/**
 *
 * @param {string} type 类型
 */
let getOption = function(type) {
    	return defConfig[type]
}

module.exports = getOption;
