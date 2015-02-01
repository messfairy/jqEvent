define(['../src/events_pipe', '../src/types'], function (eventsPipe, Types) {
    describe('EventPipe单元测试', function(){
        it('function类型判断',function(){
            jasmine.addMatchers({
                isFunction: function() {
                    return {
                        compare: function (actual, expected) {
                            var _function = actual;
                            return {
                                pass: Types.isFunction(_function)
                            }
                        }
                    };
                }
            });
            expect(function(){}).isFunction();
        });
        describe('参数类型检查', function(){
            beforeEach(function(){
                eventsPipe.unsubscribe(); //取消所有订阅
            });
            it('请指定事件作用域', function(){
                var errorMsg = '请指定事件作用域，字符串类型';
                expect(function(){
                    eventsPipe.subscribe()
                }).toThrowError(errorMsg);
                expect(function(){
                    eventsPipe.publish()
                }).toThrowError(errorMsg);
            })
            it('请指定事件类型', function(){
                var errorMsg = '请指定事件类型，字符串类型';
                expect(function(){
                    eventsPipe.subscribe('global.panel')
                }).toThrowError(errorMsg);
                expect(function(){
                    eventsPipe.unsubscribe('global.panel')
                }).toThrowError(errorMsg);
                expect(function(){
                    eventsPipe.publish('global.panel')
                }).toThrowError(errorMsg);
            })
        });
        //beforeAll(function(){
        //    eventsPipe.subscribe('global', function(){
        //        alert('global');
        //    });
        //})
        beforeEach(function(){
            eventsPipe.unsubscribe(); //取消所有订阅
        });
        it('简单订阅发布', function(){
            var callback = jasmine.createSpy("callback");
            eventsPipe.subscribe('global', 'discourage', function(event, data){
                callback();
                expect(event.type).toBe('discourage');
                expect(data).toBe('伤脑筋');
            });
            eventsPipe.publish('global', 'discourage', '伤脑筋');
            expect(callback).toHaveBeenCalled();
        })
        it('简单订阅取消', function(){
            var triggered = 0;
            eventsPipe.unsubscribe('global', 'discourage', function discourage(event, data){
                triggered++;
                expect(data).toBe('伤脑筋');
            });
            eventsPipe.publish('global', 'discourage', '伤脑筋');
            expect(triggered).toBe(0);
        })
        it('域订阅', function(){
            var triggered = 0;
            eventsPipe.subscribe('global.container.panel', 'hello',  function(){
                triggered++;
            });
            eventsPipe.publish('global.panel.container.xxx', 'hello');
            eventsPipe.publish('global.panel.container', 'hello');
            eventsPipe.publish('global.panel', 'hello');
            eventsPipe.publish('global', 'hello');
            expect(triggered).toBe(3);
        });
        //todo 该方法果然测出问题了，明天改进
        it('取消域订阅', function(){
            var triggered = 0;
            eventsPipe.subscribe('global.container.panel', 'hello',  function(){
                triggered++;
            });
            eventsPipe.unsubscribe('global.panel', 'hello');
            eventsPipe.publish('global', 'hello');
            expect(triggered).toBe(0);
        });
        it('取消所有订阅', function(){
            var triggered = 0;
            eventsPipe.subscribe('global', 'hello',  function(){
                triggered++;
            });
            eventsPipe.subscribe('global', 'world',  function(){
                triggered++;
            });
            eventsPipe.subscribe('message', 'world',  function(){
                triggered++;
            });
            eventsPipe.unsubscribe();
            eventsPipe.publish('global', 'hello');
            eventsPipe.publish('global', 'world');
            eventsPipe.publish('message', 'hello world');
            expect(triggered).toBe(0);
        });
        it('订阅global作用域', function(){
            var triggered = 0;
            eventsPipe.subscribe('global', 'message',  function(){
                triggered++;
            });
            eventsPipe.publish('global', 'message');
            eventsPipe.publish('global', 'message');
            expect(triggered).toBe(2);
        });
        it('一次性订阅', function(){
            var triggered = 0;
            eventsPipe.subscribe('global', 'message|once',  function(){
                triggered++;
            });
            eventsPipe.publish('global', 'message');
            eventsPipe.publish('global', 'message');
            expect(triggered).toBe(1);
        });
        //todo
        it('批量回收事件', function(){
            var triggered = 0;
            eventsPipe.subscribe('global', 'message|recycle',  function(){
                triggered++;
            });
            eventsPipe.publish('global', 'message');
            //eventsPipe.recycle('')
            eventsPipe.publish('global', 'message');
            expect(triggered).toBe(2);
        });
    })
})