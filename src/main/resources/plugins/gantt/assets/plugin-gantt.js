
$(document).ready(function () {
    function getTip() {
        if ($("#gantt-tooltip").length > 0)
            return $("#gantt-tooltip");

        return $("<div />")
            .attr("id", "gantt-tooltip")
            .appendTo("body");
    }

    $("circle.gantt-point").on(
        {
            "mouseenter": function (ev) {
                var $point = $(ev.currentTarget);
                var pos = $point.offset();
                var $title = $point.children("title");
                var data = $point.attr("data-gantt-tooltip") || function () {
                    $point.attr("data-gantt-tooltip", $title.html());
                    $title.html("");
                    return $point.attr("data-gantt-tooltip");
                }();

                if (!data)
                    return;

                var $tip = getTip().html(data);

                var rect = $point[0].getBoundingClientRect();
                if (rect.width == null) {
                    rect.width = rect.right - rect.left;
                    rect.height = rect.bottom - rect.top;
                }

                pos.top -= $tip.height() + 30;
                pos.left -= $tip.width() / 2 - rect.width / 2 + 10;

                $tip.css(pos).fadeIn(10);
            }
            ,
            "mouseleave": function (ev) {
                var $tip = getTip();

                if ($tip.css("display") === "none")
                    return;

                $tip.fadeOut(10);
            }
        }
    );
});