define(['jquery'], function ($) {
    describe('jquery域事件单元测试', function(){
        var EventPipe = $('<div/>');

        //var events = {'any_event.tool.panel.container.global': function(jqEvent){
        //    console.log('any_event.tool.panel.container.global jqEvent.namespace: ' + jqEvent.namespace);
        //    console.log('any_event.tool.panel.container.global jqEvent.type: ' + jqEvent.type);
        //}};
        var events = {
            'any_event.tool.panel.container.global': function(jqEvent){
                console.log('any_event.tool.panel.container.global jqEvent.namespace: ' + jqEvent.namespace);
                console.log('any_event.tool.panel.container.global jqEvent.type: ' + jqEvent.type);
            },
            'any_event.panel.container.global': function(jqEvent){
                console.log('any_event.panel.container.global jqEvent.namespace: ' + jqEvent.namespace);
                console.log('any_event.panel.container.global jqEvent.type: ' + jqEvent.type);
            },
            'any_event.container.global': function(jqEvent){
                console.log('any_event.container.global jqEvent.namespace: ' + jqEvent.namespace);
                console.log('any_event.container.global jqEvent.type: ' + jqEvent.type);
            },
            'any_event.global': function(jqEvent){
                console.log('any_event.global jqEvent.namespace: ' + jqEvent.namespace);
                console.log('any_event.global jqEvent.type: ' + jqEvent.type);
            }
        };
        it('stringify测试', function(){
            var object = {
                'a': [function(){}, function(){}],
                'b': [function(){}, function(){}],
                'c': [function(){}, function(){}],
                'd': [function(){}, function(){}]
            };
            var previous = JSON.stringify(object);
            console.log(object);
            object['d'] = [];
            expect(JSON.stringify(object)).not.toBe(previous);
        });
        beforeAll(function() {
            EventPipe.on(events);
            EventPipe.off('any_event.panel.global');
        });
        it('发布global级事件', function(){
            EventPipe.trigger('any_event.global');
            expect(EventPipe).toEqual(EventPipe);
        });
        it('发布container级事件', function(){
            EventPipe.trigger('any_event.container');
            expect(EventPipe).toEqual(EventPipe);
        });
        it('tool.panel.container级事件', function(){
            EventPipe.trigger('any_event.tool.panel');
            expect(EventPipe).toEqual(EventPipe);
        });
        it('global.panel级事件', function(){
            EventPipe.trigger('any_event.tool');
            expect(EventPipe).toEqual(EventPipe);
        });
        it('tool.panel.container.panel级事件', function(){
            EventPipe.trigger('any_event.tool.panel.container');
            expect(EventPipe).toEqual(EventPipe);
        });
        it('tool.panel.container.panel.tool级事件', function(){
            EventPipe.trigger('any_event.tool.panel.container.global');
            expect(EventPipe).toEqual(EventPipe);
        });
    })
});