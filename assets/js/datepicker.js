var Datepicker=function(){"use strict";function e(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function t(e){return e[e.length-1]}function i(e,...t){return t.forEach(t=>{e.includes(t)||e.push(t)}),e}function s(e,t){return e?e.split(t):[]}function a(e,t,i){return(void 0===t||e>=t)&&(void 0===i||e<=i)}function n(e,t,i){return e<t?t:e>i?i:e}function r(e,t,i={},s=0,a=""){a+=`<${Object.keys(i).reduce((e,t)=>{let a=i[t];return"function"==typeof a&&(a=a(s)),`${e} ${t}="${a}"`},e)}></${e}>`;const n=s+1;return n<t?r(e,t,i,n,a):a}function o(e){return e.replace(/>\s+/g,">").replace(/\s+</,"<")}function d(e){return new Date(e).setHours(0,0,0,0)}function c(){return(new Date).setHours(0,0,0,0)}function l(...e){switch(e.length){case 0:return c();case 1:return d(e[0])}const t=new Date(0);return t.setFullYear(...e),t.setHours(0,0,0,0)}function h(e,t){const i=new Date(e);return i.setDate(i.getDate()+t)}function u(e,t){const i=new Date(e),s=i.getMonth()+t;let a=s%12;a<0&&(a+=12);const n=i.setMonth(s);return i.getMonth()!==a?i.setDate(0):n}function f(e,t){const i=new Date(e),s=i.getMonth(),a=i.setFullYear(i.getFullYear()+t);return 1===s&&2===i.getMonth()?i.setDate(0):a}function p(e,t){return(e-t+7)%7}function m(e,t,i=0){const s=new Date(e).getDay();return h(e,p(t,i)-p(s,i))}function w(e,t){const i=new Date(e).getFullYear();return Math.floor(i/t)*t}const g=/dd?|DD?|mm?|MM?|yy?(?:yy)?/,y=/[\s!-/:-@[-`{-~å¹´æœˆæ—¥]+/;let D={};const k={y:(e,t)=>new Date(e).setFullYear(parseInt(t,10)),M:void 0,m(e,t,i){const s=new Date(e);let a=parseInt(t,10)-1;if(isNaN(a)){if(!t)return NaN;const e=t.toLowerCase(),n=t=>t.toLowerCase().startsWith(e);return(a=i.monthsShort.findIndex(n))<0&&(a=i.months.findIndex(n)),a<0?NaN:s.setMonth(a)}return s.setMonth(a),s.getMonth()!==function e(t){return t>-1?t%12:e(t+12)}(a)?s.setDate(0):s.getTime()},d:(e,t)=>new Date(e).setDate(parseInt(t,10))};k.M=k.m;const b={d:e=>e.getDate(),dd:e=>v(e.getDate(),2),D:(e,t)=>t.daysShort[e.getDay()],DD:(e,t)=>t.days[e.getDay()],m:e=>e.getMonth()+1,mm:e=>v(e.getMonth()+1,2),M:(e,t)=>t.monthsShort[e.getMonth()],MM:(e,t)=>t.months[e.getMonth()],y:e=>e.getFullYear(),yy:e=>v(e.getFullYear(),2).slice(-2),yyyy:e=>v(e.getFullYear(),4)};function v(e,t){return e.toString().padStart(t,"0")}function x(e){if("string"!=typeof e)throw new Error("Invalid date format.");if(e in D)return D[e];const i=e.split(g),s=e.match(new RegExp(g,"g"));if(0===i.length||!s)throw new Error("Invalid date format.");const a=s.map(e=>b[e]),n=Object.keys(k).reduce((e,t)=>{return s.find(e=>e[0]===t)?(e[t]=k[t],e):e},{}),r=Object.keys(n);return D[e]={parser(e,t){const i=e.split(y).reduce((e,t,i)=>{if(t.length>0&&s[i]){const a=s[i][0];void 0!==k[a]&&(e[a]=t)}return e},{});return r.reduce((e,s)=>{const a=n[s](e,i[s],t);return isNaN(a)?e:a},c())},formatter:(e,s)=>a.reduce((t,a,n)=>t+`${i[n]}${a(e,s)}`,"")+t(i)}}function M(e,t,i){if(e instanceof Date||"number"==typeof e){const t=d(e);return isNaN(t)?void 0:t}if(e){if("today"===e)return c();if(t&&t.toValue){const s=t.toValue(e,t,i);return isNaN(s)?void 0:d(s)}return x(t).parser(e,i)}}function S(e,t,i){if(isNaN(e)||!e&&0!==e)return"";const s="number"==typeof e?new Date(e):e;return t.toDisplay?t.toDisplay(s,t,i):x(t).formatter(s,i)}const C=new WeakMap,{addEventListener:O,removeEventListener:V}=EventTarget.prototype;function F(e,t){let i=C.get(e);i||(i=[],C.set(e,i)),t.forEach(e=>{O.call(...e),i.push(e)})}if(!Event.prototype.composedPath){const e=(t,i=[])=>{let s;return i.push(t),t.parentNode?s=t.parentNode:t.host?s=t.host:t.defaultView&&(s=t.defaultView),s?e(s,i):i};Event.prototype.composedPath=function(){return e(this.target)}}function E(e,t){const i="function"==typeof t?t:e=>e.matches(t);return function e(t,i,s,a=0){const n=t[a];return i(n)?n:n!==s&&n.parentElement?e(t,i,s,a+1):void 0}(e.composedPath(),i,e.currentTarget)}const N={en:{days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],daysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],daysMin:["Su","Mo","Tu","We","Th","Fr","Sa"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],today:"Today",clear:"Clear",titleFormat:"MM y"}},B={autohide:!1,beforeShowDay:null,beforeShowDecade:null,beforeShowMonth:null,beforeShowYear:null,calendarWeeks:!1,clearBtn:!1,dateDelimiter:",",datesDisabled:[],daysOfWeekDisabled:[],daysOfWeekHighlighted:[],defaultViewDate:void 0,disableTouchKeyboard:!1,format:"mm/dd/yyyy",language:"en",maxDate:null,maxNumberOfDates:1,maxView:3,minDate:null,nextArrow:"Â»",orientation:"auto",prevArrow:"Â«",showDaysOfWeek:!0,showOnFocus:!0,startView:0,title:"",todayBtn:!1,todayBtnMode:0,todayHighlight:!1,weekStart:0},L=document.createRange();function W(e){return L.createContextualFragment(e)}function A(e){"none"!==e.style.display&&(e.style.display&&(e.dataset.styleDisplay=e.style.display),e.style.display="none")}function Y(e){"none"===e.style.display&&(e.dataset.styleDisplay?(e.style.display=e.dataset.styleDisplay,delete e.dataset.styleDisplay):e.style.display="")}function T(e){e.firstChild&&(e.removeChild(e.firstChild),T(e))}const{language:H,format:$,weekStart:j}=B;function K(e,t){return e.length<6&&t>=0&&t<7?i(e,t):e}function P(e){return(e+6)%7}function _(e,t,i,s){const a=M(e,t,i);return void 0!==a?a:s}function I(e,t){const i=parseInt(e,10);return i>=0&&i<4?i:t}function q(t,s){const a=Object.assign({},t),n={},r=s.constructor.locales;let{format:o,language:d,locale:c,maxDate:h,maxView:u,minDate:f,startView:p,weekStart:m}=s.config||{};if(a.language){let e;if(a.language!==d&&(r[a.language]?e=a.language:void 0===r[e=a.language.split("-")[0]]&&(e=!1)),delete a.language,e){d=n.language=e;const t=c||r[H];c=Object.assign({format:$,weekStart:j},r[H]),d!==H&&Object.assign(c,r[d]),n.locale=c,o===t.format&&(o=n.format=c.format),m===t.weekStart&&(m=n.weekStart=c.weekStart,n.weekEnd=P(c.weekStart))}}if(a.format){const e="function"==typeof a.format.toDisplay,t="function"==typeof a.format.toValue,i=g.test(a.format);(e&&t||i)&&(o=n.format=a.format),delete a.format}let w=f,y=h;if(void 0!==a.minDate&&(w=null===a.minDate?l(0,0,1):_(a.minDate,o,c,w),delete a.minDate),void 0!==a.maxDate&&(y=null===a.maxDate?void 0:_(a.maxDate,o,c,y),delete a.maxDate),y<w?(f=n.minDate=y,h=n.maxDate=w):(f!==w&&(f=n.minDate=w),h!==y&&(h=n.maxDate=y)),a.datesDisabled&&(n.datesDisabled=a.datesDisabled.reduce((e,t)=>{const s=M(t,o,c);return void 0!==s?i(e,s):e},[]),delete a.datesDisabled),void 0!==a.defaultViewDate){const e=M(a.defaultViewDate,o,c);void 0!==e&&(n.defaultViewDate=e),delete a.defaultViewDate}if(void 0!==a.weekStart){const e=Number(a.weekStart)%7;isNaN(e)||(m=n.weekStart=e,n.weekEnd=P(e)),delete a.weekStart}if(a.daysOfWeekDisabled&&(n.daysOfWeekDisabled=a.daysOfWeekDisabled.reduce(K,[]),delete a.daysOfWeekDisabled),a.daysOfWeekHighlighted&&(n.daysOfWeekHighlighted=a.daysOfWeekHighlighted.reduce(K,[]),delete a.daysOfWeekHighlighted),void 0!==a.maxNumberOfDates){const e=parseInt(a.maxNumberOfDates,10);e>=0&&(n.maxNumberOfDates=e,n.multidate=1!==e),delete a.maxNumberOfDates}a.dateDelimiter&&(n.dateDelimiter=String(a.dateDelimiter),delete a.dateDelimiter);let D=u;void 0!==a.maxView&&(D=I(a.maxView,u),delete a.maxView),D!==u&&(u=n.maxView=D);let k=p;if(void 0!==a.startView&&(k=I(a.startView,k),delete a.startView),(k=u<k?u:k)!==p&&(n.startView=k),a.prevArrow){const e=W(a.prevArrow);e.childNodes.length>0&&(n.prevArrow=e.childNodes),delete a.prevArrow}if(a.nextArrow){const e=W(a.nextArrow);e.childNodes.length>0&&(n.nextArrow=e.childNodes),delete a.nextArrow}if(void 0!==a.disableTouchKeyboard&&(n.disableTouchKeyboard="ontouchstart"in document&&!!a.disableTouchKeyboard,delete a.disableTouchKeyboard),a.orientation){const e=a.orientation.toLowerCase().split(/\s+/g);n.orientation={x:e.find(e=>"left"===e||"right"===e)||"auto",y:e.find(e=>"top"===e||"bottom"===e)||"auto"},delete a.orientation}if(void 0!==a.todayBtnMode){switch(a.todayBtnMode){case 0:case 1:n.todayBtnMode=a.todayBtnMode}delete a.todayBtnMode}return Object.keys(a).forEach(t=>{void 0!==a[t]&&e(B,t)&&(n[t]=a[t])}),n}const R=o('<div class="datepicker">\n  <div class="datepicker-picker">\n    <div class="datepicker-header">\n      <div class="datepicker-title"></div>\n      <div class="datepicker-controls">\n        <button class="%buttonClass% prev-btn"></button>\n        <button class="%buttonClass% view-switch"></button>\n        <button class="%buttonClass% next-btn"></button>\n      </div>\n    </div>\n    <div class="datepicker-main"></div>\n    <div class="datepicker-footer">\n      <div class="datepicker-controls">\n        <button class="%buttonClass% today-btn"></button>\n        <button class="%buttonClass% clear-btn"></button>\n      </div>\n    </div>\n  </div>\n</div>'),J=o(`<div class="days">\n  <div class="days-of-week">${r("span",7,{class:"dow"})}</div>\n  <div class="datepicker-grid">${r("span",42)}</div>\n</div>`),U=o(`<div class="calendar-weeks">\n  <div class="days-of-week"><span class="dow"></span></div>\n  <div class="weeks">${r("span",6,{class:"week"})}</div>\n</div>`);class z{constructor(e,t){Object.assign(this,t,{picker:e,element:W('<div class="datepicker-view"></div>').firstChild,selected:[]}),this.init(this.picker.datepicker.config)}init(e){this.setOptions(e),this.updateFocus(),this.updateSelection()}performBeforeHook(e,t,s){let a=this.beforeShow(new Date(s));switch(typeof a){case"boolean":a={enabled:a};break;case"string":a={classes:a}}if(a){if(!1===a.enabled&&(e.classList.add("disabled"),i(this.disabled,t)),a.classes){const s=a.classes.split(/\s+/);e.classList.add(...s),s.includes("disabled")&&i(this.disabled,t)}a.content&&function(e,t){T(e),t instanceof DocumentFragment?e.appendChild(t):"string"==typeof t?e.appendChild(W(t)):"function"==typeof t.forEach&&t.forEach(t=>{e.appendChild(t)})}(e,a.content)}}}class X extends z{constructor(e){super(e,{id:0,name:"days",cellClass:"day"})}init(e,t=!0){if(t){const e=W(J).firstChild;this.dow=e.firstChild,this.grid=e.lastChild,this.element.appendChild(e)}super.init(e)}setOptions(t){let i;if(e(t,"minDate")&&(this.minDate=t.minDate),e(t,"maxDate")&&(this.maxDate=t.maxDate),t.datesDisabled&&(this.datesDisabled=t.datesDisabled),t.daysOfWeekDisabled&&(this.daysOfWeekDisabled=t.daysOfWeekDisabled,i=!0),t.daysOfWeekHighlighted&&(this.daysOfWeekHighlighted=t.daysOfWeekHighlighted),void 0!==t.todayHighlight&&(this.todayHighlight=t.todayHighlight),void 0!==t.weekStart&&(this.weekStart=t.weekStart,this.weekEnd=t.weekEnd,i=!0),t.locale){const e=this.locale=t.locale;this.dayNames=e.daysMin,this.switchLabelFormat=e.titleFormat,this.switchLabel=S(this.picker.viewDate,e.titleFormat,e),i=!0}if(void 0!==t.beforeShowDay&&(this.beforeShow="function"==typeof t.beforeShowDay?t.beforeShowDay:void 0),void 0!==t.calendarWeeks)if(t.calendarWeeks&&!this.calendarWeeks){const e=W(U).firstChild;this.calendarWeeks={element:e,dow:e.firstChild,weeks:e.lastChild},this.element.insertBefore(e,this.element.firstChild)}else this.calendarWeeks&&!t.calendarWeeks&&(this.element.removeChild(this.calendarWeeks.element),this.calendarWeeks=null);void 0!==t.showDaysOfWeek&&(t.showDaysOfWeek?(Y(this.dow),this.calendarWeeks&&Y(this.calendarWeeks.dow)):(A(this.dow),this.calendarWeeks&&A(this.calendarWeeks.dow))),i&&Array.from(this.dow.children).forEach((e,t)=>{const i=(this.weekStart+t)%7;e.textContent=this.dayNames[i],e.className=this.daysOfWeekDisabled.includes(i)?"dow disabled":"dow"})}updateFocus(){const e=new Date(this.picker.viewDate),t=e.getFullYear(),i=e.getMonth(),s=l(t,i,1),a=m(s,this.weekStart,this.weekStart);this.first=s,this.last=l(t,i+1,0),this.start=a,this.switchLabel=S(e,this.switchLabelFormat,this.locale),this.focused=this.picker.viewDate}updateSelection(){const{dates:e,range:t}=this.picker.datepicker;this.selected=e,this.range=t}render(){if(this.today=this.todayHighlight?c():void 0,this.disabled=[...this.datesDisabled],this.picker.setViewSwitchLabel(this.switchLabel),this.picker.setPrevBtnDisabled(this.first<=this.minDate),this.picker.setNextBtnDisabled(this.last>=this.maxDate),this.calendarWeeks){const e=m(this.first,1,1);Array.from(this.calendarWeeks.weeks.children).forEach((t,i)=>{t.textContent=function(e){const t=m(e,4,1),i=m(new Date(t).setMonth(0,4),4,1);return Math.round((t-i)/6048e5)+1}(h(e,7*i))})}Array.from(this.grid.children).forEach((e,t)=>{const s=e.classList,a=h(this.start,t),n=new Date(a),r=n.getDay();if(e.className=`datepicker-cell ${this.cellClass}`,e.dataset.date=a,e.textContent=n.getDate(),a<this.first?s.add("prev"):a>this.last&&s.add("next"),this.today===a&&s.add("today"),(a<this.minDate||a>this.maxDate||this.disabled.includes(a))&&s.add("disabled"),this.daysOfWeekDisabled.includes(r)&&(s.add("disabled"),i(this.disabled,a)),this.daysOfWeekHighlighted.includes(r)&&s.add("highlighted"),this.range){const[e,t]=this.range;a>e&&a<t&&s.add("range"),a===e&&s.add("range-start"),a===t&&s.add("range-end")}this.selected.includes(a)&&s.add("selected"),a===this.focused&&s.add("focused"),this.beforeShow&&this.performBeforeHook(e,a,a)})}refresh(){const[e,t]=this.range||[];this.grid.querySelectorAll(".range, .range-start, .range-end, .selected, .focused").forEach(e=>{e.classList.remove("range","range-start","range-end","selected","focused")}),Array.from(this.grid.children).forEach(i=>{const s=Number(i.dataset.date),a=i.classList;s>e&&s<t&&a.add("range"),s===e&&a.add("range-start"),s===t&&a.add("range-end"),this.selected.includes(s)&&a.add("selected"),s===this.focused&&a.add("focused")})}refreshFocus(){const e=Math.round((this.focused-this.start)/864e5);this.grid.querySelectorAll(".focused").forEach(e=>{e.classList.remove("focused")}),this.grid.children[e].classList.add("focused")}}class G extends z{constructor(e){super(e,{id:1,name:"months",cellClass:"month"})}init(e,t=!0){t&&(this.grid=this.element,this.element.classList.add("months","datepicker-grid"),this.grid.appendChild(W(r("span",12,{"data-month":e=>e})))),super.init(e)}setOptions(t){if(t.locale&&(this.monthNames=t.locale.monthsShort),e(t,"minDate"))if(void 0===t.minDate)this.minYear=this.minMonth=this.minDate=void 0;else{const e=new Date(t.minDate);this.minYear=e.getFullYear(),this.minMonth=e.getMonth(),this.minDate=e.setDate(1)}if(e(t,"maxDate"))if(void 0===t.maxDate)this.maxYear=this.maxMonth=this.maxDate=void 0;else{const e=new Date(t.maxDate);this.maxYear=e.getFullYear(),this.maxMonth=e.getMonth(),this.maxDate=l(this.maxYear,this.maxMonth+1,0)}void 0!==t.beforeShowMonth&&(this.beforeShow="function"==typeof t.beforeShowMonth?t.beforeShowMonth:void 0)}updateFocus(){const e=new Date(this.picker.viewDate);this.year=e.getFullYear(),this.switchLabel=this.year,this.focused=e.getMonth()}updateSelection(){this.selected=this.picker.datepicker.dates.reduce((e,t)=>{const s=new Date(t),a=s.getFullYear(),n=s.getMonth();return void 0===e[a]?e[a]=[n]:i(e[a],n),e},{})}render(){this.disabled=[],this.picker.setViewSwitchLabel(this.switchLabel),this.picker.setPrevBtnDisabled(this.year<=this.minYear),this.picker.setNextBtnDisabled(this.year>=this.maxYear);const e=this.selected[this.year]||[],t=this.year<this.minYear||this.year>this.maxYear,i=this.year===this.minYear,s=this.year===this.maxYear;Array.from(this.grid.children).forEach((a,n)=>{const r=a.classList;a.className=`datepicker-cell ${this.cellClass}`,a.textContent=this.monthNames[n],(t||i&&n<this.minMonth||s&&n>this.maxMonth)&&r.add("disabled"),e.includes(n)&&r.add("selected"),n===this.focused&&r.add("focused"),this.beforeShow&&this.performBeforeHook(a,n,l(this.year,n,1))})}refresh(){const e=this.selected[this.year]||[];this.grid.querySelectorAll(".selected, .focused").forEach(e=>{e.classList.remove("selected","focused")}),Array.from(this.grid.children).forEach((t,i)=>{const s=t.classList;e.includes(i)&&s.add("selected"),i===this.focused&&s.add("focused")})}refreshFocus(){this.grid.querySelectorAll(".focused").forEach(e=>{e.classList.remove("focused")}),this.grid.children[this.focused].classList.add("focused")}}class Q extends z{constructor(e,t){super(e,t)}init(e,t=!0){var i;t&&(this.navStep=10*this.step,this.beforeShowOption=`beforeShow${i=this.cellClass,[...i].reduce((e,t,i)=>e+=i?t:t.toUpperCase(),"")}`,this.grid=this.element,this.element.classList.add(this.name,"datepicker-grid"),this.grid.appendChild(W(r("span",12)))),super.init(e)}setOptions(t){if(e(t,"minDate")&&(void 0===t.minDate?this.minYear=this.minDate=void 0:(this.minYear=w(t.minDate,this.step),this.minDate=l(this.minYear,0,1))),e(t,"maxDate")&&(void 0===t.maxDate?this.maxYear=this.maxDate=void 0:(this.maxYear=w(t.maxDate,this.step),this.maxDate=l(this.maxYear,11,31))),void 0!==t[this.beforeShowOption]){const e=t[this.beforeShowOption];this.beforeShow="function"==typeof e?e:void 0}}updateFocus(){const e=new Date(this.picker.viewDate),t=w(e,this.navStep),i=t+9*this.step;this.first=t,this.last=i,this.start=t-this.step,this.switchLabel=`${t}-${i}`,this.focused=w(e,this.step)}updateSelection(){this.selected=this.picker.datepicker.dates.reduce((e,t)=>i(e,w(t,this.step)),[])}render(){this.disabled=[],this.picker.setViewSwitchLabel(this.switchLabel),this.picker.setPrevBtnDisabled(this.first<=this.minYear),this.picker.setNextBtnDisabled(this.last>=this.maxYear),Array.from(this.grid.children).forEach((e,t)=>{const i=e.classList,s=this.start+t*this.step;e.className=`datepicker-cell ${this.cellClass}`,e.textContent=e.dataset.year=s,0===t?i.add("prev"):11===t&&i.add("next"),(s<this.minYear||s>this.maxYear)&&i.add("disabled"),this.selected.includes(s)&&i.add("selected"),s===this.focused&&i.add("focused"),this.beforeShow&&this.performBeforeHook(e,s,l(s,0,1))})}refresh(){this.grid.querySelectorAll(".selected, .focused").forEach(e=>{e.classList.remove("selected","focused")}),Array.from(this.grid.children).forEach(e=>{const t=Number(e.textContent),i=e.classList;this.selected.includes(t)&&i.add("selected"),t===this.focused&&i.add("focused")})}refreshFocus(){const e=Math.round((this.focused-this.start)/this.step);this.grid.querySelectorAll(".focused").forEach(e=>{e.classList.remove("focused")}),this.grid.children[e].classList.add("focused")}}function Z(e,t){const i={date:e.getDate(),viewDate:new Date(e.picker.viewDate),viewId:e.picker.currentView.id,datepicker:e};e.element.dispatchEvent(new CustomEvent(t,{detail:i}))}function ee(e,t){const{minDate:i,maxDate:s}=e.config,{currentView:a,viewDate:r}=e.picker;let o;switch(a.id){case 0:o=u(r,t);break;case 1:o=f(r,t);break;default:o=f(r,t*a.navStep)}o=n(o,i,s),e.picker.changeFocus(o).render()}function te(e){const t=e.picker.currentView.id;t!==e.config.maxView&&e.picker.changeView(t+1).render()}function ie(e,t){const i=e.picker,s=new Date(i.viewDate),a=i.currentView.id,n=1===a?u(s,t-s.getMonth()):f(s,t-s.getFullYear());i.changeFocus(n).changeView(a-1).render()}function se(t,i){if(void 0!==i.title&&(i.title?(t.controls.title.textContent=i.title,Y(t.controls.title)):(t.controls.title.textContent="",A(t.controls.title))),i.prevArrow){const e=t.controls.prevBtn;T(e),i.prevArrow.forEach(t=>{e.appendChild(t.cloneNode(!0))})}if(i.nextArrow){const e=t.controls.nextBtn;T(e),i.nextArrow.forEach(t=>{e.appendChild(t.cloneNode(!0))})}if(i.locale&&(t.controls.todayBtn.textContent=i.locale.today,t.controls.clearBtn.textContent=i.locale.clear),void 0!==i.todayBtn&&(i.todayBtn?Y(t.controls.todayBtn):A(t.controls.todayBtn)),e(i,"minDate")||e(i,"maxDate")){const{minDate:e,maxDate:i}=t.datepicker.config;t.controls.todayBtn.disabled=!a(c(),e,i)}void 0!==i.clearBtn&&(i.clearBtn?Y(t.controls.clearBtn):A(t.controls.clearBtn))}function ae(e){const{dates:i,config:s}=e;return n(i.length>0?t(i):s.defaultViewDate,s.minDate,s.maxDate)}function ne(e,t){const i=new Date(e.viewDate),s=new Date(t),{id:a,year:n,first:r,last:o}=e.currentView,d=s.getFullYear();switch(e.viewDate=t,d!==i.getFullYear()&&Z(e.datepicker,"changeYear"),s.getMonth()!==i.getMonth()&&Z(e.datepicker,"changeMonth"),a){case 0:return t<r||t>o;case 1:return d!==n;default:return d<r||d>o}}function re(e){return window.getComputedStyle(e).direction}class oe{constructor(e){this.datepicker=e;const t=R.replace(/%buttonClass%/g,e.config.buttonClass),i=this.element=W(t).firstChild,[s,a,n]=i.firstChild.children,r=s.firstElementChild,[o,d,l]=s.lastElementChild.children,[h,u]=n.firstChild.children,f={title:r,prevBtn:o,viewSwitch:d,nextBtn:l,todayBtn:h,clearBtn:u};this.main=a,this.controls=f;const p=e.inline?"inline":"dropdown";i.classList.add(`datepicker-${p}`),se(this,e.config),this.viewDate=ae(e),F(e,[[i,"click",function(e,t){t.preventDefault(),t.stopPropagation(),e.inline||!e.picker.active||e.config.disableTouchKeyboard||e.inputField.focus()}.bind(null,e)],[a,"click",function(e,t){const i=E(t,".datepicker-cell");if(i&&!i.classList.contains("disabled"))switch(e.picker.currentView.id){case 0:e.setDate(Number(i.dataset.date));break;case 1:ie(e,Number(i.dataset.month));break;default:ie(e,Number(i.dataset.year))}}.bind(null,e)],[f.viewSwitch,"click",function(e){te(e)}.bind(null,e)],[f.prevBtn,"click",function(e){ee(e,-1)}.bind(null,e)],[f.nextBtn,"click",function(e){ee(e,1)}.bind(null,e)],[f.todayBtn,"click",function(e){const t=e.picker,i=c();if(1===e.config.todayBtnMode){if(e.config.autohide)return void e.setDate(i);e.setDate(i,{render:!1}),t.update()}t.viewDate!==i&&t.changeFocus(i),t.changeView(0).render()}.bind(null,e)],[f.clearBtn,"click",function(e){e.setDate({clear:!0})}.bind(null,e)]]),this.views=[new X(this),new G(this),new Q(this,{id:2,name:"years",cellClass:"year",step:1}),new Q(this,{id:3,name:"decades",cellClass:"decade",step:10})],this.currentView=this.views[e.config.startView],this.currentView.render(),this.main.appendChild(this.currentView.element),e.config.container.appendChild(this.element)}setOptions(e){se(this,e),this.views.forEach(t=>{t.init(e,!1)}),this.currentView.render()}detach(){this.datepicker.config.container.removeChild(this.element)}show(){if(this.active)return;this.element.classList.add("active"),this.active=!0;const e=this.datepicker;if(!e.inline){const t=re(e.inputField);t!==re(e.config.container)?this.element.dir=t:this.element.dir&&this.element.removeAttribute("dir"),this.place(),e.config.disableTouchKeyboard&&e.inputField.blur()}Z(e,"show")}hide(){this.active&&(this.datepicker.exitEditMode(),this.element.classList.remove("active"),this.active=!1,Z(this.datepicker,"hide"))}place(){const{classList:e,style:t}=this.element,{config:i,inputField:s}=this.datepicker,a=i.container,{width:n,height:r}=this.element.getBoundingClientRect(),{left:o,top:d,width:c}=a.getBoundingClientRect(),{left:l,top:h,width:u,height:f}=s.getBoundingClientRect();let p,m,w,{x:g,y:y}=i.orientation;a===document.body?(p=window.scrollY,m=l+window.scrollX,w=h+p):(m=l-o,w=h-d+(p=a.scrollTop)),"auto"===g&&(m<0?(g="left",m=10):g=m+n>c?"right":"rtl"===re(s)?"right":"left"),"right"===g&&(m-=n-u),"auto"===y&&(y=w-r<p?"bottom":"top"),"top"===y?w-=r:w+=f,e.remove("datepicker-orient-top","datepicker-orient-bottom","datepicker-orient-right","datepicker-orient-left"),e.add(`datepicker-orient-${y}`,`datepicker-orient-${g}`),t.top=w?`${w}px`:w,t.left=m?`${m}px`:m}setViewSwitchLabel(e){this.controls.viewSwitch.textContent=e}setPrevBtnDisabled(e){this.controls.prevBtn.disabled=e}setNextBtnDisabled(e){this.controls.nextBtn.disabled=e}changeView(e){const t=this.currentView,i=this.views[e];return i.id!==t.id&&(this.currentView=i,this._renderMethod="render",Z(this.datepicker,"changeView"),this.main.replaceChild(i.element,t.element)),this}changeFocus(e){return this._renderMethod=ne(this,e)?"render":"refreshFocus",this.views.forEach(e=>{e.updateFocus()}),this}update(){const e=ae(this.datepicker);return this._renderMethod=ne(this,e)?"render":"refresh",this.views.forEach(e=>{e.updateFocus(),e.updateSelection()}),this}render(){const e=this._renderMethod||"render";delete this._renderMethod,this.currentView[e]()}}function de(e,t,i,s){const n=e.picker.currentView,r=n.step||1;let o,d,c=e.picker.viewDate;switch(n.id){case 0:c=s?h(c,7*i):t.ctrlKey||t.metaKey?f(c,i):h(c,i),o=h,d=(e=>n.disabled.includes(e));break;case 1:c=u(c,s?4*i:i),o=u,d=(e=>{const t=new Date(e),{year:i,disabled:s}=n;return t.getFullYear()===i&&s.includes(t.getMonth())});break;default:c=f(c,i*(s?4:1)*r),o=f,d=(e=>n.disabled.includes(w(e,r)))}void 0!==(c=function e(t,i,s,n,r,o){if(a(t,r,o))return n(t)?e(i(t,s),i,s,n,r,o):t}(c,o,i<0?-r:r,d,n.minDate,n.maxDate))&&e.picker.changeFocus(c).render()}function ce(e,t){return e.map(e=>S(e,t.format,t.locale)).join(t.dateDelimiter)}function le(e,t,i){if(0===e.length)return i?void 0:[];let s=e.reduce((e,i)=>{const s=M(i,t.format,t.locale);return void 0===s||!a(s,t.minDate,t.maxDate)||e.includes(s)||t.datesDisabled.includes(s)||t.daysOfWeekDisabled.includes(new Date(s).getDay())||e.push(s),e},[]);return 0!==s.length?(i&&t.multidate&&(s=s.reduce((e,t)=>(i.includes(t)||e.push(t),e),i.filter(e=>!s.includes(e)))),t.maxNumberOfDates&&s.length>t.maxNumberOfDates?s.slice(-1*t.maxNumberOfDates):s):void 0}return class{constructor(e,t={},i){e.datepicker=this,this.element=e;const a=this.config=Object.assign({buttonClass:t.buttonClass&&String(t.buttonClass)||"button",container:document.body,defaultViewDate:c(),maxDate:void 0,minDate:void 0},q(B,this));this._options=t,Object.assign(a,q(t,this));const n=this.inline="INPUT"!==e.tagName;let r,o;if(n)a.container=e,o=s(e.dataset.date,a.dateDelimiter),delete e.dataset.date;else{const i=t.container?document.querySelector(t.container):null;i&&(a.container=i),(r=this.inputField=e).classList.add("datepicker-input"),o=s(r.value,a.dateDelimiter)}this.dates=le(o,a)||[],i&&"DateRangePicker"===i.constructor.name&&(this.rangepicker=i,Object.defineProperty(this,"range",{get(){return this.rangepicker.dates}}));const d=this.picker=new oe(this);if(n)this.show();else{const e=function(e,t){const i=e.element,s=e.picker.element;E(t,e=>e===i||e===s)||(e.refresh("input"),e.hide())}.bind(null,this);F(this,[[r,"keydown",function(e,t){if("Tab"===t.key)return e.refresh("input"),void e.hide();const i=e.picker.currentView.id;if(e.picker.active)if(e.editMode)switch(t.key){case"Escape":e.exitEditMode();break;case"Enter":e.exitEditMode({update:!0,autohide:e.config.autohide});break;default:return}else switch(t.key){case"Escape":t.shiftKey?e.enterEditMode():e.picker.hide();break;case"ArrowLeft":t.ctrlKey||t.metaKey?ee(e,-1):de(e,t,-1,!1);break;case"ArrowRight":t.ctrlKey||t.metaKey?ee(e,1):de(e,t,1,!1);break;case"ArrowUp":t.ctrlKey||t.metaKey?te(e):de(e,t,-1,!0);break;case"ArrowDown":de(e,t,1,!0);break;case"Enter":0===i?e.setDate(e.picker.viewDate):e.picker.changeView(i-1).render();break;case"Backspace":case"Delete":return void e.enterEditMode();default:return void(1!==t.key.length||t.ctrlKey||t.metaKey||e.enterEditMode())}else switch(t.key){case"ArrowDown":case"Escape":e.picker.show();break;case"Enter":e.update();break;default:return}t.preventDefault(),t.stopPropagation()}.bind(null,this)],[r,"focus",function(e){e.config.showOnFocus&&e.show()}.bind(null,this)],[r,"mousedown",function(e,t){const i=t.target;e.picker.active&&(i._clicking=setTimeout(()=>{delete i._clicking},2e3))}.bind(null,this)],[r,"click",function(e,t){const i=t.target;i._clicking&&(clearTimeout(i._clicking),delete i._clicking,e.enterEditMode())}.bind(null,this)],[r,"paste",function(e,t){t.clipboardData.types.includes("text/plain")&&e.enterEditMode()}.bind(null,this)],[document,"mousedown",e],[document,"touchstart",e],[window,"resize",d.place.bind(d)]])}}static formatDate(e,t,i){return S(e,t,i&&N[i]||N.en)}static parseDate(e,t,i){return M(e,t,i&&N[i]||N.en)}static get locales(){return N}get active(){return!(!this.picker||!this.picker.active)}setOptions(e){const t=this.picker,i=q(e,this);Object.assign(this._options,e),Object.assign(this.config,i),t.setOptions(i);const s=t.currentView.id;i.maxView<s?t.changeView(i.maxView):void 0===i.startView||t.active||i.startView===s||t.changeView(i.startView),this.refresh()}show(){this.inputField&&this.inputField.disabled||this.picker.show()}hide(){this.inline||(this.picker.hide(),this.picker.update().changeView(this.config.startView).render())}destroy(){return this.hide(),function(e){let t=C.get(e);t&&(t.forEach(e=>{V.call(...e)}),C.delete(e))}(this),this.picker.detach(),this.inline||this.inputField.classList.remove("datepicker-input"),delete this.element.datepicker,this}getDate(e){const t=e?t=>S(t,e,this.config.locale):e=>new Date(e);return this.config.multidate?this.dates.map(t):this.dates.length>0?t(this.dates[0]):void 0}setDate(...e){const i=[...e],s={clear:!1,render:!0,autohide:this.config.autohide},a=t(e);"object"!=typeof a||Array.isArray(a)||a instanceof Date||Object.assign(s,i.pop());const n=Array.isArray(i[0])?i[0]:i,r=s.clear?void 0:this.dates,o=le(n,this.config,r);o&&(o.toString()!==this.dates.toString()?(this.dates=o,s.render?(this.picker.update(),this.refresh()):this.refresh("input"),Z(this,"changeDate")):this.refresh("input"),s.render&&s.autohide&&this.hide())}update(e){if(this.inline)return;const t=Object.assign({autohide:!1},e),i=le(s(this.inputField.value,this.config.dateDelimiter),this.config);i&&(i.toString()!==this.dates.toString()?(this.dates=i,this.picker.update(),this.refresh(),Z(this,"changeDate")):this.refresh("input"),t.autohide&&this.hide())}refresh(e){"input"!==e&&this.picker.render(),this.inline||"picker"===e||(this.inputField.value=ce(this.dates,this.config))}enterEditMode(){this.inline||!this.picker.active||this.editMode||(this.editMode=!0,this.inputField.classList.add("in-edit"))}exitEditMode(e){if(this.inline||!this.editMode)return;const t=Object.assign({update:!1},e);delete this.editMode,this.inputField.classList.remove("in-edit"),t.update?this.update(t):this.inputField.value=ce(this.dates,this.config)}}}();