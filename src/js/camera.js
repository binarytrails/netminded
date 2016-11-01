/*
 * No Copyrights Infringement is intended. If anything was used that may have
 * copyrights, please let us know and we will remove it.
 *
 * This file implement the color tracking using the tracking.js library.
 * We use it to briefly implement an AI color recognition system.
 *
 * Concordia University
 * CART 351 : Networks & Navigation
 * Written by Vsevolod (Seva) Ivanov
 *
*/

var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    tracker = new tracking.ColorTracker();

// The ones we want to track
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
     *
     * It registers a color at tracking.js by defining the r b g precision of
     * custom color and it is tagging this colors by a colorName that we can
     * later use in the tracker events.
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
    /* We draw rectangles in the context of our canvas to display for a human
     * interpretation the detected areas by color that we track.
     */
    if (trackedColors.indexOf(rect.color) != -1)
    {
        // Set its borders to the same color that we track
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
