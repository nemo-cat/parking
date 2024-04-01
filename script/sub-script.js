$(document).ready(function(){
      /* 서브페이지 */
      $('.answer').hide();

      // 질문(.question) 클릭 이벤트 처리
      $('.question').click(function() {
          // 모든 질문과 답변의 활성 클래스 제거 및 모든 답변 숨기기
  
          $('.question.active').next('.answer').hide();
          $('.question.active').removeClass('active');
  
          // 클릭된 질문에 활성 클래스 추가
          $(this).addClass('active');
  
          // 클릭된 질문의 다음 요소인 답변을 슬라이드 다운
          $(this).next('.answer').show();
      });

      $('.category li').click(function()
      {
        $('.category li.active').removeClass('active');
        $(this).addClass('active');
      })
})