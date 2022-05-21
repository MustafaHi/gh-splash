const $ = document.querySelector;
const Desktop = $("#desktop").getContext("2d");
const Mobile  = $("#mobile").getContext("2d");

const Sets = [
    {
        background: "",
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