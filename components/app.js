import React from 'react';

export default class AppComponent extends React.Component {
  render() {
    return (
      <div>
        <h2>This is the App</h2>
        { this.props.children }
      </div>
    );
  }
}