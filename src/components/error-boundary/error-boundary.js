/* eslint-disable prefer-destructuring */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ErrorBoundary extends Component {
  state = {
    error: false,
  };

  componentDidMount() {
    window.onerror = function errorHandlerTest(msg, file, line, col, error) {
      const errorObj = {
        msg,
        error,
      };
      console.log(errorObj);
    };
  }

  componentDidCatch(error) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error,
    });
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;
    if (error) {
      // Error path
      return (
        <div className="container">
          <h2>Something went wrong.</h2>
          {error && error.toString()}
          <br />
          <br />
          <br />
        </div>
      );
    }
    // Normally, just render children
    return (
      <>
        { children }
      </>
    );
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.func.isRequired,
};
