import React, { Component } from 'react';
import axios from 'axios';
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
      //  if you dont want a single bad request to break the rest of the requests
      let isCriticalPromise = true;
      if (config && config.data && config.data.critical != null && !config.data.critical) {
        isCriticalPromise = config.data.critical;
        if (config.method === 'get') {
          config.data = null;
        }
      }

      //  if you dont want a spinner to be active for this specific request
      if (config && config.data && config.data.optout) {
        if (config.method === 'get') {
          config.data = null;
        }
        return config;
      }

      // add the request to the array to show spinner with configuration.
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
    }, (error) => error);
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
      return error;
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
