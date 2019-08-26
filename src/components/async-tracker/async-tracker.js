import React, { Component } from 'react';
import axios from 'axios';
import { PropTypes } from 'prop-types';
import './async-tracker.css';

export default class AsyncTracker extends Component {
  state = {
    promiseTrackerArr: [],
    err: false,
  }

  componentDidMount() {
    this.axiosRequest();
    this.axiosResponse();
  }

  axiosRequest = () => {
    axios.interceptors.request.use((config) => {
      let isCriticalPromise = false;
      if (config && config.data && config.data.critical) {
        isCriticalPromise = true;
        if (config.method === 'get') {
          config.data = null;
        }
      }
      // Do something before request is sent
      const { promiseTrackerArr } = this.state;
      this.setState({
        promiseTrackerArr: [
          ...promiseTrackerArr,
          {
            url: config.url,
            critical: isCriticalPromise,
            method: config.method,
          },
        ],
      });
      return config;
    }, (error) => (
      // Do something with request error
      Promise.reject(error)
    ));
  }

  axiosResponse = () => {
    axios.interceptors.response.use((response) => {
      const { promiseTrackerArr } = this.state;

      if (response && response.config && response.config.url) {
        this.setState({
          promiseTrackerArr: promiseTrackerArr.filter((item) => item.url !== response.config.url),
        });
      }
      return response;
    }, (error) => {
      const { promiseTrackerArr } = this.state;
      if (error && error.config && error.config.url) {
        this.setState({
          promiseTrackerArr: promiseTrackerArr.filter((item) => {
            if (item.url === error.config.url && item.critical) {
              this.setState({
                err: error,
              });
            }
            return item.url !== error.config.url;
          }),
        });
      }
      Promise.reject(error);
    });
  }

  render() {
    const { promiseTrackerArr, err } = this.state;
    const { children } = this.props;
    return (
      <div>
        {promiseTrackerArr.length ? <div className="spinner" /> : null}
        {!err ? (
          <>
            { children }
          </>
        ) : <h1>WARNING WARNING WARNING</h1>}
      </div>
    );
  }
}

AsyncTracker.propTypes = {
  children: PropTypes.func.isRequired,
};
