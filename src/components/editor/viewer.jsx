import React from 'react';
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';

export default class ViewerComponent extends React.Component {
  rootEl = React.createRef();

  viewerInst;

  getRootElement() {
    return this.rootEl.current;
  }

  getInstance() {
    return this.viewerInst;
  }

  getBindingEventNames() {
    return Object.keys(this.props)
      .filter((key) => /^on[A-Z][a-zA-Z]+/.test(key))
      .filter((key) => this.props[key]);
  }

  bindEventHandlers(props) {
    this.getBindingEventNames().forEach((key) => {
      const eventName = key[2].toLowerCase() + key.slice(3);

      this.viewerInst.off(eventName);
      this.viewerInst.on(eventName, props[key]);
    });
  }

  getInitEvents() {
    return this.getBindingEventNames().reduce(
      (acc, key) => {
        const eventName = (key[2].toLowerCase() + key.slice(3));

        acc[eventName] = this.props[key];

        return acc;
      },
      {}
    );
  }

  componentDidMount() {
    this.viewerInst = new Viewer({
      el: this.rootEl.current,
      ...this.props,
      events: this.getInitEvents(),
    });
  }

  shouldComponentUpdate(nextProps) {
    this.bindEventHandlers(nextProps);

    return false;
  }

  render() {
    return <div ref={this.rootEl} />;
  }
}