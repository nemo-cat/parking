$(document).ready(function(){
    /*
        해야할것

        (OK)1. header-nav slide down & up
        2. 메인슬라이드
         2-1. 슬라이드 interval
         2-2. 슬라이드 버튼 click
         2-3. 슬라이드 멈춤 & 재생
        3. quick-menu scroll (모바일에서만)
        (OK)4. 공지사항 tab-menu
    */
   
        /* header */
        $('#menuBtn').click(function()
        {
            resetNav();
            $('nav').stop().slideToggle();
            $('.moblie-nav-bg').toggleClass('active');


            let isActive = $('.moblie-nav-bg').hasClass('active');    
            if(isActive == true)
            {
                $('body').css('overflow', 'hidden');
            }
            else
            {
                $('body').css('overflow', 'visible');
            }
        })

        $('.main-menu > li').click(function()
        {
            resetNav();
            $(this).toggleClass('active');
            $(this).children('.sub-menu').stop().slideToggle();
        })

        //header 클릭요소 초기화
        function resetNav()
        {
            $('.main-menu > li').removeClass('active');
            $('.sub-menu').hide();
        }

        /* 슬라이더 */
        $('.slider')

        /* 일정,공지사항 탭메뉴 */
        $('.tab-header li').click(function()
        {
            $('.tab-header li').removeClass('active');
            $(this).addClass('active');

            let index = $(this).index();
            console.log(index);
            $('.tab-bottom ul').hide();
            $('.tab-bottom ul').eq(index).show();
        })
    /*
        let move = 0;
        $('.quick-menu').on('wheel', function(event) {
            let delta = event.originalEvent.deltaY; // deltaY 값을 가져옵니다.
            if(delta > 0 ){
                move -= 110;
            }
            else {
                move += 110;
            }
           
            console.log("현재 마우스휠값 : " +move)

            $(this).scrollLeft(move);
            
           
            // 가로 스크롤을 deltaY만큼 이동합니다.
            event.preventDefault(); // 기본 스크롤 동작을 막습니다.
        });


        let move = 0;
        $('.quick-menu').on('wheel', function(event) {
            let delta = event.originalEvent.deltaY; // deltaY 값을 가져옵니다.
            
            // 현재 스크롤 위치
            let scrollLeft = $(this).scrollLeft();
            
            if (delta > 0) {
                // 아래로 스크롤 시 스크롤 위치를 이동합니다.
                move += 110;
                if (scrollLeft + $(this).width() >= $(this)[0].scrollWidth) {
                    // 스크롤이 오른쪽 끝에 도달한 경우 이벤트 기본 동작을 막습니다.
                    event.preventDefault();
                }
            } else {
                // 위로 스크롤 시 스크롤 위치를 이동합니다.
                move -= 110;
                if (scrollLeft <= 0) {
                    // 스크롤이 왼쪽 끝에 도달한 경우 이벤트 기본 동작을 막습니다.
                    event.preventDefault();
                }
            }
            
            // 스크롤 위치가 음수이거나 오른쪽 끝에 도달한 경우 스크롤 위치를 보정합니다.
            move = Math.max(0, Math.min(move, $(this)[0].scrollWidth - $(this).width()));
            
            console.log("현재 마우스휠값 : " + move);

            $(this).scrollLeft(move);
        });
        */

        $(window).resize(function()
        {

            $('nav').css('display', 'none');
            $('.moblie-nav-bg').removeClass('active');
            $('body').css('overflow', 'visible');

            if($(window).width() >= 1280)
            {
                $('nav').css('display', 'block');
                $('.sub-menu').hide();
                $('.main-menu').mouseenter(function(){
                    $('.sub-menu').stop().slideDown();
                    $('.nav-bg').stop().slideDown();
                    $('.nav-line').show();
                })

                $('nav').mouseleave(function(){
                    $('.sub-menu').stop().slideUp();
                    $('.nav-bg').stop().slideUp();
                    $('.nav-line').hide();
                })
            } 
     
        });
            
});