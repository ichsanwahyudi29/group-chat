// Delete Ads
function handleDeleteAds(id) {
    dialogModule.renderDialog({
        title: 'Delete Ads',
        children: $('.js__child-dialog-delete-ads'),
        close: false,
        styleClass: 'dialog--320',
        btnTextPrimary: 'Yes, Delete',
        handleClickPrimary: () => { deleteAds(id) }
    });
}
function deleteAds(id) {
    dataAds.map((item, index) => {
        if (item.id === id) {
            dataAds.splice(index, 1)
        }
    })
    loopAdsData();
    handleDialogClose();
}

// Ads Status
function handleChangeAdsStatus(e, id) {
    if ($(e).prop('checked')) {
        dialogModule.renderDialog({
            title: 'Activate Ads',
            children: $('.js__child-dialog-activate-ads'),
            close: false,
            styleClass: 'dialog--320',
            btnTextPrimary: 'Yes, Activate',
            handleClickPrimary: () => { handleActivateAds(id) },
            handleClickSecondary: () => { handleCancelStatusAds(e) }
        });
    } else {
        dialogModule.renderDialog({
            title: 'Deactivate Ads',
            children: $('.js__child-dialog-deactivate-ads'),
            close: false,
            styleClass: 'dialog--320',
            btnTextPrimary: 'Yes, Deactivate',
            handleClickPrimary: () => { handleDeactivateAds(id) },
            handleClickSecondary: () => { handleCancelStatusAds(e) }
        });
    }
}
function handleActivateAds(id) {
    handleStatusAds(id, 1)
}
function handleDeactivateAds(id) {
    handleStatusAds(id, 0)
}
function handleStatusAds(id, val) {
    for (const data of dataAds) {
        if (data.id == id) {
            data.status = val
        }
        else {
            data.status = 0
        }
    }
    handleDialogClose();
    loopAdsData();
}
function handleCancelStatusAds(e) {
    $(e).prop('checked', !e.checked)
    handleDialogClose()
}