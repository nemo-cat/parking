$(document).ready(function(){
    /* 메인 슬라이드 */
    let slideInterval = 2000; // 슬라이드 속도 : 메인슬라이드, 배너슬라이드

    let mainSlideIndex = 0;
    let mainSlideCount = $('.slider-list li').length;
    
   $('.slider-list li').eq(0).appendTo('.slider-list');
    let windowWidth = $(window).width();
    let isPlaying = true; // 슬라이드 재생 여부를 나타내는 변수
    let mainSlideInterval = setInterval(mainSlide, slideInterval);

    
    //메인 슬라이드 함수
    function mainSlide()
    {
        /*
        마지막슬라이드 -> 첫번째 슬라이드를 자연스럽게 연결되도록 하고싶은데,
        위에 메인슬라이드에 썼던 나머지값을 구해서 index로 쓰면, 마지막 슬라이드에서 index값이 무조건 0이되기때문에
        여기서는 인덱스++를 사용함
        */
        mainSlideIndex++;

        if (isPlaying)
        {
            if( mainSlideIndex == mainSlideCount)
            {
                
                moveMainSlide(windowWidth * mainSlideIndex,0);
                $('.slider-list').animate({ left: 0 }, 0);
                $('.slider-btn span').eq(0).addClass('active');
                mainSlideIndex = 0;
            }
            else
            {
                moveMainSlide(windowWidth * mainSlideIndex, mainSlideIndex);
            }
        }
    }

    // 배너를 이동시키는 함수
    function moveMainSlide(leftPosition, index)
    {
        $('.slider-list').animate({ left: -leftPosition + "px" }, 300);
        mainSlideBtn(index);
    }

  /*   function mainSlide()
    {
        if (isPlaying)
        {
            //
               ( 현재 슬라이드 인덱스 + 1 ) % 전체 슬라이드갯수 로 하면,
               마지막 슬라이드 일때 나머지 값이 0 이기 때문에 자동으로 첫번째 슬라이드가 나옴
            
               현재 슬라이드 인덱스++로 쓰면, if문을 통해서 현재 슬라이드 인덱스 == 전체 슬라이드 갯수 일때를 처리해줘야해서
               더 유용해보인다(?)
            mainSlideIndex = (mainSlideIndex + 1) % mainSlideCount;
            moveMainSlide(windowWidth * mainSlideIndex, mainSlideIndex);
        }
    }
    
    // 슬라이드를 왼쪽으로 이동시키는 함수
    function moveMainSlide(leftPosition, index)
    {
        $('.slider-list').animate({ left: -leftPosition + "px" }, 300);
        mainSlideBtn(index);
    }
     */
    // 슬라이드 버튼에 class를 주는 함수
    function mainSlideBtn(index)
    {
        $('.slider-btn span').removeClass('active');
        $('.slider-btn span').eq(index).addClass('active');
    }
    
    // 슬라이드 버튼 클릭시, 해당 슬라이드가 보이게함
    $('.slider-btn span').click(function()
    {
        let clickIdx = $(this).index();
        //setinterval초기화
        clearInterval(mainSlideInterval);
        mainSlideInterval = setInterval(mainSlide, slideInterval);

        //클릭한 li기준으로 슬라이드
        moveMainSlide(windowWidth * clickIdx, clickIdx);
        mainSlideIndex = clickIdx;

        //만약에 슬라이드가 stop일 경우, slider-btn을 누르면 다시 play되게함
        isPlaying = true;
        $('.slider-btn button').removeClass('stop').addClass('play');
    });
    
    // 슬라이드 플레이/스탑
    $('.slider-btn button').click(function()
    {
        if ($(this).hasClass('play'))
        {
            //슬라이드 stop
            $(this).removeClass('play').addClass('stop');
            isPlaying = false;
        }
        else
        {
            //슬라이드 play
            $(this).removeClass('stop').addClass('play');
            isPlaying = true;
        }
    });

     // 슬라이드에 마우스 올리면 슬라이드정지
     $('.slider').mouseenter(function()
     {
         clearInterval(mainSlideInterval);
     })
 
     // 슬라이드에 마우스가 떠나면 다시 슬라이드 재개
     $('.slider').mouseleave(function()
     {
        mainSlideInterval = setInterval(mainSlide, slideInterval);
     });

    // 터치 슬라이드 기능 추가
    let touchstartX = 0; //터치가 시작되는 x좌표 저장
    let touchendX = 0; //터치가 끝나는 x좌표 저장

    $('.slider-list').on('touchstart', function(event)
    {
        touchstartX = event.changedTouches[0].screenX;
    });

    $('.slider-list').on('touchend', function(event)
    {
        touchendX = event.changedTouches[0].screenX;
        touchMainSlide();
    });

    function touchMainSlide()
    {
        if (touchendX < touchstartX)
        {
            //다음 슬라이드로 이동
            mainSlide();
        }
        else if (touchendX > touchstartX)
        {
            //이전 슬라이드로 이동
            mainSlideIndex = (mainSlideIndex - 1 + mainSlideCount) % mainSlideCount;
            moveMainSlide(windowWidth * mainSlideIndex, mainSlideIndex);
        }

        //setinterval초기화
        clearInterval(mainSlideInterval);
        mainSlideInterval = setInterval(mainSlide, slideInterval);
        //만약에 슬라이드가 stop일 경우, 터치슬라이드가 되면 다시 play되게함
        isPlaying = true;
        $('.slider-btn button').removeClass('stop').addClass('play');
    }


    /* 일정정보, 공지사항 tab-menu */
    $('.tab-header > li').click(function()
    {
        $('.tab-header > li').removeClass('active');
        $(this).addClass('active');

        let thisIdx = $(this).index();
        $('.tab-bottom ul').hide();
        $('.tab-bottom ul').eq(thisIdx).show();
    })

    $('#gotoNotice').click(function()
    {
        window.location.href = 'guide07.html';
    })


    /* 배너영역 슬라이드 */
    let bannerSlideIndex = 0;
    let bannerSlideCount = $('.banner-list li').length;
    let bannerWidth = parseFloat($('.banner-list li').css('width')) + 20;
    let bannerSlideInterval = setInterval(bannerSlide, slideInterval);

    // 마지막 배너가 슬라이드되면 첫 번째 배너로 자연스럽게 이동하도록 클론 추가
    $('.banner-list li').eq(0).clone().appendTo('.banner-list');
    $('.banner-list li').eq(1).clone().appendTo('.banner-list');

    // 배너 슬라이드 함수
    function bannerSlide()
    {
        /*
        마지막슬라이드 -> 첫번째 슬라이드를 자연스럽게 연결되도록 하고싶은데,
        위에 메인슬라이드에 썼던 나머지값을 구해서 index로 쓰면, 마지막 슬라이드에서 index값이 무조건 0이되기때문에
        여기서는 인덱스++를 사용함
        */
        bannerSlideIndex++;

        // 마지막 슬라이드면 다음코드 실행.
        if (bannerSlideIndex == bannerSlideCount)
        {
            moveBannerSlide(-bannerWidth * bannerSlideIndex);
            $('.banner-list').animate({ left: 0 }, 0);
            bannerSlideIndex = 0;
        }
        else
        {
            moveBannerSlide(-bannerWidth * bannerSlideIndex);
        }
    }

    // 배너를 이동시키는 함수
    function moveBannerSlide(leftPosition)
    {
        $('.banner-list').animate({ left: leftPosition }, 300);
    }

    // 배너에 마우스 올리면 슬라이드정지
    $('.banner').mouseenter(function()
    {
        clearInterval(bannerSlideInterval);
    })

    // 배너에 마우스가 떠나면 다시 슬라이드 재개
    $('.banner').mouseleave(function()
    {
        bannerSlideInterval = setInterval(bannerSlide, slideInterval);
    });

    // 배너 터치슬라이드
    let bannerTouchstartX = 0; //터치가 시작되는 x좌표 저장
    let bannerTouchendX = 0; //터치가 끝나는 x좌표 저장

    $('.banner-list').on('touchstart', function(event)
    {
        touchstartX = event.changedTouches[0].screenX;
    });

    $('.banner-list').on('touchend', function(event)
    {
        touchendX = event.changedTouches[0].screenX;
        touchBannerSlide();
    });

    function touchBannerSlide()
    {
        if (touchendX < touchstartX)
        {
            //다음 슬라이드로 이동
            bannerSlide();
        }
        else if (touchendX > touchstartX)
        {
            //이전 슬라이드로 이동
            bannerSlideIndex = bannerSlideIndex - 1;
            if (bannerSlideIndex < 0)
            {
                // 첫번째 슬라이드면, 마지막 슬라이드로 이동
                bannerSlideIndex = bannerSlideCount - 1;
                moveBannerSlide(-bannerWidth * bannerSlideIndex);
            }
            else
            {
                moveBannerSlide(-bannerWidth * bannerSlideIndex);
            }
        }

        //setinterval초기화
        clearInterval(bannerSlideInterval);
        bannerSlideInterval = setInterval(bannerSlide, slideInterval);
    }

    /* 서브페이지 */
    $('.answer').hide();

    // 질문(.question) 클릭 이벤트 처리
    $('.question').click(function() {
        // 모든 질문과 답변의 활성 클래스 제거 및 모든 답변 숨기기
        $('.question').removeClass('active');
        $('.answer').slideUp(300);

        // 클릭된 질문에 활성 클래스 추가
        $(this).addClass('active');

        // 클릭된 질문의 다음 요소인 답변을 슬라이드 다운
        $(this).next('.answer').slideDown(300);
    });



    $(window).resize(function()
    { 
        console.log('resize!');
        windowWidth = $(window).width();
        //setinterval초기화
        clearInterval(mainSlideInterval);
        mainSlideInterval = setInterval(mainSlide, slideInterval);

        
        bannerWidth = parseFloat($('.banner-list li').css('width')) + 20;
        clearInterval(bannerSlideInterval)
        bannerSlideInterval = setInterval(bannerSlide, slideInterval);

        if (window.innerWidth < 768)
        {
            // quick메뉴 가로 스크롤
            $('.quick-inner').on('mousewheel',function(event)
            {
                this.scrollLeft -= (event.originalEvent.wheelDelta / 2);
                event.preventDefault(); // 브라우저 스크롤 방지
            });
        }
        else if (window.innerWidth < 1280)
        {
            //디바이스 크기가 768px 미만일때
        
            /* header */
            $('#menuBtn').click(function()
            {
                
                // 요소 초기화
                $('.sub-menu').hide();
                $('.main-menu > li').removeClass('active');

                $('nav').stop().slideToggle();
                $('.moblie-nav-bg').toggleClass('active');
            })

            $('.main-menu > li').click(function()
            {
                $(this).siblings().removeClass('active');
                $(this).toggleClass('active');  

                $('.sub-menu').stop().slideUp();
                $(this).children('.sub-menu').stop().slideToggle();
            })
        }
        else if ( window.innerWidth >= 1280 )
        {
            //디바이스 크기가 1024px 미만일때
            
            $('.moblie-nav-bg').removeClass('active');

            $('.main-menu').mouseenter(function()
            {
                $('.sub-menu').stop().slideDown();
                $('.nav-bg').stop().slideDown();
                $('.nav-line').show();
            })

            $('nav').mouseleave(function()
            {
                $('.sub-menu').stop().slideUp();
                $('.nav-bg').stop().slideUp();
                $('.nav-line').hide();
            })
        }
    
    }).resize(); 
});