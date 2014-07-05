/**
 * @file 框架入口文件
 * @author hades(denghongqi@baidu.com)
 */
define(function(require) {

    var controller = require('./controller');

    /**
     * 启动框架
     *
     * @public
     */
    function start() {
        controller.start();
    }

    function registerAction() {
        controller.registerAction.apply(this, arguments);
    }

    function get() {
        return controller.get.apply(this, arguments);
    }

    return {
        version: '0.1.0',
        start: start,
        get: get,
        registerAction: registerAction
    };
});
