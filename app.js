const cards=document.querySelector('#cards'), search=document.querySelector('#search'), dialog=document.querySelector('#detail');
let filter='전체', currentPage=1;
const PAGE_SIZE=10;
const pagination=document.createElement('nav');
pagination.className='pagination';
pagination.setAttribute('aria-label','게시물 페이지');
document.querySelector('.archive-end').after(pagination);
const escapeHTML=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function safeURL(value){if(!value)return '';try{const url=new URL(value,location.href);return ['https:','http:'].includes(url.protocol)?url.href:'';}catch{return '';}}
const link=(url,label)=>{const safe=safeURL(url);return safe?`<a class="resource-link" href="${escapeHTML(safe)}" target="_blank" rel="noopener noreferrer">${escapeHTML(label)} ↗</a>`:'';};
function getTopics(post){return [...new Set((Array.isArray(post.topic)?post.topic:[post.topic]).filter(t=>typeof t==='string').map(t=>t.trim()).filter(Boolean))];}
const markdown=new marked.Marked({gfm:true,breaks:true,renderer:{
 html({text}){return escapeHTML(text);},
 link({href,tokens}){const label=this.parser.parseInline(tokens);const url=safeURL(href);return url?`<a href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">${label}</a>`:label;},
 image({href,text}){const url=safeURL(href);return url?`<img src="${escapeHTML(url)}" alt="${escapeHTML(text)}" loading="lazy">`:escapeHTML(text);}
}});
function discussionSection(text){return `<h3>Discussion</h3><div class="markdown-body">${markdown.parse(String(text||'To be added.'))}</div>`;}
function render(){
 const q=search.value.trim().toLowerCase();
 const selected=posts.filter(p=>(filter==='전체'||getTopics(p).includes(filter))&&[p.title,...getTopics(p),p.presenter,p.subtitle].join(' ').toLowerCase().includes(q));
 selected.sort((a,b)=>(b.date||'').localeCompare(a.date||'')||String(a.presenter||'').localeCompare(String(b.presenter||''),'ko'));
 const totalPages=Math.max(1,Math.ceil(selected.length/PAGE_SIZE));
 currentPage=Math.min(currentPage,totalPages);
 const visible=selected.slice((currentPage-1)*PAGE_SIZE,currentPage*PAGE_SIZE);
 cards.className='archive-list';
 cards.innerHTML=visible.map(p=>`<button class="post-row" data-id="${escapeHTML(p.id)}" aria-label="${escapeHTML(p.title)} — 기록 열기"><span class="post-date">${p.date?`<time datetime="${escapeHTML(p.date)}">${escapeHTML(p.date)}</time>`:'발표일 미정'}</span><span class="post-main"><span class="tags">${getTopics(p).map(t=>`<span class="tag">${escapeHTML(t)}</span>`).join('')}${p.example?'<span class="example">예시 게시물</span>':''}</span><span class="post-title">${escapeHTML(p.title)}</span><span class="post-summary">${escapeHTML(p.subtitle||'')}</span></span><span class="post-presenter">${escapeHTML(p.presenter||'발표자 미정')}</span><span class="post-arrow" aria-hidden="true">↗</span></button>`).join('');
 document.querySelector('#empty').hidden=selected.length>0;
 document.querySelector('#result-count').textContent=`${selected.length}개의 ${posts.every(p=>p.example)?'예시 ':''}기록`;
 pagination.hidden=totalPages<=1;
 const pageButton=(page,label,disabled=false)=>`<button type="button" data-number="${page}" ${disabled?'disabled':''} ${page===currentPage&&typeof label==='number'?'aria-current="page"':''} aria-label="${typeof label==='number'?`${page}페이지`:label}">${label}</button>`;
 const numbers=Array.from({length:totalPages},(_,i)=>i+1).filter(n=>n===1||n===totalPages||Math.abs(n-currentPage)<=1);
 pagination.innerHTML=pageButton(currentPage-1,'이전',currentPage===1)+numbers.map((n,i)=>(i&&n-numbers[i-1]>1?'<span aria-hidden="true">…</span>':'')+pageButton(n,n)).join('')+pageButton(currentPage+1,'다음',currentPage===totalPages);
 pagination.querySelectorAll('button').forEach(b=>b.onclick=()=>{currentPage=Number(b.dataset.number);render();cards.setAttribute('tabindex','-1');cards.focus({preventScroll:true});cards.scrollIntoView({block:'start'});});
 cards.querySelectorAll('button').forEach(b=>b.onclick=()=>openPost(b.dataset.id));
}
function section(title,text){return `<h3>${title}</h3><p class="note-text">${escapeHTML(text||'To be added.')}</p>`;}
function openPost(id){
 const p=posts.find(p=>p.id===id);
 const pdf=safeURL(p.pdf);
 document.querySelector('#article').innerHTML=`<div class="tags">${getTopics(p).map(t=>`<span class="note-label">${escapeHTML(t)}</span>`).join('')}${p.example?'<span class="example">Example</span>':''}</div><h2>${escapeHTML(p.title)}</h2><div class="article-meta">${escapeHTML(p.presenter)} · ${escapeHTML(p.date||'Date TBD')}</div><dl class="paper-info"><div><dt>Authors</dt><dd>${escapeHTML(p.author||'To be added.')}</dd></div><div><dt>Venue</dt><dd>${escapeHTML(p.venue||'To be added.')}</dd></div></dl><div class="resource-links">${link(p.paper,'Paper')}${link(p.code,'Code')}</div>${section('Summary',p.summary||p.subtitle)}<h3>Presentation Slides</h3>${pdf?`${link(pdf,'Open / Download PDF')}<object class="pdf-viewer" data="${escapeHTML(pdf)}" type="application/pdf"><p>If the preview is unavailable, use the PDF link above.</p></object>`:'<div class="placeholder">Presentation PDF to be added.</div>'}${discussionSection(p.discussion)}`;
 dialog.showModal();document.querySelector('#article').scrollTop=0;dialog.scrollTop=0;document.body.style.overflow='hidden';
}
dialog.addEventListener('close',()=>document.body.style.overflow='');
document.querySelector('#close').onclick=()=>dialog.close();
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
search.addEventListener('input',()=>{currentPage=1;render();});
const topics=['전체',...new Set(posts.flatMap(getTopics))];
document.querySelector('.filters').innerHTML=topics.map(t=>`<button data-filter="${escapeHTML(t)}" class="${t==='전체'?'active':''}" aria-pressed="${t==='전체'}">${escapeHTML(t)}</button>`).join('');
document.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{filter=b.dataset.filter;currentPage=1;document.querySelectorAll('[data-filter]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b));});render();});
function renderMembers(){document.querySelector('#member-list').innerHTML=members.map((m,i)=>`<article class="member-card"><div class="member-top"><span>MEMBER ${String(i+1).padStart(2,'0')}</span><span class="member-icon" aria-hidden="true">${String(i+1).padStart(2,'0')}</span></div><h3>${escapeHTML(m.name||'이름 입력 예정')}</h3><dl><div><dt>학교</dt><dd>${escapeHTML(m.school||'입력 예정')}</dd></div><div><dt>학과</dt><dd>${escapeHTML(m.department||'입력 예정')}</dd></div><div><dt>GitHub</dt><dd>${m.github?link(m.github,m.github):'링크 입력 예정'}</dd></div><div><dt>Email</dt><dd>${m.email?`<a href="mailto:${escapeHTML(encodeURIComponent(m.email))}">${escapeHTML(m.email)}</a>`:'이메일 입력 예정'}</dd></div></dl></article>`).join('');}
function showPage(){const page=location.hash==='#members'?'members':'archive';document.querySelector('#archive').hidden=page!=='archive';document.querySelector('#members').hidden=page!=='members';document.querySelectorAll('[data-page]').forEach(a=>{if(a.dataset.page===page)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});}
window.addEventListener('hashchange',showPage);render();renderMembers();showPage();
