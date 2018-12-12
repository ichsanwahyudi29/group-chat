/* import en from "./en.json";
import id from "./id.json";

export default {
    en,
    id
};
 */
var helper = {};
$(document).ready(function () {
    loadJSON('./assets/js/locale/id.json', function (response) {
        var res = JSON.parse(response);
        helper.id = res
    })
    loadJSON('./assets/js/locale/en.json', function (response) {
        var res = JSON.parse(response);
        helper.en = res
    })
})