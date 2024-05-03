$(document).ready(function(){    
     // 최초 1회만 공지사항이 나타나게 하기위해 세션스토리지에 값을 저장함.
     // 세션스토리지에서 noticeCheck값을 가져옴.
     let getNoticeCheck = sessionStorage.getItem('noticeCheck');
     let noticeCheck = false; // 기본값을 false로 설정
     
     // 세션스토리지에 값이 없거나(Null), false가 저장되어있으면 다음 실행
     if (!getNoticeCheck || getNoticeCheck == 'false')
     {
         //세션스토리지에서 noticeCheck값을 false로 저장
         noticeCheck = false;
         sessionStorage.setItem('noticeCheck', noticeCheck);
     }
     else
     {
        //그 외의 경우 공지사항체크를 한것으로 간주하여 noticeCheck의 값을 true로 변경
        noticeCheck = true;
        sessionStorage.setItem('noticeCheck', noticeCheck);
        
     }
 

    // 스크롤 방지 & 맨위로 이동
    function preventScroll(event)
    {
        // 맨 위로 스크롤 이동시킴
        window.scrollTo(0, 0);
        /*
            $('html, body').css overflow hidden으로 스크롤 방지하니까,
            windowWidth = $(window).width();값 계산이 이상하게 돼서
            기본 이벤트를 삭제시켜서 스크롤이안되게함.
        */
        event.preventDefault();
    }

    //공지사항 확인을 안했을경우
    if(!noticeCheck)
    {
        //스크롤 방지 & 공지사항 보임
        document.addEventListener('scroll', preventScroll);
        $('#notice').css('display','block');
    }

    //닫기 버튼 클릭시 공지사항 사라지고, 다른 함수들 작동 시작
    $('.notice-close').click(function()
    {
        //닫기버튼 누르면 공지사항 사라지고, 다시 스크롤이 됨
        $('#notice').css('display','none');
        document.removeEventListener('scroll', preventScroll);

        //공지사항을 체크한것으로 간주하고 noticeCheck값을 true로 변경해줌
        noticeCheck = true;
        //세션스토리지 값도 true로 변경하여 다음에 공지사항이 안나오도록 함.
        sessionStorage.setItem('noticeCheck', noticeCheck);
    })


  
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
        mainSlideIndex++;

        if (isPlaying)
        {
            if( mainSlideIndex == mainSlideCount)
            {
                
                moveMainSlide(windowWidth * mainSlideIndex, 0);
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
    function moveMainSlide(leftPosition, index, time = 300)
    {
        $('.slider-list').animate({ left: -leftPosition + "px" }, time);
        mainSlideBtn(index);
    }


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

        bannerSlideIndex++;

        // 마지막 슬라이드면 다음코드 실행.
        if (bannerSlideIndex == bannerSlideCount)
        {
            moveBannerSlide(-bannerWidth * bannerSlideIndex);
            moveBannerSlide(0 , 0);
            bannerSlideIndex = 0;
        }
        else
        {
            moveBannerSlide(-bannerWidth * bannerSlideIndex);
        }
    }

    // 배너를 이동시키는 함수
    function moveBannerSlide(leftPosition, time = 300)
    {
        $('.banner-list').animate({ left: leftPosition }, time);
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

    /* header */
    resetMenu()
    mobileMenu()
    pcMenu()

    //nav 초기화
    function resetMenu()
    {
        //pc관련 nav 초기화
        $('#pcNav .sub-menu').hide();
        $('.nav-bg').hide();
        $('.nav-line').hide();

        //모바일, 태블릿 관련 nav 초기화
        $('#mobileNav').hide();
        $('.mobile-nav-bg').removeClass('active');
        $('#mobileNav .main-menu > li.active').removeClass('active');
        $('#mobileNav .sub-menu').hide();
        $('#mobileNav .main-menu > li.active').children('.sub-menu').hide();
        $('#mobileNav .main-menu > li.active').removeClass('active');

    }

    //pc버전 nav메뉴
    function pcMenu()
    {
        $('.mobile-nav-bg').removeClass('active');

        //pcNav의 main-menu에 마우스를올리면, sub-menu, nav-bg, nav-line이 나타남
        $('#pcNav .main-menu').mouseenter(function()
        {
            $('#pcNav .sub-menu').stop().slideDown();
            $('.nav-bg').stop().slideDown();
            $('.nav-line').show();
        })

        //pcNav에서 마우스가 떠나면, sub-menu, nav-bg, nav-line이 사라짐
        $('#pcNav').mouseleave(function()
        {
            $('#pcNav .sub-menu').stop().slideUp();
            $('.nav-bg').stop().slideUp();
            $('.nav-line').hide();
        })
    }

    // 태블릿, 모바일버전 nav메뉴
    function mobileMenu()
    {
        //menuBtn 누르면 다음 실행
        $('#menuBtn').click(function()
        {
            // main-menu li에 active가 달려있으면 active삭제하고, sub-menu를 숨김
            $('#mobileNav .main-menu > li.active').removeClass('active');
            $('#mobileNav .sub-menu').hide();

            // mobileNav와 bg를 slideToggle시킴.
            $('#mobileNav').stop().slideToggle();
            $('.mobile-nav-bg').toggleClass('active');
        })

        //main-menu의 li클릭시
        $('#mobileNav .main-menu > li').click(function()
        {
            // li클릭할때마다 true로 초기화
            let isActive = true;

            // this에 active가 있으면, false로 바꿔서 if(isActive)가 실행 안되도록함
            if( $(this).hasClass('active') )
            { 
                isActive = false;
            }

            // 현재 클릭한 li 외의 다른 active가 달린 li의 sub-menu를 접고, class active를 삭제함
            $('#mobileNav .main-menu > li.active').children('.sub-menu').stop().slideUp();
            $('#mobileNav .main-menu > li.active').removeClass('active');
            
            // this에 class active주고 sub-menu slidedown시킴
            if(isActive)
            {
                $(this).addClass('active');  
                $(this).children('.sub-menu').stop().slideDown();
            }
        })
    }

    $(window).resize(function()
    { 
        setTimeout(()=>{
            windowWidth = $(window).width();
            
            moveMainSlide(windowWidth * mainSlideIndex, mainSlideIndex ,0);

            bannerWidth = parseFloat($('.banner-list li').css('width')) + 20;
            //초기화 (영역에 맞도록 즉시 초기화)
            moveBannerSlide(-bannerWidth * bannerSlideIndex, 0);

            resetMenu();//Menu 초기화

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
                // quick메뉴 가로 스크롤 해제
                $('.quick-inner').off('mousewheel');
            }
        }, 100)
    }).resize(); 
});