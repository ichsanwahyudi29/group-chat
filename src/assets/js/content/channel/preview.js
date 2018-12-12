$(document).ready(function(){
    $('.js__unf-user-dialog--preview-channel').html(`
        <div class="unf-user-dialog__content p-0">
        <div class="unf-user-dialog__header unf-user-dialog__header-shadow">Group Chat Preview</div>
        <span class="unf-user-dialog__close" onclick="handleDialogClose()"></span>
        <div class="d-flex">

        <div class="preview-channel__detail customScrollBar customScrollBar--y">
            <div class="preview-channel__detail-list">
            <div class="preview-detail">
                <label class="preview-detail__column-left preview-detail__label">Group Chat ID</label>
                <div class="preview-detail__column-right">
                <p class="preview-detail__text">ID 201 (URL budCUv)</p>
                </div>
            </div>
            <div class="preview-detail">
                <label class="preview-detail__column-left preview-detail__label">Cover Photo</label>
                <div class="preview-detail__column-right">
                <img class="preview-detail__cover" src="./assets/img/gc1.jpg" alt="" srcset="">
                </div>
            </div>
            <div class="preview-detail">
                <label class="preview-detail__column-left preview-detail__label">Group Chat Name</label>
                <div class="preview-detail__column-right">
                <p class="preview-detail__text">Indonesia Idol 2019</p>
                </div>
            </div>
            <div class="preview-detail">
                <label class="preview-detail__column-left preview-detail__label">Description</label>
                <div class="preview-detail__column-right">
                <p class="preview-detail__text">Hai para pecinta sepak bola, Ramaikan piala dunia 2018 bersama
                    Tokopedia! Ikuti quiznya dan menangkan Tokocash senilai jutaan rupiah. Buruan, jangan sampai
                    kelewatan!</p>
                </div>
            </div>
            <div class="preview-detail">
                <label class="preview-detail__label preview-detail__label--moderator">Moderator</label>
            </div>
            <div class="preview-detail">
                <label class="preview-detail__column-left preview-detail__label">Moderator Photo</label>
                <div class="preview-detail__column-right">
                <img class="preview-detail__moderator" src="./assets/img/moderator.jpg" alt="" srcset="">
                </div>
            </div>
            <div class="preview-detail">
                <label class="preview-detail__column-left preview-detail__label">Moderator Name</label>
                <div class="preview-detail__column-right">
                <p class="preview-detail__text">Darius Sinathrya</p>
                </div>
            </div>
            </div>
            <div class="preview-channel__detail-status">
            <div class="preview-detail">
                <label class="preview-detail__column-left preview-detail__label">Status</label>
                <div class="preview-detail__column-right">
                <p class="preview-detail__text preview-detail__status">Inactive</p>
                </div>
            </div>
            </div>
        </div>

        <div class="preview-channel__options preview-options tab-options">
            <input type="radio" name="preview-options" class="tab-list" id="tab-ads" checked>
            <input type="radio" name="preview-options" class="tab-list" id="tab-official">
            <input type="radio" name="preview-options" class="tab-list" id="tab-flashsale">
            <input type="radio" name="preview-options" class="tab-list" id="tab-rewards">
            <input type="radio" name="preview-options" class="tab-list" id="tab-polling">
            <input type="radio" name="preview-options" class="tab-list" id="tab-room">
            <ul class="tab-options__container preview-options__tab">
            <li class="tab-options__item">
                <label class="tab-options__item-label" for="tab-ads">Ads</label>
            </li>
            <li class="tab-options__item">
                <label class="tab-options__item-label" for="tab-official">Official</label>
            </li>
            <li class="tab-options__item">
                <label class="tab-options__item-label" for="tab-flashsale">Flashsale</label>
            </li>
            <li class="tab-options__item">
                <label class="tab-options__item-label" for="tab-rewards">Rewards</label>
            </li>
            <li class="tab-options__item">
                <label class="tab-options__item-label" for="tab-polling">Polling</label>
            </li>
            <li class="tab-options__item">
                <label class="tab-options__item-label" for="tab-room">Room</label>
            </li>
            <span id="preview-options__tab-indicator" class="tab-options__indicator"></span>
            </ul>
            <div class="tab-options__content preview-options__content customScrollBar customScrollBar--y">

            <!-- Ads -->
            <section class="section-content">
                <div class="section-content__header">
                <h6 class="section-content__header-title">Active Ads</h6>
                <a class="section-content__header-setting"></a>
                </div>
                <div class="card section-content__detail">
                <div class="preview-detail">
                    <label class="preview-detail__column-left preview-detail__label">Ads ID</label>
                    <div class="preview-detail__column-right">
                    <p class="preview-detail__text">001</p>
                    </div>
                </div>
                <div class="preview-detail">
                    <label class="preview-detail__column-left preview-detail__label">Ads Title</label>
                    <div class="preview-detail__column-right">
                    <p class="preview-detail__text">Refferal</p>
                    </div>
                </div>
                <div class="preview-detail">
                    <label class="preview-detail__column-left preview-detail__label">Ads Photo</label>
                    <div class="preview-detail__column-right">
                    <img class="preview-detail__cover" src="./assets/img/gc1.jpg" alt="" srcset="">
                    </div>
                </div>
                <div class="preview-detail">
                    <label class="preview-detail__column-left preview-detail__label">Ads URL</label>
                    <div class="preview-detail__column-right">
                    <a href="" class="preview-detail__text">http.//www.tokopedia.com/referral/</a>
                    </div>
                </div>
                </div>
            </section>

            <!-- Official -->
            <section class="section-content">
                <div class="section-content__header">
                <h6 class="section-content__header-title">Official Partner</h6>
                <a class="section-content__header-setting"></a>
                </div>
                <div class="card section-content__detail">
                <div class="preview-detail">
                    <label class="preview-detail__column-left preview-detail__label">Brand ID</label>
                    <div class="preview-detail__column-right">
                    <p class="preview-detail__text">001</p>
                    </div>
                </div>
                <div class="preview-detail">
                    <label class="preview-detail__column-left preview-detail__label">Brand Title</label>
                    <div class="preview-detail__column-right">
                    <p class="preview-detail__text">Metro TV</p>
                    </div>
                </div>
                <div class="preview-detail">
                    <label class="preview-detail__column-left preview-detail__label">Brand Photo</label>
                    <div class="preview-detail__column-right">
                    <img class="preview-detail__cover preview-detail__cover--circle" src="./assets/img/gc1.jpg" alt=""
                        srcset="">
                    </div>
                </div>
                <div class="preview-detail">
                    <label class="preview-detail__column-left preview-detail__label">Brand URL</label>
                    <div class="preview-detail__column-right">
                    <a href="" class="preview-detail__text">http.//www.tokopedia.com/metrotv/</a>
                    </div>
                </div>
                </div>
            </section>

            <!-- Flashsale -->
            <section class="section-content">
                <div class="section-content__header">
                <h6 class="section-content__header-title">Active Flashsale</h6>
                <a class="section-content__header-setting"></a>
                </div>
                <div class="card section-content__detail">
                <div class="preview-detail">
                    <label class="preview-detail__column-left preview-detail__label">Flashsale ID</label>
                    <div class="preview-detail__column-right">
                    <p class="preview-detail__text">001</p>
                    </div>
                </div>
                <div class="preview-detail">
                    <label class="preview-detail__column-left preview-detail__label">Flashsale Title</label>
                    <div class="preview-detail__column-right">
                    <p class="preview-detail__text">Flashsale 23 July 2018</p>
                    </div>
                </div>
                <div class="preview-detail">
                    <label class="preview-detail__column-left preview-detail__label">Time</label>
                    <div class="preview-detail__column-right">
                    <div class="preview-detail__time">
                        <label class="preview-detail__label">Start</label>
                        <p class="preview-detail__text">23 July 2018, 18.00 WIB</p>
                    </div>
                    <div class="preview-detail__time">
                        <label class="preview-detail__label">End</label>
                        <p class="preview-detail__text">23 July 2018, 18.00 WIB</p>
                    </div>
                    </div>
                </div>
                <div class="preview-detail">
                    <label class="preview-detail__column-left preview-detail__label">Product</label>
                    <div class="preview-detail__column-right">
                    <p class="preview-detail__text">Seagate Back Up Slim 1TB USB 3.0.2.5 Putih + Gratis Pouch</p>
                    </div>
                </div>
                </div>
            </section>

            <!-- Rewards -->
            <section class="section-content">
                <div class="section-content__header">
                <h6 class="section-content__header-title">Active Rewards</h6>
                <a class="section-content__header-setting"></a>
                </div>
                <div class="card section-content__detail">
                <div class="preview-detail">
                    <label class="preview-detail__column-left preview-detail__label">Rewards ID</label>
                    <div class="preview-detail__column-right">
                    <p class="preview-detail__text">001</p>
                    </div>
                </div>
                <div class="preview-detail">
                    <label class="preview-detail__column-left preview-detail__label">Rewards Title</label>
                    <div class="preview-detail__column-right">
                    <p class="preview-detail__text">Tokopoints 10</p>
                    </div>
                </div>
                </div>
            </section>

            <!-- Polling -->
            <section class="section-content">
                <div class="section-content__header">
                <h6 class="section-content__header-title">Active Poll</h6>
                <a class="section-content__header-setting"></a>
                </div>
                <div class="card section-content__detail">
                <div class="preview-detail">
                    <label class="preview-detail__column-left preview-detail__label">Polling ID</label>
                    <div class="preview-detail__column-right">
                    <p class="preview-detail__text">001</p>
                    </div>
                </div>
                <div class="preview-detail">
                    <label class="preview-detail__column-left preview-detail__label">Polling Title</label>
                    <div class="preview-detail__column-right">
                    <p class="preview-detail__text">Polling 1</p>
                    </div>
                </div>
                <div class="preview-detail">
                    <label class="preview-detail__column-left preview-detail__label">Time</label>
                    <div class="preview-detail__column-right">
                    <div class="preview-detail__time">
                        <label class="preview-detail__label">Start</label>
                        <p class="preview-detail__text">23 July 2018, 18.00 WIB</p>
                    </div>
                    <div class="preview-detail__time">
                        <label class="preview-detail__label">End</label>
                        <p class="preview-detail__text">23 July 2018, 18.00 WIB</p>
                    </div>
                    </div>
                </div>
                <div class="preview-detail">
                    <label class="preview-detail__column-left preview-detail__label">Product</label>
                    <div class="preview-detail__column-right">
                    <p class="preview-detail__text">Active | Gift | Image</p>
                    <!-- <p class="preview-detail__text preview-detail__text-product">Active</p>
                        <p class="preview-detail__text preview-detail__text-product">Gift</p>
                        <p class="preview-detail__text preview-detail__text-product">Image</p> -->
                    </div>
                </div>
                <div class="preview-detail">
                    <label class="preview-detail__column-left preview-detail__label">Winner Info</label>
                    <div class="preview-detail__column-right">
                    <p class="preview-detail__text">-</p>
                    </div>
                </div>
                <hr class="preview-detail-separator">
                <div class="preview-detail">
                    <label class="preview-detail__column-left preview-detail__label">Question</label>
                    <div class="preview-detail__column-right">
                    <p class="preview-detail__text">Siapa pemain MVP tahun ini</p>
                    </div>
                </div>
                <div class="preview-detail">
                    <label class="preview-detail__column-left preview-detail__label">Option 1</label>
                    <div class="preview-detail__column-right">
                    <p class="preview-detail__text">Christian Ronaldo</p>
                    </div>
                </div>
                <div class="preview-detail">
                    <label class="preview-detail__column-left preview-detail__label">Options 2</label>
                    <div class="preview-detail__column-right">
                    <p class="preview-detail__text">Lionel Messi</p>
                    </div>
                </div>
                </div>
                <div class="card section-content__detail">
                <div class="preview-detail">
                    <label class="preview-detail__column-left preview-detail__label">Polling ID</label>
                    <div class="preview-detail__column-right">
                    <p class="preview-detail__text">001</p>
                    </div>
                </div>
                <div class="preview-detail">
                    <label class="preview-detail__column-left preview-detail__label">Polling Title</label>
                    <div class="preview-detail__column-right">
                    <p class="preview-detail__text">Polling 1</p>
                    </div>
                </div>
                <div class="preview-detail">
                    <label class="preview-detail__column-left preview-detail__label">Time</label>
                    <div class="preview-detail__column-right">
                    <div class="preview-detail__time">
                        <label class="preview-detail__label">Start</label>
                        <p class="preview-detail__text">23 July 2018, 18.00 WIB</p>
                    </div>
                    <div class="preview-detail__time">
                        <label class="preview-detail__label">End</label>
                        <p class="preview-detail__text">23 July 2018, 18.00 WIB</p>
                    </div>
                    </div>
                </div>
                <div class="preview-detail">
                    <label class="preview-detail__column-left preview-detail__label">Product</label>
                    <div class="preview-detail__column-right">
                    <p class="preview-detail__text">Active | Gift | Image</p>
                    <!-- <p class="preview-detail__text preview-detail__text-product">Active</p>
                        <p class="preview-detail__text preview-detail__text-product">Gift</p>
                        <p class="preview-detail__text preview-detail__text-product">Image</p> -->
                    </div>
                </div>
                <div class="preview-detail">
                    <label class="preview-detail__column-left preview-detail__label">Winner Info</label>
                    <div class="preview-detail__column-right">
                    <p class="preview-detail__text">-</p>
                    </div>
                </div>
                <hr class="preview-detail-separator">
                <div class="preview-detail">
                    <label class="preview-detail__column-left preview-detail__label">Question</label>
                    <div class="preview-detail__column-right">
                    <p class="preview-detail__text">Siapa pemain MVP tahun ini</p>
                    </div>
                </div>
                <div class="preview-detail">
                    <label class="preview-detail__column-left preview-detail__label">Option 1</label>
                    <div class="preview-detail__column-right">
                    <p class="preview-detail__text">Christian Ronaldo</p>
                    </div>
                </div>
                <div class="preview-detail">
                    <label class="preview-detail__column-left preview-detail__label">Options 2</label>
                    <div class="preview-detail__column-right">
                    <p class="preview-detail__text">Lionel Messi</p>
                    </div>
                </div>
                </div>
            </section>

            <!-- Room -->
            <section class="section-content">
                <div class="section-content__header">
                <h6 class="section-content__header-title">Active Room</h6>
                <a class="section-content__header-setting"></a>
                </div>
                <div class="card section-content__detail">
                <div class="preview-detail">
                    <label class="preview-detail__column-left preview-detail__label">Room ID</label>
                    <div class="preview-detail__column-right">
                    <p class="preview-detail__text">001</p>
                    </div>
                </div>
                <div class="preview-detail">
                    <label class="preview-detail__column-left preview-detail__label">Room Status</label>
                    <div class="preview-detail__column-right">
                    <p class="preview-detail__text">Active</p>
                    </div>
                </div>
                </div>
                <div class="card section-content__detail">
                <div class="preview-detail">
                    <label class="preview-detail__column-left preview-detail__label">Room ID</label>
                    <div class="preview-detail__column-right">
                    <p class="preview-detail__text">002</p>
                    </div>
                </div>
                <div class="preview-detail">
                    <label class="preview-detail__column-left preview-detail__label">Room Status</label>
                    <div class="preview-detail__column-right">
                    <p class="preview-detail__text">Active</p>
                    </div>
                </div>
                </div>
            </section>
            </div>
        </div>

        </div>
        <div class="unf-user-dialog__action preview-channel__btn">
        <button class="unf-user-btn unf-user-btn--medium unf-user-btn--secondary" onclick="handleDialogClose()">Close</button>
        </div>
    </div>
    `)
})

function previewChannel(id) {
    console.log(id)
    handleDialogOpen($('.js__unf-user-dialog--preview-channel'));
}

$(document).on('click', '.preview-options__tab .tab-options__item-label', function(){
    optionsTab(this);
})