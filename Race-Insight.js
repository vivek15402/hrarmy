/*
 * Basic responsive mashup template
 * @owner Enter you name here (xxx)
 */
/*
 *    Fill in host and port for Qlik engine
 */
function fetchAllData(model, rowCount) {
	let hypercube = model.layout.qHyperCube;
	let pages = [];
	let totalHeight = hypercube.qSize.qcy;
	let pageSize = 50;
	let rowsToFetch = rowCount === -1 ? totalHeight : Math.min(rowCount, totalHeight);

	function fetchPage(start) {
		return model.getHyperCubeData('/qHyperCubeDef', [{
			qTop: start,
			qLeft: 0,
			qWidth: hypercube.qSize.qcx,
			qHeight: Math.min(pageSize, rowsToFetch - start)
		}]).then(function (data) {
			pages = pages.concat(data[0].qMatrix);
			if (start + pageSize < rowsToFetch) {
				return fetchPage(start + pageSize);
			} else {
				return pages;
			}
		});
	}

	return fetchPage(0);
}
function show_race_sectional_Charts(html_id, Qs_Object_ID) {
	// console.log(html_id, Qs_Object_ID)
	app.getAppLayout(function(){
		app.getObject(Qs_Object_ID).then(function (model) {
			// console.log(model)
			// $('.ripple-container').show();
			// let data_matrix = model.layout.qHyperCube.qStackedDataPages[0].qData[0]
			// console.log(data_matrix);
	
			let measure_data = model.layout.qHyperCube.qStackedDataPages[0].qData[0].qSubNodes
			// console.log(measure_data);
	
			const measureNames = measure_data[measure_data.length-1].qSubNodes.map(array => array.qText);
			let dim_numbers = measureNames.length;
			// console.log(measureNames);
	
			measureNames.unshift('Measures');
			// console.log(measureNames);
	
			function extractValues(obj) {
				return [obj.qText, ...obj.qSubNodes.map(subNode => subNode.qMaxPos.toFixed(2))];
			}
	
			const dim_names_and_measure_values = measure_data.map(extractValues);
	
			const dim_names = dim_names_and_measure_values.map(subarray => subarray[0])
	
			dim_names_and_measure_values.unshift(measureNames);
	
			// console.log(dim_names_and_measure_values)
	
			// $('#VS_Handicap_Stat_Model').replaceWith('<div id="VS_Handicap_Stat_Model" class="qvobject"></div>');
	
			let colors = ["#003358", "#ff7c43", "#17bcbe", "#017d80", "#bfc7ff", "#e2f070", "#fc997d", "#ffa8bf", "#CD8B76", "#E59500", "#003f5c", "#2f4b7c", "#665191", "#a05195", "#d45087", "#f95d6a", "#48ff9b", "#ffa600", "#7EA2AA", "#E1D89F"];
	
			let series_options = [];
	
			for (let index = 0; index < dim_numbers; index++) {
				let option = {
					symbolSize: 10,
					type: 'line',
					smooth: true,
					emphasis: {
						focus: 'series',
						label: {
							show: true,
							fontSize: 14
						}
					},
					endLabel: {
						show: true,
						formatter: '{a}',
						distance: 15
					}
				};
	
				series_options.push(option);
			}
	
			// console.log(JSON.stringify(series_options, null, 4));
	
			var chartDom = document.getElementById(html_id);
			var myChart = echarts.dispose(chartDom);
			var myChart = echarts.init(chartDom);
			var option;
	
			option = {
				animationDuration: 2000,
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						crossStyle: {
							color: '#999'
						}
					}
				},
				legend: {
					top: "0"
				},
				grid: {
					bottom: '20%',
					left: '40px'
				},
				dataset: {
					source: dim_names_and_measure_values
				},
				xAxis: [
					{
						type: 'category',
						axisPointer: {
							type: 'shadow'
						}
					}
				],
				yAxis: [
					{
						show: false,
						type: 'value',
						name: 'Text',
						nameLocation: 'middle',
						nameGap: 50,
						min: 'dataMin',
						interval: 10,
						splitLine: {
							show: false
						}
					}
				],
				series: series_options
			};
			// console.log(JSON.stringify(option, null, 4));
			option && myChart.setOption(option);
			window.addEventListener('resize', myChart.resize);
			$('.ripple-container').hide();
		});
	})
	
}
function show_race_ranking_Charts(html_id, Qs_Object_ID) {
	app.getObject(Qs_Object_ID).then(function (model) {
		let data_matrix = model.layout.qHyperCube.qDataPages[0].qMatrix

		let measure_data = model.layout.qHyperCube.qMeasureInfo

		const measureNames = measure_data.map(structure => structure.qFallbackTitle);
		let dim_numbers = measureNames.length;

		measureNames.unshift('Measures');

		const dim_names_and_measure_values = data_matrix.map(array => array.map(item => item.qText));

		const dim_names = dim_names_and_measure_values.map(subarray => subarray[0])

		// Reverse the values for horizontal bars
		dim_names_and_measure_values.reverse();

		dim_names_and_measure_values.unshift(measureNames);
		// console.log(dim_names_and_measure_values);

		let colors = ["#003358", "#ff7c43", "#17bcbe", "#017d80", "#bfc7ff", "#e2f070", "#fc997d", "#ffa8bf", "#CD8B76", "#E59500", "#003f5c", "#2f4b7c", "#665191", "#a05195", "#d45087", "#f95d6a", "#48ff9b", "#ffa600", "#7EA2AA", "#E1D89F"];

		let series_options = [];

		for (let index = 0; index < dim_numbers; index++) {
			let option = {
				type: 'bar',
				stack: 'all',
				emphasis: {
					focus: 'none',
					label: {
						show: true,
						fontSize: 14
					}
				},
				label: {
					show: true,
					fontSize: 14
				}
			};

			series_options.push(option);
		}

		// console.log(JSON.stringify(series_options, null, 4));

		var chartDom = document.getElementById(html_id);
		var myChart = echarts.dispose(chartDom);
		var myChart = echarts.init(chartDom);
		var option;

		option = {
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'cross',
					crossStyle: {
						color: '#999'
					}
				}
			},
			legend: {
				top: "0"
			},
			grid: {
				bottom: '10%',
				left: '200px'
			},
			dataset: {
				source: dim_names_and_measure_values
			},
			xAxis: [
				{
					type: 'value',
					axisPointer: {
						type: 'shadow'
					}
				}
			],
			yAxis: [
				{
					type: 'category',
					nameGap: 50,
					splitLine: {
						show: false
					}
				}
			],
			series: series_options
		};
		// console.log(JSON.stringify(option, null, 4));
		option && myChart.setOption(option);
		window.addEventListener('resize', myChart.resize);


	});
}
function vs_sectionals_cont1_tab1() {
	show_race_sectional_Charts('vs_duration_sectional', '8ac6e13f-856b-45da-85af-019a72dcfe53')
	app.getObject('vs_duration_sectional_tab', 'c595f91b-bb6f-4204-b185-73f3272c44f8')
}

function vs_sectionals_cont1_tab2() {
	console.log('vs_duration_overall');
	show_race_sectional_Charts('vs_duration_overall', 'd2dcad8c-41ea-49a9-80b9-6f5409adcfe6')
	app.getObject('vs_duration_overall_tab', '550395eb-6f85-4d0a-9a27-c725800bc381')
}

function vs_sectionals_cont1_tab3() {
	show_race_sectional_Charts('vs_distance', 'e6195691-ba9a-4717-b38e-2cc5522ac613')
	app.getObject('vs_distance_tab', 'c7778296-56a0-49dd-b4c4-62bbb7d4892a')
}

function vs_sectionals_cont1_tab4() {
	show_race_sectional_Charts('vs_max_speed', '1102e7fd-9eea-4938-b003-0f1b6d473920')
	app.getObject('vs_max_speed_tab', 'bd856f0d-bb81-4e88-b0fb-d4624a5273a4')
}

function vs_sectionals_cont1_tab5() {
	show_race_sectional_Charts('vs_avg_speed', 'a3e6b0ee-7a60-4979-927d-b7d47d2b45c6')
	app.getObject('vs_avg_speed_tab', 'b67d1de1-10de-4d69-84b9-7e7e9d33ef2f')
}

function vs_sectionals_cont1_tab6() {
	show_race_sectional_Charts('vs_detailed_speed', 'a2be99c4-65d4-47d8-80a3-4cbc3985b386')
}
function tabbedContainer(ContainerID) {
	$(`#${ContainerID}`).on("click", ".tabContainer .tabs a", function (e) {
		e.preventDefault(),
			$(this)
				.parents(".tabContainer")
				.find(".tabContent > div")
				.each(function () {
					$(this).hide();
				});

		$(this)
			.parents(".tabs")
			.find("a")
			.removeClass("tabs_active"),
			$(this).toggleClass("tabs_active"), $("#" + $(this).attr("src")).show();

		let tab_id = $(this).attr("src")
		window[`${tab_id}`]()
	});
}
var app;
var prefix = window.location.pathname.substr(0, window.location.pathname.toLowerCase().lastIndexOf("/extensions") + 1);
var config = {
    host: 'e2arsd9duxwosuu.uk.qlikcloud.com', //for example, 'abc.us.example.com'
    prefix: '/',
    port: 443,
    isSecure: true,
    webIntegrationId: 'xBCs85GiQVfXi8eC3Bv6f2OuDzI4IXV2'
};
require.config( {
    baseUrl: ( config.isSecure ? "https://" : "http://" ) + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources",
    webIntegrationId: config.webIntegrationId
} );

require(["js/qlik"], function (qlik) {
	qlik.on("error", function (error) {
		$('#popupText').append(error.message + "<br>");
		$('#popup').fadeIn(1000);
	});
	$("#closePopup").click(function () {
		$('#popup').hide();
	});

	//callbacks -- inserted here --
	//open apps -- inserted here --
	//get objects -- inserted here --
	//create cubes and lists -- inserted here --

	// $('.ripple-container').show()

	app = qlik.openApp('0c725b7d-d22a-431f-93a5-cd6590bc51b5', config);
	// qlik.theme.apply('VS_Theme');

	clear_All()
	app.getObject('CurrentSelections_temp', 'CurrentSelections').then(function (model) {
		model.Validated.bind(function () {
			var data = model.layout.selectionsInStates;
			var result = [],
				selections = [];
			// console.log(data)
			$.each(data, function (index, item) {
				if ("qSelectionObject" in item && "qSelections" in item["qSelectionObject"]) {
					$.each(item["qSelectionObject"]["qSelections"], function (index, selection) {
						result.push([item["stateName"], selection["qTotal"], selection["qField"], selection["qSelected"]]);
					});
				}
			});

			selections = result.map(arr => ({
				StateName: arr[0],
				TotalValues: arr[1],
				FieldName: arr[2],
				FieldValue: arr[3]
			}));

			// console.log(selections)		

			var Final_FieldName = '',
				Final_FieldValue = '';

			if (selections.length > 0) {
				$('.selections_container').empty()
				selections.forEach(function (element) {
					Final_FieldName = (element.StateName.includes('$')) ? element.FieldName : `${element.FieldName} (${element.StateName})`;
					Final_FieldValue = (element.FieldValue.split(',').length > 1) ? `${element.FieldValue.split(',').length} of ${element.TotalValues}` : element.FieldValue;
					var sel_html_elem = `<div class="vs_selection_item" vs_sel_field_name="${element.FieldName}" vs_sel_field_value="${element.FieldValue}" 
					vs_selstate="${element.StateName}">
											<div class="vs_sel_content">
												<div class="vs_field_name">${Final_FieldName}</div>
												<div class="vs_field_value">${Final_FieldValue}</div>
											</div>
											<div class="vs_sel_clear_btn">
												<span class="lui-icon
												lui-icon--remove"></span>
											</div>
										</div>`;

					$('.selections_container').append(sel_html_elem)
				})
			} else {
				$('.selections_container').text('No selections applied');
			}
			$('.ripple-container').hide();
		});
		$(document).on('click', '.vs_sel_clear_btn', function () {
			let this_parent = $(this).closest('.vs_selection_item');
			var fieldname = this_parent.attr('vs_sel_field_name')
			var statename = this_parent.attr('vs_selstate')
			app.field(fieldname, statename).clear();
			$('.vs_listbox_item').removeClass('vs_listbox_item_selected vs_listbox_item_alternative');
			$('.vs_listbox_item_value_checked').css({ 'visibility': 'hidden' })
		});
	})

	let race_groups = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth'];
	let race_groups_qs_objects = ['vJLPLv', 'Svjg', 'VUqpkA', 'JaWQGjM', 'pJed', 'LmJmxp', 'UXX', 'VKp', 'QDS', 'jVUvmJ'];

	// race_groups.forEach((race_group, index) => {
	// 	app.getObject(race_groups_qs_objects[index]).then(function (reply) {

	// 		let main_row = `<div class="vs_row" id="${race_group}_race_group" sort-order="${index}">
	// 							<div class="row_header minimize">
	// 								<div class="vs_title group_title"></div>
	// 							</div>

	// 							<div class="col">
	// 								<div class="race_name"></div>
	// 							</div>
	// 							<div class="col">
	// 								<div class="race_details">
	// 									<div class="race_detail_item">
	// 										<div class="race_item_title">Avg. Speed</div>
	// 										<div class="race_item_value avg_speed"></div>
	// 									</div>
	// 									<div class="race_detail_item">
	// 										<div class="race_item_title">Max Speed</div>
	// 										<div class="race_item_value max_speed"></div>
	// 									</div>
	// 									<div class="race_detail_item">
	// 										<div class="race_item_title">Distance</div>
	// 										<div class="race_item_value distance"></div>
	// 									</div>
	// 									<div class="race_detail_item">
	// 										<div class="race_item_title">Going</div>
	// 										<div class="race_item_value going"></div>
	// 									</div>
	// 									<div class="race_detail_item">
	// 										<div class="race_item_title">Track</div>
	// 										<div class="race_item_value track"></div>
	// 									</div>
	// 									<div class="race_detail_item">
	// 										<div class="race_item_title">Weather</div>
	// 										<div class="race_item_value weather"></div>
	// 									</div>
	// 									<div class="race_detail_item">
	// 										<div class="race_item_title">Ran</div>
	// 										<div class="race_item_value ran"></div>
	// 									</div>
	// 									<div class="race_detail_item">
	// 										<div class="race_item_title">NR</div>
	// 										<div class="race_item_value not_ran"></div>
	// 									</div>
	// 								</div>
	// 							</div>
	// 							<div class="col">
	// 								<div class="player_details_container">
	// 									<div class="video_container">
	// 										<div class="full_race_video">
	// 											<span class="full_race_text">15:15</span>
	// 											<a href="" target="_blank"><img src="./assets/Images/play-circle.svg" alt="Icon" class="full_race_icon"></a>
	// 										</div>
	// 										<div class="final_furlong_video">
	// 											<span class="final_furlong_text">FF</span>
	// 											<a href="" target="_blank"><img src="./assets/Images/play-circle.svg" alt="Icon" class="final_furlong_icon"></a>
	// 										</div>
	// 									</div>

	// 								</div>

	// 							</div>
	// 						</div>`;

	// 		$('.qv_objects').append(main_row);

	// 		$(`#${race_group}_race_group .group_title`).text(reply.layout.title)
	// 		$(`#${race_group}_race_group .race_name`).text(reply.layout.subtitle)

	// 		// console.log(reply.layout.footnote)

	// 		var avg_speed = parseFloat(reply.layout.footnote.split('|')[0]).toFixed(3) + 'mph'
	// 		var max_speed = parseFloat(reply.layout.footnote.split('|')[1]).toFixed(3) + 'mph'
	// 		var distance = reply.layout.footnote.split('|')[2]
	// 		var going = reply.layout.footnote.split('|')[3]
	// 		var track = reply.layout.footnote.split('|')[4]
	// 		var weather = reply.layout.footnote.split('|')[5]
	// 		var ran = reply.layout.footnote.split('|')[6]
	// 		var not_ran = reply.layout.footnote.split('|')[7]
	// 		var full_race_video = reply.layout.footnote.split('|')[8]
	// 		var final_furlong_video = reply.layout.footnote.split('|')[9]
	// 		var raceGroup = reply.layout.footnote.split('|')[10]


	// 		$(`#${race_group}_race_group .avg_speed`).text(avg_speed)
	// 		$(`#${race_group}_race_group .max_speed`).text(max_speed)
	// 		$(`#${race_group}_race_group .distance`).text(distance)
	// 		$(`#${race_group}_race_group .going`).text(going)
	// 		$(`#${race_group}_race_group .track`).text(track)
	// 		$(`#${race_group}_race_group .weather`).text(weather)
	// 		$(`#${race_group}_race_group .ran`).text(ran)
	// 		$(`#${race_group}_race_group .not_ran`).text(not_ran)
	// 		$(`#${race_group}_race_group .full_race_video a`).attr('href', full_race_video);
	// 		$(`#${race_group}_race_group .final_furlong_video a`).attr('href', final_furlong_video);

	// 		// $('.ripple-container').hide()

	// 		let player_details_matrix = reply.layout.qHyperCube.qDataPages[0].qMatrix
	// 		// console.log(player_details_matrix);

	// 		let keys = ['pos', 'silk', 'player_name', 'price', 'jockey', 'trainer', 'avgSpeed', 'maxSpeed'];

	// 		let player_details = player_details_matrix.map(array => {
	// 			let obj = {};
	// 			array.forEach((value, index) => {
	// 				obj[keys[index]] = value.qText;
	// 			});
	// 			return obj;
	// 		});

	// 		// console.log(player_details);
	// 		let text_position = ['1st', '2nd', '3rd']
	// 		player_details.forEach((player, index) => {
	// 			let player_details_html = `<div class="player_details">
	// 										<div class="player_name_silk">
	// 											<div>
	// 												<strong>${text_position[index]}</strong>
	// 												<span class="link_horse">${player.player_name}</span>
	// 												<strong>${player.price}</strong>
	// 											</div>
	// 											<div class="img">
	// 												<img src="${player.silk}" alt="Silk" onerror="this.src='./assets/Images/blank-silk.png'">
	// 											</div>
	// 										</div>
	// 										<div class="player_metadata">
	// 											<div class="player_metadata_title">
	// 												<div>Avg Speed:</div>
	// 												<div>Max Speed:</div>
	// 												<div>Jockey:</div>
	// 												<div>Trainer:</div>
	// 											</div>
	// 											<div class="player_metadata_value">
	// 												<div>${parseFloat(player.avgSpeed).toFixed((3))} mph</div>
	// 												<div>${parseFloat(player.maxSpeed).toFixed((3))} mph</div>
	// 												<div>${player.jockey}</div>
	// 												<div class="link_trainer">${player.trainer}</div>
	// 											</div>
	// 										</div>
	// 									</div>`;

	// 			$(`#${race_group}_race_group .player_details_container`).append(player_details_html)
	// 		});

	// 		$(`#${race_group}_race_group .player_details_container`).append(`<button class="view_report" race-group-value="${raceGroup}" race-name="${reply.layout.subtitle}">View Report</button>`);

	// 		var sortedElements = $('.qv_objects').children('.vs_row').sort(function (a, b) {
	// 			var aValue = parseInt($(a).attr('sort-order'));
	// 			var bValue = parseInt($(b).attr('sort-order'));
	// 			return aValue - bValue;
	// 		});

	// 		// Append the sorted elements back to the container
	// 		$('.qv_objects').empty().append(sortedElements);

	// 		$.get("./Assets/components/expand_collapse_btn.txt", function (content) {
	// 			// Append the content to div.vs_row
	// 			$('.row_toggle').remove()
	// 			$(content).appendTo("div.row_header");

	// 			// $(document).on('click', '.minimize', function () {
	// 			// 	$(this).removeClass('minimize')
	// 			// 	$(this).addClass('maximize')
	// 			// 	let this_parent = $(this).closest('.vs_row');
	// 			// 	this_parent.css({ "height": "40px" });
	// 			// 	this_parent.find('.iminimize').hide();
	// 			// 	this_parent.find('.imaximize').show();

	// 			// });

	// 			// $(document).on('click', '.maximize', function () {
	// 			// 	$(this).removeClass('maximize')
	// 			// 	$(this).addClass('minimize')
	// 			// 	let this_parent = $(this).closest('.vs_row');
	// 			// 	this_parent.css({ "height": "" });
	// 			// 	this_parent.find('.imaximize').hide();
	// 			// 	this_parent.find('.iminimize').show();

	// 			// });
	// 		});
	// 	})
	// });

	function filter_array(array, filterfield, filterValue) {
		// Filter JSON data based on the specified field and value
		const filteredData = array.filter(obj => obj[filterfield] === filterValue);

		// Create a new array containing filtered objects with selected properties
		const newArray = filteredData.map(obj => {
			return {
				raceVenue: obj.raceVenue,
				raceGroup: obj.raceGroup,
				raceTimeName: obj.raceTimeName,
				raceName: obj.raceName,
				pos: obj.pos,
				silk: obj.silk,
				player_name: obj.player_name,
				price: obj.price,
				jockey: obj.jockey,
				trainer: obj.trainer,
				ff: obj.ff,
				avgSpeed: obj.avgSpeed,
				maxSpeed: obj.maxSpeed
			};
		});

		return newArray;
	}

	function uniqueValue(array, _field) {
		let field_temp = []

		array.forEach(element => {
			field_temp.push(element[_field]);
		});
		let fieldName = [...new Set(field_temp)];

		return fieldName
	}

	// function creat_course_race_cards() {
	// 	app.getObject('BrxUHGF').then(function (reply) {
	// 		let player_details_matrix = reply.layout.qHyperCube.qDataPages[0].qMatrix
	// 		// console.log(player_details_matrix);

	// 		let keys = ['raceVenue', 'raceGroup', 'raceTimeName', 'raceName', 'pos', 'silk', 'player_name', 'price', 'jockey', 'trainer', '1515', 'ff', 'avgSpeed', 'maxSpeed'];

	// 		let player_details = player_details_matrix.map(array => {
	// 			let obj = {};
	// 			array.forEach((value, index) => {
	// 				obj[keys[index]] = value.qText;
	// 			});
	// 			return obj;
	// 		});

	// 		let raceVenues = uniqueValue(player_details, 'raceVenue')
	// 		// console.log(player_details);

	// 		$('.qv_race_objects').empty()

	// 		raceVenues.forEach(elem_raceVenue => {
	// 			let main_row = `<div class="vs_row maximize" id="${elem_raceVenue.replace(' ', '_')}">
	// 							<div class="row_header maximize">
	// 								<div class="vs_title group_title">${elem_raceVenue}</div>
	// 								<span class="row_toggle iminimize"><img src="./assets/Images/minimize.svg" alt="Icon"></span>
	// 									<span class="row_toggle imaximize"><img src="./assets/Images/maximize.svg" alt="Icon"></span>
	// 							</div>
	// 							<div class="race_cards_container"></div>
	// 						</div>`

	// 			$('.qv_race_objects').append(main_row)

	// 			let filtered_array = filter_array(player_details, "raceVenue", elem_raceVenue);

	// 			// console.log(filtered_array)

	// 			let raceVenue = uniqueValue(filtered_array, 'raceVenue')[0].replace(' ', '_')
	// 			let raceTimeNames = uniqueValue(filtered_array, 'raceTimeName')

	// 			// console.log(raceTimeNames);

	// 			$(`#${raceVenue} .race_cards_container`).empty()

	// 			raceTimeNames.forEach((elem_raceTimeName, index) => {
	// 				let raceTimeName_array = filter_array(player_details, "raceTimeName", elem_raceTimeName);
	// 				// console.log(raceTimeName_array);
	// 				let race_card = `<div class="race_card" id="${elem_raceTimeName.replace(':', '')}">
	// 							<div class="col">
	// 								<div class="race_header minimize">
	// 									<div class="race_time">${raceTimeName_array[0].raceTimeName}</div>
	// 									<div class="race_name">${raceTimeName_array[0].raceName}</div>
	// 								</div>
	// 							</div>
	// 							<div class="col">
	// 								<div class="player_details_container">
	// 									<div class="video_container">
	// 										<div class="full_race_video">
	// 											<span class="full_race_text">15:15</span>
	// 											<a href="https://www.dartfish.tv/SmartLink?ChannelId=140134&amp;target=Video&amp;KW1_1=Group Name&amp;KW1_2=2023-12-29 15:02 Kelso&amp;KW2_1=Race Name&amp;KW2_2=Racing TV Maiden Hurdle (GBB Race)&amp;KW3_1=Venue Name&amp;KW3_2=Kelso"
	// 												target="_blank"><img src="./assets/Images/play-circle.svg"
	// 													alt="Icon" class="full_race_icon"></a>
	// 										</div>
	// 										<div class="final_furlong_video">
	// 											<span class="final_furlong_text">FF</span>
	// 											<a href="https://www.dartfish.tv/SmartLink?ChannelId=140134&amp;target=Eventplaylist&amp;KW1_1=Group Name&amp;KW1_2=2023-12-29 15:02 Kelso&amp;KW2_1=Race Name&amp;KW2_2=Racing TV Maiden Hurdle (GBB Race)&amp;KW3_1=Event Type&amp;KW3_2=Finish"
	// 												target="_blank"><img src="./assets/Images/play-circle.svg"
	// 													alt="Icon" class="final_furlong_icon"></a>
	// 										</div>
	// 									</div>
	// 									<div class="player_details_items" id="${raceTimeName_array[0].raceTimeName.replace(':', '_')}">

	// 									</div>
	// 									<button class="view_report" race-group-value="${raceTimeName_array[0].raceGroup}"
	// 					race-name="${raceTimeName_array[0].raceName}">View Report</button>
	// 								</div>
	// 							</div>
	// 							<div class="col">
	// 								<div class="race_details">
	// 									<div class="race_detail_item">
	// 										<div class="race_item_title">Avg. Speed:</div>
	// 										<div class="race_item_value avg_speed">23.707mph</div>
	// 									</div>
	// 									<div class="race_detail_item">
	// 										<div class="race_item_title">Max Speed:</div>
	// 										<div class="race_item_value max_speed">28.291mph</div>
	// 									</div>
	// 									<div class="race_detail_item">
	// 										<div class="race_item_title">Distance:</div>
	// 										<div class="race_item_value distance">2m 0f 51y</div>
	// 									</div>
	// 									<div class="race_detail_item">
	// 										<div class="race_item_title">Going:</div>
	// 										<div class="race_item_value going">Going</div>
	// 									</div>
	// 									<div class="race_detail_item">
	// 										<div class="race_item_title">Track:</div>
	// 										<div class="race_item_value track">Turf</div>
	// 									</div>
	// 									<div class="race_detail_item">
	// 										<div class="race_item_title">Weather:</div>
	// 										<div class="race_item_value weather">Weather</div>
	// 									</div>
	// 									<div class="race_detail_item">
	// 										<div class="race_item_title">Ran:</div>
	// 										<div class="race_item_value ran">Ran</div>
	// 									</div>
	// 									<div class="race_detail_item">
	// 										<div class="race_item_title">NR:</div>
	// 										<div class="race_item_value not_ran">Not-Ran</div>
	// 									</div>
	// 								</div>
	// 							</div>
	// 						</div>`

	// 				$(`#${raceVenue} .race_cards_container`).append(race_card)

	// 				raceTimeName_array.forEach(elem_race => {
	// 					// console.log(elem_race.silk);
	// 					let race_player = `<div class="player_details">
	// 							<div class="player_name_silk">
	// 								<div class="img">
	// 									<img src="${elem_race.silk}"
	// 										alt="Silk"
	// 										onerror="this.src='./assets/Images/blank-silk.png'">
	// 								</div>
	// 								<div>
	// 									<strong>1st</strong>
	// 									<span class="link_horse">${elem_race.player_name
	// 						}</span>
	// 									<strong>${elem_race.price
	// 						}</strong>
	// 								</div>
	// 							</div>
	// 							<div class="player_metadata">
	// 								<div class="player_metadata_title">
	// 									<div>Avg Speed:</div>
	// 									<div>Max Speed:</div>
	// 									<div>Jockey:</div>
	// 									<div>Trainer:</div>
	// 								</div>
	// 								<div class="player_metadata_value">
	// 									<div>${parseFloat(elem_race.avgSpeed).toFixed((3))} mph</div>
	// 									<div>${parseFloat(elem_race.maxSpeed).toFixed((3))} mph</div>
	// 									<div>${elem_race.jockey
	// 						}</div>
	// 									<div class="link_trainer">${elem_race.trainer
	// 						}</div>
	// 								</div>
	// 							</div>
	// 						</div>`

	// 					$(`#${elem_race.raceTimeName.replace(':', '_')}`).append(race_player)
	// 				});
	// 			});



	// 		});

	// 	})
	// }



	// Retrieve the object and all its data

	function create_course_race_cards() {
		// Assuming 'app' is defined elsewhere and accessible globally
		app.getObject('BrxUHGF').then(model => {
			fetchAllData(model, 500).then(matrix => {
				let playerDetailsMatrix = matrix
				let keys = ['raceVenue', 'raceGroup', 'raceTimeName', 'raceName', 'pos', 'silk', 'player_name', 'price', 'jockey', 'trainer', '1515', 'ff', 'avgSpeed', 'maxSpeed'];

				let playerDetails = playerDetailsMatrix.map(array => {
					let obj = {};
					array.forEach((value, index) => {
						obj[keys[index]] = value.qText;
					});
					return obj;
				});
				// console.log(playerDetails);
				let $raceObjects = $('.qv_race_objects').empty();

				// Group by raceVenue
				let groupedByVenue = groupBy(playerDetails, 'raceVenue');

				Object.keys(groupedByVenue).forEach(raceVenue => {
					let $raceContainer = $(`<div class="vs_row maximize" id="${raceVenue.replace(' ', '_')}">
					<div class="row_header maximize">
						<div class="vs_title group_title">${raceVenue}</div>
						<span class="row_toggle iminimize"><img src="./assets/Images/minimize.svg" alt="Icon"></span>
							<span class="row_toggle imaximize"><img src="./assets/Images/maximize.svg" alt="Icon"></span>
					</div>
					<div class="race_cards_container"></div>
				</div>`);

					$raceObjects.append($raceContainer);
					let $cardsContainer = $raceContainer.find('.race_cards_container');

					let groupedByTimeName = groupBy(groupedByVenue[raceVenue], 'raceTimeName');

					Object.keys(groupedByTimeName).forEach(raceTimeName => {
						let raceTimeNameArray = groupedByTimeName[raceTimeName];
						let raceCardHtml = `<div class="race_card" id="${raceTimeName.replace(':', '')}">
						<div class="col">
							<div class="race_header minimize">
								<div class="race_time">${raceTimeNameArray[0].raceTimeName}</div>
								<div class="race_name">${raceTimeNameArray[0].raceName}</div>
							</div>
						</div>
						<div class="col">
							<div class="player_details_container">
								<div class="video_container">
									<div class="full_race_video">
										<span class="full_race_text">15:15</span>
										<a href="https://www.dartfish.tv/SmartLink?ChannelId=140134&amp;target=Video&amp;KW1_1=Group Name&amp;KW1_2=2023-12-29 15:02 Kelso&amp;KW2_1=Race Name&amp;KW2_2=Racing TV Maiden Hurdle (GBB Race)&amp;KW3_1=Venue Name&amp;KW3_2=Kelso"
											target="_blank"><img src="./assets/Images/play-circle.svg"
												alt="Icon" class="full_race_icon"></a>
									</div>
									<div class="final_furlong_video">
										<span class="final_furlong_text">FF</span>
										<a href="https://www.dartfish.tv/SmartLink?ChannelId=140134&amp;target=Eventplaylist&amp;KW1_1=Group Name&amp;KW1_2=2023-12-29 15:02 Kelso&amp;KW2_1=Race Name&amp;KW2_2=Racing TV Maiden Hurdle (GBB Race)&amp;KW3_1=Event Type&amp;KW3_2=Finish"
											target="_blank"><img src="./assets/Images/play-circle.svg"
												alt="Icon" class="final_furlong_icon"></a>
									</div>
								</div>
								<div class="player_details_items" id="${raceTimeNameArray[0].raceTimeName.replace(':', '_')}">
	
								</div>
								<button class="view_report" race-group-value="${raceTimeNameArray[0].raceGroup}"
				race-name="${raceTimeNameArray[0].raceName}">View Report</button>
							</div>
						</div>
						
					</div>`;

						$cardsContainer.append(raceCardHtml);

						raceTimeNameArray.forEach(elem_race => {
							let racePlayerHtml = `<div class="player_details">
										<div class="player_name_silk">
											<div class="img">
												<img src="${elem_race.silk}"
													alt="Silk"
													onerror="this.src='./assets/Images/blank-silk.png'">
											</div>
											<div>
												<strong>${elem_race.pos}</strong>
												<span class="link_horse">${elem_race.player_name}</span>
												<strong>${elem_race.price}</strong>
											</div>
										</div>
										<div class="player_metadata">
											<div class="player_metadata_title">
												<div>Avg Speed:</div>
												<div>Max Speed:</div>
												<div>Jockey:</div>
												<div>Trainer:</div>
											</div>
											<div class="player_metadata_value">
												<div>${parseFloat(elem_race.avgSpeed).toFixed((3))} mph</div>
												<div>${parseFloat(elem_race.maxSpeed).toFixed((3))} mph</div>
												<div>${elem_race.jockey}</div>
												<div class="link_trainer">${elem_race.trainer}</div>
											</div>
										</div>
									</div>`;

							$(`#${raceTimeName.replace(':', '_')}`).append(racePlayerHtml);
						});
					});
				});
			});
		});
	}

	// Helper function to group array of objects by key
	function groupBy(array, key) {
		return array.reduce((result, obj) => {
			(result[obj[key]] = result[obj[key]] || []).push(obj);
			return result;
		}, {});
	}


	function create_time_race_cards1() {
		app.getObject('CxLk').then(function (model) {
			fetchAllData(model).then(matrix => {
				let player_details_matrix = matrix
				// console.log(player_details_matrix);

				let keys = ['raceVenue', 'raceGroup', 'raceTimeName', 'raceName', 'pos', 'silk', 'player_name', 'price', 'jockey', 'trainer', '1515', 'ff', 'avgSpeed', 'maxSpeed'];

				let player_details = player_details_matrix.map(array => {
					let obj = {};
					array.forEach((value, index) => {
						obj[keys[index]] = value.qText;
					});
					return obj;
				});

				// let raceVenues = uniqueValue(player_details, 'raceVenue')
				// console.log(player_details);

				$('.qv_race_objects').empty()
				let main_row = `<div class="vs_row" id="time_series_cards">
								<div class="race_cards_container"></div></div>`

				$('.qv_race_objects').append(main_row)

				// let filtered_array = filter_array(player_details, "raceVenue", elem_raceVenue);

				// console.log(filtered_array)

				// let raceVenue = uniqueValue(filtered_array, 'raceVenue')[0].replace(' ', '_')
				let raceTimeNames = uniqueValue(player_details, 'raceTimeName')

				// console.log(raceTimeNames);

				$(`#time_series_cards .race_cards_container`).empty()

				raceTimeNames.forEach((elem_raceTimeName, index) => {
					let raceTimeName_array = filter_array(player_details, "raceTimeName", elem_raceTimeName);
					// console.log(raceTimeName_array);
					let race_card = `<div class="race_card" id="${elem_raceTimeName.replace(':', '')}">
								<div class="col">
									<div class="race_header minimize">
										<div class="race_time">${raceTimeName_array[0].raceTimeName}</div>
										<div class="race_name">${raceTimeName_array[0].raceName}</div>
									</div>
								</div>
								<div class="col">
									<div class="player_details_container">
										<div class="video_container">
											<div class="full_race_video">
												<span class="full_race_text">15:15</span>
												<a href="https://www.dartfish.tv/SmartLink?ChannelId=140134&amp;target=Video&amp;KW1_1=Group Name&amp;KW1_2=2023-12-29 15:02 Kelso&amp;KW2_1=Race Name&amp;KW2_2=Racing TV Maiden Hurdle (GBB Race)&amp;KW3_1=Venue Name&amp;KW3_2=Kelso"
													target="_blank"><img src="./assets/Images/play-circle.svg"
														alt="Icon" class="full_race_icon"></a>
											</div>
											<div class="final_furlong_video">
												<span class="final_furlong_text">FF</span>
												<a href="https://www.dartfish.tv/SmartLink?ChannelId=140134&amp;target=Eventplaylist&amp;KW1_1=Group Name&amp;KW1_2=2023-12-29 15:02 Kelso&amp;KW2_1=Race Name&amp;KW2_2=Racing TV Maiden Hurdle (GBB Race)&amp;KW3_1=Event Type&amp;KW3_2=Finish"
													target="_blank"><img src="./assets/Images/play-circle.svg"
														alt="Icon" class="final_furlong_icon"></a>
											</div>
										</div>
										<div class="player_details_items" id="${raceTimeName_array[0].raceTimeName.replace(':', '_')}">
									
										</div>
										<button class="view_report" race-group-value="${raceTimeName_array[0].raceGroup}"
						race-name="${raceTimeName_array[0].raceName}">View Report</button>
									</div>
								</div>
								<div class="col">
									<div class="race_details">
										<div class="race_detail_item">
											<div class="race_item_title">Avg. Speed:</div>
											<div class="race_item_value avg_speed">23.707mph</div>
										</div>
										<div class="race_detail_item">
											<div class="race_item_title">Max Speed:</div>
											<div class="race_item_value max_speed">28.291mph</div>
										</div>
										<div class="race_detail_item">
											<div class="race_item_title">Distance:</div>
											<div class="race_item_value distance">2m 0f 51y</div>
										</div>
										<div class="race_detail_item">
											<div class="race_item_title">Going:</div>
											<div class="race_item_value going">Going</div>
										</div>
										<div class="race_detail_item">
											<div class="race_item_title">Track:</div>
											<div class="race_item_value track">Turf</div>
										</div>
										<div class="race_detail_item">
											<div class="race_item_title">Weather:</div>
											<div class="race_item_value weather">Weather</div>
										</div>
										<div class="race_detail_item">
											<div class="race_item_title">Ran:</div>
											<div class="race_item_value ran">Ran</div>
										</div>
										<div class="race_detail_item">
											<div class="race_item_title">NR:</div>
											<div class="race_item_value not_ran">Not-Ran</div>
										</div>
									</div>
								</div>
							</div>`

					$(`#time_series_cards .race_cards_container`).append(race_card)

					raceTimeName_array.forEach(elem_race => {
						// console.log(elem_race.silk);
						let race_player = `<div class="player_details">
								<div class="player_name_silk">
									<div class="img">
										<img src="${elem_race.silk}"
											alt="Silk"
											onerror="this.src='./assets/Images/blank-silk.png'">
									</div>
									<div>
										<strong>1st</strong>
										<span class="link_horse">${elem_race.player_name
							}</span>
										<strong>${elem_race.price
							}</strong>
									</div>
								</div>
								<div class="player_metadata">
									<div class="player_metadata_title">
										<div>Avg Speed:</div>
										<div>Max Speed:</div>
										<div>Jockey:</div>
										<div>Trainer:</div>
									</div>
									<div class="player_metadata_value">
										<div>${parseFloat(elem_race.avgSpeed).toFixed((3))} mph</div>
										<div>${parseFloat(elem_race.maxSpeed).toFixed((3))} mph</div>
										<div>${elem_race.jockey
							}</div>
										<div class="link_trainer">${elem_race.trainer
							}</div>
									</div>
								</div>
							</div>`

						$(`#${elem_race.raceTimeName.replace(':', '_')}`).append(race_player)
					});
				});
			})
		})

	}


	function create_time_race_cards() {
		app.getObject('CxLk').then(function (model) {
			fetchAllData(model, 500).then(matrix => {
				let player_details_matrix = matrix

				const keys = ['raceVenue', 'raceGroup', 'raceTimeName', 'raceName', 'pos', 'silk', 'player_name', 'price', 'jockey', 'trainer', '1515', 'ff', 'avgSpeed', 'maxSpeed'];

				const player_details = player_details_matrix.map(array => {
					let obj = {};
					array.forEach((value, index) => {
						obj[keys[index]] = value.qText;
					});
					return obj;
				});

				// console.log(player_details);

				const $raceCardsContainer = $('.qv_race_objects');
				$raceCardsContainer.empty();

				const mainRowHTML = `<div class="vs_row" id="time_series_cards"><div class="race_cards_container"></div></div>`;
				$raceCardsContainer.append(mainRowHTML);

				const raceTimeNames = [...new Set(player_details.map(detail => detail.raceTimeName))];

				const $raceCardsContainerInner = $('#time_series_cards .race_cards_container');
				$raceCardsContainerInner.empty();

				raceTimeNames.forEach(raceTimeName => {
					const raceTimeNameArray = player_details.filter(detail => detail.raceTimeName === raceTimeName);

					const raceCardHTML = `
				<div class="race_card" id="${raceTimeName.replace(':', '')}">
				<div class="col">
					<div class="race_header minimize">
						<div class="race_time">${raceTimeNameArray[0].raceTimeName}</div>
						<div class="race_name">${raceTimeNameArray[0].raceName}</div>
					</div>
				</div>
				<div class="col">
					<div class="player_details_container">
						<div class="video_container">
							<div class="full_race_video">
								<span class="full_race_text">15:15</span>
								<a href="https://www.dartfish.tv/SmartLink?ChannelId=140134&amp;target=Video&amp;KW1_1=Group Name&amp;KW1_2=2023-12-29 15:02 Kelso&amp;KW2_1=Race Name&amp;KW2_2=Racing TV Maiden Hurdle (GBB Race)&amp;KW3_1=Venue Name&amp;KW3_2=Kelso"
									target="_blank"><img src="./assets/Images/play-circle.svg"
										alt="Icon" class="full_race_icon"></a>
							</div>
							<div class="final_furlong_video">
								<span class="final_furlong_text">FF</span>
								<a href="https://www.dartfish.tv/SmartLink?ChannelId=140134&amp;target=Eventplaylist&amp;KW1_1=Group Name&amp;KW1_2=2023-12-29 15:02 Kelso&amp;KW2_1=Race Name&amp;KW2_2=Racing TV Maiden Hurdle (GBB Race)&amp;KW3_1=Event Type&amp;KW3_2=Finish"
									target="_blank"><img src="./assets/Images/play-circle.svg"
										alt="Icon" class="final_furlong_icon"></a>
							</div>
						</div>
						<div class="player_details_items" id="${raceTimeNameArray[0].raceTimeName.replace(':', '_')}">
					
						</div>
						<button class="view_report" race-group-value="${raceTimeNameArray[0].raceGroup}"
		race-name="${raceTimeNameArray[0].raceName}">View Report</button>
					</div>
				</div>
				
			</div>`;

					$raceCardsContainerInner.append(raceCardHTML);

					const $playerDetailsContainer = $(`#${raceTimeName.replace(':', '_')}`);
					raceTimeNameArray.forEach(elem_race => {
						const racePlayerHTML = `
						<div class="player_details">
							<div class="player_name_silk">
								<div class="img">
									<img src="${elem_race.silk}" alt="Silk" onerror="this.src='./assets/Images/blank-silk.png'">
								</div>
								<div>
									<strong>${elem_race.pos}</strong>
									<span class="link_horse">${elem_race.player_name}</span>
									<strong>${elem_race.price}</strong>
								</div>
							</div>
							<div class="player_metadata">
								<div class="player_metadata_title">
									<div>Avg Speed:</div>
									<div>Max Speed:</div>
									<div>Jockey:</div>
									<div>Trainer:</div>
								</div>
								<div class="player_metadata_value">
									<div>${parseFloat(elem_race.avgSpeed).toFixed(3)} mph</div>
									<div>${parseFloat(elem_race.maxSpeed).toFixed(3)} mph</div>
									<div>${elem_race.jockey}</div>
									<div class="link_trainer">${elem_race.trainer}</div>
								</div>
							</div>
						</div>`;

						$playerDetailsContainer.append(racePlayerHTML);
					});
				});
			})
		});
	}


	// app.getAppLayout(function () {
	// 	create_course_race_cards()
	// })
	// create_course_race_cards()

	var currentPage = window.location.pathname;
	if (currentPage.includes('Race-Insight.html')) {
		app.getAppLayout(function () {
			$('#course_toggle').addClass('active')
			create_course_race_cards()
		})
	} else if (currentPage.includes('Race-Insight-time.html')) {
		app.getAppLayout(function () {
			$('#time_toggle').addClass('active')
			create_time_race_cards()
		})
	}

	// $('#course_toggle').click(function () {
	// 	create_course_race_cards()
	// 	$(this).addClass('active')
	// 	$('#time_toggle').removeClass('active')
	// })

	$('#time_toggle').click(function () {
		create_time_race_cards()
		$(this).addClass('active')
		$('#course_toggle').removeClass('active')
	})

	app.getObject('VS_sidebar_item', 'WLzVZJ');
	app.getObject('vs_qv_filter_container', 'WLzVZJ');

	// Race Insights JS
	$('.vs_content').on('click', '.view_report', function () {
		$("#scroll_to_top")[0].click();
		var race_group_value = $(this).attr('race-group-value')
		var race_name = $(this).attr('race-name')

		app.field('raceGroup').selectMatch(race_group_value, true);


		$('.qv_race_objects, .vs_qv_filters').css({ 'display': 'none' })
		$('.race_insight_details').css({ 'display': 'block' })

		$('.group_and_race_name .race_group_name').text(race_group_value)
		$('.group_and_race_name .race_name').text(race_name)



		// app.getObject('vs_race_report', '7f355209-94e3-4859-8ab6-8308cc2f4d30');
		app.getObject('AmPNq').then(function (reply) {

			let race_report_matrix = reply.layout.qHyperCube.qDataPages[0].qMatrix
			// console.log(race_report_matrix);

			let keys = ['commmentary', 'Pos', 'Silk', 'Runner', 'Jockey', 'Trainer', 'Age', 'Weight', 'Beaten by', 'Avg Speed', 'Max Speed', 'Distance (ft)'];

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
										<th>Position</th>
										<th>Silk</th>
										<th>Runner</th>
										<th>Jockey</th>
										<th>Trainer</th>
										<th>Age</th>
										<th>Weight</th>
										<th>Beaten by</th>
										<th>Avg Speed</th>
										<th>Max Speed</th>
										<th>Distance (ft)</th>
									</tr>
								</thead>
								<tbody>
								</tbody>
							</table>`;
			$('#vs_race_report').empty()
			$('#vs_race_report').append(html_table)
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
					row.append($('<td>').text(rowData.Pos));
					row.append($('<td>').html(`<img src="${rowData.Silk}" alt="Silk" height="20" onerror="this.src='./assets/Images/blank-silk.png'">`));
					row.append($('<td>').text(rowData.Runner));
					row.append($('<td>').text(rowData.Jockey));
					row.append($('<td>').text(rowData.Trainer));
					row.append($('<td>').text(rowData.Age));
					row.append($('<td>').text(rowData.Weight));
					row.append($('<td>').text(rowData["Beaten by"]));
					row.append($('<td>').text(rowData["Avg Speed"]));
					row.append($('<td>').text(rowData["Max Speed"]));
					row.append($('<td>').text(rowData["Distance (ft)"]));
				}

				tableBody.append(row);
			}
		})

		// app.getObject('vs_duration_sectional', '86a51735-1267-4fb1-8a2b-9d335903e020');

		vs_sectionals_cont1_tab1()

		tabbedContainer('vs_sectionals_cont1')

		show_race_ranking_Charts('vs_sectional', 'b8ba77e3-1b9b-42f5-8439-a2311f77df28')
		app.getObject('vs_sectional_tab', 'd3e6a2a1-7265-4dd4-a980-dfc448e49f35')

		function race_overview_chart() {
			app.getObject('kjtCLM').then(function (model) {
				// let data_matrix = model.layout.qHyperCube.qStackedDataPages[0].qData[0]

				let measure_data = model.layout.qHyperCube.qStackedDataPages[0].qData[0].qSubNodes
				// console.log(measure_data);

				const measureNames = measure_data[0].qSubNodes.map(array => array.qText);
				let dim_numbers = measureNames.length;

				let all_but_top3_array = measureNames.slice(3);
				const all_but_top3 = {};

				all_but_top3_array.forEach(item => {
					all_but_top3[item] = false;
				});

				measureNames.unshift('Measures');
				// console.log(measureNames);

				function extractValues(obj) {
					return [obj.qText, ...obj.qSubNodes.map(subNode => subNode.qMaxPos.toFixed(2))];
				}

				const dim_names_and_measure_values = measure_data.map(extractValues);

				const dim_names = dim_names_and_measure_values.map(subarray => subarray[0])

				dim_names_and_measure_values.unshift(measureNames);

				// console.log(dim_names_and_measure_values)

				// $('#VS_Handicap_Stat_Model').replaceWith('<div id="VS_Handicap_Stat_Model" class="qvobject"></div>');

				let colors = ["#003358", "#ff7c43", "#17bcbe", "#017d80", "#bfc7ff", "#e2f070", "#fc997d", "#ffa8bf", "#CD8B76", "#E59500", "#003f5c", "#2f4b7c", "#665191", "#a05195", "#d45087", "#f95d6a", "#48ff9b", "#ffa600", "#7EA2AA", "#E1D89F"];

				let series_options = [];

				for (let index = 0; index < dim_numbers; index++) {
					let option = {
						symbolSize: 15,
						type: 'line',
						lineStyle: {
							width: 5
						},
						emphasis: {
							focus: 'series',
							label: {
								show: true,
								fontSize: 16,
								formatter: function formatValue(params) {
									var formattedValue = parseFloat(
										params.value[params.encode.y[0]]
									).toLocaleString('en-IN');
									return formattedValue;
								}
							}
						},
						endLabel: {
							show: true,
							formatter: '{a}',
							distance: 15,
							fontSize: 16
						}
					};

					series_options.push(option);
				}

				// console.log(JSON.stringify(series_options, null, 4));

				var chartDom = document.getElementById('vs_race_line_graph');
				var myChart = echarts.dispose(chartDom);
				var myChart = echarts.init(chartDom);
				var option;

				option = {
					animationDuration: 4000,
					toolbox: {
						show: true,
						feature: {
							dataZoom: {
								yAxisIndex: 'none'
							},
							restore: {}
						}
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross',
							crossStyle: {
								color: '#999'
							}
						}
					},
					legend: {
						top: '10',
						type: 'scroll',
						selector: ['all'],
						selectorPosition: 'start',
						selected: all_but_top3
					},
					grid: {
						bottom: '50px',
						left: '40px',
						right: '120px'
					},
					dataset: {
						source: dim_names_and_measure_values
					},
					xAxis: [
						{
							type: 'category',
							axisPointer: {
								type: 'shadow'
							},
							offset: 10
						}
					],
					yAxis: [
						{
							show: true,
							type: 'value',
							min: 'dataMin',
							interval: 1,
							inverse: true
						}
					],
					series: series_options
				};
				// console.log(JSON.stringify(option, null, 4));
				option && myChart.setOption(option);
				window.addEventListener('resize', myChart.resize);
			});
		}

		race_overview_chart()

		$('#echart').click(function () {
			race_overview_chart()
		})

		app.getObject('vs_race_line_table', 'RTbpLjW')

		app.getObject('YU').then(function (model) {
			let furlong_videos_matrix = model.layout.qHyperCube.qDataPages[0].qMatrix


			let keys = ['title', 'URL'];

			let furlong_videos = furlong_videos_matrix.map(array => {
				let obj = {};
				array.forEach((value, index) => {
					obj[keys[index]] = value.qText;
				});
				return obj;
			});
			// console.log(furlong_videos);

			$('.furlong_videos_container').empty();

			furlong_videos.forEach(element => {
				let video_item = `<div class="video_item">
									<div class="video_icons">
										<a class="video_url" href="#furlong_videos_popup"><img src="./assets/Images/play-circle.svg"
												alt="Icon"></a>
										<span class="video_title">${element.title}</span>
									</div>
								</div>`

				$('.furlong_videos_container').append(video_item)
			});

		})

		app.getObject('vs_race_sectionals_timing_graph_dropdown', 'fyAmR')

		app.getAppLayout(function () {
			app.getObject('TWdN').then(function (model) {

				let dim_names_array = model.layout.qHyperCube.qPivotDataPages[0].qTop.map(array => array.qText)

				let data_matrix = model.layout.qHyperCube.qPivotDataPages[0].qData;

				let min_time_array = data_matrix[0].map(array => array.qText)
				let min_time = Math.min(...min_time_array)
				// console.log(min_time);

				let max_time_array = data_matrix[1].map(array => array.qText)
				let max_time = Math.max(...max_time_array)
				// console.log(max_time);

				let sel_horse_time_array = data_matrix[2].map(array => array.qText)
				// console.log(sel_horse_time_array);

				let sel_horse_name = model.layout.qHyperCube.qPivotDataPages[0].qLeft[2].qText
				let sel_horse_pos = parseInt(sel_horse_name.slice(0, 2).replace(/_/g, ''))

				let diff_time_array = data_matrix[3].map(array => array.qText)
				// console.log(diff_time);

				let colors = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc', '#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc', '#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc']

				var chartDom = document.getElementById('vs_race_sectionals_timing_graph');
				var myChart = echarts.dispose(chartDom);
				var myChart = echarts.init(chartDom);
				var option;

				option = {
					animationDuration: 500,
					tooltip: {
						trigger: 'axis',
						formatter: function (params) {
							let value = parseFloat(params[0].value) + parseFloat(params[2].value)
							return (
								'Max: <b>' + value.toFixed(2) +
								'</b><br>' + params[4].seriesName + ' : <b>' + params[4].value +
								'</b><br> Min: <b>' + params[0].value + '</b>'
							);
						},
						axisPointer: {
							type: 'cross',
							crossStyle: {
								color: '#999'
							}
						}
					},
					grid: {
						bottom: '10%',
						left: '40px',
						right: '10px'
					},
					xAxis: [
						{
							type: 'category',
							data: dim_names_array,
							offset: 30
						}
					],
					yAxis: {
						type: 'value',
						show: false,
						min: min_time,
						max: max_time
					},
					series: [
						{
							name: 'Placeholder',
							type: 'bar',
							stack: 'Total',
							silent: true,
							itemStyle: {
								borderColor: 'transparent',
								color: 'transparent'
							},
							data: min_time_array
						},
						{
							name: 'Bottom Symbol',
							type: 'line',
							lineStyle: {
								opacity: 0
							},
							itemStyle: {
								color: 'green'
							},
							label: {
								show: true,
								position: 'bottom'
							},
							symbolSize: 15,
							symbol: 'circle',
							data: min_time_array
						},
						{
							name: 'Actual Bar',
							type: 'bar',
							stack: 'Total',
							barWidth: 10,
							itemStyle: {
								borderRadius: [50],
								color: 'transparent',
								borderWidth: 2,
								borderColor: "black"
							},
							data: diff_time_array
						},
						{
							name: 'Upper Symbol',
							type: 'line',
							lineStyle: {
								opacity: 0
							},
							itemStyle: {
								color: 'red'
							},
							label: {
								show: true,
								position: 'top'
							},
							symbolSize: 15,
							symbol: 'circle',
							data: max_time_array
						},
						{
							name: sel_horse_name,
							type: 'line',
							lineStyle: {
								opacity: 0
							},
							itemStyle: {
								color: colors[sel_horse_pos - 1]
							},
							symbolSize: [30, 5],
							symbol: 'roundRect',
							data: sel_horse_time_array
						}
					]
				};
				// console.log(JSON.stringify(option, null, 4));
				option && myChart.setOption(option);
				window.addEventListener('resize', myChart.resize);

			});
		})

	})


	$('.vs_content').on('click', '#back_to_race_selection', function () {
		$('.vs_qv_filters').css({ 'display': 'flex' })
		$('.qv_race_objects').css({ 'display': 'block' })
		$('.race_insight_details').css({ 'display': 'none' })
		app.field('raceGroup').clear()
		app.field('raceDate').selectMatch('5/20/2024', true);

	})

	// app.field('raceGroup').selectMatch('2023-12-23 14:40 Haydock', true);

	// Race Sectionals Section
	// duration sectional - 86a51735-1267-4fb1-8a2b-9d335903e020
	// duration overall - bec16669-89c2-4485-ae41-d50a57f78c26
	// distance - c3a31a3f-a853-44b4-a93b-388616459a18
	// max speed - a5d14b41-51da-40b4-816b-1166dbf79a09
	// avg speed - c2ae4560-dd93-4610-bf40-daee5001cafd
	// detailed speed - 12f19b8e-1bdf-40b5-94d8-e99347e59666
	// app.getObject('vs_duration_sectional', '86a51735-1267-4fb1-8a2b-9d335903e020');
	// app.getObject('vs_duration_overall', 'bec16669-89c2-4485-ae41-d50a57f78c26');
	// app.getObject('vs_distance','c3a31a3f-a853-44b4-a93b-388616459a18');
	// app.getObject('vs_max_speed','a5d14b41-51da-40b4-816b-1166dbf79a09');
	// app.getObject('vs_avg_speed','c2ae4560-dd93-4610-bf40-daee5001cafd');
	// app.getObject('vs_detailed_speed','12f19b8e-1bdf-40b5-94d8-e99347e59666');

	let vRace_Sectional_Graphs = {
		vs_duration_sectional: '8ac6e13f-856b-45da-85af-019a72dcfe53',
		vs_duration_overall: 'd2dcad8c-41ea-49a9-80b9-6f5409adcfe6',
		vs_distance: 'e6195691-ba9a-4717-b38e-2cc5522ac613',
		vs_max_speed: '1102e7fd-9eea-4938-b003-0f1b6d473920',
		vs_avg_speed: 'a3e6b0ee-7a60-4979-927d-b7d47d2b45c6'
		// vs_detailed_speed: 'a2be99c4-65d4-47d8-80a3-4cbc3985b386'
	}

	let vRace_Sectional_Tables = {
		vs_duration_sectional_tab: 'faaad8bf-e8b2-4ba5-8c53-15a86dbfbc99',
		vs_duration_overall_tab: 'b7728563-1122-4179-b2b8-45048766ad0f',
		vs_distance_tab: 'ad9258e4-a575-4608-952b-ab8b748f1e90',
		vs_max_speed_tab: '479f0da0-5173-4725-9544-27ae29d576f5',
		vs_avg_speed_tab: '2639c3e0-c4ea-4ae6-9118-fd9f89159585'
	}

	$('.race_sectional_dim_popup .model_dim').change(function () {

		$('.race_sectionals_dim_toggle_popup .vs_switch label').text($(this).attr('data-text'))
		var sectional_graph_html_id = $(this).attr('sectional_graph_id')
		var sectional_table_html_id = $(this).attr('sectional_table_id')

		$('.sectionals_graph_item').css({ 'display': 'none' })
		$('.sectionals_table_item').css({ 'display': 'none' })

		if ($(this).is(':checked')) {
			app.getObject(sectional_table_html_id, vRace_Sectional_Tables[sectional_table_html_id]);
			$(`#${sectional_table_html_id}`).css({ 'display': 'flex' })
			// app.getObject(sectional_graph_html_id, vRace_Sectional_Graphs[sectional_graph_html_id]);
			show_race_sectional_Charts(sectional_graph_html_id, vRace_Sectional_Graphs[sectional_graph_html_id])
			$(`#${sectional_graph_html_id}`).css({ 'display': 'flex' })
		}

		// if ($(this).closest('.detailed_speed').length > 0) {
		// 	// Radio button with class .detailed_speed is selected
		// 	$('.race_sectionals_toolbox .switch_btns_container').css({ 'pointer-events': 'none', 'opacity': '0.5' });
		// } else {
		// 	// Radio button without class .detailed_speed is selected
		// 	$('.race_sectionals_toolbox .switch_btns_container').css({ 'pointer-events': 'all', 'opacity': '1' });
		// }
	});


	let vRace_Rankings_Graphs = {
		vs_sectional: 'b8ba77e3-1b9b-42f5-8439-a2311f77df28',
		vs_overall: 'df2b2b11-883a-447c-99b1-e9138f16f488'
	}

	let vRace_Rankings_Tables = {
		vs_sectional_tab: 'd3e6a2a1-7265-4dd4-a980-dfc448e49f35',
		vs_overall_tab: '50af6b04-1168-4f86-b13b-9de5625f7313'
	}

	$('.race_rankings_dim_popup .model_dim').change(function () {

		$('.race_rankings_dim_toggle_popup .vs_switch label').text($(this).attr('data-text'))
		var rankings_graph_html_id = $(this).attr('rankings_graph_id')
		var rankings_table_html_id = $(this).attr('rankings_table_id')

		$('.rankings_graph_item').css({ 'display': 'none' })
		$('.rankings_table_item').css({ 'display': 'none' })

		if ($(this).is(':checked')) {
			app.getObject(rankings_table_html_id, vRace_Rankings_Tables[rankings_table_html_id]);
			$(`#${rankings_table_html_id}`).css({ 'display': 'flex' })
			// app.getObject(sectional_graph_html_id, vRace_Sectional_Graphs[sectional_graph_html_id]);
			show_race_ranking_Charts(rankings_graph_html_id, vRace_Rankings_Graphs[rankings_graph_html_id])
			$(`#${rankings_graph_html_id}`).css({ 'display': 'flex' })
		}

		// if ($(this).closest('.detailed_speed').length > 0) {
		// 	// Radio button with class .detailed_speed is selected
		// 	$('.race_sectionals_toolbox .switch_btns_container').css({ 'pointer-events': 'none', 'opacity': '0.5' });
		// } else {
		// 	// Radio button without class .detailed_speed is selected
		// 	$('.race_sectionals_toolbox .switch_btns_container').css({ 'pointer-events': 'all', 'opacity': '1' });
		// }
	});

	// $('#vs_race_sectional_toggle').change(function () {

	// 	var qs_object_to_show = $('.race_sectional_dim_popup .model_dim:checked').attr('sectional_graph_id')

	// 	if ($(this).is(':checked')) {
	// 		$(`#${qs_object_to_show}_tab`).css({ 'display': 'flex' })
	// 		app.getObject(`${qs_object_to_show}_tab`, vRace_Sectional_Tables[`${qs_object_to_show}_tab`]);

	// 		// $('.detailed_speed').hide()
	// 		$('.sectionals_graph').css({ 'display': 'none' })
	// 		$('.sectionals_table').css({ 'display': 'flex' })
	// 	} else {
	// 		$(`#${qs_object_to_show}`).css({ 'display': 'flex' })
	// 		show_race_sectional_Charts(`${qs_object_to_show}`, vRace_Sectional_Graphs[qs_object_to_show]);

	// 		// $('.detailed_speed').show()
	// 		$('.sectionals_graph').css({ 'display': 'flex' })
	// 		$('.sectionals_table').css({ 'display': 'none' })
	// 	}
	// });



	// duration sectional - c531abb9-fc74-460d-8ed0-4e481022a546
	// duration overall - de099f0b-fb05-4711-b941-3473e675c9f4
	// distance - c894268d-efa0-4527-abeb-0df8b0d9d57e
	// max speed - 27718396-f2f6-4541-ad1a-8716201e568d
	// avg speed - fa5c81c4-0a0e-4508-82e7-77a7b50135c7
	// app.getObject('vs_duration_sectional_tab','c531abb9-fc74-460d-8ed0-4e481022a546');
	// app.getObject('vs_duration_overall_tab','de099f0b-fb05-4711-b941-3473e675c9f4');
	// app.getObject('vs_distance_tab','c894268d-efa0-4527-abeb-0df8b0d9d57e');
	// app.getObject('vs_max_speed_tab','27718396-f2f6-4541-ad1a-8716201e568d');
	// app.getObject('vs_avg_speed_tab','fa5c81c4-0a0e-4508-82e7-77a7b50135c7');


	$('.qv_objects').on('click', '.link_trainer', function () {
		let fieldValue = $(this).text();

		// Store the selected field value in sessionStorage
		sessionStorage.setItem('selectedtrainerValue', fieldValue);

		// Change window location
		window.location.href = "./trainer_profile.html";
	});

	$('.qv_objects').on('click', '.link_horse', function () {
		let fieldValue = $(this).text();

		// Store the selected field value in sessionStorage
		sessionStorage.setItem('selectedhorseValue', fieldValue);

		// Change window location
		window.location.href = "./horse_profile.html";
	});

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
		let recent_date = $(this).attr('qlik_value');
		$(this).addClass('selected_btn')
		app.field('raceDate').selectMatch(recent_date, true);
		$('.recent_results_dim_popup').toggle()
		$('#recent_results_toggle').toggleClass('active');
	});

	// app.field('raceDate').selectMatch('12/26/2023', true);

	app.getObject('vs_altitude_speed', '961fdd68-0cb3-4986-80f6-911beaf3975e')

	function clear_All() {
		app.clearAll();
	}

	$('#reset_selections_btn, #sel_clear').click(function () {
		clear_All()
	});

	$('#sel_back').click(function () {
		app.back();
	});

	$('#sel_forward').click(function () {
		app.forward();
	});

	var currentPage = window.location.pathname;
	if (currentPage.includes('Race-Insight.html')) {
		loadScript('./assets/JS/race_insights.js');
	} else if (currentPage.includes('horse_profile.html')) {
		loadScript('./assets/JS/horse_profile.js');
	} else if (currentPage.includes('trainer_profile.html')) {
		loadScript('./assets/JS/trainer_profile.js');
	} else if (currentPage.includes('jockey_profile.html')) {
		loadScript('./assets/JS/jockey_profile.js');
	} else if (currentPage.includes('statistics.html')) {
		loadScript('./assets/JS/statistics.js');
	} else if (currentPage.includes('Race-Insight-time.html')) {
		loadScript('./assets/JS/race_insights.js');
	}else if (currentPage.includes('racing_news.html')) {
		loadScript('./assets/JS/racing_news.js');
	}else if (currentPage.includes('sectionals.html')) {
		loadScript('./assets/JS/sectionals.js');
	}
});

function loadScript(scriptPath) {
	var script = document.createElement('script');
	script.src = scriptPath;
	document.head.appendChild(script);
}