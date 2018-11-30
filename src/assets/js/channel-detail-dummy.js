$(function templateChatRenderer() {
    loadJSON('json/channel-detail.json', function(response) {

        var channelDetail = JSON.parse(response);
        var $tableTemplateChat = $('.js__table-template-chat');
        var rowTemplateChat = '';
        
        channelDetail.templateChat.map(template => {
            rowTemplateChat += 
                `<tr class="row-template-chat">
                    <td class="table__list-num">
                    <h6 class="list-num__id">${template.id}</h6>
                    </td>
                    <td class="table__list-num">
                    ${template.vibrate ? 
                        '<h6 class="list-num__id list-num__id--text">Yes</h6>' : 
                        '<h6 class="list-num__id list-num__id--text">No</h6>'}
                    </td>
                    <td class="table__list-content">
                    <div class="list-content">
                        <div class="list-content__text">
                        <p class="list-content__text-desc m-0">${template.message}</p>
                        ${template.imgURL != '' ?
                            `<img class="list-content__photo list-content__photo--template" src="${template.imgURL}" alt="">` : ''}
                        </div>
                    </div>
                    </td>
                    <td class="table__list-action">
                    <div class="list-action">
                        <div class="list-action__set">
                        <button class="unf-user-btn unf-user-btn--small unf-user-btn--primary group-chat__btn-send">Send Now</button>
                        <div class="template-chat__auto-send">
                            <label class="template-chat__auto-send-label">Auto-Send</label>
                            <div class="unf-user-toggle">
                            ${template.autoSend ? 
                                `<input checked type="checkbox" class="unf-user-toggle__checkbox" id="testcheck-${template.id}" onclick="autoSendTemplateChat(this)">` :
                                `<input type="checkbox" class="unf-user-toggle__checkbox" id="testcheck-${template.id}" onclick="autoSendTemplateChat(this)">`}
                            <label for="testcheck-${template.id}"></label>
                            </div>
                        </div>
                        ${template.autoSend ?
                            `<span class="template-chat__time-auto-send">Sisa waktu: <b>59m 59s</b></span>` : ``
                        }
                        </div>
                        <div class="list-action__btn">
                        <a class="unf-user-btn unf-user-btn--small group-chat__btn-action group-chat__btn--edit" onclick="handleClickEditTemplateChat(${template.id})"><span>edit</span></a>
                        <a class="unf-user-btn unf-user-btn--small group-chat__btn-action group-chat__btn--delete" onclick="handleClickDeleteTemplateChat(${template.id})"><span>delete</span></a>
                        </div>
                    </div>
                    </td>
                </tr>`;
        });
        $tableTemplateChat.html(rowTemplateChat);
    }); 
});