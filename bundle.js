!function(){var e;const t={name:document.querySelector("title").textContent,customRules:{}};document.querySelector("div#spoiler").innerHTML.split("<br>").forEach(e=>{const n=e.split(" : ");t.customRules[n[0]]=n[1]}),e=t;var n={top:document.querySelector("div#custom-top"),middle:document.querySelector("div#custom-middle"),bottom:document.querySelector("div#custom-bottom")};const o="wm-framework.lastVoted";function s(e){const t=document.querySelector("#vote-modal");document.querySelector("#vote-modal-button").addEventListener("click",()=>{localStorage.setItem(o,new Date),window.location.href=`http://blockheadsfans.com/servers/vote.php?id=${e}`}),t.classList.add("is-active"),document.querySelector("#vote-modal-close").addEventListener("click",()=>{t.classList.remove("is-active")})}const i=function(e){let t={},n=[],o="normal",s="";for(let i of e.split("\n"))if((i=i.trim()).startsWith("@"))o="array",arrayName=i.substring(1),s=[];else switch(o){case"normal":if(!i)continue;const e=i.split(" ");if(e.length<2)continue;t[e.shift().toLowerCase()]=e.join(" ");break;case"array":if(!i){n.push([arrayName,s]),o="normal";continue}s.push(i)}return{config:t,lists:n}}(document.querySelector("script[type='config']").textContent);console.log(i),document.body.outerHTML='\n  <body>\n    <style>\n    </style>\n    <section class="section">\n      <div class="container">\n        <div id="vote-modal" class="modal">\n          <div class="modal-background"></div>\n          <div class="modal-content">\n            <div class="box has-text-centered">\n              <span class="is-size-3">Please vote for us on BlockheadsFans!</span>\n              <br>\n              <a id="vote-modal-button" class="button is-primary is-large">Vote</a>\n            </div>\n          </div>\n          <button id="vote-modal-close" class="modal-close is-large" aria-label="close"></button>\n        </div>\n        <div class="content">\n          <div id="custom-top" class="is-hidden"></div>\n          <h1 class="title">\n            World\n          </h1>\n          <p class="subtitle is-hidden">\n          Tag\n          </p>\n          <div id="tags" class="field is-grouped is-grouped-multiline"></div>\n          <div id="custom-middle" class="is-hidden"></div>\n          <div id="lists"></div>\n          <div id="custom-bottom" class="is-hidden"></div>\n        </div>\n      </div>\n    </section>\n  </body>\n  ',document.querySelector("head").innerHTML='\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css">\n  <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"><\/script>\n  ',(e=>{e.config.background&&(document.body.style.background=e.config.background),e.config.backgroundsize&&(document.body.style.backgroundSize=e.config.backgroundsize)})(i),(e=>{if(e.top){const t=document.querySelector("#custom-top");t.innerHTML=e.top.innerHTML,t.classList.remove("is-hidden")}if(e.middle){const t=document.querySelector("#custom-middle");t.innerHTML=e.middle.innerHTML,t.classList.remove("is-hidden")}if(e.bottom){const t=document.querySelector("#custom-bottom");t.innerHTML=e.bottom.innerHTML,t.classList.remove("is-hidden")}})(n),(e=>{if(!e.config.votepopup)return;const t=localStorage.getItem(o);t||s(e.config.votepopup);const n=Date.parse(t),i=new Date;i.setHours(i.getHours()-6),n>i||s(e.config.votepopup)})(i),(e=>{document.querySelector(".subtitle").textContent=e.config.tag,e.config.tag&&document.querySelector(".subtitle").classList.remove("is-hidden")})(i),(e=>{function t(e,t){const n=document.createElement("div");n.classList.add("control");const o=document.createElement("div");o.classList.add("tags","has-addons"),n.appendChild(o);const s=document.createElement("span");s.textContent=e,s.classList.add("tag","is-dark"),o.appendChild(s);const i=document.createElement("span");i.textContent=t,i.classList.add("tag","is-info"),o.appendChild(i),document.querySelector("#tags").appendChild(n)}if(e.config.bhfans){const n=e.config.bhfans.split(" "),o=n.shift(),s=n.join(" ");fetch(`https://wm.bh.wingysam.xyz/bhfans/${o}`).then(e=>e.text()).then(e=>t(s||"Votes",e))}if(e.config.wingy){const n=e.config.wingy.split(" "),o=n.shift(),s=n.join(" ");fetch(`https://block.wingysam.xyz/api/worlds/${o}/players`).then(e=>e.text()).then(e=>t(s||"Online",e))}})(i),(e=>{e.lists.forEach(e=>(function(e,t){const n=document.createElement("div"),o=document.createElement("h2");o.textContent=e,n.appendChild(o);const s=document.createElement("ul");n.appendChild(s);for(const i of t){const e=document.createElement("li");e.textContent=i,s.appendChild(e)}document.querySelector("#lists").appendChild(n)})(e[0],e[1]))})(i),(({worldInfo:e,config:t})=>{const n=document.querySelector(".title");"off"===t.config.worldname&&n.classList.add("is-hidden"),n.textContent=e.name,t.config.worldname&&(n.textContent=t.config.worldname)})({worldInfo:e,config:i})}();