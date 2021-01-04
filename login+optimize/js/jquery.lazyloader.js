(function() {
    $.fn.extend({
        lazyLoad: function() {
            var that = this
            showRealImage(this)
            $(window).scroll(function(){
                showRealImage(that)
            })
        }
    })

    function showRealImage($eleList){
        if(!$eleList || !$eleList.length){
            return
        }
        $eleList.filter((i, ele)=>{
            var $img = $(ele)
            return !$img.attr('loaded') && isInSight($img) && ele.nodeName.toLowerCase() === 'img'
        }).each(function(i,ele){
            var $img = $(ele)
            var source = $img.data('lazysrc')
            if(source){
                $img.attr('src', source)
            }
            $img.attr('loaded', true)
        })

        function isInSight($node){
            return ($node.offset().top - 100) <= $(window).height()+$(window).scrollTop();
        }
    }
})()