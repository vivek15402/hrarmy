
// Horse Profile Filters
app.getObject('vs_horse_filter', 'dqGaQtp')
app.getObject('vs_trainer_filter', 'MdAWWj')
app.getObject('vs_owner_filter', 'VuBpESt')
app.getObject('vs_jockey_filter', 'xrHvq')
app.getObject('vs_breeder_filter', 'PZhsbS')
app.getObject('vs_age_filter', 'zHuYjb')

// app.field('raceDate').selectMatch('12/26/2023', true);

app.getAppLayout(() => {
    app.getObject('1b62f30f-2aba-42c4-b6fe-fa84eb491c19').then(function (model) {
        fetchAllData(model, 30).then(matrix => {
            let horse_table_data_matrix = matrix;

            let keys = ['trainer', 'avgodds', 'avgspeed', 'maxspeed', 'races', 'wins'];

            let horse_table_data = horse_table_data_matrix.map(array => {
                let obj = {};
                array.forEach((value, index) => {
                    obj[keys[index]] = value.qText;
                });
                return obj;
            });

            // console.log(horse_table_data);
            $(`.vs_horse_cards_container`).empty();
            horse_table_data.forEach((element, index) => {

                let horse_cards_html = `
                    <div class="col vs_horse_details">
                        <div class="vs_horse_details_first_col">
                            <div class="vs_horse_name_age">
                                <div class="vs_horse_name">${element.trainer}</div>
                                <div class="vs_horse_age">Runs: <span>${element.races}</span> &nbsp; Wins: <span>${element.wins}</span></div>
                            </div>
                        </div>
                        <div class="vs_horse_details_second_col">
                            <div class="vs_horse_TOB_details">
                                <div class="vs_horse_TOB">Avg Odds<br><span>${horse_table_data[index].avgodds}</span></div>
                                <div class="vs_horse_TOB">Avg Speed<br><span>${horse_table_data[index].avgspeed}</span></div>
                                <div class="vs_horse_TOB">Max Speed<br><span>${horse_table_data[index].maxspeed}</span></div>
                            </div>
                        </div>
                        <button class="horse_view_report" horse_name="${horse_table_data[index].trainer}">View Report</button>
                    </div>`;

                $(`.vs_horse_cards_container`).append(horse_cards_html);
            });
        });
    });
})

// Form 
function horse_profile_cont1_tab1() {
    app.getObject('horse_profile_cont1_tab1_1', 'TAuTwX')
}

function horse_profile_cont1_tab2() {
    app.getObject('horse_profile_cont1_tab2_1', 'pLxNJaM')
}

// Sectionals

function horse_profile_cont2_tab1() {
    show_race_sectional_Charts('horse_profile_cont2_tab1_1', '663c4be4-05b9-41b8-91e8-2838d7f2e210')
    app.getObject('horse_profile_cont2_tab1_2', 'pJsDer')
}

function horse_profile_cont2_tab2() {
    show_race_sectional_Charts('horse_profile_cont2_tab2_1', '63a116f1-b885-4e4f-8c86-3668eecdeadf')
    app.getObject('horse_profile_cont2_tab2_2', 'dPBEtPQ')
}

function horse_profile_cont2_tab3() {
    show_race_sectional_Charts('horse_profile_cont2_tab3_1', '37bdc6e4-9933-4001-aa80-6243a8e565fc')
    app.getObject('horse_profile_cont2_tab3_2', 'BNqdcJA')
}

function horse_profile_cont2_tab4() {
    show_race_sectional_Charts('horse_profile_cont2_tab4_1', 'd5e8e6a5-a441-4668-95d9-f36cc5f2681c')
    app.getObject('horse_profile_cont2_tab4_2', 'Zfxxx')
}

function horse_profile_cont2_tab5() {
    show_race_sectional_Charts('horse_profile_cont2_tab5_1', '943be205-cb10-42a6-b14f-204d24b86112')
    app.getObject('horse_profile_cont2_tab5_2', 'xpVcMu')
}

// Rankings

function horse_profile_cont3_tab1() {
    show_race_ranking_Charts('horse_profile_cont3_tab1_1', '171c10ba-3458-42a0-8aed-13a367d3199c')
    app.getObject('horse_profile_cont3_tab1_2', '122cb5e8-1f6d-4dcf-a550-98cb5e45c1e2')
}

function horse_profile_cont3_tab2() {
    show_race_ranking_Charts('horse_profile_cont3_tab2_1', '8c4d8120-88c3-4414-b790-de682660444d')
    app.getObject('horse_profile_cont3_tab2_2', '61ba4b00-2357-4145-93ca-10106378d9cf')
}

$('.vs_content').on('click', '.horse_view_report', function () {
    let fieldName = $(this).attr('horse_name').trim()
    app.field('trainerName').selectMatch(fieldName, true);
    var parentElement = $(this).closest('.vs_horse_details');
    $('.vs_horse_card_container').empty()
    $('.vs_horse_card_container').append(parentElement)

    $('.vs_horse_cards_container').css({ 'display': 'none' })
    $('.vs_horse_filters').css({ 'display': 'none' })
    $('.horse_details').css({ 'display': 'flex' })
    
    $('.ripple-container').hide();

    // Content

    tabbedContainer('horse_profile_cont1')

    tabbedContainer('horse_profile_cont2')

    tabbedContainer('horse_profile_cont3')

    app.getAppLayout(() => {
        horse_profile_cont1_tab1()
        horse_profile_cont2_tab1()
        horse_profile_cont3_tab1()

        app.getObject('snYbF').then(function (reply) {

            let race_report_matrix = reply.layout.qHyperCube.qDataPages[0].qMatrix
            // console.log(race_report_matrix);

            let keys = ['commmentary', 'Race', 'Pos', 'Beaten by', 'Jockey', 'Trainer', 'Odds', 'Distance (ft)', 'Avg Speed', 'Max Speed', 'vlink'];

            let race_report = race_report_matrix.map(array => {
                let obj = {};
                array.forEach((value, index) => {
                    obj[keys[index]] = value.qText;
                });
                return obj;
            });

            race_report.sort(function (a, b) {
                return a.Pos - b.Pos;
            });

            // console.log(race_report);

            var html_table = `<table class="vs_custom_table" id="raceResults">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Race</th>
                                    <th>Position</th>
                                    <th>Btn By</th>
                                    <th>Jockey</th>
                                    <th>Trainer</th>
                                    <th>Odds</th>
                                    <th>Distance (ft)</th>
                                    <th>Avg Speed</th>
                                    <th>Max Speed</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>`;
            $('#vs_recent_form').empty()
            $('#vs_recent_form').append(html_table)
            var tableBody = $('#raceResults tbody');

            for (var i = 0; i < race_report.length * 2; i++) {
                var rowData = race_report[Math.floor(i / 2)];
                var isOddRow = i % 2 === 1;

                var row = $('<tr>');

                if (isOddRow) {
                    // Odd row contains commentary
                    row.append($('<td colspan="11">').text(rowData.commmentary));
                } else {
                    // Even row contains other data
                    row.append($('<td>').html('<a class="video_url" href="#furlong_videos_popup"><img src="./assets/Images/play-circle.svg" alt="Icon"></a>'));
                    row.append($('<td>').text(rowData.Race));
                    row.append($('<td>').text(rowData.Pos));
                    // row.append($('<td>').html('<img src="' + rowData.Silk + '" alt="Silk" height="30">'));
                    row.append($('<td>').text(rowData["Beaten by"]));
                    row.append($('<td>').text(rowData.Jockey));
                    row.append($('<td>').text(rowData.Trainer));
                    row.append($('<td>').text(rowData.Odds));
                    row.append($('<td>').text(rowData["Distance (ft)"]));
                    row.append($('<td>').text(rowData["Avg Speed"]));
                    row.append($('<td>').text(rowData["Max Speed"]));
                }

                tableBody.append(row);
            }
        })
    })

})

$('.vs_content').on('click', '#back_to_horse_selection', function () {
    $('.vs_horse_card_container').empty()
    $('.vs_horse_cards_container').css({ 'display': 'flex' })
    $('.vs_horse_filters').css({ 'display': 'flex' })
    $('.horse_details').css({ 'display': 'none' })
    // app.field('raceDate').selectMatch('12/26/2023', true);
    app.field('trainerName').clear()
})

// app.getAppLayout(function () {
//     app.getObject('snYbF').then(function (reply) {

//         let race_report_matrix = reply.layout.qHyperCube.qDataPages[0].qMatrix
//         // console.log(race_report_matrix);

//         let keys = ['commmentary', 'Race', 'Pos', 'Beaten by', 'Jockey', 'Trainer', 'Odds', 'Distance (ft)', 'Avg Speed', 'Max Speed', 'vlink'];

//         let race_report = race_report_matrix.map(array => {
//             let obj = {};
//             array.forEach((value, index) => {
//                 obj[keys[index]] = value.qText;
//             });
//             return obj;
//         });

//         race_report.sort(function (a, b) {
//             return a.Pos - b.Pos;
//         });

//         // console.log(race_report);

//         var html_table = `<table class="vs_custom_table" id="raceResults">
//                             <thead>
//                                 <tr>
//                                     <th></th>
//                                     <th>Race</th>
//                                     <th>Position</th>
//                                     <th>Btn By</th>
//                                     <th>Jockey</th>
//                                     <th>Trainer</th>
//                                     <th>Odds</th>
//                                     <th>Distance (ft)</th>
//                                     <th>Avg Speed</th>
//                                     <th>Max Speed</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                             </tbody>
//                         </table>`;
//         $('#vs_recent_form').empty()
//         $('#vs_recent_form').append(html_table)
//         var tableBody = $('#raceResults tbody');

//         for (var i = 0; i < race_report.length * 2; i++) {
//             var rowData = race_report[Math.floor(i / 2)];
//             var isOddRow = i % 2 === 1;

//             var row = $('<tr>');

//             if (isOddRow) {
//                 // Odd row contains commentary
//                 row.append($('<td colspan="11">').text(rowData.commmentary));
//             } else {
//                 // Even row contains other data
//                 row.append($('<td>').html('<a class="video_url" href="#furlong_videos_popup"><img src="./assets/Images/play-circle.svg" alt="Icon"></a>'));
//                 row.append($('<td>').text(rowData.Race));
//                 row.append($('<td>').text(rowData.Pos));
//                 // row.append($('<td>').html('<img src="' + rowData.Silk + '" alt="Silk" height="30">'));
//                 row.append($('<td>').text(rowData["Beaten by"]));
//                 row.append($('<td>').text(rowData.Jockey));
//                 row.append($('<td>').text(rowData.Trainer));
//                 row.append($('<td>').text(rowData.Odds));
//                 row.append($('<td>').text(rowData["Distance (ft)"]));
//                 row.append($('<td>').text(rowData["Avg Speed"]));
//                 row.append($('<td>').text(rowData["Max Speed"]));
//             }

//             tableBody.append(row);
//         }
//     })

//     // app.getObject('vs_duration_sectional', '86a51735-1267-4fb1-8a2b-9d335903e020');
//     // show_race_sectional_Charts('vs_duration_sectional_horse', 'tmBuTa')
//     // app.getObject('vs_duration_sectional_horse', 'mcZYQZc')

//     // show_race_ranking_Charts('vs_sectional_horse', 'HhNeg')
//     // app.getObject('vs_sectional_tab_horse', 'Sskb')
// });

// app.getObject('vs_horse_form_race_type', 'JCFqQf').then(function () {
//     $('.ripple-container').hide()
// })

// $("#vs_race_type_btn").on("click", function () {
//     // $('.R1H3C1_title')[0].innerText = $(this)[0].innerText
//     $("#vs_race_type_btn").addClass('active');
//     $("#vs_course_type_btn").removeClass('active');
//     $('#vs_horse_form_race_type').css({ "display": "flex" });
//     $('#vs_horse_form_course').css({ "display": "none" });
// });

// $("#vs_course_type_btn").on("click", function () {
//     // $('.R1H3C2_title')[0].innerText = $(this)[0].innerText
//     $("#vs_course_type_btn").addClass('active');
//     $("#vs_race_type_btn").removeClass('active');
//     $('#vs_horse_form_race_type').css({ "display": "none" });
//     $('#vs_horse_form_course').css({ "display": "flex" });
//     app.getObject('vs_horse_form_course', 'pNFpped').then(function () {
//         $('.ripple-container').hide()
//     })
// });

// app.getObject('vs_horse_form_recent', 'yPQHvb')




// app.getAppLayout(function () {
//     show_race_sectional_Charts('vs_duration_sectional_horse', 'CaMzTG')
// })

// app.getObject('vs_duration_sectional_tab_horse', 'mcZYQZc')

// vRace_Sectional_Graphs = {
//     vs_duration_sectional_horse: 'tmBuTa',
//     vs_duration_overall_horse: 'pmeMhw',
//     vs_distance_horse: 'SCPxcm',
//     vs_max_speed_horse: 'yVaY',
//     vs_avg_speed_horse: 'fdkGJ'
//     // vs_detailed_speed: 'a2be99c4-65d4-47d8-80a3-4cbc3985b386'
// }

// vRace_Sectional_Tables = {
//     vs_duration_sectional_tab_horse: 'mcZYQZc',
//     vs_duration_overall_tab_horse: 'pxcrdaw',
//     vs_distance_tab_horse: 'nXVPwhG',
//     vs_max_speed_tab_horse: 'pfJLHTa',
//     vs_avg_speed_tab_horse: 'USpCcAW'
// }

// $('.horse_sectional_dim_popup .model_dim').change(function () {

//     $('.horse_sectionals_dim_toggle_popup .vs_switch label').text($(this).attr('data-text'))
//     var sectional_graph_html_id = $(this).attr('sectional_graph_id')
//     var sectional_table_html_id = $(this).attr('sectional_table_id')

//     $('.sectionals_graph_item').css({ 'display': 'none' })
//     $('.sectionals_table_item').css({ 'display': 'none' })

//     if ($(this).is(':checked')) {
//         app.getObject(sectional_table_html_id, vRace_Sectional_Tables[sectional_table_html_id]);
//         $(`#${sectional_table_html_id}`).css({ 'display': 'flex' })

//         // app.getObject(sectional_graph_html_id, vRace_Sectional_Graphs[sectional_graph_html_id]);

//         show_race_sectional_Charts(sectional_graph_html_id, vRace_Sectional_Graphs[sectional_graph_html_id])
//         $(`#${sectional_graph_html_id}`).css({ 'display': 'flex' })
//     }

//     // if ($(this).closest('.detailed_speed').length > 0) {
//     // 	// Radio button with class .detailed_speed is selected
//     // 	$('.race_sectionals_toolbox .switch_btns_container').css({ 'pointer-events': 'none', 'opacity': '0.5' });
//     // } else {
//     // 	// Radio button without class .detailed_speed is selected
//     // 	$('.race_sectionals_toolbox .switch_btns_container').css({ 'pointer-events': 'all', 'opacity': '1' });
//     // }
// });


// let vRace_Rankings_Graphs = {
//     vs_sectional_horse: 'HhNeg',
//     vs_overall_horse: 'HmeBpf'
// }

// let vRace_Rankings_Tables = {
//     vs_sectional_tab_horse: 'Sskb',
//     vs_overall_tab_horse: 'QvnxhY'
// }

// $('.horse_rankings_dim_popup .model_dim').change(function () {

//     $('.horse_rankings_dim_toggle_popup .vs_switch label').text($(this).attr('data-text'))
//     var rankings_graph_html_id = $(this).attr('rankings_graph_id')
//     var rankings_table_html_id = $(this).attr('rankings_table_id')

//     $('.rankings_graph_item').css({ 'display': 'none' })
//     $('.rankings_table_item').css({ 'display': 'none' })

//     if ($(this).is(':checked')) {
//         app.getObject(rankings_table_html_id, vRace_Rankings_Tables[rankings_table_html_id]);
//         $(`#${rankings_table_html_id}`).css({ 'display': 'flex' })
//         // app.getObject(sectional_graph_html_id, vRace_Sectional_Graphs[sectional_graph_html_id]);
//         show_race_ranking_Charts(rankings_graph_html_id, vRace_Rankings_Graphs[rankings_graph_html_id])
//         $(`#${rankings_graph_html_id}`).css({ 'display': 'flex' })
//     }
// });


// Retrieve the selected field value from sessionStorage
// let fieldValue = sessionStorage.getItem('selectedhorseValue');

// if (fieldValue) {
//     // Hide elements
//     $('.vs_horse_cards').css({ 'display': 'none' });
//     $('.vs_horse_filters').css({ 'display': 'none' });
//     $('.horse_details').css({ 'display': 'flex' });

//     // Select match
//     app.field('runnerName').selectMatch(fieldValue, true);

//     // Clear the sessionStorage to avoid reusing the value
//     sessionStorage.removeItem('selectedhorseValue');
// } else {
//     // Handle case where the fieldValue is not available
//     console.error('Field value is not available.');
// }

app.getAppLayout(function () {
    app.getObject('YDAX').then(function (model) {
        let table_data_matrix = model.layout.qHyperCube.qDataPages[0].qMatrix;

        let keys = ['RaceDateShow', 'RaceDate'];

        let racedate_table_data = table_data_matrix.map(array => {
            let obj = {};
            array.forEach((value, index) => {
                obj[keys[index]] = value.qText;
            });
            return obj;
        });
        // console.log(racedate_table_data)

        $('.recent_results_btn_container').empty()

        racedate_table_data.forEach(element => {
            let race_date_html = `<div class="button_item">
                                        <input id="${element.RaceDateShow}" type="radio" value="${element.RaceDateShow}" name="market" qlik_value="${element.RaceDate}"/>
                                        <label for="${element.RaceDateShow}">
                                            ${element.RaceDateShow}
                                        </label>
                                    </div>`

            $('.recent_results_btn_container').append(race_date_html)
        });

    })
})

$(document).on('change', 'input[name="market"]', function () {
    $('.ripple-container').hide()
    let recent_date = $(this).attr('qlik_value');
    $(this).addClass('selected_btn')
    app.field('raceDate').selectMatch(recent_date, true);
});