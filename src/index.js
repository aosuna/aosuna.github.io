// active scrolling
$(document).ready(function () {
    $(document).on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top - 50
        }, 500);
    });

    // Change the active navbar item on scroll
    let sections = $('.section-itedm'),
        nav = $('.navbar'),
        nav_height = nav.outerHeight();

    $(window).on('scroll', function () {
        let cur_pos = $(this).scrollTop();
        sections.each(function () {
            let top = $(this).offset().top - nav_height,
                bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                nav.find('a').parent().removeClass('active');
                nav.find('a[href="#' + $(this).attr('id') + '"]').parent().addClass('active');
            }
        });
    });

    $('#name').on("focusout", function () {
        console.log($("#name").val());
        if ($('#name').val().length > 2) {
            $('#name').parent('div').addClass('has-success has-feedback');
            $('#name').parent('div').removeClass('has-error has-feedback');
        } else {
            $('#name').parent('div').addClass('has-error has-feedback');
            $('#name').parent('div').removeClass('has-success has-feedback');
        }
    })

    $('#email').on("focusout", function () {
        console.log($("#email").val());
        if ($('#email').val().length > 2) {
            $('#email').parent('div').addClass('has-success has-feedback');
            $('#email').parent('div').removeClass('has-error has-feedback');
        } else {
            $('#email').parent('div').addClass('has-error has-feedback');
            $('#email').parent('div').removeClass('has-success has-feedback');
        }
    })

    $('#comment').on("focusout", function () {
        console.log($("#comment").val());
        if ($('#comment').val().length > 2) {
            $('#comment').parent('div').addClass('has-success has-feedback');
            $('#comment').parent('div').removeClass('has-error has-feedback');
        } else {
            $('#comment').parent('div').addClass('has-error has-feedback');
            $('#comment').parent('div').removeClass('has-success has-feedback');
        }
    })


    $("#send-email").on("click", function () {
        let div = $("form").find("div");
        let hasError = false;
        for (let i = 0; i < div.length; i++) {
            if (div[i].classList.contains('has-error')) {
                hasError = true
            }
        }
        if (!hasError) {
            $('#send-email').on('click', function () {
                sendEmail();
            });
        } else {
            console.log("cannot submit empty form");
        }
    })
});

function sendEmail() {
    let yesOpen = confirm("Opening your default Email client would you still like to continue?");
    if (yesOpen === true) {
        $(location).attr('href', "mailto:osuna.9@gmail.com" +
            "&subject=" + encodeURIComponent("Hi, I'm " + $("#name") + " reaching out to you via your website.") +
            "&body=" + encodeURIComponent($("#comment").val())
        );
    }
}

function checkSubmit() {

    let exist = div
        .map(isTrue => $(isTrue).attr('has-success') ? true : false)
        .filter(isFalse => isFalse === false);
    console.log(exist);
    return exist.length === 0 ? true : false;
}