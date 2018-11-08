var dialogModule = (function() {
    var param = {
        title: '',
        children: null,
        close: true,
        btnTextPrimary: 'Cancel',
        btnTextSecondary: 'Continue',
        handleClickPrimary: null,
        handleClickSecondary: handleDialogClose
    }

    function renderChildren(children) {
        return children.html();
    }

    return {
        renderDialog: function(newParam) {
            // Override default value
            param = $.extend(param, newParam);

            var templateDialog = 
                `<div class="unf-user-dialog__content d-inline">
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
                </div>`;
                
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

function deleteTemplateChatDialog() {
    dialogModule.renderDialog({
        title: 'Delete Template Chat',
        children: $('.js__child-dialog-delete-template-chat'),
        close: false,
        btnTextPrimary: 'Yes, Delete',
        handleClickPrimary: function() {handleDialogClose();}
    });
}

function autoSendActivationDialog() {
    dialogModule.renderDialog({
        title: 'Auto-Send Activation',
        children: $('.js__child-dialog-auto-send-template-chat'),
        close: true,
        btnTextPrimary: 'Save',
        handleClickPrimary: function() {handleDialogClose();}
    });
}