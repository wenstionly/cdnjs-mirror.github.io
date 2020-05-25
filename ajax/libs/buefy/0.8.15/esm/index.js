import './chunk-6ea13200.js';
import { merge } from './helpers.js';
export { createNewEvent, escapeRegExpChars, getValueByPath, indexOf, isMobile, merge, multiColumnSort, removeElement, sign } from './helpers.js';
import { s as setVueInstance, a as setOptions, c as config } from './chunk-17222463.js';
import './chunk-1f14bcfd.js';
import './chunk-d732d84c.js';
import { a as registerComponentProgrammatic, u as use } from './chunk-cca88db8.js';
import './chunk-322704a2.js';
import './chunk-2d63cb07.js';
import Plugin from './autocomplete.js';
export { default as Autocomplete } from './autocomplete.js';
import Plugin$1 from './button.js';
export { default as Button } from './button.js';
import Plugin$2 from './carousel.js';
export { default as Carousel } from './carousel.js';
import './chunk-2793447b.js';
import './chunk-7bdbd626.js';
import Plugin$3 from './checkbox.js';
export { default as Checkbox } from './checkbox.js';
import Plugin$5 from './collapse.js';
export { default as Collapse } from './collapse.js';
import './chunk-bee4013f.js';
import './chunk-42f463e6.js';
import './chunk-757e4793.js';
import './chunk-f3c004c8.js';
import Plugin$4 from './clockpicker.js';
export { default as Clockpicker } from './clockpicker.js';
import './chunk-4ecafae5.js';
import './chunk-0a2a7b70.js';
import Plugin$6 from './datepicker.js';
export { default as Datepicker } from './datepicker.js';
import './chunk-faa5b64f.js';
import Plugin$7 from './datetimepicker.js';
export { default as Datetimepicker } from './datetimepicker.js';
import './chunk-ab714c1d.js';
import Plugin$8 from './dialog.js';
export { default as Dialog, DialogProgrammatic } from './dialog.js';
import Plugin$9 from './dropdown.js';
export { default as Dropdown } from './dropdown.js';
import Plugin$a from './field.js';
export { default as Field } from './field.js';
import Plugin$b from './icon.js';
export { default as Icon } from './icon.js';
import Plugin$c from './input.js';
export { default as Input } from './input.js';
import './chunk-b9bdb0e4.js';
import Plugin$d from './loading.js';
export { default as Loading, LoadingProgrammatic } from './loading.js';
import Plugin$e from './menu.js';
export { default as Menu } from './menu.js';
import './chunk-c51b3cfd.js';
import Plugin$f from './message.js';
export { default as Message } from './message.js';
import Plugin$g from './modal.js';
export { default as Modal, ModalProgrammatic } from './modal.js';
import Plugin$i from './notification.js';
export { default as Notification, NotificationProgrammatic } from './notification.js';
import './chunk-1287f56e.js';
import Plugin$h from './navbar.js';
export { default as Navbar } from './navbar.js';
import Plugin$j from './numberinput.js';
export { default as Numberinput } from './numberinput.js';
import './chunk-9d4aa0fc.js';
import Plugin$k from './pagination.js';
export { default as Pagination } from './pagination.js';
import Plugin$l from './progress.js';
export { default as Progress } from './progress.js';
import Plugin$m from './radio.js';
export { default as Radio } from './radio.js';
import Plugin$n from './rate.js';
export { default as Rate } from './rate.js';
import Plugin$o from './select.js';
export { default as Select } from './select.js';
import Plugin$p from './sidebar.js';
export { default as Sidebar } from './sidebar.js';
import './chunk-c86ed111.js';
import Plugin$q from './slider.js';
export { default as Slider } from './slider.js';
import Plugin$r from './snackbar.js';
export { default as Snackbar, SnackbarProgrammatic } from './snackbar.js';
import './chunk-0e3f4fb5.js';
import Plugin$s from './steps.js';
export { default as Steps } from './steps.js';
import Plugin$t from './switch.js';
export { default as Switch } from './switch.js';
import Plugin$u from './table.js';
export { default as Table } from './table.js';
import Plugin$v from './tabs.js';
export { default as Tabs } from './tabs.js';
import './chunk-39690876.js';
import Plugin$w from './tag.js';
export { default as Tag } from './tag.js';
import Plugin$x from './taginput.js';
export { default as Taginput } from './taginput.js';
import Plugin$y from './timepicker.js';
export { default as Timepicker } from './timepicker.js';
import Plugin$z from './toast.js';
export { default as Toast, ToastProgrammatic } from './toast.js';
import Plugin$A from './tooltip.js';
export { default as Tooltip } from './tooltip.js';
import Plugin$B from './upload.js';
export { default as Upload } from './upload.js';



var components = /*#__PURE__*/Object.freeze({
    Autocomplete: Plugin,
    Button: Plugin$1,
    Carousel: Plugin$2,
    Checkbox: Plugin$3,
    Clockpicker: Plugin$4,
    Collapse: Plugin$5,
    Datepicker: Plugin$6,
    Datetimepicker: Plugin$7,
    Dialog: Plugin$8,
    Dropdown: Plugin$9,
    Field: Plugin$a,
    Icon: Plugin$b,
    Input: Plugin$c,
    Loading: Plugin$d,
    Menu: Plugin$e,
    Message: Plugin$f,
    Modal: Plugin$g,
    Navbar: Plugin$h,
    Notification: Plugin$i,
    Numberinput: Plugin$j,
    Pagination: Plugin$k,
    Progress: Plugin$l,
    Radio: Plugin$m,
    Rate: Plugin$n,
    Select: Plugin$o,
    Sidebar: Plugin$p,
    Slider: Plugin$q,
    Snackbar: Plugin$r,
    Steps: Plugin$s,
    Switch: Plugin$t,
    Table: Plugin$u,
    Tabs: Plugin$v,
    Tag: Plugin$w,
    Taginput: Plugin$x,
    Timepicker: Plugin$y,
    Toast: Plugin$z,
    Tooltip: Plugin$A,
    Upload: Plugin$B
});

var Buefy = {
  install: function install(Vue) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    setVueInstance(Vue); // Options

    setOptions(merge(config, options, true)); // Components


    for (var componentKey in components) {
      Vue.use(components[componentKey]);
    } // Config component


    var BuefyProgrammatic = {
      getOptions: function getOptions() {
        return config;
      },
      setOptions: function setOptions$1(options) {
        setOptions(merge(config, options, true));
      }
    };
    registerComponentProgrammatic(Vue, 'config', BuefyProgrammatic);
  }
};
use(Buefy);

export default Buefy;
