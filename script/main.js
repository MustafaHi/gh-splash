//| MustafaHi - Social Preview Builder
//| https://github.com/MustafaHi/gh-social

const $  = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);
const Desktop = $("#desktop");
const CTX     = Desktop.getContext("2d");
// const Mobile  = $("#mobile") .getContext("2d");
// CTX.imageSmoothingEnabled = false;
const DOM = {
  covers: $("#sets"),
  images: $("#images"),
  image : $$("#images img"),
  texts : $("#texts"),
  text  : $$("#texts input")
};

document.addEventListener("DOMContentLoaded", () => {
  setup(true);
  Promise.all(Array.from(document.images).filter(img => !img.complete).map(img => new Promise(resolve => { img.onload = img.onerror = resolve; }))).then(() => {
    paintSet();
  });
});


function setup(init = false) {
  let html = '';
  if (init)
  {
  for (let i in Sets)
      html += `<div class="image" index="${i}"><img src="${Sets[i].background}"><p>${Sets[i].title}</p></div>`;
	DOM.covers.innerHTML = html;
      html = '';
  }
  for (let i of Set.images)
			html += `<div class="image"><img src="asset/test.jpg"><p>${i.title || "what"}</p><span>${i.w + "x" + i.h}</span></div>`;
	DOM.images.innerHTML = html;
  DOM.image = DOM.images.querySelectorAll("img");
      html = '';
  for (let t of Set.text)
      html += `<div class="text" title="${t.title || "title"}"><input type="text" value="${t.title || "title"}"/></div>`;
  DOM.texts.innerHTML = html;
  DOM.text = DOM.texts.querySelectorAll("input");
}

async function paintSet(setIndex) {
	if(setIndex) Set = Sets[setIndex];
	const BG = new Image();
	BG.src = Set.background;
	BG.onload = () => {
		Paint.background(BG);
    for (let i in Set.text)
      Paint.text(DOM.text[i].value, Set.text[i]);
//      Paint.text("This is the Test - معاك وبس", t);
    for (let i in Set.images)
      Paint.image(Set.images[i], DOM.image[i]);
	}
}


DOM.texts.addEventListener("input", (evt) => {
	paintSet();
});
DOM.covers.addEventListener("click", (evt) => {
  let target = evt.target.closest(".image")
  if (target) {
    Set = Sets[target.getAttribute("index")];
    setup();
    Promise.all(Array.from(document.images).filter(img => !img.complete).map(img => new Promise(resolve => { img.onload = img.onerror = resolve; }))).then(() => {
      paintSet();
    });
  }
});
let imgTarget;
DOM.images.addEventListener("click", (evt) => {
  let target = evt.target.closest(".image")
  if (target) {
      imgTarget = target.querySelector("img");
      $("#uploader").click();
  }
});
$("#uploader").addEventListener("change", (evt, v) => {
  let reader = new FileReader();
      reader.onload = (evt) => {
        imgTarget.setAttribute("src", evt.target.result);
        paintSet();
      }
      reader.readAsDataURL(evt.target.files[0]);
      evt.target.value = "";
});

const Paint = {};

Paint.image = (prop, img) => {
	const matrix = new DOMMatrix(prop.t);
  CTX.setTransform(matrix);
	const ptrn = CTX.createPattern(img, "no-repeat");
  	// CTX.setTransform(prop.t[0], prop.t[1], prop.t[2],
  	// 								 prop.t[3], prop.t[4], prop.t[5]);
  let height = (img.naturalHeight / img.naturalWidth) * prop.w;
  ptrn.setTransform(new DOMMatrix().scale(height / img.naturalHeight));
  CTX.translate(prop.x, prop.y);
	CTX.fillStyle = ptrn;
	Paint.rect(0, 0, prop.w, prop.h, Set.radius || 30);
}
Paint.background = (img) => {
	const ptrn = CTX.createPattern(img, "repeat");
	CTX.fillStyle = ptrn;
  CTX.resetTransform();
	CTX.fillRect(0, 0, Desktop.width, Desktop.height);
}
Paint.text = (txt, prop) => {
	if (!prop.w) prop.w = 500;
	CTX.resetTransform();
	CTX.font = prop.f;
	CTX.textBaseline = "middle";
  CTX.textAlign = Set.align || "left";
	CTX.fillStyle = Set.color || "#222";

	let x = prop.x, y = prop.y,
      lines = txt.split("\\n");

	for (let i = 0; i < lines.length; i++)
  {
    let words = lines[i].trim().split(' '),
        line = '';
		for (let n = 0; n < words.length; n++)
    {
			let testLine = line + words[n] + ' ',
			    metrics = CTX.measureText(testLine);
			if (metrics.width > prop.w && n > 0) {
          CTX.fillText(line, x, y);
          line = words[n] + ' ';
          y += parseInt(prop.f);
			} else {
          line = testLine;
			}
		}
		CTX.fillText(line, x, y);
		y += parseInt(prop.f);
	}
}
Paint.rect = (x, y, width, height, radius) => {
	CTX.beginPath();
	CTX.moveTo(x, y + radius);
	CTX.arcTo(x, y + height, x + radius, y + height, radius);
	CTX.arcTo(x + width, y + height, x + width, y + height - radius, radius);
	CTX.arcTo(x + width, y, x + width - radius, y, radius);
	CTX.arcTo(x, y, x, y + radius, radius);
	CTX.fill();
}

const Sets = [
  {
    title: "Cover - World",
    background: "../asset/cover-world.png",
    color: "#222",
    align: "center",
    images: [],
    text: [
      {
        x: 640, y: 270, f: "80px Inter",
      },
			{
        title: "description",
        x: 640, y: 380, f: "40px Inter",
      },
			{
        title: "link",
        x: 640, y: 480, f: "20px Inter",
      }
    ]
  },
	{
    title: "Cover - Plus",
		background: "../asset/cover-plus-bubble.png",
    align: "center",
		images: [
      {
        title: "icon",
        x: 540, y: 120,
        t: [1, 0, 0, 1, 0, 0],
        w: 200, h: 200
      }
    ],
		text: [
			{
				x: 640, y: 400,
				f: "50px Arial",
      },
			{
        title: "description",
				x: 640, y: 500,
				f: "40px Arial",
      }
    ]
  },
  {
    title: "App",
    background: "../asset/app-show.png",
    radius: 30,
    images: [
      {
        title: "icon",
        x: 95, y: 100,
        t: [1, 0, 0, 1, 0, 0],
        w: 200, h: 200
      },
      {
        title: "phone 01",
        x: 662, y: -14,
        t: [1, 0.08, -0.07, 1, 0, 0],
        w: 290, h: 700
      },
      {
        title: "phone 02",
        x: 1006.5, y: -88,
        t: [1, 0.080, -0.07, 1, 0, 0],
        w: 290, h: 628
      }
    ],
    text: [
      {
        x: 95, y: 380, f: "70px Inter"
      },
			{
        title: "description",
        x: 95, y: 520, f: "40px Inter"
      }
    ]
  },
  {
    title: "Page - Dark",
    background: "../asset/page-black.png",
    color: "#fff",
    radius: 41,
    images: [
      {
        title: "icon",
        x: 95, y: 100,
        t: [1, 0, 0, 1, 0, 0],
        w: 200, h: 200
      },
      {
        title: "page",
        x: 612, y: 220,
        t: [1, -0.13, 0.261, 1, 0, 0],
        w: 660, h: 680
      }
    ],
    text: [
      {
        x: 95, y: 380, f: "80px Inter"
      },
			{
        title: "description",
        x: 95, y: 520, f: "40px Inter"
      }
    ]
  },
  {
    title: "Page - Color",
    background: "../asset/page-color.png",
    color: "#fff",
    align: "center",
    radius: 9,
    images: [
      {
        title: "page",
        x: 150, y: 223,
        t: [1, 0, 0, 1, 0, 0],
        w: 980, h: 510
      }
    ],
    text: [
      {
        x: 640, y: 80, f: "45px Inter",
      },
			{
        title: "description",
        x: 640, y: 170, f: "30px Inter",
        w: 880
      }
    ]
  }
];
var Set = Sets[0];