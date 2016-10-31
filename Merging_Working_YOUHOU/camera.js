/*
 *
 */
var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    tracker = new tracking.ColorTracker();

var colors = {
    skin: '#877f7f',
    snapback: '#0f307d',
    yellowBallon: '#89893f'
};

var supportedColors = ["cyan", "magenta", "yellow"],
    trackedColors = Object.keys(colors); //.concat(supportedColors);

function createCustomColor(tracking, colorName, value)
{
    /* This function is taken from:
     * https://github.com/eduardolundgren/tracking.js/blob/master/examples/assets/color_camera_gui.js
     */
    var components = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(value),
        customColorR = parseInt(components[1], 16),
        customColorG = parseInt(components[2], 16),
        customColorB = parseInt(components[3], 16);

    var colorTotal = customColorR + customColorG + customColorB;

    if (colorTotal === 0)
    {
        tracking.ColorTracker.registerColor(colorName, function(r, g, b) {
            return r + g + b < 10;
        });
    }
    else
    {
        var rRatio = customColorR / colorTotal;
        var gRatio = customColorG / colorTotal;

        tracking.ColorTracker.registerColor(colorName, function(r, g, b) {
            var colorTotal2 = r + g + b;

            if (colorTotal2 === 0) {
                if (colorTotal < 10) {
                    return true;
                }
                return false;
            }

            var rRatio2 = r / colorTotal2,
                gRatio2 = g / colorTotal2,
                deltaColorTotal = colorTotal / colorTotal2,
                deltaR = rRatio / rRatio2,
                deltaG = gRatio / gRatio2;

            return deltaColorTotal > 0.9 && deltaColorTotal < 1.1 &&
                deltaR > 0.9 && deltaR < 1.1 &&
                deltaG > 0.9 && deltaG < 1.1;
        });
    }
}

function drawRectangles(context, rect)
{
    if (trackedColors.indexOf(rect.color) != -1)
    {
        rect.color = colors[rect.color];
    }
    else
    {
        rect.color = 'red';
    }
    rect.color = '#ffffff';
    context.strokeStyle = rect.color;
    context.strokeRect(rect.x, rect.y,
            rect.width, rect.height
    );
    context.font = '11px Helvetica';
    context.fillStyle = "#fff";
    context.fillText('x: ' + rect.x + 'px',
            rect.x + rect.width + 5, rect.y + 11
    );
    context.fillText('y: ' + rect.y + 'px',
            rect.x + rect.width + 5, rect.y + 22
    );
}

window.onload = function()
{
    tracking.track('#video', tracker, { camera: true });

    tracker.on('track', function(event) {
        context.clearRect(0, 0, canvas.width, canvas.height);

        event.data.forEach(function(rect) {
            // Colors logic
            console.log(rect.color);

            if (rect.color == 'skin')
            {
                console.log('skin color logic');
            }

            // To see them on camera display turn-off the z-index on #container
            drawRectangles(context, rect);
        });

        // add the colors to the tracker
        for (var name in colors)
        {
            tracker.customColor = colors[name];
            createCustomColor(tracking, name, colors[name]);
        }
        // update the tracker
        tracker.setColors(trackedColors);
    });
};

