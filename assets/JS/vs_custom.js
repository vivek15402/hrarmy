$('#filter_sidebar_btn').click(function () {
    $('#VS_sidebarMenu').toggleClass("vs_sidebar_show");
    $('.feather-search').toggleClass("svg_hide");
    $('.feather-x-square').toggleClass("svg_show");
});

$('#sheet_menu_slide_btn').click(function () {
    $('.sheet-menu-view').toggleClass("visible");
    $('.feather-menu').toggleClass("svg_show");
    $('.feather-x-square1').toggleClass("svg_hide");
    $('.vs_content').toggleClass("sheet_menu_visible");
});

$('#sheet_menu_slide_btn_mobile').click(function () {
    $('.sheet-menu-view').toggleClass("visible");
    $('.feather-menu_mobile').toggleClass("svg_hide");
    $('.feather-x-square_mobile').toggleClass("svg_show");
    $('.vs_content').toggleClass("sheet_menu_visible");
});

// Handicap Trends 



// Handicap Comparison 

$("#vs_comparison_first_btn").on("click", function () {
    $("#vs_comparison_first_btn").addClass('active');
    $("#vs_comparison_second_btn").removeClass('active');
    $('#comparison_offence').css({ "z-index": "1" });
    $('#comparison_defence').css({ "z-index": "-1" });
});

$("#vs_comparison_second_btn").on("click", function () {
    $("#vs_comparison_second_btn").addClass('active');
    $("#vs_comparison_first_btn").removeClass('active');
    $('#comparison_offence').css({ "z-index": "-1" });
    $('#comparison_defence').css({ "z-index": "1" });
});

// Handicap Statistics

$("#vs_player_first_btn").on("click", function () {
    $("#vs_player_first_btn").addClass('active');
    $("#vs_player_second_btn").removeClass('active');
    $('#player_statistics').css({ "z-index": "1" });
    $('#player_ranking').css({ "z-index": "-1" });
});

$("#vs_player_second_btn").on("click", function () {
    $("#vs_player_second_btn").addClass('active');
    $("#vs_player_first_btn").removeClass('active');
    $('#player_statistics').css({ "z-index": "-1" });
    $('#player_ranking').css({ "z-index": "1" });
});

$("#vs_team_first_btn").on("click", function () {
    $("#vs_team_first_btn").addClass('active');
    $("#vs_team_second_btn").removeClass('active');
    $('#team_statistics').css({ "z-index": "1" });
    $('#team_ranking').css({ "z-index": "-1" });
});

$("#vs_team_second_btn").on("click", function () {
    $("#vs_team_second_btn").addClass('active');
    $("#vs_team_first_btn").removeClass('active');
    $('#team_statistics').css({ "z-index": "-1" });
    $('#team_ranking').css({ "z-index": "1" });
});


$.get("./assets/components/expand_collapse_btn.txt", function (content) {
    // Append the content to div.vs_row
    $('.row_toggle').remove()
    $(content).appendTo("div.row_header");

    $(document).on('click', '.row_header.minimize', function () {
        $(this).removeClass('minimize')
        $(this).addClass('maximize')
        let this_parent = $(this).closest('.vs_row');
        this_parent.removeClass('maximize')
        this_parent.css({ "height": "40px" });
        this_parent.find('.iminimize').hide();
        this_parent.find('.imaximize').show();

    });

    $(document).on('click', '.row_header.maximize', function () {
        $(this).removeClass('maximize')
        $(this).addClass('minimize')
        let this_parent = $(this).closest('.vs_row');
        this_parent.removeClass('maximize')
        this_parent.css({ "height": "" });
        this_parent.find('.imaximize').hide();
        this_parent.find('.iminimize').show();

    });
});

$.get("./assets/components/loader.txt", function (content) {
    $(content).appendTo("div.qv_object_container");
});

$.get("./assets/components/sheet-menu.txt", function (content) {
    $(content).appendTo("div.sheet-menu-view");
    var currentPage = window.location.href.split('/Race-Insight/')[1].split('.')[0];

    $('.top-menu-element_label').each(function () {
        if (currentPage.includes($(this).attr('href').split('/')[1].split('.')[0])) {
            $(this).toggleClass('top_menu_element_active');
        } else {
            $(this).removeClass('top_menu_element_active');
        }

    });
});



$('#race_sectionals_dim_toggle').change(function () {
    if ($(this).is(':checked')) {
        $('.race_sectional_dim_popup').css('height', '155px');
    } else {
        $('.race_sectional_dim_popup').css('height', '0');
    }
});

$('#race_rankings_dim_toggle').change(function () {
    if ($(this).is(':checked')) {
        $('.race_rankings_dim_popup').css('height', '67px');
    } else {
        $('.race_rankings_dim_popup').css('height', '0');
    }
});

$('#recent_results_toggle').change(function () {
    if ($(this).is(':checked')) {
        $('.recent_results_dim_popup').css('height', '70px');
    } else {
        $('.recent_results_dim_popup').css('height', '0');
    }
});

$('#recent_results_toggle').click(function () {
    $('.recent_results_dim_popup').toggle();
    $(this).toggleClass('active');
});

$("#vs_first_btn").on("click", function () {
    // $('.R1H3C1_title')[0].innerText = $(this)[0].innerText
    $("#vs_first_btn").addClass('active');
    $("#vs_second_btn").removeClass('active');
    $('#R1H3C1').css({ "z-index": "1" });
    $('#R1H3C2').css({ "z-index": "-1" });
});

$("#vs_second_btn").on("click", function () {
    // $('.R1H3C2_title')[0].innerText = $(this)[0].innerText
    $("#vs_second_btn").addClass('active');
    $("#vs_first_btn").removeClass('active');
    $('#R1H3C1').css({ "z-index": "-1" });
    $('#R1H3C2').css({ "z-index": "1" });
});