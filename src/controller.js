/**
 * @file 控制器实现
 * @author hades(denghongqi@baidu.com)
 */
define(function(require) {
    var util = require('./util');
    var View = require('./View');

    var _actionConfig = [];
    var _actionMap = {};

    function start() {
        util.each(_actionConfig, function(item, index) {
            var action;
            item.id = item.id || util.guid();

            if (typeof item.action === 'function') {
                action = new item.action(item);
            }
            else {
                //todo
            }

            _actionMap[item.id] = action;

            util.each(item.views || [], function(v, i) {
                if (typeof v.view === 'function') {
                    v.instance = new v.view(v);
                }
                else {
                    v.instance = new View(v);
                }

                v.instance.action = action;
                v.instance.enterDocument();

                action.getInitData().then(function(data) {
                    v.instance.reload(null, data, item.id);
                });
            });
        });
    }

    function registerAction(config) {
        var config = config || [];
        //todo 根据actionId做merge
        _actionConfig = _actionConfig.concat(config);
    }

    function get(id) {
        return _actionMap[id];
    }

    return {
        start: start,
        get: get,
        registerAction: registerAction
    };
});
