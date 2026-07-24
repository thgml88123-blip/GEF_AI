
  // 1. êµ¬ê? ?œíŠ¸ ????URL (ë°°í¬ ??ë°›ì? ì£¼ì†Œ)
  const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwfsq9v-ETmCMPZCR_Zsldw2Q_2rmUIWsZk6zGYfxqAxcdyaAc8AqPG9FuLbehjO5BT/exec";

  // ============================================================
  // ?…â˜…?? ?œì‹ ?¨í‚¤ì§€ ?°ì´??(?¬ê¸°??ì¶”ê??˜ë©´ ?ë™ ë°˜ì˜?©ë‹ˆ??  ?…â˜…??
  // ============================================================
  //
  //  [ì¶”ê? ë°©ë²•]
  //  1) ???¨í‚¤ì§€(?„ì½”?”ì–¸ ë¬¶ìŒ)ë¥?ì¶”ê??˜ë ¤ë©???FORM_PACKAGES ë°°ì—´????ê°ì²´ë¥?ì¶”ê?
  //  2) ê¸°ì¡´ ?¨í‚¤ì§€???œì‹ ?Œì¼??ì¶”ê??˜ë ¤ë©????´ë‹¹ ?¨í‚¤ì§€??files ë°°ì—´????ì¤?ì¶”ê?
  //
  //  badge(ë±ƒì?) ì¢…ë¥˜:  ? ì²­ | ì§„í–‰ | ?˜ë‹¹ | ? ê·œ | ?¤ê³„ | ?„ë£Œ  (?ìœ ë¡?²Œ ì¶”ê? ê°€??
  //
  let FORM_PACKAGES = [];
  let NOTICES = [];
  let QNA_LIST = [];

  // êµ¬ê? ?œíŠ¸(ê³µê°œ)?ì„œ QnA ë¦¬ìŠ¤??ë¶ˆëŸ¬?¤ê¸°
  function loadQnaFromSheet() {
    const SHEET_ID = '1FPC06ZjhCXKIzgX51Zkpfi8VNdz_SAGs302vHUWYEs4';
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=responseHandler:processQnaData&sheet=QnA`;
    const script = document.createElement('script');
    script.src = url;
    document.body.appendChild(script);
  }

  // QnA JSONP ì½œë°±
  window.processQnaData = function(data) {
    try {
      const rows = data.table.rows;
      QNA_LIST = [];
      rows.forEach(row => {
        if(!row || !row.c || !row.c[0] || !row.c[0].v) return;
        const question = row.c[0].v;
        if(question === "ì§ˆë¬¸(Q)") return; // ?¤ë” ë¬´ì‹œ
        
        const answer = row.c[1] && row.c[1].v ? row.c[1].v : '';
        QNA_LIST.push({ question, answer });
      });
      renderQna();
    } catch(e) {
      console.error("QnA ?°ë™ ?¤íŒ¨:", e);
      document.getElementById('qnaAccordion').innerHTML = '<div class="alert alert-danger">QnAë¥?ë¶ˆëŸ¬?¤ì? ëª»í–ˆ?µë‹ˆ?? êµ¬ê? ?œíŠ¸ ê¶Œí•œ???•ì¸??ì£¼ì„¸??</div>';
    }
  };

  // QnA ?„ì½”?”ì–¸ ?Œë”ë§?
  function renderQna() {
    const container = document.getElementById('qnaAccordion');
    if (!container) return;
    
    if (QNA_LIST.length === 0) {
      container.innerHTML = '<div class="text-center text-muted py-4">?±ë¡??Q&Aê°€ ?†ìŠµ?ˆë‹¤.</div>';
      return;
    }
    
    container.innerHTML = '';
    QNA_LIST.forEach((qna, idx) => {
      const accordionId = `qnaItem${idx}`;
      
      const itemHTML = `
        <div class="accordion-item shadow-sm mb-2" style="border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed py-3" type="button" data-bs-toggle="collapse" data-bs-target="#${accordionId}">
              <span class="badge bg-info text-dark me-2">Q</span><span class="fw-bold text-dark">${qna.question}</span>
            </button>
          </h2>
          <div id="${accordionId}" class="accordion-collapse collapse" data-bs-parent="#qnaAccordion">
            <div class="accordion-body bg-light" style="white-space: pre-line; line-height: 1.6; font-size: 0.95rem;">
              <span class="badge bg-secondary me-2">A</span>${qna.answer}
            </div>
          </div>
        </div>`;
      container.innerHTML += itemHTML;
    });
  }

  // êµ¬ê? ?œíŠ¸(ê³µê°œ)?ì„œ ê³µì??¬í•­ ë¦¬ìŠ¤??ë¶ˆëŸ¬?¤ê¸°
  function loadNoticesFromSheet() {
    const SHEET_ID = '1FPC06ZjhCXKIzgX51Zkpfi8VNdz_SAGs302vHUWYEs4';
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=responseHandler:processNoticeData&sheet=ê³µì??¬í•­`;
    const script = document.createElement('script');
    script.src = url;
    document.body.appendChild(script);
  }

  // ê³µì??¬í•­ JSONP ì½œë°±
  window.processNoticeData = function(data) {
    try {
      const rows = data.table.rows;
      NOTICES = [];
      rows.forEach(row => {
        if(!row || !row.c || !row.c[1] || !row.c[1].v) return;
        const title = row.c[1].v;
        if(title === "?œëª©") return; // ?¤ë” ë¬´ì‹œ
        
        const date = row.c[0] && row.c[0].v ? row.c[0].v : '';
        const content = row.c[2] && row.c[2].v ? row.c[2].v : '';
        NOTICES.push({ date, title, content });
      });
      renderNotices();
    } catch(e) {
      console.error("ê³µì??¬í•­ ?°ë™ ?¤íŒ¨:", e);
      document.getElementById('noticeAccordion').innerHTML = '<div class="alert alert-danger">ê³µì??¬í•­??ë¶ˆëŸ¬?¤ì? ëª»í–ˆ?µë‹ˆ?? êµ¬ê? ?œíŠ¸ ê¶Œí•œ???•ì¸??ì£¼ì„¸??</div>';
    }
  };

  // ê³µì??¬í•­ ?„ì½”?”ì–¸ ?Œë”ë§?
  function renderNotices() {
    const container = document.getElementById('noticeAccordion');
    if (!container) return;
    
    if (NOTICES.length === 0) {
      container.innerHTML = '<div class="text-center text-muted py-4">?±ë¡??ê³µì??¬í•­???†ìŠµ?ˆë‹¤.</div>';
      return;
    }
    
    container.innerHTML = '';
    NOTICES.forEach((notice, idx) => {
      const accordionId = `noticeItem${idx}`;
      const isImportant = notice.title.includes('[ì¤‘ìš”]');
      const badgeHTML = isImportant ? `<span class="badge bg-danger me-2">ì¤‘ìš”</span>` : '';
      
      const itemHTML = `
        <div class="accordion-item shadow-sm mb-2" style="border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed py-3" type="button" data-bs-toggle="collapse" data-bs-target="#${accordionId}">
              ${badgeHTML}<span class="fw-bold text-dark">${notice.title}</span>
              <span class="ms-auto text-muted small me-3">${notice.date}</span>
            </button>
          </h2>
          <div id="${accordionId}" class="accordion-collapse collapse" data-bs-parent="#noticeAccordion">
            <div class="accordion-body bg-light" style="white-space: pre-line; line-height: 1.6; font-size: 0.95rem;">
              ${notice.content}
            </div>
          </div>
        </div>`;
      container.innerHTML += itemHTML;
    });
  }

  // êµ¬ê? ?œíŠ¸(ê³µê°œ)?ì„œ ?œì‹ ë¦¬ìŠ¤??ë¶ˆëŸ¬?¤ê¸° (JSONP ë°©ì‹ - CORS ?°íšŒ)
  function loadFormPackagesFromSheet() {
    // ?Œì›?˜ì´ ?ˆë¡œ ì£¼ì‹  ì§„ì§œ êµ¬ê? ?œíŠ¸ ID
    const SHEET_ID = '1FPC06ZjhCXKIzgX51Zkpfi8VNdz_SAGs302vHUWYEs4';
    // êµ¬ê? ?œíŠ¸ ê³ ìœ ??JSONP ì½œë°± ?Œë¼ë¯¸í„° (tqx=responseHandler:ì½œë°±?¨ìˆ˜ëª? ë°?sheet=file (3ë²ˆì§¸ ??
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=responseHandler:processSheetData&sheet=file`;
    
    const script = document.createElement('script');
    script.src = url;
    document.body.appendChild(script);
  }

  // JSONP ì½œë°± ?¨ìˆ˜ (?„ì—­)
  window.processSheetData = function(data) {
    try {
      const rows = data.table.rows;
      let packageMap = {};
      
      rows.forEach(row => {
        if(!row || !row.c || !row.c[0] || !row.c[0].v) return;
        const pkgTitle = row.c[0].v;
        // ?¤ë” ??ê±´ë„ˆ?°ê¸°
        if(pkgTitle === "?Œì¼ ?´ë¦„" || pkgTitle === "?¨í‚¤ì§€ëª?) return; 
        
        const badge = row.c[1] && row.c[1].v ? row.c[1].v : '? ì²­';
        const label = row.c[2] && row.c[2].v ? row.c[2].v : '-';
        const path = row.c[3] && row.c[3].v ? row.c[3].v : '#';
        
        if(!packageMap[pkgTitle]) {
          let icon = 'bi-folder-fill text-dark';
          let color = 'dark';
          let zipLabel = '?„ì²´ ?¨í‚¤ì§€ ?•ì¶•';
          let zipFile = '';
          
          if(pkgTitle.includes('AI?ˆë ¨ ë¡œë“œë§?)) {
             icon = 'bi-diagram-3-fill text-primary'; color = 'primary';
             zipFile = '3.AI?ˆë ¨ì½”ì¹˜/AI?ˆë ¨ë¡œë“œë§??œì‹/AI?ˆë ¨ë¡œë“œë§??œì‹.zip';
          } else if(pkgTitle.includes('PBL')) {
             icon = 'bi-diagram-3-fill text-success'; color = 'success';
             zipLabel = 'PBL ?œì‹ ?„ì²´ë¬¶ìŒ';
          }
          
          packageMap[pkgTitle] = { title: pkgTitle, icon: icon, color: color, zipLabel: zipLabel, zipFile: zipFile, files: [] };
        }
        packageMap[pkgTitle].files.push({ badge, label, path });
      });
      
      FORM_PACKAGES = Object.values(packageMap);
      renderFormPackages(); // ?°ì´??ë¡œë“œ ???”ë©´??ê·¸ë¦¬ê¸?
      
    } catch(e) {
      console.error("êµ¬ê? ?œíŠ¸ ?°ë™ ?¤íŒ¨:", e);
      document.getElementById('fileAccordion').innerHTML = '<div class="alert alert-danger shadow-sm border-0"><i class="bi bi-exclamation-triangle-fill me-2"></i>êµ¬ê? ?œíŠ¸?ì„œ ?œì‹ ë¦¬ìŠ¤?¸ë? ë¶ˆëŸ¬?¤ì? ëª»í–ˆ?µë‹ˆ?? ì£¼ì†Œê°€ ?¬ë°”ë¥¸ì? ?•ì¸??ì£¼ì„¸??</div>';
    }
  };

  // ë±ƒì? ?ìŠ¤????CSS ?´ë˜??ë§¤í•‘ (??ë±ƒì?ë¥??????¬ê¸°??ì¶”ê?)
  const BADGE_STYLES = {
    '? ì²­': 'bg-apply',
    'ì§„í–‰': 'bg-process',
    '?˜ë‹¹': 'bg-payment',
    '? ê·œ': 'bg-apply',
    '?¤ê³„': 'bg-process',
    '?„ë£Œ': 'bg-payment',
  };

  // ?œì‹ ?¨í‚¤ì§€ ???„ì½”?”ì–¸ HTML ?ë™ ?ì„±
  function renderFormPackages() {
    const container = document.getElementById('fileAccordion');
    if (!container) return;
    container.innerHTML = '';

    FORM_PACKAGES.forEach((pkg, idx) => {
      const accordionId = `filePkg${idx}`;
      const filesHTML = pkg.files.map(f => {
        const badgeClass = BADGE_STYLES[f.badge] || 'bg-apply';
        return `<div class="download-item d-flex justify-content-between align-items-center">`
          + `<div><span class="badge-step ${badgeClass}">${f.badge}</span><span class="small text-muted">${f.label}</span></div>`
          + `<a href="${f.path}" download class="text-${pkg.color} text-decoration-none small fw-bold">ë°›ê¸° <i class="bi bi-download"></i></a>`
          + `</div>`;
      }).join('');

      const zipHTML = pkg.zipFile
        ? `<div class="all-download-bar"><span class="small fw-bold text-dark me-auto">${pkg.zipLabel}</span>`
          + `<a href="${pkg.zipFile}" download class="btn btn-${pkg.color} btn-sm px-3 rounded-pill text-white fw-bold shadow-sm">`
          + `<i class="bi bi-archive me-1"></i>?œë²ˆ??ë°›ê¸°</a></div>`
        : '';

      const itemHTML = `
        <div class="accordion-item shadow-sm">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${accordionId}">
              <i class="bi ${pkg.icon} me-2"></i>${pkg.title}
              <span class="badge bg-light text-dark border ms-2" style="font-size:0.7rem">${pkg.files.length}ê±?/span>
            </button>
          </h2>
          <div id="${accordionId}" class="accordion-collapse collapse" data-bs-parent="#fileAccordion">
            <div class="accordion-body bg-white pt-2">
              ${zipHTML}
              ${filesHTML}
            </div>
          </div>
        </div>`;

      container.insertAdjacentHTML('beforeend', itemHTML);
    });
  }

  // 2. ë¡œê·¸??ì²˜ë¦¬ (SHA-256 ?€??êµ¬ê? ?œíŠ¸ ?µì‹ )
async function checkSecureLogin() {
    const id = document.getElementById('userName').value.trim();
    const pw = document.getElementById('userPw').value.trim();
    const loginBtn = document.querySelector('button'); // ë¡œê·¸??ë²„íŠ¼
    
    if (!id || !pw) { alert("?„ì´?”ì? ë¹„ë?ë²ˆí˜¸ë¥??…ë ¥?´ì£¼?¸ìš”."); return; }

    // ??ìµœê³ ê´€ë¦¬ì ?˜ë“œì½”ë”© ?¨ìŠ¤ ??
    if ((id === 'admin' || id === 'ê´€ë¦¬ì') && pw === 'admin') {
      localStorage.setItem('coach_logged_in_user', id);
      localStorage.setItem('login_time', new Date().getTime()); 
      saveAccessLog(id);
      renderAuthorizedScreen(id);
      return;
    }

    loginBtn.innerText = "?¸ì¦ ì¤?..";
    loginBtn.disabled = true;

    try {
      const response = await fetch(`${WEB_APP_URL}?id=${id}&pw=${pw}`);
      const data = await response.json();

      if (data.success) {
        // [?˜ì •] ?±ê³µ ???´ë¦„ê³??¨ê»˜ 'ë¡œê·¸???œê°„'???€?¥í•©?ˆë‹¤.
        localStorage.setItem('coach_logged_in_user', data.name);
        localStorage.setItem('login_time', new Date().getTime()); 
        
        saveAccessLog(data.name);
        renderAuthorizedScreen(data.name);
      } else {
        alert("?„ì´???ëŠ” ë¹„ë?ë²ˆí˜¸ê°€ ?¼ì¹˜?˜ì? ?ŠìŠµ?ˆë‹¤.");
      }
    } catch (error) {
      alert("?œë²„ ?°ê²° ?¤íŒ¨. ?¤ì‹œ ?œë„?´ì£¼?¸ìš”.");
    } finally {
      loginBtn.innerText = "?¸ì¦ ë°??‘ì†?˜ê¸°";
      loginBtn.disabled = false;
    }
  }

  // --- ê¸°ì¡´??ê¸°ëŠ¥?¤ì? ê·¸ë?ë¡?? ì??©ë‹ˆ??---
  
  function renderAuthorizedScreen(username) {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
    
    if (username === "ê´€ë¦¬ì" || username === "admin") {
      document.getElementById('userGreeting').innerHTML = `<i class="bi bi-shield-fill-check text-danger"></i> ìµœê³ ê´€ë¦¬ì ?œìŠ¤???‘ì† ì¤?;
      document.getElementById('admin-log-section').style.display = 'block';
      loadAccessLogsToTable();
    } else {
      document.getElementById('userGreeting').innerHTML = `<i class="bi bi-person-fill text-primary"></i> ${username} ì½”ì¹˜??;
      document.getElementById('admin-log-section').style.display = 'none';
    }
    window.scrollTo(0, 0);
  }

  function handleLogOut() { localStorage.removeItem('coach_logged_in_user'); location.reload(); }

  // êµ¬ê? ?œíŠ¸ë¡??‘ì† ê¸°ë¡???„ì†¡?˜ëŠ” ?¨ìˆ˜
async function saveAccessLog(username) {
  try {
    // ?°ë¦¬ê°€ ?°ê²°??WEB_APP_URLë¡??‘ì† ?•ë³´ë¥?ë³´ëƒ…?ˆë‹¤.
    await fetch(WEB_APP_URL, {
      method: 'POST',
      mode: 'no-cors', // êµ¬ê? ???¤í¬ë¦½íŠ¸ ?µì‹ ???„í•œ ?¤ì •
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: username, time: new Date().toLocaleString('ko-KR') })
    });
  } catch (e) {
    console.log("ê¸°ë¡ ?„ì†¡ ?¤íŒ¨:", e);
  }
}

async function loadAccessLogsToTable() {
  const tBody = document.getElementById('logTableBody');
  // êµ¬ê? ?œíŠ¸?ì„œ ?°ì´?°ë? ê°€?¸ì˜µ?ˆë‹¤ (action=getLogsë¡??”ì²­)
  const response = await fetch(WEB_APP_URL + "?action=getLogs");
  const data = await response.json();
  
  tBody.innerHTML = "";
  if (data.length <= 1) { 
    tBody.innerHTML = `<tr><td colspan="4" class="text-center text-muted">ê¸°ë¡???†ìŠµ?ˆë‹¤.</td></tr>`; 
    return; 
  }
  
  // ìµœì‹ ?œìœ¼ë¡?ì¶œë ¥ (i=1ë¶€???œì‘?˜ë?ë¡???ˆœ ?•ë ¬)
  for(let i = data.length - 1; i > 0; i--) {
    const row = document.createElement('tr');
    row.innerHTML = `<th class="text-center">${i}</th><td>${data[i][0]}</td><td>${data[i][1]}</td><td><span class="badge bg-success">?±ê³µ</span></td>`;
    tBody.appendChild(row);
  }
}

  function clearSystemLogs() {
    if (confirm("ëª¨ë“  ë¡œê·¸??ê¸°ë¡???¬ë§·?˜ì‹œê² ìŠµ?ˆê¹Œ?")) { localStorage.setItem('gef_coach_access_logs', "[]"); loadAccessLogsToTable(); }
  }

  // ?˜ì´ì§€ ë¡œë“œ ??ê¸°ì¡´ ë¡œê·¸???íƒœ ?•ì¸
  window.addEventListener('DOMContentLoaded', () => {
    loadNoticesFromSheet(); // ??ê³µì??¬í•­ ?ë™ ë¶ˆëŸ¬?¤ê¸°
    loadQnaFromSheet();     // ??QnA ?ë™ ë¶ˆëŸ¬?¤ê¸°
    loadFormPackagesFromSheet(); // ???œì‹ ?¨í‚¤ì§€ êµ¬ê? ?œíŠ¸?ì„œ ?ë™ ë¶ˆëŸ¬?¤ê¸°
    
    const cachedUser = localStorage.getItem('coach_logged_in_user');
    const loginTime = localStorage.getItem('login_time');
    
    // ë³´ì•ˆ ê¸°ëŠ¥: ë¡œê·¸????2?œê°„(7200000ms) ê²½ê³¼ ???ë™ ë¡œê·¸?„ì›ƒ
    if (cachedUser && loginTime) {
      const now = new Date().getTime();
      if (now - parseInt(loginTime) > 7200000) {
        alert("ë³´ì•ˆ???„í•´ ?¸ì…˜??ë§Œë£Œ?˜ì–´ ?ë™ ë¡œê·¸?„ì›ƒ ?˜ì—ˆ?µë‹ˆ?? ?¤ì‹œ ë¡œê·¸?¸í•´ ì£¼ì„¸??");
        localStorage.removeItem('coach_logged_in_user');
        localStorage.removeItem('login_time');
      } else {
        renderAuthorizedScreen(cachedUser);
      }
    } else if (cachedUser) {
      renderAuthorizedScreen(cachedUser);
    }
    
    document.getElementById('userPw').addEventListener('keypress', (e) => { if (e.key === 'Enter') checkSecureLogin(); });
    document.getElementById('userName').addEventListener('keypress', (e) => { if (e.key === 'Enter') checkSecureLogin(); });
  });

  function revealSalaryInfo() {
    const gate = document.getElementById('salary-blind-gate');
    const txtContainer = document.getElementById('salary-real-text');
    gate.style.opacity = '0';
    setTimeout(() => { gate.style.display = 'none'; txtContainer.innerHTML = `<p class="h4 fw-bold mb-1 text-primary">ê¸°ì—…??75ë§???/p><p class="small text-muted mb-0">ë³´ê³ ??ìµœì¢… ?¹ì¸ ?„ë£Œ ??10???´ë‚´ ì§€ê¸?/p>`; }, 250);
  }

  function adjustSpecTitle() { document.getElementById('dynamic-nav-title').innerText = "AI ?ˆë ¨ ?œì?ëª¨ë¸ ?ˆë‚´ê´€"; }
  document.getElementById('menu-guide-tab').addEventListener('click', function() { document.getElementById('dynamic-nav-title').innerText = "ì½”ì¹˜ ?„ìš© ê°€?´ë“œê´€"; });

