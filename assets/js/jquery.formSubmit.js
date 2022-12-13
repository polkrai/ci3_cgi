/*
 * jQuery FormSubmit: Effortless AJAX-based form submission
 *
 * Copyright Cory LaViska for A Beautiful Site, LLC
 *
 * Licensed under the MIT license: http://opensource.org/licenses/MIT
 *
 */

if(jQuery) (function($) {

    // Default settings
    $.formSubmit = {
        defaults: {
            before: null,
            success: null,
            error: null,
            expired: null,
            hideInvalid: null,
            showInvalid: null,
            feedbackSuccessClass: '',
            feedbackErrorClass: ''
        }
    };

    $.extend($.fn, {

        formSubmit: function(method, data) {

            switch(method) {

                // Aborts a pending request
                case 'abort':
                    $(this).each( function() {
                        var form = $(this),
                            xhr = form.data('formSubmit-xhr');
                        if( xhr ) xhr.abort();
                    });
                    return $(this);

                // Getter/setter for the form's busy state
                case 'busy':
                    if( data === undefined ) return $(this).hasClass('formSubmit-busy');
                    $(this).each( function() {
                        var form = $(this);
                        form.toggleClass('formSubmit-busy', data === true);
                    });
                    return $(this);

                // Releases the form back to its original form and behavior
                case 'destroy':
                    $(this).each( function() {
                        var form = $(this);
                        form
                            .formSubmit('abort')
                            .formSubmit('reset')
                            .removeData('formSubmit-data')
                            .off('.formSubmit');
                    });
                    return $(this);

                // Sets all the form control's disabled state
                case 'disabled':
                    $(this).each( function() {
                        var form = $(this);
                        form.find(':input').prop('disabled', data);
                    });
                    return $(this);

                // Programmatically show feedback
                case 'hide-feedback':
                    $(this).each( function() {
                        var form = $(this);
                        hideFeedback(form);
                    });
                    return $(this);

                // Resets the form, clears invalids, and hides feedback
                case 'reset':
                    $(this).each( function() {
                        var form = $(this);
                        hideInvalid(form);
                        hideFeedback(form);
                        form.get(0).reset();
                    });
                    return $(this);

                // Programmatically show feedback
                case 'show-feedback':
                    $(this).each( function() {
                        var form = $(this);
                        showFeedback(form, data.status, data.feedback);
                    });
                    return $(this);

                // Initializes the form
                default:
                    if( method !== 'create' ) data = method;

                    data = $.extend(true, {}, $.formSubmit.defaults, data);

                    $(this).each( function() {

                        var form = $(this),
                            xhr = null;

                        hideFeedback(form);

                        form
                            .data('formSubmit-data', data)
                            .on('submit.formSubmit', function(event) {

                                event.preventDefault();

                                // Don't submit if already busy
                                if( form.formSubmit('busy') ) return;

                                // Clear invalids and feedback
                                hideInvalid(form);
                                hideFeedback(form);

                                // Handle before callback
                                if( data.before ) {
                                    // You can cancel the submission by returning false in this callback
                                    if( data.before.call(form) === false ) return;
                                }

                                // Submit it
                                xhr = $.ajax({
                                    url: form.attr('action'),
                                    type: form.attr('method'),
                                    data: form.serialize(),
                                    dataType: 'json',
                                    beforeSend: function() {
                                        form.formSubmit('busy', true);
                                    }
                                })
                                .fail(function(jqXHR, textStatus, errorThrown) {
                                    // Handle AJAX errors
                                    if( data.ajaxError ) data.ajaxError.call(form, textStatus, errorThrown);
                                })
                                .always(function(response) {
                                    // Update form
                                    form
                                        .removeData('formSubmit-xhr')
                                        .formSubmit('busy', false);

                                    // Show form field invalid
                                    showInvalid(form, response.invalid);

                                    // Show feedback
                                    showFeedback(form, response.status, response.feedback);

                                    // Callbacks
                                    if( response.status === 'success' && data.success ) data.success.call(form, response.data);
                                    if( response.status === 'error' && data.error ) data.error.call(form, response.data);
                                    if( response.status === 'expired' && data.expired ) data.expired.call(form, response.data);
                                });

                                // Remember request
                                form.data('formSubmit-xhr', xhr);

                        });

                    });

                    return $(this);

            }

            // Hides all form field errors and triggers the hideInvalid callback
            function hideInvalid(form) {
                var data = form.data('formSubmit-data');
                form.find('.formSubmit-invalid').each( function() {
                    $(this).removeClass('formSubmit-invalid');
                    if( data.hideInvalid ) data.hideInvalid.call(this);
                });
            }

            // Hides the feedback
            function hideFeedback(form) {
                var data = form.data('formSubmit-data');
                form.find('.formSubmit-feedback')
                    .hide()
                    .removeClass('formSubmit-error')
                    .removeClass('formSubmit-success')
                    .removeClass(data ? data.feedbackErrorClass : '')
                    .removeClass(data ? data.feedbackSuccessClass : '')
                    .html('');
            }

            // Shows form field errors and triggers the showError callback
            function showInvalid(form, invalid) {
                var i,
                    data = form.data('formSubmit-data') || $.formSubmit.defaults;

                function show() {
                    $(this).addClass('formSubmit-invalid');
                    if( data.showInvalid ) data.showInvalid.call(this);
                }

                if( invalid ) {
                    for( i in invalid ) {
                        form.find('[name=' + invalid[i] + ']').each(show);
                    }
                }
            }

            // Shows feedback
            function showFeedback(form, status, feedback) {
                var data = form.data('formSubmit-data') || $.formSubmit.defaults;
                if( feedback ) {
                    if( status === 'success' ) {
                        form.find('.formSubmit-feedback')
                            .addClass('formSubmit-success')
                            .addClass(data.feedbackSuccessClass)
                            .html(feedback).show();
                    }
                    if( status === 'error' ) {
                        form.find('.formSubmit-feedback')
                            .addClass('formSubmit-error')
                            .addClass(data.feedbackErrorClass)
                            .html(feedback).show();
                    }
                }
            }

        }

    });

})(jQuery);