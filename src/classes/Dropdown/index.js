export default class DropDownHolder {
    static dropDown;
    static setDropDown(dropDown) {
        this.dropDown = dropDown;
    }
    static getDropDown() {
        return this.dropDown;
    }
    static show(type, title, message) {
        if (this.dropDown) {
          this.dropDown.alertWithType(type, title, message);
        }
    }
}