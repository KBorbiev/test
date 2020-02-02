'use strict';

document.addEventListener('DOMContentLoaded', function() {

    (function(){
        var $registration = document.querySelector('.registration');
        var test = document.querySelectorAll('.js-show-additional-question');
        var $user_have_children = document.querySelector('.js-user-have-children');
        if ($registration) {
            $user_have_children.addEventListener('change', show_Children_Age);
        }

        //Если есть дети, то спрашивем сколько мальчиков и девочек
        function show_Children_Age() {
            var $question_level_2 = this.parentNode.nextElementSibling;
            var $user_children = document.querySelectorAll('.js-user-children');
            if (this.value == 'Дети есть') {
                $question_level_2.classList.remove('hide');
            } else {
                $question_level_2.classList.add('hide');
                clear_Input_Children();
            }
        }
        function clear_Input_Children() {
            var $user_children = document.querySelectorAll('.js-user-children');
            for (var i = 0; i < $user_children.length; i++) {
                $user_children[i].value = '';
            }
        }

        //Показываю дополнительные вопросы
        for (var i = 0; i < test.length; i++) {
            test[i].addEventListener('change', show_And_Hide_Additional_Question);
        }
        function show_And_Hide_Additional_Question(){
            var $question_level_1 = this.nextElementSibling.childNodes[1];
            var $question_level_2 = this.nextElementSibling.childNodes[3];
            var $question_level_3 = this.nextElementSibling.childNodes[5];
            var select_value = this.value;
            switch(select_value) {
                //Семейное положения
                case ('Холост'):
                    $question_level_1.classList.add('hide');
                    $question_level_2.classList.add('hide');
                    clear_Input_Children();
                    break;
                case ('Женат'):
                    $question_level_1.classList.remove('hide');
                    break;
                case ('Разведен'):
                    $question_level_1.classList.remove('hide');
                    break;
                case ('Вдовец'):
                    $question_level_1.classList.remove('hide');
                    break;

                //Тип гемофилии
                case ('А'):
                    $question_level_1.classList.remove('hide');
                    break;
                case ('Б'):
                    $question_level_1.classList.remove('hide');
                    break;
                case ('Велибрант'):
                    $question_level_1.classList.remove('hide');
                    break;

                //Гепатит
                case ('Гепатит было'):
                    $question_level_1.classList.remove('hide');
                    $question_level_2.classList.add('hide');
                    break;
                case ('Гепатит не было'):
                    $question_level_1.classList.add('hide');
                    $question_level_2.classList.add('hide');
                    break;
                case ('Гепатит не знаю'):
                    $question_level_1.classList.add('hide');
                    $question_level_2.classList.remove('hide');
                    break;
                default:
                    // $question_level_1.classList.remove('hide');
            };
        };
    })();

    // STEP FORM
    (function(){
        var $form_next = document.querySelector('.js-show-next-form');
        var $form_prex = document.querySelector('.js-show-prev-form');
        var $first_form = document.querySelector('.registration__page-1');
        var $second_form = document.querySelector('.registration__page-2');
        if ($form_next) {
            $form_next.addEventListener('click', showNextForm);
        }
        if ($form_prex) {
            $form_prex.addEventListener('click', showPrevForm);
        }

        function showNextForm(event) {
            // event.preventDefault();
            $first_form.classList.add('hide');
            $second_form.classList.remove('hide');
        };
        function showPrevForm(event) {
            // event.preventDefault();
            $second_form.classList.add('hide');
            $first_form.classList.remove('hide');
        };
        
    })();

    // DATEPICKER AND MASK FOR INPUT
    $('.js-datepicker').datepicker([ { dateFormat: 'mm.dd.yyyy' } ])
    $('.js-mask-phone').mask('0000-00-00-00');
    $('.js-mask-children').mask('00');


    // jQuery - Мобильное меню
    var mobileMenu = (function() {
        var $trigger = $('.mobile-menu__arrow');
        var animationSpeed = 200;

        // Mobile menu
        $trigger.on('click', function() {
            toggleMenu($(this));
        });

        function toggleMenu(el) {
            var li = el.closest('li');

            el.toggleClass('is-active');
            li.toggleClass('is-active');

            li.children('ul').slideToggle(animationSpeed, function() {
                li.children('ul').toggleClass('is-opened');
            });
        }
    })();

    // Открытье и закрытье mobile-menu
    (function(){

        var $mobile_open = document.querySelector('.js-mobile-panel-open');
        var $mobile_close = document.querySelector('.js-mobile-panel-close');
        var $mobile_pane = document.querySelector('.js-mobile-panel');
        var $base = document.documentElement;

        $mobile_open.addEventListener('click', openPanel);
        $mobile_close.addEventListener('click', closePanel);

        function openPanel(){
            $mobile_pane.classList.add('is-opened');
            $base.style.overflow = 'hidden';
        };
        function closePanel(){
            $mobile_pane.classList.remove('is-opened');
            $base.style.overflow = '';
        };
    })();
});