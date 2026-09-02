// ==UserScript==
// @name         몰름보 카피
// @namespace    https://github.com/milkyway0308
// @version      5.3
// @author       milkyway0308
// @description  크랙 스토리 복사, 미디어 변경, 작품 잠금, 채팅 중 프롬프트 수정을 지원합니다.
// @updateURL    https://raw.githubusercontent.com/ponyochat/mollumbo-copy/refs/heads/main/stable/mollumbo-copy.user.js
// @downloadURL  https://raw.githubusercontent.com/ponyochat/mollumbo-copy/refs/heads/main/stable/mollumbo-copy.user.js
// @match        https://crack.wrtn.ai/*
// @connect      d394jeh9729epj.cloudfront.net
// @connect      cdn-image.static.wrtn.ai
// @grant        GM_addStyle
// @grant        GM_getResourceURL
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function () {
    'use strict';

    function I(n){return {ok:true,value:n}}function B(n){return {ok:false,error:n}}function Dt(n){const t=document.cookie.match(new RegExp(`(?:^|; )${n.replace(/([.$?*|{}()[\]\\/+^])/g,"\\$1")}=([^;]*)`));return t?decodeURIComponent(t[1]):null}function re(){return Dt("access_token")}const ie={getCookie:Dt,getAuthToken:re};class ne extends Error{constructor(t,e){super(t),this.code=e,this.code=e;}code}async function se(n,t,e){try{const r={method:n,headers:{Authorization:`Bearer ${ie.getAuthToken()}`,"Content-Type":"application/json"}};e&&(r.body=typeof e=="string"?e:JSON.stringify(e));const s=await fetch(t,r);return s.ok?I(await s.json()):B(new ne(await s.text(),s.status))}catch(r){return B(new Error(`알 수 없는 오류 (${r instanceof Error?r.message:JSON.stringify(r)})`,{cause:r}))}}const b={authFetch:se};function oe(n,t){return n?n.querySelector(t):null}function ae(n,t){return n?Array.from(n.querySelectorAll(t)):[]}function At(n){return document.querySelector(n)}function Et(n){return Array.from(document.querySelectorAll(n))}function ce(n,t,e){const r=At(n);return t?r?e(r):null:e(r)}function le(n,t,e){const r=Et(n);return t?r.length>0?e(r):null:e(r)}const z={get:At,getAll:Et,on:ce,onAll:le,by:oe,byAll:ae};class m{static setupNode(t,{text:e,cls:r,style:s,onInit:o}={}){const a=document.createElement(t);if(e&&(a.textContent=e),r&&(a.className=r),s&&(a.style.cssText=s),o){const c=o(a);if(typeof c<"u")return c}return a}static setupParagraphNode(t={}){return this.setupNode("p",t)}static setupOptionNode(t={}){return this.setupNode("option",t)}static createGenericGridElement(t,e,r){return this.setupNode("div",{cls:t,onInit(s){let o;if(e){const a=m.setupNode("div",{cls:"decentral-element-title",onInit(c){const d=m.setupNode("div",{onInit(p){const w=m.setupNode("p",{text:e});return p.append(w),[p,w]}}),u=m.setupNode("div",{cls:"decentral-element-title-suffix"});return c.append(d[0]),c.append(u),{title:d[1],suffix:u,root:s}}});a.title&&s.append(a.title),o=r?.(a)??a;}else {const a={root:s,title:null,suffix:null};o=r?.(a)??a;}return o}})}static createGridElement(t,e,r){return this.createGenericGridElement(e?"decentral-grid-element-long":"decentral-grid-element",t,r)}static createLongFlatGridElement(t,e){return this.createGenericGridElement("decentral-grid-element-long-flat",t,e)}static createLongSemiFlatGridElement(t,e){return this.createGenericGridElement("decentral-grid-element-long-semi-flat",t,e)}static clone(t){return t.cloneNode(true)}static childs(t){return t.childNodes}static attrEq(t=true,e,r,s){return t&&(!r.hasAttribute(e)||!s.hasAttribute(e))?false:r.getAttribute(e)===s.getAttribute(e)}static addCls(t,...e){for(const r of e)t.classList.add(r);}static delCls(t,...e){for(const r of e)t.classList.remove(r);}static hasCls(t,...e){for(const r of e)if(!t.classList.contains(r))return  false;return  true}static delAttr(t,...e){for(const r of e)t.removeAttribute(r);}static isNodeSelected(t){return (t.parentElement?.querySelectorAll(":hover")?.length??0)>0}static replaceTextIfChanged(t,e){t&&t.textContent!==e&&(t.textContent=e);}}function ue(){return location.pathname==="/"}function Mt(){return /\/stories\/[a-f0-9]+\/episodes\/[a-f0-9]+/.test(location.pathname)||/\/u\/[a-f0-9]+\/c\/[a-f0-9]+/.test(location.pathname)}function Pt(){return /\/characters\/[a-f0-9]+\/chats\/[a-f0-9]+/.test(location.pathname)}function de(){return /^\/builder\/story(\/.*)?$/.test(location.pathname)}function pe(){return /\/arpg\/[a-f0-9]+\/[a-f0-9]+\/play/.test(location.pathname)}function he(){return /\/arpg\/[a-f0-9]+\/builder/.test(location.pathname)}function X(){return Mt()||Pt()}function me(){return X()?window.location.pathname.substring(1).split("/")[1]:null}function ge(){return X()?window.location.pathname.substring(1).split("/")[3]:null}const mt={isStoryBuilderPath:de,isDashboardPath:ue,isStoryPath:Mt,isCharacterPath:Pt,isChattingPath:X,isARPGPath:pe,isARPGBuilderPath:he,character:me,chatRoom:ge},fe="__addon-header-wrapper",gt=new WeakMap;class ye{constructor(t){this.inputElement=t;const e=this.findContainer(t);if(!e)throw new Error("텍스트 컨테이너는 존재하나, 사전 지정된 클래스 루트가 잘못되었습니다.");this.container=e,this.wrapper=this.constructHeaderWrapper(this.container);}inputElement;container;wrapper;triggered=new Set;constructHeaderWrapper(t){const e=z.by(t,`.${fe}`);if(e)return e;const r=m.setupNode("div",{style:"z-index: 1; position: absolute; display: flex; width: 100%; flex-direction: column; align-items: center;"});return t.insertBefore(r,t.childNodes[0]),r}findContainer(t){let e=t.parentElement;for(;e&&!(e.classList.length===0||m.hasCls(e,"flex","flex-row","w-full"));)e=e.parentElement;return e}trigger(t){this.triggered.add(t);}isTriggered(t){return this.triggered.has(t)}getMainRowInside(t){if(this.wrapper.children.length>0){const r=this.wrapper.children;return z.by(r[r.length-1],`.${t}`)}const e=m.setupNode("div",{style:"display: flex; flex-direction: column; justify-content: space-between; width: 100%; max-width: 768px; width: calc(100% - 80px);",onInit(r){r.appendChild(m.setupNode("div",{cls:"__c2_header"})),r.appendChild(m.setupNode("div",{cls:"__c2_footer"}));}});return this.wrapper.appendChild(e),z.by(e,`.${t}`)}getMainRowHeader(){return this.getMainRowInside("__c2_header")}getMainRowFooter(){return this.getMainRowInside("__c2_footer")}}function we(){const n=zt();if(!n)return null;const t=gt.get(n);if(t)return t;const e=new ye(n);return gt.set(n,e),e}function zt(){if(!mt.isCharacterPath()&&!mt.isStoryPath())return null;const n=z.get('textarea[placeholder="메시지 보내기"]');return n||null}const ke={manager:we,acquirePromptElement:zt};class K{constructor(t){this.element=t;}element;insertBefore(t){this.element.before(t.element);}insertAfter(t){this.element.after(t.element);}}class ft{constructor(t,e,r=[]){this.title=t,this.headerElement=e,this.buttons=r;}title;headerElement;buttons;addButton(t){(this.buttons.length>0?this.buttons[this.buttons.length-1].element:this.headerElement).after(t.element),this.buttons.push(t);}insertBefore(t){t.headerElement.before(this.headerElement),this.moveButtonsAfter();}insertAfter(t){(t.buttons.length>0?t.buttons[t.buttons.length-1].element:t.headerElement).after(this.headerElement),this.moveButtonsAfter();}moveButtonsAfter(){let t=this.headerElement;for(const e of this.buttons)t.after(e.element),t=e.element;}appendCustomButton(t){const e=m.setupNode("div",{cls:"px-2.5 h-4 box-content py-[18px]"});return t(e),this.addButton(new K(e)),this}appendNormalButton(t,e,r,s){const o=m.setupNode("div",{cls:"px-2.5 h-4 box-content py-[18px]"});o.id=t;const a=m.setupNode("div",{cls:"w-full flex h-4 items-center justify-between typo-text-base_leading-none_medium space-x-2 [&_svg]:fill-icon_tertiary ring-offset-4 ring-offset-sidebar cursor-pointer",onInit:c=>{const d=m.setupNode("span",{cls:"flex space-x-2 items-center"});d.append(m.setupNode("div",{onInit:u=>{u.innerHTML=e;}}),m.setupNode("span",{cls:"whitespace-nowrap overflow-hidden text-ellipsis typo-text-sm_leading-none_medium",text:r})),c.appendChild(d);}});return o.append(a),o.onclick=s,this.addButton(new K(o)),this}}class Se{categoryMap=new Map;categoryArray=[];constructor(){this.refresh();}getSidePanelElement(){return Array.from(document.querySelectorAll("span")).find(e=>e.textContent==="채팅방 설정")?.parentElement||null}refresh(){this.categoryMap.clear(),this.categoryArray=[];const t=this.getSidePanelElement();if(!t)return;let e=null;for(const r of Array.from(t.children)){const s=r.tagName.toLowerCase();if(s==="p"||s==="span"){e=new ft(r.textContent||"",r),this.categoryArray.push(e),this.categoryMap.set(e.title,e);continue}e&&r.childNodes.length>0&&e.buttons.push(new K(r));}}getMenuMap(){return this.categoryMap}getOrCreateCategory(t,e){return this.categoryMap.get(t)||this.appendCategory(t,e)}appendCategory(t,e){const r=m.setupNode("p",{cls:"typo-text-md_leading-none_medium p-2 text-text_tertiary",text:t}),s=new ft(t,r);if(e){const o=this.categoryMap.get(e);if(!o)throw new Error(`Target category '${e}' does not exist.`);s.insertBefore(o);const a=this.categoryArray.indexOf(o);this.categoryArray.splice(a,0,s);}else this.categoryArray.length>0?s.insertAfter(this.categoryArray[this.categoryArray.length-1]):this.getSidePanelElement()?.append(r),this.categoryArray.push(s);return r.after(m.setupNode("div",{cls:"h-10"})),this.categoryMap.set(t,s),s}}function Ce(){return new Se}const Ie={manager:Ce};class Nt{static attachObserver(t,e){const r=window.MutationObserver||window.WebKitMutationObserver;t&&r&&new r(e).observe(t,{childList:true,subtree:true,attributes:true});}static attachHrefObserver(t,e){let r=location.href;this.attachObserver(t,()=>{r!==location.href&&(r=location.href,e());});}static onPageReady(t){document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t):t(),window.addEventListener("load",t);}static attachResizeObserver(t,e){const r=new ResizeObserver(e);return r.observe(t),()=>{r.unobserve(t);}}}const q=new WeakMap;let yt=false;class Y{constructor(t){this.element=t;}element;overrideClick(t){this.element.onclick=null,this.element.addEventListener("click",t);}}class ve{constructor(t,e){this.title=t,this.action=e;}title;action}class be extends Y{dropdownElements=[];constructor(t){super(t),this.overrideClick(e=>{e.preventDefault(),e.stopPropagation(),Tt(),this.clearDropdownContainer(),this.addItems(),this.repositionDropdown(t);});}addElement(t,e){this.dropdownElements.push(new ve(t,e));}accessAdditionalDropdown(){let t=document.getElementById("chasm-copy-dropdown-container");return t||(t=m.setupNode("div",{cls:"chasm-copy-dropdown-container",onInit:e=>{e.id="chasm-copy-dropdown-container",e.addEventListener("click",o=>{o.stopPropagation(),o.preventDefault();});const r=m.setupNode("div",{cls:"chasm-copy-dropdown-item-container",onInit(o){o.id="chasm-copy-dropdowns";}}),s=m.setupNode("div",{onInit(o){o.id="chasm-copy-partial-border";}});e.append(r),e.append(s),document.body.append(e);}})),document.getElementById("chasm-copy-dropdowns")}repositionDropdown(t){const e=this.accessAdditionalDropdown(),r=e.parentElement;if(!r)return;const s=t.getBoundingClientRect(),o=r.getBoundingClientRect(),a=s.x-o.width,c=s.y;r.style.cssText=`top: ${c}px; left: ${a-5}px; position: absolute;`;const d=document.getElementById("chasm-copy-partial-border");if(d){const u=e.getBoundingClientRect().height;d.style.cssText=`height: ${Math.max(0,u-30)}px`;}}clearDropdownContainer(){const t=this.accessAdditionalDropdown();return t.innerHTML="",t}addItems(){const t=this.accessAdditionalDropdown();for(const e of this.dropdownElements){const r=m.clone(this.element);r.textContent=e.title,r.onclick=null,r.addEventListener("click",e.action),t.appendChild(r);}}}const L="crack-sdk-modified";class xe{menuItems=[];expectedContainer=_();constructor(){this.expectedContainer&&(this.refresh(),yt||(yt=true,this.attachLifecycleObserver()));}hasModified(t){const e=t?`${L}-${t}`:L;return this.expectedContainer?.hasAttribute(e)===true}refresh(){if(this.menuItems=[],this.expectedContainer)for(const t of Array.from(this.expectedContainer.childNodes))t.nodeType===1&&this.menuItems.push(new Y(t));}attachLifecycleObserver(){Nt.attachObserver(document,()=>{if(!/^\/my(\/.*)?$/.test(location.pathname))return;if(!_()){Tt();return}});}markModified(t){const e=t?`${L}-${t}`:L;this.expectedContainer?.setAttribute(e,"true");}createBaseItem(t){let e;return this.menuItems.length>0?e=m.clone(this.menuItems[0].element):e=document.createElement("button"),e.textContent=t,e.onclick=null,e.removeAttribute("id"),e.removeAttribute("aria-describedby"),e.classList.add("chasm-copy-button-primary"),e}addButton(t,e,r){if(!this.expectedContainer)throw new Error("Dropdown container not found");this.markModified(r);const s=this.createBaseItem(t);return s.addEventListener("click",o=>{o.stopPropagation(),e();}),this.menuItems.push(new Y(s)),this.expectedContainer.appendChild(s),this}addDropdownButton(t,e,r){if(!this.expectedContainer)throw new Error("Dropdown container not found");this.markModified(r);const s=this.createBaseItem(t),o=new be(s);return e(o),this.menuItems.push(o),this.expectedContainer.appendChild(o.element),this}}function Tt(){for(const n of Array.from(document.getElementsByClassName("chasm-copy-menu")))n.removeAttribute("chasm-dropdown-enabled");document.getElementById("chasm-copy-dropdown-container")?.remove();}function _(){const n=Array.from(document.querySelectorAll('[role="menu"][data-state="open"],div[data-radix-popper-content-wrapper] [role="menu"]')).find(t=>{const e=t.getBoundingClientRect();return e.width>0&&e.height>0});if(n)return n;const t=new Set(["수정","수정하기","삭제","삭제하기","공개로 변경","비공개로 변경","링크 공개로 변경","링크공개로 변경"]),e=Array.from(document.querySelectorAll("button,[role=menuitem],[role=button],div,p,span")).filter(a=>t.has((a.textContent??"").trim())&&a.getBoundingClientRect().width>0&&a.getBoundingClientRect().height>0),r=e.find(a=>["수정","수정하기"].includes((a.textContent??"").trim())),s=e.find(a=>["삭제","삭제하기"].includes((a.textContent??"").trim()));if(!r||!s)return null;for(let a=r;a&&a!==document.body;a=a.parentElement){if(!a.contains(s))continue;const c=a.getBoundingClientRect();if(c.width>0&&c.height>0&&a.children.length>=2)return a}return null}function De(){const n=_();if(!n)return null;if(q.has(n))return q.get(n);const t=new xe;return q.set(n,t),t}const Ae={manager:De,acquireMenuContainer:_};function Ee(){return Ae}const Me={popup:Ee};function Pe(){return Ie.manager()}function ze(){return Me}function Ne(){return ke}const Te={sidePanel:Pe,articleListing:ze,promptInputDecoration:Ne};class Q{static findInjector(){const t=document;return t.__toastifyInjector||(t.__toastifyInjector=new Q),t.__toastifyInjector}constructor(){this.init();}init(){try{GM_addStyle(`
        .chasm-toastify-track {
            transform: translateY(-200%);
            transition: transform 0.4s;
        }

        .chasm-toastify-track[completed="true"] {
            transform: translateY(0);
            transition: transform 0.4s;
        }
    `);}catch{console.warn("!! WARNING !!"),console.warn(`!! WARNING !! GM_addStyle 콜에 실패하였습니다.
브라우저가 아닌 환경에서 toastify-injection이 초기화되었을 가능성이 존재합니다.
해당 환경에서는 toastify-injection.js가 오작동할 가능성이 존재합니다.`);}setInterval(this.trackNotification,50);}trackNotification(t=Date.now()){const e=document.getElementsByClassName("Toastify");if(e.length<=0)return;const r=e[0],s=r.getElementsByClassName("chasm-toastify-track");r.childNodes.length>0&&s.length!=r.childNodes.length&&Array.from(s).forEach(o=>{o.hasAttribute("completed")&&(o.removeAttribute("completed"),o.setAttribute("remove-at",`${t+1e3}`));}),Array.from(s).forEach(o=>{const a=parseInt(o.getAttribute("expires-at")??"0");a<t&&o.hasAttribute("completed")?(o.removeAttribute("completed"),o.setAttribute("remove-at",`${t+1e3}`)):a<t&&o.remove();});}doToastifyAlert(t,e=3e3){const r=m.setupParagraphNode({text:t,style:"color: #FFFFFF; text-align: center; font-size: 16px; line-height: 140%; font-weight: 600; white-space: pre-line;"}),s=m.setupNode("div",{style:"background-color: rgb(46, 45, 43); padding: 16px; border-radius: 10px; width: 100%; max-width: 95vw; height: 100%;",onInit:c=>{c.append(r);}}),o=m.setupNode("div",{cls:"Toastify__toast-container Toastify__toast-container--top-center chasm-toastify-track",style:"background: transparent; min-width: min(461px, calc(100vw - 24px)); min-height: 0px; height: fit-content; border-radius: 10px; justify-content: center; left: auto; justify-self: center;",onInit:c=>{c.append(s),c.setAttribute("expires-at",`${new Date().getTime()+e}`);}}),a=document.getElementsByClassName("Toastify");a.length<=0||(a.length>0&&Array.from(a[0].childNodes).forEach(c=>c.remove()),a[0].append(o),setTimeout(()=>{o.setAttribute("completed","true");}));}}class J{imageMap=new Map;constructor(t){if(t)for(let[e,r]of Object.entries(t))this.imageMap.set(e,r);}light(){return this.imageMap.get("light")??null}dark(){return this.imageMap.get("dark")??null}image(t){return this.imageMap.get(t)??null}}class N{constructor(t){this.originName=t,this.originName=t;}originName;static PUBLIC=new N("public");static PRIVATE=new N("private");static LINK_ONLY=new N("linkonly");static of(t){return t.toLowerCase()==="private"?this.PRIVATE:t.toLowerCase()==="public"?this.PUBLIC:this.LINK_ONLY}}class i extends Error{constructor(t){super(t);}static ensureString(t,e,r,s=true){if(s&&r[e]===void 0)throw new i(`데이터를 분해하는 중 오류가 발생하였습니다 : 진행 절차 ${t}, 문제 발생 요소 ${e} (존재하지 않음)`);if(r[e]!==void 0&&typeof r[e]!="string")throw new i(`데이터를 분해하는 중 오류가 발생하였습니다 : 진행 절차 ${t}, 문제 발생 요소 ${e} (타입 불일치 / 원본 ${typeof r[e]}, 필요 string)`);return r[e]}static ensureBool(t,e,r,s=true){if(s&&r[e]===void 0)throw new i(`데이터를 분해하는 중 오류가 발생하였습니다 : 진행 절차 ${t}, 문제 발생 요소 ${e} (존재하지 않음)`);if(r[e]!==void 0&&typeof r[e]!="boolean")throw new i(`데이터를 분해하는 중 오류가 발생하였습니다 : 진행 절차 ${t}, 문제 발생 요소 ${e} (타입 불일치 / 원본 ${typeof r[e]}, 필요 boolean)`);return r[e]}static ensureNumber(t,e,r,s=true){if(s&&r[e]===void 0)throw new i(`데이터를 분해하는 중 오류가 발생하였습니다 : 진행 절차 ${t}, 문제 발생 요소 ${e} (존재하지 않음)`);if(typeof r[e]!="number")throw new i(`데이터를 분해하는 중 오류가 발생하였습니다 : 진행 절차 ${t}, 문제 발생 요소 ${e} (타입 불일치 / 원본 ${typeof r[e]}, 필요 number)`);return r[e]}static ensureArray(t,e,r,s=true){if(s&&r[e]===void 0)throw new i(`데이터를 분해하는 중 오류가 발생하였습니다 : 진행 절차 ${t}, 문제 발생 요소 ${e} (존재하지 않음)`);if(r[e]!==void 0&&!Array.isArray(r[e]))throw new i(`데이터를 분해하는 중 오류가 발생하였습니다 : 진행 절차 ${t}, 문제 발생 요소 ${e} (타입 불일치 / 원본 ${typeof r[e]}, 필요 array)`);return r[e]}}class Z{constructor(t,e){this.isOriginal=t,this.isEditBlocked=e;}isOriginal;isEditBlocked;static from(t){return new Z(t.isOriginal,t.isEditBlocked)}}class tt{constructor(t,e,r,s,o){this.nickname=t,this.wrtnUid=e,this.isCertified=r,this.profileId=s,this.isWithdrawn=o;}nickname;wrtnUid;isCertified;profileId;isWithdrawn;static from(t){return new tt(i.ensureString("Creator Info Deserialization","nickname",t),i.ensureString("Creator Info Deserialization","wrtnUid",t),i.ensureBool("Creator Info Deserialization","isCertifiedCreator",t),i.ensureString("Creator Info Deserialization","profileId",t),i.ensureBool("Creator Info Deserialization","isWithdrawn",t))}}class et{constructor(t,e){this.modelId=t,this.multiplier=e;}modelId;multiplier;uglify(){return {chatModelId:this.modelId,maxOutputMultiplier:this.multiplier}}static from(t){return new et(t.chatModelId,t.maxOutputMultiplier)}}class rt{constructor(t,e,r){this.type=t,this.multiplier=e,this.modelMultipliers=r;}type;multiplier;modelMultipliers;uglify(){return {type:this.type,totalMultiplier:this.multiplier===null?void 0:this.multiplier,modelMultipliers:this.modelMultipliers.length===0?void 0:this.modelMultipliers.map(t=>t.uglify())}}static from(t){if(t)return new rt(i.ensureString("Crack Recommended Output Deserialization","type",t),t.totalMultiplier,i.ensureArray("Crack Recommended Output Deserialization","modelMultipliers",t,false)?.map(e=>et.from(e))??[])}}class it{constructor(t,e,r){this.id=t,this.name=e,this.type=r;}id;name;type;static from(t){return new it(i.ensureString("Crack Genre Deserialization","_id",t),i.ensureString("Crack Genre Deserialization","name",t),i.ensureString("Crack Genre Deserialization","type",t))}}class nt{constructor(t,e){this.userId=t,this.wrtnUid=e;}userId;wrtnUid;static from(t){return i.ensureString("Crack / Wrtn ID Deserialization","userId",t),i.ensureString("Crack / Wrtn ID Deserialization","wrtnUid",t),new nt(t.userId,t.wrtnUid)}}function wt(n){return Array.isArray(n)?n.map(t=>{if(typeof t=="string")return t;if(!t||typeof t!="object")return;const e=t.name;return typeof e=="string"?e:void 0}).map(t=>t?.trim().slice(0,10)).filter(t=>typeof t=="string"&&t.length>0).filter((t,e,r)=>r.indexOf(t)===e):[]}class U{constructor(t,e){this.categories=t,this.situations=e;}categories;situations;uglify(){return {categories:this.categories,situations:this.situations}}static from(t){if(t)return new U(wt(t.categories),wt(t.situations))}}class G{constructor(t,e,r){this.name=t,this.keywords=e,this.prompt=r;}name;keywords;prompt;static from(t){return new G(i.ensureString("Crack KeywordBook Deserialization","name",t),i.ensureArray("Crack KeywordBook Deserialization","keywords",t),i.ensureString("Crack KeywordBook Deserialization","prompt",t))}}class st{constructor(t,e,r){this.name=t,this.templateId=e,this.icon=r;}name;templateId;icon;static from(t){return new st(i.ensureString("Cracker Prompt Template Parse","name",t),i.ensureString("Cracker Prompt Template Parse","template",t),new J(t.icon??{}))}}class V{constructor(t,e,r,s,o,a,c){this.situation=t,this.keyword=e,this.imageUrl=r,this.category=s,this.blurredImageUrl=o,this.hint=a,this.memo=c;}situation;keyword;imageUrl;category;blurredImageUrl;hint;memo;static from(t){return new V(i.ensureString("Crack Situation Image Deserialization","situation",t),i.ensureString("Crack Situation Image Deserialization","keyword",t,false)??"",i.ensureString("Crack Situation Image Deserialization","imageUrl",t),i.ensureString("Crack Situation Image Deserialization","category",t,false),i.ensureString("Crack Situation Image Deserialization","blurredImageUrl",t,false),i.ensureString("Crack Situation Image Deserialization","hint",t,false),i.ensureString("Crack Situation Image Deserialization","memo",t,false))}}class F{constructor(t,e,r,s,o){this.type=t,this.comparisonOperator=e,this.statName=r,this.value=s,this.valueType=o;}type;comparisonOperator;statName;value;valueType;uglify(t){return {comparisonOperator:this.comparisonOperator,statName:this.statName,type:this.type,value:this.value,valueType:this.valueType}}static from(t){return new F(i.ensureString("Crack Single Ending Rule Deserialization","type",t),i.ensureString("Crack Single Ending Rule Deserialization","comparisonOperator",t,false)??null,i.ensureString("Crack Single Ending Rule Deserialization","statName",t),i.ensureString("Crack Single Ending Rule Deserialization","value",t),i.ensureString("Crack Single Ending Rule Deserialization","valueType",t))}}class ot{constructor(t,e,r){this.type=t,this.operator=e,this.rules=r;}type;operator;rules;uglify(t){return {type:this.type,ruleOperator:this.operator,rules:this.rules.map(e=>e.uglify(t))}}static from(t){return new ot(i.ensureString("Crack Grouped Ending Rule Deserialization","type",t),i.ensureString("Crack Grouped Ending Rule Deserialization","ruleOperator",t),(i.ensureArray("Crack Grouped Ending Rule Deserialization","rules",t,false)??[]).map(e=>F.from(e)))}}class at{constructor(t,e,r){this.leastTurn=t,this.groupOperator=e,this.rules=r;}leastTurn;groupOperator;rules;static from(t){return new at(i.ensureNumber("Crack Ending Container Deserialization","turnCount",t),i.ensureString("Crack Ending Container Deserialization","groupOperator",t,false)??null,(i.ensureArray("Crack Ending Container Deserialization","rules",t,false)??[]).map(e=>{if(e.type==="SINGLE")return F.from(e);if(e.type==="GROUP")return ot.from(e);throw Error("Unexpected crack rule group type "+e.type)}))}uglify(t){return {turnCount:this.leastTurn,groupOperator:this.groupOperator?this.groupOperator:void 0,rules:this.rules.length>0?this.rules.map(e=>e.uglify(t)):void 0}}}class ct{constructor(t,e,r,s,o,a,c,d,u){this.id=t,this.name=e,this.blurredImageUrl=r,this.imageUrl=s,this.condition=o,this.prompt=a,this.epilogueExample=c,this.hint=d,this.rarity=u;}id;name;blurredImageUrl;imageUrl;condition;prompt;epilogueExample;hint;rarity;uglify(t){return {baseEndingId:this.id&&!t?this.id:void 0,name:this.name,blurredImageUrl:this.blurredImageUrl,imageUrl:this.imageUrl,condition:this.condition.uglify(t),conditionPrompt:this.prompt,epilogueExample:this.epilogueExample??void 0,hint:this.hint??void 0,rarity:this.rarity}}static from(t){return new ct(i.ensureString("Crack Ending Deserialization","baseEndingId",t,false)??null,i.ensureString("Crack Ending Deserialization","name",t),i.ensureString("Crack Ending Deserialization","blurredImageUrl",t),i.ensureString("Crack Ending Deserialization","imageUrl",t),at.from(t.condition??{}),i.ensureString("Crack Ending Deserialization","conditionPrompt",t),i.ensureString("Crack Ending Deserialization","epilogueExample",t,false)??null,i.ensureString("Crack Ending Deserialization","hint",t,false)??null,i.ensureString("Crack Ending Deserialization","rarity",t))}}class lt{constructor(t){this.endings=t;}endings;uglify(t){return {endings:this.endings.map(e=>e.uglify(t))}}hasEndings(){return this.endings.length>0}static from(t){return new lt((i.ensureArray("Crack Ending Container Deserialization","endings",t,false)??[]).map(e=>ct.from(e)))}}class ut{constructor(t,e,r,s){this.name=t,this.min=e,this.max=r,this.prompt=s;}name;min;max;prompt;static from(t){return new ut(i.ensureString("Crack Stat Parameter Level Deserialization","name",t),i.ensureNumber("Crack Stat Parameter Level Deserialization","levelMinValue",t),i.ensureNumber("Crack Stat Parameter Level Deserialization","levelMaxValue",t),i.ensureString("Crack Stat Parameter Level Deserialization","levelPrompt",t))}uglify(){return {name:this.name,levelMinValue:this.min,levelMaxValue:this.max,levelPrompt:this.prompt}}}class dt{constructor(t,e,r,s,o,a,c,d,u){this.name=t,this.hexCode=e,this.iconUrl=r,this.initialValue=s,this.min=o,this.max=a,this.prompt=c,this.unit=d,this.levels=u;}name;hexCode;iconUrl;initialValue;min;max;prompt;unit;levels;uglify(){return {name:this.name,colorHexCode:this.hexCode,iconUrl:this.iconUrl,initialValue:this.initialValue,min:this.min,max:this.max,prompt:this.prompt,unit:this.unit,levels:this.levels.length>0?this.levels.map(t=>t.uglify()):void 0}}static from(t){return new dt(i.ensureString("Crack Stat Parameter Deserialization","name",t),i.ensureString("Crack Stat Parameter Deserialization","colorHexCode",t),i.ensureString("Crack Stat Parameter Deserialization","iconUrl",t),i.ensureNumber("Crack Stat Parameter Deserialization","initialValue",t),i.ensureNumber("Crack Stat Parameter Deserialization","min",t),i.ensureNumber("Crack Stat Parameter Deserialization","max",t),i.ensureString("Crack Stat Parameter Deserialization","prompt",t),i.ensureString("Crack Stat Parameter Deserialization","unit",t,false)??"",i.ensureArray("Crack Stat Parameter Deserialization","levels",t,false)?.map(e=>ut.from(e))??[])}}class pt{constructor(t,e,r,s,o,a,c,d,u,p,w,l){this.id=t,this.setId=e,this.name=r,this.initialMessages=s,this.situationPrompt=o,this.replySuggestions=a,this.situationImages=c,this.ending=d,this.keywordBook=u,this.parameters=p,this.imageMatrix=w,this.playGuide=l;}id;setId;name;initialMessages;situationPrompt;replySuggestions;situationImages;ending;keywordBook;parameters;imageMatrix;playGuide;static from(t){return new pt(i.ensureString("Crack Starting Set Deserialization","_id",t),i.ensureString("Crack Starting Set Deserialization","baseSetId",t),i.ensureString("Crack Starting Set Deserialization","name",t),i.ensureArray("Crack Starting Set Deserialization","initialMessages",t),i.ensureString("Crack Starting Set Deserialization","situationPrompt",t,false)??"",i.ensureArray("Crack Starting Set Deserialization","replySuggestions",t),i.ensureArray("Crack Starting Set Deserialization","situationImages",t).map(e=>V.from(e)),lt.from(t.ending??{}),(i.ensureArray("Crack Starting Set Deserialization","keywordBook",t,false)??[]).map(e=>G.from(e)),(i.ensureArray("Crack Starting Set Deserialization","parameters",t,false)??[]).map(e=>dt.from(e)),U.from(t.imageMatrix),i.ensureString("Crack Starting Set Deserialization","playGuide",t,false))}uglify(t){const e=new Set,r=this.situationImages.slice(0,1600).map((o,a)=>{let c=o.keyword.trim().slice(0,10);if(c.length>0){for(;e.has(c);){const d=String(a+1);c=`${c.slice(0,10-d.length)}${d}`;}e.add(c);}return {situation:o.situation.slice(0,5e3),keyword:c,imageUrl:o.imageUrl,category:o.category,blurredImageUrl:o.blurredImageUrl,hint:o.hint,memo:o.memo?.slice(0,5e3)}}),s=this.imageMatrix&&this.imageMatrix.categories.length>0&&this.imageMatrix.situations.length>0?this.imageMatrix.uglify():void 0;return {baseSetId:this.setId&&t?this.setId:void 0,name:this.name,initialMessages:this.initialMessages,situationPrompt:this.situationPrompt,replySuggestions:this.replySuggestions,situationImages:r,keywordBook:this.keywordBook,parameters:this.parameters.map(o=>o.uglify()),ending:this.ending.hasEndings()?this.ending.uglify(!t):void 0,imageMatrix:s,playGuide:typeof this.playGuide==="string"&&this.playGuide.length>0?this.playGuide:void 0}}}class $e{constructor(t,e,r,s,o,a,c,d,u,p,w,l,f,y,k,S,x,M,C,P,D,T,A){this.chatExamples=t,this.chatModelId=e,this.chatType=r,this.mainPrompt=s,this.crackerModel=o,this.description=a,this.detailDescription=c,this.genreId=d,this.isCommentBlocked=u,this.isMovingPortraitImage=p,this.model=w,this.name=l,this.portraitImageUrl=f,this.promptTemplate=y,this.simpleDescription=k,this.sets=S,this.storyDetails=x,this.tags=M,this.target=C,this.visibility=P,this.recommendedOutput=D,this.imageVersion=T,this.shortcutCommands=A;}chatExamples;chatModelId;chatType;mainPrompt;crackerModel;description;detailDescription;genreId;isCommentBlocked;isMovingPortraitImage;model;name;portraitImageUrl;promptTemplate;simpleDescription;sets;storyDetails;tags;target;visibility;recommendedOutput;imageVersion;shortcutCommands;purify(){return this.simpleDescription.length===0&&(this.simpleDescription="여기에 간략한 설명 입력"),this.storyDetails.length===0&&(this.storyDetails="여기에 상세 설명 입력"),this.description.length===0&&(this.description="여기에 설명 입력"),this}dematrix(){this.imageVersion="v1",this.mainPrompt=this.mainPrompt.slice(0,5e3),this.storyDetails=this.storyDetails.slice(0,3e3);for(const t of this.sets){t.imageMatrix=void 0,t.situationImages.splice(50);for(const[e,r]of t.situationImages.entries())r.situation=r.situation.slice(0,5e3),r.keyword=`이미지${e+1}`;}return this}normalizeMediaV2(){const t=this.imageVersion;this.imageVersion="v2",this.mainPrompt=this.mainPrompt.slice(0,7e3),this.storyDetails=this.storyDetails.slice(0,5e3);const e=(r,s)=>{const o=r?.trim().slice(0,10)??"";return o.length>0?o:s};for(const r of this.sets){if(r.situationImages.splice(t==="v2"?1600:50),t==="v2"&&r.imageMatrix)for(const[a,c]of r.situationImages.entries()){const d=c.situation;c.category=e(c.category,"기본"),c.situation=e(c.situation,`이미지${a+1}`),c.keyword=c.keyword.trim().slice(0,10),c.memo=(c.memo??(d.length>10?d:"")).slice(0,5e3);}else {const a=new Map,c=new Set;for(const u of r.situationImages){const p=e(u.keyword,"이미지");a.set(p,(a.get(p)??0)+1),a.get(p)===1&&c.add(p);}const d=new Map;for(const u of r.situationImages){const p=e(u.keyword,"이미지");let w=p;if((a.get(p)??0)>1){let l=d.get(p)??0;do{l+=1;const f=String(l);w=`${p.slice(0,10-f.length)}${f}`;}while(c.has(w));d.set(p,l),c.add(w);}u.memo=(u.memo??u.situation).slice(0,5e3),u.situation=w,u.category="기본",u.keyword="";}}const s=[...new Set(r.situationImages.map(a=>e(a.category,"기본")))],o=[...new Set(r.situationImages.map((a,c)=>e(a.situation,`이미지${c+1}`)))];r.imageMatrix=s.length>0&&o.length>0?new U(s,o):void 0;}return this}stringify(t,e,r){return JSON.stringify({chatExamples:this.chatExamples,chatModelId:this.chatModelId,chatType:this.chatType,customPrompt:this.mainPrompt,defaultCrackerModel:this.crackerModel,description:this.description,detailDescription:this.detailDescription,genreId:this.genreId,isCommentBlocked:this.isCommentBlocked,isMovingPortraitImage:this.isMovingPortraitImage,model:this.model,name:this.name,portraitImageUrl:this.portraitImageUrl,promptTemplate:this.promptTemplate,simpleDescription:this.simpleDescription,startingSets:this.sets.map(s=>s.uglify(t)),storyDetails:this.storyDetails,tags:this.tags,target:this.target,visibility:this.visibility.originName,storyId:e===null?void 0:e,isAdult:r===null?void 0:r,creatorRecommendedMaxOutput:this.recommendedOutput?.uglify(),situationImageVersion:this.imageVersion,shortcutCommands:this.shortcutCommands.map(s=>({name:s.name,description:s.description,prompt:s.prompt}))})}modify(t){return t(this),this}}class ht{constructor(t,e,r,s,o,a,c,d,u,p,w,l,f,y,k,S,x,M,C,P,D,T,A,$,W,h,E,R,O,Ut,Rt,Ot,Lt,_t,Gt,Vt,Ft,Wt,qt,Ht,jt,Kt,Yt,Jt,Xt,Qt,Zt,te,ee){this.id=t,this.userId=e,this.messageCount=r,this.defaultCrackerModel=s,this.chatModelId=o,this.creator=a,this.title=c,this.description=d,this.simpleDescription=u,this.detailDescription=p,this.chatCount=w,this.chatUserCount=l,this.likeCount=f,this.dislikeCount=y,this.imageCount=k,this.endingCount=S,this.tags=x,this.isLiked=M,this.countryCode=C,this.visibility=P,this.profileImage=D,this.portraitImage=T,this.timestamp=A,this.isAdult=$,this.isConvertedToAdult=W,this.commentCount=h,this.promptTemplate=E,this.genre=R,this.target=O,this.chatType=Ut,this.storyDetails=Rt,this.customPrompt=Ot,this.chatExamples=Lt,this.startingSets=_t,this.original=Gt,this.isCommentBlocked=Vt,this.legacyInitialMessage=Ft,this.replySuggestions=Wt,this.situationImages=qt,this.snapshotId=Ht,this.model=jt,this.categories=Kt,this.keywordBook=Yt,this.firstPublicAt=Jt,this.genreId=Xt,this.imageVersion=Qt,this.imageMatrix=Zt,this.recommendOutput=te,this.shortcutCommands=ee;}id;userId;messageCount;defaultCrackerModel;chatModelId;creator;title;description;simpleDescription;detailDescription;chatCount;chatUserCount;likeCount;dislikeCount;imageCount;endingCount;tags;isLiked;countryCode;visibility;profileImage;portraitImage;timestamp;isAdult;isConvertedToAdult;commentCount;promptTemplate;genre;target;chatType;storyDetails;customPrompt;chatExamples;startingSets;original;isCommentBlocked;legacyInitialMessage;replySuggestions;situationImages;snapshotId;model;categories;keywordBook;firstPublicAt;genreId;imageVersion;imageMatrix;recommendOutput;shortcutCommands;asWritable(){return new $e(this.chatExamples,this.chatModelId,this.chatType,this.customPrompt,this.defaultCrackerModel,this.description,this.detailDescription,this.genreId,this.isCommentBlocked,this.isMovingPortraitImage||!!this.portraitImage?.image("gif")||!!this.profileImage?.image("gif"),this.model,this.title,this.portraitImage?.image("origin")??this.profileImage?.image("origin")??"about:blank",this.promptTemplate.templateId,this.simpleDescription,this.startingSets,this.storyDetails??"",this.tags,this.target,N.of(this.visibility),this.recommendOutput,this.imageVersion,this.shortcutCommands)}static from(t){return new ht(i.ensureString("Crack Story Deserialization","_id",t),nt.from(t),i.ensureNumber("Crack Story Deserialization","totalMessageCount",t),i.ensureString("Crack Story Deserialization","defaultCrackerModel",t),i.ensureString("Crack Story Deserialization","chatModelId",t),tt.from(t.creator),i.ensureString("Crack Story Deserialization","name",t),i.ensureString("Crack Story Deserialization","description",t),i.ensureString("Crack Story Deserialization","simpleDescription",t,false)??"",i.ensureString("Crack Story Deserialization","detailDescription",t),i.ensureNumber("Crack Story Deserialization","chatCount",t),i.ensureNumber("Crack Story Deserialization","chatUserCount",t),i.ensureNumber("Crack Story Deserialization","likeCount",t),i.ensureNumber("Crack Story Deserialization","dislikeCount",t,false)??0,i.ensureNumber("Crack Story Deserialization","imageCount",t,false)??0,i.ensureNumber("Crack Story Deserialization","endingCount",t,false)??0,i.ensureArray("Crack Story Deserialization","tags",t),i.ensureBool("Crack Story Deserialization","isLiked",t),i.ensureString("Crack Story Deserialization","countryCode",t),i.ensureString("Crack Story Deserialization","visibility",t),new J(t.profileImage),t.portraitImage?new J(t.portraitImage):null,{created:new Date(t.createdAt),updated:new Date(t.updatedAt)},i.ensureBool("Crack Story Deserialization","isAdult",t),i.ensureBool("Crack Story Deserialization","isConvertedToAdult",t),i.ensureNumber("Crack Story Deserialization","commentCount",t),st.from(t.promptTemplate),it.from(t.genre),i.ensureString("Crack Story Deserialization","target",t),i.ensureString("Crack Story Deserialization","chatType",t),i.ensureString("Crack Story Deserialization","storyDetails",t,false),i.ensureString("Crack Story Deserialization","customPrompt",t,false)??"",i.ensureArray("Crack Story Deserialization","chatExamples",t),i.ensureArray("Crack Story Deserialization","startingSets",t).map(e=>pt.from(e)),Z.from(t.original),i.ensureBool("Crack Story Deserialization","isCommentBlocked",t),i.ensureArray("Crack Story Deserialization","initialMessages",t),i.ensureArray("Crack Story Deserialization","replySuggestions",t),i.ensureArray("Crack Story Deserialization","situationImages",t).map(e=>V.from(e)),i.ensureString("Crack Story Deserialization","snapshotId",t,false),i.ensureString("Crack Story Deserialization","model",t),i.ensureArray("Crack Story Deserialization","categories",t),i.ensureArray("Crack Story Deserialization","keywordBook",t).map(e=>G.from(e)),i.ensureString("Crack Story Deserialization","firstPublicAt",t,false),i.ensureString("Crack Story Deserialization","genreId",t),i.ensureString("Crack Story Deserialization","situationImageVersion",t),U.from(t.imageMatrix),rt.from(t.creatorRecommendedMaxOutput),(i.ensureArray("Crack Story Deserialization","shortcutCommands",t,false)??[]).map(e=>({shortcutId:typeof e.shortcutId=="string"?e.shortcutId:void 0,name:i.ensureString("Crack Shortcut Command Deserialization","name",e),description:i.ensureString("Crack Shortcut Command Deserialization","description",e),prompt:i.ensureString("Crack Shortcut Command Deserialization","prompt",e),createdAt:typeof e.createdAt=="string"?e.createdAt:void 0})))}}async function Be(n,t=false){const e=await b.authFetch("GET",`https://crack-api.wrtn.ai/crack-api/stories/me/${n}`);if(!e.ok)return e;try{return I(t?e.value.data:ht.from(e.value.data))}catch(r){return B(r)}}async function $t(){const n=await b.authFetch("POST","https://crack-api.wrtn.ai/crack-api/temp-stories");return n.ok?I(n.value.data):n}async function Ue(){const n=await b.authFetch("POST","https://crack-api.wrtn.ai/crack-api/story-starting-sets/prepare");if(!n.ok)return n;const t=n.value?.data?.baseSetId;return typeof t!="string"||t.length===0?B(new Error("새 시작 설정 번호를 발급받지 못했습니다.")):I(t)}async function Re(n){const t=await b.authFetch("POST","https://crack-api.wrtn.ai/crack-api/stories/profile-image",{image:n});if(!t.ok)return t;const e=t.value?.data?.url;return typeof e!="string"||e.length===0?B(new Error("새 표지 주소를 받지 못했습니다.")):I(e)}async function Oe(n,t,e){const r=await b.authFetch("PATCH",`https://crack-api.wrtn.ai/crack-api/stories/${n}/v2`,t.stringify(e));return r.ok?I(true):r}async function Le(n,t,e){const r=await $t();return r.ok?Bt(n,t,r.value,e):r}async function Bt(n,t,e,r){const s=await b.authFetch("POST","https://crack-api.wrtn.ai/crack-api/stories/v2",n.stringify(t,e,r));return s.ok?I(true):s}async function _e(n,t,e){const r=await b.authFetch("POST","https://crack-api.wrtn.ai/crack-api/situation-images/presigned-urls/bulk",{sourceId:n,uploads:e,startingSets:[{baseSetId:t}]});return r.ok?I(r.value.data):r}async function Ge(n,t,e){const r=new URLSearchParams;r.set("bulkId",t),r.append("baseSetIds[]",e);const s=await b.authFetch("GET",`https://crack-api.wrtn.ai/crack-api/situation-images/stories/${n}/starting-sets?${r.toString()}`);if(s.ok)return I(s.value.data);const o=new URLSearchParams;o.set("bulkId",t),o.append("baseSetIds",e);const a=await b.authFetch("GET",`https://crack-api.wrtn.ai/crack-api/situation-images/stories/${n}/starting-sets?${o.toString()}`);return a.ok?I(a.value.data):a}const Ve={getDetail:Be,edit:Oe,create:Le,createWithId:Bt,pullNewId:$t,prepareStartingSet:Ue,uploadStoryPortraitImage:Re,requestSituationImageUploads:_e,getSituationImageUploadStatus:Ge};function Fe(){return Te}function v(){return Ve}function g(){return Q.findInjector()}class H{static init(t){typeof document<"u"&&t();}static onPagePrepare(t){let e=false;const r=()=>{e||(e=true,t());};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",r):r(),window.addEventListener("load",r);}static callGMAddStyle(t){return typeof GM_addStyle<"u"?(GM_addStyle(t),true):false}static callGMGetResourceUrl(t){if(typeof GM_getResourceURL<"u")return GM_getResourceURL(t)}}const kt="https://github.com/milkyway0308",j="https://github.com/milkyway0308/crystallized-chasm/dist",St="https://github.com/milkyway0308/crystallized-chasm/dist",Ct="https://crack.wrtn.ai/*",It=["https://babechat.ai/*","https://www.babechat.ai/*"];class We{static constructors={crack:()=>({downloadUrl:j,updateUrl:St,platformSuffix:"/crack",match:[Ct],namespace:kt,matchRule:Ct}),babechat:()=>({downloadUrl:j,updateUrl:St,platformSuffix:"/babechat",match:[...It],namespace:kt,matchRule:It[0]})};static construct(t,e,r,s){const o=this.constructors[t]();return r&&(o.match=r),o.downloadURL=o.updateURL=`${j}${o.platformSuffix}/${e}`,s(o),o}}const qe=".chasm-copy-dropdown-container{display:flex;flex-direction:row;min-width:98px;background-color:hsl(var(--popover));border-left:1px solid var(--surface_chat_primary);border-top:1px solid var(--surface_chat_primary);border-bottom:1px solid var(--surface_chat_primary);padding:0;border-radius:1px;box-shadow:#0000000d 0 1px 2px,#0000001a 0 2px 4px -2px;z-index:1001!important;position:fixed!important;pointer-events:all!important}.chasm-copy-dropdown-item-container{display:flex;flex-direction:column;width:calc(100% - 2px);height:100%;z-index:11!important}.chasm-copy-button-primary{font-size:14px;font-weight:500;color:hsl(var(--popover-foreground));transition:all .3s;-webkit-user-select:none;user-select:none}.chasm-copy-button-primary:hover{color:var(--text_primary);background-color:hsl(var(--accent));cursor:cursor;transition:all .3s}.chasm-copy-button-secondary{font-size:14px;font-weight:500;color:hsl(var(--popover-foreground));padding:8px 14px;transition:all .3s;-webkit-user-select:none;user-select:none}#chasm-copy-partial-border{width:1px;margin-top:33px;height:calc(100% - 28px);background-color:var(--surface_chat_primary)}[chasm-dropdown-enabled]{border-top:1px solid var(--surface_chat_primary)!important;border-bottom:1px solid var(--surface_chat_primary)!important;border-right:1px solid var(--surface_chat_primary)!important}.chasm-neocopy-dropdown-parent{border-top-left-radius:0;border-bottom-left-radius:0}",He=We.construct("crack","neocopy.user.js",void 0,n=>{n.name="몰름보 카피",n.version="v3",n.grant=["GM_xmlhttpRequest"],n.connect=["127.0.0.1","d394jeh9729epj.cloudfront.net","cdn-image.static.wrtn.ai"],delete n.downloadURL,delete n.updateURL,n.author="milkyway0308",n.description="크랙 스토리를 세이프티 또는 언세이프티 방식으로 비공개 복사합니다.";});class je{constructor(t,e){this.type=t,this.id=e;}type;id;isStory(){return !this.type||this.type.length<=0||this.type==="story"}isCharacter(){return this.type==="character"}}function Ke(){return _()}function Ye(n){if(!n)return null;try{const t=new Set;let e=0;const r=(s,o=0)=>{if(!s||typeof s!=="object"||o>12||t.has(s)||e++>6e3)return null;t.add(s);if(typeof s.sourceId==="string"&&s.sourceId.length>0)return new je(typeof s.type==="string"?s.type:"story",s.sourceId);const a=["content","props","children","memoizedProps","pendingProps","return","child","sibling"];for(const c of a)if(c in s){const d=r(s[c],o+1);if(d)return d}if(o<5)for(const c of Object.values(s)){const d=r(c,o+1);if(d)return d}return null},s=[];for(let o=n,a=0;o&&a<7;o=o.parentElement,a+=1)s.push(o);for(const o of Array.from(n.querySelectorAll?.("*")??[]).slice(0,40))s.push(o);const o=document.querySelector('[aria-expanded="true"]');if(o)for(let a=o,c=0;a&&c<8;a=a.parentElement,c+=1)s.push(a);for(const a of s)for(const c of Object.keys(a).filter(d=>d.startsWith("__reactProps")||d.startsWith("__reactFiber"))){const d=r(a[c]);if(d)return d}return null}catch{return null}}function Je(){const n=Ke();if(n)return Ye(n)}async function vt(){if(!/^\/my(\/.*)?$/.test(location.pathname))return;const n=Je();n&&n.isStory()&&Ze(n);}function bt(n){return new Promise((t,e)=>{GM_xmlhttpRequest({method:"GET",url:n,responseType:"arraybuffer",onload:r=>{if(r.status<200||r.status>=300){e(new Error(`원본 미디어를 받지 못했습니다: ${r.status}`));return}const s=/content-type:\s*([^;\r\n]+)/i.exec(r.responseHeaders??"")?.[1]?.trim()??"image/png",o=s.split("/")[1]?.toLowerCase()??"png",a=o==="jpg"?"jpeg":o;t({blob:new Blob([r.response],{type:s}),fileType:a});},onerror:()=>e(new Error("원본 미디어 다운로드에 실패했습니다.")),ontimeout:()=>e(new Error("원본 미디어 다운로드 시간이 초과됐습니다.")),timeout:6e4});})}function Xe(n){return new Promise((t,e)=>{const r=new FileReader;r.onloadend=()=>{if(typeof r.result!="string"){e(new Error("표지 파일을 읽지 못했습니다."));return}const s=";base64,",o=r.result.indexOf(s);if(o<0){e(new Error("표지 파일을 변환하지 못했습니다."));return}t(r.result.slice(o+s.length));},r.onerror=()=>e(new Error("표지 파일을 읽지 못했습니다.")),r.readAsDataURL(n);})}async function Qe(n,t,e){for(let r=0;r<120;r+=1){const s=await v().getSituationImageUploadStatus(n,t,e);if(!s.ok)return {ok:false,reason:s.error instanceof Error?s.error.message:String(s.error)};const o=s.value.startingSets?.find(p=>p.baseSetId===e)??s.value.startingSets?.[0],a=o?.progress,c=Number(a?.totalCount??0),d=Number(a?.successCount??0),u=Number(a?.errorCount??0);if(c>0&&d+u>=c)return u>0||(o?.rejected?.length??0)>0?{ok:false,reason:`미디어 ${u||o.rejected.length}장을 처리하지 못했습니다.`}:{ok:true,uploads:o?.uploads??[]};await new Promise(p=>setTimeout(p,1e3));}return {ok:false,reason:"미디어 업로드 확인 시간이 초과됐습니다."}}function samePlayGuides(n,t){return n.length===t.length&&n.every((e,r)=>(e.playGuide??"")===(t[r]?.playGuide??""))}function movingCoverCandidates(n){const t=[];for(const e of[n.portraitImage,n.profileImage])for(const[r,s]of e?.imageMap?.entries?.()??[])typeof s==="string"&&s.length>0&&t.push({key:String(r),url:s});const e=({key:r,url:s})=>{const o=r.toLowerCase();return o==="gif"?0:o==="gif600"?1:/(gif|anim|moving|motion)/.test(o)||/\.gif(?:[?#]|$)/i.test(s)?2:/webp/.test(o)||/\.webp(?:[?#]|$)/i.test(s)?3:4};t.sort((r,s)=>e(r)-e(s));const r=new Set;return t.filter(s=>r.has(s.url)?false:(r.add(s.url),true))}function hasAnimatedGifFrames(n){if(n.length<13)return false;const t=String.fromCharCode(...n.slice(0,6));if(t!=="GIF87a"&&t!=="GIF89a")return false;let e=13;const r=n[10];r&128&&(e+=3*(1<<((r&7)+1)));let s=0;while(e<n.length){const o=n[e++];if(o===59)break;if(o===33){e+=1;while(e<n.length){const a=n[e++];if(a===0)break;e+=a}continue}if(o!==44||e+9>n.length)return false;const a=n[e+8];e+=9,a&128&&(e+=3*(1<<((a&7)+1))),e+=1;while(e<n.length){const c=n[e++];if(c===0)break;e+=c}if(s+=1,s>1)return true}return false}async function isAnimatedCoverBlob(n,t){const e=new Uint8Array(await n.arrayBuffer());if(hasAnimatedGifFrames(e))return true;const r=(a,c,d,u)=>{for(let p=0;p<=e.length-4;p+=1)if(e[p]===a&&e[p+1]===c&&e[p+2]===d&&e[p+3]===u)return true;return false};return r(65,78,73,77)||r(65,78,77,70)||r(97,99,84,76)}async function originalMovingCoverUrl(n){for(const t of movingCoverCandidates(n))try{const e=await bt(t.url);if(await isAnimatedCoverBlob(e.blob,t))return t.url}catch(e){console.warn("움직이는 원본 표지 확인 실패",t.url,e)}return null}async function xt(n,t){g().doToastifyAlert(`스토리 복사를 시작했어요.
잠시만 기다려 주세요.`,1e4);try{const e=await v().getDetail(n.id);if(!e.ok){const l=e.error instanceof Error?e.error.message:String(e.error);g().doToastifyAlert(`원본 스토리를 불러오지 못했어요.
${l.slice(0,4e3)}`),console.error(e.error);return}const sourceMediaVersion=e.value.imageVersion==="v1"?"v1":"v2",r=e.value.asWritable().purify().modify(l=>{l.visibility=N.PRIVATE,l.imageVersion=sourceMediaVersion;});typeof e.value.simpleDescription==="string"&&e.value.simpleDescription.length>0&&(r.simpleDescription=e.value.simpleDescription);const l=movingCoverCandidates(e.value),f=r.isMovingPortraitImage||l.some(k=>/(gif|anim|moving|motion)/i.test(k.key)||/\.gif(?:[?#]|$)/i.test(k.url));if(f){const y=await originalMovingCoverUrl(e.value);if(!y){g().doToastifyAlert("움직이는 원본 표지를 확인하지 못해 복사를 중단했어요.\n정지 표지로 바꾸지 않았어요.",1e4);return}r.portraitImageUrl=y,r.isMovingPortraitImage=!0;}const s=r.imageVersion==="v2"&&r.sets.some(l=>l.situationImages.length>0&&l.imageMatrix!==void 0),o=await v().pullNewId();if(!o.ok){const l=o.error instanceof Error?o.error.message:String(o.error);g().doToastifyAlert(`복사본 준비 실패
${l.slice(0,4e3)}`),console.error(o.error);return}let a=!1,c=0;const d=r.sets.reduce((l,f)=>l+f.situationImages.length,0);for(const l of r.sets){if(!(r.imageVersion==="v2"&&l.situationImages.length>0&&l.imageMatrix!==void 0))continue;const y=await v().prepareStartingSet();if(!y.ok){const S=y.error instanceof Error?y.error.message:String(y.error);g().doToastifyAlert(`미디어 표 준비 실패
${S.slice(0,4e3)}`),console.error(y.error);return}l.setId=y.value,a=!0;const k=10;for(let S=0;S<l.situationImages.length;S+=k){const x=l.situationImages.slice(S,S+k);g().doToastifyAlert(`미디어를 새 복사본에 올리는 중
${c}/${d}`,6e5);const M=await Promise.all(x.map(async h=>({image:h,...await bt(h.imageUrl)}))),C=await v().requestSituationImageUploads(o.value,l.setId,M.map(h=>({fileType:h.fileType,category:h.image.category??"기본",situation:h.image.situation})));if(!C.ok){const h=C.error instanceof Error?C.error.message:String(C.error);g().doToastifyAlert(`미디어 업로드 준비 실패
${h.slice(0,4e3)}`),console.error(C.error);return}const P=C.value.startingSets?.find(h=>h.baseSetId===l.setId)??C.value.startingSets?.[0],D=P?.rejected??[];if(D.length>0){g().doToastifyAlert(`미디어 ${D.length}장을 업로드할 수 없어요.`),console.error(D);return}const T=new Map((P?.uploads??[]).map(h=>[`${h.category}\0${h.situation}`,h]));await Promise.all(M.map(async h=>{const E=`${h.image.category??"기본"}\0${h.image.situation}`,R=T.get(E);if(!R?.url)throw new Error(`업로드 주소를 받지 못했습니다: ${h.image.situation}`);const O=await fetch(R.url,{method:"PUT",body:h.blob,headers:{"Content-Type":h.blob.type}});if(!O.ok)throw new Error(`미디어 업로드 실패: ${O.status}`)}));const A=C.value.bulkId;if(typeof A!="string"||A.length===0){g().doToastifyAlert("미디어 업로드 확인 번호를 받지 못했어요.");return}const $=await Qe(o.value,A,l.setId);if(!$.ok){g().doToastifyAlert(`미디어 업로드 확인 실패
${$.reason.slice(0,4e3)}`);return}const W=new Map($.uploads.map(h=>[`${h.category}\0${h.situation}`,h]));for(const h of x){const E=W.get(`${h.category??"기본"}\0${h.situation}`);if(typeof E?.url!=="string"||E.url.length===0){g().doToastifyAlert(`복사된 미디어 주소를 확인하지 못했어요: ${h.situation}`,1e4);return}h.imageUrl=E.url;}c+=x.length;}}r.visibility=N.PRIVATE;g().doToastifyAlert("비공개 복사본을 저장하는 중이에요.",6e5);const u=await v().createWithId(r,a,o.value,t);if(!u.ok){console.error(u.error);const l=u.error instanceof Error?u.error.message:String(u.error);g().doToastifyAlert(`새 스토리 복사 실패
${l.slice(0,4e3)}`);return}r.visibility=N.PRIVATE;g().doToastifyAlert("한 줄 소개와 단축어를 확인하는 중이에요.",6e5);const p=await v().edit(o.value,r,a);if(!p.ok){console.error(p.error);const l=p.error instanceof Error?p.error.message:String(p.error);g().doToastifyAlert(`복사본은 만들어졌지만 한 줄 소개와 단축어 추가 저장에 실패했어요.
${l.slice(0,4e3)}`,1e4);return}const w=r.shortcutCommands.length;let verify=await v().getDetail(o.value);if(!verify.ok){console.error(verify.error),g().doToastifyAlert("복사본은 만들어졌지만 비공개·한 줄 소개·단축어 저장 결과를 확인하지 못했어요.",1e4);return}const needsRetry=verify.value.visibility!=="private"||verify.value.simpleDescription!==r.simpleDescription||verify.value.shortcutCommands.length!==w||verify.value.imageVersion!==sourceMediaVersion||!samePlayGuides(r.sets,verify.value.startingSets);if(needsRetry){r.visibility=N.PRIVATE;const y=await v().edit(o.value,r,a);if(!y.ok){console.error(y.error),g().doToastifyAlert("복사본 확인 중 다시 저장하지 못했어요.",1e4);return}verify=await v().getDetail(o.value);if(!verify.ok){console.error(verify.error),g().doToastifyAlert("다시 저장한 복사본을 확인하지 못했어요.",1e4);return}}if(verify.value.visibility!=="private"){g().doToastifyAlert("위험: 복사본의 비공개 상태를 확인하지 못했어요. 즉시 작품 공개 상태를 확인해 주세요.",2e4);return}if(verify.value.imageVersion!==sourceMediaVersion){g().doToastifyAlert(`복사본은 비공개로 만들어졌지만 미디어 버전이 원본과 다르게 저장됐어요.\n원본: ${sourceMediaVersion==="v1"?"구버전":"뉴버전"} · 복사본: ${verify.value.imageVersion==="v1"?"구버전":"뉴버전"}`,1e4);return}if(!samePlayGuides(r.sets,verify.value.startingSets)){g().doToastifyAlert("복사본은 비공개로 만들어졌지만 플레이 가이드가 정상적으로 저장되지 않았어요.",1e4);return}if(verify.value.simpleDescription!==r.simpleDescription){g().doToastifyAlert("복사본은 비공개로 만들어졌지만 한 줄 소개가 정상적으로 저장되지 않았어요.",1e4);return}const y=verify.value.shortcutCommands.length;if(y!==w){g().doToastifyAlert(`복사본은 비공개로 만들어졌지만 단축어가 ${y}/${w}개만 저장됐어요.`,1e4);return}if(f){let movingCoverVerified=false;for(const S of movingCoverCandidates(verify.value))try{const x=await bt(S.url);if(await isAnimatedCoverBlob(x.blob,S)){movingCoverVerified=true;break}}catch(x){console.warn("복사본 움직이는 표지 확인 실패",S.url,x);}if(!movingCoverVerified){g().doToastifyAlert("복사본은 비공개로 만들어졌지만 움직이는 표지가 저장되지 않았어요.",1e4);return}}g().doToastifyAlert(`비공개 복사 완료 · 한 줄 소개와 실제 단축어 ${w}개 확인`,5e3),window.history.pushState(null,"",window.location.href),window.dispatchEvent(new Event("popstate"));}catch(e){const r=e instanceof Error?e.message:String(e);g().doToastifyAlert(`새 스토리 복사 실패
${r.slice(0,4e3)}`),console.error(e);}}async function convertMediaVersion(n,t){const e=t==="v1",r=e?`★구버전 미디어로 바꿀까요?

선택한 스토리의 미디어 형식이 구버전으로 바뀌어요.
이 작업은 자동으로 되돌릴 수 없어요.

구버전에서는 미디어를 최대 50개까지만 사용할 수 있어요.
51번째부터는 작품에서 빠지고, 이미지 이름과 분류 설정이 단순하게 바뀌며, 너무 긴 설명 일부가 잘릴 수 있어요.

먼저 비공개 복사본에서 시험해 주세요.`:`★뉴버전 미디어로 바꿀까요?

선택한 스토리의 미디어 형식이 뉴버전으로 바뀌어요.
이 작업은 자동으로 되돌릴 수 없어요.

구버전으로 바꾸는 과정에서 작품에서 빠진 이미지나 잘린 내용은 뉴버전으로 다시 바꿔도 돌아오지 않아요.`;if(!confirm(r))return;g().doToastifyAlert(e?"구버전 미디어로 바꾸는 중이에요.":"뉴버전 미디어로 바꾸는 중이에요.",6e5);const s=await v().getDetail(n.id);if(!s.ok){const o=s.error instanceof Error?s.error.message:String(s.error);g().doToastifyAlert(`작품 데이터를 불러오지 못했어요.
${o.slice(0,4e3)}`,1e4),console.error(s.error);return}try{const o=s.value.asWritable().purify(),movingCandidates=movingCoverCandidates(s.value),hadMovingCover=o.isMovingPortraitImage||movingCandidates.some(d=>/(gif|anim|moving|motion)/i.test(d.key)||/\.gif(?:[?#]|$)/i.test(d.url));if(e&&!o.sets.some(d=>d.situationImages.length>0)){g().doToastifyAlert("구버전 미디어로 바꿀 수 없어요.\n이미지가 0장인 작품은 크랙에서 항상 뉴미디어로 표시돼요.\n이미지를 1장 이상 추가한 뒤 다시 시도해 주세요.",1e4);return}e?o.dematrix():o.normalizeMediaV2();if(hadMovingCover){const d=await originalMovingCoverUrl(s.value);if(!d){g().doToastifyAlert("미디어 형식을 바꾸지 못했어요.\n움직이는 원본 표지를 확인하지 못해 저장을 중단했어요.\n정지 표지로 바꾸지 않았어요.",1e4);return}o.portraitImageUrl=d,o.isMovingPortraitImage=!0}const hasSituationImages=o.sets.some(d=>d.situationImages.length>0),a=await v().edit(n.id,o,hasSituationImages);if(!a.ok){const c=a.error instanceof Error?a.error.message:String(a.error);g().doToastifyAlert(`미디어 형식 변경에 실패했어요.
${c.slice(0,4e3)}`,1e4),console.error(a.error);return}const d=await v().getDetail(n.id);if(!d.ok){g().doToastifyAlert("미디어 형식은 저장했지만 결과를 확인하지 못했어요.",1e4);return}if(d.value.imageVersion!==(e?"v1":"v2")){g().doToastifyAlert("미디어 버전이 제대로 저장되지 않았어요.",1e4);return}if(!samePlayGuides(o.sets,d.value.startingSets)){g().doToastifyAlert("미디어 버전은 바뀌었지만 플레이 가이드가 정상적으로 유지되지 않았어요.",1e4);return}if(hadMovingCover){let u=false;for(const p of movingCoverCandidates(d.value))try{const w=await bt(p.url);if(await isAnimatedCoverBlob(w.blob,p)){u=true;break}}catch(w){console.warn("미디어 변경 후 움직이는 표지 확인 실패",p.url,w)}if(!u){g().doToastifyAlert("미디어 버전은 바뀌었지만 움직이는 표지가 저장되지 않았어요.",1e4);return}}g().doToastifyAlert(e?"★구버전 미디어 변경 완료":"★뉴버전 미디어 변경 완료",5e3),window.history.pushState(null,"",window.location.href),window.dispatchEvent(new Event("popstate"));}catch(o){const a=o instanceof Error?o.message:String(o);g().doToastifyAlert(`미디어 형식 변경에 실패했어요.
${a.slice(0,4e3)}`,1e4),console.error(o);}}function Ze(n){const t=Fe().articleListing().popup().manager();!t||t.hasModified("neocopy")||(t.addButton("★ 세이프티로 복사",()=>xt(n,false),"neocopy"),t.addButton("★ 언세이프티로 복사",()=>xt(n,true),"neocopy"),t.addButton("★구버전 미디어",()=>convertMediaVersion(n,"v1"),"neocopy"),t.addButton("★뉴버전 미디어",()=>convertMediaVersion(n,"v2"),"neocopy"));}He.version="v3.0",He.description="크랙 스토리를 비공개 복사하고 미디어 버전을 변경합니다.";H.init(()=>{H.onPagePrepare(()=>{H.callGMAddStyle(qe),vt(),Nt.attachObserver(document,vt);});});

})();

// 몰름보 카피 5.1 - 작품별 수정/삭제 잠금 기능
(function () {
    'use strict';

    const LOCK_STORAGE_PREFIX = 'mollumbo-copy:story-lock:v1:';
    const LOCK_MENU_ATTRIBUTE = 'data-mollumbo-lock-menu';
    const LOCK_BADGE_ATTRIBUTE = 'data-mollumbo-lock-badge';
    const CARD_STORY_ID_ATTRIBUTE = 'data-mollumbo-story-id';
    const CARD_SIGNATURE_PREFIX = 'mollumbo-copy:card-signature:v1:';
    const deleteGuards = new WeakMap();
    let menuCheckScheduled = false;

    function normalizeLabel(value) {
        return String(value ?? '').replace(/\s+/g, ' ').trim();
    }

    function lockStorageKey(storyId) {
        return `${LOCK_STORAGE_PREFIX}${storyId}`;
    }

    function isStoryLocked(storyId) {
        try {
            return localStorage.getItem(lockStorageKey(storyId)) === '1';
        } catch {
            return false;
        }
    }

    function saveStoryLock(storyId, locked) {
        try {
            if (locked) {
                localStorage.setItem(lockStorageKey(storyId), '1');
            } else {
                localStorage.removeItem(lockStorageKey(storyId));
            }
            return true;
        } catch {
            return false;
        }
    }

    function cardSignatureStorageKey(storyId) {
        return `${CARD_SIGNATURE_PREFIX}${storyId}`;
    }

    function normalizeThumbnailUrl(image) {
        const source = image?.currentSrc || image?.src || image?.getAttribute?.('src') || '';
        try {
            const url = new URL(source, location.href);
            const wrappedSource = url.pathname.match(/\/https?:\/\/(.+)$/)?.[0];
            return wrappedSource ? decodeURIComponent(wrappedSource.slice(1)) : `${url.origin}${url.pathname}`;
        } catch {
            return source;
        }
    }

    function cardSignature(card) {
        const image = card?.querySelector?.('img[alt="character_thumbnail"]');
        if (!image) return null;
        return JSON.stringify({
            image: normalizeThumbnailUrl(image),
            text: normalizeLabel(card.textContent)
        });
    }

    function saveCardSignature(storyId, card) {
        const signature = cardSignature(card);
        if (!signature) return;
        try {
            localStorage.setItem(cardSignatureStorageKey(storyId), signature);
        } catch {
            // 브라우저 저장 공간을 사용할 수 없으면 현재 화면에서만 표시합니다.
        }
    }

    function findStoryIdByCardSignature(card) {
        const signature = cardSignature(card);
        if (!signature) return null;
        try {
            for (let index = 0; index < localStorage.length; index += 1) {
                const key = localStorage.key(index);
                if (!key?.startsWith(CARD_SIGNATURE_PREFIX)) continue;
                if (localStorage.getItem(key) !== signature) continue;
                return key.slice(CARD_SIGNATURE_PREFIX.length);
            }
        } catch {
            return null;
        }
        return null;
    }

    function isVisible(element) {
        if (!(element instanceof Element)) return false;
        const rect = element.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
    }

    function findMenuContainer() {
        const openMenu = Array.from(document.querySelectorAll(
            '[role="menu"][data-state="open"], div[data-radix-popper-content-wrapper] [role="menu"]'
        )).find(isVisible);
        if (openMenu) return openMenu;

        const actionLabels = new Set([
            '수정', '수정하기', '삭제', '삭제하기',
            '공개로 변경', '비공개로 변경', '링크 공개로 변경', '링크공개로 변경'
        ]);
        const visibleActions = Array.from(document.querySelectorAll(
            'button, [role="menuitem"], [role="button"], div, p, span'
        )).filter((element) => actionLabels.has(normalizeLabel(element.textContent)) && isVisible(element));
        const editAction = visibleActions.find((element) => ['수정', '수정하기'].includes(normalizeLabel(element.textContent)));
        const deleteAction = visibleActions.find((element) => ['삭제', '삭제하기'].includes(normalizeLabel(element.textContent)));
        if (!editAction || !deleteAction) return null;

        for (let element = editAction, depth = 0; element && element !== document.body && depth < 10; element = element.parentElement, depth += 1) {
            if (element.contains(deleteAction) && isVisible(element) && element.children.length >= 2) return element;
        }
        return null;
    }

    function findMenuItem(container, labels) {
        if (!container) return null;
        const normalizedLabels = new Set(labels.map(normalizeLabel));
        const directChild = Array.from(container.children ?? []).find(
            (element) => normalizedLabels.has(normalizeLabel(element.textContent))
        );
        if (directChild) return directChild;

        const nested = Array.from(container.querySelectorAll(
            'button, [role="menuitem"], [role="button"], div, p, span'
        )).find((element) => normalizedLabels.has(normalizeLabel(element.textContent)));
        return nested?.closest?.('button, [role="menuitem"], [role="button"]') ?? nested ?? null;
    }

    function findStoryInfo(container, includeSurroundings = true) {
        if (!container) return null;
        const seen = new Set();
        let visits = 0;

        function scan(value, depth = 0) {
            if (!value || typeof value !== 'object' || depth > 12 || seen.has(value) || visits++ > 6000) return null;
            seen.add(value);
            if (typeof value.sourceId === 'string' && value.sourceId.length > 0) {
                return {
                    type: typeof value.type === 'string' ? value.type : 'story',
                    id: value.sourceId
                };
            }

            const preferredKeys = ['content', 'props', 'children', 'memoizedProps', 'pendingProps', 'return', 'child', 'sibling'];
            for (const key of preferredKeys) {
                if (!(key in value)) continue;
                const result = scan(value[key], depth + 1);
                if (result) return result;
            }
            if (depth < 5) {
                for (const child of Object.values(value)) {
                    const result = scan(child, depth + 1);
                    if (result) return result;
                }
            }
            return null;
        }

        const candidates = [container];
        if (includeSurroundings) {
            for (let element = container.parentElement, depth = 1; element && depth < 7; element = element.parentElement, depth += 1) {
                candidates.push(element);
            }
        }
        for (const element of Array.from(container.querySelectorAll?.('*') ?? []).slice(0, 40)) {
            candidates.push(element);
        }
        const expandedButton = includeSurroundings ? document.querySelector('[aria-expanded="true"]') : null;
        if (expandedButton) {
            for (let element = expandedButton, depth = 0; element && depth < 8; element = element.parentElement, depth += 1) {
                candidates.push(element);
            }
        }

        for (const element of candidates) {
            for (const key of Object.keys(element).filter((name) => name.startsWith('__reactProps') || name.startsWith('__reactFiber'))) {
                const result = scan(element[key]);
                if (result) return result;
            }
        }
        return null;
    }

    function findThumbnailCard(image) {
        if (!(image instanceof Element)) return null;
        for (let element = image.parentElement, depth = 0; element && depth < 7; element = element.parentElement, depth += 1) {
            const thumbnailCount = element.querySelectorAll('img[alt="character_thumbnail"]').length;
            if (thumbnailCount > 1) return null;
            if (thumbnailCount === 1 && element.querySelector('button')) return element;
        }
        return null;
    }

    function associateOpenMenuWithCard(storyId) {
        const expandedButton = document.querySelector('[aria-expanded="true"]');
        if (!(expandedButton instanceof Element)) return null;
        for (let element = expandedButton.parentElement, depth = 0; element && depth < 8; element = element.parentElement, depth += 1) {
            const thumbnails = element.querySelectorAll('img[alt="character_thumbnail"]');
            if (thumbnails.length !== 1) continue;
            const card = findThumbnailCard(thumbnails[0]);
            if (!card || !card.contains(expandedButton)) continue;
            card.setAttribute(CARD_STORY_ID_ATTRIBUTE, storyId);
            saveCardSignature(storyId, card);
            return card;
        }
        return null;
    }

    function setThumbnailLockBadge(card, locked) {
        const image = card?.querySelector?.('img[alt="character_thumbnail"]');
        const frame = image?.parentElement;
        if (!frame) return;
        const existingBadge = frame.querySelector(`[${LOCK_BADGE_ATTRIBUTE}]`);
        if (!locked) {
            existingBadge?.remove();
            return;
        }
        if (existingBadge) return;

        const badge = document.createElement('span');
        badge.setAttribute(LOCK_BADGE_ATTRIBUTE, 'true');
        badge.setAttribute('aria-label', '잠긴 작품');
        badge.textContent = '🔒';
        badge.style.cssText = [
            'position:absolute',
            'top:4px',
            'left:4px',
            'z-index:30',
            'display:flex',
            'width:22px',
            'height:22px',
            'align-items:center',
            'justify-content:center',
            'border-radius:9999px',
            'background:rgba(0,0,0,.72)',
            'box-shadow:0 1px 4px rgba(0,0,0,.35)',
            'font-size:13px',
            'line-height:1',
            'pointer-events:none',
            'user-select:none'
        ].join(';');
        frame.appendChild(badge);
    }

    function refreshThumbnailLocks() {
        if (!/^\/my(\/.*)?$/.test(location.pathname)) return;
        const images = Array.from(document.querySelectorAll('img[alt="character_thumbnail"]'));
        for (const image of images) {
            const card = findThumbnailCard(image);
            if (!card) continue;
            let storyId = card.getAttribute(CARD_STORY_ID_ATTRIBUTE);
            if (!storyId) {
                const info = findStoryInfo(card, false);
                if (info && (!info.type || info.type === 'story')) {
                    storyId = info.id;
                    card.setAttribute(CARD_STORY_ID_ATTRIBUTE, storyId);
                }
            }
            if (!storyId) {
                storyId = findStoryIdByCardSignature(card);
                if (storyId) card.setAttribute(CARD_STORY_ID_ATTRIBUTE, storyId);
            }
            setThumbnailLockBadge(card, Boolean(storyId && isStoryLocked(storyId)));
        }
    }

    function showLockedDeleteAlert() {
        alert('이 작품은 잠겨있어서 삭제가 불가능합니다.');
    }

    function setDeleteLocked(menu, locked) {
        const deleteItem = findMenuItem(menu, ['삭제', '삭제하기']);
        if (!deleteItem) return;

        const previous = deleteGuards.get(deleteItem);
        if (previous) {
            deleteItem.removeEventListener('click', previous.click, true);
            deleteItem.removeEventListener('keydown', previous.keydown, true);
            deleteGuards.delete(deleteItem);
        }

        deleteItem.removeAttribute('aria-disabled');
        deleteItem.style.removeProperty('opacity');
        deleteItem.style.removeProperty('cursor');
        deleteItem.style.removeProperty('filter');
        if (!locked) return;

        deleteItem.setAttribute('aria-disabled', 'true');
        deleteItem.style.setProperty('opacity', '0.38', 'important');
        deleteItem.style.setProperty('cursor', 'not-allowed', 'important');
        deleteItem.style.setProperty('filter', 'grayscale(1)', 'important');

        const blockClick = (event) => {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
            showLockedDeleteAlert();
        };
        const blockKeydown = (event) => {
            if (event.key === 'Enter' || event.key === ' ') blockClick(event);
        };
        deleteItem.addEventListener('click', blockClick, true);
        deleteItem.addEventListener('keydown', blockKeydown, true);
        deleteGuards.set(deleteItem, { click: blockClick, keydown: blockKeydown });
    }

    function updateLockMenu(menu, storyId, lockItem) {
        const locked = isStoryLocked(storyId);
        lockItem.textContent = locked ? '🔒 잠금해제' : '🔓 잠금';
        setDeleteLocked(menu, locked);
        associateOpenMenuWithCard(storyId);
        refreshThumbnailLocks();
    }

    function decorateOpenMenu() {
        if (!/^\/my(\/.*)?$/.test(location.pathname)) return;
        const menu = findMenuContainer();
        if (!menu) return;

        const existingLockItem = menu.querySelector(`[${LOCK_MENU_ATTRIBUTE}]`);
        if (existingLockItem) {
            const storyId = existingLockItem.getAttribute('data-mollumbo-story-id');
            if (storyId) updateLockMenu(menu, storyId, existingLockItem);
            return;
        }

        const newMediaItem = findMenuItem(menu, ['★뉴버전 미디어', '★ 뉴버전 미디어']);
        if (!newMediaItem) return;
        const storyInfo = findStoryInfo(menu);
        if (!storyInfo || (storyInfo.type && storyInfo.type !== 'story')) return;

        const lockItem = newMediaItem.cloneNode(true);
        lockItem.removeAttribute('id');
        lockItem.removeAttribute('aria-describedby');
        lockItem.setAttribute(LOCK_MENU_ATTRIBUTE, 'true');
        lockItem.setAttribute('data-mollumbo-story-id', storyInfo.id);
        lockItem.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
            const nextLocked = !isStoryLocked(storyInfo.id);
            if (!saveStoryLock(storyInfo.id, nextLocked)) {
                alert('잠금 상태를 저장하지 못했습니다.');
                return;
            }
            updateLockMenu(menu, storyInfo.id, lockItem);
        });
        newMediaItem.after(lockItem);
        updateLockMenu(menu, storyInfo.id, lockItem);
    }

    function scheduleMenuCheck() {
        if (menuCheckScheduled) return;
        menuCheckScheduled = true;
        setTimeout(() => {
            menuCheckScheduled = false;
            decorateOpenMenu();
            refreshThumbnailLocks();
            setTimeout(() => {
                decorateOpenMenu();
                refreshThumbnailLocks();
            }, 100);
        }, 0);
    }

    function lockedBuilderStoryId() {
        if (!/^\/builder\/story(\/.*)?$/.test(location.pathname)) return null;
        const params = new URLSearchParams(location.search);
        if (params.get('type') !== 'edit') return null;
        const storyId = params.get('storyId');
        return storyId && isStoryLocked(storyId) ? storyId : null;
    }

    function blockLockedBuilderModify(event) {
        if (!lockedBuilderStoryId()) return;
        const control = event.target instanceof Element
            ? event.target.closest('button, [role="button"]')
            : null;
        if (normalizeLabel(control?.textContent) !== '수정') return;

        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        alert('이 작품은 잠겨있어서 수정이 불가능합니다.');
    }

    function startLockFeature() {
        document.addEventListener('click', blockLockedBuilderModify, true);
        document.addEventListener('click', scheduleMenuCheck);
        window.addEventListener('popstate', scheduleMenuCheck);
        window.addEventListener('scroll', scheduleMenuCheck, { passive: true });
        scheduleMenuCheck();
        setTimeout(scheduleMenuCheck, 500);
        setTimeout(scheduleMenuCheck, 1500);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startLockFeature, { once: true });
    } else {
        startLockFeature();
    }
})();

// 몰름보 카피 5.1 - 채팅방 프롬프트 수정 팝업
(function () {
    'use strict';

    if (window.top !== window.self) return;

    const PROMPT_BUTTON_ID = 'mollumbo-prompt-editor-button';
    const PROMPT_MODAL_ID = 'mollumbo-prompt-editor-modal';
    const UPGRADE_MODAL_ID = 'mollumbo-version-upgrade-modal';
    const INLINE_SAVE_BUTTON_ID = 'mollumbo-prompt-editor-inline-save';
    const INLINE_CLOSE_BUTTON_ID = 'mollumbo-prompt-editor-inline-close';
    const LOCK_STORAGE_PREFIX = 'mollumbo-copy:story-lock:v1:';
    const ownershipCache = new Map();
    let promptCheckScheduled = false;

    function normalizePromptLabel(value) {
        return String(value ?? '').replace(/\s+/g, ' ').trim();
    }

    function chatInfoFromPath() {
        const modern = location.pathname.match(/^\/stories\/([a-f0-9]+)\/episodes\/([a-f0-9]+)(?:\/|$)/i);
        if (modern) return { storyId: modern[1], chatId: modern[2] };
        const legacy = location.pathname.match(/^\/u\/([a-f0-9]+)\/c\/([a-f0-9]+)(?:\/|$)/i);
        return legacy ? { storyId: legacy[1], chatId: legacy[2] } : null;
    }

    function storyIdFromChatPath() {
        return chatInfoFromPath()?.storyId ?? null;
    }

    function accessToken() {
        const match = document.cookie.match(/(?:^|; )access_token=([^;]*)/);
        return match ? decodeURIComponent(match[1]) : null;
    }

    async function isMyStory(storyId) {
        if (ownershipCache.has(storyId)) return ownershipCache.get(storyId);

        const check = (async () => {
            const token = accessToken();
            if (!token) return false;
            try {
                const response = await fetch(`https://crack-api.wrtn.ai/crack-api/stories/me/${storyId}`, {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${token}` }
                });
                return response.ok;
            } catch {
                return false;
            }
        })();
        ownershipCache.set(storyId, check);
        return check;
    }

    async function myStoryVersionKey(storyId) {
        const token = accessToken();
        if (!token) return null;
        try {
            const response = await fetch(
                `https://crack-api.wrtn.ai/crack-api/stories/me/${storyId}?mollumbo_check=${Date.now()}`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Cache-Control': 'no-cache'
                    }
                }
            );
            if (!response.ok) return null;
            const body = await response.json();
            const story = body?.data ?? body;
            return JSON.stringify([
                story?.snapshotId ?? '',
                story?.updatedAt ?? '',
                story?.version ?? story?.latestVersion ?? ''
            ]);
        } catch {
            return null;
        }
    }

    function storySaveRequestCount(iframe, storyId) {
        try {
            return iframe.contentWindow.performance.getEntriesByType('resource').filter(
                (entry) => String(entry.name).includes(`/crack-api/stories/${storyId}/v2`)
            ).length;
        } catch {
            return 0;
        }
    }

    async function waitForStorySave(storyId, previousVersionKey, iframe, previousRequestCount) {
        for (let attempt = 0; attempt < 30; attempt += 1) {
            await new Promise((resolve) => setTimeout(resolve, 500));
            if (storySaveRequestCount(iframe, storyId) > previousRequestCount) return true;
            const currentVersionKey = await myStoryVersionKey(storyId);
            if (previousVersionKey && currentVersionKey && currentVersionKey !== previousVersionKey) return true;
        }
        return false;
    }

    function isStoryLocked(storyId) {
        try {
            return localStorage.getItem(`${LOCK_STORAGE_PREFIX}${storyId}`) === '1';
        } catch {
            return false;
        }
    }

    function findChatSettingsHeading() {
        return Array.from(document.querySelectorAll('span, p')).find(
            (element) => normalizePromptLabel(element.textContent) === '채팅방 설정'
        ) ?? null;
    }

    function findNativeModifyButton(frameDocument) {
        const candidates = Array.from(frameDocument?.querySelectorAll?.('button') ?? []).filter((button) => (
            normalizePromptLabel(button.textContent) === '수정'
            && button.id !== INLINE_SAVE_BUTTON_ID
            && !button.disabled
        ));
        const visible = candidates.find((button) => {
            const rect = button.getBoundingClientRect();
            return rect.width > 0 && rect.height > 0;
        });
        return visible ?? candidates[0] ?? null;
    }

    function findVisibleNativeModifyButton(iframe) {
        try {
            const frameWindow = iframe.contentWindow;
            const viewportWidth = Number(frameWindow?.innerWidth) || Infinity;
            const viewportHeight = Number(frameWindow?.innerHeight) || Infinity;
            return Array.from(iframe.contentDocument?.querySelectorAll?.('button') ?? []).find((button) => {
                if (
                    normalizePromptLabel(button.textContent) !== '수정'
                    || button.id === INLINE_SAVE_BUTTON_ID
                    || button.disabled
                ) return false;
                const rect = button.getBoundingClientRect();
                const left = Number(rect.left ?? rect.x ?? 0);
                const top = Number(rect.top ?? rect.y ?? 0);
                const right = Number(rect.right ?? (left + rect.width));
                const bottom = Number(rect.bottom ?? (top + rect.height));
                return rect.width > 0 && rect.height > 0
                    && right > 0 && bottom > 0
                    && left < viewportWidth && top < viewportHeight;
            }) ?? null;
        } catch {
            return null;
        }
    }

    async function acquireNativeModifyButton(iframe) {
        const immediate = findNativeModifyButton(iframe.contentDocument);
        if (immediate) return { button: immediate, restore() {} };

        const originalStyle = {
            width: iframe.style.width,
            minWidth: iframe.style.minWidth,
            maxWidth: iframe.style.maxWidth,
            flex: iframe.style.flex
        };
        const restore = () => {
            iframe.style.width = originalStyle.width;
            iframe.style.minWidth = originalStyle.minWidth;
            iframe.style.maxWidth = originalStyle.maxWidth;
            iframe.style.flex = originalStyle.flex;
        };

        iframe.style.width = '1280px';
        iframe.style.minWidth = '1280px';
        iframe.style.maxWidth = 'none';
        iframe.style.flex = '0 0 1280px';

        for (let attempt = 0; attempt < 20; attempt += 1) {
            await new Promise((resolve) => setTimeout(resolve, 50));
            const button = findNativeModifyButton(iframe.contentDocument);
            if (button) return { button, restore };
        }

        restore();
        return null;
    }

    function watchStorySaveRequest(iframe, storyId) {
        try {
            const frameWindow = iframe.contentWindow;
            const originalFetch = frameWindow?.fetch;
            if (!frameWindow || typeof originalFetch !== 'function') return null;

            let resolveSave;
            let finished = false;
            const promise = new Promise((resolve) => {
                resolveSave = resolve;
            });
            const finish = (saved) => {
                if (finished) return;
                finished = true;
                resolveSave(saved);
            };
            const wrappedFetch = async (...args) => {
                const input = args[0];
                const options = args[1];
                const url = String(typeof input === 'string' ? input : input?.url ?? input ?? '');
                const method = String(options?.method ?? input?.method ?? 'GET').toUpperCase();
                try {
                    const response = await originalFetch.apply(frameWindow, args);
                    if (
                        method === 'PATCH'
                        && url.includes(`/crack-api/stories/${storyId}/v2`)
                    ) {
                        finish(response.ok);
                    }
                    return response;
                } catch (error) {
                    if (
                        method === 'PATCH'
                        && url.includes(`/crack-api/stories/${storyId}/v2`)
                    ) {
                        finish(false);
                    }
                    throw error;
                }
            };
            frameWindow.fetch = wrappedFetch;

            const xhrPrototype = frameWindow.XMLHttpRequest?.prototype;
            const originalOpen = xhrPrototype?.open;
            const originalSend = xhrPrototype?.send;
            let wrappedOpen = null;
            let wrappedSend = null;
            if (typeof originalOpen === 'function' && typeof originalSend === 'function') {
                wrappedOpen = function (method, url, ...rest) {
                    this.__mollumboStorySaveRequest = (
                        String(method).toUpperCase() === 'PATCH'
                        && String(url).includes(`/crack-api/stories/${storyId}/v2`)
                    );
                    return originalOpen.call(this, method, url, ...rest);
                };
                wrappedSend = function (...args) {
                    if (this.__mollumboStorySaveRequest) {
                        this.addEventListener('loadend', () => {
                            finish(this.status >= 200 && this.status < 300);
                        }, { once: true });
                    }
                    return originalSend.apply(this, args);
                };
                xhrPrototype.open = wrappedOpen;
                xhrPrototype.send = wrappedSend;
            }

            return {
                promise,
                restore() {
                    if (frameWindow.fetch === wrappedFetch) frameWindow.fetch = originalFetch;
                    if (xhrPrototype?.open === wrappedOpen) xhrPrototype.open = originalOpen;
                    if (xhrPrototype?.send === wrappedSend) xhrPrototype.send = originalSend;
                }
            };
        } catch {
            return null;
        }
    }

    function focusStorySettings(iframe) {
        try {
            const frameDocument = iframe.contentDocument;
            const storySettings = Array.from(frameDocument?.querySelectorAll?.('button') ?? []).find(
                (button) => normalizePromptLabel(button.textContent).startsWith('스토리 설정')
            );
            storySettings?.click();
        } catch {
            // 편집 화면이 아직 준비 중이면 사용자가 팝업 안에서 직접 탭을 누를 수 있습니다.
        }
    }

    function closePromptEditor() {
        document.getElementById(PROMPT_MODAL_ID)?.remove();
    }

    function closeVersionUpgradeDialog() {
        document.getElementById(UPGRADE_MODAL_ID)?.remove();
    }

    function createDialogButton(label, primary = false) {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = label;
        button.style.cssText = [
            'min-width:88px',
            'height:40px',
            'padding:0 18px',
            `border:${primary ? '0' : '1px solid rgba(127,127,127,.35)'}`,
            'border-radius:8px',
            `background:${primary ? '#171717' : '#fff'}`,
            `color:${primary ? '#fff' : '#171717'}`,
            'font-size:14px',
            'font-weight:700',
            'cursor:pointer'
        ].join(';');
        return button;
    }

    async function applyChatVersion(chatId) {
        const token = accessToken();
        if (!token) return { ok: false, message: '로그인 정보를 확인하지 못했습니다.' };
        try {
            const response = await fetch(
                `https://crack-api.wrtn.ai/crack-gen/v3/chats/${chatId}/snapshot/apply`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            if (response.ok) return { ok: true };
            const body = await response.json().catch(() => null);
            return {
                ok: false,
                message: body?.message ?? body?.data?.message ?? '버전 적용에 실패했습니다.'
            };
        } catch {
            return { ok: false, message: '버전 적용에 실패했습니다.' };
        }
    }

    function openVersionUpgradeDialog(storyId, chatId) {
        closeVersionUpgradeDialog();

        const overlay = document.createElement('div');
        overlay.id = UPGRADE_MODAL_ID;
        overlay.style.cssText = [
            'position:fixed',
            'inset:0',
            'z-index:2147483640',
            'display:flex',
            'align-items:center',
            'justify-content:center',
            'padding:18px',
            'background:rgba(0,0,0,.58)'
        ].join(';');

        const dialog = document.createElement('section');
        dialog.setAttribute('role', 'dialog');
        dialog.setAttribute('aria-modal', 'true');
        dialog.setAttribute('aria-label', '현재 채팅방 버전 업데이트 확인');
        dialog.style.cssText = [
            'width:min(420px,calc(100vw - 36px))',
            'padding:26px',
            'border-radius:14px',
            'background:#fff',
            'color:#171717',
            'box-shadow:0 24px 70px rgba(0,0,0,.38)'
        ].join(';');

        const message = document.createElement('strong');
        message.textContent = '현재 채팅방을 버전 업데이트 하시겠습니까?';
        message.style.cssText = 'display:block;font-size:18px;line-height:1.5;text-align:center';

        const description = document.createElement('p');
        description.textContent = '적용하면 현재 채팅방부터 수정한 프롬프트를 사용합니다.';
        description.style.cssText = 'margin:10px 0 22px;color:#666;font-size:14px;line-height:1.5;text-align:center';

        const actions = document.createElement('div');
        actions.style.cssText = 'display:flex;justify-content:center;gap:10px';
        const cancelButton = createDialogButton('취소');
        const applyButton = createDialogButton('적용', true);

        cancelButton.addEventListener('click', closeVersionUpgradeDialog);
        applyButton.addEventListener('click', async () => {
            if (chatInfoFromPath()?.chatId !== chatId || storyIdFromChatPath() !== storyId) {
                closeVersionUpgradeDialog();
                alert('채팅방이 바뀌어서 버전을 적용하지 않았습니다.');
                return;
            }
            applyButton.disabled = true;
            applyButton.textContent = '적용 중...';
            applyButton.style.opacity = '0.65';
            const result = await applyChatVersion(chatId);
            if (!result.ok) {
                applyButton.disabled = false;
                applyButton.textContent = '적용';
                applyButton.style.opacity = '1';
                alert(result.message);
                return;
            }
            closeVersionUpgradeDialog();
            location.reload();
        });
        overlay.addEventListener('click', (event) => {
            if (event.target === overlay) closeVersionUpgradeDialog();
        });

        actions.append(cancelButton, applyButton);
        dialog.append(message, description, actions);
        overlay.append(dialog);
        document.body.append(overlay);
    }

    function openPromptEditor(storyId) {
        if (document.getElementById(PROMPT_MODAL_ID)) return;

        const overlay = document.createElement('div');
        overlay.id = PROMPT_MODAL_ID;
        overlay.style.cssText = [
            'position:fixed',
            'inset:0',
            'z-index:2147483600',
            'display:flex',
            'align-items:center',
            'justify-content:center',
            'padding:18px',
            'background:rgba(0,0,0,.58)'
        ].join(';');

        const panel = document.createElement('section');
        panel.setAttribute('role', 'dialog');
        panel.setAttribute('aria-modal', 'true');
        panel.setAttribute('aria-label', '프롬프트 수정');
        panel.style.cssText = [
            'display:flex',
            'flex-direction:column',
            'width:min(1500px,96vw)',
            'height:min(940px,94vh)',
            'overflow:hidden',
            'border:1px solid rgba(127,127,127,.35)',
            'border-radius:14px',
            'background:#fff',
            'box-shadow:0 24px 70px rgba(0,0,0,.38)'
        ].join(';');

        const saveTrigger = document.createElement('button');
        saveTrigger.type = 'button';
        saveTrigger.textContent = '수정';

        const iframe = document.createElement('iframe');
        iframe.title = '스토리 설정 편집 화면';
        iframe.src = `/builder/story?storyId=${encodeURIComponent(storyId)}&type=edit`;
        iframe.style.cssText = 'width:100%;height:100%;border:0;background:#fff';

        let controlObserver = null;
        let observedFrameWindow = null;
        let controlSyncScheduled = false;

        const stopControlSync = () => {
            controlObserver?.disconnect();
            controlObserver = null;
            if (observedFrameWindow) observedFrameWindow.removeEventListener('resize', scheduleControlSync);
            observedFrameWindow = null;
        };

        const closeEditor = () => {
            stopControlSync();
            closePromptEditor();
        };

        const setSavingState = (saving) => {
            saveTrigger.disabled = saving;
            saveTrigger.textContent = saving ? '저장 중...' : '수정';
            try {
                const inlineSave = iframe.contentDocument?.getElementById(INLINE_SAVE_BUTTON_ID);
                if (inlineSave) {
                    inlineSave.disabled = saving;
                    if (inlineSave.textContent !== saveTrigger.textContent) {
                        inlineSave.textContent = saveTrigger.textContent;
                    }
                    inlineSave.style.opacity = saving ? '0.65' : '1';
                }
            } catch {
                // 편집 화면을 닫는 중이면 버튼 상태를 갱신하지 않습니다.
            }
        };

        const createInlineButton = (frameDocument, template, id, label, primary) => {
            const button = template?.cloneNode?.(true) ?? frameDocument.createElement('button');
            button.id = id;
            button.type = 'button';
            button.disabled = false;
            button.textContent = label;
            button.removeAttribute('aria-describedby');
            for (const element of button.querySelectorAll?.('[id]') ?? []) element.removeAttribute('id');
            button.style.cssText = [
                'display:inline-flex',
                'align-items:center',
                'justify-content:center',
                'flex:0 0 auto',
                'min-width:48px',
                'height:40px',
                'padding:0 10px',
                `border:${primary ? '0' : '1px solid rgba(127,127,127,.35)'}`,
                'border-radius:8px',
                `background:${primary ? '#171717' : '#fff'}`,
                `color:${primary ? '#fff' : '#171717'}`,
                'font-size:14px',
                'font-weight:700',
                'white-space:nowrap',
                'cursor:pointer'
            ].join(';');
            return button;
        };

        const findActionHost = (frameDocument, originalModifyButton) => {
            const temporarySave = Array.from(frameDocument.querySelectorAll('button')).find(
                (button) => normalizePromptLabel(button.textContent) === '임시저장'
            );
            const anchor = originalModifyButton ?? temporarySave;
            if (!anchor) return null;
            let host = anchor.parentElement;
            for (let depth = 0; host && depth < 3; depth += 1) {
                if (host.querySelectorAll('button').length >= 2) return host;
                host = host.parentElement;
            }
            return anchor.parentElement;
        };

        const syncInlineControls = () => {
            try {
                const frameDocument = iframe.contentDocument;
                if (!frameDocument?.body) return;
                const originalModifyButtons = Array.from(frameDocument.querySelectorAll('button')).filter(
                    (button) => normalizePromptLabel(button.textContent) === '수정'
                        && button.id !== INLINE_SAVE_BUTTON_ID
                );
                const visibleOriginal = findVisibleNativeModifyButton(iframe);
                const originalModify = visibleOriginal ?? originalModifyButtons[0] ?? null;
                const temporarySave = Array.from(frameDocument.querySelectorAll('button')).find(
                    (button) => normalizePromptLabel(button.textContent) === '임시저장'
                );
                const host = findActionHost(frameDocument, originalModify);
                if (!host) return;

                for (const button of originalModifyButtons) {
                    if (button.style.display !== 'none') button.style.display = 'none';
                }

                let inlineSave = frameDocument.getElementById(INLINE_SAVE_BUTTON_ID);
                if (!inlineSave) {
                    inlineSave = createInlineButton(
                        frameDocument,
                        visibleOriginal ?? temporarySave,
                        INLINE_SAVE_BUTTON_ID,
                        '수정',
                        true
                    );
                    inlineSave.addEventListener('click', (event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        saveTrigger.click();
                    });
                }

                let inlineClose = frameDocument.getElementById(INLINE_CLOSE_BUTTON_ID);
                if (!inlineClose) {
                    inlineClose = createInlineButton(
                        frameDocument,
                        visibleOriginal ?? temporarySave,
                        INLINE_CLOSE_BUTTON_ID,
                        '닫기',
                        false
                    );
                    inlineClose.setAttribute('aria-label', '닫기');
                    inlineClose.addEventListener('click', (event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        closeEditor();
                    });
                }

                if (inlineSave.parentElement !== host || inlineClose.parentElement !== host) {
                    host.append(inlineSave, inlineClose);
                }
                setSavingState(saveTrigger.disabled);
            } catch {
                // 편집 화면이 그려지는 중이면 다음 화면 변화 때 다시 시도합니다.
            }
        };

        function scheduleControlSync() {
            if (controlSyncScheduled) return;
            controlSyncScheduled = true;
            setTimeout(() => {
                controlSyncScheduled = false;
                if (document.getElementById(PROMPT_MODAL_ID)) syncInlineControls();
            }, 0);
        }

        const startControlSync = () => {
            stopControlSync();
            scheduleControlSync();
            try {
                const frameDocument = iframe.contentDocument;
                const frameWindow = iframe.contentWindow;
                const Observer = frameWindow?.MutationObserver;
                if (frameDocument?.documentElement && typeof Observer === 'function') {
                    controlObserver = new Observer(scheduleControlSync);
                    controlObserver.observe(frameDocument.documentElement, { childList: true, subtree: true });
                }
                if (frameWindow) {
                    observedFrameWindow = frameWindow;
                    frameWindow.addEventListener('resize', scheduleControlSync);
                }
            } catch {
                // 같은 크랙 주소의 편집 화면이 준비되면 재시도합니다.
            }
            setTimeout(scheduleControlSync, 300);
            setTimeout(scheduleControlSync, 1000);
        };

        iframe.addEventListener('load', () => {
            startControlSync();
            setTimeout(() => focusStorySettings(iframe), 300);
            setTimeout(() => focusStorySettings(iframe), 1000);
        });

        saveTrigger.addEventListener('click', async () => {
            if (isStoryLocked(storyId)) {
                alert('이 작품은 잠겨있어서 수정이 불가능합니다.');
                return;
            }
            try {
                const currentChat = chatInfoFromPath();
                if (!currentChat || currentChat.storyId !== storyId) {
                    closeEditor();
                    return;
                }
                setSavingState(true);
                const nativeModifyControl = await acquireNativeModifyButton(iframe);
                if (!nativeModifyControl) {
                    setSavingState(false);
                    alert('수정 화면이 아직 준비되지 않았습니다. 잠시 후 다시 눌러 주세요.');
                    return;
                }
                const nativeModifyButton = nativeModifyControl.button;
                const previousVersionKey = await myStoryVersionKey(storyId);
                if (!previousVersionKey) {
                    nativeModifyControl.restore();
                    setSavingState(false);
                    alert('저장 전 작품 버전을 확인하지 못했습니다. 잠시 후 다시 눌러 주세요.');
                    return;
                }
                const previousRequestCount = storySaveRequestCount(iframe, storyId);
                const saveWatcher = watchStorySaveRequest(iframe, storyId);
                let saved = false;
                try {
                    nativeModifyButton.click();
                    await new Promise((resolve) => setTimeout(resolve, 100));
                    nativeModifyControl.restore();
                    saved = saveWatcher
                        ? await Promise.race([
                            saveWatcher.promise,
                            waitForStorySave(storyId, previousVersionKey, iframe, previousRequestCount)
                        ])
                        : await waitForStorySave(storyId, previousVersionKey, iframe, previousRequestCount);
                } finally {
                    nativeModifyControl.restore();
                    saveWatcher?.restore();
                }
                if (!saved) {
                    setSavingState(false);
                    alert('저장 완료를 확인하지 못했습니다. 팝업 안의 오류를 확인해 주세요.');
                    return;
                }
                closeEditor();
                openVersionUpgradeDialog(storyId, currentChat.chatId);
            } catch {
                setSavingState(false);
                alert('수정 버튼을 실행하지 못했습니다. 잠시 후 다시 눌러 주세요.');
            }
        });
        overlay.addEventListener('click', (event) => {
            if (event.target === overlay) closeEditor();
        });

        panel.append(iframe);
        overlay.append(panel);
        document.body.append(overlay);
    }

    function createPromptMenuButton(template, storyId) {
        const button = template.cloneNode(true);
        button.id = PROMPT_BUTTON_ID;
        button.removeAttribute('aria-describedby');
        for (const element of button.querySelectorAll('[id]')) element.removeAttribute('id');

        const icon = button.querySelector('svg');
        if (icon) {
            icon.setAttribute('viewBox', '0 0 24 24');
            icon.setAttribute('fill', 'none');
            icon.setAttribute('stroke', 'currentColor');
            icon.setAttribute('stroke-width', '1.8');
            icon.setAttribute('stroke-linecap', 'round');
            icon.setAttribute('stroke-linejoin', 'round');
            icon.setAttribute('data-mollumbo-icon', 'pencil');
            icon.innerHTML = '<path d="M4 20h4L19 9l-4-4L4 16v4Z"></path><path d="m13.5 6.5 4 4"></path><path d="M3 21h18"></path>';
        }

        const label = Array.from(button.querySelectorAll('*')).find((element) => {
            if (normalizePromptLabel(element.textContent) !== '플레이 가이드') return false;
            return !Array.from(element.children).some(
                (child) => normalizePromptLabel(child.textContent) === '플레이 가이드'
            );
        });
        if (label) label.textContent = '★프롬프트 수정';
        else button.textContent = '★프롬프트 수정';

        button.setAttribute('role', 'button');
        button.setAttribute('tabindex', '0');
        button.style.cursor = 'pointer';
        const activate = (event) => {
            event.preventDefault();
            event.stopPropagation();
            openPromptEditor(storyId);
        };
        button.addEventListener('click', activate);
        button.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') activate(event);
        });
        return button;
    }

    async function ensurePromptMenuButton() {
        const storyId = storyIdFromChatPath();
        const existing = document.getElementById(PROMPT_BUTTON_ID);
        if (!storyId) {
            existing?.remove();
            closePromptEditor();
            closeVersionUpgradeDialog();
            return;
        }
        if (existing) return;

        const heading = findChatSettingsHeading();
        const container = heading?.parentElement;
        if (!heading || !container) return;
        const guideItem = Array.from(container.children).find(
            (element) => normalizePromptLabel(element.textContent) === '플레이 가이드'
        );
        if (!guideItem) return;
        if (!await isMyStory(storyId) || storyIdFromChatPath() !== storyId) return;

        const promptButton = createPromptMenuButton(guideItem, storyId);
        guideItem.before(promptButton);
    }

    function schedulePromptMenuCheck() {
        if (promptCheckScheduled) return;
        promptCheckScheduled = true;
        setTimeout(() => {
            promptCheckScheduled = false;
            ensurePromptMenuButton();
        }, 0);
    }

    function startPromptEditorFeature() {
        document.addEventListener('click', schedulePromptMenuCheck);
        window.addEventListener('popstate', schedulePromptMenuCheck);
        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') closePromptEditor();
        });
        schedulePromptMenuCheck();
        setTimeout(schedulePromptMenuCheck, 500);
        setTimeout(schedulePromptMenuCheck, 1500);
        setTimeout(schedulePromptMenuCheck, 3000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startPromptEditorFeature, { once: true });
    } else {
        startPromptEditorFeature();
    }
})();
