const $ = (s) => document.querySelector(s);
const Desktop = $("#desktop").getContext("2d");
const Mobile  = $("#mobile").getContext("2d");

function paint(setIndex) {
	const set = Sets[setIndex];
	const BG = new Image();
	BG.src = set.background;
	BG.onload = () => {
		// Desktop.drawImage(BG, 0, 0);
		writeBackground(BG);
		Mobile.drawImage(BG, 0, 0);

		// writeText("second", set.text[1]);
	}
  for (var i of set.images) {
      const img = new Image();
      img.src = "../asset/test.jpg";
      console.log(i);
      img.onload = () => { writeImage(img, i) };
  }
  for (var t of set.text)
      writeText("first", t);
}

document.addEventListener("DOMContentLoaded", () => {
	paint(1);
});

function writeImage(img, prop) {
  const ptrn = Desktop.createPattern(img, "repeat");
  Desktop.fillStyle = ptrn;
  Desktop.transform(prop.t[0], prop.t[1], prop.t[2],
                       prop.t[3], prop.t[4], prop.t[5]);

  Desktop.fillRect(prop.x, prop.y, prop.w, prop.h);
}

function writeBackground(img) {
	const ptrn = Desktop.createPattern(img, "repeat");
	Desktop.fillStyle = ptrn;
  Desktop.resetTransform();
	Desktop.fillRect(0, 0, $("#desktop").width, $("#desktop").height);
}

function writeText(text, prop) {
	Desktop.fillStyle = "#222";
	Desktop.fillText(text, prop.x, prop.y);
	Mobile .fillText(text, prop.x, prop.y);
}

function roundedRect(ctx, x, y, width, height, radius) {
	ctx.beginPath();
	ctx.moveTo(x, y + radius);
	ctx.arcTo(x, y + height, x + radius, y + height, radius);
	ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
	ctx.arcTo(x + width, y, x + width - radius, y, radius);
	ctx.arcTo(x, y, x, y + radius, radius);
	ctx.fill()
}

const Sets = [
	{
		background: "../asset/plus-bubble.png",
		images: [],
		text: [
			{
				x: 10,
				y: 20,
				s: 20
      },
			{
				x: 50,
				y: 50,
				s: 12
      }
    ]
  },
  {
    background: "../asset/app-show.png",
    images: [
      {
        x: 95, y: 128,
        t: [1, 0, 0, 1, 0, 0],
        w: 200, h: 200
      },
      {
        x: 663, y: -24,
        t: [1, 0.09, -0.038, 1, 0, 0],
        w: 270, h: 600
      }
    ],
    text: [
      {
        x: 20, y: 10
      }
    ]
  }
];