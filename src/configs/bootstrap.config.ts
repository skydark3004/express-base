import { registerExtensionMethods } from '../libs/common/extend-method';

/**
 * @method preloadExtensionMethods
 * @description load extension method
 */
function preloadExtensionMethods() {
  registerExtensionMethods({ pagination: true, response: true });
}

export default function () {
  /** preload extension method*/
  preloadExtensionMethods();
}
