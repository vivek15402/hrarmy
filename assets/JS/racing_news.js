$('.ripple-container').hide()
let storedData
function fetchDataAndUpdateUI() {
    storedData = localStorage.getItem('newsData');

    if (storedData) {
        const storedDataParsed = JSON.parse(storedData);
        updateUI(storedDataParsed, 'vs_racing_cards_container');

        fetch('assets/latest_min.json')
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('newsData', JSON.stringify(data));
                // updateUI(data, 'vs_racing_cards_container');
            })
            .catch(error => {
                console.error('Error:', error);
            });

    } else {
        fetch('assets/latest_min.json')
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('newsData', JSON.stringify(data));
                updateUI(data, 'vs_racing_cards_container');
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}

function updateUI(data, html_target_elem) {
    let news_article_array = data.item.map(array => ({
        featureImage: array.associations.featureimage.renditions['16x9'].href,
        headline: array.headline,
        issued: array.issued,
        description: array.description_text,
        body_html: array.body_html
    }));

    $(`.${html_target_elem}`).empty();
    news_article_array.forEach((news, index) => {
        let news_article = `<div class="col vs_racing_news_details" news_no="${index}">
                                <div class="vs_racing_news_image">
                                    <img class="zoom_image" src="${news.featureImage}" alt="">
                                </div>
                                <div class="vs_racing_news_title">
                                    <span>${news.headline}</span>
                                </div>
                                <div class="vs_racing_news_date">
                                    <span>${formatDate(news.issued)}</span>
                                </div>
                                <div class="vs_racing_news_desc">
                                    <span>${news.description}</span>
                                </div>
                            </div>`;

        $(`.${html_target_elem}`).append(news_article);
    });
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

fetchDataAndUpdateUI();

function formatDate(dateString) {
    const date = new Date(dateString);

    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    return date.toLocaleDateString('en-GB', options);
}


$('.vs_content').on('click', '.vs_racing_news_details', function () {
    $('.news_articles_container').hide()
    $('#back_to_news_section, .vs_news_detailed_container').css({ 'display': 'flex' })

    let data_index = $(this).attr('news_no')

    let news_article_data = JSON.parse(localStorage.getItem('newsData')).item[data_index]
    // console.log(news_article_data);
    // updateUI(storedData[data_index], 'vs_racing_card_container')
    $(`.vs_racing_card_container`).empty()
    let news_article = `<div class="col vs_racing_news_details" news_no="${data_index}" style="pointer-events: none">
                        <div class="vs_racing_news_image">
                            <img class="zoom_image" src="${news_article_data.associations.featureimage.renditions['16x9'].href}" alt="">
                        </div>
                        <div class="vs_racing_news_title">
                            <span>${news_article_data.headline}</span>
                        </div>
                        <div class="vs_racing_news_date">
                            <span>${formatDate(news_article_data.issued)}</span>
                        </div>
                        <div class="vs_racing_news_desc">
                            <span>${news_article_data.description_text}</span>
                        </div>
                    </div>`;

    $(`.vs_racing_card_container`).append(news_article);
    $(`.vs_racing_card_container`).append(news_article_data.body_html)
})

$('.vs_content').on('click', '#back_to_news_section', function () {
    $('.news_articles_container').show()
    $('#back_to_news_section, .vs_news_detailed_container').css({ 'display': 'none' })
})