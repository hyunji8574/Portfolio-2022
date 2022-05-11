


/**
 * 
 * 문서 로드
 * 
 */

window.onload = function () {

    // Elements
    var $intro = document.getElementById("intro"),
        $about = document.getElementById("about"),
        $skills = document.getElementById("skills"),
        $projects = document.getElementById("projects"),
        $others = document.getElementById("others"),
        $outro = document.getElementById("outro"),

        $btn_lnb = document.querySelector(".btn-lnb"),
        $btn_scroll_down = document.querySelector(".btn-scroll-down"),
        $lnb = document.querySelector(".lnb");

    var $sections = document.querySelectorAll(".section"),
        $about_list_li = document.querySelectorAll(".about-list li");

    var windowHeight = window.outerHeight,
        windowHalfHeight = windowHeight / 2;

    // 윈도우 사이즈 갱신
    window.addEventListener("resize", function () {
        windowHeight = window.outerHeight;
        windowHalfHeight = windowHeight / 2;
    });


    console.log("Document Ready!" + "\n" + "Hyunji's web portfolio, Made with ♡");

    /**
     * 
     * 윈도우 스크롤 이벤트
     * 
     */
    // 왼쪽상단 메뉴바 색 변경
    var btnLnb = function (e) {
        if (e >= $intro.offsetTop
            && e <= $intro.offsetTop + $intro.offsetHeight
            || $lnb.classList.contains("on")) {
            if (!$btn_lnb.classList.contains("black")) $btn_lnb.classList.add("black");
        } else {
            $btn_lnb.classList.remove("black");
        }
    }

    window.addEventListener("scroll", function () {
        // console.log("window.scrollY");

        // 왼쪽상단 메뉴바 색 변경
        btnLnb(window.scrollY);
    });

    /**
     * 
     * 스크롤 애니메이션
     * Made with Scroll Magic
     * 
     */
    var scrollMagic = new ScrollMagic.Controller();

    // 메뉴 클릭시 각 앵커로 슬라이드
    scrollMagic.scrollTo(function (target) {
        TweenMax.to(window, 1, {
            scrollTo: { y: target }
        });
    });

    // 메뉴 클릭 이벤트
    $lnb.addEventListener("click", function (e) {
        var targetAnchor = e.target.hash;
        var targetClass = e.target.classList;
        scrollMagic.scrollTo(targetAnchor);
        e.preventDefault();
    });

    // 각 섹션 타이틀 페이드 인
    $sections.forEach(e => {
        var section_title_anim = TweenMax.fromTo(e.querySelector(".section-title"), {
            opacity: 0,
            y: 100
        }, {
            opacity: 1,
            y: 0
        });

        var section_scene = new ScrollMagic.Scene({
            triggerElement: e
        })
            .setTween(section_title_anim)
            .duration(500)
            .addTo(scrollMagic);
    });

    // 인트로 영역 애니메이션
    var intro_scene = new ScrollMagic.Scene({
        triggerElement: "#intro",
        offset: $intro.offsetHeight / 2
    })
        .setClassToggle(".building", "anim")
        .addTo(scrollMagic);


    // 어바웃 영역 애니메이션
    var about_scene = new ScrollMagic.Scene({
        triggerElement: "#about",
        triggerHook: 0
    })
        .setPin("#about .moon-big")
        .duration(3200)
        .addTo(scrollMagic);

    var about_anim_moon = TweenMax.to("#about .moon-big", {
        y: -200
    });

    var about_scene_moon = new ScrollMagic.Scene({
        triggerElement: "#about",
        triggerHook: 0
    })
        .setTween(about_anim_moon)
        .duration(3200)
        .addTo(scrollMagic);


    $about_list_li.forEach(e => {
        var about_anim_text = TweenMax.fromTo(e, {
            opacity: 0,
        }, {
            opacity: 1,
        });

        var about_scene_text = new ScrollMagic.Scene({
            triggerElement: e,
            offset: -200
        })
            .setTween(about_anim_text)
            .duration(400)
            .addTo(scrollMagic)
    });

    // 스킬 영역 애니메이션
    var skills_anim = TweenMax.staggerTo(".skills-list li", 0, {
        className: "+=anim"
    }, 0.3);

    var skills_scene = new ScrollMagic.Scene({
        triggerElement: "#projects",
        triggerHook: 1
    })
        .setTween(skills_anim)
        .addTo(scrollMagic);

    // 아웃트로 영역 애니메이션
    var outro_anim = TweenMax.fromTo("#outro .contents", 1, {
        opacity: 0,
        y: 100
    }, {
        opacity: 1,
        y: 0
    });

    var outro_scene = new ScrollMagic.Scene({
        triggerElement: "#outro",
        triggerHook: 0.1
        })
        .setTween(outro_anim)
        .addTo(scrollMagic);

    /**
     * 
     * 클릭 이벤트
     * 
     */

    // 아래로 내려가기 버튼 이벤트
    $btn_scroll_down.addEventListener("click", function (e) {
        window.scrollTo({ top: $intro.offsetTop, left: 0, behavior: "smooth" });
        e.preventDefault();
    }, false);

    // 사이드메뉴 토글
    $btn_lnb.addEventListener("click", function (e) {
        $lnb.classList.toggle("on");
        btnLnb();
        e.preventDefault();
    }, false);

    /**
     * 
     * 프로젝트 팝업창 관련 코드
     * 
     */

    var $project_list_icon = document.querySelectorAll(".project-list-icon"),
        $project_list_title = document.querySelectorAll(".project-list-title"),
        $btn_esc = document.querySelector(".btn-esc"),
        $btn_esc_white = document.querySelector(".btn-esc-white"),
        $project_popup = document.querySelector(".project-popup");

    var $project_item = document.querySelectorAll(".project-item");

    // 프로젝트 팝업창 토글
    $project_list_icon.forEach(icon => {
        icon.addEventListener("click", function (e) {
            var target = e.target.parentElement;
            setPopup(target);
            $project_popup.classList.add("on");
            e.preventDefault();
        });
    });

    $project_list_title.forEach(title => {
        title.addEventListener("click", function (e) {
            var target = e.target.parentElement;
            setPopup(target);
            $project_popup.classList.add("on");
            e.preventDefault();
        });
    });

    $btn_esc.addEventListener("click", function (e) {
        $project_popup.classList.remove("on");
        e.preventDefault();
    });
    
    $btn_esc_white.addEventListener("click", function (e) {
        $project_popup.classList.remove("on");
        e.preventDefault();
    });

    /**
    * 
    * 프로젝트 팝업 생성
    * 
    */
    function setPopup(targetElement) {
        var data = [
            "data-title", "data-time", "data-cont", "data-tags", "data-text"
        ];

        data.forEach(e => {
            var attr = targetElement.getAttribute(e);
            var popUp = $project_popup.querySelector("." + e);
            if (popUp != null) {
                popUp.innerHTML = attr;
            }
        });
        if (targetElement.getAttribute("data-color") != null) {
            var color = targetElement.getAttribute("data-color");
            $project_popup.querySelector(".data-title").style.color = color;
            var a = $project_popup.querySelector(".btn-go-site a");
            a.style.borderColor = color;
            a.addEventListener("mouseover", function () {
                a.style.backgroundColor = color;
            });
            a.addEventListener("mouseleave", function () {
                a.style.backgroundColor = "#fff";
            });
        }
        if (targetElement.getAttribute("data-img") != null) {
            var src = targetElement.getAttribute("data-img");
            $project_popup.querySelector(".data-img").setAttribute("src", src);
        }
        if (targetElement.getAttribute("data-url") != null) {
            var url = targetElement.getAttribute("data-url");
            $project_popup.querySelector(".btn-go-site a").setAttribute("href", url);
        }
    }
}