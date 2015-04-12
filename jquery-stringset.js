(function($) {
    $.fn.stringset = function(options) {
         var settings = $.extend({
            newClass: "",
            inputClass: "",
            placeholder: "Dodaj...",
            onRefresh: function(){}
         }, options );
        
        var that = this;
        this.children("input").addClass("stringset").hide();
        
        this.append('<div class="stringset-inputs"></div>');
        this.append('<input class="stringset-new '+settings.newClass+'" placeholder="'+settings.placeholder+'" type="text" value=""/>');
        var thisVal = this.find('.stringset').val();
        if(thisVal===''){
            thisVal = "[]";
        }
        var items;
        try{
            items = $.parseJSON(thisVal);
        }catch(e){
            items = $.parseJSON('["'+thisVal.split('"').join('\"') +'"]');
        }
        
        var i;
        for (i = 0; i < items.length; ++i) {
            stringsetAddInput(items[i]);
        }
        stringsetRefresh();
        
        this.find('.stringset-new').change(function(){
            var value = $(this).val();
            if(value!==""){
                stringsetAddInput(value);
                stringsetRefresh();
                $(this).val("");
            }
        });
        
        this.find('.stringset-new').bind('keypress keyup', function (event) {
            if (event.which == 13 || event.keyCode == 13 || 
                event.which == 9  || event.keyCode == 9) {
                var value = $(this).val();
                if(value!==""){
                    stringsetAddInput(value);
                    stringsetRefresh();
                    $(this).val("");
                    event.preventDefault();
                    return false;
                }
            }
            return true;
        });
        return this;
        
        function stringsetAddInput(val){
            var input = $('<input class="stringset-input '+settings.inputClass+'" type="text"/>');
            that.find('.stringset-inputs').append(input);
            input.val(val).on('change', function(){
                var value = $(this).val();
                if(value===""){
                    $(this).hide();
                }
                stringsetRefresh();
            });
        }
        
        function stringsetRefresh(){
            var items = [];
            that.find(".stringset-inputs").find(".stringset-input:visible").each(function(){
                items.push($(this).val());
            });
            var strSet = that.find(".stringset");
            if(items.length===0){
                strSet.val('');
            }else{
                strSet.val(JSON.stringify(items));
            }
            settings.onRefresh.call(this, strSet.val(), strSet.attr('id'));
        }
    };
})(jQuery);