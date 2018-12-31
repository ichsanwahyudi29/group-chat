// Delete official
function handleOpenDeleteOfficial(official_id){
    dialogModule.renderDialog({
        title: 'Delete Group',
        children: $('.js__child-dialog-delete-official'),
        close: false,
        styleClass: 'dialog--320',
        btnTextPrimary: 'Yes, Delete',
        handleClickPrimary: function () { handleDeleteOfficial(official_id) }
    });
}
function handleDeleteOfficial(official_id){
    dataOfficial.map((item, index) => {
        if(item.id === official_id){
            dataOfficial.splice(index, 1)
        }
    })
    handleDialogClose()
    loopDataOfficial()
}

// Delete item
function handleOpenDeleteItem(official_id, item_id){
    dialogModule.renderDialog({
        title: 'Delete Item',
        children: $('.js__child-dialog-delete-official-item'),
        close: false,
        styleClass: 'dialog--320',
        btnTextPrimary: 'Yes, Delete',
        handleClickPrimary: function () { handleDeleteOfficialItem(official_id, item_id) }
    });
}
function handleDeleteOfficialItem(official_id, item_id){
    dataOfficial.map(item => {
        if(item.id === official_id){
            item.items.map((data, index) => {
                if(data.id === item_id){
                    item.items.splice(index, 1)
                }
            })
        }
    })
    handleDialogClose()
    loopDataItem(official_id)
}

// item status
function handleOpenChangeStatusItem(e, item_id, official_id){
    if ($(e).prop('checked')) {
        dialogModule.renderDialog({
            title: 'Activate Item',
            children: $('.js__child-dialog-activate-official-item'),
            close: false,
            styleClass: 'dialog--320',
            btnTextPrimary: 'Yes, Activate',
            handleClickPrimary: () => { handleActivateOfficialItem(item_id, official_id) },
            handleClickSecondary: () => { handleCancelStatusOfficialItem(e) }
        });
    } else {
        dialogModule.renderDialog({
            title: 'Deactivate Item',
            children: $('.js__child-dialog-deactivate-official-item'),
            close: false,
            styleClass: 'dialog--320',
            btnTextPrimary: 'Yes, Deactivate',
            handleClickPrimary: () => { handleDeactivateOfficialItem(item_id, official_id) },
            handleClickSecondary: () => { handleCancelStatusOfficialItem(e) }
        });
    }
}
function handleActivateOfficialItem(item_id, official_id) {
    handleStatusOfficialItem(item_id, official_id, 1)
}
function handleDeactivateOfficialItem(item_id, official_id) {
    handleStatusOfficialItem(item_id, official_id, 0)
}
function handleStatusOfficialItem(item_id, official_id, val) {
    dataOfficial.map(item => {
        if(item.id === official_id){
            item.items.map((data, index) => {
                if(data.id === item_id){
                    data.status = val
                }
            })
        }
    })
    handleDialogClose();
    loopDataItem(official_id)
}
function handleCancelStatusOfficialItem(e) {
    $(e).prop('checked', !e.checked)
    handleDialogClose()
}