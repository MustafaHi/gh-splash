const $  = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);
const Desktop = $("#desktop");
const CTX     = Desktop.getContext("2d");
// const Mobile  = $("#mobile") .getContext("2d");
// CTX.imageSmoothingEnabled = false;
const DOM = {
  covers: $$("#sets"),
  images: $("#images"),
  image : $$("#images img"),
}

function setup() {
	let html = '';
  for (let i of Set.images)
			html += `<div class="image"><img src="asset/test.jpg"><p>${i.title || "what"}</p></div>`;
	html += "";
	DOM.images.innerHTML = html;
  DOM.image = DOM.images.querySelectorAll("img");
}


function paintSet(setIndex) {
	if(setIndex) Set = Sets[setIndex];
	const BG = new Image();
	BG.src = Set.background;
	BG.onload = () => {
		Paint.background(BG);
    for (let t of Set.text)
      Paint.text("This is the Test - معاك وبس", t);
    for (let i in Set.images)
      Paint.image(Set.images[i], DOM.image[i]);
	}
}

document.addEventListener("DOMContentLoaded", () => {
  setup();
	paintSet();
});

let imgTarget;
$("#images").addEventListener("click", (evt) => {
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
  CTX.setTransform(matrix.translate(prop.x, prop.y));
	CTX.fillStyle = ptrn;
	Paint.rect(0, 0, prop.w, prop.h, Set.radius || 30);
}
Paint.background = (img) => {
	const ptrn = CTX.createPattern(img, "repeat");
	CTX.fillStyle = ptrn;
  CTX.resetTransform();
	CTX.fillRect(0, 0, Desktop.width, Desktop.height);
}
Paint.text = (text, prop) => {
  CTX.resetTransform();
	CTX.font = prop.f;
	CTX.textBaseline = "middle";
  CTX.textAlign = prop.a || "left";
	CTX.fillStyle = Set.color || "#222";
	CTX.fillText(text, prop.x, prop.y);
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
    images: [],
    text: [
      {
        x: 640, y: 270, f: "80px Inter",
        a: "center",
      },
			{
        x: 640, y: 380, f: "40px Inter",
        a: "center"
      },
			{
        x: 640, y: 480, f: "20px Inter",
        a: "center"
      }
    ]
  },
	{
    title: "Cover - Plus",
		background: "../asset/cover-plus-bubble.png",
		images: [
      {
        title: "page-cover",
        x: 540, y: 120,
        t: [1, 0, 0, 1, 0, 0],
        w: 200, h: 200
      }
    ],
		text: [
			{
				x: 640, y: 400,
				f: "50px Arial",
        a: "center"
      },
			{
				x: 640, y: 500,
				f: "40px Arial",
        a: "center"
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
        x: 95, y: 380, f: "80px Aldhabi"
      },
			{
        x: 95, y: 520, f: "40px Arial"
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
        x: 95, y: 380, f: "80px Aldhabi"
      },
			{
        x: 95, y: 520, f: "40px Arial"
      }
    ]
  },
  {
    title: "Page - Color",
    background: "../asset/page-color.png",
    color: "#fff",
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
        a: "center",
      },
			{
        x: 640, y: 170, f: "30px Inter",
        a: "center"
      }
    ]
  }
];
var Set = Sets[2];