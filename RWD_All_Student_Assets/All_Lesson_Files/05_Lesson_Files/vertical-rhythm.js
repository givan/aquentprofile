
// Draw a single pixel making a dashed line.
function pixelImageLine(baseline) {
  var canvas = document.createElement('canvas');
  canvas.height = baseline;
  canvas.width = 2;

  var ctx = canvas.getContext('2d');
  ctx.fillStyle = '#777';
  ctx.fillRect(0, baseline - 1, 1, 1);

  return canvas.toDataURL();
}

function updateIt() {
  function vertical_css(base_font_size_px, line_height_px, font_size_px) {
    var top_margin = 1 // 1.5;
      , bot_margin = 0 // 0.5;
      ;

    var line_count = Math.ceil(font_size_px / line_height_px)
      , multiline_height_px = (line_count * line_height_px)
      , line_height_em = (multiline_height_px / font_size_px).toFixed(4)
      , font_size_em = (font_size_px / base_font_size_px).toFixed(4)
      , margin_top_em = ((top_margin * line_height_px) / font_size_px).toFixed(4)
      , margin_bottom_em = ((bot_margin * line_height_px) / font_size_px).toFixed(4)
      ;

    return "  font-size: " + font_size_em + "em; /* " + font_size_px + "px */\n"
         + "  line-height: " + line_height_em + "em; /* " + multiline_height_px + "px */\n"
         + "  margin-top: " + margin_top_em + "em;"
         + "  margin-bottom: " + margin_bottom_em + "em;";
  }

  var base_font_size_px = parseInt($('#edit-base-font-size').val(), 10)
    , line_height_px = parseInt($('#edit-base-line-height').val(), 10)
    , line_height_em = (line_height_px / base_font_size_px).toFixed(4)
    , font_sizes = $('#edit-font-size').val() || ''
    , font_family = $('#edit-font-family option:selected').text()
    ;

  var base_css = "body {\n"
      base_css += "  font-size: " + base_font_size_px + "px;\n";
      base_css += "  font-family: " + font_family + ";\n";
      base_css += "}\n";
      base_css += "\n";
      base_css += "p {\n";
      base_css += "  font-size: 1em; /* " + base_font_size_px + "px */\n";
      base_css += "  line-height: " + line_height_em + "em; /* " + line_height_px + "px */\n";
      base_css += "  margin: 0 0 " + line_height_em + "em 0;\n";
      base_css += "}\n";

  var normal_css = "white-space: pre; padding:0; font-size: 1em; line-height: " + line_height_em + "em; margin: 0 0 " + line_height_em + "em 0;";

  var sample = "<div id='output' style='font-size: " + base_font_size_px + "px; font-family: " + font_family + "; background: #fff url(" + pixelImageLine(line_height_px) + ")'>\n";
      sample += "<div style='" + normal_css + "'>" + base_css +"</div>";

  font_sizes.split(/[\s,]+/).forEach(function(font_size_px) {
    var font_css = vertical_css(base_font_size_px, line_height_px, font_size_px);
    sample += "<div style='" + font_css + "'>/* " + font_size_px + "px - The quick brown fox jumps over the lazy dog */</div>\n";
    sample += "<div style='" + normal_css + "'>.class-for-" + font_size_px + "px {\n" + font_css + "\n}</div>";
  });
  sample += '</div>';

  jQuery("#output").replaceWith(sample);
}

// Run it now and then when the form changes;
jQuery('#vertical-rhythm').find('input,select').change(updateIt);
updateIt();
