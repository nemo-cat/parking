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
        let slidewidth = $(window).width();
        let moveLeft = 0;
        let slideLiCount = $('.slider-list li').length;
        let slideIndex = 0;
        let slideInterval;
    
        // 초기 슬라이드 실행
        startSlide();
    
        // 슬라이드 시작 함수
        function startSlide()
        {
            slideInterval = setInterval(function()
            {
                mainSlide(slidewidth);
            }, 3000);
        }
    
        // 메인 슬라이드 함수
        function mainSlide(slidewidth)
        {
            if (slideIndex < slideLiCount - 1)
            {
                moveLeft -= slidewidth;
                $('.slider-list').stop().animate({left: moveLeft}, 500);
                slideIndex++;
            }
            else
            {
                $('.slider-list').stop().animate({left: 0}, 500);
                moveLeft = 0;
                slideIndex = 0;
            }
            mainSlideBtn(slideIndex);
        }
    
        // 슬라이드 버튼 함수
        function mainSlideBtn(slideIndex)
        {
            $('.slider-btn li').removeClass('active');
            $('.slider-btn li').eq(slideIndex).addClass('active');
        }
    
        // 슬라이드 버튼 클릭 이벤트
        $('.slider-btn li').click(function()
        {
            let btnIndex = $(this).index();
            $('.slider-btn li').removeClass('active');
            $('.slider-btn li').eq(btnIndex).addClass('active');
            $('.slider-btn button').attr('class', 'play');
            moveSlide(btnIndex);
        });
    
        // 슬라이드 이동 함수
        function moveSlide(btnIndex)
        {
            clearInterval(slideInterval);
            let slidePosition = -btnIndex * slidewidth;
            $('.slider-list').stop().animate({left: slidePosition}, 500);
            slideIndex = btnIndex;
            startSlide();
        }
    
        // 슬라이드 멈춤, 재생 버튼 클릭 이벤트
        $('.slider-btn button').click(function()
        {
            let isStop = $(this).hasClass('play');
            if (isStop)
            {
                // 슬라이드 멈춤
                clearInterval(slideInterval);
                $(this).attr('class', 'stop');
            }
            else
            {
                // 슬라이드 재생
                startSlide();
                $(this).attr('class', 'play');
            }
        });


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

        /* 배너 슬라이드 */
        let bannerwidth = parseFloat($('.banner-list li').css('width')) + 20;
        console.log(bannerwidth);
        let bannerLeft = 0;
        let bannerLiCount = $('.banner-list li').length;
        let bannerIndex = 0;
        let bannerInterval;
    
        // 초기 슬라이드 실행
        startBannerSlide();
    
        // 슬라이드 시작 함수
        function startBannerSlide()
        {
            bannerInterval = setInterval(function()
            {
                bannerSlide(bannerwidth);
            }, 3000);
        }
    
        // 메인 슬라이드 함수
        function bannerSlide(bannerwidth)
        {
            if (bannerIndex < bannerLiCount - 1)
            {
                bannerLeft -= bannerwidth;
                $('.banner-list').stop().animate({left: bannerLeft}, 500);
                bannerIndex++;
            }
            else
            {
                $('.banner-list').stop().animate({left: 0}, 500);
                bannerLeft = 0;
                bannerIndex = 0;
            }
        }

        /* 터치이벤트 */
        let touchStartX = 0;// 터치 시작 좌표를 저장하는 변수
        let touchEndX = 0;// 터치 끝 좌표를 저장하는 변수
        let touchDiff = 0;// 터치 이동 거리를 저장하는 변수
    
         // 터치 시작 이벤트 처리
        $('.banner-inner li').on('touchstart', function(event)
        {
            touchStartX = event.touches[0].clientX;
        });
    
        // 터치 이동 이벤트 처리
        $('.banner-inner li').on('touchmove', function(event)
        {
            touchEndX = event.touches[0].clientX;
            touchDiff = touchStartX - touchEndX;
        });
    
        // 터치 끝 이벤트 처리
        $('.banner-list li').on('touchend', function(event)
        {
            if (touchDiff > 50)
            {
                // 오른쪽으로 터치하면 다음 슬라이드를 보여줌
                bannerIndex++;
                if (bannerIndex >= bannerLiCount)
                {
                    bannerIndex = 0;
                }
            }
            else if (touchDiff < -50)
            {
                // 왼쪽으로 터치하면 이전 슬라이드를 보여줌
                bannerIndex--;
                if (bannerIndex < 0)
                {
                    bannerIndex = bannerLiCount - 1;
                }
            }
        
            // 터치로 인한 슬라이드 변경 후 처리
            clearInterval(bannerInterval);
            bannerInterval = setInterval(function()
            {
                bannerSlide(bannerwidth);
            }, 3000);
            
            let bannerPosition = bannerIndex * bannerwidth;
             $('.banner-list').stop().animate({left: bannerPosition}, 500);
        
            // 초기화
            touchStartX = 0;
            touchEndX = 0;
            touchDiff = 0;
        });
    
         // 창 크기 변경 이벤트
         $(window).resize(function()
         {
             $('nav').css('display', 'none');
             $('.moblie-nav-bg').removeClass('active');
             $('body').css('overflow', 'visible');
     
             /* 슬라이드 재설정*/
             slidewidth = $(window).width();
             clearInterval(slideInterval);
             let slidePosition = slideIndex * slidewidth;
             $('.slider-list').stop().animate({left: -slidePosition}, 500);
             startBannerSlide();

             /* 배너 재설정 */
             bannerwidth = parseFloat($('.banner-list li').css('width')) + 20;
             clearInterval(bannerInterval);
             let bannerPosition = bannerIndex * bannerwidth;
             $('.banner-list').stop().animate({left: bannerPosition}, 500);
             startSlide();
     
             if ($(window).width() >= 1280) {
                 // pc버전
                 $('nav').css('display', 'block');
                 $('.sub-menu').hide();
     
                 $('.main-menu').mouseenter(function() {
                     $('.sub-menu').stop().slideDown();
                     $('.nav-bg').stop().slideDown();
                     $('.nav-line').show();
                 });
     
                 $('nav').mouseleave(function() {
                     $('.sub-menu').stop().slideUp();
                     $('.nav-bg').stop().slideUp();
                     $('.nav-line').hide();
                 });
             } else if ($(window).width() >= 768) {
                 // 태블릿버전
             }
         });
     
    

      
                
});