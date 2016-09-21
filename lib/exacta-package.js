'use babel';

import ExactaPackageView from './exacta-package-view';
import { CompositeDisposable } from 'atom';

export default {

  exactaPackageView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.exactaPackageView = new ExactaPackageView(state.exactaPackageViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.exactaPackageView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'exacta-package:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.exactaPackageView.destroy();
  },

  serialize() {
    return {
      exactaPackageViewState: this.exactaPackageView.serialize()
    };
  },

  toggle() {
    console.log('ExactaPackage was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
