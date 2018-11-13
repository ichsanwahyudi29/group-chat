var dialogModule = (function() {
    var param = {
        title: '',
        children: '',
        close: true,
        btnTextPrimary: 'Cancel',
        btnTextSecondary: 'Continue',
        handleClickPrimary: () => {},
        handleClickSecondary: handleDialogClose,
        action: '#',
    }

    function renderChildren(children) {
        return children.html();
    }

    return {
        renderDialog: function(newParam) {
            // Override default value
            param = $.extend(param, newParam);

            var templateDialog = 
                `<form action=${param.action}>
                <div class="unf-user-dialog__content d-inline">
                <div class="unf-user-dialog__title">${param.title}</div>
                ${param.close ? '<span class="unf-user-dialog__close" onclick="handleDialogClose()"></span>' : ''}
                <div class="unf-user-dialog__body">${renderChildren(param.children)}</div> 
                <div class="unf-user-dialog__action pl-32 pr-32">
                    <button class="unf-user-btn unf-user-btn--medium unf-user-btn--secondary unf-user-btn--dialog">
                        ${param.btnTextSecondary}
                    </button>
                    <button class="nf-user-btn unf-user-btn--medium unf-user-btn--primary unf-user-btn--dialog">
                        ${param.btnTextPrimary}
                    </button>
                </div>
                </div>
                </form>`;
                
            handleDialogOpen('.js__template-dialog', function() {
                $('.js__template-dialog')
                    .html(templateDialog)
                    .off('click', '.unf-user-btn--secondary')
                    .on('click', '.unf-user-btn--secondary', function() {
                        param.handleClickSecondary();
                    })
                    .off('click', '.unf-user-btn--primary')
                    .on('click', '.unf-user-btn--primary', function() {
                        param.handleClickPrimary();
                    });                
            });
        }
    }
})();