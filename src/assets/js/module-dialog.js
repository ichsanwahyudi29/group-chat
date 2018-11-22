var dialogModule = (function() {
    return {
        renderDialog: function(newParam) {
            var param = {
                title: '',
                children: '',
                close: true,
                btnPrimaryDisabled: false,
                btnTextPrimary: 'Continue',
                btnTextSecondary: 'Cancel',
                init: () => {},
                handleClickPrimary: () => {},
                handleClickSecondary: handleDialogClose,
                action: '#',
            }

            // Override default value
            param = $.extend(param, newParam);

            var templateDialog = 
                `<div class="unf-user-dialog__content d-inline">
                <div class="unf-user-dialog__title">${param.title}</div>
                ${param.close ? '<span class="unf-user-dialog__close"></span>' : ''}
                <div class="unf-user-dialog__body">${param.children.html()}</div> 
                <div class="unf-user-dialog__action pl-32 pr-32">
                    <button class="unf-user-btn unf-user-btn--medium unf-user-btn--secondary unf-user-btn--dialog">
                        ${param.btnTextSecondary}
                    </button>
                    <button class="unf-user-btn unf-user-btn--medium unf-user-btn--primary unf-user-btn--dialog"
                        ${param.btnPrimaryDisabled && 'disabled'}>
                        ${param.btnTextPrimary}
                    </button>
                </div>
                </div>`;
                
            handleDialogOpen('.js__template-dialog', function() {
                $('.js__template-dialog')
                    .off()
                    .html(templateDialog)
                    .on('click', '.unf-user-btn--secondary, .unf-user-dialog__close', function() {
                        param.handleClickSecondary();
                    })
                    .on('click', '.unf-user-btn--primary', function() {
                        param.handleClickPrimary();
                    });

                param.init();
            });
        }
    }
})();