var running = false
var collapsed = false
var active = null
var dropped = false
var project = 1


var lang = {"#babout": ["About Me", "O Mnie"],
            "#bproj": ["Projects", "Projekty"],
            "#bedu": ["Education", "Edukacja"],
            "#bcon": ["Contact", "Kontakt"],
            "#dropdown div:nth-child(1)": ["About Me", "O Mnie"],
            "#dropdown div:nth-child(2)": ["Projects", "Projekty"],
            "#dropdown div:nth-child(3)": ["Education", "Edukacja"],
            "#dropdown div:nth-child(4)": ["Contact", "Kontakt"],
            "#aleft span": ["About Me", "O Mnie"],
            "#aleft p": ["I am a 19-year-old graduate of a technical high school with a specialization in computer science. I will begin part-time higher education in the same field after the summer. Currently, I'm looking for a full-time job as a data scientist or in a similar role. I have taken part in two month-long internships in PC repair stores as a part of my education. Outside of programming, my hobbies include basketball and cooking.",
            "Jestem 19-letnim absolwentem technikum o profilu informatycznym. Po wakacjach zamierzam rozpocząć zaoczne studia na tym samym kierunku. Obecnie poszukuję pracy jako data scientist lub na podobnym stanowisku. W ramach mojej edukacji brałem udział w dwóch miesięcznych praktykach w serwisach komputerowych. Poza programowaniem interesuję się koszykówką i gotowaniem."],
            "#aright span": ["Skills", "Umiejętności"],
            "#aright ul": ["<li>Python</li><li>Use of Pandas, Numpy, Plotly, and Scikit-learn libraries</li><li>Proficiency in R and SQL programming languages</li><li>HTML, CSS and JavaScript</li><li>Data analysis and machine learning</li><li>Knowledge of computer networks and PC architecture</li><li>Git version control</li><li>Microsoft Office</li>",
            "<li>Python</li><li>Stosowanie bibliotek Pandas, Numpy, Plotly i Scikit-learn</li><li>Znajomość języków programowania SQL oraz R</li><li>HTML, CSS i JavaScript</li><li>Analiza danych i uczenie maszynowe</li><li>Wiedza w zakresie sieci komputerowych i architektury komputera</li><li>Kontrola wersji Git</li><li>Microsoft Office</li>"],
            "#proj div:nth-child(2) h1": ["NBA.com Web Scraper", "Web Scraper NBA.com"],
            "#proj div:nth-child(2) p": ["A Python package designed to collect basketball data across 63 categories, with coverage extending back to the 1946 season. This web scraper allows users to access data already in box score format as well as create custom box scores from stats available only as averages. With advanced filtering options, you can refine queries to access specific data. This project comes with detailed documentation. Data (since the 1996-97 season) is available for download on my Kaggle profile.",
            "Moduł Python służący do zbierania danych z NBA.com w 63 kategoriach, od sezonu 1946-47. Ten web scraper pozwala użytkownikom na zbieranie danych w formacie boxscore, a także na tworzenie niestandardowych boxscore'ów z danych dostępnych jedynie jako średnie. Dzięki zaawansowanym opcjom filtrowania można precyzyjnie dostosować zapytania, aby uzyskać konkretne statystyki. Projekt zawiera szczegółową dokumentację. Dane (od sezonu 1996-97) są dostępne do pobrania na moim profilu na Kaggle."],
            "#proj div:nth-child(3) h1": ["Interactive plotly visualizations", "Interaktywne wizualizacje w plotly"],
            "#proj div:nth-child(3) p": ["The first visualization is an interactive graph plotting players' headshots based on their field goal attempts and field goal percentage for a given shot. Shot types can be selected using buttons, enabling easy comparison of player skill at these shots.<br /><br />The second visualization is an interactive plot of all players' shots with generated hot zones based on player efficiency. Users can select from 100 players using a dropdown menu to see how their favorite player shoots in different locations.",
            "Pierwsza wizualizacja to interaktywny wykres rozmieszczający zdjęcia graczy na podstawie ilości oraz celności rzutów z gry dla danego typu rzutu. Rodzaje rzutów można wybierać za pomocą przycisków, co umożliwia łatwe porównanie umiejętności graczy.<br /><br />Druga wizualizacja to interaktywny wykres przedstawiający wszystkie rzuty zawodników wraz z wygenerowanymi hotzonami. Użytkownik może wybierać spośród 100 graczy za pomocą rozwijanego menu, aby zobaczyć, jak w poszczególnych miejscach rzuca ich ulubiony zawodnik."],
            "#firstB": ["Shots", "Pierwsza"],
            "#secondB": ["Hotzones", "Druga"],
            "#proj div:nth-child(4) h1": ["Positionless basketball analysis", "Analiza zaniku pozycji w koszykówce"],
            "#proj div:nth-child(4) p": ["Data analysis focused on finding the trend of basketball becoming more positionless. Covering data from 1996 to the present. Analyzing changes in players' physical attributes, stats, advanced metrics, and the distribution of leaders' positions. Then feeding that data into a machine learning algorithm to see if it's harder today to predict player positions.",
            "Analiza danych starająca się znaleźć trend zanikania tradycyjnych pozycji w koszykówce. Obejmuje ona dane od sezonu 1996-97 do dziś. Analizowane są zmiany w fizycznych predyspozycjach graczy, podstawowych i zaawansowanych statystykach, oraz udział pozycji w rankingach liderów. Następnie dane są wprowadzane do algorytmów uczenia maszynowego, aby sprawdzić, czy obecnie trudniej jest przewidzieć pozycje graczy."],
            "#edu h2:nth-of-type(1) span": ["Education", "Edukacja"],
            "#edu h2:nth-of-type(2) span": ["Courses", "Kursy"],
            "#edugroup .card:nth-child(1) .cardTitle": ["Computer Science", "Informatyka"],
            "#edugroup .card:nth-child(1) .cardDesc": ["Electronics Technical High School No. 1 in Warsaw", "Technikum Elektroniczne nr 1. w Warszawie"],
            "#coursegroup .card:nth-child(2) .cardDesc": ["University of Michigan - Coursera", "Uniwersytet Michigan - Coursera"],
            "#linkspan span": ["Links", "Linki"],
            "#formspan span": ["Contact Form", "Formularz kontaktowy"],
            '#nameIn span': ['Name:', 'Imie:'],
            "#textIn span": ["Message:", "Wiadomość:"],
            "#buttonIn": ["Send", "Wyślij"]
            }


function changeLang(l){
    for (const [key, val] of Object.entries(lang)){
        $(key).html(val[l])
    }
}

function run(){
    running = true
    setTimeout(() => {
        running = false
    }, 2000)
}

function collapse(panel){
    if (running){
        return
    }

    run()

    collapsed = true

    if ($(window).width() >= 850){
        wideCollapse()
    }else{
        narrowCollapse()
    }

    showPanel(panel)
}


function wideCollapse(){
    $("#opener").animate({height: "10vh", backgroundColor: "#0F2C59"}, duration=2000)
    $("#title").animate({height: "9vh", width: "20vw", padding: "0 5vw", top: "0.5vh", fontSize: "20px"}, duration=2000)
    $("nav").animate({height: "8vh", width: "60vw", left: "30vw", top: "1vh"}, duration=2000)
    $("nav div").animate({fontSize: "18px"}, duration=2000)
}

function narrowCollapse(){
    $("#burger").css("display", "block")
    $("#opener").animate({height: "10vh", backgroundColor: "#0F2C59"}, duration=2000)
    $("#title").animate({height: "8vh", top: "1vh", fontSize: "20px"}, duration=2000)
    $("#title div:last-child").animate({paddingTop: "0"})
    $("nav").animate({opacity: "0", top: "0"}, duration=2000)
    $("#burger").animate({opacity: "1"}, duration=2000)
    setTimeout(() => {
        $("nav").css("display", "none")
    }, 2000)
}

function showPanel(panel){
    if (dropped){
        $("#dropdown").animate({top: "-80vh"}, duration=2000)
        dropped = false
    }

    if (active == panel){
        return
    }

    if (panel == "proj"){
        $("#guide").css({display: "flex"})
        $("#guide").animate({opacity: "1"}, duration=2000)
    } else{
        $("#guide").animate({opacity: "0"}, duration=2000)
        setTimeout(() => {
            $("#guide").css("display", "none")
        }, 2000)
    }

    if (active){
        $("#" + active).animate({top: "-90vh"}, duration=2000)
        $("#b" + active).toggleClass("active")
    }
    active = panel
    $("#b" + active).toggleClass("active")
    $("#" + active).css("top", "100vh")
    $("#" + active).animate({top: "10vh"}, duration=2000)
}

function burger(){
    if (running){
        return
    }

    run()

    if (dropped){
        $("#dropdown").animate({top: "-80vh"}, duration=2000)
        dropped = false
    } else{
        dropped = true
        $("#dropdown").animate({top: "10vh"}, duration=2000)
    }
}

function scrollProj(pro){
    if (running){
        return
    }

    run()
    $("#proj").animate({scrollTop: pro * (window.innerHeight * 0.9)}, duration=2000);
    pro += 1
    $(".guider:nth-child(" + project.toString() + ")").toggleClass("active")
    $(".guider:nth-child(" + pro.toString() + ")").toggleClass("active")
    project = pro
}

$(window).on("resize", function() {
    if (collapsed != true){
        return
    }
    if ($(window).width() >= 851){
        $("nav").css({height: "8vh", width: "60vw", left: "30vw", top: "1vh", display: "flex", opacity: "1"})
        $("#title").css({height: "9vh", width: "20vw", left: "5vw", top: "0.5vh", fontSize: "20px"})
        $("#burger").css("display", "none")
        $("#dropdown").css("top", "-90vh")
    } else{
        $("#title").css({height: "8vh", width: "90vw", top: "1vh", fontSize: "20px"})
        $("nav").css("display", "none")
        $("#burger").css({display: "block", opacity: "1"})
    }
})
