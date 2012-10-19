(function ($) {
    $.fn.customselect = function (method) {

        var options = null;
        var methodName = '';
        var params = [];

        if (arguments.length >= 1 && typeof (arguments[0]) == 'object')
            options = arguments[0];
        else if (arguments.length >= 1 && typeof (arguments[0]) == 'string') {
            methodName = arguments[0];
            params = arguments[1];
        }

        var attr = {
            'target': '',
            'container': '',
            'overload': '',
            'label': 'Selecione um item',
            'labelContainer': null,
            'onChange': function () {
                $.noop()
            },
            'listItens': [],
            'list': null,
            'main': null,
            'button': null,
            'ready': false,
			'isReadOnly': false,
			'ordination': ""
        };

        var methods = {
            init: function (options) {
                var $this = this;

                $this.attr = $.extend(true, {}, attr, options);
                $this.attr.target = $(this);

                if ($this.attr.target.parent().hasClass('customselect_container')) {
                    $this.attr.ready = true;
                }

                methods.build.call($this);
            },

            build: function () {
                var $this = this;

                if ((($this.attr.target).attr('data-label') != "") && (($this.attr.target).attr('data-label') != undefined)) { $this.attr.label = $($this.attr.target).attr('data-label'); }

                if (!$this.attr.ready) $($this).wrap('<div class="customselect_container" />');
                $this.attr.container = $($this).parent();

                if (!$this.attr.ready) $($this.attr.container).wrap('<div class="customselect_main" />');
                $this.attr.main = $($this.attr.container).parent();
				
                if (!$this.attr.ready) $('<div class="customselect_label"></div>').appendTo($this.attr.container);
                $this.attr.labelContainer = $($this.attr.container).find('.customselect_label')[0];
				
				if (!$this.attr.ready) $('<button type="button" class="customselect_button"></button>').appendTo($this.attr.container);

                $this.attr.button = $($this.attr.container).find('.customselect_button')[0];

                if (!$this.attr.ready) methods.startButton.call($this);

                methods.setLabel.call($this, $this.attr.label);

                if (!$this.attr.ready) $('<ul class="custonselect_list close"></ul>').appendTo($this.attr.container);
				
				if (($($this.attr.target).attr('data-ordination') != "") && ($($this.attr.target).attr('data-ordination') != undefined)) $this.attr.ordination = $($this.attr.target).attr('data-ordination');
				else $this.attr.ordination = 'asc';
				
                $this.attr.list = $($this.attr.container).find('.custonselect_list')[0];
                methods.overloadItens.call($this);
				
				if (($($this.attr.target).attr('data-readonly') != "") && ($($this.attr.target).attr('data-readonly') != undefined)) $this.attr.isReadOnly = $($this.attr.target).attr('data-readonly');
				else $this.attr.isReadOnly = false;
				
				if($this.attr.isReadOnly) methods.toReadOnly.call($this); 

				if (!$this.attr.ready) methods.onFocus.call($this); 
            },
			
			onFocus: function() {
				var $this = this;

				$($this.attr.main).focusin(function(){
					if($this.attr.isReadOnly) return false;

					$($this.attr.main).unbind().keydown(function(e){ 
						e.isDefaultPrevented();
						
						var valueLi = null;
						var textLi = null;
						var i = null;
						
						if ((($this.attr.target).attr('data-index') != "") && (($this.attr.target).attr('data-index') != undefined)) i = parseInt($($this.attr.target).attr('data-index'));
						
						if(e.which == 40) {
							if(i == null) { 
								i = 0;
							} else if(i >= 0 && i < $this.attr.listItens.length - 1) {
								i++;
							}
						} else if(e.which == 38) {
							if(i == null) { 
								i = 0;
							} else if (i > 0) { 
								i--;
							}
						}
						
						$($this.attr.target).attr('data-index', i);
						
						valueLi = $this.attr.listItens[i].value;
						textLi = $this.attr.listItens[i].text;
						
						methods.refreshHidden.call($this, valueLi);
						methods.hideList.call($this);
						methods.setLabel.call($this, textLi);
						$this.attr.onChange();
					});
				});
			},

            startButton: function () {
                var $this = this;

                $($this.attr.button).click(function (e) {
                    if ($($this.attr.list).hasClass('close')) methods.showList.call($this);
                    else methods.hideList.call($this);

                    return false;
                });
				
				$($this.attr.labelContainer).click(function (e) {
                    if ($($this.attr.list).hasClass('close')) methods.showList.call($this);
                    else methods.hideList.call($this);

                    return false;
                });
				
                $('body').click(function () {
                    $('.custonselect_list.open').removeClass('open').addClass('close');
                    $('.customselect_container.active').removeClass('active');
                });
            },
			
			stopButton: function(){
				var $this = this;
				
				$($this.attr.button).unbind();
				$($this.attr.labelContainer).unbind();
			},

            setLabel: function (label) {
                var $this = this;

                $($this.attr.labelContainer).text(label);
            },
			
			buildListItens: function(){
				var $this = this;
				
				if (($($this.attr.target).attr('data-overload') != "") && ($($this.attr.target).attr('data-overload') != undefined)) { $this.attr.overload = $($this.attr.target).attr('data-overload'); }
                var list = $this.attr.overload.split(',');
                
				var objListItens = [];
				
				$(list).each(function (i, item) {
                    var obj = {
						value: item.split('|')[0],
						text: item.split('|')[1]
					};
					
					objListItens.push(obj);
                });
				
				var ordened = null;

				function byTextAsc(a, b) { return a.text > b.text; }
				function byTextDesc(a, b) { return a.text < b.text; }
				
				if($this.attr.ordination == 'desc')
					objListItens.sort(byTextDesc);
				else
					objListItens.sort(byTextAsc);
				
				$this.attr.listItens = objListItens;
			},

            overloadItens: function () {
                var $this = this;
				
				methods.buildListItens.call($this);
				
				$($this.attr.list).html('');
				
				$($this.attr.listItens).each(function (i, item) {
                    $('<li data-value="' + item.value + '"><span>' + item.text + '</span></li>').appendTo($this.attr.list);
                });
				
                var liGroup = $($this.attr.list).find('li');

                $(liGroup).click(function () {
                    var valueLi = $(this).attr('data-value');
                    var textLi = $(this).find('span').text();
                    methods.refreshHidden.call($this, valueLi);
                    methods.hideList.call($this);
                    methods.setLabel.call($this, textLi);
                    $this.attr.onChange();
                    return false;
                });
            },

            refresh: function () {
                var $this = this;

                methods.overloadItens.call($this);
                methods.setLabel.call($this, $this.attr.label);
            },

            clear: function () {
                var $this = this;
                methods.overloadItens.call($this);
                methods.setLabel.call($this, $this.attr.label);
                methods.refreshHidden.call($this, "");
            },

            setValue: function (newValue) {
                var $this = this;

                $($this.attr.listItens).each(function (i, item) {
                    if (item.value == newValue) {
                        methods.setLabel.call($this, item.text);
                        methods.refreshHidden.call($this, item.value);
                    }
                });
            },
			
			toReadOnly: function(){
				var $this = this;
				
				$($this.attr.target).attr('readonly', 'readonly');
				$($this.attr.main).addClass('readonly');
				methods.stopButton.call($this);
			},
			
			toReadAndWrite: function(){
				var $this = this;
				
				$($this.attr.target).removeAttr('readonly');
				$($this.attr.target).removeAttr('data-readonly');
				$($this.attr.main).removeClass('readonly');
				$this.attr.isReadOnly = false;
				
				methods.startButton.call($this);
			},

            addNewItem: function (obj) {
                var $this = this;

                var oldOver = $($this.attr.target).attr('data-overload');
                var newOver = oldOver + ',' + obj.id + '|' + obj.text;
                $($this.attr.target).attr('data-overload', newOver);

                methods.overloadItens.call($this);
                methods.setLabel.call($this, obj.text);
                methods.refreshHidden.call($this, obj.id);
            },

            showList: function () {
                var $this = this;
                $('.customselect_container.active').removeClass('active');
                $('.custonselect_list.open').removeClass('open').addClass('close');

                $($this.attr.list).removeClass('close').addClass('open');
                $($this.attr.container).addClass('active');
            },

            hideList: function () {
                var $this = this;
                $($this.attr.list).removeClass('open').addClass('close');
            },

            refreshHidden: function (value) {
                var $this = this;
                $($this.attr.target).val(value);
            }
        };

        if (methodName != '') {
            if (methods[methodName]) {
                return this.each(function () {
                    methods[methodName].call(this, params);
                });
            }
            else {
                $.error("Method '" + methodName + "' does not exist on jQuery.customselect");
                return;
            }
        }

        return this.each(function () {
            methods.init.call(this, options);
        });
    };
})(jQuery);