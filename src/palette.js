let colors = [];

$("#add").click(()=>{
    const color = $("#code").val();
    if(color.length < 7 || color.charAt(0)!=='#' || colors.indexOf(color) > -1) {
        alert("Color is either invalid or already in your palette!");
        return;
    }
    colors.push(color);
    $("#code").val("");
    render_colors();
});

function render_colors() {
    $("#palette").html("");
    for(var i = 0; i < colors.length; ++i) {
        $("#palette").append(generate_swatch(colors[i]));
    }
    $(".remove").click(function() {
        let color = $(this).attr("data-color");
        $("#"+color).remove();
        colors = colors.filter(function(item) { 
            return item !== "#"+color;
        });
    });
}

function generate_swatch(color) {
    return "<div class='swatch' style='background-color: "+color+"; color: "+getColorByBgColor(color)+";'id='"+color.slice(1)+"'>\
                <p class='color-code'>"+color+"</p>\
                <button style='border-color: "+getColorByBgColor(color)+";' data-color='"+color.slice(1)+"' class='remove'>×</button>\
            </div>";
}

function getColorByBgColor(bgColor) {
    if (!bgColor) { return ''; }
    return (parseInt(bgColor.replace('#', ''), 16) > 0xffffff / 2) ? '#000' : '#fff';
}

$('#code').keypress(function(event){
	
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if(keycode == '13'){
		$("#add").click();	
	}

});