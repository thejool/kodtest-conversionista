// Handles all the navigation between the different steps
const navigation = (() => {
    const $body         = $('body');
    const baseClassJS   = 'js-navigation';
    const baseClassCSS  = 'navigation';

    // All classes used to target elements
    const CLASSES = {
      content:              `${baseClassJS}__content`,
      contentCurrent:       `${baseClassJS}__content--current`,
      step:                 `${baseClassJS}__step`,
      stepContent:          `${baseClassCSS}__step__content`,
      stepContentDone:      `${baseClassCSS}__step__content--done`,
      stepContentCurrent:   `${baseClassCSS}__step__content--current`,
      toggle:               `${baseClassJS}__toggle-step`
    };

    function toggleStep($this) {
        // Content navigation
        const target = $this.data('step-target');

        // Hides current step
        $(`.${CLASSES.content}`).removeClass('visible');
        $(`.${CLASSES.content}`).addClass('hidden');
        $(`.${CLASSES.contentCurrent}`).removeClass(`${CLASSES.contentCurrent}`);

        // Displays next step
        $(`.${CLASSES.content}[data-stepnumber='${target}']`).removeClass('hidden');
        $(`.${CLASSES.content}[data-stepnumber='${target}']`).addClass('visible');
        $(`.${CLASSES.content}[data-stepnumber='${target}']`).addClass(`${CLASSES.contentCurrent}`);

        // Wizard navigation
        $(`.${CLASSES.step} .${CLASSES.stepContent}`).removeClass(`${CLASSES.stepContentDone} ${CLASSES.stepContentCurrent}`);

        for(var i = 0; i < target; i++){
            $(`.${CLASSES.step}[data-stepnumber='${i}'] .${CLASSES.stepContent}`).addClass(`${CLASSES.stepContentDone}`);
        }

        $(`.${CLASSES.step}[data-stepnumber='${target}'] .${CLASSES.stepContent}`).addClass(`${CLASSES.stepContentCurrent}`);
        
    }
    
    $body.on('click', `.${CLASSES.toggle}`, function(e) {
        e.preventDefault();
        // validateForm().init;
        toggleStep($(this));
    }); 
})();



// Update content
const updateContent = (() => {
    const $body     = $('body');
    const baseClass = 'js-update-content';

    // All classes used to target elements
    const CLASSES = {
      trigger: `${baseClass}__trigger`,
      target: `${baseClass}__target`,
      hidden: `${baseClass}__hidden`,
    };
    
    function update($this) {
        const target        = $this.data('update-target');
        const show = $this.data('update-show-content');
        let val;

        if($this.is('select')){
            val = $($this).find('option:selected').text();
        } else {
            val = $($this).val();
        }

        if(show == true){
            $(`.${CLASSES.target}[data-update-name='${target}']`).parents(`.${CLASSES.hidden}`).removeClass(`${CLASSES.hidden}`);
            $(`.${CLASSES.target}[data-update-name='${target}']`).text(val);
        } else {
            $(`.${CLASSES.target}[data-update-name='${target}']`).text(val);
        }

    };

    $body.on('change', `.${CLASSES.trigger}`, function(e) {
        update($(this));
        e.preventDefault();
    }); 
})();



// Summary
const profileSummary = (() => {
    const $body     = $('body');
    const summaryClass = 'js-summary';
    const uspClass = 'js-usps';

    // All classes used to target elements
    const CLASSES = {
      summaryTarget: `${summaryClass}__target-area`,
      summaryContent: `${summaryClass}__content`,
      uspTarget: `${uspClass}__target-area`,
      uspContent: `${uspClass}__content`,
    };

    function updateSummary(){
        const summaryContent = $(`.${CLASSES.summaryContent}`).html();
        const uspContent = $(`.${CLASSES.uspContent}`).html();

        if ($(window).width() < 768) {
            $(`.${CLASSES.summaryTarget}`).html(summaryContent);
            $(`.${CLASSES.uspTarget}`).html(uspContent);
        }
        else {
            console.log('More than 768');
        }
    }


    $(window).on('resize load', function(e) {
        updateSummary();
    }); 
})();

const conditions = (() => {
    $('.js-conditions__trigger').on('click', function(e){
        e.preventDefault();
        $('.js-conditions__content').toggleClass('js-conditions__content--open');
    });
})();



// Validate form
/*
const validateForm = (() => {
    const $body     = $('body');
    const baseClass = 'js-form';
    const navigationClass = 'js-navigation';

    // All classes used to target elements
    const CLASSES = {
      step: `${baseClass}__step`,
      input: `${baseClass}__input`,
      navigationCurrent: `${navigationClass}__content--current`,
    };

    // Validates text fields
    function validateField(value){
        if(value != '')
            return true;    
    };

    // Validates email format
    function validateEmail(email){
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    };

    // Makes sure that the social security number is submitted in the right format
    function validateSocialSecurity(socialSecurityNumber){
        var regex = /^([0-6]\d{2}|7[0-6]\d|77[0-2])([ \-]?)(\d{2})\2(\d{4})$/;
        if (!regex.test(socialSecurityNumber)) {
            return false;
        }
        var temp = socialSecurityNumber;
        if (socialSecurityNumber.indexOf("-") != -1) {
            temp = (socialSecurityNumber.split("-")).join("");
        }
        if (socialSecurityNumber.indexOf(" ") != -1) {
            temp = (socialSecurityNumber.split(" ")).join("");
        }
        if (temp.substring(0, 3) == "000") {
            return false;
        }
        if (temp.substring(3, 5) == "00") {
            return false;
        }
        if (temp.substring(5, 9) == "0000") {
            return false;
        }
        return true;
    };

    // Validates email phone
    function validatePhone(phone){
        var regex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
        return regex.test(phone);
    };


    function validateStep(){
        let validated = false;
        
        $(`.${CLASSES.navigationCurrent} .${CLASSES.input}`).each(function(){
            console.log($(this).attr('type'));
            if($(this).is('select')){
                console.log('select');
            } else {
                switch ($(this).attr('type')){
                    case "email":
                        validated = validateEmail($(this).val());
                    break;
                    case "phone":
                        validated = validatePhone($(this).val());
                    break;
                    case "number":
                        validated = validateSocialSecurity($(this).val());
                    break;
                    default:
                        // validated = validateField($(this).val());
                    break;
                }   
            }
        });

        return validated;
    };

    return {
        init: validateStep()
    }
});
*/