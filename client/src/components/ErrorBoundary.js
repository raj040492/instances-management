import React from 'react';

export default class ErrorBoundary extends React.Component {
  state = {
    errorMessage: false,
  };
  static getDerivedStateFromError(error) {
    return { errorMessage: error.toString() };
  }
  componentDidCatch(error, info) {
    this.setState({
      errorMessage: true,
    });
  }
  // A fake logging service 😬
  logErrorToServices = console.log;
  render() {
    return this.state.errorMessage ? (
      <>Error printed from Error Boundary</>
    ) : (
      <>{this.props.children}</>
    );
  }
}
