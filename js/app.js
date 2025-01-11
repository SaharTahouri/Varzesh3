//showing the date

var date = new Date();
var persianDate = new persianDate(date);
var formattedDate = persianDate.format('dddd DD MMMM');
document.querySelector(".date").innerHTML = `${formattedDate}`;

//showing the time
var now = new Date();
var hour = now.getHours();
var minute = now.getMinutes();
document.querySelector(".time").innerText = `${hour}:${minute}`;

// create elements, add classes, append elements functions

function createAppendElement(type, options = {}) {
    let element = document.createElement(type);

    if (options.className) {
        element.className = options.className;
    }

    if (options.id) {
        element.id = options.id;
    }

    if (options.attributes) {
        for (let attribute in options.attributes) {
            element.setAttribute(attribute, options.attributes[attribute]);
        }
    }

    if (options.styles) {
        for (let styleAtt in options.styles) {
            element.style[styleAtt] = options.styles[styleAtt];
        }
    }

    if (options.textContent) {
        element.textContent = options.textContent;
    }

    if (options.appendTo) {
        options.appendTo.append(element);
    }

    return element;
}

// show ads

function loadAdsData() {
    fetch("js/data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then(data => {
            let suggestedAds = data.ads;
            let index = 0;
            for (key in suggestedAds) {
                let adCategory = suggestedAds[key];
                document.querySelectorAll(".ad-slider-header-text p")[index].textContent = `${adCategory.header}`;
                let carouselInner = document.querySelectorAll(".carousel-ad .carousel-inner")[index];
                for (let i = 0; i < adCategory.ads.length; i++) {
                    let ad = adCategory.ads[i];
                    let activeClass = i == 1 ? "active" : "";
                    let carouselItem = createAppendElement("div", {
                        className: `carousel-item ${activeClass}`
                    });
                    let carouselItemA = createAppendElement("a", {
                        attributes: {
                            "href": "#"
                        }
                    });
                    let imgName = ad.img.split(".")[0];
                    createAppendElement("img", {
                        className: "d-block w-100",
                        attributes: {
                            "src": `images/${ad.img}`,
                            "alt": `${imgName}`
                        },
                        appendTo: carouselItemA
                    });
                    let carouselInfo = createAppendElement("div", {
                        className: "carousel-info"
                    });
                    createAppendElement("p", {
                        className: "m-0 py-2",
                        textContent: `${ad.infoText}`,
                        appendTo: carouselInfo
                    });
                    carouselItemA.append(carouselInfo);
                    carouselItem.append(carouselItemA);
                    carouselInner.append(carouselItem);
                }
                index++;
            }
        })
        .catch(function (error) {
            console.log("error: ", error);
        });
}

loadAdsData();

// show the head carousel news

const headNewsCarousel = document.querySelector(".head-news-carousel-inner");

function loadHeadNewsData() {
    fetch("js/data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then(data => {
            let headNews = data.headNews;
            for (let key in headNews) {
                let item = headNews[key];
                let activeClass = key == 1 ? "active" : "";
                let carouselItem = createAppendElement("div", {
                    className: `carousel-item ${activeClass} h-100`
                });
                let innerCarousel = createAppendElement("div", {
                    className: "d-flex h-100"
                });
                let carouselImgWrapper = createAppendElement("div", {
                    className: "col-6 overflow-hidden"
                });
                createAppendElement("img", {
                    className: "d-block",
                    attributes: {
                        "src": `images/${item.img}`,
                        "alt": `${item.headline}`
                    },
                    appendTo: carouselImgWrapper
                });
                innerCarousel.append(carouselImgWrapper);
                let carouselInfo = createAppendElement("div", {
                    className: "carousel-info col-6 pt-3 px-2"
                });
                let carouselInfoLink = createAppendElement("a", {
                    className: "carousel-info-link",
                    attributes: {
                        "href": "#"
                    }
                });
                createAppendElement("p", {
                    className: "carousel-info-suptitle mb-2",
                    textContent: `${item.suptitle}`,
                    appendTo: carouselInfoLink
                });
                let liveImg;
                if (item.hasOwnProperty("live")) {
                    liveImg = createAppendElement("img", {
                        attributes: {
                            "src": "images/live-icon-64.gif"
                        }
                    });
                }
                let carouselInfoHeadline = createAppendElement("h2", {
                    className: "carousel-info-headline mb-3 fw-semibold text-black"
                });
                if (liveImg) {
                    carouselInfoHeadline.append(liveImg);
                }
                carouselInfoHeadline.textContent = `${item.headline}`;
                carouselInfoLink.append(carouselInfoHeadline);
                createAppendElement("p", {
                    className: "carousel-info-subtitle mb-3 fw-normal text-black",
                    textContent: `${item.subtitle}`,
                    appendTo: carouselInfoLink
                });
                carouselInfo.append(carouselInfoLink);
                innerCarousel.append(carouselInfo);
                carouselItem.append(innerCarousel);
                headNewsCarousel.append(carouselItem);
            }
        })
        .catch(function () {
            console.log("error");
        });
}

loadHeadNewsData();

// show second titr carousel news

const secondTitrCarousel = document.querySelector(".second-titr-carousel-inner");

function loadSecondTitrData() {
    fetch("js/data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then(data => {
            let secondTitr = data.secondTitr;
            for (let key in secondTitr) {
                let item = secondTitr[key];
                let activeClass = key == 1 ? "active" : "";
                let carouselItem = createAppendElement("div", {
                    className: `carousel-item ${activeClass} h-100`
                });
                let innerCarousel = createAppendElement("div", {
                    className: "d-flex h-100"
                });
                let carouselImgWrapper = createAppendElement("div", {
                    className: "col-3 overflow-hidden"
                });
                createAppendElement("img", {
                    className: "d-block",
                    attributes: {
                        "src": `images/${item.img}`,
                        "alt": `${item.headline}`
                    },
                    appendTo: carouselImgWrapper
                });
                let carouselInfo = createAppendElement("div", {
                    className: "carousel-info col-9 pt-3 ps-2 pe-5"
                });
                let carouselInfoLink = createAppendElement("a", {
                    className: "carousel-info-link",
                    attributes: {
                        "href": "#"
                    }
                });
                let carouselInfoHeadline = createAppendElement("h2", {
                    className: "carousel-info-headline fs-6 fw-semibold text-black"
                });
                createAppendElement("span", {
                    className: "fw-medium rounded-1 text-white",
                    textContent: "تیتر دو",
                    appendTo: carouselInfoHeadline
                });
                carouselInfoHeadline.textContent = `${item.headline}`;
                createAppendElement("p", {
                    className: "carousel-info-subtitle m-0 fw-normal",
                    textContent: `${item.subtitle}`,
                    appendTo: carouselInfoLink
                });
                innerCarousel.append(carouselImgWrapper);
                carouselInfoLink.append(carouselInfoHeadline);
                carouselInfo.append(carouselInfoLink);
                innerCarousel.append(carouselInfo);
                carouselItem.append(innerCarousel);
                secondTitrCarousel.append(carouselItem);
            }
        })
        .catch(function () {
            console.log("error");
        });
}
loadSecondTitrData();

//show europe nations league widget

let europeNationsLeague;

function loadeuropeNationsLeagueData() {
    fetch("js/data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then(data => {
            europeNationsLeague = data.europeNationsLeague;
            changeStageEurope();
        })
        .catch(function (error) {
            console.log("error: ", error);
        });
}

function changeStageEurope() {
    const selectElement = document.getElementById("europe-nations-league-select");
    const selectedStage = selectElement.value;
    const stageDataElement = document.querySelector(".widget-body-europe-nations");
    while (stageDataElement.firstChild) {
        stageDataElement.removeChild(stageDataElement.firstChild);
    }
    let stageData = europeNationsLeague[selectedStage];
    let widgetSubtitle = createAppendElement("div", {
        className: "widget-subtitle text-center text-white bg-dark-blue"
    });
    createAppendElement("h3", {
        textContent: `${stageData.subtitle}`,
        appendTo: widgetSubtitle
    });
    let widgetSchedule = createAppendElement("div", {
        className: "widget-schedule"
    });
    let matchCounter = 1;
    for (let i = 0; i < stageData.matches.length; i++) {
        let match = stageData.matches[i];
        if (match.hasOwnProperty("separator")) {
            let widgetDateSeparator = createAppendElement("div", {
                className: "widget-date-separator text-center text-white bg-dark-gray"
            });
            createAppendElement("h4", {
                textContent: match.separator,
                appendTo: widgetDateSeparator
            });
            widgetSchedule.append(widgetDateSeparator);
            matchCounter = 1;
        }
        let widgetMatchResult = createAppendElement("div", {
            className: "widget-match-result d-flex justify-content-between align-items-center"
        });
        if (matchCounter % 2 === 0) {
            widgetMatchResult.className += " even";
        }
        let widgetMatchResultDetail = createAppendElement("div", {
            className: "widget-match-result-detail d-flex justify-content-between",
            appendTo: widgetMatchResult
        });
        let widgetDetailIcon1 = createAppendElement("a", {
            attributes: {
                "href": "#"
            }
        });
        widgetDetailIcon1.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17"
                                                        viewBox="0 0 24 24">
                                                        <g fill="none" fill-rule="evenodd">
                                                            <g fill="#90a4ae ">
                                                                <g>
                                                                    <g>
                                                                        <path
                                                                            d="M11.1 7.5h1.8v1.8h-1.8V7.5zm0 3.6h1.8v5.4h-1.8v-5.4zM12 3c-4.968 0-9 4.032-9 9s4.032 9 9 9 9-4.032 9-9-4.032-9-9-9zm0 16.2c-3.969 0-7.2-3.231-7.2-7.2 0-3.969 3.231-7.2 7.2-7.2 3.969 0 7.2 3.231 7.2 7.2 0 3.969-3.231 7.2-7.2 7.2z"
                                                                            transform="translate(-469 -364) translate(413 355) translate(56 9)" />
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </svg>`;
        widgetMatchResultDetail.append(widgetDetailIcon1);
        if (match.detail === false) {
            let widgetDetailIcon2 = createAppendElement("a", {
                attributes: {
                    "href": "#"
                }
            });
            widgetDetailIcon2.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17"
                                                        viewBox="0 0 24 24">
                                                        <g fill="none" fill-rule="evenodd">
                                                            <g>
                                                                <g>
                                                                    <g
                                                                        transform="translate(-509 -477) translate(413 468) translate(96 9)">
                                                                        <circle cx="5" cy="12" r="3" fill="#A3244C" />
                                                                        <circle cx="12" cy="12" r="3" fill="#C92659" />
                                                                        <circle cx="19" cy="12" r="3" fill="#F02867" />
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </svg>`;
            widgetMatchResultDetail.append(widgetDetailIcon2);
        }
        let widgetMatchResultTeams = createAppendElement("a", {
            className: "widget-match-result-teams d-flex justify-content-center w-75",
            attributes: {
                "href": "#"
            }
        });
        createAppendElement("span", {
            className: "widget-match-host text-end",
            textContent: match.host,
            appendTo: widgetMatchResultTeams
        });
        let widgetMatchGoals = createAppendElement("div", {
            className: "widget-match-goals d-flex justify-content-around"
        });
        let widgetMatchGoalsHost = createAppendElement("span", {
            className: "host"
        });
        widgetMatchGoalsHost.innerHTML = match.hostScore || "";
        widgetMatchGoals.append(widgetMatchGoalsHost);
        createAppendElement("span", {
            textContent: "-",
            appendTo: widgetMatchGoals
        });
        let widgetMatchGoalsGuest = createAppendElement("span", {
            className: "guest"
        });
        widgetMatchGoalsGuest.innerHTML = match.guestScore || "";
        widgetMatchGoals.append(widgetMatchGoalsGuest);
        widgetMatchResultTeams.append(widgetMatchGoals);
        createAppendElement("span", {
            className: "widget-match-guest",
            textContent: match.guest,
            appendTo: widgetMatchResultTeams
        });
        widgetMatchResult.append(widgetMatchResultTeams);
        let widgetMatchResultTime = createAppendElement("div", {
            className: "widget-match-result-time d-flex justify-content-end"
        });
        if (match.hasOwnProperty("time")) {
            createAppendElement("span", {
                className: "match-time",
                textContent: match.time,
                appendTo: widgetMatchResultTime
            });
            createAppendElement("span", {
                className: "match-status",
                appendTo: widgetMatchResultTime
            });
        } else if (match.play === true) {
            let widgetPlayIcon = createAppendElement("a", {
                attributes: {
                    "href": "#"
                }
            });
            widgetPlayIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24">
                                                <g fill="none" fill-rule="evenodd">
                                                    <g fill="#0097a7">
                                                        <g>
                                                            <g>
                                                                <path d="M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9zM9.75 7.5v8.438l6.75-4.22L9.75 7.5z" transform="translate(-469 -311) translate(413 302) translate(56 9)"/>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>`;
            widgetMatchResultTime.append(widgetPlayIcon);
        }
        widgetMatchResult.append(widgetMatchResultTime);
        widgetSchedule.append(widgetMatchResult);
        stageDataElement.append(widgetSubtitle);
        stageDataElement.append(widgetSchedule);
        matchCounter++;
    }
    if (stageData.hasOwnProperty("table")) {
        let stageDataTable = stageData.table;
        let widgetTableTitle = createAppendElement("div", {
            className: "widget-subtitle text-center text-white bg-dark-blue"
        });
        createAppendElement("h3", {
            textContent: stageDataTable.tableTitle,
            appendTo: widgetTableTitle
        });
        stageDataElement.append(widgetTableTitle);
        let widgetTable = createAppendElement("table", {
            className: "group-table w-100 text-center"
        });
        let widgetTableThead = document.createElement("thead");
        let widgetTableTheadTr = createAppendElement("tr", {
            className: "bg-dark-gray"
        });
        for (let j = 0; j < stageDataTable.th.length; j++) {
            createAppendElement("th", {
                className: "fw-normal text-white",
                attributes: {
                    "scope": "col"
                },
                textContent: `${stageDataTable.th[j]}`,
                appendTo: widgetTableTheadTr
            });
        }
        let widgetTableTbody = document.createElement("tbody");
        for (let k = 0; k < stageDataTable.tr.length; k++) {
            let td = stageDataTable.tr[k];
            let widgetTableTbodyTr = createAppendElement("tr", {
                className: "fw-medium text-black"
            });
            createAppendElement("td", {
                textContent: `${td.rank}`,
                appendTo: widgetTableTbodyTr
            });
            let widgetTableTbodyTeam = document.createElement("td");
            createAppendElement("a", {
                className: "fw-semibold text-black",
                attributes: {
                    "href": '#'
                },
                textContent: `${td.team}`,
                appendTo: widgetTableTbodyTeam
            });
            widgetTableTbodyTr.append(widgetTableTbodyTeam);
            createAppendElement("td", {
                className: "table-game fw-normal",
                textContent: `${td.game}`,
                appendTo: widgetTableTbodyTr
            });
            createAppendElement("td", {
                textContent: `${td.score}`,
                appendTo: widgetTableTbodyTr
            });
            widgetTableTbody.append(widgetTableTbodyTr);
        }
        widgetTableThead.append(widgetTableTheadTr);
        widgetTable.append(widgetTableThead);
        widgetTable.append(widgetTableTbody);
        stageDataElement.append(widgetTable);
    }
    document.querySelector(".widget-footer-europe-nations a").textContent = `${stageData.footer}`;
}

loadeuropeNationsLeagueData();

// show copa america widget

let copaAmerica;

function loadCopaAmericaData() {
    fetch("js/data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then(data => {
            copaAmerica = data.copaAmerica;
            changeStageCopaAmerica();
        })
        .catch(function (error) {
            console.log("error: ", error);
        });
}

function changeStageCopaAmerica() {
    const selectElement = document.getElementById("copa-america-select");
    const selectedStage = selectElement.value;
    const stageDataElement = document.querySelector(".widget-body-copa-america");
    while (stageDataElement.firstChild) {
        stageDataElement.removeChild(stageDataElement.firstChild);
    }
    let stageData = copaAmerica[selectedStage];
    let widgetSubtitle = createAppendElement("div", {
        className: "widget-subtitle text-center text-white bg-dark-blue"
    });
    createAppendElement("h3", {
        textContent: `${stageData.subtitle}`,
        appendTo: widgetSubtitle
    });
    let widgetSchedule = createAppendElement("div", {
        className: "widget-schedule"
    });
    let matchCounter = 1;
    for (let i = 0; i < stageData.matches.length; i++) {
        let match = stageData.matches[i];
        if (match.hasOwnProperty("separator")) {
            let widgetDateSeparator = createAppendElement("div", {
                className: "widget-date-separator text-center text-white bg-dark-gray"
            });
            createAppendElement("h4", {
                textContent: match.separator,
                appendTo: widgetDateSeparator
            });
            widgetSchedule.append(widgetDateSeparator);
            matchCounter = 1;
        }
        let widgetMatchResult = createAppendElement("div", {
            className: "widget-match-result d-flex justify-content-between align-items-center"
        });
        if (matchCounter % 2 === 0) {
            widgetMatchResult.className += " even";
        }
        let widgetMatchResultDetail = createAppendElement("div", {
            className: "widget-match-result-detail d-flex justify-content-between",
            appendTo: widgetMatchResult
        });
        let widgetDetailIcon1 = createAppendElement("a", {
            attributes: {
                "href": "#"
            }
        });
        widgetDetailIcon1.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17"
                                                        viewBox="0 0 24 24">
                                                        <g fill="none" fill-rule="evenodd">
                                                            <g fill="#90a4ae ">
                                                                <g>
                                                                    <g>
                                                                        <path
                                                                            d="M11.1 7.5h1.8v1.8h-1.8V7.5zm0 3.6h1.8v5.4h-1.8v-5.4zM12 3c-4.968 0-9 4.032-9 9s4.032 9 9 9 9-4.032 9-9-4.032-9-9-9zm0 16.2c-3.969 0-7.2-3.231-7.2-7.2 0-3.969 3.231-7.2 7.2-7.2 3.969 0 7.2 3.231 7.2 7.2 0 3.969-3.231 7.2-7.2 7.2z"
                                                                            transform="translate(-469 -364) translate(413 355) translate(56 9)" />
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </svg>`;
        widgetMatchResultDetail.append(widgetDetailIcon1);
        if (match.detail === false) {
            let widgetDetailIcon2 = createAppendElement("a", {
                attributes: {
                    "href": "#"
                }
            });
            widgetDetailIcon2.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17"
                                                        viewBox="0 0 24 24">
                                                        <g fill="none" fill-rule="evenodd">
                                                            <g>
                                                                <g>
                                                                    <g
                                                                        transform="translate(-509 -477) translate(413 468) translate(96 9)">
                                                                        <circle cx="5" cy="12" r="3" fill="#A3244C" />
                                                                        <circle cx="12" cy="12" r="3" fill="#C92659" />
                                                                        <circle cx="19" cy="12" r="3" fill="#F02867" />
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </svg>`;
            widgetMatchResultDetail.append(widgetDetailIcon2);
        }
        let widgetMatchResultTeams = createAppendElement("a", {
            className: "widget-match-result-teams d-flex justify-content-center w-75",
            attributes: {
                "href": "#"
            }
        });
        createAppendElement("span", {
            className: "widget-match-host text-end",
            textContent: match.host,
            appendTo: widgetMatchResultTeams
        });
        let widgetMatchGoals = createAppendElement("div", {
            className: "widget-match-goals d-flex justify-content-around"
        });
        let widgetMatchGoalsHost = createAppendElement("span", {
            className: "host"
        });
        widgetMatchGoalsHost.innerHTML = match.hostScore || "";
        widgetMatchGoals.append(widgetMatchGoalsHost);
        createAppendElement("span", {
            textContent: "-",
            appendTo: widgetMatchGoals
        });
        let widgetMatchGoalsGuest = createAppendElement("span", {
            className: "guest"
        });
        widgetMatchGoalsGuest.innerHTML = match.guestScore || "";
        widgetMatchGoals.append(widgetMatchGoalsGuest);
        widgetMatchResultTeams.append(widgetMatchGoals);
        createAppendElement("span", {
            className: "widget-match-guest",
            textContent: match.guest,
            appendTo: widgetMatchResultTeams
        });
        widgetMatchResult.append(widgetMatchResultTeams);
        let widgetMatchResultTime = createAppendElement("div", {
            className: "widget-match-result-time d-flex justify-content-end"
        });
        if (match.hasOwnProperty("time")) {
            createAppendElement("span", {
                className: "match-time",
                textContent: match.time,
                appendTo: widgetMatchResultTime
            });
            createAppendElement("span", {
                className: "match-status",
                appendTo: widgetMatchResultTime
            });
        } else if (match.play === true) {
            let widgetPlayIcon = createAppendElement("a", {
                attributes: {
                    "href": "#"
                }
            });
            widgetPlayIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24">
                                                <g fill="none" fill-rule="evenodd">
                                                    <g fill="#0097a7">
                                                        <g>
                                                            <g>
                                                                <path d="M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9zM9.75 7.5v8.438l6.75-4.22L9.75 7.5z" transform="translate(-469 -311) translate(413 302) translate(56 9)"/>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>`;
            widgetMatchResultTime.append(widgetPlayIcon);
        }
        widgetMatchResult.append(widgetMatchResultTime);
        widgetSchedule.append(widgetMatchResult);
        stageDataElement.append(widgetSubtitle);
        stageDataElement.append(widgetSchedule);
        matchCounter++;
    }
    if (stageData.hasOwnProperty("table")) {
        let stageDataTable = stageData.table;
        let widgetTableTitle = createAppendElement("div", {
            className: "widget-subtitle text-center text-white bg-dark-blue"
        });
        createAppendElement("h3", {
            textContent: stageDataTable.tableTitle,
            appendTo: widgetTableTitle
        });
        stageDataElement.append(widgetTableTitle);
        let widgetTable = createAppendElement("table", {
            className: "groupA-table w-100 text-center"
        });
        let widgetTableThead = document.createElement("thead");
        let widgetTableTheadTr = createAppendElement("tr", {
            className: "bg-dark-gray"
        });
        for (let j = 0; j < stageDataTable.th.length; j++) {
            createAppendElement("th", {
                className: "fw-normal text-white",
                attributes: {
                    "scope": "col"
                },
                textContent: `${stageDataTable.th[j]}`,
                appendTo: widgetTableTheadTr
            });
        }
        let widgetTableTbody = document.createElement("tbody");
        for (let k = 0; k < stageDataTable.tr.length; k++) {
            let td = stageDataTable.tr[k];
            let widgetTableTbodyTr = createAppendElement("tr", {
                className: "fw-medium text-black"
            });
            createAppendElement("td", {
                textContent: `${td.rank}`,
                appendTo: widgetTableTbodyTr
            });
            let widgetTableTbodyTeam = document.createElement("td");
            createAppendElement("a", {
                className: "fw-semibold text-black",
                attributes: {
                    "href": '#'
                },
                textContent: `${td.team}`,
                appendTo: widgetTableTbodyTeam
            });
            widgetTableTbodyTr.append(widgetTableTbodyTeam);
            createAppendElement("td", {
                className: "table-game fw-normal",
                textContent: `${td.game}`,
                appendTo: widgetTableTbodyTr
            });
            createAppendElement("td", {
                textContent: `${td.score}`,
                appendTo: widgetTableTbodyTr
            });
            widgetTableTbody.append(widgetTableTbodyTr);
        }
        widgetTableThead.append(widgetTableTheadTr);
        widgetTable.append(widgetTableThead);
        widgetTable.append(widgetTableTbody);
        stageDataElement.append(widgetTable);
    }
    document.querySelector(".widget-footer-copa-america a").textContent = `${stageData.footer}`;
}

loadCopaAmericaData();

// show latest news all widget

let latestNewsAllwidget;
const widgetLatestNewsAllTabContent = document.querySelector(".widget-latest-news-all-tab-content");

function loadLatestNewsAllData() {
    fetch("js/data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then(data => {
            const widgetBody = document.querySelector(".widget-latest-news-all-body");
            latestNewsAllwidget = data.latestNewsAll;
            for (key in latestNewsAllwidget) {
                let tab = latestNewsAllwidget[key];
                let activeClass = key === "newestTab" ? "show active" : "";
                let tabId = tab.id;
                let widgetLatestNewsAllTabPane = createAppendElement("div", {
                    className: `widget-latest-news-all-tab-pane fade ${activeClass} w-100 overflow-y-scroll`,
                    id: `${tabId}`,
                    attributes: {
                        "role": "tabpanel",
                        "aria-labelledby": `${tabId}-tab`
                    }
                });
                if (key === "newestTab") {
                    let selectElement = createAppendElement("select", {
                        id: "latest-news-all-select",
                        className: "widget-select-options fs-6 fw-bold py-2 px-1 rounded-1 bg-white",
                        appendTo: widgetLatestNewsAllTabPane,
                        attributes: {
                            "onchange": "changeAllSportsData(this.value)"
                        }
                    });
                    createAppendElement("option", {
                        attributes: {
                            "value": "allSports",
                            "selected": "true"
                        },
                        textContent: "همه ورزش‌ها",
                        appendTo: selectElement
                    });
                    let optgroup1 = createAppendElement("optgroup", {
                        attributes: {
                            "label": "پرطرفدارها"
                        },
                        appendTo: selectElement
                    });
                    const stages1 = [
                        { value: "volleyball", text: "والیبال" },
                        { value: "basketball", text: "بسکتبال" },
                        { value: "wrestling", text: "کشتی" },
                        { value: "handball", text: "هندبال" },
                        { value: "tennis", text: "تنیس" }
                    ];
                    stages1.forEach(stage => {
                        let option = createAppendElement("option", {
                            attributes: {
                                "value": `${stage.value}`,
                            },
                            textContent: stage.text,
                            appendTo: optgroup1
                        });
                        if (stage.selected) {
                            option.selected = true;
                        }
                    });
                    let optgroup2 = createAppendElement("optgroup", {
                        attributes: {
                            "label": "سایر"
                        },
                        appendTo: selectElement
                    });
                    const stages2 = [
                        { value: "carRacing", text: "اتومبیل رانی" },
                        { value: "squash", text: "اسکواش" },
                        { value: "skiing", text: "اسکی" },
                        { value: "skate", text: "اسکیت" },
                        { value: "badminton", text: "بدمینتون" },
                        { value: "bodyBuilding", text: "بدن‌سازی" },
                        { value: "wheelchairBasketball", text: "بسکتبال با ویلچر" },
                        { value: "boxing", text: "بوکس" },
                        { value: "bowling", text: "بولینگ" },
                        { value: "baseball", text: "بیسبال" },
                        { value: "billiard", text: "بیلیارد" },
                        { value: "taekwondo", text: "تکواندو" },
                        { value: "pingpong", text: "تنیس روی میز" },
                        { value: "shooting", text: "تیراندازی" },
                        { value: "archery", text: "تیراندازی با کمان" },
                        { value: "jujutsu", text: "جوجیتسو" },
                        { value: "judo", text: "جودو" },
                        { value: "athletics", text: "دو و میدانی" },
                        { value: "cycle", text: "دوچرخه سواری" },
                        { value: "gymnastics", text: "ژیمناستیک" },
                    ];
                    stages2.forEach(stage => {
                        let option = createAppendElement("option", {
                            attributes: {
                                "value": `${stage.value}`,
                            },
                            textContent: stage.text,
                            appendTo: optgroup2
                        });
                        if (stage.selected) {
                            option.selected = true;
                        }
                    });
                }
                let newsUl = createAppendElement("ul", {
                    className: "list-unstyled"
                });
                for (let i = 0; i < tab.tabContent.length; i++) {
                    let tabContent = tab.tabContent[i];
                    let newsLi = createAppendElement("li");
                    let newsA = createAppendElement("a", {
                        attributes: {
                            "href": "#"
                        }
                    });
                    if (tabContent.newsType === "news") {
                        createAppendElement("span", {
                            className: "news-type",
                            styles: {
                                "backgroundImage": "url('../images/news-type-news.svg')"
                            },
                            appendTo: newsA
                        });
                    } else {
                        createAppendElement("span", {
                            className: "news-type",
                            styles: {
                                "backgroundImage": "url('../images/news-type-video.svg')"
                            },
                            appendTo: newsA
                        });
                    }
                    createAppendElement("span", {
                        textContent: `${tabContent.text}`,
                        appendTo: newsA
                    });
                    newsLi.append(newsA);
                    newsUl.append(newsLi);
                }
                widgetLatestNewsAllTabPane.append(newsUl);
                widgetLatestNewsAllTabContent.append(widgetLatestNewsAllTabPane);
                widgetBody.append(widgetLatestNewsAllTabContent);
            }
        })
        .catch(function (error) {
            console.log("error: ", error);
        });
}

function filterDataBySport(selectValue, latestNewsAllwidget) {
    document.querySelectorAll(".widget-latest-news-all-tab-pane ul")[0].innerHTML = "";
    for (let tabKey in latestNewsAllwidget) {
        let filteredData = latestNewsAllwidget[tabKey].tabContent.filter(item => {
            if (selectValue === item.sport) {
                return item;
            } else if (selectValue === "allSports") {
                return item;
            }
        });
        populateTabsWithFilteredData(filteredData);
    }
}

function populateTabsWithFilteredData(filteredData) {
    for (let i = 0; i < filteredData.length; i++) {
        let tabContent = filteredData[i];
        let newsLi = createAppendElement("li");
        let newsA = createAppendElement("a", {
            attributes: {
                "href": "#"
            }
        });
        if (tabContent.newsType === "news") {
            createAppendElement("span", {
                className: "news-type",
                styles: {
                    "backgroundImage": "url('../images/news-type-news.svg')"
                },
                appendTo: newsA
            });
        } else {
            createAppendElement("span", {
                className: "news-type",
                styles: {
                    "backgroundImage": "url('../images/news-type-video.svg')"
                },
                appendTo: newsA
            });
        }
        createAppendElement("span", {
            textContent: `${tabContent.text}`,
            appendTo: newsA
        });
        newsLi.append(newsA);
        let newsUl = document.querySelector(".widget-latest-news-all-tab-pane ul");
        newsUl.append(newsLi);
        let widgetLatestNewsAllTabPane = document.querySelector(".widget-latest-news-all-tab-pane");
        widgetLatestNewsAllTabPane.append(newsUl);
    }
}

function changeAllSportsData(selectValue) {
    filterDataBySport(selectValue, latestNewsAllwidget);
}

loadLatestNewsAllData();

// show iran leagues

function loadiranLeaguesData() {
    fetch("js/data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then(data => {
            iranLeagues = data.iranLeagues;
            changeStageIranLeagues();
        })
        .catch(function (error) {
            console.log("error: ", error);
        });
}

function changeStageIranLeagues() {
    const selectElement = document.getElementById("iran-leagues-select");
    const selectedStage = selectElement.value;
    const stageDataElement = document.querySelector(".widget-body-iran-leagues");
    while (stageDataElement.firstChild) {
        stageDataElement.removeChild(stageDataElement.firstChild);
    }
    let stageData = iranLeagues[selectedStage];
    let widgetTitle = createAppendElement("div", {
        className: "widget-subtitle text-center text-white bg-light-orange"
    });
    createAppendElement("h3", {
        textContent: `${stageData.title}`,
        appendTo: widgetTitle
    });
    stageDataElement.append(widgetTitle);
    let widgetTable = createAppendElement("table", {
        className: "group-table w-100 text-center"
    });
    let widgetTableThead = document.createElement("thead");
    let widgetTableTheadTr = createAppendElement("tr", {
        className: "bg-dark-gray"
    });
    for (let i = 0; i < stageData.th.length; i++) {
        createAppendElement("th", {
            className: "fw-normal text-white",
            attributes: {
                "scope": "col"
            },
            textContent: `${stageData.th[i]}`,
            appendTo: widgetTableTheadTr
        });
    }
    let widgetTableTbody = document.createElement("tbody");
    for (let j = 0; j < stageData.tr.length; j++) {
        let td = stageData.tr[j];
        let widgetTableTbodyTr = createAppendElement("tr", {
            className: "fw-medium text-black"
        });
        createAppendElement("td", {
            textContent: `${j + 1}`,
            appendTo: widgetTableTbodyTr
        });
        let widgetTableTbodyTeam = document.createElement("td");
        createAppendElement("a", {
            className: "fw-semibold text-black",
            attributes: {
                "href": '#'
            },
            textContent: `${td.team}`,
            appendTo: widgetTableTbodyTeam
        });
        widgetTableTbodyTr.append(widgetTableTbodyTeam);
        createAppendElement("td", {
            className: "table-game fw-normal",
            textContent: `${td.game}`,
            appendTo: widgetTableTbodyTr
        });
        createAppendElement("td", {
            textContent: `${td.score}`,
            appendTo: widgetTableTbodyTr
        });
        widgetTableTbody.append(widgetTableTbodyTr);
    }
    widgetTableThead.append(widgetTableTheadTr);
    widgetTable.append(widgetTableThead);
    widgetTable.append(widgetTableTbody);
    stageDataElement.append(widgetTable);
    document.querySelector(".widget-footer-iran-leagues a").textContent = `جدول کامل ${stageData.title}`;
}

loadiranLeaguesData();

// show broadcasting table

let broadcast;

function loadBroadcastData() {
    fetch("js/data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then(data => {
            broadcast = data.broadcast;
            let broadcastBody = document.querySelector(".broadcast-table-holder");
            let antenChk = document.getElementById("anten-conductor");
            let tvChk = document.getElementById("tv-conductor");
            antenChk.addEventListener("change", updateBroadcastContent);
            tvChk.addEventListener("change", updateBroadcastContent);
            let matchCounter = 1;
            function updateBroadcastContent() {
                broadcastBody.innerHTML = "";
                if (antenChk.checked && tvChk.checked) {
                    for (let i = 0; i < broadcast.matches.length; i++) {
                        let match = broadcast.matches[i];
                        if (match.hasOwnProperty("separator")) {
                            let widgetDateSeparator = createAppendElement("div", {
                                className: "widget-date-separator text-center text-white bg-dark-gray"
                            });
                            createAppendElement("h4", {
                                textContent: match.separator,
                                appendTo: widgetDateSeparator
                            });
                            broadcastBody.append(widgetDateSeparator);
                            matchCounter = 1;
                        }
                        let widgetBroadcastMatch = createAppendElement("div", {
                            className: "broadcast-match d-flex align-items-center"
                        });
                        if (matchCounter % 2 === 0) {
                            widgetBroadcastMatch.className += " even";
                        }
                        createAppendElement("div", {
                            className: "broadcast-match-time fw-medium",
                            textContent: `${match.time}`,
                            appendTo: widgetBroadcastMatch
                        });
                        let widgetBroadCastMatchTeams = createAppendElement("div", {
                            className: "broadcast-match-teams text-center"
                        });
                        createAppendElement("div", {
                            className: "broadcast-match-host d-inline",
                            textContent: match.host,
                            appendTo: widgetBroadCastMatchTeams
                        });
                        createAppendElement("div", {
                            className: "broadcast-match-separator d-inline",
                            textContent: " - ",
                            appendTo: widgetBroadCastMatchTeams
                        });
                        createAppendElement("div", {
                            className: "broadcast-match-guest d-inline",
                            textContent: match.guest,
                            appendTo: widgetBroadCastMatchTeams
                        });
                        createAppendElement("div", {
                            className: "broadcast-match-info w-100",
                            textContent: `${match.info}`,
                            appendTo: widgetBroadCastMatchTeams
                        });
                        widgetBroadcastMatch.append(widgetBroadCastMatchTeams);
                        let widgetBroadcastTv = createAppendElement("div", {
                            className: "broadcast-match-tvs fw-medium text-center"
                        });
                        createAppendElement("a", {
                            attributes: {
                                "href": "#",
                                "style": `${match.tv}` == "آنتن" ? "color: #F02867 !important" : ""
                            },
                            textContent: `${match.tv}`,
                            appendTo: widgetBroadcastTv
                        });
                        widgetBroadcastMatch.append(widgetBroadcastTv);
                        broadcastBody.append(widgetBroadcastMatch);
                        matchCounter++;
                    }
                    document.querySelector(".conductor-alert-message").style.display = "none";
                } else if (antenChk.checked) {
                    for (let i = 0; i < broadcast.matches.length; i++) {
                        let match = broadcast.matches[i];
                        if (match.tv === "آنتن") {
                            if (match.hasOwnProperty("separator")) {
                                let widgetDateSeparator = createAppendElement("div", {
                                    className: "widget-date-separator text-center text-white bg-dark-gray"
                                });
                                createAppendElement("h4", {
                                    textContent: match.separator,
                                    appendTo: widgetDateSeparator
                                });
                                broadcastBody.append(widgetDateSeparator);
                                matchCounter = 1;
                            }
                            let widgetBroadcastMatch = createAppendElement("div", {
                                className: "broadcast-match d-flex align-items-center"
                            });
                            if (matchCounter % 2 === 0) {
                                widgetBroadcastMatch.className += " even";
                            }
                            createAppendElement("div", {
                                className: "broadcast-match-time fw-medium",
                                textContent: `${match.time}`,
                                appendTo: widgetBroadcastMatch
                            });
                            let widgetBroadCastMatchTeams = createAppendElement("div", {
                                className: "broadcast-match-teams text-center"
                            });
                            createAppendElement("div", {
                                className: "broadcast-match-host d-inline",
                                textContent: match.host,
                                appendTo: widgetBroadCastMatchTeams
                            });
                            createAppendElement("div", {
                                className: "broadcast-match-separator d-inline",
                                textContent: " - ",
                                appendTo: widgetBroadCastMatchTeams
                            });
                            createAppendElement("div", {
                                className: "broadcast-match-guest d-inline",
                                textContent: match.guest,
                                appendTo: widgetBroadCastMatchTeams
                            });
                            createAppendElement("div", {
                                className: "broadcast-match-info w-100",
                                textContent: `${match.info}`,
                                appendTo: widgetBroadCastMatchTeams
                            });
                            widgetBroadcastMatch.append(widgetBroadCastMatchTeams);
                            let widgetBroadcastTv = createAppendElement("div", {
                                className: "broadcast-match-tvs fw-medium text-center"
                            });
                            createAppendElement("a", {
                                attributes: {
                                    "href": "#",
                                    "style": "color: #F02867 !important"
                                },
                                textContent: `${match.tv}`,
                                appendTo: widgetBroadcastTv
                            });
                            widgetBroadcastMatch.append(widgetBroadcastTv);
                            broadcastBody.append(widgetBroadcastMatch);
                            matchCounter++;
                        }
                    }
                    document.querySelector(".conductor-alert-message").style.display = "none";
                } else if (tvChk.checked) {
                    for (let i = 0; i < broadcast.matches.length; i++) {
                        let match = broadcast.matches[i];
                        if (match.tv === "تلویزیون") {
                            if (match.hasOwnProperty("separator")) {
                                let widgetDateSeparator = createAppendElement("div", {
                                    className: "widget-date-separator text-center text-white bg-dark-gray"
                                });
                                createAppendElement("h4", {
                                    textContent: match.separator,
                                    appendTo: widgetDateSeparator
                                });
                                broadcastBody.append(widgetDateSeparator);
                                matchCounter = 1;
                            }
                            let widgetBroadcastMatch = createAppendElement("div", {
                                className: "broadcast-match d-flex align-items-center"
                            });
                            if (matchCounter % 2 === 0) {
                                widgetBroadcastMatch.className += " even";
                            }
                            createAppendElement("div", {
                                className: "broadcast-match-time fw-medium",
                                textContent: `${match.time}`,
                                appendTo: widgetBroadcastMatch
                            });
                            let widgetBroadCastMatchTeams = createAppendElement("div", {
                                className: "broadcast-match-teams text-center"
                            });
                            createAppendElement("div", {
                                className: "broadcast-match-host d-inline",
                                textContent: match.host,
                                appendTo: widgetBroadCastMatchTeams
                            });
                            createAppendElement("div", {
                                className: "broadcast-match-separator d-inline",
                                textContent: " - ",
                                appendTo: widgetBroadCastMatchTeams
                            });
                            createAppendElement("div", {
                                className: "broadcast-match-guest d-inline",
                                textContent: match.guest,
                                appendTo: widgetBroadCastMatchTeams
                            });
                            createAppendElement("div", {
                                className: "broadcast-match-info w-100",
                                textContent: `${match.info}`,
                                appendTo: widgetBroadCastMatchTeams
                            });
                            widgetBroadcastMatch.append(widgetBroadCastMatchTeams);
                            let widgetBroadcastTv = createAppendElement("div", {
                                className: "broadcast-match-tvs fw-medium text-center"
                            });
                            createAppendElement("a", {
                                attributes: {
                                    "href": "#"
                                },
                                textContent: `${match.tv}`,
                                appendTo: widgetBroadcastTv
                            });
                            widgetBroadcastMatch.append(widgetBroadcastTv);
                            broadcastBody.append(widgetBroadcastMatch);
                            matchCounter++;
                        }
                    }
                    document.querySelector(".conductor-alert-message").style.display = "none";
                } else {
                    document.querySelector(".conductor-alert-message").style.display = "block";
                    setTimeout(() => {
                        document.querySelector(".conductor-alert-message").style.display = "none";
                    }, 5000);
                }
            }
            updateBroadcastContent();
        })
        .catch(function (error) {
            console.log("error: ", error);
        });
}

loadBroadcastData();

// show videos widget

let firstVideoWidget;

function loadFirstVideoWidgetData() {
    fetch("js/data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then(data => {
            const widgetBody = document.querySelector(".widget-body-video");
            firstVideoWidget = data.videoWidgets.firstVideoWidget;
            let widgetVideoTabContent = document.querySelector(".widget-video-tab-content");
            for (key in firstVideoWidget) {
                let tab = firstVideoWidget[key];
                let activeClass = key == "newestTab" ? "show active" : "";
                let tabId = tab.id;
                let widgetVideoTabPane = createAppendElement("div", {
                    className: `widget-video-tab-pane fade ${activeClass} w-100`,
                    id: `${tabId}`,
                    attributes: {
                        "role": "tabpanel",
                        "aria-labelledby": `${tabId}-tab`
                    }
                });
                for (let i = 0; i < tab.tabContent.length; i++) {
                    let tabContent = tab.tabContent[i];
                    let videobox = createAppendElement("div", {
                        className: "videobox row w-100 m-0"
                    });
                    let videoboxCover = createAppendElement("a", {
                        className: "col-5 videobox-cover d-inline-block position-relative",
                        attributes: {
                            "href": "#"
                        }
                    });
                    let coverImgName = tabContent.coverImg.split(".")[0];
                    createAppendElement("img", {
                        className: "w-100 h-100",
                        attributes: {
                            "src": `${tabContent.coverImg}`,
                            "alt": `${coverImgName}`
                        },
                        appendTo: videoboxCover
                    });
                    if (tabContent.hasOwnProperty("duration")) {
                        let timebox = createAppendElement("div", {
                            className: "timebox position-absolute"
                        });
                        if (tabContent.duration !== "زنده") {
                            let playIcon = createAppendElement("span", {
                                className: "play-icon d-inline-block bg-main-cyan",
                            });
                            playIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="7"
                                            height="10" viewBox="0 0 11 13">
                                            <path fill="#FFF" fill-rule="evenodd"
                                                d="M0 0v13l11-6.484z">
                                        </svg>`;
                            timebox.append(playIcon);
                            createAppendElement("span", {
                                className: "duration text-white",
                                textContent: `${tabContent.duration}`,
                                appendTo: timebox
                            });
                        }
                        if (tabContent.duration === "زنده") {
                            let playIcon = createAppendElement("span", {
                                className: "play-icon d-inline-block",
                            });
                            createAppendElement("img", {
                                attributes: {
                                    "src": "images/live-icon-64.gif",
                                    "alt": "پخش زنده",
                                    "width": "12",
                                    "height": "12"
                                },
                                appendTo: playIcon
                            });
                            timebox.append(playIcon);
                            createAppendElement("span", {
                                className: "duration text-white",
                                textContent: `${tabContent.duration}`,
                                appendTo: timebox
                            });
                        }
                        videoboxCover.append(timebox);
                    }
                    videobox.append(videoboxCover);
                    let videoText = createAppendElement("div", {
                        className: "col-7 video-text"
                    });
                    let videoData = createAppendElement("div", {
                        className: "video-data d-inline-block"
                    });
                    createAppendElement("span", {
                        className: "date text-light-gray",
                        textContent: `${tabContent.date}`,
                        appendTo: videoData
                    });
                    if (tabContent.hasOwnProperty("view")) {
                        createAppendElement("span", {
                            className: "view text-light-gray",
                            textContent: `${tabContent.view}`,
                            appendTo: videoData
                        });
                    }
                    videoText.append(videoData);
                    let videoTitle = createAppendElement("a", {
                        className: "video-title",
                        attributes: {
                            "href": "#"
                        }
                    });
                    createAppendElement("h3", {
                        textContent: `${tabContent.title}`,
                        appendTo: videoTitle
                    });
                    videoText.append(videoTitle);
                    videobox.append(videoText);
                    widgetVideoTabPane.append(videobox);
                    widgetVideoTabContent.append(widgetVideoTabPane);
                }
                widgetBody.append(widgetVideoTabContent);
            }
        })
        .catch(function (error) {
            console.log("error: ", error);
        });
}

loadFirstVideoWidgetData();

// show newspaper

const newspaperCarousel = document.querySelector(".newspaper-carousel-inner");

function loadNewspaperData() {
    fetch("js/data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then(data => {
            let newspaper = data.newspaper;
            for (let i = 0; i < newspaper.length; i++) {
                let item = newspaper[i];
                let activeClass = i == 1 ? "active" : "";
                let carouselItem = createAppendElement("div", {
                    className: `carousel-item ${activeClass}`
                });
                let carouselItemA = createAppendElement("a", {
                    attributes: {
                        "href": "#"
                    }
                });
                let carouselImgWrapper = createAppendElement("div", {
                    className: "carousel-img-wrapper"
                });
                let imgName = item.img.split(".")[0];
                createAppendElement("img", {
                    className: "d-block w-100 m-auto",
                    attributes: {
                        "src": `${item.img}`,
                        "alt": `${imgName}`
                    },
                    appendTo: carouselImgWrapper
                });
                carouselItem.append(carouselImgWrapper);
                createAppendElement("p", {
                    className: "fs-6 fw-semibold m-0 text-center",
                    textContent: `${item.text}`,
                    appendTo: carouselItemA
                });
                carouselItem.append(carouselItemA);
                newspaperCarousel.append(carouselItem);
            }
        })
        .catch(function () {
            console.log("error");
        });
}

loadNewspaperData();

// show top players

let topPlayers;

function loadTopPlayersData() {
    fetch("js/data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then(data => {
            topPlayers = data.topPlayers;
            changeStageTopPlayers();
        })
        .catch(function (error) {
            console.log("error: ", error);
        });
}

function changeStageTopPlayers() {
    const selectElement = document.getElementById("top-players-select");
    const selectedStage = selectElement.value;
    const stageDataElement = document.querySelector(".widget-top-players-tab-content");
    while (stageDataElement.firstChild) {
        stageDataElement.removeChild(stageDataElement.firstChild);
    }
    let stageData = topPlayers[selectedStage];

    for (let key in stageData) {
        let item = stageData[key];
        let activeClass = key === "scorers" ? "show active" : "";
        let widgetTopPlayersScorersTabPane = createAppendElement("div", {
            className: `${item.id}-tab-pane fade ${activeClass}`,
            id: `${item.id}`,
            attributes: {
                "role": "tabpanel",
                "aria-labelledby": `${item.id}-tab`
            }
        });
        let topPlayersTable = createAppendElement("table", {
            className: "top-players-table w-100"
        });
        let topPlayersTableTbody = document.createElement("tbody");

        let groupedPlayers = Object.entries(
            item.tabContent.reduce((groups, player) => {
                (groups[player.num] = groups[player.num] || []).push(player);
                return groups;
            }, {})
        ).reverse();

        groupedPlayers.forEach(([num, group]) => {
            let topPlayersTableTr = document.createElement("tr");
            let topPlayersTableTd1 = document.createElement("td");

            group.forEach(player => {
                let topPlayersTableplayer = createAppendElement("div", {
                    className: "player"
                });
                let topPlayerFigure = createAppendElement("figure", {
                    className: "d-inline-block m-0"
                });
                let imgName = player.img.split(".")[0];
                createAppendElement("img", {
                    className: "rounded-circle",
                    attributes: {
                        "src": `images/${player.img}`,
                        "alt": `${imgName}`
                    },
                    appendTo: topPlayerFigure
                });
                topPlayersTableplayer.append(topPlayerFigure);
                let topPlayerName = createAppendElement("span", {
                    className: "player-name fw-semibold text-black"
                });
                createAppendElement("a", {
                    attributes: {
                        "href": "#"
                    },
                    textContent: `${player.name} - `,
                    appendTo: topPlayerName
                });
                topPlayersTableplayer.append(topPlayerName);
                createAppendElement("span", {
                    className: "fw-medium",
                    textContent: `${player.team}`,
                    appendTo: topPlayersTableplayer
                });

                topPlayersTableTd1.append(topPlayersTableplayer);
            });
            topPlayersTableTr.append(topPlayersTableTd1);
            createAppendElement("td", {
                className: "fs-6 fw-medium pe-3 text-end",
                textContent: `${num}`,
                appendTo: topPlayersTableTr
            });
            topPlayersTableTbody.append(topPlayersTableTr);
        });
        topPlayersTable.append(topPlayersTableTbody);
        widgetTopPlayersScorersTabPane.append(topPlayersTable);
        stageDataElement.append(widgetTopPlayersScorersTabPane);
    }
}


loadTopPlayersData();

//show asia championship widget

let asiaChampionship;

function loadAsiaChampionshipData() {
    fetch("js/data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then(data => {
            asiaChampionship = data.asiaChampionship;
            changeStageAsiaChampionship();
        })
        .catch(function (error) {
            console.log("error: ", error);
        });
}

function changeStageAsiaChampionship() {
    const selectElement = document.getElementById("asia-championship-select");
    const selectedStage = selectElement.value;
    const stageDataElement = document.querySelector(".widget-body-asia-championship");
    while (stageDataElement.firstChild) {
        stageDataElement.removeChild(stageDataElement.firstChild);
    }
    let stageData = asiaChampionship[selectedStage];
    let widgetSubtitle = createAppendElement("div", {
        className: "widget-subtitle text-center text-white bg-dark-red"
    });
    createAppendElement("h3", {
        textContent: `${stageData.subtitle}`,
        appendTo: widgetSubtitle
    });
    let widgetSchedule = createAppendElement("div", {
        className: "widget-schedule"
    });
    let matchCounter = 1;
    for (let i = 0; i < stageData.matches.length; i++) {
        let match = stageData.matches[i];
        if (match.hasOwnProperty("separator")) {
            let widgetDateSeparator = createAppendElement("div", {
                className: "widget-date-separator text-center text-white bg-dark-gray"
            });
            createAppendElement("h4", {
                textContent: match.separator,
                appendTo: widgetDateSeparator
            });
            widgetSchedule.append(widgetDateSeparator);
            matchCounter = 1;
        }
        let widgetMatchResult = createAppendElement("div", {
            className: "widget-match-result d-flex justify-content-between align-items-center"
        });
        if (matchCounter % 2 === 0) {
            widgetMatchResult.className += " even";
        }
        let widgetMatchResultDetail = createAppendElement("div", {
            className: "widget-match-result-detail d-flex justify-content-between",
            appendTo: widgetMatchResult
        });
        let widgetDetailIcon1 = createAppendElement("a", {
            attributes: {
                "href": "#"
            }
        });
        widgetDetailIcon1.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17"
                                                        viewBox="0 0 24 24">
                                                        <g fill="none" fill-rule="evenodd">
                                                            <g fill="#90a4ae ">
                                                                <g>
                                                                    <g>
                                                                        <path
                                                                            d="M11.1 7.5h1.8v1.8h-1.8V7.5zm0 3.6h1.8v5.4h-1.8v-5.4zM12 3c-4.968 0-9 4.032-9 9s4.032 9 9 9 9-4.032 9-9-4.032-9-9-9zm0 16.2c-3.969 0-7.2-3.231-7.2-7.2 0-3.969 3.231-7.2 7.2-7.2 3.969 0 7.2 3.231 7.2 7.2 0 3.969-3.231 7.2-7.2 7.2z"
                                                                            transform="translate(-469 -364) translate(413 355) translate(56 9)" />
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </svg>`;
        widgetMatchResultDetail.append(widgetDetailIcon1);
        if (match.detail === false) {
            let widgetDetailIcon2 = createAppendElement("a", {
                attributes: {
                    "href": "#"
                }
            });
            widgetDetailIcon2.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17"
                                                        viewBox="0 0 24 24">
                                                        <g fill="none" fill-rule="evenodd">
                                                            <g>
                                                                <g>
                                                                    <g
                                                                        transform="translate(-509 -477) translate(413 468) translate(96 9)">
                                                                        <circle cx="5" cy="12" r="3" fill="#A3244C" />
                                                                        <circle cx="12" cy="12" r="3" fill="#C92659" />
                                                                        <circle cx="19" cy="12" r="3" fill="#F02867" />
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </svg>`;
            widgetMatchResultDetail.append(widgetDetailIcon2);
        }
        let widgetMatchResultTeams = createAppendElement("a", {
            className: "widget-match-result-teams d-flex justify-content-center w-75",
            attributes: {
                "href": "#"
            }
        });
        createAppendElement("span", {
            className: "widget-match-host text-end",
            textContent: match.host,
            appendTo: widgetMatchResultTeams
        });
        let widgetMatchGoals = createAppendElement("div", {
            className: "widget-match-goals d-flex justify-content-around"
        });
        let widgetMatchGoalsHost = createAppendElement("span", {
            className: "host"
        });
        widgetMatchGoalsHost.innerHTML = match.hostScore || "";
        widgetMatchGoals.append(widgetMatchGoalsHost);
        createAppendElement("span", {
            textContent: "-",
            appendTo: widgetMatchGoals
        });
        let widgetMatchGoalsGuest = createAppendElement("span", {
            className: "guest"
        });
        widgetMatchGoalsGuest.innerHTML = match.guestScore || "";
        widgetMatchGoals.append(widgetMatchGoalsGuest);
        widgetMatchResultTeams.append(widgetMatchGoals);
        createAppendElement("span", {
            className: "widget-match-guest",
            textContent: match.guest,
            appendTo: widgetMatchResultTeams
        });
        widgetMatchResult.append(widgetMatchResultTeams);
        let widgetMatchResultTime = createAppendElement("div", {
            className: "widget-match-result-time d-flex justify-content-end"
        });
        if (match.hasOwnProperty("time")) {
            createAppendElement("span", {
                className: "match-time",
                textContent: match.time,
                appendTo: widgetMatchResultTime
            });
            createAppendElement("span", {
                className: "match-status",
                appendTo: widgetMatchResultTime
            });
        } else if (match.play === true) {
            let widgetPlayIcon = createAppendElement("a", {
                attributes: {
                    "href": "#"
                }
            });
            widgetPlayIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24">
                                                <g fill="none" fill-rule="evenodd">
                                                    <g fill="#0097a7">
                                                        <g>
                                                            <g>
                                                                <path d="M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9zM9.75 7.5v8.438l6.75-4.22L9.75 7.5z" transform="translate(-469 -311) translate(413 302) translate(56 9)"/>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>`;
            widgetMatchResultTime.append(widgetPlayIcon);
        }
        widgetMatchResult.append(widgetMatchResultTime);
        widgetSchedule.append(widgetMatchResult);
        stageDataElement.append(widgetSubtitle);
        stageDataElement.append(widgetSchedule);
        matchCounter++;
    }
    if (stageData.hasOwnProperty("table")) {
        let stageDataTable = stageData.table;
        let widgetTableTitle = createAppendElement("div", {
            className: "widget-subtitle text-center text-white bg-dark-red"
        });
        createAppendElement("h3", {
            textContent: stageDataTable.tableTitle,
            appendTo: widgetTableTitle
        });
        stageDataElement.append(widgetTableTitle);
        let widgetTable = createAppendElement("table", {
            className: "group-table w-100 text-center"
        });
        let widgetTableThead = document.createElement("thead");
        let widgetTableTheadTr = createAppendElement("tr", {
            className: "bg-dark-gray"
        });
        for (let j = 0; j < stageDataTable.th.length; j++) {
            createAppendElement("th", {
                className: "fw-normal text-white",
                attributes: {
                    "scope": "col"
                },
                textContent: `${stageDataTable.th[j]}`,
                appendTo: widgetTableTheadTr
            });
        }
        let widgetTableTbody = document.createElement("tbody");
        for (let k = 0; k < stageDataTable.tr.length; k++) {
            let td = stageDataTable.tr[k];
            let widgetTableTbodyTr = createAppendElement("tr", {
                className: "fw-medium text-black"
            });
            createAppendElement("td", {
                textContent: `${td.rank}`,
                appendTo: widgetTableTbodyTr
            });
            let widgetTableTbodyTeam = document.createElement("td");
            createAppendElement("a", {
                className: "fw-semibold text-black",
                attributes: {
                    "href": '#'
                },
                textContent: `${td.team}`,
                appendTo: widgetTableTbodyTeam
            });
            widgetTableTbodyTr.append(widgetTableTbodyTeam);
            createAppendElement("td", {
                className: "table-game fw-normal",
                textContent: `${td.game}`,
                appendTo: widgetTableTbodyTr
            });
            createAppendElement("td", {
                textContent: `${td.score}`,
                appendTo: widgetTableTbodyTr
            });
            widgetTableTbody.append(widgetTableTbodyTr);
        }
        widgetTableThead.append(widgetTableTheadTr);
        widgetTable.append(widgetTableThead);
        widgetTable.append(widgetTableTbody);
        stageDataElement.append(widgetTable);
    }
    document.querySelector(".widget-footer-asia-championship a").textContent = `${stageData.footer}`;
}

loadAsiaChampionshipData();

// show olymics soccer widget

let parisOlympics;

function loadParisOlympicsData() {
    fetch("js/data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then(data => {
            parisOlympics = data.parisOlympics;
            changeStageParisOlympics();
        })
        .catch(function (error) {
            console.log("error: ", error);
        });
}

function changeStageParisOlympics() {
    const selectElement = document.getElementById("paris-olympics-select");
    const selectedStage = selectElement.value;
    const stageDataElement = document.querySelector(".widget-body-paris-olympics");
    while (stageDataElement.firstChild) {
        stageDataElement.removeChild(stageDataElement.firstChild);
    }
    let stageData = parisOlympics[selectedStage];
    let widgetSubtitle = createAppendElement("div", {
        className: "widget-subtitle text-center text-white",
        styles: {
            backgroundColor: "#64B5BF"
        }
    });
    createAppendElement("h3", {
        textContent: `${stageData.subtitle}`,
        appendTo: widgetSubtitle
    });
    let widgetSchedule = createAppendElement("div", {
        className: "widget-schedule"
    });
    let matchCounter = 1;
    for (let i = 0; i < stageData.matches.length; i++) {
        let match = stageData.matches[i];
        if (match.hasOwnProperty("separator")) {
            let widgetDateSeparator = createAppendElement("div", {
                className: "widget-date-separator text-center text-white bg-dark-gray"
            });
            createAppendElement("h4", {
                textContent: match.separator,
                appendTo: widgetDateSeparator
            });
            widgetSchedule.append(widgetDateSeparator);
            matchCounter = 1;
        }
        let widgetMatchResult = createAppendElement("div", {
            className: "widget-match-result d-flex justify-content-between align-items-center"
        });
        if (matchCounter % 2 === 0) {
            widgetMatchResult.className += " even";
        }
        let widgetMatchResultDetail = createAppendElement("div", {
            className: "widget-match-result-detail d-flex justify-content-between",
            appendTo: widgetMatchResult
        });
        let widgetDetailIcon1 = createAppendElement("a", {
            attributes: {
                "href": "#"
            }
        });
        widgetDetailIcon1.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17"
                                                        viewBox="0 0 24 24">
                                                        <g fill="none" fill-rule="evenodd">
                                                            <g fill="#90a4ae ">
                                                                <g>
                                                                    <g>
                                                                        <path
                                                                            d="M11.1 7.5h1.8v1.8h-1.8V7.5zm0 3.6h1.8v5.4h-1.8v-5.4zM12 3c-4.968 0-9 4.032-9 9s4.032 9 9 9 9-4.032 9-9-4.032-9-9-9zm0 16.2c-3.969 0-7.2-3.231-7.2-7.2 0-3.969 3.231-7.2 7.2-7.2 3.969 0 7.2 3.231 7.2 7.2 0 3.969-3.231 7.2-7.2 7.2z"
                                                                            transform="translate(-469 -364) translate(413 355) translate(56 9)" />
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </svg>`;
        widgetMatchResultDetail.append(widgetDetailIcon1);
        let widgetMatchResultTeams = createAppendElement("a", {
            className: "widget-match-result-teams d-flex justify-content-center w-75",
            attributes: {
                "href": "#"
            }
        });
        createAppendElement("span", {
            className: "widget-match-host text-end",
            textContent: match.host,
            appendTo: widgetMatchResultTeams
        });
        let widgetMatchGoals = createAppendElement("div", {
            className: "widget-match-goals d-flex justify-content-around"
        });
        let widgetMatchGoalsHost = createAppendElement("span", {
            className: "host"
        });
        widgetMatchGoalsHost.innerHTML = match.hostScore || "";
        widgetMatchGoals.append(widgetMatchGoalsHost);
        createAppendElement("span", {
            textContent: "-",
            appendTo: widgetMatchGoals
        });
        let widgetMatchGoalsGuest = createAppendElement("span", {
            className: "guest"
        });
        widgetMatchGoalsGuest.innerHTML = match.guestScore || "";
        widgetMatchGoals.append(widgetMatchGoalsGuest);
        widgetMatchResultTeams.append(widgetMatchGoals);
        createAppendElement("span", {
            className: "widget-match-guest",
            textContent: match.guest,
            appendTo: widgetMatchResultTeams
        });
        widgetMatchResult.append(widgetMatchResultTeams);
        let widgetMatchResultTime = createAppendElement("div", {
            className: "widget-match-result-time d-flex justify-content-end"
        });
        if (match.hasOwnProperty("time")) {
            createAppendElement("span", {
                className: "match-time",
                textContent: match.time,
                appendTo: widgetMatchResultTime
            });
            createAppendElement("span", {
                className: "match-status",
                appendTo: widgetMatchResultTime
            });
        } else if (match.play === true) {
            let widgetPlayIcon = createAppendElement("a", {
                attributes: {
                    "href": "#"
                }
            });
            widgetPlayIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24">
                                                <g fill="none" fill-rule="evenodd">
                                                    <g fill="#0097a7">
                                                        <g>
                                                            <g>
                                                                <path d="M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9zM9.75 7.5v8.438l6.75-4.22L9.75 7.5z" transform="translate(-469 -311) translate(413 302) translate(56 9)"/>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>`;
            widgetMatchResultTime.append(widgetPlayIcon);
        }
        widgetMatchResult.append(widgetMatchResultTime);
        widgetSchedule.append(widgetMatchResult);
        stageDataElement.append(widgetSubtitle);
        stageDataElement.append(widgetSchedule);
        matchCounter++;
    }
    if (stageData.hasOwnProperty("table")) {
        let stageDataTable = stageData.table;
        let widgetTableTitle = createAppendElement("div", {
            className: "widget-subtitle text-center text-white",
            styles: {
                backgroundColor: "#64B5BF"
            }
        });
        createAppendElement("h3", {
            textContent: stageDataTable.tableTitle,
            appendTo: widgetTableTitle
        });
        stageDataElement.append(widgetTableTitle);
        let widgetTable = createAppendElement("table", {
            className: "group-table w-100 text-center"
        });
        let widgetTableThead = document.createElement("thead");
        let widgetTableTheadTr = createAppendElement("tr", {
            className: "bg-dark-gray"
        });
        for (let j = 0; j < stageDataTable.th.length; j++) {
            createAppendElement("th", {
                className: "fw-normal text-white",
                attributes: {
                    "scope": "col"
                },
                textContent: `${stageDataTable.th[j]}`,
                appendTo: widgetTableTheadTr
            });
        }
        let widgetTableTbody = document.createElement("tbody");
        for (let k = 0; k < stageDataTable.tr.length; k++) {
            let td = stageDataTable.tr[k];
            let widgetTableTbodyTr = createAppendElement("tr", {
                className: "fw-medium text-black"
            });
            createAppendElement("td", {
                textContent: `${td.rank}`,
                appendTo: widgetTableTbodyTr
            });
            let widgetTableTbodyTeam = document.createElement("td");
            createAppendElement("a", {
                className: "fw-semibold text-black",
                attributes: {
                    "href": '#'
                },
                textContent: `${td.team}`,
                appendTo: widgetTableTbodyTeam
            });
            widgetTableTbodyTr.append(widgetTableTbodyTeam);
            createAppendElement("td", {
                className: "table-game fw-normal",
                textContent: `${td.game}`,
                appendTo: widgetTableTbodyTr
            });
            createAppendElement("td", {
                textContent: `${td.score}`,
                appendTo: widgetTableTbodyTr
            });
            widgetTableTbody.append(widgetTableTbodyTr);
        }
        widgetTableThead.append(widgetTableTheadTr);
        widgetTable.append(widgetTableThead);
        widgetTable.append(widgetTableTbody);
        stageDataElement.append(widgetTable);
    }
}

loadParisOlympicsData();

// show latest news football widget

let latestNewsFootballwidget;
const widgetlatestNewsFootballTabContent = document.querySelector(".widget-latest-news-football-tab-content");

function loadLatestNewsFootballData() {
    fetch("js/data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then(data => {
            const widgetBody = document.querySelector(".widget-latest-news-football-body");
            latestNewsFootballwidget = data.latestNewsFootball;

            let nationalChk = document.getElementById("national");
            let internationalChk = document.getElementById("international");
            let videoChk = document.getElementById("video");
            let olympicsChk = document.getElementById("olympics");
            nationalChk.addEventListener("change", updateLatestNewsContent);
            internationalChk.addEventListener("change", updateLatestNewsContent);
            videoChk.addEventListener("change", updateLatestNewsContent);
            olympicsChk.addEventListener("change", updateLatestNewsContent);
            function updateLatestNewsContent() {
                widgetlatestNewsFootballTabContent.innerHTML = "";
                if (nationalChk.checked && internationalChk.checked && videoChk.checked && olympicsChk.checked) {
                    for (key in latestNewsFootballwidget) {
                        let tab = latestNewsFootballwidget[key];
                        let activeClass = key === "newestTab" ? "show active" : "";
                        let tabId = tab.id;
                        let widgetlatestNewsFootballTabPane = createAppendElement("div", {
                            className: `widget-latest-news-all-tab-pane fade ${activeClass} w-100 overflow-y-scroll`,
                            id: `${tabId}`,
                            attributes: {
                                "role": "tabpanel",
                                "aria-labelledby": `${tabId}-tab`
                            }
                        });
                        let newsUl = createAppendElement("ul", {
                            className: "list-unstyled pt-0"
                        });
                        for (let i = 0; i < tab.tabContent.length; i++) {
                            let tabContent = tab.tabContent[i];
                            let newsLi = createAppendElement("li");
                            let newsA = createAppendElement("a", {
                                attributes: {
                                    "href": "#"
                                }
                            });
                            if (tabContent.newsType === "news") {
                                createAppendElement("span", {
                                    className: "news-type",
                                    styles: {
                                        "backgroundImage": "url('../images/news-type-news.svg')"
                                    },
                                    appendTo: newsA
                                });
                            } else if (tabContent.newsType === "video") {
                                createAppendElement("span", {
                                    className: "news-type",
                                    styles: {
                                        "backgroundImage": "url('../images/news-type-video.svg')"
                                    },
                                    appendTo: newsA
                                });
                            } else if (tabContent.newsType === "live") {
                                createAppendElement("span", {
                                    className: "news-type",
                                    styles: {
                                        "backgroundImage": "url('../images/news-type-live.svg')"
                                    },
                                    appendTo: newsA
                                });
                            }
                            createAppendElement("span", {
                                textContent: `${tabContent.text}`,
                                appendTo: newsA
                            });
                            newsLi.append(newsA);
                            newsUl.append(newsLi);
                        }
                        widgetlatestNewsFootballTabPane.append(newsUl);
                        widgetlatestNewsFootballTabContent.append(widgetlatestNewsFootballTabPane);
                        widgetBody.append(widgetlatestNewsFootballTabContent);
                    }
                    document.querySelector(".filter-alert-message").style.display = "none";
                } else if (nationalChk.checked && internationalChk.checked && videoChk.checked) {
                    for (key in latestNewsFootballwidget) {
                        let tab = latestNewsFootballwidget[key];
                        let activeClass = key === "newestTab" ? "show active" : "";
                        let tabId = tab.id;
                        let widgetlatestNewsFootballTabPane = createAppendElement("div", {
                            className: `widget-latest-news-all-tab-pane fade ${activeClass} w-100 overflow-y-scroll`,
                            id: `${tabId}`,
                            attributes: {
                                "role": "tabpanel",
                                "aria-labelledby": `${tabId}-tab`
                            }
                        });
                        let newsUl = createAppendElement("ul", {
                            className: "list-unstyled pt-0"
                        });
                        for (let i = 0; i < tab.tabContent.length; i++) {
                            let tabContent = tab.tabContent[i];
                            if (tabContent.state !== "olympics") {
                                let newsLi = createAppendElement("li");
                                let newsA = createAppendElement("a", {
                                    attributes: {
                                        "href": "#"
                                    }
                                });
                                if (tabContent.newsType === "news") {
                                    createAppendElement("span", {
                                        className: "news-type",
                                        styles: {
                                            "backgroundImage": "url('../images/news-type-news.svg')"
                                        },
                                        appendTo: newsA
                                    });
                                } else if (tabContent.newsType === "video") {
                                    createAppendElement("span", {
                                        className: "news-type",
                                        styles: {
                                            "backgroundImage": "url('../images/news-type-video.svg')"
                                        },
                                        appendTo: newsA
                                    });
                                } else if (tabContent.newsType === "live") {
                                    createAppendElement("span", {
                                        className: "news-type",
                                        styles: {
                                            "backgroundImage": "url('../images/news-type-live.svg')"
                                        },
                                        appendTo: newsA
                                    });
                                }
                                createAppendElement("span", {
                                    textContent: `${tabContent.text}`,
                                    appendTo: newsA
                                });
                                newsLi.append(newsA);
                                newsUl.append(newsLi);
                            }
                        }
                        widgetlatestNewsFootballTabPane.append(newsUl);
                        widgetlatestNewsFootballTabContent.append(widgetlatestNewsFootballTabPane);
                        widgetBody.append(widgetlatestNewsFootballTabContent);
                    }
                    document.querySelector(".filter-alert-message").style.display = "none";
                } else if (nationalChk.checked && internationalChk.checked && olympicsChk.checked) {
                    for (key in latestNewsFootballwidget) {
                        let tab = latestNewsFootballwidget[key];
                        let activeClass = key === "newestTab" ? "show active" : "";
                        let tabId = tab.id;
                        let widgetlatestNewsFootballTabPane = createAppendElement("div", {
                            className: `widget-latest-news-all-tab-pane fade ${activeClass} w-100 overflow-y-scroll`,
                            id: `${tabId}`,
                            attributes: {
                                "role": "tabpanel",
                                "aria-labelledby": `${tabId}-tab`
                            }
                        });
                        let newsUl = createAppendElement("ul", {
                            className: "list-unstyled pt-0"
                        });
                        for (let i = 0; i < tab.tabContent.length; i++) {
                            let tabContent = tab.tabContent[i];
                            if (tabContent.state !== "video") {
                                let newsLi = createAppendElement("li");
                                let newsA = createAppendElement("a", {
                                    attributes: {
                                        "href": "#"
                                    }
                                });
                                if (tabContent.newsType === "news") {
                                    createAppendElement("span", {
                                        className: "news-type",
                                        styles: {
                                            "backgroundImage": "url('../images/news-type-news.svg')"
                                        },
                                        appendTo: newsA
                                    });
                                } else if (tabContent.newsType === "video") {
                                    createAppendElement("span", {
                                        className: "news-type",
                                        styles: {
                                            "backgroundImage": "url('../images/news-type-video.svg')"
                                        },
                                        appendTo: newsA
                                    });
                                } else if (tabContent.newsType === "live") {
                                    createAppendElement("span", {
                                        className: "news-type",
                                        styles: {
                                            "backgroundImage": "url('../images/news-type-live.svg')"
                                        },
                                        appendTo: newsA
                                    });
                                }
                                createAppendElement("span", {
                                    textContent: `${tabContent.text}`,
                                    appendTo: newsA
                                });
                                newsLi.append(newsA);
                                newsUl.append(newsLi);
                            }
                        }
                        widgetlatestNewsFootballTabPane.append(newsUl);
                        widgetlatestNewsFootballTabContent.append(widgetlatestNewsFootballTabPane);
                        widgetBody.append(widgetlatestNewsFootballTabContent);
                    }
                    document.querySelector(".filter-alert-message").style.display = "none";
                } else if (internationalChk.checked && videoChk.checked && olympicsChk.checked) {
                    for (key in latestNewsFootballwidget) {
                        let tab = latestNewsFootballwidget[key];
                        let activeClass = key === "newestTab" ? "show active" : "";
                        let tabId = tab.id;
                        let widgetlatestNewsFootballTabPane = createAppendElement("div", {
                            className: `widget-latest-news-all-tab-pane fade ${activeClass} w-100 overflow-y-scroll`,
                            id: `${tabId}`,
                            attributes: {
                                "role": "tabpanel",
                                "aria-labelledby": `${tabId}-tab`
                            }
                        });
                        let newsUl = createAppendElement("ul", {
                            className: "list-unstyled pt-0"
                        });
                        for (let i = 0; i < tab.tabContent.length; i++) {
                            let tabContent = tab.tabContent[i];
                            if (tabContent.state !== "national") {
                                let newsLi = createAppendElement("li");
                                let newsA = createAppendElement("a", {
                                    attributes: {
                                        "href": "#"
                                    }
                                });
                                if (tabContent.newsType === "news") {
                                    createAppendElement("span", {
                                        className: "news-type",
                                        styles: {
                                            "backgroundImage": "url('../images/news-type-news.svg')"
                                        },
                                        appendTo: newsA
                                    });
                                } else if (tabContent.newsType === "video") {
                                    createAppendElement("span", {
                                        className: "news-type",
                                        styles: {
                                            "backgroundImage": "url('../images/news-type-video.svg')"
                                        },
                                        appendTo: newsA
                                    });
                                } else if (tabContent.newsType === "live") {
                                    createAppendElement("span", {
                                        className: "news-type",
                                        styles: {
                                            "backgroundImage": "url('../images/news-type-live.svg')"
                                        },
                                        appendTo: newsA
                                    });
                                }
                                createAppendElement("span", {
                                    textContent: `${tabContent.text}`,
                                    appendTo: newsA
                                });
                                newsLi.append(newsA);
                                newsUl.append(newsLi);
                            }
                        }
                        widgetlatestNewsFootballTabPane.append(newsUl);
                        widgetlatestNewsFootballTabContent.append(widgetlatestNewsFootballTabPane);
                        widgetBody.append(widgetlatestNewsFootballTabContent);
                    }
                    document.querySelector(".filter-alert-message").style.display = "none";
                } else if (nationalChk.checked && videoChk.checked && olympicsChk.checked) {
                    for (key in latestNewsFootballwidget) {
                        let tab = latestNewsFootballwidget[key];
                        let activeClass = key === "newestTab" ? "show active" : "";
                        let tabId = tab.id;
                        let widgetlatestNewsFootballTabPane = createAppendElement("div", {
                            className: `widget-latest-news-all-tab-pane fade ${activeClass} w-100 overflow-y-scroll`,
                            id: `${tabId}`,
                            attributes: {
                                "role": "tabpanel",
                                "aria-labelledby": `${tabId}-tab`
                            }
                        });
                        let newsUl = createAppendElement("ul", {
                            className: "list-unstyled pt-0"
                        });
                        for (let i = 0; i < tab.tabContent.length; i++) {
                            let tabContent = tab.tabContent[i];
                            if (tabContent.state !== "international") {
                                let newsLi = createAppendElement("li");
                                let newsA = createAppendElement("a", {
                                    attributes: {
                                        "href": "#"
                                    }
                                });
                                if (tabContent.newsType === "news") {
                                    createAppendElement("span", {
                                        className: "news-type",
                                        styles: {
                                            "backgroundImage": "url('../images/news-type-news.svg')"
                                        },
                                        appendTo: newsA
                                    });
                                } else if (tabContent.newsType === "video") {
                                    createAppendElement("span", {
                                        className: "news-type",
                                        styles: {
                                            "backgroundImage": "url('../images/news-type-video.svg')"
                                        },
                                        appendTo: newsA
                                    });
                                } else if (tabContent.newsType === "live") {
                                    createAppendElement("span", {
                                        className: "news-type",
                                        styles: {
                                            "backgroundImage": "url('../images/news-type-live.svg')"
                                        },
                                        appendTo: newsA
                                    });
                                }
                                createAppendElement("span", {
                                    textContent: `${tabContent.text}`,
                                    appendTo: newsA
                                });
                                newsLi.append(newsA);
                                newsUl.append(newsLi);
                            }
                        }
                        widgetlatestNewsFootballTabPane.append(newsUl);
                        widgetlatestNewsFootballTabContent.append(widgetlatestNewsFootballTabPane);
                        widgetBody.append(widgetlatestNewsFootballTabContent);
                    }
                    document.querySelector(".filter-alert-message").style.display = "none";
                } else if (nationalChk.checked && internationalChk.checked) {
                    for (key in latestNewsFootballwidget) {
                        let tab = latestNewsFootballwidget[key];
                        let activeClass = key === "newestTab" ? "show active" : "";
                        let tabId = tab.id;
                        let widgetlatestNewsFootballTabPane = createAppendElement("div", {
                            className: `widget-latest-news-all-tab-pane fade ${activeClass} w-100 overflow-y-scroll`,
                            id: `${tabId}`,
                            attributes: {
                                "role": "tabpanel",
                                "aria-labelledby": `${tabId}-tab`
                            }
                        });
                        let newsUl = createAppendElement("ul", {
                            className: "list-unstyled pt-0"
                        });
                        for (let i = 0; i < tab.tabContent.length; i++) {
                            let tabContent = tab.tabContent[i];
                            if (tabContent.state !== "international") {
                                let newsLi = createAppendElement("li");
                                let newsA = createAppendElement("a", {
                                    attributes: {
                                        "href": "#"
                                    }
                                });
                                if (tabContent.newsType === "news") {
                                    createAppendElement("span", {
                                        className: "news-type",
                                        styles: {
                                            "backgroundImage": "url('../images/news-type-news.svg')"
                                        },
                                        appendTo: newsA
                                    });
                                } else if (tabContent.newsType === "video") {
                                    createAppendElement("span", {
                                        className: "news-type",
                                        styles: {
                                            "backgroundImage": "url('../images/news-type-video.svg')"
                                        },
                                        appendTo: newsA
                                    });
                                } else if (tabContent.newsType === "live") {
                                    createAppendElement("span", {
                                        className: "news-type",
                                        styles: {
                                            "backgroundImage": "url('../images/news-type-live.svg')"
                                        },
                                        appendTo: newsA
                                    });
                                }
                                createAppendElement("span", {
                                    textContent: `${tabContent.text}`,
                                    appendTo: newsA
                                });
                                newsLi.append(newsA);
                                newsUl.append(newsLi);
                            }
                        }
                        widgetlatestNewsFootballTabPane.append(newsUl);
                        widgetlatestNewsFootballTabContent.append(widgetlatestNewsFootballTabPane);
                        widgetBody.append(widgetlatestNewsFootballTabContent);
                    }
                    document.querySelector(".filter-alert-message").style.display = "none";
                } else if (nationalChk.checked && videoChk.checked) {
                    for (key in latestNewsFootballwidget) {
                        let tab = latestNewsFootballwidget[key];
                        let activeClass = key === "newestTab" ? "show active" : "";
                        let tabId = tab.id;
                        let widgetlatestNewsFootballTabPane = createAppendElement("div", {
                            className: `widget-latest-news-all-tab-pane fade ${activeClass} w-100 overflow-y-scroll`,
                            id: `${tabId}`,
                            attributes: {
                                "role": "tabpanel",
                                "aria-labelledby": `${tabId}-tab`
                            }
                        });
                        let newsUl = createAppendElement("ul", {
                            className: "list-unstyled pt-0"
                        });
                        for (let i = 0; i < tab.tabContent.length; i++) {
                            let tabContent = tab.tabContent[i];
                            if (tabContent.state !== "international") {
                                let newsLi = createAppendElement("li");
                                let newsA = createAppendElement("a", {
                                    attributes: {
                                        "href": "#"
                                    }
                                });
                                if (tabContent.newsType === "news") {
                                    createAppendElement("span", {
                                        className: "news-type",
                                        styles: {
                                            "backgroundImage": "url('../images/news-type-news.svg')"
                                        },
                                        appendTo: newsA
                                    });
                                } else if (tabContent.newsType === "video") {
                                    createAppendElement("span", {
                                        className: "news-type",
                                        styles: {
                                            "backgroundImage": "url('../images/news-type-video.svg')"
                                        },
                                        appendTo: newsA
                                    });
                                } else if (tabContent.newsType === "live") {
                                    createAppendElement("span", {
                                        className: "news-type",
                                        styles: {
                                            "backgroundImage": "url('../images/news-type-live.svg')"
                                        },
                                        appendTo: newsA
                                    });
                                }
                                createAppendElement("span", {
                                    textContent: `${tabContent.text}`,
                                    appendTo: newsA
                                });
                                newsLi.append(newsA);
                                newsUl.append(newsLi);
                            }
                        }
                        widgetlatestNewsFootballTabPane.append(newsUl);
                        widgetlatestNewsFootballTabContent.append(widgetlatestNewsFootballTabPane);
                        widgetBody.append(widgetlatestNewsFootballTabContent);
                    }
                    document.querySelector(".filter-alert-message").style.display = "none";
                } else if (nationalChk.checked && olympicsChk.checked) {
                    for (key in latestNewsFootballwidget) {
                        let tab = latestNewsFootballwidget[key];
                        let activeClass = key === "newestTab" ? "show active" : "";
                        let tabId = tab.id;
                        let widgetlatestNewsFootballTabPane = createAppendElement("div", {
                            className: `widget-latest-news-all-tab-pane fade ${activeClass} w-100 overflow-y-scroll`,
                            id: `${tabId}`,
                            attributes: {
                                "role": "tabpanel",
                                "aria-labelledby": `${tabId}-tab`
                            }
                        });
                        let newsUl = createAppendElement("ul", {
                            className: "list-unstyled pt-0"
                        });
                        for (let i = 0; i < tab.tabContent.length; i++) {
                            let tabContent = tab.tabContent[i];
                            if (tabContent.state !== "international") {
                                let newsLi = createAppendElement("li");
                                let newsA = createAppendElement("a", {
                                    attributes: {
                                        "href": "#"
                                    }
                                });
                                if (tabContent.newsType === "news") {
                                    createAppendElement("span", {
                                        className: "news-type",
                                        styles: {
                                            "backgroundImage": "url('../images/news-type-news.svg')"
                                        },
                                        appendTo: newsA
                                    });
                                } else if (tabContent.newsType === "video") {
                                    createAppendElement("span", {
                                        className: "news-type",
                                        styles: {
                                            "backgroundImage": "url('../images/news-type-video.svg')"
                                        },
                                        appendTo: newsA
                                    });
                                } else if (tabContent.newsType === "live") {
                                    createAppendElement("span", {
                                        className: "news-type",
                                        styles: {
                                            "backgroundImage": "url('../images/news-type-live.svg')"
                                        },
                                        appendTo: newsA
                                    });
                                }
                                createAppendElement("span", {
                                    textContent: `${tabContent.text}`,
                                    appendTo: newsA
                                });
                                newsLi.append(newsA);
                                newsUl.append(newsLi);
                            }
                        }
                        widgetlatestNewsFootballTabPane.append(newsUl);
                        widgetlatestNewsFootballTabContent.append(widgetlatestNewsFootballTabPane);
                        widgetBody.append(widgetlatestNewsFootballTabContent);
                    }
                    document.querySelector(".filter-alert-message").style.display = "none";
                } else if (internationalChk.checked && videoChk.checked) {
                    for (key in latestNewsFootballwidget) {
                        let tab = latestNewsFootballwidget[key];
                        let activeClass = key === "newestTab" ? "show active" : "";
                        let tabId = tab.id;
                        let widgetlatestNewsFootballTabPane = createAppendElement("div", {
                            className: `widget-latest-news-all-tab-pane fade ${activeClass} w-100 overflow-y-scroll`,
                            id: `${tabId}`,
                            attributes: {
                                "role": "tabpanel",
                                "aria-labelledby": `${tabId}-tab`
                            }
                        });
                        let newsUl = createAppendElement("ul", {
                            className: "list-unstyled pt-0"
                        });
                        for (let i = 0; i < tab.tabContent.length; i++) {
                            let tabContent = tab.tabContent[i];
                            if (tabContent.state !== "international") {
                                let newsLi = createAppendElement("li");
                                let newsA = createAppendElement("a", {
                                    attributes: {
                                        "href": "#"
                                    }
                                });
                                if (tabContent.newsType === "news") {
                                    createAppendElement("span", {
                                        className: "news-type",
                                        styles: {
                                            "backgroundImage": "url('../images/news-type-news.svg')"
                                        },
                                        appendTo: newsA
                                    });
                                } else if (tabContent.newsType === "video") {
                                    createAppendElement("span", {
                                        className: "news-type",
                                        styles: {
                                            "backgroundImage": "url('../images/news-type-video.svg')"
                                        },
                                        appendTo: newsA
                                    });
                                } else if (tabContent.newsType === "live") {
                                    createAppendElement("span", {
                                        className: "news-type",
                                        styles: {
                                            "backgroundImage": "url('../images/news-type-live.svg')"
                                        },
                                        appendTo: newsA
                                    });
                                }
                                createAppendElement("span", {
                                    textContent: `${tabContent.text}`,
                                    appendTo: newsA
                                });
                                newsLi.append(newsA);
                                newsUl.append(newsLi);
                            }
                        }
                        widgetlatestNewsFootballTabPane.append(newsUl);
                        widgetlatestNewsFootballTabContent.append(widgetlatestNewsFootballTabPane);
                        widgetBody.append(widgetlatestNewsFootballTabContent);
                    }
                    document.querySelector(".filter-alert-message").style.display = "none";
                } else if (internationalChk.checked && olympicsChk.checked) {
                    for (key in latestNewsFootballwidget) {
                        let tab = latestNewsFootballwidget[key];
                        let activeClass = key === "newestTab" ? "show active" : "";
                        let tabId = tab.id;
                        let widgetlatestNewsFootballTabPane = createAppendElement("div", {
                            className: `widget-latest-news-all-tab-pane fade ${activeClass} w-100 overflow-y-scroll`,
                            id: `${tabId}`,
                            attributes: {
                                "role": "tabpanel",
                                "aria-labelledby": `${tabId}-tab`
                            }
                        });
                        let newsUl = createAppendElement("ul", {
                            className: "list-unstyled pt-0"
                        });
                        for (let i = 0; i < tab.tabContent.length; i++) {
                            let tabContent = tab.tabContent[i];
                            if (tabContent.state !== "international") {
                                let newsLi = createAppendElement("li");
                                let newsA = createAppendElement("a", {
                                    attributes: {
                                        "href": "#"
                                    }
                                });
                                if (tabContent.newsType === "news") {
                                    createAppendElement("span", {
                                        className: "news-type",
                                        styles: {
                                            "backgroundImage": "url('../images/news-type-news.svg')"
                                        },
                                        appendTo: newsA
                                    });
                                } else if (tabContent.newsType === "video") {
                                    createAppendElement("span", {
                                        className: "news-type",
                                        styles: {
                                            "backgroundImage": "url('../images/news-type-video.svg')"
                                        },
                                        appendTo: newsA
                                    });
                                } else if (tabContent.newsType === "live") {
                                    createAppendElement("span", {
                                        className: "news-type",
                                        styles: {
                                            "backgroundImage": "url('../images/news-type-live.svg')"
                                        },
                                        appendTo: newsA
                                    });
                                }
                                createAppendElement("span", {
                                    textContent: `${tabContent.text}`,
                                    appendTo: newsA
                                });
                                newsLi.append(newsA);
                                newsUl.append(newsLi);
                            }
                        }
                        widgetlatestNewsFootballTabPane.append(newsUl);
                        widgetlatestNewsFootballTabContent.append(widgetlatestNewsFootballTabPane);
                        widgetBody.append(widgetlatestNewsFootballTabContent);
                    }
                    document.querySelector(".filter-alert-message").style.display = "none";
                } else if (videoChk.checked && olympicsChk.checked) {
                    for (key in latestNewsFootballwidget) {
                        let tab = latestNewsFootballwidget[key];
                        let activeClass = key === "newestTab" ? "show active" : "";
                        let tabId = tab.id;
                        let widgetlatestNewsFootballTabPane = createAppendElement("div", {
                            className: `widget-latest-news-all-tab-pane fade ${activeClass} w-100 overflow-y-scroll`,
                            id: `${tabId}`,
                            attributes: {
                                "role": "tabpanel",
                                "aria-labelledby": `${tabId}-tab`
                            }
                        });
                        let newsUl = createAppendElement("ul", {
                            className: "list-unstyled pt-0"
                        });
                        for (let i = 0; i < tab.tabContent.length; i++) {
                            let tabContent = tab.tabContent[i];
                            if (tabContent.state !== "international") {
                                let newsLi = createAppendElement("li");
                                let newsA = createAppendElement("a", {
                                    attributes: {
                                        "href": "#"
                                    }
                                });
                                if (tabContent.newsType === "news") {
                                    createAppendElement("span", {
                                        className: "news-type",
                                        styles: {
                                            "backgroundImage": "url('../images/news-type-news.svg')"
                                        },
                                        appendTo: newsA
                                    });
                                } else if (tabContent.newsType === "video") {
                                    createAppendElement("span", {
                                        className: "news-type",
                                        styles: {
                                            "backgroundImage": "url('../images/news-type-video.svg')"
                                        },
                                        appendTo: newsA
                                    });
                                } else if (tabContent.newsType === "live") {
                                    createAppendElement("span", {
                                        className: "news-type",
                                        styles: {
                                            "backgroundImage": "url('../images/news-type-live.svg')"
                                        },
                                        appendTo: newsA
                                    });
                                }
                                createAppendElement("span", {
                                    textContent: `${tabContent.text}`,
                                    appendTo: newsA
                                });
                                newsLi.append(newsA);
                                newsUl.append(newsLi);
                            }
                        }
                        widgetlatestNewsFootballTabPane.append(newsUl);
                        widgetlatestNewsFootballTabContent.append(widgetlatestNewsFootballTabPane);
                        widgetBody.append(widgetlatestNewsFootballTabContent);
                    }
                    document.querySelector(".filter-alert-message").style.display = "none";
                } else if (nationalChk.checked) {
                    for (key in latestNewsFootballwidget) {
                        let tab = latestNewsFootballwidget[key];
                        let activeClass = key === "newestTab" ? "show active" : "";
                        let tabId = tab.id;
                        let widgetlatestNewsFootballTabPane = createAppendElement("div", {
                            className: `widget-latest-news-all-tab-pane fade ${activeClass} w-100 overflow-y-scroll`,
                            id: `${tabId}`,
                            attributes: {
                                "role": "tabpanel",
                                "aria-labelledby": `${tabId}-tab`
                            }
                        });
                        let newsUl = createAppendElement("ul", {
                            className: "list-unstyled pt-0"
                        });
                        for (let i = 0; i < tab.tabContent.length; i++) {
                            let tabContent = tab.tabContent[i];
                            if (tabContent.state === "national") {
                                let newsLi = createAppendElement("li");
                                let newsA = createAppendElement("a", {
                                    attributes: {
                                        "href": "#"
                                    }
                                });
                                if (tabContent.newsType === "news") {
                                    createAppendElement("span", {
                                        className: "news-type",
                                        styles: {
                                            "backgroundImage": "url('../images/news-type-news.svg')"
                                        },
                                        appendTo: newsA
                                    });
                                } else if (tabContent.newsType === "video") {
                                    createAppendElement("span", {
                                        className: "news-type",
                                        styles: {
                                            "backgroundImage": "url('../images/news-type-video.svg')"
                                        },
                                        appendTo: newsA
                                    });
                                } else if (tabContent.newsType === "live") {
                                    createAppendElement("span", {
                                        className: "news-type",
                                        styles: {
                                            "backgroundImage": "url('../images/news-type-live.svg')"
                                        },
                                        appendTo: newsA
                                    });
                                }
                                createAppendElement("span", {
                                    textContent: `${tabContent.text}`,
                                    appendTo: newsA
                                });
                                newsLi.append(newsA);
                                newsUl.append(newsLi);
                            }
                        }
                        widgetlatestNewsFootballTabPane.append(newsUl);
                        widgetlatestNewsFootballTabContent.append(widgetlatestNewsFootballTabPane);
                        widgetBody.append(widgetlatestNewsFootballTabContent);
                    }
                    document.querySelector(".filter-alert-message").style.display = "none";
                } else if (internationalChk.checked) {
                    for (key in latestNewsFootballwidget) {
                        let tab = latestNewsFootballwidget[key];
                        let activeClass = key === "newestTab" ? "show active" : "";
                        let tabId = tab.id;
                        let widgetlatestNewsFootballTabPane = createAppendElement("div", {
                            className: `widget-latest-news-all-tab-pane fade ${activeClass} w-100 overflow-y-scroll`,
                            id: `${tabId}`,
                            attributes: {
                                "role": "tabpanel",
                                "aria-labelledby": `${tabId}-tab`
                            }
                        });
                        let newsUl = createAppendElement("ul", {
                            className: "list-unstyled pt-0"
                        });
                        for (let i = 0; i < tab.tabContent.length; i++) {
                            let tabContent = tab.tabContent[i];
                            if (tabContent.state === "international") {
                                let newsLi = createAppendElement("li");
                                let newsA = createAppendElement("a", {
                                    attributes: {
                                        "href": "#"
                                    }
                                });
                                if (tabContent.newsType === "news") {
                                    createAppendElement("span", {
                                        className: "news-type",
                                        styles: {
                                            "backgroundImage": "url('../images/news-type-news.svg')"
                                        },
                                        appendTo: newsA
                                    });
                                } else if (tabContent.newsType === "video") {
                                    createAppendElement("span", {
                                        className: "news-type",
                                        styles: {
                                            "backgroundImage": "url('../images/news-type-video.svg')"
                                        },
                                        appendTo: newsA
                                    });
                                } else if (tabContent.newsType === "live") {
                                    createAppendElement("span", {
                                        className: "news-type",
                                        styles: {
                                            "backgroundImage": "url('../images/news-type-live.svg')"
                                        },
                                        appendTo: newsA
                                    });
                                }
                                createAppendElement("span", {
                                    textContent: `${tabContent.text}`,
                                    appendTo: newsA
                                });
                                newsLi.append(newsA);
                                newsUl.append(newsLi);
                            }
                        }
                        widgetlatestNewsFootballTabPane.append(newsUl);
                        widgetlatestNewsFootballTabContent.append(widgetlatestNewsFootballTabPane);
                        widgetBody.append(widgetlatestNewsFootballTabContent);
                    }
                    document.querySelector(".filter-alert-message").style.display = "none";
                } else if (videoChk.checked) {
                    for (key in latestNewsFootballwidget) {
                        let tab = latestNewsFootballwidget[key];
                        let activeClass = key === "newestTab" ? "show active" : "";
                        let tabId = tab.id;
                        let widgetlatestNewsFootballTabPane = createAppendElement("div", {
                            className: `widget-latest-news-all-tab-pane fade ${activeClass} w-100 overflow-y-scroll`,
                            id: `${tabId}`,
                            attributes: {
                                "role": "tabpanel",
                                "aria-labelledby": `${tabId}-tab`
                            }
                        });
                        let newsUl = createAppendElement("ul", {
                            className: "list-unstyled pt-0"
                        });
                        for (let i = 0; i < tab.tabContent.length; i++) {
                            let tabContent = tab.tabContent[i];
                            if (tabContent.state === "video") {
                                let newsLi = createAppendElement("li");
                                let newsA = createAppendElement("a", {
                                    attributes: {
                                        "href": "#"
                                    }
                                });
                                if (tabContent.newsType === "news") {
                                    createAppendElement("span", {
                                        className: "news-type",
                                        styles: {
                                            "backgroundImage": "url('../images/news-type-news.svg')"
                                        },
                                        appendTo: newsA
                                    });
                                } else if (tabContent.newsType === "video") {
                                    createAppendElement("span", {
                                        className: "news-type",
                                        styles: {
                                            "backgroundImage": "url('../images/news-type-video.svg')"
                                        },
                                        appendTo: newsA
                                    });
                                } else if (tabContent.newsType === "live") {
                                    createAppendElement("span", {
                                        className: "news-type",
                                        styles: {
                                            "backgroundImage": "url('../images/news-type-live.svg')"
                                        },
                                        appendTo: newsA
                                    });
                                }
                                createAppendElement("span", {
                                    textContent: `${tabContent.text}`,
                                    appendTo: newsA
                                });
                                newsLi.append(newsA);
                                newsUl.append(newsLi);
                            }
                        }
                        widgetlatestNewsFootballTabPane.append(newsUl);
                        widgetlatestNewsFootballTabContent.append(widgetlatestNewsFootballTabPane);
                        widgetBody.append(widgetlatestNewsFootballTabContent);
                    }
                    document.querySelector(".filter-alert-message").style.display = "none";
                } else if (olympicsChk.checked) {
                    for (key in latestNewsFootballwidget) {
                        let tab = latestNewsFootballwidget[key];
                        let activeClass = key === "newestTab" ? "show active" : "";
                        let tabId = tab.id;
                        let widgetlatestNewsFootballTabPane = createAppendElement("div", {
                            className: `widget-latest-news-all-tab-pane fade ${activeClass} w-100 overflow-y-scroll`,
                            id: `${tabId}`,
                            attributes: {
                                "role": "tabpanel",
                                "aria-labelledby": `${tabId}-tab`
                            }
                        });
                        let newsUl = createAppendElement("ul", {
                            className: "list-unstyled pt-0"
                        });
                        for (let i = 0; i < tab.tabContent.length; i++) {
                            let tabContent = tab.tabContent[i];
                            if (tabContent.state === "olympics") {
                                let newsLi = createAppendElement("li");
                                let newsA = createAppendElement("a", {
                                    attributes: {
                                        "href": "#"
                                    }
                                });
                                if (tabContent.newsType === "news") {
                                    createAppendElement("span", {
                                        className: "news-type",
                                        styles: {
                                            "backgroundImage": "url('../images/news-type-news.svg')"
                                        },
                                        appendTo: newsA
                                    });
                                } else if (tabContent.newsType === "video") {
                                    createAppendElement("span", {
                                        className: "news-type",
                                        styles: {
                                            "backgroundImage": "url('../images/news-type-video.svg')"
                                        },
                                        appendTo: newsA
                                    });
                                } else if (tabContent.newsType === "live") {
                                    createAppendElement("span", {
                                        className: "news-type",
                                        styles: {
                                            "backgroundImage": "url('../images/news-type-live.svg')"
                                        },
                                        appendTo: newsA
                                    });
                                }
                                createAppendElement("span", {
                                    textContent: `${tabContent.text}`,
                                    appendTo: newsA
                                });
                                newsLi.append(newsA);
                                newsUl.append(newsLi);
                            }
                        }
                        widgetlatestNewsFootballTabPane.append(newsUl);
                        widgetlatestNewsFootballTabContent.append(widgetlatestNewsFootballTabPane);
                        widgetBody.append(widgetlatestNewsFootballTabContent);
                    }
                    document.querySelector(".filter-alert-message").style.display = "none";
                } else {
                    document.querySelector(".filter-alert-message").style.display = "block";
                    setTimeout(() => {
                        document.querySelector(".filter-alert-message").style.display = "none";
                    }, 5000);
                }
            }
            updateLatestNewsContent();
        })
        .catch(function (error) {
            console.log("error: ", error);
        });
}

loadLatestNewsFootballData();

// show foreign leagues widget

let foreignLeagues;

function loadForeignLeaguesData() {
    fetch("js/data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then(data => {
            foreignLeagues = data.foreignLeagues;
            changeStageForeignLeagues();
        })
        .catch(function (error) {
            console.log("error: ", error);
        });
}

function changeStageForeignLeagues() {
    const weekSelectElement = document.getElementById("foreign-leagues-week-select");
    weekSelectElement.selectedIndex = 0;
    changeStageForeignLeaguesWeek();
}

function changeStageForeignLeaguesWeek() {
    const leagueSelectElement = document.getElementById("foreign-leagues-select");
    const selectedLeague = leagueSelectElement.value;
    const weekSelectElement = document.getElementById("foreign-leagues-week-select");
    const selectedWeek = weekSelectElement.value;
    const stageDataElement = document.querySelector(".widget-body-foreign-leagues");
    while (stageDataElement.firstChild) {
        stageDataElement.removeChild(stageDataElement.firstChild);
    }
    let leagueData = foreignLeagues[selectedLeague];
    let weekData = leagueData.weeks[selectedWeek];

    let widgetSubtitle = createAppendElement("div", {
        className: "widget-subtitle text-center text-white bg-dark-blue"
    });
    createAppendElement("h3", {
        textContent: `${leagueData.subtitle}`,
        appendTo: widgetSubtitle
    });
    let widgetSchedule = createAppendElement("div", {
        className: "widget-schedule"
    });
    let matchCounter = 1;
    for (let i = 0; i < weekData.length; i++) {
        let match = weekData[i];
        if (match.hasOwnProperty("separator")) {
            let widgetDateSeparator = createAppendElement("div", {
                className: "widget-date-separator text-center text-white bg-dark-gray"
            });
            createAppendElement("h4", {
                textContent: match.separator,
                appendTo: widgetDateSeparator
            });
            widgetSchedule.append(widgetDateSeparator);
            matchCounter = 1;
        }
        let widgetMatchResult = createAppendElement("div", {
            className: "widget-match-result d-flex justify-content-between align-items-center"
        });
        if (matchCounter % 2 === 0) {
            widgetMatchResult.className += " even";
        }
        let widgetMatchResultDetail = createAppendElement("div", {
            className: "widget-match-result-detail d-flex justify-content-between",
            appendTo: widgetMatchResult
        });
        let widgetDetailIcon = createAppendElement("a", {
            attributes: {
                "href": "#"
            }
        });
        widgetDetailIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17"
                                                        viewBox="0 0 24 24">
                                                        <g fill="none" fill-rule="evenodd">
                                                            <g fill="#90a4ae ">
                                                                <g>
                                                                    <g>
                                                                        <path
                                                                            d="M11.1 7.5h1.8v1.8h-1.8V7.5zm0 3.6h1.8v5.4h-1.8v-5.4zM12 3c-4.968 0-9 4.032-9 9s4.032 9 9 9 9-4.032 9-9-4.032-9-9-9zm0 16.2c-3.969 0-7.2-3.231-7.2-7.2 0-3.969 3.231-7.2 7.2-7.2 3.969 0 7.2 3.231 7.2 7.2 0 3.969-3.231 7.2-7.2 7.2z"
                                                                            transform="translate(-469 -364) translate(413 355) translate(56 9)" />
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </svg>`;
        widgetMatchResultDetail.append(widgetDetailIcon);
        if (match.detail === false) {
            createAppendElement("a", {
                attributes: {
                    "href": "#"
                }
            });
        }
        let widgetMatchResultTeams = createAppendElement("a", {
            className: "widget-match-result-teams d-flex justify-content-center w-75",
            attributes: {
                "href": "#"
            }
        });
        createAppendElement("span", {
            className: "widget-match-host text-end",
            textContent: match.host,
            appendTo: widgetMatchResultTeams
        });
        let widgetMatchGoals = createAppendElement("div", {
            className: "widget-match-goals d-flex justify-content-around"
        });
        createAppendElement("span", {
            className: "host",
            textContent: match.hostScore || "",
            appendTo: widgetMatchGoals
        });
        createAppendElement("span", {
            textContent: "-",
            appendTo: widgetMatchGoals
        });
        createAppendElement("span", {
            className: "guest",
            textContent: match.guestScore || "",
            appendTo: widgetMatchGoals
        });
        widgetMatchResultTeams.append(widgetMatchGoals);
        createAppendElement("span", {
            className: "widget-match-guest",
            textContent: match.guest,
            appendTo: widgetMatchResultTeams
        });
        widgetMatchResult.append(widgetMatchResultTeams);
        let widgetMatchResultTime = createAppendElement("div", {
            className: "widget-match-result-time d-flex justify-content-end"
        });
        if (match.hasOwnProperty("time")) {
            createAppendElement("span", {
                className: "match-time",
                textContent: match.time,
                appendTo: widgetMatchResultTime
            });
            createAppendElement("span", {
                className: "match-status",
                appendTo: widgetMatchResultTime
            });
        } else if (match.play === true) {
            let widgetPlayIcon = createAppendElement("a", {
                attributes: {
                    "href": "#"
                }
            });
            widgetPlayIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24">
                                                <g fill="none" fill-rule="evenodd">
                                                    <g fill="#0097a7">
                                                        <g>
                                                            <g>
                                                                <path d="M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9zM9.75 7.5v8.438l6.75-4.22L9.75 7.5z" transform="translate(-469 -311) translate(413 302) translate(56 9)"/>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>`;
            widgetMatchResultTime.append(widgetPlayIcon);
        }
        widgetMatchResult.append(widgetMatchResultTime);
        widgetSchedule.append(widgetMatchResult);
        stageDataElement.append(widgetSubtitle);
        matchCounter++;
    }
    stageDataElement.append(widgetSchedule);
    document.querySelector(".widget-footer-foreign-leagues a").textContent = `برنامه بازی های ${leagueData.subtitle}`;
}

loadForeignLeaguesData();

// show foreign leagues table widget

let foreignLeaguesTable;

function loadForeignLeaguesTableData() {
    fetch("js/data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then(data => {
            foreignLeaguesTable = data.foreignLeaguesTable;
            changeStageForeignLeaguesTable();
        })
        .catch(function (error) {
            console.log("error: ", error);
        });
}

function changeStageForeignLeaguesTable() {
    const selectElement = document.getElementById("foreign-leagues-table-select");
    const selectedStage = selectElement.value;
    const stageDataElement = document.querySelector(".widget-body-foreign-leagues-table");
    while (stageDataElement.firstChild) {
        stageDataElement.removeChild(stageDataElement.firstChild);
    }
    let stageData = foreignLeaguesTable[selectedStage];
    let widgetTitle = createAppendElement("div", {
        className: "widget-subtitle text-center text-white bg-light-blue"
    });
    createAppendElement("h3", {
        textContent: `${stageData.title}`,
        appendTo: widgetTitle
    });
    stageDataElement.append(widgetTitle);
    let widgetTable = createAppendElement("table", {
        className: "group-table w-100 text-center"
    });
    let widgetTableThead = document.createElement("thead");
    let widgetTableTheadTr = createAppendElement("tr", {
        className: "bg-dark-gray"
    });
    for (let i = 0; i < stageData.th.length; i++) {
        createAppendElement("th", {
            className: "fw-normal text-white",
            attributes: {
                "scope": "col"
            },
            textContent: `${stageData.th[i]}`,
            appendTo: widgetTableTheadTr
        });
    }
    let widgetTableTbody = document.createElement("tbody");
    for (let j = 0; j < stageData.tr.length; j++) {
        let td = stageData.tr[j];
        let widgetTableTbodyTr = createAppendElement("tr", {
            className: "fw-medium text-black"
        });
        createAppendElement("td", {
            textContent: `${j + 1}`,
            appendTo: widgetTableTbodyTr
        });
        let widgetTableTbodyTeam = document.createElement("td");
        createAppendElement("a", {
            className: "fw-semibold text-black",
            attributes: {
                "href": '#'
            },
            textContent: `${td.team}`,
            appendTo: widgetTableTbodyTeam
        });
        widgetTableTbodyTr.append(widgetTableTbodyTeam);
        createAppendElement("td", {
            className: "table-game fw-normal",
            textContent: `${td.game}`,
            appendTo: widgetTableTbodyTr
        });
        createAppendElement("td", {
            textContent: `${td.score}`,
            appendTo: widgetTableTbodyTr
        });
        widgetTableTbody.append(widgetTableTbodyTr);
    }
    widgetTableThead.append(widgetTableTheadTr);
    widgetTable.append(widgetTableThead);
    widgetTable.append(widgetTableTbody);
    stageDataElement.append(widgetTable);
    document.querySelector(".widget-footer-foreign-leagues-table a").textContent = `جدول کامل ${stageData.title}`;
}

loadForeignLeaguesTableData();

// show elimination cups widget

let eliminationCups;

function loadEliminationCupsData() {
    fetch("js/data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then(data => {
            eliminationCups = data.eliminationCups;
            changeStageEliminationCups();
        })
        .catch(function (error) {
            console.log("error: ", error);
        });
}

function changeStageEliminationCups() {
    const stepSelectElement = document.getElementById("elimination-cups-step-select");
    stepSelectElement.selectedIndex = 5;
    changeStageEliminationCupSteps();
}

function changeStageEliminationCupSteps() {
    const cupSelectElement = document.getElementById("elimination-cups-select");
    const selectedCup = cupSelectElement.value;
    const stepSelectElement = document.getElementById("elimination-cups-step-select");
    const selectedStep = stepSelectElement.value;
    const stageDataElement = document.querySelector(".widget-body-elimination-cups");
    while (stageDataElement.firstChild) {
        stageDataElement.removeChild(stageDataElement.firstChild);
    }
    let cupData = eliminationCups[selectedCup];
    let stepData = cupData.steps[selectedStep];

    let widgetSubtitle = createAppendElement("div", {
        className: "widget-subtitle text-center text-white bg-dark-blue"
    });
    createAppendElement("h3", {
        textContent: `${stepData.subtitle}`,
        appendTo: widgetSubtitle
    });
    let widgetSchedule = createAppendElement("div", {
        className: "widget-schedule"
    });
    let matchCounter = 1;
    for (let i = 0; i < stepData.matches.length; i++) {
        let match = stepData.matches[i];
        if (match.hasOwnProperty("separator")) {
            let widgetDateSeparator = createAppendElement("div", {
                className: "widget-date-separator text-center text-white bg-dark-gray"
            });
            createAppendElement("h4", {
                textContent: match.separator,
                appendTo: widgetDateSeparator
            });
            widgetSchedule.append(widgetDateSeparator);
            matchCounter = 1;
        }
        let widgetMatchResult = createAppendElement("div", {
            className: "widget-match-result d-flex justify-content-between align-items-center"
        });
        if (matchCounter % 2 === 0) {
            widgetMatchResult.className += " even";
        }
        let widgetMatchResultDetail = createAppendElement("div", {
            className: "widget-match-result-detail d-flex justify-content-between",
            appendTo: widgetMatchResult
        });
        let widgetDetailIcon = createAppendElement("a", {
            attributes: {
                "href": "#"
            }
        });
        widgetDetailIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17"
                                                        viewBox="0 0 24 24">
                                                        <g fill="none" fill-rule="evenodd">
                                                            <g fill="#90a4ae ">
                                                                <g>
                                                                    <g>
                                                                        <path
                                                                            d="M11.1 7.5h1.8v1.8h-1.8V7.5zm0 3.6h1.8v5.4h-1.8v-5.4zM12 3c-4.968 0-9 4.032-9 9s4.032 9 9 9 9-4.032 9-9-4.032-9-9-9zm0 16.2c-3.969 0-7.2-3.231-7.2-7.2 0-3.969 3.231-7.2 7.2-7.2 3.969 0 7.2 3.231 7.2 7.2 0 3.969-3.231 7.2-7.2 7.2z"
                                                                            transform="translate(-469 -364) translate(413 355) translate(56 9)" />
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </svg>`;
        widgetMatchResultDetail.append(widgetDetailIcon);
        if (match.detail === false) {
            createAppendElement("a", {
                attributes: {
                    "href": "#"
                }
            });
        }
        let widgetMatchResultTeams = createAppendElement("a", {
            className: "widget-match-result-teams d-flex justify-content-center w-75",
            attributes: {
                "href": "#"
            }
        });
        createAppendElement("span", {
            className: "widget-match-host text-end",
            textContent: match.host,
            appendTo: widgetMatchResultTeams
        });
        let widgetMatchGoals = createAppendElement("div", {
            className: "widget-match-goals d-flex justify-content-around"
        });
        createAppendElement("span", {
            className: "host",
            textContent: match.hostScore || "",
            appendTo: widgetMatchGoals
        });
        createAppendElement("span", {
            textContent: "-",
            appendTo: widgetMatchGoals
        });
        createAppendElement("span", {
            className: "guest",
            textContent: match.guestScore || "",
            appendTo: widgetMatchGoals
        });
        widgetMatchResultTeams.append(widgetMatchGoals);
        createAppendElement("span", {
            className: "widget-match-guest",
            textContent: match.guest,
            appendTo: widgetMatchResultTeams
        });
        widgetMatchResult.append(widgetMatchResultTeams);
        let widgetMatchResultTime = createAppendElement("div", {
            className: "widget-match-result-time d-flex justify-content-end"
        });
        if (match.hasOwnProperty("time")) {
            createAppendElement("span", {
                className: "match-time",
                textContent: match.time,
                appendTo: widgetMatchResultTime
            });
            createAppendElement("span", {
                className: "match-status",
                appendTo: widgetMatchResultTime
            });
        } else if (match.play === true) {
            let widgetPlayIcon = createAppendElement("a", {
                attributes: {
                    "href": "#"
                }
            });
            widgetPlayIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24">
                                                <g fill="none" fill-rule="evenodd">
                                                    <g fill="#0097a7">
                                                        <g>
                                                            <g>
                                                                <path d="M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9zM9.75 7.5v8.438l6.75-4.22L9.75 7.5z" transform="translate(-469 -311) translate(413 302) translate(56 9)"/>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>`;
            widgetMatchResultTime.append(widgetPlayIcon);
        }
        widgetMatchResult.append(widgetMatchResultTime);
        widgetSchedule.append(widgetMatchResult);
        stageDataElement.append(widgetSubtitle);
        matchCounter++;
    }
    stageDataElement.append(widgetSchedule);
    document.querySelector(".widget-footer-elimination-cups a").textContent = `${cupData.footer}`;
}

loadEliminationCupsData();

// show nation cups widget

let nationsCup;

function loadNationsCupData() {
    fetch("js/data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then(data => {
            nationsCup = data.nationsCup;
            initializeNationsCupTabs();
            changeStageNationsCup();
        })
        .catch(function (error) {
            console.log("error: ", error);
        });
}

function initializeNationsCupTabs() {
    const stageDataElement = document.querySelector(".widget-nations-cup-tab-content");
    for (let key in nationsCup) {
        let activeClass = key == "europe" ? "show active" : "";
        let tabpane = createAppendElement("div", {
            className: `${key}-tab-pane fade ${activeClass}`,
            id: `widget-nations-cup-${key}`,
            attributes: {
                "role": "tabpanel",
                "aria-labelledby": `${key}-tab`
            },
            appendTo: stageDataElement
        });
        let selectElement = createAppendElement("select", {
            id: `${key}-nations-cup-select`,
            className: "widget-select-options fs-6 fw-bold mb-2 py-2 px-1 rounded-1 bg-white",
            appendTo: tabpane,
            attributes: {
                "onchange": "changeStageNationsCup()"
            }
        });
        const stages = [
            { value: "groupACup", text: "گروه A" },
            { value: "groupBCup", text: "گروه B" },
            { value: "groupCCup", text: "گروه C" },
            { value: "groupDCup", text: "گروه D" },
            { value: "groupECup", text: "گروه E" },
            { value: "groupFCup", text: "گروه F" },
            { value: "eighthCup", text: "یک‌هشتم نهایی" },
            { value: "quarterCup", text: "یک‌چهارم نهایی" },
            { value: "semiCup", text: "نیمه نهایی" },
            { value: "finalCup", text: "فینال", selected: true }
        ];
        stages.forEach(stage => {
            let option = createAppendElement("option", {
                attributes: {
                    "value": `${stage.value}`,
                },
                textContent: stage.text,
                appendTo: selectElement
            });
            if (stage.selected) {
                option.selected = true;
            }
        });
    }
}

function changeStageNationsCup() {
    for (let key in nationsCup) {
        const selectElement = document.getElementById(`${key}-nations-cup-select`);
        const selectedStage = selectElement.value;
        let stepData = nationsCup[key][selectedStage];
        let tabpane = document.getElementById(`widget-nations-cup-${key}`);
        while (tabpane.childElementCount > 1) {
            tabpane.removeChild(tabpane.lastChild);
        }
        let widgetSubtitle = createAppendElement("div", {
            className: "widget-subtitle text-center text-white bg-light-green"
        });
        createAppendElement("h3", {
            textContent: `${stepData.subtitle}`,
            appendTo: widgetSubtitle
        });
        let widgetSchedule = createAppendElement("div", {
            className: "widget-schedule"
        });
        let matchCounter = 1;
        for (let i = 0; i < stepData.matches.length; i++) {
            let match = stepData.matches[i];
            if (match.hasOwnProperty("separator")) {
                let widgetDateSeparator = createAppendElement("div", {
                    className: "widget-date-separator text-center text-white bg-dark-gray"
                });
                createAppendElement("h4", {
                    textContent: match.separator,
                    appendTo: widgetDateSeparator
                });
                widgetSchedule.append(widgetDateSeparator);
                matchCounter = 1;
            }
            let widgetMatchResult = createAppendElement("div", {
                className: "widget-match-result d-flex justify-content-between align-items-center"
            });
            if (matchCounter % 2 === 0) {
                widgetMatchResult.className += " even";
            }
            let widgetMatchResultDetail = createAppendElement("div", {
                className: "widget-match-result-detail d-flex justify-content-between",
                appendTo: widgetMatchResult
            });
            let widgetDetailIcon = createAppendElement("a", {
                attributes: {
                    "href": "#"
                }
            });
            widgetDetailIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17"
                                                        viewBox="0 0 24 24">
                                                        <g fill="none" fill-rule="evenodd">
                                                            <g fill="#90a4ae ">
                                                                <g>
                                                                    <g>
                                                                        <path
                                                                            d="M11.1 7.5h1.8v1.8h-1.8V7.5zm0 3.6h1.8v5.4h-1.8v-5.4zM12 3c-4.968 0-9 4.032-9 9s4.032 9 9 9 9-4.032 9-9-4.032-9-9-9zm0 16.2c-3.969 0-7.2-3.231-7.2-7.2 0-3.969 3.231-7.2 7.2-7.2 3.969 0 7.2 3.231 7.2 7.2 0 3.969-3.231 7.2-7.2 7.2z"
                                                                            transform="translate(-469 -364) translate(413 355) translate(56 9)" />
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </svg>`;
            widgetMatchResultDetail.append(widgetDetailIcon);
            if (match.detail === false) {
                createAppendElement("a", {
                    attributes: {
                        "href": "#"
                    }
                });
            }
            let widgetMatchResultTeams = createAppendElement("a", {
                className: "widget-match-result-teams d-flex justify-content-center w-75",
                attributes: {
                    "href": "#"
                }
            });
            createAppendElement("span", {
                className: "widget-match-host text-end",
                textContent: match.host,
                appendTo: widgetMatchResultTeams
            });
            let widgetMatchGoals = createAppendElement("div", {
                className: "widget-match-goals d-flex justify-content-around"
            });
            createAppendElement("span", {
                className: "host",
                textContent: match.hostScore || "",
                appendTo: widgetMatchGoals
            });
            createAppendElement("span", {
                textContent: "-",
                appendTo: widgetMatchGoals
            });
            createAppendElement("span", {
                className: "guest",
                textContent: match.guestScore || "",
                appendTo: widgetMatchGoals
            });
            widgetMatchResultTeams.append(widgetMatchGoals);
            createAppendElement("span", {
                className: "widget-match-guest",
                textContent: match.guest,
                appendTo: widgetMatchResultTeams
            });
            widgetMatchResult.append(widgetMatchResultTeams);
            let widgetMatchResultTime = createAppendElement("div", {
                className: "widget-match-result-time d-flex justify-content-end"
            });
            if (match.hasOwnProperty("time")) {
                createAppendElement("span", {
                    className: "match-time",
                    textContent: match.time,
                    appendTo: widgetMatchResultTime
                });
                createAppendElement("span", {
                    className: "match-status",
                    appendTo: widgetMatchResultTime
                });
            } else if (match.play === true) {
                let widgetPlayIcon = createAppendElement("a", {
                    attributes: {
                        "href": "#"
                    }
                });
                widgetPlayIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24">
                                                <g fill="none" fill-rule="evenodd">
                                                    <g fill="#0097a7">
                                                        <g>
                                                            <g>
                                                                <path d="M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9zM9.75 7.5v8.438l6.75-4.22L9.75 7.5z" transform="translate(-469 -311) translate(413 302) translate(56 9)"/>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>`;
                widgetMatchResultTime.append(widgetPlayIcon);
            }
            widgetMatchResult.append(widgetMatchResultTime);
            widgetSchedule.append(widgetMatchResult);
            tabpane.append(widgetSubtitle);
            matchCounter++;
        }
        tabpane.append(widgetSchedule);
        let footer = createAppendElement("div", {
            className: "widget-footer widget-footer-nations-cup rounded-bottom-1 text-center"
        });
        createAppendElement("a", {
            className: "d-inline-block fs-6 fw-bold text-black",
            attributes: {
                "href": "#"
            },
            textContent: `${nationsCup[key].footer}`,
            appendTo: footer
        });
        tabpane.append(footer);
    }
}

loadNationsCupData();

// go top button

let goTopBtn = document.getElementById("gotop");

window.onscroll = function () { scrollDown() };

function scrollDown() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        goTopBtn.classList.add("show-go-top");
    } else {
        goTopBtn.classList.remove("show-go-top");
    }
}

function goTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}