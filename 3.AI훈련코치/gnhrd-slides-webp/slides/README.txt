GNHRD-GeAI(26v3) 발표자료 스크롤 뷰어 — 적용 안내
==================================================

1. index.html 한 파일만 웹서버에 올리면 바로 동작합니다. (외부 라이브러리 없음 · 슬라이드 이미지 내장)

2. PDF 내려받기 버튼은 index.html과 같은 폴더의 파일을 가리킵니다.
   <a href="GNHRD_GeAI_업무자동화_직무훈련체계_발표자료_0710.pdf" download>
   같은 폴더에 PDF를 넣거나 경로만 수정하세요.

3. 슬라이드 이미지만 따로 호스팅하려면 slides/ 폴더의 webp 19장을 업로드한 뒤
   <img src="data:image/webp;base64,..."> 를  <img src="/slides/pg-01.webp"> 로 교체하세요.
   페이지 용량이 약 1.7MB → 60KB 수준으로 줄어듭니다(스크롤 시 로딩).

4. 발표자료 내용이 바뀌면 webp 이미지를 교체하고 build.py를 다시 실행하세요.
   (필요 패키지: python3, poppler-utils, Pillow)

5. 뷰어 기능
   - 세로 스크롤: 19페이지가 이어서 표시 (모바일 대응)
   - 좌측 진행 레일: 현재 페이지 번호 + 진행 바 (1024px 이하에서는 상단 pill로 축소)
   - 페이지 클릭: 확대 보기(라이트박스), ←/→ 이동, ESC 닫기
   - 스크롤 진입 시 각 페이지 페이드 인 (prefers-reduced-motion 시 비활성)

6. 다른 콘텐츠에 재사용할 때
   HTML의  <section class="stage" id="deck"> ... </section>  블록과
   <style> 안의 "document stage" 주석 구간, 스크립트의 rail/lightbox 부분을 그대로 복사하면
   다른 PDF 발표자료에도 같은 스크롤 뷰어를 붙일 수 있습니다.
