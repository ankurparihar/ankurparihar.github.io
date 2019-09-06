var display_ribbon__slider,desktop_ribbon_btn_r,desktop_ribbon_btn_l,ribbon_items=[{parent:"display_ribbon__slider_recent",timeID:"ribbon_time__recent",lastUpdate:1567616993081,items:[{href:"/res-iitr",title:"Previous Years' content uploaded",imgsrc:"/media/iitr/sh.jpg",imgalt:"IITR Resources",subtitle:"IITR Resources"},{href:"/res-iitr?tab=timetable",title:"IITR Time-Table",imgsrc:"/media/iitr/iitr.jpg",imgalt:"IITR Time-Table",subtitle:"IITR Resources"},{href:"/res-iitr?tab=6-3",title:"Principles of Programming Languages Notes",imgsrc:"/media/iitr/princi of prog lang.jpg",imgalt:"Principles of programming languages",subtitle:"IITR Resources"},{href:"/res-iitr?tab=6-7",title:"Machine Learning Slides",imgsrc:"/media/iitr/machine learning.jpg",imgalt:"Machine Learning",subtitle:"IITR Resources"},{href:"/res-iitr?tab=6-7",title:"Image Captioning Assignment",imgsrc:"/media/iitr/machine learning.jpg",imgalt:"Image Captioning",subtitle:"IITR Resources"},{href:"/res-iitr?tab=6-6",title:"Goa Trip Photos",imgsrc:"/media/iitr/goa.jpg",imgalt:"Goa trip image",subtitle:"IITR Resources"},{href:"/res-iitr?tab=6-5",title:"Compiler Lab Codes",imgsrc:"/media/iitr/compiler lab.jpg",imgalt:"Compiler lab",subtitle:"IITR Resources"},{href:"/res-iitr?tab=6-4",title:"Compiler Design Notes",imgsrc:"/media/iitr/compiler design.jpg",imgalt:"Compiler Design",subtitle:"IITR Resources"},{href:"/res-iitr?tab=6-1",title:"Fractal Notes",imgsrc:"/media/iitr/fractals.jpg",imgalt:"fractals and applications",subtitle:"IITR Resources"}]},{parent:"display_ribbon__slider_mstwntd",timeID:"ribbon_time__mstwntd",lastUpdate:1564440492137,items:[{href:"/demo/Time-Table",title:"Time-Table Generator",imgsrc:"/media/demo/time-table-card.png",imgalt:"Time-Table Generator",subtitle:"Live Demo"},{href:"https://github.com/ankurparihar/git-ddb-docs",title:"Git-DDB",imgsrc:"/media/demo/oauth.png",imgalt:"oauth image",subtitle:"WebD Project"},{href:"/demo/fractal-generator/",title:"Fractal generator",imgsrc:"/media/demo/Sierpinski_triangle-card.png",imgalt:"fractal image",subtitle:"Live Demo"}]}],maxListLimit=12;function getDayHourString(t){var i=Math.floor(t/864e5);if(i>365){var e=Math.floor(4*i/1461);return e+(e>1?" years":" year")+" ago"}if(i>30){var a=Math.floor(2*i/61);return a+(a>1?" months ":" month ")+(0==(i=Math.floor(i-61*a/2))?"ago":i+(i>1?" days":" day")+" ago")}if(i>6){var r=Math.floor(i/7);return r+(r>1?" weeks ":" week ")+(0==(i-=7*r)?"ago":i+(i>1?" days":" day")+" ago")}var s=Math.floor((t-864e5*i)/36e5);return 0==i?0==s?"Less than an hour ago":s+(s>1?" hours":" hour")+" ago":i+(i>1?" days ":" day ")+(0==s?"ago":s+(s>1?" hours ":" hour ")+"ago")}function display_ribbons(){for(var t=0;t<ribbon_items.length;++t){ribbon=ribbon_items[t],ribbonElem=document.getElementById(ribbon.parent),document.getElementById(ribbon.timeID).innerHTML=getDayHourString((new Date).getTime()-ribbon.lastUpdate);for(var i=0;i<maxListLimit&&i<ribbon.items.length;++i){var e=document.createElement("div");e.classList.add("elevation-3","mb-16","hvc","item","card"),e.setAttribute("style","height:auto"),e.innerHTML='\n\t\t\t\t<a href="'+ribbon.items[i].href+'" draggable="false" title="'+ribbon.items[i].title+'" ondragstart="return false;">\n\t\t\t\t\t<div>\n\t\t\t\t\t\t<div class="hvc__media card__media" style="height:auto">\n\t\t\t\t\t\t\t<div class="card__media__content">\n\t\t\t\t\t\t\t\t<div class="hvc__media__cover-container">\n\t\t\t\t\t\t\t\t\t<div class="hvc__media__cover-aspect-ratio">\n\t\t\t\t\t\t\t\t\t\t<div class="hvc__media__cover">\n\t\t\t\t\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t\t\t\t\t<img src="'+ribbon.items[i].imgsrc+'" alt="'+ribbon.items[i].imgalt+'" title="'+ribbon.items[i].title+'" draggable="false" class="hvc__media__cover__image" width="auto" height="auto">\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<div class="hvc__media__cover-glass"></div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="card__title">\n\t\t\t\t\t\t\t<div class="hvc__content flex column justify-center align-center">\n\t\t\t\t\t\t\t\t<div class="spacer"></div>\n\t\t\t\t\t\t\t\t<div class="hv-title">'+ribbon.items[i].title+'</div>\n\t\t\t\t\t\t\t\t<div class="hv-subtitle">'+ribbon.items[i].subtitle+'</div>\n\t\t\t\t\t\t\t\t<div class="spacer"></div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</a>\n\t\t\t',ribbonElem.appendChild(e)}}}var lastRibbonPos=0,display_ribbon_width=null;function moveRibbonSlider(t,i){var e=t.parentElement.parentElement.parentElement;display_ribbon__slider=e.childNodes[3].childNodes[1],lastRibbonPos=display_ribbon__slider.getBoundingClientRect().left,display_ribbon_width=display_ribbon__slider.getBoundingClientRect().width,lastRibbonPos+=i*window.innerWidth/1.5,1===i&&(lastRibbonPos=lastRibbonPos>=0?0:lastRibbonPos),-1===i&&(lastRibbonPos=display_ribbon_width>window.innerWidth?lastRibbonPos<=window.innerWidth-display_ribbon_width?window.innerWidth-display_ribbon_width:lastRibbonPos:0),display_ribbon__slider.style.transform="translate3d("+lastRibbonPos+"px, 0px, 0px)",updateRibbonButtons((e=e.childNodes[1].childNodes[5]).childNodes[1],e.childNodes[3])}function updateRibbonButtons(t,i){desktop_ribbon_btn_l=t,desktop_ribbon_btn_r=i,lastRibbonPos<0?(desktop_ribbon_btn_l.disabled=!1,desktop_ribbon_btn_l.classList.remove("btn_htv--disabled")):(desktop_ribbon_btn_l.disabled="disabled",desktop_ribbon_btn_l.classList.add("btn_htv--disabled")),lastRibbonPos<=window.innerWidth-display_ribbon_width?(desktop_ribbon_btn_r.disabled="disabled",desktop_ribbon_btn_r.classList.add("btn_htv--disabled")):(desktop_ribbon_btn_r.disabled=!1,desktop_ribbon_btn_r.classList.remove("btn_htv--disabled"))}var hero_image_1=document.getElementById("hero_image-1"),application=document.querySelector(".application"),hero_image_scale=(application.scrollHeight-window.innerHeight)/(hero_image_1.height-window.innerHeight);function calculateHeroScale(){0==(hero_image_scale=(hero_image_scale=(application.scrollHeight-window.innerHeight)/(hero_image_1.height-window.innerHeight))<0?0:hero_image_scale)&&(hero_image_1.style.transform="translateY(0px)")}hero_image_scale=hero_image_scale<0?0:hero_image_scale,hero_image_1.onload=calculateHeroScale,display_ribbons(),calculateHeroScale();