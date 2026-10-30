
const cards=document.querySelector('#cards'), search=document.querySelector('#search'), dialog=document.querySelector('#detail');
let filter='전체', presenterFilter='', viewMode='list', currentPage=1;
const PAGE_SIZE=10;
const pagination=document.createElement('nav');
pagination.className='pagination';
pagination.setAttribute('aria-label','게시물 페이지');
document.querySelector('.archive-end').after(pagination);
const escapeHTML=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function safeURL(value){if(!value)return '';try{const url=new URL(value,location.href);return ['https:','http:'].includes(url.protocol)?url.href:'';}catch{return '';}}
const link=(url,label)=>{const safe=safeURL(url);return safe?`<a class="resource-link" href="${escapeHTML(safe)}" target="_blank" rel="noopener noreferrer">${label} ↗</a>`:'';};
function getTopics(post){return [...new Set((Array.isArray(post.topic)?post.topic:[post.topic]).filter(t=>typeof t==='string').map(t=>t.trim()).filter(Boolean))];}
const markdown=new marked.Marked({gfm:true,breaks:true,renderer:{
 html({text}){return escapeHTML(text);},
 link({href,tokens}){const label=this.parser.parseInline(tokens);const url=safeURL(href);return url?`<a href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">${label}</a>`:label;},
 image({href,text}){const url=safeURL(href);return url?`<img src="${escapeHTML(url)}" alt="${escapeHTML(text)}" loading="lazy">`:escapeHTML(text);}
}});
function discussionSection(text){return `<h3>Discussion</h3><div class="markdown-body">${markdown.parse(String(text||'To be added.'))}</div>`;}
const comparePosts=(a,b)=>(b.date||'').localeCompare(a.date||'')||String(a.presenter||'').localeCompare(String(b.presenter||''),'ko')||String(a.id).localeCompare(String(b.id));
function sessionNumber(post){const n=String(post.number??'').trim();return /^\d+$/.test(n)?String(Number(n)):n;}
function sessionKey(post){return `${post.date||'undated'}:${sessionNumber(post)||'unassigned'}`;}
function groupPosts(items,keyOf){
 const groups=new Map();
 [...items].sort(comparePosts).forEach(post=>{const key=keyOf(post);if(!groups.has(key))groups.set(key,{key,date:post.date,number:sessionNumber(post),posts:[]});groups.get(key).posts.push(post);});
 return [...groups.values()];
}
const sessionLabel=group=>group.number?`#${group.number}`:'회차 미정';
const dateLabel=date=>date||'발표일 미정';
const paperURL=id=>'#paper='+encodeURIComponent(id);
const sessionURL=key=>'#session='+encodeURIComponent(key);
function matchesPost(post){
 const q=search.value.trim().toLowerCase();
 return (filter==='전체'||getTopics(post).includes(filter))&&(!presenterFilter||post.presenter===presenterFilter)&&[post.title,post.subtitle,...getTopics(post),post.presenter,post.date,sessionNumber(post)].join(' ').toLowerCase().includes(q);
}
function sessionCard(group){
 return `<a class="session-card" href="${sessionURL(group.key)}" aria-label="${escapeHTML(sessionLabel(group))} · ${escapeHTML(dateLabel(group.date))} 회차 전체 보기">
 <span class="session-top"><span class="session-number">${escapeHTML(sessionLabel(group))}</span><span class="session-date">${escapeHTML(dateLabel(group.date))}</span></span>
 <span class="session-papers">${group.posts.map(p=>`<span class="session-paper"><strong>${escapeHTML(p.presenter||'발표자 미정')}</strong><span class="paper-divider" aria-hidden="true">|</span><span>${escapeHTML(p.title)}</span></span>`).join('')}</span>
 <span class="session-bottom"><span>회차 전체 보기</span><span aria-hidden="true">↗</span></span></a>`;
}
function paperRow(p){
 return `<a class="post-row" href="${paperURL(p.id)}" aria-label="${escapeHTML(p.title)} — ${escapeHTML(p.presenter)} 기록 열기"><span class="post-main"><span class="tags">${getTopics(p).map(t=>`<span class="tag">${escapeHTML(t)}</span>`).join('')}${p.example?'<span class="example">예시 게시물</span>':''}</span><span class="post-title">${escapeHTML(p.title)}</span><span class="post-summary">${escapeHTML(p.subtitle||'')}</span></span><span class="post-presenter">${escapeHTML(p.presenter||'발표자 미정')}</span><span class="post-arrow" aria-hidden="true">↗</span></a>`;
}
function render(){
 const selected=posts.filter(matchesPost).sort(comparePosts);
 // Paginate whole sessions/date groups so a shared date never splits across pages.
 const groups=groupPosts(selected,viewMode==='sessions'?sessionKey:p=>p.date||'undated');
 const totalPages=Math.max(1,Math.ceil(groups.length/PAGE_SIZE));
 currentPage=Math.min(currentPage,totalPages);
 const visible=groups.slice((currentPage-1)*PAGE_SIZE,currentPage*PAGE_SIZE);
 cards.className=viewMode==='sessions'?'session-grid':'archive-list';
 cards.innerHTML=viewMode==='sessions'?visible.map(sessionCard).join(''):visible.map(g=>`<section class="date-group" aria-label="${escapeHTML(dateLabel(g.date))} 발표"><div class="date-cell">${g.date?`<time datetime="${escapeHTML(g.date)}">${escapeHTML(g.date)}</time>`:'발표일 미정'}</div><div class="date-papers">${g.posts.map(paperRow).join('')}</div></section>`).join('');
 document.querySelector('#empty').hidden=selected.length>0;
 document.querySelector('#result-count').textContent=viewMode==='sessions'?`${groups.length}개 회차 · ${selected.length}개 발표`:`${selected.length}개 발표 · ${groups.length}개 날짜`;
 pagination.hidden=totalPages<=1;
 const pageButton=(page,label,disabled=false)=>`<button type="button" data-number="${page}" ${disabled?'disabled':''} ${page===currentPage&&typeof label==='number'?'aria-current="page"':''} aria-label="${typeof label==='number'?`${page}페이지`:label}">${label}</button>`;
 const numbers=Array.from({length:totalPages},(_,i)=>i+1).filter(n=>n===1||n===totalPages||Math.abs(n-currentPage)<=1);
 pagination.innerHTML=pageButton(currentPage-1,'이전',currentPage===1)+numbers.map((n,i)=>(i&&n-numbers[i-1]>1?'<span aria-hidden="true">…</span>':'')+pageButton(n,n)).join('')+pageButton(currentPage+1,'다음',currentPage===totalPages);
 pagination.querySelectorAll('button').forEach(b=>b.onclick=()=>{currentPage=Number(b.dataset.number);render();cards.focus({preventScroll:true});cards.scrollIntoView({block:'start'});});
}
function section(title,text){return `<h3>${title}</h3><p class="note-text">${escapeHTML(text||'To be added.')}</p>`;}
function displayDetail(html){
 document.querySelector('#article').innerHTML=html;
 if(!dialog.open)dialog.showModal();
 dialog.scrollTop=0;
 document.querySelector('#article').scrollTop=0;
 document.body.style.overflow='hidden';
 document.querySelector('#detail-title').focus({preventScroll:true});
}
function openPost(id){
 const p=posts.find(p=>p.id===id);
 if(!p){displayDetail('<h2 id="detail-title" tabindex="-1">발표를 찾을 수 없습니다</h2><a class="resource-link" href="#archive">아카이브로 돌아가기</a>');return;}
 const pdf=safeURL(p.pdf);
 displayDetail(`<a class="detail-back" href="${sessionURL(sessionKey(p))}">← ${escapeHTML(sessionNumber(p)?'#'+sessionNumber(p):'해당')} 회차 보기</a><div class="tags">${getTopics(p).map(t=>`<span class="note-label">${escapeHTML(t)}</span>`).join('')}${p.example?'<span class="example">Example</span>':''}</div><h2 id="detail-title" tabindex="-1">${escapeHTML(p.title)}</h2><div class="article-meta">${escapeHTML(p.presenter)} · ${escapeHTML(dateLabel(p.date))}</div><dl class="paper-info"><div><dt>Authors</dt><dd>${escapeHTML(p.author||'To be added.')}</dd></div><div><dt>Venue</dt><dd>${escapeHTML(p.venue||'To be added.')}</dd></div></dl><div class="resource-links">${link(p.paper,'Paper')}${link(p.code,'Code')}</div>${section('Summary',p.summary||p.subtitle)}<h3>Presentation Slides</h3>${pdf?`${link(pdf,'Open / Download PDF')}<object class="pdf-viewer" data="${escapeHTML(pdf)}" type="application/pdf"><p>If the preview is unavailable, use the PDF link above.</p></object>`:'<div class="placeholder">Presentation PDF to be added.</div>'}${discussionSection(p.discussion)}`);
}
function openSession(key){
 const group=groupPosts(posts,sessionKey).find(g=>g.key===key);
 if(!group){displayDetail('<h2 id="detail-title" tabindex="-1">회차를 찾을 수 없습니다</h2><a class="resource-link" href="#archive">아카이브로 돌아가기</a>');return;}
 displayDetail(`<p class="eyebrow">STUDY SESSION</p><h2 id="detail-title" tabindex="-1">${escapeHTML(sessionLabel(group))}</h2><div class="article-meta">${escapeHTML(dateLabel(group.date))} · ${group.posts.length}개 발표</div><div class="session-links">${group.posts.map(p=>`<a class="session-paper-link" href="${paperURL(p.id)}"><span class="session-link-presenter">${escapeHTML(p.presenter||'발표자 미정')}</span><span><strong>${escapeHTML(p.title)}</strong><span class="post-summary">${escapeHTML(p.subtitle||'')}</span></span><span aria-hidden="true">↗</span></a>`).join('')}</div>`);
}
dialog.addEventListener('close',()=>{document.body.style.overflow='';if(/^#(?:paper|session)=/.test(location.hash))location.hash='archive';});
document.querySelector('#close').onclick=()=>dialog.close();
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
search.addEventListener('input',()=>{currentPage=1;render();});
// Topic filters: primary topics first, then frequency, then alphabetical order.
const FILTER_LIMIT=7; // Includes the always-visible '전체' filter.
let filtersExpanded=false;
const topicStats=new Map();
posts.forEach(post=>{
 const list=getTopics(post);
 list.forEach((topic,index)=>{
  if(!topicStats.has(topic))topicStats.set(topic,{primary:false,count:0});
  const stats=topicStats.get(topic);
  stats.count++;
  if(index===0)stats.primary=true;
 });
});
const sortedTopics=[...topicStats.keys()].filter(t=>t!=='전체').sort((a,b)=>{
 const x=topicStats.get(a),y=topicStats.get(b);
 return Number(y.primary)-Number(x.primary)||y.count-x.count||a.localeCompare(b,'en');
});
const filtersEl=document.querySelector('.filters');
function renderFilters(){
 const initial=sortedTopics.slice(0,FILTER_LIMIT-1);
 const visible=filtersExpanded?sortedTopics:[...initial];
 // Keep an active topic visible even when the list is collapsed.
 if(!filtersExpanded&&filter!=='전체'&&!visible.includes(filter))visible.push(filter);
 const filterButton=topic=>`<button type="button" data-filter="${escapeHTML(topic)}" class="${filter===topic?'active':''}" aria-pressed="${filter===topic}">${escapeHTML(topic)}</button>`;
 const hiddenCount=sortedTopics.length-initial.length;
 filtersEl.innerHTML=filterButton('전체')+visible.map(filterButton).join('')+
  (hiddenCount>0?`<button type="button" data-toggle-topics aria-expanded="${filtersExpanded}" aria-label="${filtersExpanded?'키워드 목록 접기':`숨겨진 키워드 ${hiddenCount}개 모두 보기`}">${filtersExpanded?'− Less':`+ More (${hiddenCount})`}</button>`:'');
}
filtersEl.addEventListener('click',event=>{
 const button=event.target.closest('button');
 if(!button||!filtersEl.contains(button))return;
 if(button.hasAttribute('data-toggle-topics')){
  filtersExpanded=!filtersExpanded;
  renderFilters();
 }else if(button.hasAttribute('data-filter')){
  filter=button.dataset.filter;
  currentPage=1;
  renderFilters();
  render();
 }
});
renderFilters();

const presenterSelect=document.querySelector('#presenter-filter');
presenterSelect.innerHTML='<option value="">모든 발표자</option>'+[...new Set(posts.map(p=>p.presenter).filter(Boolean))].sort((a,b)=>a.localeCompare(b,'ko')).map(name=>`<option value="${escapeHTML(name)}">${escapeHTML(name)}</option>`).join('');
presenterSelect.addEventListener('change',()=>{presenterFilter=presenterSelect.value;currentPage=1;render();});
document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>{viewMode=b.dataset.view;currentPage=1;document.querySelectorAll('[data-view]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));render();});
function renderMembers(){document.querySelector('#member-list').innerHTML=members.map((m,i)=>`<article class="member-card"><div class="member-top"><span>MEMBER ${String(i+1).padStart(2,'0')}</span><span class="member-icon" aria-hidden="true">${String(i+1).padStart(2,'0')}</span></div><h3>${escapeHTML(m.name||'이름 입력 예정')}</h3><dl><div><dt>학교</dt><dd>${escapeHTML(m.school||'입력 예정')}</dd></div><div><dt>학과</dt><dd>${escapeHTML(m.department||'입력 예정')}</dd></div><div><dt>GitHub</dt><dd>${m.github?link(m.github,escapeHTML(m.github)):'링크 입력 예정'}</dd></div><div><dt>Email</dt><dd>${m.email?`<a href="mailto:${escapeHTML(encodeURIComponent(m.email))}">${escapeHTML(m.email)}</a>`:'이메일 입력 예정'}</dd></div></dl></article>`).join('');}
function showPage(){
 const hash=location.hash, page=hash==='#members'?'members':'archive';
 document.querySelector('#archive').hidden=page!=='archive';document.querySelector('#members').hidden=page!=='members';
 document.querySelectorAll('[data-page]').forEach(a=>{if(a.dataset.page===page)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
 if(/^#(?:paper|session)=/.test(hash)){
  let key;try{key=decodeURIComponent(hash.slice(hash.indexOf('=')+1));}catch{key='';}
  if(hash.startsWith('#paper='))openPost(key);else openSession(key);
 }else if(dialog.open)dialog.close();
}
window.addEventListener('hashchange',showPage);render();renderMembers();showPage();
