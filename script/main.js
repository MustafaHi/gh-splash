const $ = (s) => document.querySelector(s);
const Desktop = $("#desktop").getContext("2d");
const Mobile  = $("#mobile") .getContext("2d");

function paint(setIndex)
{
	const set = Sets[setIndex];
	const BG  = new Image();
				BG.src = set.background;
	BG.onload = () => {
		Desktop.drawImage(BG, 0, 0, 500, 500);
		Desktop.fillText("first", set.text[0].x, set.text[0].y);
		Desktop.fillText("second", set.text[1].x, set.text[1].y);
	}
}
document.addEventListener("DOMContentLoaded", () => {
	paint(0);
});



function roundedRect(ctx, x, y, width, height, radius)
{
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
                x: 10, y: 20,
                size: 20
            },
            {
                x: 50, y: 50,
                size: 12
            }
        ]
    }
]
