export interface IDomListener {}

class DomListener implements IDomListener {
  private $root: Element;

  constructor($root: Element) {
    // if (!$root) {
    //   throw new Error('No $root provided for DomListener');
    // }
    this.$root = $root;
  }
}

export default DomListener;
