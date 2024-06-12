$('.ripple-container').hide();

app.field('raceGroup').selectMatch('2024-05-22 21:00 Kempton', true)

app.getObject('VS_QS_Filters', 'WLzVZJ');

app.getObject('vs_sectional_dim_dropdown', 'EDBnmP');

function vs_sectionals_cont1_tab1() {
	show_race_sectional_Charts('vs_duration_sectional', 'fc6c3f72-9f78-4acf-8741-8e162307b6ff')
	app.getObject('vs_duration_sectional_tab', 'CfNL')
}

function vs_sectionals_cont1_tab2() {
	show_race_sectional_Charts('vs_duration_overall', 'f0936ba8-9bc2-4f23-9bd4-b8fe1f0a44e1')
	app.getObject('vs_duration_overall_tab', 'GCPjfw')
}

function vs_sectionals_cont1_tab3() {
	show_race_sectional_Charts('vs_distance', 'pCaKau')
	app.getObject('vs_distance_tab', 'GhwbzD')
}

function vs_sectionals_cont1_tab4() {
	show_race_sectional_Charts('vs_max_speed', 'db58262a-47bb-4aab-87f1-da5512a2a053')
	app.getObject('vs_max_speed_tab', 'HDYUV')
}

function vs_sectionals_cont1_tab5() {
	show_race_sectional_Charts('vs_avg_speed', '71d3a517-5dd5-4020-9bf9-7460148cd820')
	app.getObject('vs_avg_speed_tab', 'sSbuaL')
}

vs_sectionals_cont1_tab1()

tabbedContainer('vs_sectionals_cont1')