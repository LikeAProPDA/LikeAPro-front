/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from 'react';
import Editor from '@toast-ui/editor';

export default class extends React.Component {
  rootEl = React.createRef();

  editorInst;

  getRootElement() {
    return this.rootEl.current;
  }

  getInstance() {
    return this.editorInst;
  }

  getBindingEventNames() {
    return Object.keys(this.props)
      .filter((key) => /^on[A-Z][a-zA-Z]+/.test(key))
      .filter((key) => this.props[key]);
  }

  bindEventHandlers(props) {
    this.getBindingEventNames().forEach((key) => {
      const eventName = key[2].toLowerCase() + key.slice(3);

      this.editorInst.off(eventName);
      this.editorInst.on(eventName, props[key]);
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
    this.editorInst = new Editor({
      el: this.rootEl.current,
      ...this.props,
      events: this.getInitEvents(),
    });
  }

  shouldComponentUpdate(nextProps) {
    const instance = this.getInstance();
    const { height, previewStyle } = nextProps;


    if (height && this.props.height !== height) {
      instance.setHeight(height);
    }

    if (previewStyle && this.props.previewStyle !== previewStyle) {
      instance.changePreviewStyle(previewStyle);
    }

    this.bindEventHandlers(nextProps);

    return false;
  }

  render() {
    return <div ref={this.rootEl} />;
  }
}